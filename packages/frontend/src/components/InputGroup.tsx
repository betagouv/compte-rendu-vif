import { PropsWithChildren } from "react";
import type { InputProps } from "@codegouvfr/react-dsfr/Input";
import React from "react";
import { BoxProps } from "#styled-system/jsx";
import { cx } from "#styled-system/css";

export const InputGroup = ({
  children,
  state,
  asChild,
}: PropsWithChildren & Pick<InputProps, "state"> & { asChild?: boolean }) => {
  const stateClass = state ? stateMap[state] : "";

  const Comp = asChild ? Slot : "div";

  return (
    <Comp className={["fr-input-group", stateClass].join(" ")}>{children}</Comp>
  );
};

export const InputGroupWithTitle = {};

const Slot = ({
  children,
  className,
  ...props
}: PropsWithChildren & BoxProps) => {
  if (React.Children.count(children) !== 1) {
    throw new Error("Slot component should have exactly one child");
  }

  if (React.isValidElement(children)) {
    return React.cloneElement<any>(children, {
      ...props,
      className: cx(children.props.className, className),
    });
  }

  return null;
};

export const stateMap: Record<NonNullable<InputProps["state"]>, string> = {
  default: "",
  error: "fr-input-group--error",
  success: "fr-input-group--valid",
};
