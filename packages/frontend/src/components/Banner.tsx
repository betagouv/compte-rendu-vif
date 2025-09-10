import { SyncFormStatus } from "./SyncForm";
import { forwardRef } from "react";
import { BoxProps } from "@mui/material";
import { Center } from "./ui/Center";
import { fr } from "@codegouvfr/react-dsfr";

export const Banner = forwardRef<HTMLDivElement, BoxProps & { status: SyncFormStatus }>(
  ({ status, className, ...props }, ref) => {
    const statusColorMap = {
      offline: "#FFE9E6",
      pending: "#FEECC2",
    };

    const bgColor = (statusColorMap as any)[status] || fr.colors.decisions.background.open.blueFrance.default;

    return <Center ref={ref as any} className={className} bgcolor={bgColor} flexDirection="column" {...props} />;
  },
);

/*
 "yellow-waiting": { value: "#FEECC2" },
  "red-offline": { value: "#FFE9E6" },
  "blue-connected": { value: "#E3E3FD" },
*/
