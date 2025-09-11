import { Banner } from "#components/Banner";
import { EnsureUser } from "#components/EnsureUser";
import { SearchResults } from "#components/ReportSearch.tsx";
import { Status } from "#components/SyncForm";
import { css } from "#styled-system/css";
import Button from "@codegouvfr/react-dsfr/Button";
import Input from "@codegouvfr/react-dsfr/Input";
import { useStatus } from "@powersync/react";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { v4 } from "uuid";
import { useUser } from "../contexts/AuthContext";
import { db } from "../db/db";
import { AllReports, MyReports } from "../features/ReportList";
import { Flex } from "#components/ui/Flex.tsx";
import { Box, BoxProps, styled, Tab, Tabs } from "@mui/material";
import { Center } from "#components/ui/Center.tsx";
import { Button as MUIButton } from "@mui/material";
import { useStyles } from "tss-react";
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
              className={css({
                "& input": {
                  width: "334px",
                  bgColor: "white !important",
                },
                "& .fr-input-wrap": {
                  mt: 0,
                },
              })}
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
  const [value, setValue] = useState("my");
  const user = useUser()!;

  const options = [
    {
      id: "my",
      label: user.name,
      props: {
        position: "absolute" as const,
        left: { xs: "24px", lg: "calc((100vw - 400px * 2 - 126px) / 2 + 100px)" },
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
      <Flex flex="1" flexDirection={"row"} justifyContent={"center"} width="100%" height="56px" overflow="hidden">
        {options.map((option) => (
          <TabButton
            key={option.id}
            selected={value === option.id}
            onClick={() => setValue(option.id)}
            aria-controls={`tabpanel-${option.id}`}
            id={`tab-${option.id}`}
            {...option.props}
          >
            <Box sx={option.props}>{option.label}</Box>
          </TabButton>
        ))}
      </Flex>

      <Box flex="1">
        {options.map((option) => (
          <TabPanel key={option.id} value={value} id={option.id}>
            {option.component}
          </TabPanel>
        ))}
      </Box>
    </Flex>
  );
};

const TabButton = styled(Button)<{ selected?: boolean }>(({ selected, theme }) => ({
  backgroundColor: selected ? "white" : "#ececfe",
  color: "black",
  fontSize: "16px",
  [theme.breakpoints.up("lg")]: {
    fontSize: "20px",
  },
  fontWeight: "bold",
  position: "relative",
  flex: "1",
  justifyContent: "start",
  textAlign: "left",
  zIndex: selected ? "2" : "1",
  height: "56px",
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  boxShadow: selected ? "6px 0px 10px 3px rgba(0, 0, 0, .05), -6px 0px 10px 3px rgba(0, 0, 0, .05)" : "none",
  ":hover": {
    backgroundColor: selected ? "white !important" : "#dadafd !important",
  },
}));

const TabPanel = (props: { children?: React.ReactNode; value: string; id: string }) => {
  const { children, value, id, ...rest } = props;
  return (
    <Box role="tabpanel" hidden={value !== id} id={`tabpanel-${id}`} aria-labelledby={`tab-${id}`} {...rest}>
      {value === id && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
};

const SimpleBanner = (props: Omit<BoxProps, "ref">) => {
  const powerSyncStatus = useStatus();
  const status = powerSyncStatus.connected ? "saved" : "offline";

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
