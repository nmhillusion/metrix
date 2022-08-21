import * as shx from "shelljs";

execCommand(`npm run build-js`);
execCommand(`npm run build-scss`);
execCommand(`npm run webpack`);
execCommand(`npm run build-docs`);

function execCommand(command: string) {
  console.log(`command: [${command}]`);

  const { code } = shx.exec(command, {
    async: false,
  });

  console.log(`command: [${command}]; returnCode: `, code);
}
