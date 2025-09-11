import { useUser } from "../contexts/AuthContext";
import { db, useDbQuery } from "../db/db";
import Button from "@codegouvfr/react-dsfr/Button";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { css, cx } from "#styled-system/css";
import { Popover } from "#components/Popover";
import { useClickAway } from "react-use";
import { useRef, useState } from "react";
import { PopoverTrigger } from "@ark-ui/react/popover";
import { ReportActions } from "./ReportActions";
import { Pagination } from "@codegouvfr/react-dsfr/Pagination";
import welcomeImage from "../assets/welcome.svg";
import { useIsDesktop } from "../hooks/useIsDesktop";
import { chunk } from "pastable";
import { Report } from "../db/AppSchema";
import { Center } from "#components/MUIDsfr.tsx";
import { Box, Stack, Typography } from "@mui/material";
import { fr } from "@codegouvfr/react-dsfr";
import { Flex } from "#components/ui/Flex.tsx";
import { Divider } from "#components/ui/Divider.tsx";
import { useStyles } from "tss-react";
import { uppercaseFirstLetterIf } from "../utils";
import { ReportListItem } from "./ReportListItem";

export type ReportWithUser = Report & { createdByName: string | null };

export const MyReports = () => {
  const [page, setPage] = useState(0);

  const user = useUser()!;

  const reportsQuery = useDbQuery(
    db
      .selectFrom("report")
      .where("disabled", "=", 0)
      .where((eb) => eb.or([eb("createdBy", "=", user.id), eb("redactedById", "=", user.id)]))
      .limit(20)
      .offset(page * 20)
      .orderBy("meetDate desc")
      .orderBy("createdAt desc")
      .leftJoin("user", "user.id", "report.createdBy")
      .selectAll(["report"])
      .select(["user.name as createdByName"]),
  );

  const reports = reportsQuery.data;
  const reportsCountQuery = useDbQuery(
    db
      .selectFrom("report")
      .where("disabled", "=", 0)
      .where((eb) => eb.or([eb("createdBy", "=", user.id), eb("redactedById", "=", user.id)]))
      .select(db.fn.countAll().as("count")),
  );

  const reportsCount = reportsCountQuery.data?.[0]?.count as number;

  const hasError = reportsQuery.error || reportsCountQuery.error;
  const isLoading = reportsQuery.isLoading || reportsCountQuery.isLoading;

  if (hasError) {
    console.error(reportsQuery.error, reportsCountQuery.error);
    return <Center>Une erreur s'est produite</Center>;
  }

  if (isLoading) return null;

  return <ReportList reports={reports ?? []} setPage={setPage} count={reportsCount ?? 0} page={page} />;
};

export const AllReports = () => {
  const [page, setPage] = useState(0);
  const user = useUser()!;

  const reportsQuery = useDbQuery(
    db
      .selectFrom("report")
      .where("disabled", "=", 0)
      .where("report.udap_id", "=", user.udap_id)
      .limit(20)
      .offset(page * 20)
      .orderBy("createdAt desc")
      .leftJoin("user", "user.id", "report.createdBy")
      .selectAll(["report"])
      .select(["user.name as createdByName"]),
  );

  const reports = reportsQuery.data;
  const reportsCountQuery = useDbQuery(
    db
      .selectFrom("report")
      .where("disabled", "=", 0)
      .where("report.udap_id", "=", user.udap_id)
      .select(db.fn.countAll().as("count")),
  );

  const reportsCount = reportsCountQuery.data?.[0]?.count as number;

  const hasError = reportsQuery.error || reportsCountQuery.error;
  const isLoading = reportsQuery.isLoading || reportsCountQuery.isLoading;

  if (hasError) {
    console.error(reportsQuery.error, reportsCountQuery.error);
    return <Center>Une erreur s'est produite</Center>;
  }

  if (isLoading) return null;

  return <ReportList reports={reports ?? []} setPage={setPage} count={reportsCount ?? 0} page={page} />;
};

const NoReport = () => {
  return (
    <Center flexDirection="column" mt="66px" p="16px" color="text-title-blue-france" fontSize="26px">
      <Box lineHeight="36px">Bienvenue !</Box>
      <Box textAlign="center" lineHeight="36px">
        Pour commencer, créez votre premier compte-rendu ci-dessus.
      </Box>
      <Box component="img" src={welcomeImage} alt="Bienvenue" mt="46px" />
    </Center>
  );
};

export const ReportList = ({
  reports,
  page,
  setPage,
  count,
  hidePagination,
  onClick,
  hideEmpty,
}: {
  reports: ReportWithUser[];
  page?: number;
  setPage?: (page: number) => void;
  count?: number;
  hidePagination?: boolean;
  onClick?: () => void;
  hideEmpty?: boolean;
}) => {
  const error = reports.length === 0 ? <NoReport /> : null;
  const isDesktop = useIsDesktop();
  const columns = reports.length < 6 ? [reports] : chunk(reports, Math.ceil(reports.length / 2));

  return (
    <Stack component="div" width="100%" mt={{ base: "20px", lg: "30px" }}>
      {!hideEmpty && error ? (
        error
      ) : (
        <Stack gap={{ base: 0, lg: "126px" }} flexDirection={{ base: "column", lg: "row" }} justifyContent="center">
          {columns.slice(0, 2).map((reports, columnIndex) => {
            return (
              <Stack key={columnIndex} flexDirection="column" width={{ base: "100%", lg: "400px" }}>
                {reports.map((report, index) => (
                  <ReportListItem
                    onClick={onClick}
                    key={report.id}
                    report={report}
                    isLast={
                      isDesktop
                        ? index === reports.length - 1
                        : index === reports.length - 1 && columnIndex === columns.length - 1
                    }
                  />
                ))}
              </Stack>
            );
          })}
          {columns.length === 1 ? <Stack width="400px" /> : null}
        </Stack>
      )}
      <Center
        flexDirection={{ base: "column", lg: "row" }}
        width="100%"
        mt={{ base: "48px", lg: "85px" }}
        mb={{ base: "48px", lg: "110px" }}
      >
        {hidePagination || error ? null : (
          <>
            <Pagination
              count={count === 0 ? 0 : Math.ceil(count! / 20)}
              getPageLinkProps={(nb) => ({
                key: `page-${nb}`,
                onClick: () => setPage!(nb - 1),
              })}
              defaultPage={page! + 1}
            />
            <Button
              className={css({
                ml: { base: "0", lg: "80px" },
                mt: { base: "40px", lg: "0" },
                mb: "16px",
                "&::after": { display: "none !important" },
              })}
              priority="secondary"
              iconId="ri-chat-3-fill"
              linkProps={{
                target: "_blank",
                to: "https://adtk8x51mbw.eu.typeform.com/to/ejUj012R",
              }}
            >
              Je donne mon avis
            </Button>
          </>
        )}
      </Center>
    </Stack>
  );
};
