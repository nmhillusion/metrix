"use strict";
exports.__esModule = true;
exports.cliParamsParser = void 0;
/**
 * Parser arguments from command line with structure of <command> <arg1> <arg2> <arg3>...
 * Every argument will be parsed and splited by `=` to obtain value.
 * If key has `--` in starting, it will be remove
 * @param argvs arguments from command line
 * @returns map of argument with key and values from 2 part of pair `<key>=<value>`
 */
function cliParamsParser(argvs) {
    var paramMap = new Map();
    if (Array.isArray(argvs)) {
        for (var argvIdx in argvs) {
            var argv = String(argvs[argvIdx]);
            var parsedItem = null;
            if (argv.includes("=")) {
                parsedItem = parseParamsWithEqualSymbol(argvs, argvIdx, argv);
            }
            else if (argv.startsWith("-")) {
                parsedItem = parseParamsWithDashSymbolStarting(argvs, argvIdx, argv);
            }
            if (parsedItem) {
                paramMap.set(parsedItem.key, parsedItem.value);
            }
        }
    }
    return paramMap;
}
exports.cliParamsParser = cliParamsParser;
function parseParamsWithEqualSymbol(argvs, argvIdx, argv) {
    var _a = argv.split("="), key = _a[0], value = _a[1];
    var convertedKey = key;
    while (convertedKey.startsWith("-") && 2 <= convertedKey.length) {
        convertedKey = convertedKey.slice(1);
    }
    if (convertedKey.trim() && value.trim()) {
        return {
            key: String(convertedKey).trim(),
            value: String(value).trim()
        };
    }
    return null;
}
function parseParamsWithDashSymbolStarting(argvs, argvIdxRaw, argv) {
    var argvIdx = Number(argvIdxRaw);
    if (Number.isNaN(argvIdx)) {
        return null;
    }
    if (argv.includes("=")) {
        return null;
    }
    if (!argv.startsWith("-")) {
        return null;
    }
    var convertedKey = argv;
    while (convertedKey.startsWith("-") && 2 <= convertedKey.length) {
        convertedKey = convertedKey.slice(1);
    }
    if (!convertedKey) {
        return null;
    }
    var value = true;
    var nextArgv = argvIdx + 1 < argvs.length - 1 ? String(argvs[argvIdx + 1]) : null;
    if (nextArgv && !nextArgv.startsWith("-") && !nextArgv.includes("=")) {
        value = String(nextArgv);
    }
    return {
        key: convertedKey,
        value: value
    };
}
//# sourceMappingURL=cli-params.parser.js.map