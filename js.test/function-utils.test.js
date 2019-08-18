const fn = require("../js/function-utils");
let result = undefined;

test("test nfn min", () => {
  result = [6,-6].map(fn.nfn(Math.min, 2));
  console.log("result", result);
  expect(result).toEqual([0, -6]);

  result = ["0", 1, "11", "101"].map(fn.nfn(parseInt, 1));
  console.log("result", result);
  expect(result).toEqual([0, 1, 11, 101]);

  result = [1, 2, 3, 4, 5, 6, 7, 8].reduce((t, c) => c % 2 ? t : t + c, 0);
  console.log("result", result);
  expect(result).toBe(20);
});