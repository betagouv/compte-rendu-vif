import fs from "fs/promises";
import path from "path";

const migrationsPath = path.join(process.cwd(), "drizzle");
const migrations = (await fs.readdir(migrationsPath)).filter(
  (migration) => !migration.includes("-") && migration.endsWith(".sql")
);

for (const migration of migrations) {
  const [number, ...rest] = migration.split("_");
  const newName = `${number}-${rest.join("_")}`;

  await fs.rename(
    path.join(migrationsPath, migration),
    path.join(migrationsPath, newName)
  );
}

console.log(
  `Renamed ${migrations.length} migration${
    migrations.length === 1 ? "" : "s"
  } successfully`
);
