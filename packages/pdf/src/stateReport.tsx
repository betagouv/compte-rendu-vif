import { Document, Image, Link, Page, Text, View } from "@react-pdf/renderer";
import { Clause_v2, Report, Service, ServiceInstructeurs, StateReport } from "../../frontend/src/db/AppSchema";
import { MarianneHeader, initFonts, minifyHtml } from "./utils";
import { Html } from "react-pdf-html";
import { StateReportWithUser } from "../../frontend/src/features/report/ReportList";

import { format } from "date-fns";
import {
  SectionWithAttachments,
  StateReportWithUserAndAttachments,
} from "../../frontend/src/features/state-report/pdf/ConstatPdfContext";

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
            divider: () => <View style={{ borderTop: "1px solid #EDEDED", marginBottom: 4, marginTop: 16 }} />,
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

              u {
                text-underline-offset: 8px !important;
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
        <View
          style={{
            paddingLeft: 32,
            paddingRight: 32,
            fontSize: "8px",
          }}
        >
          <Text style={{ fontSize: "8px" }}>
            Ce constat d'état est effectué dans le cadre du contrôle scientifique et technique défini au livre VI, titre
            II, chapitre Ier du Code du patrimoine (partie législative et réglementaire et notamment l'article R621-63),
            et dans la circulaire du 1er décembre 2009 relative au contrôle scientifique et technique des services de
            l'État sur la conservation des monuments historiques classés ou inscrits. Les termes utilisés se fondent sur
            le glossaire des termes relatifs aux interventions sur les monuments historiques (déduit de la norme EN
            15898).
          </Text>

          <Link
            style={{}}
            src="https://www.culture.gouv.fr/Thematiques/monuments-sites/Interventions-demarches/Travaux-sur-un-objet-un-immeuble-un-espace/Intervenir-sur-un-immeuble-inscrit"
          >
            <Text style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", flexGrow: 1, flexBasis: 0 }}>
              {link?.match(/\w+|\W+/g)?.map((seg, i) => (
                <Text key={i}>{seg}</Text>
              ))}
            </Text>
          </Link>
        </View>
      </Page>
    </Document>
  );
};
const link =
  "https://www.culture.gouv.fr/Thematiques/monuments-sites/Interventions-demarches/Travaux-sur-un-objet-un-immeuble-un-espace/Intervenir-sur-un-immeuble-inscrit";

export const getStateReportHtmlString = ({
  stateReport,
  visitedSections,
}: {
  stateReport: StateReportWithUserAndAttachments;
  visitedSections: SectionWithAttachments[];
}) => {
  const isPartielle = stateReport.nature_visite?.toLocaleLowerCase().includes("partielle");

  const planSituationAttachment = stateReport.attachments.find((att) => stateReport.plan_situation === att.id);
  const planEdificeAttachment = stateReport.attachments.find((att) => stateReport.plan_edifice === att.id);
  const vueGenerale = stateReport.attachments.find((att) => stateReport.vue_generale === att.id);

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
        
      </div>

      <div id="details">
        <span>
          
          <b>Partie visitées</b> : ${isPartielle ? stateReport.visite_partielle_details || "" : "Visite complète de l'édifice."}<br/>
          <b>Adresse</b> : ${stateReport.adresse || "N/A"}.<br/>
          <b>Référence cadastrale</b> : ${stateReport.reference_cadastrale || "N/A"}.<br/>
          <b/>Propriétaire</b> : ${stateReport.proprietaire ? `${stateReport.proprietaire} (${stateReport.proprietaire_email})` : "N/A"}.<br/>
          ${stateReport.proprietaire_representant ? `Représentant : ${stateReport.proprietaire_representant ? `${stateReport.proprietaire_representant} (${stateReport.proprietaire_representant_email})` : "N/A"}.` : ""}
        </span>
      </div>

      <div id="protection">
        <h2>Protection de l'édifice</h2>
        ${uppercaseFirstLetter(stateReport.nature_protection || "N/A")}<br/><br/>
        Parties protégées : ${stateReport.parties_protegees || "N/A"}
      </div>

      <divider />

      <div id="plans">
        <div style="display: flex; flex-direction: row; flex-wrap: wrap; gap: 16px; margin-top: 8px;">
          ${
            planSituationAttachment
              ? `<unbreakable class="attachment" style="flex:1;">
                  <h2>Plan de situation</h2>
                  <div class="attachment-image">  
                    <img src="${planSituationAttachment.file}" style="width: 250px" />
                  </div>
                  <div class="attachment-label">${planSituationAttachment?.label || "Photo"}</div>
                </unbreakable>`
              : ""
          }

            ${
              planEdificeAttachment
                ? `<unbreakable class="attachment" style="flex:1;">
                    <h2>Plan de l'édifice</h2>
                    <div class="attachment-image">  
                      <img src="${planEdificeAttachment.file}" style="width: 250px" />
                    </div>
                    <div class="attachment-label">${planEdificeAttachment?.label || "Photo"}</div>
                  </unbreakable>`
                : ""
            }

            ${
              vueGenerale
                ? `<unbreakable class="attachment" style="flex:1;">
                    <h2>Vue générale</h2>
                    <div class="attachment-image">  
                      <img src="${vueGenerale.file}" style="width: 250px" />
                    </div>
                    <div class="attachment-label">${vueGenerale?.label || "Photo"}</div>
                  </unbreakable>`
                : ""
            }

            
        </div>


      </div>

            <divider />
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

      <divider />

      <div id="constat-detaille">
        <h2>Constat détaillé</h2>
        ${visitedSections
          ?.map(
            (section) => `
            <div class="section-detail">
              <li>
                <b>${section.section} :</b><br/> ${section.proportion_dans_cet_etat} des parties protégées sont jugées ${etatGeneralMap[section.etat_general as keyof typeof etatGeneralMap] || "N/A"}.
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

      <divider />

      <div id="preconisations">
        <h2>Préconisations générales</h2>
        <b>
          Suite à la visite, il est préconisé d'entreprendre ${preconisationsMap[stateReport.preconisations as keyof typeof preconisationsMap] || "N/A"}.
        </b>
        <br/>
        <div>
          <u>Commentaires :</u> ${stateReport.preconisations_commentaires || "Aucun"}.
        </div>
      </div>

      <br/><br/><br/><br/><br/>

      <b id="date">
        Document créé le ${new Date().toLocaleDateString("fr-FR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}.
      </b>

      <br/>
      <br/>
      <br/>
      <br/>
      <br/>

    </div>
  `);
};

const footerText = `Ce constat d'état est effectué dans le cadre du contrôle scientifique et technique défini au livre VI, titre II, chapitre Ier du Code du patrimoine (partie législative et réglementaire et notamment l'article R621-63), et dans la circulaire du 1er décembre 2009 relative au contrôle scientifique et technique des services de l'État sur la conservation des monuments historiques classés ou inscrits. Les termes utilisés se fondent sur le glossaire des termes relatifs aux interventions sur les monuments historiques (déduit de la norme EN 15898).
<br/><br/>
Pour toute information complémentaire, vous pouvez vous référer à :
<a href="https://www.culture.gouv.fr/Thematiques/monuments-sites/Interventions-demarches/Travaux-sur-un-objet-un-immeuble-un-espace/Intervenir-sur-un-immeuble-inscrit">https://www.culture.gouv.fr/Thematiques/monuments-sites/Interventions-demarches/Travaux-sur-un-objet-un-immeuble-un-espace/Intervenir-sur-un-immeuble-inscrit</a>`;

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
