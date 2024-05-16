import { z } from 'zod';
import type { Prisma } from './prismaClient';
import { type TableSchema, DbSchema, Relation, ElectricClient, type HKT } from 'electric-sql/client/model';
import migrations from './migrations';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const ChipScalarFieldEnumSchema = z.enum(['key','value','udap_id','text']);

export const ClauseScalarFieldEnumSchema = z.enum(['id','label','value']);

export const DelegationScalarFieldEnumSchema = z.enum(['createdBy','delegatedTo']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const ReportScalarFieldEnumSchema = z.enum(['id','title','projectDescription','redactedBy','meetDate','applicantName','applicantAddress','projectCadastralRef','projectSpaceType','decision','precisions','contacts','furtherInformation','createdBy','createdAt','serviceInstructeur','pdf','disabled','udap_id']);

export const Report_to_clauseScalarFieldEnumSchema = z.enum(['id','reportId','clauseId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UdapScalarFieldEnumSchema = z.enum(['id','department','completeCoords','visible','name','address','zipCode','city','phone','email']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','udap_id']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// CHIP SCHEMA
/////////////////////////////////////////

export const ChipSchema = z.object({
  key: z.string(),
  value: z.string(),
  udap_id: z.string(),
  text: z.string(),
})

export type Chip = z.infer<typeof ChipSchema>

/////////////////////////////////////////
// CLAUSE SCHEMA
/////////////////////////////////////////

export const ClauseSchema = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string(),
})

export type Clause = z.infer<typeof ClauseSchema>

/////////////////////////////////////////
// DELEGATION SCHEMA
/////////////////////////////////////////

export const DelegationSchema = z.object({
  createdBy: z.string(),
  delegatedTo: z.string(),
})

export type Delegation = z.infer<typeof DelegationSchema>

/////////////////////////////////////////
// REPORT SCHEMA
/////////////////////////////////////////

export const ReportSchema = z.object({
  id: z.string(),
  title: z.string().nullable(),
  projectDescription: z.string().nullable(),
  redactedBy: z.string().nullable(),
  meetDate: z.coerce.date().nullable(),
  applicantName: z.string().nullable(),
  applicantAddress: z.string().nullable(),
  projectCadastralRef: z.string().nullable(),
  projectSpaceType: z.string().nullable(),
  decision: z.string().nullable(),
  precisions: z.string().nullable(),
  contacts: z.string().nullable(),
  furtherInformation: z.string().nullable(),
  createdBy: z.string(),
  createdAt: z.coerce.date(),
  serviceInstructeur: z.number().int().gte(-2147483648).lte(2147483647).nullable(),
  pdf: z.string().nullable(),
  disabled: z.boolean().nullable(),
  udap_id: z.string().nullable(),
})

export type Report = z.infer<typeof ReportSchema>

/////////////////////////////////////////
// REPORT TO CLAUSE SCHEMA
/////////////////////////////////////////

export const Report_to_clauseSchema = z.object({
  id: z.string(),
  reportId: z.string(),
  clauseId: z.string(),
})

export type Report_to_clause = z.infer<typeof Report_to_clauseSchema>

/////////////////////////////////////////
// UDAP SCHEMA
/////////////////////////////////////////

export const UdapSchema = z.object({
  id: z.string(),
  department: z.string(),
  completeCoords: z.string().nullable(),
  visible: z.boolean().nullable(),
  name: z.string().nullable(),
  address: z.string().nullable(),
  zipCode: z.string().nullable(),
  city: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
})

export type Udap = z.infer<typeof UdapSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  udap_id: z.string(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// CHIP
//------------------------------------------------------

export const ChipSelectSchema: z.ZodType<Prisma.ChipSelect> = z.object({
  key: z.boolean().optional(),
  value: z.boolean().optional(),
  udap_id: z.boolean().optional(),
  text: z.boolean().optional(),
}).strict()

// CLAUSE
//------------------------------------------------------

export const ClauseIncludeSchema: z.ZodType<Prisma.ClauseInclude> = z.object({
  report_to_clause: z.union([z.boolean(),z.lazy(() => Report_to_clauseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ClauseCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ClauseArgsSchema: z.ZodType<Prisma.ClauseArgs> = z.object({
  select: z.lazy(() => ClauseSelectSchema).optional(),
  include: z.lazy(() => ClauseIncludeSchema).optional(),
}).strict();

export const ClauseCountOutputTypeArgsSchema: z.ZodType<Prisma.ClauseCountOutputTypeArgs> = z.object({
  select: z.lazy(() => ClauseCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ClauseCountOutputTypeSelectSchema: z.ZodType<Prisma.ClauseCountOutputTypeSelect> = z.object({
  report_to_clause: z.boolean().optional(),
}).strict();

export const ClauseSelectSchema: z.ZodType<Prisma.ClauseSelect> = z.object({
  id: z.boolean().optional(),
  label: z.boolean().optional(),
  value: z.boolean().optional(),
  report_to_clause: z.union([z.boolean(),z.lazy(() => Report_to_clauseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ClauseCountOutputTypeArgsSchema)]).optional(),
}).strict()

// DELEGATION
//------------------------------------------------------

export const DelegationIncludeSchema: z.ZodType<Prisma.DelegationInclude> = z.object({
  user_delegation_createdByTouser: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  user_delegation_delegatedToTouser: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const DelegationArgsSchema: z.ZodType<Prisma.DelegationArgs> = z.object({
  select: z.lazy(() => DelegationSelectSchema).optional(),
  include: z.lazy(() => DelegationIncludeSchema).optional(),
}).strict();

export const DelegationSelectSchema: z.ZodType<Prisma.DelegationSelect> = z.object({
  createdBy: z.boolean().optional(),
  delegatedTo: z.boolean().optional(),
  user_delegation_createdByTouser: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  user_delegation_delegatedToTouser: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// REPORT
//------------------------------------------------------

export const ReportIncludeSchema: z.ZodType<Prisma.ReportInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  report_to_clause: z.union([z.boolean(),z.lazy(() => Report_to_clauseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ReportCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ReportArgsSchema: z.ZodType<Prisma.ReportArgs> = z.object({
  select: z.lazy(() => ReportSelectSchema).optional(),
  include: z.lazy(() => ReportIncludeSchema).optional(),
}).strict();

export const ReportCountOutputTypeArgsSchema: z.ZodType<Prisma.ReportCountOutputTypeArgs> = z.object({
  select: z.lazy(() => ReportCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ReportCountOutputTypeSelectSchema: z.ZodType<Prisma.ReportCountOutputTypeSelect> = z.object({
  report_to_clause: z.boolean().optional(),
}).strict();

export const ReportSelectSchema: z.ZodType<Prisma.ReportSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  projectDescription: z.boolean().optional(),
  redactedBy: z.boolean().optional(),
  meetDate: z.boolean().optional(),
  applicantName: z.boolean().optional(),
  applicantAddress: z.boolean().optional(),
  projectCadastralRef: z.boolean().optional(),
  projectSpaceType: z.boolean().optional(),
  decision: z.boolean().optional(),
  precisions: z.boolean().optional(),
  contacts: z.boolean().optional(),
  furtherInformation: z.boolean().optional(),
  createdBy: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  serviceInstructeur: z.boolean().optional(),
  pdf: z.boolean().optional(),
  disabled: z.boolean().optional(),
  udap_id: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  report_to_clause: z.union([z.boolean(),z.lazy(() => Report_to_clauseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ReportCountOutputTypeArgsSchema)]).optional(),
}).strict()

// REPORT TO CLAUSE
//------------------------------------------------------

export const Report_to_clauseIncludeSchema: z.ZodType<Prisma.Report_to_clauseInclude> = z.object({
  clause: z.union([z.boolean(),z.lazy(() => ClauseArgsSchema)]).optional(),
  report: z.union([z.boolean(),z.lazy(() => ReportArgsSchema)]).optional(),
}).strict()

export const Report_to_clauseArgsSchema: z.ZodType<Prisma.Report_to_clauseArgs> = z.object({
  select: z.lazy(() => Report_to_clauseSelectSchema).optional(),
  include: z.lazy(() => Report_to_clauseIncludeSchema).optional(),
}).strict();

export const Report_to_clauseSelectSchema: z.ZodType<Prisma.Report_to_clauseSelect> = z.object({
  id: z.boolean().optional(),
  reportId: z.boolean().optional(),
  clauseId: z.boolean().optional(),
  clause: z.union([z.boolean(),z.lazy(() => ClauseArgsSchema)]).optional(),
  report: z.union([z.boolean(),z.lazy(() => ReportArgsSchema)]).optional(),
}).strict()

// UDAP
//------------------------------------------------------

export const UdapIncludeSchema: z.ZodType<Prisma.UdapInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UdapCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UdapArgsSchema: z.ZodType<Prisma.UdapArgs> = z.object({
  select: z.lazy(() => UdapSelectSchema).optional(),
  include: z.lazy(() => UdapIncludeSchema).optional(),
}).strict();

export const UdapCountOutputTypeArgsSchema: z.ZodType<Prisma.UdapCountOutputTypeArgs> = z.object({
  select: z.lazy(() => UdapCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UdapCountOutputTypeSelectSchema: z.ZodType<Prisma.UdapCountOutputTypeSelect> = z.object({
  user: z.boolean().optional(),
}).strict();

export const UdapSelectSchema: z.ZodType<Prisma.UdapSelect> = z.object({
  id: z.boolean().optional(),
  department: z.boolean().optional(),
  completeCoords: z.boolean().optional(),
  visible: z.boolean().optional(),
  name: z.boolean().optional(),
  address: z.boolean().optional(),
  zipCode: z.boolean().optional(),
  city: z.boolean().optional(),
  phone: z.boolean().optional(),
  email: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UdapCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  delegation_delegation_createdByTouser: z.union([z.boolean(),z.lazy(() => DelegationFindManyArgsSchema)]).optional(),
  delegation_delegation_delegatedToTouser: z.union([z.boolean(),z.lazy(() => DelegationFindManyArgsSchema)]).optional(),
  report: z.union([z.boolean(),z.lazy(() => ReportFindManyArgsSchema)]).optional(),
  udap: z.union([z.boolean(),z.lazy(() => UdapArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  delegation_delegation_createdByTouser: z.boolean().optional(),
  delegation_delegation_delegatedToTouser: z.boolean().optional(),
  report: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  udap_id: z.boolean().optional(),
  delegation_delegation_createdByTouser: z.union([z.boolean(),z.lazy(() => DelegationFindManyArgsSchema)]).optional(),
  delegation_delegation_delegatedToTouser: z.union([z.boolean(),z.lazy(() => DelegationFindManyArgsSchema)]).optional(),
  report: z.union([z.boolean(),z.lazy(() => ReportFindManyArgsSchema)]).optional(),
  udap: z.union([z.boolean(),z.lazy(() => UdapArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const ChipWhereInputSchema: z.ZodType<Prisma.ChipWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ChipWhereInputSchema),z.lazy(() => ChipWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChipWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChipWhereInputSchema),z.lazy(() => ChipWhereInputSchema).array() ]).optional(),
  key: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  udap_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const ChipOrderByWithRelationInputSchema: z.ZodType<Prisma.ChipOrderByWithRelationInput> = z.object({
  key: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  udap_id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChipWhereUniqueInputSchema: z.ZodType<Prisma.ChipWhereUniqueInput> = z.object({
  key_value_udap_id: z.lazy(() => ChipKeyValueUdap_idCompoundUniqueInputSchema).optional()
}).strict();

export const ChipOrderByWithAggregationInputSchema: z.ZodType<Prisma.ChipOrderByWithAggregationInput> = z.object({
  key: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  udap_id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ChipCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ChipMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ChipMinOrderByAggregateInputSchema).optional()
}).strict();

export const ChipScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ChipScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ChipScalarWhereWithAggregatesInputSchema),z.lazy(() => ChipScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChipScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChipScalarWhereWithAggregatesInputSchema),z.lazy(() => ChipScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  key: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  udap_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ClauseWhereInputSchema: z.ZodType<Prisma.ClauseWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ClauseWhereInputSchema),z.lazy(() => ClauseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ClauseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ClauseWhereInputSchema),z.lazy(() => ClauseWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  report_to_clause: z.lazy(() => Report_to_clauseListRelationFilterSchema).optional()
}).strict();

export const ClauseOrderByWithRelationInputSchema: z.ZodType<Prisma.ClauseOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  report_to_clause: z.lazy(() => Report_to_clauseOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ClauseWhereUniqueInputSchema: z.ZodType<Prisma.ClauseWhereUniqueInput> = z.object({
  id: z.string().optional()
}).strict();

export const ClauseOrderByWithAggregationInputSchema: z.ZodType<Prisma.ClauseOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ClauseCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ClauseMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ClauseMinOrderByAggregateInputSchema).optional()
}).strict();

export const ClauseScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ClauseScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ClauseScalarWhereWithAggregatesInputSchema),z.lazy(() => ClauseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ClauseScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ClauseScalarWhereWithAggregatesInputSchema),z.lazy(() => ClauseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const DelegationWhereInputSchema: z.ZodType<Prisma.DelegationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DelegationWhereInputSchema),z.lazy(() => DelegationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DelegationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DelegationWhereInputSchema),z.lazy(() => DelegationWhereInputSchema).array() ]).optional(),
  createdBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  delegatedTo: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user_delegation_createdByTouser: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  user_delegation_delegatedToTouser: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const DelegationOrderByWithRelationInputSchema: z.ZodType<Prisma.DelegationOrderByWithRelationInput> = z.object({
  createdBy: z.lazy(() => SortOrderSchema).optional(),
  delegatedTo: z.lazy(() => SortOrderSchema).optional(),
  user_delegation_createdByTouser: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  user_delegation_delegatedToTouser: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const DelegationWhereUniqueInputSchema: z.ZodType<Prisma.DelegationWhereUniqueInput> = z.object({
  createdBy_delegatedTo: z.lazy(() => DelegationCreatedByDelegatedToCompoundUniqueInputSchema).optional()
}).strict();

export const DelegationOrderByWithAggregationInputSchema: z.ZodType<Prisma.DelegationOrderByWithAggregationInput> = z.object({
  createdBy: z.lazy(() => SortOrderSchema).optional(),
  delegatedTo: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => DelegationCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => DelegationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => DelegationMinOrderByAggregateInputSchema).optional()
}).strict();

export const DelegationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DelegationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => DelegationScalarWhereWithAggregatesInputSchema),z.lazy(() => DelegationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => DelegationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DelegationScalarWhereWithAggregatesInputSchema),z.lazy(() => DelegationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  createdBy: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  delegatedTo: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ReportWhereInputSchema: z.ZodType<Prisma.ReportWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReportWhereInputSchema),z.lazy(() => ReportWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportWhereInputSchema),z.lazy(() => ReportWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  projectDescription: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  redactedBy: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  meetDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  applicantName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  applicantAddress: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  projectCadastralRef: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  projectSpaceType: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  decision: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  precisions: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  contacts: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  furtherInformation: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  serviceInstructeur: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  pdf: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  disabled: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  udap_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  report_to_clause: z.lazy(() => Report_to_clauseListRelationFilterSchema).optional()
}).strict();

export const ReportOrderByWithRelationInputSchema: z.ZodType<Prisma.ReportOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  projectDescription: z.lazy(() => SortOrderSchema).optional(),
  redactedBy: z.lazy(() => SortOrderSchema).optional(),
  meetDate: z.lazy(() => SortOrderSchema).optional(),
  applicantName: z.lazy(() => SortOrderSchema).optional(),
  applicantAddress: z.lazy(() => SortOrderSchema).optional(),
  projectCadastralRef: z.lazy(() => SortOrderSchema).optional(),
  projectSpaceType: z.lazy(() => SortOrderSchema).optional(),
  decision: z.lazy(() => SortOrderSchema).optional(),
  precisions: z.lazy(() => SortOrderSchema).optional(),
  contacts: z.lazy(() => SortOrderSchema).optional(),
  furtherInformation: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  serviceInstructeur: z.lazy(() => SortOrderSchema).optional(),
  pdf: z.lazy(() => SortOrderSchema).optional(),
  disabled: z.lazy(() => SortOrderSchema).optional(),
  udap_id: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  report_to_clause: z.lazy(() => Report_to_clauseOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ReportWhereUniqueInputSchema: z.ZodType<Prisma.ReportWhereUniqueInput> = z.object({
  id: z.string().optional()
}).strict();

export const ReportOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReportOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  projectDescription: z.lazy(() => SortOrderSchema).optional(),
  redactedBy: z.lazy(() => SortOrderSchema).optional(),
  meetDate: z.lazy(() => SortOrderSchema).optional(),
  applicantName: z.lazy(() => SortOrderSchema).optional(),
  applicantAddress: z.lazy(() => SortOrderSchema).optional(),
  projectCadastralRef: z.lazy(() => SortOrderSchema).optional(),
  projectSpaceType: z.lazy(() => SortOrderSchema).optional(),
  decision: z.lazy(() => SortOrderSchema).optional(),
  precisions: z.lazy(() => SortOrderSchema).optional(),
  contacts: z.lazy(() => SortOrderSchema).optional(),
  furtherInformation: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  serviceInstructeur: z.lazy(() => SortOrderSchema).optional(),
  pdf: z.lazy(() => SortOrderSchema).optional(),
  disabled: z.lazy(() => SortOrderSchema).optional(),
  udap_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ReportCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ReportAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ReportMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ReportMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ReportSumOrderByAggregateInputSchema).optional()
}).strict();

export const ReportScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReportScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ReportScalarWhereWithAggregatesInputSchema),z.lazy(() => ReportScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportScalarWhereWithAggregatesInputSchema),z.lazy(() => ReportScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  projectDescription: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  redactedBy: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  meetDate: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  applicantName: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  applicantAddress: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  projectCadastralRef: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  projectSpaceType: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  decision: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  precisions: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  contacts: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  furtherInformation: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdBy: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  serviceInstructeur: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  pdf: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  disabled: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  udap_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const Report_to_clauseWhereInputSchema: z.ZodType<Prisma.Report_to_clauseWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Report_to_clauseWhereInputSchema),z.lazy(() => Report_to_clauseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Report_to_clauseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Report_to_clauseWhereInputSchema),z.lazy(() => Report_to_clauseWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reportId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  clauseId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  clause: z.union([ z.lazy(() => ClauseRelationFilterSchema),z.lazy(() => ClauseWhereInputSchema) ]).optional(),
  report: z.union([ z.lazy(() => ReportRelationFilterSchema),z.lazy(() => ReportWhereInputSchema) ]).optional(),
}).strict();

export const Report_to_clauseOrderByWithRelationInputSchema: z.ZodType<Prisma.Report_to_clauseOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportId: z.lazy(() => SortOrderSchema).optional(),
  clauseId: z.lazy(() => SortOrderSchema).optional(),
  clause: z.lazy(() => ClauseOrderByWithRelationInputSchema).optional(),
  report: z.lazy(() => ReportOrderByWithRelationInputSchema).optional()
}).strict();

export const Report_to_clauseWhereUniqueInputSchema: z.ZodType<Prisma.Report_to_clauseWhereUniqueInput> = z.object({
  id: z.string().optional()
}).strict();

export const Report_to_clauseOrderByWithAggregationInputSchema: z.ZodType<Prisma.Report_to_clauseOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportId: z.lazy(() => SortOrderSchema).optional(),
  clauseId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => Report_to_clauseCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Report_to_clauseMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Report_to_clauseMinOrderByAggregateInputSchema).optional()
}).strict();

export const Report_to_clauseScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Report_to_clauseScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Report_to_clauseScalarWhereWithAggregatesInputSchema),z.lazy(() => Report_to_clauseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Report_to_clauseScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Report_to_clauseScalarWhereWithAggregatesInputSchema),z.lazy(() => Report_to_clauseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  reportId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  clauseId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UdapWhereInputSchema: z.ZodType<Prisma.UdapWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UdapWhereInputSchema),z.lazy(() => UdapWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UdapWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UdapWhereInputSchema),z.lazy(() => UdapWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  department: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  completeCoords: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  visible: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  address: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  zipCode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  city: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.lazy(() => UserListRelationFilterSchema).optional()
}).strict();

export const UdapOrderByWithRelationInputSchema: z.ZodType<Prisma.UdapOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  department: z.lazy(() => SortOrderSchema).optional(),
  completeCoords: z.lazy(() => SortOrderSchema).optional(),
  visible: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  zipCode: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UdapWhereUniqueInputSchema: z.ZodType<Prisma.UdapWhereUniqueInput> = z.object({
  id: z.string().optional()
}).strict();

export const UdapOrderByWithAggregationInputSchema: z.ZodType<Prisma.UdapOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  department: z.lazy(() => SortOrderSchema).optional(),
  completeCoords: z.lazy(() => SortOrderSchema).optional(),
  visible: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  zipCode: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UdapCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UdapMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UdapMinOrderByAggregateInputSchema).optional()
}).strict();

export const UdapScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UdapScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UdapScalarWhereWithAggregatesInputSchema),z.lazy(() => UdapScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UdapScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UdapScalarWhereWithAggregatesInputSchema),z.lazy(() => UdapScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  department: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  completeCoords: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  visible: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  address: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  zipCode: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  city: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  phone: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  udap_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  delegation_delegation_createdByTouser: z.lazy(() => DelegationListRelationFilterSchema).optional(),
  delegation_delegation_delegatedToTouser: z.lazy(() => DelegationListRelationFilterSchema).optional(),
  report: z.lazy(() => ReportListRelationFilterSchema).optional(),
  udap: z.union([ z.lazy(() => UdapRelationFilterSchema),z.lazy(() => UdapWhereInputSchema) ]).optional(),
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  udap_id: z.lazy(() => SortOrderSchema).optional(),
  delegation_delegation_createdByTouser: z.lazy(() => DelegationOrderByRelationAggregateInputSchema).optional(),
  delegation_delegation_delegatedToTouser: z.lazy(() => DelegationOrderByRelationAggregateInputSchema).optional(),
  report: z.lazy(() => ReportOrderByRelationAggregateInputSchema).optional(),
  udap: z.lazy(() => UdapOrderByWithRelationInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().optional()
}).strict();

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  udap_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  udap_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ChipCreateInputSchema: z.ZodType<Prisma.ChipCreateInput> = z.object({
  key: z.string(),
  value: z.string(),
  udap_id: z.string(),
  text: z.string()
}).strict();

export const ChipUncheckedCreateInputSchema: z.ZodType<Prisma.ChipUncheckedCreateInput> = z.object({
  key: z.string(),
  value: z.string(),
  udap_id: z.string(),
  text: z.string()
}).strict();

export const ChipUpdateInputSchema: z.ZodType<Prisma.ChipUpdateInput> = z.object({
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  udap_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChipUncheckedUpdateInputSchema: z.ZodType<Prisma.ChipUncheckedUpdateInput> = z.object({
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  udap_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChipCreateManyInputSchema: z.ZodType<Prisma.ChipCreateManyInput> = z.object({
  key: z.string(),
  value: z.string(),
  udap_id: z.string(),
  text: z.string()
}).strict();

export const ChipUpdateManyMutationInputSchema: z.ZodType<Prisma.ChipUpdateManyMutationInput> = z.object({
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  udap_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ChipUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ChipUncheckedUpdateManyInput> = z.object({
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  udap_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ClauseCreateInputSchema: z.ZodType<Prisma.ClauseCreateInput> = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string(),
  report_to_clause: z.lazy(() => Report_to_clauseCreateNestedManyWithoutClauseInputSchema).optional()
}).strict();

export const ClauseUncheckedCreateInputSchema: z.ZodType<Prisma.ClauseUncheckedCreateInput> = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string(),
  report_to_clause: z.lazy(() => Report_to_clauseUncheckedCreateNestedManyWithoutClauseInputSchema).optional()
}).strict();

export const ClauseUpdateInputSchema: z.ZodType<Prisma.ClauseUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  report_to_clause: z.lazy(() => Report_to_clauseUpdateManyWithoutClauseNestedInputSchema).optional()
}).strict();

export const ClauseUncheckedUpdateInputSchema: z.ZodType<Prisma.ClauseUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  report_to_clause: z.lazy(() => Report_to_clauseUncheckedUpdateManyWithoutClauseNestedInputSchema).optional()
}).strict();

export const ClauseCreateManyInputSchema: z.ZodType<Prisma.ClauseCreateManyInput> = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string()
}).strict();

export const ClauseUpdateManyMutationInputSchema: z.ZodType<Prisma.ClauseUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ClauseUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ClauseUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DelegationCreateInputSchema: z.ZodType<Prisma.DelegationCreateInput> = z.object({
  user_delegation_createdByTouser: z.lazy(() => UserCreateNestedOneWithoutDelegation_delegation_createdByTouserInputSchema),
  user_delegation_delegatedToTouser: z.lazy(() => UserCreateNestedOneWithoutDelegation_delegation_delegatedToTouserInputSchema)
}).strict();

export const DelegationUncheckedCreateInputSchema: z.ZodType<Prisma.DelegationUncheckedCreateInput> = z.object({
  createdBy: z.string(),
  delegatedTo: z.string()
}).strict();

export const DelegationUpdateInputSchema: z.ZodType<Prisma.DelegationUpdateInput> = z.object({
  user_delegation_createdByTouser: z.lazy(() => UserUpdateOneRequiredWithoutDelegation_delegation_createdByTouserNestedInputSchema).optional(),
  user_delegation_delegatedToTouser: z.lazy(() => UserUpdateOneRequiredWithoutDelegation_delegation_delegatedToTouserNestedInputSchema).optional()
}).strict();

export const DelegationUncheckedUpdateInputSchema: z.ZodType<Prisma.DelegationUncheckedUpdateInput> = z.object({
  createdBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  delegatedTo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DelegationCreateManyInputSchema: z.ZodType<Prisma.DelegationCreateManyInput> = z.object({
  createdBy: z.string(),
  delegatedTo: z.string()
}).strict();

export const DelegationUpdateManyMutationInputSchema: z.ZodType<Prisma.DelegationUpdateManyMutationInput> = z.object({
}).strict();

export const DelegationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DelegationUncheckedUpdateManyInput> = z.object({
  createdBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  delegatedTo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportCreateInputSchema: z.ZodType<Prisma.ReportCreateInput> = z.object({
  id: z.string(),
  title: z.string().optional().nullable(),
  projectDescription: z.string().optional().nullable(),
  redactedBy: z.string().optional().nullable(),
  meetDate: z.coerce.date().optional().nullable(),
  applicantName: z.string().optional().nullable(),
  applicantAddress: z.string().optional().nullable(),
  projectCadastralRef: z.string().optional().nullable(),
  projectSpaceType: z.string().optional().nullable(),
  decision: z.string().optional().nullable(),
  precisions: z.string().optional().nullable(),
  contacts: z.string().optional().nullable(),
  furtherInformation: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  serviceInstructeur: z.number().int().gte(-2147483648).lte(2147483647).optional().nullable(),
  pdf: z.string().optional().nullable(),
  disabled: z.boolean().optional().nullable(),
  udap_id: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutReportInputSchema),
  report_to_clause: z.lazy(() => Report_to_clauseCreateNestedManyWithoutReportInputSchema).optional()
}).strict();

export const ReportUncheckedCreateInputSchema: z.ZodType<Prisma.ReportUncheckedCreateInput> = z.object({
  id: z.string(),
  title: z.string().optional().nullable(),
  projectDescription: z.string().optional().nullable(),
  redactedBy: z.string().optional().nullable(),
  meetDate: z.coerce.date().optional().nullable(),
  applicantName: z.string().optional().nullable(),
  applicantAddress: z.string().optional().nullable(),
  projectCadastralRef: z.string().optional().nullable(),
  projectSpaceType: z.string().optional().nullable(),
  decision: z.string().optional().nullable(),
  precisions: z.string().optional().nullable(),
  contacts: z.string().optional().nullable(),
  furtherInformation: z.string().optional().nullable(),
  createdBy: z.string(),
  createdAt: z.coerce.date(),
  serviceInstructeur: z.number().int().gte(-2147483648).lte(2147483647).optional().nullable(),
  pdf: z.string().optional().nullable(),
  disabled: z.boolean().optional().nullable(),
  udap_id: z.string().optional().nullable(),
  report_to_clause: z.lazy(() => Report_to_clauseUncheckedCreateNestedManyWithoutReportInputSchema).optional()
}).strict();

export const ReportUpdateInputSchema: z.ZodType<Prisma.ReportUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  redactedBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meetDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  applicantName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  applicantAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectCadastralRef: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectSpaceType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  decision: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  precisions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contacts: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  furtherInformation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  serviceInstructeur: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pdf: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  disabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  udap_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutReportNestedInputSchema).optional(),
  report_to_clause: z.lazy(() => Report_to_clauseUpdateManyWithoutReportNestedInputSchema).optional()
}).strict();

export const ReportUncheckedUpdateInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  redactedBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meetDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  applicantName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  applicantAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectCadastralRef: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectSpaceType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  decision: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  precisions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contacts: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  furtherInformation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  serviceInstructeur: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pdf: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  disabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  udap_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  report_to_clause: z.lazy(() => Report_to_clauseUncheckedUpdateManyWithoutReportNestedInputSchema).optional()
}).strict();

