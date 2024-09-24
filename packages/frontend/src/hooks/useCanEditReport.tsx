import { Report } from "@cr-vif/electric-client/frontend";
import { useUser } from "../contexts/AuthContext";
import { useLiveQuery } from "electric-sql/react";
import { db } from "../db";

export const useCanEditReport = (report: Report) => {
  const user = useUser()!;
  const isOwner = report.redactedById === user.id;
  const isCreator = report.createdBy === user.id;

  const userDelegations = useLiveQuery(
    db.delegation.liveFirst({ where: { createdBy: report.createdBy, delegatedTo: user.id } }),
  );

  const hasDelegation = !!userDelegations.results;
  const canEdit = isOwner || isCreator || hasDelegation;

  return canEdit;
};
