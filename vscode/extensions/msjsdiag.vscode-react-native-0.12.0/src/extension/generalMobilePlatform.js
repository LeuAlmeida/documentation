"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
Object.defineProperty(exports, "__esModule", { value: true });
const Q = require("q");
const fs = require("fs");
const packager_1 = require("../common/packager");
const packagerStatusIndicator_1 = require("./packagerStatusIndicator");
const settingsHelper_1 = require("./settingsHelper");
const OutputChannelLogger_1 = require("./log/OutputChannelLogger");
const nls = require("vscode-nls");
const localize = nls.loadMessageBundle(__filename);
class GeneralMobilePlatform {
    constructor(runOptions, platformDeps = {}) {
        this.runOptions = runOptions;
        this.platformName = this.runOptions.platform;
        this.projectPath = this.runOptions.projectRoot;
        this.packager = platformDeps.packager || new packager_1.Packager(this.runOptions.workspaceRoot, this.projectPath, settingsHelper_1.SettingsHelper.getPackagerPort(this.runOptions.workspaceRoot), new packagerStatusIndicator_1.PackagerStatusIndicator());
        this.logger = OutputChannelLogger_1.OutputChannelLogger.getChannel(localize(0, null, this.platformName), true);
        this.logger.clear();
        this.runArguments = this.getRunArguments();
    }
    runApp() {
        this.logger.info(localize(1, null));
        return Q.resolve(void 0);
    }
    enableJSDebuggingMode() {
        this.logger.info(localize(2, null));
        return Q.resolve(void 0);
    }
    disableJSDebuggingMode() {
        this.logger.info(localize(3, null));
        return Q.resolve(void 0);
    }
    beforeStartPackager() {
        return Q.resolve(void 0);
    }
    startPackager() {
        this.logger.info(localize(4, null));
        return this.packager.isRunning()
            .then((running) => {
            if (running) {
                if (this.packager.getPackagerStatus() !== packagerStatusIndicator_1.PackagerStatus.PACKAGER_STARTED) {
                    return this.packager.stop();
                }
                this.logger.info(localize(5, null));
            }
            return void 0;
        })
            .then(() => {
            return this.packager.start();
        });
    }
    prewarmBundleCache() {
        // generalMobilePlatform should do nothing here. Method should be overriden by children for specific behavior.
        return Q.resolve(void 0);
    }
    static getOptFromRunArgs(runArguments, optName, binary = false) {
        if (runArguments.length > 0) {
            const optIdx = runArguments.indexOf(optName);
            let result = undefined;
            if (optIdx > -1) {
                result = binary ? true : runArguments[optIdx + 1];
            }
            else {
                for (let i = 0; i < runArguments.length; i++) {
                    const arg = runArguments[i];
                    if (arg.indexOf(optName) > -1) {
                        if (binary) {
                            result = true;
                        }
                        else {
                            const tokens = arg.split("=");
                            if (tokens.length > 1) {
                                result = tokens[1].trim();
                            }
                            else {
                                result = undefined;
                            }
                        }
                    }
                }
            }
            // Binary parameters can either exists (e.g. be true) or be absent. You can not pass false binary parameter.
            if (binary) {
                if (result === undefined) {
                    return undefined;
                }
                else {
                    return true;
                }
            }
            if (result) {
                try {
                    return JSON.parse(result);
                }
                catch (err) {
                    // simple string value, return as is
                    return result;
                }
            }
        }
        return undefined;
    }
    getRunArguments() {
        throw new Error("Not yet implemented: GeneralMobilePlatform.getRunArguments");
    }
    getEnvArgument() {
        let args = this.runOptions;
        let env = process.env;
        if (args.envFile) {
            let buffer = fs.readFileSync(args.envFile, "utf8");
            // Strip BOM
            if (buffer && buffer[0] === "\uFEFF") {
                buffer = buffer.substr(1);
            }
            buffer.split("\n").forEach((line) => {
                const r = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);
                if (r !== null) {
                    const key = r[1];
                    if (!env[key]) { // .env variables never overwrite existing variables
                        let value = r[2] || "";
                        if (value.length > 0 && value.charAt(0) === "\"" && value.charAt(value.length - 1) === "\"") {
                            value = value.replace(/\\n/gm, "\n");
                        }
                        env[key] = value.replace(/(^['"]|['"]$)/g, "");
                    }
                }
            });
        }
        if (args.env) {
            // launch config env vars overwrite .env vars
            for (let key in args.env) {
                if (args.env.hasOwnProperty(key)) {
                    env[key] = args.env[key];
                }
            }
        }
        return env;
    }
}
GeneralMobilePlatform.deviceString = "device";
GeneralMobilePlatform.simulatorString = "simulator";
GeneralMobilePlatform.NO_PACKAGER_VERSION = "0.42.0";
exports.GeneralMobilePlatform = GeneralMobilePlatform;

//# sourceMappingURL=generalMobilePlatform.js.map
