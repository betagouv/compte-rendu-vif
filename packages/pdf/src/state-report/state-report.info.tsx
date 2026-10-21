import { format } from "date-fns";
import {
  formatUpNiveau,
  formatUpProtection,
  uppercaseFirstLetter,
  type StateReportWithUserAndAttachments,
} from "../utils";
import React from "react";
import { Multiline } from "./state-report.details";

export const MainTitle = ({ stateReport }: { stateReport: StateReportWithUserAndAttachments }) => {
  return (
    <h1 style={{ marginTop: 0, lineHeight: "30pt", marginBottom: "0" }}>
      <span style={{ fontSize: "20pt", fontWeight: "normal" }}>Constat d'état du monument historique</span>
      <br />
      {stateReport.titre_edifice ? (
        <>
          <span style={{ fontSize: "20pt" }}>
            <b>{stateReport.titre_edifice}</b>
          </span>
          {stateReport.up_intitule ? (
            <span style={{ fontSize: "16pt" }}>
              <br />
              <b>{stateReport.up_intitule}</b>
            </span>
          ) : null}
          <div style={{ fontSize: "10pt", fontWeight: "normal", marginTop: "8px" }}>
            Référence POP : {stateReport.reference_pop || "Non renseignée"}
            {stateReport.up_monument_identifiant
              ? ` — Identifiant agrégé : ${stateReport.up_monument_identifiant}`
              : ""}
          </div>
          <UpSummary stateReport={stateReport} />
        </>
      ) : null}
    </h1>
  );
};

/** Unité patrimoniale of a "MH complexe" constat (nothing for a constat on the whole monument). */
const UpSummary = ({ stateReport }: { stateReport: StateReportWithUserAndAttachments }) => {
  if (!stateReport.up_id) return null;
  let parents: string[] = [];
  try {
    parents = JSON.parse(stateReport.up_chemin || "[]").map((c: { intitule: string }) => c.intitule);
  } catch {}

  const details = [
    stateReport.up_identifiant ? `Identifiant agrégé : ${stateReport.up_identifiant}` : null,
    formatUpNiveau(stateReport.up_niveau),
    formatUpProtection(stateReport.up_protection),
  ].filter(Boolean);

  return (
    <div style={{ fontSize: "10pt", fontWeight: "normal", marginTop: "4px" }}>
      Unité patrimoniale : {[...parents, stateReport.up_intitule].filter(Boolean).join(" › ")}
      {details.length ? ` (${details.join(", ")})` : ""}
    </div>
  );
};

export const StateReportInfos = ({ stateReport }: { stateReport: StateReportWithUserAndAttachments }) => {
  const authorName = stateReport.redacted_by || stateReport.createdByName || "";
  // the creator's job only applies if they are the one credited as author
  const authorJob = authorName === stateReport.createdByName ? stateReport.createdByJob : null;

  const isPartielle = stateReport.nature_visite?.toLocaleLowerCase().includes("partielle");

  const personnesPresentes = stateReport.personnes_presentes
    ?.split("\n")
    .map((p) => p.trim())
    .filter(Boolean)
    .join(", ");

  const address = [
    stateReport.adresse,
    stateReport.commune,
    stateReport.code_postal ? `(${stateReport.code_postal})` : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div>
        Constat dressé par{" "}
        <b>
          {authorName}
          {authorJob ? ` (${authorJob})` : ""}
        </b>{" "}
        suite à la visite {isPartielle ? "partielle " : ""}
        {stateReport.date_visite ? `du ${format(new Date(stateReport.date_visite!), "dd/MM/yyyy")}` : ""}
        {personnesPresentes ? `, en présence de ${personnesPresentes}` : ""}.
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <b>Parties visitées</b> :{" "}
          {isPartielle ? stateReport.visite_partielle_details || "" : "Visite complète de l'édifice"}
        </div>
        {stateReport.visite_details ? (
          <div>
            <b>Détails de la visite</b> : <Multiline text={stateReport.visite_details} />
          </div>
        ) : null}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <b>Adresse</b> : {address || "Non renseignée"}
        </div>
        <div>
          <b>Référence cadastrale</b> : {stateReport.reference_cadastrale || "Non renseignée"}
        </div>
        <div>
          <b>Propriétaire</b> :{" "}
          {stateReport.proprietaire
            ? `${stateReport.proprietaire} ${stateReport.proprietaire_email ? `(${stateReport.proprietaire_email})` : ""}`
            : "Non renseigné"}
        </div>
        {stateReport.proprietaire_representant ? (
          <div>
            <b>Représentant</b> :{" "}
            {stateReport.proprietaire_representant
              ? `${stateReport.proprietaire_representant} ${stateReport.proprietaire_representant_email ? `(${stateReport.proprietaire_representant_email})` : ""}`
              : "Non renseigné"}
            `
          </div>
        ) : null}
      </div>
    </section>
  );
};

export const StateReportProtection = ({ stateReport }: { stateReport: StateReportWithUserAndAttachments }) => {
  return (
    <div>
      <h2>Protection de l'édifice</h2>
      <div style={{ marginBottom: "16px" }}>
        {uppercaseFirstLetter(stateReport.nature_protection || "Non renseignée")}
      </div>
      <div>Parties protégées : {stateReport.parties_protegees || "Non renseignées"}</div>
    </div>
  );
};
