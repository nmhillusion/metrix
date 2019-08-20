function fn(){
  return {
    nfn(fn, amount = 1e10){
      return (...args) => {
        amount = Math.min(args.length, amount);
        return "function" == typeof fn ? fn(...args.slice(0, amount)) : null;
      }
    },
    suffle(arr){
      return arr;
    },
    randomColor(){
      let result = "#";
      do{
        result += Math.round(Math.random() * 16).toString(16);
      }while(7 < result.length);
      return result;
    },
    log(o){
      if("object" == typeof o){
        Object.keys(o).forEach(key => console.log(` ${key} : ${o[key]} `));
      }
    }
  }
}

module.exports = fn();
