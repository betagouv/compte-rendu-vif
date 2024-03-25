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

export const ClauseScalarFieldEnumSchema = z.enum(['id','label','value']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const ReportScalarFieldEnumSchema = z.enum(['id','title','authorId','meetDate','meetLink','applicantName','applicantType','projectStatus','projectCadastralRef','projectLandContact','projectSpaceType','projectNature','projectDescription','decision','decisionComment','contacts','createdAt','updatedAt']);

export const ReportToClauseScalarFieldEnumSchema = z.enum(['reportId','clauseId']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['id','email','name','password','createdAt','updatedAt']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

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
// REPORT SCHEMA
/////////////////////////////////////////

export const ReportSchema = z.object({
  id: z.string(),
  title: z.string(),
  authorId: z.string(),
  meetDate: z.coerce.date(),
  meetLink: z.string(),
  applicantName: z.string(),
  applicantType: z.string(),
  projectStatus: z.string(),
  projectCadastralRef: z.string(),
  projectLandContact: z.string(),
  projectSpaceType: z.string(),
  projectNature: z.string(),
  projectDescription: z.string(),
  decision: z.string(),
  decisionComment: z.string(),
  contacts: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Report = z.infer<typeof ReportSchema>

/////////////////////////////////////////
// REPORT TO CLAUSE SCHEMA
/////////////////////////////////////////

export const ReportToClauseSchema = z.object({
  reportId: z.string(),
  clauseId: z.string(),
})

export type ReportToClause = z.infer<typeof ReportToClauseSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().nullable(),
  password: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// CLAUSE
//------------------------------------------------------

export const ClauseIncludeSchema: z.ZodType<Prisma.ClauseInclude> = z.object({
  ReportToClause: z.union([z.boolean(),z.lazy(() => ReportToClauseFindManyArgsSchema)]).optional(),
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
  ReportToClause: z.boolean().optional(),
}).strict();

export const ClauseSelectSchema: z.ZodType<Prisma.ClauseSelect> = z.object({
  id: z.boolean().optional(),
  label: z.boolean().optional(),
  value: z.boolean().optional(),
  ReportToClause: z.union([z.boolean(),z.lazy(() => ReportToClauseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ClauseCountOutputTypeArgsSchema)]).optional(),
}).strict()

// REPORT
//------------------------------------------------------

export const ReportIncludeSchema: z.ZodType<Prisma.ReportInclude> = z.object({
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  ReportToClause: z.union([z.boolean(),z.lazy(() => ReportToClauseFindManyArgsSchema)]).optional(),
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
  ReportToClause: z.boolean().optional(),
}).strict();

export const ReportSelectSchema: z.ZodType<Prisma.ReportSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  authorId: z.boolean().optional(),
  meetDate: z.boolean().optional(),
  meetLink: z.boolean().optional(),
  applicantName: z.boolean().optional(),
  applicantType: z.boolean().optional(),
  projectStatus: z.boolean().optional(),
  projectCadastralRef: z.boolean().optional(),
  projectLandContact: z.boolean().optional(),
  projectSpaceType: z.boolean().optional(),
  projectNature: z.boolean().optional(),
  projectDescription: z.boolean().optional(),
  decision: z.boolean().optional(),
  decisionComment: z.boolean().optional(),
  contacts: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  User: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  ReportToClause: z.union([z.boolean(),z.lazy(() => ReportToClauseFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ReportCountOutputTypeArgsSchema)]).optional(),
}).strict()

// REPORT TO CLAUSE
//------------------------------------------------------

export const ReportToClauseIncludeSchema: z.ZodType<Prisma.ReportToClauseInclude> = z.object({
  Clause: z.union([z.boolean(),z.lazy(() => ClauseArgsSchema)]).optional(),
  Report: z.union([z.boolean(),z.lazy(() => ReportArgsSchema)]).optional(),
}).strict()

export const ReportToClauseArgsSchema: z.ZodType<Prisma.ReportToClauseArgs> = z.object({
  select: z.lazy(() => ReportToClauseSelectSchema).optional(),
  include: z.lazy(() => ReportToClauseIncludeSchema).optional(),
}).strict();

export const ReportToClauseSelectSchema: z.ZodType<Prisma.ReportToClauseSelect> = z.object({
  reportId: z.boolean().optional(),
  clauseId: z.boolean().optional(),
  Clause: z.union([z.boolean(),z.lazy(() => ClauseArgsSchema)]).optional(),
  Report: z.union([z.boolean(),z.lazy(() => ReportArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  Report: z.union([z.boolean(),z.lazy(() => ReportFindManyArgsSchema)]).optional(),
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
  Report: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  email: z.boolean().optional(),
  name: z.boolean().optional(),
  password: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  Report: z.union([z.boolean(),z.lazy(() => ReportFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const ClauseWhereInputSchema: z.ZodType<Prisma.ClauseWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ClauseWhereInputSchema),z.lazy(() => ClauseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ClauseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ClauseWhereInputSchema),z.lazy(() => ClauseWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  label: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ReportToClause: z.lazy(() => ReportToClauseListRelationFilterSchema).optional()
}).strict();

export const ClauseOrderByWithRelationInputSchema: z.ZodType<Prisma.ClauseOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  ReportToClause: z.lazy(() => ReportToClauseOrderByRelationAggregateInputSchema).optional()
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

export const ReportWhereInputSchema: z.ZodType<Prisma.ReportWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReportWhereInputSchema),z.lazy(() => ReportWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportWhereInputSchema),z.lazy(() => ReportWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  meetDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  meetLink: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  applicantName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  applicantType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectStatus: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectCadastralRef: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectLandContact: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectSpaceType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectNature: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectDescription: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  decision: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  decisionComment: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  contacts: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  User: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  ReportToClause: z.lazy(() => ReportToClauseListRelationFilterSchema).optional()
}).strict();

export const ReportOrderByWithRelationInputSchema: z.ZodType<Prisma.ReportOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  meetDate: z.lazy(() => SortOrderSchema).optional(),
  meetLink: z.lazy(() => SortOrderSchema).optional(),
  applicantName: z.lazy(() => SortOrderSchema).optional(),
  applicantType: z.lazy(() => SortOrderSchema).optional(),
  projectStatus: z.lazy(() => SortOrderSchema).optional(),
  projectCadastralRef: z.lazy(() => SortOrderSchema).optional(),
  projectLandContact: z.lazy(() => SortOrderSchema).optional(),
  projectSpaceType: z.lazy(() => SortOrderSchema).optional(),
  projectNature: z.lazy(() => SortOrderSchema).optional(),
  projectDescription: z.lazy(() => SortOrderSchema).optional(),
  decision: z.lazy(() => SortOrderSchema).optional(),
  decisionComment: z.lazy(() => SortOrderSchema).optional(),
  contacts: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  User: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  ReportToClause: z.lazy(() => ReportToClauseOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ReportWhereUniqueInputSchema: z.ZodType<Prisma.ReportWhereUniqueInput> = z.object({
  id: z.string().optional()
}).strict();

export const ReportOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReportOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  meetDate: z.lazy(() => SortOrderSchema).optional(),
  meetLink: z.lazy(() => SortOrderSchema).optional(),
  applicantName: z.lazy(() => SortOrderSchema).optional(),
  applicantType: z.lazy(() => SortOrderSchema).optional(),
  projectStatus: z.lazy(() => SortOrderSchema).optional(),
  projectCadastralRef: z.lazy(() => SortOrderSchema).optional(),
  projectLandContact: z.lazy(() => SortOrderSchema).optional(),
  projectSpaceType: z.lazy(() => SortOrderSchema).optional(),
  projectNature: z.lazy(() => SortOrderSchema).optional(),
  projectDescription: z.lazy(() => SortOrderSchema).optional(),
  decision: z.lazy(() => SortOrderSchema).optional(),
  decisionComment: z.lazy(() => SortOrderSchema).optional(),
  contacts: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ReportCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ReportMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ReportMinOrderByAggregateInputSchema).optional()
}).strict();

export const ReportScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReportScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ReportScalarWhereWithAggregatesInputSchema),z.lazy(() => ReportScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportScalarWhereWithAggregatesInputSchema),z.lazy(() => ReportScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  title: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  meetDate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  meetLink: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  applicantName: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  applicantType: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  projectStatus: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  projectCadastralRef: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  projectLandContact: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  projectSpaceType: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  projectNature: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  projectDescription: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  decision: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  decisionComment: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  contacts: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ReportToClauseWhereInputSchema: z.ZodType<Prisma.ReportToClauseWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReportToClauseWhereInputSchema),z.lazy(() => ReportToClauseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportToClauseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportToClauseWhereInputSchema),z.lazy(() => ReportToClauseWhereInputSchema).array() ]).optional(),
  reportId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  clauseId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  Clause: z.union([ z.lazy(() => ClauseRelationFilterSchema),z.lazy(() => ClauseWhereInputSchema) ]).optional(),
  Report: z.union([ z.lazy(() => ReportRelationFilterSchema),z.lazy(() => ReportWhereInputSchema) ]).optional(),
}).strict();

