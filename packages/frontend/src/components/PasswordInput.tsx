import { styled } from "#styled-system/jsx";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import Input, { InputProps } from "@codegouvfr/react-dsfr/Input";
import Checkbox from "@codegouvfr/react-dsfr/Checkbox";
import { css } from "#styled-system/css";
import {
  PasswordInput as DSPasswordInput,
  PasswordInputProps,
} from "@codegouvfr/react-dsfr/blocks/PasswordInput";
import { fr } from "@codegouvfr/react-dsfr";
import { stateMap } from "./InputGroup";

export const PasswordInput = ({
  nativeInputProps,
  state,
  ...props
}: Pick<InputProps, "nativeInputProps" | "state"> &
  Partial<PasswordInputProps>) => {
  return (
    <DSPasswordInput
      label="Mot de passe"
      classes={{
        root: state ? "fr-input-group--" + stateMap[state] : undefined,
      }}
      nativeInputProps={nativeInputProps}
      {...props}
    />
  );

  // return (
  //   <styled.div position="relative" mb="1rem">
  //     <div className={css({ zIndex: 1, pos: "absolute", right: 0 })}>
  //       <Checkbox
  //         small
  //         options={[
  //           {
  //             label: "Afficher",
  //             nativeInputProps: {
  //               onChange: (e) => setIsPasswordVisible(e.target.checked),
  //               checked: isPasswordVisible,
  //             },
  //           },
  //         ]}
  //       />
  //     </div>
  //     <Input
  //       label="Mot de passe"
  //       nativeInputProps={{
  //         type: isPasswordVisible ? "text" : "password",
  //         autoComplete: "current-password",
  //         ...form.register("password", {
  //           required: "Le mot de passe est requis",
  //           minLength: {
  //             value: 8,
  //             message: "Le mot de passe doit contenir au moins 8 caractères",
  //           },
  //         }),
  //         ...nativeInputProps,
  //       }}
  //       {...(props as any)}
  //     />
  //   </styled.div>
  // );
};
