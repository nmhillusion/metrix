import shx from "shelljs";

execCommand(`npm run build-js`);
execCommand(`npm run build-scss`);
execCommand(`npm run webpack`);
execCommand(`npm run build-docs`);

function execCommand(command: string) {
  console.log(`command: [${command}]`);

  const { stderr, stdout } = shx.exec(command, {
    async: false,
  });

  console.log(`command: [${command}]; output: `, { stderr, stdout });
}
