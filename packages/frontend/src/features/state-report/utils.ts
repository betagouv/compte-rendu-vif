import { useFormContext, useWatch } from "react-hook-form";
import { StateReport } from "../../db/AppSchema";
import z from "zod";
import { useLiveUser } from "../../contexts/AuthContext";
import { db } from "../../db/db";

export type StateReportFormType = Pretty<StateReport>;
export const useStateReportFormContext = () => useFormContext<StateReportFormType>();

type Pretty<T> = {
  [K in keyof T]: T[K];
} & {};

export const stateReportStepSchema = z.enum([
  "informations",
  "documents",
  "contexte-visite",
  "constat-general",
  "constat-detaille",
]);

export type StateReportStep = z.infer<typeof stateReportStepSchema>;

export const useIsStateReportDisabled = () => {
  const user = useLiveUser!();

  const form = useStateReportFormContext();
  const [hasAttachment, validationStatus] = useWatch({
    control: form.control,
    name: ["attachment_id", "validation_status"],
  });

  const createdBy = useWatch({ control: form.control, name: "created_by" });
  const isUsersReport = createdBy === user.id;

  return (
    !isUsersReport || getIsStateReportDisabled({ attachment_id: hasAttachment, validation_status: validationStatus })
  );
};

export const useStateReportVersion = () => {
  const form = useStateReportFormContext();
  const version = useWatch({ control: form.control, name: "version" });
  return version || 1;
};

export const getIsStateReportDisabled = (stateReport: {
  attachment_id: string | null;
  validation_status: string | null;
}) => {
  return !!stateReport.attachment_id && stateReport.validation_status !== "declined";
};

const requiredFieldsV1: Partial<Record<keyof StateReportFormType, (val: any) => boolean>> = {
  nature_visite: (val) => !!val,
  date_visite: (val) => !!val,
  redacted_by: (val) => !!val,
  proprietaire: (val) => !!val,
  etat_general: (val) => !!val,
  proportion_dans_cet_etat: (val) => val !== null && val !== undefined,
};
const requiredFieldsV2: Partial<Record<keyof StateReportFormType, (val: any) => boolean>> = {
  nature_visite: (val) => !!val,
  date_visite: (val) => !!val,
  redacted_by: (val) => !!val,
  proprietaire: (val) => !!val,
  etat_general: (val) => !!val,
};

/** Fields that must be filled before the constat can be finalised. */
export const getStateReportMissingFields = (values: Partial<StateReport>) =>
  Object.entries((values.version || 1) === 1 ? requiredFieldsV1 : requiredFieldsV2)
    .filter(([key, checker]) => !checker(values[key as keyof StateReport]))
    .map(([key]) => key);

export const stateReportFieldLabels: Record<string, string> = {
  proprietaire: "Propriétaire",
  proprietaire_email: "Courriel du propriétaire",
  redacted_by: "Rédacteur du constat",
  date_visite: "Date de la visite",
  nature_visite: "Nature de la visite",
  etat_general: "État général",
  proportion_dans_cet_etat: "Proportion dans cet état",
};

/**
 * Writes the constat form values that differ from the local database right away, without waiting for the
 * debounced autosave: before leaving the form for a page that reads the database (PDF, next constat of a rapport).
 */
export const flushStateReportForm = async (values: StateReport) => {
  const row = await db.selectFrom("state_report").selectAll().where("id", "=", values.id).executeTakeFirst();
  if (!row) return;
  const diff: Partial<StateReport> = {};
  for (const key of Object.keys(row) as (keyof StateReport)[]) {
    if (key === "id" || !(key in values)) continue;
    const value = values[key] ?? null;
    if (value !== (row[key] ?? null)) (diff as any)[key] = value;
  }
  if (Object.keys(diff).length) await db.updateTable("state_report").set(diff).where("id", "=", values.id).execute();
};
