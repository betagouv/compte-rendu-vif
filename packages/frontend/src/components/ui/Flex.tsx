import { Box, BoxProps } from "@mui/material";
import { ReactNode } from "react";

export const Flex = ({ children, ...props }: { children: ReactNode } & BoxProps) => {
  return (
    <Box display="flex" {...props}>
      {children}
    </Box>
  );
};
