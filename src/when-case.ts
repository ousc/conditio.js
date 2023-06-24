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

    private getResult(value: T | undefined): any {
        return typeof this.result === 'function' ? (this.result as () => R)() : this.result
    }

    else(defaultResult: R | (() => R)): Condition<T | undefined, R> {
        return this.isTrue() ? this.getResult(undefined) : defaultResult;
    }
}

export class WhenCase<T> {
    private value: T | undefined;

    constructor(value: T | undefined) {
        this.value = value;
    }

    whenCase(...args: any[]) {
        const matchedCondition = args.find(arg =>
            (arg instanceof Condition && arg.isTrue(this.value)) ||
            typeof arg === 'function'
        );
        return matchedCondition ?
            typeof matchedCondition === 'function' ?
                matchedCondition() :
                matchedCondition.getResult(this.value) : undefined;
    }
}