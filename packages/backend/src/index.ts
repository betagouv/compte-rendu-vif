import "./envVars";
import { onHmr, registerViteHmrServerRestart } from "./hmr";

import { db, migrateUsersDb } from "./db/db";
import { fastifyTRPCPlugin, FastifyTRPCPluginOptions } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { appRouter, AppRouter } from "./router";
import { createContext } from "./trpc";
import cors from "@fastify/cors";
import { ENV } from "./envVars";
import { AppError } from "./features/errors";

const start = async () => {
  await registerViteHmrServerRestart();
  console.log("Starting...");

  await migrateUsersDb();

  const fastifyInstance = fastify({ maxParamLength: 5000 });

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
        if (!(error instanceof AppError)) {
          error.message = "Une erreur s'est produite. Veuillez réessayer plus tard.";
          console.error(error.stack);
        }
      },
    } satisfies FastifyTRPCPluginOptions<AppRouter>["trpcOptions"],
  });

  await fastifyInstance.listen({ port: ENV.HTTP_PORT });

  onHmr(async () => {
    // server.close();
    await fastifyInstance.close();
  });
};

start();
process.on("SIGINT", function () {
  process.exit();
});
