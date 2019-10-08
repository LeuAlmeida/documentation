"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TextNode_1 = require("./TextNode");
class CDataSectionNode extends TextNode_1.TextNode {
    /**
     * @override
     */
    stringify(params, nodeIndentDepth) {
        return `${CDataSectionNode.generateIndentString(params.indentChar, nodeIndentDepth)}<![CDATA[${this.stringifyContent(params, nodeIndentDepth)}]]>${params.newlineChar}`;
    }
    /**
     * @override
     */
    stringifyMultiLineContent(params, nodeIndentDepth) {
        if (/\n/.test(params.newlineChar)) {
            return '\n' + super.stringifyMultiLineContent(params, nodeIndentDepth) + CDataSectionNode.generateIndentString(params.indentChar, nodeIndentDepth);
        }
        else {
            return super.stringifyMultiLineContent(params, nodeIndentDepth);
        }
    }
    /**
     * @override
     */
    stringifySingleLineContent(params, nodeIndentDepth) {
        return (this.content || '').replace(/(\r?\n(\t*))+/g, ' ');
    }
}
exports.CDataSectionNode = CDataSectionNode;
