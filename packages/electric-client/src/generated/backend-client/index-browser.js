
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.16.2
 * Query Engine version: d6e67a83f971b175a593ccc12e15c4a757f93ffe
 */
Prisma.prismaVersion = {
  client: "4.16.2",
  engine: "d6e67a83f971b175a593ccc12e15c4a757f93ffe"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  throw new Error(`Extensions.getExtensionContext is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.defineExtension = () => {
  throw new Error(`Extensions.defineExtension is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.Atdatabases_migrations_appliedScalarFieldEnum = {
  id: 'id',
  index: 'index',
  name: 'name',
  script: 'script',
  applied_at: 'applied_at',
  ignored_error: 'ignored_error',
  obsolete: 'obsolete'
};

exports.Prisma.Atdatabases_migrations_versionScalarFieldEnum = {
  id: 'id',
  version: 'version'
};

exports.Prisma.ClauseScalarFieldEnum = {
  id: 'id',
  label: 'label',
  value: 'value'
};

exports.Prisma.ReportScalarFieldEnum = {
  id: 'id',
  title: 'title',
  project_description: 'project_description',
  redacted_by: 'redacted_by',
  meet_date: 'meet_date',
  applicant_name: 'applicant_name',
  applicant_address: 'applicant_address',
  project_cadastral_ref: 'project_cadastral_ref',
  project_space_type: 'project_space_type',
  decision: 'decision',
  precisions: 'precisions',
  contacts: 'contacts',
  further_information: 'further_information',
  created_by_id: 'created_by_id',
  created_by_username: 'created_by_username',
  created_at: 'created_at',
  service_instructeur: 'service_instructeur'
};

exports.Prisma.Report_to_clauseScalarFieldEnum = {
  id: 'id',
  report_id: 'report_id',
  clause_id: 'clause_id'
};

exports.Prisma.ChipScalarFieldEnum = {
  key: 'key',
  value: 'value',
  udap_id: 'udap_id',
  text: 'text'
};

exports.Prisma.DelegationScalarFieldEnum = {
  createdBy: 'createdBy',
  delegatedTo: 'delegatedTo'
};

exports.Prisma.UdapScalarFieldEnum = {
  id: 'id',
  department: 'department',
  complete_coords: 'complete_coords',
  visible: 'visible',
  name: 'name',
  address: 'address',
  zip_code: 'zip_code',
  city: 'city',
  phone: 'phone',
  email: 'email'
};

exports.Prisma.UserScalarFieldEnum = {
  email: 'email',
  name: 'name',
  temporaryLink: 'temporaryLink',
  temporaryLinkExpiresAt: 'temporaryLinkExpiresAt',
  password: 'password',
  udap_id: 'udap_id'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  atdatabases_migrations_applied: 'atdatabases_migrations_applied',
  atdatabases_migrations_version: 'atdatabases_migrations_version',
  clause: 'clause',
  report: 'report',
  report_to_clause: 'report_to_clause',
  chip: 'chip',
  delegation: 'delegation',
  udap: 'udap',
  user: 'user'
};

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
