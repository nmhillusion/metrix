export function nfn(fn: (..._argvs: any[]) => any, amount = 1e10) {
  return (...args: any[]) => {
    amount = Math.min(args.length, amount);
    return "function" == typeof fn ? fn(...args.slice(0, amount)) : null;
  };
}

function getRandomIndex(size: number) {
  return Math.round(Math.random() * (size - 1));
}

export function suffle(arr: any[]) {
  let resultArr = [];
  if ("object" == typeof arr && arr.hasOwnProperty("length")) {
    const size = arr.length;
    const idxArr = [];

    do {
      let newIdx = -1;
      do {
        newIdx = getRandomIndex(size);
      } while (idxArr.includes(newIdx));

      idxArr.push(newIdx);
    } while (size > idxArr.length);

    resultArr = idxArr.map((idx) => arr[idx]);
  }
  return resultArr;
}

export function randomColor() {
  let result = "#";
  do {
    result += Math.round(Math.random() * 16).toString(16);
  } while (7 > result.length);
  return result;
}

export function log(o) {
  if ("object" == typeof o) {
    Object.keys(o).forEach((key) => console.log(` ${key} : ${o[key]} `));
  }
}
