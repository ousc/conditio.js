"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.$when = exports.Default = exports.Match = exports.InRange = exports.In = exports.Case = exports.Is = void 0;
var CaseBuilder_1 = require("./CaseBuilder");
var Is = function (value, operation) {
    if (value === void 0) { value = CaseBuilder_1.__NO_INPUT; }
    if (operation === void 0) { operation = null; }
    if (value == null || typeof value == 'function') {
        console.warn("\"Is\" expression requires a value passed in!");
    }
    if (!!operation && typeof operation != 'function') {
        console.warn("\"Is\" expression requires only one value passed in!");
    }
    return new CaseBuilder_1.CaseBuilder({ type: 'IS', value: value, operation: [operation] });
};
exports.Is = Is;
var Case = function (someCase, operation) {
    if (someCase === void 0) { someCase = false; }
    if (operation === void 0) { operation = null; }
    if (someCase == null || typeof someCase == 'function') {
        console.warn("\"Case\" expression requires a case passed in!");
    }
    if (!!operation && typeof operation != 'function') {
        console.warn("\"Case\" expression requires only one case variable passed in!");
    }
    return new CaseBuilder_1.CaseBuilder({
        type: 'CASE', value: someCase, operation: [operation]
    });
};
exports.Case = Case;
var In = function () {
    var value = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        value[_i] = arguments[_i];
    }
    var operation = null;
    if (value.length === 0 || typeof value[0] == 'function') {
        console.warn("\"In\" expression requires at least one parameter passed in!");
    }
    if (typeof value[value.length - 1] === 'function') {
        operation = value[value.length - 1];
        value = value.slice(0, value.length - 1);
    }
    return new CaseBuilder_1.CaseBuilder({ type: 'IN', value: value, operation: [operation] });
};
exports.In = In;
var InRange = function (start, end, operation) {
    if (operation === void 0) { operation = null; }
    var length = end - start + 1;
    var step = start - 1;
    var range = Array.apply(null, new Array(10)).map(function (v, i) {
        step++;
        return step;
    });
    return exports.In.apply(void 0, [range, operation].filter(function (o) { return o !== null; }));
};
exports.InRange = InRange;
var Match = function (regexp, operation) {
    if (regexp === void 0) { regexp = false; }
    if (operation === void 0) { operation = null; }
    if (regexp == null || typeof regexp == 'function') {
        console.warn("\"Match\" expression requires a regexp variable passed in!");
    }
    if (!!operation && typeof operation != 'function') {
        console.warn("\"Match\" expression requires only one regexp variable passed in!");
    }
    return new CaseBuilder_1.CaseBuilder({ type: 'MATCH', value: regexp, operation: [operation] });
};
exports.Match = Match;
var Default = function (operation) {
    if (operation === void 0) { operation = null; }
    if (!!operation && typeof operation != 'function') {
        console.warn("\"Default\" expression requires function variable passed in!");
    }
    return new CaseBuilder_1.CaseBuilder({ isDefault: true, operation: [operation] });
};
exports.Default = Default;
var $when = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (!!args[0] && args[0] instanceof CaseBuilder_1.CaseBuilder) { // 是否为Case模式
        args.find(function (_case) { return _case._validate(true); })
            ._activate()
            ._execute();
    }
    else {
        args
            .slice(1, args.length)
            .find(function (_case) { return _case._validate(false, args[0]); })
            ._activate()
            ._execute();
    }
};
exports.$when = $when;
