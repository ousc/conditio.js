export const __NO_INPUT = '_______NOTHING';

export class CaseBuilder {
    private type: string = 'CASE'
    private value: any = null;
    private operations: any[] = [];
    private default: boolean = false;
    private activated: boolean = false;

    constructor(cb: any) {
        const {type, value, operation, isDefault} = cb;
        this.type = type;
        this.value = value;
        this.operations = [...operation].filter(fn => !!fn)
        this.default = isDefault;
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
    public then(operation: any) {
        this.operations = [...this.operations, operation];
        return this;
    }

    /**
     *
     * @Method : _execute
     * @Description : Execute all events to da
     * @return : void
     * @author : OUSC
     * @CreateDate : 2021-09-15 星期三 14:02:15
     *
     */
    private _execute() {
        this.operations.forEach(fn => fn());
    }

    /**
     *
     * @Method : _activate
     * @Description : Activate the case. Case can only be executed after activation
     * @return : CaseBuilder
     * @author : OUSC
     * @CreateDate : 2021-09-15 星期三 14:35:12
     *
     */
    private _activate() {
        this.activated = true;
        return this;
    }

    /**
     *
     * @Method : _validate
     * @Description : Judge whether the condition is true
     * @return : boolean
     * @author : Ousc
     * @CreateDate : 2021-09-15 星期三 14:15:21
     *
     */
    _validate(caseMode: boolean, value: any = null) {
        return (
            ((this.type === 'CASE' && !!this.value && this.value !== __NO_INPUT) || this.default) || // Case语句条件为True或为默认选项则返回真
            (!caseMode && ((this.type === 'IS' && this.value === value) || !!this.default)) || // IS语句值与条件相等或为默认选项则返回真
            (!caseMode && ((this.type === 'IN' && this.value.includes(value)) || !!this.default)) || // In语句值满足条件或为默认选项则返回真
            (!caseMode && ((this.type === 'MATCH' && value.test(this.value)) || !!this.default)) // Match语句条件满足表达式或为默认选项则返回真
        )
    }
}
