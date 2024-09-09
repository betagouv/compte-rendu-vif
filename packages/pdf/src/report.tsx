import { Document, Font, Page } from "@react-pdf/renderer";
import { Html } from "react-pdf-html";
import React from "react";
import type { Udap, Report, Service_instructeurs, Clause_v2 } from "@cr-vif/electric-client/frontend";
import { Buffer } from "buffer";
import { Pictures } from "../../electric-client/src/generated/client/index";

Font.registerHyphenationCallback((word) => {
  return [word];
});

export const ReportPDFDocument = ({ udap, htmlString, images, pictures }: ReportPDFDocumentProps) => {
  return (
    <Document>
      <Page
        minPresenceAhead={20}
        size="A4"
        style={{
          paddingTop: "48px",
          paddingBottom: "32px",
        }}
      >
        <Html
          style={{
            fontSize: "10px",
            paddingLeft: "32px",
            paddingRight: "32px",
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
            margin-top: -16px;
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
            margin-top: 13px;
            display: flex;
            align-items: flex-end;
            flex-direction: column;
            justify-content: flex-end;
            gap: 20px;
          }

          .right-texts > div {
            text-align: right;
            font-size: 14px;
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
            ${
              pictures
                ? `<div class="pictures">
              ${pictures.filter((pic) => !!pic.data).map((pic) => `<img src="data:image/png;base64,${Buffer.from(pic.data!).toString("base64")}"`)}
            </div>`
                : ""
            }
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
  pictures?: Pictures[];
};

type Images = {
  marianne: string;
  marianneFooter: string;
};

export type ReportWithUser = Report & { user?: { email: string; name: string } };

export const getReportHtmlString = (
  report: ReportWithUser,
  chipOptions: Clause_v2[],
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

  const address = [report.applicantAddress, report.city].filter(Boolean).join(" ");

  return minifyHtml(`
    
    <p class="meeting-date">
    ${
      meetDate
        ? `<span>
      Suite au rendez-vous du ${meetDate?.toLocaleDateString("fr-FR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })}
    </span><br/><br/>`
        : ""
    }
      <strong>Votre interlocuteur : ${report.redactedBy ?? report.user?.name ?? ""}</strong><br/>
      Demandeur : ${report.applicantName ?? ""}<br/>
      Adresse du projet : ${address ?? ""}<br/>
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
      <span>${report.precisions
        ?.split("\n")
        .map((s) => s.trim())
        .join("<br/>")}</span>
    </p>`
        : ""
    }

    <p>
      <strong>Le projet pour rappel : </strong><br/>
      ${
        report.projectDescription
          ?.split("\n")
          .map((s) => s.trim())
          .join("<br/>") ?? ""
      }
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
        <strong>Bonnes pratiques</strong><br/>
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

const getMultipleChips = (chipOptions: Clause_v2[], key: string, values: string) => {
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
