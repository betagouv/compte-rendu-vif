import type { InputProps } from "@codegouvfr/react-dsfr/Input";
import { PasswordInput as DSPasswordInput, type PasswordInputProps } from "@codegouvfr/react-dsfr/blocks/PasswordInput";
import { stateMap } from "./InputGroup";

export const PasswordInput = ({
  nativeInputProps,
  state,
  ...props
}: Pick<InputProps, "nativeInputProps" | "state"> & Partial<PasswordInputProps>) => {
  return (
    <DSPasswordInput
      label="Mot de passe"
      classes={{
        root: state ? `fr-input-group--${stateMap[state]}` : undefined,
      }}
      nativeInputProps={nativeInputProps}
      {...props}
    />
  );
};
