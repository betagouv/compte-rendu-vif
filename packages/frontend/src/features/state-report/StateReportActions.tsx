import Button, { ButtonProps } from "@codegouvfr/react-dsfr/Button";
import { forwardRef } from "react";
import { useUser } from "../../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { downloadFile } from "../../utils";
import { v4 } from "uuid";
import { omit } from "pastable";
import { ReportWithUser, StateReportWithUser } from "../report/ReportList";
import { useNavigate } from "@tanstack/react-router";
import { api } from "../../api";
import { useCanEditReport } from "../../hooks/useCanEditReport";
import { db } from "../../db/db";
import { getPDFInMailName } from "@cr-vif/pdf";
import { Flex } from "#components/ui/Flex.tsx";
import { Divider } from "#components/ui/Divider.tsx";
import { useStyles } from "tss-react";
import { styled } from "@mui/material";

export const StateReportActions = forwardRef<HTMLDivElement, { report: StateReportWithUser }>(({ report }, ref) => {
  const user = useUser()!;

  const hasAccess = report.created_by === user.id;
  const deleteMutation = useDeleteMutation();

  const duplicateMutation = useMutation(async () => {
    const payload = omit(report, ["id", "createdByName", "created_at", "created_by", "disabled"]);

    return db
      .insertInto("state_report")
      .values({
        ...payload,
        id: v4(),
        titre_edifice: `${report.titre_edifice ?? "Sans titre"} - copie`,
        created_at: new Date().toISOString(),
        created_by: user.id,
      })
      .execute();
  });

  return (
    <Flex ref={ref} bgcolor="#ECECFE" gap="0" flexDirection="column">
      <ReportAction iconId="ri-file-add-line" label="Dupliquer" onClick={() => duplicateMutation.mutate()} />
      {hasAccess ? (
        <>
          <Divider height="1px" color="#DDD" />
          <ReportAction
            label="Supprimer"
            onClick={() => deleteMutation.mutate(report.id)}
            iconId="ri-delete-bin-2-line"
          />
        </>
      ) : null}
    </Flex>
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
    <ReportActionButton iconId={iconId as any} onClick={onClick} priority="tertiary no outline">
      {label}
    </ReportActionButton>
  );
};

const ReportActionButton = styled(Button)(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("lg")]: {
    height: "56px",
  },
}));

const useDeleteMutation = () =>
  useMutation(async (id: string) => {
    await db.updateTable("state_report").set({ disabled: 1 }).where("id", "=", id).execute();
  });