export const ReportToClauseOrderByWithRelationInputSchema: z.ZodType<Prisma.ReportToClauseOrderByWithRelationInput> = z.object({
  reportId: z.lazy(() => SortOrderSchema).optional(),
  clauseId: z.lazy(() => SortOrderSchema).optional(),
  Clause: z.lazy(() => ClauseOrderByWithRelationInputSchema).optional(),
  Report: z.lazy(() => ReportOrderByWithRelationInputSchema).optional()
}).strict();

export const ReportToClauseWhereUniqueInputSchema: z.ZodType<Prisma.ReportToClauseWhereUniqueInput> = z.object({
  reportId_clauseId: z.lazy(() => ReportToClauseReportIdClauseIdCompoundUniqueInputSchema).optional()
}).strict();

export const ReportToClauseOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReportToClauseOrderByWithAggregationInput> = z.object({
  reportId: z.lazy(() => SortOrderSchema).optional(),
  clauseId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ReportToClauseCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ReportToClauseMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ReportToClauseMinOrderByAggregateInputSchema).optional()
}).strict();

export const ReportToClauseScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ReportToClauseScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ReportToClauseScalarWhereWithAggregatesInputSchema),z.lazy(() => ReportToClauseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportToClauseScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportToClauseScalarWhereWithAggregatesInputSchema),z.lazy(() => ReportToClauseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  reportId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  clauseId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  Report: z.lazy(() => ReportListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  Report: z.lazy(() => ReportOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.string().optional(),
  email: z.string().optional()
}).strict();

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ClauseCreateInputSchema: z.ZodType<Prisma.ClauseCreateInput> = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string(),
  ReportToClause: z.lazy(() => ReportToClauseCreateNestedManyWithoutClauseInputSchema).optional()
}).strict();

export const ClauseUncheckedCreateInputSchema: z.ZodType<Prisma.ClauseUncheckedCreateInput> = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string(),
  ReportToClause: z.lazy(() => ReportToClauseUncheckedCreateNestedManyWithoutClauseInputSchema).optional()
}).strict();

export const ClauseUpdateInputSchema: z.ZodType<Prisma.ClauseUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ReportToClause: z.lazy(() => ReportToClauseUpdateManyWithoutClauseNestedInputSchema).optional()
}).strict();

export const ClauseUncheckedUpdateInputSchema: z.ZodType<Prisma.ClauseUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ReportToClause: z.lazy(() => ReportToClauseUncheckedUpdateManyWithoutClauseNestedInputSchema).optional()
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

export const ReportCreateInputSchema: z.ZodType<Prisma.ReportCreateInput> = z.object({
  id: z.string(),
  title: z.string(),
  meetDate: z.coerce.date(),
  meetLink: z.string(),
  applicantName: z.string(),
  applicantType: z.string(),
  projectStatus: z.string(),
  projectCadastralRef: z.string(),
  projectLandContact: z.string(),
  projectSpaceType: z.string(),
  projectNature: z.string(),
  projectDescription: z.string(),
  decision: z.string(),
  decisionComment: z.string(),
  contacts: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  User: z.lazy(() => UserCreateNestedOneWithoutReportInputSchema),
  ReportToClause: z.lazy(() => ReportToClauseCreateNestedManyWithoutReportInputSchema).optional()
}).strict();

export const ReportUncheckedCreateInputSchema: z.ZodType<Prisma.ReportUncheckedCreateInput> = z.object({
  id: z.string(),
  title: z.string(),
  authorId: z.string(),
  meetDate: z.coerce.date(),
  meetLink: z.string(),
  applicantName: z.string(),
  applicantType: z.string(),
  projectStatus: z.string(),
  projectCadastralRef: z.string(),
  projectLandContact: z.string(),
  projectSpaceType: z.string(),
  projectNature: z.string(),
  projectDescription: z.string(),
  decision: z.string(),
  decisionComment: z.string(),
  contacts: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ReportToClause: z.lazy(() => ReportToClauseUncheckedCreateNestedManyWithoutReportInputSchema).optional()
}).strict();

export const ReportUpdateInputSchema: z.ZodType<Prisma.ReportUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meetDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meetLink: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applicantName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applicantType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectStatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectCadastralRef: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectLandContact: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectSpaceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectNature: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  decision: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  decisionComment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contacts: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneRequiredWithoutReportNestedInputSchema).optional(),
  ReportToClause: z.lazy(() => ReportToClauseUpdateManyWithoutReportNestedInputSchema).optional()
}).strict();

export const ReportUncheckedUpdateInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meetDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meetLink: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applicantName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applicantType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectStatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectCadastralRef: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectLandContact: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectSpaceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectNature: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  decision: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  decisionComment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contacts: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ReportToClause: z.lazy(() => ReportToClauseUncheckedUpdateManyWithoutReportNestedInputSchema).optional()
}).strict();

