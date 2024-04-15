import { Flex } from "#styled-system/jsx";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useLiveQuery } from "electric-sql/react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { SyncFormBanner } from "../components/SyncForm";
import { Tabs } from "../components/Tabs";
import { db } from "../db";
import { InfoForm } from "../features/InfoForm";
import { NotesForm } from "../features/NotesForm";
import type { Report } from "../generated/client/prismaClient";

const EditReport = () => {
  const { reportId } = Route.useParams();

  const { results: report } = useLiveQuery(() => db.report.liveUnique({ where: { id: reportId } }), [reportId]);

  return <Flex direction="column">{report ? <WithReport report={report} /> : null}</Flex>;
};

const WithReport = ({ report }: { report: Report }) => {
  const form = useForm<Report>({
    defaultValues: report!,
    resetOptions: {
      // keepDirty: true
    },
  });

  const navigate = useNavigate();

  const { tab } = Route.useSearch();

  const setTab = (tab: string) => {
    navigate({ search: { tab }, replace: true });
  };

  const options = [
    { id: "info", label: "Informations" },
    { id: "notes", label: "Notes terrain" },
  ];

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    form.reset(report);
  }, [report]);

  return (
    <Flex direction="column">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit((values) => console.log(values))}>
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
  component: () => <EditReport />,
  validateSearch: (search: Record<string, unknown>) => {
    const tab = search?.tab as string;
    const isTabValid = ["info", "notes"].includes(tab);

    return {
      tab: isTabValid ? tab : "info",
    };
  },
});
