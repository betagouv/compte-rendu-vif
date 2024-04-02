import "./envVars";
import { onHmr, registerViteHmrServerRestart } from "./hmr";

// import { createServer } from "@triplit/server";
import { db } from "./db/db";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
// import { schema } from "../../frontend/triplit/schema";
import { fastifyTRPCPlugin, FastifyTRPCPluginOptions } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import { appRouter, AppRouter } from "./router";
import { createContext } from "./trpc";
import cors from "@fastify/cors";
import { ENV } from "./envVars";

// const server = createServer({
//   storage: "sqlite",
//   verboseLogs: true,
//   dbOptions: {
//     schema: { collections: schema, version: 0 },
//   },
// })(ENV.TRIPLIT_PORT);

const start = async () => {
  await registerViteHmrServerRestart();
  console.log("Starting...");

  migrate(db, { migrationsFolder: "./drizzle" });

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
  // server.close(() => {
  //   console.log("Shut down server");
  //   // some cleanup code
  //   process.exit();
  // });
});
