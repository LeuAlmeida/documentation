"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TextNode_1 = require("./TextNode");
class CommentNode extends TextNode_1.TextNode {
    /**
     * @override
     */
    stringify(params, nodeIndentDepth) {
        return `${CommentNode.generateIndentString(params.indentChar, nodeIndentDepth)}<!--${this.stringifyContent(params, nodeIndentDepth)}-->${params.newlineChar}`;
    }
    /**
     * @override
     */
    stringifyMultiLineContent(params, nodeIndentDepth) {
        if (/\n/.test(params.newlineChar)) {
            return '\n' + super.stringifyMultiLineContent(params, nodeIndentDepth) + CommentNode.generateIndentString(params.indentChar, nodeIndentDepth);
        }
        else {
            return ' ' + super.stringifyMultiLineContent(params, nodeIndentDepth) + ' ';
        }
    }
    /**
     * @override
     */
    stringifySingleLineContent(params, nodeIndentDepth) {
        return ' ' + (this.content || '').trim().replace(/(\r?\n(\t*))+/g, ' ').trim() + ' ';
    }
}
exports.CommentNode = CommentNode;
