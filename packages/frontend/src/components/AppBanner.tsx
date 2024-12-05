import { styled } from "#styled-system/jsx";
import { useStatus } from "@powersync/react";
import { PropsWithChildren } from "react";

export const AppBanner = ({ children }: PropsWithChildren) => {
  const powerSyncStatus = useStatus();

  const status = powerSyncStatus.connected
    ? powerSyncStatus.dataFlowStatus.downloading || powerSyncStatus.dataFlowStatus.uploading
      ? "saving"
      : "saved"
    : "offline";

  return <styled.div>{children}</styled.div>;
};
