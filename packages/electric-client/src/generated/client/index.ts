import { z } from 'zod';
import type { Prisma } from './prismaClient';
import { type TableSchema, DbSchema, Relation, ElectricClient, type HKT } from 'electric-sql/client/model';
import migrations from './migrations';
import pgMigrations from './pg-migrations';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const ClauseScalarFieldEnumSchema = z.enum(['key','value','udap_id','text','hidden']);

export const Clause_v2ScalarFieldEnumSchema = z.enum(['id','key','value','position','udap_id','text']);

export const DelegationScalarFieldEnumSchema = z.enum(['createdBy','delegatedTo']);

export const Pdf_snapshotScalarFieldEnumSchema = z.enum(['id','report_id','html','report','user_id']);

export const Picture_linesScalarFieldEnumSchema = z.enum(['id','pictureId','lines','createdAt']);

export const PicturesScalarFieldEnumSchema = z.enum(['id','reportId','url','createdAt']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const ReportScalarFieldEnumSchema = z.enum(['id','title','projectDescription','redactedBy','meetDate','applicantName','applicantAddress','projectCadastralRef','projectSpaceType','decision','precisions','contacts','furtherInformation','createdBy','createdAt','serviceInstructeur','pdf','disabled','udap_id','redactedById','applicantEmail','city','zipCode']);

export const Service_instructeursScalarFieldEnumSchema = z.enum(['id','full_name','short_name','email','tel','udap_id']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const Tmp_picturesScalarFieldEnumSchema = z.enum(['id','reportId','createdAt']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UdapScalarFieldEnumSchema = z.enum(['id','department','completeCoords','visible','name','address','zipCode','city','phone','email','marianne_text','drac_text','udap_text']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','udap_id']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// CLAUSE SCHEMA
/////////////////////////////////////////

export const ClauseSchema = z.object({
  key: z.string(),
  value: z.string(),
  udap_id: z.string(),
  text: z.string(),
  hidden: z.boolean().nullable(),
})

export type Clause = z.infer<typeof ClauseSchema>

/////////////////////////////////////////
// CLAUSE V 2 SCHEMA
/////////////////////////////////////////

export const Clause_v2Schema = z.object({
  id: z.string(),
  key: z.string(),
  value: z.string(),
  position: z.number().int().gte(-2147483648).lte(2147483647).nullable(),
  udap_id: z.string().nullable(),
  text: z.string(),
})

export type Clause_v2 = z.infer<typeof Clause_v2Schema>

/////////////////////////////////////////
// DELEGATION SCHEMA
/////////////////////////////////////////

export const DelegationSchema = z.object({
  createdBy: z.string(),
  delegatedTo: z.string(),
})

export type Delegation = z.infer<typeof DelegationSchema>

/////////////////////////////////////////
// PDF SNAPSHOT SCHEMA
/////////////////////////////////////////

export const Pdf_snapshotSchema = z.object({
  id: z.string(),
  report_id: z.string().nullable(),
  html: z.string().nullable(),
  report: z.string().nullable(),
  user_id: z.string().nullable(),
})

export type Pdf_snapshot = z.infer<typeof Pdf_snapshotSchema>

/////////////////////////////////////////
// PICTURE LINES SCHEMA
/////////////////////////////////////////

export const Picture_linesSchema = z.object({
  id: z.string(),
  pictureId: z.string().nullable(),
  lines: z.string(),
  createdAt: z.coerce.date().nullable(),
})

export type Picture_lines = z.infer<typeof Picture_linesSchema>

/////////////////////////////////////////
// PICTURES SCHEMA
/////////////////////////////////////////

export const PicturesSchema = z.object({
  id: z.string(),
  reportId: z.string().nullable(),
  url: z.string().nullable(),
  createdAt: z.coerce.date().nullable(),
})

export type Pictures = z.infer<typeof PicturesSchema>

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
  redactedById: z.string().nullable(),
  applicantEmail: z.string().nullable(),
  city: z.string().nullable(),
  zipCode: z.string().nullable(),
})

export type Report = z.infer<typeof ReportSchema>

/////////////////////////////////////////
// SERVICE INSTRUCTEURS SCHEMA
/////////////////////////////////////////

export const Service_instructeursSchema = z.object({
  id: z.number().int().gte(-2147483648).lte(2147483647),
  full_name: z.string(),
  short_name: z.string(),
  email: z.string().nullable(),
  tel: z.string().nullable(),
  udap_id: z.string().nullable(),
})

export type Service_instructeurs = z.infer<typeof Service_instructeursSchema>

/////////////////////////////////////////
// TMP PICTURES SCHEMA
/////////////////////////////////////////

export const Tmp_picturesSchema = z.object({
  id: z.string(),
  reportId: z.string().nullable(),
  createdAt: z.coerce.date().nullable(),
})

export type Tmp_pictures = z.infer<typeof Tmp_picturesSchema>

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
  marianne_text: z.string().nullable(),
  drac_text: z.string().nullable(),
  udap_text: z.string().nullable(),
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

// CLAUSE
//------------------------------------------------------

export const ClauseSelectSchema: z.ZodType<Prisma.ClauseSelect> = z.object({
  key: z.boolean().optional(),
  value: z.boolean().optional(),
  udap_id: z.boolean().optional(),
  text: z.boolean().optional(),
  hidden: z.boolean().optional(),
}).strict()

// CLAUSE V 2
//------------------------------------------------------

export const Clause_v2SelectSchema: z.ZodType<Prisma.Clause_v2Select> = z.object({
  id: z.boolean().optional(),
  key: z.boolean().optional(),
  value: z.boolean().optional(),
  position: z.boolean().optional(),
  udap_id: z.boolean().optional(),
  text: z.boolean().optional(),
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

// PDF SNAPSHOT
//------------------------------------------------------

export const Pdf_snapshotSelectSchema: z.ZodType<Prisma.Pdf_snapshotSelect> = z.object({
  id: z.boolean().optional(),
  report_id: z.boolean().optional(),
  html: z.boolean().optional(),
  report: z.boolean().optional(),
  user_id: z.boolean().optional(),
}).strict()

// PICTURE LINES
//------------------------------------------------------

export const Picture_linesIncludeSchema: z.ZodType<Prisma.Picture_linesInclude> = z.object({
  pictures: z.union([z.boolean(),z.lazy(() => PicturesArgsSchema)]).optional(),
}).strict()

export const Picture_linesArgsSchema: z.ZodType<Prisma.Picture_linesArgs> = z.object({
  select: z.lazy(() => Picture_linesSelectSchema).optional(),
  include: z.lazy(() => Picture_linesIncludeSchema).optional(),
}).strict();

export const Picture_linesSelectSchema: z.ZodType<Prisma.Picture_linesSelect> = z.object({
  id: z.boolean().optional(),
  pictureId: z.boolean().optional(),
  lines: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  pictures: z.union([z.boolean(),z.lazy(() => PicturesArgsSchema)]).optional(),
}).strict()

// PICTURES
//------------------------------------------------------

export const PicturesIncludeSchema: z.ZodType<Prisma.PicturesInclude> = z.object({
  picture_lines: z.union([z.boolean(),z.lazy(() => Picture_linesFindManyArgsSchema)]).optional(),
  report: z.union([z.boolean(),z.lazy(() => ReportArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PicturesCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PicturesArgsSchema: z.ZodType<Prisma.PicturesArgs> = z.object({
  select: z.lazy(() => PicturesSelectSchema).optional(),
  include: z.lazy(() => PicturesIncludeSchema).optional(),
}).strict();

export const PicturesCountOutputTypeArgsSchema: z.ZodType<Prisma.PicturesCountOutputTypeArgs> = z.object({
  select: z.lazy(() => PicturesCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PicturesCountOutputTypeSelectSchema: z.ZodType<Prisma.PicturesCountOutputTypeSelect> = z.object({
  picture_lines: z.boolean().optional(),
}).strict();

export const PicturesSelectSchema: z.ZodType<Prisma.PicturesSelect> = z.object({
  id: z.boolean().optional(),
  reportId: z.boolean().optional(),
  url: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  picture_lines: z.union([z.boolean(),z.lazy(() => Picture_linesFindManyArgsSchema)]).optional(),
  report: z.union([z.boolean(),z.lazy(() => ReportArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PicturesCountOutputTypeArgsSchema)]).optional(),
}).strict()

// REPORT
//------------------------------------------------------

export const ReportIncludeSchema: z.ZodType<Prisma.ReportInclude> = z.object({
  pictures: z.union([z.boolean(),z.lazy(() => PicturesFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  tmp_pictures: z.union([z.boolean(),z.lazy(() => Tmp_picturesFindManyArgsSchema)]).optional(),
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
  pictures: z.boolean().optional(),
  tmp_pictures: z.boolean().optional(),
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
  redactedById: z.boolean().optional(),
  applicantEmail: z.boolean().optional(),
  city: z.boolean().optional(),
  zipCode: z.boolean().optional(),
  pictures: z.union([z.boolean(),z.lazy(() => PicturesFindManyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  tmp_pictures: z.union([z.boolean(),z.lazy(() => Tmp_picturesFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ReportCountOutputTypeArgsSchema)]).optional(),
}).strict()

// SERVICE INSTRUCTEURS
//------------------------------------------------------

export const Service_instructeursSelectSchema: z.ZodType<Prisma.Service_instructeursSelect> = z.object({
  id: z.boolean().optional(),
  full_name: z.boolean().optional(),
  short_name: z.boolean().optional(),
  email: z.boolean().optional(),
  tel: z.boolean().optional(),
  udap_id: z.boolean().optional(),
}).strict()

// TMP PICTURES
//------------------------------------------------------

export const Tmp_picturesIncludeSchema: z.ZodType<Prisma.Tmp_picturesInclude> = z.object({
  report: z.union([z.boolean(),z.lazy(() => ReportArgsSchema)]).optional(),
}).strict()

export const Tmp_picturesArgsSchema: z.ZodType<Prisma.Tmp_picturesArgs> = z.object({
  select: z.lazy(() => Tmp_picturesSelectSchema).optional(),
  include: z.lazy(() => Tmp_picturesIncludeSchema).optional(),
}).strict();

export const Tmp_picturesSelectSchema: z.ZodType<Prisma.Tmp_picturesSelect> = z.object({
  id: z.boolean().optional(),
  reportId: z.boolean().optional(),
  createdAt: z.boolean().optional(),
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
  marianne_text: z.boolean().optional(),
  drac_text: z.boolean().optional(),
  udap_text: z.boolean().optional(),
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

export const ClauseWhereInputSchema: z.ZodType<Prisma.ClauseWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ClauseWhereInputSchema),z.lazy(() => ClauseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ClauseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ClauseWhereInputSchema),z.lazy(() => ClauseWhereInputSchema).array() ]).optional(),
  key: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  udap_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  hidden: z.union([ z.lazy(() => BoolNullableFilterSchema),z.boolean() ]).optional().nullable(),
}).strict();

export const ClauseOrderByWithRelationInputSchema: z.ZodType<Prisma.ClauseOrderByWithRelationInput> = z.object({
  key: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  udap_id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  hidden: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ClauseWhereUniqueInputSchema: z.ZodType<Prisma.ClauseWhereUniqueInput> = z.object({
  key_value_udap_id: z.lazy(() => ClauseKeyValueUdap_idCompoundUniqueInputSchema).optional()
}).strict();

export const ClauseOrderByWithAggregationInputSchema: z.ZodType<Prisma.ClauseOrderByWithAggregationInput> = z.object({
  key: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  udap_id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  hidden: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ClauseCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ClauseMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ClauseMinOrderByAggregateInputSchema).optional()
}).strict();

export const ClauseScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ClauseScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ClauseScalarWhereWithAggregatesInputSchema),z.lazy(() => ClauseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ClauseScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ClauseScalarWhereWithAggregatesInputSchema),z.lazy(() => ClauseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  key: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  udap_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  text: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  hidden: z.union([ z.lazy(() => BoolNullableWithAggregatesFilterSchema),z.boolean() ]).optional().nullable(),
}).strict();

export const Clause_v2WhereInputSchema: z.ZodType<Prisma.Clause_v2WhereInput> = z.object({
  AND: z.union([ z.lazy(() => Clause_v2WhereInputSchema),z.lazy(() => Clause_v2WhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Clause_v2WhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Clause_v2WhereInputSchema),z.lazy(() => Clause_v2WhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  key: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  position: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  udap_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  text: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const Clause_v2OrderByWithRelationInputSchema: z.ZodType<Prisma.Clause_v2OrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  udap_id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Clause_v2WhereUniqueInputSchema: z.ZodType<Prisma.Clause_v2WhereUniqueInput> = z.object({
  id: z.string().optional()
}).strict();

export const Clause_v2OrderByWithAggregationInputSchema: z.ZodType<Prisma.Clause_v2OrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  udap_id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => Clause_v2CountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => Clause_v2AvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Clause_v2MaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Clause_v2MinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => Clause_v2SumOrderByAggregateInputSchema).optional()
}).strict();

export const Clause_v2ScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Clause_v2ScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Clause_v2ScalarWhereWithAggregatesInputSchema),z.lazy(() => Clause_v2ScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Clause_v2ScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Clause_v2ScalarWhereWithAggregatesInputSchema),z.lazy(() => Clause_v2ScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  key: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  value: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  position: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  udap_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  text: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
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

export const Pdf_snapshotWhereInputSchema: z.ZodType<Prisma.Pdf_snapshotWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Pdf_snapshotWhereInputSchema),z.lazy(() => Pdf_snapshotWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Pdf_snapshotWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Pdf_snapshotWhereInputSchema),z.lazy(() => Pdf_snapshotWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  report_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  html: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  report: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const Pdf_snapshotOrderByWithRelationInputSchema: z.ZodType<Prisma.Pdf_snapshotOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  report_id: z.lazy(() => SortOrderSchema).optional(),
  html: z.lazy(() => SortOrderSchema).optional(),
  report: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Pdf_snapshotWhereUniqueInputSchema: z.ZodType<Prisma.Pdf_snapshotWhereUniqueInput> = z.object({
  id: z.string().optional()
}).strict();

export const Pdf_snapshotOrderByWithAggregationInputSchema: z.ZodType<Prisma.Pdf_snapshotOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  report_id: z.lazy(() => SortOrderSchema).optional(),
  html: z.lazy(() => SortOrderSchema).optional(),
  report: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => Pdf_snapshotCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Pdf_snapshotMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Pdf_snapshotMinOrderByAggregateInputSchema).optional()
}).strict();

export const Pdf_snapshotScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Pdf_snapshotScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Pdf_snapshotScalarWhereWithAggregatesInputSchema),z.lazy(() => Pdf_snapshotScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Pdf_snapshotScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Pdf_snapshotScalarWhereWithAggregatesInputSchema),z.lazy(() => Pdf_snapshotScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  report_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  html: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  report: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  user_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const Picture_linesWhereInputSchema: z.ZodType<Prisma.Picture_linesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Picture_linesWhereInputSchema),z.lazy(() => Picture_linesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Picture_linesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Picture_linesWhereInputSchema),z.lazy(() => Picture_linesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pictureId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  lines: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  pictures: z.union([ z.lazy(() => PicturesRelationFilterSchema),z.lazy(() => PicturesWhereInputSchema) ]).optional().nullable(),
}).strict();

export const Picture_linesOrderByWithRelationInputSchema: z.ZodType<Prisma.Picture_linesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  pictureId: z.lazy(() => SortOrderSchema).optional(),
  lines: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  pictures: z.lazy(() => PicturesOrderByWithRelationInputSchema).optional()
}).strict();

export const Picture_linesWhereUniqueInputSchema: z.ZodType<Prisma.Picture_linesWhereUniqueInput> = z.object({
  id: z.string().optional()
}).strict();

export const Picture_linesOrderByWithAggregationInputSchema: z.ZodType<Prisma.Picture_linesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  pictureId: z.lazy(() => SortOrderSchema).optional(),
  lines: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => Picture_linesCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Picture_linesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Picture_linesMinOrderByAggregateInputSchema).optional()
}).strict();

export const Picture_linesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Picture_linesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Picture_linesScalarWhereWithAggregatesInputSchema),z.lazy(() => Picture_linesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Picture_linesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Picture_linesScalarWhereWithAggregatesInputSchema),z.lazy(() => Picture_linesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  pictureId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  lines: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const PicturesWhereInputSchema: z.ZodType<Prisma.PicturesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PicturesWhereInputSchema),z.lazy(() => PicturesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PicturesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PicturesWhereInputSchema),z.lazy(() => PicturesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reportId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  picture_lines: z.lazy(() => Picture_linesListRelationFilterSchema).optional(),
  report: z.union([ z.lazy(() => ReportRelationFilterSchema),z.lazy(() => ReportWhereInputSchema) ]).optional().nullable(),
}).strict();

export const PicturesOrderByWithRelationInputSchema: z.ZodType<Prisma.PicturesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportId: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  picture_lines: z.lazy(() => Picture_linesOrderByRelationAggregateInputSchema).optional(),
  report: z.lazy(() => ReportOrderByWithRelationInputSchema).optional()
}).strict();

export const PicturesWhereUniqueInputSchema: z.ZodType<Prisma.PicturesWhereUniqueInput> = z.object({
  id: z.string().optional()
}).strict();

export const PicturesOrderByWithAggregationInputSchema: z.ZodType<Prisma.PicturesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportId: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PicturesCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PicturesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PicturesMinOrderByAggregateInputSchema).optional()
}).strict();

