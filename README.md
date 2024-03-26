# ElectricSQL workflow

- Edit `prisma/schema.prisma`
- `pnpm migration:create` to create migrations using prisma cli and rename the files so it matches
  `@databases/pg-migrations` syntax `{3digitsNumber}-{name}.sql`
- If new tables are created, add `ALTER TABLE table_name ENABLE ELECTRIC;` to your migration file
- `pnpm migration:up` to apply migrations to ElectricSQL proxy db
