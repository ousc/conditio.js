import {Condition, WhenCase} from "./index";

export type Cond<T, R> = Condition<T, R> | (() => R) | ((result: ((() => R) | R)) => Condition<T, R>) | (() => Condition<T, R>);

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
 * @returns The `WhenCase` object that represents the `when` statement.
 * @param val
 */
export function when<T = undefined, R = any>(val: T): R;/**
 *
 * /**
 *  * Creates a new `WhenCase` object that represents a `when` statement.
 *  *
 *  * Example:
 *  *
 *  * const a = 1;
 *  * when(
 *  *     If(a === 1, () => { // do something }),
 *  *     If(a === 2, () => { // do something else }),
 *  *     () => { // do something default }
 *  *     //or Else(() => { // do something default })
 *  * )
 *  *
 *  * @returns The `WhenCase` object that represents the `when` statement.
 *  * @param val
 *  * @param cond
 *  */
export function when<T = undefined, R = any>(
    ...cond: Cond<T, R>[]
): R;

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
 * @param valOrCond
 * @param cond
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