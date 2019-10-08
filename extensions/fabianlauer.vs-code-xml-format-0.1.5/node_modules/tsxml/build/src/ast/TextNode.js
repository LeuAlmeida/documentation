"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Node_1 = require("./Node");
/**
 * Base class for all nodes that may contain child elements.
 */
class TextNode extends Node_1.Node {
    getContentLines() {
        if (typeof this.content !== 'string' || this.content.length < 1) {
            return [];
        }
        return this.content.trim().split(/\r?\n/);
    }
    /**
     * Returns whether the text content contains line breaks.
     */
    isContentMultiLine() {
        return /\r?\n/.test(this.content.trim());
    }
    isContentIdenticalTo(otherNode) {
        return TextNode.makeContentStringComparable(this.content || '') === TextNode.makeContentStringComparable(otherNode.content || '');
    }
    /**
     * Checks whether a node is identical to another node by comparing tag names, attribute names and values and content.
     */
    isIdenticalTo(otherNode) {
        return super.isIdenticalTo(otherNode) && this.isContentIdenticalTo(otherNode);
    }
    static makeContentStringComparable(contentString) {
        return contentString.trim().replace(/[\t\r\n ]+/g, '').replace(/ +/g, ' ');
    }
    stringify(params, nodeIndentDepth) {
        return this.stringifyContent(params, nodeIndentDepth);
    }
    stringifyContent(params, nodeIndentDepth) {
        if (this.isContentMultiLine()) {
            return this.stringifyMultiLineContent(params, nodeIndentDepth);
        }
        else {
            return this.stringifySingleLineContent(params, nodeIndentDepth);
        }
    }
    stringifyMultiLineContent(params, nodeIndentDepth) {
        var stringifiedContent = '', newlineChar = params.newlineChar;
        if (!/\n/.test(params.newlineChar)) {
            newlineChar = ' ';
        }
        stringifiedContent += this.getContentLines().map(contentLine => {
            return Node_1.Node.generateIndentString(params.indentChar, nodeIndentDepth) + contentLine.trim();
        }).join(newlineChar);
        if (/\n/.test(params.newlineChar)) {
            return stringifiedContent + params.newlineChar;
        }
        return stringifiedContent;
    }
    stringifySingleLineContent(params, nodeIndentDepth) {
        const formattedContent = (this.content || '').trim().replace(/(\r?\n(\t*))+/g, ' ').trim();
        if (/\n/.test(params.newlineChar)) {
            return Node_1.Node.generateIndentString(params.indentChar, nodeIndentDepth) + formattedContent + '\n';
        }
        else {
            return formattedContent;
        }
    }
}
exports.TextNode = TextNode;
