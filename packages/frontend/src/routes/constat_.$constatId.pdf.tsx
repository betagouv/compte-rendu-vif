import { SimpleBanner } from "#components/Banner.tsx";
import { Flex } from "#components/ui/Flex.tsx";
import { Box, BoxProps, Stack, Typography } from "@mui/material";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { createContext, ReactNode, useContext } from "react";
import { StateReport, VisitedSection, VisitedSectionAttachment } from "../db/AppSchema";
import { attachmentStorage, db, getAttachmentUrl, useDbQuery } from "../db/db";
import { useQuery } from "@tanstack/react-query";
import { ConstatPdfContext, useConstatPdfContext } from "../features/state-report/pdf/ConstatPdfContext";
import { ViewConstatPdf } from "../features/state-report/pdf/ConstatPdf.view";

export const Route = createFileRoute("/constat_/$constatId/pdf")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>) => {
    const mode = search?.mode as PageMode;
    const isModeValid = ["view", "edit", "send", "sent"].includes(mode);

    return {
      mode: isModeValid ? mode : "view",
    } as { mode: PageMode };
  },
});

function RouteComponent() {
  return <ConstatPdf />;
}

const ConstatPdf = () => {
  const { constatId } = Route.useParams();
  const { mode } = Route.useSearch();

  const stateReportQuery = useDbQuery(
    db
      .selectFrom("state_report")
      .leftJoin("user", "user.id", "state_report.created_by")
      .selectAll(["state_report"])
      .select(["user.name as createdByName"])
      .where("state_report.id", "=", constatId)
      .limit(1),
    [constatId],
    { runQueryOnce: true },
  );

  const sectionsQuery = useQuery({
    queryKey: ["visited-sections", constatId],
    queryFn: async () => {
      const visitedSections = await db
        .selectFrom("visited_section")
        .selectAll()
        .where("state_report_id", "=", constatId)
        .execute();

      const visitedSectionAttachments = await db
        .selectFrom("visited_section_attachment")
        .selectAll()
        .where(
          "visited_section_id",
          "in",
          visitedSections.map((vs) => vs.id),
        )
        .execute();

      const attachments = await Promise.all(
        visitedSectionAttachments.map(async (attachment) => {
          const file = await getAttachmentUrl(attachment.id);
          return {
            ...attachment,
            file,
          };
        }),
      );

      return visitedSections.map((section) => ({
        ...section,
        attachments: attachments.filter((att) => att.visited_section_id === section.id),
      }));
    },
    refetchOnWindowFocus: false,
  });

  console.log("sectionsQuery.data", sectionsQuery.data);

  const contextValue = {
    isLoading: stateReportQuery.isLoading || sectionsQuery.isLoading,
    stateReport: stateReportQuery.data?.[0],
    sections: sectionsQuery.data,
  };

  return (
    <Stack>
      <ConstatPdfContext.Provider value={contextValue}>
        <BannerAndContent mode={mode} />
      </ConstatPdfContext.Provider>
    </Stack>
  );
};

type PageMode = "view" | "edit" | "send" | "sent";

const BannerAndContent = ({ mode }: { mode: PageMode }) => {
  const { bannerProps, component } = contentMap[mode];
  return (
    <>
      <Banner {...bannerProps} />
      {component()}
    </>
  );
};

const contentMap: Record<PageMode, { bannerProps: BannerProps; component: () => ReactNode }> = {
  view: {
    bannerProps: {
      content: () => "Prévisualisation du constat",
      buttons: () => <Box>buttons</Box>,
    },
    component: ViewConstatPdf,
  },
  edit: {
    bannerProps: {
      content: () => "Édition du constat",
      buttons: () => <Box>buttons</Box>,
    },
    component: () => <Box>content</Box>,
  },
  send: {
    bannerProps: {
      content: () => "Envoi du constat",
      buttons: () => <Box>buttons</Box>,
    },
    component: () => <Box>content</Box>,
  },
  sent: {
    bannerProps: {
      content: () => "Constat envoyé",
      buttons: () => <Box>buttons</Box>,
    },
    component: () => <Box>content</Box>,
  },
};

type BannerProps = { content: () => ReactNode; buttons: () => ReactNode };
const Banner = ({ content, buttons }: BannerProps) => {
  return (
    <SimpleBanner height="80px">
      <Flex
        alignItems="center"
        maxWidth="1200px"
        width="100%"
        flexDirection={{ xs: "column", lg: "row" }}
        gap={{ xs: "8px", lg: "0" }}
      >
        <Flex justifyContent="flex-start" width="100%" pl="8px">
          <GoBackButton />
          <Box ml={{ xs: "8px", lg: "50px" }} flex="1" fontWeight="bold">
            {content()}
          </Box>
        </Flex>
        <Box>{buttons()}</Box>
      </Flex>
    </SimpleBanner>
  );
};

const GoBackButton = () => {
  const { constatId } = Route.useParams();
  const navigate = useNavigate();
  const goBack = () => {
    navigate({ to: "/constat/$constatId", params: { constatId }, search: { step: "constat-detaille" } });
  };

  return (
    <Box
      className={"ri-arrow-left-line"}
      component="a"
      href={""}
      onClick={(e) => {
        e.preventDefault();
        goBack();
      }}
      sx={{
        "::before": {
          width: "16px !important",
          mr: "4px",
        },
      }}
      fontSize="16px"
      whiteSpace="nowrap"
    >
      <Typography display={{ xs: "none", lg: "inline" }} component="span">
        Retour
      </Typography>
    </Box>
  );
};
