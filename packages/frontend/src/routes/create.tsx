import { createFileRoute, redirect } from "@tanstack/react-router";
import { EnsureUser } from "../components/EnsureUser";
import { Flex } from "#styled-system/jsx";
import { Tabs } from "../components/Tabs";
import { InfoForm } from "../features/InfoForm";

export const CreatePage = () => {
  const options = [
    { id: "info", label: "Informations" },
    { id: "notes", label: "Notes terrain" },
  ];

  return (
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
