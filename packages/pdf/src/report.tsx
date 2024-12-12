import { Document, Font, Image, Page, StyleSheet, Text, View, ViewProps } from "@react-pdf/renderer";
import { Html } from "react-pdf-html";
import React from "react";
import { Buffer } from "buffer";
import { Udap, Report, ServiceInstructeurs, Clause_v2, Pictures } from "../../frontend/src/db/AppSchema";
import type { Style } from "@react-pdf/types";
export const initFonts = (folder: string = "") => {
  // Font.register({
  //   family: "Marianne",
  //   fonts: [
  //     {
  //       src: `${folder}/fonts/Marianne-Regular.ttf`,
  //       fontStyle: "normal",
  //       fontWeight: "normal",
  //     },
  //     { src: `${folder}/fonts/Marianne-Bold.ttf`, fontStyle: "normal", fontWeight: "bold" },
  //     {
  //       src: `${folder}/fonts/Marianne-RegularItalic.ttf`,
  //       fontStyle: "italic",
  //       fontWeight: "normal",
  //     },
  //     {
  //       src: `${folder}/fonts/Marianne-BoldItalic.ttf`,
  //       fontStyle: "italic",
  //       fontWeight: "bold",
  //     },
  //   ],
  // });
};

Font.registerHyphenationCallback((word) => {
  return [word];
});

const MarianneHeader = ({
  marianneUrl,
  styles,
}: {
  marianneUrl: string;
  styles?: ({ pageNumber }: { pageNumber: number }) => ViewProps["style"];
}) => {
  return (
    <View
      fixed
      render={({ pageNumber }) => (
        <View
          style={{
            position: "absolute",
            // marginBottom: 28,
            top: -36,
            left: 40,
            height: 13,
            width: 34,
            ...styles?.({ pageNumber }),
          }}
          fixed
        >
          <Image
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
            src={marianneUrl}
          />
        </View>
      )}
    />
  );
};

const Pagination = () => {
  return (
    <View fixed style={{ position: "absolute", bottom: 40, right: 40, fontSize: 10 }}>
      <Text
        render={({ pageNumber, totalPages }) => (
          <Text>
            {pageNumber} / {totalPages}
          </Text>
        )}
      />
    </View>
  );
};

export const ReportPDFDocument = ({ udap, htmlString, images, pictures }: ReportPDFDocumentProps) => {
  return (
    <Document onRender={console.log}>
      <Page
        size="A4"
        style={{
          paddingBottom: 56,
          paddingTop: 72,
        }}
        wrap
      >
        <MarianneHeader marianneUrl={images.marianne} />
        <Html
          collapse
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
                font-family: Helvetica;
                margin-top: -20px;
              }

              strong {
                font-family: Helvetica-Bold;
              }

              em {
                font-family: Helvetica-Oblique;
              }

              strong em span {
                font-family: Helvetica-BoldOblique;
              }

              em strong span {
                font-family: Helvetica-BoldOblique;
              }

              strong em {
                font-family: Helvetica-BoldOblique;
              }

              em strong {
                font-family: Helvetica-BoldOblique;
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
                font-family: Helvetica;
                margin-right: 50px;
                max-width: 250px;
              }

              .right-texts > div:first-child {
                font-family: Helvetica-Bold
              }


              .meeting-date {
                text-align: right;
                display: flex;
                justify-content: flex-end;
                align-items: flex-end;
              }

              .pictures {
                background-color: #f5f5f5;
              }
                
              hr {
                border: 0;
                border-top: 1px solid #EDEDED;
              }

            </style>
            <div class="header">
              <div class="marianne">

                <div class="marianne-text">
                  <strong>
                ${udap.marianne_text
                  ?.split("\n")
                  .map((s) => s.trim())
                  .join("<br/>")}
                  </strong>
                </div>
                <img class="marianne-footer-img" src="${images.marianneFooter}" />

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
            <hr/>
            <div class="content">
              ${htmlString}
            </div>
            
          </body>
        </html>
      `}</Html>
        <Pagination />
      </Page>
      {pictures ? <PicturesGrid pictures={pictures} marianneUrl={images.marianne} /> : null}
    </Document>
  );
};

const picturesPerPage = 4;

const PicturesGrid = ({ pictures, marianneUrl }: { pictures: Pictures[]; marianneUrl: string }) => {
  const pages = Math.ceil(pictures.length / picturesPerPage);
  return (
    <>
      {Array.from({ length: pages }).map((_, pageIndex) => (
        <Page
          key={pageIndex}
          size="A4"
          style={{
            paddingBottom: 56,
            paddingTop: 72,
            backgroundColor: "#ffffff",
          }}
        >
          <MarianneHeader
            marianneUrl={marianneUrl}
            styles={({}) => ({
              top: -37,
            })}
          />
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              gap: 20,
              paddingLeft: "40px",
              paddingRight: "40px",
            }}
          >
            {pictures.slice(pageIndex * picturesPerPage, (pageIndex + 1) * picturesPerPage).map((image, index) => (
              <View
                key={index}
                style={{
                  width: "48%",
                  maxHeight: "40vh",
                  marginBottom: 20,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <View style={{ width: "100%", marginBottom: 5 }}>
                  <Image
                    src={image.finalUrl ?? image.url!}
                    style={{ width: "100%", objectFit: "scale-down", objectPosition: "left", maxHeight: 300 }}
                  />
                </View>
                <Text style={{ fontSize: "10px", textAlign: "left", width: "100%" }}>
                  N° {pageIndex * picturesPerPage + index + 1}
                </Text>
              </View>
            ))}
          </View>
          <Pagination />
        </Page>
      ))}
    </>
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
  serviceInstructeur?: ServiceInstructeurs,
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

    <hr />
    
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

const formatServiceInstructeur = (serviceInstructeur: ServiceInstructeurs) => {
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
