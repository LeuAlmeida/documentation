import {SyntaxErrorCode} from './SyntaxErrorCode';

export class SyntaxError extends Error {
	constructor(private errorCode: SyntaxErrorCode, private line: number, private column: number, private source: string, message: string) {
		super(message);
		this.source = this.source || '';
	}
	
	
	public static getSyntaxErrorCodeName(errorCode: SyntaxErrorCode): string {
		return SyntaxErrorCode[errorCode];
	}
	
	
	public getMessage(): string {
		return this.message;
	}
	
	
	public getErrorCode(): SyntaxErrorCode {
		return this.errorCode;
	}
	
	
	public getErrorName(): string {
		return SyntaxError.getSyntaxErrorCodeName(this.getErrorCode());
	}
	
	
	public getLine(): number {
		return this.line;
	}
	
	
	public getColumn(): number {
		return this.column;
	}
	
	
	public toString(): string {
		return  `syntax error [${this.getErrorCode()} ${this.getErrorName()}] at token '${this.getTokenAt(this.line, this.column)}' ${this.getLine()}, ${this.getColumn()}: ${this.getMessage()}`;
	}
	
	
	private getTokenAt(line: number, column: number): string {
		const sourceLine = this.source.split(/\n/)[line - 1];
		if (typeof sourceLine !== 'string') {
			return '';
		}
		return sourceLine.split('')[column - 1];
	}
}