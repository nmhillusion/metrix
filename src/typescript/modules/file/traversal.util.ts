import * as fs from "fs";
import * as _path from "path";
import { CommonUtil } from "./common.util";

export class TraversalFile {
  private startPath: fs.PathLike;

  constructor() {
    this.startPath = "./";
  }

  fromPath(path: fs.PathLike) {
    if (!!path && fs.existsSync(path)) {
      this.startPath = path;
    } else {
      throw new Error("path doesn't exist");
    }
    return this;
  }

  async run(path?: fs.PathLike): Promise<string[]> {
    if (!path) {
      path = this.startPath;
    }
    let result: string[] = [];

    if (CommonUtil.isDirectory(path)) {
      for (const itemOfDir of fs.readdirSync(path)) {
        const fullPath = _path.join(String(path), itemOfDir);

        if (CommonUtil.isFile(fullPath)) {
          result.push(fullPath);
        } else if (CommonUtil.isDirectory(fullPath)) {
          const childrenItemOfDir = await this.run(fullPath);
          result = result.concat(childrenItemOfDir);
        }
      }
    }

    return result;
  }

  runWithCallback(
    callback: (filePath: fs.PathLike) => any,
    path?: fs.PathLike
  ) {
    if (!callback) {
      throw new Error("NOT run because of not exist callback function");
    }

    if (!path) {
      path = this.startPath;
    }

    if (CommonUtil.isDirectory(path)) {
      for (const itemOfDir of fs.readdirSync(path)) {
        const fullPath = _path.join(String(path), itemOfDir);

        if (CommonUtil.isFile(fullPath)) {
          callback(fullPath);
        } else if (CommonUtil.isDirectory(fullPath)) {
          this.runWithCallback(callback, fullPath);
        }
      }
    }
  }
}
