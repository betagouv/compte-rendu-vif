import { EnsureUser } from "#components/EnsureUser";
import { SyncFormBanner } from "#components/SyncForm";
import { Tabs } from "#components/Tabs";
import { css } from "#styled-system/css";
import { Box, Center, Flex, Stack } from "#styled-system/jsx";
import type { Report, Udap } from "@cr-vif/electric-client/frontend";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useLiveQuery } from "electric-sql/react";
import { useEffect, useRef, useState } from "react";
import {
  FormProvider,
  useForm,
  type FieldPath,
  type FieldValues,
  type RegisterOptions,
  type UseFormProps,
  type UseFormRegister,
} from "react-hook-form";
import { db } from "../db";
import { InfoForm } from "../features/InfoForm";
import { NotesForm } from "../features/NotesForm";
import { createModal } from "@codegouvfr/react-dsfr/Modal";
import { useIsModalOpen } from "@codegouvfr/react-dsfr/Modal/useIsModalOpen";
import { ReportPDFDocument, getReportHtmlString } from "@cr-vif/pdf";
import { useUser } from "../contexts/AuthContext";
import { useChipOptions } from "../features/chips/useChipOptions";
import { PDFViewer } from "@react-pdf/renderer";
import Button from "@codegouvfr/react-dsfr/Button";

const EditReport = () => {
  const { reportId } = Route.useParams();

  const { results: report } = useLiveQuery(db.report.liveUnique({ where: { id: reportId } }));

  return <Flex direction="column">{report ? <WithReport report={report} /> : null}</Flex>;
};

const modal = createModal({
  id: "pdf-modal",
  isOpenedByDefault: false,
});

function useFormWithFocus<TFieldValues extends FieldValues = FieldValues>(props: UseFormProps<TFieldValues, any>) {
  const form = useForm<TFieldValues>(props);
  const focusedRef = useRef<string | null>(null);

  const unsafeForm = form as any;

  if (!unsafeForm.done) {
    unsafeForm.oldRegister = form.register;
    unsafeForm.done = true;
  }

  const register: UseFormRegister<TFieldValues> = <
    TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  >(
    name: TFieldName,
    options?: RegisterOptions<TFieldValues, TFieldName>,
  ) => {
    const { onBlur, ...registered } = (form as any).oldRegister(name, options);
    return {
      ...registered,
      onFocus: () => {
        focusedRef.current = name;
      },
      onBlur: (e) => {
        focusedRef.current = null;
        return onBlur?.(e);
      },
    };
  };

  form.register = register;

  return [form, () => focusedRef.current] as const;
}

const WithReport = ({ report }: { report: Report }) => {
  const { tab } = Route.useSearch();
  const [form, getFocused] = useFormWithFocus<Report>({
    defaultValues: report!,
    resetOptions: {},
  });
  const [pdfValues, setPdfValues] = useState<Report | null>(null);

  const navigate = useNavigate();

  const setTab = (tab: string) => {
    navigate({ search: { tab }, replace: true });
  };

  const options = [
    {
      id: "info",
      label: "RDV",
      className: css({
        position: "absolute",
        left: "max(calc((100vw - 800px) / 2 + 8px), 16px)",
      }),
    },
    {
      id: "notes",
      label: "Bilan",
      className: css({
        position: "absolute",
        left: "16px",
      }),
    },
  ];

  const previousValuesRef = useRef<Report>(report);

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    if (!report) return;
    const previousValues = previousValuesRef.current;
    const focused = getFocused();

    // key is a string and a string cannot index previousValues or report
    for (const key in previousValues) {
      if ((previousValues as any)[key] !== (report as any)[key]) {
        const fieldState = form.getFieldState(key as any);
        const hasFocus = key === focused;

        if (!hasFocus || !fieldState.isDirty) {
          form.setValue(key as any, (report as any)[key]);
        }
      }
    }

    previousValuesRef.current = report;
  }, [report]);

  const onSubmit = (_values: Report) => {
    setPdfValues(_values);
    modal.open();
  };

  const goToEditPage = () => {
    navigate({
      to: "/export/$reportId",
      params: {
        reportId: report.id,
      },
    });
  };

  return (
    <>
      <PDFModal report={pdfValues} onDownload={() => {}} onEdit={goToEditPage} />
      <Flex direction="column">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <SyncFormBanner form={form} baseObject={report} />
            <Flex justifyContent="center" w="100%">
              <Tabs.Root defaultValue="info" onValueChange={(e) => setTab(e.value)} value={tab}>
                <Tabs.List>
                  {options.map((option) => (
                    <Tabs.Trigger key={option.id} value={option.id} position="relative">
                      <Box className={option.className}>{option.label}</Box>
                    </Tabs.Trigger>
                  ))}
                  <Tabs.Indicator />
                </Tabs.List>
                <Tabs.Content value="info" display="flex" justifyContent="center">
                  <Box w="100%" maxWidth="800px">
                    <InfoForm />
                  </Box>
                </Tabs.Content>
                <Tabs.Content value="notes" display="flex" justifyContent="center">
                  <Box w="100%" maxWidth="800px">
                    <NotesForm />
                  </Box>
                </Tabs.Content>
              </Tabs.Root>
            </Flex>
          </form>
        </FormProvider>
      </Flex>
    </>
  );
};

const PDFModal = ({
  report,
  onEdit,
  onDownload,
}: {
  report: Report | null;
  onEdit: () => void;
  onDownload: () => void;
}) => {
  return (
    <modal.Component title="">
      <Stack>
        <Center gap="10px" direction="row">
          <Button iconId="ri-pencil-line" priority="secondary" onClick={onEdit}>
            Modifier
          </Button>
          {/* TODO: replace with "Envoyer" */}
          <Button iconId="ri-download-line" onClick={onDownload}>
            Télécharger
          </Button>
        </Center>
        {report ? <PDFContent report={report} /> : null}
      </Stack>
    </modal.Component>
  );
};

const PDFContent = ({ report }: { report: Report }) => {
  const { udap } = useUser()!;
  const chipOptions = useChipOptions();
  const htmlString = getReportHtmlString(report, chipOptions, udap as Udap);

  if (!chipOptions) return null;

  return (
    <PDFViewer showToolbar={false} width={"100%"} height={"800px"}>
      <ReportPDFDocument udap={udap as Udap} htmlString={htmlString} images={{ header: "/pdf_header.png" }} />
    </PDFViewer>
  );
};

export const Route = createFileRoute("/edit/$reportId")({
  component: () => (
    <EnsureUser>
      <EditReport />
    </EnsureUser>
  ),
  validateSearch: (search: Record<string, unknown>) => {
    const tab = search?.tab as string;
    const isTabValid = ["info", "notes"].includes(tab);

    return {
      tab: isTabValid ? tab : "info",
    } as { tab?: string };
  },
});
