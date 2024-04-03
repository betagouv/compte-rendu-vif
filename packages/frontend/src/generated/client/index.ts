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

export const ReportScalarFieldEnumSchema = z.enum(['id','title','redactedby','ownedby','createdbyid','meetdate','meetlink','applicantname','applicanttype','projectstatus','projectcadastralref','projectlandcontact','projectspacetype','projectnature','projectdescription','decision','decisioncomment','contacts','createdat','updatedat']);

export const Report_to_clauseScalarFieldEnumSchema = z.enum(['id','reportid','clauseid']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);
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
  redactedby: z.string(),
  ownedby: z.string(),
  createdbyid: z.string(),
  meetdate: z.coerce.date(),
  meetlink: z.string(),
  applicantname: z.string(),
  applicanttype: z.string(),
  projectstatus: z.string(),
  projectcadastralref: z.string(),
  projectlandcontact: z.string(),
  projectspacetype: z.string(),
  projectnature: z.string(),
  projectdescription: z.string(),
  decision: z.string(),
  decisioncomment: z.string(),
  contacts: z.string(),
  createdat: z.coerce.date(),
  updatedat: z.coerce.date(),
})

export type Report = z.infer<typeof ReportSchema>

/////////////////////////////////////////
// REPORT TO CLAUSE SCHEMA
/////////////////////////////////////////

export const Report_to_clauseSchema = z.object({
  id: z.string(),
  reportid: z.string(),
  clauseid: z.string(),
})

export type Report_to_clause = z.infer<typeof Report_to_clauseSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// CLAUSE
//------------------------------------------------------

export const ClauseSelectSchema: z.ZodType<Prisma.ClauseSelect> = z.object({
  id: z.boolean().optional(),
  label: z.boolean().optional(),
  value: z.boolean().optional(),
}).strict()

// REPORT
//------------------------------------------------------

export const ReportSelectSchema: z.ZodType<Prisma.ReportSelect> = z.object({
  id: z.boolean().optional(),
  title: z.boolean().optional(),
  redactedby: z.boolean().optional(),
  ownedby: z.boolean().optional(),
  createdbyid: z.boolean().optional(),
  meetdate: z.boolean().optional(),
  meetlink: z.boolean().optional(),
  applicantname: z.boolean().optional(),
  applicanttype: z.boolean().optional(),
  projectstatus: z.boolean().optional(),
  projectcadastralref: z.boolean().optional(),
  projectlandcontact: z.boolean().optional(),
  projectspacetype: z.boolean().optional(),
  projectnature: z.boolean().optional(),
  projectdescription: z.boolean().optional(),
  decision: z.boolean().optional(),
  decisioncomment: z.boolean().optional(),
  contacts: z.boolean().optional(),
  createdat: z.boolean().optional(),
  updatedat: z.boolean().optional(),
}).strict()

// REPORT TO CLAUSE
//------------------------------------------------------

export const Report_to_clauseSelectSchema: z.ZodType<Prisma.Report_to_clauseSelect> = z.object({
  id: z.boolean().optional(),
  reportid: z.boolean().optional(),
  clauseid: z.boolean().optional(),
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
}).strict();

export const ClauseOrderByWithRelationInputSchema: z.ZodType<Prisma.ClauseOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  label: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional()
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
  redactedby: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  ownedby: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdbyid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  meetdate: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  meetlink: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  applicantname: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  applicanttype: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectstatus: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectcadastralref: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectlandcontact: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectspacetype: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectnature: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  projectdescription: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  decision: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  decisioncomment: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  contacts: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdat: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedat: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const ReportOrderByWithRelationInputSchema: z.ZodType<Prisma.ReportOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  redactedby: z.lazy(() => SortOrderSchema).optional(),
  ownedby: z.lazy(() => SortOrderSchema).optional(),
  createdbyid: z.lazy(() => SortOrderSchema).optional(),
  meetdate: z.lazy(() => SortOrderSchema).optional(),
  meetlink: z.lazy(() => SortOrderSchema).optional(),
  applicantname: z.lazy(() => SortOrderSchema).optional(),
  applicanttype: z.lazy(() => SortOrderSchema).optional(),
  projectstatus: z.lazy(() => SortOrderSchema).optional(),
  projectcadastralref: z.lazy(() => SortOrderSchema).optional(),
  projectlandcontact: z.lazy(() => SortOrderSchema).optional(),
  projectspacetype: z.lazy(() => SortOrderSchema).optional(),
  projectnature: z.lazy(() => SortOrderSchema).optional(),
  projectdescription: z.lazy(() => SortOrderSchema).optional(),
  decision: z.lazy(() => SortOrderSchema).optional(),
  decisioncomment: z.lazy(() => SortOrderSchema).optional(),
  contacts: z.lazy(() => SortOrderSchema).optional(),
  createdat: z.lazy(() => SortOrderSchema).optional(),
  updatedat: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReportWhereUniqueInputSchema: z.ZodType<Prisma.ReportWhereUniqueInput> = z.object({
  id: z.string().optional()
}).strict();

