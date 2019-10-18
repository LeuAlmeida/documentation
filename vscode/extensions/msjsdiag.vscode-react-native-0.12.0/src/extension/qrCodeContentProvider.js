"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
Object.defineProperty(exports, "__esModule", { value: true });
const qr = require("qr-image");
const nls = require("vscode-nls");
const localize = nls.loadMessageBundle(__filename);
class QRCodeContentProvider {
    constructor() {
        this.cache = {};
    }
    provideTextDocumentContent(uri) {
        let stringUri = uri.toString();
        if (!this.cache[stringUri]) {
            const imageBuffer = qr.imageSync(stringUri);
            this.cache[stringUri] = "data:image/png;base64," + imageBuffer.toString("base64");
        }
        let message = localize(0, null, stringUri);
        return `<!DOCTYPE html>
        <html>
        <body>
            <div style="text-align:center">
                <h3>
                    ${message}
                <h3>
                <img src="${this.cache[stringUri]}" />
            </div>
        </body>
        </html>`;
    }
}
exports.QRCodeContentProvider = QRCodeContentProvider;

//# sourceMappingURL=qrCodeContentProvider.js.map
