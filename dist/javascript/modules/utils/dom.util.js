"use strict";
exports.__esModule = true;
exports.domUtils = void 0;
function domUtils() {
    return {
        querySelectorAll: function (_a) {
            var selector = _a.selector, text = _a.text, attributes = _a.attributes;
            var elementsRaw = document.querySelectorAll(selector);
            var elements = [];
            if (elementsRaw) {
                elementsRaw.forEach(function (el) { return elements.push(el); });
            }
            // console.log({ elements });
            var resultElements = [];
            mainLoop: for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
                var el = elements_1[_i];
                // console.log({ textContent: el.textContent });
                if (!!text && !el.textContent.includes(text)) {
                    continue;
                }
                if ("object" == typeof attributes) {
                    for (var _b = 0, _c = Object.keys(attributes); _b < _c.length; _b++) {
                        var attrKey = _c[_b];
                        var attrValue = attributes[attrKey];
                        var elAttrValue = el.getAttribute(attrKey);
                        console.log({ attrValue: attrValue, elAttrValue: elAttrValue });
                        if (attrValue != elAttrValue) {
                            continue mainLoop;
                        }
                    }
                }
                resultElements.push(el);
            }
            return resultElements;
        },
        querySelector: function (_a) {
            var selector = _a.selector, text = _a.text, attributes = _a.attributes;
            var elements = this.querySelectorAll({ selector: selector, text: text, attributes: attributes });
            if (0 < elements.length) {
                return elements[0];
            }
            else {
                return null;
            }
        }
    };
}
exports.domUtils = domUtils;
//# sourceMappingURL=dom.util.js.map