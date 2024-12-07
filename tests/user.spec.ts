import { test, expect, type Route } from "@playwright/test";
import type { RouterOutputs } from "../packages/frontend/src/api";
import { db } from "../packages/backend/src/db/db";

test.beforeEach(async ({ page }) => {
  await page.goto("./");
});

test.afterAll(async () => {
  await cleanupDb();
});

test.describe("Create user", () => {
  test("should be redirected to the login page", async ({ page }) => {
    await page.waitForURL((url) => url.pathname === "/login");
    expect(page.url()).toContain("login");
  });

  test("should go to signup page", async ({ page }) => {
    const button = await page.waitForSelector("[href='/signup']");
    expect(button).toBeDefined();

    await button.click();
    await page.waitForURL((url) => url.pathname === "/signup");

    expect(page.url()).toContain("signup");
  });

  test.only("should create a new user", async ({ page }) => {
    await page.goto("./signup");

    await page.fill("input[name=name]", mockUser.name);
    await page.fill("input[name=email]", mockUser.email);
    await page.fill("input[name=password]", mockUser.password);

    await page.selectOption("select[name=udap_id]", "udap-landes");

    await page.click("button[type=submit]");

    await page.waitForURL((url) => url.pathname === "/");
    expect(page.url()).toContain("/");

    await page.click("button[data-test-id=account-menu]");

    const button = await page.waitForSelector("[data-test-id=logout]");
    await button.click();
    await page.waitForURL((url) => url.pathname === "/login");
    expect(page.url()).toContain("login");
  });

  test("should login", async ({ page }) => {
    await page.goto("./login");

    await page.fill("input[name=email]", mockUser.email);
    await page.fill("input[name=password]", mockUser.password);

    await page.click("button[type=submit]");
    await page.waitForURL((url) => url.pathname === "/");
    expect(page.url()).toContain("/");
  });
});

const cleanupDb = async () => {
  const result = await db.deleteFrom("internal_user").where("email", "=", mockUser.email).returning("id").execute();
  await db.deleteFrom("user").where("id", "=", result[0].id).execute();
};

const mockUser = {
  name: "Test runner",
  email: "crvif@yopmail.com",
  password: "Password123!",
};
