import { cliParamsParser } from "@root/parser";

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

test("test with params start with - and includes =", () => {
  const argvs = ["node.exe", "d:/data/main.js", "-m=PROD", "--uid=10001"];

  const paramList = cliParamsParser(argvs);

  console.log({ paramList });

  expect(paramList).toEqual(
    new Map<string, string>().set("m", "PROD").set("uid", "10001")
  );

  expect(paramList.has("m")).toBeTruthy();
  expect(paramList.has("uid")).toBeTruthy();
  expect(paramList.has("weight")).toBeFalsy();
});

test("test with params start with - and not includes =", () => {
  const argvs = [
    "node.exe",
    "d:/data/main.js",
    "-v",
    "2",
    "--compressed",
    "--uid=10001",
    "phone=0922.893.234",
    "-p",
  ];

  const paramList = cliParamsParser(argvs);

  console.log({ paramList });

  expect(paramList).toEqual(
    new Map<string, string | boolean>()
      .set("v", "2")
      .set("compressed", true)
      .set("uid", "10001")
      .set("phone", "0922.893.234")
      .set("p", true)
  );

  expect(paramList.has("v")).toBeTruthy();
  expect(paramList.has("compressed")).toBeTruthy();
  expect(paramList.has("uid")).toBeTruthy();
  expect(paramList.has("phone")).toBeTruthy();
  expect(paramList.has("p")).toBeTruthy();
  expect(paramList.has("weight")).toBeFalsy();
  expect(paramList.has("seri")).toBeFalsy();
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
