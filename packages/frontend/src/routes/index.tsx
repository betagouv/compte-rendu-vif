import { Banner } from "#components/Banner";
import { EnsureUser } from "#components/EnsureUser";
import { SearchResults } from "#components/ReportSearch.tsx";
import { Status } from "#components/SyncForm";
import { useStatus } from "@powersync/react";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { v4 } from "uuid";
import { useUser } from "../contexts/AuthContext";
import { db } from "../db/db";
import { AllReports, MyReports } from "../features/ReportList";
import { Flex } from "#components/ui/Flex.tsx";
import { Box, BoxProps } from "@mui/material";
import { Center, Input } from "#components/MUIDsfr.tsx";
import { useStyles } from "tss-react";
import { Tabs } from "#components/Tabs.tsx";
import { Button } from "#components/MUIDsfr.tsx";

const Index = () => {
  const [search, setSearch] = useState("");
  const user = useUser()!;

  const { css } = useStyles();

  const navigate = useNavigate();

  const createReportMutation = useMutation({
    mutationFn: async () => {
      const id = "report-" + v4();
      await db
        .insertInto("report")
        .values({
          id,
          createdBy: user.id,
          createdAt: new Date().toISOString(),
          meetDate: new Date().toISOString(),
          disabled: 0,
          udap_id: user.udap_id,
          redactedBy: user.name,
          redactedById: user.id,
        })
        .execute();

      return id;
    },
    onSuccess: (id) => {
      id && navigate({ to: "/edit/$reportId", params: { reportId: id } });
    },
  });

  return (
    <Flex flexDirection="column" color="text-label-grey">
      <SimpleBanner pt={{ xs: "15px", lg: "82px" }} pb={{ xs: "49px", lg: "82px" }}>
        <Flex
          sx={{
            display: { xs: "flex", lg: "none" },
          }}
          justifyContent="space-between"
          width="100%"
          px="16px"
        >
          <Box fontSize="16px" fontWeight="bold">
            Compte-rendu VIF
          </Box>
          <Status className={css({ fontSize: "10px" })} status="saved" />
        </Flex>
        <Center justifyContent="center">
          <Box display="flex" mr={{ xs: 0, lg: "1rem" }} mt={{ xs: "28px", lg: 0 }} mb={{ xs: "-12px", lg: 0 }}>
            <Button
              iconId="ri-add-line"
              data-testid="create-report"
              nativeButtonProps={{ onClick: () => createReportMutation.mutate() }}
            >
              Créer un CR
            </Button>
          </Box>
          <Box sx={{ display: { xs: "none", lg: "block" } }}>
            <Input
              sx={{
                "& input": {
                  width: "334px",
                  bgcolor: "white !important",
                },
                "& .fr-input-wrap": {
                  mt: 0,
                },
              }}
              label={null}
              nativeInputProps={{
                value: search,
                onChange: (e) => setSearch(e.target.value),
                placeholder: "Rechercher nom, ville, titre...",
              }}
              addon={
                <Box display="flex" position="relative" alignItems="center">
                  <Box position="absolute" left="-32px">
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
                  </Box>
                  <Button className={css({ position: "relative" })}>Rechercher</Button>
                </Box>
              }
            />
          </Box>
        </Center>
      </SimpleBanner>

      {search ? <SearchResults hideEmpty search={search} /> : <MainContentTabs />}
    </Flex>
  );
};

const MainContentTabs = () => {
  const user = useUser()!;

  const options = [
    {
      id: "my",
      label: user.name,
      props: {
        position: "absolute" as const,
        left: { xs: "24px", lg: "calc((100vw - 400px * 2 - 126px) / 2)" },
      },
      component: <MyReports />,
    },
    {
      id: "udap",
      label: "UDAP",
      props: {
        position: "absolute" as const,
        left: "16px",
      },
      component: <AllReports />,
    },
  ];

  return (
    <Flex flex="1" flexDirection="column" pb={{ xs: "16px", lg: "0" }}>
      <Tabs options={options} />
    </Flex>
  );
};

const SimpleBanner = (props: Omit<BoxProps, "ref">) => {
  const powerSyncStatus = useStatus();

  const isOk = powerSyncStatus.connected || powerSyncStatus.connecting;
  const status = isOk ? "saved" : "offline";

  return <Banner status={status} {...props} />;
};

export const Route = createFileRoute("/")({
  component: () => (
    <EnsureUser>
      <Index />
    </EnsureUser>
  ),
});
