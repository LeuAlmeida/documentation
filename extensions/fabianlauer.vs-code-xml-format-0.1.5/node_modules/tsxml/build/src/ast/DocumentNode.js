"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ContainerNode_1 = require("./ContainerNode");
class DocumentNode extends ContainerNode_1.ContainerNode {
    /**
     * @override
     */
    stringify(params, nodeIndentDepth) {
        nodeIndentDepth = Math.max(nodeIndentDepth || 0, 0);
        return this.stringifyAllChildNodes(params, nodeIndentDepth);
    }
    stringifyAllChildNodes(params, nodeIndentDepth) {
        var xml = '';
        this.forEachChildNode(childNode => {
            xml += this.stringifyChildNode(childNode, params, nodeIndentDepth);
        });
        return xml;
    }
}
exports.DocumentNode = DocumentNode;
