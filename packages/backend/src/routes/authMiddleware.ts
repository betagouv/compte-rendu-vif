import { FastifyRequest } from "fastify";
import { AppError } from "../features/errors";

export const authenticate = async (request: FastifyRequest) => {
  const auth = request.headers.authorization;
  if (!auth) throw new AppError(403, "Unauthorized");

  const [_, token] = auth.split(" ");
  const user = await request.services.user.verifyJWT(token ?? "");

  if (!user) throw new AppError(403, "Unauthorized");
  request.user = user;
};
