import "@ungap/with-resolvers";
import { Banner } from "#components/Banner.js";
import { EnsureUser } from "#components/EnsureUser.js";
import { Spinner } from "#components/Spinner";
import { css, cx } from "#styled-system/css";
import { Center, Flex, Stack, styled } from "#styled-system/jsx";
import Button from "@codegouvfr/react-dsfr/Button";
import Input from "@codegouvfr/react-dsfr/Input";
import type { Report, Service_instructeurs, Udap } from "@cr-vif/electric-client/frontend";
import { ReportPDFDocument, ReportPDFDocumentProps, getReportHtmlString } from "@cr-vif/pdf";
import { usePdf } from "@mikecousins/react-pdf";
import { pdf } from "@react-pdf/renderer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { Editor } from "@tiptap/react";
import { useLiveQuery } from "electric-sql/react";
import { makeArrayOf } from "pastable";
import { PropsWithChildren, ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { api } from "../api";
import sentImage from "../assets/sent.svg";
import { useUser } from "../contexts/AuthContext";
import { db } from "../db";
import { useChipOptions } from "../features/chips/useChipOptions";
import { TextEditor } from "../features/text-editor/TextEditor";
import { TextEditorContext, TextEditorContextProvider } from "../features/text-editor/TextEditorContext";
import { TextEditorToolbar } from "../features/text-editor/TextEditorToolbar";
import { getDiff } from "../components/SyncForm";
import { v4 } from "uuid";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { fr } from "@codegouvfr/react-dsfr";
import { transformBold } from "../features/menu/ClauseMenu";
import { Pictures } from "../../../electric-client/src/generated/client/index";

type Mode = "edit" | "view" | "send" | "sent";

export const PDF = () => {
  const user = useUser()!;
  const { udap } = user;
  const chipOptions = useChipOptions();

  const { reportId } = Route.useParams();
  const { mode } = Route.useSearch();

  const navigate = useNavigate();
  const generatePdfMutation = useMutation(
    async ({ htmlString, recipients }: { htmlString: string; recipients: string }) => {
      await api.post("/api/pdf/report", { body: { reportId, htmlString, recipients } });
      // downloadFile(url);
    },
    {
      onSuccess: () => {
        navigate({ search: { mode: "sent" } });
      },
    },
  );

  const toggleMode = () => {
    navigate({ search: { mode: mode === "edit" ? "view" : "edit" }, replace: true });
  };

  const reportQuery = useLiveQuery(
    db.report.liveUnique({ where: { id: reportId }, include: { user: true, pictures: true } }),
  );
  const reportRef = useRef<(Report & { pictures?: Pictures[] }) | null>(null);

  const snapshotQuery = useQuery({
    queryKey: ["report-snapshot", reportId],
    queryFn: async () => {
      const snapshot = await db.pdf_snapshot.findFirst({ where: { report_id: reportId } });
      if (!snapshot || !snapshot.report) return null;

      try {
        const snapshotReport = JSON.parse(snapshot.report);
        const diff = getDiff(snapshotReport, {
          ...reportQuery.results!,
          createdAt: reportQuery.results!.createdAt?.toISOString(),
          meetDate: reportQuery.results!.meetDate?.toISOString(),
        });

        if (Object.keys(diff).length) return null;

        return snapshot.html!;
      } catch (e) {
        return null;
      }
    },
    enabled: !!reportQuery.results,
  });

  const serviceInstructeurQuery = useLiveQuery(
    db.service_instructeurs.liveUnique({ where: { id: reportQuery.results?.serviceInstructeur ?? undefined } }),
  );
  const serviceInstructeur = serviceInstructeurQuery.results;
  const isServiceInstructeurLoaded = reportQuery.results?.serviceInstructeur ? !!serviceInstructeur : true;

  if (!reportRef.current && reportQuery.results) {
    reportRef.current = reportQuery.results;
  }

  const report = reportRef.current;
  const htmlString = snapshotQuery.data;

  const saveSnapshotMutation = useMutation(
    async ({ report, html }: { report: string; html: string }) => {
      await db.pdf_snapshot.deleteMany({
        where: { report_id: reportId, user_id: user.id },
      });
      await db.pdf_snapshot.create({
        data: {
          id: v4(),
          report_id: reportId,
          report,
          html,
          user_id: user.id,
        },
      });
    },
    { onSuccess: () => toggleMode() },
  );

  const EditButtons = () => {
    const { editor } = useContext(TextEditorContext);

    return (
      <Stack gap="5px" flexDir="row" alignItems="center">
        <TextEditorToolbar />
        <Button
          type="button"
          iconId="ri-save-line"
          size="medium"
          onClick={() =>
            saveSnapshotMutation.mutate({
              report: JSON.stringify(report),
              html: editor?.getHTML() ?? "",
            })
          }
        >
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
        <Button iconId="ri-send-plane-fill" type="submit" disabled={generatePdfMutation.isLoading}>
          Envoyer
        </Button>
      </Center>
    );
  };

  const buttons = mode === "edit" ? <EditButtons /> : mode === "view" ? <ViewButtons /> : <SendButtons />;

  if (mode === "sent") {
    return (
      <Center flexDir="column" w="100%" mt="24px">
        <styled.img src={sentImage} alt="Courriel envoyé" width={{ base: "80px", lg: "120px" }} mt="100px" />
        <styled.div mt="16px" color="text-title-blue-france" textAlign="center" fontSize={{ base: "18px", lg: "24px" }}>
          Votre compte-rendu a bien été envoyé !
        </styled.div>
        <Button
          className={css({ mt: { base: "24px", lg: "48px" } })}
          type="button"
          onClick={() => navigate({ to: "/" })}
        >
          Accueil
        </Button>
      </Center>
    );
  }

  return (
    <styled.div w="100%" h="100%" bgColor={mode === "edit" ? "background-open-blue-france" : "unset"}>
      <Flex justifyContent="center" py="16px" px="32px" bgColor={"#E8EDFF"}>
        <i className={cx(fr.cx("fr-icon-alert-fill"), css({ color: "#0063CB" }))} />
        <styled.div
          dangerouslySetInnerHTML={{
            __html:
              transformBold(`**Si vous modifiez un champ dans le formulaire, votre mise en page sera ré-initialisée.** <br/>
Les modifications du compte-rendu se font uniquement sur l'appareil utilisé. Utilisez le même appareil pour continuer les modifications et l'envoi.`),
          }}
          ml="16px"
          pr="24px"
          color={"#0063CB"}
        ></styled.div>
      </Flex>
      <TextEditorContextProvider>
        {report ? (
          <SendForm generatePdf={generatePdfMutation.mutate} report={report}>
            <EditBanner
              title={
                <styled.div nowrap>
                  <styled.span fontWeight="bold">{getModeTitle(mode)}</styled.span>
                  {report?.title ? ` | ${report?.title}` : ""}
                </styled.div>
              }
              reportId={report?.id}
              buttons={buttons}
            />
            <Center w="100%" h="100%" maxH="100%" mt="10px" overflowY="auto">
              <Stack w="800px" h="100%">
                {report && snapshotQuery.isSuccess && chipOptions?.length && isServiceInstructeurLoaded ? (
                  <WithReport
                    report={report as any}
                    mode={mode}
                    initialHtmlString={
                      htmlString ??
                      getReportHtmlString(report, chipOptions, udap as Udap, serviceInstructeur ?? undefined)
                    }
                  />
                ) : null}
              </Stack>
            </Center>
          </SendForm>
        ) : null}
      </TextEditorContextProvider>
    </styled.div>
  );
};

const SendForm = ({
  children,
  generatePdf,
  report,
}: PropsWithChildren<{ report: Report; generatePdf: (args: { htmlString: string; recipients: string }) => void }>) => {
  const { editor } = useContext(TextEditorContext);

  const form = useForm({ defaultValues: { recipients: "" } });

  useQuery({
    queryKey: ["service-instructeur", report.serviceInstructeur, report.applicantEmail],
    queryFn: async () => {
      const recipents = await getBaseRecipients(report);
      if (!form.getValues("recipients")) {
        form.setValue("recipients", recipents ?? "");
      }
      return null;
    },
  });

  const send = (values: { recipients: string }) => {
    const recipients = values.recipients
      .split(/,|\s|;/)
      .filter(Boolean)
      .join(",");

    generatePdf({ htmlString: editor?.getHTML() ?? "", recipients });
  };

  return (
    <form onSubmit={form.handleSubmit(send)}>
      <FormProvider {...form}>{children}</FormProvider>
    </form>
  );
};

const getBaseRecipients = async (report: Report) => {
  const serviceEmail = report.serviceInstructeur
    ? (await db.service_instructeurs.findFirst({ where: { id: report.serviceInstructeur } }))?.email
    : null;
  const recipients = [serviceEmail, report.applicantEmail].filter(Boolean).join(", ");
  return recipients;
};

const getModeTitle = (mode: Mode) => {
  switch (mode) {
    case "edit":
      return "Mise en page";
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
    <Banner
      status="saved"
      zIndex={3}
      position={{ base: "sticky", lg: "sticky" }}
      top={{ base: "-1px", lg: "-1px" }}
      flexDir="row"
    >
      <Flex
        direction="row"
        justifyContent={"flex-start"}
        alignItems="center"
        w={{ base: "100%", lg: "1000px" }}
        maxW={{ base: "100%", lg: "1000px" }}
        h="header-height"
        px="16px"
      >
        <Flex>
          <styled.a
            className={"ri-arrow-left-line"}
            href={""}
            onClick={(e) => {
              e.preventDefault();
              goBack();
            }}
            hideBelow="lg"
            fontSize="16px"
            whiteSpace="nowrap"
            {...{
              "&::before": {
                width: "16px !important",
                height: "16px !important",
                mb: "4px !important",
                mr: "4px",
              },
            }}
          >
            Retour
          </styled.a>
        </Flex>
        <styled.a
          className={"ri-arrow-left-line"}
          onClick={(e) => {
            e.preventDefault();
            goBack();
          }}
          hideFrom="lg"
          pr="8px"
          color="black"
          fontSize="16px"
        ></styled.a>
        <styled.div flex={1} ml={{ base: "0", lg: "32px" }} pr="8px" nowrap>
          {title}
        </styled.div>
        <Flex>{buttons}</Flex>
      </Flex>
    </Banner>
  );
};

export const WithReport = ({
  initialHtmlString,
  mode,
  report,
}: {
  initialHtmlString: string;
  mode: Mode;
  report: Report & { pictures: Pictures[] };
}) => {
  const { editor } = useContext(TextEditorContext);
  const [htmlString] = useState(initialHtmlString);

  console.log(report);

  useEffect(() => {
    if (!editor) return;

    editor.commands.setContent(htmlString);
  }, [editor]);

  const { udap } = useUser()!;

  const ViewDocument = (
    <View
      udap={udap as Udap}
      htmlString={editor?.getHTML() ?? ""}
      images={{ marianne: "/marianne.png", marianneFooter: "/marianne_footer.png" }}
      pictures={report.pictures}
    />
  );

  if (mode === "view") return ViewDocument;

  if (mode === "send") {
    return (
      <SendReportPage>
        <styled.div mt="16px">{ViewDocument}</styled.div>
      </SendReportPage>
    );
  }

  return (
    <styled.div p="16px">
      <TextEditor />
    </styled.div>
  );
};

const View = (props: ReportPDFDocumentProps) => {
  const query = useQuery({
    queryKey: ["report-pdf", props.htmlString],
    queryFn: async () => {
      const blob = await pdf(<ReportPDFDocument {...props} />).toBlob();
      return blob;
    },
    refetchOnWindowFocus: false,
    enabled: !!props.htmlString,
  });

  if (query.isLoading) return <Spinner />;

  return (
    <styled.div px="16px">
      <PdfCanvas blob={query.data as Blob} />
    </styled.div>
  );
};

const PdfCanvas = ({ blob }: { blob: Blob }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const file = useMemo(() => URL.createObjectURL(blob), [blob]);
  const { pdfDocument } = usePdf({
    file,
    canvasRef,
    workerSrc: "/pdfjs/build/pdf.worker.min.mjs",
  });

  const nbPages = pdfDocument?.numPages;

  return (
    <>
      {makeArrayOf(nbPages ?? 1).map((_, page) => (
        <PdfCanvasPage key={page} file={file} page={page + 1} />
      ))}
    </>
  );
};

const PdfCanvasPage = ({ file, page }: { file: string; page: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  usePdf({
    scale: 1.2,
    file,
    page: page,
    canvasRef,
    workerSrc: "/pdfjs/build/pdf.worker.min.mjs",
  });

  return (
    <styled.canvas
      // @ts-ignore
      ref={canvasRef}
      width={{ base: "100%", lg: "800px" }}
      my="16px"
      boxShadow="0px 10.18px 30.54px 0px #00001229"
    />
  );
};

const SendReportPage = ({ children }: PropsWithChildren) => {
  const { reportId } = Route.useParams();
  const reportQuery = useLiveQuery(db.report.liveUnique({ where: { id: reportId } }));

  const form = useFormContext();

  const isLoading = !reportQuery.updatedAt;
  if (isLoading) return null;

  const report = reportQuery.results;

  if (!report) return <div>Report not found</div>;

  return (
    <Center>
      <Flex flexDirection="column" alignItems="center" w={{ base: "100%", lg: "800px" }}>
        <Input
          className={css({ w: "100%", mt: "16px", px: { base: "16px", lg: "unset" } })}
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

// const validateEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Route = createFileRoute("/pdf/$reportId")({
  component: () => (
    <EnsureUser>
      <PDF />
    </EnsureUser>
  ),
  validateSearch: (search: Record<string, unknown>) => {
    const mode = search?.mode as Mode;
    const isModeValid = ["view", "edit", "send", "sent"].includes(mode);

    return {
      mode: isModeValid ? mode : "view",
    } as { mode: Mode };
  },
});

declare global {
  var editor: Editor;
}
