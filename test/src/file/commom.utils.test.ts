import { CommonUtil } from "@nmhillusion/n2mix/file";
import path from "path";

test("test common util - directory", () => {
  expect(CommonUtil.isDirectory(path.join(__dirname, "../file"))).toBeTruthy();
  expect(CommonUtil.isDirectory(path.join(__dirname, "../file2"))).toBeFalsy();
});

test("test common util - file", () => {
  expect(
    CommonUtil.isFile(path.join(__dirname, "../file/commom.utils.test.ts"))
  ).toBeTruthy();
  expect(
    CommonUtil.isFile(path.join(__dirname, "../file/commom.utils.test.js"))
  ).toBeFalsy();
});
