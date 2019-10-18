"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_chrome_debug_core_1 = require("vscode-chrome-debug-core");
function makeDirectSession(debugSessionOpts, telemetryReporter) {
    return class extends vscode_chrome_debug_core_1.ChromeDebugSession {
        constructor(debuggerLinesAndColumnsStartAt1, isServer) {
            super(debuggerLinesAndColumnsStartAt1, isServer, debugSessionOpts);
            this.telemetryReporter = telemetryReporter;
        }
        getTelemetryReporter() {
            return this.telemetryReporter;
        }
    };
}
exports.makeDirectSession = makeDirectSession;

//# sourceMappingURL=directSessionWrapper.js.map
