import path from "path";
import fs from "fs";

import { DocsGenerator } from "@nmhillusion/n2gendocs-ts";

console.log({ __dirname });

const prefixPath = path.join(__dirname, "../dist/javascript");

try {
  fs.rmSync(path.join(__dirname, "./file"), { force: true, recursive: true });
  fs.rmSync(path.join(__dirname, "./helper"), {
    force: true,
    recursive: true,
  });
  fs.rmSync(path.join(__dirname, "./http"), {
    force: true,
    recursive: true,
  });
  fs.rmSync(path.join(__dirname, "./parser"), {
    force: true,
    recursive: true,
  });
  fs.rmSync(path.join(__dirname, "./utils"), { force: true, recursive: true });
  fs.rmSync(path.join(__dirname, "./README.md"));
} catch (error) {
  console.error("Error when rm old files: ", error);
}

function generateForTsFile(tsFilePath) {
  console.log("generate docs for ", tsFilePath);

  const markdownContent = new DocsGenerator(tsFilePath).generate();
  let relativePath = path.relative(prefixPath, tsFilePath);
  let baseFolder = path.dirname(relativePath);
  let expectedOutFolder = path.join(__dirname, baseFolder);

  const outFolder = fs.mkdirSync(expectedOutFolder, {
    recursive: true,
  });

  if (expectedOutFolder) {
    fs.writeFileSync(
      path.join(expectedOutFolder, getFileName(tsFilePath) + ".md"),
      markdownContent
    );
  }
}

function getFileName(tsFilePath: string) {
  const basename = path.basename(tsFilePath, ".d.ts");

  return String(basename).toLowerCase() == "index" ? "README" : basename;
}

function runWithCallback(filePath) {
  filePath = String(filePath);
  if (filePath.endsWith(".d.ts")) {
    generateForTsFile(filePath);
  }
}

function traversal(callback, fpath) {
  if (!callback) {
    throw new Error("NOT run because of not exist callback function");
  }

  if (!fpath) {
    fpath = this.startPath;
  }

  if (fs.lstatSync(fpath).isDirectory()) {
    for (const itemOfDir of fs.readdirSync(fpath)) {
      const fullPath = path.join(String(fpath), itemOfDir);

      if (fs.lstatSync(fullPath).isFile()) {
        callback(fullPath);
      } else if (fs.lstatSync(fullPath).isDirectory()) {
        traversal(callback, fullPath);
      }
    }
  }
}

traversal(runWithCallback, prefixPath);
