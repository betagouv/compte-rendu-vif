import { css } from "#styled-system/css";
import { Flex, styled } from "#styled-system/jsx";
import Button from "@codegouvfr/react-dsfr/Button";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { v4 } from "uuid";
import { Banner } from "../components/Banner";
import { EnsureUser } from "../components/EnsureUser";
import { Tabs } from "../components/Tabs";
import { useUser } from "../contexts/AuthContext";
import { db } from "../db";
import { AllReports, MyReports } from "../features/ReportList";

const Index = () => {
  const user = useUser()!;

  const options = [
    { id: "my", label: user.name },
    { id: "udap", label: "UDAP" },
  ];

  const createReportMutation = useMutation({
    mutationFn: () =>
      db.report.create({
        data: {
          id: `report-${v4()}`,
          created_by_id: user.email,
          created_at: new Date(),
          created_by_username: user.name,
        },
      }),
  });

  return (
    <Flex direction="column" color="text-label-grey">
      <Banner pt="30px" pb="40px">
        <styled.div color="text-title-blue-france" fontSize="18px" fontWeight="bold">
          Compte-rendu VIF
        </styled.div>
        <Button
          className={css({ mt: "15px" })}
          iconId="ri-add-line"
          nativeButtonProps={{ onClick: () => createReportMutation.mutate() }}
        >
          Créer un compte-rendu
        </Button>
      </Banner>

      <Tabs.Root defaultValue="my">
        <Tabs.List>
          {options.map((option) => (
            <Tabs.Trigger key={option.id} value={option.id}>
              {option.label}
            </Tabs.Trigger>
          ))}
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Content value="my">
          <MyReports />
        </Tabs.Content>
        <Tabs.Content value="udap">
          <AllReports />
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
};

export const Route = createFileRoute("/")({
  component: () => (
    <EnsureUser>
      <Index />
    </EnsureUser>
  ),
  beforeLoad: ({ context, location }) => {
    if (!context.token || !context.user) {
      throw redirect({ to: "/login", search: { redirect: location.href } });
    }
  },
});
