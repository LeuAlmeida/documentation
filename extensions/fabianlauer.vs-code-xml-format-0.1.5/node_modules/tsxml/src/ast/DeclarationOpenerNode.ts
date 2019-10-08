import {Node} from './Node';
import {IAttribute} from './IAttribute';
import {IStringificationParams} from './IStringificationParams';


type ISystemLiteralAndAttribtueOrder = Array<string | number>;


export class DeclarationOpenerNode extends Node {
	public getNumberOfSystemLiterals(): number {
		return this.systemLiterals.length;
	}
	
	
	public getIndexOfSystemLiteral(literal: string): number {
		return this.systemLiterals.indexOf(literal);
	}
	
	
	public getSystemLiteralAtIndex(literalIndex: number): string {
		return this.systemLiterals[literalIndex];
	}
	
	
	public getAllSystemLiterals(): string[] {
		return [].concat(this.systemLiterals);
	}
	
	
	public hasSystemLiteral(literal: string): boolean {
		return this.getIndexOfSystemLiteral(literal) !== -1;
	}
	
	
	/**
	 * @chainable
	 */
	public insertIntoSystemLiteralList(literal: string, index: number) {
		this.appendSystemLiteralIndexToOrderList(index);
		this.systemLiterals.splice(index, 0, literal);
		return this;
	}
	
	
	/**
	 * @chainable
	 */
	public prependToSystemLiteralList(literal: string) {
		this.insertIntoSystemLiteralList(literal, 0);
		return this;
	}
	
	
	/**
	 * @chainable
	 */
	public appendToSystemLiteralList(literal: string) {
		this.insertIntoSystemLiteralList(literal, this.getNumberOfSystemLiterals());
		return this;
	}
	
	
	/**
	 * @chainable
	 */
	public removeSystemLiteralAtIndex(index: number) {
		this.removeSystemLiteralIndexFromOrderList(index);
		this.systemLiterals.splice(index, 1);
		return this;
	}
	
	
	/**
	 * @chainable
	 */
	public removeSystemLiteral(literal: string) {
		let index = this.getIndexOfSystemLiteral(literal);
		while (index !== -1) {
			this.systemLiterals.splice(index, 1);
			index = this.getIndexOfSystemLiteral(literal);
		}
		return this;
	}
	
	
	/**
	 * @chainable
	 * @override
	 */
	public setAttribute<TValue>(attrName: string, value: IAttribute<TValue>, namespaceName?: string) {
		this.appendAttributeToOrderList(Node.joinAttributeNameWithNamespacePrefix(attrName, namespaceName));
		super.setAttribute<TValue>(attrName, value, namespaceName);
		return this;
	}
	
	
	/**
	 * @chainable
	 * @override
	 */
	public removeAttribute(attrName: string, namespaceName?: string) {
		this.removeAttributeFromOrderList(Node.joinAttributeNameWithNamespacePrefix(attrName, namespaceName));
		super.removeAttribute(attrName, namespaceName);
		return this;
	}
	
	
	public isSystemLiteralListIdenticalTo(otherNode: DeclarationOpenerNode): boolean {
		if (this.systemLiterals.length !== otherNode.systemLiterals.length) {
			return false;
		}
		for (let i = 0; i < this.systemLiterals.length; i++) {
			if (this.systemLiterals[i] !== otherNode.systemLiterals[i]) {
				return false;
			}
		}
		return true;
	}
	
	
	/**
	 * Checks whether a node is identical to another node by comparing tag names, attribute names and values and content.
	 * @override
	 */
	public isIdenticalTo(otherNode: DeclarationOpenerNode): boolean {
		return super.isIdenticalTo(otherNode) && this.isSystemLiteralListIdenticalTo(otherNode);
	}
	
	
	/**
	 * @override
	 */
	protected stringify(params: IStringificationParams, nodeIndentDepth?: number): string {
		nodeIndentDepth = Math.max(nodeIndentDepth || 0, 0);
		return `${Node.generateIndentString(params.indentChar, nodeIndentDepth)}<!${this.tagName}${this.stringifyAttributesAndSystemLiterals(params, nodeIndentDepth)}>${params.newlineChar}`;
	}
	
	
	protected stringifyAttributesAndSystemLiterals(params: IStringificationParams, nodeIndentDepth?: number): string {
		return this.literalAndAttrOrder.map<string>(attrNameOrLiteralIndex => {
			if (typeof attrNameOrLiteralIndex === 'string') {
				return this.stringifyAttribute(attrNameOrLiteralIndex, this.getAttribute(attrNameOrLiteralIndex));
			} else {
				return ` "${this.getSystemLiteralAtIndex(attrNameOrLiteralIndex)}"`;
			}
		}).join('');
	}
	
	
	private appendSystemLiteralIndexToOrderList(literalIndex: number): void {
		this.removeSystemLiteralIndexFromOrderList(literalIndex);
		this.literalAndAttrOrder.push(literalIndex);
	}
	
	
	private removeSystemLiteralIndexFromOrderList(literalIndex: number): void {
		const index = this.literalAndAttrOrder.indexOf(literalIndex);
		if (index !== -1) {
			this.literalAndAttrOrder.splice(index, 1);
		}
	}
	
	
	private appendAttributeToOrderList(attrNameWithNamespace: string): void {
		this.removeAttributeFromOrderList(attrNameWithNamespace);
		this.literalAndAttrOrder.push(attrNameWithNamespace);
	}
	
	
	private removeAttributeFromOrderList(attrNameWithNamespace: string): void {
		const index = this.literalAndAttrOrder.indexOf(attrNameWithNamespace);
		if (index !== -1) {
			this.literalAndAttrOrder.splice(index, 1);
		}
	}
	
	
	private systemLiterals: string[] = [];
	
	
	private literalAndAttrOrder: ISystemLiteralAndAttribtueOrder = [];
}