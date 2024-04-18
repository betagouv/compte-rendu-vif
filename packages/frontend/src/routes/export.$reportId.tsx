import { createFileRoute } from "@tanstack/react-router";
import { useLiveQuery } from "electric-sql/react";
import { db } from "../db";
import { Flex } from "#styled-system/jsx";
import type { Report } from "../generated/client";
import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
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
        <ReportPdf report={report} />
      </PDFViewer>
    </Flex>
  );
};

const ReportPdf = ({ report }: { report: Report }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{report.title}</Text>
          <Image />
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
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
