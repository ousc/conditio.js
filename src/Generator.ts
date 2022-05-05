import {__NO_INPUT, CaseBuilder} from './CaseBuilder'

/**
 * If the input is equal to the value, then execute the operation.
 * @param {any} value - The value to compare against.
 * @param {any} [then=null] - The value to return if the case is true.
 * @returns A CaseBuilder object
 */
export const Is = function (value: any = __NO_INPUT, then: any = null) {
    return new CaseBuilder({type: 'Is', value: value, operation: [then]});
}

/**
 * > The `Not` function is a `CaseBuilder` that returns a `CaseBuilder` with a `type` of `Not`, a `value` of the input, and
 * an `operation` of the input
 * @param {any} value - The value to check against.
 * @param {any} [then=null] - The value to return if the condition is true.
 * @returns A CaseBuilder object
 */
export const Not = function (value: any = __NO_INPUT, then: any = null) {
    return new CaseBuilder({type: 'Not', value: value, operation: [then]});
}

/**
 * > The `IsNull` function returns a `CaseBuilder` object that will return the value of `then` if the value of the
 * `CaseBuilder` object is `null`
 * @param {any} [then=null] - any = null
 * @returns A CaseBuilder object with the following properties:
 *     type: 'Is'
 *     value: null
 *     operation: [then]
 */
export const IsNull = function (then: any = null) {
    return new CaseBuilder({type: 'Is', value: null, operation: [then]});
}

/**
 * > The `IsUndefined` function returns a new `CaseBuilder` object with the `type` property set to `Is`, the `value`
 * property set to `undefined`, and the `operation` property set to an array containing the `then` parameter
 * @param {any} [then=null] - any = null
 * @returns A CaseBuilder object
 */
export const IsUndefined = function (then: any = null) {
    return new CaseBuilder({type: 'Is', value: undefined, operation: [then]});
}

/**
 * `IsNaN` is a function that returns a `CaseBuilder` object with a `type` property of `IsNaN` and an `operation` property
 * of `[then]`
 * @param {any} [then=null] - The value to return if the case is true.
 * @returns A CaseBuilder object
 */
export const IsNaN = function (then: any = null) {
    return new CaseBuilder({type: 'IsNaN', operation: [then]});
}

/**
 * `BelongTo` is a function that takes a type and a then function, and returns a new CaseBuilder object.
 * @param {"object" | "undefined" | "boolean" | "number" | "string" | "array" | "function" | "symbol"} type - The type of
 * the value you want to check.
 * @param {any} [then=null] - any = null
 * @returns A new CaseBuilder object with the type, value, and operation properties.
 */
export const BelongTo = function (type: "object" | "undefined" | "boolean" | "number" | "string" | "array" | "function" | "symbol", then: any = null) {
    return new CaseBuilder({type: 'BelongTo', value: type, operation: [then]});
}

/**
 * > The `Case` function is a function that returns a new `CaseBuilder` object
 * @param [condition=false] - The condition to be evaluated.
 * @param {any} [then=null] - any = null
 * @returns A CaseBuilder object
 */
export const Case = function (condition = false, then: any = null) {
    return new CaseBuilder({
        type: 'Case', value: condition, operation: [then]
    })
};

/**
 * It takes a variable number of arguments, the last of which is a function, and returns a CaseBuilder object
 * @param {any[]} value - The value to be checked.
 * @returns A CaseBuilder object with the type of 'In' and the value of the array passed in.
 */
export const In = function (...value: any[]) {
    let operation = null;
    if (typeof value[value.length - 1] === 'function') {
        operation = value[value.length - 1];
        value = value.slice(0, value.length - 1);
    }
    return new CaseBuilder({type: 'In', value: value, operation: [operation]})._activate();
}

/**
 * It returns a new CaseBuilder object with the type set to 'NotIn' and the value set to the value passed in
 * @param {any[]} value - The value to be compared against.
 * @returns A CaseBuilder object with the type of NotIn, the value of the array, and the operation of the function.
 */
export const NotIn = function (...value: any[]) {
    let operation = null;
    if (typeof value[value.length - 1] === 'function') {
        operation = value[value.length - 1];
        value = value.slice(0, value.length - 1);
    }
    return new CaseBuilder({type: 'NotIn', value: value, operation: [operation]})._activate();
}

/**
 * It returns a function that takes a number and returns true if the number is in the range of start and end.
 * @param {number} start - The starting number of the range.
 * @param {number} end - The end of the range.
 * @param {any} [then=null] - The value to return if the value is in the range.
 * @returns A function that takes a value and returns a boolean.
 */
export const InRange = (start: number, end: number, then: any = null) => {
    var length = end - start + 1;
    var step = start - 1;
    let range = Array.apply(null, new Array(length)).map(function (v, i) {
        step++;
        return step;
    });
    return In(...[...range, then].filter(o => o !== null))._activate();
}

/**
 * It returns a function that returns a boolean value.
 * @param {number} start - The starting number of the range.
 * @param {number} end - The end of the range.
 * @param {any} [then=null] - The value to return if the condition is true.
 * @returns A function that takes a number and returns true if the number is not in the range of start and end.
 */
export const NotInRange = (start: number, end: number, then: any = null) => {
    var length = end - start + 1;
    var step = start - 1;
    let range = Array.apply(null, new Array(length)).map(function (v, i) {
        step++;
        return step;
    });
    return NotIn(...[...range, then].filter(o => o !== null))._activate();
}

/**
 * Match is a function that returns a new CaseBuilder object with a type of 'Match', a value of regexp, and an operation of
 * [then].
 * @param [regexp=false] - The regular expression to match against.
 * @param [then=null] - The function to execute if the case is matched.
 * @returns A CaseBuilder object with the type 'Match' and the value of the regexp.
 */
export const Match = function (regexp = false, then = null) {
    return new CaseBuilder({type: 'Match', value: regexp, operation: [then]})
}

/**
 * > If the value does not match the regular expression, then execute the operation
 * @param [regexp=false] - The regular expression to match against.
 * @param [then=null] - The function to execute if the case is true.
 * @returns A new CaseBuilder object with the type, value, and operation properties.
 */
export const NotMatch = function (regexp = false, then = null) {
    return new CaseBuilder({type: 'NotMatch', value: regexp, operation: [then]})
}

/**
 * `Else` is a function that returns a new `CaseBuilder` object with a `type` of `Else` and an `operation` of `[then]`.
 * @param {any} [then=null] - any = null
 * @returns A CaseBuilder object with the type and operation properties set to the values passed in.
 */
export const Else = function (then: any = null) {
    return new CaseBuilder({type: 'Else', operation: [then]});
}

/**
 * It takes a list of `CaseBuilder`s and returns the result of the first one that matches
 * @param {any} args - The parameters passed in by the user.
 * @returns A function that takes in a variable number of arguments.
 */
export const when = function (...args: any) {
    let res: any[];
    if (args.length > 0 && args[0] instanceof CaseBuilder) { // 是否为Case模式
        res = args.find((_case: CaseBuilder) => _case._validate(true, undefined))
            ?._activate()
            ?._execute();
    } else {
        res = args
            .slice(1, args.length)
            .find((_case: CaseBuilder) => _case._validate(false, args[0]))
            ?._activate()
            ?._execute();
    }
    return res ? res[res.length - 1] : res;
}

export const When = when;
