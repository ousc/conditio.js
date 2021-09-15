import { CaseBuilder } from './CaseBuilder';
export declare const Is: (value?: string, operation?: any) => CaseBuilder;
export declare const Case: (someCase?: boolean, operation?: any) => CaseBuilder;
export declare const In: (...value: any[]) => CaseBuilder;
export declare const InRange: (start: number, end: number, operation?: any) => CaseBuilder;
export declare const Match: (regexp?: boolean, operation?: null) => CaseBuilder;
export declare const Default: (operation?: null) => CaseBuilder;
export declare const $when: (...args: any) => void;
