import { Center, Flex, Stack, styled } from "#styled-system/jsx";
import type { Report, Udap } from "@cr-vif/electric-client/frontend";
import { ReportPDFDocument, getReportHtmlString } from "@cr-vif/pdf";
import { useUser } from "../contexts/AuthContext";
import { useChipOptions } from "../features/chips/useChipOptions";
import { PDFViewer } from "@react-pdf/renderer";
import Button from "@codegouvfr/react-dsfr/Button";
import { Link, Navigate, createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { EnsureUser } from "#components/EnsureUser.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { db } from "../db";
import { PropsWithChildren, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { TextEditor, useTextEditor } from "../features/text-editor/TextEditor";
import { Banner } from "#components/Banner.js";
import { css } from "#styled-system/css";
import { Editor } from "@tiptap/react";
import { TextEditorToolbar } from "../features/text-editor/TextEditorToolbar";
import { TextEditorContext, TextEditorContextProvider } from "../features/text-editor/TextEditorContext";
import { api } from "../api";
import { downloadFile } from "../utils";
import { useLiveQuery } from "electric-sql/react";
import Input from "@codegouvfr/react-dsfr/Input";
import { FormProvider, useForm, useFormContext } from "react-hook-form";

type Mode = "edit" | "view" | "send";

export const PDF = () => {
  const { udap } = useUser()!;
  const chipOptions = useChipOptions();

  const { reportId } = Route.useParams();
  const { mode } = Route.useSearch();

  const navigate = useNavigate();
  const toggleMode = () => {
    navigate({ search: { mode: mode === "edit" ? "view" : "edit" }, replace: true });
  };

  const reportQuery = useLiveQuery(db.report.liveUnique({ where: { id: reportId }, include: { user: true } }));
  const reportRef = useRef<Report | null>(null);

  if (!reportRef.current && reportQuery.results) {
    reportRef.current = reportQuery.results;
  }

  const report = reportRef.current;

  const EditButtons = () => {
    return (
      <Stack gap="5px" flexDir="row" alignItems="center">
        <TextEditorToolbar />
        <Button type="button" iconId="ri-save-line" size="small" onClick={() => toggleMode()}>
          Enregistrer
        </Button>
      </Stack>
    );
  };

  const ViewButtons = () => {
    return (
      <Center gap="10px" direction="row">
        <Button
          className={css({ bgColor: "white" })}
          type="button"
          iconId="ri-pencil-line"
          priority="secondary"
          onClick={toggleMode}
        >
          Modifier
        </Button>
        <DownloadButton />
      </Center>
    );
  };

  const SendButtons = () => {
    return (
      <Center gap="10px" direction="row">
        <Button iconId="ri-send-plane-fill" type="submit">
          Envoyer
        </Button>
      </Center>
    );
  };

  const buttons = mode === "edit" ? <EditButtons /> : mode === "view" ? <ViewButtons /> : <SendButtons />;

  return (
    <styled.div w="100%" h="100%" bgColor={mode === "edit" ? "background-open-blue-france" : "unset"} overflowY="auto">
      <TextEditorContextProvider>
        <SendForm reportId={reportId}>
          <EditBanner
            title={
              <div>
                <styled.span fontWeight="bold">{getModeTitle(mode)}</styled.span>
                {report?.title ? ` | ${report?.title}` : ""}
              </div>
            }
            reportId={report?.id}
            buttons={buttons}
          />
          <Center w="100%" h="100%" maxH="100%" mt="10px" overflowY="auto">
            <Stack w="800px" h="100%">
              {report && chipOptions?.length ? (
                <WithReport mode={mode} initialHtmlString={getReportHtmlString(report, chipOptions, udap as Udap)} />
              ) : null}
            </Stack>
          </Center>
        </SendForm>
      </TextEditorContextProvider>
    </styled.div>
  );
};

const SendForm = ({ children, reportId }: PropsWithChildren<{ reportId: string }>) => {
  const { editor } = useContext(TextEditorContext);

  const form = useForm({ defaultValues: { recipients: "" } });
  const navigate = useNavigate();
  const generatePdfMutation = useMutation(
    async ({ htmlString, recipients }: { htmlString: string; recipients: string }) => {
      await api.post("/api/pdf/report", { body: { reportId, htmlString, recipients } });
      // downloadFile(url);
    },
    {
      onSuccess: () => {
        navigate({ search: { mode: "send" } });
      },
    },
  );

  const send = (values: { recipients: string }) => {
    const recipients = values.recipients.split(/,|\s/).filter(Boolean).join(",");

    generatePdfMutation.mutate({ htmlString: editor?.getHTML() ?? "", recipients });
  };

  return (
    <form onSubmit={form.handleSubmit(send)}>
      <FormProvider {...form}>{children}</FormProvider>
    </form>
  );
};

const getModeTitle = (mode: Mode) => {
  switch (mode) {
    case "edit":
      return "Modification";
    case "view":
      return "Prévisualisation";
    case "send":
      return "Envoi";
  }
};

const DownloadButton = () => {
  const navigate = useNavigate();

  return (
    <Button type="button" onClick={() => navigate({ search: { mode: "send" } })} iconId="ri-send-plane-fill">
      Envoyer
    </Button>
  );
};

const EditBanner = ({ title, buttons, reportId }: { title: ReactNode; buttons: ReactNode; reportId?: string }) => {
  const router = useRouter();
  const navigate = useNavigate();
  const goBack = () =>
    reportId
      ? navigate({ to: "/edit/$reportId", params: { reportId }, search: { tab: "notes" } })
      : router.history.back();

  return (
    <Banner status="saved" flexDir="row">
      <Flex direction="row" justifyContent={"space-between"} alignItems="center" w="1000px" h="header-height">
        <Flex direction="row" alignItems="center">
          {/* <Link onClick={goBack}></Link> */}
          <styled.a
            className={"ri-arrow-left-line"}
            href={""}
            onClick={(e) => {
              e.preventDefault();

              goBack();
            }}
            fontSize="15px"
          >
            Retour
          </styled.a>
          <styled.div ml={{ base: "0", lg: "50px" }} nowrap>
            {title}
          </styled.div>
        </Flex>
        <Flex direction="row">{buttons}</Flex>
      </Flex>
    </Banner>
  );
};

export const WithReport = ({ initialHtmlString, mode }: { initialHtmlString: string; mode: Mode }) => {
  const { editor } = useContext(TextEditorContext);
  const [htmlString] = useState(initialHtmlString);

  useEffect(() => {
    if (!editor) return;

    editor.commands.setContent(htmlString);
  }, [editor]);

  const { udap } = useUser()!;

  const View = (
    <PDFViewer showToolbar={false} width={"100%"} height={"800px"}>
      <ReportPDFDocument
        udap={udap as Udap}
        htmlString={editor?.getHTML() ?? ""}
        images={{ header: "/pdf_header.png" }}
      />
    </PDFViewer>
  );

  if (mode === "view") return View;

  if (mode === "send") {
    return (
      <SendReportPage>
        <styled.div mt="16px">{View}</styled.div>
      </SendReportPage>
    );
  }

  return <TextEditor />;
};

const SendReportPage = ({ children }: PropsWithChildren) => {
  const { reportId } = Route.useParams();
  const reportQuery = useLiveQuery(db.report.liveUnique({ where: { id: reportId } }));

  const form = useFormContext();

  const isLoading = !reportQuery.updatedAt;
  if (isLoading) return null;

  const report = reportQuery.results;

  if (!report) return <div>Report not found</div>;
  if (!report.pdf) return <Navigate to="/pdf/$reportId" params={{ reportId }} search={{ mode: "view" }} />;

  return (
    <Center>
      <Flex flexDirection="column" w={{ base: "100%", lg: "800px" }}>
        <Input
          className={css({ mt: "16px" })}
          label="Destinataires"
          hintText="Liste de courriels, séparés par des virgules ou des espaces"
          textArea
          nativeTextAreaProps={{
            ...form.register("recipients"),
            rows: 4,
          }}
        />

        {children}
      </Flex>
    </Center>
  );
};

const validateEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Route = createFileRoute("/pdf/$reportId")({
  component: () => (
    <EnsureUser>
      <PDF />
    </EnsureUser>
  ),
  validateSearch: (search: Record<string, unknown>) => {
    const mode = search?.mode as Mode;
    const isModeValid = ["view", "edit", "send"].includes(mode);

    return {
      mode: isModeValid ? mode : "view",
    } as { mode: Mode };
  },
});

declare global {
  var editor: Editor;
}
