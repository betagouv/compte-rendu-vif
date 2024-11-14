import { describe, expect, it } from "vitest";
import { db } from "../src/db/appDb";
import * as schemas from "@cr-vif/schemas";
describe("Changes", () => {
  it("should create a new report", async () => {
    await pushChanges({ version: 1 });
  });
});

type ChangeType = "create" | "update" | "delete";
const pushChanges = async ({ version: frontendVersion }: { version: number }) => {
  const backendVersion = await db.execute("SELECT * FROM migrations");
  console.log(backendVersion);
};
