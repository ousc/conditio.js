export const __NO_INPUT = '_______NOTHING';

export class CaseBuilder {
    private type: string = 'Case'
    private value: any = null;
    private operations: any[] = [];
    private activated: boolean = false;

    /**
     * The constructor function takes a callback function as an argument, and returns an object with the type, value, and
     * operations properties
     * @param {any} cb - any
     * @returns The object itself.
     */
    constructor(cb: any) {
        const {type, value, operation} = cb;
        this.type = type;
        this.value = value;
        this.operations = [...operation].filter(fn => fn !== null && fn !== undefined)
        return this;
    }

    /**
     * The `then` function takes an operation as an argument and adds it to the operations array
     * @param {any} operation - This is the operation that will be executed after the previous operation is completed.
     * @returns A promise
     */
    public then(operation: any) {
        this.operations = [...this.operations, operation];
        return this._activate();
    }

    /**
     * It takes an array of operations, and executes them one by one, passing the result of the previous operation to the
     * next one
     * @returns The result of the last operation.
     */
    private _execute() {
        let res: any[] = [];
        for (const o of this.operations) {
            const index = this.operations.indexOf(o);
            if (typeof o == 'function') {
                res = [...res, o(res[index - 1] || null)];
            } else {
                res = [...res, o];
            }

        }
        return res;
    }

    /**
     * If the filter is activated, return the filter. If the filter is not activated, and the filter is an In or NotIn
     * filter, and the filter has no operations, and the filter has a value with more than one item, then set the
     * operations to the last item in the value array, and set the value to the first items in the value array
     * @returns The object itself.
     */
    _activate() {
        if (this.activated) return this;
        if ((this.type === 'In' || this.type === 'NotIn') && this.operations.length === 0 && this.value?.length > 1) {
            this.operations = [this.value[this.value.length - 1]];
            this.value = this.value.slice(0, this.value.length - 1);
        }
        this.activated = true;
        return this;
    }

    /**
     * > If the type is Else, return true. Otherwise, if the type is Case and the value is not null, return true.
     * Otherwise, if the type is Is and the value is equal to the input value, return true. Otherwise, if the type is Not
     * and the value is not equal to the input value, return true. Otherwise, if the type is In and the value is an array
     * and the input value is in the array, return true. Otherwise, if the type is NotIn and the value is an array and the
     * input value is not in the array, return true. Otherwise, if the type is Match and the value is a regular expression
     * and the input value matches the regular expression, return true. Otherwise, if the type is NotMatch and the value is
     * a regular expression and the input value does not match the regular expression, return true. Otherwise, if the type
     * is IsNaN and the input value is a number and the input value is Na
     * @param {boolean} caseMode - boolean - This is a boolean that tells the function whether or not it's in case mode.
     * @param {any} value - The value to be tested.
     * @returns A boolean value.
     */
    _validate(caseMode: boolean, value: any) {
        return (this.type === 'Else') ||
            (((this.type === 'Case' && !!this.value && this.value !== __NO_INPUT)) ||
                (!caseMode && ((this.type === 'Is' && this.value === value))) ||
                (!caseMode && ((this.type === 'Not' && this.value !== value))) ||
                (!caseMode && ((this.type === 'In' && this.activated && this.value.includes(value)))) ||
                (!caseMode && ((this.type === 'NotIn' && this.activated && !this.value.includes(value)))) ||
                (!caseMode && ((this.type === 'Match' && this.value.test(value)))) ||
                (!caseMode && ((this.type === 'NotMatch' && !this.value.test(value)))) ||
                (!caseMode && ((this.type === 'IsNaN' && typeof value === 'number' && isNaN(value)))) ||
                (!caseMode && ((this.type === 'BelongTo' && typeof value === this.value)))
            )
    }
}
