import { Flex } from "#styled-system/jsx";
import { Report } from "../../triplit/schema";

export const ReportList = ({ reports }: { reports: Report[] }) => {
  return (
    <Flex flexDir="column">
      {reports.map((report) => (
        <ReportListItem key={report.id} report={report} />
      ))}
    </Flex>
  );
};

const ReportListItem = ({ report }: { report: Report }) => {
  return <Flex>{report.title}</Flex>;
};
