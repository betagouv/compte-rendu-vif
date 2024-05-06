import { Type, Static } from "@sinclair/typebox";

export const user = Type.Object({
  email: Type.String(),
  name: Type.String(),
  temporaryLink: Type.Optional(Type.String()),
  temporaryLinkExpiresAt: Type.Optional(Type.String()),
  password: Type.String(),
  udap_id: Type.String(),
  delegation_delegation_createdByTouser: Type.Array(
    Type.Object({
      createdBy: Type.String(),
      delegatedTo: Type.String(),
    })
  ),
  delegation_delegation_delegatedToTouser: Type.Array(
    Type.Object({
      createdBy: Type.String(),
      delegatedTo: Type.String(),
    })
  ),
  report: Type.Array(
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
      createdByEmail: Type.String(),
      createdAt: Type.String(),
      serviceInstructeur: Type.Optional(Type.Number()),
    })
  ),
  udap: Type.Object({
    id: Type.String(),
    department: Type.String(),
    completeCoords: Type.Optional(Type.String()),
    visible: Type.Optional(Type.Boolean()),
    name: Type.Optional(Type.String()),
    address: Type.Optional(Type.String()),
    zipCode: Type.Optional(Type.String()),
    city: Type.Optional(Type.String()),
    phone: Type.Optional(Type.String()),
    email: Type.Optional(Type.String()),
  }),
});

export type userType = Static<typeof user>;
