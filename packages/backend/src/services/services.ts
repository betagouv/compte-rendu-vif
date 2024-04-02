import { RepoService } from "./repoService";
import { UserService } from "./userService";

const ref = {
  services: null as any as ReturnType<typeof makeServices>,
};

const makeServices = () => ({
  user: new UserService(),
  repo: new RepoService(),
});

export const getServices = () => {
  if (!ref.services) {
    ref.services = makeServices();
  }

  return ref.services;
};
