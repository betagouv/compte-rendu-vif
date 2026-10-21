import { useWatch } from "react-hook-form";
import { Link } from "@tanstack/react-router";
import { getStateReportUpLabel } from "@patrinotes/pdf/constat";
import { Alert } from "#components/MUIDsfr.tsx";
import { useStateReportFormContext } from "../state-report/utils";
import { getRapportPartIds, useRapportMembers } from "./rapportGroupe";

/** On a constat of a rapport groupé: the other constats sent in the same document. */
export const RapportGroupeNotice = () => {
  const form = useStateReportFormContext();
  const [id, rapportId, attachmentId, validationStatus] = useWatch({
    control: form.control,
    name: ["id", "rapport_id", "attachment_id", "validation_status"],
  });
  const members = useRapportMembers(rapportId);
  if (!rapportId) return null;

  const partIds = getRapportPartIds(
    { id, rapport_id: rapportId, attachment_id: attachmentId, validation_status: validationStatus },
    members,
  );
  const others = members.filter((m) => partIds.includes(m.id) && m.id !== id);
  if (!others.length) return null;

  const isSent = !!attachmentId && validationStatus !== "declined";

  return (
    <Alert
      severity="info"
      small
      sx={{ mt: "16px" }}
      description={
        <>
          {isSent
            ? "Ce constat a été envoyé dans un même document avec : "
            : "Ce constat sera envoyé dans un même document avec : "}
          {others.map((member, index) => (
            <span key={member.id}>
              {index > 0 ? ", " : ""}
              <Link
                to="/constat/$constatId"
                params={{ constatId: member.id }}
                search={{ step: "contexte-visite", mode: "view" }}
              >
                {getStateReportUpLabel(member)}
              </Link>
            </span>
          ))}
          .
        </>
      }
    />
  );
};
