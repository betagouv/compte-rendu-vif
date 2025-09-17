import { EnsureUser } from "#components/EnsureUser";
import { SyncFormBanner } from "#components/SyncForm";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import {
  FormProvider,
  useForm,
  type FieldPath,
  type FieldValues,
  type RegisterOptions,
  type UseFormProps,
  type UseFormRegister,
} from "react-hook-form";
import { InfoForm } from "../features/InfoForm";
import { NotesForm } from "../features/NotesForm";
import { DisabledContext } from "../features/DisabledContext";
import { useQuery } from "@tanstack/react-query";
import { useCanEditReport } from "../hooks/useCanEditReport";
import { db, useDbQuery } from "../db/db";
import { Report } from "../db/AppSchema";
import { Flex } from "#components/ui/Flex.tsx";
import { Box } from "@mui/material";
import Button from "@codegouvfr/react-dsfr/Button";
import { Tabs } from "#components/Tabs.tsx";
import { Center } from "#components/MUIDsfr.tsx";

const EditReport = () => {
  const { reportId } = Route.useParams();

  // useQuery({
  //   queryKey: ["report", reportId],
  //   queryFn: () =>
  //     electric.db.report.sync({
  //       where: { id: reportId },
  //       include: {
  //         pictures: true,
  //       },
  //     }),
  // });

  const reportQuery = useDbQuery(db.selectFrom("report").where("id", "=", reportId).selectAll());

  const report = reportQuery.data?.[0];

  return <Flex flexDirection="column">{report ? <WithReport report={report} /> : null}</Flex>;
};

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
  const setTab = (tab: string) => {
    navigate({ search: { tab } as any, replace: true });
    document.getElementById("root")!.scrollTo(0, 0);
  };

  const [form, getFocused] = useFormWithFocus<Report>({
    defaultValues: report!,
    resetOptions: {},
  });

  const canEdit = useCanEditReport(report);

  const navigate = useNavigate();

  // @ts-ignore
  const isChrome = !!window.chrome;

  const options = [
    {
      id: "info",
      label: "RDV",
      props: {
        position: "absolute" as const,
        // there is a difference in padding between chrome and other browsers due to scrollbar width (i guess)
        left: isChrome ? "max(calc((100vw - 800px) / 2 + 8px), 16px)" : "max(calc((100vw - 800px) / 2 + 16px), 16px)",
      },
      component: (
        <Center>
          <InfoForm />
        </Center>
      ),
    },
    {
      id: "notes",
      label: "Bilan",
      props: {
        position: "absolute" as const,
        left: "16px",
      },
      component: (
        <Center>
          <NotesForm />
        </Center>
      ),
    },
  ];

  const previousValuesRef = useRef<Report>(report);

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    if (!report) return;
    const previousValues = previousValuesRef.current;
    const focused = getFocused();

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
    navigate({ to: "/pdf/$reportId", params: { reportId: report.id }, search: { mode: "view" } });
  };

  return (
    <DisabledContext.Provider value={!canEdit}>
      <Flex flexDirection="column">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <SyncFormBanner form={form} baseObject={report} />
            <Tabs control={[tab ?? "info", setTab]} options={options} />
          </form>
        </FormProvider>
      </Flex>
    </DisabledContext.Provider>
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
