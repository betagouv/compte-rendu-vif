import { addDays, addHours } from "date-fns";
import jwt from "jsonwebtoken";
import crypto from "node:crypto";
import { db } from "../db/db";

import { Type } from "@sinclair/typebox";
import { ENV, isDev, isTest } from "../envVars";
import { makeDebug } from "../features/debug";
import { AppError } from "../features/errors";
import { sendPasswordResetMail } from "../features/mail";
import { InternalUser, User } from "../db-types";
import { Expression, Simplify, sql } from "kysely";
import { jsonArrayFrom, jsonObjectFrom } from "kysely/helpers/postgres";

const debug = makeDebug("user_service");
export class UserService {
  async createUser(payload: Pick<InternalUser, "email" | "password"> & Pick<User, "name" | "udap_id">) {
    await assertEmailDoesNotAlreadyExist(payload.email);
    await assertEmailInWhitelist(payload.email);

    const password = await encryptPassword(payload.password);

    const { name, udap_id, ...rest } = payload;

    const id = "user-" + crypto.randomUUID();
    await db.insertInto("user").values({ id, name, udap_id }).returningAll().execute();

    await db
      .insertInto("internal_user")
      .values({
        id,
        ...rest,
        role: "user",
        userId: id,
        password,
      })
      .execute();

    const { token, expiresAt } = this.generateJWT(id);

    const { user } = (await this.getUserById(id))!;
    return { user: user, token, expiresAt, refreshToken: this.generateRefreshToken(id) };
  }

  async getUserById(id: string) {
    const internalUserResults = await db
      .selectFrom("internal_user")
      .where("internal_user.id", "=", id)
      .select((eb) => [
        jsonObjectFrom(
          eb
            .selectFrom("user")
            .whereRef("internal_user.id", "=", "user.id")
            .selectAll()
            .select((eb) => [
              jsonObjectFrom(eb.selectFrom("udap").whereRef("user.udap_id", "=", "udap.id").selectAll()).as("udap"),
            ]),
        ).as("user"),
        // jsonObjectFrom(eb.selectFrom("udap").whereRef())
      ])
      .selectAll()
      .execute();
    // .innerJoin("user", "internal_user.userId", "user.id")
    // .innerJoin("udap", "user.udap_id", "udap.id")
    // .selectAll()
    // .execute();

    const user = internalUserResults[0];

    // const user = await db.internal_user.findFirst({ where: { id }, include: { user: { include: { udap: true } } } });
    assertUserExists(user);

    return user;
  }

  async login(payload: Pick<InternalUser, "email" | "password">) {
    const internalUserInsertResults = await db
      .selectFrom("internal_user")
      .where("email", "=", payload.email)
      .selectAll()
      .execute();
    const internalUser = internalUserInsertResults[0]!;

    assertUserExists(internalUser);
    await assertPasswordsMatch(payload.password, internalUser.password);

    const { token, expiresAt } = this.generateJWT(internalUser.id);

    const { user } = (await this.getUserById(internalUser.id))!;

    return { user, token, expiresAt, refreshToken: this.generateRefreshToken(internalUser.id) };
  }

  async addToWhitelist(email: string) {
    await db.insertInto("whitelist").values({ email }).execute();
    return { message: "Courriel ajouté à la liste blanche." };
  }

  async generateResetLink(email: string) {
    const userResults = await db.selectFrom("internal_user").where("email", "=", email).selectAll().execute();
    const user = userResults[0]!;
    assertUserExists(user, "Aucun utilisateur avec ce courriel n'a été trouvé.");

    const temporaryLink = crypto.randomUUID();
    const temporaryLinkExpiresAt = addDays(new Date(), 1).toISOString();

    const encryptedLink = md5(temporaryLink);

    await db
      .updateTable("internal_user")
      .set({ temporaryLink: encryptedLink, temporaryLinkExpiresAt })
      .where("id", "=", user.id)
      .execute();

    if (isTest) {
      return temporaryLink;
    }

    await sendPasswordResetMail({ email: user!.email, temporaryLink });

    return {
      message:
        "Votre demande de récupération de mot de passe a été transmise. Vous recevrez un couriel dans quelques instants.",
    };
  }

