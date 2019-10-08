"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
Object.defineProperty(exports, "__esModule", { value: true });
const Q = require("q");
const vscode = require("vscode");
const extensionMessaging_1 = require("../common/extensionMessaging");
const OutputChannelLogger_1 = require("./log/OutputChannelLogger");
const fileSystem_1 = require("../common/node/fileSystem");
const settingsHelper_1 = require("./settingsHelper");
const telemetry_1 = require("../common/telemetry");
const platformResolver_1 = require("./platformResolver");
const telemetryHelper_1 = require("../common/telemetryHelper");
const targetPlatformHelper_1 = require("../common/targetPlatformHelper");
const rpc = require("noice-json-rpc");
const WebSocket = require("ws");
var WebSocketServer = WebSocket.Server;
const nls = require("vscode-nls");
const localize = nls.loadMessageBundle(__filename);
class ExtensionServer {
    constructor(projectRootPath, reactNativePackager) {
        this.isDisposed = false;
        this.logCatMonitor = null;
        this.logger = OutputChannelLogger_1.OutputChannelLogger.getMainChannel();
        this.pipePath = extensionMessaging_1.MessagingHelper.getPath(projectRootPath);
        this.reactNativePackager = reactNativePackager;
    }
    /**
     * Starts the server.
     */
    setup() {
        this.isDisposed = false;
        return Q.Promise((resolve, reject) => {
            this._setup(resolve, reject);
        });
    }
    /**
     * Stops the server.
     */
    dispose() {
        this.isDisposed = true;
        if (this.serverInstance) {
            this.serverInstance.close();
            this.serverInstance = null;
        }
        this.reactNativePackager.statusIndicator.dispose();
        this.reactNativePackager.stop(true);
        this.stopMonitoringLogCat();
    }
    _setup(resolve, reject) {
        const errorCallback = this.recoverServer.bind(this, resolve, reject);
        let launchCallback = (done) => {
            this.logger.debug(`Extension messaging server started at ${this.pipePath}.`);
            if (this.serverInstance) {
                this.serverInstance.removeListener("error", errorCallback);
                this.serverInstance.on("error", this.recoverServer.bind(this, null, null));
            }
            done(void 0);
        };
        this.serverInstance = new WebSocketServer({ port: this.pipePath });
        this.api = new rpc.Server(this.serverInstance).api();
        this.serverInstance.on("listening", launchCallback.bind(this, resolve));
        this.serverInstance.on("error", errorCallback);
        this.setupApiHandlers();
    }
    setupApiHandlers() {
        let methods = {};
        methods.stopMonitoringLogCat = this.stopMonitoringLogCat.bind(this);
        methods.getPackagerPort = this.getPackagerPort.bind(this);
        methods.sendTelemetry = this.sendTelemetry.bind(this);
        methods.openFileAtLocation = this.openFileAtLocation.bind(this);
        methods.showInformationMessage = this.showInformationMessage.bind(this);
        methods.launch = this.launch.bind(this);
        methods.showDevMenu = this.showDevMenu.bind(this);
        methods.reloadApp = this.reloadApp.bind(this);
        this.api.Extension.expose(methods);
    }
    showDevMenu(deviceId) {
        this.api.Debugger.emitShowDevMenu(deviceId);
    }
    reloadApp(deviceId) {
        this.api.Debugger.emitReloadApp(deviceId);
    }
    /**
     * Recovers the server in case the named socket we use already exists, but no other instance of VSCode is active.
     */
    recoverServer(resolve, reject, error) {
        let errorHandler = (e) => {
            /* The named socket is not used. */
            if (e.code === "ECONNREFUSED") {
                new fileSystem_1.FileSystem().removePathRecursivelyAsync(this.pipePath)
                    .then(() => {
                    if (resolve && reject) {
                        return this._setup(resolve, reject);
                    }
                    else {
                        return this.setup();
                    }
                })
                    .done();
            }
        };
        /* The named socket already exists. */
        if (error.code === "EADDRINUSE") {
            let clientSocket = new WebSocket(`ws+unix://${this.pipePath}`);
            clientSocket.on("error", errorHandler);
            clientSocket.on("open", function () {
                clientSocket.close();
            });
        }
    }
    /**
     * Message handler for GET_PACKAGER_PORT.
     */
    getPackagerPort(projectFolder) {
        return settingsHelper_1.SettingsHelper.getPackagerPort(projectFolder);
    }
    /**
     * Message handler for OPEN_FILE_AT_LOCATION
     */
    openFileAtLocation(openFileRequest) {
        const { filename, lineNumber } = openFileRequest;
        return new Promise((resolve) => {
            vscode.workspace.openTextDocument(vscode.Uri.file(filename))
                .then((document) => {
                vscode.window.showTextDocument(document)
                    .then((editor) => {
                    let range = editor.document.lineAt(lineNumber - 1).range;
                    editor.selection = new vscode.Selection(range.start, range.end);
                    editor.revealRange(range, vscode.TextEditorRevealType.InCenter);
                    resolve();
                });
            });
        });
    }
    stopMonitoringLogCat() {
        if (this.logCatMonitor) {
            this.logCatMonitor.dispose();
            this.logCatMonitor = null;
        }
    }
    /**
     * Sends telemetry
     */
    sendTelemetry(telemetryRequest) {
        const { extensionId, extensionVersion, appInsightsKey, eventName, properties, measures } = telemetryRequest;
        telemetry_1.Telemetry.sendExtensionTelemetry(extensionId, extensionVersion, appInsightsKey, eventName, properties, measures);
    }
    /**
     * Message handler for SHOW_INFORMATION_MESSAGE
     */
    showInformationMessage(message) {
        vscode.window.showInformationMessage(message);
    }
    launch(request) {
        let mobilePlatformOptions = requestSetup(request.arguments);
        // We add the parameter if it's defined (adapter crashes otherwise)
        if (!isNullOrUndefined(request.arguments.logCatArguments)) {
            mobilePlatformOptions.logCatArguments = [parseLogCatArguments(request.arguments.logCatArguments)];
        }
        if (!isNullOrUndefined(request.arguments.variant)) {
            mobilePlatformOptions.variant = request.arguments.variant;
        }
        if (!isNullOrUndefined(request.arguments.scheme)) {
            mobilePlatformOptions.scheme = request.arguments.scheme;
        }
        if (!isNullOrUndefined(request.arguments.productName)) {
            mobilePlatformOptions.productName = request.arguments.productName;
        }
        if (!isNullOrUndefined(request.arguments.launchActivity)) {
            mobilePlatformOptions.debugLaunchActivity = request.arguments.launchActivity;
        }
        if (request.arguments.type === "reactnativedirect") {
            mobilePlatformOptions.isDirect = true;
        }
        mobilePlatformOptions.packagerPort = settingsHelper_1.SettingsHelper.getPackagerPort(request.arguments.cwd || request.arguments.program);
        const platformDeps = {
            packager: this.reactNativePackager,
        };
        const mobilePlatform = new platformResolver_1.PlatformResolver()
            .resolveMobilePlatform(request.arguments.platform, mobilePlatformOptions, platformDeps);
        return new Promise((resolve, reject) => {
            let extProps = {
                platform: {
                    value: request.arguments.platform,
                    isPii: false,
                },
            };
            if (mobilePlatformOptions.isDirect) {
                extProps.isDirect = {
                    value: true,
                    isPii: false,
                };
            }
            telemetryHelper_1.TelemetryHelper.generate("launch", extProps, (generator) => {
                generator.step("checkPlatformCompatibility");
                targetPlatformHelper_1.TargetPlatformHelper.checkTargetPlatformSupport(mobilePlatformOptions.platform);
                return mobilePlatform.beforeStartPackager()
                    .then(() => {
                    generator.step("startPackager");
                    return mobilePlatform.startPackager();
                })
                    .then(() => {
                    // We've seen that if we don't prewarm the bundle cache, the app fails on the first attempt to connect to the debugger logic
                    // and the user needs to Reload JS manually. We prewarm it to prevent that issue
                    generator.step("prewarmBundleCache");
                    this.logger.info(localize(0, null));
                    return mobilePlatform.prewarmBundleCache();
                })
                    .then(() => {
                    generator.step("mobilePlatform.runApp").add("target", mobilePlatformOptions.target, false);
                    this.logger.info(localize(1, null));
                    return mobilePlatform.runApp();
                })
                    .then(() => {
                    if (mobilePlatformOptions.isDirect) {
                        generator.step("mobilePlatform.enableDirectDebuggingMode");
                        if (request.arguments.platform === "android") {
                            this.logger.info(localize(2, null));
                        }
                        return mobilePlatform.disableJSDebuggingMode();
                    }
                    generator.step("mobilePlatform.enableJSDebuggingMode");
                    this.logger.info(localize(3, null));
                    return mobilePlatform.enableJSDebuggingMode();
                })
                    .then(() => {
                    resolve();
                })
                    .catch(error => {
                    this.logger.error(error);
                    reject(error);
                });
            });
        });
    }
}
exports.ExtensionServer = ExtensionServer;
/**
 * Parses log cat arguments to a string
 */
