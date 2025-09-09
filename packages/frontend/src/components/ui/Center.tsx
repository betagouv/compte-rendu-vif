import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";

export const Center = ({ children, ...props }: { children: ReactNode } & BoxProps) => {
  return (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" {...props}>
      {children}
    </Box>
  );
};
