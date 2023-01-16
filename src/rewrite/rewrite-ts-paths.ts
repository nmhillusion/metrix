import * as fs from "fs";
import { TraversalFile } from "../file";

export function rewritePathsOfTsConfig(
  tsconfigPath: fs.PathLike,
  startPath: string,
  filterFileToRewrite: (filePath: fs.PathLike) => boolean = (f) =>
    String(f).endsWith(".ts")
) {
  const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath).toString());
  const compilerOptions = tsconfig["compilerOptions"] || {};
  const baseUrl: string = compilerOptions["baseUrl"] || ".";
  const pathsConfig: { [key: string]: string } = compilerOptions["paths"] || {};

  console.log({ tsconfig, baseUrl, pathsConfig });

  new TraversalFile().fromPath(startPath).runWithCallback((filePath) => {
    // console.log("run on file: ", filePath);

    if (filterFileToRewrite(filePath)) {
      console.log("valid file path: ", filePath);
    }
  });
}
