import fs from "node:fs/promises";
import { config } from "dotenv";
import { expand } from "dotenv-expand";

expand(config({ path: "../../.env" }));

export const createEnvFile = async () => {
  const values = Object.entries(process.env)
    .filter(([key]) => key.startsWith("VITE_"))
    .map(([key, value]) => `${key}: "${value}"`)
    .join(",\n");

  const contentJs = `window.ENV = { ${values} };`;
  const swContentJS = `self.ENV = { ${values} };`;

  await fs.writeFile("./dist/env.js", contentJs);
  await fs.writeFile("./dist/swEnv.js", swContentJS);

  process.exit(0);
};

createEnvFile();
