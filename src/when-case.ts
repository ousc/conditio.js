import {conditionToFn} from "./functions";
import {Cond} from "./when";

export class Condition<T = any, R = any> {
    private readonly condition: (value: T) => boolean;
    private readonly result: R | (() => R);

    constructor(condition: (value: T) => boolean, result: R | (() => R)) {
        this.condition = condition;
        this.result = result;
    }

    isTrue(value: T = undefined as unknown as T): boolean {
        return this.condition(value);
    }

    getResult(value: T): R {
        return typeof this.result === 'function' ? (this.result as () => R)() : this.result
    }

    else(defaultResult?: R | (() => R)): R {
        return this.isTrue() ? this.getResult(undefined as unknown as T) : typeof defaultResult === 'function' ? (defaultResult as () => R)() : defaultResult as R;
    }

    elseIf(condition: boolean | ((value: T) => boolean), result?: R | (() => R)): ((result: ((() => R) | R)) => Condition<T, R>) | (() => Condition<T, R>) {
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
    private readonly value: T;

    constructor(value: T) {
        this.value = value;
    }

    whenCase<R>(...args: Cond<T, R>[]): R {
        for(let i = 0; i < args.length; i++) {
            const arg = args[i];
            if (arg instanceof Condition && arg.isTrue(this.value)) {
                return arg.getResult(this.value);
            } else if (
                typeof arg === 'function'
            ) {
                if (i !== args.length - 1) {
                    const condition = (arg as unknown as ((result?: any) => R))()
                    if (condition && condition.constructor.name === Condition.name && (condition as unknown as Condition<T, R>).isTrue(this.value)) {
                        return (condition as unknown as Condition<T, R>).getResult(this.value);
                    }
                } else {
                    return (arg as any)();
                }
            }
        }

        return undefined as unknown as R;
    }
}