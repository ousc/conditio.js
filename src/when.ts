import {Condition, WhenCase} from "./index";

/**
 * A conditional type that represents a function that returns a `Condition` based on a result.
 *
 * @typeparam T - The type of the result.
 * @typeparam R - The type of the condition.
 */
export type Cond<T, R> =
    Condition<T, R> | (() => Condition<T, R>) | (() => R) | ((result: (() => R) | R) => Condition<T, R>);
    ;

/**
 * Creates a new `WhenCase` object that represents a `when` statement.
 *
 * @example
 *
 * const v = 1;
 * const result = when(a)(
 *        Is(1, 'v is 1'),
 *        In(1, 2, 3, 'v is in [1, 2, 3]'),
 *        // or In([1, 2, 3], 'v is in [1, 2, 3]'),
 *        Matches(/^[A-Z]/, 'v starts with uppercase'),
 *        Between(1, 10, 'v is between 1 and 10'),
 *        BelongTo('number', 'v is a number'),
 *        If(a > 1, 'v is greater than 1'),
 *        IsNaN('v is NaN'),
 *        Else('no condition is matched')
 *        //or () => 'no condition is matched'
 *    )
 *
 * @returns The `WhenCase` object that represents the `when` statement.
 * @param val
 */
export function when<T = any, R = any>(val: T): R;

/**
 *  Creates a new `WhenCase` object that represents a `when` statement.
 *
 * @example
 *
 *  const v = 1;
 *  const result = when(
 *     If(v === 1, () => { // do something }),
 *     If(v === 2, () => { // do something else }),
 *     () => { // do something default }
 *     //or Else(() => { // do something default })
 *  )
 *
 * @returns The `WhenCase` object that represents the `when` statement.
 *  @param cond
 */
export function when<T = any, R = any>(
    ...cond: Cond<T, R>[]
): R;

/**
 * Creates a new `WhenCase` object that represents a `when` statement.
 *
 * @example
 *
 * const v = 1;
 * const result =
 *    when(v)(
 *        Is(1, 'v is 1'),
 *        In(1, 2, 3, 'v is in [1, 2, 3]'),
 *        // or In([1, 2, 3], 'v is in [1, 2, 3]'),
 *        Matches(/^[A-Z]/, 'v starts with uppercase'),
 *        Between(1, 10, 'v is between 1 and 10'),
 *        BelongTo('number', 'v is v number'),
 *        If(v > 1, 'v is greater than 1'),
 *        IsNaN('v is NaN'),
 *        Else('no condition is matched')
 *        //or () => 'no condition is matched'
 *    )
 *
 *    or
 *
 *    const result = when(
 *        If(v === 1, () => { // do something }),
 *        If(v === 2, () => { // do something else }),
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
): R {
    if ([valOrCond, ...cond].every(arg => arg instanceof Condition || typeof arg === 'function')) { // 检查是否为条件表达式
        return new WhenCase<T>(undefined as unknown as T).whenCase(...[valOrCond, ...cond] as Cond<T, R>[]) as R;
    } else {
        return function (...args2: (Cond<T, R>)[]) {
            return new WhenCase<T>(valOrCond as T).whenCase<R>(...args2);
        } as R;
    }
}