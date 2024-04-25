import { Flex } from "#styled-system/jsx";
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
import { EnsureUser } from "../components/EnsureUser";
import { SyncFormBanner } from "../components/SyncForm";
import { Tabs } from "../components/Tabs";
import { db } from "../db";
import { InfoForm } from "../features/InfoForm";
import { NotesForm } from "../features/NotesForm";
import type { Report } from "../generated/client";

const EditReport = () => {
  const { reportId } = Route.useParams();

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

  const navigate = useNavigate();

  const setTab = (tab: string) => {
    navigate({ search: { tab }, replace: true });
  };

  const options = [
    { id: "info", label: "Informations" },
    { id: "notes", label: "Notes terrain" },
  ];

  const previousValuesRef = useRef<Report>(report);

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    if (!report) return;
    const previousValues = previousValuesRef.current;
    const focused = getFocused();

    for (const key in previousValues) {
      if (previousValues[key] !== report[key]) {
        const fieldState = form.getFieldState(key);
        const hasFocus = key === focused;

        if (!hasFocus || !fieldState.isDirty) {
          form.setValue(key, report[key]);
        }
      }
    }

    previousValuesRef.current = report;
  }, [report]);

  const onSubmit = (values: Report) => {
    console.log(values);

    navigate({
      to: "/export/$reportId",
      params: {
        reportId: report.id,
      },
    });
  };

  return (
    <Flex direction="column">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <SyncFormBanner form={form} baseObject={report} />
          <Tabs.Root defaultValue="info" onValueChange={(e) => setTab(e.value)} value={tab}>
            <Tabs.List>
              {options.map((option) => (
                <Tabs.Trigger key={option.id} value={option.id}>
                  {option.label}
                </Tabs.Trigger>
              ))}
              <Tabs.Indicator />
            </Tabs.List>
            <Tabs.Content value="info">
              <InfoForm />
            </Tabs.Content>
            <Tabs.Content value="notes">
              <NotesForm />
            </Tabs.Content>
          </Tabs.Root>
        </form>
      </FormProvider>
    </Flex>
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
