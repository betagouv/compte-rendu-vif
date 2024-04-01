import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import { TRPCProvider } from "./TrpcProvider";
import { AuthProvider } from "./contexts/AuthContext";
import { safeParseLocalStorage } from "./utils";
import { App } from "./App";

startReactDsfr({ defaultColorScheme: "system" });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TRPCProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </TRPCProvider>
  </React.StrictMode>,
);
