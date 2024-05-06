import { Center, Flex, styled } from "#styled-system/jsx";
import { createLazyFileRoute } from "@tanstack/react-router";
import { LoginForm } from "#components/LoginForm";
import { RedirectIfUser } from "#components/RedirectIfUser";

const LoginPage = () => {
  return (
    <Center mt="20px" mb="80px">
      <Flex flexDirection="column" w="484px" p="16px">
        <styled.h4>Connexion à Compte-rendu VIF</styled.h4>
        <LoginForm />
      </Flex>
    </Center>
  );
};

export const Route = createLazyFileRoute("/login")({
  component: () => (
    <RedirectIfUser>
      <LoginPage />
    </RedirectIfUser>
  ),
});
