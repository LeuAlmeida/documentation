import {IAttribute} from './IAttribute';
import {IStringificationParams} from './IStringificationParams';
import {ContainerNode} from './ContainerNode';
import {NodeFlags} from '../parser/NodeFlags';

/**
 * Base class for all nodes.
 */
export abstract class Node {
	constructor() {
		this.applyAttributePropertyBindings();
	}
	
	
	/**
	 * The default formatting options for stringification.
	 */
	public static get defaultStringificationParams(): IStringificationParams {
		return {
			attrParen: '"',
			indentChar: '\t',
			newlineChar: '\n'
		};
	}
	
	
	public parserFlags: NodeFlags = NodeFlags.None;
	
	
	public namespacePrefix: string;
	
	
	public tagName: string;
	
	
	public get parentNode(): ContainerNode<any> {
		return this._parentNode;
	}
	
	
	public getAllAttributeNames(): string[] {
		return Object.keys(this.attrList);
	}
	
	
	public getNumberOfAttributes(): number {
		return this.getAllAttributeNames().length;
	}
	
	
	public hasAttribute(attrName: string): boolean {
		return this.getAllAttributeNames().indexOf(attrName) !== -1;
	}
	
	
	public getAttribute<TValue>(attrName: string, namespaceName?: string): IAttribute<TValue> {
		if (typeof this.attrList !== 'object' || this.attrList === null) {
			return undefined;
		}
		attrName = Node.joinAttributeNameWithNamespacePrefix(attrName, namespaceName);
		return this.attrList[attrName];
	}
	
	
	/**
	 * @chainable
	 */
	public setAttribute<TValue>(attrName: string, value: IAttribute<TValue>, namespaceName?: string) {
		attrName = Node.joinAttributeNameWithNamespacePrefix(attrName, namespaceName);
		this.attrList = this.attrList || {};
		this.attrList[attrName] = value;
		return this;
	}
	
	
	/**
	 * @chainable
	 */
	public removeAttribute(attrName: string, namespaceName?: string) {
		attrName = Node.joinAttributeNameWithNamespacePrefix(attrName, namespaceName);
		delete this.attrList[attrName];
		return this;
	}
	
	
	public toFormattedString(stringificationParams?: IStringificationParams): string {
		if (typeof stringificationParams === 'object' && stringificationParams !== null) {
			stringificationParams = Node.mergeObjects(Node.defaultStringificationParams, stringificationParams);
		} else {
			stringificationParams = Node.defaultStringificationParams;
		}
		return this.stringify(stringificationParams);
	}
	
	
	public toString(): string {
		return this.stringify({
			indentChar: '',
			newlineChar: '',
			attrParen: '"'
		});
	}
	
	
	public isTagNameAndNamespaceIdenticalTo(otherNode: Node): boolean {
		return this.namespacePrefix === otherNode.namespacePrefix &&
			   this.tagName === otherNode.tagName;
	}
	
	
	public isAttributeListIdenticalTo(otherNode: Node): boolean {
		if (this.getNumberOfAttributes() !== otherNode.getNumberOfAttributes()) {
			return false;
		}
		const indexOfFirstNonIdenticalAttributeName = this.getAllAttributeNames().findIndex(attrName => {
			return this.getAttribute(attrName) !== otherNode.getAttribute(attrName);
		});
		return indexOfFirstNonIdenticalAttributeName === -1;
	}
	
	
	/**
	 * Checks whether a node is identical to another node by comparing tag names, attribute names and values.
	 */
	public isIdenticalTo(otherNode: Node): boolean {
		return this.constructor === otherNode.constructor && this.isTagNameAndNamespaceIdenticalTo(otherNode) && this.isAttributeListIdenticalTo(otherNode);
	}
	
	
	/**
	 * Decorator.
	 */
	public static attributePropertyBinding(attributeName: string) {
		return (target: Node, propertyName: string) => {
			target.addAttributeProxyProperty(propertyName, attributeName);
		};
	}
	
	
	public getBoundAttributeNameForProperty(propertyName: string): string {
		if (typeof this.attrPropertyBindings !== 'object' || this.attrPropertyBindings === null) {
			return undefined;
		}
		return this.attrPropertyBindings[propertyName];
	}
	
	
	public getBoundPropertyNamesForAttribute(attributeName: string): string[] {
		const propertyNames: string[] = [];
		if (typeof this.attrPropertyBindings !== 'object' || this.attrPropertyBindings === null) {
			return propertyNames;
		}
		for (let propertyName in this.attrPropertyBindings) {
			if (this.attrPropertyBindings[propertyName] === attributeName) {
				propertyNames.push(propertyName);
			}
		}
		return propertyNames;
	}
	
	
	protected static joinAttributeNameWithNamespacePrefix(attrName: string, namespaceName: string): string {
		if (typeof namespaceName !== 'undefined') {
			attrName = namespaceName + ':' + attrName;
		}
		return attrName;
	}
	
	
	protected static changeParentNode(childNode: Node, newParentNode: ContainerNode<any>): void {
		childNode._parentNode = newParentNode;
	}
	
	
	protected static removeParentNode(childNode: Node): void {
		childNode._parentNode = undefined;
	}
	
	
	protected static generateIndentString(indentChar: string, indentDepth: number): string {
		indentDepth = Math.max(indentDepth || 0, 0);
		if (indentDepth === 0) {
			return '';
		}
		let indentString = '';
		while (indentDepth-- > 0) {
			indentString += indentChar;
		}
		return indentString;
	}
	
	
	protected stringify(params: IStringificationParams, nodeIndentDepth?: number): string {
		nodeIndentDepth = Math.max(nodeIndentDepth || 0, 0);
		return `${Node.generateIndentString(params.indentChar, nodeIndentDepth)}<${this.tagName}${this.stringifyAttributes(nodeIndentDepth)} />${params.newlineChar}`;
	}
	
	
	protected stringifyAttributes(nodeIndentDepth: number): string {
		var attrString = '';
		for (let attrName in this.attrList) {
			attrString += this.stringifyAttribute(attrName, this.attrList[attrName]);
		}
		return attrString;
	}
	
	
	protected stringifyAttribute(attrName: string, attrValue: any): string {
		if (typeof attrValue !== 'undefined') {
			return ` ${attrName}="${attrValue}"`;
		} else {
			return ` ${attrName}`;
		}
	}
	
	
	private static mergeObjects<TObject>(baseObject: TObject, overlayObject: TObject): TObject {
		for (let key in overlayObject) {
			(<any>baseObject)[key] = (<any>overlayObject)[key];
		}
		return baseObject;
	}
	
	
	private addAttributeProxyProperty(propertyName: string, attrName: string): void {
		this.attrPropertyBindings = this.attrPropertyBindings || {};
		this.attrPropertyBindings[propertyName] = attrName;
	}
	
	
	private applyAttributePropertyBindings(): void {
		if (typeof this.attrPropertyBindings !== 'object' || this.attrPropertyBindings === null) {
			return;
		}
		for (let propertyName in this.attrPropertyBindings) {
			this.applyAttributePropertyBinding(propertyName, this.attrPropertyBindings[propertyName]);
		}
	}
	
	
	private applyAttributePropertyBinding(propertyName: string, attributeName: string): void {
		const value = (<any>this)[propertyName];
		Object.defineProperty(this, propertyName, {
			get: () => this.getAttribute(attributeName),
			set: (newValue: string) => this.setAttribute(attributeName, newValue)
		});
		this.setAttribute(attributeName, value);
	}
	
	
	private attrPropertyBindings: { [propertyName: string]: string; };
	
	
	private _parentNode: ContainerNode<any>;
	
	
	private attrList: { [attrName: string]:  IAttribute<any>; } = { };
}