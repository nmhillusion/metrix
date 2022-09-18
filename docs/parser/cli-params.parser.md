# Function: `cliParamsParser(argvs: string[])`

    Parser arguments from command line with structure of <command> <arg1> <arg2> <arg3>...

Every argument will be parsed and splited by `=` to obtain value.

If key has `--` in starting, it will be remove

### Parameter List:

- **argvs**: `string[]` -- arguments from command line


### Return Type: `Map<string, string | boolean>` --- map of argument with key and values from 2 part of pair `<key>=<value>`
