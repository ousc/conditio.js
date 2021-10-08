import {__NO_INPUT, CaseBuilder} from './CaseBuilder'

export const Is = function (value = __NO_INPUT, then: any = null) {
    return new CaseBuilder({type: 'IS', value: value, operation: [then]});
}

export const Not = function (value = __NO_INPUT, then: any = null) {
    return new CaseBuilder({type: 'NOT', value: value, operation: [then]});
}

export const IsNull = function (then: any = null) {
    return new CaseBuilder({type: 'IS', value: null, operation: [then]});
}

export const IsUndefined = function (then: any = null) {
    return new CaseBuilder({type: 'IS', value: undefined, operation: [then]});
}

export const IsNaN = function (then: any = null) {
    return new CaseBuilder({type: 'ISNAN', operation: [then]});
}

export const BelongTo = function (type: "object" | "undefined" | "boolean" | "number" | "string" | "array" | "function" | "symbol", then: any = null) {
    return new CaseBuilder({type: 'ISTYPE', value: type, operation: [then]});
}

export const Case = function (condition = false, then: any = null) {
    return new CaseBuilder({
        type: 'CASE', value: condition, operation: [then]
    })
};

export const In = function (...value: any[]) {
    let operation = null;
    if (typeof value[value.length - 1] === 'function') {
        operation = value[value.length - 1];
        value = value.slice(0, value.length - 1);
    }
    return new CaseBuilder({type: 'IN', value: value, operation: [operation]})._activate();
}

export const NotIn = function (...value: any[]) {
    let operation = null;
    if (typeof value[value.length - 1] === 'function') {
        operation = value[value.length - 1];
        value = value.slice(0, value.length - 1);
    }
    return new CaseBuilder({type: 'NOTIN', value: value, operation: [operation]})._activate();
}

export const InRange = (start: number, end: number, then: any = null) => {
    var length = end - start + 1;
    var step = start - 1;
    let range = Array.apply(null, new Array(length)).map(function (v, i) {
        step++;
        return step;
    });
    return In(...[...range, then].filter(o => o !== null))._activate();
}

export const NotInRange = (start: number, end: number, then: any = null) => {
    var length = end - start + 1;
    var step = start - 1;
    let range = Array.apply(null, new Array(length)).map(function (v, i) {
        step++;
        return step;
    });
    return NotIn(...[...range, then].filter(o => o !== null))._activate();
}

export const Match = function (regexp = false, then = null) {
    return new CaseBuilder({type: 'MATCH', value: regexp, operation: [then]})
}

export const NotMatch = function (regexp = false, then = null) {
    return new CaseBuilder({type: 'NOTMATCH', value: regexp, operation: [then]})
}

export const Else = function (then = null) {
    return new CaseBuilder({type: 'ELSE', operation: [then]});
}

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
