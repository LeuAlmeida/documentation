"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const reactNativeProjectHelper_1 = require("../../common/reactNativeProjectHelper");
const errorHelper_1 = require("../../common/error/errorHelper");
const extensionHelper_1 = require("../../common/extensionHelper");
const nodeDebugWrapper_1 = require("../nodeDebugWrapper");
const telemetry_1 = require("../../common/telemetry");
const vscode_debugadapter_1 = require("vscode-debugadapter");
const telemetryHelper_1 = require("../../common/telemetryHelper");
const telemetryReporters_1 = require("../../common/telemetryReporters");
const vscode_chrome_debug_core_1 = require("vscode-chrome-debug-core");
const internalErrorCode_1 = require("../../common/error/internalErrorCode");
const remoteExtension_1 = require("../../common/remoteExtension");
const LogHelper_1 = require("../../extension/log/LogHelper");
const nls = require("vscode-nls");
const Q = require("q");
const localize = nls.loadMessageBundle(__filename);
class DirectDebugAdapter extends vscode_chrome_debug_core_1.ChromeDebugAdapter {
    constructor(opts, debugSession) {
        super(opts, debugSession);
        this.outputLogger = (message, error) => {
            let category = "console";
            if (error === true) {
                category = "stderr";
            }
            if (typeof error === "string") {
                category = error;
            }
            let newLine = "\n";
            if (category === "stdout" || category === "stderr") {
                newLine = "";
            }
            debugSession.sendEvent(new vscode_debugadapter_1.OutputEvent(message + newLine, category));
        };
        this.isSettingsInitialized = false;
    }
    launch(launchArgs) {
        const extProps = {
            platform: {
                value: launchArgs.platform,
                isPii: false,
            },
            isDirect: {
                value: true,
                isPii: false,
            },
        };
        return new Promise((resolve, reject) => this.initializeSettings(launchArgs)
            .then(() => {
            this.outputLogger("Launching the app");
            vscode_chrome_debug_core_1.logger.verbose(`Launching the app: ${JSON.stringify(launchArgs, null, 2)}`);
            return telemetryHelper_1.TelemetryHelper.generate("launch", extProps, (generator) => {
                return this.remoteExtension.launch({ "arguments": launchArgs })
                    .then(() => {
                    return this.remoteExtension.getPackagerPort(launchArgs.cwd);
                })
                    .then((packagerPort) => {
                    launchArgs.port = packagerPort;
                    this.attach(launchArgs).then(() => {
                        resolve();
                    }).catch((e) => reject(e));
                }).catch((e) => reject(e));
            })
                .catch((err) => {
                this.outputLogger("An error occurred while launching the application. " + err.message || err, true);
                this.cleanUp();
                reject(err);
            });
        }));
    }
    attach(attachArgs) {
        const extProps = {
            platform: {
                value: attachArgs.platform,
                isPii: false,
            },
            isDirect: {
                value: true,
                isPii: false,
            },
        };
        this.previousAttachArgs = attachArgs;
        return new Promise((resolve, reject) => this.initializeSettings(attachArgs)
            .then(() => {
            this.outputLogger("Attaching to the app");
            vscode_chrome_debug_core_1.logger.verbose(`Attaching to app: ${JSON.stringify(attachArgs, null, 2)}`);
            return telemetryHelper_1.TelemetryHelper.generate("attach", extProps, (generator) => {
                return this.remoteExtension.getPackagerPort(attachArgs.cwd)
                    .then((packagerPort) => {
                    this.outputLogger(`Connecting to ${packagerPort} packager port`);
                    const attachArguments = Object.assign({}, attachArgs, {
                        address: "localhost",
                        port: packagerPort,
                        restart: true,
                        request: "attach",
                        remoteRoot: undefined,
                        localRoot: undefined,
                    });
                    super.attach(attachArguments).then(() => {
                        this.outputLogger("The debugger attached successfully");
                        resolve();
                    }).catch((e) => reject(e));
                }).catch((e) => reject(e));
            })
                .catch((err) => {
                this.outputLogger("An error occurred while attaching to the debugger. " + err.message || err, true);
                this.cleanUp();
                reject(err);
            });
        }));
    }
    disconnect(args) {
        this.cleanUp();
        super.disconnect(args);
    }
    initializeSettings(args) {
        if (!this.isSettingsInitialized) {
            let chromeDebugCoreLogs = LogHelper_1.getLoggingDirectory();
            if (chromeDebugCoreLogs) {
                chromeDebugCoreLogs = path.join(chromeDebugCoreLogs, "ChromeDebugCoreLogs.txt");
            }
            let logLevel = args.trace;
            if (logLevel) {
                logLevel = logLevel.replace(logLevel[0], logLevel[0].toUpperCase());
                vscode_chrome_debug_core_1.logger.setup(vscode_debugadapter_1.Logger.LogLevel[logLevel], chromeDebugCoreLogs || false);
            }
            else {
                vscode_chrome_debug_core_1.logger.setup(vscode_debugadapter_1.Logger.LogLevel.Log, chromeDebugCoreLogs || false);
            }
            if (!args.sourceMaps) {
                args.sourceMaps = true;
            }
            const projectRootPath = nodeDebugWrapper_1.getProjectRoot(args);
            return reactNativeProjectHelper_1.ReactNativeProjectHelper.isReactNativeProject(projectRootPath)
                .then((result) => {
                if (!result) {
                    throw errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.NotInReactNativeFolderError);
                }
                this.projectRootPath = projectRootPath;
                this.remoteExtension = remoteExtension_1.RemoteExtension.atProjectRootPath(this.projectRootPath);
                const version = extensionHelper_1.getExtensionVersion();
                // Start to send telemetry
                this._session.getTelemetryReporter().reassignTo(new telemetryReporters_1.RemoteTelemetryReporter("react-native-tools", version, telemetry_1.Telemetry.APPINSIGHTS_INSTRUMENTATIONKEY, this.projectRootPath));
                this.isSettingsInitialized = true;
                return void 0;
            });
        }
        else {
            return Q.resolve(void 0);
        }
    }
    cleanUp() {
        if (this.previousAttachArgs.platform === "android") {
            this.remoteExtension.stopMonitoringLogcat()
                .catch(reason => vscode_chrome_debug_core_1.logger.warn(localize(0, null, reason.message || reason)))
                .finally(() => super.disconnect({ terminateDebuggee: true }));
        }
    }
}
exports.DirectDebugAdapter = DirectDebugAdapter;

//# sourceMappingURL=directDebugAdapter.js.map
