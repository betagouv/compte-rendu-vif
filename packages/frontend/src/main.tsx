import "#styled-system/styles.css";
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import "./db";
import "./index.css";
import { routeTree } from "./routeTree.gen";
import { TRPCProvider } from "./TrpcProvider";

startReactDsfr({ defaultColorScheme: "system" });

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TRPCProvider>
      <RouterProvider router={router} />
    </TRPCProvider>
  </React.StrictMode>
);
