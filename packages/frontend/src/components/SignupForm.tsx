import { type UseFormReturn, useForm, useWatch } from "react-hook-form";
import Input from "@codegouvfr/react-dsfr/Input";
import { PasswordInput } from "./PasswordInput";
import { FullWidthButton } from "./FullWidthButton";
import { InputGroup } from "./InputGroup";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { useAuthContext } from "../contexts/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { type RouterInputs, api, getErrorMessage, unauthenticatedApi } from "../api";
import Select from "@codegouvfr/react-dsfr/Select";
import { Flex } from "./ui/Flex";
import { Typography } from "@mui/material";
import { Divider } from "./ui/Divider";

export const SignupForm = () => {
  const form = useForm<SignupFormProps>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      udap_id: "",
    },
  });

  const [_, setData] = useAuthContext();

  const mutation = useMutation((body: SignupFormProps) => unauthenticatedApi.post("/api/create-user", { body }));

  const udapsQuery = useQuery({
    queryKey: ["udaps"],
    queryFn: async () => {
      const response = await api.get("/api/udaps");
      return response;
    },
    onError: (error) => console.error(error),
  });

  const signup = async (values: SignupFormProps) => {
    const response = await mutation.mutateAsync(values);
    setData(response);
  };

  const { errors: formErrors } = form.formState;
  const { error: mutationError } = mutation;

  return (
    <Flex flexDirection="column">
      <form onSubmit={form.handleSubmit(signup)}>
        {mutationError ? (
          <Alert
            style={{ marginBottom: "1.5rem" }}
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
        </InputGroup>

        <Select
          label="UDAP"
          nativeSelectProps={form.register("udap_id", { required: "L'UDAP est requis" })}
          state={formErrors.udap_id ? "error" : undefined}
          stateRelatedMessage={formErrors.udap_id?.message}
        >
          <option value="" disabled hidden>
            Sélectionnez une UDAP
          </option>
          {udapsQuery.data?.map((udap) => (
            <option key={udap.id} value={udap.id}>
              {udap.name}
            </option>
          ))}
        </Select>

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

      <Divider my="20px" />

      <h5>Vous avez déjà un compte ?</h5>

      <FullWidthButton priority="secondary" linkProps={{ to: "/login" }}>
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
