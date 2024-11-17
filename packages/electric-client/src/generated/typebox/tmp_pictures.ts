import { Type, Static } from "@sinclair/typebox";

export const tmp_pictures = Type.Object({
  id: Type.String(),
  reportId: Type.Optional(Type.String()),
  createdAt: Type.Optional(Type.String()),
  report: Type.Optional(
    Type.Object({
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
      disabled: Type.Optional(Type.Boolean()),
      udap_id: Type.Optional(Type.String()),
      redactedById: Type.Optional(Type.String()),
      applicantEmail: Type.Optional(Type.String()),
      city: Type.Optional(Type.String()),
      zipCode: Type.Optional(Type.String()),
    })
  ),
});

export type tmp_picturesType = Static<typeof tmp_pictures>;
