const path = require("path");

module.exports = {
  mode: "production",
  entry: "./dist/javascript/modules/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist/javascript"),
  },
};
