import { Flex } from "#styled-system/jsx";
import type { Udap } from "@cr-vif/electric-client/frontend";
import { Chip } from "@cr-vif/electric-client/frontend";
import { PDFViewer } from "@react-pdf/renderer";
import { createFileRoute } from "@tanstack/react-router";
import { useLiveQuery } from "electric-sql/react";
import { useState } from "react";
import useDebounce from "react-use/lib/useDebounce";
import { useUser } from "../contexts/AuthContext";
import { db } from "../db";
import type { ReportWithUser } from "../features/ReportList";
import { useChipOptions } from "../features/chips/useChipOptions";
import { TextEditor } from "../features/text-editor/TextEditor";
import { ReportPDFDocument, getReportHtmlString } from "@cr-vif/pdf";
import Button from "@codegouvfr/react-dsfr/Button";
import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

const ExportPdf = () => {
  const { reportId } = Route.useParams();
  const { results: report } = useLiveQuery(db.report.liveUnique({ where: { id: reportId }, include: { user: true } }));
  const chipOptions = useChipOptions();

  return (
    <Flex direction="column" h="100%">
      {report && chipOptions?.length ? <WithReport report={report} chipOptions={chipOptions} /> : null}
    </Flex>
  );
};

const WithReport = ({ report, chipOptions }: { report: ReportWithUser; chipOptions: Chip[] }) => {
  const { udap } = useUser()!;
  const [value, setValue] = useState(getReportHtmlString(report, chipOptions, udap as Udap));
  const [debouncedValue, setDebouncedValue] = useState(value);

  const generatePdfMutation = useMutation((htmlString: string) =>
    api.post("/api/pdf/report", { body: { reportId: report.id, htmlString } }),
  );

  useDebounce(() => setDebouncedValue(value), 1000, [value, chipOptions]);

  return (
    <Flex direction="column" h="100%">
      <TextEditor defaultValue={value} onChange={(e) => setValue(e)} />

      <PDFViewer height={"100%"}>
        <ReportPDFDocument udap={udap as Udap} htmlString={debouncedValue} images={{ header: "/pdf_header.png" }} />
      </PDFViewer>

      <Button type="button" onClick={() => generatePdfMutation.mutate(debouncedValue)}>
        Générer le PDF
      </Button>
    </Flex>
  );
};

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
