import fs from "node:fs/promises";
import { config } from "dotenv";
import { expand } from "dotenv-expand";

expand(config({ path: "../../.env" }));

export const createEnvFile = async () => {
  const values = Object.entries(process.env)
    .filter(([key]) => key.startsWith("VITE_"))
    .map(([key, value]) => `${key}: "${value}"`)
    .join(",\n");

  const version = "0.1.0." + Math.floor(Date.now() / 1000).toString(16);

  const contentJs = `window.ENV = { ${values}, VERSION: "${version}" };`;

  await fs.writeFile("./dist/env.js", contentJs);
};

createEnvFile();
