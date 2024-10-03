import pjson from '../package.json';
import fs from "node:fs/promises";

const version = pjson.version + "." + Math.floor(Date.now() / 1000).toString(16);

const setVersion = async () => {
    const contentJs = `window.APP_VERSION = "${version}";`;
    await fs.writeFile("./dist/version.js", contentJs);
}

setVersion();