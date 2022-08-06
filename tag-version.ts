import path from "path";
import { util } from "./src/typescript/modules";

const {
  git: { tagVersion },
} = util;

tagVersion(path.join(__dirname, "./package.json"));
