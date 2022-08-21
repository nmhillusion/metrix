import * as fs from "fs";
import path from "path";

let packageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../package.json")).toString()
);

packageJson = Object.assign(packageJson, {
  main: "index.js",
  types: "index.d.ts",
  files: ["*"],
  scripts: {},
});

fs.writeFileSync(
  path.join(__dirname, "../dist/javascript/package.json"),
  JSON.stringify(packageJson),
  {
    encoding: "utf-8",
  }
);
