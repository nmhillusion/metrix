import * as shx from "shelljs";

execCommand("npm run build-js");
execCommand("npm run webpack");
execCommand("npm run build-docs");
execCommand("npm run build-publish-package-json");

function execCommand(command: string) {
  console.log(`command: [${command}]`);

  const { code } = shx.exec(command, {
    async: false,
  });

  console.log(`command: [${command}]; returnCode: `, code);
}
