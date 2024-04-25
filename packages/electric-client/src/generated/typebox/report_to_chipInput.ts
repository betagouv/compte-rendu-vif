import { Type, Static } from "@sinclair/typebox";

export const report_to_chipInput = Type.Object({
  id: Type.String(),
  report_id: Type.String(),
  chip_id: Type.String(),
  chip: Type.Object({
    id: Type.String(),
    label: Type.String(),
    value: Type.String(),
  }),
  report: Type.Object({
    id: Type.String(),
    title: Type.Optional(Type.String()),
    project_description: Type.Optional(Type.String()),
    redacted_by: Type.Optional(Type.String()),
    meet_date: Type.Optional(Type.String()),
    applicant_name: Type.Optional(Type.String()),
    applicant_address: Type.Optional(Type.String()),
    project_cadastral_ref: Type.Optional(Type.String()),
    project_space_type: Type.Optional(Type.String()),
    decision: Type.Optional(Type.String()),
    precisions: Type.Optional(Type.String()),
    contacts: Type.Optional(Type.String()),
    further_information: Type.Optional(Type.String()),
    created_by_id: Type.String(),
    created_by_username: Type.String(),
    created_at: Type.String(),
    service_instructeur: Type.Optional(Type.String()),
  }),
});

export type report_to_chipInputType = Static<typeof report_to_chipInput>;
