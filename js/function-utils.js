function fn() {
  return {
    nfn(fn, amount = 1e10) {
      return (...args) => {
        amount = Math.min(args.length, amount);
        return "function" == typeof fn ? fn(...args.slice(0, amount)) : null;
      };
    },
    suffle(arr) {
      let resultArr = [];
      if ("object" == typeof arr && arr.hasOwnProperty("length")) {
        const size = arr.length;
        const idxArr = [];

        function getRandomIndex() {
          return Math.round(Math.random() * (size - 1));
        }

        do {
          let newIdx;
          do {
            newIdx = getRandomIndex();
          } while (idxArr.includes(newIdx));

          idxArr.push(newIdx);
        } while (size > idxArr.length);

        resultArr = idxArr.map((idx) => arr[idx]);
      }
      return resultArr;
    },
    randomColor() {
      let result = "#";
      do {
        result += Math.round(Math.random() * 16).toString(16);
      } while (7 > result.length);
      return result;
    },
    log(o) {
      if ("object" == typeof o) {
        Object.keys(o).forEach((key) => console.log(` ${key} : ${o[key]} `));
      }
    }
  };
}

module.exports = fn();
