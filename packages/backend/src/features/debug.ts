import debug from "debug";
import { ENV } from "../envVars";

debug.enable(ENV.DEBUG);

export const makeDebug = (namespace: string) => {
  return debug("cr-vif").extend(namespace);
};
