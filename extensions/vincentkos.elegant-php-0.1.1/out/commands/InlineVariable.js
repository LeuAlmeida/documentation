"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ElegantPhpCommand_1 = require("./ElegantPhpCommand");
const PhpParser_1 = require("../parser/PhpParser");
const helper_1 = require("../helper");
class InlineVariable extends ElegantPhpCommand_1.default {
    constructor(editor) {
        super();
        this.editor = editor;
        this.document = editor.document;
        this.parser = new PhpParser_1.default;
        this.phpClass = this.parser.parse(this.document.getText());
    }
    run() {
        let currentMethod = helper_1.findCurrentMethod(this.phpClass, this.editor.selection);
        let selectedSnippet = this.document.getText(this.editor.selection);
        if (selectedSnippet === "") {
            return;
        }
        if (!currentMethod) {
            return;
        }
        let variableName = this.document.getText(this.editor.selection);
        let variable = this.parser.findVariableInMethod(currentMethod, variableName);
        this.editor.edit((editBuilder) => {
            if (!variable) {
                return;
            }
            editBuilder.replace(this.editor.selection, this.document.getText(variable.valueRange).trim());
            editBuilder.delete(variable.range);
        });
    }
}
exports.default = InlineVariable;
//# sourceMappingURL=InlineVariable.js.map