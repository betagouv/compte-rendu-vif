import { Document, PDFViewer, Page } from "@react-pdf/renderer";
import { Html } from "react-pdf-html";
import React from "react";
import type { Udap, Report, Clause, Service_instructeurs } from "@cr-vif/electric-client/frontend";

export const ReportPDFDocument = ({ udap, htmlString, images }: ReportPDFDocumentProps) => {
  return (
    <Document>
      <Page size="A4">
        <Html
          style={{
            fontSize: "12px",
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "20px",
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

          .marianne-img {
            width: 35px;
          }
            
          .marianne-footer-img {
            width: 50px;
          }

          .header {
            display: flex;
            flex-direction: row;
            width: 100%;
            align-items: flex-start;
            justify-content: space-between;
            text-align: right;
            font-size: 18px;
            margin-bottom: 32px;

          }


          .marianne-text {
            text-align: left;
            font-weight: bold;
            font-size: 12px;
            margin-top: 4px;
            margin-bottom: 4px;
            text-transform: uppercase;
          }

          .right-texts {
            display: flex;
            align-items: flex-end;
            flex-direction: column;
            justify-content: flex-end;
            gap: 20px;
          }

          .right-texts > div {
            text-align: right;
            font-size: 16px;
            font-family: Helvetica-Bold;
          }

          .meeting-date {
            text-align: right;
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
          }


        </style>
            <div class="header">
              <div class="marianne">

                <img class="marianne-img" src="${images.marianne}" />
                <div class="marianne-text">
                  <strong>
                ${udap.marianne_text
                  ?.split("\n")
                  .map((s) => s.trim())
                  .join("<br/>")}
                  </strong>
                </div>
                <img class="marianne-footer-img"  src="${images.marianneFooter}" />

              </div>

              <div class="right-texts">
                <div>
                      ${udap.drac_text
                        ?.split("\n")
                        .map((s) => s.trim())
                        .join("<br/>")}
                </div>
                <div>
                    ${udap.udap_text
                      ?.split("\n")
                      .map((s) => s.trim())
                      .join("<br/>")}
                </div>
              </div>
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

export type ReportPDFDocumentProps = {
  htmlString: string;
  udap: Udap;
  images: Images;
};

type Images = {
  marianne: string;
  marianneFooter: string;
};

export type ReportWithUser = Report & { user?: { email: string; name: string } };

export const getReportHtmlString = (
  report: ReportWithUser,
  chipOptions: Clause[],
  udap: Udap,
  serviceInstructeur?: Service_instructeurs,
) => {
  const spaceType = chipOptions.find((chip) => chip.key === "type-espace" && chip.value === report.projectSpaceType);
  const decision = chipOptions.find((chip) => chip.key === "decision" && chip.value === report.decision);
  const contacts = report.contacts ? getMultipleChips(chipOptions, "contacts-utiles", report.contacts) : [];
  const furtherInfos = report.furtherInformation
    ? getMultipleChips(chipOptions, "bonnes-pratiques", report.furtherInformation)
    : [];

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
        ${formatServiceInstructeur(serviceInstructeur)}
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

const formatServiceInstructeur = (serviceInstructeur: Service_instructeurs) => {
  const contact = [serviceInstructeur.email, serviceInstructeur.tel].filter(Boolean).join(", ");
  return `${serviceInstructeur.full_name}${contact ? `, ${contact}` : ""}.`;
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
