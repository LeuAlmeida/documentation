"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
const Q = require("q");
const path = require("path");
const vscode = require("vscode");
const semver = require("semver");
const fileSystem_1 = require("../common/node/fileSystem");
const commandPaletteHandler_1 = require("./commandPaletteHandler");
const packager_1 = require("../common/packager");
const entryPointHandler_1 = require("../common/entryPointHandler");
const errorHelper_1 = require("../common/error/errorHelper");
const internalErrorCode_1 = require("../common/error/internalErrorCode");
const settingsHelper_1 = require("./settingsHelper");
const packagerStatusIndicator_1 = require("./packagerStatusIndicator");
const reactNativeProjectHelper_1 = require("../common/reactNativeProjectHelper");
const reactDirManager_1 = require("./reactDirManager");
const telemetry_1 = require("../common/telemetry");
const telemetryHelper_1 = require("../common/telemetryHelper");
const extensionServer_1 = require("./extensionServer");
const OutputChannelLogger_1 = require("./log/OutputChannelLogger");
const exponentHelper_1 = require("./exponent/exponentHelper");
const debugConfigurationProvider_1 = require("./debugConfigurationProvider");
const nls = require("vscode-nls");
const localize = nls.loadMessageBundle(__filename);
/* all components use the same packager instance */
const outputChannelLogger = OutputChannelLogger_1.OutputChannelLogger.getMainChannel();
const entryPointHandler = new entryPointHandler_1.EntryPointHandler(entryPointHandler_1.ProcessType.Extension, outputChannelLogger);
const fsUtil = new fileSystem_1.FileSystem();
let debugConfigProvider;
const APP_NAME = "react-native-tools";
function activate(context) {
    outputChannelLogger.debug("Begin to activate...");
    const appVersion = require(path.resolve(__dirname, "../../package.json")).version;
    outputChannelLogger.debug(`Extension version: ${appVersion}`);
    const ExtensionTelemetryReporter = require("vscode-extension-telemetry").default;
    const reporter = new ExtensionTelemetryReporter(APP_NAME, appVersion, telemetry_1.Telemetry.APPINSIGHTS_INSTRUMENTATIONKEY);
    const configProvider = new debugConfigurationProvider_1.ReactNativeDebugConfigProvider();
    const workspaceFolders = vscode.workspace.workspaceFolders;
    let extProps = {};
    if (workspaceFolders) {
        extProps = {
            ["workspaceFoldersCount"]: { value: workspaceFolders.length, isPii: false },
        };
    }
    return entryPointHandler.runApp(APP_NAME, appVersion, errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.ExtensionActivationFailed), reporter, function activateRunApp() {
        context.subscriptions.push(vscode.workspace.onDidChangeWorkspaceFolders((event) => onChangeWorkspaceFolders(context, event)));
        context.subscriptions.push(vscode.workspace.onDidChangeConfiguration((event) => onChangeConfiguration(context)));
        debugConfigProvider = vscode.debug.registerDebugConfigurationProvider("reactnative", configProvider);
        let activateExtensionEvent = telemetryHelper_1.TelemetryHelper.createTelemetryEvent("activate");
        telemetry_1.Telemetry.send(activateExtensionEvent);
        let promises = [];
        if (workspaceFolders) {
            outputChannelLogger.debug(`Projects found: ${workspaceFolders.length}`);
            workspaceFolders.forEach((folder) => {
                promises.push(onFolderAdded(context, folder));
            });
        }
        else {
            outputChannelLogger.warning("Could not find workspace while activating");
            telemetryHelper_1.TelemetryHelper.sendErrorEvent("ActivateCouldNotFindWorkspace", errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.CouldNotFindWorkspace));
        }
        return Q.all(promises).then(() => {
            return registerReactNativeCommands(context);
        });
    }, extProps);
}
exports.activate = activate;
function deactivate() {
    return Q.Promise(function (resolve) {
        // Kill any packager processes that we spawned
        entryPointHandler.runFunction("extension.deactivate", errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.FailedToStopPackagerOnExit), () => {
            debugConfigProvider.dispose();
            commandPaletteHandler_1.CommandPaletteHandler.stopAllPackagers()
                .then(() => {
                return commandPaletteHandler_1.CommandPaletteHandler.stopElementInspector();
            })
                .done(() => {
                // Tell vscode that we are done with deactivation
                resolve(void 0);
            });
        }, /*errorsAreFatal*/ true);
    });
}
exports.deactivate = deactivate;
function onChangeWorkspaceFolders(context, event) {
    if (event.removed.length) {
        event.removed.forEach((folder) => {
            onFolderRemoved(context, folder);
        });
    }
    if (event.added.length) {
        event.added.forEach((folder) => {
            onFolderAdded(context, folder);
        });
    }
}
function onChangeConfiguration(context) {
    // TODO implements
}
function onFolderAdded(context, folder) {
    let rootPath = folder.uri.fsPath;
    let projectRootPath = settingsHelper_1.SettingsHelper.getReactNativeProjectRoot(rootPath);
    outputChannelLogger.debug(`Add project: ${projectRootPath}`);
    return reactNativeProjectHelper_1.ReactNativeProjectHelper.getReactNativeVersion(projectRootPath)
        .then(version => {
        outputChannelLogger.debug(`React Native version: ${version}`);
        let promises = [];
        if (!version) {
            outputChannelLogger.debug("react-native version is empty");
            telemetryHelper_1.TelemetryHelper.sendErrorEvent("AddProjectReactNativeVersionIsEmpty", errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.CouldNotFindProjectVersion));
        }
        else if (isSupportedVersion(version)) {
            promises.push(entryPointHandler.runFunction("debugger.setupLauncherStub", errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.DebuggerStubLauncherFailed), () => {
                let reactDirManager = new reactDirManager_1.ReactDirManager(rootPath);
                return setupAndDispose(reactDirManager, context)
                    .then(() => {
                    let exponentHelper = new exponentHelper_1.ExponentHelper(rootPath, projectRootPath);
                    let packagerStatusIndicator = new packagerStatusIndicator_1.PackagerStatusIndicator();
                    let packager = new packager_1.Packager(rootPath, projectRootPath, settingsHelper_1.SettingsHelper.getPackagerPort(folder.uri.fsPath), packagerStatusIndicator);
                    let extensionServer = new extensionServer_1.ExtensionServer(projectRootPath, packager);
                    commandPaletteHandler_1.CommandPaletteHandler.addFolder(folder, {
                        packager,
                        exponentHelper,
                        reactDirManager,
                        extensionServer,
                    });
                    return setupAndDispose(extensionServer, context).then(() => { });
                });
            }));
            promises.push(entryPointHandler.runFunction("debugger.setupNodeDebuggerLocation", errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.NodeDebuggerConfigurationFailed), () => {
                return configureNodeDebuggerLocation();
            }));
        }
        else {
            outputChannelLogger.debug(`react-native@${version} isn't supported`);
        }
        return Q.all(promises).then(() => { });
    });
}
function onFolderRemoved(context, folder) {
    let project = commandPaletteHandler_1.CommandPaletteHandler.getFolder(folder);
    Object.keys(project).forEach((key) => {
        if (project[key].dispose) {
            project[key].dispose();
        }
    });
    outputChannelLogger.debug(`Delete project: ${folder.uri.fsPath}`);
    commandPaletteHandler_1.CommandPaletteHandler.delFolder(folder);
    try { // Preventing memory leaks
        context.subscriptions.forEach((element, index) => {
            if (element.isDisposed) {
                context.subscriptions.splice(index, 1); // Array.prototype.filter doesn't work, "context.subscriptions" is read only
            }
        });
    }
    catch (err) {
        // Ignore
    }
}
function configureNodeDebuggerLocation() {
    const nodeDebugExtension = vscode.extensions.getExtension("ms-vscode.node-debug2");
    if (!nodeDebugExtension) {
        return Q.reject(errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.CouldNotFindLocationOfNodeDebugger));
    }
    const nodeDebugPath = nodeDebugExtension.extensionPath;
    return fsUtil.writeFile(path.resolve(__dirname, "../", "debugger", "nodeDebugLocation.json"), JSON.stringify({ nodeDebugPath }));
}
function setupAndDispose(setuptableDisposable, context) {
    return setuptableDisposable.setup()
        .then(() => {
        context.subscriptions.push(setuptableDisposable);
        return setuptableDisposable;
    });
}
function isSupportedVersion(version) {
    if (!!semver.valid(version) && !semver.gte(version, "0.19.0")) {
        telemetryHelper_1.TelemetryHelper.sendSimpleEvent("unsupportedRNVersion", { rnVersion: version });
        const shortMessage = localize(0, null);
        const longMessage = `${shortMessage}: ${version}`;
        vscode.window.showWarningMessage(shortMessage);
        outputChannelLogger.warning(longMessage);
        return false;
    }
    else {
        // !!semver.valid(version) === false is OK for us, someone can use custom RN implementation with custom version e.g. -> "0.2018.0107-v1"
        return true;
    }
}
function registerReactNativeCommands(context) {
    registerVSCodeCommand(context, "runAndroidSimulator", errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.FailedToRunOnAndroid), () => commandPaletteHandler_1.CommandPaletteHandler.runAndroid("simulator"));
    registerVSCodeCommand(context, "runAndroidDevice", errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.FailedToRunOnAndroid), () => commandPaletteHandler_1.CommandPaletteHandler.runAndroid("device"));
    registerVSCodeCommand(context, "runIosSimulator", errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.FailedToRunOnIos), () => commandPaletteHandler_1.CommandPaletteHandler.runIos("simulator"));
    registerVSCodeCommand(context, "runIosDevice", errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.FailedToRunOnIos), () => commandPaletteHandler_1.CommandPaletteHandler.runIos("device"));
    registerVSCodeCommand(context, "runExponent", errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.FailedToRunExponent), () => commandPaletteHandler_1.CommandPaletteHandler.runExponent());
    registerVSCodeCommand(context, "startPackager", errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.FailedToStartPackager), () => commandPaletteHandler_1.CommandPaletteHandler.startPackager());
    registerVSCodeCommand(context, "stopPackager", errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.FailedToStopPackager), () => commandPaletteHandler_1.CommandPaletteHandler.stopPackager());
    registerVSCodeCommand(context, "restartPackager", errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.FailedToRestartPackager), () => commandPaletteHandler_1.CommandPaletteHandler.restartPackager());
    registerVSCodeCommand(context, "publishToExpHost", errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.FailedToPublishToExpHost), () => commandPaletteHandler_1.CommandPaletteHandler.publishToExpHost());
    registerVSCodeCommand(context, "showDevMenu", errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.CommandFailed, localize(1, null)), () => commandPaletteHandler_1.CommandPaletteHandler.showDevMenu());
    registerVSCodeCommand(context, "reloadApp", errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.CommandFailed, localize(2, null)), () => commandPaletteHandler_1.CommandPaletteHandler.reloadApp());
    registerVSCodeCommand(context, "runInspector", errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.CommandFailed, localize(3, null)), () => commandPaletteHandler_1.CommandPaletteHandler.runElementInspector());
}
function registerVSCodeCommand(context, commandName, error, commandHandler) {
    context.subscriptions.push(vscode.commands.registerCommand(`reactNative.${commandName}`, () => {
        const extProps = {
            platform: {
                value: commandPaletteHandler_1.CommandPaletteHandler.getPlatformByCommandName(commandName),
                isPii: false,
            },
        };
        outputChannelLogger.debug(`Run command: ${commandName}`);
        return entryPointHandler.runFunctionWExtProps(`commandPalette.${commandName}`, extProps, error, commandHandler);
    }));
}

//# sourceMappingURL=rn-extension.js.map
