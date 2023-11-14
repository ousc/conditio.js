import {Condition, WhenCase} from "./index";

/**
 * Creates a new `WhenCase` object that represents a `when` statement.
 *
 * Example:
 *
 * const a = 1;
 * const result =
 *    when(a)(
 *        Is(1, 'a is 1'),
 *        In(1, 2, 3, 'a is in [1, 2, 3]'),
 *        // or In([1, 2, 3], 'a is in [1, 2, 3]'),
 *        Matches(/^[A-Z]/, 'a starts with uppercase'),
 *        Between(1, 10, 'a is between 1 and 10'),
 *        BelongTo('number', 'a is a number'),
 *        If(a > 1, 'a is greater than 1'),
 *        IsNaN('a is NaN'),
 *        Else('no condition is matched')
 *        //or () => 'no condition is matched'
 *    )
 *
 *    or
 *
 *    when(
 *        If(a === 1, () => { // do something }),
 *        If(a === 2, () => { // do something else }),
 *        () => { // do something default }
 *        //or Else(() => { // do something default })
 *    )
 *
 * @returns The `WhenCase` object that represents the `when` statement.
 * @param val
 * @param cond
 */
export type Cond<T, R> = Condition<T, R> | (() => R) | ((result: ((() => R) | R)) => Condition<T, R>) | (() => Condition<T, R>);
/**
 * A utility function that allows you to define conditional branching based on a value or condition.
 *
 * @returns The result of the first matching condition or undefined if no conditions match.
 * @param val The value.
 */
export function when<T = undefined, R = any>(val: T): R;/**
 * A utility function that allows you to define conditional branching based on a value or condition.
 *
 * @param cond - The conditions to check.
 * @returns The result of the first matching condition or undefined if no conditions match.
 */
export function when<T = undefined, R = any>(
    ...cond: Cond<T, R>[]
): R;
/**
 * A utility function that allows you to define conditional branching based on a value or condition.
 *
 * @param valOrCond - The value or condition to check.
 * @param cond - Additional conditions to check.
 * @returns The result of the first matching condition or undefined if no conditions match.
 */
export function when<T = any, R = any>(
    valOrCond: T | Cond<T, R>,
    ...cond: Cond<T, R>[]
) {
    if (valOrCond === undefined) {
        return undefined
    }
    if ([valOrCond, ...cond].every(arg => arg instanceof Condition || typeof arg === 'function')) { // 检查是否为条件表达式
        return new WhenCase<T>(undefined as unknown as T).whenCase(...[valOrCond, ...cond] as Cond<T, R>[]);
    } else {
        return function (...args2: (Condition<T, R> | (() => R))[]) {
            return new WhenCase<T>(valOrCond as T).whenCase<R>(...args2);
        };
    }
}