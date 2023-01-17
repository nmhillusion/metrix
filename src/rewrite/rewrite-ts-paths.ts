import * as fs from "fs";
import path, { dirname } from "path";
import { TraversalFile, CommonUtil } from "../file";

export function rewritePathsOfTsConfig(
  tsconfigPath: fs.PathLike,
  startPath: string,
  filterFileToRewrite: (filePath: fs.PathLike) => boolean = (f) =>
    String(f).endsWith(".ts")
) {
  if (CommonUtil.isRelativePath(tsconfigPath)) {
    throw new Error("tsconfigPath must be a absolute paht");
  }

  if (CommonUtil.isRelativePath(startPath)) {
    throw new Error("startPath must be a absolute paht");
  }

  const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath).toString());
  const compilerOptions = tsconfig["compilerOptions"] || {};
  const baseUrl: string = compilerOptions["baseUrl"] || ".";
  let pathsConfig: { [key: string]: string[] } = compilerOptions["paths"] || {};
  pathsConfig = _combinePathsConfig(pathsConfig);

  // console.log({ tsconfig, baseUrl, pathsConfig });

  new TraversalFile().fromPath(startPath).runWithCallback((filePath) => {
    // console.log("run on file: ", filePath);

    if (filterFileToRewrite(filePath)) {
      console.log("valid file path: ", filePath, { baseUrl, pathsConfig });

      const executingFilePath = _getExecutingPath(filePath);

      _doReplaceImportStatementWithPath(fs.readFileSync(filePath).toString(), {
        executingFilePath,
        tsconfigPath,
        baseUrl,
        pathsConfig,
      });
    }
  });
}

function _getExecutingPath(filePath: fs.PathLike): fs.PathLike {
  filePath = String(filePath);
  let resultExecPath = filePath;

  const _basename = path
    .basename(filePath)
    .replace(".d.ts", "")
    .replace(".ts", "");

  const jsMapFilePath = path.join(
    path.dirname(filePath),
    _basename + ".js.map"
  );

  if (fs.existsSync(jsMapFilePath)) {
    const sourcesPath: string[] | undefined = JSON.parse(
      fs.readFileSync(jsMapFilePath).toString()
    )["sources"];

    if (sourcesPath && 0 < sourcesPath.length) {
      const sourcePath = sourcesPath[0];

      const absolutePathToSource = path.resolve(dirname(filePath), sourcePath);

      if (fs.existsSync(absolutePathToSource)) {
        resultExecPath = absolutePathToSource;
      }
    }
  }
  return resultExecPath;
}

function _trailForStartPathKey(_path: string) {
  _path = _path.replace(/\*/g, "");
  if (!_path.endsWith("/")) {
    _path += "/";
  }
  return _path;
}

function _combinePathsConfig(pathsConfig: { [key: string]: string[] }): {
  [key: string]: string[];
} | null {
  const configList = Object.keys(pathsConfig).map((_key) => ({
    key: _key,
    value: pathsConfig[_key],
  }));

  for (const _config of configList) {
    _config.key = _trailForStartPathKey(_config.key);
    _config.value = _config.value.map(_trailForStartPathKey);
  }

  const combinedConfig: { [key: string]: string[] } = {};

  for (const _config of configList) {
    if (!combinedConfig[_config.key]) {
      combinedConfig[_config.key] = _config.value;
    } else {
      combinedConfig[_config.key] = combinedConfig[_config.key].concat(
        _config.value
      );
    }
  }

  return combinedConfig;
}

function _getPostfixOfPathToImport(_path: string) {
  if (fs.existsSync(_path)) {
    return "";
  }
  if (fs.existsSync(_path + ".ts")) {
    return ".ts";
  }

  if (fs.existsSync(_path + ".js")) {
    return ".js";
  }
}

function _doReplaceImportStatementWithPath(
  fileContent: string,
  {
    executingFilePath,
    tsconfigPath,
    baseUrl,
    pathsConfig,
  }: {
    executingFilePath: fs.PathLike;
    tsconfigPath: fs.PathLike;
    baseUrl: string;
    pathsConfig: { [key: string]: string[] };
  }
) {
  const IMPORT_PATTERN = /import\s+.+\s+from\s+['"](.+)['"];?/is;
  const executingDirPath = path.dirname(String(executingFilePath));

  if (IMPORT_PATTERN.test(fileContent)) {
    fileContent = fileContent.replace(
      new RegExp(IMPORT_PATTERN, "g"),
      (_match, ...remainArgs) => {
        let resultStatement = _match;

        const [importPath, ...__]: string[] = remainArgs;
        const matchingAliasPathKey = Object.keys(pathsConfig).find(
          (_aliasPath) => importPath.startsWith(_aliasPath)
        );
        if (matchingAliasPathKey) {
          const pathsOfAlias = pathsConfig[matchingAliasPathKey];
          const resolvedPaths: string[] = pathsOfAlias.map((_p) => {
            if (CommonUtil.isRelativePath(baseUrl)) {
              _p = path.resolve(dirname(String(tsconfigPath)), baseUrl, _p);
            } else {
              _p = path.resolve(baseUrl, _p);
            }
            return _p;
          });

          console.log({
            importPath,
            matchingAliasPathKey,
            pathsOfAlias,
            resolvedPaths,
          });

          let correctResolvePath = resolvedPaths.find((rp) => {
            const resolvedPath = path.resolve(
              rp,
              importPath.replace(matchingAliasPathKey, "")
            );

            // console.log({ resolvedPath });

            return undefined !== _getPostfixOfPathToImport(resolvedPath);
          });

          if (correctResolvePath) {
            let correspondPathToAlias = path.relative(
              executingDirPath,
              correctResolvePath
            );

            console.log("compare between: ", {
              executingDirPath,
              correctResolvePath,
            });

            if (!String(correspondPathToAlias).endsWith("/")) {
              correspondPathToAlias += "/";
            }

            resultStatement = _match.replace(
              importPath,
              importPath.replace(matchingAliasPathKey, correspondPathToAlias)
            );

            console.log({ resultStatement });
          }
        }

        return resultStatement;
      }
    );
  }

  console.log({ fileContent });

  return fileContent;
}
