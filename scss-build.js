const sass = require("node-sass");
const fs = require("fs");

sass.render(
  {
    data: fs.readFileSync("./scss/app.scss").toString(),
    outputStyle: "compressed"
  },
  (error, result) => {
    if (error) {
      console.log("Error: ", error);
    } else {
      fs.writeFileSync("app.css", result.css);
      console.log("compiled at ", new Date());
    }
  }
);
