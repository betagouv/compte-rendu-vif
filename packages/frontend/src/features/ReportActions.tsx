import { css } from "#styled-system/css";
import { Stack } from "#styled-system/jsx";
import Button, { ButtonProps } from "@codegouvfr/react-dsfr/Button";
import { forwardRef } from "react";
import { useUser } from "../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { db } from "../db";
import { downloadFile } from "../utils";
import { v4 } from "uuid";
import { omit } from "pastable";
import { ReportWithUser } from "./ReportList";
import { useNavigate } from "@tanstack/react-router";

export const ReportActions = forwardRef<HTMLDivElement, { report: ReportWithUser }>(({ report }, ref) => {
  const user = useUser()!;

  const isOwner = report.createdBy === user.id;

  const navigate = useNavigate();

  const deleteMutation = useDeleteMutation();
  const duplicateMutation = useMutation(async () => {
    const payload = omit(report, ["id", "createdAt", "pdf", "user", "title"]);

    return db.report.create({
      data: {
        ...payload,
        id: `report-${v4()}`,
        title: `${report.title} - copie`,
        createdAt: new Date(),
        pdf: undefined,
      },
    });
  });

  return (
    <Stack ref={ref} gap="0">
      {isOwner ? (
        <ReportAction
          iconId="ri-pencil-line"
          label="Editer"
          onClick={() => navigate({ to: "/edit/$reportId", params: { reportId: report.id } })}
        />
      ) : null}
      {isOwner ? (
        <ReportAction
          iconId="ri-delete-bin-2-line"
          label="Supprimer"
          onClick={() => deleteMutation.mutate(report.id)}
        />
      ) : null}
      {report.pdf ? (
        <ReportAction iconId="ri-download-line" label="Télécharger" onClick={() => downloadFile(report.pdf!)} />
      ) : null}
      <ReportAction iconId="ri-file-add-line" label="Dupliquer" onClick={() => duplicateMutation.mutate()} />
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
