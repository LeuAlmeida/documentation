"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SyntaxErrorCode_1 = require("./SyntaxErrorCode");
class SyntaxError extends Error {
    constructor(errorCode, line, column, source, message) {
        super(message);
        this.errorCode = errorCode;
        this.line = line;
        this.column = column;
        this.source = source;
        this.source = this.source || '';
    }
    static getSyntaxErrorCodeName(errorCode) {
        return SyntaxErrorCode_1.SyntaxErrorCode[errorCode];
    }
    getMessage() {
        return this.message;
    }
    getErrorCode() {
        return this.errorCode;
    }
    getErrorName() {
        return SyntaxError.getSyntaxErrorCodeName(this.getErrorCode());
    }
    getLine() {
        return this.line;
    }
    getColumn() {
        return this.column;
    }
    toString() {
        return `syntax error [${this.getErrorCode()} ${this.getErrorName()}] at token '${this.getTokenAt(this.line, this.column)}' ${this.getLine()}, ${this.getColumn()}: ${this.getMessage()}`;
    }
    getTokenAt(line, column) {
        const sourceLine = this.source.split(/\n/)[line - 1];
        if (typeof sourceLine !== 'string') {
            return '';
        }
        return sourceLine.split('')[column - 1];
    }
}
exports.SyntaxError = SyntaxError;
