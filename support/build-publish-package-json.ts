import path from "path";
import { buildPublishPackageJson } from "../src/typescript/helper/package.helper";

buildPublishPackageJson({
  basePublishDir: path.join(__dirname, "../dist/javascript"),
  packageJsonPath: path.join(__dirname, "../package.json"),
});
