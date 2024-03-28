import fs from "fs/promises";
import path from "path";
import { v4 } from "uuid";
import crypto from "crypto";

const migrationsPath = path.join(process.cwd(), "prisma", "migrations");

/* migrations file structure:

  migrations
    20240326093741_001
      migration.sql
    some_other_timestamp
      migration.sql
*/
const migrationsFolderContent = await fs.readdir(migrationsPath);

// filter out the files and keep only folders
const migrations = migrationsFolderContent.filter((file) => !file.includes(".")).sort();

// retrieve max current index
const existingMigrations = migrationsFolderContent
  .filter((file) => file.endsWith(".sql"))
  .map((file) => Number(file.split("-")[0]))
  .filter((n) => !Number.isNaN(n));
const maxIndex = Math.max(...existingMigrations);
let index = maxIndex === -Infinity ? 0 : maxIndex + 1;

for (const migration of migrations) {
  const newContent = await getMigrationFileContent(migration);

  await fs.writeFile(path.join(migrationsPath, `${numberTo3Digits(index)}-${migration}.sql`), newContent);

  index++;
}

async function getMigrationFileContent(migrationName: string) {
  const filePath = path.join(migrationsPath, migrationName, "migration.sql");
  const fileContent = await fs.readFile(filePath, "utf-8");

  const checksum = crypto.createHash("md5").update(fileContent).digest("hex");
  const startedAt = new Date().toISOString().slice(0, 19).replace("T", " ");
  const finishedAt = new Date().toISOString().slice(0, 19).replace("T", " ");
  const appliedStepsCount = 1;

  const query = `INSERT INTO "public"."_prisma_migrations" ("id", "checksum", "started_at", "finished_at", "migration_name", "applied_steps_count") VALUES ('${v4()}', '${checksum}', '${startedAt}', '${finishedAt}', '${migrationName}', ${appliedStepsCount});`;

  const newContent = `${fileContent}\n${query}`;

  return newContent;
}

function numberTo3Digits(number: number) {
  return number.toString().padStart(3, "0");
}

console.log(`Renamed ${migrations.length} migration${migrations.length === 1 ? "" : "s"} successfully`);
