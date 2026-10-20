import { test, expect, type Page } from "@playwright/test";
import { mockUsers, signup, login } from "./utils";
import { resetDatabase } from "./setup";
import { db } from "../packages/backend/src/db/db";

// "Château complexe de Test" (TEST00002) is split into unités patrimoniales by the backend UP mock
// (packages/backend/src/features/up/fixtures/up-mock.json):
//   Chapelle, Corps de logis (> Aile nord, Aile sud), Jardin

/** Types in the monument search and picks an option; retries while the constat form and monuments are loading. */
const pickMonument = async (page: Page, search: string, option: RegExp) => {
  const autocomplete = page.getByLabel("Nom ou référence du monument");
  await autocomplete.waitFor();
  await expect(async () => {
    await autocomplete.fill("");
    await autocomplete.fill(search);
    await expect(page.getByRole("option", { name: option })).toBeVisible({ timeout: 2_000 });
  }).toPass({ timeout: 60_000 });
  await page.getByRole("option", { name: option }).click();
};

const startConstatOnComplexMonument = async (page: Page) => {
  await page.getByText("Créer un constat d'état").click();
  await page.waitForURL((url) => url.pathname.startsWith("/constat/"));

  await pickMonument(page, "Château complexe", /Château complexe de Test/);

  const dialog = page.getByRole("dialog");
  await expect(dialog.getByText("Créer un constat d’état")).toBeVisible();
  return dialog;
};

/**
 * The test stack sometimes reloads the page right after the first visit (service worker install), which wipes the
 * signup/login form: retry, logging in if the account was created by an earlier attempt.
 */
const ensureLoggedIn = async (page: Page, { signupFirst }: { signupFirst: boolean }) => {
  let shouldSignup = signupFirst;
  await expect(async () => {
    const attempt = shouldSignup ? signup : login;
    shouldSignup = !shouldSignup;
    await page.goto(attempt === signup ? "./inscription" : "./connexion");
    await page.waitForSelector("input[name=email]");
    await page.waitForTimeout(1_000);
    await attempt({ page, user: mockUsers[0] });
  }).toPass({ timeout: 150_000 });
};

const getConstatId = (page: Page) => new URL(page.url()).pathname.split("/")[2]!;