export const ReportCreateManyInputSchema: z.ZodType<Prisma.ReportCreateManyInput> = z.object({
  id: z.string(),
  title: z.string().optional().nullable(),
  projectDescription: z.string().optional().nullable(),
  redactedBy: z.string().optional().nullable(),
  meetDate: z.coerce.date().optional().nullable(),
  applicantName: z.string().optional().nullable(),
  applicantAddress: z.string().optional().nullable(),
  projectCadastralRef: z.string().optional().nullable(),
  projectSpaceType: z.string().optional().nullable(),
  decision: z.string().optional().nullable(),
  precisions: z.string().optional().nullable(),
  contacts: z.string().optional().nullable(),
  furtherInformation: z.string().optional().nullable(),
  createdBy: z.string(),
  createdAt: z.coerce.date(),
  serviceInstructeur: z.number().int().gte(-2147483648).lte(2147483647).optional().nullable(),
  pdf: z.string().optional().nullable(),
  disabled: z.boolean().optional().nullable(),
  udap_id: z.string().optional().nullable()
}).strict();

export const ReportUpdateManyMutationInputSchema: z.ZodType<Prisma.ReportUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  redactedBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meetDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  applicantName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  applicantAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectCadastralRef: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectSpaceType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  decision: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  precisions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contacts: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  furtherInformation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  serviceInstructeur: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pdf: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  disabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  udap_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ReportUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  redactedBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meetDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  applicantName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  applicantAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectCadastralRef: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectSpaceType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  decision: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  precisions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contacts: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  furtherInformation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  serviceInstructeur: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pdf: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  disabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  udap_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Report_to_clauseCreateInputSchema: z.ZodType<Prisma.Report_to_clauseCreateInput> = z.object({
  id: z.string(),
  clause: z.lazy(() => ClauseCreateNestedOneWithoutReport_to_clauseInputSchema),
  report: z.lazy(() => ReportCreateNestedOneWithoutReport_to_clauseInputSchema)
}).strict();

export const Report_to_clauseUncheckedCreateInputSchema: z.ZodType<Prisma.Report_to_clauseUncheckedCreateInput> = z.object({
  id: z.string(),
  reportId: z.string(),
  clauseId: z.string()
}).strict();

export const Report_to_clauseUpdateInputSchema: z.ZodType<Prisma.Report_to_clauseUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clause: z.lazy(() => ClauseUpdateOneRequiredWithoutReport_to_clauseNestedInputSchema).optional(),
  report: z.lazy(() => ReportUpdateOneRequiredWithoutReport_to_clauseNestedInputSchema).optional()
}).strict();

export const Report_to_clauseUncheckedUpdateInputSchema: z.ZodType<Prisma.Report_to_clauseUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clauseId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Report_to_clauseCreateManyInputSchema: z.ZodType<Prisma.Report_to_clauseCreateManyInput> = z.object({
  id: z.string(),
  reportId: z.string(),
  clauseId: z.string()
}).strict();

export const Report_to_clauseUpdateManyMutationInputSchema: z.ZodType<Prisma.Report_to_clauseUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Report_to_clauseUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Report_to_clauseUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clauseId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UdapCreateInputSchema: z.ZodType<Prisma.UdapCreateInput> = z.object({
  id: z.string(),
  department: z.string(),
  completeCoords: z.string().optional().nullable(),
  visible: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedManyWithoutUdapInputSchema).optional()
}).strict();

export const UdapUncheckedCreateInputSchema: z.ZodType<Prisma.UdapUncheckedCreateInput> = z.object({
  id: z.string(),
  department: z.string(),
  completeCoords: z.string().optional().nullable(),
  visible: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  user: z.lazy(() => UserUncheckedCreateNestedManyWithoutUdapInputSchema).optional()
}).strict();

export const UdapUpdateInputSchema: z.ZodType<Prisma.UdapUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  department: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completeCoords: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  visible: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zipCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateManyWithoutUdapNestedInputSchema).optional()
}).strict();

export const UdapUncheckedUpdateInputSchema: z.ZodType<Prisma.UdapUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  department: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completeCoords: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  visible: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zipCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUncheckedUpdateManyWithoutUdapNestedInputSchema).optional()
}).strict();

export const UdapCreateManyInputSchema: z.ZodType<Prisma.UdapCreateManyInput> = z.object({
  id: z.string(),
  department: z.string(),
  completeCoords: z.string().optional().nullable(),
  visible: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable()
}).strict();

