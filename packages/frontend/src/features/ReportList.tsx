import { Center, Divider, Flex, styled } from "#styled-system/jsx";
import { flex } from "#styled-system/patterns";
import { useLiveQuery } from "electric-sql/react";
import { useUser } from "../contexts/AuthContext";
import type { Report } from "@cr-vif/electric-client/frontend";
import { db } from "../db";
import Button from "@codegouvfr/react-dsfr/Button";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { css } from "#styled-system/css";
import { Link } from "@tanstack/react-router";

type ReportWithUser = Report & { user?: { email: string; name: string } };

export const MyReports = () => {
  const user = useUser()!;
  const myReports = useLiveQuery(
    db.report.liveMany({
      where: { createdByEmail: user.email },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    }),
  );

  const chips = useLiveQuery(db.chip.liveMany());
  console.log(chips);

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
  const user = useUser()!;
  const allReports = useLiveQuery(
    db.report.liveMany({
      where: { createdByEmail: { not: user.email } },
      include: {
        user: {
          select: {
            email: true,
            name: true,
          },
        },
      },
    }),
  );

  if (allReports.error) {
    console.error(allReports.error);
    return <Center>Une erreur s'est produite</Center>;
  }

  return (
    <Center>
      <ReportList reports={allReports.results ?? []} />
    </Center>
  );
};

export const ReportList = ({ reports }: { reports: ReportWithUser[] }) => {
  const error = reports.length === 0 ? <Center>Aucun compte-rendu</Center> : null;

  return (
    <Flex flexDir="column" w="484px">
      {error ??
        reports.map((report, index) => (
          <ReportListItem key={report.id} report={report} isLast={index === reports.length - 1} />
        ))}
    </Flex>
  );
};

const ReportListItem = ({ report, isLast }: { report: ReportWithUser; isLast?: boolean }) => {
  // const mutation = useMutation({ mutationFn: () => db.report.delete({ where: { id: report.id } }) });

  return (
    <>
      <Link to={"/edit/$reportId"} params={{ reportId: report.id }}>
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
            <styled.span ml="5px">{report.createdAt.toLocaleDateString()}</styled.span>
          </Flex>
          <styled.span>Rédigé par {report.user?.name ?? report.createdByEmail.split("@")[0]}</styled.span>
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
      </Link>
      {isLast ? null : <Divider mt="12px" mb="8px" />}
    </>
  );
};

type ReportStatus = "draft" | "published";
const ReportBadge = ({ status }: { status: ReportStatus }) => {
  return (
    <Badge severity={status === "draft" ? "info" : "success"}>{status === "draft" ? "Brouillon" : "Publié"}</Badge>
  );
};
