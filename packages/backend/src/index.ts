import "./envVars";
import { onHmr, registerViteHmrServerRestart } from "./hmr";
import { Schema as S, and, or } from "@triplit/db";

import { createServer } from "@triplit/server";
import { db } from "./db/db";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { schema } from "../triplit/schema";
import { fastifyTRPCPlugin, FastifyTRPCPluginOptions } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { appRouter, AppRouter } from "./router";
import { createContext } from "./trpc";

const server = createServer({
  storage: "sqlite",
  verboseLogs: true,
  dbOptions: {
    schema: { collections: schema, version: 0 },
  },
})(3000);

const start = async () => {
  await registerViteHmrServerRestart();
  console.log("Starting...");

  migrate(db, { migrationsFolder: "./drizzle" });

  // const fastifyInstance = fastify({ maxParamLength: 5000 });

  // fastifyInstance.register(cors, {
  //   origin: "*",
  // });

  // fastifyInstance.register(fastifyTRPCPlugin, {
  //   prefix: "/api",
  //   trpcOptions: {
  //     router: appRouter,
  //     createContext,
  //     onError({ path, error }) {
  //       console.error(`[${path}] ${error.message}`);
  //     },
  //   } satisfies FastifyTRPCPluginOptions<AppRouter>["trpcOptions"],
  // });

  const b = appRouter.listen({ port: 3001 });

  onHmr(() => {
    server.close();
  });
};

start();
process.on("SIGINT", function () {
  server.close(() => {
    console.log("Shut down server");
    // some cleanup code
    process.exit();
  });
});
