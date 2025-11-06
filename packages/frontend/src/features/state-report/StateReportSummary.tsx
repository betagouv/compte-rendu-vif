import { Accordion } from "#components/MUIDsfr.tsx";
import { fr } from "@codegouvfr/react-dsfr";
import { Box } from "@mui/material";
import { useIsDesktop } from "../../hooks/useIsDesktop";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import { StateReportStep } from "./utils";

export const StateReportSummary = () => {
  const isDesktop = useIsDesktop();
  if (isDesktop) return <SummaryContent />;

  return (
    <Accordion
      label="Le monument historique"
      sx={{ ".fr-collapse--expanded": { paddingTop: "0", px: "16px" }, borderBottom: "1px solid" }}
    >
      <SummaryContent />
    </Accordion>
  );
};

const routeApi = getRouteApi("/constat/$constatId");
const SummaryContent = () => {
  const navigate = useNavigate();
  const constatId = routeApi.useParams().constatId;
  const navigateToStep = (step: StateReportStep) => {
    navigate({ to: "/constat/$constatId", params: { constatId }, search: { step } });
  };
  return (
    <Box
      component="ul"
      sx={{
        "> li": { fontWeight: "bold", fontSize: "16px" },
        "> ul > li": {
          borderBottom: "1px solid",
          borderBottomColor: fr.colors.decisions.border.default.grey.default,
        },
        li: {
          listStyleType: "none",
          py: "12px",
        },
        ul: {
          marginTop: "0",
          marginBottom: "0",
        },
      }}
      pl="0"
    >
      <Box component="li">Le monument historique</Box>
      <Box component="ul" pl="8px">
        <Box component="li" onClick={() => navigateToStep("informations")}>
          Informations
        </Box>
        <Box component="li" onClick={() => navigateToStep("documents")}>
          Documents
        </Box>
      </Box>

      <Box component="li" mt="4px">
        Saisie du constat d'état
      </Box>
      <Box component="ul" pl="8px">
        <Box component="li" onClick={() => navigateToStep("contexte-visite")}>
          Contexte de la visite
        </Box>
        <Box component="li" onClick={() => navigateToStep("constat-general")}>
          Constat général
        </Box>
        <Box component="li" onClick={() => navigateToStep("constat-detaille")}>
          Constat détaillé
        </Box>
      </Box>
    </Box>
  );
};
