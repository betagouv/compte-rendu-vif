import { type CenterProps, Center } from "#styled-system/jsx";
import { cva } from "#styled-system/css";
import { SyncFormStatus } from "./SyncForm";

export const Banner = ({ status, ...props }: CenterProps & { status: SyncFormStatus }) => {
  return <Center className={banner({ status })} flexDir="column" bgColor="background-open-blue-france" {...props} />;
};

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
