import { Document, PDFViewer, Page } from "@react-pdf/renderer";
import { Html } from "react-pdf-html";
import React from "react";
import type { Udap, Report, Chip } from "@cr-vif/electric-client/frontend";

export const ReportPDFDocument = ({ udap, htmlString }: { udap: Udap; report: Report; htmlString: string }) => {
  return (
    <Document>
      <Page size="A4">
        <Html
          style={{
            fontSize: "12px",
            paddingLeft: "15px",
            paddingRight: "15px",
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

          .content {
          }


        </style>
            <div class="header">
              <img src="/pdf_header.png" />
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

export type ReportWithUser = Report & { user?: { email: string; name: string } };

export const getReportHtmlString = (report: ReportWithUser, chipOptions: Chip[], udap: Udap) => {
  const spaceType = chipOptions.find((chip) => chip.key === "type-espace" && chip.value === report.projectSpaceType);
  const decision = chipOptions.find((chip) => chip.key === "decision" && chip.value === report.decision);
  const contacts = report.contacts ? getMultipleChips(chipOptions, "contacts-utiles", report.contacts) : [];
  const furtherInfos = report.furtherInformation
    ? getMultipleChips(chipOptions, "bonnes-pratiques", report.furtherInformation)
    : [];

  return minifyHtml(`
    <p>
      Objet : ${report.title}<br/>
      Votre interlocuteur : ${report.user?.name ?? report.createdByEmail.split("@")[0]}<br/>
      Demandeur : ${report.applicantName}<br/>
      Adresse du projet : ${report.applicantAddress}<br/>
      Ref cadastrale : ${report.projectCadastralRef}<br/>
    </p>
    
    <p>${spaceType?.text}</p>
  
    <p>${decision?.text}</p>
  
    <p>
      <strong>Précisions : </strong><br/>
      <span>${report.precisions}</span>
    </p>
  
    <p>
      <strong>Contacts utiles : </strong><br/>
      Vous pouvez contacter le service de la collectivité en charge de l’instruction de votre dossier : TODO (quelles informations afficher ?)<br/><br/>
      ${contacts.map((contact) => `<span>${contact}</span>`).join("<br/><br/>")}
      Nous contacter : ${udap.name}, ${udap.email}, ${udap.phone}
    </p>
  
    <p>
        <strong>Pour aller plus loin</strong><br/>
        ${furtherInfos.map((furtherInfo) => `<span>${furtherInfo}</span>`).join("<br/><br/>")}
    </p>
  
    <p>
      Ce compte rendu ne remplace pas la demande d’autorisation de travaux.
    </p>
    `);
};

const getMultipleChips = (chipOptions: Chip[], key: string, values: string) => {
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
