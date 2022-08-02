"use strict";
exports.__esModule = true;
exports.UrlParser = void 0;
function parseQueryParams(queryParams) {
    var resultMap = new Map();
    if (queryParams) {
        var pairs = queryParams.split("&");
        for (var _i = 0, pairs_1 = pairs; _i < pairs_1.length; _i++) {
            var pair = pairs_1[_i];
            var _a = pair.split("="), key = _a[0], value = _a[1];
            if (key.trim() && value.trim()) {
                var cKey = key.trim();
                var cValue = value.trim();
                if (!resultMap.has(cKey)) {
                    resultMap.set(cKey, [cValue]);
                }
                else {
                    var itemList = resultMap.get(cKey);
                    itemList.push(cValue);
                }
            }
        }
    }
    return resultMap;
}
var UrlParser = /** @class */ (function () {
    function UrlParser() {
    }
    UrlParser.parse = function (url) {
        var parserPattern = /^(http|https):\/\/(.+?)(?:\/(.*?))?(?:\?(.*?))?$/;
        if (parserPattern.test(url)) {
            var _a = url.match(parserPattern), matched = _a[0], protocal = _a[1], host = _a[2], path = _a[3], paramQuery = _a[4];
            return {
                protocal: protocal,
                host: host,
                path: path,
                paramMap: parseQueryParams(paramQuery)
            };
        }
    };
    UrlParser.mergeParams = function (url, params) {
        if (!url || !params || 0 == Object.keys(params).length) {
            return url;
        }
        var combinedParams = Object.keys(params)
            .map(function (key) {
            var values = params[key];
            var combinedItems = [];
            if (Array.isArray(values)) {
                for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                    var iValue = values_1[_i];
                    combinedItems.push("".concat(key, "=").concat(iValue));
                }
            }
            else {
                combinedItems.push("".concat(key, "=").concat(values));
            }
            return combinedItems.join("&");
        })
            .join("&");
        var joinSymb = url.includes("?") ? "&" : "?";
        return "".concat(url).concat(joinSymb).concat(combinedParams);
    };
    return UrlParser;
}());
exports.UrlParser = UrlParser;
//# sourceMappingURL=url.parser.js.map