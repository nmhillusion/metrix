/**
 * Parser arguments from command line with structure of <command> <arg1> <arg2> <arg3>...
 * Every argument will be parsed and splited by `=` to obtain value.
 * If key has `--` in starting, it will be remove
 * @param argvs arguments from command line
 * @returns map of argument with key and values from 2 part of pair `<key>=<value>`
 */
export declare function cliParamsParser(argvs: string[]): Map<string, string | boolean>;
//# sourceMappingURL=cli-params.parser.d.ts.map