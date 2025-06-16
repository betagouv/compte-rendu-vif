import { css } from "#styled-system/css";
import { Divider, Stack } from "#styled-system/jsx";
import Button, { ButtonProps } from "@codegouvfr/react-dsfr/Button";
import { forwardRef } from "react";
import { useUser } from "../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { downloadFile } from "../utils";
import { v4 } from "uuid";
import { omit } from "pastable";
import { ReportWithUser } from "./ReportList";
import { useNavigate } from "@tanstack/react-router";
import { api } from "../api";
import { useCanEditReport } from "../hooks/useCanEditReport";
import { db } from "../db/db";
import { getPDFInMailName } from "@cr-vif/pdf";

export const ReportActions = forwardRef<HTMLDivElement, { report: ReportWithUser }>(({ report }, ref) => {
  const user = useUser()!;

  const canEdit = useCanEditReport(report);

  const navigate = useNavigate();

  const downloadPdfMutation = useMutation(async () => {
    const buffer = await api.get("/api/pdf/report", { query: { reportId: report.id } });
    const name = getPDFInMailName(report);
    return downloadFile(`data:application/pdf;base64,${buffer}`, name);
  });

  const deleteMutation = useDeleteMutation();
  const duplicateMutation = useMutation(async () => {
    const payload = omit(report, ["id", "createdAt", "pdf", "title", "createdByName"]);

    return db
      .insertInto("report")
      .values({
        ...payload,
        id: `report-${v4()}`,
        title: `${report.title ?? "Sans titre"} - copie`,
        createdAt: new Date().toISOString(),
        redactedBy: user.name,
        redactedById: user.id,
        createdBy: user.id,
        pdf: undefined,
      })
      .execute();
  });

  return (
    <Stack ref={ref} gap="0" bgColor="#ECECFE">
      {canEdit ? (
        <>
          <ReportAction
            iconId="ri-pencil-line"
            label="Editer"
            onClick={() => navigate({ to: "/edit/$reportId", params: { reportId: report.id } })}
          />
          <Divider height="1px" color="#DDD" />
        </>
      ) : null}
      {canEdit ? (
        <>
          <ReportAction
            iconId="ri-delete-bin-2-line"
            label="Supprimer"
            onClick={() => deleteMutation.mutate(report.id)}
          />
          <Divider height="1px" color="#DDD" />
        </>
      ) : null}
      {report.pdf ? (
        <>
          <ReportAction iconId="ri-download-line" label="Télécharger" onClick={() => downloadPdfMutation.mutate()} />
          <Divider height="1px" color="#DDD" />
        </>
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
    await db.updateTable("report").set({ disabled: 1 }).where("id", "=", id).execute();
  });
