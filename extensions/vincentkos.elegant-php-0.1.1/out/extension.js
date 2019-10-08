"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const ExtractToMethodCommand_1 = require("./commands/ExtractToMethodCommand");
const ExtractToVariableCommand_1 = require("./commands/ExtractToVariableCommand");
const InlineVariable_1 = require("./commands/InlineVariable");
function activate(context) {
    context.subscriptions.push(vscode_1.commands.registerCommand('elegant-php.extract-to-method', () => {
        let editor = vscode_1.window.activeTextEditor;
        if (!editor) {
            return;
        }
        (new ExtractToMethodCommand_1.default(editor)).run();
    }));
    context.subscriptions.push(vscode_1.commands.registerCommand('elegant-php.extract-to-variable', () => {
        let editor = vscode_1.window.activeTextEditor;
        if (!editor) {
            return;
        }
        (new ExtractToVariableCommand_1.default(editor)).run();
    }));
    context.subscriptions.push(vscode_1.commands.registerCommand('elegant-php.inline-variable', () => {
        let editor = vscode_1.window.activeTextEditor;
        if (!editor) {
            return;
        }
        (new InlineVariable_1.default(editor)).run();
    }));
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map