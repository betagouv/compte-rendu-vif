import { FastifyPluginAsyncTypebox } from "@fastify/type-provider-typebox";
import multipart from "@fastify/multipart";
import { z } from "zod";

export const uploadPlugin: FastifyPluginAsyncTypebox = async (fastify, _) => {
  fastify.register(multipart);

  fastify.post("/upload-image", async (request) => {
    const file = await request.file();

    console.log(file);
    return "ok";
  });
};

const uploadSchema = {
  body: z.object({ reportId: z.string() }),
  response: { 200: z.string() },
};
