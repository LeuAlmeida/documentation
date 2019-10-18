"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Parser_1 = require("./parser/Parser");
class Compiler {
    /**
     * Parses an XML string and returns the parser object that parsed it.
     */
    static parseXml(xmlString, ruleSet) {
        return __awaiter(this, void 0, void 0, function* () {
            return Parser_1.Parser.parseString(xmlString, ruleSet);
        });
    }
    /**
     * Parses an XML string and returns the a syntax tree.
     */
    static parseXmlToAst(xmlString, ruleSet) {
        return __awaiter(this, void 0, void 0, function* () {
            return Parser_1.Parser.parseStringToAst(xmlString, ruleSet);
        });
    }
    /**
     * Parses an XML string to a syntax tree, then serializes it to formatted XML.
     */
    static formatXmlString(xmlString, formattingOptions, ruleSet) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield Parser_1.Parser.parseStringToAst(xmlString, ruleSet)).toFormattedString(formattingOptions);
        });
    }
}
exports.Compiler = Compiler;
