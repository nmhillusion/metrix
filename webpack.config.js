const path = require("path");

module.exports = {
  mode: "production",
  entry: "./dist/javascript/modules/index.js",
  output: {
    library: "_m",
    filename: "main.js",
    path: path.resolve(__dirname, "dist/javascript"),
  },
};
