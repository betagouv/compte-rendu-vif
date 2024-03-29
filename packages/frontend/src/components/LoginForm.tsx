import { Divider, Flex, styled } from "#styled-system/jsx";
import { forwardRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RouterInputs, trpc } from "../api";
import Input from "@codegouvfr/react-dsfr/Input";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { PasswordInput } from "./PasswordInput";
import { Link } from "@tanstack/react-router";
import { FullWidthButton } from "./FullWidthButton";
import { css, cva } from "#styled-system/css";
import { InputGroup } from "./InputGroup";
import { useAuthContext } from "../contexts/AuthContext";

export const LoginForm = () => {
  const [_, setData] = useAuthContext();
  const form = useForm<RouterInputs["login"]>();

  const mutation = trpc.login.useMutation();

  const login = async (values: RouterInputs["login"]) => {
    const response = await mutation.mutateAsync(values);
    setData(response);
  };

  const { error: mutationError } = mutation;
  const { errors: formErrors } = form.formState;

  return (
    <Flex direction="column">
      <form onSubmit={form.handleSubmit(login)}>
        {mutationError ? (
          <Alert
            className={css({ mb: "1.5rem" })}
            severity="error"
            title={<styled.span fontWeight="regular">{mutationError.message}</styled.span>}
          />
        ) : null}
        <InputGroup state={mutationError ? "error" : undefined}>
          <Input
            label="Courriel"
            hintText="prenom.nom@culture.gouv.fr"
            nativeInputProps={{
              type: "email",
              autoComplete: "username",
              ...form.register("email", {
                required: "Le courriel est requis",
                pattern: { value: /\S+@\S+\.\S+/, message: "Le courriel n'est pas valide" },
              }),
            }}
            state={formErrors.email ? "error" : undefined}
            stateRelatedMessage={formErrors.email?.message}
          />
          <PasswordInput
            state={formErrors?.password ? "error" : undefined}
            nativeInputProps={{
              autoComplete: "current-password",
              ...form.register("password", {
                required: "Le mot de passe est requis",
                minLength: {
                  value: 8,
                  message: "Le mot de passe doit contenir au moins 8 caractères",
                },
              }),
            }}
          />
        </InputGroup>

        <styled.div color="text.actionHigh.blueFrance">
          <Link to="/reset-password">Mot de passe oublié</Link>
        </styled.div>

        <FullWidthButton className={css({ mt: "1.5rem " })} type="submit" onClick={form.handleSubmit(login)}>
          Se connecter
        </FullWidthButton>
      </form>

      <Divider my="20px" color="#DDDDDD" />

      <h5>Vous n'avez pas de compte ?</h5>

      <FullWidthButton priority="secondary" onClick={() => {}}>
        <Link to="/signup">Créer un compte</Link>
      </FullWidthButton>
    </Flex>
  );
};
