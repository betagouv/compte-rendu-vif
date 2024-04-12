import { test, expect, type Route } from "@playwright/test";
import type { RouterOutputs } from "../packages/frontend/src/api";

test.beforeEach(async ({ page }) => {
  await page.goto("./");
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

  test("should create a new user", async ({ page }) => {
    await page.route("*/**/api/create-user", mockRouteResponse);
    await page.goto("./signup");

    await page.fill("input[name=name]", "Test runner");
    await page.fill("input[name=email]", "crvif@yopmail.com");
    await page.fill("input[name=password]", "Password123!");

    await page.click("button[type=submit]");

    await page.waitForURL((url) => url.pathname === "/");
    expect(page.url()).toContain("/");

    const button = await page.waitForSelector("#fr-header-quick-access-item--Sed_connecter-0");
    await button.click();
    await page.waitForURL((url) => url.pathname === "/login");
    expect(page.url()).toContain("login");
  });

  test("should login", async ({ page }) => {
    await page.route("*/**/api/login", mockRouteResponse);

    await page.goto("./login");

    await page.fill("input[name=email]", "test@runner.com");
    await page.fill("input[name=password]", "Password123!");

    await page.click("button[type=submit]");
    await page.waitForURL((url) => url.pathname === "/");
    expect(page.url()).toContain("/");
  });
});

const mockRouteResponse = async (route: Route) => {
  await route.fulfill({ json: mockLoginResponse });
};

const mockLoginResponse: RouterOutputs<"/api/create-user"> = {
  token: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  user: {
    id: "3787db2f-5bd0-4a43-af83-a9768c2b7e71",
    name: "Test runner",
    email: "test@runner.com",
  },
};
