"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
Object.defineProperty(exports, "__esModule", { value: true });
var InternalErrorCode;
(function (InternalErrorCode) {
    // Command Executor errors
    InternalErrorCode[InternalErrorCode["CommandFailed"] = 101] = "CommandFailed";
    InternalErrorCode[InternalErrorCode["CommandFailedWithErrorCode"] = 102] = "CommandFailedWithErrorCode";
    InternalErrorCode[InternalErrorCode["PackagerStartFailed"] = 103] = "PackagerStartFailed";
    InternalErrorCode[InternalErrorCode["FailedToRunOnAndroid"] = 104] = "FailedToRunOnAndroid";
    InternalErrorCode[InternalErrorCode["FailedToRunOnIos"] = 105] = "FailedToRunOnIos";
    InternalErrorCode[InternalErrorCode["FailedToStartPackager"] = 106] = "FailedToStartPackager";
    InternalErrorCode[InternalErrorCode["FailedToStopPackager"] = 107] = "FailedToStopPackager";
    InternalErrorCode[InternalErrorCode["PackagerRunningInDifferentPort"] = 108] = "PackagerRunningInDifferentPort";
    InternalErrorCode[InternalErrorCode["FailedToRestartPackager"] = 109] = "FailedToRestartPackager";
    InternalErrorCode[InternalErrorCode["FailedToRunExponent"] = 110] = "FailedToRunExponent";
    InternalErrorCode[InternalErrorCode["FailedToPublishToExpHost"] = 111] = "FailedToPublishToExpHost";
    InternalErrorCode[InternalErrorCode["UnsupportedCommandStatus"] = 112] = "UnsupportedCommandStatus";
    // Device Deployer errors
    InternalErrorCode[InternalErrorCode["IOSDeployNotFound"] = 201] = "IOSDeployNotFound";
    // Device Runner errors
    InternalErrorCode[InternalErrorCode["DeviceNotPluggedIn"] = 301] = "DeviceNotPluggedIn";
    InternalErrorCode[InternalErrorCode["DeveloperDiskImgNotMountable"] = 302] = "DeveloperDiskImgNotMountable";
    InternalErrorCode[InternalErrorCode["UnableToLaunchApplication"] = 303] = "UnableToLaunchApplication";
    InternalErrorCode[InternalErrorCode["ApplicationLaunchTimedOut"] = 304] = "ApplicationLaunchTimedOut";
    // iOS Platform errors
    InternalErrorCode[InternalErrorCode["IOSSimulatorNotLaunchable"] = 401] = "IOSSimulatorNotLaunchable";
    InternalErrorCode[InternalErrorCode["IOSFoundMoreThanOneExecutablesCleanupBuildFolder"] = 402] = "IOSFoundMoreThanOneExecutablesCleanupBuildFolder";
    InternalErrorCode[InternalErrorCode["IOSCouldNotFoundExecutableInFolder"] = 403] = "IOSCouldNotFoundExecutableInFolder";
    // Packager errors
    InternalErrorCode[InternalErrorCode["OpnPackagerLocationNotFound"] = 501] = "OpnPackagerLocationNotFound";
    InternalErrorCode[InternalErrorCode["OpnPackagerNotFound"] = 502] = "OpnPackagerNotFound";
    InternalErrorCode[InternalErrorCode["FailedToStopPackagerOnExit"] = 503] = "FailedToStopPackagerOnExit";
    InternalErrorCode[InternalErrorCode["CannotAttachToPackagerCheckPackagerRunningOnPort"] = 504] = "CannotAttachToPackagerCheckPackagerRunningOnPort";
    InternalErrorCode[InternalErrorCode["AnotherDebuggerConnectedToPackager"] = 505] = "AnotherDebuggerConnectedToPackager";
    // React Native Project errors
    InternalErrorCode[InternalErrorCode["ProjectVersionNotParsable"] = 601] = "ProjectVersionNotParsable";
    InternalErrorCode[InternalErrorCode["ProjectVersionUnsupported"] = 602] = "ProjectVersionUnsupported";
    InternalErrorCode[InternalErrorCode["ProjectVersionNotReadable"] = 603] = "ProjectVersionNotReadable";
    InternalErrorCode[InternalErrorCode["NotInReactNativeFolderError"] = 604] = "NotInReactNativeFolderError";
    InternalErrorCode[InternalErrorCode["CouldNotFindProjectVersion"] = 605] = "CouldNotFindProjectVersion";
    // Miscellaneous errors
    InternalErrorCode[InternalErrorCode["TelemetryInitializationFailed"] = 701] = "TelemetryInitializationFailed";
    InternalErrorCode[InternalErrorCode["ExtensionActivationFailed"] = 702] = "ExtensionActivationFailed";
    InternalErrorCode[InternalErrorCode["DebuggerStubLauncherFailed"] = 703] = "DebuggerStubLauncherFailed";
    InternalErrorCode[InternalErrorCode["IntellisenseSetupFailed"] = 704] = "IntellisenseSetupFailed";
    InternalErrorCode[InternalErrorCode["NodeDebuggerConfigurationFailed"] = 705] = "NodeDebuggerConfigurationFailed";
    InternalErrorCode[InternalErrorCode["DebuggingFailed"] = 706] = "DebuggingFailed";
    InternalErrorCode[InternalErrorCode["RNTempFolderDeletionFailed"] = 707] = "RNTempFolderDeletionFailed";
    InternalErrorCode[InternalErrorCode["DebuggingFailedInNodeWrapper"] = 708] = "DebuggingFailedInNodeWrapper";
    InternalErrorCode[InternalErrorCode["PlatformNotSupported"] = 709] = "PlatformNotSupported";
    InternalErrorCode[InternalErrorCode["WorkspaceNotFound"] = 710] = "WorkspaceNotFound";
    InternalErrorCode[InternalErrorCode["ExpectedExponentTunnelPath"] = 711] = "ExpectedExponentTunnelPath";
    InternalErrorCode[InternalErrorCode["NotAllSuccessPatternsMatched"] = 712] = "NotAllSuccessPatternsMatched";
    InternalErrorCode[InternalErrorCode["CouldNotParsePackageVersion"] = 713] = "CouldNotParsePackageVersion";
    InternalErrorCode[InternalErrorCode["PackageNotFound"] = 714] = "PackageNotFound";
    InternalErrorCode[InternalErrorCode["ReactDevtoolsIsNotInstalled"] = 715] = "ReactDevtoolsIsNotInstalled";
    // Activation errors
    InternalErrorCode[InternalErrorCode["CouldNotFindLocationOfNodeDebugger"] = 801] = "CouldNotFindLocationOfNodeDebugger";
    InternalErrorCode[InternalErrorCode["CouldNotFindWorkspace"] = 802] = "CouldNotFindWorkspace";
    // Inter Process Communication errors
    InternalErrorCode[InternalErrorCode["ErrorWhileProcessingMessageInIPMSServer"] = 901] = "ErrorWhileProcessingMessageInIPMSServer";
    InternalErrorCode[InternalErrorCode["ErrorNoPipeFound"] = 902] = "ErrorNoPipeFound";
    // Validating user input errors
    InternalErrorCode[InternalErrorCode["ExpectedIntegerValue"] = 1001] = "ExpectedIntegerValue";
    InternalErrorCode[InternalErrorCode["ExpectedStringValue"] = 1002] = "ExpectedStringValue";
    InternalErrorCode[InternalErrorCode["ExpectedBooleanValue"] = 1003] = "ExpectedBooleanValue";
    InternalErrorCode[InternalErrorCode["ExpectedArrayValue"] = 1004] = "ExpectedArrayValue";
    InternalErrorCode[InternalErrorCode["ExpectedObjectValue"] = 1005] = "ExpectedObjectValue";
    // Exponent errors
    InternalErrorCode[InternalErrorCode["RNVersionNotSupportedByExponent"] = 1101] = "RNVersionNotSupportedByExponent";
    InternalErrorCode[InternalErrorCode["UserCancelledExpoLogin"] = 1102] = "UserCancelledExpoLogin";
    // Android errors
    InternalErrorCode[InternalErrorCode["AndroidCouldNotInstallTheAppOnAnyAvailibleDevice"] = 1201] = "AndroidCouldNotInstallTheAppOnAnyAvailibleDevice";
    InternalErrorCode[InternalErrorCode["AndroidShellCommandTimedOut"] = 1202] = "AndroidShellCommandTimedOut";
    InternalErrorCode[InternalErrorCode["AndroidProjectNotFound"] = 1203] = "AndroidProjectNotFound";
    InternalErrorCode[InternalErrorCode["AndroidMoreThanOneDeviceOrEmulator"] = 1204] = "AndroidMoreThanOneDeviceOrEmulator";
    InternalErrorCode[InternalErrorCode["AndroidFailedToLaunchTheSpecifiedActivity"] = 1205] = "AndroidFailedToLaunchTheSpecifiedActivity";
    // Windows Phone errors
    InternalErrorCode[InternalErrorCode["WinRNMPPluginIsNotInstalled"] = 1301] = "WinRNMPPluginIsNotInstalled";
    // Debugger errors
    InternalErrorCode[InternalErrorCode["SourcesStoragePathIsNullOrEmpty"] = 1401] = "SourcesStoragePathIsNullOrEmpty";
    InternalErrorCode[InternalErrorCode["DebuggingWontWorkReloadJSAndReconnect"] = 1402] = "DebuggingWontWorkReloadJSAndReconnect";
    InternalErrorCode[InternalErrorCode["ReconnectionToPackagerFailedCheckForErrorsOrRestartReactNative"] = 1403] = "ReconnectionToPackagerFailedCheckForErrorsOrRestartReactNative";
    InternalErrorCode[InternalErrorCode["FailedToProcessMessageFromReactNativeApp"] = 1404] = "FailedToProcessMessageFromReactNativeApp";
    InternalErrorCode[InternalErrorCode["FailedToPrepareJSRuntimeEnvironment"] = 1405] = "FailedToPrepareJSRuntimeEnvironment";
    InternalErrorCode[InternalErrorCode["FailedToSendMessageToTheReactNativeApp"] = 1406] = "FailedToSendMessageToTheReactNativeApp";
    InternalErrorCode[InternalErrorCode["ReactNativeWorkerProcessThrownAnError"] = 1407] = "ReactNativeWorkerProcessThrownAnError";
    InternalErrorCode[InternalErrorCode["CouldntImportScriptAt"] = 1408] = "CouldntImportScriptAt";
    InternalErrorCode[InternalErrorCode["RNMessageWithMethodExecuteApplicationScriptDoesntHaveURLProperty"] = 1409] = "RNMessageWithMethodExecuteApplicationScriptDoesntHaveURLProperty";
})(InternalErrorCode = exports.InternalErrorCode || (exports.InternalErrorCode = {}));

//# sourceMappingURL=internalErrorCode.js.map
