import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { UserService } from "../src/services/userService";
import { AppError } from "../src/features/errors";
import { StaticDataService } from "../src/services/staticDataService";
import { db } from "../src/db/db";

const userService = new UserService();
const staticDataService = new StaticDataService();

const mockUser = {
  email: "test@test.com",
  password: "test",
  name: "Test user",
};

describe("auth tests", () => {
  beforeAll(async () => {
    await db.deleteFrom("internal_user").where("email", "=", mockUser.email).execute();
    await db.deleteFrom("whitelist").where("email", "=", mockUser.email).execute();
  });

  afterAll(async () => {
    await db.deleteFrom("internal_user").where("email", "=", mockUser.email).execute();
    await db.deleteFrom("whitelist").where("email", "=", mockUser.email).execute();
  });

  it("should fail to login", async () => {
    try {
      await userService.login(mockUser);
    } catch (e) {
      expect(e).toBeInstanceOf(AppError);
      expect((e as AppError).status).toBe(403);
    }
  });

  it("should try to signup without being whitelisted", async () => {
    const udaps = await staticDataService.getUDAPs();
    const udap = udaps[0];
    expect(udap).toBeDefined();

    try {
      await userService.createUser({ ...mockUser, udap_id: udap.id });
    } catch (e) {
      expect(e).toBeInstanceOf(AppError);
      expect((e as AppError).status).toBe(403);
    }
  });

  it("should succeed to signup", async () => {
    const udaps = await staticDataService.getUDAPs();
    const udap = udaps[0];
    expect(udap).toBeDefined();

    await userService.addToWhitelist(mockUser.email);

    const user = await userService.createUser({ ...mockUser, udap_id: udap.id });
    expect(user).toBeDefined();

    expect(user.token).toBeDefined();
    expect(user.expiresAt).toBeDefined();
    expect(user.refreshToken).toBeDefined();
  });

  it("should fail to signup with the same email", async () => {
    const udaps = await staticDataService.getUDAPs();
    const udap = udaps[0];
    expect(udap).toBeDefined();

    try {
      await userService.createUser({ ...mockUser, udap_id: udap.id });
    } catch (e) {
      expect(e).toBeInstanceOf(AppError);
      expect((e as AppError).status).toBe(400);
    }
  });

  it("should fail to login with wrong password", async () => {
    try {
      await userService.login({ email: mockUser.email, password: "wrong" });
    } catch (e) {
      expect(e).toBeInstanceOf(AppError);
      expect((e as AppError).status).toBe(403);
    }
  });

  it("should login", async () => {
    const user = await userService.login(mockUser);
    expect(user).toBeDefined();

    expect(user.token).toBeDefined();
    expect(user.expiresAt).toBeDefined();
    expect(user.refreshToken).toBeDefined();

    const userByToken = await userService.getUserByToken(user.token);
    expect(userByToken).toBeDefined();
  });

  it("should reset password", async () => {
    const user = await userService.login(mockUser);
    expect(user).toBeDefined();

    const temporaryLink = (await userService.generateResetLink(mockUser.email)) as string;
    await userService.resetPassword({ temporaryLink, newPassword: "newpassword" });

    try {
      await userService.login({ email: mockUser.email, password: mockUser.password });
    } catch (e) {
      expect(e).toBeInstanceOf(AppError);
      expect((e as AppError).status).toBe(403);
    }

    const newUser = await userService.login({ email: mockUser.email, password: "newpassword" });
    expect(newUser).toBeDefined();
  });
});
