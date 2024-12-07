import { useStatus } from "@powersync/react";

export const useAppStatus = () => {
  const powerSyncStatus = useStatus();

  const status = powerSyncStatus.connected
    ? powerSyncStatus.dataFlowStatus.downloading || powerSyncStatus.dataFlowStatus.uploading
      ? "saving"
      : "saved"
    : "offline";

  return status;
};
