import { TraversalFile } from "@nmhillusion/n2mix/file";
import path from "path";

test("traversal and result", async () => {
  await expect(
    new Promise<number>((resolve, reject) => {
      new TraversalFile()
        .fromPath(path.join(__dirname, "../../src"))
        .run()
        .then((files) => {
          console.log({ files });

          resolve(files.length);
        })
        .catch(reject);
    })
  ).resolves.toBeGreaterThan(0);
});

test("traversal wrong path and throw error", () => {
  expect(() => {
    new TraversalFile().fromPath(path.join(__dirname, "../../../module2"));
  }).toThrowError();
});

test("traversal with callback", () => {
  expect(() => {
    new TraversalFile()
      .fromPath(path.join(__dirname, "../../src"))
      .runWithCallback((filePath) => {
        console.log("[callback] - traversal path: ", filePath);
      });
  }).not.toThrowError();
});
