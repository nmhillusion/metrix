"use strict";
exports.__esModule = true;
exports.logObject = exports.randomColor = exports.suffle = exports.nfn = void 0;
function nfn(fn, amount) {
    if (amount === void 0) { amount = 1e10; }
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        amount = Math.min(args.length, amount);
        return "function" == typeof fn ? fn.apply(void 0, args.slice(0, amount)) : null;
    };
}
exports.nfn = nfn;
function getRandomIndex(size) {
    return Math.round(Math.random() * (size - 1));
}
function suffle(arr) {
    var resultArr = [];
    if ("object" == typeof arr && arr.hasOwnProperty("length")) {
        var size = arr.length;
        var idxArr = [];
        do {
            var newIdx = -1;
            do {
                newIdx = getRandomIndex(size);
            } while (idxArr.includes(newIdx));
            idxArr.push(newIdx);
        } while (size > idxArr.length);
        resultArr = idxArr.map(function (idx) { return arr[idx]; });
    }
    return resultArr;
}
exports.suffle = suffle;
function randomColor() {
    var result = "#";
    do {
        result += Math.round(Math.random() * 16).toString(16);
    } while (7 > result.length);
    return result;
}
exports.randomColor = randomColor;
function logObject(o) {
    if ("object" == typeof o) {
        Object.keys(o).forEach(function (key) { return console.log(" ".concat(key, " : ").concat(o[key], " ")); });
    }
    else {
        console.log(o);
    }
}
exports.logObject = logObject;
//# sourceMappingURL=function-utils.js.map