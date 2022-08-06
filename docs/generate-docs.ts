import path from "path";
import * as fs from "fs";
import TypeJuice from "typejuice";
import { file } from "../src/typescript/modules";

const prefixPath = path.join(__dirname, "../dist/javascript");

fs.rmSync(path.join(__dirname, "./modules"), { force: true, recursive: true });
fs.rmSync(path.join(__dirname, "./types"), { force: true, recursive: true });

function generateForTsFile(tsFilePath: string) {
  console.log("generate docs for ", tsFilePath);

  const tj = new TypeJuice(tsFilePath);

  const markdownContent = tj.toMarkdown();
  let relativePath = path.relative(prefixPath, tsFilePath);
  let baseFolder = path.dirname(relativePath);

  const outFolder = fs.mkdirSync(path.join(__dirname, baseFolder), {
    recursive: true,
  });

  if (outFolder) {
    fs.writeFileSync(
      path.join(outFolder, path.basename(tsFilePath, ".d.ts") + ".md"),
      markdownContent
    );
  } else {
    console.error("Cannot create out folder");
  }

  console.log({ relativePath, baseFolder, outFolder });
}

new file.TraversalFile().fromPath(prefixPath).runWithCallback((filePath) => {
  filePath = String(filePath);
  if (filePath.endsWith(".d.ts")) {
    generateForTsFile(filePath);
  }
});
