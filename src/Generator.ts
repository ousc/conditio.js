import {__NO_INPUT, CaseBuilder} from './CaseBuilder'

export const Is = function (value = __NO_INPUT, operation: any = null) {
    return new CaseBuilder({type: 'IS', value: value, operation: [operation]});
}

export const Case = function (condition = false, operation: any = null) {
    return new CaseBuilder({
        type: 'CASE', value: condition, operation: [operation]
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

export const InRange = (start: number, end: number, operation: any = null) => {
    var length = end - start + 1;
    var step = start - 1;
    let range = Array.apply(null, new Array(length)).map(function (v, i) {
        step++;
        return step;
    });
    return In(...[...range, operation].filter(o => o !== null))._activate();
}

export const NotInRange = (start: number, end: number, operation: any = null) => {
    var length = end - start + 1;
    var step = start - 1;
    let range = Array.apply(null, new Array(length)).map(function (v, i) {
        step++;
        return step;
    });
    return NotIn(...[...range, operation].filter(o => o !== null))._activate();
}

export const Match = function (regexp = false, operation = null) {
    return new CaseBuilder({type: 'MATCH', value: regexp, operation: [operation]})
}

export const NotMatch = function (regexp = false, operation = null) {
    return new CaseBuilder({type: 'NOTMATCH', value: regexp, operation: [operation]})
}

export const Else = function (operation = null) {
    return new CaseBuilder({type: 'ELSE', operation: [operation]});
}

export const when = function (...args: any) {
    let res: any[];
    if (!!args[0] && args[0] instanceof CaseBuilder) { // 是否为Case模式
        res = args.find((_case: CaseBuilder) => _case._validate(true))
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
