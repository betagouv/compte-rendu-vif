import { useStatus } from "@powersync/react";

export const useAppStatus = () => {
  const powerSyncStatus = useStatus();

  const isOk = powerSyncStatus.connected || powerSyncStatus.connecting;

  const status = isOk
    ? powerSyncStatus.dataFlowStatus.downloading || powerSyncStatus.dataFlowStatus.uploading
      ? "saving"
      : "saved"
    : "offline";

  return status;
};
