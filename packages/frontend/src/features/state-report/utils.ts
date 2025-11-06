import { useFormContext } from "react-hook-form";
import { StateReport } from "../../db/AppSchema";
import z from "zod";

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
