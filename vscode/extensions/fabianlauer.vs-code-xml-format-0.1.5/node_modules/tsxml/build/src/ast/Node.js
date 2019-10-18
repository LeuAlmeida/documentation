"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NodeFlags_1 = require("../parser/NodeFlags");
/**
 * Base class for all nodes.
 */
class Node {
    constructor() {
        this.parserFlags = NodeFlags_1.NodeFlags.None;
        this.attrList = {};
        this.applyAttributePropertyBindings();
    }
    /**
     * The default formatting options for stringification.
     */
    static get defaultStringificationParams() {
        return {
            attrParen: '"',
            indentChar: '\t',
            newlineChar: '\n'
        };
    }
    get parentNode() {
        return this._parentNode;
    }
    getAllAttributeNames() {
        return Object.keys(this.attrList);
    }
    getNumberOfAttributes() {
        return this.getAllAttributeNames().length;
    }
    hasAttribute(attrName) {
        return this.getAllAttributeNames().indexOf(attrName) !== -1;
    }
    getAttribute(attrName, namespaceName) {
        if (typeof this.attrList !== 'object' || this.attrList === null) {
            return undefined;
        }
        attrName = Node.joinAttributeNameWithNamespacePrefix(attrName, namespaceName);
        return this.attrList[attrName];
    }
    /**
     * @chainable
     */
    setAttribute(attrName, value, namespaceName) {
        attrName = Node.joinAttributeNameWithNamespacePrefix(attrName, namespaceName);
        this.attrList = this.attrList || {};
        this.attrList[attrName] = value;
        return this;
    }
    /**
     * @chainable
     */
    removeAttribute(attrName, namespaceName) {
        attrName = Node.joinAttributeNameWithNamespacePrefix(attrName, namespaceName);
        delete this.attrList[attrName];
        return this;
    }
    toFormattedString(stringificationParams) {
        if (typeof stringificationParams === 'object' && stringificationParams !== null) {
            stringificationParams = Node.mergeObjects(Node.defaultStringificationParams, stringificationParams);
        }
        else {
            stringificationParams = Node.defaultStringificationParams;
        }
        return this.stringify(stringificationParams);
    }
    toString() {
        return this.stringify({
            indentChar: '',
            newlineChar: '',
            attrParen: '"'
        });
    }
    isTagNameAndNamespaceIdenticalTo(otherNode) {
        return this.namespacePrefix === otherNode.namespacePrefix &&
            this.tagName === otherNode.tagName;
    }
    isAttributeListIdenticalTo(otherNode) {
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
    isIdenticalTo(otherNode) {
        return this.constructor === otherNode.constructor && this.isTagNameAndNamespaceIdenticalTo(otherNode) && this.isAttributeListIdenticalTo(otherNode);
    }
    /**
     * Decorator.
     */
    static attributePropertyBinding(attributeName) {
        return (target, propertyName) => {
            target.addAttributeProxyProperty(propertyName, attributeName);
        };
    }
    getBoundAttributeNameForProperty(propertyName) {
        if (typeof this.attrPropertyBindings !== 'object' || this.attrPropertyBindings === null) {
            return undefined;
        }
        return this.attrPropertyBindings[propertyName];
    }
    getBoundPropertyNamesForAttribute(attributeName) {
        const propertyNames = [];
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
    static joinAttributeNameWithNamespacePrefix(attrName, namespaceName) {
        if (typeof namespaceName !== 'undefined') {
            attrName = namespaceName + ':' + attrName;
        }
        return attrName;
    }
    static changeParentNode(childNode, newParentNode) {
        childNode._parentNode = newParentNode;
    }
    static removeParentNode(childNode) {
        childNode._parentNode = undefined;
    }
    static generateIndentString(indentChar, indentDepth) {
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
    stringify(params, nodeIndentDepth) {
        nodeIndentDepth = Math.max(nodeIndentDepth || 0, 0);
        return `${Node.generateIndentString(params.indentChar, nodeIndentDepth)}<${this.tagName}${this.stringifyAttributes(nodeIndentDepth)} />${params.newlineChar}`;
    }
    stringifyAttributes(nodeIndentDepth) {
        var attrString = '';
        for (let attrName in this.attrList) {
            attrString += this.stringifyAttribute(attrName, this.attrList[attrName]);
        }
        return attrString;
    }
    stringifyAttribute(attrName, attrValue) {
        if (typeof attrValue !== 'undefined') {
            return ` ${attrName}="${attrValue}"`;
        }
        else {
            return ` ${attrName}`;
        }
    }
    static mergeObjects(baseObject, overlayObject) {
        for (let key in overlayObject) {
            baseObject[key] = overlayObject[key];
        }
        return baseObject;
    }
    addAttributeProxyProperty(propertyName, attrName) {
        this.attrPropertyBindings = this.attrPropertyBindings || {};
        this.attrPropertyBindings[propertyName] = attrName;
    }
    applyAttributePropertyBindings() {
        if (typeof this.attrPropertyBindings !== 'object' || this.attrPropertyBindings === null) {
            return;
        }
        for (let propertyName in this.attrPropertyBindings) {
            this.applyAttributePropertyBinding(propertyName, this.attrPropertyBindings[propertyName]);
        }
    }
    applyAttributePropertyBinding(propertyName, attributeName) {
        const value = this[propertyName];
        Object.defineProperty(this, propertyName, {
            get: () => this.getAttribute(attributeName),
            set: (newValue) => this.setAttribute(attributeName, newValue)
        });
        this.setAttribute(attributeName, value);
    }
}
exports.Node = Node;
