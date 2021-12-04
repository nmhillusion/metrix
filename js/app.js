(function () {
  if (typeof _m == "undefined") {
    _m = {
      $: function (selector) {
        const elements = document.querySelectorAll(selector);
        return {};
      },

      dom: require("./dom-utils"),

      fn: require("./function-utils"),
    };
  }
})();
