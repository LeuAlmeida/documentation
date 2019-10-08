"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
class Parser {
    constructor() {
        this.codeToParse = "";
    }
    find(regex, start) {
        let lineCol = 0;
        let lineNumber = 0;
        let startAt = (start) ? start.line : 0;
        let lines = this.codeToParse.split("\n");
        for (let i = startAt; i < lines.length; i++) {
            let result = regex.exec(lines[i]);
            if (result) {
                lineNumber = i;
                lineCol = result.index;
                break;
            }
        }
        return new vscode_1.Position(lineNumber, lineCol);
    }
}
exports.default = Parser;
//# sourceMappingURL=Parser.js.map