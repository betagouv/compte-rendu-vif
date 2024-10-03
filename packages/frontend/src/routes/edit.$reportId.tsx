import { EnsureUser } from "#components/EnsureUser";
import { SyncFormBanner } from "#components/SyncForm";
import { Tabs } from "#components/Tabs";
import { css } from "#styled-system/css";
import { Box, Flex } from "#styled-system/jsx";
import type { Report } from "@cr-vif/electric-client/frontend";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useLiveQuery } from "electric-sql/react";
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
import { db, electric } from "../db";
import { InfoForm } from "../features/InfoForm";
import { NotesForm } from "../features/NotesForm";
import { DisabledContext } from "../features/DisabledContext";
import { useQuery } from "@tanstack/react-query";
import { useCanEditReport } from "../hooks/useCanEditReport";

const EditReport = () => {
  const { reportId } = Route.useParams();

  useQuery({
    queryKey: ["report", reportId],
    queryFn: () =>
      electric.db.report.sync({
        where: { id: reportId },
        include: {
          pictures: true,
        },
      }),
  });

  const { results: report } = useLiveQuery(db.report.liveUnique({ where: { id: reportId } }));

  return <Flex direction="column">{report ? <WithReport report={report} /> : null}</Flex>;
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
  const [form, getFocused] = useFormWithFocus<Report>({
    defaultValues: report!,
    resetOptions: {},
  });

  const canEdit = useCanEditReport(report);

  const navigate = useNavigate();

  const setTab = (tab: string) => {
    navigate({ search: { tab }, replace: true });
    document.getElementById("root")!.scrollTo(0, 0);
  };

  // @ts-ignore
  const isChrome = !!window.chrome;

  const options = [
    {
      id: "info",
      label: "RDV",
      className: css({
        position: "absolute",
        // there is a difference in padding between chrome and other browsers due to scrollbar width (i guess)
        left: isChrome ? "max(calc((100vw - 800px) / 2 + 8px), 16px)" : "max(calc((100vw - 800px) / 2 + 16px), 16px)",
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
