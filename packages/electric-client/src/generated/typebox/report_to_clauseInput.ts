import { Type, Static } from "@sinclair/typebox";

export const report_to_clauseInput = Type.Object({
  id: Type.String(),
  reportId: Type.String(),
  clauseId: Type.String(),
  clause: Type.Object({
    id: Type.String(),
    label: Type.String(),
    value: Type.String(),
  }),
  report: Type.Object({
    id: Type.String(),
    title: Type.Optional(Type.String()),
    projectDescription: Type.Optional(Type.String()),
    redactedBy: Type.Optional(Type.String()),
    meetDate: Type.Optional(Type.String()),
    applicantName: Type.Optional(Type.String()),
    applicantAddress: Type.Optional(Type.String()),
    projectCadastralRef: Type.Optional(Type.String()),
    projectSpaceType: Type.Optional(Type.String()),
    decision: Type.Optional(Type.String()),
    precisions: Type.Optional(Type.String()),
    contacts: Type.Optional(Type.String()),
    furtherInformation: Type.Optional(Type.String()),
    createdBy: Type.String(),
    createdAt: Type.String(),
    serviceInstructeur: Type.Optional(Type.Number()),
    pdf: Type.Optional(Type.String()),
  }),
});

export type report_to_clauseInputType = Static<typeof report_to_clauseInput>;
