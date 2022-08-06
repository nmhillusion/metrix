import { CookieMix } from "@root/modules/http";

test("test for cookie string", () => {
  const outputCookie = CookieMix.setCookie({
    name: "uid",
    value: "1001",
  });

  console.log({ outputCookie });

  expect(outputCookie).toBe("uid=1001");
});

test("test for cookie string; secure", () => {
  const outputCookie = CookieMix.setCookie({
    name: "uid",
    value: "1001",
    secure: true,
  });

  console.log({ outputCookie });

  expect(outputCookie).toBe("uid=1001;secure");
});

test("test for cookie string; secure; domain", () => {
  const outputCookie = CookieMix.setCookie({
    name: "uid",
    value: "1001",
    secure: true,
    domain: "nmhillusion.netlify.app",
  });

  console.log({ outputCookie });

  expect(outputCookie).toBe("uid=1001;domain=nmhillusion.netlify.app;secure");
});

test("test fo cookie string; secure; domain; expires;", () => {
  const _date = new Date();
  const outputCookie = CookieMix.setCookie({
    name: "uid",
    value: "1001",
    domain: "nmhillusion.netlify.app",
    secure: true,
    expires: _date,
  });

  console.log({ outputCookie });

  expect(outputCookie).toBe(
    `uid=1001;domain=nmhillusion.netlify.app;expires=${_date.toUTCString()};secure`
  );
});

test("test fo cookie string; secure; domain; expires; expires;maxAge", () => {
  const _date = new Date();
  const outputCookie = CookieMix.setCookie({
    name: "uid",
    value: "1001",
    domain: "nmhillusion.netlify.app",
    secure: true,
    expires: _date,
    maxAgeInSeconds: 500,
  });

  console.log({ outputCookie });

  expect(outputCookie).toBe(
    `uid=1001;domain=nmhillusion.netlify.app;max-age=500;expires=${_date.toUTCString()};secure`
  );
});

test("test fo cookie string; secure; domain; expires; expires;maxAge; path;", () => {
  const _date = new Date();
  const outputCookie = CookieMix.setCookie({
    name: "uid",
    value: "1001",
    domain: "nmhillusion.netlify.app",
    secure: true,
    expires: _date,
    maxAgeInSeconds: 500,
    path: "/admin",
  });

  console.log({ outputCookie });

  expect(outputCookie).toBe(
    `uid=1001;path=/admin;domain=nmhillusion.netlify.app;max-age=500;expires=${_date.toUTCString()};secure`
  );
});

test("test fo cookie string; secure; domain; expires; expires;maxAge; path; sameSite", () => {
  const _date = new Date();
  const outputCookie = CookieMix.setCookie({
    name: "uid",
    value: "1001",
    domain: "nmhillusion.netlify.app",
    secure: true,
    expires: _date,
    maxAgeInSeconds: 500,
    path: "/admin",
    samesite: "strict",
  });

  console.log({ outputCookie });

  expect(outputCookie).toBe(
    `uid=1001;path=/admin;domain=nmhillusion.netlify.app;max-age=500;expires=${_date.toUTCString()};secure;samesite=strict`
  );
});
