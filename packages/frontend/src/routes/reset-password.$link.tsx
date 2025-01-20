import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { Center, Flex, styled } from "#styled-system/jsx";
import { FullWidthButton } from "#components/FullWidthButton";
import { SignupPasswordInput } from "#components/SignupForm";
import { useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { MutationAlert } from "#components/MutationAlert.js";

const ResetPasswordAction = () => {
  const form = useForm<any>();
  const { link } = Route.useParams();

  const mutation = useMutation(async (body: ResetPasswordActionForm) => {
    const result = await api.post("/api/reset-password", { body: { newPassword: body.password, temporaryLink: link } });

    form.reset();

    return result;
  });

  return (
    <Center mt="20px" mb="80px">
      <Flex flexDirection="column" w="484px" p="16px">
        <styled.h4>Récupération de mot de passe pour Compte-rendu VIF</styled.h4>
        <p>Veuillez saisir votre nouveau mot de passe</p>

        <form onSubmit={form.handleSubmit((values) => mutation.mutate(values))}>
          <SignupPasswordInput form={form} />

          <FullWidthButton type="submit">Valider</FullWidthButton>
        </form>

        <MutationAlert mutation={mutation} />
      </Flex>
    </Center>
  );
};

type ResetPasswordActionForm = {
  password: string;
};

export const Route = createFileRoute("/reset-password/$link")({
  component: () => <ResetPasswordAction />,
});