export const ReportCreateManyInputSchema: z.ZodType<Prisma.ReportCreateManyInput> = z.object({
  id: z.string(),
  title: z.string(),
  authorId: z.string(),
  meetDate: z.coerce.date(),
  meetLink: z.string(),
  applicantName: z.string(),
  applicantType: z.string(),
  projectStatus: z.string(),
  projectCadastralRef: z.string(),
  projectLandContact: z.string(),
  projectSpaceType: z.string(),
  projectNature: z.string(),
  projectDescription: z.string(),
  decision: z.string(),
  decisionComment: z.string(),
  contacts: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const ReportUpdateManyMutationInputSchema: z.ZodType<Prisma.ReportUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meetDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meetLink: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applicantName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applicantType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectStatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectCadastralRef: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectLandContact: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectSpaceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectNature: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  decision: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  decisionComment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contacts: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meetDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meetLink: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applicantName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applicantType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectStatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectCadastralRef: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectLandContact: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectSpaceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectNature: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  decision: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  decisionComment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contacts: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportToClauseCreateInputSchema: z.ZodType<Prisma.ReportToClauseCreateInput> = z.object({
  Clause: z.lazy(() => ClauseCreateNestedOneWithoutReportToClauseInputSchema),
  Report: z.lazy(() => ReportCreateNestedOneWithoutReportToClauseInputSchema)
}).strict();

export const ReportToClauseUncheckedCreateInputSchema: z.ZodType<Prisma.ReportToClauseUncheckedCreateInput> = z.object({
  reportId: z.string(),
  clauseId: z.string()
}).strict();

export const ReportToClauseUpdateInputSchema: z.ZodType<Prisma.ReportToClauseUpdateInput> = z.object({
  Clause: z.lazy(() => ClauseUpdateOneRequiredWithoutReportToClauseNestedInputSchema).optional(),
  Report: z.lazy(() => ReportUpdateOneRequiredWithoutReportToClauseNestedInputSchema).optional()
}).strict();

export const ReportToClauseUncheckedUpdateInputSchema: z.ZodType<Prisma.ReportToClauseUncheckedUpdateInput> = z.object({
  reportId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clauseId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportToClauseCreateManyInputSchema: z.ZodType<Prisma.ReportToClauseCreateManyInput> = z.object({
  reportId: z.string(),
  clauseId: z.string()
}).strict();

export const ReportToClauseUpdateManyMutationInputSchema: z.ZodType<Prisma.ReportToClauseUpdateManyMutationInput> = z.object({
}).strict();

export const ReportToClauseUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReportToClauseUncheckedUpdateManyInput> = z.object({
  reportId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clauseId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().optional().nullable(),
  password: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  Report: z.lazy(() => ReportCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().optional().nullable(),
  password: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  Report: z.lazy(() => ReportUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Report: z.lazy(() => ReportUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  Report: z.lazy(() => ReportUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().optional().nullable(),
  password: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
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

export const ReportToClauseListRelationFilterSchema: z.ZodType<Prisma.ReportToClauseListRelationFilter> = z.object({
  every: z.lazy(() => ReportToClauseWhereInputSchema).optional(),
  some: z.lazy(() => ReportToClauseWhereInputSchema).optional(),
  none: z.lazy(() => ReportToClauseWhereInputSchema).optional()
}).strict();

export const ReportToClauseOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ReportToClauseOrderByRelationAggregateInput> = z.object({
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

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const ReportCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReportCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  meetDate: z.lazy(() => SortOrderSchema).optional(),
  meetLink: z.lazy(() => SortOrderSchema).optional(),
  applicantName: z.lazy(() => SortOrderSchema).optional(),
  applicantType: z.lazy(() => SortOrderSchema).optional(),
  projectStatus: z.lazy(() => SortOrderSchema).optional(),
  projectCadastralRef: z.lazy(() => SortOrderSchema).optional(),
  projectLandContact: z.lazy(() => SortOrderSchema).optional(),
  projectSpaceType: z.lazy(() => SortOrderSchema).optional(),
  projectNature: z.lazy(() => SortOrderSchema).optional(),
  projectDescription: z.lazy(() => SortOrderSchema).optional(),
  decision: z.lazy(() => SortOrderSchema).optional(),
  decisionComment: z.lazy(() => SortOrderSchema).optional(),
  contacts: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReportMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReportMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  meetDate: z.lazy(() => SortOrderSchema).optional(),
  meetLink: z.lazy(() => SortOrderSchema).optional(),
  applicantName: z.lazy(() => SortOrderSchema).optional(),
  applicantType: z.lazy(() => SortOrderSchema).optional(),
  projectStatus: z.lazy(() => SortOrderSchema).optional(),
  projectCadastralRef: z.lazy(() => SortOrderSchema).optional(),
  projectLandContact: z.lazy(() => SortOrderSchema).optional(),
  projectSpaceType: z.lazy(() => SortOrderSchema).optional(),
  projectNature: z.lazy(() => SortOrderSchema).optional(),
  projectDescription: z.lazy(() => SortOrderSchema).optional(),
  decision: z.lazy(() => SortOrderSchema).optional(),
  decisionComment: z.lazy(() => SortOrderSchema).optional(),
  contacts: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReportMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReportMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  authorId: z.lazy(() => SortOrderSchema).optional(),
  meetDate: z.lazy(() => SortOrderSchema).optional(),
  meetLink: z.lazy(() => SortOrderSchema).optional(),
  applicantName: z.lazy(() => SortOrderSchema).optional(),
  applicantType: z.lazy(() => SortOrderSchema).optional(),
  projectStatus: z.lazy(() => SortOrderSchema).optional(),
  projectCadastralRef: z.lazy(() => SortOrderSchema).optional(),
  projectLandContact: z.lazy(() => SortOrderSchema).optional(),
  projectSpaceType: z.lazy(() => SortOrderSchema).optional(),
  projectNature: z.lazy(() => SortOrderSchema).optional(),
  projectDescription: z.lazy(() => SortOrderSchema).optional(),
  decision: z.lazy(() => SortOrderSchema).optional(),
  decisionComment: z.lazy(() => SortOrderSchema).optional(),
  contacts: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
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

export const ClauseRelationFilterSchema: z.ZodType<Prisma.ClauseRelationFilter> = z.object({
  is: z.lazy(() => ClauseWhereInputSchema).optional(),
  isNot: z.lazy(() => ClauseWhereInputSchema).optional()
}).strict();

export const ReportRelationFilterSchema: z.ZodType<Prisma.ReportRelationFilter> = z.object({
  is: z.lazy(() => ReportWhereInputSchema).optional(),
  isNot: z.lazy(() => ReportWhereInputSchema).optional()
}).strict();

export const ReportToClauseReportIdClauseIdCompoundUniqueInputSchema: z.ZodType<Prisma.ReportToClauseReportIdClauseIdCompoundUniqueInput> = z.object({
  reportId: z.string(),
  clauseId: z.string()
}).strict();

export const ReportToClauseCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReportToClauseCountOrderByAggregateInput> = z.object({
  reportId: z.lazy(() => SortOrderSchema).optional(),
  clauseId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReportToClauseMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReportToClauseMaxOrderByAggregateInput> = z.object({
  reportId: z.lazy(() => SortOrderSchema).optional(),
  clauseId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReportToClauseMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReportToClauseMinOrderByAggregateInput> = z.object({
  reportId: z.lazy(() => SortOrderSchema).optional(),
  clauseId: z.lazy(() => SortOrderSchema).optional()
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

export const ReportListRelationFilterSchema: z.ZodType<Prisma.ReportListRelationFilter> = z.object({
  every: z.lazy(() => ReportWhereInputSchema).optional(),
  some: z.lazy(() => ReportWhereInputSchema).optional(),
  none: z.lazy(() => ReportWhereInputSchema).optional()
}).strict();

export const ReportOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ReportOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
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

export const ReportToClauseCreateNestedManyWithoutClauseInputSchema: z.ZodType<Prisma.ReportToClauseCreateNestedManyWithoutClauseInput> = z.object({
  create: z.union([ z.lazy(() => ReportToClauseCreateWithoutClauseInputSchema),z.lazy(() => ReportToClauseCreateWithoutClauseInputSchema).array(),z.lazy(() => ReportToClauseUncheckedCreateWithoutClauseInputSchema),z.lazy(() => ReportToClauseUncheckedCreateWithoutClauseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportToClauseCreateOrConnectWithoutClauseInputSchema),z.lazy(() => ReportToClauseCreateOrConnectWithoutClauseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportToClauseCreateManyClauseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReportToClauseWhereUniqueInputSchema),z.lazy(() => ReportToClauseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReportToClauseUncheckedCreateNestedManyWithoutClauseInputSchema: z.ZodType<Prisma.ReportToClauseUncheckedCreateNestedManyWithoutClauseInput> = z.object({
  create: z.union([ z.lazy(() => ReportToClauseCreateWithoutClauseInputSchema),z.lazy(() => ReportToClauseCreateWithoutClauseInputSchema).array(),z.lazy(() => ReportToClauseUncheckedCreateWithoutClauseInputSchema),z.lazy(() => ReportToClauseUncheckedCreateWithoutClauseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportToClauseCreateOrConnectWithoutClauseInputSchema),z.lazy(() => ReportToClauseCreateOrConnectWithoutClauseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportToClauseCreateManyClauseInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReportToClauseWhereUniqueInputSchema),z.lazy(() => ReportToClauseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const ReportToClauseUpdateManyWithoutClauseNestedInputSchema: z.ZodType<Prisma.ReportToClauseUpdateManyWithoutClauseNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReportToClauseCreateWithoutClauseInputSchema),z.lazy(() => ReportToClauseCreateWithoutClauseInputSchema).array(),z.lazy(() => ReportToClauseUncheckedCreateWithoutClauseInputSchema),z.lazy(() => ReportToClauseUncheckedCreateWithoutClauseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportToClauseCreateOrConnectWithoutClauseInputSchema),z.lazy(() => ReportToClauseCreateOrConnectWithoutClauseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReportToClauseUpsertWithWhereUniqueWithoutClauseInputSchema),z.lazy(() => ReportToClauseUpsertWithWhereUniqueWithoutClauseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportToClauseCreateManyClauseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReportToClauseWhereUniqueInputSchema),z.lazy(() => ReportToClauseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReportToClauseWhereUniqueInputSchema),z.lazy(() => ReportToClauseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReportToClauseWhereUniqueInputSchema),z.lazy(() => ReportToClauseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReportToClauseWhereUniqueInputSchema),z.lazy(() => ReportToClauseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReportToClauseUpdateWithWhereUniqueWithoutClauseInputSchema),z.lazy(() => ReportToClauseUpdateWithWhereUniqueWithoutClauseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReportToClauseUpdateManyWithWhereWithoutClauseInputSchema),z.lazy(() => ReportToClauseUpdateManyWithWhereWithoutClauseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReportToClauseScalarWhereInputSchema),z.lazy(() => ReportToClauseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReportToClauseUncheckedUpdateManyWithoutClauseNestedInputSchema: z.ZodType<Prisma.ReportToClauseUncheckedUpdateManyWithoutClauseNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReportToClauseCreateWithoutClauseInputSchema),z.lazy(() => ReportToClauseCreateWithoutClauseInputSchema).array(),z.lazy(() => ReportToClauseUncheckedCreateWithoutClauseInputSchema),z.lazy(() => ReportToClauseUncheckedCreateWithoutClauseInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportToClauseCreateOrConnectWithoutClauseInputSchema),z.lazy(() => ReportToClauseCreateOrConnectWithoutClauseInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReportToClauseUpsertWithWhereUniqueWithoutClauseInputSchema),z.lazy(() => ReportToClauseUpsertWithWhereUniqueWithoutClauseInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportToClauseCreateManyClauseInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReportToClauseWhereUniqueInputSchema),z.lazy(() => ReportToClauseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReportToClauseWhereUniqueInputSchema),z.lazy(() => ReportToClauseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReportToClauseWhereUniqueInputSchema),z.lazy(() => ReportToClauseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReportToClauseWhereUniqueInputSchema),z.lazy(() => ReportToClauseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReportToClauseUpdateWithWhereUniqueWithoutClauseInputSchema),z.lazy(() => ReportToClauseUpdateWithWhereUniqueWithoutClauseInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReportToClauseUpdateManyWithWhereWithoutClauseInputSchema),z.lazy(() => ReportToClauseUpdateManyWithWhereWithoutClauseInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReportToClauseScalarWhereInputSchema),z.lazy(() => ReportToClauseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutReportInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutReportInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReportInputSchema),z.lazy(() => UserUncheckedCreateWithoutReportInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReportInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ReportToClauseCreateNestedManyWithoutReportInputSchema: z.ZodType<Prisma.ReportToClauseCreateNestedManyWithoutReportInput> = z.object({
  create: z.union([ z.lazy(() => ReportToClauseCreateWithoutReportInputSchema),z.lazy(() => ReportToClauseCreateWithoutReportInputSchema).array(),z.lazy(() => ReportToClauseUncheckedCreateWithoutReportInputSchema),z.lazy(() => ReportToClauseUncheckedCreateWithoutReportInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportToClauseCreateOrConnectWithoutReportInputSchema),z.lazy(() => ReportToClauseCreateOrConnectWithoutReportInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportToClauseCreateManyReportInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReportToClauseWhereUniqueInputSchema),z.lazy(() => ReportToClauseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReportToClauseUncheckedCreateNestedManyWithoutReportInputSchema: z.ZodType<Prisma.ReportToClauseUncheckedCreateNestedManyWithoutReportInput> = z.object({
  create: z.union([ z.lazy(() => ReportToClauseCreateWithoutReportInputSchema),z.lazy(() => ReportToClauseCreateWithoutReportInputSchema).array(),z.lazy(() => ReportToClauseUncheckedCreateWithoutReportInputSchema),z.lazy(() => ReportToClauseUncheckedCreateWithoutReportInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportToClauseCreateOrConnectWithoutReportInputSchema),z.lazy(() => ReportToClauseCreateOrConnectWithoutReportInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportToClauseCreateManyReportInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReportToClauseWhereUniqueInputSchema),z.lazy(() => ReportToClauseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const UserUpdateOneRequiredWithoutReportNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutReportNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReportInputSchema),z.lazy(() => UserUncheckedCreateWithoutReportInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReportInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutReportInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutReportInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReportInputSchema) ]).optional(),
}).strict();

export const ReportToClauseUpdateManyWithoutReportNestedInputSchema: z.ZodType<Prisma.ReportToClauseUpdateManyWithoutReportNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReportToClauseCreateWithoutReportInputSchema),z.lazy(() => ReportToClauseCreateWithoutReportInputSchema).array(),z.lazy(() => ReportToClauseUncheckedCreateWithoutReportInputSchema),z.lazy(() => ReportToClauseUncheckedCreateWithoutReportInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportToClauseCreateOrConnectWithoutReportInputSchema),z.lazy(() => ReportToClauseCreateOrConnectWithoutReportInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReportToClauseUpsertWithWhereUniqueWithoutReportInputSchema),z.lazy(() => ReportToClauseUpsertWithWhereUniqueWithoutReportInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportToClauseCreateManyReportInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReportToClauseWhereUniqueInputSchema),z.lazy(() => ReportToClauseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReportToClauseWhereUniqueInputSchema),z.lazy(() => ReportToClauseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReportToClauseWhereUniqueInputSchema),z.lazy(() => ReportToClauseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReportToClauseWhereUniqueInputSchema),z.lazy(() => ReportToClauseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReportToClauseUpdateWithWhereUniqueWithoutReportInputSchema),z.lazy(() => ReportToClauseUpdateWithWhereUniqueWithoutReportInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReportToClauseUpdateManyWithWhereWithoutReportInputSchema),z.lazy(() => ReportToClauseUpdateManyWithWhereWithoutReportInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReportToClauseScalarWhereInputSchema),z.lazy(() => ReportToClauseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReportToClauseUncheckedUpdateManyWithoutReportNestedInputSchema: z.ZodType<Prisma.ReportToClauseUncheckedUpdateManyWithoutReportNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReportToClauseCreateWithoutReportInputSchema),z.lazy(() => ReportToClauseCreateWithoutReportInputSchema).array(),z.lazy(() => ReportToClauseUncheckedCreateWithoutReportInputSchema),z.lazy(() => ReportToClauseUncheckedCreateWithoutReportInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportToClauseCreateOrConnectWithoutReportInputSchema),z.lazy(() => ReportToClauseCreateOrConnectWithoutReportInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ReportToClauseUpsertWithWhereUniqueWithoutReportInputSchema),z.lazy(() => ReportToClauseUpsertWithWhereUniqueWithoutReportInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportToClauseCreateManyReportInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ReportToClauseWhereUniqueInputSchema),z.lazy(() => ReportToClauseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ReportToClauseWhereUniqueInputSchema),z.lazy(() => ReportToClauseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ReportToClauseWhereUniqueInputSchema),z.lazy(() => ReportToClauseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ReportToClauseWhereUniqueInputSchema),z.lazy(() => ReportToClauseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ReportToClauseUpdateWithWhereUniqueWithoutReportInputSchema),z.lazy(() => ReportToClauseUpdateWithWhereUniqueWithoutReportInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ReportToClauseUpdateManyWithWhereWithoutReportInputSchema),z.lazy(() => ReportToClauseUpdateManyWithWhereWithoutReportInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ReportToClauseScalarWhereInputSchema),z.lazy(() => ReportToClauseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ClauseCreateNestedOneWithoutReportToClauseInputSchema: z.ZodType<Prisma.ClauseCreateNestedOneWithoutReportToClauseInput> = z.object({
  create: z.union([ z.lazy(() => ClauseCreateWithoutReportToClauseInputSchema),z.lazy(() => ClauseUncheckedCreateWithoutReportToClauseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ClauseCreateOrConnectWithoutReportToClauseInputSchema).optional(),
  connect: z.lazy(() => ClauseWhereUniqueInputSchema).optional()
}).strict();

export const ReportCreateNestedOneWithoutReportToClauseInputSchema: z.ZodType<Prisma.ReportCreateNestedOneWithoutReportToClauseInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutReportToClauseInputSchema),z.lazy(() => ReportUncheckedCreateWithoutReportToClauseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ReportCreateOrConnectWithoutReportToClauseInputSchema).optional(),
  connect: z.lazy(() => ReportWhereUniqueInputSchema).optional()
}).strict();

export const ClauseUpdateOneRequiredWithoutReportToClauseNestedInputSchema: z.ZodType<Prisma.ClauseUpdateOneRequiredWithoutReportToClauseNestedInput> = z.object({
  create: z.union([ z.lazy(() => ClauseCreateWithoutReportToClauseInputSchema),z.lazy(() => ClauseUncheckedCreateWithoutReportToClauseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ClauseCreateOrConnectWithoutReportToClauseInputSchema).optional(),
  upsert: z.lazy(() => ClauseUpsertWithoutReportToClauseInputSchema).optional(),
  connect: z.lazy(() => ClauseWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ClauseUpdateWithoutReportToClauseInputSchema),z.lazy(() => ClauseUncheckedUpdateWithoutReportToClauseInputSchema) ]).optional(),
}).strict();

export const ReportUpdateOneRequiredWithoutReportToClauseNestedInputSchema: z.ZodType<Prisma.ReportUpdateOneRequiredWithoutReportToClauseNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutReportToClauseInputSchema),z.lazy(() => ReportUncheckedCreateWithoutReportToClauseInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ReportCreateOrConnectWithoutReportToClauseInputSchema).optional(),
  upsert: z.lazy(() => ReportUpsertWithoutReportToClauseInputSchema).optional(),
  connect: z.lazy(() => ReportWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ReportUpdateWithoutReportToClauseInputSchema),z.lazy(() => ReportUncheckedUpdateWithoutReportToClauseInputSchema) ]).optional(),
}).strict();

export const ReportCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ReportCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutUserInputSchema),z.lazy(() => ReportCreateWithoutUserInputSchema).array(),z.lazy(() => ReportUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReportUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReportCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReportUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ReportUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutUserInputSchema),z.lazy(() => ReportCreateWithoutUserInputSchema).array(),z.lazy(() => ReportUncheckedCreateWithoutUserInputSchema),z.lazy(() => ReportUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ReportCreateOrConnectWithoutUserInputSchema),z.lazy(() => ReportCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ReportCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ReportWhereUniqueInputSchema),z.lazy(() => ReportWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
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

export const ReportToClauseCreateWithoutClauseInputSchema: z.ZodType<Prisma.ReportToClauseCreateWithoutClauseInput> = z.object({
  Report: z.lazy(() => ReportCreateNestedOneWithoutReportToClauseInputSchema)
}).strict();

export const ReportToClauseUncheckedCreateWithoutClauseInputSchema: z.ZodType<Prisma.ReportToClauseUncheckedCreateWithoutClauseInput> = z.object({
  reportId: z.string()
}).strict();

export const ReportToClauseCreateOrConnectWithoutClauseInputSchema: z.ZodType<Prisma.ReportToClauseCreateOrConnectWithoutClauseInput> = z.object({
  where: z.lazy(() => ReportToClauseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReportToClauseCreateWithoutClauseInputSchema),z.lazy(() => ReportToClauseUncheckedCreateWithoutClauseInputSchema) ]),
}).strict();

export const ReportToClauseCreateManyClauseInputEnvelopeSchema: z.ZodType<Prisma.ReportToClauseCreateManyClauseInputEnvelope> = z.object({
  data: z.lazy(() => ReportToClauseCreateManyClauseInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ReportToClauseUpsertWithWhereUniqueWithoutClauseInputSchema: z.ZodType<Prisma.ReportToClauseUpsertWithWhereUniqueWithoutClauseInput> = z.object({
  where: z.lazy(() => ReportToClauseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReportToClauseUpdateWithoutClauseInputSchema),z.lazy(() => ReportToClauseUncheckedUpdateWithoutClauseInputSchema) ]),
  create: z.union([ z.lazy(() => ReportToClauseCreateWithoutClauseInputSchema),z.lazy(() => ReportToClauseUncheckedCreateWithoutClauseInputSchema) ]),
}).strict();

export const ReportToClauseUpdateWithWhereUniqueWithoutClauseInputSchema: z.ZodType<Prisma.ReportToClauseUpdateWithWhereUniqueWithoutClauseInput> = z.object({
  where: z.lazy(() => ReportToClauseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReportToClauseUpdateWithoutClauseInputSchema),z.lazy(() => ReportToClauseUncheckedUpdateWithoutClauseInputSchema) ]),
}).strict();

export const ReportToClauseUpdateManyWithWhereWithoutClauseInputSchema: z.ZodType<Prisma.ReportToClauseUpdateManyWithWhereWithoutClauseInput> = z.object({
  where: z.lazy(() => ReportToClauseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReportToClauseUpdateManyMutationInputSchema),z.lazy(() => ReportToClauseUncheckedUpdateManyWithoutReportToClauseInputSchema) ]),
}).strict();

export const ReportToClauseScalarWhereInputSchema: z.ZodType<Prisma.ReportToClauseScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ReportToClauseScalarWhereInputSchema),z.lazy(() => ReportToClauseScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ReportToClauseScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ReportToClauseScalarWhereInputSchema),z.lazy(() => ReportToClauseScalarWhereInputSchema).array() ]).optional(),
  reportId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  clauseId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateWithoutReportInputSchema: z.ZodType<Prisma.UserCreateWithoutReportInput> = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().optional().nullable(),
  password: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const UserUncheckedCreateWithoutReportInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutReportInput> = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().optional().nullable(),
  password: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const UserCreateOrConnectWithoutReportInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutReportInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutReportInputSchema),z.lazy(() => UserUncheckedCreateWithoutReportInputSchema) ]),
}).strict();

export const ReportToClauseCreateWithoutReportInputSchema: z.ZodType<Prisma.ReportToClauseCreateWithoutReportInput> = z.object({
  Clause: z.lazy(() => ClauseCreateNestedOneWithoutReportToClauseInputSchema)
}).strict();

export const ReportToClauseUncheckedCreateWithoutReportInputSchema: z.ZodType<Prisma.ReportToClauseUncheckedCreateWithoutReportInput> = z.object({
  clauseId: z.string()
}).strict();

export const ReportToClauseCreateOrConnectWithoutReportInputSchema: z.ZodType<Prisma.ReportToClauseCreateOrConnectWithoutReportInput> = z.object({
  where: z.lazy(() => ReportToClauseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReportToClauseCreateWithoutReportInputSchema),z.lazy(() => ReportToClauseUncheckedCreateWithoutReportInputSchema) ]),
}).strict();

export const ReportToClauseCreateManyReportInputEnvelopeSchema: z.ZodType<Prisma.ReportToClauseCreateManyReportInputEnvelope> = z.object({
  data: z.lazy(() => ReportToClauseCreateManyReportInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutReportInputSchema: z.ZodType<Prisma.UserUpsertWithoutReportInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutReportInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReportInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutReportInputSchema),z.lazy(() => UserUncheckedCreateWithoutReportInputSchema) ]),
}).strict();

export const UserUpdateWithoutReportInputSchema: z.ZodType<Prisma.UserUpdateWithoutReportInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutReportInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutReportInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportToClauseUpsertWithWhereUniqueWithoutReportInputSchema: z.ZodType<Prisma.ReportToClauseUpsertWithWhereUniqueWithoutReportInput> = z.object({
  where: z.lazy(() => ReportToClauseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ReportToClauseUpdateWithoutReportInputSchema),z.lazy(() => ReportToClauseUncheckedUpdateWithoutReportInputSchema) ]),
  create: z.union([ z.lazy(() => ReportToClauseCreateWithoutReportInputSchema),z.lazy(() => ReportToClauseUncheckedCreateWithoutReportInputSchema) ]),
}).strict();

export const ReportToClauseUpdateWithWhereUniqueWithoutReportInputSchema: z.ZodType<Prisma.ReportToClauseUpdateWithWhereUniqueWithoutReportInput> = z.object({
  where: z.lazy(() => ReportToClauseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ReportToClauseUpdateWithoutReportInputSchema),z.lazy(() => ReportToClauseUncheckedUpdateWithoutReportInputSchema) ]),
}).strict();

export const ReportToClauseUpdateManyWithWhereWithoutReportInputSchema: z.ZodType<Prisma.ReportToClauseUpdateManyWithWhereWithoutReportInput> = z.object({
  where: z.lazy(() => ReportToClauseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ReportToClauseUpdateManyMutationInputSchema),z.lazy(() => ReportToClauseUncheckedUpdateManyWithoutReportToClauseInputSchema) ]),
}).strict();

export const ClauseCreateWithoutReportToClauseInputSchema: z.ZodType<Prisma.ClauseCreateWithoutReportToClauseInput> = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string()
}).strict();

export const ClauseUncheckedCreateWithoutReportToClauseInputSchema: z.ZodType<Prisma.ClauseUncheckedCreateWithoutReportToClauseInput> = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string()
}).strict();

