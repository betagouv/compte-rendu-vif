import { SimpleBanner } from "#components/Banner.tsx";
import { Flex } from "#components/ui/Flex.tsx";
import { Box, BoxProps, Stack, Typography } from "@mui/material";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { StateReport, StateReportAttachment, VisitedSection, VisitedSectionAttachment } from "../db/AppSchema";
import { attachmentStorage, db, getAttachmentUrl, useDbQuery } from "../db/db";
import { useQuery } from "@tanstack/react-query";
import { ConstatPdfContext, useConstatPdfContext } from "../features/state-report/pdf/ConstatPdfContext";
import { ViewConstatPdf } from "../features/state-report/pdf/ConstatPdf.view";
import { Button } from "#components/MUIDsfr.tsx";
import { TextEditorContext, TextEditorContextProvider } from "../features/text-editor/TextEditorContext";
import { EditConstatPdf } from "../features/state-report/pdf/ConstatPdf.edit";
import { TextEditorToolbar } from "../features/text-editor/TextEditorToolbar";
import { getStateReportHtmlString } from "@cr-vif/pdf/constat";

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

  const stateReportQuery = useQuery({
    queryKey: ["state-report-with-user-and-attachments", constatId],
    queryFn: async () => {
      const stateReportQuery = await db
        .selectFrom("state_report")
        .leftJoin("user", "user.id", "state_report.created_by")
        .selectAll(["state_report"])
        .select(["user.name as createdByName"])
        .where("state_report.id", "=", constatId)
        .limit(1)
        .execute();

      if (stateReportQuery.length === 0) {
        return null;
      }

      const attachmentQuery = await db
        .selectFrom("state_report_attachment")
        .selectAll()
        .where("state_report_id", "=", constatId)
        .execute();

      const attachmentsWithFiles = await Promise.all(
        attachmentQuery.map(async (attachment) => {
          const file = await getAttachmentUrl(attachment.id);
          return {
            ...attachment,
            file,
          };
        }),
      );

      return {
        ...stateReportQuery[0],
        attachments: attachmentsWithFiles,
      };
    },
    refetchOnWindowFocus: false,
  });

  useDbQuery(
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

  const sections = sectionsQuery.data;
  const stateReport = stateReportQuery.data;

  const isSetRef = useRef(false);
  const [localHtmlString, setLocalHtmlString] = useState<null | string>(null);

  useEffect(() => {
    if (isSetRef.current) return;
    if (!sections || !stateReport) return;

    const htmlString = getStateReportHtmlString({ stateReport: stateReport, visitedSections: sections });
    setLocalHtmlString(htmlString);
    isSetRef.current = true;
  }, [sections, stateReport]);

  const contextValue = {
    isLoading: stateReportQuery.isLoading || sectionsQuery.isLoading,
    stateReport: stateReport,
    sections: sections,
    localHtmlString,
    setLocalHtmlString,
  };

  return (
    <Stack>
      <ConstatPdfContext.Provider value={contextValue}>
        <TextEditorContextProvider>
          <BannerAndContent mode={mode} />
        </TextEditorContextProvider>
      </ConstatPdfContext.Provider>
    </Stack>
  );
};

type PageMode = "view" | "edit" | "send" | "sent";

const BannerAndContent = ({ mode }: { mode: PageMode }) => {
  const { bannerProps, Component } = contentMap[mode];
  return (
    <>
      <Banner {...bannerProps} />
      <Component />
    </>
  );
};

const contentMap: Record<PageMode, { bannerProps: BannerProps; Component: () => ReactNode }> = {
  view: {
    bannerProps: {
      content: () => "Prévisualisation du constat",
      buttons: () => {
        const navigate = useNavigate();
        const { constatId } = Route.useParams();
        return (
          <Flex>
            <Button
              priority="secondary"
              sx={{ bgcolor: "white" }}
              type="button"
              iconId="ri-pencil-line"
              nativeButtonProps={{
                onClick: () =>
                  navigate({ to: "/constat/$constatId/pdf", params: { constatId }, search: { mode: "edit" } }),
              }}
            >
              Modifier
            </Button>
          </Flex>
        );
      },
    },
    Component: ViewConstatPdf,
  },
  edit: {
    bannerProps: {
      content: () => "Modification du constat",
      buttons: () => {
        const { setLocalHtmlString } = useConstatPdfContext()!;
        const { editor } = useContext(TextEditorContext);
        const navigate = useNavigate();
        const { constatId } = Route.useParams();

        const onClick = () => {
          if (!editor) return;
          const htmlString = editor.getHTML();
          console.log(editor.getJSON());
          setLocalHtmlString(htmlString);
          console.log(htmlString);
          navigate({ to: "/constat/$constatId/pdf", params: { constatId }, search: { mode: "view" } });
        };

        return (
          <Flex gap="8px">
            <TextEditorToolbar />
            <Button
              type="button"
              sx={{
                display: { xs: "none", lg: "inline-flex" },
              }}
              iconId="ri-save-line"
              size="medium"
              onClick={onClick}
            >
              Enregistrer
            </Button>
          </Flex>
        );
      },
    },
    Component: EditConstatPdf,
  },
  send: {
    bannerProps: {
      content: () => "Envoi du constat",
      buttons: () => <Box>buttons</Box>,
    },
    Component: () => <Box>content</Box>,
  },
  sent: {
    bannerProps: {
      content: () => "Constat envoyé",
      buttons: () => <Box>buttons</Box>,
    },
    Component: () => <Box>content</Box>,
  },
};

type BannerProps = { content: () => ReactNode; buttons: () => ReactNode };
const Banner = ({ content, buttons }: BannerProps) => {
  return (
    <SimpleBanner height="80px" position="sticky" top="0" zIndex="appBar">
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
