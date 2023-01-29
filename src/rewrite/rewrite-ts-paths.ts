import * as fs from "fs";
import path from "path";
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
      console.log("...executing file path: ", filePath, {
        baseUrl,
        pathsConfig,
      });

      const executingFilePath = _getExecutingPath(filePath);

      const rewriteImportContent = _doReplaceImportStatementWithPath(
        fs.readFileSync(filePath).toString(),
        {
          executingFilePath,
          tsconfigPath,
          baseUrl,
          pathsConfig,
        }
      );

      fs.writeFileSync(filePath, rewriteImportContent);
      console.log("finished executing for file path: ", filePath);
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

      const absolutePathToSource = path.resolve(
        path.dirname(filePath),
        sourcePath
      );

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
      for (const _path of _config.value) {
        if (!combinedConfig[_config.key].includes(_path)) {
          combinedConfig[_config.key].push(_path);
        }
      }
    }
  }

  return combinedConfig;
}

function _getPostfixOfPathToImport(_path: string) {
  const extMap = new Map<string, string>();
  extMap
    .set("", "")
    .set(".ts", ".ts")
    .set(".d.ts", ".d.ts")
    .set(".js", ".js")
    .set(".d.js", ".d.js");

  for (const _key of extMap.keys()) {
    if (fs.existsSync(_path + _key)) {
      return extMap.get(_key);
    }
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
              _p = path.resolve(
                path.dirname(String(tsconfigPath)),
                baseUrl,
                _p
              );
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
            const postfixPath = _getPostfixOfPathToImport(resolvedPath);

            console.log("[> resolve real path of file: ", {
              resolvedPath,
              postfixPath,
            });

            return undefined !== postfixPath;
          });

          if (correctResolvePath) {
            let correspondPathToAlias = path.relative(
              path.resolve(executingDirPath),
              path.resolve(correctResolvePath)
            );

            correspondPathToAlias = correspondPathToAlias.replace(/\\/g, "/");

            if (!String(correspondPathToAlias).endsWith("/")) {
              correspondPathToAlias += "/";
            }

            console.log("compare between: ", {
              executingDirPath,
              correctResolvePath,
              correspondPathToAlias,
            });

            resultStatement = _match.replace(
              importPath,
              importPath.replace(matchingAliasPathKey, correspondPathToAlias)
            );

            console.log({ resultStatement });
          } else {
            console.error("Cannot find correct path of ", matchingAliasPathKey);
          }
        }

        return resultStatement;
      }
    );
  }

  // console.log({ fileContent });

  return fileContent;
}