export const ClauseCreateOrConnectWithoutReportToClauseInputSchema: z.ZodType<Prisma.ClauseCreateOrConnectWithoutReportToClauseInput> = z.object({
  where: z.lazy(() => ClauseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ClauseCreateWithoutReportToClauseInputSchema),z.lazy(() => ClauseUncheckedCreateWithoutReportToClauseInputSchema) ]),
}).strict();

export const ReportCreateWithoutReportToClauseInputSchema: z.ZodType<Prisma.ReportCreateWithoutReportToClauseInput> = z.object({
  id: z.string(),
  title: z.string(),
  meetDate: z.coerce.date(),
  meetLink: z.string(),
  applicantName: z.string(),
  applicantType: z.string(),
  projectStatus: z.string(),
  projectCadastralRef: z.string(),
  projectLandContact: z.string(),
  projectSpaceType: z.string(),
  projectNature: z.string(),
  projectDescription: z.string(),
  decision: z.string(),
  decisionComment: z.string(),
  contacts: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  User: z.lazy(() => UserCreateNestedOneWithoutReportInputSchema)
}).strict();

export const ReportUncheckedCreateWithoutReportToClauseInputSchema: z.ZodType<Prisma.ReportUncheckedCreateWithoutReportToClauseInput> = z.object({
  id: z.string(),
  title: z.string(),
  authorId: z.string(),
  meetDate: z.coerce.date(),
  meetLink: z.string(),
  applicantName: z.string(),
  applicantType: z.string(),
  projectStatus: z.string(),
  projectCadastralRef: z.string(),
  projectLandContact: z.string(),
  projectSpaceType: z.string(),
  projectNature: z.string(),
  projectDescription: z.string(),
  decision: z.string(),
  decisionComment: z.string(),
  contacts: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const ReportCreateOrConnectWithoutReportToClauseInputSchema: z.ZodType<Prisma.ReportCreateOrConnectWithoutReportToClauseInput> = z.object({
  where: z.lazy(() => ReportWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReportCreateWithoutReportToClauseInputSchema),z.lazy(() => ReportUncheckedCreateWithoutReportToClauseInputSchema) ]),
}).strict();

