import { Center, Flex, styled } from "#styled-system/jsx";
import { createLazyFileRoute, useParams } from "@tanstack/react-router";
import { FullWidthButton } from "../components/FullWidthButton";
import Input from "@codegouvfr/react-dsfr/Input";
import { useForm } from "react-hook-form";
import { PasswordInput } from "../components/PasswordInput";

const ResetPasswordAction = () => {
  const form = useForm<any>();
  const { link } = Route.useParams();
  // const mutation = trpc.resetPassword.useMutation();

  const resetPassword = async (values: any) => {
    //  const result = await mutation.mutateAsync(values);
    //  console.log(result);
  };

  return (
    <Center mt="20px" mb="80px">
      <Flex flexDirection="column" w="484px" p="16px">
        <styled.h4>Récupération de mot de passe pour Compte-rendu VIF</styled.h4>
        <p>
          Veuillez saisir l’adresse courriel associée à votre compte. Nous vous enverrons un lien pour réinitialiser
          votre mot de passe.
        </p>

        <form onSubmit={form.handleSubmit(resetPassword)}>
          {/* TODO: LA */}
          <PasswordInput />

          <FullWidthButton type="submit">Valider</FullWidthButton>
        </form>
      </Flex>
    </Center>
  );
};

export const Route = createLazyFileRoute("/reset-password/$link")({
  component: () => <div>Hello /reset-password/$link!</div>,
});
