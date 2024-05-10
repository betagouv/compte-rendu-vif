import { Center, Divider, Flex, Grid, Stack, styled } from "#styled-system/jsx";
import { flex } from "#styled-system/patterns";
import { useLiveQuery } from "electric-sql/react";
import { useUser } from "../contexts/AuthContext";
import type { Report } from "@cr-vif/electric-client/frontend";
import { db } from "../db";
import Button from "@codegouvfr/react-dsfr/Button";
import Badge from "@codegouvfr/react-dsfr/Badge";
import { css } from "#styled-system/css";
import { Link } from "@tanstack/react-router";
import { Popover } from "#components/Popover";
import { useClickAway, useMedia } from "react-use";
import { token } from "#styled-system/tokens";
import { useRef, useState } from "react";
import { PopoverTrigger } from "@ark-ui/react/popover";
import { ReportActions } from "./ReportActions";

export type ReportWithUser = Report & { user?: { email: string; name: string } };

export const MyReports = () => {
  const user = useUser()!;
  const myReports = useLiveQuery(
    db.report.liveMany({
      where: { createdBy: user.id },
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

  if (myReports.error) {
    console.error(myReports.error);
    return <Center>Une erreur s'est produite</Center>;
  }

  return <ReportList reports={myReports.results ?? []} />;
};

export const AllReports = () => {
  const user = useUser()!;
  const allReports = useLiveQuery(
    db.report.liveMany({
      where: { createdBy: user.id },
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

  return <ReportList reports={allReports.results ?? []} />;
};

export const ReportList = ({ reports }: { reports: ReportWithUser[] }) => {
  const error = reports.length === 0 ? <Center>Aucun compte-rendu</Center> : null;

  return (
    <Grid
      className={css({
        "& > *:nth-child(-n+10)": {
          gridColumn: {
            base: "0",
            lg: "1",
          },
        },
      })}
      gap="8px 28px"
      gridTemplateRows={{ base: "repeat(20, 1fr)", lg: "repeat(10, 1fr)" }}
      gridAutoFlow="column"
      w="100%"
    >
      {error ??
        reports.map((report, index) => (
          <ReportListItem key={report.id} report={report} isLast={index === reports.length - 1} />
        ))}
    </Grid>
  );
};

const ReportListItem = ({ report, isLast }: { report: ReportWithUser; isLast?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLAnchorElement>(null);

  const menuProps = {
    createdBy: report.createdBy,
    onClose: (e: Event) => {
      console.log(e);
      if (e.target !== ref.current) setIsOpen(false);
    },
  };

  return (
    <Flex position="relative" direction="column" w="400px">
      <Link
        className={css({
          backgroundImage: "none",
          "&:active": {
            backgroundColor: "initial !important",
          },
        })}
        to={"/edit/$reportId"}
        params={{ reportId: report.id }}
      >
        <article
          className={flex({
            flexDirection: "column",
            color: "text-action-high-blue-france",
            fontSize: "16px",
          })}
        >
          <Flex>
            <styled.span fontWeight="bold">{report.title}</styled.span>
            <styled.span ml="5px">{report.createdAt.toLocaleDateString()}</styled.span>
          </Flex>
          <styled.span>Rédigé par {report.user?.name ?? ""}</styled.span>
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
              className={css({ borderRadius: "50%" })}
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

const useIsDesktop = () => {
  return useMedia(`(min-width: ${token("breakpoints.lg")})`);
};

const MenuDesktopPopover = ({ onClose, createdBy }: MenuProps) => {
  const isDesktop = useIsDesktop();
  const ref = useRef<HTMLDivElement>(null);
  useClickAway(ref, (e) => isDesktop && onClose(e));

  return (
    <Popover.Content>
      <ReportActions ref={ref} createdBy={createdBy} />
    </Popover.Content>
  );
};

const MenuMobileModal = ({ onClose, createdBy }: MenuProps) => {
  const isDesktop = useIsDesktop();
  const ref = useRef<HTMLDivElement>(null);

  useClickAway(ref, (e) => !isDesktop && onClose(e));

  return (
    <styled.div hideFrom="lg" zIndex="modal" pos="fixed" top="0" left="0" right="0" bottom="0" bgColor="rgba(0,0,0,.8)">
      <styled.div ref={ref} position="absolute" left="0" right="0" bottom="0" bgColor="white">
        <ReportActions createdBy={createdBy} />
      </styled.div>
    </styled.div>
  );
};

type MenuProps = { onClose: (e: Event) => void; createdBy: Report["createdBy"] };

type ReportStatus = "draft" | "published";
const ReportBadge = ({ status }: { status: ReportStatus }) => {
  return (
    <Badge severity={status === "draft" ? "info" : "success"}>{status === "draft" ? "Brouillon" : "Envoyé"}</Badge>
  );
};
