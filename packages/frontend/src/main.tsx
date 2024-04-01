import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { TRPCProvider } from "./TrpcProvider";
import { AuthProvider } from "./contexts/AuthContext";
import "./index.css";

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