export const ClauseUpsertWithoutReportToClauseInputSchema: z.ZodType<Prisma.ClauseUpsertWithoutReportToClauseInput> = z.object({
  update: z.union([ z.lazy(() => ClauseUpdateWithoutReportToClauseInputSchema),z.lazy(() => ClauseUncheckedUpdateWithoutReportToClauseInputSchema) ]),
  create: z.union([ z.lazy(() => ClauseCreateWithoutReportToClauseInputSchema),z.lazy(() => ClauseUncheckedCreateWithoutReportToClauseInputSchema) ]),
}).strict();

export const ClauseUpdateWithoutReportToClauseInputSchema: z.ZodType<Prisma.ClauseUpdateWithoutReportToClauseInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ClauseUncheckedUpdateWithoutReportToClauseInputSchema: z.ZodType<Prisma.ClauseUncheckedUpdateWithoutReportToClauseInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportUpsertWithoutReportToClauseInputSchema: z.ZodType<Prisma.ReportUpsertWithoutReportToClauseInput> = z.object({
  update: z.union([ z.lazy(() => ReportUpdateWithoutReportToClauseInputSchema),z.lazy(() => ReportUncheckedUpdateWithoutReportToClauseInputSchema) ]),
  create: z.union([ z.lazy(() => ReportCreateWithoutReportToClauseInputSchema),z.lazy(() => ReportUncheckedCreateWithoutReportToClauseInputSchema) ]),
}).strict();

