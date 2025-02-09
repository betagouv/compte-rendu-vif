import { test, expect, type Route } from "@playwright/test";
import { db } from "../packages/backend/src/db/db";
import { cleanupDb, mockUser1, signup } from "./utils";

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
    await signup({ page, user: mockUser1 });
    expect(page.url()).toContain("/");

    await page.click("button[data-test-id=settings-menu]");

    const button = await page.waitForSelector("[data-test-id=logout]");
    await button.click();
    await page.waitForURL((url) => url.pathname === "/login");
    expect(page.url()).toContain("login");
  });

  test("should login", async ({ page }) => {
    await page.goto("./login");

    await page.fill("input[name=email]", mockUser1.email);
    await page.fill("input[name=password]", mockUser1.password);

    await page.click("button[type=submit]");
    await page.waitForURL((url) => url.pathname === "/");
    expect(page.url()).toContain("/");
  });
});
