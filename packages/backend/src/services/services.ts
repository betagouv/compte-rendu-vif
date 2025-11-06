import { authenticate, AuthUser } from "../routes/authMiddleware";
import { AuthService } from "./authService";
import { StaticDataService } from "./staticDataService";
import { SyncService } from "./syncService";
import { UploadService } from "./uploadService";
import { UserService } from "./userService";

const ref = {
  services: null as any as ReturnType<typeof makeServices>,
};

const makeServices = () => ({
  user: new UserService(),
  staticData: new StaticDataService(),
  upload: new UploadService(),
  sync: new SyncService(),
  auth: new AuthService(),
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
    user: AuthUser;
  }
}
