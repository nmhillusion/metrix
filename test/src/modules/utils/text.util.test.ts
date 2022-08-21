import { text } from "@root/modules/utils";

test("test convert string to normal lines", () => {
  const inp = `first line
  
  second line
  third line
  
  `;

  const expectedOutput = ["first line", "second line", "third line"];

  expect(text.stringToNormalLines(inp)).toEqual(expectedOutput);
});

test("test convert string to normal lines with special characters", () => {
  const inp = `first line\n
  
  second line\r\n
  third line
  \r\n
  four
  `;

  const expectedOutput = ["first line", "second line", "third line", "four"];

  expect(text.stringToNormalLines(inp)).toEqual(expectedOutput);
});
