import { rewritePathsOfTsConfig } from "@nmhillusion/n2mix/rewrite";
import path from "path";

test("with normal ts file", () => {
  expect(
    new Promise((resolve, reject) => {
      try {
        rewritePathsOfTsConfig(
          path.resolve(__dirname, "./example/tsconfig.json"),
          path.resolve(__dirname, "./example/dist")
        );

        resolve(true);
      } catch (e) {
        console.error(e);
        reject(e);
      }
    })
  ).resolves.not.toThrowError();
});
