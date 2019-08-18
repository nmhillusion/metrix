function fn(){
  return {
    nfn(fn, amount = 1e10){
      return (...args) => {
        amount = Math.min(args.length, amount);
        return fn(...args.slice(0, amount));
      }
    },
    suffle(arr){
      return arr;
    }
  }
}

module.exports = fn();