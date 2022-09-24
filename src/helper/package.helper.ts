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
  const outputPackageJsonPath = path.join(basePublishDir, "package.json");
  const packageDir = path.dirname(packageJsonPath);

  if (!packageJson["main"]) {
    throw new Error("Does not exist main entry in package.json");
  }

  packageJson = Object.assign(packageJson, {
    main: getPublishPathOfEntry({
      basePublishDir,
      packageDir,
      packageJson,
      entryKeys: ["main"],
    }),
    types: getPublishPathOfEntry({
      basePublishDir,
      packageDir,
      packageJson,
      entryKeys: ["types", "typings"],
    }),
    files: ["*"],
  });

  delete packageJson["scripts"];
  delete packageJson["typings"];

  fs.writeFileSync(outputPackageJsonPath, JSON.stringify(packageJson), {
    encoding: "utf-8",
  });
}

function getPublishPathOfEntry({
  packageDir,
  packageJson,
  basePublishDir,
  entryKeys,
}: {
  packageDir: string;
  packageJson: { [entryKey: string]: any };
  basePublishDir: string;
  entryKeys: ("main" | "types" | "typings")[];
}) {
  let entryValue = "";
  for (const entryKey of entryKeys) {
    entryValue = packageJson[entryKey];
    if (entryValue) {
      break;
    }
  }

  if (!entryValue) {
    return entryValue;
  }

  const realPathOfEntryFile = path.join(packageDir, entryValue);

  return path.relative(basePublishDir, realPathOfEntryFile).replace("\\", "/");
}