export const ReportUpdateWithoutReportToClauseInputSchema: z.ZodType<Prisma.ReportUpdateWithoutReportToClauseInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meetDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meetLink: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applicantName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applicantType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectStatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectCadastralRef: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectLandContact: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectSpaceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectNature: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  decision: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  decisionComment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contacts: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  User: z.lazy(() => UserUpdateOneRequiredWithoutReportNestedInputSchema).optional()
}).strict();

export const ReportUncheckedUpdateWithoutReportToClauseInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateWithoutReportToClauseInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  authorId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meetDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meetLink: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applicantName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applicantType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectStatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectCadastralRef: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectLandContact: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectSpaceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectNature: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  decision: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  decisionComment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contacts: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportCreateWithoutUserInputSchema: z.ZodType<Prisma.ReportCreateWithoutUserInput> = z.object({
  id: z.string(),
  title: z.string(),
  meetDate: z.coerce.date(),
  meetLink: z.string(),
  applicantName: z.string(),
  applicantType: z.string(),
  projectStatus: z.string(),
  projectCadastralRef: z.string(),
  projectLandContact: z.string(),
  projectSpaceType: z.string(),
  projectNature: z.string(),
  projectDescription: z.string(),
  decision: z.string(),
  decisionComment: z.string(),
  contacts: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ReportToClause: z.lazy(() => ReportToClauseCreateNestedManyWithoutReportInputSchema).optional()
}).strict();

