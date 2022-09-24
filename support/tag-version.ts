import path from "path";
import { tagVersion } from "../src/utils/git.util";

tagVersion(path.join(__dirname, "../package.json"));
