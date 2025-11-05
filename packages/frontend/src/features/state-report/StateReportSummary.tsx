import { Accordion } from "#components/MUIDsfr.tsx";
import { fr } from "@codegouvfr/react-dsfr";
import { Box } from "@mui/material";
import { useIsDesktop } from "../../hooks/useIsDesktop";

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

const SummaryContent = () => {
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
        <Box component="li">Informations</Box>
        <Box component="li">Documents</Box>
      </Box>

      <Box component="li" mt="4px">
        Saisie du constat d'état
      </Box>
      <Box component="ul" pl="8px">
        <Box component="li">Contexte de la visite</Box>
        <Box component="li">Constat général</Box>
        <Box component="li">Constat détaillé</Box>
      </Box>
    </Box>
  );
};
