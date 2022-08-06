import { parser } from "@root/modules";

const { UrlParser } = parser;

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

test("url merge params 1", () => {
  expect(UrlParser.mergeParams("https://google.com", {})).toEqual(
    "https://google.com"
  );

  expect(UrlParser.mergeParams("https://google.com")).toEqual(
    "https://google.com"
  );
});

test("url merge params 2", () => {
  expect(
    UrlParser.mergeParams("https://google.com/search", {
      q: "compiler",
    })
  ).toEqual("https://google.com/search?q=compiler");

  expect(
    UrlParser.mergeParams("https://google.com/search", {
      q: "compiler",
      lang: "vi-vn",
    })
  ).toEqual("https://google.com/search?q=compiler&lang=vi-vn");

  expect(
    UrlParser.mergeParams("https://google.com/search", {
      h: "prev",
      uid: "9001",
    })
  ).toEqual("https://google.com/search?h=prev&uid=9001");
});

test("url merge params 3", () => {
  expect(
    UrlParser.mergeParams("https://google.com/search", {
      q: ["compiler"],
    })
  ).toEqual("https://google.com/search?q=compiler");

  expect(
    UrlParser.mergeParams("https://google.com/search", {
      q: ["compiler", "java"],
    })
  ).toEqual("https://google.com/search?q=compiler&q=java");
});

test("url merge params 4 - null", () => {
  expect(UrlParser.mergeParams()).toBeUndefined();
});
