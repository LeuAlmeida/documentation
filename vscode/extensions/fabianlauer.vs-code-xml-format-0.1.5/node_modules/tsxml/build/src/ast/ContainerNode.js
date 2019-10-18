"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("./Node");
/**
 * Base class for all nodes that may contain child elements.
 */
class ContainerNode extends Node_1.Node {
    constructor() {
        super(...arguments);
        this.childNodes = [];
    }
    getNumberOfChildren() {
        return this.childNodes.length;
    }
    getChildAtIndex(index) {
        return this.childNodes[index];
    }
    getIndexOfChild(child) {
        return this.childNodes.indexOf(child);
    }
    hasChild(child) {
        return this.getIndexOfChild(child) !== -1;
    }
    /**
     * @chainable
     */
    insertChildAt(child, index) {
        Node_1.Node.changeParentNode(child, this);
        this.childNodes.splice(index, 0, child);
        return this;
    }
    /**
     * @chainable
     */
    removeChildAt(index) {
        const removedNode = this.childNodes.splice(index, 1)[0];
        Node_1.Node.removeParentNode(removedNode);
        return this;
    }
    /**
     * @chainable
     */
    insertChildBefore(child, referenceChild) {
        if (!this.hasChild(referenceChild)) {
            throw new Error('Can not insert child: reference child not found.');
        }
        this.insertChildAt(child, this.getIndexOfChild(referenceChild));
        return this;
    }
    /**
     * @chainable
     */
    insertChildAfter(child, referenceChild) {
        if (!this.hasChild(referenceChild)) {
            throw new Error('Can not insert child: reference child not found.');
        }
        this.insertChildAt(child, this.getIndexOfChild(referenceChild) + 1);
        return this;
    }
    /**
     * @chainable
     */
    prependChild(child) {
        this.insertChildAt(child, 0);
        return this;
    }
    /**
     * @chainable
     */
    appendChild(child) {
        this.insertChildAt(child, this.getNumberOfChildren());
        return this;
    }
    /**
     * @chainable
     */
    replaceChild(oldChild, newChild) {
        const index = this.getIndexOfChild(oldChild);
        this.removeChildAt(index);
        this.insertChildAt(newChild, index);
        return this;
    }
    forEachChildNode(fn) {
        this.childNodes.forEach((childNode, index) => fn(childNode, index));
    }
    isSubtreeIdenticalTo(otherNode) {
        if (this.getNumberOfChildren() !== otherNode.getNumberOfChildren()) {
            return false;
        }
        for (let i = 0; i < this.getNumberOfChildren(); i++) {
            if (!this.getChildAtIndex(i).isIdenticalTo(otherNode.getChildAtIndex(i))) {
                return false;
            }
        }
        return true;
    }
    /**
     * Checks whether a node is identical to another node by comparing tag names, attribute names and values and subtree.
     */
    isIdenticalTo(otherNode) {
        return super.isIdenticalTo(otherNode) && this.isSubtreeIdenticalTo(otherNode);
    }
    /**
     * @override
     */
    stringify(params, nodeIndentDepth) {
        nodeIndentDepth = Math.max(nodeIndentDepth || 0, 0);
        return `${Node_1.Node.generateIndentString(params.indentChar, nodeIndentDepth)}<${this.tagName}${this.stringifyAttributes(nodeIndentDepth)}>${this.stringifyAllChildNodes(params, nodeIndentDepth)}${Node_1.Node.generateIndentString(params.indentChar, nodeIndentDepth)}</${this.tagName}>${params.newlineChar}`;
    }
    stringifyAllChildNodes(params, nodeIndentDepth) {
        var xml = params.newlineChar;
        this.forEachChildNode(childNode => {
            xml += this.stringifyChildNode(childNode, params, nodeIndentDepth + 1);
        });
        return xml;
    }
    stringifyChildNode(childNode, params, nodeIndentDepth) {
        return childNode.stringify(params, nodeIndentDepth);
    }
}
exports.ContainerNode = ContainerNode;
