import { SimpleBanner } from "#components/Banner.tsx";
import { Flex } from "#components/ui/Flex.tsx";
import { fr } from "@codegouvfr/react-dsfr";
import { Box, Typography } from "@mui/material";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ImmeubleAutocomplete } from "../features/ImmeubleAutocomplete";
import { FormProvider } from "react-hook-form";
import { db, useDbQuery } from "../db/db";
import { StateReport } from "../db/AppSchema";

export const Route = createFileRoute("/constat/$constatId")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Flex width="100%" height="100%" flexDirection="column" alignItems="center">
      <SimpleBanner width="100%" alignItems="flex-start" py="20px">
        <Flex width={{ xs: "100%", lg: "926px" }} flexDirection="column">
          <Link to="/" style={{ textDecoration: "underline" }}>
            <Typography fontSize="12px" color={fr.colors.decisions.text.mention.grey.default}>
              Retour à l'accueil
            </Typography>
          </Link>

          <Typography fontSize="28px" variant="h2" mt="24px">
            Constat d'état
          </Typography>

          <Typography mt="24px">
            Récupérez les informations d'un monument historique puis saisissez votre constat :
          </Typography>

          <ImmeubleAutocomplete />
        </Flex>
      </SimpleBanner>
      <Box width="926px"></Box>
    </Flex>
  );
}

const WithStateReport = ({ stateReport }: { stateReport: StateReport }) => {
  return <Flex flexDirection="column">{<StateReportForm />}</Flex>;
};

const StateReportForm = () => {
  const { constatId } = Route.useParams();

  const reportQuery = useDbQuery(db.selectFrom("state_report").where("id", "=", constatId).selectAll());

  return (
    <Flex flexDirection="column">
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <SyncFormBanner form={form} baseObject={report} />
          <Tabs control={[tab ?? "info", setTab]} options={options} />
        </form>
      </FormProvider>
    </Flex>
  );
};
