import type { PropsWithChildren, ReactNode } from "react";
import type { InputProps } from "@codegouvfr/react-dsfr/Input";
import React from "react";
import { Flex } from "./ui/Flex";
import { useStyles } from "tss-react";
import { BoxProps, Typography, TypographyProps } from "@mui/material";

export const InputGroup = ({ children, state, asChild }: InputGroupProps) => {
  const stateClass = state ? stateMap[state] : "";

  const Comp = asChild ? Slot : "div";

  return <Comp className={["fr-input-group", stateClass].join(" ")}>{children}</Comp>;
};

type InputGroupProps = PropsWithChildren & Pick<InputProps, "state"> & { asChild?: boolean };

export const InputGroupWithTitle = ({ title, children, ...props }: InputGroupProps & { title: ReactNode }) => {
  return (
    <InputGroup {...props} asChild>
      <Flex flexDirection="column">
        <Title>{title}</Title>
        {children}
      </Flex>
    </InputGroup>
  );
};

const Slot = ({ children, className, ...props }: PropsWithChildren & BoxProps) => {
  const { cx } = useStyles();
  if (React.Children.count(children) !== 1) {
    throw new Error("Slot component should have exactly one child");
  }

  if (React.isValidElement(children)) {
    return React.cloneElement<any>(children, {
      ...props,
      className: cx((children.props as any)?.className, className),
    });
  }

  return null;
};

const Title = ({ children, ...props }: PropsWithChildren & TypographyProps) => (
  <Typography variant="h6" mb="30px" fontSize="20px" {...props}>
    {children}
  </Typography>
);

export const stateMap: Record<NonNullable<InputProps["state"]>, string> = {
  default: "",
  info: "fr-input-group--info",
  error: "fr-input-group--error",
  success: "fr-input-group--valid",
};
