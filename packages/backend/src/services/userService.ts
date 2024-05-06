import { z } from "zod";
import { db } from "../db/db";
import { and, eq, gt } from "drizzle-orm";
import { pick } from "pastable";
import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { addDays } from "date-fns";

import { ENV, isDev } from "../envVars";
import { AppError } from "../features/errors";
import { Type, type Static } from "@sinclair/typebox";
import * as Schemas from "@cr-vif/electric-client/typebox";
import type { Prisma } from "@cr-vif/electric-client/backend";

export class UserService {
  async createUser(payload: Omit<Prisma.userUncheckedCreateInput, "id">) {
    await assertEmailDoesNotAlreadyExist(payload);
    await assertEmailInWhitelist(payload.email);

    const password = await encryptPassword(payload.password);

    const user = await db.user.create({
      data: {
        ...payload,
        password,
      },
      include: { udap: true },
    });

    return { user: serializeUser(user as any)!, token: this.generateJWT(user) };
  }

  async getUserByEmail(email: string) {
    const user = await db.user.findFirst({ where: { email }, include: { udap: true } });
    assertUserExists(user);

    return serializeUser(user as any);
  }

  async updateUser(email: string, payload: Partial<Prisma.userUncheckedCreateInput>) {
    const changes = pick(payload, ["name", "email", "password"]);

    const user = await db.user.update({ where: { email }, data: changes, include: { udap: true } });

    return serializeUser(user as any);
  }

  async login(payload: Pick<Prisma.userUncheckedCreateInput, "email" | "password">) {
    const user = await db.user.findFirst({ where: { email: payload.email }, include: { udap: true } });
    assertUserExists(user);
    await assertPasswordsMatch(payload.password, user!.password);

    return { user: serializeUser(user as any), token: this.generateJWT(user!) };
  }

  async generateResetLink(email: string) {
    const user = await db.user.findFirst({ where: { email } });
    assertUserExists(user);

    const temporaryLink = crypto.randomUUID();
    const temporaryLinkExpiresAt = addDays(new Date(), 1).toISOString();

    await db.user.update({ where: { email }, data: { temporaryLink, temporaryLinkExpiresAt } });
  }

  async resetPassword({ temporaryLink, newPassword }: { temporaryLink: string; newPassword: string }) {
    const user = await db.user.findFirst({
      where: { temporaryLink, temporaryLinkExpiresAt: { gt: new Date().toISOString() } },
    });

    assertLinkIsValid(user);
    const password = await encryptPassword(newPassword);

    await db.user.update({
      where: { email: user!.email },
      data: { password, temporaryLink: null, temporaryLinkExpiresAt: null },
    });

    return true;
  }

  verifyJWT(token: string) {
    const { email } = this.validateJWT(token);
    return this.getUserByEmail(email);
  }

  generateJWT(user: Prisma.userUncheckedCreateInput) {
    return jwt.sign(
      {
        sub: user.email,
      },
      ENV.JWT_SECRET,
      {
        expiresIn: ENV.TOKEN_LIFETIME,
      },
    );
  }

  validateJWT(token: string) {
    return jwt.verify(token, ENV.JWT_SECRET) as { email: string };
  }
}

const serializeUser = (user: Prisma.userCreateInput) => {
  const data = pick(user, ["name", "email", "udap"]);
  return {
    name: data.name,
    email: data.email,
    udap: data.udap!,
  } as Static<typeof Schemas.userInput>;
};

export const serializedUserTSchema = Type.Pick(Schemas.user, ["name", "email", "udap"]);
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

const assertLinkIsValid = (user?: Prisma.userUncheckedCreateInput | null) => {
  if (!user) {
    throw new AppError(403, "Le lien est invalide");
  }
};

const assertUserExists = (user?: Prisma.userUncheckedCreateInput | null) => {
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

const assertEmailDoesNotAlreadyExist = async (user: Omit<Prisma.userUncheckedCreateInput, "id">) => {
  const existingUser = await db.user.findFirst({
    where: {
      email: user.email,
    },
  });

  if (existingUser) {
    throw new AppError(400, "Un utilisateur avec ce courriel existe déjà");
  }

  return existingUser;
};

const assertEmailInWhitelist = async (email: string) => {
  if (isDev) return;
  const whitelist = await db.whitelist.findFirst({ where: { email } });

  if (!whitelist) {
    throw new AppError(403, "Votre courriel n'est pas autorisée à accéder à cette application");
  }
};
