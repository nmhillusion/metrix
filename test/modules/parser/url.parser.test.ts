import { UrlParser } from "../../../src/typescript/modules/index";

test("simple url parser", () => {
  const urlParserResult = UrlParser.parse(
    "https://www.youtube.com/watch?v=XHMEypwUsKc&t=810s"
  );
  console.log({ urlParserResult });

  expect(urlParserResult).toBeTruthy();
  expect(urlParserResult?.protocal).toEqual("https");
  expect(urlParserResult?.host).toEqual("www.youtube.com");
  expect(urlParserResult?.path).toEqual("watch");
  expect(urlParserResult?.paramMap).toEqual(
    new Map<string, string[]>().set("v", ["XHMEypwUsKc"]).set("t", ["810s"])
  );
});

test("url parser without path", () => {
  const urlParserResult = UrlParser.parse(
    "https://www.youtube.com/?v=XHMEypwUsKc&t=810s"
  );
  console.log({ urlParserResult });

  expect(urlParserResult).toBeTruthy();
  expect(urlParserResult?.protocal).toEqual("https");
  expect(urlParserResult?.host).toEqual("www.youtube.com");
  expect(urlParserResult?.path).toBe("");
  expect(urlParserResult?.paramMap).toEqual(
    new Map<string, string[]>().set("v", ["XHMEypwUsKc"]).set("t", ["810s"])
  );
});

test("url parser without query", () => {
  const urlParserResult = UrlParser.parse("https://www.youtube.com/watch");
  console.log({ urlParserResult });

  expect(urlParserResult).toBeTruthy();
  expect(urlParserResult?.protocal).toEqual("https");
  expect(urlParserResult?.host).toEqual("www.youtube.com");
  expect(urlParserResult?.path).toBe("watch");
  expect(urlParserResult?.paramMap).toEqual(new Map<string, string[]>());
});

test("url parser 2", () => {
  const urlParserResult = UrlParser.parse(
    "http://youtube.com/watch?v=XHMEypwUsKc"
  );
  console.log({ urlParserResult });

  expect(urlParserResult).toBeTruthy();
  expect(urlParserResult?.protocal).toEqual("http");
  expect(urlParserResult?.host).toEqual("youtube.com");
  expect(urlParserResult?.path).toBe("watch");
  expect(urlParserResult?.paramMap).toEqual(
    new Map<string, string[]>().set("v", ["XHMEypwUsKc"])
  );
});

test("url parser ERROR", () => {
  const urlParserResult = UrlParser.parse("//youtube.com/watch?v=XHMEypwUsKc");
  console.log({ urlParserResult });

  expect(urlParserResult).toBeFalsy();
});

test("url parser ERROR 2", () => {
  const urlParserResult = UrlParser.parse("abcdef");
  console.log({ urlParserResult });

  expect(urlParserResult).toBeFalsy();
});
