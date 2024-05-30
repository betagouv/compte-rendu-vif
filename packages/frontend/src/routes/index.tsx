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
import { Status, SyncFormStatus } from "#components/SyncForm";
import Input from "@codegouvfr/react-dsfr/Input";
import { useState } from "react";
import { SearchResults } from "#components/ReportSearch.js";

const Index = () => {
  // TODO: put this into an xstate/store
  const [search, setSearch] = useState("");
  const user = useUser()!;

  const options = [
    {
      id: "my",
      label: user.name,
      className: css({
        position: "absolute",
        left: { base: "16px", lg: "calc((100vw - 828px) / 2 - 8px)" },
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
          udap_id: user.udap.id,
        },
      }),
  });

  return (
    <Flex direction="column" color="text-label-grey">
      <SimpleBanner pt="15px" pb="40px">
        <Flex hideFrom="lg" justifyContent="space-between" w="100%" px="16px">
          <styled.div fontSize="16px" fontWeight="bold">
            Compte-rendu VIF
          </styled.div>
          <Status className={css({ fontSize: "10px" })} status="saved" />
        </Flex>
        <Center justifyContent="center">
          <Button
            className={css({ mr: { base: "0", lg: "1rem" }, mt: { base: "15px", lg: "0.5rem" } })}
            iconId="ri-add-line"
            nativeButtonProps={{ onClick: () => createReportMutation.mutate() }}
          >
            Créer un CR
          </Button>
          <styled.div hideBelow="lg">
            <Input
              label={null}
              nativeInputProps={{
                value: search,
                onChange: (e) => setSearch(e.target.value),
              }}
              addon={
                <styled.div display="flex" pos="relative" alignItems="center">
                  <styled.div pos="absolute" left="-32px">
                    {search ? (
                      // @ts-expect-error dsfr buttons props must have children
                      <Button
                        iconId="ri-close-circle-fill"
                        nativeButtonProps={{
                          onClick: () => setSearch(""),
                        }}
                        size="small"
                        priority="tertiary no outline"
                      ></Button>
                    ) : null}
                  </styled.div>
                  <Button className={css({ position: "relative" })}>Rechercher</Button>
                </styled.div>
              }
            />
          </styled.div>
        </Center>
      </SimpleBanner>

      {search ? (
        <SearchResults hideEmpty search={search} />
      ) : (
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
            <Tabs.Content
              value="my"
              display="flex"
              justifyContent={{ base: "center", lg: "center" }}
              w="100%"
              px="16px"
            >
              <MyReports />
            </Tabs.Content>
            <Tabs.Content value="udap">
              <AllReports />
            </Tabs.Content>
          </Center>
        </Tabs.Root>
      )}
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
