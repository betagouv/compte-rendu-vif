import { SimpleBanner } from "#components/Banner.tsx";
import { Flex } from "#components/ui/Flex.tsx";
import { fr } from "@codegouvfr/react-dsfr";
import { Box, Typography } from "@mui/material";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/constat/$constatId")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Flex width="100%" height="100%" flexDirection="column" alignItems="center">
      <SimpleBanner width="100%" alignItems="flex-start">
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
        </Flex>
      </SimpleBanner>
      <Box width="926px"></Box>
    </Flex>
  );
}