export const ReportOrderByWithAggregationInputSchema: z.ZodType<Prisma.ReportOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  redactedby: z.lazy(() => SortOrderSchema).optional(),
  ownedby: z.lazy(() => SortOrderSchema).optional(),
  createdbyid: z.lazy(() => SortOrderSchema).optional(),
  meetdate: z.lazy(() => SortOrderSchema).optional(),
  meetlink: z.lazy(() => SortOrderSchema).optional(),
  applicantname: z.lazy(() => SortOrderSchema).optional(),
  applicanttype: z.lazy(() => SortOrderSchema).optional(),
  projectstatus: z.lazy(() => SortOrderSchema).optional(),
  projectcadastralref: z.lazy(() => SortOrderSchema).optional(),
  projectlandcontact: z.lazy(() => SortOrderSchema).optional(),
  projectspacetype: z.lazy(() => SortOrderSchema).optional(),
  projectnature: z.lazy(() => SortOrderSchema).optional(),
  projectdescription: z.lazy(() => SortOrderSchema).optional(),
  decision: z.lazy(() => SortOrderSchema).optional(),
  decisioncomment: z.lazy(() => SortOrderSchema).optional(),
  contacts: z.lazy(() => SortOrderSchema).optional(),
  createdat: z.lazy(() => SortOrderSchema).optional(),
  updatedat: z.lazy(() => SortOrderSchema).optional(),
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
  redactedby: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  ownedby: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdbyid: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  meetdate: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  meetlink: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  applicantname: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  applicanttype: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  projectstatus: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  projectcadastralref: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  projectlandcontact: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  projectspacetype: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  projectnature: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  projectdescription: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  decision: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  decisioncomment: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  contacts: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdat: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedat: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const Report_to_clauseWhereInputSchema: z.ZodType<Prisma.Report_to_clauseWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Report_to_clauseWhereInputSchema),z.lazy(() => Report_to_clauseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Report_to_clauseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Report_to_clauseWhereInputSchema),z.lazy(() => Report_to_clauseWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reportid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  clauseid: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const Report_to_clauseOrderByWithRelationInputSchema: z.ZodType<Prisma.Report_to_clauseOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportid: z.lazy(() => SortOrderSchema).optional(),
  clauseid: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Report_to_clauseWhereUniqueInputSchema: z.ZodType<Prisma.Report_to_clauseWhereUniqueInput> = z.object({
  id: z.string().optional()
}).strict();

export const Report_to_clauseOrderByWithAggregationInputSchema: z.ZodType<Prisma.Report_to_clauseOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportid: z.lazy(() => SortOrderSchema).optional(),
  clauseid: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => Report_to_clauseCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Report_to_clauseMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Report_to_clauseMinOrderByAggregateInputSchema).optional()
}).strict();

export const Report_to_clauseScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Report_to_clauseScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Report_to_clauseScalarWhereWithAggregatesInputSchema),z.lazy(() => Report_to_clauseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Report_to_clauseScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Report_to_clauseScalarWhereWithAggregatesInputSchema),z.lazy(() => Report_to_clauseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  reportid: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  clauseid: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ClauseCreateInputSchema: z.ZodType<Prisma.ClauseCreateInput> = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string()
}).strict();

export const ClauseUncheckedCreateInputSchema: z.ZodType<Prisma.ClauseUncheckedCreateInput> = z.object({
  id: z.string(),
  label: z.string(),
  value: z.string()
}).strict();

