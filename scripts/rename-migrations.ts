import fs from "fs/promises";
import path from "path";

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
let index = maxIndex + 1 || 0;

for (const migration of migrations) {
  const [_, name] = migration.split("_");

  await fs.rename(
    path.join(migrationsPath, migration, "migration.sql"),
    path.join(migrationsPath, `${numberTo3Digits(index)}-${name}.sql`)
  );

  await fs.rmdir(path.join(migrationsPath, migration));

  index++;
}

function numberTo3Digits(number: number) {
  return number.toString().padStart(3, "0");
}

console.log(`Renamed ${migrations.length} migration${migrations.length === 1 ? "" : "s"} successfully`);
