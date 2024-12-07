import { type CenterProps, Center } from "#styled-system/jsx";
import { cva, cx } from "#styled-system/css";
import { SyncFormStatus } from "./SyncForm";
import { forwardRef } from "react";

export const Banner = forwardRef<HTMLDivElement, CenterProps & { status: SyncFormStatus }>(
  ({ status, className, ...props }, ref) => {
    return <Center ref={ref as any} className={cx(banner({ status }), className)} flexDir="column" {...props} />;
  },
);

const banner = cva({
  base: { bgColor: "background-open-blue-france" },
  variants: {
    status: {
      offline: { bgColor: "red-offline" },
      pending: { bgColor: "yellow-waiting" },
      saved: {},
      saving: {},
    },
  },
});