export const ClauseUpdateInputSchema: z.ZodType<Prisma.ClauseUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ClauseUncheckedUpdateInputSchema: z.ZodType<Prisma.ClauseUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  label: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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
  redactedby: z.string(),
  ownedby: z.string(),
  createdbyid: z.string(),
  meetdate: z.coerce.date(),
  meetlink: z.string(),
  applicantname: z.string(),
  applicanttype: z.string(),
  projectstatus: z.string(),
  projectcadastralref: z.string(),
  projectlandcontact: z.string(),
  projectspacetype: z.string(),
  projectnature: z.string(),
  projectdescription: z.string(),
  decision: z.string(),
  decisioncomment: z.string(),
  contacts: z.string(),
  createdat: z.coerce.date(),
  updatedat: z.coerce.date()
}).strict();

export const ReportUncheckedCreateInputSchema: z.ZodType<Prisma.ReportUncheckedCreateInput> = z.object({
  id: z.string(),
  title: z.string(),
  redactedby: z.string(),
  ownedby: z.string(),
  createdbyid: z.string(),
  meetdate: z.coerce.date(),
  meetlink: z.string(),
  applicantname: z.string(),
  applicanttype: z.string(),
  projectstatus: z.string(),
  projectcadastralref: z.string(),
  projectlandcontact: z.string(),
  projectspacetype: z.string(),
  projectnature: z.string(),
  projectdescription: z.string(),
  decision: z.string(),
  decisioncomment: z.string(),
  contacts: z.string(),
  createdat: z.coerce.date(),
  updatedat: z.coerce.date()
}).strict();

export const ReportUpdateInputSchema: z.ZodType<Prisma.ReportUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  redactedby: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownedby: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdbyid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meetdate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meetlink: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applicantname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applicanttype: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectstatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectcadastralref: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectlandcontact: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectspacetype: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectnature: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectdescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  decision: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  decisioncomment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contacts: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdat: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedat: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportUncheckedUpdateInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  redactedby: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownedby: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdbyid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meetdate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meetlink: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applicantname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applicanttype: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectstatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectcadastralref: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectlandcontact: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectspacetype: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectnature: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectdescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  decision: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  decisioncomment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contacts: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdat: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedat: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportCreateManyInputSchema: z.ZodType<Prisma.ReportCreateManyInput> = z.object({
  id: z.string(),
  title: z.string(),
  redactedby: z.string(),
  ownedby: z.string(),
  createdbyid: z.string(),
  meetdate: z.coerce.date(),
  meetlink: z.string(),
  applicantname: z.string(),
  applicanttype: z.string(),
  projectstatus: z.string(),
  projectcadastralref: z.string(),
  projectlandcontact: z.string(),
  projectspacetype: z.string(),
  projectnature: z.string(),
  projectdescription: z.string(),
  decision: z.string(),
  decisioncomment: z.string(),
  contacts: z.string(),
  createdat: z.coerce.date(),
  updatedat: z.coerce.date()
}).strict();

export const ReportUpdateManyMutationInputSchema: z.ZodType<Prisma.ReportUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  redactedby: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownedby: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdbyid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meetdate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meetlink: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applicantname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applicanttype: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectstatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectcadastralref: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectlandcontact: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectspacetype: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectnature: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectdescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  decision: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  decisioncomment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contacts: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdat: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedat: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ReportUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  title: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  redactedby: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  ownedby: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdbyid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  meetdate: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  meetlink: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applicantname: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  applicanttype: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectstatus: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectcadastralref: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectlandcontact: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectspacetype: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectnature: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  projectdescription: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  decision: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  decisioncomment: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  contacts: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdat: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedat: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Report_to_clauseCreateInputSchema: z.ZodType<Prisma.Report_to_clauseCreateInput> = z.object({
  id: z.string(),
  reportid: z.string(),
  clauseid: z.string()
}).strict();

export const Report_to_clauseUncheckedCreateInputSchema: z.ZodType<Prisma.Report_to_clauseUncheckedCreateInput> = z.object({
  id: z.string(),
  reportid: z.string(),
  clauseid: z.string()
}).strict();

