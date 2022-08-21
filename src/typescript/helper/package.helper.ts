import * as fs from "fs";
import path from "path";

export function buildPublishPackageJson({
  basePublishDir,
  packageJsonPath,
}: {
  packageJsonPath: string;
  basePublishDir: string;
}) {
  let packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());

  packageJson = Object.assign(packageJson, {
    main: "index.js",
    types: "index.d.ts",
    files: ["*"],
    scripts: {},
  });

  fs.writeFileSync(
    path.join(basePublishDir, "package.json"),
    JSON.stringify(packageJson),
    {
      encoding: "utf-8",
    }
  );
}
