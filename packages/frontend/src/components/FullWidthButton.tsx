import Button, { type ButtonProps } from "@codegouvfr/react-dsfr/Button";
import { useStyles } from "tss-react";

export const FullWidthButton = ({ className, type, linkProps, ...props }: ButtonProps) => {
  const { cx, css } = useStyles();

  return (
    <Button
      {...(props as any)}
      className={cx(css({ display: "block", width: "100%", textAlign: "center" }), className)}
      linkProps={linkProps ? { ...linkProps, className: cx(css({ width: "100%" })) } : undefined}
    />
  );
};
// type HTMLAnchorProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

// type LinkPropsWithoutChildren<LinkProps> =
//     | Omit<LinkProps, "children">
//     | (Omit<HTMLAnchorProps, "children" | "href"> & {
//           href: string;
//       });
