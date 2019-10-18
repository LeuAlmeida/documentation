"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("./config");
const ast_1 = require("../ast");
const _1 = require("./");
let TextSerializer = class TextSerializer extends _1.NodeSerializer {
    serializeConcrete(node, indentDepth) {
        if (node.isContentMultiLine()) {
            return this.stringifyMultiLineContent(node, indentDepth);
        }
        else {
            return this.stringifySingleLineContent(node, indentDepth);
        }
    }
    stringifyMultiLineContent(node, indentDepth) {
        const configuredNewlineChar = this.getConfig(config.newlineChar);
        let newlineChar = this.getConfig(config.newlineChar);
        if (!/\n/.test(configuredNewlineChar)) {
            newlineChar = ' ';
        }
        const stringifiedContent = node.getContentLines().map(contentLine => {
            return this.generateIndentString(indentDepth) + contentLine.trim();
        }).join(newlineChar);
        if (/\n/.test(configuredNewlineChar)) {
            return stringifiedContent + configuredNewlineChar;
        }
        return stringifiedContent;
    }
    stringifySingleLineContent(node, indentDepth) {
        const formattedContent = (node.content || '').trim().replace(/(\r?\n(\t*))+/g, ' ').trim();
        if (/\n/.test(this.getConfig(config.newlineChar))) {
            return this.generateIndentString(indentDepth) + formattedContent + '\n';
        }
        else {
            return formattedContent;
        }
    }
};
TextSerializer = __decorate([
    _1.NodeSerializer.register(node => node instanceof ast_1.TextNode)
], TextSerializer);
exports.default = TextSerializer;
