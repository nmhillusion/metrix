const path = require("path");

module.exports = {
  mode: "production",
  entry: "./script.js",
  output: {
    filename: "main.js",
    path: __dirname,
  },
};
