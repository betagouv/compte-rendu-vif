import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa";
import { getOrCreateHandle } from "./automerge.ts";

console.log(getOrCreateHandle("test1", { count: 0 }));

startReactDsfr({ defaultColorScheme: "system" });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
