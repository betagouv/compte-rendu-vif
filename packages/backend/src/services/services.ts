import { Prisma } from "@cr-vif/electric-client/backend";
import { StaticDataService } from "./staticDataService";
import { SerializedUser, UserService } from "./userService";

const ref = {
  services: null as any as ReturnType<typeof makeServices>,
};

const makeServices = () => ({
  user: new UserService(),
  staticData: new StaticDataService(),
});

export const getServices = () => {
  if (!ref.services) {
    ref.services = makeServices();
  }

  return ref.services;
};

declare module "fastify" {
  export interface FastifyRequest {
    services: ReturnType<typeof makeServices>;
    user: SerializedUser;
  }
}
