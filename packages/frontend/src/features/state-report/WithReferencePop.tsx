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
  console.log(referencePop, immeubleQuery.data);
  if (!hasReferencePop) return null;

  return (
    <>
      <Box>
        {immeubleQuery.isLoading && <div>Chargement de l'immeuble...</div>}
        {immeubleQuery.error && (
          <div>Erreur lors du chargement de l'immeuble : {String(immeubleQuery.error.message)}</div>
        )}
        {immeubleQuery.data && (
          <Flex width="100%" height="100%" flexDirection="column">
            <StateReportSummary />
            <Tabs
              options={[
                {
                  component: <MonumentHistorique />,
                  label: "Informations",
                  id: "monument-historique",
                  props: { color: fr.colors.decisions.text.actionHigh.blueFrance.default },
                },
                {
                  component: <div>Documents</div>,
                  label: "Documents",
                  id: "documents",
                  props: { color: fr.colors.decisions.text.actionHigh.blueFrance.default },
                },
              ]}
            />
          </Flex>
        )}
      </Box>
    </>
  );
};
