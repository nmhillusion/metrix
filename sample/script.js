"use strict";
exports.__esModule = true;
var metrix_1 = require("metrix");
function greet(name) {
    console.log("hello, guys, ", name);
    (0, metrix_1.logObject)({
        name: "Anny",
        bornYear: 1996,
        nationality: "French"
    });
}
greet((0, metrix_1.randomColor)());
//# sourceMappingURL=script.js.map