export const Report_to_clauseUpdateInputSchema: z.ZodType<Prisma.Report_to_clauseUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clauseid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Report_to_clauseUncheckedUpdateInputSchema: z.ZodType<Prisma.Report_to_clauseUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clauseid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Report_to_clauseCreateManyInputSchema: z.ZodType<Prisma.Report_to_clauseCreateManyInput> = z.object({
  id: z.string(),
  reportid: z.string(),
  clauseid: z.string()
}).strict();

export const Report_to_clauseUpdateManyMutationInputSchema: z.ZodType<Prisma.Report_to_clauseUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clauseid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Report_to_clauseUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Report_to_clauseUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  clauseid: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const ReportCountOrderByAggregateInputSchema: z.ZodType<Prisma.ReportCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  redactedby: z.lazy(() => SortOrderSchema).optional(),
  ownedby: z.lazy(() => SortOrderSchema).optional(),
  createdbyid: z.lazy(() => SortOrderSchema).optional(),
  meetdate: z.lazy(() => SortOrderSchema).optional(),
  meetlink: z.lazy(() => SortOrderSchema).optional(),
  applicantname: z.lazy(() => SortOrderSchema).optional(),
  applicanttype: z.lazy(() => SortOrderSchema).optional(),
  projectstatus: z.lazy(() => SortOrderSchema).optional(),
  projectcadastralref: z.lazy(() => SortOrderSchema).optional(),
  projectlandcontact: z.lazy(() => SortOrderSchema).optional(),
  projectspacetype: z.lazy(() => SortOrderSchema).optional(),
  projectnature: z.lazy(() => SortOrderSchema).optional(),
  projectdescription: z.lazy(() => SortOrderSchema).optional(),
  decision: z.lazy(() => SortOrderSchema).optional(),
  decisioncomment: z.lazy(() => SortOrderSchema).optional(),
  contacts: z.lazy(() => SortOrderSchema).optional(),
  createdat: z.lazy(() => SortOrderSchema).optional(),
  updatedat: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReportMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ReportMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  redactedby: z.lazy(() => SortOrderSchema).optional(),
  ownedby: z.lazy(() => SortOrderSchema).optional(),
  createdbyid: z.lazy(() => SortOrderSchema).optional(),
  meetdate: z.lazy(() => SortOrderSchema).optional(),
  meetlink: z.lazy(() => SortOrderSchema).optional(),
  applicantname: z.lazy(() => SortOrderSchema).optional(),
  applicanttype: z.lazy(() => SortOrderSchema).optional(),
  projectstatus: z.lazy(() => SortOrderSchema).optional(),
  projectcadastralref: z.lazy(() => SortOrderSchema).optional(),
  projectlandcontact: z.lazy(() => SortOrderSchema).optional(),
  projectspacetype: z.lazy(() => SortOrderSchema).optional(),
  projectnature: z.lazy(() => SortOrderSchema).optional(),
  projectdescription: z.lazy(() => SortOrderSchema).optional(),
  decision: z.lazy(() => SortOrderSchema).optional(),
  decisioncomment: z.lazy(() => SortOrderSchema).optional(),
  contacts: z.lazy(() => SortOrderSchema).optional(),
  createdat: z.lazy(() => SortOrderSchema).optional(),
  updatedat: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReportMinOrderByAggregateInputSchema: z.ZodType<Prisma.ReportMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional(),
  redactedby: z.lazy(() => SortOrderSchema).optional(),
  ownedby: z.lazy(() => SortOrderSchema).optional(),
  createdbyid: z.lazy(() => SortOrderSchema).optional(),
  meetdate: z.lazy(() => SortOrderSchema).optional(),
  meetlink: z.lazy(() => SortOrderSchema).optional(),
  applicantname: z.lazy(() => SortOrderSchema).optional(),
  applicanttype: z.lazy(() => SortOrderSchema).optional(),
  projectstatus: z.lazy(() => SortOrderSchema).optional(),
  projectcadastralref: z.lazy(() => SortOrderSchema).optional(),
  projectlandcontact: z.lazy(() => SortOrderSchema).optional(),
  projectspacetype: z.lazy(() => SortOrderSchema).optional(),
  projectnature: z.lazy(() => SortOrderSchema).optional(),
  projectdescription: z.lazy(() => SortOrderSchema).optional(),
  decision: z.lazy(() => SortOrderSchema).optional(),
  decisioncomment: z.lazy(() => SortOrderSchema).optional(),
  contacts: z.lazy(() => SortOrderSchema).optional(),
  createdat: z.lazy(() => SortOrderSchema).optional(),
  updatedat: z.lazy(() => SortOrderSchema).optional()
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

