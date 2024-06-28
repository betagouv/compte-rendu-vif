import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.css";
import { Link } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { registerSW } from "virtual:pwa-register";

if ("serviceWorker" in navigator) {
  registerSW({});
}

startReactDsfr({ defaultColorScheme: "system", Link: Link });

const queryClient = new QueryClient({
  defaultOptions:{
    mutations: {
      networkMode: "always"
    },
    queries: {
      networkMode: "always"
    }
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<div>Une erreur s'est produite</div>}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <App />
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
