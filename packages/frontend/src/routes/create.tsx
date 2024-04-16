import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { EnsureUser } from "../components/EnsureUser";
import { Box, Center } from "#styled-system/jsx";
import { Page, Text, View, Document, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import { css } from "#styled-system/css";

export const CreatePage = () => {
  return (
    <>
      <PDFViewer>
        <MyDocument />
      </PDFViewer>
      <div className={css({ display: "flex", w: "300px", h: "150px" })} style={styles.page}>
        <div style={styles.section}>
          <span>Section #1</span>
        </div>
        <div style={styles.section}>
          <span>Section #2</span>
        </div>
      </div>
    </>
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

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

export const Route = createFileRoute("/create")({
  component: () => (
    <EnsureUser>
      <Box mb="80px">
        <CreatePage />
      </Box>
    </EnsureUser>
  ),
  beforeLoad: ({ context, location }) => {
    if (!context.token || !context.user) {
      throw redirect({ to: "/login", search: { redirect: location.href } });
    }
  },
});
