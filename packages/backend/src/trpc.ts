import { initTRPC } from "@trpc/server";
import { getServices } from "./services/services";
import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

export const createContext = (opts: CreateFastifyContextOptions) => {
  return {
    services: getServices(),
    req: opts.req,
    res: opts.res,
  };
};

const t = initTRPC.context<ReturnType<typeof createContext>>().create();

export const router = t.router;
export const procedure = t.procedure;
