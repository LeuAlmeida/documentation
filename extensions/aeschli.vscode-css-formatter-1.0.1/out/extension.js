"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const jsbeautify = require("js-beautify");
function format(document, range, options) {
    if (range === null) {
        let start = new vscode.Position(0, 0);
        let end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
        range = new vscode.Range(start, end);
    }
    let result = [];
    let content = document.getText(range);
    if (!options) {
        options = { insertSpaces: true, tabSize: 4 };
    }
    let beutifyOptions = {
        indent_char: options.insertSpaces ? ' ' : '\t',
        indent_size: options.insertSpaces ? options.tabSize : 1,
        selector_separator_newline: false
    };
    let formatted = jsbeautify.css_beautify(content, beutifyOptions);
    if (formatted) {
        result.push(new vscode.TextEdit(range, formatted));
    }
    return result;
}
exports.format = format;
;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider('css', {
        provideDocumentFormattingEdits: (document, options, token) => {
            return format(document, null, options);
        }
    }));
    context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider('css', {
        provideDocumentRangeFormattingEdits: (document, range, options, token) => {
            let start = new vscode.Position(0, 0);
            let end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
            return format(document, new vscode.Range(start, end), options);
        }
    }));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map