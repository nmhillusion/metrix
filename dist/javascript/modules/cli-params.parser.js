"use strict";
exports.__esModule = true;
exports.cliParamsParser = void 0;
function cliParamsParser(argvs) {
    var paramMap = new Map();
    if (Array.isArray(argvs)) {
        for (var _i = 0, argvs_1 = argvs; _i < argvs_1.length; _i++) {
            var argv = argvs_1[_i];
            var convArgv = String(argv);
            if (convArgv.includes("=")) {
                var _a = convArgv.split("="), key = _a[0], value = _a[1];
                if (key.trim() && value.trim()) {
                    paramMap.set(String(key).trim(), String(value).trim());
                }
            }
        }
    }
    return paramMap;
}
exports.cliParamsParser = cliParamsParser;
//# sourceMappingURL=cli-params.parser.js.map