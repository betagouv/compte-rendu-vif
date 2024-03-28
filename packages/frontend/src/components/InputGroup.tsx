import { PropsWithChildren } from "react";
import { InputProps } from "@codegouvfr/react-dsfr/Input";

export const InputGroup = ({ children, state }: PropsWithChildren & Pick<InputProps, "state">) => {
  const stateClass = state ? stateMap[state] : "";

  return (
    <>
      <div className={["fr-input-group", stateClass].join(" ")}>{children}</div>
    </>
  );
};

export const stateMap: Record<NonNullable<InputProps["state"]>, string> = {
  default: "",
  error: "fr-input-group--error",
  success: "fr-input-group--valid",
};
