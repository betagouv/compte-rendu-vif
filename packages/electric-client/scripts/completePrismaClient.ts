import { promises as fs } from "node:fs";

const content = `export * from '@prisma/client/runtime';`;
const path = "./src/generated/client/runtime/index.d.ts";

await fs.mkdir("./src/generated/client/runtime", { recursive: true });
await fs.writeFile(path, content);
