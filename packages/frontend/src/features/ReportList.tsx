import { Center, Divider, Flex, styled } from "#styled-system/jsx";
import { flex } from "#styled-system/patterns";
import { useLiveQuery } from "electric-sql/react";
import { useUser } from "../contexts/AuthContext";
import { Report } from "../generated/client/prismaClient";
import { db } from "../db";
import Button from "@codegouvfr/react-dsfr/Button";
import { useMutation } from "@tanstack/react-query";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { css } from "#styled-system/css";

export const MyReports = () => {
  const user = useUser()!;
  const myReports = useLiveQuery(
    db.report.liveMany({
      where: { created_by_id: user.id },
      include: { report_to_clause: { include: { clause: true } } },
    }),
  );
  console.log(myReports);

  if (myReports.error) {
    console.error(myReports.error);
    return <Center>Une erreur s'est produite</Center>;
  }

  return (
    <Center>
      <ReportList reports={myReports.results ?? []} />
    </Center>
  );
};

export const AllReports = () => {
  const allReports = useLiveQuery(db.report.liveMany());

  if (allReports.error) {
    console.error(allReports.error);
    return <Center>Une erreur s'est produite</Center>;
  }

  return <ReportList reports={allReports.results ?? []} />;
};

export const ReportList = ({ reports }: { reports: Report[] }) => {
  const error =
    reports.length === 0 ? <Center>Aucun compte-rendu</Center> : null;

  return (
    <Flex flexDir="column" w="484px">
      {error ??
        reports.map((report, index) => (
          <ReportListItem
            key={report.id}
            report={report}
            isLast={index === reports.length - 1}
          />
        ))}
    </Flex>
  );
};

const ReportListItem = ({
  report,
  isLast,
}: { report: Report; isLast?: boolean }) => {
  // const mutation = useMutation({ mutationFn: () => db.report.delete({ where: { id: report.id } }) });

  return (
    <>
      <article
        className={flex({
          position: "relative",
          flexDirection: "column",
          color: "text-action-high-blue-france",
          fontSize: "16px",
        })}
      >
        <Flex>
          <styled.span fontWeight="bold">{report.title}</styled.span>
          <styled.span ml="5px">
            {report.created_at.toLocaleDateString()}
          </styled.span>
        </Flex>
        <styled.span>Rédigé par {report.created_by_username}</styled.span>
        {/* TODO: set correct status */}
        <styled.div mt="8px">
          <ReportBadge status="draft" />
        </styled.div>
        {/* <Button onClick={() => mutation.mutate()}>Supprimer</Button> */}
        <styled.div position="absolute" top="10px" right="10px">
          <Button
            className={css({ borderRadius: "50%" })}
            iconId="ri-more-fill"
            title="Label button"
            size="small"
            priority="secondary"
          />
        </styled.div>
      </article>
      {isLast ? null : <Divider mt="12px" mb="8px" />}
    </>
  );
};

type ReportStatus = "draft" | "published";
const ReportBadge = ({ status }: { status: ReportStatus }) => {
  return (
    <Badge severity={status === "draft" ? "info" : "success"}>
      {status === "draft" ? "Brouillon" : "Publié"}
    </Badge>
  );
};
