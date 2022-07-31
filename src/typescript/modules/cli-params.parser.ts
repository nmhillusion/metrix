export function cliParamsParser(argvs: string[]): Map<string, string> {
  const paramMap: Map<string, string> = new Map();

  if (Array.isArray(argvs)) {
    for (const argv of argvs) {
      const convArgv = String(argv);
      if (convArgv.includes("=")) {
        const [key, value] = convArgv.split("=");

        if (key.trim() && value.trim()) {
          paramMap.set(String(key).trim(), String(value).trim());
        }
      }
    }
  }

  return paramMap;
}