function parseLogCatArguments(userProvidedLogCatArguments) {
    return Array.isArray(userProvidedLogCatArguments)
        ? userProvidedLogCatArguments.join(" ") // If it's an array, we join the arguments
        : userProvidedLogCatArguments; // If not, we leave it as-is
}
function isNullOrUndefined(value) {
    return typeof value === "undefined" || value === null;
}
function requestSetup(args) {
    const workspaceFolder = vscode.workspace.getWorkspaceFolder(vscode.Uri.file(args.cwd || args.program));
    const projectRootPath = getProjectRoot(args);
    let mobilePlatformOptions = {
        workspaceRoot: workspaceFolder.uri.fsPath,
        projectRoot: projectRootPath,
        platform: args.platform,
        env: args.env,
        envFile: args.envFile,
        target: args.target || "simulator",
    };
    if (!args.runArguments) {
        let runArgs = settingsHelper_1.SettingsHelper.getRunArgs(args.platform, args.target || "simulator", workspaceFolder.uri);
        mobilePlatformOptions.runArguments = runArgs;
    }
    else {
        mobilePlatformOptions.runArguments = args.runArguments;
    }
    return mobilePlatformOptions;
}
function getProjectRoot(args) {
    return settingsHelper_1.SettingsHelper.getReactNativeProjectRoot(args.cwd || args.program);
}

//# sourceMappingURL=extensionServer.js.map
