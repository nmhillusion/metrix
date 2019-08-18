const path = require('path');
const dotenv = require("dotenv");
dotenv.config();

console.log("build mode: ", process.env.app_mode);


module.exports = {
  mode: process.env.app_mode,
  entry: './js/app.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  }
};