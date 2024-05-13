import { css } from "#styled-system/css";
import { Box, Center, CenterProps, Flex, styled } from "#styled-system/jsx";
import Button from "@codegouvfr/react-dsfr/Button";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { v4 } from "uuid";
import { Banner } from "#components/Banner";
import { EnsureUser } from "#components/EnsureUser";
import { Tabs } from "#components/Tabs";
import { useUser } from "../contexts/AuthContext";
import { db } from "../db";
import { AllReports, MyReports } from "../features/ReportList";
import { useNetworkState } from "react-use";
import { SyncFormStatus } from "#components/SyncForm";

const Index = () => {
  const user = useUser()!;

  const options = [
    {
      id: "my",
      label: user.name,
      className: css({
        position: "absolute",
        left: { base: "calc((100vw - 400px) / 2 - 8px)", lg: "calc((100vw - 828px) / 2 - 8px)" },
      }),
    },
    {
      id: "udap",
      label: "UDAP",
      className: css({
        position: "absolute",
        left: "16px",
      }),
    },
  ];


  const createReportMutation = useMutation({
    mutationFn: () =>
      db.report.create({
        data: {
          id: `report-${v4()}`,
          createdBy: user.id,
          createdAt: new Date(),
          disabled: false,
        },
      }),
  });

  return (
    <Flex direction="column" color="text-label-grey">
      <SimpleBanner pt="30px" pb="40px">
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
      </SimpleBanner>

      <Tabs.Root defaultValue="my">
        <Tabs.List>
          {options.map((option) => (
            <Tabs.Trigger key={option.id} value={option.id} position="relative">
              <Box className={option.className}>{option.label}</Box>
            </Tabs.Trigger>
          ))}
          <Tabs.Indicator />
        </Tabs.List>
        <Center>
          <Tabs.Content value="my">
            <MyReports />
          </Tabs.Content>
          <Tabs.Content value="udap">
            <AllReports />
          </Tabs.Content>
        </Center>
      </Tabs.Root>
    </Flex>
  );
};

const SimpleBanner = (props: CenterProps) => {
  const { online } = useNetworkState();

  const status: SyncFormStatus = online ? "saved" : "offline";

  return <Banner status={status} {...props} />;
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
