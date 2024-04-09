import Button, { type ButtonProps } from "@codegouvfr/react-dsfr/Button";
import { css, cx } from "#styled-system/css";

export const FullWidthButton = ({ className, type, linkProps, ...props }: ButtonProps) => {
  linkProps!;
  return (
    <Button
      {...(props as any)}
      className={cx(css({ display: "block", w: "100%", textAlign: "center" }), className)}
      linkProps={linkProps ? { ...linkProps, className: cx(css({ w: "100%" })) } : undefined}
    />
  );
};
// type HTMLAnchorProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

// type LinkPropsWithoutChildren<LinkProps> =
//     | Omit<LinkProps, "children">
//     | (Omit<HTMLAnchorProps, "children" | "href"> & {
//           href: string;
//       });
