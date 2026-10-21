import { FastifyPluginAsyncTypebox, Type } from "@fastify/type-provider-typebox";
import { authenticate } from "./authMiddleware";
import { upTreeTSchema } from "../features/up/upTypes";

// Query-string parameter rather than a path parameter: the generated frontend client does not interpolate paths.
export const upPlugin: FastifyPluginAsyncTypebox = async (fastify, _) => {
  fastify.addHook("preHandler", authenticate);

  fastify.get("/monument", { schema: getMonumentUpTreeSchema }, async (request) => {
    const tree = await request.services.up.getMonumentTree(request.query.reference);
    return { tree };
  });
};

export const getMonumentUpTreeSchema = {
  querystring: Type.Object({ reference: Type.String() }),
  response: {
    200: Type.Object({
      /** null when the monument has no unités patrimoniales */
      tree: Type.Union([upTreeTSchema, Type.Null()]),
    }),
  },
};