export const Report_to_clauseCountOrderByAggregateInputSchema: z.ZodType<Prisma.Report_to_clauseCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportid: z.lazy(() => SortOrderSchema).optional(),
  clauseid: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Report_to_clauseMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Report_to_clauseMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportid: z.lazy(() => SortOrderSchema).optional(),
  clauseid: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Report_to_clauseMinOrderByAggregateInputSchema: z.ZodType<Prisma.Report_to_clauseMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportid: z.lazy(() => SortOrderSchema).optional(),
  clauseid: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
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

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const ClauseFindFirstArgsSchema: z.ZodType<Prisma.ClauseFindFirstArgs> = z.object({
  select: ClauseSelectSchema.optional(),
  where: ClauseWhereInputSchema.optional(),
  orderBy: z.union([ ClauseOrderByWithRelationInputSchema.array(),ClauseOrderByWithRelationInputSchema ]).optional(),
  cursor: ClauseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ClauseScalarFieldEnumSchema.array().optional(),
}).strict() 

export const ClauseFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ClauseFindFirstOrThrowArgs> = z.object({
  select: ClauseSelectSchema.optional(),
  where: ClauseWhereInputSchema.optional(),
  orderBy: z.union([ ClauseOrderByWithRelationInputSchema.array(),ClauseOrderByWithRelationInputSchema ]).optional(),
  cursor: ClauseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ClauseScalarFieldEnumSchema.array().optional(),
}).strict() 

export const ClauseFindManyArgsSchema: z.ZodType<Prisma.ClauseFindManyArgs> = z.object({
  select: ClauseSelectSchema.optional(),
  where: ClauseWhereInputSchema.optional(),
  orderBy: z.union([ ClauseOrderByWithRelationInputSchema.array(),ClauseOrderByWithRelationInputSchema ]).optional(),
  cursor: ClauseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ClauseScalarFieldEnumSchema.array().optional(),
}).strict() 