export const ReportUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ReportUncheckedCreateWithoutUserInput> = z.object({
  id: z.string(),
  title: z.string(),
  meetDate: z.coerce.date(),
  meetLink: z.string(),
  applicantName: z.string(),
  applicantType: z.string(),
  projectStatus: z.string(),
  projectCadastralRef: z.string(),
  projectLandContact: z.string(),
  projectSpaceType: z.string(),
  projectNature: z.string(),
  projectDescription: z.string(),
  decision: z.string(),
  decisionComment: z.string(),
  contacts: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ReportToClause: z.lazy(() => ReportToClauseUncheckedCreateNestedManyWithoutReportInputSchema).optional()
}).strict();

export const ReportCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ReportCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ReportWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReportCreateWithoutUserInputSchema),z.lazy(() => ReportUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ReportCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ReportCreateManyUserInputEnvelope> = z.object({
  data: z.lazy(() => ReportCreateManyUserInputSchema).array(),
  skipDuplicates: z.boolean().optional()
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
  title: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  authorId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  meetDate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  meetLink: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  applicantName: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  applicantType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectStatus: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectCadastralRef: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectLandContact: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectSpaceType: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectNature: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectDescription: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  decision: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  decisionComment: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  contacts: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ReportToClauseCreateManyClauseInputSchema: z.ZodType<Prisma.ReportToClauseCreateManyClauseInput> = z.object({
  reportId: z.string()
}).strict();

export const ReportToClauseUpdateWithoutClauseInputSchema: z.ZodType<Prisma.ReportToClauseUpdateWithoutClauseInput> = z.object({
  Report: z.lazy(() => ReportUpdateOneRequiredWithoutReportToClauseNestedInputSchema).optional()
}).strict();

export const ReportToClauseUncheckedUpdateWithoutClauseInputSchema: z.ZodType<Prisma.ReportToClauseUncheckedUpdateWithoutClauseInput> = z.object({
  reportId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportToClauseUncheckedUpdateManyWithoutReportToClauseInputSchema: z.ZodType<Prisma.ReportToClauseUncheckedUpdateManyWithoutReportToClauseInput> = z.object({
  reportId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportToClauseCreateManyReportInputSchema: z.ZodType<Prisma.ReportToClauseCreateManyReportInput> = z.object({
  clauseId: z.string()
}).strict();

export const ReportToClauseUpdateWithoutReportInputSchema: z.ZodType<Prisma.ReportToClauseUpdateWithoutReportInput> = z.object({
  Clause: z.lazy(() => ClauseUpdateOneRequiredWithoutReportToClauseNestedInputSchema).optional()
}).strict();

export const ReportToClauseUncheckedUpdateWithoutReportInputSchema: z.ZodType<Prisma.ReportToClauseUncheckedUpdateWithoutReportInput> = z.object({
  clauseId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportCreateManyUserInputSchema: z.ZodType<Prisma.ReportCreateManyUserInput> = z.object({
  id: z.string(),
  title: z.string(),
  meetDate: z.coerce.date(),
  meetLink: z.string(),
  applicantName: z.string(),
  applicantType: z.string(),
  projectStatus: z.string(),
  projectCadastralRef: z.string(),
  projectLandContact: z.string(),
  projectSpaceType: z.string(),
  projectNature: z.string(),
  projectDescription: z.string(),
  decision: z.string(),
  decisionComment: z.string(),
  contacts: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date()
}).strict();

export const ReportUpdateWithoutUserInputSchema: z.ZodType<Prisma.ReportUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meetDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meetLink: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applicantName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applicantType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectStatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectCadastralRef: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectLandContact: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectSpaceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectNature: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  decision: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  decisionComment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contacts: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ReportToClause: z.lazy(() => ReportToClauseUpdateManyWithoutReportNestedInputSchema).optional()
}).strict();

export const ReportUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meetDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meetLink: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applicantName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applicantType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectStatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectCadastralRef: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectLandContact: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectSpaceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectNature: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  decision: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  decisionComment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contacts: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  ReportToClause: z.lazy(() => ReportToClauseUncheckedUpdateManyWithoutReportNestedInputSchema).optional()
}).strict();

export const ReportUncheckedUpdateManyWithoutReportInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateManyWithoutReportInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meetDate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meetLink: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applicantName: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applicantType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectStatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectCadastralRef: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectLandContact: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectSpaceType: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectNature: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectDescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  decision: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  decisionComment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contacts: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

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

export const ReportToClauseFindFirstArgsSchema: z.ZodType<Prisma.ReportToClauseFindFirstArgs> = z.object({
  select: ReportToClauseSelectSchema.optional(),
  include: ReportToClauseIncludeSchema.optional(),
  where: ReportToClauseWhereInputSchema.optional(),
  orderBy: z.union([ ReportToClauseOrderByWithRelationInputSchema.array(),ReportToClauseOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportToClauseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ReportToClauseScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.ReportToClauseFindFirstArgs>

export const ReportToClauseFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReportToClauseFindFirstOrThrowArgs> = z.object({
  select: ReportToClauseSelectSchema.optional(),
  include: ReportToClauseIncludeSchema.optional(),
  where: ReportToClauseWhereInputSchema.optional(),
  orderBy: z.union([ ReportToClauseOrderByWithRelationInputSchema.array(),ReportToClauseOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportToClauseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ReportToClauseScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.ReportToClauseFindFirstOrThrowArgs>

export const ReportToClauseFindManyArgsSchema: z.ZodType<Prisma.ReportToClauseFindManyArgs> = z.object({
  select: ReportToClauseSelectSchema.optional(),
  include: ReportToClauseIncludeSchema.optional(),
  where: ReportToClauseWhereInputSchema.optional(),
  orderBy: z.union([ ReportToClauseOrderByWithRelationInputSchema.array(),ReportToClauseOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportToClauseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ReportToClauseScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.ReportToClauseFindManyArgs>

export const ReportToClauseAggregateArgsSchema: z.ZodType<Prisma.ReportToClauseAggregateArgs> = z.object({
  where: ReportToClauseWhereInputSchema.optional(),
  orderBy: z.union([ ReportToClauseOrderByWithRelationInputSchema.array(),ReportToClauseOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportToClauseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ReportToClauseAggregateArgs>

export const ReportToClauseGroupByArgsSchema: z.ZodType<Prisma.ReportToClauseGroupByArgs> = z.object({
  where: ReportToClauseWhereInputSchema.optional(),
  orderBy: z.union([ ReportToClauseOrderByWithAggregationInputSchema.array(),ReportToClauseOrderByWithAggregationInputSchema ]).optional(),
  by: ReportToClauseScalarFieldEnumSchema.array(),
  having: ReportToClauseScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.ReportToClauseGroupByArgs>

export const ReportToClauseFindUniqueArgsSchema: z.ZodType<Prisma.ReportToClauseFindUniqueArgs> = z.object({
  select: ReportToClauseSelectSchema.optional(),
  include: ReportToClauseIncludeSchema.optional(),
  where: ReportToClauseWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ReportToClauseFindUniqueArgs>

export const ReportToClauseFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ReportToClauseFindUniqueOrThrowArgs> = z.object({
  select: ReportToClauseSelectSchema.optional(),
  include: ReportToClauseIncludeSchema.optional(),
  where: ReportToClauseWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ReportToClauseFindUniqueOrThrowArgs>

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

export const ReportToClauseCreateArgsSchema: z.ZodType<Prisma.ReportToClauseCreateArgs> = z.object({
  select: ReportToClauseSelectSchema.optional(),
  include: ReportToClauseIncludeSchema.optional(),
  data: z.union([ ReportToClauseCreateInputSchema,ReportToClauseUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.ReportToClauseCreateArgs>

export const ReportToClauseUpsertArgsSchema: z.ZodType<Prisma.ReportToClauseUpsertArgs> = z.object({
  select: ReportToClauseSelectSchema.optional(),
  include: ReportToClauseIncludeSchema.optional(),
  where: ReportToClauseWhereUniqueInputSchema,
  create: z.union([ ReportToClauseCreateInputSchema,ReportToClauseUncheckedCreateInputSchema ]),
  update: z.union([ ReportToClauseUpdateInputSchema,ReportToClauseUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.ReportToClauseUpsertArgs>

export const ReportToClauseCreateManyArgsSchema: z.ZodType<Prisma.ReportToClauseCreateManyArgs> = z.object({
  data: ReportToClauseCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.ReportToClauseCreateManyArgs>

export const ReportToClauseDeleteArgsSchema: z.ZodType<Prisma.ReportToClauseDeleteArgs> = z.object({
  select: ReportToClauseSelectSchema.optional(),
  include: ReportToClauseIncludeSchema.optional(),
  where: ReportToClauseWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ReportToClauseDeleteArgs>

export const ReportToClauseUpdateArgsSchema: z.ZodType<Prisma.ReportToClauseUpdateArgs> = z.object({
  select: ReportToClauseSelectSchema.optional(),
  include: ReportToClauseIncludeSchema.optional(),
  data: z.union([ ReportToClauseUpdateInputSchema,ReportToClauseUncheckedUpdateInputSchema ]),
  where: ReportToClauseWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.ReportToClauseUpdateArgs>

export const ReportToClauseUpdateManyArgsSchema: z.ZodType<Prisma.ReportToClauseUpdateManyArgs> = z.object({
  data: z.union([ ReportToClauseUpdateManyMutationInputSchema,ReportToClauseUncheckedUpdateManyInputSchema ]),
  where: ReportToClauseWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ReportToClauseUpdateManyArgs>

export const ReportToClauseDeleteManyArgsSchema: z.ZodType<Prisma.ReportToClauseDeleteManyArgs> = z.object({
  where: ReportToClauseWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.ReportToClauseDeleteManyArgs>

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

interface ClauseGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.ClauseArgs
  readonly type: Prisma.ClauseGetPayload<this['_A']>
}

interface ReportGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.ReportArgs
  readonly type: Prisma.ReportGetPayload<this['_A']>
}

interface ReportToClauseGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.ReportToClauseArgs
  readonly type: Prisma.ReportToClauseGetPayload<this['_A']>
}

interface UserGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.UserArgs
  readonly type: Prisma.UserGetPayload<this['_A']>
}

export const tableSchemas = {
  Clause: {
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
      new Relation("ReportToClause", "", "", "ReportToClause", "ClauseToReportToClause", "many"),
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
    z.infer<typeof ClauseCreateInputSchema>,
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
  Report: {
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
        "authorId",
        "TEXT"
      ],
      [
        "meetDate",
        "TIMESTAMP"
      ],
      [
        "meetLink",
        "TEXT"
      ],
      [
        "applicantName",
        "TEXT"
      ],
      [
        "applicantType",
        "TEXT"
      ],
      [
        "projectStatus",
        "TEXT"
      ],
      [
        "projectCadastralRef",
        "TEXT"
      ],
      [
        "projectLandContact",
        "TEXT"
      ],
      [
        "projectSpaceType",
        "TEXT"
      ],
      [
        "projectNature",
        "TEXT"
      ],
      [
        "projectDescription",
        "TEXT"
      ],
      [
        "decision",
        "TEXT"
      ],
      [
        "decisionComment",
        "TEXT"
      ],
      [
        "contacts",
        "TEXT"
      ],
      [
        "createdAt",
        "TIMESTAMP"
      ],
      [
        "updatedAt",
        "TIMESTAMP"
      ]
    ]),
    relations: [
      new Relation("User", "authorId", "id", "User", "ReportToUser", "one"),
      new Relation("ReportToClause", "", "", "ReportToClause", "ReportToReportToClause", "many"),
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
    z.infer<typeof ReportCreateInputSchema>,
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
  ReportToClause: {
    fields: new Map([
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
      new Relation("Clause", "clauseId", "id", "Clause", "ClauseToReportToClause", "one"),
      new Relation("Report", "reportId", "id", "Report", "ReportToReportToClause", "one"),
    ],
    modelSchema: (ReportToClauseCreateInputSchema as any)
      .partial()
      .or((ReportToClauseUncheckedCreateInputSchema as any).partial()),
    createSchema: ReportToClauseCreateArgsSchema,
    createManySchema: ReportToClauseCreateManyArgsSchema,
    findUniqueSchema: ReportToClauseFindUniqueArgsSchema,
    findSchema: ReportToClauseFindFirstArgsSchema,
    updateSchema: ReportToClauseUpdateArgsSchema,
    updateManySchema: ReportToClauseUpdateManyArgsSchema,
    upsertSchema: ReportToClauseUpsertArgsSchema,
    deleteSchema: ReportToClauseDeleteArgsSchema,
    deleteManySchema: ReportToClauseDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof ReportToClauseCreateInputSchema>,
    Prisma.ReportToClauseCreateArgs['data'],
    Prisma.ReportToClauseUpdateArgs['data'],
    Prisma.ReportToClauseFindFirstArgs['select'],
    Prisma.ReportToClauseFindFirstArgs['where'],
    Prisma.ReportToClauseFindUniqueArgs['where'],
    Omit<Prisma.ReportToClauseInclude, '_count'>,
    Prisma.ReportToClauseFindFirstArgs['orderBy'],
    Prisma.ReportToClauseScalarFieldEnum,
    ReportToClauseGetPayload
  >,
  User: {
    fields: new Map([
      [
        "id",
        "TEXT"
      ],
      [
        "email",
        "TEXT"
      ],
      [
        "name",
        "TEXT"
      ],
      [
        "password",
        "TEXT"
      ],
      [
        "createdAt",
        "TIMESTAMP"
      ],
      [
        "updatedAt",
        "TIMESTAMP"
      ]
    ]),
    relations: [
      new Relation("Report", "", "", "Report", "ReportToUser", "many"),
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
    z.infer<typeof UserCreateInputSchema>,
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
