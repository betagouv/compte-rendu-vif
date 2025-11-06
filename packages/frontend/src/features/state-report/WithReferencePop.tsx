import { useWatch } from "react-hook-form";
import { db, useDbQuery } from "../../db/db";
import { useStateReportFormContext } from "./utils";
import { Box } from "@mui/material";
import { Flex } from "#components/ui/Flex.tsx";
import { StateReportSummary } from "./StateReportSummary";
import { Tabs } from "#components/Tabs.tsx";
import { MonumentHistorique } from "./steps/MonumentHistorique";
import { fr } from "@codegouvfr/react-dsfr";

export const WithReferencePop = () => {
  const form = useStateReportFormContext();

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
            </Box>
            <Box
              borderLeft="1px solid"
              borderColor={fr.colors.decisions.border.default.grey.default}
              pr="24px"
              flex="1"
            >
              <MonumentHistorique />
            </Box>
          </Flex>
        )}
      </Box>
    </>
  );
};
