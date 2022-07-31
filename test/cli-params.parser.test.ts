import { cliParamsParser } from "../src/typescript/modules/index";

test("test with params", () => {
  const argvs = ["node.exe", "d:/data/main.js", "mode=PROD", "user=thomas"];

  const paramList = cliParamsParser(argvs);

  console.log({ paramList });

  expect(paramList).toEqual(
    new Map<string, string>().set("mode", "PROD").set("user", "thomas")
  );

  expect(paramList.has("mode")).toBeTruthy();
  expect(paramList.has("user")).toBeTruthy();
  expect(paramList.has("gender")).toBeFalsy();
});

test("test with no params", () => {
  const argvs = ["node.exe", "d:/data/main.js", "PROD", "thomas"];

  const paramList = cliParamsParser(argvs);

  console.log({ paramList });

  expect(paramList).toEqual(new Map<string, string>());

  expect(paramList.has("mode")).toBeFalsy();
  expect(paramList.has("user")).toBeFalsy();
  expect(paramList.has("gender")).toBeFalsy();
});
