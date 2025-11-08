import { FastifyRequest } from "fastify";
import { AppError } from "../features/errors";
import jwt from "jsonwebtoken";

export const authenticate = async (request: FastifyRequest) => {
  const auth = request.headers.authorization;
  if (!auth) throw new AppError(403, "Unauthorized");

  const [_, token] = auth.split(" ");

  try {
    const user = await request.services.auth.getUserFromToken(token ?? "");
    request.user = user!;
    return user!;
  } catch (e) {
    throw new AppError(403, "Unauthorized");
  }
};

export type AuthUser = Awaited<ReturnType<typeof authenticate>>;
