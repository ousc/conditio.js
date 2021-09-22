export const __NO_INPUT = '_______NOTHING';

export class CaseBuilder {
    private type: string = 'CASE'
    private value: any = null;
    private operations: any[] = [];
    private activated: boolean = false;

    constructor(cb: any) {
        const { type, value, operation } = cb;
        this.type = type;
        this.value = value;
        this.operations = [...operation].filter(fn => !!fn)
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
        return this._activate();
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
        let res: any[] = [];
        this.operations.forEach((o, index) => {
            if (typeof o == 'function') {
                res = [...res, o(res[index - 1] || null)];
            } else {
                res = [...res, o];
            }

        });
        return res;
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
    _activate() {
        if (this.type === 'IN' && this.operations.length === 0 && this.value?.length > 1) {
            this.operations = [this.value[this.value.length - 1]];
            this.value = this.value.slice(0, this.value.length - 1);
        }
        this.activated = true;
        return this;
    }

    /**
     *
     * @Method : _validate
     * @Description : Judge whether the condition is true
     * @return : boolean
     * @author : OUSC
     * @CreateDate : 2021-09-15 星期三 14:15:21
     *
     */
    _validate(caseMode: boolean, value: any = null) {
        return (this.type === 'ELSE') ||
            (((this.type === 'CASE' && !!this.value && this.value !== __NO_INPUT)) ||
                (!caseMode && ((this.type === 'IS' && this.value === value))) ||
                (!caseMode && ((this.type === 'IN' && this.activated && this.value.includes(value)))) ||
                (!caseMode && ((this.type === 'MATCH' && this.value.test(value)))))
    }
}
