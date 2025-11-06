import { useWatch } from "react-hook-form";
import { db, useDbQuery } from "../../db/db";
import { useStateReportFormContext } from "./utils";
import { Box } from "@mui/material";
import { Flex } from "#components/ui/Flex.tsx";
import { StateReportSummary } from "./StateReportSummary";
import { Tabs } from "#components/Tabs.tsx";
import { MonumentHistorique } from "./steps/MonumentHistorique";
import { fr } from "@codegouvfr/react-dsfr";
import { getRouteApi } from "@tanstack/react-router";
import { Button, Center } from "#components/MUIDsfr.tsx";
import { ContexteVisite } from "./steps/ContexteVisite";
import { useIsDesktop } from "../../hooks/useIsDesktop";

export const WithReferencePop = () => {
  const form = useStateReportFormContext();
  const isDesktop = useIsDesktop();
  const referencePop = useWatch({ control: form.control, name: "reference_pop" });
  const immeubleQuery = useDbQuery(db.selectFrom("pop_immeubles").selectAll().where("id", "=", referencePop));

  const hasReferencePop = !!referencePop;
  if (!hasReferencePop) return null;

  return (
    <>
      <Box width="100%">
        {immeubleQuery.isLoading && <div>Chargement de l'immeuble...</div>}
        {immeubleQuery.error && (
          <div>Erreur lors du chargement de l'immeuble : {String(immeubleQuery.error.message)}</div>
        )}
        {immeubleQuery.data && (
          <Flex height="100%" width="100%" flexDirection={{ xs: "column", lg: "row" }} gap={{ xs: "0", lg: "24px" }}>
            <Box minWidth="280px">
              <StateReportSummary />
              {isDesktop ? <ButtonsSwitch /> : null}
            </Box>
            <Box
              borderLeft={{ xs: "none", lg: "1px solid" }}
              borderColor={fr.colors.decisions.border.default.grey.default + " !important"}
              flex="1"
            >
              <ContentSwitch />
              {isDesktop ? null : <ButtonsSwitch />}
            </Box>
          </Flex>
        )}
      </Box>
    </>
  );
};

const routeApi = getRouteApi("/constat/$constatId");

const ContentSwitch = () => {
  const { step } = routeApi.useSearch();
  return (
    <>
      <Box
        sx={{
          display: step === "informations" ? "block" : "none",
        }}
      >
        <MonumentHistorique />
      </Box>
      <Box
        sx={{
          display: step === "contexte-visite" ? "block" : "none",
        }}
      >
        <ContexteVisite />
      </Box>
    </>
  );
};

const ButtonsSwitch = () => {
  const { step } = routeApi.useSearch();
  const navigate = routeApi.useNavigate();
  return (
    <Center mt={{ xs: "16px", lg: "24px" }} mb={{ xs: "16px", lg: "0" }}>
      <Box
        sx={{
          display: step === "informations" ? "block" : "none",
        }}
      >
        <Button
          iconPosition="right"
          iconId="ri-arrow-right-fill"
          size="large"
          nativeButtonProps={{
            onClick: () => navigate({ search: { step: "contexte-visite" } }),
          }}
        >
          Context de la visite
        </Button>
      </Box>
    </Center>
  );
};
