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
const TextSerializer_1 = require("./TextSerializer");
let CommentSerializer = class CommentSerializer extends TextSerializer_1.default {
    serializeConcrete(node, indentDepth) {
        return `${this.generateIndentString(indentDepth)}<!--${super.serialize(node, indentDepth)}-->${this.getConfig(config.newlineChar)}`;
    }
    /**
     * @override
     */
    stringifyMultiLineContent(node, indentDepth) {
        if (/\n/.test(this.getConfig(config.newlineChar))) {
            return '\n' + super.stringifyMultiLineContent(node, indentDepth) + this.generateIndentString(indentDepth);
        }
        else {
            return ' ' + super.stringifyMultiLineContent(node, indentDepth) + ' ';
        }
    }
    /**
     * @override
     */
    stringifySingleLineContent(node) {
        return ' ' + (node.content || '').trim().replace(/(\r?\n(\t*))+/g, ' ').trim() + ' ';
    }
};
CommentSerializer = __decorate([
    _1.NodeSerializer.register(node => node instanceof ast_1.CommentNode)
], CommentSerializer);
exports.default = CommentSerializer;
