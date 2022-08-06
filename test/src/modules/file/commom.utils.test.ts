import { util } from "@root/modules";
import path from "path";

const {
  file: { CommonUtil },
} = util;

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