export const PicturesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PicturesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PicturesScalarWhereWithAggregatesInputSchema),z.lazy(() => PicturesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PicturesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PicturesScalarWhereWithAggregatesInputSchema),z.lazy(() => PicturesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  reportId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
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
  redactedById: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  applicantEmail: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  city: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  zipCode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  pictures: z.lazy(() => PicturesListRelationFilterSchema).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  tmp_pictures: z.lazy(() => Tmp_picturesListRelationFilterSchema).optional()
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
  redactedById: z.lazy(() => SortOrderSchema).optional(),
  applicantEmail: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  zipCode: z.lazy(() => SortOrderSchema).optional(),
  pictures: z.lazy(() => PicturesOrderByRelationAggregateInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  tmp_pictures: z.lazy(() => Tmp_picturesOrderByRelationAggregateInputSchema).optional()
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
  redactedById: z.lazy(() => SortOrderSchema).optional(),
  applicantEmail: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  zipCode: z.lazy(() => SortOrderSchema).optional(),
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
  redactedById: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  applicantEmail: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  city: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  zipCode: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const Service_instructeursWhereInputSchema: z.ZodType<Prisma.Service_instructeursWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Service_instructeursWhereInputSchema),z.lazy(() => Service_instructeursWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Service_instructeursWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Service_instructeursWhereInputSchema),z.lazy(() => Service_instructeursWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  full_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  short_name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  tel: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  udap_id: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const Service_instructeursOrderByWithRelationInputSchema: z.ZodType<Prisma.Service_instructeursOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  full_name: z.lazy(() => SortOrderSchema).optional(),
  short_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  tel: z.lazy(() => SortOrderSchema).optional(),
  udap_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Service_instructeursWhereUniqueInputSchema: z.ZodType<Prisma.Service_instructeursWhereUniqueInput> = z.object({
  id: z.number().int().gte(-2147483648).lte(2147483647).optional()
}).strict();

export const Service_instructeursOrderByWithAggregationInputSchema: z.ZodType<Prisma.Service_instructeursOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  full_name: z.lazy(() => SortOrderSchema).optional(),
  short_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  tel: z.lazy(() => SortOrderSchema).optional(),
  udap_id: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => Service_instructeursCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => Service_instructeursAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Service_instructeursMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Service_instructeursMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => Service_instructeursSumOrderByAggregateInputSchema).optional()
}).strict();

export const Service_instructeursScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Service_instructeursScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Service_instructeursScalarWhereWithAggregatesInputSchema),z.lazy(() => Service_instructeursScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Service_instructeursScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Service_instructeursScalarWhereWithAggregatesInputSchema),z.lazy(() => Service_instructeursScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  full_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  short_name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  tel: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  udap_id: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const Tmp_picturesWhereInputSchema: z.ZodType<Prisma.Tmp_picturesWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Tmp_picturesWhereInputSchema),z.lazy(() => Tmp_picturesWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Tmp_picturesWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Tmp_picturesWhereInputSchema),z.lazy(() => Tmp_picturesWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reportId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  report: z.union([ z.lazy(() => ReportRelationFilterSchema),z.lazy(() => ReportWhereInputSchema) ]).optional().nullable(),
}).strict();

export const Tmp_picturesOrderByWithRelationInputSchema: z.ZodType<Prisma.Tmp_picturesOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  report: z.lazy(() => ReportOrderByWithRelationInputSchema).optional()
}).strict();

export const Tmp_picturesWhereUniqueInputSchema: z.ZodType<Prisma.Tmp_picturesWhereUniqueInput> = z.object({
  id: z.string().optional()
}).strict();

export const Tmp_picturesOrderByWithAggregationInputSchema: z.ZodType<Prisma.Tmp_picturesOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => Tmp_picturesCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => Tmp_picturesMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => Tmp_picturesMinOrderByAggregateInputSchema).optional()
}).strict();

