interface Pair {
  key: string;
  value: string | boolean;
}

/**
 * Parser arguments from command line with structure of <command> <arg1> <arg2> <arg3>...
 * Every argument will be parsed and splited by `=` to obtain value.
 * If key has `--` in starting, it will be remove
 * @param argvs arguments from command line
 * @returns map of argument with key and values from 2 part of pair `<key>=<value>`
 */
export function cliParamsParser(
  argvs: string[]
): Map<string, string | boolean> {
  const paramMap: Map<string, string | boolean> = new Map();

  if (Array.isArray(argvs)) {
    for (const argvIdx in argvs) {
      const argv = String(argvs[argvIdx]);

      let parsedItem: Pair | null = null;

      if (argv.includes("=")) {
        parsedItem = parseParamsWithEqualSymbol(argvs, argvIdx, argv);
      } else if (argv.startsWith("-")) {
        parsedItem = parseParamsWithDashSymbolStarting(argvs, argvIdx, argv);
      }

      if (parsedItem) {
        paramMap.set(parsedItem.key, parsedItem.value);
      }
    }
  }

  return paramMap;
}

function parseParamsWithEqualSymbol(
  argvs: string[],
  argvIdx: string,
  argv: string
): Pair | null {
  const [key, value] = argv.split("=");
  let convertedKey = key;

  while (convertedKey.startsWith("-") && 2 <= convertedKey.length) {
    convertedKey = convertedKey.slice(1);
  }

  if (convertedKey.trim() && value.trim()) {
    return {
      key: String(convertedKey).trim(),
      value: String(value).trim(),
    };
  }

  return null;
}

function parseParamsWithDashSymbolStarting(
  argvs: string[],
  argvIdxRaw: string,
  argv: string
): Pair | null {
  const argvIdx = Number(argvIdxRaw);
  if (Number.isNaN(argvIdx)) {
    return null;
  }
  if (argv.includes("=")) {
    return null;
  }
  if (!argv.startsWith("-")) {
    return null;
  }

  let convertedKey = argv;
  while (convertedKey.startsWith("-") && 2 <= convertedKey.length) {
    convertedKey = convertedKey.slice(1);
  }

  if (!convertedKey) {
    return null;
  }

  let value: string | boolean = true;
  const nextArgv =
    argvIdx + 1 < argvs.length - 1 ? String(argvs[argvIdx + 1]) : null;

  if (nextArgv && !nextArgv.startsWith("-") && !nextArgv.includes("=")) {
    value = String(nextArgv);
  }

  return {
    key: convertedKey,
    value,
  };
}
