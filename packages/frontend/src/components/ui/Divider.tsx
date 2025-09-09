import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";

export const Divider = ({ ...props }: BoxProps) => {
  return <Box bgcolor="#DDDDDD" width="100%" height="1px" {...props} />;
};
