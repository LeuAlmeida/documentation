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
const vscode_1 = require("vscode");
const helper_1 = require("../helper");
const PhpParser_1 = require("../parser/PhpParser");
const ElegantPhpCommand_1 = require("./ElegantPhpCommand");
class ExtractToMethodCommand extends ElegantPhpCommand_1.default {
    constructor(editor) {
        super();
        this.editor = editor;
        this.document = editor.document;
        this.phpClass = (new PhpParser_1.default).parse(this.document.getText());
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            let currentMethod = helper_1.findCurrentMethod(this.phpClass, this.editor.selection);
            let selectedSnippet = this.document.getText(this.editor.selection);
            if (selectedSnippet === "") {
                return;
            }
            vscode_1.window.showInputBox({ prompt: "Enter the new method's name" })
                .then((methodName) => {
                this.editor.edit((editBuilder) => {
                    if (!currentMethod) {
                        return;
                    }
                    let snippet = "\n\n" + helper_1.getIndentation(this.editor) +
                        "public function " + methodName + "()\n" +
                        helper_1.getIndentation(this.editor) + "{\n" +
                        helper_1.indentCode(this.editor, selectedSnippet, 2) +
                        helper_1.getIndentation(this.editor) + "}";
                    editBuilder.replace(this.editor.selection, `$this->${methodName}();`);
                    editBuilder.insert(currentMethod.range.end, snippet);
                }).then(() => {
                    this.editor.selection = new vscode_1.Selection(this.editor.selection.end, this.editor.selection.end);
                });
            });
        });
    }
}
exports.default = ExtractToMethodCommand;
//# sourceMappingURL=ExtractToMethodCommand.js.map