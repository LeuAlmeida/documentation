"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
Object.defineProperty(exports, "__esModule", { value: true });
const Q = require("q");
const semver = require("semver");
const path = require("path");
const telemetryHelper_1 = require("../../common/telemetryHelper");
const commandExecutor_1 = require("../../common/commandExecutor");
const reactNativeProjectHelper_1 = require("../../common/reactNativeProjectHelper");
const windowsPlatform_1 = require("./windowsPlatform");
const nls = require("vscode-nls");
const localize = nls.loadMessageBundle(__filename);
/**
 * WPF specific platform implementation for debugging RN applications.
 */
class WpfPlatform extends windowsPlatform_1.WindowsPlatform {
    constructor(runOptions, platformDeps = {}) {
        super(runOptions, platformDeps);
        this.runOptions = runOptions;
    }
    runApp(enableDebug = true) {
        const extProps = {
            platform: {
                value: "wpf",
                isPii: false,
            },
        };
        return telemetryHelper_1.TelemetryHelper.generate("WpfPlatform.runApp", extProps, () => {
            const env = this.getEnvArgument();
            if (enableDebug) {
                this.runArguments.push("--proxy");
            }
            return reactNativeProjectHelper_1.ReactNativeProjectHelper.getReactNativeVersion(this.runOptions.projectRoot)
                .then(version => {
                if (!semver.gt(version, WpfPlatform.WPF_SUPPORTED)) {
                    throw new Error(localize(0, null, version));
                }
                if (!semver.valid(version) /*Custom RN implementations should support this flag*/ || semver.gte(version, WpfPlatform.NO_PACKAGER_VERSION)) {
                    this.runArguments.push("--no-packager");
                }
                const exec = new commandExecutor_1.CommandExecutor(this.projectPath, this.logger);
                return Q.Promise((resolve, reject) => {
                    const appName = this.projectPath.split(path.sep).pop();
                    // Killing another instances of the app which were run earlier
                    return exec.execute(`cmd /C Taskkill /IM ${appName}.exe /F`)
                        .finally(() => {
                        const runWpfSpawn = exec.spawnReactCommand(`run-${this.platformName}`, this.runArguments, { env });
                        let resolved = false;
                        let output = "";
                        runWpfSpawn.stdout.on("data", (data) => {
                            output += data.toString();
                            if (!resolved && output.indexOf("Starting the app") > -1) {
                                resolved = true;
                                resolve(void 0);
                            }
                        });
                        runWpfSpawn.stderr.on("data", (error) => {
                            if (error.toString().trim()) {
                                reject(error.toString());
                            }
                        });
                        runWpfSpawn.outcome.then(() => {
                            reject(void 0); // If WPF process ended then app run fault
                        });
                    });
                });
            });
        });
    }
}
WpfPlatform.WPF_SUPPORTED = "0.55.0";
exports.WpfPlatform = WpfPlatform;

//# sourceMappingURL=wpfPlatform.js.map
