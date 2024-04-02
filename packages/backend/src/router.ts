import { z } from "zod";
import { insertUserSchema } from "./services/userService";
import { procedure, router } from "./trpc";

export const appRouter = router({
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
  getOrCreateRepo: procedure.input(z.object({ repoId: z.string() })).query(({ input, ctx }) => {
    return ctx.services.repo.getOrCreateRepo(input.repoId);
  }),
});

export type AppRouter = typeof appRouter;
