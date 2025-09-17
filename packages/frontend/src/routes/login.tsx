import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LoginForm } from "#components/LoginForm";
import { RedirectIfUser } from "#components/RedirectIfUser";
import { Center } from "#components/MUIDsfr.tsx";
import { Flex } from "#components/ui/Flex.tsx";
import { Typography } from "@mui/material";

const LoginPage = () => {
  return (
    <Center mt="20px" mb="80px">
      <Flex flexDirection="column" width="484px" p="16px">
        <Typography variant="h4" mb="1.5rem">
          Connexion à Compte-rendu VIF
        </Typography>
        <LoginForm />
      </Flex>
    </Center>
  );
};

export const Route = createFileRoute("/login")({
  component: () => {
    return (
      <RedirectIfUser>
        <LoginPage />
      </RedirectIfUser>
    );
  },
});
