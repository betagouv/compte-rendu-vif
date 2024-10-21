import Sentry from "@sentry/node";
import { ENV, isDev } from "../envVars";

isDev
  ? null
  : ENV.SENTRY_DSN
    ? Sentry.init({
        dsn: ENV.SENTRY_DSN,
        tracesSampleRate: 1.0,
      })
    : null;

const sentry = isDev ? null : Sentry;

export { sentry };
