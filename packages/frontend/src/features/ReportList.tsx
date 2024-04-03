import { Center, Flex, styled } from "#styled-system/jsx";
import { useLiveQuery } from "electric-sql/react";
import { useUser } from "../contexts/AuthContext";
import { Report } from "../generated/client/prismaClient";
import { db } from "../db";

export const MyReports = () => {
  const user = useUser()!;
  const myReports = useLiveQuery(
    db.report.liveMany({ where: { owned_by: user.id }, include: { report_to_clause: { include: { clause: true } } } }),
  );

  if (myReports.error) return <Center>Une erreur s'est produite</Center>;

  return <ReportList reports={myReports.results ?? []} />;
};

export const AllReports = () => {
  const allReports = useLiveQuery(db.report.liveMany());

  if (allReports.error) return <Center>Une erreur s'est produite</Center>;

  return <ReportList reports={allReports.results ?? []} />;
};

export const ReportList = ({ reports }: { reports: Report[] }) => {
  const error = reports.length === 0 ? <Center>Aucun compte-rendu</Center> : null;

  return (
    <Flex flexDir="column">{error ?? reports.map((report) => <ReportListItem key={report.id} report={report} />)}</Flex>
  );
};

const ReportListItem = ({ report }: { report: Report }) => {
  return <Flex>{report.title}</Flex>;
};
