import { db, useDbQuery } from "../db/db";

export const getReportQueries = (scope: "my" | "all", page: number, user: { id: string; udap_id: string }) => {
  const baseQuery = db
    .selectFrom("report")
    .where("disabled", "=", 0)
    .limit(20)
    .offset(page * 20)
    .orderBy("meetDate", "desc")
    .orderBy("createdAt", "desc")
    .leftJoin("user", "user.id", "report.createdBy")
    .selectAll(["report"])
    .select(["user.name as createdByName"]);

  const countQuery = db.selectFrom("report").where("disabled", "=", 0).select(db.fn.countAll().as("count"));

  if (scope === "my") {
    baseQuery.where((eb) => eb.or([eb("createdBy", "=", user.id), eb("redactedById", "=", user.id)]));
    countQuery.where((eb) => eb.or([eb("createdBy", "=", user.id), eb("redactedById", "=", user.id)]));
  } else {
    baseQuery.where("report.udap_id", "=", user.udap_id);
    countQuery.where("report.udap_id", "=", user.udap_id);
  }

  return { baseQuery, countQuery };
};

export const getStateReportQueries = (scope: "my" | "all", page: number, user: { id: string; udap_id: string }) => {
  const baseQuery = db
    .selectFrom("state_report")
    .where("disabled", "=", 0)
    .limit(20)
    .offset(page * 20)
    .orderBy("created_at", "desc")
    .leftJoin("user", "user.id", "state_report.created_by")
    .selectAll(["state_report"])
    .select(["user.name as createdByName"]);

  const countQuery = db.selectFrom("state_report").where("disabled", "=", 0).select(db.fn.countAll().as("count"));

  if (scope === "my") {
    baseQuery.where("created_by", "=", user.id);
    countQuery.where("created_by", "=", user.id);
  } else {
    baseQuery.where("state_report.udap_id", "=", user.udap_id);
    countQuery.where("state_report.udap_id", "=", user.udap_id);
  }

  return { baseQuery, countQuery };
};
