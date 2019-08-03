const pug = require("pug");
const fs = require("fs");

const htmlText = pug.renderFile("./index.pug", {
  compileDebug: true,
  pretty: true
});

fs.writeFileSync("./index.html", htmlText);
