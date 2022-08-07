import path from "path";
import * as fs from "fs";
import { TsParser } from "../src/typescript/modules/parser/typescript";

const prefixPath = path.join(__dirname, "../dist/javascript");

fs.rmSync(path.join(__dirname, "./modules"), { force: true, recursive: true });
fs.rmSync(path.join(__dirname, "./types"), { force: true, recursive: true });

function generateForTsFile(tsFilePath: string) {
  console.log("generate docs for ", tsFilePath);

  const markdownContent = `tsFilePath: ${tsFilePath}`;
  let relativePath = path.relative(prefixPath, tsFilePath);
  let baseFolder = path.dirname(relativePath);
  let expectedOutFolder = path.join(__dirname, baseFolder);

  const outFolder = fs.mkdirSync(expectedOutFolder, {
    recursive: true,
  });

  if (expectedOutFolder) {
    fs.writeFileSync(
      path.join(expectedOutFolder, path.basename(tsFilePath, ".d.ts") + ".md"),
      markdownContent
    );
  }

  console.log({ relativePath, baseFolder, outFolder });

  parseTypeScript(tsFilePath);
}

function parseTypeScript(tsFilePath: string) {
  const tsFileModel = new TsParser(tsFilePath).parse();
  console.log({ tsFileModel });
  for (const cls of tsFileModel.tsClassList) {
    console.log("class: ", cls);
    console.log("string class: ", JSON.stringify(cls));
  }

  for (const func of tsFileModel.tsFunctionList) {
    console.log("func: ", func);
    console.log("string class: ", JSON.stringify(func));
  }

  for (const interf of tsFileModel.tsInterfaceList) {
    console.log("interf: ", interf);
    console.log("string interface: ", JSON.stringify(interf));
  }

  for (const exp of tsFileModel.tsExportList) {
    console.log("exp: ", exp);
    console.log("string export: ", JSON.stringify(exp));
  }
}

// new file.TraversalFile().fromPath(prefixPath).runWithCallback((filePath) => {
//   filePath = String(filePath);
//   if (filePath.endsWith(".d.ts")) {
//     generateForTsFile(filePath);
//   }
// });

generateForTsFile(path.join(__dirname, "../src/typescript/modules/index.ts"));
