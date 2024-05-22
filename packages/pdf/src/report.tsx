import { Document, PDFViewer, Page } from "@react-pdf/renderer";
import { Html } from "react-pdf-html";
import React from "react";
import type { Udap, Report, Clause } from "@cr-vif/electric-client/frontend";
import serviceInstructeurs from "./serviceInstructeur.json";

export const ReportPDFDocument = ({ udap, htmlString, images }: { udap: Udap; htmlString: string; images: Images }) => {
  return (
    <Document>
      <Page size="A4">
        <Html
          style={{
            fontSize: "12px",
            paddingLeft: "15px",
            paddingRight: "15px",
            whiteSpace: "pre-line",
          }}
        >{`
        <html>
          <body>
          <style>
          * {
            font-family: Helvetica;
          }

          strong {
            font-family: Helvetica-Bold;
          }

          em {
            font-family: Helvetica-Oblique;
          }

          strong > em {
            font-family: Helvetica-BoldOblique;
          }

          img {
            width: 150px;
          }

          .header {
            display: flex;
            flex-direction: row;
            width: 100%;
            justify-content: space-between;
            text-align: right;
            align-items: center;
            font-size: 18px;
          }

          .meeting-date {
            text-align: right;
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
          }


        </style>
            <div class="header">
              <img src="${images.header}" />
              <div><strong>${udap.name?.replace("UDAP", "Union départementale de<br/>l'architecture et du<br/>patrimoine")}</strong></div>
            </div>
            <div class="content">
              ${htmlString}
            </div>
          </body>
        </html>
      `}</Html>
      </Page>
    </Document>
  );
};

type Images = {
  header: string;
};

export type ReportWithUser = Report & { user?: { email: string; name: string } };

export const getReportHtmlString = (report: ReportWithUser, chipOptions: Clause[], udap: Udap) => {
  const spaceType = chipOptions.find((chip) => chip.key === "type-espace" && chip.value === report.projectSpaceType);
  const decision = chipOptions.find((chip) => chip.key === "decision" && chip.value === report.decision);
  const contacts = report.contacts ? getMultipleChips(chipOptions, "contacts-utiles", report.contacts) : [];
  const furtherInfos = report.furtherInformation
    ? getMultipleChips(chipOptions, "bonnes-pratiques", report.furtherInformation)
    : [];

  const serviceInstructeur = report.serviceInstructeur
    ? serviceInstructeurs.find((service) => service.tiers === report.serviceInstructeur)
    : null;
  const meetDate = report.meetDate ? new Date(report.meetDate) : null;

  return minifyHtml(`
    
    <p>
    ${
      meetDate
        ? `<span style='text-align: right;'>
      Suite au rendez-vous du ${meetDate?.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </span><br/><br/>`
        : ""
    }
      <strong>Votre interlocuteur : ${report.user?.name ?? ""}</strong><br/>
      Demandeur : ${report.applicantName ?? ""}<br/>
      Adresse du projet : ${report.applicantAddress ?? ""}<br/>
      Ref cadastrale : ${report.projectCadastralRef ?? ""}<br/>
    </p>

    <p>
      <strong>Objet de la demande : ${report.title ?? ""}</strong>
    </p>
    
    ${spaceType ? `<p>${spaceType?.text}</p>` : ""}
  
    ${decision ? `<p><strong>${decision?.text}</strong></p>` : ""}
  
    ${
      report.precisions
        ? `<p>
      <strong>Précisions : </strong><br/>
      <span>${report.precisions}</span>
    </p>`
        : ""
    }

    <p>
      <strong>Le projet pour rappel : </strong><br/>
      ${report.projectDescription ?? ""}
    </p>
  
    <p>
      <strong>Contacts utiles : </strong><br/>
      ${
        serviceInstructeur
          ? `<span>
        Vous pouvez contacter le service de la collectivité en charge de l’instruction de votre dossier : <br/>
        ${serviceInstructeur["libellé tiers"]}, ${serviceInstructeur["liste de diffusion"]}.
        </span>
      <br/><br/>`
          : ""
      }
      ${contacts.map((contact) => `<span>${contact}</span>`).join("<br/><br/>")}

      <br/><br/>
      <span>
        Nous contacter :<br/>${udap.name}, ${udap.email}, ${udap.phone ? formatPhoneNumber(udap.phone?.toString()) : ""}
      </span>
    </p>
  
    <p>
        <strong>Pour aller plus loin</strong><br/>
        ${furtherInfos.map((furtherInfo) => `<span>${furtherInfo}</span>`).join("<br/><br/>")}
    </p>
  
    <p>
      <strong>Ce compte rendu ne remplace pas la demande d’autorisation de travaux.</strong>
    </p>
    `);
};

const formatPhoneNumber = (phoneNumber: string) => {
  return `0${phoneNumber.slice(0, 1)} ${phoneNumber.slice(1, 3)} ${phoneNumber.slice(3, 5)} ${phoneNumber.slice(
    5,
    7,
  )} ${phoneNumber.slice(7, 9)}`;
};

const getMultipleChips = (chipOptions: Clause[], key: string, values: string) => {
  return values
    .split(",")
    .map((value) => {
      const chip = chipOptions.find((chip) => chip.key === key && chip.value === value);
      return chip?.text;
    })
    .filter(Boolean);
};

function minifyHtml(htmlString: string) {
  return htmlString.split("\n").join("").split("  ").join("");
}
