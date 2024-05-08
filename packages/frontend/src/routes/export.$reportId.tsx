import { createFileRoute } from "@tanstack/react-router";
import { useLiveQuery } from "electric-sql/react";
import { db } from "../db";
import { Flex, styled } from "#styled-system/jsx";
import { Document, Page, Text, View, StyleSheet, type Styles } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import type { Report, Udap } from "@cr-vif/electric-client/frontend";
import { TextEditor, textEditorClassName } from "../features/text-editor/TextEditor";
import { useState } from "react";
import Html from "react-pdf-html";
import useDebounce from "react-use/lib/useDebounce";
import type { ReportWithUser } from "../features/ReportList";
import { useChipOptions } from "../features/chips/useChipOptions";
import { Chip } from "@cr-vif/electric-client/frontend";
import { useUser } from "../contexts/AuthContext";

const ExportPdf = () => {
  const { reportId } = Route.useParams();
  const { results: report } = useLiveQuery(db.report.liveUnique({ where: { id: reportId }, include: { user: true } }));
  const chipOptions = useChipOptions();

  return (
    <Flex direction="column">
      {report && chipOptions?.length ? <WithReport report={report} chipOptions={chipOptions} /> : null}
    </Flex>
  );
};

const WithReport = ({ report, chipOptions }: { report: ReportWithUser; chipOptions: Chip[] }) => {
  const { udap } = useUser()!;
  const [value, setValue] = useState(getReportHtmlString(report, chipOptions, udap as Udap));
  const [debouncedValue, setDebouncedValue] = useState(value);

  useDebounce(() => setDebouncedValue(value), 1000, [value, chipOptions]);
  return (
    <Flex direction="column">
      <TextEditor defaultValue={value} onChange={(e) => setValue(e)} />

      <PDFViewer>
        <Document>
          <Page size="A4">
            <Html>{`
              <html>
                <body>
                  <style>
                    * {
                      font-family: Helvetica;
                      font-size: 12px;
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


                  </style>

                  ${debouncedValue}
                </body>
              </html>
            `}</Html>
          </Page>
        </Document>
      </PDFViewer>

      <Flex direction="column">
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
        <div dangerouslySetInnerHTML={{ __html: value }} />
      </Flex>
    </Flex>
  );
};

const getReportHtmlString = (report: ReportWithUser, chipOptions: Chip[], udap: Udap) => {
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
    <strong>Précisions : </strong>
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

// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "row",
//     backgroundColor: "white",
//     color: "black",
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
// });

export const Route = createFileRoute("/export/$reportId")({
  component: () => <ExportPdf />,
});
