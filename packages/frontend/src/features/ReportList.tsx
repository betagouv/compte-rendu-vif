import { Center, Divider, Flex, Grid, Stack, styled } from "#styled-system/jsx";
import { flex } from "#styled-system/patterns";
import { useUser } from "../contexts/AuthContext";
import { db, useDbQuery } from "../db/db";
import Button from "@codegouvfr/react-dsfr/Button";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { css, cx } from "#styled-system/css";
import { Link } from "@tanstack/react-router";
import { Popover } from "#components/Popover";
import { useClickAway } from "react-use";
import { useRef, useState } from "react";
import { PopoverTrigger } from "@ark-ui/react/popover";
import { ReportActions } from "./ReportActions";
import { Pagination } from "@codegouvfr/react-dsfr/Pagination";
import welcomeImage from "../assets/welcome.svg";
import { useIsDesktop } from "../hooks/useIsDesktop";
import { chunk, makeArrayOf } from "pastable";
import { Report } from "../db/AppSchema";

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
      .where("udap_id", "=", user.udap_id)
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
      .where("udap_id", "=", user.udap_id)
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
    <Center flexDir="column" mt="66px" p="16px" color="text-title-blue-france" fontSize="26px">
      <styled.div lineHeight="36px">Bienvenue !</styled.div>
      <styled.div textAlign="center" lineHeight="36px">
        Pour commencer, créez votre premier compte-rendu ci-dessus.
      </styled.div>
      <styled.img src={welcomeImage} alt="Bienvenue" mt="46px" />
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

  const columns = reports.length < 6 ? [reports] : chunk(reports, Math.ceil(reports.length / 2));

  return (
    <Stack w="100%" mt={{ base: "20px", lg: "30px" }}>
      {!hideEmpty && error ? (
        error
      ) : (
        <Stack gap={{ base: 0, lg: "126px" }} flexDir={{ base: "column", lg: "row" }} justifyContent="center">
          {columns.slice(0, 2).map((reports, index) => {
            return (
              <Stack key={index} flexDir="column" w={{ base: "100%", lg: "400px" }}>
                {reports.map((report, index) => (
                  <ReportListItem
                    onClick={onClick}
                    key={report.id}
                    report={report}
                    isLast={index === reports.length - 1}
                  />
                ))}
              </Stack>
            );
          })}
          {columns.length === 1 ? <Stack w="400px" /> : null}
        </Stack>
      )}
      <Center w="100%" mt="85px" mb="110px">
        {hidePagination || error ? null : (
          <Pagination
            count={count === 0 ? 0 : Math.ceil(count! / 20)}
            getPageLinkProps={(nb) => ({
              key: `page-${nb}`,
              onClick: () => setPage!(nb - 1),
            })}
            defaultPage={page! + 1}
          />
        )}
      </Center>
    </Stack>
  );
};

