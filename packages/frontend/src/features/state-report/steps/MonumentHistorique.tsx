import { Flex } from "#components/ui/Flex.tsx";
import { Box, Typography } from "@mui/material";
import { StateReportFormType, useStateReportFormContext } from "../utils";
import { useWatch } from "react-hook-form";
import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "#components/MUIDsfr.tsx";

export const MonumentHistorique = () => {
  const form = useStateReportFormContext();
  const value = useWatch({ control: form.control, name: "reference_pop" });
  return (
    <Flex flexDirection="column">
      <Flex flexDirection="column" p="16px" gap="16px">
        <EditableField label="Nature de l'édifice" field="nature_edifice" />
        <EditableField label="Référence pop" field="reference_pop" />
        <EditableField label="Adresse" field="adresse" />
        <EditableField label="Commune" field="commune" />
        <EditableField label="Référence cadastrale" field="reference_cadastrale" />
        <EditableField label="Période de construction" field="periode_construction" />
        <EditableField label="Nature de la protection" field="nature_protection" />
        <EditableField label="Parties protégées" field="parties_protegees" />
        <EditableField label="Description de l'édifice" field="description" />
      </Flex>

      <Box width="100%" bgcolor={fr.colors.decisions.background.contrast.info.default} px={{ sx: "16px" }} py="18px">
        <Box
          component="a"
          ml="16px"
          sx={{ borderBottom: "1px solid" }}
          href={`https://pop.culture.gouv.fr/notice/merimee/${value}`}
          target="_blank"
          rel="noopener external"
          title="Libellé lien - nouvelle fenêtre"
          className="fr-link fr-icon-external-link-line fr-link--icon-left"
        >
          En savoir plus sur l'édifice
        </Box>
      </Box>
    </Flex>
  );
};

const EditableField = ({ label, field }: { label: string; field: keyof StateReportFormType }) => {
  const isEditable = false;

  const form = useStateReportFormContext();
  const value = useWatch({ control: form.control, name: field });

  return (
    <Flex flexDirection="column">
      <Typography variant="subtitle1" fontWeight="bold">
        {label}
      </Typography>
      <Typography mt="8px">{value ?? "Non renseigné"}</Typography>
    </Flex>
  );
};
