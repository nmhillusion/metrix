import * as fs from "fs";

/**
 * common functions/utils to interact and determine the status of file/folder
 */
export class CommonUtil {
  /**
   * Determine of this path is pointed to a file
   * @param path to determine a file
   * @returns true/false if path is a file
   */
  static isFile(path: fs.PathLike): boolean {
    if (!path) {
      return false;
    }
    return fs.existsSync(path) && fs.lstatSync(path).isFile();
  }

  public static isDirectory(path: fs.PathLike): boolean {
    if (!path) {
      return false;
    }
    return fs.existsSync(path) && fs.lstatSync(path).isDirectory();
  }

  public static isRelativePath(path: fs.PathLike): boolean {
    if (!path) {
      return false;
    }

    const _path = String(path).trim();

    if (["./", "../"].some((_p) => _path.startsWith(_p))) {
      return true;
    }

    if ("." == path || ".." == path) {
      return true;
    }

    return false;
  }
}
