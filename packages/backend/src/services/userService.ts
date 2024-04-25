import { z } from "zod";
import { db } from "../db/db";
import { and, eq, gt } from "drizzle-orm";
import { pick } from "pastable";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { addDays } from "date-fns";

import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { ENV, isDev } from "../envVars";
import { AppError } from "../features/errors";
import { Type, type Static } from "@sinclair/typebox";
import { users, usersInputType } from "@cr-vif/electric-client/typebox";
import type { Prisma } from "@cr-vif/electric-client/backend";

export class UserService {
  async createUser(payload: Omit<Prisma.usersCreateInput, "id">) {
    await assertEmailDoesNotAlreadyExist(payload);

    const password = await encryptPassword(payload.password);

    const user = await db.users.create({
      data: {
        ...payload,
        password,
        id: crypto.randomUUID(),
      },
    });

    return { user: serializeUser(user)!, token: this.generateJWT(user) };
  }

  async getUserById(id: string) {
    const user = await db.users.findFirst({ where: { id } });
    assertUserExists(user);

    return serializeUser(user!);
  }

  async updateUser(id: string, payload: Partial<Prisma.usersCreateInput>) {
    const changes = pick(payload, ["name", "email", "password"]);

    const user = await db.users.update({ where: { id }, data: changes });

    return serializeUser(user!);
  }

  async login(payload: Pick<Prisma.usersCreateInput, "email" | "password">) {
    const user = await db.users.findFirst({ where: { email: payload.email } });

    assertUserExists(user);
    await assertPasswordsMatch(payload.password, user!.password);

    return { user: serializeUser(user!), token: this.generateJWT(user!) };
  }

  async generateResetLink(email: string) {
    const user = await db.users.findFirst({ where: { email } });
    assertUserExists(user);

    const temporaryLink = crypto.randomUUID();
    const temporaryLinkExpiresAt = addDays(new Date(), 1).toISOString();

    await db.users.update({ where: { email }, data: { temporaryLink, temporaryLinkExpiresAt } });
  }

  async resetPassword({ temporaryLink, newPassword }: { temporaryLink: string; newPassword: string }) {
    const user = await db.users.findFirst({
      where: { temporaryLink, temporaryLinkExpiresAt: { gt: new Date().toISOString() } },
    });

    assertLinkIsValid(user);
    const password = await encryptPassword(newPassword);

    await db.users.update({
      where: { id: user!.id },
      data: { password, temporaryLink: null, temporaryLinkExpiresAt: null },
    });

    return true;
  }

  verifyJWT(token: string) {
    const { id } = this.validateJWT(token);
    return this.getUserById(id);
  }

  generateJWT(user: Prisma.usersCreateInput) {
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

const serializeUser = (user: Prisma.usersCreateInput) => {
  return pick(user, ["id", "name", "email"]);
};

export const serializedUserTSchema = Type.Pick(users, ["id", "name", "email"]);
export const userAndTokenTSchema = Type.Object({
  user: serializedUserTSchema,
  token: Type.String(),
});

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

const assertLinkIsValid = (user?: Prisma.usersCreateInput | null) => {
  if (!user) {
    throw new AppError(403, "Le lien est invalide");
  }
};

const assertUserExists = (user?: Prisma.usersCreateInput | null) => {
  if (!user) {
    throw new AppError(403, "Le courriel ou le mot de passe est incorrect");
  }
};

const assertPasswordsMatch = async (password: string, hash: string) => {
  const match = await verifyPassword(password, hash);

  if (!match) {
    throw new AppError(403, "Le courriel ou le mot de passe est incorrect");
  }
};

const assertEmailDoesNotAlreadyExist = async (user: Omit<Prisma.usersCreateInput, "id">) => {
  const existingUser = await db.users.findFirst({
    where: {
      email: user.email,
    },
  });

  if (existingUser) {
    throw new AppError(400, "Un utilisateur avec ce courriel existe déjà");
  }

  return existingUser;
};
