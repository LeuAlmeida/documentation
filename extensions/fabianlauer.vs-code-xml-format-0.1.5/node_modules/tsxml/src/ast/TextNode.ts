import {Node} from './Node';
import {IStringificationParams} from './IStringificationParams';

/**
 * Base class for all nodes that may contain child elements.
 */
export class TextNode extends Node {
	public content: string;
	
	
	public getContentLines(): string[] {
		if (typeof this.content !== 'string' || this.content.length < 1) {
			return [];
		}
		return this.content.trim().split(/\r?\n/);
	}
	
	
	/**
	 * Returns whether the text content contains line breaks.
	 */
	public isContentMultiLine(): boolean {
		return /\r?\n/.test(this.content.trim());
	}
	
	
	public isContentIdenticalTo(otherNode: TextNode): boolean {
		return TextNode.makeContentStringComparable(this.content || '') === TextNode.makeContentStringComparable(otherNode.content || '');
	}
	
	
	/**
	 * Checks whether a node is identical to another node by comparing tag names, attribute names and values and content.
	 */
	public isIdenticalTo(otherNode: TextNode): boolean {
		return super.isIdenticalTo(otherNode) && this.isContentIdenticalTo(otherNode);
	}
	
	
	protected static makeContentStringComparable(contentString: string): string {
		return contentString.trim().replace(/[\t\r\n ]+/g, '').replace(/ +/g, ' ');
	}
	
	
	protected stringify(params: IStringificationParams, nodeIndentDepth?: number): string {
		return this.stringifyContent(params, nodeIndentDepth);
	}
	
	
	protected stringifyContent(params: IStringificationParams, nodeIndentDepth?: number): string {
		if (this.isContentMultiLine()) {
			return this.stringifyMultiLineContent(params, nodeIndentDepth);
		} else {
			return this.stringifySingleLineContent(params, nodeIndentDepth);
		}
	}
	
	
	protected stringifyMultiLineContent(params: IStringificationParams, nodeIndentDepth?: number): string {
		var stringifiedContent = '',
			newlineChar = params.newlineChar;
		if (!/\n/.test(params.newlineChar)) {
			newlineChar = ' ';
		}
		stringifiedContent += this.getContentLines().map<string>(contentLine => {
			return Node.generateIndentString(params.indentChar, nodeIndentDepth) + contentLine.trim();
		}).join(newlineChar);
		if (/\n/.test(params.newlineChar)) {
			return stringifiedContent + params.newlineChar;
		}
		return stringifiedContent;
	}
	
	
	protected stringifySingleLineContent(params: IStringificationParams, nodeIndentDepth?: number): string {
		const formattedContent = (this.content || '').trim().replace(/(\r?\n(\t*))+/g, ' ').trim();
		if (/\n/.test(params.newlineChar)) {
			return Node.generateIndentString(params.indentChar, nodeIndentDepth) + formattedContent + '\n';
		} else {
			return formattedContent;
		}
	}
}