const ReportListItem = ({
  report,
  isLast,
  onClick,
}: {
  report: ReportWithUser;
  isLast?: boolean;
  onClick?: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);

  const menuProps = {
    report,
    onClose: (e: Event) => {
      if (e.target !== ref.current) setIsOpen(false);
    },
  };

  const whereText = report.city ? `à ${report.city}` : null;
  const forText = report.applicantName ? uppercaseFirstLetterIf(`pour ${report.applicantName}`, !whereText) : null;
  const byText = uppercaseFirstLetterIf(
    `par ${report.redactedBy ?? report.createdByName ?? ""}`,
    !whereText && !forText,
  );

  return (
    <Flex position="relative" direction="column" w="100%">
      <Link
        className={css({
          backgroundImage: "none",
          "&:active": {
            backgroundColor: "initial !important",
          },
        })}
        onClick={onClick}
        to={"/edit/$reportId"}
        params={{ reportId: report.id }}
      >
        <article
          className={flex({
            flexDirection: "column",
            mr: "52px",
            color: "text-action-high-blue-france",
            fontSize: "16px",
          })}
        >
          <Flex>
            <styled.span fontWeight="bold" nowrap>
              {report.title ?? "Sans titre"}
            </styled.span>
            {report.meetDate ? (
              <styled.span ml={"5px"}>{new Date(report.meetDate).toLocaleDateString()}</styled.span>
            ) : null}
          </Flex>
          <styled.div nowrap>{whereText}</styled.div>
          <styled.div nowrap>{forText}</styled.div>
          <styled.div nowrap>{byText}</styled.div>
          <styled.div mt="8px">
            <ReportBadge status={report.pdf ? "published" : "draft"} />
          </styled.div>
        </article>
      </Link>
      <styled.div position="absolute" top="10px" right="10px">
        <Popover.Root open={isOpen} positioning={{ placement: "left-start" }}>
          <PopoverTrigger asChild>
            <Button
              ref={ref as any}
              className={css({
                borderRadius: "50%",
                width: "32px",
                minWidth: "32px",
                maxWidth: "32px",
                height: "32px",
                minHeight: "32px",
                maxHeight: "32px",
              })}
              onClick={() => setIsOpen((prev) => !prev)}
              iconId="ri-more-fill"
              title="Actions"
              size="small"
              priority="secondary"
              type="button"
            />
          </PopoverTrigger>
          <Popover.Positioner hideBelow="lg">
            <MenuDesktopPopover {...menuProps} />
          </Popover.Positioner>
        </Popover.Root>
      </styled.div>
      {isOpen ? <MenuMobileModal {...menuProps} /> : null}
      {isLast ? null : <Divider mt="16px" mb="8px" />}
    </Flex>
  );
};

const uppercaseFirstLetterIf = (str: string, condition: boolean) => {
  return condition ? str.charAt(0).toUpperCase() + str.slice(1) : str;
};

const MenuDesktopPopover = ({ onClose, report }: MenuProps) => {
  const isDesktop = useIsDesktop();
  const ref = useRef<HTMLDivElement>(null);
  useClickAway(ref, (e) => isDesktop && onClose(e));

  return (
    <Popover.Content>
      <ReportActions ref={ref} report={report} />
    </Popover.Content>
  );
};

const MenuMobileModal = ({ onClose, report }: MenuProps) => {
  const isDesktop = useIsDesktop();
  const ref = useRef<HTMLDivElement>(null);

  useClickAway(ref, (e) => !isDesktop && onClose(e));

  return (
    <styled.div hideFrom="lg" zIndex="modal" pos="fixed" top="0" left="0" right="0" bottom="0" bgColor="rgba(0,0,0,.8)">
      <styled.div ref={ref} position="absolute" left="0" right="0" bottom="0" bgColor="white">
        <ReportActions report={report} />
      </styled.div>
    </styled.div>
  );
};

type MenuProps = { onClose: (e: Event) => void; report: Report };

type ReportStatus = "draft" | "published";
const ReportBadge = ({ status }: { status: ReportStatus }) => {
  return (
    <Badge
      className={css({ display: "flex", alignItems: "center" })}
      severity={status === "draft" ? "info" : "success"}
      noIcon
      small
      style={{
        backgroundColor: colors[status][1],
        color: colors[status][0],
      }}
    >
      <styled.span
        className={cx(
          icons[status],
          css({ "&::before": { w: "12px !important", h: "12px !important", verticalAlign: "middle !important" } }),
        )}
      />
      <styled.span ml="4px">{status === "draft" ? "Brouillon" : "Envoyé"}</styled.span>
    </Badge>
  );
};

const icons: Record<ReportStatus, string> = {
  draft: "ri-timer-fill",
  published: "ri-send-plane-fill",
};

const colors: Record<ReportStatus, [string, string]> = {
  draft: ["#716043", "#FEECC2"] as const,
  published: ["#18753C", "#D1F1D9"] as const,
};
