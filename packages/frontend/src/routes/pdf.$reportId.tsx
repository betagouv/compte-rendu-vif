import { Center, Flex, Stack, styled } from "#styled-system/jsx";
import type { Report, Udap } from "@cr-vif/electric-client/frontend";
import { ReportPDFDocument, getReportHtmlString } from "@cr-vif/pdf";
import { useUser } from "../contexts/AuthContext";
import { useChipOptions } from "../features/chips/useChipOptions";
import { PDFViewer } from "@react-pdf/renderer";
import Button from "@codegouvfr/react-dsfr/Button";
import { Link, createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { EnsureUser } from "#components/EnsureUser.js";
import { useMutation, useQuery } from "@tanstack/react-query";
import { db } from "../db";
import { ReactNode, useContext, useEffect, useState } from "react";
import { TextEditor, useTextEditor } from "../features/text-editor/TextEditor";
import { Banner } from "#components/Banner.js";
import { css } from "#styled-system/css";
import { Editor } from "@tiptap/react";
import { TextEditorToolbar } from "../features/text-editor/TextEditorToolbar";
import { TextEditorContext, TextEditorContextProvider } from "../features/text-editor/TextEditorContext";
import { api } from "../api";
import { downloadFile } from "../utils";

export const PDF = () => {
  const { udap } = useUser()!;
  const chipOptions = useChipOptions();

  const { reportId } = Route.useParams();
  const { mode } = Route.useSearch();

  const navigate = useNavigate();

  const toggleMode = () => {
    navigate({ search: { mode: mode === "edit" ? "view" : "edit" }, replace: true });
  };
  const onDownload = () => {};

  const reportQuery = useQuery({
    queryKey: ["report", reportId],
    queryFn: () => db.report.findUnique({ where: { id: reportId }, include: { user: true } }),
  });

  const report = reportQuery.data;

  const EditButtons = () => {
    return (
      <Stack gap="5px" flexDir="row" alignItems="center">
        <TextEditorToolbar />
        <Button iconId="ri-save-line" onClick={() => toggleMode()}>
          Enregistrer
        </Button>
      </Stack>
    );
  };

  const ViewButtons = () => {
    return (
      <Center gap="10px" direction="row">
        <Button className={css({ bgColor: "white" })} iconId="ri-pencil-line" priority="secondary" onClick={toggleMode}>
          Modifier
        </Button>
        {/* TODO: replace with "Envoyer" */}
        <DownloadButton />
      </Center>
    );
  };

  return (
    <styled.div w="100%" h="100%" bgColor={mode === "edit" ? "background-open-blue-france" : "unset"} overflowY="auto">
      <TextEditorContextProvider>
        <EditBanner
          title={
            <div>
              <styled.span fontWeight="bold">{mode === "edit" ? "Modification" : "Prévisualisation"}</styled.span>
              {report?.title ? ` | ${report?.title}` : ""}
            </div>
          }
          buttons={mode === "edit" ? <EditButtons /> : <ViewButtons />}
        />
        <Center w="100%" h="100%" maxH="100%" mt="10px" overflowY="auto">
          <Stack w="800px" h="100%">
            {report && chipOptions ? (
              <WithReport
                mode={mode as "edit" | "view"}
                initialHtmlString={getReportHtmlString(report, chipOptions, udap as Udap)}
              />
            ) : null}
          </Stack>
        </Center>
      </TextEditorContextProvider>
    </styled.div>
  );
};

const DownloadButton = () => {
  const { reportId } = Route.useParams();
  const editor = useContext(TextEditorContext).editor!;

  const generatePdfMutation = useMutation(async (htmlString: string) => {
    const url = await api.post("/api/pdf/report", { body: { reportId, htmlString } });
    downloadFile(url);
  });

  return (
    <Button
      type="button"
      disabled={generatePdfMutation.isLoading}
      onClick={() => generatePdfMutation.mutate(editor?.getHTML() ?? "")}
      iconId="ri-download-line"
    >
      Télécharger
    </Button>
  );
};

const EditBanner = ({ title, buttons }: { title: ReactNode; buttons: ReactNode }) => {
  const router = useRouter();
  const goBack = () => router.history.back();

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
              e.stopPropagation();

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

export const WithReport = ({ initialHtmlString, mode }: { initialHtmlString: string; mode: "edit" | "view" }) => {
  const { editor } = useContext(TextEditorContext);
  const [htmlString] = useState(initialHtmlString);

  useEffect(() => {
    if (!editor) return;

    editor.commands.setContent(htmlString);
  }, [editor]);

  const { udap } = useUser()!;

  if (mode === "view")
    return (
      <PDFViewer showToolbar={false} width={"100%"} height={"800px"}>
        <ReportPDFDocument
          udap={udap as Udap}
          htmlString={editor?.getHTML() ?? ""}
          images={{ header: "/pdf_header.png" }}
        />
      </PDFViewer>
    );

  return <TextEditor />;
};

export const Route = createFileRoute("/pdf/$reportId")({
  component: () => (
    <EnsureUser>
      <PDF />
    </EnsureUser>
  ),
  validateSearch: (search: Record<string, unknown>) => {
    const mode = search?.mode as string;
    const isModeValid = ["view", "edit"].includes(mode);

    return {
      mode: isModeValid ? mode : "view",
    } as { mode?: string };
  },
});

declare global {
  var editor: Editor;
}
