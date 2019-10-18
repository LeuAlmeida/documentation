"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Formatter for the Output channel.
 */
const vscode = require("vscode");
const LogHelper_1 = require("./LogHelper");
const fs = require("fs");
const path = require("path");
const channels = {};
class OutputChannelLogger {
    constructor(channelName, lazy = false, preserveFocus = false) {
        this.channelName = channelName;
        this.preserveFocus = preserveFocus;
        const channelLogFolder = LogHelper_1.getLoggingDirectory();
        if (channelLogFolder) {
            const filename = channelName.replace(OutputChannelLogger.forbiddenFileNameSymbols, "");
            this.channelLogFilePath = path.join(channelLogFolder, `${filename}.txt`);
            this.channelLogFileStream = fs.createWriteStream(this.channelLogFilePath);
            this.channelLogFileStream.on("error", err => {
                this.error(`Error writing to log file at path: ${this.channelLogFilePath}. Error: ${err.toString()}\n`);
            });
        }
        if (!lazy) {
            this.channel = vscode.window.createOutputChannel(this.channelName);
            this.channel.show(this.preserveFocus);
        }
    }
    static disposeChannel(channelName) {
        if (channels[channelName]) {
            channels[channelName].getOutputChannel().dispose();
            if (channels[channelName].channelLogFileStream) {
                channels[channelName].channelLogFileStream.end();
            }
            delete channels[channelName];
        }
    }
    static getMainChannel() {
        return this.getChannel(this.MAIN_CHANNEL_NAME, true);
    }
    static getChannel(channelName, lazy, preserveFocus) {
        if (!channels[channelName]) {
            channels[channelName] = new OutputChannelLogger(channelName, lazy, preserveFocus);
        }
        return channels[channelName];
    }
    log(message, level) {
        if (LogHelper_1.LogHelper.LOG_LEVEL === LogHelper_1.LogLevel.None) {
            return;
        }
        if (level >= LogHelper_1.LogHelper.LOG_LEVEL) {
            message = OutputChannelLogger.getFormattedMessage(message, level);
            this.channel.appendLine(message);
            if (this.channelLogFileStream) {
                this.channelLogFileStream.write(message);
            }
        }
    }
    info(message) {
        this.log(message, LogHelper_1.LogLevel.Info);
    }
    warning(message, logStack = false) {
        this.log(message.toString(), LogHelper_1.LogLevel.Warning);
    }
    error(errorMessage, error, logStack = true) {
        const message = OutputChannelLogger.getFormattedMessage(errorMessage, LogHelper_1.LogLevel.Error);
        this.channel.appendLine(message);
        if (this.channelLogFileStream) {
            this.channelLogFileStream.write(message);
        }
        // Print the error stack if necessary
        if (logStack && error && error.stack) {
            this.channel.appendLine(`Stack: ${error.stack}`);
            if (this.channelLogFileStream) {
                this.channelLogFileStream.write(`Stack: ${error.stack}`);
            }
        }
    }
    debug(message) {
        this.log(message, LogHelper_1.LogLevel.Debug);
    }
    logStream(data) {
        this.channel.append(data.toString());
        if (this.channelLogFileStream) {
            this.channelLogFileStream.write(data);
        }
    }
    setFocusOnLogChannel() {
        this.channel.show(false);
    }
    static getFormattedMessage(message, level) {
        return `[${LogHelper_1.LogLevel[level]}] ${message}\n`;
    }
    getOutputChannel() {
        return this.channel;
    }
    clear() {
        this.channel.clear();
    }
    get channel() {
        if (this.outputChannel) {
            return this.outputChannel;
        }
        else {
            this.outputChannel = vscode.window.createOutputChannel(this.channelName);
            this.outputChannel.show(this.preserveFocus);
            return this.outputChannel;
        }
    }
    set channel(channel) {
        this.outputChannel = channel;
    }
}
OutputChannelLogger.MAIN_CHANNEL_NAME = "React Native";
OutputChannelLogger.forbiddenFileNameSymbols = /\W/gi;
exports.OutputChannelLogger = OutputChannelLogger;

//# sourceMappingURL=OutputChannelLogger.js.map
