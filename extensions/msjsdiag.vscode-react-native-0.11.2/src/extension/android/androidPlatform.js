"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
Object.defineProperty(exports, "__esModule", { value: true });
const Q = require("q");
const semver = require("semver");
const generalMobilePlatform_1 = require("../generalMobilePlatform");
const adb_1 = require("./adb");
const package_1 = require("../../common/node/package");
const promise_1 = require("../../common/node/promise");
const packageNameResolver_1 = require("./packageNameResolver");
const outputVerifier_1 = require("../../common/outputVerifier");
const telemetryHelper_1 = require("../../common/telemetryHelper");
const commandExecutor_1 = require("../../common/commandExecutor");
const logCatMonitor_1 = require("./logCatMonitor");
const reactNativeProjectHelper_1 = require("../../common/reactNativeProjectHelper");
const nls = require("vscode-nls");
const internalErrorCode_1 = require("../../common/error/internalErrorCode");
const errorHelper_1 = require("../../common/error/errorHelper");
const util_1 = require("util");
const localize = nls.loadMessageBundle(__filename);
/**
 * Android specific platform implementation for debugging RN applications.
 */
class AndroidPlatform extends generalMobilePlatform_1.GeneralMobilePlatform {
    // We set remoteExtension = null so that if there is an instance of androidPlatform that wants to have it's custom remoteExtension it can. This is specifically useful for tests.
    constructor(runOptions, platformDeps = {}) {
        super(runOptions, platformDeps);
        this.runOptions = runOptions;
        this.logCatMonitor = null;
        this.needsToLaunchApps = false;
        this.adbHelper = new adb_1.AdbHelper(this.runOptions.projectRoot, this.logger);
    }
    showDevMenu(deviceId) {
        return this.adbHelper.showDevMenu(deviceId);
    }
    reloadApp(deviceId) {
        return this.adbHelper.reloadApp(deviceId);
    }
    // TODO: remove this method when sinon will be updated to upper version. Now it is used for tests only.
    setAdbHelper(adbHelper) {
        this.adbHelper = adbHelper;
    }
    runApp(shouldLaunchInAllDevices = false) {
        const extProps = {
            platform: {
                value: "android",
                isPii: false,
            },
        };
        return telemetryHelper_1.TelemetryHelper.generate("AndroidPlatform.runApp", extProps, () => {
            const env = this.getEnvArgument();
            return reactNativeProjectHelper_1.ReactNativeProjectHelper.getReactNativeVersion(this.runOptions.projectRoot)
                .then(version => {
                if (!semver.valid(version) /*Custom RN implementations should support this flag*/ || semver.gte(version, AndroidPlatform.NO_PACKAGER_VERSION)) {
                    this.runArguments.push("--no-packager");
                }
                let mainActivity = generalMobilePlatform_1.GeneralMobilePlatform.getOptFromRunArgs(this.runArguments, "--main-activity");
                if (mainActivity) {
                    this.adbHelper.setLaunchActivity(mainActivity);
                }
                else if (!util_1.isNullOrUndefined(this.runOptions.debugLaunchActivity)) {
                    this.runArguments.push("--main-activity", this.runOptions.debugLaunchActivity);
                    this.adbHelper.setLaunchActivity(this.runOptions.debugLaunchActivity);
                }
                const runAndroidSpawn = new commandExecutor_1.CommandExecutor(this.projectPath, this.logger).spawnReactCommand("run-android", this.runArguments, { env });
                const output = new outputVerifier_1.OutputVerifier(() => Q(AndroidPlatform.RUN_ANDROID_SUCCESS_PATTERNS), () => Q(AndroidPlatform.RUN_ANDROID_FAILURE_PATTERNS), "android").process(runAndroidSpawn);
                return output
                    .finally(() => {
                    return this.initializeTargetDevicesAndPackageName();
                }).then(() => [this.debugTarget], reason => {
                    if (reason.message === errorHelper_1.ErrorHelper.getInternalError(internalErrorCode_1.InternalErrorCode.AndroidMoreThanOneDeviceOrEmulator).message && this.devices.length > 1 && this.debugTarget) {
                        /* If it failed due to multiple devices, we'll apply this workaround to make it work anyways */
                        this.needsToLaunchApps = true;
                        return shouldLaunchInAllDevices
                            ? this.adbHelper.getOnlineDevices()
                            : Q([this.debugTarget]);
                    }
                    else {
                        return Q.reject(reason);
                    }
                }).then(devices => {
                    return new promise_1.PromiseUtil().forEach(devices, device => {
                        return this.launchAppWithADBReverseAndLogCat(device);
                    });
                });
            });
        });
    }
    enableJSDebuggingMode() {
        return this.adbHelper.switchDebugMode(this.runOptions.projectRoot, this.packageName, true, this.debugTarget.id);
    }
    disableJSDebuggingMode() {
        return this.adbHelper.switchDebugMode(this.runOptions.projectRoot, this.packageName, false, this.debugTarget.id);
    }
    prewarmBundleCache() {
        return this.packager.prewarmBundleCache("android");
    }
    getRunArguments() {
        let runArguments = [];
        if (this.runOptions.runArguments && this.runOptions.runArguments.length > 0) {
            runArguments = this.runOptions.runArguments;
        }
        else {
            if (this.runOptions.variant) {
                runArguments.push("--variant", this.runOptions.variant);
            }
            if (this.runOptions.target) {
                if (this.runOptions.target === AndroidPlatform.simulatorString ||
                    this.runOptions.target === AndroidPlatform.deviceString) {
                    const message = localize(0, null, this.runOptions.target);
                    this.logger.warning(message);
                }
                else {
                    runArguments.push("--deviceId", this.runOptions.target);
                }
            }
        }
        return runArguments;
    }
    initializeTargetDevicesAndPackageName() {
        return this.adbHelper.getConnectedDevices().then(devices => {
            this.devices = devices;
            this.debugTarget = this.getTargetEmulator(devices);
            return this.getPackageName().then(packageName => {
                this.packageName = packageName;
            });
        });
    }
    launchAppWithADBReverseAndLogCat(device) {
        return Q({})
            .then(() => {
            return this.configureADBReverseWhenApplicable(device);
        }).then(() => {
            return this.needsToLaunchApps
                ? this.adbHelper.launchApp(this.runOptions.projectRoot, this.packageName, device.id)
                : Q(void 0);
        }).then(() => {
            return this.startMonitoringLogCat(device, this.runOptions.logCatArguments);
        });
    }
    configureADBReverseWhenApplicable(device) {
        return Q({}) // For other emulators and devices we try to enable adb reverse
            .then(() => this.adbHelper.apiVersion(device.id))
            .then(apiVersion => {
            if (apiVersion >= adb_1.AndroidAPILevel.LOLLIPOP) { // If we support adb reverse
                return this.adbHelper.reverseAdb(device.id, Number(this.runOptions.packagerPort));
            }
            else {
                const message = localize(1, null, device.id, apiVersion, adb_1.AndroidAPILevel.LOLLIPOP);
                this.logger.warning(message);
                return void 0;
            }
        });
    }
    getPackageName() {
        return new package_1.Package(this.runOptions.projectRoot).name().then(appName => new packageNameResolver_1.PackageNameResolver(appName).resolvePackageName(this.runOptions.projectRoot));
    }
    /**
     * Returns the target emulator, using the following logic:
     * *  If an emulator is specified and it is connected, use that one.
     * *  Otherwise, use the first one in the list.
     */
    getTargetEmulator(devices) {
        let activeFilterFunction = (device) => {
            return device.isOnline;
        };
        let targetFilterFunction = (device) => {
            return device.id === this.runOptions.target && activeFilterFunction(device);
        };
        if (this.runOptions && this.runOptions.target && devices) {
            /* check if the specified target is active */
            const targetDevice = devices.find(targetFilterFunction);
            if (targetDevice) {
                return targetDevice;
            }
        }
        /* return the first active device in the list */
        let activeDevices = devices && devices.filter(activeFilterFunction);
        return activeDevices && activeDevices[0];
    }
    startMonitoringLogCat(device, logCatArguments) {
        this.stopMonitoringLogCat(); // Stop previous logcat monitor if it's running
        // this.logCatMonitor can be mutated, so we store it locally too
        this.logCatMonitor = new logCatMonitor_1.LogCatMonitor(device.id, logCatArguments, this.adbHelper);
        this.logCatMonitor.start() // The LogCat will continue running forever, so we don't wait for it
            .catch(error => this.logger.warning(localize(2, null), error)) // The LogCatMonitor failing won't stop the debugging experience
            .done();
    }
    stopMonitoringLogCat() {
        if (this.logCatMonitor) {
            this.logCatMonitor.dispose();
            this.logCatMonitor = null;
        }
    }
}
// We should add the common Android build/run errors we find to this list
AndroidPlatform.RUN_ANDROID_FAILURE_PATTERNS = [{
        pattern: "Failed to install on any devices",
        errorCode: internalErrorCode_1.InternalErrorCode.AndroidCouldNotInstallTheAppOnAnyAvailibleDevice,
    }, {
        pattern: "com.android.ddmlib.ShellCommandUnresponsiveException",
        errorCode: internalErrorCode_1.InternalErrorCode.AndroidShellCommandTimedOut,
    }, {
        pattern: "Android project not found",
        errorCode: internalErrorCode_1.InternalErrorCode.AndroidProjectNotFound,
    }, {
        pattern: "error: more than one device/emulator",
        errorCode: internalErrorCode_1.InternalErrorCode.AndroidMoreThanOneDeviceOrEmulator,
    }, {
        pattern: /^Error: Activity class \{.*\} does not exist\.$/m,
        errorCode: internalErrorCode_1.InternalErrorCode.AndroidFailedToLaunchTheSpecifiedActivity,
    }];
AndroidPlatform.RUN_ANDROID_SUCCESS_PATTERNS = ["BUILD SUCCESSFUL", "Starting the app", "Starting: Intent"];
exports.AndroidPlatform = AndroidPlatform;

//# sourceMappingURL=androidPlatform.js.map
