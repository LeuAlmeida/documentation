import { SyntaxErrorCode } from './SyntaxErrorCode';
export declare class SyntaxError extends Error {
    private errorCode;
    private line;
    private column;
    private source;
    constructor(errorCode: SyntaxErrorCode, line: number, column: number, source: string, message: string);
    static getSyntaxErrorCodeName(errorCode: SyntaxErrorCode): string;
    getMessage(): string;
    getErrorCode(): SyntaxErrorCode;
    getErrorName(): string;
    getLine(): number;
    getColumn(): number;
    toString(): string;
    private getTokenAt(line, column);
}
