"use strict";
exports.__esModule = true;
var metrix_1 = require("metrix");
function greet(name) {
    console.log("hello, guys, ", name);
    metrix_1.util.func.logObject({
        name: "Anny",
        bornYear: 1996,
        nationality: "French"
    });
}
greet(metrix_1.util.func.randomColor());
//# sourceMappingURL=script.js.map