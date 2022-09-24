import path from "path";
import { buildPublishPackageJson } from "../src/helper/package.helper";

buildPublishPackageJson({
  basePublishDir: path.join(__dirname, "../dist"),
  packageJsonPath: path.join(__dirname, "../package.json"),
});
