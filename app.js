function nfn(fn, args){
  return (...argv) => {
    args = Math.min(args, argv.length);
    return fn(...argv.slice(0, args));
  }
}
