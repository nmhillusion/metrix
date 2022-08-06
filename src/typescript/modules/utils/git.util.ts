import * as fs from "fs";
import { which, exec } from "shelljs";
import { CommonUtil } from "../utils/file/common.util";

export function tagVersion(packageJsonPath: string) {
  if (!CommonUtil.isFile(packageJsonPath)) {
    throw Error("input path is not a file");
  }
  if (!which("git")) {
    throw new Error("Not determine git command on your computer");
  }

  const rawConfig = fs.readFileSync(packageJsonPath).toString();
  const packageConfig = JSON.parse(rawConfig);

  if (!packageConfig["version"]) {
    throw Error("Does not exist version property in package json file");
  }

  const version = packageConfig["version"];
  const commandResult = exec(`git tag ${version} && git push --tag`);
  console.log({ commandResult });
}
