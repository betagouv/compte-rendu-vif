import { Center, Flex, styled } from "#styled-system/jsx";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";

const ResetPasswordPage = () => {
  const form = useForm();
  return (
    <Center mt="20px" mb="80px">
      <Flex flexDirection="column" w="484px" p="16px">
        <styled.h4>Récupération de mot de passe pour Compte-rendu VIF</styled.h4>
        <p>
          Veuillez saisir l’adresse courriel associée à votre compte. Nous vous enverrons un lien pour réinitialiser
          votre mot de passe.
        </p>
      </Flex>
    </Center>
  );
};

export const Route = createLazyFileRoute("/reset-password")({
  component: () => <ResetPasswordPage />,
});
