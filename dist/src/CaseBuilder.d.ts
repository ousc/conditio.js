export declare const __NO_INPUT = "_______NOTHING";
export declare class CaseBuilder {
    private type;
    private value;
    private operations;
    private default;
    private activated;
    constructor(cb: any);
    /**
     *
     * @Method : then
     * @Description : Add an execution event for Case
     * @return : CaseBuilder
     * @author : OUSC
     * @CreateDate : 2021-09-15 星期三 12:23:09
     *
     */
    then(operation: any): this;
    /**
     *
     * @Method : _execute
     * @Description : Execute all events to da
     * @return : void
     * @author : OUSC
     * @CreateDate : 2021-09-15 星期三 14:02:15
     *
     */
    private _execute;
    /**
     *
     * @Method : _activate
     * @Description : Activate the case. Case can only be executed after activation
     * @return : CaseBuilder
     * @author : OUSC
     * @CreateDate : 2021-09-15 星期三 14:35:12
     *
     */
    private _activate;
    /**
     *
     * @Method : _validate
     * @Description : Judge whether the condition is true
     * @return : boolean
     * @author : Ousc
     * @CreateDate : 2021-09-15 星期三 14:15:21
     *
     */
    _validate(caseMode: boolean, value?: any): any;
}
