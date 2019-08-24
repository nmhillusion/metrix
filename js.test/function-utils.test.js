const fn = require("../js/function-utils");
let result = undefined;

test("test nfn", () => {
  result = [6, -6].map(fn.nfn(Math.min, 2));
  fn.log({ result });
  expect(result).toEqual([0, -6]);

  result = ["0", 1, "11", "101"].map(fn.nfn(parseInt, 1));
  fn.log({ result });
  expect(result).toEqual([0, 1, 11, 101]);

  result = [1, 2, 3, 4, 5, 6, 7, 8].reduce((t, c) => (c % 2 ? t : t + c), 0);
  fn.log({ result });
  expect(result).toBe(20);
});

test("test suffle", () => {
  const inpArr = [2, 1, 3, 7, 4];
  result = fn.suffle(inpArr);
  fn.log({ result });
  expect(result.length).toBe(5);
  inpArr.forEach((item) => {
    expect(result.includes(item)).toBe(true);
  });
});

test("test randomColor", () => {
  result = fn.randomColor();
  fn.log({ result });
  expect(Number.isNaN(Number(`0x${result.slice(1)}`))).toBe(false);
});
