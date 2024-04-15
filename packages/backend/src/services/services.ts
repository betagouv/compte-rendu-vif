import { UploadService } from "./uploadService";
import { UserService } from "./userService";

const ref = {
  services: null as any as ReturnType<typeof makeServices>,
};

const makeServices = () => ({
  user: new UserService(),
  upload: new UploadService(),
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
  }
}
