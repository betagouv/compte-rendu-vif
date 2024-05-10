import { css } from "#styled-system/css";
import { Stack } from "#styled-system/jsx";
import Button, { ButtonProps } from "@codegouvfr/react-dsfr/Button";
import { forwardRef } from "react";
import { useUser } from "../contexts/AuthContext";
import { Report } from "@cr-vif/electric-client/frontend";

export const ReportActions = forwardRef<HTMLDivElement, { createdBy: Report["createdBy"] }>(({ createdBy }, ref) => {
  const user = useUser()!;

  const isOwner = createdBy === user.id;

  return (
    <Stack ref={ref} gap="0">
      {isOwner ? <ReportAction iconId="ri-pencil-line" label="Editer" onClick={() => {}} /> : null}
      {isOwner ? <ReportAction iconId="ri-delete-bin-2-line" label="Supprimer" onClick={() => {}} /> : null}
      <ReportAction iconId="ri-download-line" label="Télécharger" onClick={() => {}} />
      <ReportAction iconId="ri-file-add-line" label="Dupliquer" onClick={() => {}} />
    </Stack>
  );
});

const ReportAction = ({
  iconId,
  label,
  onClick,
}: {
  iconId: ButtonProps["iconId"];
  label: string;
  onClick: () => void;
}) => {
  return (
    <Button
      className={css({ width: "100%", height: { base: "56px", lg: "auto" } })}
      iconId={iconId as any}
      onClick={onClick}
      priority="tertiary no outline"
    >
      {label}
    </Button>
  );
};