  async resetPassword({ temporaryLink, newPassword }: { temporaryLink: string; newPassword: string }) {
    const encryptedLink = md5(temporaryLink);

    const userResults = await db
      .selectFrom("internal_user")
      .where("temporaryLink", "=", encryptedLink)
      .selectAll()
      .execute();
    const user = userResults[0];

    await assertLinkIsValid(user, encryptedLink);
    const password = await encryptPassword(newPassword);

    await db
      .updateTable("internal_user")
      .set({ password, temporaryLink: null, temporaryLinkExpiresAt: null })
      .where("id", "=", user!.id)
      .execute();

    return { message: "Votre mot de passe a été modifié avec succès." };
  }

  getUserByToken(token: string) {
    const payload = this.validateToken(token);
    const { sub } = payload;
    if (!sub) throw new AppError(403, "Token invalide");
    return this.getUserById(sub as string);
  }

  generateJWT(userId: InternalUser["id"]) {
    const expiresAt = addHours(new Date(), 1).toISOString();

    const key = {
      alg: "HS256",
      k: ENV.JWT_SECRET,
      kid: "powersync",
      kty: "oct",
    };

    const token = jwt.sign({}, Buffer.from(key.k, "base64"), {
      algorithm: key.alg as any,
      keyid: key.kid,
      subject: userId,
      issuer: "test-client",
      audience: ["powersync"],
      expiresIn: "1h",
    });

    return { token, expiresAt };
  }

  async verifyTokenAndRefreshIfNeeded(token: string, refreshToken?: string) {
    debug("refreshing token", token?.slice(0, 6), refreshToken?.slice(0, 6));
    try {
      const { sub } = this.validateToken(token);
      const rToken = refreshToken ?? this.generateRefreshToken(sub as string);
      debug("token is valid");
      return { token, refreshToken: rToken };
    } catch (e: any) {
      debug("invalid token", e);
      if (refreshToken && e.name === "TokenExpiredError") {
        try {
          const { sub } = this.validateRefreshToken(refreshToken);
          const user = await this.getUserById(sub);

          const { token, expiresAt } = this.generateJWT(user!.id);
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

  generateRefreshToken(userId: InternalUser["id"]) {
    const token = jwt.sign(
      {
        sub: userId,
      },
      ENV.JWT_REFRESH_SECRET,
    );

    return token;
  }

  validateToken(token: string) {
    return jwt.verify(token, Buffer.from(key.k, "base64"), {
      algorithms: [key.alg as any],
    });
  }

  validateRefreshToken(token: string) {
    return jwt.verify(token, ENV.JWT_REFRESH_SECRET) as { sub: string };
  }
}

const key = {
  alg: "HS256",
  k: ENV.JWT_SECRET,
  kid: "powersync",
  kty: "oct",
};

const md5 = (data: string) => crypto.createHash("md5").update(data).digest("hex");

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

const assertLinkIsValid = async (user: InternalUser | undefined, encryptedLink: string) => {
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
  if (!user || !user.id) {
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
  const existingUserResults = await db.selectFrom("internal_user").where("email", "=", email).selectAll().execute();
  const existingUser = existingUserResults[0];

  if (existingUser) {
    throw new AppError(400, "Un utilisateur avec ce courriel existe déjà");
  }

  return null;
};

const assertEmailInWhitelist = async (email: string) => {
  if (isDev) return;

  const whitelistResults = await db.selectFrom("whitelist").where("email", "=", email).selectAll().execute();
  const whitelist = whitelistResults[0];

  if (!whitelist) {
    throw new AppError(403, "Votre courriel n'est pas autorisée à accéder à cette application");
  }
};
