import { createFileRoute } from "@tanstack/react-router";
import { useLiveQuery } from "electric-sql/react";
import { db } from "../db";
import { Flex, styled } from "#styled-system/jsx";
import type { Report } from "../generated/client";
import { Document, Page, Text, View, StyleSheet, type Styles } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";
import { TextEditor, textEditorClassName } from "../features/text-editor/TextEditor";
import { useState } from "react";
import Html from "react-pdf-html";
import useDebounce from "react-use/lib/useDebounce";
import { Font } from "@react-pdf/renderer";

const ExportPdf = () => {
  const { reportId } = Route.useParams();
  const { results: report } = useLiveQuery(db.report.liveUnique({ where: { id: reportId } }));

  return <Flex direction="column">{report ? <WithReport report={report} /> : null}</Flex>;
};

const WithReport = ({ report }: { report: Report }) => {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(value);

  useDebounce(() => void console.log(value) || setDebouncedValue(value), 1000, [value]);

  return (
    <Flex direction="column">
      <TextEditor defaultValue={value} onChange={(e) => setValue(e)} />
      <PDFViewer>
        <Document>
          <Page size="A4" style={styles.page}>
            <Text style={{ fontWeight: "normal" }}>salut</Text>
            <Html>{`
              <html>
                <body>
                  <style>
                    body {
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

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
    color: "black",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export const Route = createFileRoute("/export/$reportId")({
  component: () => <ExportPdf />,
});