export const UdapUpdateManyMutationInputSchema: z.ZodType<Prisma.UdapUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  department: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completeCoords: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  visible: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zipCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UdapUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UdapUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  department: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completeCoords: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  visible: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zipCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  delegation_delegation_createdByTouser: z.lazy(() => DelegationCreateNestedManyWithoutUser_delegation_createdByTouserInputSchema).optional(),
  delegation_delegation_delegatedToTouser: z.lazy(() => DelegationCreateNestedManyWithoutUser_delegation_delegatedToTouserInputSchema).optional(),
  report: z.lazy(() => ReportCreateNestedManyWithoutUserInputSchema).optional(),
  udap: z.lazy(() => UdapCreateNestedOneWithoutUserInputSchema)
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string(),
  name: z.string(),
  udap_id: z.string(),
  delegation_delegation_createdByTouser: z.lazy(() => DelegationUncheckedCreateNestedManyWithoutUser_delegation_createdByTouserInputSchema).optional(),
  delegation_delegation_delegatedToTouser: z.lazy(() => DelegationUncheckedCreateNestedManyWithoutUser_delegation_delegatedToTouserInputSchema).optional(),
  report: z.lazy(() => ReportUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  delegation_delegation_createdByTouser: z.lazy(() => DelegationUpdateManyWithoutUser_delegation_createdByTouserNestedInputSchema).optional(),
  delegation_delegation_delegatedToTouser: z.lazy(() => DelegationUpdateManyWithoutUser_delegation_delegatedToTouserNestedInputSchema).optional(),
  report: z.lazy(() => ReportUpdateManyWithoutUserNestedInputSchema).optional(),
  udap: z.lazy(() => UdapUpdateOneRequiredWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  udap_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  delegation_delegation_createdByTouser: z.lazy(() => DelegationUncheckedUpdateManyWithoutUser_delegation_createdByTouserNestedInputSchema).optional(),
  delegation_delegation_delegatedToTouser: z.lazy(() => DelegationUncheckedUpdateManyWithoutUser_delegation_delegatedToTouserNestedInputSchema).optional(),
  report: z.lazy(() => ReportUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string(),
  name: z.string(),
  udap_id: z.string()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  udap_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const ChipKeyValueUdap_idCompoundUniqueInputSchema: z.ZodType<Prisma.ChipKeyValueUdap_idCompoundUniqueInput> = z.object({
  key: z.string(),
  value: z.string(),
  udap_id: z.string()
}).strict();

export const ChipCountOrderByAggregateInputSchema: z.ZodType<Prisma.ChipCountOrderByAggregateInput> = z.object({
  key: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  udap_id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChipMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ChipMaxOrderByAggregateInput> = z.object({
  key: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  udap_id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChipMinOrderByAggregateInputSchema: z.ZodType<Prisma.ChipMinOrderByAggregateInput> = z.object({
  key: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  udap_id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const Report_to_clauseListRelationFilterSchema: z.ZodType<Prisma.Report_to_clauseListRelationFilter> = z.object({
  every: z.lazy(() => Report_to_clauseWhereInputSchema).optional(),
  some: z.lazy(() => Report_to_clauseWhereInputSchema).optional(),
  none: z.lazy(() => Report_to_clauseWhereInputSchema).optional()
}).strict();

export const Report_to_clauseOrderByRelationAggregateInputSchema: z.ZodType<Prisma.Report_to_clauseOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ClauseCountOrderByAggregateInputSchema: z.ZodType<Prisma.ClauseCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ClauseMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ClauseMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ClauseMinOrderByAggregateInputSchema: z.ZodType<Prisma.ClauseMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const DelegationCreatedByDelegatedToCompoundUniqueInputSchema: z.ZodType<Prisma.DelegationCreatedByDelegatedToCompoundUniqueInput> = z.object({
  createdBy: z.string(),
  delegatedTo: z.string()
}).strict();

export const DelegationCountOrderByAggregateInputSchema: z.ZodType<Prisma.DelegationCountOrderByAggregateInput> = z.object({
  createdBy: z.lazy(() => SortOrderSchema).optional(),
  delegatedTo: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DelegationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DelegationMaxOrderByAggregateInput> = z.object({
  createdBy: z.lazy(() => SortOrderSchema).optional(),
  delegatedTo: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DelegationMinOrderByAggregateInputSchema: z.ZodType<Prisma.DelegationMinOrderByAggregateInput> = z.object({
  createdBy: z.lazy(() => SortOrderSchema).optional(),
  delegatedTo: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const ReportCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReportCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  projectDescription: z.lazy(() => SortOrderSchema).optional(),
  redactedBy: z.lazy(() => SortOrderSchema).optional(),
  meetDate: z.lazy(() => SortOrderSchema).optional(),
  applicantName: z.lazy(() => SortOrderSchema).optional(),
  applicantAddress: z.lazy(() => SortOrderSchema).optional(),
  projectCadastralRef: z.lazy(() => SortOrderSchema).optional(),
  projectSpaceType: z.lazy(() => SortOrderSchema).optional(),
  decision: z.lazy(() => SortOrderSchema).optional(),
  precisions: z.lazy(() => SortOrderSchema).optional(),
  contacts: z.lazy(() => SortOrderSchema).optional(),
  furtherInformation: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  serviceInstructeur: z.lazy(() => SortOrderSchema).optional(),
  pdf: z.lazy(() => SortOrderSchema).optional(),
  disabled: z.lazy(() => SortOrderSchema).optional(),
  udap_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReportAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ReportAvgOrderByAggregateInput> = z.object({
  serviceInstructeur: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReportMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReportMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  projectDescription: z.lazy(() => SortOrderSchema).optional(),
  redactedBy: z.lazy(() => SortOrderSchema).optional(),
  meetDate: z.lazy(() => SortOrderSchema).optional(),
  applicantName: z.lazy(() => SortOrderSchema).optional(),
  applicantAddress: z.lazy(() => SortOrderSchema).optional(),
  projectCadastralRef: z.lazy(() => SortOrderSchema).optional(),
  projectSpaceType: z.lazy(() => SortOrderSchema).optional(),
  decision: z.lazy(() => SortOrderSchema).optional(),
  precisions: z.lazy(() => SortOrderSchema).optional(),
  contacts: z.lazy(() => SortOrderSchema).optional(),
  furtherInformation: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  serviceInstructeur: z.lazy(() => SortOrderSchema).optional(),
  pdf: z.lazy(() => SortOrderSchema).optional(),
  disabled: z.lazy(() => SortOrderSchema).optional(),
  udap_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReportMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReportMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  projectDescription: z.lazy(() => SortOrderSchema).optional(),
  redactedBy: z.lazy(() => SortOrderSchema).optional(),
  meetDate: z.lazy(() => SortOrderSchema).optional(),
  applicantName: z.lazy(() => SortOrderSchema).optional(),
  applicantAddress: z.lazy(() => SortOrderSchema).optional(),
  projectCadastralRef: z.lazy(() => SortOrderSchema).optional(),
  projectSpaceType: z.lazy(() => SortOrderSchema).optional(),
  decision: z.lazy(() => SortOrderSchema).optional(),
  precisions: z.lazy(() => SortOrderSchema).optional(),
  contacts: z.lazy(() => SortOrderSchema).optional(),
  furtherInformation: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  serviceInstructeur: z.lazy(() => SortOrderSchema).optional(),
  pdf: z.lazy(() => SortOrderSchema).optional(),
  disabled: z.lazy(() => SortOrderSchema).optional(),
  udap_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReportSumOrderByAggregateInputSchema: z.ZodType<Prisma.ReportSumOrderByAggregateInput> = z.object({
  serviceInstructeur: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const ClauseRelationFilterSchema: z.ZodType<Prisma.ClauseRelationFilter> = z.object({
  is: z.lazy(() => ClauseWhereInputSchema).optional(),
  isNot: z.lazy(() => ClauseWhereInputSchema).optional()
}).strict();

export const ReportRelationFilterSchema: z.ZodType<Prisma.ReportRelationFilter> = z.object({
  is: z.lazy(() => ReportWhereInputSchema).optional(),
  isNot: z.lazy(() => ReportWhereInputSchema).optional()
}).strict();

export const Report_to_clauseCountOrderByAggregateInputSchema: z.ZodType<Prisma.Report_to_clauseCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportId: z.lazy(() => SortOrderSchema).optional(),
  clauseId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Report_to_clauseMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Report_to_clauseMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportId: z.lazy(() => SortOrderSchema).optional(),
  clauseId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Report_to_clauseMinOrderByAggregateInputSchema: z.ZodType<Prisma.Report_to_clauseMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportId: z.lazy(() => SortOrderSchema).optional(),
  clauseId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserListRelationFilterSchema: z.ZodType<Prisma.UserListRelationFilter> = z.object({
  every: z.lazy(() => UserWhereInputSchema).optional(),
  some: z.lazy(() => UserWhereInputSchema).optional(),
  none: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UdapCountOrderByAggregateInputSchema: z.ZodType<Prisma.UdapCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  department: z.lazy(() => SortOrderSchema).optional(),
  completeCoords: z.lazy(() => SortOrderSchema).optional(),
  visible: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  zipCode: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UdapMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UdapMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  department: z.lazy(() => SortOrderSchema).optional(),
  completeCoords: z.lazy(() => SortOrderSchema).optional(),
  visible: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  zipCode: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UdapMinOrderByAggregateInputSchema: z.ZodType<Prisma.UdapMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  department: z.lazy(() => SortOrderSchema).optional(),
  completeCoords: z.lazy(() => SortOrderSchema).optional(),
  visible: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  zipCode: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  phone: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DelegationListRelationFilterSchema: z.ZodType<Prisma.DelegationListRelationFilter> = z.object({
  every: z.lazy(() => DelegationWhereInputSchema).optional(),
  some: z.lazy(() => DelegationWhereInputSchema).optional(),
  none: z.lazy(() => DelegationWhereInputSchema).optional()
}).strict();

export const ReportListRelationFilterSchema: z.ZodType<Prisma.ReportListRelationFilter> = z.object({
  every: z.lazy(() => ReportWhereInputSchema).optional(),
  some: z.lazy(() => ReportWhereInputSchema).optional(),
  none: z.lazy(() => ReportWhereInputSchema).optional()
}).strict();

export const UdapRelationFilterSchema: z.ZodType<Prisma.UdapRelationFilter> = z.object({
  is: z.lazy(() => UdapWhereInputSchema).optional(),
  isNot: z.lazy(() => UdapWhereInputSchema).optional()
}).strict();

export const DelegationOrderByRelationAggregateInputSchema: z.ZodType<Prisma.DelegationOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReportOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ReportOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  udap_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  udap_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  udap_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const Report_to_clauseCreateNestedManyWithoutClauseInputSchema: z.ZodType<Prisma.Report_to_clauseCreateNestedManyWithoutClauseInput> = z.object({
  create: z.union([ z.lazy(() => Report_to_clauseCreateWithoutClauseInputSchema),z.lazy(() => Report_to_clauseCreateWithoutClauseInputSchema).array(),z.lazy(() => Report_to_clauseUncheckedCreateWithoutClauseInputSchema),z.lazy(() => Report_to_clauseUncheckedCreateWithoutClauseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Report_to_clauseCreateOrConnectWithoutClauseInputSchema),z.lazy(() => Report_to_clauseCreateOrConnectWithoutClauseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Report_to_clauseCreateManyClauseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Report_to_clauseWhereUniqueInputSchema),z.lazy(() => Report_to_clauseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Report_to_clauseUncheckedCreateNestedManyWithoutClauseInputSchema: z.ZodType<Prisma.Report_to_clauseUncheckedCreateNestedManyWithoutClauseInput> = z.object({
  create: z.union([ z.lazy(() => Report_to_clauseCreateWithoutClauseInputSchema),z.lazy(() => Report_to_clauseCreateWithoutClauseInputSchema).array(),z.lazy(() => Report_to_clauseUncheckedCreateWithoutClauseInputSchema),z.lazy(() => Report_to_clauseUncheckedCreateWithoutClauseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Report_to_clauseCreateOrConnectWithoutClauseInputSchema),z.lazy(() => Report_to_clauseCreateOrConnectWithoutClauseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Report_to_clauseCreateManyClauseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Report_to_clauseWhereUniqueInputSchema),z.lazy(() => Report_to_clauseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Report_to_clauseUpdateManyWithoutClauseNestedInputSchema: z.ZodType<Prisma.Report_to_clauseUpdateManyWithoutClauseNestedInput> = z.object({
  create: z.union([ z.lazy(() => Report_to_clauseCreateWithoutClauseInputSchema),z.lazy(() => Report_to_clauseCreateWithoutClauseInputSchema).array(),z.lazy(() => Report_to_clauseUncheckedCreateWithoutClauseInputSchema),z.lazy(() => Report_to_clauseUncheckedCreateWithoutClauseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Report_to_clauseCreateOrConnectWithoutClauseInputSchema),z.lazy(() => Report_to_clauseCreateOrConnectWithoutClauseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Report_to_clauseUpsertWithWhereUniqueWithoutClauseInputSchema),z.lazy(() => Report_to_clauseUpsertWithWhereUniqueWithoutClauseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Report_to_clauseCreateManyClauseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Report_to_clauseWhereUniqueInputSchema),z.lazy(() => Report_to_clauseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Report_to_clauseWhereUniqueInputSchema),z.lazy(() => Report_to_clauseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Report_to_clauseWhereUniqueInputSchema),z.lazy(() => Report_to_clauseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Report_to_clauseWhereUniqueInputSchema),z.lazy(() => Report_to_clauseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Report_to_clauseUpdateWithWhereUniqueWithoutClauseInputSchema),z.lazy(() => Report_to_clauseUpdateWithWhereUniqueWithoutClauseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Report_to_clauseUpdateManyWithWhereWithoutClauseInputSchema),z.lazy(() => Report_to_clauseUpdateManyWithWhereWithoutClauseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Report_to_clauseScalarWhereInputSchema),z.lazy(() => Report_to_clauseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Report_to_clauseUncheckedUpdateManyWithoutClauseNestedInputSchema: z.ZodType<Prisma.Report_to_clauseUncheckedUpdateManyWithoutClauseNestedInput> = z.object({
  create: z.union([ z.lazy(() => Report_to_clauseCreateWithoutClauseInputSchema),z.lazy(() => Report_to_clauseCreateWithoutClauseInputSchema).array(),z.lazy(() => Report_to_clauseUncheckedCreateWithoutClauseInputSchema),z.lazy(() => Report_to_clauseUncheckedCreateWithoutClauseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Report_to_clauseCreateOrConnectWithoutClauseInputSchema),z.lazy(() => Report_to_clauseCreateOrConnectWithoutClauseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Report_to_clauseUpsertWithWhereUniqueWithoutClauseInputSchema),z.lazy(() => Report_to_clauseUpsertWithWhereUniqueWithoutClauseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Report_to_clauseCreateManyClauseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Report_to_clauseWhereUniqueInputSchema),z.lazy(() => Report_to_clauseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Report_to_clauseWhereUniqueInputSchema),z.lazy(() => Report_to_clauseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Report_to_clauseWhereUniqueInputSchema),z.lazy(() => Report_to_clauseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Report_to_clauseWhereUniqueInputSchema),z.lazy(() => Report_to_clauseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Report_to_clauseUpdateWithWhereUniqueWithoutClauseInputSchema),z.lazy(() => Report_to_clauseUpdateWithWhereUniqueWithoutClauseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Report_to_clauseUpdateManyWithWhereWithoutClauseInputSchema),z.lazy(() => Report_to_clauseUpdateManyWithWhereWithoutClauseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Report_to_clauseScalarWhereInputSchema),z.lazy(() => Report_to_clauseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutDelegation_delegation_createdByTouserInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutDelegation_delegation_createdByTouserInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutDelegation_delegation_createdByTouserInputSchema),z.lazy(() => UserUncheckedCreateWithoutDelegation_delegation_createdByTouserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDelegation_delegation_createdByTouserInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutDelegation_delegation_delegatedToTouserInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutDelegation_delegation_delegatedToTouserInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutDelegation_delegation_delegatedToTouserInputSchema),z.lazy(() => UserUncheckedCreateWithoutDelegation_delegation_delegatedToTouserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDelegation_delegation_delegatedToTouserInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutDelegation_delegation_createdByTouserNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutDelegation_delegation_createdByTouserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutDelegation_delegation_createdByTouserInputSchema),z.lazy(() => UserUncheckedCreateWithoutDelegation_delegation_createdByTouserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDelegation_delegation_createdByTouserInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutDelegation_delegation_createdByTouserInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutDelegation_delegation_createdByTouserInputSchema),z.lazy(() => UserUncheckedUpdateWithoutDelegation_delegation_createdByTouserInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutDelegation_delegation_delegatedToTouserNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutDelegation_delegation_delegatedToTouserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutDelegation_delegation_delegatedToTouserInputSchema),z.lazy(() => UserUncheckedCreateWithoutDelegation_delegation_delegatedToTouserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDelegation_delegation_delegatedToTouserInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutDelegation_delegation_delegatedToTouserInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutDelegation_delegation_delegatedToTouserInputSchema),z.lazy(() => UserUncheckedUpdateWithoutDelegation_delegation_delegatedToTouserInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutReportInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutReportInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReportInputSchema),z.lazy(() => UserUncheckedCreateWithoutReportInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReportInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const Report_to_clauseCreateNestedManyWithoutReportInputSchema: z.ZodType<Prisma.Report_to_clauseCreateNestedManyWithoutReportInput> = z.object({
  create: z.union([ z.lazy(() => Report_to_clauseCreateWithoutReportInputSchema),z.lazy(() => Report_to_clauseCreateWithoutReportInputSchema).array(),z.lazy(() => Report_to_clauseUncheckedCreateWithoutReportInputSchema),z.lazy(() => Report_to_clauseUncheckedCreateWithoutReportInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Report_to_clauseCreateOrConnectWithoutReportInputSchema),z.lazy(() => Report_to_clauseCreateOrConnectWithoutReportInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Report_to_clauseCreateManyReportInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Report_to_clauseWhereUniqueInputSchema),z.lazy(() => Report_to_clauseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Report_to_clauseUncheckedCreateNestedManyWithoutReportInputSchema: z.ZodType<Prisma.Report_to_clauseUncheckedCreateNestedManyWithoutReportInput> = z.object({
  create: z.union([ z.lazy(() => Report_to_clauseCreateWithoutReportInputSchema),z.lazy(() => Report_to_clauseCreateWithoutReportInputSchema).array(),z.lazy(() => Report_to_clauseUncheckedCreateWithoutReportInputSchema),z.lazy(() => Report_to_clauseUncheckedCreateWithoutReportInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Report_to_clauseCreateOrConnectWithoutReportInputSchema),z.lazy(() => Report_to_clauseCreateOrConnectWithoutReportInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Report_to_clauseCreateManyReportInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Report_to_clauseWhereUniqueInputSchema),z.lazy(() => Report_to_clauseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable()
}).strict();

export const UserUpdateOneRequiredWithoutReportNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutReportNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReportInputSchema),z.lazy(() => UserUncheckedCreateWithoutReportInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReportInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutReportInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutReportInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReportInputSchema) ]).optional(),
}).strict();

export const Report_to_clauseUpdateManyWithoutReportNestedInputSchema: z.ZodType<Prisma.Report_to_clauseUpdateManyWithoutReportNestedInput> = z.object({
  create: z.union([ z.lazy(() => Report_to_clauseCreateWithoutReportInputSchema),z.lazy(() => Report_to_clauseCreateWithoutReportInputSchema).array(),z.lazy(() => Report_to_clauseUncheckedCreateWithoutReportInputSchema),z.lazy(() => Report_to_clauseUncheckedCreateWithoutReportInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Report_to_clauseCreateOrConnectWithoutReportInputSchema),z.lazy(() => Report_to_clauseCreateOrConnectWithoutReportInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Report_to_clauseUpsertWithWhereUniqueWithoutReportInputSchema),z.lazy(() => Report_to_clauseUpsertWithWhereUniqueWithoutReportInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Report_to_clauseCreateManyReportInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Report_to_clauseWhereUniqueInputSchema),z.lazy(() => Report_to_clauseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Report_to_clauseWhereUniqueInputSchema),z.lazy(() => Report_to_clauseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Report_to_clauseWhereUniqueInputSchema),z.lazy(() => Report_to_clauseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Report_to_clauseWhereUniqueInputSchema),z.lazy(() => Report_to_clauseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Report_to_clauseUpdateWithWhereUniqueWithoutReportInputSchema),z.lazy(() => Report_to_clauseUpdateWithWhereUniqueWithoutReportInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Report_to_clauseUpdateManyWithWhereWithoutReportInputSchema),z.lazy(() => Report_to_clauseUpdateManyWithWhereWithoutReportInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Report_to_clauseScalarWhereInputSchema),z.lazy(() => Report_to_clauseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Report_to_clauseUncheckedUpdateManyWithoutReportNestedInputSchema: z.ZodType<Prisma.Report_to_clauseUncheckedUpdateManyWithoutReportNestedInput> = z.object({
  create: z.union([ z.lazy(() => Report_to_clauseCreateWithoutReportInputSchema),z.lazy(() => Report_to_clauseCreateWithoutReportInputSchema).array(),z.lazy(() => Report_to_clauseUncheckedCreateWithoutReportInputSchema),z.lazy(() => Report_to_clauseUncheckedCreateWithoutReportInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Report_to_clauseCreateOrConnectWithoutReportInputSchema),z.lazy(() => Report_to_clauseCreateOrConnectWithoutReportInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Report_to_clauseUpsertWithWhereUniqueWithoutReportInputSchema),z.lazy(() => Report_to_clauseUpsertWithWhereUniqueWithoutReportInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Report_to_clauseCreateManyReportInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Report_to_clauseWhereUniqueInputSchema),z.lazy(() => Report_to_clauseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Report_to_clauseWhereUniqueInputSchema),z.lazy(() => Report_to_clauseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Report_to_clauseWhereUniqueInputSchema),z.lazy(() => Report_to_clauseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Report_to_clauseWhereUniqueInputSchema),z.lazy(() => Report_to_clauseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Report_to_clauseUpdateWithWhereUniqueWithoutReportInputSchema),z.lazy(() => Report_to_clauseUpdateWithWhereUniqueWithoutReportInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Report_to_clauseUpdateManyWithWhereWithoutReportInputSchema),z.lazy(() => Report_to_clauseUpdateManyWithWhereWithoutReportInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Report_to_clauseScalarWhereInputSchema),z.lazy(() => Report_to_clauseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ClauseCreateNestedOneWithoutReport_to_clauseInputSchema: z.ZodType<Prisma.ClauseCreateNestedOneWithoutReport_to_clauseInput> = z.object({
  create: z.union([ z.lazy(() => ClauseCreateWithoutReport_to_clauseInputSchema),z.lazy(() => ClauseUncheckedCreateWithoutReport_to_clauseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ClauseCreateOrConnectWithoutReport_to_clauseInputSchema).optional(),
  connect: z.lazy(() => ClauseWhereUniqueInputSchema).optional()
}).strict();

export const ReportCreateNestedOneWithoutReport_to_clauseInputSchema: z.ZodType<Prisma.ReportCreateNestedOneWithoutReport_to_clauseInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutReport_to_clauseInputSchema),z.lazy(() => ReportUncheckedCreateWithoutReport_to_clauseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ReportCreateOrConnectWithoutReport_to_clauseInputSchema).optional(),
  connect: z.lazy(() => ReportWhereUniqueInputSchema).optional()
}).strict();

export const ClauseUpdateOneRequiredWithoutReport_to_clauseNestedInputSchema: z.ZodType<Prisma.ClauseUpdateOneRequiredWithoutReport_to_clauseNestedInput> = z.object({
  create: z.union([ z.lazy(() => ClauseCreateWithoutReport_to_clauseInputSchema),z.lazy(() => ClauseUncheckedCreateWithoutReport_to_clauseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ClauseCreateOrConnectWithoutReport_to_clauseInputSchema).optional(),
  upsert: z.lazy(() => ClauseUpsertWithoutReport_to_clauseInputSchema).optional(),
  connect: z.lazy(() => ClauseWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ClauseUpdateWithoutReport_to_clauseInputSchema),z.lazy(() => ClauseUncheckedUpdateWithoutReport_to_clauseInputSchema) ]).optional(),
}).strict();

export const ReportUpdateOneRequiredWithoutReport_to_clauseNestedInputSchema: z.ZodType<Prisma.ReportUpdateOneRequiredWithoutReport_to_clauseNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutReport_to_clauseInputSchema),z.lazy(() => ReportUncheckedCreateWithoutReport_to_clauseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ReportCreateOrConnectWithoutReport_to_clauseInputSchema).optional(),
  upsert: z.lazy(() => ReportUpsertWithoutReport_to_clauseInputSchema).optional(),
  connect: z.lazy(() => ReportWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ReportUpdateWithoutReport_to_clauseInputSchema),z.lazy(() => ReportUncheckedUpdateWithoutReport_to_clauseInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedManyWithoutUdapInputSchema: z.ZodType<Prisma.UserCreateNestedManyWithoutUdapInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUdapInputSchema),z.lazy(() => UserCreateWithoutUdapInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutUdapInputSchema),z.lazy(() => UserUncheckedCreateWithoutUdapInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutUdapInputSchema),z.lazy(() => UserCreateOrConnectWithoutUdapInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyUdapInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedCreateNestedManyWithoutUdapInputSchema: z.ZodType<Prisma.UserUncheckedCreateNestedManyWithoutUdapInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUdapInputSchema),z.lazy(() => UserCreateWithoutUdapInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutUdapInputSchema),z.lazy(() => UserUncheckedCreateWithoutUdapInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutUdapInputSchema),z.lazy(() => UserCreateOrConnectWithoutUdapInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyUdapInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateManyWithoutUdapNestedInputSchema: z.ZodType<Prisma.UserUpdateManyWithoutUdapNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUdapInputSchema),z.lazy(() => UserCreateWithoutUdapInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutUdapInputSchema),z.lazy(() => UserUncheckedCreateWithoutUdapInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutUdapInputSchema),z.lazy(() => UserCreateOrConnectWithoutUdapInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutUdapInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutUdapInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyUdapInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutUdapInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutUdapInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutUdapInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutUdapInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUncheckedUpdateManyWithoutUdapNestedInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutUdapNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUdapInputSchema),z.lazy(() => UserCreateWithoutUdapInputSchema).array(),z.lazy(() => UserUncheckedCreateWithoutUdapInputSchema),z.lazy(() => UserUncheckedCreateWithoutUdapInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserCreateOrConnectWithoutUdapInputSchema),z.lazy(() => UserCreateOrConnectWithoutUdapInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserUpsertWithWhereUniqueWithoutUdapInputSchema),z.lazy(() => UserUpsertWithWhereUniqueWithoutUdapInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserCreateManyUdapInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserWhereUniqueInputSchema),z.lazy(() => UserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithWhereUniqueWithoutUdapInputSchema),z.lazy(() => UserUpdateWithWhereUniqueWithoutUdapInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserUpdateManyWithWhereWithoutUdapInputSchema),z.lazy(() => UserUpdateManyWithWhereWithoutUdapInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DelegationCreateNestedManyWithoutUser_delegation_createdByTouserInputSchema: z.ZodType<Prisma.DelegationCreateNestedManyWithoutUser_delegation_createdByTouserInput> = z.object({
  create: z.union([ z.lazy(() => DelegationCreateWithoutUser_delegation_createdByTouserInputSchema),z.lazy(() => DelegationCreateWithoutUser_delegation_createdByTouserInputSchema).array(),z.lazy(() => DelegationUncheckedCreateWithoutUser_delegation_createdByTouserInputSchema),z.lazy(() => DelegationUncheckedCreateWithoutUser_delegation_createdByTouserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DelegationCreateOrConnectWithoutUser_delegation_createdByTouserInputSchema),z.lazy(() => DelegationCreateOrConnectWithoutUser_delegation_createdByTouserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DelegationCreateManyUser_delegation_createdByTouserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DelegationWhereUniqueInputSchema),z.lazy(() => DelegationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DelegationCreateNestedManyWithoutUser_delegation_delegatedToTouserInputSchema: z.ZodType<Prisma.DelegationCreateNestedManyWithoutUser_delegation_delegatedToTouserInput> = z.object({
  create: z.union([ z.lazy(() => DelegationCreateWithoutUser_delegation_delegatedToTouserInputSchema),z.lazy(() => DelegationCreateWithoutUser_delegation_delegatedToTouserInputSchema).array(),z.lazy(() => DelegationUncheckedCreateWithoutUser_delegation_delegatedToTouserInputSchema),z.lazy(() => DelegationUncheckedCreateWithoutUser_delegation_delegatedToTouserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DelegationCreateOrConnectWithoutUser_delegation_delegatedToTouserInputSchema),z.lazy(() => DelegationCreateOrConnectWithoutUser_delegation_delegatedToTouserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DelegationCreateManyUser_delegation_delegatedToTouserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DelegationWhereUniqueInputSchema),z.lazy(() => DelegationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReportCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ReportCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutUserInputSchema),z.lazy(() => ReportCreateWithoutUserInputSchema).array(),z.lazy(() => ReportUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReportUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReportCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UdapCreateNestedOneWithoutUserInputSchema: z.ZodType<Prisma.UdapCreateNestedOneWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UdapCreateWithoutUserInputSchema),z.lazy(() => UdapUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UdapCreateOrConnectWithoutUserInputSchema).optional(),
  connect: z.lazy(() => UdapWhereUniqueInputSchema).optional()
}).strict();

export const DelegationUncheckedCreateNestedManyWithoutUser_delegation_createdByTouserInputSchema: z.ZodType<Prisma.DelegationUncheckedCreateNestedManyWithoutUser_delegation_createdByTouserInput> = z.object({
  create: z.union([ z.lazy(() => DelegationCreateWithoutUser_delegation_createdByTouserInputSchema),z.lazy(() => DelegationCreateWithoutUser_delegation_createdByTouserInputSchema).array(),z.lazy(() => DelegationUncheckedCreateWithoutUser_delegation_createdByTouserInputSchema),z.lazy(() => DelegationUncheckedCreateWithoutUser_delegation_createdByTouserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DelegationCreateOrConnectWithoutUser_delegation_createdByTouserInputSchema),z.lazy(() => DelegationCreateOrConnectWithoutUser_delegation_createdByTouserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DelegationCreateManyUser_delegation_createdByTouserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DelegationWhereUniqueInputSchema),z.lazy(() => DelegationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DelegationUncheckedCreateNestedManyWithoutUser_delegation_delegatedToTouserInputSchema: z.ZodType<Prisma.DelegationUncheckedCreateNestedManyWithoutUser_delegation_delegatedToTouserInput> = z.object({
  create: z.union([ z.lazy(() => DelegationCreateWithoutUser_delegation_delegatedToTouserInputSchema),z.lazy(() => DelegationCreateWithoutUser_delegation_delegatedToTouserInputSchema).array(),z.lazy(() => DelegationUncheckedCreateWithoutUser_delegation_delegatedToTouserInputSchema),z.lazy(() => DelegationUncheckedCreateWithoutUser_delegation_delegatedToTouserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DelegationCreateOrConnectWithoutUser_delegation_delegatedToTouserInputSchema),z.lazy(() => DelegationCreateOrConnectWithoutUser_delegation_delegatedToTouserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DelegationCreateManyUser_delegation_delegatedToTouserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => DelegationWhereUniqueInputSchema),z.lazy(() => DelegationWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReportUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ReportUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutUserInputSchema),z.lazy(() => ReportCreateWithoutUserInputSchema).array(),z.lazy(() => ReportUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReportUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReportCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DelegationUpdateManyWithoutUser_delegation_createdByTouserNestedInputSchema: z.ZodType<Prisma.DelegationUpdateManyWithoutUser_delegation_createdByTouserNestedInput> = z.object({
  create: z.union([ z.lazy(() => DelegationCreateWithoutUser_delegation_createdByTouserInputSchema),z.lazy(() => DelegationCreateWithoutUser_delegation_createdByTouserInputSchema).array(),z.lazy(() => DelegationUncheckedCreateWithoutUser_delegation_createdByTouserInputSchema),z.lazy(() => DelegationUncheckedCreateWithoutUser_delegation_createdByTouserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DelegationCreateOrConnectWithoutUser_delegation_createdByTouserInputSchema),z.lazy(() => DelegationCreateOrConnectWithoutUser_delegation_createdByTouserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DelegationUpsertWithWhereUniqueWithoutUser_delegation_createdByTouserInputSchema),z.lazy(() => DelegationUpsertWithWhereUniqueWithoutUser_delegation_createdByTouserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DelegationCreateManyUser_delegation_createdByTouserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DelegationWhereUniqueInputSchema),z.lazy(() => DelegationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DelegationWhereUniqueInputSchema),z.lazy(() => DelegationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DelegationWhereUniqueInputSchema),z.lazy(() => DelegationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DelegationWhereUniqueInputSchema),z.lazy(() => DelegationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DelegationUpdateWithWhereUniqueWithoutUser_delegation_createdByTouserInputSchema),z.lazy(() => DelegationUpdateWithWhereUniqueWithoutUser_delegation_createdByTouserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DelegationUpdateManyWithWhereWithoutUser_delegation_createdByTouserInputSchema),z.lazy(() => DelegationUpdateManyWithWhereWithoutUser_delegation_createdByTouserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DelegationScalarWhereInputSchema),z.lazy(() => DelegationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DelegationUpdateManyWithoutUser_delegation_delegatedToTouserNestedInputSchema: z.ZodType<Prisma.DelegationUpdateManyWithoutUser_delegation_delegatedToTouserNestedInput> = z.object({
  create: z.union([ z.lazy(() => DelegationCreateWithoutUser_delegation_delegatedToTouserInputSchema),z.lazy(() => DelegationCreateWithoutUser_delegation_delegatedToTouserInputSchema).array(),z.lazy(() => DelegationUncheckedCreateWithoutUser_delegation_delegatedToTouserInputSchema),z.lazy(() => DelegationUncheckedCreateWithoutUser_delegation_delegatedToTouserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DelegationCreateOrConnectWithoutUser_delegation_delegatedToTouserInputSchema),z.lazy(() => DelegationCreateOrConnectWithoutUser_delegation_delegatedToTouserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DelegationUpsertWithWhereUniqueWithoutUser_delegation_delegatedToTouserInputSchema),z.lazy(() => DelegationUpsertWithWhereUniqueWithoutUser_delegation_delegatedToTouserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DelegationCreateManyUser_delegation_delegatedToTouserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DelegationWhereUniqueInputSchema),z.lazy(() => DelegationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DelegationWhereUniqueInputSchema),z.lazy(() => DelegationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DelegationWhereUniqueInputSchema),z.lazy(() => DelegationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DelegationWhereUniqueInputSchema),z.lazy(() => DelegationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DelegationUpdateWithWhereUniqueWithoutUser_delegation_delegatedToTouserInputSchema),z.lazy(() => DelegationUpdateWithWhereUniqueWithoutUser_delegation_delegatedToTouserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DelegationUpdateManyWithWhereWithoutUser_delegation_delegatedToTouserInputSchema),z.lazy(() => DelegationUpdateManyWithWhereWithoutUser_delegation_delegatedToTouserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DelegationScalarWhereInputSchema),z.lazy(() => DelegationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReportUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ReportUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutUserInputSchema),z.lazy(() => ReportCreateWithoutUserInputSchema).array(),z.lazy(() => ReportUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReportUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReportCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReportUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReportUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReportUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReportUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReportUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ReportUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReportScalarWhereInputSchema),z.lazy(() => ReportScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UdapUpdateOneRequiredWithoutUserNestedInputSchema: z.ZodType<Prisma.UdapUpdateOneRequiredWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UdapCreateWithoutUserInputSchema),z.lazy(() => UdapUncheckedCreateWithoutUserInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UdapCreateOrConnectWithoutUserInputSchema).optional(),
  upsert: z.lazy(() => UdapUpsertWithoutUserInputSchema).optional(),
  connect: z.lazy(() => UdapWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UdapUpdateWithoutUserInputSchema),z.lazy(() => UdapUncheckedUpdateWithoutUserInputSchema) ]).optional(),
}).strict();

export const DelegationUncheckedUpdateManyWithoutUser_delegation_createdByTouserNestedInputSchema: z.ZodType<Prisma.DelegationUncheckedUpdateManyWithoutUser_delegation_createdByTouserNestedInput> = z.object({
  create: z.union([ z.lazy(() => DelegationCreateWithoutUser_delegation_createdByTouserInputSchema),z.lazy(() => DelegationCreateWithoutUser_delegation_createdByTouserInputSchema).array(),z.lazy(() => DelegationUncheckedCreateWithoutUser_delegation_createdByTouserInputSchema),z.lazy(() => DelegationUncheckedCreateWithoutUser_delegation_createdByTouserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DelegationCreateOrConnectWithoutUser_delegation_createdByTouserInputSchema),z.lazy(() => DelegationCreateOrConnectWithoutUser_delegation_createdByTouserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DelegationUpsertWithWhereUniqueWithoutUser_delegation_createdByTouserInputSchema),z.lazy(() => DelegationUpsertWithWhereUniqueWithoutUser_delegation_createdByTouserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DelegationCreateManyUser_delegation_createdByTouserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DelegationWhereUniqueInputSchema),z.lazy(() => DelegationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DelegationWhereUniqueInputSchema),z.lazy(() => DelegationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DelegationWhereUniqueInputSchema),z.lazy(() => DelegationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DelegationWhereUniqueInputSchema),z.lazy(() => DelegationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DelegationUpdateWithWhereUniqueWithoutUser_delegation_createdByTouserInputSchema),z.lazy(() => DelegationUpdateWithWhereUniqueWithoutUser_delegation_createdByTouserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DelegationUpdateManyWithWhereWithoutUser_delegation_createdByTouserInputSchema),z.lazy(() => DelegationUpdateManyWithWhereWithoutUser_delegation_createdByTouserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DelegationScalarWhereInputSchema),z.lazy(() => DelegationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const DelegationUncheckedUpdateManyWithoutUser_delegation_delegatedToTouserNestedInputSchema: z.ZodType<Prisma.DelegationUncheckedUpdateManyWithoutUser_delegation_delegatedToTouserNestedInput> = z.object({
  create: z.union([ z.lazy(() => DelegationCreateWithoutUser_delegation_delegatedToTouserInputSchema),z.lazy(() => DelegationCreateWithoutUser_delegation_delegatedToTouserInputSchema).array(),z.lazy(() => DelegationUncheckedCreateWithoutUser_delegation_delegatedToTouserInputSchema),z.lazy(() => DelegationUncheckedCreateWithoutUser_delegation_delegatedToTouserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => DelegationCreateOrConnectWithoutUser_delegation_delegatedToTouserInputSchema),z.lazy(() => DelegationCreateOrConnectWithoutUser_delegation_delegatedToTouserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => DelegationUpsertWithWhereUniqueWithoutUser_delegation_delegatedToTouserInputSchema),z.lazy(() => DelegationUpsertWithWhereUniqueWithoutUser_delegation_delegatedToTouserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => DelegationCreateManyUser_delegation_delegatedToTouserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => DelegationWhereUniqueInputSchema),z.lazy(() => DelegationWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => DelegationWhereUniqueInputSchema),z.lazy(() => DelegationWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => DelegationWhereUniqueInputSchema),z.lazy(() => DelegationWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => DelegationWhereUniqueInputSchema),z.lazy(() => DelegationWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => DelegationUpdateWithWhereUniqueWithoutUser_delegation_delegatedToTouserInputSchema),z.lazy(() => DelegationUpdateWithWhereUniqueWithoutUser_delegation_delegatedToTouserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => DelegationUpdateManyWithWhereWithoutUser_delegation_delegatedToTouserInputSchema),z.lazy(() => DelegationUpdateManyWithWhereWithoutUser_delegation_delegatedToTouserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => DelegationScalarWhereInputSchema),z.lazy(() => DelegationScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReportUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutUserInputSchema),z.lazy(() => ReportCreateWithoutUserInputSchema).array(),z.lazy(() => ReportUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReportUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReportCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReportUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReportUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReportUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ReportUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReportUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ReportUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReportScalarWhereInputSchema),z.lazy(() => ReportScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
}).strict();

export const Report_to_clauseCreateWithoutClauseInputSchema: z.ZodType<Prisma.Report_to_clauseCreateWithoutClauseInput> = z.object({
  id: z.string(),
  report: z.lazy(() => ReportCreateNestedOneWithoutReport_to_clauseInputSchema)
}).strict();

export const Report_to_clauseUncheckedCreateWithoutClauseInputSchema: z.ZodType<Prisma.Report_to_clauseUncheckedCreateWithoutClauseInput> = z.object({
  id: z.string(),
  reportId: z.string()
}).strict();

export const Report_to_clauseCreateOrConnectWithoutClauseInputSchema: z.ZodType<Prisma.Report_to_clauseCreateOrConnectWithoutClauseInput> = z.object({
  where: z.lazy(() => Report_to_clauseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Report_to_clauseCreateWithoutClauseInputSchema),z.lazy(() => Report_to_clauseUncheckedCreateWithoutClauseInputSchema) ]),
}).strict();

export const Report_to_clauseCreateManyClauseInputEnvelopeSchema: z.ZodType<Prisma.Report_to_clauseCreateManyClauseInputEnvelope> = z.object({
  data: z.lazy(() => Report_to_clauseCreateManyClauseInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const Report_to_clauseUpsertWithWhereUniqueWithoutClauseInputSchema: z.ZodType<Prisma.Report_to_clauseUpsertWithWhereUniqueWithoutClauseInput> = z.object({
  where: z.lazy(() => Report_to_clauseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Report_to_clauseUpdateWithoutClauseInputSchema),z.lazy(() => Report_to_clauseUncheckedUpdateWithoutClauseInputSchema) ]),
  create: z.union([ z.lazy(() => Report_to_clauseCreateWithoutClauseInputSchema),z.lazy(() => Report_to_clauseUncheckedCreateWithoutClauseInputSchema) ]),
}).strict();

export const Report_to_clauseUpdateWithWhereUniqueWithoutClauseInputSchema: z.ZodType<Prisma.Report_to_clauseUpdateWithWhereUniqueWithoutClauseInput> = z.object({
  where: z.lazy(() => Report_to_clauseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Report_to_clauseUpdateWithoutClauseInputSchema),z.lazy(() => Report_to_clauseUncheckedUpdateWithoutClauseInputSchema) ]),
}).strict();

export const Report_to_clauseUpdateManyWithWhereWithoutClauseInputSchema: z.ZodType<Prisma.Report_to_clauseUpdateManyWithWhereWithoutClauseInput> = z.object({
  where: z.lazy(() => Report_to_clauseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Report_to_clauseUpdateManyMutationInputSchema),z.lazy(() => Report_to_clauseUncheckedUpdateManyWithoutReport_to_clauseInputSchema) ]),
}).strict();

export const Report_to_clauseScalarWhereInputSchema: z.ZodType<Prisma.Report_to_clauseScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Report_to_clauseScalarWhereInputSchema),z.lazy(() => Report_to_clauseScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Report_to_clauseScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Report_to_clauseScalarWhereInputSchema),z.lazy(() => Report_to_clauseScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reportId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  clauseId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateWithoutDelegation_delegation_createdByTouserInputSchema: z.ZodType<Prisma.UserCreateWithoutDelegation_delegation_createdByTouserInput> = z.object({
  id: z.string(),
  name: z.string(),
  delegation_delegation_delegatedToTouser: z.lazy(() => DelegationCreateNestedManyWithoutUser_delegation_delegatedToTouserInputSchema).optional(),
  report: z.lazy(() => ReportCreateNestedManyWithoutUserInputSchema).optional(),
  udap: z.lazy(() => UdapCreateNestedOneWithoutUserInputSchema)
}).strict();

export const UserUncheckedCreateWithoutDelegation_delegation_createdByTouserInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutDelegation_delegation_createdByTouserInput> = z.object({
  id: z.string(),
  name: z.string(),
  udap_id: z.string(),
  delegation_delegation_delegatedToTouser: z.lazy(() => DelegationUncheckedCreateNestedManyWithoutUser_delegation_delegatedToTouserInputSchema).optional(),
  report: z.lazy(() => ReportUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutDelegation_delegation_createdByTouserInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutDelegation_delegation_createdByTouserInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutDelegation_delegation_createdByTouserInputSchema),z.lazy(() => UserUncheckedCreateWithoutDelegation_delegation_createdByTouserInputSchema) ]),
}).strict();

export const UserCreateWithoutDelegation_delegation_delegatedToTouserInputSchema: z.ZodType<Prisma.UserCreateWithoutDelegation_delegation_delegatedToTouserInput> = z.object({
  id: z.string(),
  name: z.string(),
  delegation_delegation_createdByTouser: z.lazy(() => DelegationCreateNestedManyWithoutUser_delegation_createdByTouserInputSchema).optional(),
  report: z.lazy(() => ReportCreateNestedManyWithoutUserInputSchema).optional(),
  udap: z.lazy(() => UdapCreateNestedOneWithoutUserInputSchema)
}).strict();

export const UserUncheckedCreateWithoutDelegation_delegation_delegatedToTouserInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutDelegation_delegation_delegatedToTouserInput> = z.object({
  id: z.string(),
  name: z.string(),
  udap_id: z.string(),
  delegation_delegation_createdByTouser: z.lazy(() => DelegationUncheckedCreateNestedManyWithoutUser_delegation_createdByTouserInputSchema).optional(),
  report: z.lazy(() => ReportUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutDelegation_delegation_delegatedToTouserInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutDelegation_delegation_delegatedToTouserInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutDelegation_delegation_delegatedToTouserInputSchema),z.lazy(() => UserUncheckedCreateWithoutDelegation_delegation_delegatedToTouserInputSchema) ]),
}).strict();

export const UserUpsertWithoutDelegation_delegation_createdByTouserInputSchema: z.ZodType<Prisma.UserUpsertWithoutDelegation_delegation_createdByTouserInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutDelegation_delegation_createdByTouserInputSchema),z.lazy(() => UserUncheckedUpdateWithoutDelegation_delegation_createdByTouserInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutDelegation_delegation_createdByTouserInputSchema),z.lazy(() => UserUncheckedCreateWithoutDelegation_delegation_createdByTouserInputSchema) ]),
}).strict();

export const UserUpdateWithoutDelegation_delegation_createdByTouserInputSchema: z.ZodType<Prisma.UserUpdateWithoutDelegation_delegation_createdByTouserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  delegation_delegation_delegatedToTouser: z.lazy(() => DelegationUpdateManyWithoutUser_delegation_delegatedToTouserNestedInputSchema).optional(),
  report: z.lazy(() => ReportUpdateManyWithoutUserNestedInputSchema).optional(),
  udap: z.lazy(() => UdapUpdateOneRequiredWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutDelegation_delegation_createdByTouserInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutDelegation_delegation_createdByTouserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  udap_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  delegation_delegation_delegatedToTouser: z.lazy(() => DelegationUncheckedUpdateManyWithoutUser_delegation_delegatedToTouserNestedInputSchema).optional(),
  report: z.lazy(() => ReportUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutDelegation_delegation_delegatedToTouserInputSchema: z.ZodType<Prisma.UserUpsertWithoutDelegation_delegation_delegatedToTouserInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutDelegation_delegation_delegatedToTouserInputSchema),z.lazy(() => UserUncheckedUpdateWithoutDelegation_delegation_delegatedToTouserInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutDelegation_delegation_delegatedToTouserInputSchema),z.lazy(() => UserUncheckedCreateWithoutDelegation_delegation_delegatedToTouserInputSchema) ]),
}).strict();

export const UserUpdateWithoutDelegation_delegation_delegatedToTouserInputSchema: z.ZodType<Prisma.UserUpdateWithoutDelegation_delegation_delegatedToTouserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  delegation_delegation_createdByTouser: z.lazy(() => DelegationUpdateManyWithoutUser_delegation_createdByTouserNestedInputSchema).optional(),
  report: z.lazy(() => ReportUpdateManyWithoutUserNestedInputSchema).optional(),
  udap: z.lazy(() => UdapUpdateOneRequiredWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutDelegation_delegation_delegatedToTouserInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutDelegation_delegation_delegatedToTouserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  udap_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  delegation_delegation_createdByTouser: z.lazy(() => DelegationUncheckedUpdateManyWithoutUser_delegation_createdByTouserNestedInputSchema).optional(),
  report: z.lazy(() => ReportUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutReportInputSchema: z.ZodType<Prisma.UserCreateWithoutReportInput> = z.object({
  id: z.string(),
  name: z.string(),
  delegation_delegation_createdByTouser: z.lazy(() => DelegationCreateNestedManyWithoutUser_delegation_createdByTouserInputSchema).optional(),
  delegation_delegation_delegatedToTouser: z.lazy(() => DelegationCreateNestedManyWithoutUser_delegation_delegatedToTouserInputSchema).optional(),
  udap: z.lazy(() => UdapCreateNestedOneWithoutUserInputSchema)
}).strict();

export const UserUncheckedCreateWithoutReportInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutReportInput> = z.object({
  id: z.string(),
  name: z.string(),
  udap_id: z.string(),
  delegation_delegation_createdByTouser: z.lazy(() => DelegationUncheckedCreateNestedManyWithoutUser_delegation_createdByTouserInputSchema).optional(),
  delegation_delegation_delegatedToTouser: z.lazy(() => DelegationUncheckedCreateNestedManyWithoutUser_delegation_delegatedToTouserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutReportInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutReportInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutReportInputSchema),z.lazy(() => UserUncheckedCreateWithoutReportInputSchema) ]),
}).strict();

export const Report_to_clauseCreateWithoutReportInputSchema: z.ZodType<Prisma.Report_to_clauseCreateWithoutReportInput> = z.object({
  id: z.string(),
  clause: z.lazy(() => ClauseCreateNestedOneWithoutReport_to_clauseInputSchema)
}).strict();

export const Report_to_clauseUncheckedCreateWithoutReportInputSchema: z.ZodType<Prisma.Report_to_clauseUncheckedCreateWithoutReportInput> = z.object({
  id: z.string(),
  clauseId: z.string()
}).strict();

export const Report_to_clauseCreateOrConnectWithoutReportInputSchema: z.ZodType<Prisma.Report_to_clauseCreateOrConnectWithoutReportInput> = z.object({
  where: z.lazy(() => Report_to_clauseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Report_to_clauseCreateWithoutReportInputSchema),z.lazy(() => Report_to_clauseUncheckedCreateWithoutReportInputSchema) ]),
}).strict();

export const Report_to_clauseCreateManyReportInputEnvelopeSchema: z.ZodType<Prisma.Report_to_clauseCreateManyReportInputEnvelope> = z.object({
  data: z.lazy(() => Report_to_clauseCreateManyReportInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutReportInputSchema: z.ZodType<Prisma.UserUpsertWithoutReportInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutReportInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReportInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutReportInputSchema),z.lazy(() => UserUncheckedCreateWithoutReportInputSchema) ]),
}).strict();

export const UserUpdateWithoutReportInputSchema: z.ZodType<Prisma.UserUpdateWithoutReportInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  delegation_delegation_createdByTouser: z.lazy(() => DelegationUpdateManyWithoutUser_delegation_createdByTouserNestedInputSchema).optional(),
  delegation_delegation_delegatedToTouser: z.lazy(() => DelegationUpdateManyWithoutUser_delegation_delegatedToTouserNestedInputSchema).optional(),
  udap: z.lazy(() => UdapUpdateOneRequiredWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutReportInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutReportInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  udap_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  delegation_delegation_createdByTouser: z.lazy(() => DelegationUncheckedUpdateManyWithoutUser_delegation_createdByTouserNestedInputSchema).optional(),
  delegation_delegation_delegatedToTouser: z.lazy(() => DelegationUncheckedUpdateManyWithoutUser_delegation_delegatedToTouserNestedInputSchema).optional()
}).strict();

export const Report_to_clauseUpsertWithWhereUniqueWithoutReportInputSchema: z.ZodType<Prisma.Report_to_clauseUpsertWithWhereUniqueWithoutReportInput> = z.object({
  where: z.lazy(() => Report_to_clauseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Report_to_clauseUpdateWithoutReportInputSchema),z.lazy(() => Report_to_clauseUncheckedUpdateWithoutReportInputSchema) ]),
  create: z.union([ z.lazy(() => Report_to_clauseCreateWithoutReportInputSchema),z.lazy(() => Report_to_clauseUncheckedCreateWithoutReportInputSchema) ]),
}).strict();

export const Report_to_clauseUpdateWithWhereUniqueWithoutReportInputSchema: z.ZodType<Prisma.Report_to_clauseUpdateWithWhereUniqueWithoutReportInput> = z.object({
  where: z.lazy(() => Report_to_clauseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Report_to_clauseUpdateWithoutReportInputSchema),z.lazy(() => Report_to_clauseUncheckedUpdateWithoutReportInputSchema) ]),
}).strict();

export const Report_to_clauseUpdateManyWithWhereWithoutReportInputSchema: z.ZodType<Prisma.Report_to_clauseUpdateManyWithWhereWithoutReportInput> = z.object({
  where: z.lazy(() => Report_to_clauseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Report_to_clauseUpdateManyMutationInputSchema),z.lazy(() => Report_to_clauseUncheckedUpdateManyWithoutReport_to_clauseInputSchema) ]),
}).strict();

export const ClauseCreateWithoutReport_to_clauseInputSchema: z.ZodType<Prisma.ClauseCreateWithoutReport_to_clauseInput> = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string()
}).strict();

export const ClauseUncheckedCreateWithoutReport_to_clauseInputSchema: z.ZodType<Prisma.ClauseUncheckedCreateWithoutReport_to_clauseInput> = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string()
}).strict();

export const ClauseCreateOrConnectWithoutReport_to_clauseInputSchema: z.ZodType<Prisma.ClauseCreateOrConnectWithoutReport_to_clauseInput> = z.object({
  where: z.lazy(() => ClauseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ClauseCreateWithoutReport_to_clauseInputSchema),z.lazy(() => ClauseUncheckedCreateWithoutReport_to_clauseInputSchema) ]),
}).strict();

export const ReportCreateWithoutReport_to_clauseInputSchema: z.ZodType<Prisma.ReportCreateWithoutReport_to_clauseInput> = z.object({
  id: z.string(),
  title: z.string().optional().nullable(),
  projectDescription: z.string().optional().nullable(),
  redactedBy: z.string().optional().nullable(),
  meetDate: z.coerce.date().optional().nullable(),
  applicantName: z.string().optional().nullable(),
  applicantAddress: z.string().optional().nullable(),
  projectCadastralRef: z.string().optional().nullable(),
  projectSpaceType: z.string().optional().nullable(),
  decision: z.string().optional().nullable(),
  precisions: z.string().optional().nullable(),
  contacts: z.string().optional().nullable(),
  furtherInformation: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  serviceInstructeur: z.number().optional().nullable(),
  pdf: z.string().optional().nullable(),
  disabled: z.boolean().optional().nullable(),
  udap_id: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutReportInputSchema)
}).strict();

export const ReportUncheckedCreateWithoutReport_to_clauseInputSchema: z.ZodType<Prisma.ReportUncheckedCreateWithoutReport_to_clauseInput> = z.object({
  id: z.string(),
  title: z.string().optional().nullable(),
  projectDescription: z.string().optional().nullable(),
  redactedBy: z.string().optional().nullable(),
  meetDate: z.coerce.date().optional().nullable(),
  applicantName: z.string().optional().nullable(),
  applicantAddress: z.string().optional().nullable(),
  projectCadastralRef: z.string().optional().nullable(),
  projectSpaceType: z.string().optional().nullable(),
  decision: z.string().optional().nullable(),
  precisions: z.string().optional().nullable(),
  contacts: z.string().optional().nullable(),
  furtherInformation: z.string().optional().nullable(),
  createdBy: z.string(),
  createdAt: z.coerce.date(),
  serviceInstructeur: z.number().optional().nullable(),
  pdf: z.string().optional().nullable(),
  disabled: z.boolean().optional().nullable(),
  udap_id: z.string().optional().nullable()
}).strict();

export const ReportCreateOrConnectWithoutReport_to_clauseInputSchema: z.ZodType<Prisma.ReportCreateOrConnectWithoutReport_to_clauseInput> = z.object({
  where: z.lazy(() => ReportWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReportCreateWithoutReport_to_clauseInputSchema),z.lazy(() => ReportUncheckedCreateWithoutReport_to_clauseInputSchema) ]),
}).strict();

export const ClauseUpsertWithoutReport_to_clauseInputSchema: z.ZodType<Prisma.ClauseUpsertWithoutReport_to_clauseInput> = z.object({
  update: z.union([ z.lazy(() => ClauseUpdateWithoutReport_to_clauseInputSchema),z.lazy(() => ClauseUncheckedUpdateWithoutReport_to_clauseInputSchema) ]),
  create: z.union([ z.lazy(() => ClauseCreateWithoutReport_to_clauseInputSchema),z.lazy(() => ClauseUncheckedCreateWithoutReport_to_clauseInputSchema) ]),
}).strict();

export const ClauseUpdateWithoutReport_to_clauseInputSchema: z.ZodType<Prisma.ClauseUpdateWithoutReport_to_clauseInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ClauseUncheckedUpdateWithoutReport_to_clauseInputSchema: z.ZodType<Prisma.ClauseUncheckedUpdateWithoutReport_to_clauseInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportUpsertWithoutReport_to_clauseInputSchema: z.ZodType<Prisma.ReportUpsertWithoutReport_to_clauseInput> = z.object({
  update: z.union([ z.lazy(() => ReportUpdateWithoutReport_to_clauseInputSchema),z.lazy(() => ReportUncheckedUpdateWithoutReport_to_clauseInputSchema) ]),
  create: z.union([ z.lazy(() => ReportCreateWithoutReport_to_clauseInputSchema),z.lazy(() => ReportUncheckedCreateWithoutReport_to_clauseInputSchema) ]),
}).strict();

export const ReportUpdateWithoutReport_to_clauseInputSchema: z.ZodType<Prisma.ReportUpdateWithoutReport_to_clauseInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  redactedBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meetDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  applicantName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  applicantAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectCadastralRef: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectSpaceType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  decision: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  precisions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contacts: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  furtherInformation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  serviceInstructeur: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pdf: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  disabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  udap_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutReportNestedInputSchema).optional()
}).strict();

export const ReportUncheckedUpdateWithoutReport_to_clauseInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateWithoutReport_to_clauseInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  redactedBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meetDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  applicantName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  applicantAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectCadastralRef: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectSpaceType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  decision: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  precisions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contacts: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  furtherInformation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  serviceInstructeur: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pdf: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  disabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  udap_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserCreateWithoutUdapInputSchema: z.ZodType<Prisma.UserCreateWithoutUdapInput> = z.object({
  id: z.string(),
  name: z.string(),
  delegation_delegation_createdByTouser: z.lazy(() => DelegationCreateNestedManyWithoutUser_delegation_createdByTouserInputSchema).optional(),
  delegation_delegation_delegatedToTouser: z.lazy(() => DelegationCreateNestedManyWithoutUser_delegation_delegatedToTouserInputSchema).optional(),
  report: z.lazy(() => ReportCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutUdapInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutUdapInput> = z.object({
  id: z.string(),
  name: z.string(),
  delegation_delegation_createdByTouser: z.lazy(() => DelegationUncheckedCreateNestedManyWithoutUser_delegation_createdByTouserInputSchema).optional(),
  delegation_delegation_delegatedToTouser: z.lazy(() => DelegationUncheckedCreateNestedManyWithoutUser_delegation_delegatedToTouserInputSchema).optional(),
  report: z.lazy(() => ReportUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutUdapInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutUdapInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutUdapInputSchema),z.lazy(() => UserUncheckedCreateWithoutUdapInputSchema) ]),
}).strict();

export const UserCreateManyUdapInputEnvelopeSchema: z.ZodType<Prisma.UserCreateManyUdapInputEnvelope> = z.object({
  data: z.lazy(() => UserCreateManyUdapInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithWhereUniqueWithoutUdapInputSchema: z.ZodType<Prisma.UserUpsertWithWhereUniqueWithoutUdapInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserUpdateWithoutUdapInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUdapInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutUdapInputSchema),z.lazy(() => UserUncheckedCreateWithoutUdapInputSchema) ]),
}).strict();

export const UserUpdateWithWhereUniqueWithoutUdapInputSchema: z.ZodType<Prisma.UserUpdateWithWhereUniqueWithoutUdapInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserUpdateWithoutUdapInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUdapInputSchema) ]),
}).strict();

export const UserUpdateManyWithWhereWithoutUdapInputSchema: z.ZodType<Prisma.UserUpdateManyWithWhereWithoutUdapInput> = z.object({
  where: z.lazy(() => UserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserUpdateManyMutationInputSchema),z.lazy(() => UserUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const UserScalarWhereInputSchema: z.ZodType<Prisma.UserScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereInputSchema),z.lazy(() => UserScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  udap_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const DelegationCreateWithoutUser_delegation_createdByTouserInputSchema: z.ZodType<Prisma.DelegationCreateWithoutUser_delegation_createdByTouserInput> = z.object({
  user_delegation_delegatedToTouser: z.lazy(() => UserCreateNestedOneWithoutDelegation_delegation_delegatedToTouserInputSchema)
}).strict();

export const DelegationUncheckedCreateWithoutUser_delegation_createdByTouserInputSchema: z.ZodType<Prisma.DelegationUncheckedCreateWithoutUser_delegation_createdByTouserInput> = z.object({
  delegatedTo: z.string()
}).strict();

export const DelegationCreateOrConnectWithoutUser_delegation_createdByTouserInputSchema: z.ZodType<Prisma.DelegationCreateOrConnectWithoutUser_delegation_createdByTouserInput> = z.object({
  where: z.lazy(() => DelegationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DelegationCreateWithoutUser_delegation_createdByTouserInputSchema),z.lazy(() => DelegationUncheckedCreateWithoutUser_delegation_createdByTouserInputSchema) ]),
}).strict();

export const DelegationCreateManyUser_delegation_createdByTouserInputEnvelopeSchema: z.ZodType<Prisma.DelegationCreateManyUser_delegation_createdByTouserInputEnvelope> = z.object({
  data: z.lazy(() => DelegationCreateManyUser_delegation_createdByTouserInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const DelegationCreateWithoutUser_delegation_delegatedToTouserInputSchema: z.ZodType<Prisma.DelegationCreateWithoutUser_delegation_delegatedToTouserInput> = z.object({
  user_delegation_createdByTouser: z.lazy(() => UserCreateNestedOneWithoutDelegation_delegation_createdByTouserInputSchema)
}).strict();

export const DelegationUncheckedCreateWithoutUser_delegation_delegatedToTouserInputSchema: z.ZodType<Prisma.DelegationUncheckedCreateWithoutUser_delegation_delegatedToTouserInput> = z.object({
  createdBy: z.string()
}).strict();

export const DelegationCreateOrConnectWithoutUser_delegation_delegatedToTouserInputSchema: z.ZodType<Prisma.DelegationCreateOrConnectWithoutUser_delegation_delegatedToTouserInput> = z.object({
  where: z.lazy(() => DelegationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => DelegationCreateWithoutUser_delegation_delegatedToTouserInputSchema),z.lazy(() => DelegationUncheckedCreateWithoutUser_delegation_delegatedToTouserInputSchema) ]),
}).strict();

export const DelegationCreateManyUser_delegation_delegatedToTouserInputEnvelopeSchema: z.ZodType<Prisma.DelegationCreateManyUser_delegation_delegatedToTouserInputEnvelope> = z.object({
  data: z.lazy(() => DelegationCreateManyUser_delegation_delegatedToTouserInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ReportCreateWithoutUserInputSchema: z.ZodType<Prisma.ReportCreateWithoutUserInput> = z.object({
  id: z.string(),
  title: z.string().optional().nullable(),
  projectDescription: z.string().optional().nullable(),
  redactedBy: z.string().optional().nullable(),
  meetDate: z.coerce.date().optional().nullable(),
  applicantName: z.string().optional().nullable(),
  applicantAddress: z.string().optional().nullable(),
  projectCadastralRef: z.string().optional().nullable(),
  projectSpaceType: z.string().optional().nullable(),
  decision: z.string().optional().nullable(),
  precisions: z.string().optional().nullable(),
  contacts: z.string().optional().nullable(),
  furtherInformation: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  serviceInstructeur: z.number().optional().nullable(),
  pdf: z.string().optional().nullable(),
  disabled: z.boolean().optional().nullable(),
  udap_id: z.string().optional().nullable(),
  report_to_clause: z.lazy(() => Report_to_clauseCreateNestedManyWithoutReportInputSchema).optional()
}).strict();

export const ReportUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ReportUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  title: z.string().optional().nullable(),
  projectDescription: z.string().optional().nullable(),
  redactedBy: z.string().optional().nullable(),
  meetDate: z.coerce.date().optional().nullable(),
  applicantName: z.string().optional().nullable(),
  applicantAddress: z.string().optional().nullable(),
  projectCadastralRef: z.string().optional().nullable(),
  projectSpaceType: z.string().optional().nullable(),
  decision: z.string().optional().nullable(),
  precisions: z.string().optional().nullable(),
  contacts: z.string().optional().nullable(),
  furtherInformation: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  serviceInstructeur: z.number().optional().nullable(),
  pdf: z.string().optional().nullable(),
  disabled: z.boolean().optional().nullable(),
  udap_id: z.string().optional().nullable(),
  report_to_clause: z.lazy(() => Report_to_clauseUncheckedCreateNestedManyWithoutReportInputSchema).optional()
}).strict();

export const ReportCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ReportCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ReportWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReportCreateWithoutUserInputSchema),z.lazy(() => ReportUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ReportCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ReportCreateManyUserInputEnvelope> = z.object({
  data: z.lazy(() => ReportCreateManyUserInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UdapCreateWithoutUserInputSchema: z.ZodType<Prisma.UdapCreateWithoutUserInput> = z.object({
  id: z.string(),
  department: z.string(),
  completeCoords: z.string().optional().nullable(),
  visible: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable()
}).strict();

export const UdapUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UdapUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  department: z.string(),
  completeCoords: z.string().optional().nullable(),
  visible: z.boolean().optional().nullable(),
  name: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable()
}).strict();

export const UdapCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UdapCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UdapWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UdapCreateWithoutUserInputSchema),z.lazy(() => UdapUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const DelegationUpsertWithWhereUniqueWithoutUser_delegation_createdByTouserInputSchema: z.ZodType<Prisma.DelegationUpsertWithWhereUniqueWithoutUser_delegation_createdByTouserInput> = z.object({
  where: z.lazy(() => DelegationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DelegationUpdateWithoutUser_delegation_createdByTouserInputSchema),z.lazy(() => DelegationUncheckedUpdateWithoutUser_delegation_createdByTouserInputSchema) ]),
  create: z.union([ z.lazy(() => DelegationCreateWithoutUser_delegation_createdByTouserInputSchema),z.lazy(() => DelegationUncheckedCreateWithoutUser_delegation_createdByTouserInputSchema) ]),
}).strict();

export const DelegationUpdateWithWhereUniqueWithoutUser_delegation_createdByTouserInputSchema: z.ZodType<Prisma.DelegationUpdateWithWhereUniqueWithoutUser_delegation_createdByTouserInput> = z.object({
  where: z.lazy(() => DelegationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DelegationUpdateWithoutUser_delegation_createdByTouserInputSchema),z.lazy(() => DelegationUncheckedUpdateWithoutUser_delegation_createdByTouserInputSchema) ]),
}).strict();

export const DelegationUpdateManyWithWhereWithoutUser_delegation_createdByTouserInputSchema: z.ZodType<Prisma.DelegationUpdateManyWithWhereWithoutUser_delegation_createdByTouserInput> = z.object({
  where: z.lazy(() => DelegationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DelegationUpdateManyMutationInputSchema),z.lazy(() => DelegationUncheckedUpdateManyWithoutDelegation_delegation_createdByTouserInputSchema) ]),
}).strict();

export const DelegationScalarWhereInputSchema: z.ZodType<Prisma.DelegationScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => DelegationScalarWhereInputSchema),z.lazy(() => DelegationScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => DelegationScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => DelegationScalarWhereInputSchema),z.lazy(() => DelegationScalarWhereInputSchema).array() ]).optional(),
  createdBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  delegatedTo: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const DelegationUpsertWithWhereUniqueWithoutUser_delegation_delegatedToTouserInputSchema: z.ZodType<Prisma.DelegationUpsertWithWhereUniqueWithoutUser_delegation_delegatedToTouserInput> = z.object({
  where: z.lazy(() => DelegationWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => DelegationUpdateWithoutUser_delegation_delegatedToTouserInputSchema),z.lazy(() => DelegationUncheckedUpdateWithoutUser_delegation_delegatedToTouserInputSchema) ]),
  create: z.union([ z.lazy(() => DelegationCreateWithoutUser_delegation_delegatedToTouserInputSchema),z.lazy(() => DelegationUncheckedCreateWithoutUser_delegation_delegatedToTouserInputSchema) ]),
}).strict();

export const DelegationUpdateWithWhereUniqueWithoutUser_delegation_delegatedToTouserInputSchema: z.ZodType<Prisma.DelegationUpdateWithWhereUniqueWithoutUser_delegation_delegatedToTouserInput> = z.object({
  where: z.lazy(() => DelegationWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => DelegationUpdateWithoutUser_delegation_delegatedToTouserInputSchema),z.lazy(() => DelegationUncheckedUpdateWithoutUser_delegation_delegatedToTouserInputSchema) ]),
}).strict();

export const DelegationUpdateManyWithWhereWithoutUser_delegation_delegatedToTouserInputSchema: z.ZodType<Prisma.DelegationUpdateManyWithWhereWithoutUser_delegation_delegatedToTouserInput> = z.object({
  where: z.lazy(() => DelegationScalarWhereInputSchema),
  data: z.union([ z.lazy(() => DelegationUpdateManyMutationInputSchema),z.lazy(() => DelegationUncheckedUpdateManyWithoutDelegation_delegation_delegatedToTouserInputSchema) ]),
}).strict();

export const ReportUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ReportUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ReportWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReportUpdateWithoutUserInputSchema),z.lazy(() => ReportUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ReportCreateWithoutUserInputSchema),z.lazy(() => ReportUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ReportUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ReportUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ReportWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReportUpdateWithoutUserInputSchema),z.lazy(() => ReportUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ReportUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ReportUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ReportScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReportUpdateManyMutationInputSchema),z.lazy(() => ReportUncheckedUpdateManyWithoutReportInputSchema) ]),
}).strict();

export const ReportScalarWhereInputSchema: z.ZodType<Prisma.ReportScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReportScalarWhereInputSchema),z.lazy(() => ReportScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportScalarWhereInputSchema),z.lazy(() => ReportScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  projectDescription: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  redactedBy: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  meetDate: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  applicantName: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  applicantAddress: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  projectCadastralRef: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  projectSpaceType: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  decision: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  precisions: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  contacts: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  furtherInformation: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  serviceInstructeur: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  pdf: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  disabled: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
  udap_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const UdapUpsertWithoutUserInputSchema: z.ZodType<Prisma.UdapUpsertWithoutUserInput> = z.object({
  update: z.union([ z.lazy(() => UdapUpdateWithoutUserInputSchema),z.lazy(() => UdapUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UdapCreateWithoutUserInputSchema),z.lazy(() => UdapUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UdapUpdateWithoutUserInputSchema: z.ZodType<Prisma.UdapUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  department: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completeCoords: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  visible: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zipCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UdapUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UdapUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  department: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  completeCoords: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  visible: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  address: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zipCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Report_to_clauseCreateManyClauseInputSchema: z.ZodType<Prisma.Report_to_clauseCreateManyClauseInput> = z.object({
  id: z.string(),
  reportId: z.string()
}).strict();

export const Report_to_clauseUpdateWithoutClauseInputSchema: z.ZodType<Prisma.Report_to_clauseUpdateWithoutClauseInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  report: z.lazy(() => ReportUpdateOneRequiredWithoutReport_to_clauseNestedInputSchema).optional()
}).strict();

export const Report_to_clauseUncheckedUpdateWithoutClauseInputSchema: z.ZodType<Prisma.Report_to_clauseUncheckedUpdateWithoutClauseInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Report_to_clauseUncheckedUpdateManyWithoutReport_to_clauseInputSchema: z.ZodType<Prisma.Report_to_clauseUncheckedUpdateManyWithoutReport_to_clauseInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Report_to_clauseCreateManyReportInputSchema: z.ZodType<Prisma.Report_to_clauseCreateManyReportInput> = z.object({
  id: z.string(),
  clauseId: z.string()
}).strict();

export const Report_to_clauseUpdateWithoutReportInputSchema: z.ZodType<Prisma.Report_to_clauseUpdateWithoutReportInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clause: z.lazy(() => ClauseUpdateOneRequiredWithoutReport_to_clauseNestedInputSchema).optional()
}).strict();

export const Report_to_clauseUncheckedUpdateWithoutReportInputSchema: z.ZodType<Prisma.Report_to_clauseUncheckedUpdateWithoutReportInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clauseId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateManyUdapInputSchema: z.ZodType<Prisma.UserCreateManyUdapInput> = z.object({
  id: z.string(),
  name: z.string()
}).strict();

export const UserUpdateWithoutUdapInputSchema: z.ZodType<Prisma.UserUpdateWithoutUdapInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  delegation_delegation_createdByTouser: z.lazy(() => DelegationUpdateManyWithoutUser_delegation_createdByTouserNestedInputSchema).optional(),
  delegation_delegation_delegatedToTouser: z.lazy(() => DelegationUpdateManyWithoutUser_delegation_delegatedToTouserNestedInputSchema).optional(),
  report: z.lazy(() => ReportUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutUdapInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutUdapInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  delegation_delegation_createdByTouser: z.lazy(() => DelegationUncheckedUpdateManyWithoutUser_delegation_createdByTouserNestedInputSchema).optional(),
  delegation_delegation_delegatedToTouser: z.lazy(() => DelegationUncheckedUpdateManyWithoutUser_delegation_delegatedToTouserNestedInputSchema).optional(),
  report: z.lazy(() => ReportUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DelegationCreateManyUser_delegation_createdByTouserInputSchema: z.ZodType<Prisma.DelegationCreateManyUser_delegation_createdByTouserInput> = z.object({
  delegatedTo: z.string()
}).strict();

export const DelegationCreateManyUser_delegation_delegatedToTouserInputSchema: z.ZodType<Prisma.DelegationCreateManyUser_delegation_delegatedToTouserInput> = z.object({
  createdBy: z.string()
}).strict();

export const ReportCreateManyUserInputSchema: z.ZodType<Prisma.ReportCreateManyUserInput> = z.object({
  id: z.string(),
  title: z.string().optional().nullable(),
  projectDescription: z.string().optional().nullable(),
  redactedBy: z.string().optional().nullable(),
  meetDate: z.coerce.date().optional().nullable(),
  applicantName: z.string().optional().nullable(),
  applicantAddress: z.string().optional().nullable(),
  projectCadastralRef: z.string().optional().nullable(),
  projectSpaceType: z.string().optional().nullable(),
  decision: z.string().optional().nullable(),
  precisions: z.string().optional().nullable(),
  contacts: z.string().optional().nullable(),
  furtherInformation: z.string().optional().nullable(),
  createdAt: z.coerce.date(),
  serviceInstructeur: z.number().int().gte(-2147483648).lte(2147483647).optional().nullable(),
  pdf: z.string().optional().nullable(),
  disabled: z.boolean().optional().nullable(),
  udap_id: z.string().optional().nullable()
}).strict();

export const DelegationUpdateWithoutUser_delegation_createdByTouserInputSchema: z.ZodType<Prisma.DelegationUpdateWithoutUser_delegation_createdByTouserInput> = z.object({
  user_delegation_delegatedToTouser: z.lazy(() => UserUpdateOneRequiredWithoutDelegation_delegation_delegatedToTouserNestedInputSchema).optional()
}).strict();

export const DelegationUncheckedUpdateWithoutUser_delegation_createdByTouserInputSchema: z.ZodType<Prisma.DelegationUncheckedUpdateWithoutUser_delegation_createdByTouserInput> = z.object({
  delegatedTo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DelegationUncheckedUpdateManyWithoutDelegation_delegation_createdByTouserInputSchema: z.ZodType<Prisma.DelegationUncheckedUpdateManyWithoutDelegation_delegation_createdByTouserInput> = z.object({
  delegatedTo: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DelegationUpdateWithoutUser_delegation_delegatedToTouserInputSchema: z.ZodType<Prisma.DelegationUpdateWithoutUser_delegation_delegatedToTouserInput> = z.object({
  user_delegation_createdByTouser: z.lazy(() => UserUpdateOneRequiredWithoutDelegation_delegation_createdByTouserNestedInputSchema).optional()
}).strict();

export const DelegationUncheckedUpdateWithoutUser_delegation_delegatedToTouserInputSchema: z.ZodType<Prisma.DelegationUncheckedUpdateWithoutUser_delegation_delegatedToTouserInput> = z.object({
  createdBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const DelegationUncheckedUpdateManyWithoutDelegation_delegation_delegatedToTouserInputSchema: z.ZodType<Prisma.DelegationUncheckedUpdateManyWithoutDelegation_delegation_delegatedToTouserInput> = z.object({
  createdBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportUpdateWithoutUserInputSchema: z.ZodType<Prisma.ReportUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  redactedBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meetDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  applicantName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  applicantAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectCadastralRef: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectSpaceType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  decision: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  precisions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contacts: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  furtherInformation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  serviceInstructeur: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pdf: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  disabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  udap_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  report_to_clause: z.lazy(() => Report_to_clauseUpdateManyWithoutReportNestedInputSchema).optional()
}).strict();

export const ReportUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  redactedBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meetDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  applicantName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  applicantAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectCadastralRef: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectSpaceType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  decision: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  precisions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contacts: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  furtherInformation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  serviceInstructeur: z.union([ z.number(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pdf: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  disabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  udap_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  report_to_clause: z.lazy(() => Report_to_clauseUncheckedUpdateManyWithoutReportNestedInputSchema).optional()
}).strict();

export const ReportUncheckedUpdateManyWithoutReportInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateManyWithoutReportInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectDescription: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  redactedBy: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  meetDate: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  applicantName: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  applicantAddress: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectCadastralRef: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectSpaceType: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  decision: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  precisions: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  contacts: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  furtherInformation: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  serviceInstructeur: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pdf: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  disabled: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  udap_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const ChipFindFirstArgsSchema: z.ZodType<Prisma.ChipFindFirstArgs> = z.object({
  select: ChipSelectSchema.optional(),
  where: ChipWhereInputSchema.optional(),
  orderBy: z.union([ ChipOrderByWithRelationInputSchema.array(),ChipOrderByWithRelationInputSchema ]).optional(),
  cursor: ChipWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ChipScalarFieldEnumSchema.array().optional(),
}).strict() 

export const ChipFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ChipFindFirstOrThrowArgs> = z.object({
  select: ChipSelectSchema.optional(),
  where: ChipWhereInputSchema.optional(),
  orderBy: z.union([ ChipOrderByWithRelationInputSchema.array(),ChipOrderByWithRelationInputSchema ]).optional(),
  cursor: ChipWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ChipScalarFieldEnumSchema.array().optional(),
}).strict() 

export const ChipFindManyArgsSchema: z.ZodType<Prisma.ChipFindManyArgs> = z.object({
  select: ChipSelectSchema.optional(),
  where: ChipWhereInputSchema.optional(),
  orderBy: z.union([ ChipOrderByWithRelationInputSchema.array(),ChipOrderByWithRelationInputSchema ]).optional(),
  cursor: ChipWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ChipScalarFieldEnumSchema.array().optional(),
}).strict() 

export const ChipAggregateArgsSchema: z.ZodType<Prisma.ChipAggregateArgs> = z.object({
  where: ChipWhereInputSchema.optional(),
  orderBy: z.union([ ChipOrderByWithRelationInputSchema.array(),ChipOrderByWithRelationInputSchema ]).optional(),
  cursor: ChipWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() 

export const ChipGroupByArgsSchema: z.ZodType<Prisma.ChipGroupByArgs> = z.object({
  where: ChipWhereInputSchema.optional(),
  orderBy: z.union([ ChipOrderByWithAggregationInputSchema.array(),ChipOrderByWithAggregationInputSchema ]).optional(),
  by: ChipScalarFieldEnumSchema.array(),
  having: ChipScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() 

export const ChipFindUniqueArgsSchema: z.ZodType<Prisma.ChipFindUniqueArgs> = z.object({
  select: ChipSelectSchema.optional(),
  where: ChipWhereUniqueInputSchema,
}).strict() 

export const ChipFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ChipFindUniqueOrThrowArgs> = z.object({
  select: ChipSelectSchema.optional(),
  where: ChipWhereUniqueInputSchema,
}).strict() 

export const ClauseFindFirstArgsSchema: z.ZodType<Prisma.ClauseFindFirstArgs> = z.object({
  select: ClauseSelectSchema.optional(),
  include: ClauseIncludeSchema.optional(),
  where: ClauseWhereInputSchema.optional(),
  orderBy: z.union([ ClauseOrderByWithRelationInputSchema.array(),ClauseOrderByWithRelationInputSchema ]).optional(),
  cursor: ClauseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ClauseScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.ClauseFindFirstArgs>

export const ClauseFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ClauseFindFirstOrThrowArgs> = z.object({
  select: ClauseSelectSchema.optional(),
  include: ClauseIncludeSchema.optional(),
  where: ClauseWhereInputSchema.optional(),
  orderBy: z.union([ ClauseOrderByWithRelationInputSchema.array(),ClauseOrderByWithRelationInputSchema ]).optional(),
  cursor: ClauseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ClauseScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.ClauseFindFirstOrThrowArgs>

export const ClauseFindManyArgsSchema: z.ZodType<Prisma.ClauseFindManyArgs> = z.object({
  select: ClauseSelectSchema.optional(),
  include: ClauseIncludeSchema.optional(),
  where: ClauseWhereInputSchema.optional(),
  orderBy: z.union([ ClauseOrderByWithRelationInputSchema.array(),ClauseOrderByWithRelationInputSchema ]).optional(),
  cursor: ClauseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ClauseScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.ClauseFindManyArgs>

export const ClauseAggregateArgsSchema: z.ZodType<Prisma.ClauseAggregateArgs> = z.object({
  where: ClauseWhereInputSchema.optional(),
  orderBy: z.union([ ClauseOrderByWithRelationInputSchema.array(),ClauseOrderByWithRelationInputSchema ]).optional(),
  cursor: ClauseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ClauseAggregateArgs>

export const ClauseGroupByArgsSchema: z.ZodType<Prisma.ClauseGroupByArgs> = z.object({
  where: ClauseWhereInputSchema.optional(),
  orderBy: z.union([ ClauseOrderByWithAggregationInputSchema.array(),ClauseOrderByWithAggregationInputSchema ]).optional(),
  by: ClauseScalarFieldEnumSchema.array(),
  having: ClauseScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ClauseGroupByArgs>

export const ClauseFindUniqueArgsSchema: z.ZodType<Prisma.ClauseFindUniqueArgs> = z.object({
  select: ClauseSelectSchema.optional(),
  include: ClauseIncludeSchema.optional(),
  where: ClauseWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ClauseFindUniqueArgs>

export const ClauseFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ClauseFindUniqueOrThrowArgs> = z.object({
  select: ClauseSelectSchema.optional(),
  include: ClauseIncludeSchema.optional(),
  where: ClauseWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ClauseFindUniqueOrThrowArgs>

export const DelegationFindFirstArgsSchema: z.ZodType<Prisma.DelegationFindFirstArgs> = z.object({
  select: DelegationSelectSchema.optional(),
  include: DelegationIncludeSchema.optional(),
  where: DelegationWhereInputSchema.optional(),
  orderBy: z.union([ DelegationOrderByWithRelationInputSchema.array(),DelegationOrderByWithRelationInputSchema ]).optional(),
  cursor: DelegationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: DelegationScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.DelegationFindFirstArgs>

export const DelegationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DelegationFindFirstOrThrowArgs> = z.object({
  select: DelegationSelectSchema.optional(),
  include: DelegationIncludeSchema.optional(),
  where: DelegationWhereInputSchema.optional(),
  orderBy: z.union([ DelegationOrderByWithRelationInputSchema.array(),DelegationOrderByWithRelationInputSchema ]).optional(),
  cursor: DelegationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: DelegationScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.DelegationFindFirstOrThrowArgs>

export const DelegationFindManyArgsSchema: z.ZodType<Prisma.DelegationFindManyArgs> = z.object({
  select: DelegationSelectSchema.optional(),
  include: DelegationIncludeSchema.optional(),
  where: DelegationWhereInputSchema.optional(),
  orderBy: z.union([ DelegationOrderByWithRelationInputSchema.array(),DelegationOrderByWithRelationInputSchema ]).optional(),
  cursor: DelegationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: DelegationScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.DelegationFindManyArgs>

export const DelegationAggregateArgsSchema: z.ZodType<Prisma.DelegationAggregateArgs> = z.object({
  where: DelegationWhereInputSchema.optional(),
  orderBy: z.union([ DelegationOrderByWithRelationInputSchema.array(),DelegationOrderByWithRelationInputSchema ]).optional(),
  cursor: DelegationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.DelegationAggregateArgs>

export const DelegationGroupByArgsSchema: z.ZodType<Prisma.DelegationGroupByArgs> = z.object({
  where: DelegationWhereInputSchema.optional(),
  orderBy: z.union([ DelegationOrderByWithAggregationInputSchema.array(),DelegationOrderByWithAggregationInputSchema ]).optional(),
  by: DelegationScalarFieldEnumSchema.array(),
  having: DelegationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.DelegationGroupByArgs>

export const DelegationFindUniqueArgsSchema: z.ZodType<Prisma.DelegationFindUniqueArgs> = z.object({
  select: DelegationSelectSchema.optional(),
  include: DelegationIncludeSchema.optional(),
  where: DelegationWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.DelegationFindUniqueArgs>

export const DelegationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DelegationFindUniqueOrThrowArgs> = z.object({
  select: DelegationSelectSchema.optional(),
  include: DelegationIncludeSchema.optional(),
  where: DelegationWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.DelegationFindUniqueOrThrowArgs>

export const ReportFindFirstArgsSchema: z.ZodType<Prisma.ReportFindFirstArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithRelationInputSchema.array(),ReportOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ReportScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.ReportFindFirstArgs>

export const ReportFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReportFindFirstOrThrowArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithRelationInputSchema.array(),ReportOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ReportScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.ReportFindFirstOrThrowArgs>

export const ReportFindManyArgsSchema: z.ZodType<Prisma.ReportFindManyArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithRelationInputSchema.array(),ReportOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ReportScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.ReportFindManyArgs>

export const ReportAggregateArgsSchema: z.ZodType<Prisma.ReportAggregateArgs> = z.object({
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithRelationInputSchema.array(),ReportOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ReportAggregateArgs>

export const ReportGroupByArgsSchema: z.ZodType<Prisma.ReportGroupByArgs> = z.object({
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithAggregationInputSchema.array(),ReportOrderByWithAggregationInputSchema ]).optional(),
  by: ReportScalarFieldEnumSchema.array(),
  having: ReportScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ReportGroupByArgs>

export const ReportFindUniqueArgsSchema: z.ZodType<Prisma.ReportFindUniqueArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  where: ReportWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ReportFindUniqueArgs>

export const ReportFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ReportFindUniqueOrThrowArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  where: ReportWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ReportFindUniqueOrThrowArgs>

export const Report_to_clauseFindFirstArgsSchema: z.ZodType<Prisma.Report_to_clauseFindFirstArgs> = z.object({
  select: Report_to_clauseSelectSchema.optional(),
  include: Report_to_clauseIncludeSchema.optional(),
  where: Report_to_clauseWhereInputSchema.optional(),
  orderBy: z.union([ Report_to_clauseOrderByWithRelationInputSchema.array(),Report_to_clauseOrderByWithRelationInputSchema ]).optional(),
  cursor: Report_to_clauseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Report_to_clauseScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.Report_to_clauseFindFirstArgs>

export const Report_to_clauseFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Report_to_clauseFindFirstOrThrowArgs> = z.object({
  select: Report_to_clauseSelectSchema.optional(),
  include: Report_to_clauseIncludeSchema.optional(),
  where: Report_to_clauseWhereInputSchema.optional(),
  orderBy: z.union([ Report_to_clauseOrderByWithRelationInputSchema.array(),Report_to_clauseOrderByWithRelationInputSchema ]).optional(),
  cursor: Report_to_clauseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Report_to_clauseScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.Report_to_clauseFindFirstOrThrowArgs>

export const Report_to_clauseFindManyArgsSchema: z.ZodType<Prisma.Report_to_clauseFindManyArgs> = z.object({
  select: Report_to_clauseSelectSchema.optional(),
  include: Report_to_clauseIncludeSchema.optional(),
  where: Report_to_clauseWhereInputSchema.optional(),
  orderBy: z.union([ Report_to_clauseOrderByWithRelationInputSchema.array(),Report_to_clauseOrderByWithRelationInputSchema ]).optional(),
  cursor: Report_to_clauseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Report_to_clauseScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.Report_to_clauseFindManyArgs>

export const Report_to_clauseAggregateArgsSchema: z.ZodType<Prisma.Report_to_clauseAggregateArgs> = z.object({
  where: Report_to_clauseWhereInputSchema.optional(),
  orderBy: z.union([ Report_to_clauseOrderByWithRelationInputSchema.array(),Report_to_clauseOrderByWithRelationInputSchema ]).optional(),
  cursor: Report_to_clauseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.Report_to_clauseAggregateArgs>

export const Report_to_clauseGroupByArgsSchema: z.ZodType<Prisma.Report_to_clauseGroupByArgs> = z.object({
  where: Report_to_clauseWhereInputSchema.optional(),
  orderBy: z.union([ Report_to_clauseOrderByWithAggregationInputSchema.array(),Report_to_clauseOrderByWithAggregationInputSchema ]).optional(),
  by: Report_to_clauseScalarFieldEnumSchema.array(),
  having: Report_to_clauseScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.Report_to_clauseGroupByArgs>

export const Report_to_clauseFindUniqueArgsSchema: z.ZodType<Prisma.Report_to_clauseFindUniqueArgs> = z.object({
  select: Report_to_clauseSelectSchema.optional(),
  include: Report_to_clauseIncludeSchema.optional(),
  where: Report_to_clauseWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.Report_to_clauseFindUniqueArgs>

export const Report_to_clauseFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Report_to_clauseFindUniqueOrThrowArgs> = z.object({
  select: Report_to_clauseSelectSchema.optional(),
  include: Report_to_clauseIncludeSchema.optional(),
  where: Report_to_clauseWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.Report_to_clauseFindUniqueOrThrowArgs>

export const UdapFindFirstArgsSchema: z.ZodType<Prisma.UdapFindFirstArgs> = z.object({
  select: UdapSelectSchema.optional(),
  include: UdapIncludeSchema.optional(),
  where: UdapWhereInputSchema.optional(),
  orderBy: z.union([ UdapOrderByWithRelationInputSchema.array(),UdapOrderByWithRelationInputSchema ]).optional(),
  cursor: UdapWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UdapScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.UdapFindFirstArgs>

export const UdapFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UdapFindFirstOrThrowArgs> = z.object({
  select: UdapSelectSchema.optional(),
  include: UdapIncludeSchema.optional(),
  where: UdapWhereInputSchema.optional(),
  orderBy: z.union([ UdapOrderByWithRelationInputSchema.array(),UdapOrderByWithRelationInputSchema ]).optional(),
  cursor: UdapWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UdapScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.UdapFindFirstOrThrowArgs>

export const UdapFindManyArgsSchema: z.ZodType<Prisma.UdapFindManyArgs> = z.object({
  select: UdapSelectSchema.optional(),
  include: UdapIncludeSchema.optional(),
  where: UdapWhereInputSchema.optional(),
  orderBy: z.union([ UdapOrderByWithRelationInputSchema.array(),UdapOrderByWithRelationInputSchema ]).optional(),
  cursor: UdapWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UdapScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.UdapFindManyArgs>

export const UdapAggregateArgsSchema: z.ZodType<Prisma.UdapAggregateArgs> = z.object({
  where: UdapWhereInputSchema.optional(),
  orderBy: z.union([ UdapOrderByWithRelationInputSchema.array(),UdapOrderByWithRelationInputSchema ]).optional(),
  cursor: UdapWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.UdapAggregateArgs>

export const UdapGroupByArgsSchema: z.ZodType<Prisma.UdapGroupByArgs> = z.object({
  where: UdapWhereInputSchema.optional(),
  orderBy: z.union([ UdapOrderByWithAggregationInputSchema.array(),UdapOrderByWithAggregationInputSchema ]).optional(),
  by: UdapScalarFieldEnumSchema.array(),
  having: UdapScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.UdapGroupByArgs>

export const UdapFindUniqueArgsSchema: z.ZodType<Prisma.UdapFindUniqueArgs> = z.object({
  select: UdapSelectSchema.optional(),
  include: UdapIncludeSchema.optional(),
  where: UdapWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UdapFindUniqueArgs>

export const UdapFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UdapFindUniqueOrThrowArgs> = z.object({
  select: UdapSelectSchema.optional(),
  include: UdapIncludeSchema.optional(),
  where: UdapWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UdapFindUniqueOrThrowArgs>

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.UserFindFirstArgs>

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.UserFindFirstOrThrowArgs>

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.UserFindManyArgs>

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.UserAggregateArgs>

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.UserGroupByArgs>

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UserFindUniqueArgs>

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UserFindUniqueOrThrowArgs>

export const ChipCreateArgsSchema: z.ZodType<Prisma.ChipCreateArgs> = z.object({
  select: ChipSelectSchema.optional(),
  data: z.union([ ChipCreateInputSchema,ChipUncheckedCreateInputSchema ]),
}).strict() 

export const ChipUpsertArgsSchema: z.ZodType<Prisma.ChipUpsertArgs> = z.object({
  select: ChipSelectSchema.optional(),
  where: ChipWhereUniqueInputSchema,
  create: z.union([ ChipCreateInputSchema,ChipUncheckedCreateInputSchema ]),
  update: z.union([ ChipUpdateInputSchema,ChipUncheckedUpdateInputSchema ]),
}).strict() 

export const ChipCreateManyArgsSchema: z.ZodType<Prisma.ChipCreateManyArgs> = z.object({
  data: ChipCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() 

export const ChipDeleteArgsSchema: z.ZodType<Prisma.ChipDeleteArgs> = z.object({
  select: ChipSelectSchema.optional(),
  where: ChipWhereUniqueInputSchema,
}).strict() 

export const ChipUpdateArgsSchema: z.ZodType<Prisma.ChipUpdateArgs> = z.object({
  select: ChipSelectSchema.optional(),
  data: z.union([ ChipUpdateInputSchema,ChipUncheckedUpdateInputSchema ]),
  where: ChipWhereUniqueInputSchema,
}).strict() 

export const ChipUpdateManyArgsSchema: z.ZodType<Prisma.ChipUpdateManyArgs> = z.object({
  data: z.union([ ChipUpdateManyMutationInputSchema,ChipUncheckedUpdateManyInputSchema ]),
  where: ChipWhereInputSchema.optional(),
}).strict() 

export const ChipDeleteManyArgsSchema: z.ZodType<Prisma.ChipDeleteManyArgs> = z.object({
  where: ChipWhereInputSchema.optional(),
}).strict() 

export const ClauseCreateArgsSchema: z.ZodType<Prisma.ClauseCreateArgs> = z.object({
  select: ClauseSelectSchema.optional(),
  include: ClauseIncludeSchema.optional(),
  data: z.union([ ClauseCreateInputSchema,ClauseUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.ClauseCreateArgs>

export const ClauseUpsertArgsSchema: z.ZodType<Prisma.ClauseUpsertArgs> = z.object({
  select: ClauseSelectSchema.optional(),
  include: ClauseIncludeSchema.optional(),
  where: ClauseWhereUniqueInputSchema,
  create: z.union([ ClauseCreateInputSchema,ClauseUncheckedCreateInputSchema ]),
  update: z.union([ ClauseUpdateInputSchema,ClauseUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.ClauseUpsertArgs>

export const ClauseCreateManyArgsSchema: z.ZodType<Prisma.ClauseCreateManyArgs> = z.object({
  data: ClauseCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.ClauseCreateManyArgs>

export const ClauseDeleteArgsSchema: z.ZodType<Prisma.ClauseDeleteArgs> = z.object({
  select: ClauseSelectSchema.optional(),
  include: ClauseIncludeSchema.optional(),
  where: ClauseWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ClauseDeleteArgs>

export const ClauseUpdateArgsSchema: z.ZodType<Prisma.ClauseUpdateArgs> = z.object({
  select: ClauseSelectSchema.optional(),
  include: ClauseIncludeSchema.optional(),
  data: z.union([ ClauseUpdateInputSchema,ClauseUncheckedUpdateInputSchema ]),
  where: ClauseWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ClauseUpdateArgs>

export const ClauseUpdateManyArgsSchema: z.ZodType<Prisma.ClauseUpdateManyArgs> = z.object({
  data: z.union([ ClauseUpdateManyMutationInputSchema,ClauseUncheckedUpdateManyInputSchema ]),
  where: ClauseWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ClauseUpdateManyArgs>

export const ClauseDeleteManyArgsSchema: z.ZodType<Prisma.ClauseDeleteManyArgs> = z.object({
  where: ClauseWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ClauseDeleteManyArgs>

export const DelegationCreateArgsSchema: z.ZodType<Prisma.DelegationCreateArgs> = z.object({
  select: DelegationSelectSchema.optional(),
  include: DelegationIncludeSchema.optional(),
  data: z.union([ DelegationCreateInputSchema,DelegationUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.DelegationCreateArgs>

export const DelegationUpsertArgsSchema: z.ZodType<Prisma.DelegationUpsertArgs> = z.object({
  select: DelegationSelectSchema.optional(),
  include: DelegationIncludeSchema.optional(),
  where: DelegationWhereUniqueInputSchema,
  create: z.union([ DelegationCreateInputSchema,DelegationUncheckedCreateInputSchema ]),
  update: z.union([ DelegationUpdateInputSchema,DelegationUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.DelegationUpsertArgs>

export const DelegationCreateManyArgsSchema: z.ZodType<Prisma.DelegationCreateManyArgs> = z.object({
  data: DelegationCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.DelegationCreateManyArgs>

export const DelegationDeleteArgsSchema: z.ZodType<Prisma.DelegationDeleteArgs> = z.object({
  select: DelegationSelectSchema.optional(),
  include: DelegationIncludeSchema.optional(),
  where: DelegationWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.DelegationDeleteArgs>

export const DelegationUpdateArgsSchema: z.ZodType<Prisma.DelegationUpdateArgs> = z.object({
  select: DelegationSelectSchema.optional(),
  include: DelegationIncludeSchema.optional(),
  data: z.union([ DelegationUpdateInputSchema,DelegationUncheckedUpdateInputSchema ]),
  where: DelegationWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.DelegationUpdateArgs>

export const DelegationUpdateManyArgsSchema: z.ZodType<Prisma.DelegationUpdateManyArgs> = z.object({
  data: z.union([ DelegationUpdateManyMutationInputSchema,DelegationUncheckedUpdateManyInputSchema ]),
  where: DelegationWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.DelegationUpdateManyArgs>

export const DelegationDeleteManyArgsSchema: z.ZodType<Prisma.DelegationDeleteManyArgs> = z.object({
  where: DelegationWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.DelegationDeleteManyArgs>

export const ReportCreateArgsSchema: z.ZodType<Prisma.ReportCreateArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  data: z.union([ ReportCreateInputSchema,ReportUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.ReportCreateArgs>

export const ReportUpsertArgsSchema: z.ZodType<Prisma.ReportUpsertArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  where: ReportWhereUniqueInputSchema,
  create: z.union([ ReportCreateInputSchema,ReportUncheckedCreateInputSchema ]),
  update: z.union([ ReportUpdateInputSchema,ReportUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.ReportUpsertArgs>

export const ReportCreateManyArgsSchema: z.ZodType<Prisma.ReportCreateManyArgs> = z.object({
  data: ReportCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.ReportCreateManyArgs>

export const ReportDeleteArgsSchema: z.ZodType<Prisma.ReportDeleteArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  where: ReportWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ReportDeleteArgs>

export const ReportUpdateArgsSchema: z.ZodType<Prisma.ReportUpdateArgs> = z.object({
  select: ReportSelectSchema.optional(),
  include: ReportIncludeSchema.optional(),
  data: z.union([ ReportUpdateInputSchema,ReportUncheckedUpdateInputSchema ]),
  where: ReportWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ReportUpdateArgs>

export const ReportUpdateManyArgsSchema: z.ZodType<Prisma.ReportUpdateManyArgs> = z.object({
  data: z.union([ ReportUpdateManyMutationInputSchema,ReportUncheckedUpdateManyInputSchema ]),
  where: ReportWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ReportUpdateManyArgs>

export const ReportDeleteManyArgsSchema: z.ZodType<Prisma.ReportDeleteManyArgs> = z.object({
  where: ReportWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ReportDeleteManyArgs>

export const Report_to_clauseCreateArgsSchema: z.ZodType<Prisma.Report_to_clauseCreateArgs> = z.object({
  select: Report_to_clauseSelectSchema.optional(),
  include: Report_to_clauseIncludeSchema.optional(),
  data: z.union([ Report_to_clauseCreateInputSchema,Report_to_clauseUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.Report_to_clauseCreateArgs>

export const Report_to_clauseUpsertArgsSchema: z.ZodType<Prisma.Report_to_clauseUpsertArgs> = z.object({
  select: Report_to_clauseSelectSchema.optional(),
  include: Report_to_clauseIncludeSchema.optional(),
  where: Report_to_clauseWhereUniqueInputSchema,
  create: z.union([ Report_to_clauseCreateInputSchema,Report_to_clauseUncheckedCreateInputSchema ]),
  update: z.union([ Report_to_clauseUpdateInputSchema,Report_to_clauseUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.Report_to_clauseUpsertArgs>

export const Report_to_clauseCreateManyArgsSchema: z.ZodType<Prisma.Report_to_clauseCreateManyArgs> = z.object({
  data: Report_to_clauseCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.Report_to_clauseCreateManyArgs>

export const Report_to_clauseDeleteArgsSchema: z.ZodType<Prisma.Report_to_clauseDeleteArgs> = z.object({
  select: Report_to_clauseSelectSchema.optional(),
  include: Report_to_clauseIncludeSchema.optional(),
  where: Report_to_clauseWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.Report_to_clauseDeleteArgs>

export const Report_to_clauseUpdateArgsSchema: z.ZodType<Prisma.Report_to_clauseUpdateArgs> = z.object({
  select: Report_to_clauseSelectSchema.optional(),
  include: Report_to_clauseIncludeSchema.optional(),
  data: z.union([ Report_to_clauseUpdateInputSchema,Report_to_clauseUncheckedUpdateInputSchema ]),
  where: Report_to_clauseWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.Report_to_clauseUpdateArgs>

export const Report_to_clauseUpdateManyArgsSchema: z.ZodType<Prisma.Report_to_clauseUpdateManyArgs> = z.object({
  data: z.union([ Report_to_clauseUpdateManyMutationInputSchema,Report_to_clauseUncheckedUpdateManyInputSchema ]),
  where: Report_to_clauseWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.Report_to_clauseUpdateManyArgs>

export const Report_to_clauseDeleteManyArgsSchema: z.ZodType<Prisma.Report_to_clauseDeleteManyArgs> = z.object({
  where: Report_to_clauseWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.Report_to_clauseDeleteManyArgs>

export const UdapCreateArgsSchema: z.ZodType<Prisma.UdapCreateArgs> = z.object({
  select: UdapSelectSchema.optional(),
  include: UdapIncludeSchema.optional(),
  data: z.union([ UdapCreateInputSchema,UdapUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.UdapCreateArgs>

export const UdapUpsertArgsSchema: z.ZodType<Prisma.UdapUpsertArgs> = z.object({
  select: UdapSelectSchema.optional(),
  include: UdapIncludeSchema.optional(),
  where: UdapWhereUniqueInputSchema,
  create: z.union([ UdapCreateInputSchema,UdapUncheckedCreateInputSchema ]),
  update: z.union([ UdapUpdateInputSchema,UdapUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.UdapUpsertArgs>

export const UdapCreateManyArgsSchema: z.ZodType<Prisma.UdapCreateManyArgs> = z.object({
  data: UdapCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.UdapCreateManyArgs>

export const UdapDeleteArgsSchema: z.ZodType<Prisma.UdapDeleteArgs> = z.object({
  select: UdapSelectSchema.optional(),
  include: UdapIncludeSchema.optional(),
  where: UdapWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UdapDeleteArgs>

export const UdapUpdateArgsSchema: z.ZodType<Prisma.UdapUpdateArgs> = z.object({
  select: UdapSelectSchema.optional(),
  include: UdapIncludeSchema.optional(),
  data: z.union([ UdapUpdateInputSchema,UdapUncheckedUpdateInputSchema ]),
  where: UdapWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UdapUpdateArgs>

export const UdapUpdateManyArgsSchema: z.ZodType<Prisma.UdapUpdateManyArgs> = z.object({
  data: z.union([ UdapUpdateManyMutationInputSchema,UdapUncheckedUpdateManyInputSchema ]),
  where: UdapWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.UdapUpdateManyArgs>

export const UdapDeleteManyArgsSchema: z.ZodType<Prisma.UdapDeleteManyArgs> = z.object({
  where: UdapWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.UdapDeleteManyArgs>

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.UserCreateArgs>

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.UserUpsertArgs>

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: UserCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.UserCreateManyArgs>

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UserDeleteArgs>

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.UserUpdateArgs>

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.UserUpdateManyArgs>

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.UserDeleteManyArgs>

interface ChipGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.ChipArgs
  readonly type: Omit<Prisma.ChipGetPayload<this['_A']>, "Please either choose `select` or `include`">
}

interface ClauseGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.ClauseArgs
  readonly type: Omit<Prisma.ClauseGetPayload<this['_A']>, "Please either choose `select` or `include`">
}

interface DelegationGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.DelegationArgs
  readonly type: Omit<Prisma.DelegationGetPayload<this['_A']>, "Please either choose `select` or `include`">
}

interface ReportGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.ReportArgs
  readonly type: Omit<Prisma.ReportGetPayload<this['_A']>, "Please either choose `select` or `include`">
}

interface Report_to_clauseGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.Report_to_clauseArgs
  readonly type: Omit<Prisma.Report_to_clauseGetPayload<this['_A']>, "Please either choose `select` or `include`">
}

interface UdapGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.UdapArgs
  readonly type: Omit<Prisma.UdapGetPayload<this['_A']>, "Please either choose `select` or `include`">
}

interface UserGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.UserArgs
  readonly type: Omit<Prisma.UserGetPayload<this['_A']>, "Please either choose `select` or `include`">
}

export const tableSchemas = {
  chip: {
    fields: new Map([
      [
        "key",
        "TEXT"
      ],
      [
        "value",
        "TEXT"
      ],
      [
        "udap_id",
        "TEXT"
      ],
      [
        "text",
        "TEXT"
      ]
    ]),
    relations: [
    ],
    modelSchema: (ChipCreateInputSchema as any)
      .partial()
      .or((ChipUncheckedCreateInputSchema as any).partial()),
    createSchema: ChipCreateArgsSchema,
    createManySchema: ChipCreateManyArgsSchema,
    findUniqueSchema: ChipFindUniqueArgsSchema,
    findSchema: ChipFindFirstArgsSchema,
    updateSchema: ChipUpdateArgsSchema,
    updateManySchema: ChipUpdateManyArgsSchema,
    upsertSchema: ChipUpsertArgsSchema,
    deleteSchema: ChipDeleteArgsSchema,
    deleteManySchema: ChipDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof ChipUncheckedCreateInputSchema>,
    Prisma.ChipCreateArgs['data'],
    Prisma.ChipUpdateArgs['data'],
    Prisma.ChipFindFirstArgs['select'],
    Prisma.ChipFindFirstArgs['where'],
    Prisma.ChipFindUniqueArgs['where'],
    never,
    Prisma.ChipFindFirstArgs['orderBy'],
    Prisma.ChipScalarFieldEnum,
    ChipGetPayload
  >,
  clause: {
    fields: new Map([
      [
        "id",
        "TEXT"
      ],
      [
        "label",
        "TEXT"
      ],
      [
        "value",
        "TEXT"
      ]
    ]),
    relations: [
      new Relation("report_to_clause", "", "", "report_to_clause", "ClauseToReport_to_clause", "many"),
    ],
    modelSchema: (ClauseCreateInputSchema as any)
      .partial()
      .or((ClauseUncheckedCreateInputSchema as any).partial()),
    createSchema: ClauseCreateArgsSchema,
    createManySchema: ClauseCreateManyArgsSchema,
    findUniqueSchema: ClauseFindUniqueArgsSchema,
    findSchema: ClauseFindFirstArgsSchema,
    updateSchema: ClauseUpdateArgsSchema,
    updateManySchema: ClauseUpdateManyArgsSchema,
    upsertSchema: ClauseUpsertArgsSchema,
    deleteSchema: ClauseDeleteArgsSchema,
    deleteManySchema: ClauseDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof ClauseUncheckedCreateInputSchema>,
    Prisma.ClauseCreateArgs['data'],
    Prisma.ClauseUpdateArgs['data'],
    Prisma.ClauseFindFirstArgs['select'],
    Prisma.ClauseFindFirstArgs['where'],
    Prisma.ClauseFindUniqueArgs['where'],
    Omit<Prisma.ClauseInclude, '_count'>,
    Prisma.ClauseFindFirstArgs['orderBy'],
    Prisma.ClauseScalarFieldEnum,
    ClauseGetPayload
  >,
  delegation: {
    fields: new Map([
      [
        "createdBy",
        "TEXT"
      ],
      [
        "delegatedTo",
        "TEXT"
      ]
    ]),
    relations: [
      new Relation("user_delegation_createdByTouser", "createdBy", "id", "user", "delegation_createdByTouser", "one"),
      new Relation("user_delegation_delegatedToTouser", "delegatedTo", "id", "user", "delegation_delegatedToTouser", "one"),
    ],
    modelSchema: (DelegationCreateInputSchema as any)
      .partial()
      .or((DelegationUncheckedCreateInputSchema as any).partial()),
    createSchema: DelegationCreateArgsSchema,
    createManySchema: DelegationCreateManyArgsSchema,
    findUniqueSchema: DelegationFindUniqueArgsSchema,
    findSchema: DelegationFindFirstArgsSchema,
    updateSchema: DelegationUpdateArgsSchema,
    updateManySchema: DelegationUpdateManyArgsSchema,
    upsertSchema: DelegationUpsertArgsSchema,
    deleteSchema: DelegationDeleteArgsSchema,
    deleteManySchema: DelegationDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof DelegationUncheckedCreateInputSchema>,
    Prisma.DelegationCreateArgs['data'],
    Prisma.DelegationUpdateArgs['data'],
    Prisma.DelegationFindFirstArgs['select'],
    Prisma.DelegationFindFirstArgs['where'],
    Prisma.DelegationFindUniqueArgs['where'],
    Omit<Prisma.DelegationInclude, '_count'>,
    Prisma.DelegationFindFirstArgs['orderBy'],
    Prisma.DelegationScalarFieldEnum,
    DelegationGetPayload
  >,
  report: {
    fields: new Map([
      [
        "id",
        "TEXT"
      ],
      [
        "title",
        "TEXT"
      ],
      [
        "projectDescription",
        "TEXT"
      ],
      [
        "redactedBy",
        "TEXT"
      ],
      [
        "meetDate",
        "TIMESTAMP"
      ],
      [
        "applicantName",
        "TEXT"
      ],
      [
        "applicantAddress",
        "TEXT"
      ],
      [
        "projectCadastralRef",
        "TEXT"
      ],
      [
        "projectSpaceType",
        "TEXT"
      ],
      [
        "decision",
        "TEXT"
      ],
      [
        "precisions",
        "TEXT"
      ],
      [
        "contacts",
        "TEXT"
      ],
      [
        "furtherInformation",
        "TEXT"
      ],
      [
        "createdBy",
        "TEXT"
      ],
      [
        "createdAt",
        "TIMESTAMP"
      ],
      [
        "serviceInstructeur",
        "INT4"
      ],
      [
        "pdf",
        "TEXT"
      ],
      [
        "disabled",
        "BOOL"
      ],
      [
        "udap_id",
        "TEXT"
      ]
    ]),
    relations: [
      new Relation("user", "createdBy", "id", "user", "ReportToUser", "one"),
      new Relation("report_to_clause", "", "", "report_to_clause", "ReportToReport_to_clause", "many"),
    ],
    modelSchema: (ReportCreateInputSchema as any)
      .partial()
      .or((ReportUncheckedCreateInputSchema as any).partial()),
    createSchema: ReportCreateArgsSchema,
    createManySchema: ReportCreateManyArgsSchema,
    findUniqueSchema: ReportFindUniqueArgsSchema,
    findSchema: ReportFindFirstArgsSchema,
    updateSchema: ReportUpdateArgsSchema,
    updateManySchema: ReportUpdateManyArgsSchema,
    upsertSchema: ReportUpsertArgsSchema,
    deleteSchema: ReportDeleteArgsSchema,
    deleteManySchema: ReportDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof ReportUncheckedCreateInputSchema>,
    Prisma.ReportCreateArgs['data'],
    Prisma.ReportUpdateArgs['data'],
    Prisma.ReportFindFirstArgs['select'],
    Prisma.ReportFindFirstArgs['where'],
    Prisma.ReportFindUniqueArgs['where'],
    Omit<Prisma.ReportInclude, '_count'>,
    Prisma.ReportFindFirstArgs['orderBy'],
    Prisma.ReportScalarFieldEnum,
    ReportGetPayload
  >,
  report_to_clause: {
    fields: new Map([
      [
        "id",
        "TEXT"
      ],
      [
        "reportId",
        "TEXT"
      ],
      [
        "clauseId",
        "TEXT"
      ]
    ]),
    relations: [
      new Relation("clause", "clauseId", "id", "clause", "ClauseToReport_to_clause", "one"),
      new Relation("report", "reportId", "id", "report", "ReportToReport_to_clause", "one"),
    ],
    modelSchema: (Report_to_clauseCreateInputSchema as any)
      .partial()
      .or((Report_to_clauseUncheckedCreateInputSchema as any).partial()),
    createSchema: Report_to_clauseCreateArgsSchema,
    createManySchema: Report_to_clauseCreateManyArgsSchema,
    findUniqueSchema: Report_to_clauseFindUniqueArgsSchema,
    findSchema: Report_to_clauseFindFirstArgsSchema,
    updateSchema: Report_to_clauseUpdateArgsSchema,
    updateManySchema: Report_to_clauseUpdateManyArgsSchema,
    upsertSchema: Report_to_clauseUpsertArgsSchema,
    deleteSchema: Report_to_clauseDeleteArgsSchema,
    deleteManySchema: Report_to_clauseDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof Report_to_clauseUncheckedCreateInputSchema>,
    Prisma.Report_to_clauseCreateArgs['data'],
    Prisma.Report_to_clauseUpdateArgs['data'],
    Prisma.Report_to_clauseFindFirstArgs['select'],
    Prisma.Report_to_clauseFindFirstArgs['where'],
    Prisma.Report_to_clauseFindUniqueArgs['where'],
    Omit<Prisma.Report_to_clauseInclude, '_count'>,
    Prisma.Report_to_clauseFindFirstArgs['orderBy'],
    Prisma.Report_to_clauseScalarFieldEnum,
    Report_to_clauseGetPayload
  >,
  udap: {
    fields: new Map([
      [
        "id",
        "TEXT"
      ],
      [
        "department",
        "TEXT"
      ],
      [
        "completeCoords",
        "TEXT"
      ],
      [
        "visible",
        "BOOL"
      ],
      [
        "name",
        "TEXT"
      ],
      [
        "address",
        "TEXT"
      ],
      [
        "zipCode",
        "TEXT"
      ],
      [
        "city",
        "TEXT"
      ],
      [
        "phone",
        "TEXT"
      ],
      [
        "email",
        "TEXT"
      ]
    ]),
    relations: [
      new Relation("user", "", "", "user", "UdapToUser", "many"),
    ],
    modelSchema: (UdapCreateInputSchema as any)
      .partial()
      .or((UdapUncheckedCreateInputSchema as any).partial()),
    createSchema: UdapCreateArgsSchema,
    createManySchema: UdapCreateManyArgsSchema,
    findUniqueSchema: UdapFindUniqueArgsSchema,
    findSchema: UdapFindFirstArgsSchema,
    updateSchema: UdapUpdateArgsSchema,
    updateManySchema: UdapUpdateManyArgsSchema,
    upsertSchema: UdapUpsertArgsSchema,
    deleteSchema: UdapDeleteArgsSchema,
    deleteManySchema: UdapDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof UdapUncheckedCreateInputSchema>,
    Prisma.UdapCreateArgs['data'],
    Prisma.UdapUpdateArgs['data'],
    Prisma.UdapFindFirstArgs['select'],
    Prisma.UdapFindFirstArgs['where'],
    Prisma.UdapFindUniqueArgs['where'],
    Omit<Prisma.UdapInclude, '_count'>,
    Prisma.UdapFindFirstArgs['orderBy'],
    Prisma.UdapScalarFieldEnum,
    UdapGetPayload
  >,
  user: {
    fields: new Map([
      [
        "id",
        "TEXT"
      ],
      [
        "name",
        "TEXT"
      ],
      [
        "udap_id",
        "TEXT"
      ]
    ]),
    relations: [
      new Relation("delegation_delegation_createdByTouser", "", "", "delegation", "delegation_createdByTouser", "many"),
      new Relation("delegation_delegation_delegatedToTouser", "", "", "delegation", "delegation_delegatedToTouser", "many"),
      new Relation("report", "", "", "report", "ReportToUser", "many"),
      new Relation("udap", "udap_id", "id", "udap", "UdapToUser", "one"),
    ],
    modelSchema: (UserCreateInputSchema as any)
      .partial()
      .or((UserUncheckedCreateInputSchema as any).partial()),
    createSchema: UserCreateArgsSchema,
    createManySchema: UserCreateManyArgsSchema,
    findUniqueSchema: UserFindUniqueArgsSchema,
    findSchema: UserFindFirstArgsSchema,
    updateSchema: UserUpdateArgsSchema,
    updateManySchema: UserUpdateManyArgsSchema,
    upsertSchema: UserUpsertArgsSchema,
    deleteSchema: UserDeleteArgsSchema,
    deleteManySchema: UserDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof UserUncheckedCreateInputSchema>,
    Prisma.UserCreateArgs['data'],
    Prisma.UserUpdateArgs['data'],
    Prisma.UserFindFirstArgs['select'],
    Prisma.UserFindFirstArgs['where'],
    Prisma.UserFindUniqueArgs['where'],
    Omit<Prisma.UserInclude, '_count'>,
    Prisma.UserFindFirstArgs['orderBy'],
    Prisma.UserScalarFieldEnum,
    UserGetPayload
  >,
}

export const schema = new DbSchema(tableSchemas, migrations)
export type Electric = ElectricClient<typeof schema>
