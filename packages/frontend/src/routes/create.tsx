import { createFileRoute, redirect } from "@tanstack/react-router";
import { EnsureUser } from "../components/EnsureUser";
import { Flex } from "#styled-system/jsx";
import { Tabs } from "../components/Tabs";
import { InfoForm } from "../features/InfoForm";
import { FormProvider, useForm } from "react-hook-form";
import type { Report } from "../generated/client";
import { useUser } from "../contexts/AuthContext";

export const CreatePage = () => {
  const user = useUser()!;
  const form = useForm<Report>({
    defaultValues: {
      title: "",
      redacted_by: "",
      created_by_id: user.id,
      meet_date: undefined,
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
    },
  });

  const options = [
    { id: "info", label: "Informations" },
    { id: "notes", label: "Notes terrain" },
  ];

  return (
    <FormProvider {...form}>
      <form>
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
          <Tabs.Content value="notes"></Tabs.Content>
        </Tabs.Root>
      </form>
    </FormProvider>
  );
};

export const Route = createFileRoute("/create")({
  component: () => (
    <EnsureUser>
      <CreatePage />
    </EnsureUser>
  ),
  beforeLoad: ({ context, location }) => {
    if (!context.token || !context.user) {
      throw redirect({ to: "/login", search: { redirect: location.href } });
    }
  },
});
