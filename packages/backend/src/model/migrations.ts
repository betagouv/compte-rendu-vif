import { createTable, schemaMigrations } from "@nozbe/watermelondb/Schema/migrations";

export default schemaMigrations({
  migrations: [
    {
      toVersion: 1,
      steps: [
        createTable({
          name: "reports",
          columns: [
            { name: "title", type: "string" },
            { name: "content", type: "string" },
            { name: "created_at", type: "number" },
          ],
        }),
      ],
    },
  ],
});
