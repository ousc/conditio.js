import {Condition} from "./index";

export const conditionToFn = <T>(condition: boolean | ((value: T) => boolean)) => {
    return typeof condition === 'function' ? condition : ((value: T) => condition);
}

/**
 * Creates a new `Condition` object that represents an `if` statement.
 *
 * @example
 *
 * const v = 1;
 * const result = If(v > 5, () => 'v is greater than 5') or If(v > 5, 'v is greater than 5')
 * you can use it in `when` statement or alone.
 * const result = when(v)(
 *    If(v > 5, () => 'v is greater than 5'),
 *    Else('v is less than or equal to 5')
 * )
 * or
 * const result = If(v > 5)(() => {
 *     // do something.
 *     return 'v is greater than 5';
 * }).elseIf(v === 5)(() => {
 *     // do something.
 *     return 'v is equal to 5';
 * }).else(() => {
 *     // do something.
 *     return 'v is less than 5';
 * })
 *
 * @template T Type of the value to compare.
 * @template R Type of the result to return.
 * @param condition The condition to be checked, represented as a boolean value or a function that takes a value of type `T` and returns a boolean value.
 * @param result The result to be returned if the condition is true. It can be a value of type `R` or a function that returns a value of type `R`.
 * @returns The `Condition` object that represents the `if` statement.
 */
export function If<R = any>(condition: boolean | ((value: any) => boolean), result?: R | (() => R)): ((result: ((() => R) | R)) => Condition<any, R>) | (() => Condition<any, R>) {
    if (result === undefined) {
        return (result?: R | (() => R)) => new Condition<any, R>(conditionToFn(condition), result as R)
    }
    const fn = conditionToFn(condition);
    return () => new Condition<any, R>(fn, result);
}

/**
 * Creates a new `Condition` object that represents an `equals` statement.
 *
 * @example
 *
 * const v = 1;
 * Is(5, () => 'v is 5') or Is(5, 'v is 5')
 * must use in when() to compare
 * must pass v value to when() for comparison
 *
 * @template T Type of the value to compare.
 * @template R Type of the result to return.
 * @param expected The expected value to compare with.
 * @param result The result to be returned if the value matches `expected`. It can be a value of type `R` or a function that returns a value of type `R`.
 * @returns The `Condition` object that represents the `equals` statement.
 */
export function Is<T, R>(expected: T, result: R | (() => R)): Condition<T, R> {
    return new Condition<T, R>((value: T) => value === expected, result);
}

/**
 * Creates a new `Condition` object that represents a `not equals` statement.
 *
 * @example
 *
 * const v = 1;
 * Not(5, () => 'v is not 5') or Not(5, 'v is not 5')
 * must use in when() to compare
 * must pass v value to when() for comparison
 *
 * @template T Type of the value to compare.
 * @template R Type of the result to return.
 * @param expected The expected value to compare with.
 * @param result The result to be returned if the value does not match `expected`. It can be a value of type `R` or a function that returns a value of type `R`.
 * @returns The `Condition` object that represents the `not equals` statement.
 */
export function Not<T, R>(expected: T, result: R | (() => R)): Condition<T, R> {
    return new Condition<T, R>((value: T) => value !== expected, result);
}


/**
 * Creates a new `Condition` object that represents a `contains` statement.
 *
 * @example
 *
 * const v = 1;
 * In(-1, -2, -3, () => 'v is in -1/-2/-3') or In([-1, -2, -3], () => 'v is in -1/-2/-3')
 * must use in when() to compare
 * must pass a value to when() for comparison
 *
 * @param array The array to search for a match.
 * @returns The `Condition` object that represents the `contains` statement.
 */
export function In<T, R>(...array: ((T)[] | T | (() => R))[]): Condition<T, (() => R)> {
    if (array.length === 0) throw new Error('In() must pass at least one value');
    if (array[0] instanceof Array && array.length === 2) {
        const arr = array[0] as any[];
        const result = array[1] as (() => R);
        return new Condition<T, (() => R)>((value) => arr.includes(value), result);
    }
    const result = array.pop() as (() => R);
    return new Condition<T, (() => R)>((value) => array.includes(value), result);
}

/**
 * Creates a new `Condition` object that represents a `not contains` statement.
 *
 * @example
 *
 * const v = 1;
 * const result = NotIn(-1, -2, -3, () => 'v is not in -1/-2/-3') or NotIn([-1, -2, -3], () => 'v is not in -1/-2/-3')
 * must use in when() to compare
 * must pass a value to when() for comparison
 *
 * @template T Type of the value to compare.
 * @template R Type of the result to return.
 * @param array The array to search for a match.
 * @returns The `Condition` object that represents the `not contains` statement.
 */
export function NotIn<T, R>(...array: ((T)[] | T | (() => R))[]): Condition<T, (() => R)> {
    if (array.length === 0) throw new Error('NotIn() must pass at least one value');
    if (array[0] instanceof Array && array.length === 2) {
        const arr = array[0] as any[];
        const result = array[1] as (() => R);
        return new Condition<T, (() => R)>((value) => !arr.includes(value), result);
    }
    const result = array.pop() as (() => R);
    return new Condition<T, (() => R)>((value) => !array.includes(value), result);
}

/**
 * Creates a new `Condition` object that represents a `match` statement.
 *
 * @example
 *
 * Matches(/^[A-Z]/, () => 'starts with uppercase') or Matches(/^[A-Z]/, 'starts with uppercase')
 * must use in when() to compare
 * must pass a value to when() for regex comparison
 *
 * @template R Type of the result to return.
 * @param regexp The regular expression to match against the value.
 * @param result The result to be returned if the value matches the regular expression. It can be a value of type `R` or a function that returns a value of type `R`.
 * @returns The `Condition` object that represents the `match` statement.
 */
