(function() {
  if (typeof _m == "undefined") {
    _m = {
      $: function(selector) {
        const elements = document.querySelectorAll(selector);
        return {};
      },

      fn: require("./function-utils")
    };
  }
})();