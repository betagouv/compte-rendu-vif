import { Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FullWidthButton } from "#components/FullWidthButton.tsx";
import { InputGroup } from "#components/InputGroup.tsx";
import { PasswordInput } from "#components/PasswordInput.tsx";
import { Flex } from "#components/ui/Flex.tsx";
import { unauthenticatedApi, getErrorMessage, RouterInputs, AuthUser } from "../../api";
import { useAuthContext } from "../../contexts/AuthContext";
import { Alert, Input } from "#components/MUIDsfr.tsx";
import { Box, Typography } from "@mui/material";
import { fr } from "@codegouvfr/react-dsfr";
import { Divider } from "#components/ui/Divider.tsx";

export const LoginForm = () => {
  const { auth, setAuth } = useAuthContext();
  const form = useForm<LoginFormProps>();

  const mutation = useMutation((body: LoginFormProps) => unauthenticatedApi.post("/api/login-user", { body }));

  const [shouldShowPopup] = useState(localStorage.getItem("crvif/update-popup"));

  const navigate = useNavigate();

  const login = async (values: LoginFormProps) => {
    const response = await mutation.mutateAsync(values);
    localStorage.setItem("crvif/version", "1");
    localStorage.removeItem("crvif/update-popup");
    setAuth(response as any);

    navigate({ to: "/", search: { document: "constats" } });
  };

  const { error: mutationError } = mutation;
  const { errors: formErrors } = form.formState;

  return (
    <Flex flexDirection="column">
      <form onSubmit={form.handleSubmit(login)}>
        {mutationError ? (
          <Alert
            sx={{ mb: "1.5rem" }}
            severity="error"
            title={<Typography fontWeight="regular">{getErrorMessage(mutationError)}</Typography>}
          />
        ) : null}
        {shouldShowPopup && !mutationError ? (
          <Alert
            sx={{ mb: "1.5rem" }}
            severity="info"
            title="Vous avez été déconnecté suite à une mise à jour de l'application."
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
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Le courriel n'est pas valide",
                },
              }),
            }}
            state={formErrors.email ? "error" : undefined}
            stateRelatedMessage={formErrors.email?.message as string}
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

        <Box color={fr.colors.decisions.text.actionHigh.blueFrance.default}>
          <Link to="/reset-password">Mot de passe oublié</Link>
        </Box>

        <FullWidthButton
          style={{
            marginTop: "1.5rem",
          }}
          type="submit"
          nativeButtonProps={{ type: "submit" }}
          onClick={form.handleSubmit(login)}
        >
          Se connecter
        </FullWidthButton>
      </form>

      <Divider my="20px" />

      <h5>Vous n'avez pas de compte ?</h5>

      <FullWidthButton linkProps={{ to: "/inscription" }} priority="secondary">
        Créer un compte
      </FullWidthButton>
    </Flex>
  );
};

export type LoginFormProps = RouterInputs<"/api/login-user">["body"];
