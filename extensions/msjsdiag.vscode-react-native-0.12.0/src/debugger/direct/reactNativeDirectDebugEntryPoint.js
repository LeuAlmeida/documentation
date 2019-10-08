"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
Object.defineProperty(exports, "__esModule", { value: true });
const telemetryHelper_1 = require("../../common/telemetryHelper");
const entryPointHandler_1 = require("../../common/entryPointHandler");
const extensionHelper_1 = require("../../common/extensionHelper");
const errorHelper_1 = require("../../common/error/errorHelper");
const internalErrorCode_1 = require("../../common/error/internalErrorCode");
const telemetryReporters_1 = require("../../common/telemetryReporters");
const directDebugAdapter_1 = require("./directDebugAdapter");
const directSessionWrapper_1 = require("./directSessionWrapper");
const vscode_chrome_debug_core_1 = require("vscode-chrome-debug-core");
const vscode_debugadapter_1 = require("vscode-debugadapter");
const nls = require("vscode-nls");
const localize = nls.loadMessageBundle(__filename);
const version = extensionHelper_1.getExtensionVersion();
const extensionName = "react-native-tools";
const telemetryReporter = new telemetryReporters_1.ReassignableTelemetryReporter(new telemetryReporters_1.NullTelemetryReporter());
function bailOut(reason) {
    // Things have gone wrong in initialization: Report the error to telemetry and exit
    telemetryHelper_1.TelemetryHelper.sendDirect(reason);
    process.exit(1);
}
function codeToRun() {
    try {
        let session;
        try {
            session = directSessionWrapper_1.makeDirectSession({
                adapter: directDebugAdapter_1.DirectDebugAdapter,
                extensionName: extensionName
            }, telemetryReporter);
            vscode_chrome_debug_core_1.ChromeDebugSession.run(session);
        }
        catch (e) {
            const debugSession = new vscode_debugadapter_1.DebugSession();
            // Start session before sending any events otherwise the client wouldn't receive them
            debugSession.start(process.stdin, process.stdout);
            debugSession.sendEvent(new vscode_debugadapter_1.OutputEvent(localize(0, null, e.toString()), "stderr"));
            debugSession.sendEvent(new vscode_debugadapter_1.TerminatedEvent());
            bailOut(e.toString());
        }
    }
    catch (e) {
        // Nothing we can do here: can't even communicate back because we don't know how to speak debug adapter
        bailOut("cannotFindDebugAdapter");
    }
}
// Enable telemetry
const entryPointHandler = new entryPointHandler_1.EntryPointHandler(entryPointHandler_1.ProcessType.Debugger);
entryPointHandler.runApp(extensionName, version, errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.DebuggingFailed), telemetryReporter, codeToRun);

//# sourceMappingURL=reactNativeDirectDebugEntryPoint.js.map
