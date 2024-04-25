import { createFileRoute } from "@tanstack/react-router";
import { useLiveQuery } from "electric-sql/react";
import { db } from "../db";
import { Flex, styled } from "#styled-system/jsx";
import type { Report } from "../generated/client";
import { Document, Page, Text, View, StyleSheet, type Styles } from "@react-pdf/renderer";
import { PDFViewer } from "@react-pdf/renderer";

const ExportPdf = () => {
  const { reportId } = Route.useParams();
  const { results: report } = useLiveQuery(db.report.liveUnique({ where: { id: reportId } }));

  return <Flex direction="column">{report ? <WithReport report={report} /> : null}</Flex>;
};

const WithReport = ({ report }: { report: Report }) => {
  return (
    <Flex direction="column">
      <PDFViewer>
        {/* <ReportPdf report={report} /> */}
        <Document>
          <RenderPdfLike components={pdfComponents} styles={styles} />
        </Document>
      </PDFViewer>

      <Flex direction="column">
        <RenderPdfLike components={htmlComponents} styles={styles} />
      </Flex>
    </Flex>
  );
};

const pdfComponents = { Page, View, Text };
const htmlComponents = { Page: styled.div, View: styled.div, Text: styled.div };
type Components = { Page: any; View: any; Text: any };
type Style = Styles[any];
type PdfLikeStyles = { page: Style; section: Style };

const RenderPdfLike = ({ components, styles }: { components: Components; styles: PdfLikeStyles }) => {
  const { Page, View, Text } = components;
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ display: "flex", flexDirection: "column" }}>
            <Text>Object : </Text>
            <Text>Votre interlocuteur : </Text>
            <Text>Demandeur : </Text>
            <Text>Adresse du projet : </Text>
            <Text>Ref cadastrale : </Text>
          </View>
          <Text style={{ textAlign: "right" }}>Suite au rendez-vous du </Text>
        </View>
      </View>
    </Page>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "white",
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
