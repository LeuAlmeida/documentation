"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
Object.defineProperty(exports, "__esModule", { value: true });
const Q = require("q");
const semver = require("semver");
const generalMobilePlatform_1 = require("../generalMobilePlatform");
const outputVerifier_1 = require("../../common/outputVerifier");
const telemetryHelper_1 = require("../../common/telemetryHelper");
const commandExecutor_1 = require("../../common/commandExecutor");
const reactNativeProjectHelper_1 = require("../../common/reactNativeProjectHelper");
const internalErrorCode_1 = require("../../common/error/internalErrorCode");
/**
 * Windows specific platform implementation for debugging RN applications.
 */
class WindowsPlatform extends generalMobilePlatform_1.GeneralMobilePlatform {
    constructor(runOptions, platformDeps = {}) {
        super(runOptions, platformDeps);
        this.runOptions = runOptions;
    }
    runApp(enableDebug = true) {
        const extProps = {
            platform: {
                value: "windows",
                isPii: false,
            },
        };
        return telemetryHelper_1.TelemetryHelper.generate("WindowsPlatform.runApp", extProps, () => {
            const env = this.getEnvArgument();
            if (enableDebug) {
                this.runArguments.push("--proxy");
            }
            return reactNativeProjectHelper_1.ReactNativeProjectHelper.getReactNativeVersion(this.runOptions.projectRoot)
                .then(version => {
                if (!semver.valid(version) /*Custom RN implementations should support this flag*/ || semver.gte(version, WindowsPlatform.NO_PACKAGER_VERSION)) {
                    this.runArguments.push("--no-packager");
                }
                const runWindowsSpawn = new commandExecutor_1.CommandExecutor(this.projectPath, this.logger).spawnReactCommand(`run-${this.platformName}`, this.runArguments, { env });
                return new outputVerifier_1.OutputVerifier(() => Q(WindowsPlatform.SUCCESS_PATTERNS), () => Q(WindowsPlatform.FAILURE_PATTERNS), this.platformName)
                    .process(runWindowsSpawn);
            });
        });
    }
    prewarmBundleCache() {
        return this.packager.prewarmBundleCache("windows");
    }
    getRunArguments() {
        let runArguments = [];
        if (this.runOptions.runArguments && this.runOptions.runArguments.length > 0) {
            runArguments.push(...this.runOptions.runArguments);
        }
        else {
            let target = this.runOptions.target === WindowsPlatform.simulatorString ? "" : this.runOptions.target;
            if (target) {
                runArguments.push(`--${target}`);
            }
        }
        return runArguments;
    }
}
WindowsPlatform.NO_PACKAGER_VERSION = "0.53.0";
WindowsPlatform.SUCCESS_PATTERNS = [
    "Installing new version of the app",
    "Starting the app",
];
WindowsPlatform.FAILURE_PATTERNS = [
    {
        pattern: "Unrecognized command 'run-windows'",
        errorCode: internalErrorCode_1.InternalErrorCode.WinRNMPPluginIsNotInstalled,
    },
];
exports.WindowsPlatform = WindowsPlatform;

//# sourceMappingURL=windowsPlatform.js.map
