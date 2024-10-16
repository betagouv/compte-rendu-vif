import Sentry from "@sentry/node";
import { ENV, isDev } from "../envVars";

isDev
  ? null
  : Sentry.init({
      dsn: ENV.SENTRY_DSN,
      tracesSampleRate: 1.0,
    });

const sentry = isDev ? null : Sentry;

export { sentry };
