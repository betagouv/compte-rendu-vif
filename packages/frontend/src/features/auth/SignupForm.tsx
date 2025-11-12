import { type UseFormReturn, useForm, useWatch } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Flex } from "#components/ui/Flex.tsx";
import { getErrorMessage, RouterInputs, unauthenticatedApi } from "../../api";
import { Alert, Input, Select } from "#components/MUIDsfr.tsx";
import { Typography } from "@mui/material";
import { Divider } from "#components/ui/Divider.tsx";
import { useAuthContext } from "../../contexts/AuthContext";
import { InputGroup } from "#components/InputGroup.tsx";
import { FullWidthButton } from "#components/FullWidthButton.tsx";
import { PasswordInput } from "#components/PasswordInput.tsx";
import { useNavigate } from "@tanstack/react-router";

export const SignupForm = () => {
  const form = useForm<SignupFormProps>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      service_id: "",
    },
  });

  const { setAuth } = useAuthContext();
  const navigate = useNavigate();

  const mutation = useMutation((body: SignupFormProps) => unauthenticatedApi.post("/api/create-user", { body }));

  const servicesQuery = useQuery({
    queryKey: ["udaps"],
    queryFn: async () => {
      const response = await unauthenticatedApi.get("/api/services");
      return response;
    },
    onError: (error) => console.error(error),
  });

  const signup = async (values: SignupFormProps) => {
    const response = await mutation.mutateAsync(values);
    setAuth(response as any);
    navigate({ to: "/", search: { document: "constats" } });
  };

  const { errors: formErrors } = form.formState;
  const { error: mutationError } = mutation;

  return (
    <Flex flexDirection="column">
      <Typography variant="h4" mb="24px">
        Inscription à Patrimoine Embarqué
      </Typography>
      <form onSubmit={form.handleSubmit(signup)}>
        {mutationError ? (
          <Alert
            sx={{
              mb: "1.5rem",
            }}
            severity="error"
            title={<Typography fontWeight="regular">{getErrorMessage(mutationError)}</Typography>}
          />
        ) : null}
        <InputGroup state={mutationError ? "error" : undefined}>
          <Input
            label="Prénom Nom"
            nativeInputProps={{
              ...form.register("name", { required: "Le nom est requis" }),
            }}
            state={formErrors.name ? "error" : undefined}
            stateRelatedMessage={formErrors.name?.message}
          />
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
            stateRelatedMessage={formErrors.email?.message}
          />

          <SignupPasswordInput form={form} />

          <Select
            label="Service"
            nativeSelectProps={form.register("service_id", { required: "Le service est requis" })}
            state={formErrors.service_id ? "error" : undefined}
            stateRelatedMessage={formErrors.service_id?.message}
          >
            <option value="" disabled hidden>
              Sélectionnez un service
            </option>
            {servicesQuery.data?.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </Select>

          <Input
            label="Fonction"
            nativeInputProps={{ ...form.register("job", { required: "La fonction est requise" }) }}
            state={formErrors.job ? "error" : undefined}
            stateRelatedMessage={formErrors.job?.message}
          />
        </InputGroup>

        <FullWidthButton
          style={{
            marginTop: "1.5rem",
          }}
          type="submit"
          nativeButtonProps={{ type: "submit" }}
        >
          Valider
        </FullWidthButton>
      </form>

      <Divider my="20px" color="#DDDDDD" />

      <h5>Vous avez déjà un compte ?</h5>

      <FullWidthButton priority="secondary" linkProps={{ to: "/connection" }} style={{ marginBottom: "32px" }}>
        Se connecter
      </FullWidthButton>
    </Flex>
  );
};

export const SignupPasswordInput = ({ form }: { form: UseFormReturn<SignupFormProps> }) => {
  const value = useWatch({ control: form.control, name: "password" });

  const hasNumber = /\d/.test(value);
  const hasUpperCase = /[A-Z]/.test(value);
  const hasLowerCase = /[a-z]/.test(value);
  const hasSpecial = /[^A-Za-z0-9]/.test(value);

  const formErrors = form.formState.errors;

  return (
    <PasswordInput
      state={formErrors.password ? "error" : undefined}
      messages={
        formErrors.password
          ? [
              {
                message: "Un chiffre",
                severity: hasNumber ? "valid" : "error",
              },
              {
                message: "Une majuscule",
                severity: hasUpperCase ? "valid" : "error",
              },
              {
                message: "Une minuscule",
                severity: hasLowerCase ? "valid" : "error",
              },
              {
                message: "Un caractère spécial",
                severity: hasSpecial ? "valid" : "error",
              },
            ]
          : []
      }
      nativeInputProps={form.register("password", {
        required: "Le mot de passe est requis",
        minLength: {
          value: 8,
          message: "Le mot de passe doit contenir au moins 8 caractères",
        },
        validate: () => {
          const isValid = hasNumber && hasUpperCase && hasLowerCase && hasSpecial;

          return isValid || "Mot de passe invalide";
        },
      })}
    />
  );
};

type SignupFormProps = RouterInputs<"/api/create-user">["body"];
