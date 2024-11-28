import { useUser } from "../contexts/AuthContext";
import { Report } from "../db/AppSchema";
import { db, useDbQuery } from "../db/db";

export const useCanEditReport = (report: Report) => {
  const user = useUser()!;
  const isOwner = report.redactedById === user.id;
  const isCreator = report.createdBy === user.id;

  const delegationsQuery = useDbQuery(
    db
      .selectFrom("delegation")
      .where("createdBy", "=", report.createdBy)
      .where("delegatedTo", "=", user.id)
      .selectAll(),
  );

  const hasDelegation = !!delegationsQuery.data?.[0];

  const canEdit = isOwner || isCreator || hasDelegation;

  return canEdit;
};
