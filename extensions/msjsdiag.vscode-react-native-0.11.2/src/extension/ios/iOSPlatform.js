"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
Object.defineProperty(exports, "__esModule", { value: true });
const Q = require("q");
const path = require("path");
const semver = require("semver");
const childProcess_1 = require("../../common/node/childProcess");
const commandExecutor_1 = require("../../common/commandExecutor");
const generalMobilePlatform_1 = require("../generalMobilePlatform");
const plistBuddy_1 = require("./plistBuddy");
const iOSDebugModeManager_1 = require("./iOSDebugModeManager");
const outputVerifier_1 = require("../../common/outputVerifier");
const settingsHelper_1 = require("../settingsHelper");
const remoteExtension_1 = require("../../common/remoteExtension");
const reactNativeProjectHelper_1 = require("../../common/reactNativeProjectHelper");
const telemetryHelper_1 = require("../../common/telemetryHelper");
const internalErrorCode_1 = require("../../common/error/internalErrorCode");
const nls = require("vscode-nls");
const localize = nls.loadMessageBundle(__filename);
class IOSPlatform extends generalMobilePlatform_1.GeneralMobilePlatform {
    constructor(runOptions, platformDeps = {}) {
        super(runOptions, platformDeps);
        this.runOptions = runOptions;
        this.plistBuddy = new plistBuddy_1.PlistBuddy();
        this.targetType = "simulator";
        this.defaultConfiguration = "Debug";
        this.configurationArgumentName = "--configuration";
        this.runOptions.configuration = this.getConfiguration();
        if (this.runOptions.iosRelativeProjectPath) { // Deprecated option
            this.logger.warning(localize(0, null));
        }
        this.iosProjectRoot = path.join(this.projectPath, this.runOptions.iosRelativeProjectPath || IOSPlatform.DEFAULT_IOS_PROJECT_RELATIVE_PATH);
        const schemeFromArgs = IOSPlatform.getOptFromRunArgs(this.runArguments, "--scheme", false);
        this.iosDebugModeManager = new iOSDebugModeManager_1.IOSDebugModeManager(this.iosProjectRoot, schemeFromArgs ? schemeFromArgs : this.runOptions.scheme);
        if (this.runArguments && this.runArguments.length > 0) {
            this.targetType = (this.runArguments.indexOf(`--${IOSPlatform.deviceString}`) >= 0) ?
                IOSPlatform.deviceString : IOSPlatform.simulatorString;
            return;
        }
        if (this.runOptions.target && (this.runOptions.target !== IOSPlatform.simulatorString &&
            this.runOptions.target !== IOSPlatform.deviceString)) {
            this.targetType = IOSPlatform.simulatorString;
            return;
        }
        this.targetType = this.runOptions.target || IOSPlatform.simulatorString;
    }
    showDevMenu(deviceId) {
        return IOSPlatform.remote(this.runOptions.projectRoot).showDevMenu(deviceId);
    }
    reloadApp(deviceId) {
        return IOSPlatform.remote(this.runOptions.projectRoot).reloadApp(deviceId);
    }
    runApp() {
        const extProps = {
            platform: {
                value: "ios",
                isPii: false,
            },
        };
        return telemetryHelper_1.TelemetryHelper.generate("iOSPlatform.runApp", extProps, () => {
            // Compile, deploy, and launch the app on either a simulator or a device
            const env = this.getEnvArgument();
            return reactNativeProjectHelper_1.ReactNativeProjectHelper.getReactNativeVersion(this.runOptions.projectRoot)
                .then(version => {
                if (!semver.valid(version) /*Custom RN implementations should support this flag*/ || semver.gte(version, IOSPlatform.NO_PACKAGER_VERSION)) {
                    this.runArguments.push("--no-packager");
                }
                // Since @react-native-community/cli@2.1.0 build output are hidden by default
                // we are using `--verbose` to show it as it contains `BUILD SUCCESSFUL` and other patterns
                if (semver.gte(version, "0.60.0")) {
                    this.runArguments.push("--verbose");
                }
                const runIosSpawn = new commandExecutor_1.CommandExecutor(this.projectPath, this.logger).spawnReactCommand("run-ios", this.runArguments, { env });
                return new outputVerifier_1.OutputVerifier(() => this.generateSuccessPatterns(version), () => Q(IOSPlatform.RUN_IOS_FAILURE_PATTERNS), "ios")
                    .process(runIosSpawn);
            });
        });
    }
    enableJSDebuggingMode() {
        // Configure the app for debugging
        if (this.targetType === IOSPlatform.deviceString) {
            // Note that currently we cannot automatically switch the device into debug mode.
            this.logger.info("Application is running on a device, please shake device and select 'Debug JS Remotely' to enable debugging.");
            return Q.resolve(void 0);
        }
        // Wait until the configuration file exists, and check to see if debugging is enabled
        return Q.all([
            this.iosDebugModeManager.getSimulatorRemoteDebuggingSetting(this.runOptions.configuration, this.runOptions.productName),
            this.getBundleId(),
        ])
            .spread((debugModeEnabled, bundleId) => {
            if (debugModeEnabled) {
                return Q.resolve(void 0);
            }
            // Debugging must still be enabled
            // We enable debugging by writing to a plist file that backs a NSUserDefaults object,
            // but that file is written to by the app on occasion. To avoid races, we shut the app
            // down before writing to the file.
            const childProcess = new childProcess_1.ChildProcess();
            return childProcess.execToString("xcrun simctl spawn booted launchctl list")
                .then((output) => {
                // Try to find an entry that looks like UIKitApplication:com.example.myApp[0x4f37]
                const regex = new RegExp(`(\\S+${bundleId}\\S+)`);
                const match = regex.exec(output);
                // If we don't find a match, the app must not be running and so we do not need to close it
                return match ? childProcess.exec(`xcrun simctl spawn booted launchctl stop ${match[1]}`) : null;
            })
                .then(() => {
                // Write to the settings file while the app is not running to avoid races
                return this.iosDebugModeManager.setSimulatorRemoteDebuggingSetting(/*enable=*/ true, this.runOptions.configuration, this.runOptions.productName);
            })
                .then(() => {
                // Relaunch the app
                return this.runApp();
            });
        });
    }
    disableJSDebuggingMode() {
        return this.iosDebugModeManager.setSimulatorRemoteDebuggingSetting(/*enable=*/ false, this.runOptions.configuration, this.runOptions.productName);
    }
    prewarmBundleCache() {
        return this.packager.prewarmBundleCache("ios");
    }
    getRunArguments() {
        let runArguments = [];
        if (this.runOptions.runArguments && this.runOptions.runArguments.length > 0) {
            runArguments = this.runOptions.runArguments;
            if (this.runOptions.scheme) {
                const schemeFromArgs = IOSPlatform.getOptFromRunArgs(runArguments, "--scheme", false);
                if (!schemeFromArgs) {
                    runArguments.push("--scheme", this.runOptions.scheme);
                }
                else {
                    this.logger.warning(localize(1, null));
                }
            }
        }
        else {
            if (this.runOptions.target) {
                if (this.runOptions.target === IOSPlatform.deviceString ||
                    this.runOptions.target === IOSPlatform.simulatorString) {
                    runArguments.push(`--${this.runOptions.target}`);
                }
                else {
                    runArguments.push("--simulator", `${this.runOptions.target}`);
                }
            }
            if (this.runOptions.iosRelativeProjectPath) {
                runArguments.push("--project-path", this.runOptions.iosRelativeProjectPath);
            }
            // provide any defined scheme
            if (this.runOptions.scheme) {
                runArguments.push("--scheme", this.runOptions.scheme);
            }
        }
        return runArguments;
    }
    generateSuccessPatterns(version) {
        // Clone RUN_IOS_SUCCESS_PATTERNS to avoid its runtime mutation
        let successPatterns = [...IOSPlatform.RUN_IOS_SUCCESS_PATTERNS];
        if (this.targetType === IOSPlatform.deviceString) {
            if (semver.gte(version, "0.60.0")) {
                successPatterns.push("success Installed the app on the device");
            }
            else {
                successPatterns.push("INSTALLATION SUCCEEDED");
            }
            return Q(successPatterns);
        }
        else {
            return this.getBundleId()
                .then(bundleId => {
                if (semver.gte(version, "0.60.0")) {
                    successPatterns.push(`Launching "${bundleId}"\nsuccess Successfully launched the app `);
                }
                else {
                    successPatterns.push(`Launching ${bundleId}\n${bundleId}: `);
                }
                return successPatterns;
            });
        }
    }
    getConfiguration() {
        return IOSPlatform.getOptFromRunArgs(this.runArguments, this.configurationArgumentName) || this.defaultConfiguration;
    }
    getBundleId() {
        let scheme = this.runOptions.scheme;
        if (!scheme) {
            const schemeFromArgs = IOSPlatform.getOptFromRunArgs(this.runArguments, "--scheme", false);
            if (schemeFromArgs) {
                scheme = schemeFromArgs;
            }
        }
        return this.plistBuddy.getBundleId(this.iosProjectRoot, true, this.runOptions.configuration, this.runOptions.productName, scheme);
    }
    static remote(fsPath) {
        if (this.remoteExtension) {
            return this.remoteExtension;
        }
        else {
            return this.remoteExtension = remoteExtension_1.RemoteExtension.atProjectRootPath(settingsHelper_1.SettingsHelper.getReactNativeProjectRoot(fsPath));
        }
    }
}
IOSPlatform.DEFAULT_IOS_PROJECT_RELATIVE_PATH = "ios";
// We should add the common iOS build/run errors we find to this list
IOSPlatform.RUN_IOS_FAILURE_PATTERNS = [{
        pattern: "No devices are booted",
        errorCode: internalErrorCode_1.InternalErrorCode.IOSSimulatorNotLaunchable,
    }, {
        pattern: "FBSOpenApplicationErrorDomain",
        errorCode: internalErrorCode_1.InternalErrorCode.IOSSimulatorNotLaunchable,
    }, {
        pattern: "ios-deploy",
        errorCode: internalErrorCode_1.InternalErrorCode.IOSDeployNotFound,
    }];
IOSPlatform.RUN_IOS_SUCCESS_PATTERNS = ["BUILD SUCCEEDED"];
exports.IOSPlatform = IOSPlatform;

//# sourceMappingURL=iOSPlatform.js.map
