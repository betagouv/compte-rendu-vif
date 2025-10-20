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
import { Box, BoxProps, Typography } from "@mui/material";
import { Center, Input, Tile } from "#components/MUIDsfr.tsx";
import { useStyles } from "tss-react";
import { Tabs } from "#components/Tabs.tsx";
import { Button } from "#components/MUIDsfr.tsx";
import { fr } from "@codegouvfr/react-dsfr";
import { HomeImageSvg } from "#components/HomeImageSvg.tsx";

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
      <SimpleBanner pt={{ xs: "15px", lg: "82px" }} pb={{ xs: "49px", lg: "82px" }} alignItems="flex-start">
        <Flex width={{ xs: "100%", lg: "926px" }} flexDirection="column">
          <Typography
            variant="h2"
            px="16px"
            fontSize="32px"
            color={fr.colors.decisions.text.actionHigh.blueFrance.default}
          >
            Les outils du patrimoine en mobilité
          </Typography>

          <Flex alignItems="center" width="100%" flexDirection={{ xs: "column-reverse", lg: "row" }}>
            <Flex width={{ xs: "100%", lg: "588px" }} mt="48px" flexDirection="column" p="16px">
              <Typography variant="body1" px="16px" fontSize="20px">
                Que souhaitez-vous faire ?
              </Typography>
              <Tile
                sx={{ h3: { margin: "0 !important", fontSize: "18px !important" }, mt: "32px" }}
                small
                title="Créer un constat d'état"
                buttonProps={{}}
                noIcon
              />
              <Tile
                sx={{ h3: { margin: "0 !important", fontSize: "18px !important" }, mt: "16px" }}
                small
                title="Créer un compte-rendu"
                buttonProps={{}}
                noIcon
              />
            </Flex>
            <Box alignSelf={{ xs: "center", lg: "flex-end" }} ml={{ xs: "0", lg: "126px" }}>
              <HomeImageSvg />
            </Box>
          </Flex>
        </Flex>
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
      label: "Mes documents",
      props: {
        position: "absolute" as const,
        left: { xs: "24px", lg: "calc((100vw - 400px * 2 - 126px) / 2)" },
      },
      component: <DocumentSelector />,
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

const DocumentSelector = () => {
  const [selected, setSelected] = useState("constats");

  const selectedProps = {
    borderColor: fr.colors.decisions.border.active.blueFrance.default,
    color: fr.colors.decisions.text.actionHigh.blueFrance.default,
    marginBottom: "-1px",
    marginTop: "-1px",
    border: "1px solid",
  };

  return (
    <Flex width="100%" px="16px">
      <Flex
        border="1px solid"
        borderRadius="4px"
        borderColor={fr.colors.decisions.border.default.grey.default}
        mt="40px"
        width={{ xs: "100%", lg: "auto" }}
      >
        <Box
          py="8px"
          width={{ xs: "100%", lg: "240px" }}
          textAlign="center"
          borderRadius="4px"
          {...(selected === "constats" ? { ...selectedProps } : {})}
          sx={{ cursor: "pointer" }}
          onClick={() => setSelected("constats")}
        >
          constats
        </Box>
        <Box
          py="8px"
          width={{ xs: "100%", lg: "240px" }}
          textAlign="center"
          borderRadius="4px"
          {...(selected === "compte-rendus" ? selectedProps : {})}
          sx={{ cursor: "pointer" }}
          onClick={() => setSelected("compte-rendus")}
        >
          compte-rendus
        </Box>
      </Flex>
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
