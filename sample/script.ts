import { logObject, randomColor } from "metrix";

function greet(name: string) {
  console.log("hello, guys, ", name);

  logObject({
    name: "Anny",
    bornYear: 1996,
    nationality: "French",
  });
}
greet(randomColor());
