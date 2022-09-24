import { TsParser } from "@nmhillusion/n2mix/parser/typescript";
import path from "path";

test("test export typescript parser", () => {
  expect(() => {
    const tsParser = new TsParser(path.join(__dirname, "./export1.ts"));

    const model = tsParser.parse();

    console.log({ model });
  }).not.toThrow();
});