test.describe("Constat d'état sur un MH complexe", () => {
  // first sync after signup/login can be slow on the test stack
  test.describe.configure({ timeout: 240_000 });

  test.beforeAll(async () => {
    await resetDatabase();
  });

  // AuthContext reloads the page on the very first visit (no "crvif/version" yet), which can wipe the signup form
  test.beforeEach(async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("crvif/version", "1"));
    page.setDefaultNavigationTimeout(20_000);
  });

  test("constat sur une UP de second niveau", async ({ page }) => {
    await ensureLoggedIn(page, { signupFirst: true });

    const dialog = await startConstatOnComplexMonument(page);

    await expect(dialog.getByText("Pour quelle partie du monument")).toBeVisible();
    await expect(dialog.getByRole("radio", { name: "Ensemble du monument" })).toBeVisible();
    await expect(dialog.getByRole("radio")).toHaveCount(4);
    await expect(dialog.getByRole("button", { name: "Créer un constat" })).toBeDisabled();

    // browse into "Corps de logis"
    await dialog.getByRole("button", { name: "Voir les UP de niveau inférieur de Corps de logis" }).click();
    await expect(dialog.getByText("Corps de logis", { exact: true })).toBeVisible();
    await expect(dialog.getByRole("radio", { name: "Ensemble de l’UP" })).toBeVisible();

    await dialog.getByRole("radio", { name: "Aile sud" }).check({ force: true });
    await dialog.getByRole("button", { name: "Créer un constat" }).click();
    await dialog.waitFor({ state: "hidden" });

    await expect(page.getByText("Château complexe de Test | Aile sud")).toBeVisible();
    await expect(page.getByText("Changer de monument ou d’UP")).toBeVisible();

    // Informations step: "Monument historique" and "Unité patrimoniale" blocks
    const infos = page.locator("main");
    await expect(infos.getByRole("heading", { name: "Unité patrimoniale" }).first()).toBeVisible();
    await expect(infos.getByText("ITEST1").first()).toBeVisible(); // identifiant agrégé du monument
    await expect(infos.getByText("ITEST6").first()).toBeVisible(); // identifiant agrégé de l'UP
    await expect(infos.getByText("Partie d'immeuble").first()).toBeVisible();
    await expect(infos.getByText("Classé", { exact: true }).first()).toBeVisible();
    await expect(infos.getByText("Corps de logis", { exact: true }).first()).toBeVisible(); // "Fait partie de"

    const id = getConstatId(page);
    await expect
      .poll(async () => {
        const report = await db.selectFrom("state_report").selectAll().where("id", "=", id).executeTakeFirst();
        return report && { ref: report.reference_pop, up: report.up_id, chemin: report.up_chemin };
      })
      .toEqual({ ref: "TEST00002", up: "mock-test-6", chemin: JSON.stringify([{ id: "mock-test-2", intitule: "Corps de logis" }]) });

    // switch to another UP of the same monument without losing the constat
    await page.getByText("Changer de monument ou d’UP").click();
    await page.getByRole("button", { name: "Changer d’UP" }).click();
    const changeDialog = page.getByRole("dialog");
    await changeDialog.getByRole("radio", { name: "Chapelle" }).check({ force: true });
    await changeDialog.getByRole("button", { name: "Valider" }).click();
    await expect(page.getByText("Château complexe de Test | Chapelle")).toBeVisible();

    await expect
      .poll(async () => {
        const report = await db.selectFrom("state_report").selectAll().where("id", "=", id).executeTakeFirst();
        return report && { up: report.up_id, identifiant: report.up_identifiant, chemin: report.up_chemin };
      })
      .toEqual({ up: "mock-test-3", identifiant: "ITEST3", chemin: null });
  });

  test("constat sur l'ensemble du monument, et annulation", async ({ page }) => {
    await ensureLoggedIn(page, { signupFirst: false });

    // "Annuler" leaves the constat without monument
    let dialog = await startConstatOnComplexMonument(page);
    await dialog.getByRole("button", { name: "Annuler" }).click();
    await dialog.waitFor({ state: "hidden" });
    await expect(page.getByLabel("Nom ou référence du monument")).toBeVisible();

    await pickMonument(page, "Château complexe", /Château complexe de Test/);
    dialog = page.getByRole("dialog");
    await dialog.getByRole("radio", { name: "Ensemble du monument" }).check({ force: true });
    await dialog.getByRole("button", { name: "Créer un constat" }).click();
    await dialog.waitFor({ state: "hidden" });

    await expect(page.getByRole("heading", { name: "Château complexe de Test", exact: true })).toBeVisible();

    const id = getConstatId(page);
    await expect
      .poll(async () => {
        const report = await db.selectFrom("state_report").selectAll().where("id", "=", id).executeTakeFirst();
        return report && { ref: report.reference_pop, up: report.up_id, monument: report.up_monument_identifiant };
      })
      .toEqual({ ref: "TEST00002", up: null, monument: "ITEST1" });
  });

  test("les constats antérieurs d'une UP ne montrent que ceux de cette UP", async ({ page }) => {
    await ensureLoggedIn(page, { signupFirst: false });

    const user = await db
      .selectFrom("user")
      .select(["id", "service_id"])
      .where("email", "=", mockUsers[0].email)
      .executeTakeFirstOrThrow();
    const sentConstat = (id: string, date: string, up: { id: string; intitule: string } | null) => ({
      id,
      version: 2,
      reference_pop: "TEST00002",
      titre_edifice: "Château complexe de Test",
      up_id: up?.id ?? null,
      up_intitule: up?.intitule ?? null,
      up_monument_identifiant: "ITEST1",
      nature_visite: "complète",
      redacted_by: "Agent Antérieur",
      attachment_id: `fake-pdf-${id}`,
      disabled: false,
      service_id: user.service_id,
      created_by: user.id,
      created_at: date,
    });
    await db
      .insertInto("state_report")
      .values([
        sentConstat("prev-chapelle", "2025-01-10T10:00:00.000Z", { id: "mock-test-3", intitule: "Chapelle" }),
        sentConstat("prev-jardin", "2025-02-10T10:00:00.000Z", { id: "mock-test-4", intitule: "Jardin" }),
        sentConstat("prev-ensemble", "2025-03-10T10:00:00.000Z", null),
      ])
      .execute();

    const dialog = await startConstatOnComplexMonument(page);
    await dialog.getByRole("radio", { name: "Chapelle" }).check({ force: true });
    await dialog.getByRole("button", { name: "Créer un constat" }).click();
    await dialog.waitFor({ state: "hidden" });

    const previous = page.getByRole("button", { name: "Constats antérieurs" }).first();
    await expect(previous).toBeVisible({ timeout: 30_000 });
    await previous.click();
    await expect(page.getByText("10/01/2025 - visite complète - Chapelle").first()).toBeVisible();
    await expect(page.getByText("10/02/2025")).toHaveCount(0);
    await expect(page.getByText("10/03/2025")).toHaveCount(0);
  });

  test("un MH simple ne propose pas d'UP", async ({ page }) => {
    await ensureLoggedIn(page, { signupFirst: false });

    await page.getByText("Créer un constat d'état").click();
    await page.waitForURL((url) => url.pathname.startsWith("/constat/"));
    await pickMonument(page, "Château de Test", /^Château de Test/);
    await expect(page.getByRole("heading", { name: "Château de Test", exact: true })).toBeVisible();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page.getByText("Changer de monument", { exact: true })).toBeVisible();
  });
});
