import { Flex } from "#components/ui/Flex.tsx";
import { Box, BoxProps, LinkBaseProps, LinkProps, styled, Typography } from "@mui/material";
import { StateReportFormType, useStateReportFormContext } from "../utils";
import { useWatch } from "react-hook-form";
import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "#components/MUIDsfr.tsx";
import { PropsWithChildren } from "react";
import { IconLink } from "#components/ui/IconLink.tsx";

export const MonumentHistorique = () => {
  const form = useStateReportFormContext();
  const value = useWatch({ control: form.control, name: "reference_pop" });
  return (
    <Flex flexDirection="column" height="100%">
      <Flex
        flexDirection="column"
        gap={{ xs: "8px", lg: "16px" }}
        px={{ xs: "16px", lg: "64px" }}
        pt={{ xs: "0", lg: "32px" }}
        width="100%"
        flex="1"
      >
        <ContentBlock mt={{ xs: "16px", lg: "0" }}>
          <EditableField label="Nature de l'édifice" field="nature_edifice" />
          <EditableField label="Référence pop" field="reference_pop" />
        </ContentBlock>
        <ContentBlock>
          <EditableField label="Adresse" field="adresse" />
          <EditableField label="Commune" field="commune" />
          <EditableField label="Commune historique" field="commune_historique" />
          <EditableField label="Référence cadastrale" field="reference_cadastrale" />
        </ContentBlock>
        <ContentBlock>
          <EditableField label="Nature de la protection" field="nature_protection" />
          <EditableField label="Période de construction" field="periode_construction" />
          <EditableField label="Parties protégées" field="parties_protegees" />
          <EditableField label="Description de l'édifice" field="description" />
        </ContentBlock>
      </Flex>
      <Box position="relative" height="60px" width="100%" mt={{ xs: "16px", lg: "32px" }}>
        <Box
          height="60px"
          bgcolor={fr.colors.decisions.background.contrast.info.default}
          py="18px"
          position="absolute"
          top="0"
          left="0"
          right="calc(-100vw + 100%)"
          bottom="0"
        >
          <IconLink
            href={`https://pop.culture.gouv.fr/notice/merimee/${value}`}
            title="En savoir plus sur l'édifice - Nouvelle fenêtre"
            target="_blank"
            rel="noopener external"
            icon="fr-icon-external-link-line"
            sx={{ ml: "16px" }}
          >
            En savoir plus sur l'édifice
          </IconLink>
        </Box>
      </Box>
    </Flex>
  );
};

export const ContentBlock = (props: PropsWithChildren<BoxProps>) => {
  return (
    <Flex
      flexDirection={{ xs: "column", lg: "row" }}
      borderBottom={{ xs: "1px solid", lg: "1px solid" }}
      gap={{ xs: "8px", lg: "0" }}
      pb="16px"
      borderColor={fr.colors.decisions.border.default.grey.default + " !important"}
      sx={{ "> div": { width: { xs: "auto", lg: "50%" } }, "> div:nth-child(n+3)": { mt: { xs: "0", lg: "16px" } } }}
      flexWrap={{ lg: "wrap" }}
      {...props}
    >
      {props.children}
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
      <Typography mt="4px">{value ?? "Non renseigné"}</Typography>
    </Flex>
  );
};
