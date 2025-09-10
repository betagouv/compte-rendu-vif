import { createLazyFileRoute } from "@tanstack/react-router";
import { SignupForm } from "#components/SignupForm";
import { styled } from "#styled-system/jsx";
import { RedirectIfUser } from "#components/RedirectIfUser";
import { Center } from "#components/ui/Center.tsx";
import { Flex } from "#components/ui/Flex.tsx";
import { Typography } from "@mui/material";

const SignupPage = () => {
  return (
    <Center mt="20px" mb="80px">
      <Flex flexDirection="column" width="484px" p="16px">
        <Typography variant="h4" mb="1.5rem">
          Inscription à Compte-rendu VIF
        </Typography>
        <SignupForm />
      </Flex>
    </Center>
  );
};

export const Route = createLazyFileRoute("/signup")({
  component: () => (
    <RedirectIfUser>
      <SignupPage />
    </RedirectIfUser>
  ),
});