export const Tmp_picturesScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.Tmp_picturesScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => Tmp_picturesScalarWhereWithAggregatesInputSchema),z.lazy(() => Tmp_picturesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => Tmp_picturesScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Tmp_picturesScalarWhereWithAggregatesInputSchema),z.lazy(() => Tmp_picturesScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  reportId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
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
  marianne_text: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  drac_text: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  udap_text: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
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
  marianne_text: z.lazy(() => SortOrderSchema).optional(),
  drac_text: z.lazy(() => SortOrderSchema).optional(),
  udap_text: z.lazy(() => SortOrderSchema).optional(),
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
  marianne_text: z.lazy(() => SortOrderSchema).optional(),
  drac_text: z.lazy(() => SortOrderSchema).optional(),
  udap_text: z.lazy(() => SortOrderSchema).optional(),
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
  marianne_text: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  drac_text: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  udap_text: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
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

export const ClauseCreateInputSchema: z.ZodType<Prisma.ClauseCreateInput> = z.object({
  key: z.string(),
  value: z.string(),
  udap_id: z.string(),
  text: z.string(),
  hidden: z.boolean().optional().nullable()
}).strict();

export const ClauseUncheckedCreateInputSchema: z.ZodType<Prisma.ClauseUncheckedCreateInput> = z.object({
  key: z.string(),
  value: z.string(),
  udap_id: z.string(),
  text: z.string(),
  hidden: z.boolean().optional().nullable()
}).strict();

export const ClauseUpdateInputSchema: z.ZodType<Prisma.ClauseUpdateInput> = z.object({
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  udap_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ClauseUncheckedUpdateInputSchema: z.ZodType<Prisma.ClauseUncheckedUpdateInput> = z.object({
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  udap_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ClauseCreateManyInputSchema: z.ZodType<Prisma.ClauseCreateManyInput> = z.object({
  key: z.string(),
  value: z.string(),
  udap_id: z.string(),
  text: z.string(),
  hidden: z.boolean().optional().nullable()
}).strict();

export const ClauseUpdateManyMutationInputSchema: z.ZodType<Prisma.ClauseUpdateManyMutationInput> = z.object({
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  udap_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ClauseUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ClauseUncheckedUpdateManyInput> = z.object({
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  udap_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  hidden: z.union([ z.boolean(),z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Clause_v2CreateInputSchema: z.ZodType<Prisma.Clause_v2CreateInput> = z.object({
  id: z.string(),
  key: z.string(),
  value: z.string(),
  position: z.number().int().gte(-2147483648).lte(2147483647).optional().nullable(),
  udap_id: z.string().optional().nullable(),
  text: z.string()
}).strict();

export const Clause_v2UncheckedCreateInputSchema: z.ZodType<Prisma.Clause_v2UncheckedCreateInput> = z.object({
  id: z.string(),
  key: z.string(),
  value: z.string(),
  position: z.number().int().gte(-2147483648).lte(2147483647).optional().nullable(),
  udap_id: z.string().optional().nullable(),
  text: z.string()
}).strict();

export const Clause_v2UpdateInputSchema: z.ZodType<Prisma.Clause_v2UpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  udap_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Clause_v2UncheckedUpdateInputSchema: z.ZodType<Prisma.Clause_v2UncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  udap_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Clause_v2CreateManyInputSchema: z.ZodType<Prisma.Clause_v2CreateManyInput> = z.object({
  id: z.string(),
  key: z.string(),
  value: z.string(),
  position: z.number().int().gte(-2147483648).lte(2147483647).optional().nullable(),
  udap_id: z.string().optional().nullable(),
  text: z.string()
}).strict();

export const Clause_v2UpdateManyMutationInputSchema: z.ZodType<Prisma.Clause_v2UpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  udap_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const Clause_v2UncheckedUpdateManyInputSchema: z.ZodType<Prisma.Clause_v2UncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  key: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  position: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  udap_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  text: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
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

export const Pdf_snapshotCreateInputSchema: z.ZodType<Prisma.Pdf_snapshotCreateInput> = z.object({
  id: z.string(),
  report_id: z.string().optional().nullable(),
  html: z.string().optional().nullable(),
  report: z.string().optional().nullable(),
  user_id: z.string().optional().nullable()
}).strict();

export const Pdf_snapshotUncheckedCreateInputSchema: z.ZodType<Prisma.Pdf_snapshotUncheckedCreateInput> = z.object({
  id: z.string(),
  report_id: z.string().optional().nullable(),
  html: z.string().optional().nullable(),
  report: z.string().optional().nullable(),
  user_id: z.string().optional().nullable()
}).strict();

export const Pdf_snapshotUpdateInputSchema: z.ZodType<Prisma.Pdf_snapshotUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  report_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  html: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  report: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Pdf_snapshotUncheckedUpdateInputSchema: z.ZodType<Prisma.Pdf_snapshotUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  report_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  html: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  report: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Pdf_snapshotCreateManyInputSchema: z.ZodType<Prisma.Pdf_snapshotCreateManyInput> = z.object({
  id: z.string(),
  report_id: z.string().optional().nullable(),
  html: z.string().optional().nullable(),
  report: z.string().optional().nullable(),
  user_id: z.string().optional().nullable()
}).strict();

export const Pdf_snapshotUpdateManyMutationInputSchema: z.ZodType<Prisma.Pdf_snapshotUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  report_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  html: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  report: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Pdf_snapshotUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Pdf_snapshotUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  report_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  html: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  report: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Picture_linesCreateInputSchema: z.ZodType<Prisma.Picture_linesCreateInput> = z.object({
  id: z.string(),
  lines: z.string(),
  createdAt: z.coerce.date().optional().nullable(),
  pictures: z.lazy(() => PicturesCreateNestedOneWithoutPicture_linesInputSchema).optional()
}).strict();

export const Picture_linesUncheckedCreateInputSchema: z.ZodType<Prisma.Picture_linesUncheckedCreateInput> = z.object({
  id: z.string(),
  pictureId: z.string().optional().nullable(),
  lines: z.string(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const Picture_linesUpdateInputSchema: z.ZodType<Prisma.Picture_linesUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pictures: z.lazy(() => PicturesUpdateOneWithoutPicture_linesNestedInputSchema).optional()
}).strict();

export const Picture_linesUncheckedUpdateInputSchema: z.ZodType<Prisma.Picture_linesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pictureId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Picture_linesCreateManyInputSchema: z.ZodType<Prisma.Picture_linesCreateManyInput> = z.object({
  id: z.string(),
  pictureId: z.string().optional().nullable(),
  lines: z.string(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const Picture_linesUpdateManyMutationInputSchema: z.ZodType<Prisma.Picture_linesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Picture_linesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Picture_linesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  pictureId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  lines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PicturesCreateInputSchema: z.ZodType<Prisma.PicturesCreateInput> = z.object({
  id: z.string(),
  url: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  picture_lines: z.lazy(() => Picture_linesCreateNestedManyWithoutPicturesInputSchema).optional(),
  report: z.lazy(() => ReportCreateNestedOneWithoutPicturesInputSchema).optional()
}).strict();

export const PicturesUncheckedCreateInputSchema: z.ZodType<Prisma.PicturesUncheckedCreateInput> = z.object({
  id: z.string(),
  reportId: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  picture_lines: z.lazy(() => Picture_linesUncheckedCreateNestedManyWithoutPicturesInputSchema).optional()
}).strict();

export const PicturesUpdateInputSchema: z.ZodType<Prisma.PicturesUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  picture_lines: z.lazy(() => Picture_linesUpdateManyWithoutPicturesNestedInputSchema).optional(),
  report: z.lazy(() => ReportUpdateOneWithoutPicturesNestedInputSchema).optional()
}).strict();

export const PicturesUncheckedUpdateInputSchema: z.ZodType<Prisma.PicturesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  picture_lines: z.lazy(() => Picture_linesUncheckedUpdateManyWithoutPicturesNestedInputSchema).optional()
}).strict();

export const PicturesCreateManyInputSchema: z.ZodType<Prisma.PicturesCreateManyInput> = z.object({
  id: z.string(),
  reportId: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const PicturesUpdateManyMutationInputSchema: z.ZodType<Prisma.PicturesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PicturesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PicturesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  redactedById: z.string().optional().nullable(),
  applicantEmail: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  pictures: z.lazy(() => PicturesCreateNestedManyWithoutReportInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutReportInputSchema),
  tmp_pictures: z.lazy(() => Tmp_picturesCreateNestedManyWithoutReportInputSchema).optional()
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
  redactedById: z.string().optional().nullable(),
  applicantEmail: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  pictures: z.lazy(() => PicturesUncheckedCreateNestedManyWithoutReportInputSchema).optional(),
  tmp_pictures: z.lazy(() => Tmp_picturesUncheckedCreateNestedManyWithoutReportInputSchema).optional()
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
  redactedById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  applicantEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zipCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pictures: z.lazy(() => PicturesUpdateManyWithoutReportNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutReportNestedInputSchema).optional(),
  tmp_pictures: z.lazy(() => Tmp_picturesUpdateManyWithoutReportNestedInputSchema).optional()
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
  redactedById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  applicantEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zipCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pictures: z.lazy(() => PicturesUncheckedUpdateManyWithoutReportNestedInputSchema).optional(),
  tmp_pictures: z.lazy(() => Tmp_picturesUncheckedUpdateManyWithoutReportNestedInputSchema).optional()
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
  udap_id: z.string().optional().nullable(),
  redactedById: z.string().optional().nullable(),
  applicantEmail: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable()
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
  redactedById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  applicantEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zipCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  redactedById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  applicantEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zipCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Service_instructeursCreateInputSchema: z.ZodType<Prisma.Service_instructeursCreateInput> = z.object({
  id: z.number().int().gte(-2147483648).lte(2147483647),
  full_name: z.string(),
  short_name: z.string(),
  email: z.string().optional().nullable(),
  tel: z.string().optional().nullable(),
  udap_id: z.string().optional().nullable()
}).strict();

export const Service_instructeursUncheckedCreateInputSchema: z.ZodType<Prisma.Service_instructeursUncheckedCreateInput> = z.object({
  id: z.number().int().gte(-2147483648).lte(2147483647),
  full_name: z.string(),
  short_name: z.string(),
  email: z.string().optional().nullable(),
  tel: z.string().optional().nullable(),
  udap_id: z.string().optional().nullable()
}).strict();

export const Service_instructeursUpdateInputSchema: z.ZodType<Prisma.Service_instructeursUpdateInput> = z.object({
  id: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  short_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tel: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  udap_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Service_instructeursUncheckedUpdateInputSchema: z.ZodType<Prisma.Service_instructeursUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  short_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tel: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  udap_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Service_instructeursCreateManyInputSchema: z.ZodType<Prisma.Service_instructeursCreateManyInput> = z.object({
  id: z.number().int().gte(-2147483648).lte(2147483647),
  full_name: z.string(),
  short_name: z.string(),
  email: z.string().optional().nullable(),
  tel: z.string().optional().nullable(),
  udap_id: z.string().optional().nullable()
}).strict();

export const Service_instructeursUpdateManyMutationInputSchema: z.ZodType<Prisma.Service_instructeursUpdateManyMutationInput> = z.object({
  id: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  short_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tel: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  udap_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Service_instructeursUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Service_instructeursUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int().gte(-2147483648).lte(2147483647),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  full_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  short_name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tel: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  udap_id: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Tmp_picturesCreateInputSchema: z.ZodType<Prisma.Tmp_picturesCreateInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional().nullable(),
  report: z.lazy(() => ReportCreateNestedOneWithoutTmp_picturesInputSchema).optional()
}).strict();

export const Tmp_picturesUncheckedCreateInputSchema: z.ZodType<Prisma.Tmp_picturesUncheckedCreateInput> = z.object({
  id: z.string(),
  reportId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const Tmp_picturesUpdateInputSchema: z.ZodType<Prisma.Tmp_picturesUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  report: z.lazy(() => ReportUpdateOneWithoutTmp_picturesNestedInputSchema).optional()
}).strict();

export const Tmp_picturesUncheckedUpdateInputSchema: z.ZodType<Prisma.Tmp_picturesUncheckedUpdateInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Tmp_picturesCreateManyInputSchema: z.ZodType<Prisma.Tmp_picturesCreateManyInput> = z.object({
  id: z.string(),
  reportId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const Tmp_picturesUpdateManyMutationInputSchema: z.ZodType<Prisma.Tmp_picturesUpdateManyMutationInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Tmp_picturesUncheckedUpdateManyInputSchema: z.ZodType<Prisma.Tmp_picturesUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  marianne_text: z.string().optional().nullable(),
  drac_text: z.string().optional().nullable(),
  udap_text: z.string().optional().nullable(),
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
  marianne_text: z.string().optional().nullable(),
  drac_text: z.string().optional().nullable(),
  udap_text: z.string().optional().nullable(),
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
  marianne_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drac_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  udap_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  marianne_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drac_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  udap_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  email: z.string().optional().nullable(),
  marianne_text: z.string().optional().nullable(),
  drac_text: z.string().optional().nullable(),
  udap_text: z.string().optional().nullable()
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
  marianne_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drac_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  udap_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  marianne_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drac_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  udap_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const ClauseKeyValueUdap_idCompoundUniqueInputSchema: z.ZodType<Prisma.ClauseKeyValueUdap_idCompoundUniqueInput> = z.object({
  key: z.string(),
  value: z.string(),
  udap_id: z.string()
}).strict();

export const ClauseCountOrderByAggregateInputSchema: z.ZodType<Prisma.ClauseCountOrderByAggregateInput> = z.object({
  key: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  udap_id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  hidden: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ClauseMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ClauseMaxOrderByAggregateInput> = z.object({
  key: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  udap_id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  hidden: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ClauseMinOrderByAggregateInputSchema: z.ZodType<Prisma.ClauseMinOrderByAggregateInput> = z.object({
  key: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  udap_id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional(),
  hidden: z.lazy(() => SortOrderSchema).optional()
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

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
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

export const Clause_v2CountOrderByAggregateInputSchema: z.ZodType<Prisma.Clause_v2CountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  udap_id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Clause_v2AvgOrderByAggregateInputSchema: z.ZodType<Prisma.Clause_v2AvgOrderByAggregateInput> = z.object({
  position: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Clause_v2MaxOrderByAggregateInputSchema: z.ZodType<Prisma.Clause_v2MaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  udap_id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Clause_v2MinOrderByAggregateInputSchema: z.ZodType<Prisma.Clause_v2MinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  key: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  position: z.lazy(() => SortOrderSchema).optional(),
  udap_id: z.lazy(() => SortOrderSchema).optional(),
  text: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Clause_v2SumOrderByAggregateInputSchema: z.ZodType<Prisma.Clause_v2SumOrderByAggregateInput> = z.object({
  position: z.lazy(() => SortOrderSchema).optional()
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

export const Pdf_snapshotCountOrderByAggregateInputSchema: z.ZodType<Prisma.Pdf_snapshotCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  report_id: z.lazy(() => SortOrderSchema).optional(),
  html: z.lazy(() => SortOrderSchema).optional(),
  report: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Pdf_snapshotMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Pdf_snapshotMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  report_id: z.lazy(() => SortOrderSchema).optional(),
  html: z.lazy(() => SortOrderSchema).optional(),
  report: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Pdf_snapshotMinOrderByAggregateInputSchema: z.ZodType<Prisma.Pdf_snapshotMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  report_id: z.lazy(() => SortOrderSchema).optional(),
  html: z.lazy(() => SortOrderSchema).optional(),
  report: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional()
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

export const PicturesRelationFilterSchema: z.ZodType<Prisma.PicturesRelationFilter> = z.object({
  is: z.lazy(() => PicturesWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => PicturesWhereInputSchema).optional().nullable()
}).strict();

export const Picture_linesCountOrderByAggregateInputSchema: z.ZodType<Prisma.Picture_linesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  pictureId: z.lazy(() => SortOrderSchema).optional(),
  lines: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Picture_linesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Picture_linesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  pictureId: z.lazy(() => SortOrderSchema).optional(),
  lines: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Picture_linesMinOrderByAggregateInputSchema: z.ZodType<Prisma.Picture_linesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  pictureId: z.lazy(() => SortOrderSchema).optional(),
  lines: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
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

export const Picture_linesListRelationFilterSchema: z.ZodType<Prisma.Picture_linesListRelationFilter> = z.object({
  every: z.lazy(() => Picture_linesWhereInputSchema).optional(),
  some: z.lazy(() => Picture_linesWhereInputSchema).optional(),
  none: z.lazy(() => Picture_linesWhereInputSchema).optional()
}).strict();

export const ReportRelationFilterSchema: z.ZodType<Prisma.ReportRelationFilter> = z.object({
  is: z.lazy(() => ReportWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ReportWhereInputSchema).optional().nullable()
}).strict();

export const Picture_linesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.Picture_linesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PicturesCountOrderByAggregateInputSchema: z.ZodType<Prisma.PicturesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportId: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PicturesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PicturesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportId: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PicturesMinOrderByAggregateInputSchema: z.ZodType<Prisma.PicturesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportId: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
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

export const PicturesListRelationFilterSchema: z.ZodType<Prisma.PicturesListRelationFilter> = z.object({
  every: z.lazy(() => PicturesWhereInputSchema).optional(),
  some: z.lazy(() => PicturesWhereInputSchema).optional(),
  none: z.lazy(() => PicturesWhereInputSchema).optional()
}).strict();

export const Tmp_picturesListRelationFilterSchema: z.ZodType<Prisma.Tmp_picturesListRelationFilter> = z.object({
  every: z.lazy(() => Tmp_picturesWhereInputSchema).optional(),
  some: z.lazy(() => Tmp_picturesWhereInputSchema).optional(),
  none: z.lazy(() => Tmp_picturesWhereInputSchema).optional()
}).strict();

export const PicturesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PicturesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Tmp_picturesOrderByRelationAggregateInputSchema: z.ZodType<Prisma.Tmp_picturesOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
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
  udap_id: z.lazy(() => SortOrderSchema).optional(),
  redactedById: z.lazy(() => SortOrderSchema).optional(),
  applicantEmail: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  zipCode: z.lazy(() => SortOrderSchema).optional()
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
  udap_id: z.lazy(() => SortOrderSchema).optional(),
  redactedById: z.lazy(() => SortOrderSchema).optional(),
  applicantEmail: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  zipCode: z.lazy(() => SortOrderSchema).optional()
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
  udap_id: z.lazy(() => SortOrderSchema).optional(),
  redactedById: z.lazy(() => SortOrderSchema).optional(),
  applicantEmail: z.lazy(() => SortOrderSchema).optional(),
  city: z.lazy(() => SortOrderSchema).optional(),
  zipCode: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ReportSumOrderByAggregateInputSchema: z.ZodType<Prisma.ReportSumOrderByAggregateInput> = z.object({
  serviceInstructeur: z.lazy(() => SortOrderSchema).optional()
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

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const Service_instructeursCountOrderByAggregateInputSchema: z.ZodType<Prisma.Service_instructeursCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  full_name: z.lazy(() => SortOrderSchema).optional(),
  short_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  tel: z.lazy(() => SortOrderSchema).optional(),
  udap_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Service_instructeursAvgOrderByAggregateInputSchema: z.ZodType<Prisma.Service_instructeursAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Service_instructeursMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Service_instructeursMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  full_name: z.lazy(() => SortOrderSchema).optional(),
  short_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  tel: z.lazy(() => SortOrderSchema).optional(),
  udap_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Service_instructeursMinOrderByAggregateInputSchema: z.ZodType<Prisma.Service_instructeursMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  full_name: z.lazy(() => SortOrderSchema).optional(),
  short_name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  tel: z.lazy(() => SortOrderSchema).optional(),
  udap_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Service_instructeursSumOrderByAggregateInputSchema: z.ZodType<Prisma.Service_instructeursSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const Tmp_picturesCountOrderByAggregateInputSchema: z.ZodType<Prisma.Tmp_picturesCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Tmp_picturesMaxOrderByAggregateInputSchema: z.ZodType<Prisma.Tmp_picturesMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const Tmp_picturesMinOrderByAggregateInputSchema: z.ZodType<Prisma.Tmp_picturesMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  reportId: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional()
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
  email: z.lazy(() => SortOrderSchema).optional(),
  marianne_text: z.lazy(() => SortOrderSchema).optional(),
  drac_text: z.lazy(() => SortOrderSchema).optional(),
  udap_text: z.lazy(() => SortOrderSchema).optional()
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
  email: z.lazy(() => SortOrderSchema).optional(),
  marianne_text: z.lazy(() => SortOrderSchema).optional(),
  drac_text: z.lazy(() => SortOrderSchema).optional(),
  udap_text: z.lazy(() => SortOrderSchema).optional()
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
  email: z.lazy(() => SortOrderSchema).optional(),
  marianne_text: z.lazy(() => SortOrderSchema).optional(),
  drac_text: z.lazy(() => SortOrderSchema).optional(),
  udap_text: z.lazy(() => SortOrderSchema).optional()
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

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional().nullable()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
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

export const PicturesCreateNestedOneWithoutPicture_linesInputSchema: z.ZodType<Prisma.PicturesCreateNestedOneWithoutPicture_linesInput> = z.object({
  create: z.union([ z.lazy(() => PicturesCreateWithoutPicture_linesInputSchema),z.lazy(() => PicturesUncheckedCreateWithoutPicture_linesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PicturesCreateOrConnectWithoutPicture_linesInputSchema).optional(),
  connect: z.lazy(() => PicturesWhereUniqueInputSchema).optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const PicturesUpdateOneWithoutPicture_linesNestedInputSchema: z.ZodType<Prisma.PicturesUpdateOneWithoutPicture_linesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PicturesCreateWithoutPicture_linesInputSchema),z.lazy(() => PicturesUncheckedCreateWithoutPicture_linesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PicturesCreateOrConnectWithoutPicture_linesInputSchema).optional(),
  upsert: z.lazy(() => PicturesUpsertWithoutPicture_linesInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => PicturesWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PicturesUpdateWithoutPicture_linesInputSchema),z.lazy(() => PicturesUncheckedUpdateWithoutPicture_linesInputSchema) ]).optional(),
}).strict();

export const Picture_linesCreateNestedManyWithoutPicturesInputSchema: z.ZodType<Prisma.Picture_linesCreateNestedManyWithoutPicturesInput> = z.object({
  create: z.union([ z.lazy(() => Picture_linesCreateWithoutPicturesInputSchema),z.lazy(() => Picture_linesCreateWithoutPicturesInputSchema).array(),z.lazy(() => Picture_linesUncheckedCreateWithoutPicturesInputSchema),z.lazy(() => Picture_linesUncheckedCreateWithoutPicturesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Picture_linesCreateOrConnectWithoutPicturesInputSchema),z.lazy(() => Picture_linesCreateOrConnectWithoutPicturesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Picture_linesCreateManyPicturesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Picture_linesWhereUniqueInputSchema),z.lazy(() => Picture_linesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ReportCreateNestedOneWithoutPicturesInputSchema: z.ZodType<Prisma.ReportCreateNestedOneWithoutPicturesInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutPicturesInputSchema),z.lazy(() => ReportUncheckedCreateWithoutPicturesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ReportCreateOrConnectWithoutPicturesInputSchema).optional(),
  connect: z.lazy(() => ReportWhereUniqueInputSchema).optional()
}).strict();

export const Picture_linesUncheckedCreateNestedManyWithoutPicturesInputSchema: z.ZodType<Prisma.Picture_linesUncheckedCreateNestedManyWithoutPicturesInput> = z.object({
  create: z.union([ z.lazy(() => Picture_linesCreateWithoutPicturesInputSchema),z.lazy(() => Picture_linesCreateWithoutPicturesInputSchema).array(),z.lazy(() => Picture_linesUncheckedCreateWithoutPicturesInputSchema),z.lazy(() => Picture_linesUncheckedCreateWithoutPicturesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Picture_linesCreateOrConnectWithoutPicturesInputSchema),z.lazy(() => Picture_linesCreateOrConnectWithoutPicturesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Picture_linesCreateManyPicturesInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Picture_linesWhereUniqueInputSchema),z.lazy(() => Picture_linesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Picture_linesUpdateManyWithoutPicturesNestedInputSchema: z.ZodType<Prisma.Picture_linesUpdateManyWithoutPicturesNestedInput> = z.object({
  create: z.union([ z.lazy(() => Picture_linesCreateWithoutPicturesInputSchema),z.lazy(() => Picture_linesCreateWithoutPicturesInputSchema).array(),z.lazy(() => Picture_linesUncheckedCreateWithoutPicturesInputSchema),z.lazy(() => Picture_linesUncheckedCreateWithoutPicturesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Picture_linesCreateOrConnectWithoutPicturesInputSchema),z.lazy(() => Picture_linesCreateOrConnectWithoutPicturesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Picture_linesUpsertWithWhereUniqueWithoutPicturesInputSchema),z.lazy(() => Picture_linesUpsertWithWhereUniqueWithoutPicturesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Picture_linesCreateManyPicturesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Picture_linesWhereUniqueInputSchema),z.lazy(() => Picture_linesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Picture_linesWhereUniqueInputSchema),z.lazy(() => Picture_linesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Picture_linesWhereUniqueInputSchema),z.lazy(() => Picture_linesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Picture_linesWhereUniqueInputSchema),z.lazy(() => Picture_linesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Picture_linesUpdateWithWhereUniqueWithoutPicturesInputSchema),z.lazy(() => Picture_linesUpdateWithWhereUniqueWithoutPicturesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Picture_linesUpdateManyWithWhereWithoutPicturesInputSchema),z.lazy(() => Picture_linesUpdateManyWithWhereWithoutPicturesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Picture_linesScalarWhereInputSchema),z.lazy(() => Picture_linesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ReportUpdateOneWithoutPicturesNestedInputSchema: z.ZodType<Prisma.ReportUpdateOneWithoutPicturesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutPicturesInputSchema),z.lazy(() => ReportUncheckedCreateWithoutPicturesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ReportCreateOrConnectWithoutPicturesInputSchema).optional(),
  upsert: z.lazy(() => ReportUpsertWithoutPicturesInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => ReportWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ReportUpdateWithoutPicturesInputSchema),z.lazy(() => ReportUncheckedUpdateWithoutPicturesInputSchema) ]).optional(),
}).strict();

export const Picture_linesUncheckedUpdateManyWithoutPicturesNestedInputSchema: z.ZodType<Prisma.Picture_linesUncheckedUpdateManyWithoutPicturesNestedInput> = z.object({
  create: z.union([ z.lazy(() => Picture_linesCreateWithoutPicturesInputSchema),z.lazy(() => Picture_linesCreateWithoutPicturesInputSchema).array(),z.lazy(() => Picture_linesUncheckedCreateWithoutPicturesInputSchema),z.lazy(() => Picture_linesUncheckedCreateWithoutPicturesInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Picture_linesCreateOrConnectWithoutPicturesInputSchema),z.lazy(() => Picture_linesCreateOrConnectWithoutPicturesInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Picture_linesUpsertWithWhereUniqueWithoutPicturesInputSchema),z.lazy(() => Picture_linesUpsertWithWhereUniqueWithoutPicturesInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Picture_linesCreateManyPicturesInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Picture_linesWhereUniqueInputSchema),z.lazy(() => Picture_linesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Picture_linesWhereUniqueInputSchema),z.lazy(() => Picture_linesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Picture_linesWhereUniqueInputSchema),z.lazy(() => Picture_linesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Picture_linesWhereUniqueInputSchema),z.lazy(() => Picture_linesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Picture_linesUpdateWithWhereUniqueWithoutPicturesInputSchema),z.lazy(() => Picture_linesUpdateWithWhereUniqueWithoutPicturesInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Picture_linesUpdateManyWithWhereWithoutPicturesInputSchema),z.lazy(() => Picture_linesUpdateManyWithWhereWithoutPicturesInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Picture_linesScalarWhereInputSchema),z.lazy(() => Picture_linesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PicturesCreateNestedManyWithoutReportInputSchema: z.ZodType<Prisma.PicturesCreateNestedManyWithoutReportInput> = z.object({
  create: z.union([ z.lazy(() => PicturesCreateWithoutReportInputSchema),z.lazy(() => PicturesCreateWithoutReportInputSchema).array(),z.lazy(() => PicturesUncheckedCreateWithoutReportInputSchema),z.lazy(() => PicturesUncheckedCreateWithoutReportInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PicturesCreateOrConnectWithoutReportInputSchema),z.lazy(() => PicturesCreateOrConnectWithoutReportInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PicturesCreateManyReportInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PicturesWhereUniqueInputSchema),z.lazy(() => PicturesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutReportInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutReportInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReportInputSchema),z.lazy(() => UserUncheckedCreateWithoutReportInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReportInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const Tmp_picturesCreateNestedManyWithoutReportInputSchema: z.ZodType<Prisma.Tmp_picturesCreateNestedManyWithoutReportInput> = z.object({
  create: z.union([ z.lazy(() => Tmp_picturesCreateWithoutReportInputSchema),z.lazy(() => Tmp_picturesCreateWithoutReportInputSchema).array(),z.lazy(() => Tmp_picturesUncheckedCreateWithoutReportInputSchema),z.lazy(() => Tmp_picturesUncheckedCreateWithoutReportInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Tmp_picturesCreateOrConnectWithoutReportInputSchema),z.lazy(() => Tmp_picturesCreateOrConnectWithoutReportInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Tmp_picturesCreateManyReportInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Tmp_picturesWhereUniqueInputSchema),z.lazy(() => Tmp_picturesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PicturesUncheckedCreateNestedManyWithoutReportInputSchema: z.ZodType<Prisma.PicturesUncheckedCreateNestedManyWithoutReportInput> = z.object({
  create: z.union([ z.lazy(() => PicturesCreateWithoutReportInputSchema),z.lazy(() => PicturesCreateWithoutReportInputSchema).array(),z.lazy(() => PicturesUncheckedCreateWithoutReportInputSchema),z.lazy(() => PicturesUncheckedCreateWithoutReportInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PicturesCreateOrConnectWithoutReportInputSchema),z.lazy(() => PicturesCreateOrConnectWithoutReportInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PicturesCreateManyReportInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PicturesWhereUniqueInputSchema),z.lazy(() => PicturesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const Tmp_picturesUncheckedCreateNestedManyWithoutReportInputSchema: z.ZodType<Prisma.Tmp_picturesUncheckedCreateNestedManyWithoutReportInput> = z.object({
  create: z.union([ z.lazy(() => Tmp_picturesCreateWithoutReportInputSchema),z.lazy(() => Tmp_picturesCreateWithoutReportInputSchema).array(),z.lazy(() => Tmp_picturesUncheckedCreateWithoutReportInputSchema),z.lazy(() => Tmp_picturesUncheckedCreateWithoutReportInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Tmp_picturesCreateOrConnectWithoutReportInputSchema),z.lazy(() => Tmp_picturesCreateOrConnectWithoutReportInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Tmp_picturesCreateManyReportInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => Tmp_picturesWhereUniqueInputSchema),z.lazy(() => Tmp_picturesWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const PicturesUpdateManyWithoutReportNestedInputSchema: z.ZodType<Prisma.PicturesUpdateManyWithoutReportNestedInput> = z.object({
  create: z.union([ z.lazy(() => PicturesCreateWithoutReportInputSchema),z.lazy(() => PicturesCreateWithoutReportInputSchema).array(),z.lazy(() => PicturesUncheckedCreateWithoutReportInputSchema),z.lazy(() => PicturesUncheckedCreateWithoutReportInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PicturesCreateOrConnectWithoutReportInputSchema),z.lazy(() => PicturesCreateOrConnectWithoutReportInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PicturesUpsertWithWhereUniqueWithoutReportInputSchema),z.lazy(() => PicturesUpsertWithWhereUniqueWithoutReportInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PicturesCreateManyReportInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PicturesWhereUniqueInputSchema),z.lazy(() => PicturesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PicturesWhereUniqueInputSchema),z.lazy(() => PicturesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PicturesWhereUniqueInputSchema),z.lazy(() => PicturesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PicturesWhereUniqueInputSchema),z.lazy(() => PicturesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PicturesUpdateWithWhereUniqueWithoutReportInputSchema),z.lazy(() => PicturesUpdateWithWhereUniqueWithoutReportInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PicturesUpdateManyWithWhereWithoutReportInputSchema),z.lazy(() => PicturesUpdateManyWithWhereWithoutReportInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PicturesScalarWhereInputSchema),z.lazy(() => PicturesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutReportNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutReportNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutReportInputSchema),z.lazy(() => UserUncheckedCreateWithoutReportInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutReportInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutReportInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutReportInputSchema),z.lazy(() => UserUncheckedUpdateWithoutReportInputSchema) ]).optional(),
}).strict();

export const Tmp_picturesUpdateManyWithoutReportNestedInputSchema: z.ZodType<Prisma.Tmp_picturesUpdateManyWithoutReportNestedInput> = z.object({
  create: z.union([ z.lazy(() => Tmp_picturesCreateWithoutReportInputSchema),z.lazy(() => Tmp_picturesCreateWithoutReportInputSchema).array(),z.lazy(() => Tmp_picturesUncheckedCreateWithoutReportInputSchema),z.lazy(() => Tmp_picturesUncheckedCreateWithoutReportInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Tmp_picturesCreateOrConnectWithoutReportInputSchema),z.lazy(() => Tmp_picturesCreateOrConnectWithoutReportInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Tmp_picturesUpsertWithWhereUniqueWithoutReportInputSchema),z.lazy(() => Tmp_picturesUpsertWithWhereUniqueWithoutReportInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Tmp_picturesCreateManyReportInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Tmp_picturesWhereUniqueInputSchema),z.lazy(() => Tmp_picturesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Tmp_picturesWhereUniqueInputSchema),z.lazy(() => Tmp_picturesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Tmp_picturesWhereUniqueInputSchema),z.lazy(() => Tmp_picturesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Tmp_picturesWhereUniqueInputSchema),z.lazy(() => Tmp_picturesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Tmp_picturesUpdateWithWhereUniqueWithoutReportInputSchema),z.lazy(() => Tmp_picturesUpdateWithWhereUniqueWithoutReportInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Tmp_picturesUpdateManyWithWhereWithoutReportInputSchema),z.lazy(() => Tmp_picturesUpdateManyWithWhereWithoutReportInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Tmp_picturesScalarWhereInputSchema),z.lazy(() => Tmp_picturesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PicturesUncheckedUpdateManyWithoutReportNestedInputSchema: z.ZodType<Prisma.PicturesUncheckedUpdateManyWithoutReportNestedInput> = z.object({
  create: z.union([ z.lazy(() => PicturesCreateWithoutReportInputSchema),z.lazy(() => PicturesCreateWithoutReportInputSchema).array(),z.lazy(() => PicturesUncheckedCreateWithoutReportInputSchema),z.lazy(() => PicturesUncheckedCreateWithoutReportInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PicturesCreateOrConnectWithoutReportInputSchema),z.lazy(() => PicturesCreateOrConnectWithoutReportInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PicturesUpsertWithWhereUniqueWithoutReportInputSchema),z.lazy(() => PicturesUpsertWithWhereUniqueWithoutReportInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PicturesCreateManyReportInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PicturesWhereUniqueInputSchema),z.lazy(() => PicturesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PicturesWhereUniqueInputSchema),z.lazy(() => PicturesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PicturesWhereUniqueInputSchema),z.lazy(() => PicturesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PicturesWhereUniqueInputSchema),z.lazy(() => PicturesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PicturesUpdateWithWhereUniqueWithoutReportInputSchema),z.lazy(() => PicturesUpdateWithWhereUniqueWithoutReportInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PicturesUpdateManyWithWhereWithoutReportInputSchema),z.lazy(() => PicturesUpdateManyWithWhereWithoutReportInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PicturesScalarWhereInputSchema),z.lazy(() => PicturesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const Tmp_picturesUncheckedUpdateManyWithoutReportNestedInputSchema: z.ZodType<Prisma.Tmp_picturesUncheckedUpdateManyWithoutReportNestedInput> = z.object({
  create: z.union([ z.lazy(() => Tmp_picturesCreateWithoutReportInputSchema),z.lazy(() => Tmp_picturesCreateWithoutReportInputSchema).array(),z.lazy(() => Tmp_picturesUncheckedCreateWithoutReportInputSchema),z.lazy(() => Tmp_picturesUncheckedCreateWithoutReportInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => Tmp_picturesCreateOrConnectWithoutReportInputSchema),z.lazy(() => Tmp_picturesCreateOrConnectWithoutReportInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => Tmp_picturesUpsertWithWhereUniqueWithoutReportInputSchema),z.lazy(() => Tmp_picturesUpsertWithWhereUniqueWithoutReportInputSchema).array() ]).optional(),
  createMany: z.lazy(() => Tmp_picturesCreateManyReportInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => Tmp_picturesWhereUniqueInputSchema),z.lazy(() => Tmp_picturesWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => Tmp_picturesWhereUniqueInputSchema),z.lazy(() => Tmp_picturesWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => Tmp_picturesWhereUniqueInputSchema),z.lazy(() => Tmp_picturesWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => Tmp_picturesWhereUniqueInputSchema),z.lazy(() => Tmp_picturesWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => Tmp_picturesUpdateWithWhereUniqueWithoutReportInputSchema),z.lazy(() => Tmp_picturesUpdateWithWhereUniqueWithoutReportInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => Tmp_picturesUpdateManyWithWhereWithoutReportInputSchema),z.lazy(() => Tmp_picturesUpdateManyWithWhereWithoutReportInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => Tmp_picturesScalarWhereInputSchema),z.lazy(() => Tmp_picturesScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const ReportCreateNestedOneWithoutTmp_picturesInputSchema: z.ZodType<Prisma.ReportCreateNestedOneWithoutTmp_picturesInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutTmp_picturesInputSchema),z.lazy(() => ReportUncheckedCreateWithoutTmp_picturesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ReportCreateOrConnectWithoutTmp_picturesInputSchema).optional(),
  connect: z.lazy(() => ReportWhereUniqueInputSchema).optional()
}).strict();

export const ReportUpdateOneWithoutTmp_picturesNestedInputSchema: z.ZodType<Prisma.ReportUpdateOneWithoutTmp_picturesNestedInput> = z.object({
  create: z.union([ z.lazy(() => ReportCreateWithoutTmp_picturesInputSchema),z.lazy(() => ReportUncheckedCreateWithoutTmp_picturesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ReportCreateOrConnectWithoutTmp_picturesInputSchema).optional(),
  upsert: z.lazy(() => ReportUpsertWithoutTmp_picturesInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => ReportWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ReportUpdateWithoutTmp_picturesInputSchema),z.lazy(() => ReportUncheckedUpdateWithoutTmp_picturesInputSchema) ]).optional(),
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

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableFilterSchema) ]).optional().nullable(),
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

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> = z.object({
  equals: z.boolean().optional().nullable(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
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

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
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

export const PicturesCreateWithoutPicture_linesInputSchema: z.ZodType<Prisma.PicturesCreateWithoutPicture_linesInput> = z.object({
  id: z.string(),
  url: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  report: z.lazy(() => ReportCreateNestedOneWithoutPicturesInputSchema).optional()
}).strict();

export const PicturesUncheckedCreateWithoutPicture_linesInputSchema: z.ZodType<Prisma.PicturesUncheckedCreateWithoutPicture_linesInput> = z.object({
  id: z.string(),
  reportId: z.string().optional().nullable(),
  url: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const PicturesCreateOrConnectWithoutPicture_linesInputSchema: z.ZodType<Prisma.PicturesCreateOrConnectWithoutPicture_linesInput> = z.object({
  where: z.lazy(() => PicturesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PicturesCreateWithoutPicture_linesInputSchema),z.lazy(() => PicturesUncheckedCreateWithoutPicture_linesInputSchema) ]),
}).strict();

export const PicturesUpsertWithoutPicture_linesInputSchema: z.ZodType<Prisma.PicturesUpsertWithoutPicture_linesInput> = z.object({
  update: z.union([ z.lazy(() => PicturesUpdateWithoutPicture_linesInputSchema),z.lazy(() => PicturesUncheckedUpdateWithoutPicture_linesInputSchema) ]),
  create: z.union([ z.lazy(() => PicturesCreateWithoutPicture_linesInputSchema),z.lazy(() => PicturesUncheckedCreateWithoutPicture_linesInputSchema) ]),
}).strict();

export const PicturesUpdateWithoutPicture_linesInputSchema: z.ZodType<Prisma.PicturesUpdateWithoutPicture_linesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  report: z.lazy(() => ReportUpdateOneWithoutPicturesNestedInputSchema).optional()
}).strict();

export const PicturesUncheckedUpdateWithoutPicture_linesInputSchema: z.ZodType<Prisma.PicturesUncheckedUpdateWithoutPicture_linesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  reportId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Picture_linesCreateWithoutPicturesInputSchema: z.ZodType<Prisma.Picture_linesCreateWithoutPicturesInput> = z.object({
  id: z.string(),
  lines: z.string(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const Picture_linesUncheckedCreateWithoutPicturesInputSchema: z.ZodType<Prisma.Picture_linesUncheckedCreateWithoutPicturesInput> = z.object({
  id: z.string(),
  lines: z.string(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const Picture_linesCreateOrConnectWithoutPicturesInputSchema: z.ZodType<Prisma.Picture_linesCreateOrConnectWithoutPicturesInput> = z.object({
  where: z.lazy(() => Picture_linesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Picture_linesCreateWithoutPicturesInputSchema),z.lazy(() => Picture_linesUncheckedCreateWithoutPicturesInputSchema) ]),
}).strict();

export const Picture_linesCreateManyPicturesInputEnvelopeSchema: z.ZodType<Prisma.Picture_linesCreateManyPicturesInputEnvelope> = z.object({
  data: z.lazy(() => Picture_linesCreateManyPicturesInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ReportCreateWithoutPicturesInputSchema: z.ZodType<Prisma.ReportCreateWithoutPicturesInput> = z.object({
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
  redactedById: z.string().optional().nullable(),
  applicantEmail: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutReportInputSchema),
  tmp_pictures: z.lazy(() => Tmp_picturesCreateNestedManyWithoutReportInputSchema).optional()
}).strict();

export const ReportUncheckedCreateWithoutPicturesInputSchema: z.ZodType<Prisma.ReportUncheckedCreateWithoutPicturesInput> = z.object({
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
  udap_id: z.string().optional().nullable(),
  redactedById: z.string().optional().nullable(),
  applicantEmail: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  tmp_pictures: z.lazy(() => Tmp_picturesUncheckedCreateNestedManyWithoutReportInputSchema).optional()
}).strict();

export const ReportCreateOrConnectWithoutPicturesInputSchema: z.ZodType<Prisma.ReportCreateOrConnectWithoutPicturesInput> = z.object({
  where: z.lazy(() => ReportWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReportCreateWithoutPicturesInputSchema),z.lazy(() => ReportUncheckedCreateWithoutPicturesInputSchema) ]),
}).strict();

export const Picture_linesUpsertWithWhereUniqueWithoutPicturesInputSchema: z.ZodType<Prisma.Picture_linesUpsertWithWhereUniqueWithoutPicturesInput> = z.object({
  where: z.lazy(() => Picture_linesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Picture_linesUpdateWithoutPicturesInputSchema),z.lazy(() => Picture_linesUncheckedUpdateWithoutPicturesInputSchema) ]),
  create: z.union([ z.lazy(() => Picture_linesCreateWithoutPicturesInputSchema),z.lazy(() => Picture_linesUncheckedCreateWithoutPicturesInputSchema) ]),
}).strict();

export const Picture_linesUpdateWithWhereUniqueWithoutPicturesInputSchema: z.ZodType<Prisma.Picture_linesUpdateWithWhereUniqueWithoutPicturesInput> = z.object({
  where: z.lazy(() => Picture_linesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Picture_linesUpdateWithoutPicturesInputSchema),z.lazy(() => Picture_linesUncheckedUpdateWithoutPicturesInputSchema) ]),
}).strict();

export const Picture_linesUpdateManyWithWhereWithoutPicturesInputSchema: z.ZodType<Prisma.Picture_linesUpdateManyWithWhereWithoutPicturesInput> = z.object({
  where: z.lazy(() => Picture_linesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Picture_linesUpdateManyMutationInputSchema),z.lazy(() => Picture_linesUncheckedUpdateManyWithoutPicture_linesInputSchema) ]),
}).strict();

export const Picture_linesScalarWhereInputSchema: z.ZodType<Prisma.Picture_linesScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Picture_linesScalarWhereInputSchema),z.lazy(() => Picture_linesScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Picture_linesScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Picture_linesScalarWhereInputSchema),z.lazy(() => Picture_linesScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  pictureId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  lines: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const ReportUpsertWithoutPicturesInputSchema: z.ZodType<Prisma.ReportUpsertWithoutPicturesInput> = z.object({
  update: z.union([ z.lazy(() => ReportUpdateWithoutPicturesInputSchema),z.lazy(() => ReportUncheckedUpdateWithoutPicturesInputSchema) ]),
  create: z.union([ z.lazy(() => ReportCreateWithoutPicturesInputSchema),z.lazy(() => ReportUncheckedCreateWithoutPicturesInputSchema) ]),
}).strict();

export const ReportUpdateWithoutPicturesInputSchema: z.ZodType<Prisma.ReportUpdateWithoutPicturesInput> = z.object({
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
  redactedById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  applicantEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zipCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutReportNestedInputSchema).optional(),
  tmp_pictures: z.lazy(() => Tmp_picturesUpdateManyWithoutReportNestedInputSchema).optional()
}).strict();

export const ReportUncheckedUpdateWithoutPicturesInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateWithoutPicturesInput> = z.object({
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
  redactedById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  applicantEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zipCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  tmp_pictures: z.lazy(() => Tmp_picturesUncheckedUpdateManyWithoutReportNestedInputSchema).optional()
}).strict();

export const PicturesCreateWithoutReportInputSchema: z.ZodType<Prisma.PicturesCreateWithoutReportInput> = z.object({
  id: z.string(),
  url: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  picture_lines: z.lazy(() => Picture_linesCreateNestedManyWithoutPicturesInputSchema).optional()
}).strict();

export const PicturesUncheckedCreateWithoutReportInputSchema: z.ZodType<Prisma.PicturesUncheckedCreateWithoutReportInput> = z.object({
  id: z.string(),
  url: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable(),
  picture_lines: z.lazy(() => Picture_linesUncheckedCreateNestedManyWithoutPicturesInputSchema).optional()
}).strict();

export const PicturesCreateOrConnectWithoutReportInputSchema: z.ZodType<Prisma.PicturesCreateOrConnectWithoutReportInput> = z.object({
  where: z.lazy(() => PicturesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PicturesCreateWithoutReportInputSchema),z.lazy(() => PicturesUncheckedCreateWithoutReportInputSchema) ]),
}).strict();

export const PicturesCreateManyReportInputEnvelopeSchema: z.ZodType<Prisma.PicturesCreateManyReportInputEnvelope> = z.object({
  data: z.lazy(() => PicturesCreateManyReportInputSchema).array(),
  skipDuplicates: z.boolean().optional()
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

export const Tmp_picturesCreateWithoutReportInputSchema: z.ZodType<Prisma.Tmp_picturesCreateWithoutReportInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const Tmp_picturesUncheckedCreateWithoutReportInputSchema: z.ZodType<Prisma.Tmp_picturesUncheckedCreateWithoutReportInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const Tmp_picturesCreateOrConnectWithoutReportInputSchema: z.ZodType<Prisma.Tmp_picturesCreateOrConnectWithoutReportInput> = z.object({
  where: z.lazy(() => Tmp_picturesWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => Tmp_picturesCreateWithoutReportInputSchema),z.lazy(() => Tmp_picturesUncheckedCreateWithoutReportInputSchema) ]),
}).strict();

export const Tmp_picturesCreateManyReportInputEnvelopeSchema: z.ZodType<Prisma.Tmp_picturesCreateManyReportInputEnvelope> = z.object({
  data: z.lazy(() => Tmp_picturesCreateManyReportInputSchema).array(),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PicturesUpsertWithWhereUniqueWithoutReportInputSchema: z.ZodType<Prisma.PicturesUpsertWithWhereUniqueWithoutReportInput> = z.object({
  where: z.lazy(() => PicturesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PicturesUpdateWithoutReportInputSchema),z.lazy(() => PicturesUncheckedUpdateWithoutReportInputSchema) ]),
  create: z.union([ z.lazy(() => PicturesCreateWithoutReportInputSchema),z.lazy(() => PicturesUncheckedCreateWithoutReportInputSchema) ]),
}).strict();

export const PicturesUpdateWithWhereUniqueWithoutReportInputSchema: z.ZodType<Prisma.PicturesUpdateWithWhereUniqueWithoutReportInput> = z.object({
  where: z.lazy(() => PicturesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PicturesUpdateWithoutReportInputSchema),z.lazy(() => PicturesUncheckedUpdateWithoutReportInputSchema) ]),
}).strict();

export const PicturesUpdateManyWithWhereWithoutReportInputSchema: z.ZodType<Prisma.PicturesUpdateManyWithWhereWithoutReportInput> = z.object({
  where: z.lazy(() => PicturesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PicturesUpdateManyMutationInputSchema),z.lazy(() => PicturesUncheckedUpdateManyWithoutPicturesInputSchema) ]),
}).strict();

export const PicturesScalarWhereInputSchema: z.ZodType<Prisma.PicturesScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PicturesScalarWhereInputSchema),z.lazy(() => PicturesScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PicturesScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PicturesScalarWhereInputSchema),z.lazy(() => PicturesScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reportId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
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

export const Tmp_picturesUpsertWithWhereUniqueWithoutReportInputSchema: z.ZodType<Prisma.Tmp_picturesUpsertWithWhereUniqueWithoutReportInput> = z.object({
  where: z.lazy(() => Tmp_picturesWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => Tmp_picturesUpdateWithoutReportInputSchema),z.lazy(() => Tmp_picturesUncheckedUpdateWithoutReportInputSchema) ]),
  create: z.union([ z.lazy(() => Tmp_picturesCreateWithoutReportInputSchema),z.lazy(() => Tmp_picturesUncheckedCreateWithoutReportInputSchema) ]),
}).strict();

export const Tmp_picturesUpdateWithWhereUniqueWithoutReportInputSchema: z.ZodType<Prisma.Tmp_picturesUpdateWithWhereUniqueWithoutReportInput> = z.object({
  where: z.lazy(() => Tmp_picturesWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => Tmp_picturesUpdateWithoutReportInputSchema),z.lazy(() => Tmp_picturesUncheckedUpdateWithoutReportInputSchema) ]),
}).strict();

export const Tmp_picturesUpdateManyWithWhereWithoutReportInputSchema: z.ZodType<Prisma.Tmp_picturesUpdateManyWithWhereWithoutReportInput> = z.object({
  where: z.lazy(() => Tmp_picturesScalarWhereInputSchema),
  data: z.union([ z.lazy(() => Tmp_picturesUpdateManyMutationInputSchema),z.lazy(() => Tmp_picturesUncheckedUpdateManyWithoutTmp_picturesInputSchema) ]),
}).strict();

export const Tmp_picturesScalarWhereInputSchema: z.ZodType<Prisma.Tmp_picturesScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => Tmp_picturesScalarWhereInputSchema),z.lazy(() => Tmp_picturesScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => Tmp_picturesScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => Tmp_picturesScalarWhereInputSchema),z.lazy(() => Tmp_picturesScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  reportId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const ReportCreateWithoutTmp_picturesInputSchema: z.ZodType<Prisma.ReportCreateWithoutTmp_picturesInput> = z.object({
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
  redactedById: z.string().optional().nullable(),
  applicantEmail: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  pictures: z.lazy(() => PicturesCreateNestedManyWithoutReportInputSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutReportInputSchema)
}).strict();

export const ReportUncheckedCreateWithoutTmp_picturesInputSchema: z.ZodType<Prisma.ReportUncheckedCreateWithoutTmp_picturesInput> = z.object({
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
  udap_id: z.string().optional().nullable(),
  redactedById: z.string().optional().nullable(),
  applicantEmail: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  pictures: z.lazy(() => PicturesUncheckedCreateNestedManyWithoutReportInputSchema).optional()
}).strict();

export const ReportCreateOrConnectWithoutTmp_picturesInputSchema: z.ZodType<Prisma.ReportCreateOrConnectWithoutTmp_picturesInput> = z.object({
  where: z.lazy(() => ReportWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ReportCreateWithoutTmp_picturesInputSchema),z.lazy(() => ReportUncheckedCreateWithoutTmp_picturesInputSchema) ]),
}).strict();

export const ReportUpsertWithoutTmp_picturesInputSchema: z.ZodType<Prisma.ReportUpsertWithoutTmp_picturesInput> = z.object({
  update: z.union([ z.lazy(() => ReportUpdateWithoutTmp_picturesInputSchema),z.lazy(() => ReportUncheckedUpdateWithoutTmp_picturesInputSchema) ]),
  create: z.union([ z.lazy(() => ReportCreateWithoutTmp_picturesInputSchema),z.lazy(() => ReportUncheckedCreateWithoutTmp_picturesInputSchema) ]),
}).strict();

export const ReportUpdateWithoutTmp_picturesInputSchema: z.ZodType<Prisma.ReportUpdateWithoutTmp_picturesInput> = z.object({
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
  redactedById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  applicantEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zipCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pictures: z.lazy(() => PicturesUpdateManyWithoutReportNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutReportNestedInputSchema).optional()
}).strict();

export const ReportUncheckedUpdateWithoutTmp_picturesInputSchema: z.ZodType<Prisma.ReportUncheckedUpdateWithoutTmp_picturesInput> = z.object({
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
  redactedById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  applicantEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zipCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pictures: z.lazy(() => PicturesUncheckedUpdateManyWithoutReportNestedInputSchema).optional()
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
  redactedById: z.string().optional().nullable(),
  applicantEmail: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  pictures: z.lazy(() => PicturesCreateNestedManyWithoutReportInputSchema).optional(),
  tmp_pictures: z.lazy(() => Tmp_picturesCreateNestedManyWithoutReportInputSchema).optional()
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
  redactedById: z.string().optional().nullable(),
  applicantEmail: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable(),
  pictures: z.lazy(() => PicturesUncheckedCreateNestedManyWithoutReportInputSchema).optional(),
  tmp_pictures: z.lazy(() => Tmp_picturesUncheckedCreateNestedManyWithoutReportInputSchema).optional()
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
  email: z.string().optional().nullable(),
  marianne_text: z.string().optional().nullable(),
  drac_text: z.string().optional().nullable(),
  udap_text: z.string().optional().nullable()
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
  email: z.string().optional().nullable(),
  marianne_text: z.string().optional().nullable(),
  drac_text: z.string().optional().nullable(),
  udap_text: z.string().optional().nullable()
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
  redactedById: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  applicantEmail: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  city: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  zipCode: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
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
  marianne_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drac_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  udap_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  marianne_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  drac_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  udap_text: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Picture_linesCreateManyPicturesInputSchema: z.ZodType<Prisma.Picture_linesCreateManyPicturesInput> = z.object({
  id: z.string(),
  lines: z.string(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const Picture_linesUpdateWithoutPicturesInputSchema: z.ZodType<Prisma.Picture_linesUpdateWithoutPicturesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Picture_linesUncheckedUpdateWithoutPicturesInputSchema: z.ZodType<Prisma.Picture_linesUncheckedUpdateWithoutPicturesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Picture_linesUncheckedUpdateManyWithoutPicture_linesInputSchema: z.ZodType<Prisma.Picture_linesUncheckedUpdateManyWithoutPicture_linesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  lines: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PicturesCreateManyReportInputSchema: z.ZodType<Prisma.PicturesCreateManyReportInput> = z.object({
  id: z.string(),
  url: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const Tmp_picturesCreateManyReportInputSchema: z.ZodType<Prisma.Tmp_picturesCreateManyReportInput> = z.object({
  id: z.string(),
  createdAt: z.coerce.date().optional().nullable()
}).strict();

export const PicturesUpdateWithoutReportInputSchema: z.ZodType<Prisma.PicturesUpdateWithoutReportInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  picture_lines: z.lazy(() => Picture_linesUpdateManyWithoutPicturesNestedInputSchema).optional()
}).strict();

export const PicturesUncheckedUpdateWithoutReportInputSchema: z.ZodType<Prisma.PicturesUncheckedUpdateWithoutReportInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  picture_lines: z.lazy(() => Picture_linesUncheckedUpdateManyWithoutPicturesNestedInputSchema).optional()
}).strict();

export const PicturesUncheckedUpdateManyWithoutPicturesInputSchema: z.ZodType<Prisma.PicturesUncheckedUpdateManyWithoutPicturesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Tmp_picturesUpdateWithoutReportInputSchema: z.ZodType<Prisma.Tmp_picturesUpdateWithoutReportInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Tmp_picturesUncheckedUpdateWithoutReportInputSchema: z.ZodType<Prisma.Tmp_picturesUncheckedUpdateWithoutReportInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const Tmp_picturesUncheckedUpdateManyWithoutTmp_picturesInputSchema: z.ZodType<Prisma.Tmp_picturesUncheckedUpdateManyWithoutTmp_picturesInput> = z.object({
  id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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
  udap_id: z.string().optional().nullable(),
  redactedById: z.string().optional().nullable(),
  applicantEmail: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  zipCode: z.string().optional().nullable()
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
  redactedById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  applicantEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zipCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pictures: z.lazy(() => PicturesUpdateManyWithoutReportNestedInputSchema).optional(),
  tmp_pictures: z.lazy(() => Tmp_picturesUpdateManyWithoutReportNestedInputSchema).optional()
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
  redactedById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  applicantEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zipCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  pictures: z.lazy(() => PicturesUncheckedUpdateManyWithoutReportNestedInputSchema).optional(),
  tmp_pictures: z.lazy(() => Tmp_picturesUncheckedUpdateManyWithoutReportNestedInputSchema).optional()
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
  redactedById: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  applicantEmail: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  city: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  zipCode: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
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

export const Clause_v2FindFirstArgsSchema: z.ZodType<Prisma.Clause_v2FindFirstArgs> = z.object({
  select: Clause_v2SelectSchema.optional(),
  where: Clause_v2WhereInputSchema.optional(),
  orderBy: z.union([ Clause_v2OrderByWithRelationInputSchema.array(),Clause_v2OrderByWithRelationInputSchema ]).optional(),
  cursor: Clause_v2WhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Clause_v2ScalarFieldEnumSchema.array().optional(),
}).strict() 

export const Clause_v2FindFirstOrThrowArgsSchema: z.ZodType<Prisma.Clause_v2FindFirstOrThrowArgs> = z.object({
  select: Clause_v2SelectSchema.optional(),
  where: Clause_v2WhereInputSchema.optional(),
  orderBy: z.union([ Clause_v2OrderByWithRelationInputSchema.array(),Clause_v2OrderByWithRelationInputSchema ]).optional(),
  cursor: Clause_v2WhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Clause_v2ScalarFieldEnumSchema.array().optional(),
}).strict() 

export const Clause_v2FindManyArgsSchema: z.ZodType<Prisma.Clause_v2FindManyArgs> = z.object({
  select: Clause_v2SelectSchema.optional(),
  where: Clause_v2WhereInputSchema.optional(),
  orderBy: z.union([ Clause_v2OrderByWithRelationInputSchema.array(),Clause_v2OrderByWithRelationInputSchema ]).optional(),
  cursor: Clause_v2WhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Clause_v2ScalarFieldEnumSchema.array().optional(),
}).strict() 

export const Clause_v2AggregateArgsSchema: z.ZodType<Prisma.Clause_v2AggregateArgs> = z.object({
  where: Clause_v2WhereInputSchema.optional(),
  orderBy: z.union([ Clause_v2OrderByWithRelationInputSchema.array(),Clause_v2OrderByWithRelationInputSchema ]).optional(),
  cursor: Clause_v2WhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() 

export const Clause_v2GroupByArgsSchema: z.ZodType<Prisma.Clause_v2GroupByArgs> = z.object({
  where: Clause_v2WhereInputSchema.optional(),
  orderBy: z.union([ Clause_v2OrderByWithAggregationInputSchema.array(),Clause_v2OrderByWithAggregationInputSchema ]).optional(),
  by: Clause_v2ScalarFieldEnumSchema.array(),
  having: Clause_v2ScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() 

export const Clause_v2FindUniqueArgsSchema: z.ZodType<Prisma.Clause_v2FindUniqueArgs> = z.object({
  select: Clause_v2SelectSchema.optional(),
  where: Clause_v2WhereUniqueInputSchema,
}).strict() 

export const Clause_v2FindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Clause_v2FindUniqueOrThrowArgs> = z.object({
  select: Clause_v2SelectSchema.optional(),
  where: Clause_v2WhereUniqueInputSchema,
}).strict() 

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

export const Pdf_snapshotFindFirstArgsSchema: z.ZodType<Prisma.Pdf_snapshotFindFirstArgs> = z.object({
  select: Pdf_snapshotSelectSchema.optional(),
  where: Pdf_snapshotWhereInputSchema.optional(),
  orderBy: z.union([ Pdf_snapshotOrderByWithRelationInputSchema.array(),Pdf_snapshotOrderByWithRelationInputSchema ]).optional(),
  cursor: Pdf_snapshotWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Pdf_snapshotScalarFieldEnumSchema.array().optional(),
}).strict() 

export const Pdf_snapshotFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Pdf_snapshotFindFirstOrThrowArgs> = z.object({
  select: Pdf_snapshotSelectSchema.optional(),
  where: Pdf_snapshotWhereInputSchema.optional(),
  orderBy: z.union([ Pdf_snapshotOrderByWithRelationInputSchema.array(),Pdf_snapshotOrderByWithRelationInputSchema ]).optional(),
  cursor: Pdf_snapshotWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Pdf_snapshotScalarFieldEnumSchema.array().optional(),
}).strict() 

export const Pdf_snapshotFindManyArgsSchema: z.ZodType<Prisma.Pdf_snapshotFindManyArgs> = z.object({
  select: Pdf_snapshotSelectSchema.optional(),
  where: Pdf_snapshotWhereInputSchema.optional(),
  orderBy: z.union([ Pdf_snapshotOrderByWithRelationInputSchema.array(),Pdf_snapshotOrderByWithRelationInputSchema ]).optional(),
  cursor: Pdf_snapshotWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Pdf_snapshotScalarFieldEnumSchema.array().optional(),
}).strict() 

export const Pdf_snapshotAggregateArgsSchema: z.ZodType<Prisma.Pdf_snapshotAggregateArgs> = z.object({
  where: Pdf_snapshotWhereInputSchema.optional(),
  orderBy: z.union([ Pdf_snapshotOrderByWithRelationInputSchema.array(),Pdf_snapshotOrderByWithRelationInputSchema ]).optional(),
  cursor: Pdf_snapshotWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() 

export const Pdf_snapshotGroupByArgsSchema: z.ZodType<Prisma.Pdf_snapshotGroupByArgs> = z.object({
  where: Pdf_snapshotWhereInputSchema.optional(),
  orderBy: z.union([ Pdf_snapshotOrderByWithAggregationInputSchema.array(),Pdf_snapshotOrderByWithAggregationInputSchema ]).optional(),
  by: Pdf_snapshotScalarFieldEnumSchema.array(),
  having: Pdf_snapshotScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() 

export const Pdf_snapshotFindUniqueArgsSchema: z.ZodType<Prisma.Pdf_snapshotFindUniqueArgs> = z.object({
  select: Pdf_snapshotSelectSchema.optional(),
  where: Pdf_snapshotWhereUniqueInputSchema,
}).strict() 

export const Pdf_snapshotFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Pdf_snapshotFindUniqueOrThrowArgs> = z.object({
  select: Pdf_snapshotSelectSchema.optional(),
  where: Pdf_snapshotWhereUniqueInputSchema,
}).strict() 

export const Picture_linesFindFirstArgsSchema: z.ZodType<Prisma.Picture_linesFindFirstArgs> = z.object({
  select: Picture_linesSelectSchema.optional(),
  include: Picture_linesIncludeSchema.optional(),
  where: Picture_linesWhereInputSchema.optional(),
  orderBy: z.union([ Picture_linesOrderByWithRelationInputSchema.array(),Picture_linesOrderByWithRelationInputSchema ]).optional(),
  cursor: Picture_linesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Picture_linesScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.Picture_linesFindFirstArgs>

export const Picture_linesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Picture_linesFindFirstOrThrowArgs> = z.object({
  select: Picture_linesSelectSchema.optional(),
  include: Picture_linesIncludeSchema.optional(),
  where: Picture_linesWhereInputSchema.optional(),
  orderBy: z.union([ Picture_linesOrderByWithRelationInputSchema.array(),Picture_linesOrderByWithRelationInputSchema ]).optional(),
  cursor: Picture_linesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Picture_linesScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.Picture_linesFindFirstOrThrowArgs>

export const Picture_linesFindManyArgsSchema: z.ZodType<Prisma.Picture_linesFindManyArgs> = z.object({
  select: Picture_linesSelectSchema.optional(),
  include: Picture_linesIncludeSchema.optional(),
  where: Picture_linesWhereInputSchema.optional(),
  orderBy: z.union([ Picture_linesOrderByWithRelationInputSchema.array(),Picture_linesOrderByWithRelationInputSchema ]).optional(),
  cursor: Picture_linesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Picture_linesScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.Picture_linesFindManyArgs>

export const Picture_linesAggregateArgsSchema: z.ZodType<Prisma.Picture_linesAggregateArgs> = z.object({
  where: Picture_linesWhereInputSchema.optional(),
  orderBy: z.union([ Picture_linesOrderByWithRelationInputSchema.array(),Picture_linesOrderByWithRelationInputSchema ]).optional(),
  cursor: Picture_linesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.Picture_linesAggregateArgs>

export const Picture_linesGroupByArgsSchema: z.ZodType<Prisma.Picture_linesGroupByArgs> = z.object({
  where: Picture_linesWhereInputSchema.optional(),
  orderBy: z.union([ Picture_linesOrderByWithAggregationInputSchema.array(),Picture_linesOrderByWithAggregationInputSchema ]).optional(),
  by: Picture_linesScalarFieldEnumSchema.array(),
  having: Picture_linesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.Picture_linesGroupByArgs>

export const Picture_linesFindUniqueArgsSchema: z.ZodType<Prisma.Picture_linesFindUniqueArgs> = z.object({
  select: Picture_linesSelectSchema.optional(),
  include: Picture_linesIncludeSchema.optional(),
  where: Picture_linesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.Picture_linesFindUniqueArgs>

export const Picture_linesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Picture_linesFindUniqueOrThrowArgs> = z.object({
  select: Picture_linesSelectSchema.optional(),
  include: Picture_linesIncludeSchema.optional(),
  where: Picture_linesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.Picture_linesFindUniqueOrThrowArgs>

export const PicturesFindFirstArgsSchema: z.ZodType<Prisma.PicturesFindFirstArgs> = z.object({
  select: PicturesSelectSchema.optional(),
  include: PicturesIncludeSchema.optional(),
  where: PicturesWhereInputSchema.optional(),
  orderBy: z.union([ PicturesOrderByWithRelationInputSchema.array(),PicturesOrderByWithRelationInputSchema ]).optional(),
  cursor: PicturesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PicturesScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.PicturesFindFirstArgs>

export const PicturesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PicturesFindFirstOrThrowArgs> = z.object({
  select: PicturesSelectSchema.optional(),
  include: PicturesIncludeSchema.optional(),
  where: PicturesWhereInputSchema.optional(),
  orderBy: z.union([ PicturesOrderByWithRelationInputSchema.array(),PicturesOrderByWithRelationInputSchema ]).optional(),
  cursor: PicturesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PicturesScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.PicturesFindFirstOrThrowArgs>

export const PicturesFindManyArgsSchema: z.ZodType<Prisma.PicturesFindManyArgs> = z.object({
  select: PicturesSelectSchema.optional(),
  include: PicturesIncludeSchema.optional(),
  where: PicturesWhereInputSchema.optional(),
  orderBy: z.union([ PicturesOrderByWithRelationInputSchema.array(),PicturesOrderByWithRelationInputSchema ]).optional(),
  cursor: PicturesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: PicturesScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.PicturesFindManyArgs>

export const PicturesAggregateArgsSchema: z.ZodType<Prisma.PicturesAggregateArgs> = z.object({
  where: PicturesWhereInputSchema.optional(),
  orderBy: z.union([ PicturesOrderByWithRelationInputSchema.array(),PicturesOrderByWithRelationInputSchema ]).optional(),
  cursor: PicturesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.PicturesAggregateArgs>

export const PicturesGroupByArgsSchema: z.ZodType<Prisma.PicturesGroupByArgs> = z.object({
  where: PicturesWhereInputSchema.optional(),
  orderBy: z.union([ PicturesOrderByWithAggregationInputSchema.array(),PicturesOrderByWithAggregationInputSchema ]).optional(),
  by: PicturesScalarFieldEnumSchema.array(),
  having: PicturesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.PicturesGroupByArgs>

export const PicturesFindUniqueArgsSchema: z.ZodType<Prisma.PicturesFindUniqueArgs> = z.object({
  select: PicturesSelectSchema.optional(),
  include: PicturesIncludeSchema.optional(),
  where: PicturesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.PicturesFindUniqueArgs>

export const PicturesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PicturesFindUniqueOrThrowArgs> = z.object({
  select: PicturesSelectSchema.optional(),
  include: PicturesIncludeSchema.optional(),
  where: PicturesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.PicturesFindUniqueOrThrowArgs>

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

export const Service_instructeursFindFirstArgsSchema: z.ZodType<Prisma.Service_instructeursFindFirstArgs> = z.object({
  select: Service_instructeursSelectSchema.optional(),
  where: Service_instructeursWhereInputSchema.optional(),
  orderBy: z.union([ Service_instructeursOrderByWithRelationInputSchema.array(),Service_instructeursOrderByWithRelationInputSchema ]).optional(),
  cursor: Service_instructeursWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Service_instructeursScalarFieldEnumSchema.array().optional(),
}).strict() 

export const Service_instructeursFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Service_instructeursFindFirstOrThrowArgs> = z.object({
  select: Service_instructeursSelectSchema.optional(),
  where: Service_instructeursWhereInputSchema.optional(),
  orderBy: z.union([ Service_instructeursOrderByWithRelationInputSchema.array(),Service_instructeursOrderByWithRelationInputSchema ]).optional(),
  cursor: Service_instructeursWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Service_instructeursScalarFieldEnumSchema.array().optional(),
}).strict() 

export const Service_instructeursFindManyArgsSchema: z.ZodType<Prisma.Service_instructeursFindManyArgs> = z.object({
  select: Service_instructeursSelectSchema.optional(),
  where: Service_instructeursWhereInputSchema.optional(),
  orderBy: z.union([ Service_instructeursOrderByWithRelationInputSchema.array(),Service_instructeursOrderByWithRelationInputSchema ]).optional(),
  cursor: Service_instructeursWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Service_instructeursScalarFieldEnumSchema.array().optional(),
}).strict() 

export const Service_instructeursAggregateArgsSchema: z.ZodType<Prisma.Service_instructeursAggregateArgs> = z.object({
  where: Service_instructeursWhereInputSchema.optional(),
  orderBy: z.union([ Service_instructeursOrderByWithRelationInputSchema.array(),Service_instructeursOrderByWithRelationInputSchema ]).optional(),
  cursor: Service_instructeursWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() 

export const Service_instructeursGroupByArgsSchema: z.ZodType<Prisma.Service_instructeursGroupByArgs> = z.object({
  where: Service_instructeursWhereInputSchema.optional(),
  orderBy: z.union([ Service_instructeursOrderByWithAggregationInputSchema.array(),Service_instructeursOrderByWithAggregationInputSchema ]).optional(),
  by: Service_instructeursScalarFieldEnumSchema.array(),
  having: Service_instructeursScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() 

export const Service_instructeursFindUniqueArgsSchema: z.ZodType<Prisma.Service_instructeursFindUniqueArgs> = z.object({
  select: Service_instructeursSelectSchema.optional(),
  where: Service_instructeursWhereUniqueInputSchema,
}).strict() 

export const Service_instructeursFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Service_instructeursFindUniqueOrThrowArgs> = z.object({
  select: Service_instructeursSelectSchema.optional(),
  where: Service_instructeursWhereUniqueInputSchema,
}).strict() 

export const Tmp_picturesFindFirstArgsSchema: z.ZodType<Prisma.Tmp_picturesFindFirstArgs> = z.object({
  select: Tmp_picturesSelectSchema.optional(),
  include: Tmp_picturesIncludeSchema.optional(),
  where: Tmp_picturesWhereInputSchema.optional(),
  orderBy: z.union([ Tmp_picturesOrderByWithRelationInputSchema.array(),Tmp_picturesOrderByWithRelationInputSchema ]).optional(),
  cursor: Tmp_picturesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Tmp_picturesScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.Tmp_picturesFindFirstArgs>

export const Tmp_picturesFindFirstOrThrowArgsSchema: z.ZodType<Prisma.Tmp_picturesFindFirstOrThrowArgs> = z.object({
  select: Tmp_picturesSelectSchema.optional(),
  include: Tmp_picturesIncludeSchema.optional(),
  where: Tmp_picturesWhereInputSchema.optional(),
  orderBy: z.union([ Tmp_picturesOrderByWithRelationInputSchema.array(),Tmp_picturesOrderByWithRelationInputSchema ]).optional(),
  cursor: Tmp_picturesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Tmp_picturesScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.Tmp_picturesFindFirstOrThrowArgs>

export const Tmp_picturesFindManyArgsSchema: z.ZodType<Prisma.Tmp_picturesFindManyArgs> = z.object({
  select: Tmp_picturesSelectSchema.optional(),
  include: Tmp_picturesIncludeSchema.optional(),
  where: Tmp_picturesWhereInputSchema.optional(),
  orderBy: z.union([ Tmp_picturesOrderByWithRelationInputSchema.array(),Tmp_picturesOrderByWithRelationInputSchema ]).optional(),
  cursor: Tmp_picturesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: Tmp_picturesScalarFieldEnumSchema.array().optional(),
}).strict() as z.ZodType<Prisma.Tmp_picturesFindManyArgs>

export const Tmp_picturesAggregateArgsSchema: z.ZodType<Prisma.Tmp_picturesAggregateArgs> = z.object({
  where: Tmp_picturesWhereInputSchema.optional(),
  orderBy: z.union([ Tmp_picturesOrderByWithRelationInputSchema.array(),Tmp_picturesOrderByWithRelationInputSchema ]).optional(),
  cursor: Tmp_picturesWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.Tmp_picturesAggregateArgs>

export const Tmp_picturesGroupByArgsSchema: z.ZodType<Prisma.Tmp_picturesGroupByArgs> = z.object({
  where: Tmp_picturesWhereInputSchema.optional(),
  orderBy: z.union([ Tmp_picturesOrderByWithAggregationInputSchema.array(),Tmp_picturesOrderByWithAggregationInputSchema ]).optional(),
  by: Tmp_picturesScalarFieldEnumSchema.array(),
  having: Tmp_picturesScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() as z.ZodType<Prisma.Tmp_picturesGroupByArgs>

export const Tmp_picturesFindUniqueArgsSchema: z.ZodType<Prisma.Tmp_picturesFindUniqueArgs> = z.object({
  select: Tmp_picturesSelectSchema.optional(),
  include: Tmp_picturesIncludeSchema.optional(),
  where: Tmp_picturesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.Tmp_picturesFindUniqueArgs>

export const Tmp_picturesFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.Tmp_picturesFindUniqueOrThrowArgs> = z.object({
  select: Tmp_picturesSelectSchema.optional(),
  include: Tmp_picturesIncludeSchema.optional(),
  where: Tmp_picturesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.Tmp_picturesFindUniqueOrThrowArgs>

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

export const Clause_v2CreateArgsSchema: z.ZodType<Prisma.Clause_v2CreateArgs> = z.object({
  select: Clause_v2SelectSchema.optional(),
  data: z.union([ Clause_v2CreateInputSchema,Clause_v2UncheckedCreateInputSchema ]),
}).strict() 

export const Clause_v2UpsertArgsSchema: z.ZodType<Prisma.Clause_v2UpsertArgs> = z.object({
  select: Clause_v2SelectSchema.optional(),
  where: Clause_v2WhereUniqueInputSchema,
  create: z.union([ Clause_v2CreateInputSchema,Clause_v2UncheckedCreateInputSchema ]),
  update: z.union([ Clause_v2UpdateInputSchema,Clause_v2UncheckedUpdateInputSchema ]),
}).strict() 

export const Clause_v2CreateManyArgsSchema: z.ZodType<Prisma.Clause_v2CreateManyArgs> = z.object({
  data: Clause_v2CreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() 

export const Clause_v2DeleteArgsSchema: z.ZodType<Prisma.Clause_v2DeleteArgs> = z.object({
  select: Clause_v2SelectSchema.optional(),
  where: Clause_v2WhereUniqueInputSchema,
}).strict() 

export const Clause_v2UpdateArgsSchema: z.ZodType<Prisma.Clause_v2UpdateArgs> = z.object({
  select: Clause_v2SelectSchema.optional(),
  data: z.union([ Clause_v2UpdateInputSchema,Clause_v2UncheckedUpdateInputSchema ]),
  where: Clause_v2WhereUniqueInputSchema,
}).strict() 

export const Clause_v2UpdateManyArgsSchema: z.ZodType<Prisma.Clause_v2UpdateManyArgs> = z.object({
  data: z.union([ Clause_v2UpdateManyMutationInputSchema,Clause_v2UncheckedUpdateManyInputSchema ]),
  where: Clause_v2WhereInputSchema.optional(),
}).strict() 

export const Clause_v2DeleteManyArgsSchema: z.ZodType<Prisma.Clause_v2DeleteManyArgs> = z.object({
  where: Clause_v2WhereInputSchema.optional(),
}).strict() 

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

export const Pdf_snapshotCreateArgsSchema: z.ZodType<Prisma.Pdf_snapshotCreateArgs> = z.object({
  select: Pdf_snapshotSelectSchema.optional(),
  data: z.union([ Pdf_snapshotCreateInputSchema,Pdf_snapshotUncheckedCreateInputSchema ]),
}).strict() 

export const Pdf_snapshotUpsertArgsSchema: z.ZodType<Prisma.Pdf_snapshotUpsertArgs> = z.object({
  select: Pdf_snapshotSelectSchema.optional(),
  where: Pdf_snapshotWhereUniqueInputSchema,
  create: z.union([ Pdf_snapshotCreateInputSchema,Pdf_snapshotUncheckedCreateInputSchema ]),
  update: z.union([ Pdf_snapshotUpdateInputSchema,Pdf_snapshotUncheckedUpdateInputSchema ]),
}).strict() 

export const Pdf_snapshotCreateManyArgsSchema: z.ZodType<Prisma.Pdf_snapshotCreateManyArgs> = z.object({
  data: Pdf_snapshotCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() 

export const Pdf_snapshotDeleteArgsSchema: z.ZodType<Prisma.Pdf_snapshotDeleteArgs> = z.object({
  select: Pdf_snapshotSelectSchema.optional(),
  where: Pdf_snapshotWhereUniqueInputSchema,
}).strict() 

export const Pdf_snapshotUpdateArgsSchema: z.ZodType<Prisma.Pdf_snapshotUpdateArgs> = z.object({
  select: Pdf_snapshotSelectSchema.optional(),
  data: z.union([ Pdf_snapshotUpdateInputSchema,Pdf_snapshotUncheckedUpdateInputSchema ]),
  where: Pdf_snapshotWhereUniqueInputSchema,
}).strict() 

export const Pdf_snapshotUpdateManyArgsSchema: z.ZodType<Prisma.Pdf_snapshotUpdateManyArgs> = z.object({
  data: z.union([ Pdf_snapshotUpdateManyMutationInputSchema,Pdf_snapshotUncheckedUpdateManyInputSchema ]),
  where: Pdf_snapshotWhereInputSchema.optional(),
}).strict() 

export const Pdf_snapshotDeleteManyArgsSchema: z.ZodType<Prisma.Pdf_snapshotDeleteManyArgs> = z.object({
  where: Pdf_snapshotWhereInputSchema.optional(),
}).strict() 

export const Picture_linesCreateArgsSchema: z.ZodType<Prisma.Picture_linesCreateArgs> = z.object({
  select: Picture_linesSelectSchema.optional(),
  include: Picture_linesIncludeSchema.optional(),
  data: z.union([ Picture_linesCreateInputSchema,Picture_linesUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.Picture_linesCreateArgs>

export const Picture_linesUpsertArgsSchema: z.ZodType<Prisma.Picture_linesUpsertArgs> = z.object({
  select: Picture_linesSelectSchema.optional(),
  include: Picture_linesIncludeSchema.optional(),
  where: Picture_linesWhereUniqueInputSchema,
  create: z.union([ Picture_linesCreateInputSchema,Picture_linesUncheckedCreateInputSchema ]),
  update: z.union([ Picture_linesUpdateInputSchema,Picture_linesUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.Picture_linesUpsertArgs>

export const Picture_linesCreateManyArgsSchema: z.ZodType<Prisma.Picture_linesCreateManyArgs> = z.object({
  data: Picture_linesCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.Picture_linesCreateManyArgs>

export const Picture_linesDeleteArgsSchema: z.ZodType<Prisma.Picture_linesDeleteArgs> = z.object({
  select: Picture_linesSelectSchema.optional(),
  include: Picture_linesIncludeSchema.optional(),
  where: Picture_linesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.Picture_linesDeleteArgs>

export const Picture_linesUpdateArgsSchema: z.ZodType<Prisma.Picture_linesUpdateArgs> = z.object({
  select: Picture_linesSelectSchema.optional(),
  include: Picture_linesIncludeSchema.optional(),
  data: z.union([ Picture_linesUpdateInputSchema,Picture_linesUncheckedUpdateInputSchema ]),
  where: Picture_linesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.Picture_linesUpdateArgs>

export const Picture_linesUpdateManyArgsSchema: z.ZodType<Prisma.Picture_linesUpdateManyArgs> = z.object({
  data: z.union([ Picture_linesUpdateManyMutationInputSchema,Picture_linesUncheckedUpdateManyInputSchema ]),
  where: Picture_linesWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.Picture_linesUpdateManyArgs>

export const Picture_linesDeleteManyArgsSchema: z.ZodType<Prisma.Picture_linesDeleteManyArgs> = z.object({
  where: Picture_linesWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.Picture_linesDeleteManyArgs>

export const PicturesCreateArgsSchema: z.ZodType<Prisma.PicturesCreateArgs> = z.object({
  select: PicturesSelectSchema.optional(),
  include: PicturesIncludeSchema.optional(),
  data: z.union([ PicturesCreateInputSchema,PicturesUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.PicturesCreateArgs>

export const PicturesUpsertArgsSchema: z.ZodType<Prisma.PicturesUpsertArgs> = z.object({
  select: PicturesSelectSchema.optional(),
  include: PicturesIncludeSchema.optional(),
  where: PicturesWhereUniqueInputSchema,
  create: z.union([ PicturesCreateInputSchema,PicturesUncheckedCreateInputSchema ]),
  update: z.union([ PicturesUpdateInputSchema,PicturesUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.PicturesUpsertArgs>

export const PicturesCreateManyArgsSchema: z.ZodType<Prisma.PicturesCreateManyArgs> = z.object({
  data: PicturesCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.PicturesCreateManyArgs>

export const PicturesDeleteArgsSchema: z.ZodType<Prisma.PicturesDeleteArgs> = z.object({
  select: PicturesSelectSchema.optional(),
  include: PicturesIncludeSchema.optional(),
  where: PicturesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.PicturesDeleteArgs>

export const PicturesUpdateArgsSchema: z.ZodType<Prisma.PicturesUpdateArgs> = z.object({
  select: PicturesSelectSchema.optional(),
  include: PicturesIncludeSchema.optional(),
  data: z.union([ PicturesUpdateInputSchema,PicturesUncheckedUpdateInputSchema ]),
  where: PicturesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.PicturesUpdateArgs>

export const PicturesUpdateManyArgsSchema: z.ZodType<Prisma.PicturesUpdateManyArgs> = z.object({
  data: z.union([ PicturesUpdateManyMutationInputSchema,PicturesUncheckedUpdateManyInputSchema ]),
  where: PicturesWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.PicturesUpdateManyArgs>

export const PicturesDeleteManyArgsSchema: z.ZodType<Prisma.PicturesDeleteManyArgs> = z.object({
  where: PicturesWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.PicturesDeleteManyArgs>

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

export const Service_instructeursCreateArgsSchema: z.ZodType<Prisma.Service_instructeursCreateArgs> = z.object({
  select: Service_instructeursSelectSchema.optional(),
  data: z.union([ Service_instructeursCreateInputSchema,Service_instructeursUncheckedCreateInputSchema ]),
}).strict() 

export const Service_instructeursUpsertArgsSchema: z.ZodType<Prisma.Service_instructeursUpsertArgs> = z.object({
  select: Service_instructeursSelectSchema.optional(),
  where: Service_instructeursWhereUniqueInputSchema,
  create: z.union([ Service_instructeursCreateInputSchema,Service_instructeursUncheckedCreateInputSchema ]),
  update: z.union([ Service_instructeursUpdateInputSchema,Service_instructeursUncheckedUpdateInputSchema ]),
}).strict() 

export const Service_instructeursCreateManyArgsSchema: z.ZodType<Prisma.Service_instructeursCreateManyArgs> = z.object({
  data: Service_instructeursCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() 

export const Service_instructeursDeleteArgsSchema: z.ZodType<Prisma.Service_instructeursDeleteArgs> = z.object({
  select: Service_instructeursSelectSchema.optional(),
  where: Service_instructeursWhereUniqueInputSchema,
}).strict() 

export const Service_instructeursUpdateArgsSchema: z.ZodType<Prisma.Service_instructeursUpdateArgs> = z.object({
  select: Service_instructeursSelectSchema.optional(),
  data: z.union([ Service_instructeursUpdateInputSchema,Service_instructeursUncheckedUpdateInputSchema ]),
  where: Service_instructeursWhereUniqueInputSchema,
}).strict() 

export const Service_instructeursUpdateManyArgsSchema: z.ZodType<Prisma.Service_instructeursUpdateManyArgs> = z.object({
  data: z.union([ Service_instructeursUpdateManyMutationInputSchema,Service_instructeursUncheckedUpdateManyInputSchema ]),
  where: Service_instructeursWhereInputSchema.optional(),
}).strict() 

export const Service_instructeursDeleteManyArgsSchema: z.ZodType<Prisma.Service_instructeursDeleteManyArgs> = z.object({
  where: Service_instructeursWhereInputSchema.optional(),
}).strict() 

export const Tmp_picturesCreateArgsSchema: z.ZodType<Prisma.Tmp_picturesCreateArgs> = z.object({
  select: Tmp_picturesSelectSchema.optional(),
  include: Tmp_picturesIncludeSchema.optional(),
  data: z.union([ Tmp_picturesCreateInputSchema,Tmp_picturesUncheckedCreateInputSchema ]),
}).strict() as z.ZodType<Prisma.Tmp_picturesCreateArgs>

export const Tmp_picturesUpsertArgsSchema: z.ZodType<Prisma.Tmp_picturesUpsertArgs> = z.object({
  select: Tmp_picturesSelectSchema.optional(),
  include: Tmp_picturesIncludeSchema.optional(),
  where: Tmp_picturesWhereUniqueInputSchema,
  create: z.union([ Tmp_picturesCreateInputSchema,Tmp_picturesUncheckedCreateInputSchema ]),
  update: z.union([ Tmp_picturesUpdateInputSchema,Tmp_picturesUncheckedUpdateInputSchema ]),
}).strict() as z.ZodType<Prisma.Tmp_picturesUpsertArgs>

export const Tmp_picturesCreateManyArgsSchema: z.ZodType<Prisma.Tmp_picturesCreateManyArgs> = z.object({
  data: Tmp_picturesCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict() as z.ZodType<Prisma.Tmp_picturesCreateManyArgs>

export const Tmp_picturesDeleteArgsSchema: z.ZodType<Prisma.Tmp_picturesDeleteArgs> = z.object({
  select: Tmp_picturesSelectSchema.optional(),
  include: Tmp_picturesIncludeSchema.optional(),
  where: Tmp_picturesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.Tmp_picturesDeleteArgs>

export const Tmp_picturesUpdateArgsSchema: z.ZodType<Prisma.Tmp_picturesUpdateArgs> = z.object({
  select: Tmp_picturesSelectSchema.optional(),
  include: Tmp_picturesIncludeSchema.optional(),
  data: z.union([ Tmp_picturesUpdateInputSchema,Tmp_picturesUncheckedUpdateInputSchema ]),
  where: Tmp_picturesWhereUniqueInputSchema,
}).strict() as z.ZodType<Prisma.Tmp_picturesUpdateArgs>

export const Tmp_picturesUpdateManyArgsSchema: z.ZodType<Prisma.Tmp_picturesUpdateManyArgs> = z.object({
  data: z.union([ Tmp_picturesUpdateManyMutationInputSchema,Tmp_picturesUncheckedUpdateManyInputSchema ]),
  where: Tmp_picturesWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.Tmp_picturesUpdateManyArgs>

export const Tmp_picturesDeleteManyArgsSchema: z.ZodType<Prisma.Tmp_picturesDeleteManyArgs> = z.object({
  where: Tmp_picturesWhereInputSchema.optional(),
}).strict() as z.ZodType<Prisma.Tmp_picturesDeleteManyArgs>

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

interface ClauseGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.ClauseArgs
  readonly type: Omit<Prisma.ClauseGetPayload<this['_A']>, "Please either choose `select` or `include`">
}

interface Clause_v2GetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.Clause_v2Args
  readonly type: Omit<Prisma.Clause_v2GetPayload<this['_A']>, "Please either choose `select` or `include`">
}

interface DelegationGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.DelegationArgs
  readonly type: Omit<Prisma.DelegationGetPayload<this['_A']>, "Please either choose `select` or `include`">
}

interface Pdf_snapshotGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.Pdf_snapshotArgs
  readonly type: Omit<Prisma.Pdf_snapshotGetPayload<this['_A']>, "Please either choose `select` or `include`">
}

interface Picture_linesGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.Picture_linesArgs
  readonly type: Omit<Prisma.Picture_linesGetPayload<this['_A']>, "Please either choose `select` or `include`">
}

interface PicturesGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.PicturesArgs
  readonly type: Omit<Prisma.PicturesGetPayload<this['_A']>, "Please either choose `select` or `include`">
}

interface ReportGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.ReportArgs
  readonly type: Omit<Prisma.ReportGetPayload<this['_A']>, "Please either choose `select` or `include`">
}

interface Service_instructeursGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.Service_instructeursArgs
  readonly type: Omit<Prisma.Service_instructeursGetPayload<this['_A']>, "Please either choose `select` or `include`">
}

interface Tmp_picturesGetPayload extends HKT {
  readonly _A?: boolean | null | undefined | Prisma.Tmp_picturesArgs
  readonly type: Omit<Prisma.Tmp_picturesGetPayload<this['_A']>, "Please either choose `select` or `include`">
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
  clause: {
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
      ],
      [
        "hidden",
        "BOOL"
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
    z.infer<typeof ClauseUncheckedCreateInputSchema>,
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
  clause_v2: {
    fields: new Map([
      [
        "id",
        "TEXT"
      ],
      [
        "key",
        "TEXT"
      ],
      [
        "value",
        "TEXT"
      ],
      [
        "position",
        "INT4"
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
    modelSchema: (Clause_v2CreateInputSchema as any)
      .partial()
      .or((Clause_v2UncheckedCreateInputSchema as any).partial()),
    createSchema: Clause_v2CreateArgsSchema,
    createManySchema: Clause_v2CreateManyArgsSchema,
    findUniqueSchema: Clause_v2FindUniqueArgsSchema,
    findSchema: Clause_v2FindFirstArgsSchema,
    updateSchema: Clause_v2UpdateArgsSchema,
    updateManySchema: Clause_v2UpdateManyArgsSchema,
    upsertSchema: Clause_v2UpsertArgsSchema,
    deleteSchema: Clause_v2DeleteArgsSchema,
    deleteManySchema: Clause_v2DeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof Clause_v2UncheckedCreateInputSchema>,
    Prisma.Clause_v2CreateArgs['data'],
    Prisma.Clause_v2UpdateArgs['data'],
    Prisma.Clause_v2FindFirstArgs['select'],
    Prisma.Clause_v2FindFirstArgs['where'],
    Prisma.Clause_v2FindUniqueArgs['where'],
    never,
    Prisma.Clause_v2FindFirstArgs['orderBy'],
    Prisma.Clause_v2ScalarFieldEnum,
    Clause_v2GetPayload
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
  pdf_snapshot: {
    fields: new Map([
      [
        "id",
        "TEXT"
      ],
      [
        "report_id",
        "TEXT"
      ],
      [
        "html",
        "TEXT"
      ],
      [
        "report",
        "TEXT"
      ],
      [
        "user_id",
        "TEXT"
      ]
    ]),
    relations: [
    ],
    modelSchema: (Pdf_snapshotCreateInputSchema as any)
      .partial()
      .or((Pdf_snapshotUncheckedCreateInputSchema as any).partial()),
    createSchema: Pdf_snapshotCreateArgsSchema,
    createManySchema: Pdf_snapshotCreateManyArgsSchema,
    findUniqueSchema: Pdf_snapshotFindUniqueArgsSchema,
    findSchema: Pdf_snapshotFindFirstArgsSchema,
    updateSchema: Pdf_snapshotUpdateArgsSchema,
    updateManySchema: Pdf_snapshotUpdateManyArgsSchema,
    upsertSchema: Pdf_snapshotUpsertArgsSchema,
    deleteSchema: Pdf_snapshotDeleteArgsSchema,
    deleteManySchema: Pdf_snapshotDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof Pdf_snapshotUncheckedCreateInputSchema>,
    Prisma.Pdf_snapshotCreateArgs['data'],
    Prisma.Pdf_snapshotUpdateArgs['data'],
    Prisma.Pdf_snapshotFindFirstArgs['select'],
    Prisma.Pdf_snapshotFindFirstArgs['where'],
    Prisma.Pdf_snapshotFindUniqueArgs['where'],
    never,
    Prisma.Pdf_snapshotFindFirstArgs['orderBy'],
    Prisma.Pdf_snapshotScalarFieldEnum,
    Pdf_snapshotGetPayload
  >,
  picture_lines: {
    fields: new Map([
      [
        "id",
        "TEXT"
      ],
      [
        "pictureId",
        "TEXT"
      ],
      [
        "lines",
        "TEXT"
      ],
      [
        "createdAt",
        "TIMESTAMP"
      ]
    ]),
    relations: [
      new Relation("pictures", "pictureId", "id", "pictures", "Picture_linesToPictures", "one"),
    ],
    modelSchema: (Picture_linesCreateInputSchema as any)
      .partial()
      .or((Picture_linesUncheckedCreateInputSchema as any).partial()),
    createSchema: Picture_linesCreateArgsSchema,
    createManySchema: Picture_linesCreateManyArgsSchema,
    findUniqueSchema: Picture_linesFindUniqueArgsSchema,
    findSchema: Picture_linesFindFirstArgsSchema,
    updateSchema: Picture_linesUpdateArgsSchema,
    updateManySchema: Picture_linesUpdateManyArgsSchema,
    upsertSchema: Picture_linesUpsertArgsSchema,
    deleteSchema: Picture_linesDeleteArgsSchema,
    deleteManySchema: Picture_linesDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof Picture_linesUncheckedCreateInputSchema>,
    Prisma.Picture_linesCreateArgs['data'],
    Prisma.Picture_linesUpdateArgs['data'],
    Prisma.Picture_linesFindFirstArgs['select'],
    Prisma.Picture_linesFindFirstArgs['where'],
    Prisma.Picture_linesFindUniqueArgs['where'],
    Omit<Prisma.Picture_linesInclude, '_count'>,
    Prisma.Picture_linesFindFirstArgs['orderBy'],
    Prisma.Picture_linesScalarFieldEnum,
    Picture_linesGetPayload
  >,
  pictures: {
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
        "url",
        "TEXT"
      ],
      [
        "createdAt",
        "TIMESTAMP"
      ]
    ]),
    relations: [
      new Relation("picture_lines", "", "", "picture_lines", "Picture_linesToPictures", "many"),
      new Relation("report", "reportId", "id", "report", "PicturesToReport", "one"),
    ],
    modelSchema: (PicturesCreateInputSchema as any)
      .partial()
      .or((PicturesUncheckedCreateInputSchema as any).partial()),
    createSchema: PicturesCreateArgsSchema,
    createManySchema: PicturesCreateManyArgsSchema,
    findUniqueSchema: PicturesFindUniqueArgsSchema,
    findSchema: PicturesFindFirstArgsSchema,
    updateSchema: PicturesUpdateArgsSchema,
    updateManySchema: PicturesUpdateManyArgsSchema,
    upsertSchema: PicturesUpsertArgsSchema,
    deleteSchema: PicturesDeleteArgsSchema,
    deleteManySchema: PicturesDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof PicturesUncheckedCreateInputSchema>,
    Prisma.PicturesCreateArgs['data'],
    Prisma.PicturesUpdateArgs['data'],
    Prisma.PicturesFindFirstArgs['select'],
    Prisma.PicturesFindFirstArgs['where'],
    Prisma.PicturesFindUniqueArgs['where'],
    Omit<Prisma.PicturesInclude, '_count'>,
    Prisma.PicturesFindFirstArgs['orderBy'],
    Prisma.PicturesScalarFieldEnum,
    PicturesGetPayload
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
      ],
      [
        "redactedById",
        "TEXT"
      ],
      [
        "applicantEmail",
        "TEXT"
      ],
      [
        "city",
        "TEXT"
      ],
      [
        "zipCode",
        "TEXT"
      ]
    ]),
    relations: [
      new Relation("pictures", "", "", "pictures", "PicturesToReport", "many"),
      new Relation("user", "createdBy", "id", "user", "ReportToUser", "one"),
      new Relation("tmp_pictures", "", "", "tmp_pictures", "ReportToTmp_pictures", "many"),
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
  service_instructeurs: {
    fields: new Map([
      [
        "id",
        "INT4"
      ],
      [
        "full_name",
        "TEXT"
      ],
      [
        "short_name",
        "TEXT"
      ],
      [
        "email",
        "TEXT"
      ],
      [
        "tel",
        "TEXT"
      ],
      [
        "udap_id",
        "TEXT"
      ]
    ]),
    relations: [
    ],
    modelSchema: (Service_instructeursCreateInputSchema as any)
      .partial()
      .or((Service_instructeursUncheckedCreateInputSchema as any).partial()),
    createSchema: Service_instructeursCreateArgsSchema,
    createManySchema: Service_instructeursCreateManyArgsSchema,
    findUniqueSchema: Service_instructeursFindUniqueArgsSchema,
    findSchema: Service_instructeursFindFirstArgsSchema,
    updateSchema: Service_instructeursUpdateArgsSchema,
    updateManySchema: Service_instructeursUpdateManyArgsSchema,
    upsertSchema: Service_instructeursUpsertArgsSchema,
    deleteSchema: Service_instructeursDeleteArgsSchema,
    deleteManySchema: Service_instructeursDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof Service_instructeursUncheckedCreateInputSchema>,
    Prisma.Service_instructeursCreateArgs['data'],
    Prisma.Service_instructeursUpdateArgs['data'],
    Prisma.Service_instructeursFindFirstArgs['select'],
    Prisma.Service_instructeursFindFirstArgs['where'],
    Prisma.Service_instructeursFindUniqueArgs['where'],
    never,
    Prisma.Service_instructeursFindFirstArgs['orderBy'],
    Prisma.Service_instructeursScalarFieldEnum,
    Service_instructeursGetPayload
  >,
  tmp_pictures: {
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
        "createdAt",
        "TIMESTAMP"
      ]
    ]),
    relations: [
      new Relation("report", "reportId", "id", "report", "ReportToTmp_pictures", "one"),
    ],
    modelSchema: (Tmp_picturesCreateInputSchema as any)
      .partial()
      .or((Tmp_picturesUncheckedCreateInputSchema as any).partial()),
    createSchema: Tmp_picturesCreateArgsSchema,
    createManySchema: Tmp_picturesCreateManyArgsSchema,
    findUniqueSchema: Tmp_picturesFindUniqueArgsSchema,
    findSchema: Tmp_picturesFindFirstArgsSchema,
    updateSchema: Tmp_picturesUpdateArgsSchema,
    updateManySchema: Tmp_picturesUpdateManyArgsSchema,
    upsertSchema: Tmp_picturesUpsertArgsSchema,
    deleteSchema: Tmp_picturesDeleteArgsSchema,
    deleteManySchema: Tmp_picturesDeleteManyArgsSchema
  } as TableSchema<
    z.infer<typeof Tmp_picturesUncheckedCreateInputSchema>,
    Prisma.Tmp_picturesCreateArgs['data'],
    Prisma.Tmp_picturesUpdateArgs['data'],
    Prisma.Tmp_picturesFindFirstArgs['select'],
    Prisma.Tmp_picturesFindFirstArgs['where'],
    Prisma.Tmp_picturesFindUniqueArgs['where'],
    Omit<Prisma.Tmp_picturesInclude, '_count'>,
    Prisma.Tmp_picturesFindFirstArgs['orderBy'],
    Prisma.Tmp_picturesScalarFieldEnum,
    Tmp_picturesGetPayload
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
      ],
      [
        "marianne_text",
        "TEXT"
      ],
      [
        "drac_text",
        "TEXT"
      ],
      [
        "udap_text",
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

export const schema = new DbSchema(tableSchemas, migrations, pgMigrations)
export type Electric = ElectricClient<typeof schema>
