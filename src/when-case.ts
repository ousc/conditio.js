import {conditionToFn} from "./functions";

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

    else(defaultResult?: R | (() => R)): R | undefined {
        return this.isTrue() ? this.getResult(undefined) : typeof defaultResult === 'function' ? (defaultResult as () => R)() : defaultResult;
    }

    elseIf(condition: boolean | ((value: T | undefined) => boolean), result?: R | (() => R)): ((result: ((() => R) | R)) => Condition<T, R>) | (() => Condition<T, R>) {
        if (result === undefined) {
            return function (result: R | (() => R)) {
                return new Condition(conditionToFn(condition), result);
            };
        }
        return () => (this.isTrue() ? this : new Condition<T, R>(conditionToFn(condition), result));
    }

    then(result: R | (() => R)): Condition<T, R> {
        return new Condition(this.condition, result);
    }
}

export class WhenCase<T> {
    private readonly value: T | undefined;

    constructor(value: T | undefined) {
        this.value = value;
    }

    whenCase<U>(...args: (Condition<T, U> | (() => U))[]): U | undefined {
        const conditions = args.map(item => {
            if (typeof item === 'function' && (item() as any).constructor.name === Condition.name) {
                return item();
            } else {
                return item;
            }
        });
        const matchedCondition = conditions.find(arg =>
            (arg instanceof Condition && arg.isTrue(this.value)) ||
            (typeof arg === 'function'));
        if (matchedCondition instanceof Condition) {
            return matchedCondition.getResult(this.value);
        } else if (typeof matchedCondition === 'function') {
            return (matchedCondition as any)();
        }
        return undefined;
    }
}