"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
function getExtensionVersion() {
    const projectRoot = path.join(__dirname, "..", "..");
    return JSON.parse(fs.readFileSync(path.join(projectRoot, "package.json"), "utf-8")).version;
}
exports.getExtensionVersion = getExtensionVersion;

//# sourceMappingURL=extensionHelper.js.map
