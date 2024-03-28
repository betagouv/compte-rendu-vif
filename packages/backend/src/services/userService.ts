import { z } from "zod";
import { userTable } from "../db/schema";
import { db } from "../db/db";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { pick } from "pastable";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { ENV } from "../envVars";

export const insertUserSchema = createInsertSchema(userTable);
export const selectUserSchema = createSelectSchema(userTable);

type InsertUser = z.infer<typeof insertUserSchema>;
type SelectUser = z.infer<typeof selectUserSchema>;

export class UserService {
  async createUser(payload: Omit<InsertUser, "id">) {
    assertEmailDoesNotAlreadyExist(payload);

    const password = await encryptPassword(payload.password);

    const user = db
      .insert(userTable)
      .values({ ...payload, password, id: crypto.randomUUID() })
      .returning()
      .get();

    return { user: serializeUser(user)!, token: this.generateJWT(user) };
  }

  async getUserById(id: string) {
    const user = db.select().from(userTable).where(eq(userTable.id, id)).get();
    assertUserExists(user);

    return serializeUser(user!);
  }

  async updateUser(id: string, payload: Partial<InsertUser>) {
    const changes = pick(payload, ["name", "email", "password"]);
    const user = db.update(userTable).set(changes).where(eq(userTable.id, id)).returning().get();

    return serializeUser(user);
  }

  async login(payload: Pick<SelectUser, "email" | "password">) {
    const user = db.select().from(userTable).where(eq(userTable.email, payload.email)).get();

    assertUserExists(user);
    await assertPasswordsMatch(payload.password, user!.password);

    return { user: serializeUser(user!), token: this.generateJWT(user!) };
  }

  verifyJWT(token: string) {
    const { id } = this.validateJWT(token);
    return this.getUserById(id);
  }

  generateJWT(user: SelectUser) {
    return jwt.sign(
      {
        id: user.id,
        "x-triplit-user-id": user.id,
        "x-triplit-project-id": ENV.PROJECT_ID,
        "x-triplit-token-type": "external",
      },
      ENV.EXTERNAL_JWT_SECRET,
      {
        expiresIn: ENV.TOKEN_LIFETIME,
      },
    );
  }

  validateJWT(token: string) {
    return jwt.verify(token, ENV.EXTERNAL_JWT_SECRET) as { id: string };
  }
}

const serializeUser = (user: SelectUser) => {
  return pick(user, ["id", "name", "email"]);
};

/*
  "x-triplit-user-id": "ledouxm",
  "x-triplit-project-id": "crvif",
  "x-triplit-token-type": "external"
*/

const encryptPassword = (password: string) => {
  return new Promise<string>((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString("hex");

    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) return reject(err);
      resolve(`${salt}:${derivedKey.toString("hex")}`);
    });
  });
};

const verifyPassword = (password: string, hash: string) => {
  return new Promise<boolean>((resolve, reject) => {
    const [salt, key] = hash.split(":");

    crypto.scrypt(password, salt!, 64, (err, derivedKey) => {
      if (err) return reject(err);
      resolve(key === derivedKey.toString("hex"));
    });
  });
};

const assertUserExists = (user?: SelectUser) => {
  if (!user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Le courriel ou le mot de passe est incorrect",
    });
  }
};

const assertPasswordsMatch = async (password: string, hash: string) => {
  const match = await verifyPassword(password, hash);

  if (!match) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Le courriel ou le mot de passe est incorrect",
    });
  }
};

const assertEmailDoesNotAlreadyExist = (user: Omit<InsertUser, "id">) => {
  const userExists = db.select().from(userTable).where(eq(userTable.email, user.email)).get();

  if (userExists) {
    throw new TRPCError({
      code: "CONFLICT",
      message: "Un utilisateur avec ce courriel existe déjà",
    });
  }
};
