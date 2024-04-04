import { z } from "zod";
import { userTable } from "../db/schema";
import { db } from "../db/db";
import { and, eq, gt } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { pick } from "pastable";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { addDays } from "date-fns";

import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { ENV, isDev } from "../envVars";
import { AppError } from "../features/errors";

export const insertUserSchema = createInsertSchema(userTable);
export const selectUserSchema = createSelectSchema(userTable);

type InsertUser = z.infer<typeof insertUserSchema>;
type SelectUser = z.infer<typeof selectUserSchema>;

export class UserService {
  async createUser(payload: Omit<InsertUser, "id">) {
    await assertEmailDoesNotAlreadyExist(payload);

    const password = await encryptPassword(payload.password);

    const changes = await db
      .insert(userTable)
      .values({ ...payload, password, id: crypto.randomUUID() })
      .returning()
      .execute();

    const user = changes[0]!;

    return { user: serializeUser(user)!, token: this.generateJWT(user) };
  }

  async getUserById(id: string) {
    const users = await db.select().from(userTable).where(eq(userTable.id, id));
    const user = users[0];
    assertUserExists(user);

    return serializeUser(user!);
  }

  async updateUser(id: string, payload: Partial<InsertUser>) {
    const changes = pick(payload, ["name", "email", "password"]);
    const users = await db.update(userTable).set(changes).where(eq(userTable.id, id)).returning().execute();
    const user = users[0];

    return serializeUser(user!);
  }

  async login(payload: Pick<SelectUser, "email" | "password">) {
    const users = await db.select().from(userTable).where(eq(userTable.email, payload.email));
    const user = users[0];

    assertUserExists(user);
    await assertPasswordsMatch(payload.password, user!.password);

    return { user: serializeUser(user!), token: this.generateJWT(user!) };
  }

  async generateResetLink(email: string) {
    const users = await db.select().from(userTable).where(eq(userTable.email, email));
    const user = users[0];
    assertUserExists(user);

    const temporaryLink = crypto.randomUUID();
    const temporaryLinkExpiresAt = addDays(new Date(), 1).toISOString();

    await db
      .update(userTable)
      .set({ temporaryLink, temporaryLinkExpiresAt })
      .where(eq(userTable.email, email))
      .execute();

    return isDev ? temporaryLink : null;
  }

  async resetPassword({ temporaryLink, newPassword }: { temporaryLink: string; newPassword: string }) {
    const users = await db
      .select()
      .from(userTable)
      .where(
        and(eq(userTable.temporaryLink, temporaryLink), gt(userTable.temporaryLinkExpiresAt, new Date().toISOString())),
      );
    const user = users[0];

    assertLinkIsValid(user);
    const password = await encryptPassword(newPassword);

    await db
      .update(userTable)
      .set({ password, temporaryLink: null, temporaryLinkExpiresAt: null })
      .where(eq(userTable.temporaryLink, temporaryLink))
      .execute();

    return true;
  }

  verifyJWT(token: string) {
    const { id } = this.validateJWT(token);
    return this.getUserById(id);
  }

  generateJWT(user: SelectUser) {
    return jwt.sign(
      {
        sub: user.id,
      },
      ENV.JWT_SECRET,
      {
        expiresIn: ENV.TOKEN_LIFETIME,
      },
    );
  }

  validateJWT(token: string) {
    return jwt.verify(token, ENV.JWT_SECRET) as { id: string };
  }
}

const serializeUser = (user: SelectUser) => {
  return pick(user, ["id", "name", "email"]);
};

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

const assertLinkIsValid = (user?: SelectUser) => {
  if (!user) {
    throw new AppError({
      code: "UNAUTHORIZED",
      message: "Le lien est invalide",
    });
  }
};

const assertUserExists = (user?: SelectUser) => {
  if (!user) {
    throw new AppError({
      code: "UNAUTHORIZED",
      message: "Le courriel ou le mot de passe est incorrect",
    });
  }
};

const assertPasswordsMatch = async (password: string, hash: string) => {
  const match = await verifyPassword(password, hash);

  if (!match) {
    throw new AppError({
      code: "UNAUTHORIZED",
      message: "Le courriel ou le mot de passe est incorrect",
    });
  }
};

const assertEmailDoesNotAlreadyExist = async (user: Omit<InsertUser, "id">) => {
  const userExists = await db.select().from(userTable).where(eq(userTable.email, user.email));

  if (userExists.length) {
    throw new AppError({
      code: "CONFLICT",
      message: "Un utilisateur avec ce courriel existe déjà",
    });
  }
};
