import { Center, Flex, styled } from "#styled-system/jsx";
import Input from "@codegouvfr/react-dsfr/Input";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { FullWidthButton } from "../components/FullWidthButton";

const ResetPasswordPage = () => {
  const form = useForm<ResetPasswordFormProps>();

  // TODO: implement mutation
  // const mutation =

  const generateResetLink = async (_: { email: string }) => {
    // const result = await mutation.mutateAsync(values);
    // console.log(result);
  };

  return (
    <Center mt="20px" mb="80px">
      <Flex flexDirection="column" w="484px" p="16px">
        <styled.h4>Récupération de mot de passe pour Compte-rendu VIF</styled.h4>
        <p>
          Veuillez saisir l’adresse courriel associée à votre compte. Nous vous enverrons un lien pour réinitialiser
          votre mot de passe.
        </p>

        <form onSubmit={form.handleSubmit(generateResetLink)}>
          <Input
            label="Courriel"
            hintText="prenom.nom@culture.gouv.fr"
            nativeInputProps={form.register("email", {
              required: "Le courriel est requis",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Le courriel n'est pas valide",
              },
            })}
          />

          <FullWidthButton type="submit">Valider</FullWidthButton>
        </form>
      </Flex>
    </Center>
  );
};

export const Route = createLazyFileRoute("/reset-password/")({
  component: () => <ResetPasswordPage />,
});

type ResetPasswordFormProps = any;
