import { util } from "metrix";

function greet(name: string) {
  console.log("hello, guys, ", name);

  util.func.logObject({
    name: "Anny",
    bornYear: 1996,
    nationality: "French",
  });
}
greet(util.func.randomColor());