export function Matches<R>(regexp: RegExp, result: R | (() => R)): Condition<string, R> {
    return new Condition<string, R>((value: string) => value != undefined && regexp.test(value), result);
}

/**
 * Creates a new `Condition` object that represents a `not match` statement.
 *
 * @example
 *
 * NotMatches(/^[A-Z]/, () => 'does not start with uppercase') or NotMatches(/^[A-Z]/, 'does not start with uppercase')
 * must use in when() to compare
 * must pass a value to when() for regex comparison
 *
 * @template R Type of the result to return.
 * @param regexp The regular expression to match against the value.
 * @param result The result to be returned if the value does not match the regular expression. It can be a value of type `R` or a function that returns a value of type `R`.
 * @returns The `Condition` object that represents the `not match` statement.
 */
export function NotMatches<R>(regexp: RegExp, result: R | (() => R)): Condition<string, R> {
    return new Condition<string, R>((value: string) => value != undefined && !regexp.test(value), result);
}

/**
 * Creates a new `Condition` object that represents a `belong to` statement.
 *
 * @example
 *
 * const v = 1;
 * BelongTo('string', 'v is a string') or BelongTo('string', () => 'v is a string')
 * must use in when() to compare
 * must pass a value to when() for type comparison
 *
 * @template R Type of the result to return.
 * @param type The type to compare against.
 * @param result The result to be returned if the value belongs to the type. It can be a value of type `R` or a function that returns a value of type `R`.
 * @returns The `Condition` object that represents the `belong to` statement.
 */
export function BelongTo<T = any, R = any>(type: 'undefined' | 'boolean' | 'number' | 'bigint' | 'string' | 'symbol' | 'function' | 'object', result: R | (() => R)): Condition<T, R> {
    return new Condition<T, R>((value: T) => typeof value === type, result);
}

/**
 * Creates a new `Condition` object that represents a `not belong to` statement.
 *
 * @example
 *
 * const v = 1;
 * NotBelongTo('string', 'v is not a string') or NotBelongTo('string', () => 'v is not a string')
 * must use in when() to compare
 * must pass a value to when() for type comparison
 *
 * @template R Type of the result to return.
 * @param type The type to compare against.
 * @param result The result to be returned if the value does not belong to the type. It can be a value of type `R` or a function that returns a value of type `R`.
 * @returns The `Condition` object that represents the `not belong to` statement.
 */
export function NotBelongTo<T = any, R = any>(type: 'undefined' | 'boolean' | 'number' | 'bigint' | 'string' | 'symbol' | 'function' | 'object', result: R | (() => R)): Condition<T, R> {
    return new Condition<T, R>((value: any) => typeof value !== type, result);
}

/**
 * Creates a new `Condition` object that represents a `is NaN` statement.
 *
 * @example
 *
 * const v = 1;
 * IsNaN('v is NaN') or IsNaN(() => 'v is NaN')
 * must use in when() to compare
 * must pass a value to when() for NaN comparison
 *
 * @template R Type of the result to return.
 * @param result The result to be returned if the value is NaN. It can be a value of type `R` or a function that returns a value of type `R`.
 * @returns The `Condition` object that represents the `is NaN` statement.
 */
export function IsNaN<R>(result: R | (() => R)): Condition<number, R> {
    return new Condition<number, R>((value: number) => Number.isNaN(value), result);
}

/**
 * Creates a new `Condition` object that represents a `between` statement.
 *
 * @example
 *
 * const v = 1;
 * Between(1, 10, 'v is between 1 and 10') or Between(1, 10, () => 'v is between 1 and 10')
 * must use in when() to compare
 * must pass a value to when() for comparison
 *
 * @template T Type of the value to compare.
 * @template R Type of the result to return.
 * @param min The minimum value to compare against.
 * @param max The maximum value to compare against.
 * @param result The result to be returned if the value is between the minimum and maximum values. It can be a value of type `R` or a function that returns a value of type `R`.
 */
export function Between<T, R>(min: T, max: T, result: R | (() => R)): Condition<T, R> {
    return new Condition<T, R>((value: T) => value !== undefined && value !== null && value >= min && value <= max, result);
}

/**
 * Creates a new `Condition` object that represents a `not between` statement.
 *
 * @example
 *
 * const v = 1;
 * NotBetween(1, 10, 'v is not between 1 and 10') or NotBetween(1, 10, () => 'v is not between 1 and 10')
 * must use in when() to compare
 * must pass a value to when() for comparison
 *
 * @template T Type of the value to compare.
 * @template R Type of the result to return.
 * @param min The minimum value to compare against.
 * @param max The maximum value to compare against.
 * @param result The result to be returned if the value is not between the minimum and maximum values. It can be a value of type `R` or a function that returns a value of type `R`.
 * @returns The `Condition` object that represents the `not between` statement.
 */
export function NotBetween<T, R>(min: T, max: T, result: R | (() => R)): Condition<T, R> {
    return new Condition<T, R>((value: T) => value !== undefined  && value !== null && (value < min || value > max), result);
}

/**
 * if no condition is matched, return the result
 *
 * @example
 *
 * Else('no condition is matched') or Else(() => 'no condition is matched')
 * must use in when() to compare
 * in fact, you can use an arrow function as default instead of Else(...)
 * example: when(..., () => 'no condition is matched')
 *
 * @template R Type of the result to return.
 * @param result The result to be returned if no condition is matched. It can be a value of type `R` or a function that returns a value of type `R`.
 * @returns The `Condition` object that represents the `else` statement.
 */
export function Else<R>(result: R | (() => R)): Condition<any, R> {
    return new Condition<any, R>(() => true, result);
}
