import { util } from "@root/modules";
import path from "path";

const {
  file: { common },
} = util;

test("test common util - directory", () => {
  expect(
    common.CommonUtil.isDirectory(path.join(__dirname, "../file"))
  ).toBeTruthy();
  expect(
    common.CommonUtil.isDirectory(path.join(__dirname, "../file2"))
  ).toBeFalsy();
});

test("test common util - file", () => {
  expect(
    common.CommonUtil.isFile(
      path.join(__dirname, "../file/commom.utils.test.ts")
    )
  ).toBeTruthy();
  expect(
    common.CommonUtil.isFile(
      path.join(__dirname, "../file/commom.utils.test.js")
    )
  ).toBeFalsy();
});
