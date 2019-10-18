export declare class AssertionResult {
    private _unitTestID;
    private _successful;
    private _description;
    constructor(_unitTestID: number, _successful: boolean, _description: string);
    readonly unitTestID: number;
    readonly successful: boolean;
    readonly description: string;
}
