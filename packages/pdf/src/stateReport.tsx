import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import { Clause_v2, Report, Service, ServiceInstructeurs, StateReport } from "../../frontend/src/db/AppSchema";
import { MarianneHeader, initFonts, minifyHtml } from "./utils";
import { Html } from "react-pdf-html";
import { StateReportWithUser } from "../../frontend/src/features/report/ReportList";

export const StateReportPDFDocument = ({ service, htmlString, images, pictures }: StateReportPDFDocumentProps) => {
  return (
    <Document onRender={console.log}>
      <Page
        size="A4"
        style={{
          fontFamily: "Marianne",
          paddingBottom: 56,
          paddingTop: 72,
        }}
        wrap
      >
        <MarianneHeader marianneUrl={images.marianne} />
        <Html
          collapse
          renderers={{
            unbreakable: ({ children }) => <View wrap={false}>{children}</View>,
          }}
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
              body {
                font-family: Marianne;
                margin-top: -20px;
              }

              strong {
                font-weight: bold;
              }

              em {
                font-style: italic;
              }

              strong em span {
                font-weight: bold;
                font-style: italic;
              }

              em strong span {
                font-weight: bold;
              }

              strong em {
                font-style: italic;
                font-weight: bold;
                }

              em strong {
              font-style: italic;
                font-weight: bold;
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

              .marianne {
                margin-top: 13px;
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
                text-align: left;
                margin-top: 13px;
                display: flex;
                align-items: flex-start;
                flex-direction: column;
                justify-content: flex-start;
                font-size: 14px;
                margin-right: 50px;
                max-width: 250px;
              }

              .right-texts > div:first-child {
                font-weight: bold;
              }

                
              hr {
                border: 0;
                border-top: 1px solid #EDEDED;
              }

              #title-section .title-row:first-child {
                font-weight: normal;
                margin-bottom: 0;
              }

              #title-section .title-row:last-child {
                font-weight: bold;
                margin-top: 4px;
              }

              #intro {
                margin-bottom: 16px;
              }

              #details {
                margin-bottom: 16px;
              }

              .section-attachments {
                display: flex;
                flex-wrap: wrap;
                gap: 4%;
                margin-top: 8px;
              }

            </style>
            <div class="header">
              <div class="marianne">

                <div class="marianne-text">
                  <strong>
                ${service.marianne_text
                  ?.split("\n")
                  .map((s) => s.trim())
                  .join("<br/>")}
                  </strong>
                </div>
                <img class="marianne-footer-img" src="${images.marianneFooter}" />

              </div>

              <div class="right-texts">
                <div>
                      ${service.drac_text
                        ?.split("\n")
                        .map((s) => s.trim())
                        .join("<br/>")}
                </div>
                <div>
                    ${service.service_text
                      ?.split("\n")
                      .map((s) => s.trim())
                      .join("<br/>")}
                </div>
              </div>
            </div>
            <hr/>
            <div class="content">
              ${htmlString}
            </div>
            
          </body>
        </html>`}</Html>
      </Page>
    </Document>
  );
};

import { format } from "date-fns";
import { uppercaseFirstLetterIf } from "../../frontend/src/utils";
import { SectionWithAttachments } from "../../frontend/src/features/state-report/pdf/ConstatPdfContext";

export const getStateReportHtmlString = ({
  stateReport,
  visitedSections,
}: {
  stateReport: StateReportWithUser;
  visitedSections: SectionWithAttachments[];
}) => {
  const isPartielle = stateReport.nature_visite?.toLocaleLowerCase().includes("partielle");

  return minifyHtml(`
    <div id="title-section">
      <h1 class="title-row">Constat d'état du monument historique</h1>
      <h1 class="title-row">${stateReport.titre_edifice}</h1>
    </div>


    <div id="content-section">
      <div id="intro">
        <span>
          Constat dressé par <b>${stateReport.createdByName}</b> suite à la visite  ${isPartielle ? "partielle" : ""}
          ${stateReport.date_visite ? ` du ${format(new Date(stateReport.date_visite!), "dd/MM/yyyy")}.` : ""}.
        </span>
        <br/>
        <br/>
        
        <span>
          ${isPartielle ? "Partie visitées : " + (stateReport.visite_partielle_details || "") + "." : "Visite complète de l'édifice."}
        </span>
      </div>

      <div id="details">
        <span>
          Référence cadastrale : ${stateReport.reference_cadastrale || "N/A"}.<br/>
          Propriétaire : ${stateReport.proprietaire ? `${stateReport.proprietaire} (${stateReport.proprietaire_email})` : "N/A"}.<br/>
          ${stateReport.proprietaire_representant ? `Représentant : ${stateReport.proprietaire_representant ? `${stateReport.proprietaire_representant} (${stateReport.proprietaire_representant_email})` : "N/A"}.` : ""}
        </span>
      </div>

      <div id="protection">
        ${uppercaseFirstLetter(stateReport.nature_protection || "N/A")}<br/>
        Parties protégées : ${stateReport.parties_protegees || "N/A"}
      </div>




      <div id="etat-general">
        <h2>État général</h2>
        <div>Le monument est jugé ${etatGeneralMap[stateReport.etat_general as keyof typeof etatGeneralMap] || "N/A"} pour ${stateReport.proportion_dans_cet_etat} des parties protégées de l'édifice</div>

        <ul>
          ${defaultSections
            ?.map((section) => {
              const sectionData = visitedSections.find((s) => s.section === section);

              return `
              <li style="margin-bottom: 0; padding: 0;">
                <b>${section}</b> : ${
                  !sectionData
                    ? "partie non visitée"
                    : `${sectionData.proportion_dans_cet_etat} des parties protégées sont jugées ${etatGeneralMap[sectionData.etat_general as keyof typeof etatGeneralMap] || "N/A"}.`
                }
              </li>
            `;
            })
            .join("")}
        </ul>
      </div>

      <div id="constat-detaille">
        <h2>Constat détaillé</h2>
        ${visitedSections
          ?.map(
            (section) => `
            <div class="section-detail">
              <li>
                <b>${section.section}</b> : ${section.proportion_dans_cet_etat} des parties protégées sont jugées ${etatGeneralMap[section.etat_general as keyof typeof etatGeneralMap] || "N/A"}.
              </li>

              <br/>

              <div class="section-commentaires">
                <b>Commentaires :</b> ${section.commentaires ? `${section.commentaires}` : "Aucun"}
              </div>

              <div class="section-attachments">
                ${section.attachments
                  .map(
                    (attachment) => `
                    <unbreakable class="attachment" style="flex:1;">
                      <div class="attachment-image">  
                        <img src="${attachment.file}" style="width: 250px" />
                      </div>
                      <div class="attachment-label">${attachment.label || "Photo"}</div>
                    </unbreakable>
                  `,
                  )
                  .join("")}
              </div>
            </div>
          `,
          )
          .join("")}
      </div>

      <div id="preconisations">
        <h2>Préconisations générales</h2>
        <div>
          Suite à la visite, il est préconisé d'entreprendre ${preconisationsMap[stateReport.preconisations as keyof typeof preconisationsMap] || "N/A"}.
        <div>
        <br/>
        <div>
          Commentaires: ${stateReport.preconisations_commentaires || "Aucun"}.
        </div>
      </div>

      <br/><br/><br/><br/><br/>

      <div id="date">
          Document créé le ${format(new Date(), "dd/MM/yyyy")}.
      </div>
    </div>
  `);
};

const etatGeneralMap = {
  Bon: "en bon état",
  Moyen: "dans un état moyen",
  Mauvais: "dans un mauvais état",
  Péril: "en péril",
};

export const defaultSections = [
  "Fondations, sols, sous-sols",
  "Maçonnerie, structure",
  "Parements, enduits",
  "Menuiserie, métallerie, vitraux",
  "Cloisonnement, revêtements, décors, objets, mobiliers",
  "Équipements, sécurité, accessibilité",
  "Environnements, abords, voirie et réseaux",
];

const preconisationsMap = {
  "Étude diagnostique": "la réalisation d'une étude diagnostique approfondie",
  "Mesure d'urgence": "des mesures d'urgence",
  "Travaux d'entretien": "des travaux d'entretien",
  "Travaux de restauration": "des travaux de restauration",
  "Travaux de réparation": "des travaux de réparation",
};

const uppercaseFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export type StateReportPDFDocumentProps = {
  htmlString: string;
  service: Service;
  images: Images;
  pictures?: PdfImage[];
};

export type PdfImage = {
  url: string;
  label?: string;
};

export type ReportPDFDocumentProps = {
  htmlString: string;
  service: Service;
  images: Images;
  pictures?: PdfImage[];
};

type Images = {
  marianne: string;
  marianneFooter: string;
};
