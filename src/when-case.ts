export class Condition<T, R> {
    private readonly condition: (value: T) => boolean;
    private readonly result: R | (() => R);

    constructor(condition: (value: T) => boolean, result: R | (() => R)) {
        this.condition = condition;
        this.result = result;
    }

    compare(value: T): boolean {
        return this.condition(value);
    }

    getResult(value: T, defaultResult: any): any {
        const result = typeof this.result === 'function' ? (this.result as () => R)() : this.result;
        return this.compare(value) ? result : defaultResult;
    }
}
export class WhenCase<T> {
    private value: T | undefined;

    constructor(value: T | undefined) {
        this.value = value;
    }

    when(...args: any[]) {
        if (args.length === 0) {
            return undefined
        }
        if (args.every(arg => arg instanceof Condition || typeof arg === 'function')) { // 检查是否为条件表达式
            const matchedCondition = args.find(arg =>
                (arg instanceof Condition && arg.compare(this.value)) ||
                typeof arg === 'function'
            );
            return matchedCondition ?
                typeof matchedCondition === 'function' ?
                    matchedCondition() :
                    matchedCondition.getResult(this.value, undefined) : undefined;
        } else {
            this.value = args[0];
            return this;
        }
    }
}