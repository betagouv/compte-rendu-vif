import pjson from "../package.json";
import fs from "node:fs";

const version = pjson.version + "." + Math.floor(Date.now() / 1000).toString(16);

const setVersion = () => {
  console.log("Setting version to", version);
  const contentJs = `window.APP_VERSION = "${version}";`;
  fs.writeFileSync("./dist/version.js", contentJs);
};

setVersion();
