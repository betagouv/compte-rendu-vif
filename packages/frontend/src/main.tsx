import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import React, { PropsWithChildren, useEffect, useMemo } from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { AuthProvider, useAuthContext } from "./contexts/AuthContext";
import "./index.css";
import { Link } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { registerSW } from "virtual:pwa-register";
import { initFonts } from "@cr-vif/pdf";
import { db, setupPowersync } from "./db/db";
import { PowerSyncContext } from "@powersync/react";
import { TestPowersync } from "./features/testPowersync";

if ("serviceWorker" in navigator) {
  registerSW({});
}

startReactDsfr({ defaultColorScheme: "system", Link: Link });
initFonts();

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      networkMode: "always",
    },
    queries: {
      networkMode: "always",
    },
  },
});

setupPowersync();

const WithPowersync = ({ children }: PropsWithChildren) => {
  return <PowerSyncContext.Provider value={db}>{children}</PowerSyncContext.Provider>;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<div>Une erreur s'est produite</div>}>
      <QueryClientProvider client={queryClient}>
        {/* <TestPowersync /> */}
        <AuthProvider>
          <WithPowersync>
            <App />
            <TestPowersync />
          </WithPowersync>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);

declare module "@codegouvfr/react-dsfr/spa" {
  interface RegisterLink {
    Link: typeof Link;
  }
}
