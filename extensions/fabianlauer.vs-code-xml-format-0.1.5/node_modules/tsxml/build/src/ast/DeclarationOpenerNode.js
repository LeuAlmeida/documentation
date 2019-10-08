"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("./Node");
class DeclarationOpenerNode extends Node_1.Node {
    constructor() {
        super(...arguments);
        this.systemLiterals = [];
        this.literalAndAttrOrder = [];
    }
    getNumberOfSystemLiterals() {
        return this.systemLiterals.length;
    }
    getIndexOfSystemLiteral(literal) {
        return this.systemLiterals.indexOf(literal);
    }
    getSystemLiteralAtIndex(literalIndex) {
        return this.systemLiterals[literalIndex];
    }
    getAllSystemLiterals() {
        return [].concat(this.systemLiterals);
    }
    hasSystemLiteral(literal) {
        return this.getIndexOfSystemLiteral(literal) !== -1;
    }
    /**
     * @chainable
     */
    insertIntoSystemLiteralList(literal, index) {
        this.appendSystemLiteralIndexToOrderList(index);
        this.systemLiterals.splice(index, 0, literal);
        return this;
    }
    /**
     * @chainable
     */
    prependToSystemLiteralList(literal) {
        this.insertIntoSystemLiteralList(literal, 0);
        return this;
    }
    /**
     * @chainable
     */
    appendToSystemLiteralList(literal) {
        this.insertIntoSystemLiteralList(literal, this.getNumberOfSystemLiterals());
        return this;
    }
    /**
     * @chainable
     */
    removeSystemLiteralAtIndex(index) {
        this.removeSystemLiteralIndexFromOrderList(index);
        this.systemLiterals.splice(index, 1);
        return this;
    }
    /**
     * @chainable
     */
    removeSystemLiteral(literal) {
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
    setAttribute(attrName, value, namespaceName) {
        this.appendAttributeToOrderList(Node_1.Node.joinAttributeNameWithNamespacePrefix(attrName, namespaceName));
        super.setAttribute(attrName, value, namespaceName);
        return this;
    }
    /**
     * @chainable
     * @override
     */
    removeAttribute(attrName, namespaceName) {
        this.removeAttributeFromOrderList(Node_1.Node.joinAttributeNameWithNamespacePrefix(attrName, namespaceName));
        super.removeAttribute(attrName, namespaceName);
        return this;
    }
    isSystemLiteralListIdenticalTo(otherNode) {
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
    isIdenticalTo(otherNode) {
        return super.isIdenticalTo(otherNode) && this.isSystemLiteralListIdenticalTo(otherNode);
    }
    /**
     * @override
     */
    stringify(params, nodeIndentDepth) {
        nodeIndentDepth = Math.max(nodeIndentDepth || 0, 0);
        return `${Node_1.Node.generateIndentString(params.indentChar, nodeIndentDepth)}<!${this.tagName}${this.stringifyAttributesAndSystemLiterals(params, nodeIndentDepth)}>${params.newlineChar}`;
    }
    stringifyAttributesAndSystemLiterals(params, nodeIndentDepth) {
        return this.literalAndAttrOrder.map(attrNameOrLiteralIndex => {
            if (typeof attrNameOrLiteralIndex === 'string') {
                return this.stringifyAttribute(attrNameOrLiteralIndex, this.getAttribute(attrNameOrLiteralIndex));
            }
            else {
                return ` "${this.getSystemLiteralAtIndex(attrNameOrLiteralIndex)}"`;
            }
        }).join('');
    }
    appendSystemLiteralIndexToOrderList(literalIndex) {
        this.removeSystemLiteralIndexFromOrderList(literalIndex);
        this.literalAndAttrOrder.push(literalIndex);
    }
    removeSystemLiteralIndexFromOrderList(literalIndex) {
        const index = this.literalAndAttrOrder.indexOf(literalIndex);
        if (index !== -1) {
            this.literalAndAttrOrder.splice(index, 1);
        }
    }
    appendAttributeToOrderList(attrNameWithNamespace) {
        this.removeAttributeFromOrderList(attrNameWithNamespace);
        this.literalAndAttrOrder.push(attrNameWithNamespace);
    }
    removeAttributeFromOrderList(attrNameWithNamespace) {
        const index = this.literalAndAttrOrder.indexOf(attrNameWithNamespace);
        if (index !== -1) {
            this.literalAndAttrOrder.splice(index, 1);
        }
    }
}
exports.DeclarationOpenerNode = DeclarationOpenerNode;
