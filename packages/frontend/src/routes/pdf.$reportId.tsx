import "@ungap/with-resolvers";
import { Banner } from "../components/Banner";
import { EnsureUser } from "../components/EnsureUser";
import { Spinner } from "../components/Spinner";
import { css, cx } from "#styled-system/css";
import { Center, Flex, Stack, styled } from "#styled-system/jsx";
import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import { ReportPDFDocument, ReportPDFDocumentProps, getReportHtmlString } from "@cr-vif/pdf";
import { usePdf } from "@mikecousins/react-pdf";
import { pdf } from "@react-pdf/renderer";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { Editor } from "@tiptap/react";
import { makeArrayOf } from "pastable";
import { PropsWithChildren, ReactNode, useContext, useEffect, useMemo, useRef, useState } from "react";
import { FormProvider, useForm, useFormContext, useWatch } from "react-hook-form";
import { v4 } from "uuid";
import { api } from "../api";
import sentImage from "../assets/sent.svg";
import { EmailInput } from "../components/EmailInput";
import { getDiff } from "../components/SyncForm";
import { useUser } from "../contexts/AuthContext";
import { Clause_v2, Pictures, Report, Udap } from "../db/AppSchema";
import { db, useDbQuery } from "../db/db";
import { useChipOptions } from "../features/chips/useChipOptions";
import { transformBold } from "../features/menu/ClauseMenu";
import { TextEditor } from "../features/text-editor/TextEditor";
import { TextEditorContext, TextEditorContextProvider } from "../features/text-editor/TextEditorContext";
import { TextEditorToolbar } from "../features/text-editor/TextEditorToolbar";
import { useUserSettings } from "../hooks/useUserSettings";
import { format } from "date-fns";

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

  const reportQuery = useQuery({
    queryKey: ["report", reportId],
    queryFn: async () => {
      const reportQuery = await db.selectFrom("report").where("id", "=", reportId).selectAll().execute();
      const picturesQuery = await db
        .selectFrom("pictures")
        .where("reportId", "=", reportId)
        .orderBy("createdAt asc")
        .selectAll()
        .execute();
      const report = reportQuery?.[0];
      const pictures = picturesQuery ?? [];

      return { ...report, pictures };
    },
  });

  const report = reportQuery.data;

  const snapshotQuery = useQuery({
    queryKey: ["report-snapshot", reportId],
    queryFn: async () => {
      const snapshotQuery = await db.selectFrom("pdf_snapshot").where("report_id", "=", reportId).selectAll().execute();
      const snapshot = snapshotQuery?.[0];
      if (!snapshot || !snapshot.report) return null;

      try {
        const snapshotReport = JSON.parse(snapshot.report);
        const diff = getDiff(
          {
            ...snapshotReport,
            createdAt: new Date(snapshotReport.createdAt).toISOString(),
            meetDate: new Date(snapshotReport.meetDate).toISOString(),
          },
          {
            ...report,
            createdAt: new Date(report!.createdAt!).toISOString(),
            meetDate: new Date(report!.meetDate!).toISOString(),
          },
        );

        if (Object.keys(diff).length) return null;

        return snapshot.html!;
      } catch (e) {
        return null;
      }
    },
    enabled: !!report,
  });

  const serviceInstructeurQuery = useQuery({
    queryKey: ["service-instructeur", report?.serviceInstructeur],
    queryFn: async () => {
      return await db
        .selectFrom("service_instructeurs")
        .where("id", "=", report!.serviceInstructeur!)
        .selectAll()
        .execute();
    },
    enabled: !!report?.serviceInstructeur,
  });

  const serviceInstructeur = serviceInstructeurQuery.data?.[0];
  const isServiceInstructeurLoaded = report?.serviceInstructeur ? !!serviceInstructeur : true;

  const htmlString = snapshotQuery.data;

  const saveSnapshotMutation = useMutation(
    async ({ report, html }: { report: string; html: string }) => {
      await db.deleteFrom("pdf_snapshot").where("report_id", "=", reportId).where("user_id", "=", user.id).execute();

      await db
        .insertInto("pdf_snapshot")
        .values({
          id: v4(),
          report_id: reportId,
          report,
          html,
          user_id: user.id,
        })
        .execute();
    },
    { onSuccess: () => toggleMode() },
  );

  const EditButtons = () => {
    const { editor } = useContext(TextEditorContext);

    return (
      <>
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
          <styled.span hideBelow="lg">Enregistrer</styled.span>
        </Button>
      </>
    );
  };

  const ViewButtons = () => {
    return (
      <>
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
      </>
    );
  };

  if (generatePdfMutation.isLoading)
    return (
      <Center flexDir="column" w="100%" h="100%">
        <Spinner />
      </Center>
    );

  const SendButtons = () => {
    return (
      <>
        <Button iconId="ri-send-plane-fill" type="submit" disabled={generatePdfMutation.isLoading}>
          Envoyer
        </Button>
      </>
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
    <styled.div
      display="flex"
      flexDirection="column"
      w="100%"
      h="100%"
      bgColor={mode === "edit" ? "background-open-blue-france" : "unset"}
    >
      <Flex justifyContent="center" py="16px" px="32px" bgColor={"#E8EDFF"}>
        <i className={cx(fr.cx("fr-icon-alert-fill"), css({ color: "#0063CB" }))} />
        <styled.div
          dangerouslySetInnerHTML={{
            __html: transformBold(`La modification du formulaire ré-initialisera cette mise en page.`),
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
              mode={mode}
              title={
                <styled.div display="flex" flexDir="column" alignItems="flex-start" textAlign="left">
                  <styled.div>
                    <styled.span fontWeight="bold">{getModeTitle(mode)}</styled.span>
                    {mode !== "send" && report?.title ? ` | ${report?.title}` : ""}
                  </styled.div>
                  {mode === "view" ? (
                    <styled.div>
                      <SentEmailInfos report={report} />
                    </styled.div>
                  ) : null}
                </styled.div>
              }
              reportId={report?.id}
              buttons={buttons}
            />
            <Center w="100%" h="100%" maxH="100%" overflowY="auto">
              <Stack w="800px" h="100%">
                {report && snapshotQuery.isSuccess && chipOptions?.length && isServiceInstructeurLoaded ? (
                  <WithReport
                    report={report as any}
                    mode={mode}
                    initialHtmlString={
                      htmlString ??
                      getReportHtmlString(
                        report,
                        chipOptions as Clause_v2[],
                        udap as Udap,
                        serviceInstructeur ?? undefined,
                      )
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

const SentEmailInfos = ({ report }: { report: Report }) => {
  const query = useDbQuery(
    db.selectFrom("sent_email").where("report_id", "=", report.id).orderBy("sent_at asc").selectAll(),
  );

  const groupedByDay = query.data?.reduce(
    (acc, email) => {
      if (!email.sent_at || !email.sent_to) return acc;

      const day = format(new Date(email.sent_at), "dd/MM/yyyy");
      if (!acc[day]) acc[day] = [];
      acc[day].push(email.sent_to);

      return acc;
    },
    {} as Record<string, string[]>,
  );

  if (!groupedByDay) return null;

  return (
    <Flex flexDir="column" flexShrink={0} color="text-mention-grey">
      {Object.entries(groupedByDay).map(([day, emails]) => (
        <styled.div key={day}>
          Envoyé le {day} à {emails.join(", ")}
        </styled.div>
      ))}
    </Flex>
  );
};

const SendForm = ({
  children,
  generatePdf,
  report,
}: PropsWithChildren<{ report: Report; generatePdf: (args: { htmlString: string; recipients: string }) => void }>) => {
  const { editor } = useContext(TextEditorContext);

  const form = useForm({ defaultValues: { recipients: "" } });
  const userSettings = useUserSettings();

  useQuery({
    queryKey: ["service-instructeur", report.serviceInstructeur, report.applicantEmail],
    queryFn: async () => {
      const defaultRecipients = userSettings.userSettings.default_emails ?? "";
      const recipents = await getBaseRecipients(report, defaultRecipients);

      if (!form.getValues("recipients")) {
        const recipientsArray = recipents.split(",");
        const noDup = Array.from(new Set(recipientsArray)).join(",");

        form.setValue("recipients", noDup ?? "");
      }
      return null;
    },
    enabled: !userSettings.isLoading,
    refetchOnWindowFocus: false,
  });

  const send = (values: { recipients: string }) => {
    const recipients = values.recipients
      .split(/,|\s|;/)
      .filter(Boolean)
      .join(",");

    generatePdf({ htmlString: editor?.getHTML() ?? "", recipients });
  };

  return (
    <styled.form onSubmit={form.handleSubmit(send)} display="flex" flex="1" flexDirection="column">
      <FormProvider {...form}>{children}</FormProvider>
    </styled.form>
  );
};

const getBaseRecipients = async (report: Report, extra?: string) => {
  const serviceEmail = report.serviceInstructeur
    ? (
        await db.selectFrom("service_instructeurs").where("id", "=", report.serviceInstructeur).selectAll().execute()
      )?.[0]?.email
    : null;

  const recipients = [extra, serviceEmail, report.applicantEmail].filter(Boolean).join(",");
  return recipients;
};

const getModeTitle = (mode: Mode) => {
  switch (mode) {
    case "edit":
      return "Mise en page";
    case "view":
      return "Prévisualisation";
    case "send":
      return "Courriels";
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

const EditBanner = ({
  mode,
  title,
  buttons,
  reportId,
}: {
  mode: Mode;
  title: ReactNode;
  buttons: ReactNode;
  reportId?: string;
}) => {
  const router = useRouter();
  const navigate = useNavigate();
  const goBack = () =>
    reportId
      ? navigate({ to: "/edit/$reportId", params: { reportId }, search: { tab: "notes" } })
      : router.history.back();

  const form = useFormContext();
  const recipients = useWatch({ control: form.control, name: "recipients" });

  const isSend = mode === "send";
  const isView = mode === "view";
  const isEdit = mode === "edit";

  return (
    <>
      <Banner
        status="saved"
        zIndex={3}
        position={{ base: "sticky", lg: "sticky" }}
        top={{ base: "-1px", lg: "-1px" }}
        flexDir="column"
        maxW={{ base: "100vw", lg: "unset" }}
        height={{ base: "56px", lg: "unset" }}
      >
        <Flex flexDir="row" justifyContent={"center"} w="100%">
          <Flex
            direction={{ base: isSend ? "column" : "row", lg: "row" }}
            justifyContent={"flex-start"}
            alignItems={isSend ? undefined : "center"}
            w={{ base: "100%", lg: "1000px" }}
            maxW={{ base: "100%", lg: "1000px" }}
            h={isSend || isView ? undefined : "header-height"}
            px="16px"
          >
            <Flex
              flex={1}
              flexShrink="0"
              justifyContent={{ base: isSend ? "space-between" : undefined, lg: "flex-start" }}
              alignItems={{ base: isView ? "flex-start" : "center", lg: "flex-start" }}
              mr={"8px"}
              mt={{ base: isView ? "32px" : 0, lg: isSend || isView ? "32px" : 0 }}
              mb={isView ? "32px" : 0}
            >
              <styled.div>
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
              </styled.div>
              <styled.a
                className={"ri-arrow-left-line"}
                onClick={(e) => {
                  e.preventDefault();
                  goBack();
                }}
                hideFrom="lg"
                mt={isSend ? "8px" : 0}
                pr="8px"
                color="black"
                fontSize="16px"
              ></styled.a>
              <styled.div
                hideBelow={isEdit ? "lg" : undefined}
                flexShrink="0"
                w="100%"
                minW="0"
                ml={{ base: "0", lg: "32px" }}
                mt={{ base: isSend ? "16px" : 0, lg: 0 }}
                pr="8px"
                textAlign="center"
              >
                {title}
              </styled.div>
            </Flex>

            {isSend ? (
              <styled.div w="100%" ml={{ base: 0, lg: "16px" }} mr="16px" mt="16px" mb="16px">
                <EmailInput
                  value={recipients.split(",")}
                  onValueChange={(value) => form.setValue("recipients", value.join(","))}
                />
              </styled.div>
            ) : null}
            <Flex
              hideBelow={isView ? "lg" : undefined}
              gap="8px"
              alignSelf={{ base: "center", lg: "flex-start" }}
              mt={{ base: 0, lg: isSend ? "24px" : "20px" }}
              mb={{ base: isSend ? "16px" : 0, lg: 0 }}
            >
              {buttons}
            </Flex>
          </Flex>
        </Flex>
      </Banner>
      {isView ? (
        <Flex
          hideFrom="lg"
          justifyContent="space-between"
          alignSelf="center"
          w="100%"
          mt={{ base: "16px" }}
          mb={{ base: isSend ? "16px" : 0, lg: 0 }}
          px="16px"
        >
          {buttons}
        </Flex>
      ) : null}
    </>
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
        <styled.div>{ViewDocument}</styled.div>
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

  if (query.isLoading)
    return (
      <Center h="100%">
        <Spinner />
      </Center>
    );

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
  // const reportQuery = useLiveQuery(db.report.liveUnique({ where: { id: reportId } }));
  const reportQuery = useDbQuery(db.selectFrom("report").where("id", "=", reportId).selectAll());

  const form = useFormContext();

  if (reportQuery.isLoading) return null;

  const report = reportQuery.data?.[0];

  if (!report) return <div>Report not found</div>;

  return (
    <Center>
      <Flex flexDirection="column" alignItems="center" w={{ base: "100%", lg: "800px" }}>
        {/* <Input
          className={css({ w: "100%", mt: "16px", px: { base: "16px", lg: "unset" } })}
          label="Destinataires"
          hintText="Liste de courriels, séparés par des virgules ou des espaces"
          textArea
          nativeTextAreaProps={{
            ...form.register("recipients"),
            rows: 4,
          }}
        /> */}

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
