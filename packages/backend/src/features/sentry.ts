const Sentry = require("@sentry/node");
import { ENV, isDev } from "../envVars";

export const sentry = isDev
  ? null
  : Sentry.init({
      dsn: ENV.SENTRY_DSN,
      tracesSampleRate: 1.0,
    });
