import { Page } from "@playwright/test";
import { db } from "../packages/backend/src/db/db";

export const mockUser1 = {
  name: "Test runner 1",
  email: "testrunner1@yopmail.com",
  password: "Password123!",
};

export const mockUser2 = {
  name: "Test runner 2",
  email: "testrunner2@yopmail.com",
  password: "Password123!",
};

type User = typeof mockUser1;

export const mockUsers = [mockUser1, mockUser2];

export const signup = async ({ page, user, udap = "udap-landes" }: { page: Page; user: User; udap?: string }) => {
  await page.goto("./signup");

  await page.fill("input[name=name]", user.name);
  await page.fill("input[name=email]", user.email);
  await page.fill("input[name=password]", user.password);

  await page.selectOption("select[name=udap_id]", udap);

  await page.click("button[type=submit]");

  await page.waitForURL((url) => url.pathname === "/");
};

export const cleanupDb = async () => {
  const result = await db
    .deleteFrom("internal_user")
    .where(
      "email",
      "in",
      mockUsers.map((u) => u.email),
    )
    .returning("id")
    .execute();

  await db
    .deleteFrom("user")
    .where(
      "id",
      "in",
      result.map((r) => r.id),
    )
    .execute();
};
