import {Condition, WhenCase} from "./index";

/**
 * A conditional type that represents a function that returns a `Condition` based on a result.
 *
 * @typeparam T - The type of the result.
 * @typeparam R - The type of the condition.
 */
export type Cond<T, R> =
// If R extends a function that accepts an unknown result and returns a `Condition`,
// then R itself is the correct type.
    R extends ((result?: unknown) => Condition) ? R : ((result?: R) => Condition<T, R>) |
        // If R extends a function that accepts a known result and returns a `Condition`,
        // then R itself is the correct type.
        (R extends ((result: unknown) => Condition) ? R :
            // If R extends a function that accepts a known result and returns a `Condition`,
            // then R itself is the correct type.
            ((result: R) => Condition<T, R>) |
            // If R extends a function that doesn't accept any parameters and returns a `Condition`,
            // then R itself is the correct type.
            (R extends (() => Condition) ? R : (() => Condition<T, R>)) |
            // If R is already a `Condition`, then it is the correct type.
            (R extends Condition ? R : Condition<T, R>) |
            // If R is a function that doesn't accept any parameters and returns any type,
            // then R itself is the correct type.
            (R extends () => any ? R : (() => R))
            );

/**
 * Represents a type that conditionally extracts the return type of a function or keeps the original type.
 * @template T - The type to conditionally extract the return type.
 * @typedef {T extends () => infer R ? R : T} ConditionalResult
 */

// @Example Usage:
// type A = () => number;
// type B = string;
// type C = ConditionalResult<A>; // C is inferred as number
// type D = ConditionalResult<B>; // D is inferred as string
type ConditionalResult<T> = T extends () => infer R ? R : T;

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
export function when<T = undefined, R = any>(val: T): ConditionalResult<R>;

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
export function when<T = undefined, R = any>(
    ...cond: Cond<T, R>[]
): ConditionalResult<R>;

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
): ConditionalResult<R> {
    if (valOrCond === undefined) {
        return undefined as ConditionalResult<R>;
    }
    if ([valOrCond, ...cond].every(arg => arg instanceof Condition || typeof arg === 'function')) { // 检查是否为条件表达式
        return new WhenCase<T>(undefined as unknown as T).whenCase(...[valOrCond, ...cond] as Cond<T, R>[]) as ConditionalResult<R>;
    } else {
        return function (...args2: Cond<T, R>[]) {
            return new WhenCase<T>(valOrCond as T).whenCase<R>(...args2);
        } as ConditionalResult<R>;
    }
}