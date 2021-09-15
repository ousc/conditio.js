import {__NO_INPUT, CaseBuilder} from './CaseBuilder'

export const Is = function (value = __NO_INPUT, operation: any = null) {
    if (value == null || typeof value == 'function') {
        console.warn("\"Is\" expression requires a value passed in!");
    }
    if (!!operation && typeof operation != 'function') {
        console.warn("\"Is\" expression requires only one value passed in!");
    }
    return new CaseBuilder({type: 'IS', value: value, operation: [operation]});
}

export const Case = function (someCase = false, operation: any = null) {
    if (someCase == null || typeof someCase == 'function') {
        console.warn("\"Case\" expression requires a case passed in!");
    }
    if (!!operation && typeof operation != 'function') {
        console.warn("\"Case\" expression requires only one case variable passed in!");
    }
    return new CaseBuilder({
        type: 'CASE', value: someCase, operation: [operation]
    })
};

export const In = function (...value: any[]) {
    let operation = null;
    if (value.length === 0 || typeof value[0] == 'function') {
        console.warn("\"In\" expression requires at least one parameter passed in!");
    }
    if (typeof value[value.length - 1] === 'function') {
        operation = value[value.length - 1];
        value = value.slice(0, value.length - 1);
    }
    return new CaseBuilder({type: 'IN', value: value, operation: [operation]});
}

export const InRange = (start: number, end: number, operation: any = null) => {
    var length = end - start + 1;
    var step = start - 1;
    let range = Array.apply(null, new Array(10)).map(function (v, i) {
        step++;
        return step;
    });
    return In(...[range, operation].filter(o => o !== null))
}

export const Match = function (regexp = false, operation = null) {
    if (regexp == null || typeof regexp == 'function') {
        console.warn("\"Match\" expression requires a regexp variable passed in!");
    }
    if (!!operation && typeof operation != 'function') {
        console.warn("\"Match\" expression requires only one regexp variable passed in!");
    }
    return new CaseBuilder({type: 'MATCH', value: regexp, operation: [operation]})
}

export const Default = function (operation = null) {
    if (!!operation && typeof operation != 'function') {
        console.warn("\"Default\" expression requires function variable passed in!");
    }
    return new CaseBuilder({isDefault: true, operation: [operation]});
}

export const when = function (...args: any) {
    if (!!args[0] && args[0] instanceof CaseBuilder) { // 是否为Case模式
        args.find((_case: CaseBuilder) => _case._validate(true))
            ._activate()
            ._execute();
    } else {
        args
            .slice(1, args.length)
            .find((_case: CaseBuilder) => _case._validate(false, args[0]))
            ._activate()
            ._execute();
    }
}

export const When = when;