export const ClauseAggregateArgsSchema: z.ZodType<Prisma.ClauseAggregateArgs> = z.object({
  where: ClauseWhereInputSchema.optional(),
  orderBy: z.union([ ClauseOrderByWithRelationInputSchema.array(),ClauseOrderByWithRelationInputSchema ]).optional(),
  cursor: ClauseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() 

export const ClauseGroupByArgsSchema: z.ZodType<Prisma.ClauseGroupByArgs> = z.object({
  where: ClauseWhereInputSchema.optional(),
  orderBy: z.union([ ClauseOrderByWithAggregationInputSchema.array(),ClauseOrderByWithAggregationInputSchema ]).optional(),
  by: ClauseScalarFieldEnumSchema.array(),
  having: ClauseScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() 

export const ClauseFindUniqueArgsSchema: z.ZodType<Prisma.ClauseFindUniqueArgs> = z.object({
  select: ClauseSelectSchema.optional(),
  where: ClauseWhereUniqueInputSchema,
}).strict() 

export const ClauseFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ClauseFindUniqueOrThrowArgs> = z.object({
  select: ClauseSelectSchema.optional(),
  where: ClauseWhereUniqueInputSchema,
}).strict() 

export const ReportFindFirstArgsSchema: z.ZodType<Prisma.ReportFindFirstArgs> = z.object({
  select: ReportSelectSchema.optional(),
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithRelationInputSchema.array(),ReportOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ReportScalarFieldEnumSchema.array().optional(),
}).strict() 

export const ReportFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ReportFindFirstOrThrowArgs> = z.object({
  select: ReportSelectSchema.optional(),
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithRelationInputSchema.array(),ReportOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ReportScalarFieldEnumSchema.array().optional(),
}).strict() 

export const ReportFindManyArgsSchema: z.ZodType<Prisma.ReportFindManyArgs> = z.object({
  select: ReportSelectSchema.optional(),
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithRelationInputSchema.array(),ReportOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ReportScalarFieldEnumSchema.array().optional(),
}).strict() 

export const ReportAggregateArgsSchema: z.ZodType<Prisma.ReportAggregateArgs> = z.object({
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithRelationInputSchema.array(),ReportOrderByWithRelationInputSchema ]).optional(),
  cursor: ReportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() 

export const ReportGroupByArgsSchema: z.ZodType<Prisma.ReportGroupByArgs> = z.object({
  where: ReportWhereInputSchema.optional(),
  orderBy: z.union([ ReportOrderByWithAggregationInputSchema.array(),ReportOrderByWithAggregationInputSchema ]).optional(),
  by: ReportScalarFieldEnumSchema.array(),
  having: ReportScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() 

export const ReportFindUniqueArgsSchema: z.ZodType<Prisma.ReportFindUniqueArgs> = z.object({
  select: ReportSelectSchema.optional(),
  where: ReportWhereUniqueInputSchema,
}).strict() 

export const ReportFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ReportFindUniqueOrThrowArgs> = z.object({
  select: ReportSelectSchema.optional(),
  where: ReportWhereUniqueInputSchema,
}).strict() 

export const Report_to_clauseFindFirstArgsSchema: z.ZodType<Prisma.Report_to_clauseFindFirstArgs> = z.object({
  select: Report_to_clauseSelectSchema.optional(),
  where: Report_to_clauseWhereInputSchema.optional(),
  orderBy: z.union([ Report_to_clauseOrderByWithRelationInputSchema.array(),Report_to_clauseOrderByWithRelationInputSchema ]).optional(),
  cursor: Report_to_clauseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Report_to_clauseScalarFieldEnumSchema.array().optional(),
}).strict() 

export const Report_to_clauseFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Report_to_clauseFindFirstOrThrowArgs> = z.object({
  select: Report_to_clauseSelectSchema.optional(),
  where: Report_to_clauseWhereInputSchema.optional(),
  orderBy: z.union([ Report_to_clauseOrderByWithRelationInputSchema.array(),Report_to_clauseOrderByWithRelationInputSchema ]).optional(),
  cursor: Report_to_clauseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Report_to_clauseScalarFieldEnumSchema.array().optional(),
}).strict() 

export const Report_to_clauseFindManyArgsSchema: z.ZodType<Prisma.Report_to_clauseFindManyArgs> = z.object({
  select: Report_to_clauseSelectSchema.optional(),
  where: Report_to_clauseWhereInputSchema.optional(),
  orderBy: z.union([ Report_to_clauseOrderByWithRelationInputSchema.array(),Report_to_clauseOrderByWithRelationInputSchema ]).optional(),
  cursor: Report_to_clauseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Report_to_clauseScalarFieldEnumSchema.array().optional(),
}).strict() 

export const Report_to_clauseAggregateArgsSchema: z.ZodType<Prisma.Report_to_clauseAggregateArgs> = z.object({
  where: Report_to_clauseWhereInputSchema.optional(),
  orderBy: z.union([ Report_to_clauseOrderByWithRelationInputSchema.array(),Report_to_clauseOrderByWithRelationInputSchema ]).optional(),
  cursor: Report_to_clauseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() 

export const Report_to_clauseGroupByArgsSchema: z.ZodType<Prisma.Report_to_clauseGroupByArgs> = z.object({
  where: Report_to_clauseWhereInputSchema.optional(),
  orderBy: z.union([ Report_to_clauseOrderByWithAggregationInputSchema.array(),Report_to_clauseOrderByWithAggregationInputSchema ]).optional(),
  by: Report_to_clauseScalarFieldEnumSchema.array(),
  having: Report_to_clauseScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() 

export const Report_to_clauseFindUniqueArgsSchema: z.ZodType<Prisma.Report_to_clauseFindUniqueArgs> = z.object({
  select: Report_to_clauseSelectSchema.optional(),
  where: Report_to_clauseWhereUniqueInputSchema,
}).strict() 

export const Report_to_clauseFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Report_to_clauseFindUniqueOrThrowArgs> = z.object({
  select: Report_to_clauseSelectSchema.optional(),
  where: Report_to_clauseWhereUniqueInputSchema,
}).strict() 

export const ClauseCreateArgsSchema: z.ZodType<Prisma.ClauseCreateArgs> = z.object({
  select: ClauseSelectSchema.optional(),
  data: z.union([ ClauseCreateInputSchema,ClauseUncheckedCreateInputSchema ]),
}).strict() 

export const ClauseUpsertArgsSchema: z.ZodType<Prisma.ClauseUpsertArgs> = z.object({
  select: ClauseSelectSchema.optional(),
  where: ClauseWhereUniqueInputSchema,
  create: z.union([ ClauseCreateInputSchema,ClauseUncheckedCreateInputSchema ]),
  update: z.union([ ClauseUpdateInputSchema,ClauseUncheckedUpdateInputSchema ]),
}).strict() 

export const ClauseCreateManyArgsSchema: z.ZodType<Prisma.ClauseCreateManyArgs> = z.object({
  data: ClauseCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() 

export const ClauseDeleteArgsSchema: z.ZodType<Prisma.ClauseDeleteArgs> = z.object({
  select: ClauseSelectSchema.optional(),
  where: ClauseWhereUniqueInputSchema,
}).strict() 

export const ClauseUpdateArgsSchema: z.ZodType<Prisma.ClauseUpdateArgs> = z.object({
  select: ClauseSelectSchema.optional(),
  data: z.union([ ClauseUpdateInputSchema,ClauseUncheckedUpdateInputSchema ]),
  where: ClauseWhereUniqueInputSchema,
}).strict() 

export const ClauseUpdateManyArgsSchema: z.ZodType<Prisma.ClauseUpdateManyArgs> = z.object({
  data: z.union([ ClauseUpdateManyMutationInputSchema,ClauseUncheckedUpdateManyInputSchema ]),
  where: ClauseWhereInputSchema.optional(),
}).strict() 

export const ClauseDeleteManyArgsSchema: z.ZodType<Prisma.ClauseDeleteManyArgs> = z.object({
  where: ClauseWhereInputSchema.optional(),
}).strict() 

export const ReportCreateArgsSchema: z.ZodType<Prisma.ReportCreateArgs> = z.object({
  select: ReportSelectSchema.optional(),
  data: z.union([ ReportCreateInputSchema,ReportUncheckedCreateInputSchema ]),
}).strict() 

export const ReportUpsertArgsSchema: z.ZodType<Prisma.ReportUpsertArgs> = z.object({
  select: ReportSelectSchema.optional(),
  where: ReportWhereUniqueInputSchema,
  create: z.union([ ReportCreateInputSchema,ReportUncheckedCreateInputSchema ]),
  update: z.union([ ReportUpdateInputSchema,ReportUncheckedUpdateInputSchema ]),
}).strict() 

export const ReportCreateManyArgsSchema: z.ZodType<Prisma.ReportCreateManyArgs> = z.object({
  data: ReportCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() 

export const ReportDeleteArgsSchema: z.ZodType<Prisma.ReportDeleteArgs> = z.object({
  select: ReportSelectSchema.optional(),
  where: ReportWhereUniqueInputSchema,
}).strict() 

export const ReportUpdateArgsSchema: z.ZodType<Prisma.ReportUpdateArgs> = z.object({
  select: ReportSelectSchema.optional(),
  data: z.union([ ReportUpdateInputSchema,ReportUncheckedUpdateInputSchema ]),
  where: ReportWhereUniqueInputSchema,
}).strict() 

export const ReportUpdateManyArgsSchema: z.ZodType<Prisma.ReportUpdateManyArgs> = z.object({
  data: z.union([ ReportUpdateManyMutationInputSchema,ReportUncheckedUpdateManyInputSchema ]),
  where: ReportWhereInputSchema.optional(),
}).strict() 

export const ReportDeleteManyArgsSchema: z.ZodType<Prisma.ReportDeleteManyArgs> = z.object({
  where: ReportWhereInputSchema.optional(),
}).strict() 

export const Report_to_clauseCreateArgsSchema: z.ZodType<Prisma.Report_to_clauseCreateArgs> = z.object({
  select: Report_to_clauseSelectSchema.optional(),
  data: z.union([ Report_to_clauseCreateInputSchema,Report_to_clauseUncheckedCreateInputSchema ]),
}).strict() 

export const Report_to_clauseUpsertArgsSchema: z.ZodType<Prisma.Report_to_clauseUpsertArgs> = z.object({
  select: Report_to_clauseSelectSchema.optional(),
  where: Report_to_clauseWhereUniqueInputSchema,
  create: z.union([ Report_to_clauseCreateInputSchema,Report_to_clauseUncheckedCreateInputSchema ]),
  update: z.union([ Report_to_clauseUpdateInputSchema,Report_to_clauseUncheckedUpdateInputSchema ]),
}).strict() 

export const Report_to_clauseCreateManyArgsSchema: z.ZodType<Prisma.Report_to_clauseCreateManyArgs> = z.object({
  data: Report_to_clauseCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() 

export const Report_to_clauseDeleteArgsSchema: z.ZodType<Prisma.Report_to_clauseDeleteArgs> = z.object({
  select: Report_to_clauseSelectSchema.optional(),
  where: Report_to_clauseWhereUniqueInputSchema,
}).strict() 

export const Report_to_clauseUpdateArgsSchema: z.ZodType<Prisma.Report_to_clauseUpdateArgs> = z.object({
  select: Report_to_clauseSelectSchema.optional(),
  data: z.union([ Report_to_clauseUpdateInputSchema,Report_to_clauseUncheckedUpdateInputSchema ]),
  where: Report_to_clauseWhereUniqueInputSchema,
}).strict() 

export const Report_to_clauseUpdateManyArgsSchema: z.ZodType<Prisma.Report_to_clauseUpdateManyArgs> = z.object({
  data: z.union([ Report_to_clauseUpdateManyMutationInputSchema,Report_to_clauseUncheckedUpdateManyInputSchema ]),
  where: Report_to_clauseWhereInputSchema.optional(),
}).strict() 

export const Report_to_clauseDeleteManyArgsSchema: z.ZodType<Prisma.Report_to_clauseDeleteManyArgs> = z.object({
  where: Report_to_clauseWhereInputSchema.optional(),
}).strict() 

interface ClauseGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.ClauseArgs
  readonly type: Prisma.ClauseGetPayload<this['_A']>
}

interface ReportGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.ReportArgs
  readonly type: Prisma.ReportGetPayload<this['_A']>
}

interface Report_to_clauseGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.Report_to_clauseArgs
  readonly type: Prisma.Report_to_clauseGetPayload<this['_A']>
}

export const tableSchemas = {
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
    never,
    Prisma.ClauseFindFirstArgs['orderBy'],
    Prisma.ClauseScalarFieldEnum,
    ClauseGetPayload
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
        "redactedby",
        "TEXT"
      ],
      [
        "ownedby",
        "TEXT"
      ],
      [
        "createdbyid",
        "TEXT"
      ],
      [
        "meetdate",
        "TIMESTAMP"
      ],
      [
        "meetlink",
        "TEXT"
      ],
      [
        "applicantname",
        "TEXT"
      ],
      [
        "applicanttype",
        "TEXT"
      ],
      [
        "projectstatus",
        "TEXT"
      ],
      [
        "projectcadastralref",
        "TEXT"
      ],
      [
        "projectlandcontact",
        "TEXT"
      ],
      [
        "projectspacetype",
        "TEXT"
      ],
      [
        "projectnature",
        "TEXT"
      ],
      [
        "projectdescription",
        "TEXT"
      ],
      [
        "decision",
        "TEXT"
      ],
      [
        "decisioncomment",
        "TEXT"
      ],
      [
        "contacts",
        "TEXT"
      ],
      [
        "createdat",
        "TIMESTAMP"
      ],
      [
        "updatedat",
        "TIMESTAMP"
      ]
    ]),
    relations: [
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
    never,
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
        "reportid",
        "TEXT"
      ],
      [
        "clauseid",
        "TEXT"
      ]
    ]),
    relations: [
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
    z.infer<typeof Report_to_clauseCreateInputSchema>,
    Prisma.Report_to_clauseCreateArgs['data'],
    Prisma.Report_to_clauseUpdateArgs['data'],
    Prisma.Report_to_clauseFindFirstArgs['select'],
    Prisma.Report_to_clauseFindFirstArgs['where'],
    Prisma.Report_to_clauseFindUniqueArgs['where'],
    never,
    Prisma.Report_to_clauseFindFirstArgs['orderBy'],
    Prisma.Report_to_clauseScalarFieldEnum,
    Report_to_clauseGetPayload
  >,
}

export const schema = new DbSchema(tableSchemas, migrations)
export type Electric = ElectricClient<typeof schema>
