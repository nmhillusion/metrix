import * as fs from "fs";

export class CommonUtil {
  static isFile(path: fs.PathLike): boolean {
    if (!path) {
      return false;
    }
    return fs.existsSync(path) && fs.lstatSync(path).isFile();
  }

  static isDirectory(path: fs.PathLike): boolean {
    if (!path) {
      return false;
    }
    return fs.existsSync(path) && fs.lstatSync(path).isDirectory();
  }
}
