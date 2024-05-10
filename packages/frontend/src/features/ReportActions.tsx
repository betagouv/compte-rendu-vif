import { css } from "#styled-system/css";
import { Stack } from "#styled-system/jsx";
import Button, { ButtonProps } from "@codegouvfr/react-dsfr/Button";
import { forwardRef } from "react";
import { useUser } from "../contexts/AuthContext";
import { Report } from "@cr-vif/electric-client/frontend";
import { useMutation } from "@tanstack/react-query";
import { db } from "../db";

export const ReportActions = forwardRef<HTMLDivElement, { report: Report }>(({ report }, ref) => {
  const user = useUser()!;

  const isOwner = report.createdBy === user.id;

  const deleteMutation = useDeleteMutation();

  return (
    <Stack ref={ref} gap="0">
      {isOwner ? <ReportAction iconId="ri-pencil-line" label="Editer" onClick={() => {}} /> : null}
      {isOwner ? (
        <ReportAction
          iconId="ri-delete-bin-2-line"
          label="Supprimer"
          onClick={() => deleteMutation.mutate(report.id)}
        />
      ) : null}
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

const useDeleteMutation = () =>
  useMutation(async (id: string) => {
    await db.report.update({ where: { id }, data: { disabled: true } });
  });
