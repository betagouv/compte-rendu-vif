import type { PropsWithChildren, ReactNode } from "react";
import type { InputProps } from "@codegouvfr/react-dsfr/Input";
import React from "react";
import { Flex, styled, type BoxProps } from "#styled-system/jsx";
import { cx } from "#styled-system/css";

export const InputGroup = ({ children, state, asChild }: InputGroupProps) => {
  const stateClass = state ? stateMap[state] : "";

  const Comp = asChild ? Slot : "div";

  return <Comp className={["fr-input-group", stateClass].join(" ")}>{children}</Comp>;
};

type InputGroupProps = PropsWithChildren & Pick<InputProps, "state"> & { asChild?: boolean };

export const InputGroupWithTitle = ({ title, children, ...props }: InputGroupProps & { title: ReactNode }) => {
  return (
    <InputGroup {...props} asChild>
      <Flex direction="column">
        <Title>{title}</Title>
        {children}
      </Flex>
    </InputGroup>
  );
};

const Slot = ({ children, className, ...props }: PropsWithChildren & BoxProps) => {
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
const Title = ({ children, ...props }: PropsWithChildren & BoxProps) => (
  <styled.h6 mb="0.875rem" fontSize="20px" {...props}>
    {children}
  </styled.h6>
);

export const stateMap: Record<NonNullable<InputProps["state"]>, string> = {
  default: "",
  error: "fr-input-group--error",
  success: "fr-input-group--valid",
};
