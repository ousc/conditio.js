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
exports.CaseBuilder = exports.__NO_INPUT = void 0;
exports.__NO_INPUT = '_______NOTHING';
var CaseBuilder = /** @class */ (function () {
    function CaseBuilder(cb) {
        this.type = 'CASE';
        this.value = null;
        this.operations = [];
        this.default = false;
        this.activated = false;
        var type = cb.type, value = cb.value, operation = cb.operation, isElse = cb.isElse;
        this.type = type;
        this.value = value;
        this.operations = __spreadArray([], operation, true).filter(function (fn) { return !!fn; });
        this.default = isElse;
        return this;
    }
    /**
     *
     * @Method : then
     * @Description : Add an execution event for Case
     * @return : CaseBuilder
     * @author : OUSC
     * @CreateDate : 2021-09-15 星期三 12:23:09
     *
     */
    CaseBuilder.prototype.then = function (operation) {
        this.operations = __spreadArray(__spreadArray([], this.operations, true), [operation], false);
        return this;
    };
    /**
     *
     * @Method : _execute
     * @Description : Execute all events to da
     * @return : void
     * @author : OUSC
     * @CreateDate : 2021-09-15 星期三 14:02:15
     *
     */
    CaseBuilder.prototype._execute = function () {
        var res = [];
        this.operations.forEach(function (o, index) {
            if (typeof o == 'function') {
                res = __spreadArray(__spreadArray([], res, true), [o(res[index - 1] || null)], false);
            }
            else {
                res = __spreadArray(__spreadArray([], res, true), [o], false);
            }
        });
        return res;
    };
    /**
     *
     * @Method : _activate
     * @Description : Activate the case. Case can only be executed after activation
     * @return : CaseBuilder
     * @author : OUSC
     * @CreateDate : 2021-09-15 星期三 14:35:12
     *
     */
    CaseBuilder.prototype._activate = function () {
        var _a;
        if (this.type === 'IN' && this.operations.length === 0 && ((_a = this.value) === null || _a === void 0 ? void 0 : _a.length) > 1) {
            this.operations = [this.value[this.value.length - 1]];
            this.value = this.value.slice(0, this.value.length - 1);
        }
        this.activated = true;
        return this;
    };
    /**
     *
     * @Method : _validate
     * @Description : Judge whether the condition is true
     * @return : boolean
     * @author : OUSC
     * @CreateDate : 2021-09-15 星期三 14:15:21
     *
     */
    CaseBuilder.prototype._validate = function (caseMode, value) {
        if (value === void 0) { value = null; }
        return (((this.type === 'CASE' && !!this.value && this.value !== exports.__NO_INPUT) || this.default) ||
            (!caseMode && ((this.type === 'IS' && this.value === value) || this.default)) ||
            (!caseMode && ((this.type === 'IN' && this.value.includes(value)) || this.default)) ||
            (!caseMode && ((this.type === 'MATCH' && this.value.test(value)) || this.default)));
    };
    return CaseBuilder;
}());
exports.CaseBuilder = CaseBuilder;
