import Button, { ButtonProps } from "@codegouvfr/react-dsfr/Button";
import { css, cx } from "#styled-system/css";

export const FullWidthButton = ({ className, ...props }: ButtonProps) => {
  return <Button {...props} className={cx(css({ display: "block", w: "100%", textAlign: "center" }), className)} />;
};
