"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.When = exports.when = exports.Else = exports.Match = exports.InRange = exports.In = exports.Case = exports.Is = void 0;
var CaseBuilder_1 = require("./CaseBuilder");
var Is = function (value, operation) {
    if (value === void 0) { value = CaseBuilder_1.__NO_INPUT; }
    if (operation === void 0) { operation = null; }
    return new CaseBuilder_1.CaseBuilder({ type: 'IS', value: value, operation: [operation] });
};
exports.Is = Is;
var Case = function (someCase, operation) {
    if (someCase === void 0) { someCase = false; }
    if (operation === void 0) { operation = null; }
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
    if (typeof value[value.length - 1] === 'function') {
        operation = value[value.length - 1];
        value = value.slice(0, value.length - 1);
    }
    return new CaseBuilder_1.CaseBuilder({ type: 'IN', value: value, operation: [operation] })._activate();
};
exports.In = In;
var InRange = function (start, end, operation) {
    if (operation === void 0) { operation = null; }
    var length = end - start + 1;
    var step = start - 1;
    var range = Array.apply(null, new Array(length)).map(function (v, i) {
        step++;
        return step;
    });
    return exports.In.apply(void 0, __spreadArray(__spreadArray([], range, true), [operation], false).filter(function (o) { return o !== null; }))._activate();
};
exports.InRange = InRange;
var Match = function (regexp, operation) {
    if (regexp === void 0) { regexp = false; }
    if (operation === void 0) { operation = null; }
    return new CaseBuilder_1.CaseBuilder({ type: 'MATCH', value: regexp, operation: [operation] });
};
exports.Match = Match;
var Else = function (operation) {
    if (operation === void 0) { operation = null; }
    return new CaseBuilder_1.CaseBuilder({ isElse: true, operation: [operation] });
};
exports.Else = Else;
var when = function () {
    var _a, _b, _c, _d, _e;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var res = [];
    if (!!args[0] && args[0] instanceof CaseBuilder_1.CaseBuilder) { // 是否为Case模式
        res = (_b = (_a = args.find(function (_case) { return _case._validate(true); })) === null || _a === void 0 ? void 0 : _a._activate()) === null || _b === void 0 ? void 0 : _b._execute();
    }
    else {
        res = (_d = (_c = args
            .slice(1, args.length)
            .find(function (_case) { return _case._validate(false, args[0]); })) === null || _c === void 0 ? void 0 : _c._activate()) === null || _d === void 0 ? void 0 : _d._execute();
    }
    return ((_e = res === null || res === void 0 ? void 0 : res.filter(function (k) { return k != undefined; })) === null || _e === void 0 ? void 0 : _e.length) == 1 ? res[0] : res;
};
exports.when = when;
exports.When = exports.when;
