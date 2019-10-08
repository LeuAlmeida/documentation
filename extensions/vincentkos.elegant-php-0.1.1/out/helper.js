"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
function isPositionValid(pos) {
    if (!pos) {
        return false;
    }
    if (pos.line === 0 && pos.character === 0) {
        return false;
    }
    return true;
}
exports.isPositionValid = isPositionValid;
function isRangeValid(range) {
    if (!range) {
        return false;
    }
    if (range.start.line === 0 &&
        range.start.character === 0 &&
        range.end.line === 0 &&
        range.end.character === 0) {
        return false;
    }
    return true;
}
exports.isRangeValid = isRangeValid;
function isInRange(range, inside) {
    if (range.start.line < inside.start.line) {
        return false;
    }
    if (range.end.line > inside.end.line) {
        return false;
    }
    if (range.start.line === inside.start.line && range.start.character >= inside.start.character) {
        return false;
    }
    if (range.end.line === inside.end.line && range.end.character <= inside.end.character) {
        return false;
    }
    return true;
}
exports.isInRange = isInRange;
function getIndentation(editor, level = 1) {
    let singleLevel = '';
    let activeResource = editor.document.uri;
    if (!vscode_1.workspace.getConfiguration('editor', activeResource).get('insertSpaces')) {
        singleLevel = '\t';
    }
    else {
        let tabSize = vscode_1.workspace.getConfiguration('editor', activeResource).get('tabSize');
        if (tabSize) {
            singleLevel = ' '.repeat(tabSize);
        }
    }
    return singleLevel.repeat(level);
}
exports.getIndentation = getIndentation;
function indentCode(editor, code, level = 0) {
    let lines = code.split("\n");
    let indentLevel = level;
    let openNow = false;
    code = "";
    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        openNow = false;
        if (line.includes('{')) {
            indentLevel++;
            openNow = true;
        }
        if (line.includes('}')) {
            indentLevel--;
        }
        if (openNow) {
            code += getIndentation(editor, indentLevel - 1) + line + "\n";
        }
        else {
            code += getIndentation(editor, indentLevel) + line + "\n";
        }
    }
    return code;
}
exports.indentCode = indentCode;
function findCurrentMethod(phpClass, selection) {
    for (let i = 0; i < phpClass.methods.length; i++) {
        if (isInRange(selection, phpClass.methods[i].valueRange)) {
            return phpClass.methods[i];
        }
    }
    return null;
}
exports.findCurrentMethod = findCurrentMethod;
//# sourceMappingURL=helper.js.map