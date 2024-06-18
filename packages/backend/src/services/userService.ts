import { addDays } from "date-fns";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import { db } from "../db/db";

import type { Prisma } from "@cr-vif/electric-client/backend";
import * as Schemas from "@cr-vif/electric-client/typebox";
import { Type } from "@sinclair/typebox";
import { ENV, isDev } from "../envVars";
import { makeDebug } from "../features/debug";
import { AppError } from "../features/errors";
import { sendPasswordResetMail } from "../features/mail";

const debug = makeDebug("user_service");
export class UserService {
  async createUser(
    payload: Pick<Prisma.internal_userUncheckedCreateInput, "email" | "password"> &
      Pick<Prisma.userUncheckedCreateInput, "name" | "udap_id">,
  ) {
    await assertEmailDoesNotAlreadyExist(payload.email);
    await assertEmailInWhitelist(payload.email);

    const password = await encryptPassword(payload.password);

    const { name, udap_id, ...rest } = payload;

    const id = "user-" + crypto.randomUUID();
    const internalUser = await db.internal_user.create({
      data: {
        id,
        ...rest,
        role: "user",
        user: {
          create: {
            id,
            name,
            udap_id,
          },
        },
        password,
      },
      include: {
        user: {
          include: {
            udap: true,
          },
        },
      },
    });

    const user = internalUser.user;

    const { token, expiresAt } = this.generateJWT(internalUser);

    return { user: user, token, expiresAt, refreshToken: this.generateRefreshToken(internalUser) };
  }

  async getUserByEmail(email: string) {
    const user = await db.internal_user.findFirst({
      where: { email },
      include: { user: { include: { udap: true } } },
    });
    assertUserExists(user);
    return user!;
  }

  async getUserById(id: string) {
    const user = await db.internal_user.findFirst({ where: { id }, include: { user: { include: { udap: true } } } });
    assertUserExists(user);

    return user;
  }

  async login(payload: Pick<Prisma.internal_userCreateInput, "email" | "password">) {
    const user = await db.internal_user.findFirst({
      where: { email: payload.email },
      include: {
        user: {
          include: {
            udap: true,
          },
        },
      },
    });
    assertUserExists(user);
    await assertPasswordsMatch(payload.password, user!.password);

    const { token, expiresAt } = this.generateJWT(user!);

    return { user: user?.user, token, expiresAt, refreshToken: this.generateRefreshToken(user!) };
  }

  async generateResetLink(email: string) {
    const user = await db.internal_user.findFirst({ where: { email } });
    assertUserExists(user, "Aucun utilisateur avec ce courriel n'a été trouvé.");

    const temporaryLink = crypto.randomUUID();
    const temporaryLinkExpiresAt = addDays(new Date(), 1).toISOString();

    const encryptedLink = md5(temporaryLink);

    await db.internal_user.update({
      where: { id: user!.id },
      data: { temporaryLink: encryptedLink, temporaryLinkExpiresAt },
    });

    await sendPasswordResetMail({ email: user!.email, temporaryLink });

    return {
      message:
        "Votre demande de récupération de mot de passe a été transmise. Vous recevrez un couriel dans quelques instants.",
    };
  }

  async resetPassword({ temporaryLink, newPassword }: { temporaryLink: string; newPassword: string }) {
    const encryptedLink = md5(temporaryLink);

    const user = await db.internal_user.findFirst({
      where: { temporaryLink: encryptedLink },
    });

    await assertLinkIsValid(user, encryptedLink);
    const password = await encryptPassword(newPassword);

    await db.internal_user.update({
      where: { id: user!.id },
      data: { password, temporaryLink: null, temporaryLinkExpiresAt: null },
    });

    return { message: "Votre mot de passe a été modifié avec succès." };
  }

  getUserByToken(token: string) {
    const payload = this.validateToken(token);
    const { sub } = payload;
    if (!sub) throw new AppError(403, "Token invalide");
    return this.getUserById(sub);
  }

  generateJWT(user: Prisma.internal_userUncheckedCreateInput) {
    const expiresAt = addDays(new Date(), 7).toISOString();

    const token = jwt.sign(
      {
        sub: user.id,
      },
      ENV.JWT_SECRET,
      {
        expiresIn: ENV.TOKEN_LIFETIME,
      },
    );

    return { token, expiresAt };
  }

  async verifyTokenAndRefreshIfNeeded(token: string, refreshToken?: string) {
    debug("refreshing token", token?.slice(0, 6), refreshToken?.slice(0, 6));
    try {
      const { sub } = this.validateToken(token);
      const rToken = refreshToken ?? this.generateRefreshToken((await this.getUserById(sub))!);
      debug("token is valid");
      return { token, refreshToken: rToken };
    } catch (e: any) {
      debug("invalid token", e);
      if (refreshToken && e.name === "TokenExpiredError") {
        try {
          const { sub } = this.validateRefreshToken(refreshToken);
          const user = await this.getUserById(sub);

          const { token, expiresAt } = this.generateJWT(user!);
          return { token, expiresAt, refreshToken, user: user!.user };
        } catch (e) {
          debug("invalid refresh token", e);
          return { token: null, refreshToken: null, user: null };
        }
      } else {
        return { token: null, refreshToken: null, user: null };
      }
    }
  }

  generateRefreshToken(user: Prisma.internal_userUncheckedCreateInput) {
    const token = jwt.sign(
      {
        sub: user.id,
      },
      ENV.JWT_REFRESH_SECRET,
    );
    return token;
  }

  validateToken(token: string) {
    return jwt.verify(token, ENV.JWT_SECRET) as { sub: string };
  }

  validateRefreshToken(token: string) {
    return jwt.verify(token, ENV.JWT_REFRESH_SECRET) as { sub: string };
  }
}

const md5 = (data: string) => crypto.createHash("md5").update(data).digest("hex");

export const userAndTokenTSchema = Type.Object({
  user: Type.Optional(Type.Pick(Schemas.user, ["id", "name", "udap_id", "udap"])),
  token: Type.String(),
  expiresAt: Type.String(),
  refreshToken: Type.String(),
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

const assertLinkIsValid = async (
  user: Prisma.internal_userUncheckedCreateInput | null | undefined,
  encryptedLink: string,
) => {
  if (!user) {
    throw new AppError(403, "Le lien est invalide");
  }

  if (!user.temporaryLink || !user.temporaryLinkExpiresAt) {
    throw new AppError(403, "Le lien est invalide");
  }

  const expiresAt = new Date(user.temporaryLinkExpiresAt);
  if (expiresAt < new Date()) {
    throw new AppError(403, "Le lien est expiré");
  }

  if (user.temporaryLink !== encryptedLink) {
    throw new AppError(403, "Le lien est invalide");
  }
};

const assertUserExists = (user: any, errorDescription?: string) => {
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

const assertEmailDoesNotAlreadyExist = async (email: string) => {
  const existingUser = await db.internal_user.findFirst({
    where: {
      email,
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
