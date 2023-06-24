import {If} from "./functions";

export class Condition<T, R> {
    private readonly condition: (value: T | undefined) => boolean;
    private readonly result: R | (() => R);

    constructor(condition: (value: T | undefined) => boolean, result: R | (() => R)) {
        this.condition = condition;
        this.result = result;
    }

    isTrue(value: T | undefined = undefined): boolean {
        return this.condition(value);
    }

    getResult(value: T | undefined): R {
        return typeof this.result === 'function' ? (this.result as () => R)() : this.result
    }

    else(defaultResult: R | (() => R) | undefined): R | undefined {
        return this.isTrue() ? this.getResult(undefined) : typeof defaultResult === 'function' ? (defaultResult as () => R)() : defaultResult;
    }

    elseIf(condition: boolean | ((value: T | undefined) => boolean), result: R | (() => R) | undefined): Condition<T, R | undefined> {
        return this.isTrue() ? this : If(condition, result);
    }
}

export class WhenCase<T> {
    private readonly value: T | undefined;

    constructor(value: T | undefined) {
        this.value = value;
    }

    whenCase<U>(...args: (Condition<T, U> | (() => U))[]): U | undefined {
        const matchedCondition = args.find(arg => (arg instanceof Condition && arg.isTrue(this.value)) || (typeof arg === 'function'));
        if (matchedCondition instanceof Condition) {
            return matchedCondition.getResult(this.value);
        } else if (typeof matchedCondition === 'function') {
            return matchedCondition();
        }
        return undefined;
    }
}