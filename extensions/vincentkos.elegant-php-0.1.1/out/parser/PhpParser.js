"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const helper_1 = require("../helper");
const Parser_1 = require("./Parser");
class PhpParser extends Parser_1.default {
    constructor(code = "") {
        super();
        this.regex = {
            class: /class\s+([0-9A-Za-z_]+)/,
            property: /(public|protected|private)\s+\$([0-9A-Za-z_]+)/,
            method: /(public|protected|private)\s+(.*function)\s+(.*)(?=\()/,
        };
        this.codeToParse = code;
    }
    parse(code = "") {
        this.codeToParse = (code) ? code : this.codeToParse;
        if (!this.codeToParse) {
            throw new Error("Nothing was given to parse");
        }
        let lines = this.codeToParse.split("\n");
        let phpClass = {
            name: "",
            properties: [],
            methods: []
        };
        for (let i = 0; i < lines.length; i++) {
            let matches = this.regex.class.exec(lines[i]);
            if (matches) {
                phpClass.name = matches[1];
                phpClass.range = this.findClassRange(new vscode_1.Position(i, matches.index));
                phpClass.valueRange = this.findClassValueRange(phpClass.range);
            }
            matches = this.regex.property.exec(lines[i]);
            if (matches) {
                let propertyRange = this.findPropertyRange(new vscode_1.Position(i, matches.index));
                phpClass.properties.push({
                    name: matches[2],
                    visibility: matches[1],
                    range: propertyRange,
                    valueRange: this.findPropertyValueRange(propertyRange),
                });
            }
            matches = this.regex.method.exec(lines[i]);
            if (matches) {
                let methodRange = this.findMethodRange(new vscode_1.Position(i, matches.index));
                phpClass.methods.push({
                    name: matches[3],
                    visibility: matches[1],
                    range: methodRange,
                    valueRange: this.findMethodValueRange(methodRange)
                });
            }
        }
        return phpClass;
    }
    findMethodValueRange(range) {
        let openingBracket = this.find(/{/, range.start);
        let start = new vscode_1.Position(openingBracket.line, openingBracket.character + 1);
        let end = new vscode_1.Position(range.end.line, range.end.character - 1);
        return new vscode_1.Range(start, end);
    }
    findMethodRange(methodDefinitionPosition) {
        let closingBracketPosition = this.findMatchingClosingBracket(methodDefinitionPosition.line);
        // add 1 to col position so we include the semicolon in the range
        let endPosition = new vscode_1.Position(closingBracketPosition.line, closingBracketPosition.character + 1);
        return new vscode_1.Range(methodDefinitionPosition, endPosition);
    }
    findPropertyValueRange(range) {
        let declarationPosition = this.find(/=/, range.start);
        if (!helper_1.isPositionValid(declarationPosition)) {
            return undefined;
        }
        // add one so we don't include the "=" character
        let startPosition = new vscode_1.Position(declarationPosition.line, declarationPosition.character + 1);
        // remove one so we don't include the ";" character
        let endPosition = new vscode_1.Position(range.end.line, range.end.character - 1);
        return new vscode_1.Range(startPosition, endPosition);
    }
    findPropertyRange(propertyDefinitionPosition) {
        let semicolonPosition = this.find(/;/, propertyDefinitionPosition);
        // add 1 to col position so we include the semicolon in the range
        let endPosition = new vscode_1.Position(semicolonPosition.line, semicolonPosition.character + 1);
        return new vscode_1.Range(propertyDefinitionPosition, endPosition);
    }
    findClassValueRange(range) {
        let openingBracket = this.find(/{/, range.start);
        let start = new vscode_1.Position(openingBracket.line, openingBracket.character + 1);
        let end = new vscode_1.Position(range.end.line, range.end.character - 1);
        return new vscode_1.Range(start, end);
    }
    findClassRange(classDefinitionPosition) {
        let openingBracketPosition = this.find(/{/, classDefinitionPosition);
        let closingBracketPosition = this.findMatchingClosingBracket(openingBracketPosition.line);
        // We add one to the closing character position so if we need to create a selection
        // from that range we include the bracket in it.
        let endPosition = new vscode_1.Position(closingBracketPosition.line, closingBracketPosition.character + 1);
        return new vscode_1.Range(classDefinitionPosition, endPosition);
    }
    // I don't know if we should put this method in the mother class
    // It's not unique to php but not all languages have a use for
    // it so. Still thinking about it
    findMatchingClosingBracket(startAt) {
        let lineCol = 0;
        let lineNumber = 0;
        let bracketLevel = 0;
        let lines = this.codeToParse.split("\n");
        for (let i = startAt; i < lines.length; i++) {
            if (/{/.test(lines[i])) {
                bracketLevel++;
            }
            let result = /}/.exec(lines[i]);
            if (result) {
                bracketLevel--;
                if (bracketLevel === 0) {
                    lineNumber = i;
                    lineCol = result.index;
                    break;
                }
            }
        }
        return new vscode_1.Position(lineNumber, lineCol);
    }
    findVariableInMethod(method, variableName) {
        if (!variableName) {
            return null;
        }
        let regex = `\\${variableName}\\s+=`;
        let variableDeclarationPosition = this.find(new RegExp(regex), method.valueRange.start);
        if (!helper_1.isPositionValid(variableDeclarationPosition)) {
            return null;
        }
        let variableRange = this.findPropertyRange(variableDeclarationPosition);
        let variableValueRange = this.findPropertyValueRange(variableRange);
        let variable = {
            name: variableName.replace('$', ''),
            range: variableRange,
            valueRange: variableValueRange
        };
        return variable;
    }
}
exports.default = PhpParser;
//# sourceMappingURL=PhpParser.js.map