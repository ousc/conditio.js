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
 *    when()(
 *        If(a === 1, () => { // do something }),
 *        If(a === 2, () => { // do something else }),
 *        () => { // do something default }
 *        //or Else(() => { // do something default })
 *    )
 *
 * @returns The `WhenCase` object that represents the `when` statement.
 * @param args
 */
export function when<T>(...args: (T | undefined | Condition<T, any> | (() => any))[]) {
    if (args.length === 0) {
        return undefined
    }
    if (args.every(arg => arg instanceof Condition || typeof arg === 'function')) { // 检查是否为条件表达式
        return new WhenCase<T>(undefined).whenCase(...args as (Condition<T, any> | (() => any))[]);
    } else {
        return function (...args2: (Condition<T, any> | (() => any))[]) {
            return new WhenCase<T>(args[0] as (T | undefined))
        };
    }
}