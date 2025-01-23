import Input, { InputProps } from "@codegouvfr/react-dsfr/Input";

export const EmailsInput = ({ nativeInputProps }: { nativeInputProps: InputProps["nativeInputProps"] }) => {
  return <Input label="Destinataires" nativeInputProps={{ type: "email", ...nativeInputProps }} />;
};
