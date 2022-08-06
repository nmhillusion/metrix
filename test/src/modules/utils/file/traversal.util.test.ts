import { traversal } from "@root/modules/utils/file";
import path from "path";

test("traversal and result", async () => {
  await expect(
    new Promise<number>((resolve, reject) => {
      new traversal.TraversalFile()
        .fromPath(path.join(__dirname, "../../../modules"))
        .run()
        .then((files) => {
          console.log({ files });

          resolve(files.length);
        })
        .catch(reject);
    })
  ).resolves.toBeGreaterThan(0);
});

test("traversal with callback", () => {
  expect(() => {
    new traversal.TraversalFile()
      .fromPath(path.join(__dirname, "../../../modules"))
      .runWithCallback((filePath) => {
        console.log("[callback] - traversal path: ", filePath);
      });
  }).not.toThrowError();
});
