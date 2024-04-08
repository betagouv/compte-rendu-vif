import { insertUserSchema } from "./services/userService";

// export const appRouter = router({
//   createUser: procedure.input(insertUserSchema.omit({ id: true })).mutation(({ input, ctx }) => {
//     return ctx.services.user.createUser(input);
//   }),
//   login: procedure.input(insertUserSchema.pick({ email: true, password: true })).mutation(({ input, ctx }) => {
//     return ctx.services.user.login(input);
//   }),
//   verifyToken: procedure.input(z.object({ token: z.string() })).query(({ input, ctx }) => {
//     return ctx.services.user.verifyJWT(input.token);
//   }),
//   generateResetLink: procedure.input(z.object({ email: z.string() })).mutation(({ input, ctx }) => {
//     return ctx.services.user.generateResetLink(input.email);
//   }),
//   resetPassword: procedure
//     .input(z.object({ temporaryLink: z.string(), newPassword: z.string() }))
//     .mutation(({ input, ctx }) => {
//       return ctx.services.user.resetPassword(input);
//     }),
// });
import { Elysia, t } from "elysia";
import { getServices } from "./services/services";

const createUserTSchema = { body: t.Pick(insertUserSchema, ["name", "email", "password"]) };
const loginTSchema = { body: t.Pick(insertUserSchema, ["email", "password"]) };
const verifyTokenTSchema = { query: t.Object({ token: t.String() }) };

export const elysia = new Elysia()
  .decorate("services", getServices())
  .post(
    "/create-user",
    ({ body: { name, email, password }, services }) => {
      return services.user.createUser({ name, email, password });
    },
    createUserTSchema,
  )
  .post(
    "/login",
    ({ body: { email, password }, services }) => {
      return services.user.login({ email, password });
    },
    loginTSchema,
  )
  .get(
    "/verify-token",
    ({ query: { token }, services }) => {
      return services.user.verifyJWT(token);
    },
    verifyTokenTSchema,
  );
export type AppRouter = typeof elysia;
