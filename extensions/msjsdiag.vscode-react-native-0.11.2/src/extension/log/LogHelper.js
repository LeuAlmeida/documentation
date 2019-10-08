"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Logging utility class.
 */
const path = require("path");
const mkdirp = require("mkdirp");
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Trace"] = 0] = "Trace";
    LogLevel[LogLevel["Debug"] = 1] = "Debug";
    LogLevel[LogLevel["Info"] = 2] = "Info";
    LogLevel[LogLevel["Warning"] = 3] = "Warning";
    LogLevel[LogLevel["Error"] = 4] = "Error";
    LogLevel[LogLevel["None"] = 5] = "None";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
class LogHelper {
    static get LOG_LEVEL() {
        return getLogLevel();
    }
}
exports.LogHelper = LogHelper;
function getLoggingOptions() {
    return {
        LogsDirectory: process.env.REACT_NATIVE_TOOLS_LOGS_DIR,
    };
}
exports.getLoggingOptions = getLoggingOptions;
/**
 * Returns directory in which the extension's log files will be saved
 * if `env` variables `REACT_NATIVE_TOOLS_LOGS_DIR` is defined.
 * Also, checks that path is a correct absolute path. Creates new folder if not exists yet.
 * @returns Path to the logs folder or null
 */
function getLoggingDirectory() {
    const loggingOptions = getLoggingOptions();
    if (loggingOptions.LogsDirectory) {
        let dirPath = loggingOptions.LogsDirectory;
        if (!path.isAbsolute(dirPath)) {
            return null;
        }
        mkdirp.sync(dirPath);
        return dirPath;
    }
    return null;
}
exports.getLoggingDirectory = getLoggingDirectory;
function getLogLevel() {
    try {
        const SettingsHelper = require("../settingsHelper").SettingsHelper;
        return SettingsHelper.getLogLevel();
    }
    catch (err) { // Debugger context
        return LogLevel.Info; // Default
    }
}

//# sourceMappingURL=LogHelper.js.map
