import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { EnsureUser } from "../components/EnsureUser";
import { Box, Center } from "#styled-system/jsx";
import { Tabs } from "../components/Tabs";
import { InfoForm } from "../features/InfoForm";
import { FormProvider, useForm } from "react-hook-form";
import type { Report } from "@cr-vif/electric-client/frontend";
import { useUser } from "../contexts/AuthContext";
import Button from "@codegouvfr/react-dsfr/Button";
import { useMutation } from "@tanstack/react-query";
import { db } from "../db";
import { v4 } from "uuid";
import { NotesForm } from "../features/NotesForm";

export const CreatePage = () => {
  const user = useUser()!;
  const form = useForm<Report>({
    defaultValues: {
      title: "",
      redacted_by: "",
      created_by_id: user.id,
      created_by_username: user.name,
      meet_date: new Date(),
      meet_link: "",
      applicant_name: "",
      applicant_type: "",
      project_status: "",
      project_cadastral_ref: "",
      project_land_contact: "",
      project_space_type: "",
      project_nature: "",
      project_description: "",
      decision: "",
      decision_comment: "",
      contacts: "",
      created_at: new Date(),
    },
  });

  const options = [
    { id: "info", label: "Informations" },
    { id: "notes", label: "Notes terrain" },
  ];

  const navigate = useNavigate();

  const createReportMutation = useMutation({
    mutationFn: (report: Report) => db.report.create({ data: { ...report, id: `report-${v4()}` } }),
    onSuccess: () => {
      navigate({ to: "/" });
    },
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit((values) => createReportMutation.mutate(values))}>
        <Tabs.Root defaultValue="info">
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

        <Center>
          <Button type="submit" iconId="ri-draft-line">
            Créer le CR
          </Button>
        </Center>
      </form>
    </FormProvider>
  );
};

export const Route = createFileRoute("/create")({
  component: () => (
    <EnsureUser>
      <Box mb="80px">
        <CreatePage />
      </Box>
    </EnsureUser>
  ),
  beforeLoad: ({ context, location }) => {
    if (!context.token || !context.user) {
      throw redirect({ to: "/login", search: { redirect: location.href } });
    }
  },
});
