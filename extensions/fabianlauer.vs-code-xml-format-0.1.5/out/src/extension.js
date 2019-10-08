"use strict";
var vscode = require('vscode');
var xml = require('tsxml');
function activate(context) {
    // whole document formatting
    context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider({ language: 'xml' }, {
        provideDocumentFormattingEdits: function (document, options) {
            return XmlFormatter.format(document, undefined, options);
        }
    }));
}
exports.activate = activate;
var XmlFormatter = (function () {
    /**
     * @param document The VS Code document to format.
     */
    function XmlFormatter(document, options) {
        this.document = document;
        this.options = options;
        this.options = this.options || {
            insertSpaces: false,
            tabSize: 4
        };
        if (typeof this.options.insertSpaces === undefined) {
            this.options.insertSpaces = false;
        }
        if (typeof this.options.tabSize !== 'number' || isNaN(this.options.tabSize)) {
            this.options.tabSize = 4;
        }
        this.options.tabSize = Math.max(0, 4);
    }
    /**
     * Format a text range and return a text edit array compatible with VS Code formatting providers.
     */
    XmlFormatter.format = function (document, range, options) {
        return new XmlFormatter(document, options).format(range);
    };
    /**
     * Format a text range and return a text edit array compatible with VS Code formatting providers.
     */
    XmlFormatter.prototype.format = function (range) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // format the whole document if no range is provided by VS code
            range = range || new vscode.Range(
            // line 0, char 0:
            0, 0, 
            // last line:
            _this.document.lineCount, 
            // last character:
            _this.document.lineAt(_this.document.lineCount - 1).range.end.character);
            xml.Compiler.formatXmlString(_this.document.getText()).then(function (formattedXml) {
                resolve([new vscode.TextEdit(range, formattedXml)]);
            }).catch(function (err) {
                XmlFormatter.showFormattingErrorMessage(err);
                reject();
            });
        });
    };
    /**
     * Displays a message that informs the user about an error that ocurred when formatting XML.
     */
    XmlFormatter.showFormattingErrorMessage = function (errorInfo) {
        if (typeof errorInfo !== 'undefined' && errorInfo !== null) {
            if (typeof errorInfo.line === 'number' && typeof errorInfo.column === 'number') {
                vscode.window.showErrorMessage("XML formatting failed: at line " + errorInfo.line + ", column " + errorInfo.column + ": " + (errorInfo.message || errorInfo) + ".");
            }
            else {
                vscode.window.showErrorMessage("XML formatting failed: " + errorInfo + ".");
            }
        }
        else {
            vscode.window.showErrorMessage("XML formatting failed.");
        }
        try {
            console.log('XML Formatter: Error: ', errorInfo);
        }
        catch (err) {
        }
    };
    return XmlFormatter;
}());
//# sourceMappingURL=extension.js.map