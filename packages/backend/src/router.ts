import { createContext, procedure, router } from "./trpc";
import { insertUserSchema } from "./services/userService";
import fastify from "fastify";
import cors from "@fastify/cors";
import { FastifyTRPCPluginOptions, fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import { z } from "zod";

const appRouter = router({
  createUser: procedure.input(insertUserSchema.omit({ id: true })).mutation(({ input, ctx }) => {
    return ctx.services.user.createUser(input);
  }),
  login: procedure.input(insertUserSchema.pick({ email: true, password: true })).mutation(({ input, ctx }) => {
    return ctx.services.user.login(input);
  }),
  verifyToken: procedure.input(z.object({ token: z.string() })).query(({ input, ctx }) => {
    return ctx.services.user.verifyJWT(input.token);
  }),
  generateResetLink: procedure.input(z.object({ email: z.string() })).mutation(({ input, ctx }) => {
    return ctx.services.user.generateResetLink(input.email);
  }),
  resetPassword: procedure
    .input(z.object({ temporaryLink: z.string(), newPassword: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.services.user.resetPassword(input);
    }),
});

export type AppRouter = typeof appRouter;

export const fastifyInstance = fastify({ maxParamLength: 5000 });

fastifyInstance.register(cors, {
  origin: "*",
});

fastifyInstance.register(fastifyTRPCPlugin, {
  prefix: "/api",
  trpcOptions: {
    router: appRouter,
    createContext,
    onError({ path, error }) {
      console.error(`[${path}] ${error.message}`);
    },
  } satisfies FastifyTRPCPluginOptions<AppRouter>["trpcOptions"],
});
