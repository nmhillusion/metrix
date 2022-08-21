const path = require("path");

module.exports = {
  mode: "production",
  entry: "./dist/javascript/index.js",
  output: {
    library: "_m",
    filename: "main.js",
    path: path.resolve(__dirname, "bin"),
  },
  resolve: {
    alias: {
      "@root": path.resolve(__dirname, "dist/javascript"),
    },
  },
};
