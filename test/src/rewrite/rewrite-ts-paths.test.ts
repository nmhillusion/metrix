import { rewritePathsOfTsConfig } from "@nmhillusion/n2mix/rewrite";
import path from "path";
import fs from "fs";
import shx from "shelljs";

test("with normal ts file", () => {
  expect(
    new Promise((resolve, reject) => {
      try {
        const destinationPath = path.resolve(__dirname, "./example/dist");
        if (!fs.existsSync(destinationPath)) {
          console.log("Not exist compiled of example => start compiling it...");

          const resultExec = shx.exec(`cd ${__dirname}/example && npx tsc`);

          if (0 !== resultExec.code) {
            console.error("result compile example: ", resultExec);
            throw new Error("Error occurs during compiling example project");
          } else {
            console.log("compiled example project!");
          }
        }

        rewritePathsOfTsConfig(
          path.resolve(__dirname, "./example/tsconfig.json"),
          destinationPath
        );

        resolve(true);
      } catch (e) {
        console.error(e);
        reject(e);
      }
    })
  ).resolves.not.toThrowError();
});
