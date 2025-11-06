import { Link } from "#components/MUIDsfr.tsx";
import { Box, SxProps } from "@mui/material";
// import { Link, LinkProps } from "@tanstack/react-router";
import { ComponentProps, PropsWithChildren } from "react";

type Props = ComponentProps<typeof Link>;
export const IconLink = ({ sx, ...props }: PropsWithChildren<Props> & { icon: string }) => {
  return (
    <Link
      sx={{ borderBottom: "1px solid", height: "100%", ...sx }}
      className={`fr-link ${props.icon} fr-link--icon-left`}
      {...props}
    >
      {props.children}
    </Link>
  );
};
