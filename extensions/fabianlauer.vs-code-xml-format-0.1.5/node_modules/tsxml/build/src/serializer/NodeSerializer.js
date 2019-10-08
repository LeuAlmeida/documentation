"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("./config");
class NodeSerializer {
    /**
     * @param config An object that provides the serializer configuration.
     */
    constructor(config) {
        this.config = config;
    }
    /**
     * Registers a node serializer class. Class decorator.
     */
    static register(isApplicable) {
        return (serializerClass) => {
            this.registry.set(serializerClass, isApplicable);
        };
    }
    static create(node, config) {
        for (const entry of NodeSerializer.registry.entries()) {
            if (entry[1](node, config)) {
                return new entry[0](config);
            }
        }
        throw new Error('cannot create instance: no applicable class found');
    }
    static serialize(node, config, indentDepth) {
        const serializer = NodeSerializer.create(node, config);
        return serializer.serializeConcrete(node, indentDepth);
    }
    serialize(node, indentDepth) {
        return this.serializeConcrete(node, indentDepth);
    }
    /**
     * Returns a serializer configuration value.
     */
    getConfig(key) {
        return this.config.get(key);
    }
    generateIndentString(indentDepth) {
        indentDepth = Math.max(indentDepth || 0, 0);
        if (indentDepth === 0) {
            return '';
        }
        let indentString = '';
        while (indentDepth-- > 0) {
            indentString += this.getConfig(config.indentChar);
        }
        return indentString;
    }
    stringifyAttributes(node, indentDepth) {
        var attrString = '';
        for (let attrName of node.getAllAttributeNames()) {
            attrString += this.stringifyAttribute(attrName, node.getAttribute(attrName));
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
}
NodeSerializer.registry = new Map();
exports.default = NodeSerializer;
