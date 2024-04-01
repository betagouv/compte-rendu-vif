import { css } from "#styled-system/css";
import { Divider, Flex, styled } from "#styled-system/jsx";
import Alert from "@codegouvfr/react-dsfr/Alert";
import Input from "@codegouvfr/react-dsfr/Input";
import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { RouterInputs, trpc } from "../api";
import { useAuthContext } from "../contexts/AuthContext";
import { FullWidthButton } from "./FullWidthButton";
import { InputGroup } from "./InputGroup";
import { PasswordInput } from "./PasswordInput";

export const LoginForm = () => {
  const [_, setAuthData] = useAuthContext();
  const form = useForm<RouterInputs["login"]>();

  const navigate = useNavigate();

  const mutation = trpc.login.useMutation();

  const login = async (values: RouterInputs["login"]) => {
    const response = await mutation.mutateAsync(values);
    setAuthData(response);

    const shouldRedirectTo = new URLSearchParams(window.location.search).get("redirect") || "/";
    navigate({ to: shouldRedirectTo });
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

        <FullWidthButton className={css({ mt: "1.5rem" })} type="submit" onClick={form.handleSubmit(login)}>
          Se connecter
        </FullWidthButton>
      </form>

      <Divider my="20px" color="#DDDDDD" />

      <h5>Vous n'avez pas de compte ?</h5>

      <FullWidthButton linkProps={{ to: "/signup" }} priority="secondary">
        Créer un compte
      </FullWidthButton>
    </Flex>
  );
};
