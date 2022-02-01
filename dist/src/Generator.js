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
exports.When = exports.when = exports.Else = exports.NotMatch = exports.Match = exports.NotInRange = exports.InRange = exports.NotIn = exports.In = exports.Case = exports.BelongTo = exports.IsNaN = exports.IsUndefined = exports.IsNull = exports.Not = exports.Is = void 0;
var CaseBuilder_1 = require("./CaseBuilder");
var Is = function (value, then) {
    if (value === void 0) { value = CaseBuilder_1.__NO_INPUT; }
    if (then === void 0) { then = null; }
    return new CaseBuilder_1.CaseBuilder({ type: 'Is', value: value, operation: [then] });
};
exports.Is = Is;
var Not = function (value, then) {
    if (value === void 0) { value = CaseBuilder_1.__NO_INPUT; }
    if (then === void 0) { then = null; }
    return new CaseBuilder_1.CaseBuilder({ type: 'Not', value: value, operation: [then] });
};
exports.Not = Not;
var IsNull = function (then) {
    if (then === void 0) { then = null; }
    return new CaseBuilder_1.CaseBuilder({ type: 'Is', value: null, operation: [then] });
};
exports.IsNull = IsNull;
var IsUndefined = function (then) {
    if (then === void 0) { then = null; }
    return new CaseBuilder_1.CaseBuilder({ type: 'Is', value: undefined, operation: [then] });
};
exports.IsUndefined = IsUndefined;
var IsNaN = function (then) {
    if (then === void 0) { then = null; }
    return new CaseBuilder_1.CaseBuilder({ type: 'IsNaN', operation: [then] });
};
exports.IsNaN = IsNaN;
var BelongTo = function (type, then) {
    if (then === void 0) { then = null; }
    return new CaseBuilder_1.CaseBuilder({ type: 'BelongTo', value: type, operation: [then] });
};
exports.BelongTo = BelongTo;
var Case = function (condition, then) {
    if (condition === void 0) { condition = false; }
    if (then === void 0) { then = null; }
    return new CaseBuilder_1.CaseBuilder({
        type: 'Case', value: condition, operation: [then]
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
    return new CaseBuilder_1.CaseBuilder({ type: 'In', value: value, operation: [operation] })._activate();
};
exports.In = In;
var NotIn = function () {
    var value = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        value[_i] = arguments[_i];
    }
    var operation = null;
    if (typeof value[value.length - 1] === 'function') {
        operation = value[value.length - 1];
        value = value.slice(0, value.length - 1);
    }
    return new CaseBuilder_1.CaseBuilder({ type: 'NotIn', value: value, operation: [operation] })._activate();
};
exports.NotIn = NotIn;
var InRange = function (start, end, then) {
    if (then === void 0) { then = null; }
    var length = end - start + 1;
    var step = start - 1;
    var range = Array.apply(null, new Array(length)).map(function (v, i) {
        step++;
        return step;
    });
    return exports.In.apply(void 0, __spreadArray(__spreadArray([], range, true), [then], false).filter(function (o) { return o !== null; }))._activate();
};
exports.InRange = InRange;
var NotInRange = function (start, end, then) {
    if (then === void 0) { then = null; }
    var length = end - start + 1;
    var step = start - 1;
    var range = Array.apply(null, new Array(length)).map(function (v, i) {
        step++;
        return step;
    });
    return exports.NotIn.apply(void 0, __spreadArray(__spreadArray([], range, true), [then], false).filter(function (o) { return o !== null; }))._activate();
};
exports.NotInRange = NotInRange;
var Match = function (regexp, then) {
    if (regexp === void 0) { regexp = false; }
    if (then === void 0) { then = null; }
    return new CaseBuilder_1.CaseBuilder({ type: 'Match', value: regexp, operation: [then] });
};
exports.Match = Match;
var NotMatch = function (regexp, then) {
    if (regexp === void 0) { regexp = false; }
    if (then === void 0) { then = null; }
    return new CaseBuilder_1.CaseBuilder({ type: 'NotMatch', value: regexp, operation: [then] });
};
exports.NotMatch = NotMatch;
var Else = function (then) {
    if (then === void 0) { then = null; }
    return new CaseBuilder_1.CaseBuilder({ type: 'Else', operation: [then] });
};
exports.Else = Else;
var when = function () {
    var _a, _b, _c, _d;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var res;
    if (args.length > 0 && args[0] instanceof CaseBuilder_1.CaseBuilder) { // 是否为Case模式
        res = (_b = (_a = args.find(function (_case) { return _case._validate(true, undefined); })) === null || _a === void 0 ? void 0 : _a._activate()) === null || _b === void 0 ? void 0 : _b._execute();
    }
    else {
        res = (_d = (_c = args
            .slice(1, args.length)
            .find(function (_case) { return _case._validate(false, args[0]); })) === null || _c === void 0 ? void 0 : _c._activate()) === null || _d === void 0 ? void 0 : _d._execute();
    }
    return res ? res[res.length - 1] : res;
};
exports.when = when;
exports.When = exports.when;
