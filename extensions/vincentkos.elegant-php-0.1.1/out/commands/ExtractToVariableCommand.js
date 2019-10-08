"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ElegantPhpCommand_1 = require("./ElegantPhpCommand");
const vscode_1 = require("vscode");
const PhpParser_1 = require("../parser/PhpParser");
const helper_1 = require("../helper");
class ExtractToVariableCommand extends ElegantPhpCommand_1.default {
    constructor(editor) {
        super();
        this.editor = editor;
        this.document = editor.document;
        this.phpClass = (new PhpParser_1.default).parse(this.document.getText());
    }
    run() {
        let currentMethod = helper_1.findCurrentMethod(this.phpClass, this.editor.selection);
        let selectedSnippet = this.document.getText(this.editor.selection);
        if (selectedSnippet === "") {
            return;
        }
        vscode_1.window.showInputBox({ prompt: "Enter the variable name" })
            .then((variableName) => {
            if (!currentMethod) {
                return;
            }
            let snippet = `\n${helper_1.getIndentation(this.editor, 2)}\$${variableName} = ${selectedSnippet};\n`;
            let snippetPosition = currentMethod.valueRange.start;
            this.editor.edit((editBuilder) => {
                editBuilder.replace(this.editor.selection, `\$${variableName}`);
                editBuilder.insert(snippetPosition, snippet);
            });
        });
    }
}
exports.default = ExtractToVariableCommand;
//# sourceMappingURL=ExtractToVariableCommand.js.map