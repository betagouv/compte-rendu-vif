
/**
 * Client
**/

import * as runtime from './runtime/library';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions

export type PrismaPromise<T> = $Public.PrismaPromise<T>


export type atdatabases_migrations_appliedPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "atdatabases_migrations_applied"
  objects: {}
  scalars: $Extensions.GetResult<{
    id: bigint
    index: number
    name: string
    script: string
    applied_at: Date
    ignored_error: string | null
    obsolete: boolean
  }, ExtArgs["result"]["atdatabases_migrations_applied"]>
  composites: {}
}

/**
 * Model atdatabases_migrations_applied
 * 
 */
export type atdatabases_migrations_applied = runtime.Types.DefaultSelection<atdatabases_migrations_appliedPayload>
export type atdatabases_migrations_versionPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "atdatabases_migrations_version"
  objects: {}
  scalars: $Extensions.GetResult<{
    id: number
    version: string | null
  }, ExtArgs["result"]["atdatabases_migrations_version"]>
  composites: {}
}

/**
 * Model atdatabases_migrations_version
 * 
 */
export type atdatabases_migrations_version = runtime.Types.DefaultSelection<atdatabases_migrations_versionPayload>
export type chipPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "chip"
  objects: {
    report_to_chip: report_to_chipPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    label: string
    value: string
  }, ExtArgs["result"]["chip"]>
  composites: {}
}

/**
 * Model chip
 * 
 */
export type chip = runtime.Types.DefaultSelection<chipPayload>
export type clausePayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "clause"
  objects: {
    report_to_clause: report_to_clausePayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    label: string
    value: string
  }, ExtArgs["result"]["clause"]>
  composites: {}
}

/**
 * Model clause
 * 
 */
export type clause = runtime.Types.DefaultSelection<clausePayload>
export type delegationsPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "delegations"
  objects: {}
  scalars: $Extensions.GetResult<{
    createdBy: string
    delegatedTo: string
  }, ExtArgs["result"]["delegations"]>
  composites: {}
}

/**
 * Model delegations
 * 
 */
export type delegations = runtime.Types.DefaultSelection<delegationsPayload>
export type reportPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "report"
  objects: {
    report_to_chip: report_to_chipPayload<ExtArgs>[]
    report_to_clause: report_to_clausePayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    title: string | null
    project_description: string | null
    redacted_by: string | null
    meet_date: Date | null
    applicant_name: string | null
    applicant_address: string | null
    project_cadastral_ref: string | null
    project_space_type: string | null
    decision: string | null
    precisions: string | null
    contacts: string | null
    further_information: string | null
    created_by_id: string
    created_by_username: string
    created_at: Date
    service_instructeur: string | null
  }, ExtArgs["result"]["report"]>
  composites: {}
}

/**
 * Model report
 * 
 */
export type report = runtime.Types.DefaultSelection<reportPayload>
export type report_to_chipPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "report_to_chip"
  objects: {
    chip: chipPayload<ExtArgs>
    report: reportPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: string
    report_id: string
    chip_id: string
  }, ExtArgs["result"]["report_to_chip"]>
  composites: {}
}

/**
 * Model report_to_chip
 * 
 */
export type report_to_chip = runtime.Types.DefaultSelection<report_to_chipPayload>
export type report_to_clausePayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "report_to_clause"
  objects: {
    clause: clausePayload<ExtArgs>
    report: reportPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: string
    report_id: string
    clause_id: string
  }, ExtArgs["result"]["report_to_clause"]>
  composites: {}
}

/**
 * Model report_to_clause
 * 
 */
export type report_to_clause = runtime.Types.DefaultSelection<report_to_clausePayload>
export type usersPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "users"
  objects: {
    udaps: udapsPayload<ExtArgs> | null
  }
  scalars: $Extensions.GetResult<{
    id: string
    email: string
    name: string
    temporaryLink: string | null
    temporaryLinkExpiresAt: string | null
    password: string
    udap_id: string | null
  }, ExtArgs["result"]["users"]>
  composites: {}
}

/**
 * Model users
 * 
 */
export type users = runtime.Types.DefaultSelection<usersPayload>
export type udapsPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "udaps"
  objects: {
    users: usersPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    department: string
    complete_coords: string | null
    address: string | null
    visible: boolean | null
    name: string | null
    zip_code: number | null
    city: string | null
    phone: string | null
    email: string | null
  }, ExtArgs["result"]["udaps"]>
  composites: {}
}

/**
 * Model udaps
 * 
 */
export type udaps = runtime.Types.DefaultSelection<udapsPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Atdatabases_migrations_applieds
 * const atdatabases_migrations_applieds = await prisma.atdatabases_migrations_applied.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false,
  ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Atdatabases_migrations_applieds
   * const atdatabases_migrations_applieds = await prisma.atdatabases_migrations_applied.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => Promise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.atdatabases_migrations_applied`: Exposes CRUD operations for the **atdatabases_migrations_applied** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Atdatabases_migrations_applieds
    * const atdatabases_migrations_applieds = await prisma.atdatabases_migrations_applied.findMany()
    * ```
    */
  get atdatabases_migrations_applied(): Prisma.atdatabases_migrations_appliedDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.atdatabases_migrations_version`: Exposes CRUD operations for the **atdatabases_migrations_version** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Atdatabases_migrations_versions
    * const atdatabases_migrations_versions = await prisma.atdatabases_migrations_version.findMany()
    * ```
    */
  get atdatabases_migrations_version(): Prisma.atdatabases_migrations_versionDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.chip`: Exposes CRUD operations for the **chip** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Chips
    * const chips = await prisma.chip.findMany()
    * ```
    */
  get chip(): Prisma.chipDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.clause`: Exposes CRUD operations for the **clause** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clauses
    * const clauses = await prisma.clause.findMany()
    * ```
    */
  get clause(): Prisma.clauseDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.delegations`: Exposes CRUD operations for the **delegations** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Delegations
    * const delegations = await prisma.delegations.findMany()
    * ```
    */
  get delegations(): Prisma.delegationsDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.report`: Exposes CRUD operations for the **report** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reports
    * const reports = await prisma.report.findMany()
    * ```
    */
  get report(): Prisma.reportDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.report_to_chip`: Exposes CRUD operations for the **report_to_chip** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Report_to_chips
    * const report_to_chips = await prisma.report_to_chip.findMany()
    * ```
    */
  get report_to_chip(): Prisma.report_to_chipDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.report_to_clause`: Exposes CRUD operations for the **report_to_clause** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Report_to_clauses
    * const report_to_clauses = await prisma.report_to_clause.findMany()
    * ```
    */
  get report_to_clause(): Prisma.report_to_clauseDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.udaps`: Exposes CRUD operations for the **udaps** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Udaps
    * const udaps = await prisma.udaps.findMany()
    * ```
    */
  get udaps(): Prisma.udapsDelegate<GlobalReject, ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export type Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export type Args<T, F extends $Public.Operation> = $Public.Args<T, F>
  export type Payload<T, F extends $Public.Operation> = $Public.Payload<T, F>
  export type Result<T, A, F extends $Public.Operation> = $Public.Result<T, A, F>
  export type Exact<T, W> = $Public.Exact<T, W>

  /**
   * Prisma Client JS version: 4.16.2
   * Query Engine version: d6e67a83f971b175a593ccc12e15c4a757f93ffe
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    atdatabases_migrations_applied: 'atdatabases_migrations_applied',
    atdatabases_migrations_version: 'atdatabases_migrations_version',
    chip: 'chip',
    clause: 'clause',
    delegations: 'delegations',
    report: 'report',
    report_to_chip: 'report_to_chip',
    report_to_clause: 'report_to_clause',
    users: 'users',
    udaps: 'udaps'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.Args}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'atdatabases_migrations_applied' | 'atdatabases_migrations_version' | 'chip' | 'clause' | 'delegations' | 'report' | 'report_to_chip' | 'report_to_clause' | 'users' | 'udaps'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      atdatabases_migrations_applied: {
        payload: atdatabases_migrations_appliedPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.atdatabases_migrations_appliedFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<atdatabases_migrations_appliedPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.atdatabases_migrations_appliedFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<atdatabases_migrations_appliedPayload>
          }
          findFirst: {
            args: Prisma.atdatabases_migrations_appliedFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<atdatabases_migrations_appliedPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.atdatabases_migrations_appliedFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<atdatabases_migrations_appliedPayload>
          }
          findMany: {
            args: Prisma.atdatabases_migrations_appliedFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<atdatabases_migrations_appliedPayload>[]
          }
          create: {
            args: Prisma.atdatabases_migrations_appliedCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<atdatabases_migrations_appliedPayload>
          }
          createMany: {
            args: Prisma.atdatabases_migrations_appliedCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.atdatabases_migrations_appliedDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<atdatabases_migrations_appliedPayload>
          }
          update: {
            args: Prisma.atdatabases_migrations_appliedUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<atdatabases_migrations_appliedPayload>
          }
          deleteMany: {
            args: Prisma.atdatabases_migrations_appliedDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.atdatabases_migrations_appliedUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.atdatabases_migrations_appliedUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<atdatabases_migrations_appliedPayload>
          }
          aggregate: {
            args: Prisma.Atdatabases_migrations_appliedAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateAtdatabases_migrations_applied>
          }
          groupBy: {
            args: Prisma.Atdatabases_migrations_appliedGroupByArgs<ExtArgs>,
            result: $Utils.Optional<Atdatabases_migrations_appliedGroupByOutputType>[]
          }
          count: {
            args: Prisma.atdatabases_migrations_appliedCountArgs<ExtArgs>,
            result: $Utils.Optional<Atdatabases_migrations_appliedCountAggregateOutputType> | number
          }
        }
      }
      atdatabases_migrations_version: {
        payload: atdatabases_migrations_versionPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.atdatabases_migrations_versionFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<atdatabases_migrations_versionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.atdatabases_migrations_versionFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<atdatabases_migrations_versionPayload>
          }
          findFirst: {
            args: Prisma.atdatabases_migrations_versionFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<atdatabases_migrations_versionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.atdatabases_migrations_versionFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<atdatabases_migrations_versionPayload>
          }
          findMany: {
            args: Prisma.atdatabases_migrations_versionFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<atdatabases_migrations_versionPayload>[]
          }
          create: {
            args: Prisma.atdatabases_migrations_versionCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<atdatabases_migrations_versionPayload>
          }
          createMany: {
            args: Prisma.atdatabases_migrations_versionCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.atdatabases_migrations_versionDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<atdatabases_migrations_versionPayload>
          }
          update: {
            args: Prisma.atdatabases_migrations_versionUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<atdatabases_migrations_versionPayload>
          }
          deleteMany: {
            args: Prisma.atdatabases_migrations_versionDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.atdatabases_migrations_versionUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.atdatabases_migrations_versionUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<atdatabases_migrations_versionPayload>
          }
          aggregate: {
            args: Prisma.Atdatabases_migrations_versionAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateAtdatabases_migrations_version>
          }
          groupBy: {
            args: Prisma.Atdatabases_migrations_versionGroupByArgs<ExtArgs>,
            result: $Utils.Optional<Atdatabases_migrations_versionGroupByOutputType>[]
          }
          count: {
            args: Prisma.atdatabases_migrations_versionCountArgs<ExtArgs>,
            result: $Utils.Optional<Atdatabases_migrations_versionCountAggregateOutputType> | number
          }
        }
      }
      chip: {
        payload: chipPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.chipFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<chipPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.chipFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<chipPayload>
          }
          findFirst: {
            args: Prisma.chipFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<chipPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.chipFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<chipPayload>
          }
          findMany: {
            args: Prisma.chipFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<chipPayload>[]
          }
          create: {
            args: Prisma.chipCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<chipPayload>
          }
          createMany: {
            args: Prisma.chipCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.chipDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<chipPayload>
          }
          update: {
            args: Prisma.chipUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<chipPayload>
          }
          deleteMany: {
            args: Prisma.chipDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.chipUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.chipUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<chipPayload>
          }
          aggregate: {
            args: Prisma.ChipAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateChip>
          }
          groupBy: {
            args: Prisma.ChipGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ChipGroupByOutputType>[]
          }
          count: {
            args: Prisma.chipCountArgs<ExtArgs>,
            result: $Utils.Optional<ChipCountAggregateOutputType> | number
          }
        }
      }
      clause: {
        payload: clausePayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.clauseFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<clausePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.clauseFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<clausePayload>
          }
          findFirst: {
            args: Prisma.clauseFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<clausePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.clauseFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<clausePayload>
          }
          findMany: {
            args: Prisma.clauseFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<clausePayload>[]
          }
          create: {
            args: Prisma.clauseCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<clausePayload>
          }
          createMany: {
            args: Prisma.clauseCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.clauseDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<clausePayload>
          }
          update: {
            args: Prisma.clauseUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<clausePayload>
          }
          deleteMany: {
            args: Prisma.clauseDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.clauseUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.clauseUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<clausePayload>
          }
          aggregate: {
            args: Prisma.ClauseAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateClause>
          }
          groupBy: {
            args: Prisma.ClauseGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ClauseGroupByOutputType>[]
          }
          count: {
            args: Prisma.clauseCountArgs<ExtArgs>,
            result: $Utils.Optional<ClauseCountAggregateOutputType> | number
          }
        }
      }
      delegations: {
        payload: delegationsPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.delegationsFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<delegationsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.delegationsFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<delegationsPayload>
          }
          findFirst: {
            args: Prisma.delegationsFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<delegationsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.delegationsFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<delegationsPayload>
          }
          findMany: {
            args: Prisma.delegationsFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<delegationsPayload>[]
          }
          create: {
            args: Prisma.delegationsCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<delegationsPayload>
          }
          createMany: {
            args: Prisma.delegationsCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.delegationsDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<delegationsPayload>
          }
          update: {
            args: Prisma.delegationsUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<delegationsPayload>
          }
          deleteMany: {
            args: Prisma.delegationsDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.delegationsUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.delegationsUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<delegationsPayload>
          }
          aggregate: {
            args: Prisma.DelegationsAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateDelegations>
          }
          groupBy: {
            args: Prisma.DelegationsGroupByArgs<ExtArgs>,
            result: $Utils.Optional<DelegationsGroupByOutputType>[]
          }
          count: {
            args: Prisma.delegationsCountArgs<ExtArgs>,
            result: $Utils.Optional<DelegationsCountAggregateOutputType> | number
          }
        }
      }
      report: {
        payload: reportPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.reportFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<reportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.reportFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<reportPayload>
          }
          findFirst: {
            args: Prisma.reportFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<reportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.reportFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<reportPayload>
          }
          findMany: {
            args: Prisma.reportFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<reportPayload>[]
          }
          create: {
            args: Prisma.reportCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<reportPayload>
          }
          createMany: {
            args: Prisma.reportCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.reportDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<reportPayload>
          }
          update: {
            args: Prisma.reportUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<reportPayload>
          }
          deleteMany: {
            args: Prisma.reportDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.reportUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.reportUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<reportPayload>
          }
          aggregate: {
            args: Prisma.ReportAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateReport>
          }
          groupBy: {
            args: Prisma.ReportGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ReportGroupByOutputType>[]
          }
          count: {
            args: Prisma.reportCountArgs<ExtArgs>,
            result: $Utils.Optional<ReportCountAggregateOutputType> | number
          }
        }
      }
      report_to_chip: {
        payload: report_to_chipPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.report_to_chipFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<report_to_chipPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.report_to_chipFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<report_to_chipPayload>
          }
          findFirst: {
            args: Prisma.report_to_chipFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<report_to_chipPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.report_to_chipFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<report_to_chipPayload>
          }
          findMany: {
            args: Prisma.report_to_chipFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<report_to_chipPayload>[]
          }
          create: {
            args: Prisma.report_to_chipCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<report_to_chipPayload>
          }
          createMany: {
            args: Prisma.report_to_chipCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.report_to_chipDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<report_to_chipPayload>
          }
          update: {
            args: Prisma.report_to_chipUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<report_to_chipPayload>
          }
          deleteMany: {
            args: Prisma.report_to_chipDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.report_to_chipUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.report_to_chipUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<report_to_chipPayload>
          }
          aggregate: {
            args: Prisma.Report_to_chipAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateReport_to_chip>
          }
          groupBy: {
            args: Prisma.Report_to_chipGroupByArgs<ExtArgs>,
            result: $Utils.Optional<Report_to_chipGroupByOutputType>[]
          }
          count: {
            args: Prisma.report_to_chipCountArgs<ExtArgs>,
            result: $Utils.Optional<Report_to_chipCountAggregateOutputType> | number
          }
        }
      }
      report_to_clause: {
        payload: report_to_clausePayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.report_to_clauseFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<report_to_clausePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.report_to_clauseFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<report_to_clausePayload>
          }
          findFirst: {
            args: Prisma.report_to_clauseFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<report_to_clausePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.report_to_clauseFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<report_to_clausePayload>
          }
          findMany: {
            args: Prisma.report_to_clauseFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<report_to_clausePayload>[]
          }
          create: {
            args: Prisma.report_to_clauseCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<report_to_clausePayload>
          }
          createMany: {
            args: Prisma.report_to_clauseCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.report_to_clauseDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<report_to_clausePayload>
          }
          update: {
            args: Prisma.report_to_clauseUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<report_to_clausePayload>
          }
          deleteMany: {
            args: Prisma.report_to_clauseDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.report_to_clauseUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.report_to_clauseUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<report_to_clausePayload>
          }
          aggregate: {
            args: Prisma.Report_to_clauseAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateReport_to_clause>
          }
          groupBy: {
            args: Prisma.Report_to_clauseGroupByArgs<ExtArgs>,
            result: $Utils.Optional<Report_to_clauseGroupByOutputType>[]
          }
          count: {
            args: Prisma.report_to_clauseCountArgs<ExtArgs>,
            result: $Utils.Optional<Report_to_clauseCountAggregateOutputType> | number
          }
        }
      }
      users: {
        payload: usersPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.usersFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.usersFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<usersPayload>
          }
          findFirst: {
            args: Prisma.usersFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.usersFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<usersPayload>
          }
          findMany: {
            args: Prisma.usersFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<usersPayload>[]
          }
          create: {
            args: Prisma.usersCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<usersPayload>
          }
          createMany: {
            args: Prisma.usersCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.usersDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<usersPayload>
          }
          update: {
            args: Prisma.usersUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<usersPayload>
          }
          deleteMany: {
            args: Prisma.usersDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.usersUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.usersUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<usersPayload>
          }
          aggregate: {
            args: Prisma.UsersAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUsers>
          }
          groupBy: {
            args: Prisma.UsersGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UsersGroupByOutputType>[]
          }
          count: {
            args: Prisma.usersCountArgs<ExtArgs>,
            result: $Utils.Optional<UsersCountAggregateOutputType> | number
          }
        }
      }
      udaps: {
        payload: udapsPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.udapsFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<udapsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.udapsFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<udapsPayload>
          }
          findFirst: {
            args: Prisma.udapsFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<udapsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.udapsFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<udapsPayload>
          }
          findMany: {
            args: Prisma.udapsFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<udapsPayload>[]
          }
          create: {
            args: Prisma.udapsCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<udapsPayload>
          }
          createMany: {
            args: Prisma.udapsCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.udapsDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<udapsPayload>
          }
          update: {
            args: Prisma.udapsUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<udapsPayload>
          }
          deleteMany: {
            args: Prisma.udapsDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.udapsUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.udapsUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<udapsPayload>
          }
          aggregate: {
            args: Prisma.UdapsAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUdaps>
          }
          groupBy: {
            args: Prisma.UdapsGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UdapsGroupByOutputType>[]
          }
          count: {
            args: Prisma.udapsCountArgs<ExtArgs>,
            result: $Utils.Optional<UdapsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ChipCountOutputType
   */


  export type ChipCountOutputType = {
    report_to_chip: number
  }

  export type ChipCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    report_to_chip?: boolean | ChipCountOutputTypeCountReport_to_chipArgs
  }

  // Custom InputTypes

  /**
   * ChipCountOutputType without action
   */
  export type ChipCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChipCountOutputType
     */
    select?: ChipCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * ChipCountOutputType without action
   */
  export type ChipCountOutputTypeCountReport_to_chipArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: report_to_chipWhereInput
  }



  /**
   * Count Type ClauseCountOutputType
   */


  export type ClauseCountOutputType = {
    report_to_clause: number
  }

  export type ClauseCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    report_to_clause?: boolean | ClauseCountOutputTypeCountReport_to_clauseArgs
  }

  // Custom InputTypes

  /**
   * ClauseCountOutputType without action
   */
  export type ClauseCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClauseCountOutputType
     */
    select?: ClauseCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * ClauseCountOutputType without action
   */
  export type ClauseCountOutputTypeCountReport_to_clauseArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: report_to_clauseWhereInput
  }



  /**
   * Count Type ReportCountOutputType
   */


  export type ReportCountOutputType = {
    report_to_chip: number
    report_to_clause: number
  }

  export type ReportCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    report_to_chip?: boolean | ReportCountOutputTypeCountReport_to_chipArgs
    report_to_clause?: boolean | ReportCountOutputTypeCountReport_to_clauseArgs
  }

  // Custom InputTypes

  /**
   * ReportCountOutputType without action
   */
  export type ReportCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportCountOutputType
     */
    select?: ReportCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * ReportCountOutputType without action
   */
  export type ReportCountOutputTypeCountReport_to_chipArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: report_to_chipWhereInput
  }


  /**
   * ReportCountOutputType without action
   */
  export type ReportCountOutputTypeCountReport_to_clauseArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: report_to_clauseWhereInput
  }



  /**
   * Count Type UdapsCountOutputType
   */


  export type UdapsCountOutputType = {
    users: number
  }

  export type UdapsCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    users?: boolean | UdapsCountOutputTypeCountUsersArgs
  }

  // Custom InputTypes

  /**
   * UdapsCountOutputType without action
   */
  export type UdapsCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UdapsCountOutputType
     */
    select?: UdapsCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * UdapsCountOutputType without action
   */
  export type UdapsCountOutputTypeCountUsersArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
  }



  /**
   * Models
   */

  /**
   * Model atdatabases_migrations_applied
   */


  export type AggregateAtdatabases_migrations_applied = {
    _count: Atdatabases_migrations_appliedCountAggregateOutputType | null
    _avg: Atdatabases_migrations_appliedAvgAggregateOutputType | null
    _sum: Atdatabases_migrations_appliedSumAggregateOutputType | null
    _min: Atdatabases_migrations_appliedMinAggregateOutputType | null
    _max: Atdatabases_migrations_appliedMaxAggregateOutputType | null
  }

  export type Atdatabases_migrations_appliedAvgAggregateOutputType = {
    id: number | null
    index: number | null
  }

  export type Atdatabases_migrations_appliedSumAggregateOutputType = {
    id: bigint | null
    index: number | null
  }

  export type Atdatabases_migrations_appliedMinAggregateOutputType = {
    id: bigint | null
    index: number | null
    name: string | null
    script: string | null
    applied_at: Date | null
    ignored_error: string | null
    obsolete: boolean | null
  }

  export type Atdatabases_migrations_appliedMaxAggregateOutputType = {
    id: bigint | null
    index: number | null
    name: string | null
    script: string | null
    applied_at: Date | null
    ignored_error: string | null
    obsolete: boolean | null
  }

  export type Atdatabases_migrations_appliedCountAggregateOutputType = {
    id: number
    index: number
    name: number
    script: number
    applied_at: number
    ignored_error: number
    obsolete: number
    _all: number
  }


  export type Atdatabases_migrations_appliedAvgAggregateInputType = {
    id?: true
    index?: true
  }

  export type Atdatabases_migrations_appliedSumAggregateInputType = {
    id?: true
    index?: true
  }

  export type Atdatabases_migrations_appliedMinAggregateInputType = {
    id?: true
    index?: true
    name?: true
    script?: true
    applied_at?: true
    ignored_error?: true
    obsolete?: true
  }

  export type Atdatabases_migrations_appliedMaxAggregateInputType = {
    id?: true
    index?: true
    name?: true
    script?: true
    applied_at?: true
    ignored_error?: true
    obsolete?: true
  }

  export type Atdatabases_migrations_appliedCountAggregateInputType = {
    id?: true
    index?: true
    name?: true
    script?: true
    applied_at?: true
    ignored_error?: true
    obsolete?: true
    _all?: true
  }

  export type Atdatabases_migrations_appliedAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which atdatabases_migrations_applied to aggregate.
     */
    where?: atdatabases_migrations_appliedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of atdatabases_migrations_applieds to fetch.
     */
    orderBy?: Enumerable<atdatabases_migrations_appliedOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: atdatabases_migrations_appliedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` atdatabases_migrations_applieds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` atdatabases_migrations_applieds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned atdatabases_migrations_applieds
    **/
    _count?: true | Atdatabases_migrations_appliedCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Atdatabases_migrations_appliedAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Atdatabases_migrations_appliedSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Atdatabases_migrations_appliedMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Atdatabases_migrations_appliedMaxAggregateInputType
  }

  export type GetAtdatabases_migrations_appliedAggregateType<T extends Atdatabases_migrations_appliedAggregateArgs> = {
        [P in keyof T & keyof AggregateAtdatabases_migrations_applied]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAtdatabases_migrations_applied[P]>
      : GetScalarType<T[P], AggregateAtdatabases_migrations_applied[P]>
  }




  export type Atdatabases_migrations_appliedGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: atdatabases_migrations_appliedWhereInput
    orderBy?: Enumerable<atdatabases_migrations_appliedOrderByWithAggregationInput>
    by: Atdatabases_migrations_appliedScalarFieldEnum[]
    having?: atdatabases_migrations_appliedScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Atdatabases_migrations_appliedCountAggregateInputType | true
    _avg?: Atdatabases_migrations_appliedAvgAggregateInputType
    _sum?: Atdatabases_migrations_appliedSumAggregateInputType
    _min?: Atdatabases_migrations_appliedMinAggregateInputType
    _max?: Atdatabases_migrations_appliedMaxAggregateInputType
  }


  export type Atdatabases_migrations_appliedGroupByOutputType = {
    id: bigint
    index: number
    name: string
    script: string
    applied_at: Date
    ignored_error: string | null
    obsolete: boolean
    _count: Atdatabases_migrations_appliedCountAggregateOutputType | null
    _avg: Atdatabases_migrations_appliedAvgAggregateOutputType | null
    _sum: Atdatabases_migrations_appliedSumAggregateOutputType | null
    _min: Atdatabases_migrations_appliedMinAggregateOutputType | null
    _max: Atdatabases_migrations_appliedMaxAggregateOutputType | null
  }

  type GetAtdatabases_migrations_appliedGroupByPayload<T extends Atdatabases_migrations_appliedGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<Atdatabases_migrations_appliedGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Atdatabases_migrations_appliedGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Atdatabases_migrations_appliedGroupByOutputType[P]>
            : GetScalarType<T[P], Atdatabases_migrations_appliedGroupByOutputType[P]>
        }
      >
    >


  export type atdatabases_migrations_appliedSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    index?: boolean
    name?: boolean
    script?: boolean
    applied_at?: boolean
    ignored_error?: boolean
    obsolete?: boolean
  }, ExtArgs["result"]["atdatabases_migrations_applied"]>

  export type atdatabases_migrations_appliedSelectScalar = {
    id?: boolean
    index?: boolean
    name?: boolean
    script?: boolean
    applied_at?: boolean
    ignored_error?: boolean
    obsolete?: boolean
  }


  type atdatabases_migrations_appliedGetPayload<S extends boolean | null | undefined | atdatabases_migrations_appliedArgs> = $Types.GetResult<atdatabases_migrations_appliedPayload, S>

  type atdatabases_migrations_appliedCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<atdatabases_migrations_appliedFindManyArgs, 'select' | 'include'> & {
      select?: Atdatabases_migrations_appliedCountAggregateInputType | true
    }

  export interface atdatabases_migrations_appliedDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['atdatabases_migrations_applied'], meta: { name: 'atdatabases_migrations_applied' } }
    /**
     * Find zero or one Atdatabases_migrations_applied that matches the filter.
     * @param {atdatabases_migrations_appliedFindUniqueArgs} args - Arguments to find a Atdatabases_migrations_applied
     * @example
     * // Get one Atdatabases_migrations_applied
     * const atdatabases_migrations_applied = await prisma.atdatabases_migrations_applied.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends atdatabases_migrations_appliedFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, atdatabases_migrations_appliedFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'atdatabases_migrations_applied'> extends True ? Prisma__atdatabases_migrations_appliedClient<$Types.GetResult<atdatabases_migrations_appliedPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__atdatabases_migrations_appliedClient<$Types.GetResult<atdatabases_migrations_appliedPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Atdatabases_migrations_applied that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {atdatabases_migrations_appliedFindUniqueOrThrowArgs} args - Arguments to find a Atdatabases_migrations_applied
     * @example
     * // Get one Atdatabases_migrations_applied
     * const atdatabases_migrations_applied = await prisma.atdatabases_migrations_applied.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends atdatabases_migrations_appliedFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, atdatabases_migrations_appliedFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__atdatabases_migrations_appliedClient<$Types.GetResult<atdatabases_migrations_appliedPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Atdatabases_migrations_applied that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {atdatabases_migrations_appliedFindFirstArgs} args - Arguments to find a Atdatabases_migrations_applied
     * @example
     * // Get one Atdatabases_migrations_applied
     * const atdatabases_migrations_applied = await prisma.atdatabases_migrations_applied.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends atdatabases_migrations_appliedFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, atdatabases_migrations_appliedFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'atdatabases_migrations_applied'> extends True ? Prisma__atdatabases_migrations_appliedClient<$Types.GetResult<atdatabases_migrations_appliedPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__atdatabases_migrations_appliedClient<$Types.GetResult<atdatabases_migrations_appliedPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Atdatabases_migrations_applied that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {atdatabases_migrations_appliedFindFirstOrThrowArgs} args - Arguments to find a Atdatabases_migrations_applied
     * @example
     * // Get one Atdatabases_migrations_applied
     * const atdatabases_migrations_applied = await prisma.atdatabases_migrations_applied.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends atdatabases_migrations_appliedFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, atdatabases_migrations_appliedFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__atdatabases_migrations_appliedClient<$Types.GetResult<atdatabases_migrations_appliedPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Atdatabases_migrations_applieds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {atdatabases_migrations_appliedFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Atdatabases_migrations_applieds
     * const atdatabases_migrations_applieds = await prisma.atdatabases_migrations_applied.findMany()
     * 
     * // Get first 10 Atdatabases_migrations_applieds
     * const atdatabases_migrations_applieds = await prisma.atdatabases_migrations_applied.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const atdatabases_migrations_appliedWithIdOnly = await prisma.atdatabases_migrations_applied.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends atdatabases_migrations_appliedFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, atdatabases_migrations_appliedFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<atdatabases_migrations_appliedPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Atdatabases_migrations_applied.
     * @param {atdatabases_migrations_appliedCreateArgs} args - Arguments to create a Atdatabases_migrations_applied.
     * @example
     * // Create one Atdatabases_migrations_applied
     * const Atdatabases_migrations_applied = await prisma.atdatabases_migrations_applied.create({
     *   data: {
     *     // ... data to create a Atdatabases_migrations_applied
     *   }
     * })
     * 
    **/
    create<T extends atdatabases_migrations_appliedCreateArgs<ExtArgs>>(
      args: SelectSubset<T, atdatabases_migrations_appliedCreateArgs<ExtArgs>>
    ): Prisma__atdatabases_migrations_appliedClient<$Types.GetResult<atdatabases_migrations_appliedPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Atdatabases_migrations_applieds.
     *     @param {atdatabases_migrations_appliedCreateManyArgs} args - Arguments to create many Atdatabases_migrations_applieds.
     *     @example
     *     // Create many Atdatabases_migrations_applieds
     *     const atdatabases_migrations_applied = await prisma.atdatabases_migrations_applied.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends atdatabases_migrations_appliedCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, atdatabases_migrations_appliedCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Atdatabases_migrations_applied.
     * @param {atdatabases_migrations_appliedDeleteArgs} args - Arguments to delete one Atdatabases_migrations_applied.
     * @example
     * // Delete one Atdatabases_migrations_applied
     * const Atdatabases_migrations_applied = await prisma.atdatabases_migrations_applied.delete({
     *   where: {
     *     // ... filter to delete one Atdatabases_migrations_applied
     *   }
     * })
     * 
    **/
    delete<T extends atdatabases_migrations_appliedDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, atdatabases_migrations_appliedDeleteArgs<ExtArgs>>
    ): Prisma__atdatabases_migrations_appliedClient<$Types.GetResult<atdatabases_migrations_appliedPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Atdatabases_migrations_applied.
     * @param {atdatabases_migrations_appliedUpdateArgs} args - Arguments to update one Atdatabases_migrations_applied.
     * @example
     * // Update one Atdatabases_migrations_applied
     * const atdatabases_migrations_applied = await prisma.atdatabases_migrations_applied.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends atdatabases_migrations_appliedUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, atdatabases_migrations_appliedUpdateArgs<ExtArgs>>
    ): Prisma__atdatabases_migrations_appliedClient<$Types.GetResult<atdatabases_migrations_appliedPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Atdatabases_migrations_applieds.
     * @param {atdatabases_migrations_appliedDeleteManyArgs} args - Arguments to filter Atdatabases_migrations_applieds to delete.
     * @example
     * // Delete a few Atdatabases_migrations_applieds
     * const { count } = await prisma.atdatabases_migrations_applied.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends atdatabases_migrations_appliedDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, atdatabases_migrations_appliedDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Atdatabases_migrations_applieds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {atdatabases_migrations_appliedUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Atdatabases_migrations_applieds
     * const atdatabases_migrations_applied = await prisma.atdatabases_migrations_applied.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends atdatabases_migrations_appliedUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, atdatabases_migrations_appliedUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Atdatabases_migrations_applied.
     * @param {atdatabases_migrations_appliedUpsertArgs} args - Arguments to update or create a Atdatabases_migrations_applied.
     * @example
     * // Update or create a Atdatabases_migrations_applied
     * const atdatabases_migrations_applied = await prisma.atdatabases_migrations_applied.upsert({
     *   create: {
     *     // ... data to create a Atdatabases_migrations_applied
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Atdatabases_migrations_applied we want to update
     *   }
     * })
    **/
    upsert<T extends atdatabases_migrations_appliedUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, atdatabases_migrations_appliedUpsertArgs<ExtArgs>>
    ): Prisma__atdatabases_migrations_appliedClient<$Types.GetResult<atdatabases_migrations_appliedPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Atdatabases_migrations_applieds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {atdatabases_migrations_appliedCountArgs} args - Arguments to filter Atdatabases_migrations_applieds to count.
     * @example
     * // Count the number of Atdatabases_migrations_applieds
     * const count = await prisma.atdatabases_migrations_applied.count({
     *   where: {
     *     // ... the filter for the Atdatabases_migrations_applieds we want to count
     *   }
     * })
    **/
    count<T extends atdatabases_migrations_appliedCountArgs>(
      args?: Subset<T, atdatabases_migrations_appliedCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Atdatabases_migrations_appliedCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Atdatabases_migrations_applied.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Atdatabases_migrations_appliedAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Atdatabases_migrations_appliedAggregateArgs>(args: Subset<T, Atdatabases_migrations_appliedAggregateArgs>): Prisma.PrismaPromise<GetAtdatabases_migrations_appliedAggregateType<T>>

    /**
     * Group by Atdatabases_migrations_applied.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Atdatabases_migrations_appliedGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Atdatabases_migrations_appliedGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Atdatabases_migrations_appliedGroupByArgs['orderBy'] }
        : { orderBy?: Atdatabases_migrations_appliedGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Atdatabases_migrations_appliedGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAtdatabases_migrations_appliedGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for atdatabases_migrations_applied.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__atdatabases_migrations_appliedClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * atdatabases_migrations_applied base type for findUnique actions
   */
  export type atdatabases_migrations_appliedFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_applied
     */
    select?: atdatabases_migrations_appliedSelect<ExtArgs> | null
    /**
     * Filter, which atdatabases_migrations_applied to fetch.
     */
    where: atdatabases_migrations_appliedWhereUniqueInput
  }

  /**
   * atdatabases_migrations_applied findUnique
   */
  export interface atdatabases_migrations_appliedFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends atdatabases_migrations_appliedFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * atdatabases_migrations_applied findUniqueOrThrow
   */
  export type atdatabases_migrations_appliedFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_applied
     */
    select?: atdatabases_migrations_appliedSelect<ExtArgs> | null
    /**
     * Filter, which atdatabases_migrations_applied to fetch.
     */
    where: atdatabases_migrations_appliedWhereUniqueInput
  }


  /**
   * atdatabases_migrations_applied base type for findFirst actions
   */
  export type atdatabases_migrations_appliedFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_applied
     */
    select?: atdatabases_migrations_appliedSelect<ExtArgs> | null
    /**
     * Filter, which atdatabases_migrations_applied to fetch.
     */
    where?: atdatabases_migrations_appliedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of atdatabases_migrations_applieds to fetch.
     */
    orderBy?: Enumerable<atdatabases_migrations_appliedOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for atdatabases_migrations_applieds.
     */
    cursor?: atdatabases_migrations_appliedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` atdatabases_migrations_applieds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` atdatabases_migrations_applieds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of atdatabases_migrations_applieds.
     */
    distinct?: Enumerable<Atdatabases_migrations_appliedScalarFieldEnum>
  }

  /**
   * atdatabases_migrations_applied findFirst
   */
  export interface atdatabases_migrations_appliedFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends atdatabases_migrations_appliedFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * atdatabases_migrations_applied findFirstOrThrow
   */
  export type atdatabases_migrations_appliedFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_applied
     */
    select?: atdatabases_migrations_appliedSelect<ExtArgs> | null
    /**
     * Filter, which atdatabases_migrations_applied to fetch.
     */
    where?: atdatabases_migrations_appliedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of atdatabases_migrations_applieds to fetch.
     */
    orderBy?: Enumerable<atdatabases_migrations_appliedOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for atdatabases_migrations_applieds.
     */
    cursor?: atdatabases_migrations_appliedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` atdatabases_migrations_applieds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` atdatabases_migrations_applieds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of atdatabases_migrations_applieds.
     */
    distinct?: Enumerable<Atdatabases_migrations_appliedScalarFieldEnum>
  }


  /**
   * atdatabases_migrations_applied findMany
   */
  export type atdatabases_migrations_appliedFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_applied
     */
    select?: atdatabases_migrations_appliedSelect<ExtArgs> | null
    /**
     * Filter, which atdatabases_migrations_applieds to fetch.
     */
    where?: atdatabases_migrations_appliedWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of atdatabases_migrations_applieds to fetch.
     */
    orderBy?: Enumerable<atdatabases_migrations_appliedOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing atdatabases_migrations_applieds.
     */
    cursor?: atdatabases_migrations_appliedWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` atdatabases_migrations_applieds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` atdatabases_migrations_applieds.
     */
    skip?: number
    distinct?: Enumerable<Atdatabases_migrations_appliedScalarFieldEnum>
  }


  /**
   * atdatabases_migrations_applied create
   */
  export type atdatabases_migrations_appliedCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_applied
     */
    select?: atdatabases_migrations_appliedSelect<ExtArgs> | null
    /**
     * The data needed to create a atdatabases_migrations_applied.
     */
    data: XOR<atdatabases_migrations_appliedCreateInput, atdatabases_migrations_appliedUncheckedCreateInput>
  }


  /**
   * atdatabases_migrations_applied createMany
   */
  export type atdatabases_migrations_appliedCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many atdatabases_migrations_applieds.
     */
    data: Enumerable<atdatabases_migrations_appliedCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * atdatabases_migrations_applied update
   */
  export type atdatabases_migrations_appliedUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_applied
     */
    select?: atdatabases_migrations_appliedSelect<ExtArgs> | null
    /**
     * The data needed to update a atdatabases_migrations_applied.
     */
    data: XOR<atdatabases_migrations_appliedUpdateInput, atdatabases_migrations_appliedUncheckedUpdateInput>
    /**
     * Choose, which atdatabases_migrations_applied to update.
     */
    where: atdatabases_migrations_appliedWhereUniqueInput
  }


  /**
   * atdatabases_migrations_applied updateMany
   */
  export type atdatabases_migrations_appliedUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update atdatabases_migrations_applieds.
     */
    data: XOR<atdatabases_migrations_appliedUpdateManyMutationInput, atdatabases_migrations_appliedUncheckedUpdateManyInput>
    /**
     * Filter which atdatabases_migrations_applieds to update
     */
    where?: atdatabases_migrations_appliedWhereInput
  }


  /**
   * atdatabases_migrations_applied upsert
   */
  export type atdatabases_migrations_appliedUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_applied
     */
    select?: atdatabases_migrations_appliedSelect<ExtArgs> | null
    /**
     * The filter to search for the atdatabases_migrations_applied to update in case it exists.
     */
    where: atdatabases_migrations_appliedWhereUniqueInput
    /**
     * In case the atdatabases_migrations_applied found by the `where` argument doesn't exist, create a new atdatabases_migrations_applied with this data.
     */
    create: XOR<atdatabases_migrations_appliedCreateInput, atdatabases_migrations_appliedUncheckedCreateInput>
    /**
     * In case the atdatabases_migrations_applied was found with the provided `where` argument, update it with this data.
     */
    update: XOR<atdatabases_migrations_appliedUpdateInput, atdatabases_migrations_appliedUncheckedUpdateInput>
  }


  /**
   * atdatabases_migrations_applied delete
   */
  export type atdatabases_migrations_appliedDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_applied
     */
    select?: atdatabases_migrations_appliedSelect<ExtArgs> | null
    /**
     * Filter which atdatabases_migrations_applied to delete.
     */
    where: atdatabases_migrations_appliedWhereUniqueInput
  }


  /**
   * atdatabases_migrations_applied deleteMany
   */
  export type atdatabases_migrations_appliedDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which atdatabases_migrations_applieds to delete
     */
    where?: atdatabases_migrations_appliedWhereInput
  }


  /**
   * atdatabases_migrations_applied without action
   */
  export type atdatabases_migrations_appliedArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_applied
     */
    select?: atdatabases_migrations_appliedSelect<ExtArgs> | null
  }



  /**
   * Model atdatabases_migrations_version
   */


  export type AggregateAtdatabases_migrations_version = {
    _count: Atdatabases_migrations_versionCountAggregateOutputType | null
    _avg: Atdatabases_migrations_versionAvgAggregateOutputType | null
    _sum: Atdatabases_migrations_versionSumAggregateOutputType | null
    _min: Atdatabases_migrations_versionMinAggregateOutputType | null
    _max: Atdatabases_migrations_versionMaxAggregateOutputType | null
  }

  export type Atdatabases_migrations_versionAvgAggregateOutputType = {
    id: number | null
  }

  export type Atdatabases_migrations_versionSumAggregateOutputType = {
    id: number | null
  }

  export type Atdatabases_migrations_versionMinAggregateOutputType = {
    id: number | null
    version: string | null
  }

  export type Atdatabases_migrations_versionMaxAggregateOutputType = {
    id: number | null
    version: string | null
  }

  export type Atdatabases_migrations_versionCountAggregateOutputType = {
    id: number
    version: number
    _all: number
  }


  export type Atdatabases_migrations_versionAvgAggregateInputType = {
    id?: true
  }

  export type Atdatabases_migrations_versionSumAggregateInputType = {
    id?: true
  }

  export type Atdatabases_migrations_versionMinAggregateInputType = {
    id?: true
    version?: true
  }

  export type Atdatabases_migrations_versionMaxAggregateInputType = {
    id?: true
    version?: true
  }

  export type Atdatabases_migrations_versionCountAggregateInputType = {
    id?: true
    version?: true
    _all?: true
  }

  export type Atdatabases_migrations_versionAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which atdatabases_migrations_version to aggregate.
     */
    where?: atdatabases_migrations_versionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of atdatabases_migrations_versions to fetch.
     */
    orderBy?: Enumerable<atdatabases_migrations_versionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: atdatabases_migrations_versionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` atdatabases_migrations_versions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` atdatabases_migrations_versions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned atdatabases_migrations_versions
    **/
    _count?: true | Atdatabases_migrations_versionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Atdatabases_migrations_versionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Atdatabases_migrations_versionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Atdatabases_migrations_versionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Atdatabases_migrations_versionMaxAggregateInputType
  }

  export type GetAtdatabases_migrations_versionAggregateType<T extends Atdatabases_migrations_versionAggregateArgs> = {
        [P in keyof T & keyof AggregateAtdatabases_migrations_version]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAtdatabases_migrations_version[P]>
      : GetScalarType<T[P], AggregateAtdatabases_migrations_version[P]>
  }




  export type Atdatabases_migrations_versionGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: atdatabases_migrations_versionWhereInput
    orderBy?: Enumerable<atdatabases_migrations_versionOrderByWithAggregationInput>
    by: Atdatabases_migrations_versionScalarFieldEnum[]
    having?: atdatabases_migrations_versionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Atdatabases_migrations_versionCountAggregateInputType | true
    _avg?: Atdatabases_migrations_versionAvgAggregateInputType
    _sum?: Atdatabases_migrations_versionSumAggregateInputType
    _min?: Atdatabases_migrations_versionMinAggregateInputType
    _max?: Atdatabases_migrations_versionMaxAggregateInputType
  }


  export type Atdatabases_migrations_versionGroupByOutputType = {
    id: number
    version: string | null
    _count: Atdatabases_migrations_versionCountAggregateOutputType | null
    _avg: Atdatabases_migrations_versionAvgAggregateOutputType | null
    _sum: Atdatabases_migrations_versionSumAggregateOutputType | null
    _min: Atdatabases_migrations_versionMinAggregateOutputType | null
    _max: Atdatabases_migrations_versionMaxAggregateOutputType | null
  }

  type GetAtdatabases_migrations_versionGroupByPayload<T extends Atdatabases_migrations_versionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<Atdatabases_migrations_versionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Atdatabases_migrations_versionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Atdatabases_migrations_versionGroupByOutputType[P]>
            : GetScalarType<T[P], Atdatabases_migrations_versionGroupByOutputType[P]>
        }
      >
    >


  export type atdatabases_migrations_versionSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    version?: boolean
  }, ExtArgs["result"]["atdatabases_migrations_version"]>

  export type atdatabases_migrations_versionSelectScalar = {
    id?: boolean
    version?: boolean
  }


  type atdatabases_migrations_versionGetPayload<S extends boolean | null | undefined | atdatabases_migrations_versionArgs> = $Types.GetResult<atdatabases_migrations_versionPayload, S>

  type atdatabases_migrations_versionCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<atdatabases_migrations_versionFindManyArgs, 'select' | 'include'> & {
      select?: Atdatabases_migrations_versionCountAggregateInputType | true
    }

  export interface atdatabases_migrations_versionDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['atdatabases_migrations_version'], meta: { name: 'atdatabases_migrations_version' } }
    /**
     * Find zero or one Atdatabases_migrations_version that matches the filter.
     * @param {atdatabases_migrations_versionFindUniqueArgs} args - Arguments to find a Atdatabases_migrations_version
     * @example
     * // Get one Atdatabases_migrations_version
     * const atdatabases_migrations_version = await prisma.atdatabases_migrations_version.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends atdatabases_migrations_versionFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, atdatabases_migrations_versionFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'atdatabases_migrations_version'> extends True ? Prisma__atdatabases_migrations_versionClient<$Types.GetResult<atdatabases_migrations_versionPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__atdatabases_migrations_versionClient<$Types.GetResult<atdatabases_migrations_versionPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Atdatabases_migrations_version that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {atdatabases_migrations_versionFindUniqueOrThrowArgs} args - Arguments to find a Atdatabases_migrations_version
     * @example
     * // Get one Atdatabases_migrations_version
     * const atdatabases_migrations_version = await prisma.atdatabases_migrations_version.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends atdatabases_migrations_versionFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, atdatabases_migrations_versionFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__atdatabases_migrations_versionClient<$Types.GetResult<atdatabases_migrations_versionPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Atdatabases_migrations_version that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {atdatabases_migrations_versionFindFirstArgs} args - Arguments to find a Atdatabases_migrations_version
     * @example
     * // Get one Atdatabases_migrations_version
     * const atdatabases_migrations_version = await prisma.atdatabases_migrations_version.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends atdatabases_migrations_versionFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, atdatabases_migrations_versionFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'atdatabases_migrations_version'> extends True ? Prisma__atdatabases_migrations_versionClient<$Types.GetResult<atdatabases_migrations_versionPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__atdatabases_migrations_versionClient<$Types.GetResult<atdatabases_migrations_versionPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Atdatabases_migrations_version that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {atdatabases_migrations_versionFindFirstOrThrowArgs} args - Arguments to find a Atdatabases_migrations_version
     * @example
     * // Get one Atdatabases_migrations_version
     * const atdatabases_migrations_version = await prisma.atdatabases_migrations_version.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends atdatabases_migrations_versionFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, atdatabases_migrations_versionFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__atdatabases_migrations_versionClient<$Types.GetResult<atdatabases_migrations_versionPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Atdatabases_migrations_versions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {atdatabases_migrations_versionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Atdatabases_migrations_versions
     * const atdatabases_migrations_versions = await prisma.atdatabases_migrations_version.findMany()
     * 
     * // Get first 10 Atdatabases_migrations_versions
     * const atdatabases_migrations_versions = await prisma.atdatabases_migrations_version.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const atdatabases_migrations_versionWithIdOnly = await prisma.atdatabases_migrations_version.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends atdatabases_migrations_versionFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, atdatabases_migrations_versionFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<atdatabases_migrations_versionPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Atdatabases_migrations_version.
     * @param {atdatabases_migrations_versionCreateArgs} args - Arguments to create a Atdatabases_migrations_version.
     * @example
     * // Create one Atdatabases_migrations_version
     * const Atdatabases_migrations_version = await prisma.atdatabases_migrations_version.create({
     *   data: {
     *     // ... data to create a Atdatabases_migrations_version
     *   }
     * })
     * 
    **/
    create<T extends atdatabases_migrations_versionCreateArgs<ExtArgs>>(
      args: SelectSubset<T, atdatabases_migrations_versionCreateArgs<ExtArgs>>
    ): Prisma__atdatabases_migrations_versionClient<$Types.GetResult<atdatabases_migrations_versionPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Atdatabases_migrations_versions.
     *     @param {atdatabases_migrations_versionCreateManyArgs} args - Arguments to create many Atdatabases_migrations_versions.
     *     @example
     *     // Create many Atdatabases_migrations_versions
     *     const atdatabases_migrations_version = await prisma.atdatabases_migrations_version.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends atdatabases_migrations_versionCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, atdatabases_migrations_versionCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Atdatabases_migrations_version.
     * @param {atdatabases_migrations_versionDeleteArgs} args - Arguments to delete one Atdatabases_migrations_version.
     * @example
     * // Delete one Atdatabases_migrations_version
     * const Atdatabases_migrations_version = await prisma.atdatabases_migrations_version.delete({
     *   where: {
     *     // ... filter to delete one Atdatabases_migrations_version
     *   }
     * })
     * 
    **/
    delete<T extends atdatabases_migrations_versionDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, atdatabases_migrations_versionDeleteArgs<ExtArgs>>
    ): Prisma__atdatabases_migrations_versionClient<$Types.GetResult<atdatabases_migrations_versionPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Atdatabases_migrations_version.
     * @param {atdatabases_migrations_versionUpdateArgs} args - Arguments to update one Atdatabases_migrations_version.
     * @example
     * // Update one Atdatabases_migrations_version
     * const atdatabases_migrations_version = await prisma.atdatabases_migrations_version.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends atdatabases_migrations_versionUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, atdatabases_migrations_versionUpdateArgs<ExtArgs>>
    ): Prisma__atdatabases_migrations_versionClient<$Types.GetResult<atdatabases_migrations_versionPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Atdatabases_migrations_versions.
     * @param {atdatabases_migrations_versionDeleteManyArgs} args - Arguments to filter Atdatabases_migrations_versions to delete.
     * @example
     * // Delete a few Atdatabases_migrations_versions
     * const { count } = await prisma.atdatabases_migrations_version.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends atdatabases_migrations_versionDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, atdatabases_migrations_versionDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Atdatabases_migrations_versions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {atdatabases_migrations_versionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Atdatabases_migrations_versions
     * const atdatabases_migrations_version = await prisma.atdatabases_migrations_version.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends atdatabases_migrations_versionUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, atdatabases_migrations_versionUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Atdatabases_migrations_version.
     * @param {atdatabases_migrations_versionUpsertArgs} args - Arguments to update or create a Atdatabases_migrations_version.
     * @example
     * // Update or create a Atdatabases_migrations_version
     * const atdatabases_migrations_version = await prisma.atdatabases_migrations_version.upsert({
     *   create: {
     *     // ... data to create a Atdatabases_migrations_version
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Atdatabases_migrations_version we want to update
     *   }
     * })
    **/
    upsert<T extends atdatabases_migrations_versionUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, atdatabases_migrations_versionUpsertArgs<ExtArgs>>
    ): Prisma__atdatabases_migrations_versionClient<$Types.GetResult<atdatabases_migrations_versionPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Atdatabases_migrations_versions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {atdatabases_migrations_versionCountArgs} args - Arguments to filter Atdatabases_migrations_versions to count.
     * @example
     * // Count the number of Atdatabases_migrations_versions
     * const count = await prisma.atdatabases_migrations_version.count({
     *   where: {
     *     // ... the filter for the Atdatabases_migrations_versions we want to count
     *   }
     * })
    **/
    count<T extends atdatabases_migrations_versionCountArgs>(
      args?: Subset<T, atdatabases_migrations_versionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Atdatabases_migrations_versionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Atdatabases_migrations_version.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Atdatabases_migrations_versionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Atdatabases_migrations_versionAggregateArgs>(args: Subset<T, Atdatabases_migrations_versionAggregateArgs>): Prisma.PrismaPromise<GetAtdatabases_migrations_versionAggregateType<T>>

    /**
     * Group by Atdatabases_migrations_version.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Atdatabases_migrations_versionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Atdatabases_migrations_versionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Atdatabases_migrations_versionGroupByArgs['orderBy'] }
        : { orderBy?: Atdatabases_migrations_versionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Atdatabases_migrations_versionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAtdatabases_migrations_versionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for atdatabases_migrations_version.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__atdatabases_migrations_versionClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * atdatabases_migrations_version base type for findUnique actions
   */
  export type atdatabases_migrations_versionFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_version
     */
    select?: atdatabases_migrations_versionSelect<ExtArgs> | null
    /**
     * Filter, which atdatabases_migrations_version to fetch.
     */
    where: atdatabases_migrations_versionWhereUniqueInput
  }

  /**
   * atdatabases_migrations_version findUnique
   */
  export interface atdatabases_migrations_versionFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends atdatabases_migrations_versionFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * atdatabases_migrations_version findUniqueOrThrow
   */
  export type atdatabases_migrations_versionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_version
     */
    select?: atdatabases_migrations_versionSelect<ExtArgs> | null
    /**
     * Filter, which atdatabases_migrations_version to fetch.
     */
    where: atdatabases_migrations_versionWhereUniqueInput
  }


  /**
   * atdatabases_migrations_version base type for findFirst actions
   */
  export type atdatabases_migrations_versionFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_version
     */
    select?: atdatabases_migrations_versionSelect<ExtArgs> | null
    /**
     * Filter, which atdatabases_migrations_version to fetch.
     */
    where?: atdatabases_migrations_versionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of atdatabases_migrations_versions to fetch.
     */
    orderBy?: Enumerable<atdatabases_migrations_versionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for atdatabases_migrations_versions.
     */
    cursor?: atdatabases_migrations_versionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` atdatabases_migrations_versions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` atdatabases_migrations_versions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of atdatabases_migrations_versions.
     */
    distinct?: Enumerable<Atdatabases_migrations_versionScalarFieldEnum>
  }

  /**
   * atdatabases_migrations_version findFirst
   */
  export interface atdatabases_migrations_versionFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends atdatabases_migrations_versionFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * atdatabases_migrations_version findFirstOrThrow
   */
  export type atdatabases_migrations_versionFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_version
     */
    select?: atdatabases_migrations_versionSelect<ExtArgs> | null
    /**
     * Filter, which atdatabases_migrations_version to fetch.
     */
    where?: atdatabases_migrations_versionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of atdatabases_migrations_versions to fetch.
     */
    orderBy?: Enumerable<atdatabases_migrations_versionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for atdatabases_migrations_versions.
     */
    cursor?: atdatabases_migrations_versionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` atdatabases_migrations_versions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` atdatabases_migrations_versions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of atdatabases_migrations_versions.
     */
    distinct?: Enumerable<Atdatabases_migrations_versionScalarFieldEnum>
  }


  /**
   * atdatabases_migrations_version findMany
   */
  export type atdatabases_migrations_versionFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_version
     */
    select?: atdatabases_migrations_versionSelect<ExtArgs> | null
    /**
     * Filter, which atdatabases_migrations_versions to fetch.
     */
    where?: atdatabases_migrations_versionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of atdatabases_migrations_versions to fetch.
     */
    orderBy?: Enumerable<atdatabases_migrations_versionOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing atdatabases_migrations_versions.
     */
    cursor?: atdatabases_migrations_versionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` atdatabases_migrations_versions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` atdatabases_migrations_versions.
     */
    skip?: number
    distinct?: Enumerable<Atdatabases_migrations_versionScalarFieldEnum>
  }


  /**
   * atdatabases_migrations_version create
   */
  export type atdatabases_migrations_versionCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_version
     */
    select?: atdatabases_migrations_versionSelect<ExtArgs> | null
    /**
     * The data needed to create a atdatabases_migrations_version.
     */
    data: XOR<atdatabases_migrations_versionCreateInput, atdatabases_migrations_versionUncheckedCreateInput>
  }


  /**
   * atdatabases_migrations_version createMany
   */
  export type atdatabases_migrations_versionCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many atdatabases_migrations_versions.
     */
    data: Enumerable<atdatabases_migrations_versionCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * atdatabases_migrations_version update
   */
  export type atdatabases_migrations_versionUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_version
     */
    select?: atdatabases_migrations_versionSelect<ExtArgs> | null
    /**
     * The data needed to update a atdatabases_migrations_version.
     */
    data: XOR<atdatabases_migrations_versionUpdateInput, atdatabases_migrations_versionUncheckedUpdateInput>
    /**
     * Choose, which atdatabases_migrations_version to update.
     */
    where: atdatabases_migrations_versionWhereUniqueInput
  }


  /**
   * atdatabases_migrations_version updateMany
   */
  export type atdatabases_migrations_versionUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update atdatabases_migrations_versions.
     */
    data: XOR<atdatabases_migrations_versionUpdateManyMutationInput, atdatabases_migrations_versionUncheckedUpdateManyInput>
    /**
     * Filter which atdatabases_migrations_versions to update
     */
    where?: atdatabases_migrations_versionWhereInput
  }


  /**
   * atdatabases_migrations_version upsert
   */
  export type atdatabases_migrations_versionUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_version
     */
    select?: atdatabases_migrations_versionSelect<ExtArgs> | null
    /**
     * The filter to search for the atdatabases_migrations_version to update in case it exists.
     */
    where: atdatabases_migrations_versionWhereUniqueInput
    /**
     * In case the atdatabases_migrations_version found by the `where` argument doesn't exist, create a new atdatabases_migrations_version with this data.
     */
    create: XOR<atdatabases_migrations_versionCreateInput, atdatabases_migrations_versionUncheckedCreateInput>
    /**
     * In case the atdatabases_migrations_version was found with the provided `where` argument, update it with this data.
     */
    update: XOR<atdatabases_migrations_versionUpdateInput, atdatabases_migrations_versionUncheckedUpdateInput>
  }


  /**
   * atdatabases_migrations_version delete
   */
  export type atdatabases_migrations_versionDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_version
     */
    select?: atdatabases_migrations_versionSelect<ExtArgs> | null
    /**
     * Filter which atdatabases_migrations_version to delete.
     */
    where: atdatabases_migrations_versionWhereUniqueInput
  }


  /**
   * atdatabases_migrations_version deleteMany
   */
  export type atdatabases_migrations_versionDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which atdatabases_migrations_versions to delete
     */
    where?: atdatabases_migrations_versionWhereInput
  }


  /**
   * atdatabases_migrations_version without action
   */
  export type atdatabases_migrations_versionArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_version
     */
    select?: atdatabases_migrations_versionSelect<ExtArgs> | null
  }



  /**
   * Model chip
   */


  export type AggregateChip = {
    _count: ChipCountAggregateOutputType | null
    _min: ChipMinAggregateOutputType | null
    _max: ChipMaxAggregateOutputType | null
  }

  export type ChipMinAggregateOutputType = {
    id: string | null
    label: string | null
    value: string | null
  }

  export type ChipMaxAggregateOutputType = {
    id: string | null
    label: string | null
    value: string | null
  }

  export type ChipCountAggregateOutputType = {
    id: number
    label: number
    value: number
    _all: number
  }


  export type ChipMinAggregateInputType = {
    id?: true
    label?: true
    value?: true
  }

  export type ChipMaxAggregateInputType = {
    id?: true
    label?: true
    value?: true
  }

  export type ChipCountAggregateInputType = {
    id?: true
    label?: true
    value?: true
    _all?: true
  }

  export type ChipAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which chip to aggregate.
     */
    where?: chipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chips to fetch.
     */
    orderBy?: Enumerable<chipOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: chipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chips.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned chips
    **/
    _count?: true | ChipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ChipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ChipMaxAggregateInputType
  }

  export type GetChipAggregateType<T extends ChipAggregateArgs> = {
        [P in keyof T & keyof AggregateChip]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChip[P]>
      : GetScalarType<T[P], AggregateChip[P]>
  }




  export type ChipGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: chipWhereInput
    orderBy?: Enumerable<chipOrderByWithAggregationInput>
    by: ChipScalarFieldEnum[]
    having?: chipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ChipCountAggregateInputType | true
    _min?: ChipMinAggregateInputType
    _max?: ChipMaxAggregateInputType
  }


  export type ChipGroupByOutputType = {
    id: string
    label: string
    value: string
    _count: ChipCountAggregateOutputType | null
    _min: ChipMinAggregateOutputType | null
    _max: ChipMaxAggregateOutputType | null
  }

  type GetChipGroupByPayload<T extends ChipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<ChipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ChipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ChipGroupByOutputType[P]>
            : GetScalarType<T[P], ChipGroupByOutputType[P]>
        }
      >
    >


  export type chipSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    label?: boolean
    value?: boolean
    report_to_chip?: boolean | chip$report_to_chipArgs<ExtArgs>
    _count?: boolean | ChipCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["chip"]>

  export type chipSelectScalar = {
    id?: boolean
    label?: boolean
    value?: boolean
  }

  export type chipInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    report_to_chip?: boolean | chip$report_to_chipArgs<ExtArgs>
    _count?: boolean | ChipCountOutputTypeArgs<ExtArgs>
  }


  type chipGetPayload<S extends boolean | null | undefined | chipArgs> = $Types.GetResult<chipPayload, S>

  type chipCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<chipFindManyArgs, 'select' | 'include'> & {
      select?: ChipCountAggregateInputType | true
    }

  export interface chipDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['chip'], meta: { name: 'chip' } }
    /**
     * Find zero or one Chip that matches the filter.
     * @param {chipFindUniqueArgs} args - Arguments to find a Chip
     * @example
     * // Get one Chip
     * const chip = await prisma.chip.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends chipFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, chipFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'chip'> extends True ? Prisma__chipClient<$Types.GetResult<chipPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__chipClient<$Types.GetResult<chipPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Chip that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {chipFindUniqueOrThrowArgs} args - Arguments to find a Chip
     * @example
     * // Get one Chip
     * const chip = await prisma.chip.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends chipFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, chipFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__chipClient<$Types.GetResult<chipPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Chip that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chipFindFirstArgs} args - Arguments to find a Chip
     * @example
     * // Get one Chip
     * const chip = await prisma.chip.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends chipFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, chipFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'chip'> extends True ? Prisma__chipClient<$Types.GetResult<chipPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__chipClient<$Types.GetResult<chipPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Chip that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chipFindFirstOrThrowArgs} args - Arguments to find a Chip
     * @example
     * // Get one Chip
     * const chip = await prisma.chip.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends chipFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, chipFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__chipClient<$Types.GetResult<chipPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Chips that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chipFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Chips
     * const chips = await prisma.chip.findMany()
     * 
     * // Get first 10 Chips
     * const chips = await prisma.chip.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const chipWithIdOnly = await prisma.chip.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends chipFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, chipFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<chipPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Chip.
     * @param {chipCreateArgs} args - Arguments to create a Chip.
     * @example
     * // Create one Chip
     * const Chip = await prisma.chip.create({
     *   data: {
     *     // ... data to create a Chip
     *   }
     * })
     * 
    **/
    create<T extends chipCreateArgs<ExtArgs>>(
      args: SelectSubset<T, chipCreateArgs<ExtArgs>>
    ): Prisma__chipClient<$Types.GetResult<chipPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Chips.
     *     @param {chipCreateManyArgs} args - Arguments to create many Chips.
     *     @example
     *     // Create many Chips
     *     const chip = await prisma.chip.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends chipCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, chipCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Chip.
     * @param {chipDeleteArgs} args - Arguments to delete one Chip.
     * @example
     * // Delete one Chip
     * const Chip = await prisma.chip.delete({
     *   where: {
     *     // ... filter to delete one Chip
     *   }
     * })
     * 
    **/
    delete<T extends chipDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, chipDeleteArgs<ExtArgs>>
    ): Prisma__chipClient<$Types.GetResult<chipPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Chip.
     * @param {chipUpdateArgs} args - Arguments to update one Chip.
     * @example
     * // Update one Chip
     * const chip = await prisma.chip.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends chipUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, chipUpdateArgs<ExtArgs>>
    ): Prisma__chipClient<$Types.GetResult<chipPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Chips.
     * @param {chipDeleteManyArgs} args - Arguments to filter Chips to delete.
     * @example
     * // Delete a few Chips
     * const { count } = await prisma.chip.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends chipDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, chipDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Chips.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Chips
     * const chip = await prisma.chip.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends chipUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, chipUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Chip.
     * @param {chipUpsertArgs} args - Arguments to update or create a Chip.
     * @example
     * // Update or create a Chip
     * const chip = await prisma.chip.upsert({
     *   create: {
     *     // ... data to create a Chip
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Chip we want to update
     *   }
     * })
    **/
    upsert<T extends chipUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, chipUpsertArgs<ExtArgs>>
    ): Prisma__chipClient<$Types.GetResult<chipPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Chips.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {chipCountArgs} args - Arguments to filter Chips to count.
     * @example
     * // Count the number of Chips
     * const count = await prisma.chip.count({
     *   where: {
     *     // ... the filter for the Chips we want to count
     *   }
     * })
    **/
    count<T extends chipCountArgs>(
      args?: Subset<T, chipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ChipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Chip.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ChipAggregateArgs>(args: Subset<T, ChipAggregateArgs>): Prisma.PrismaPromise<GetChipAggregateType<T>>

    /**
     * Group by Chip.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ChipGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ChipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChipGroupByArgs['orderBy'] }
        : { orderBy?: ChipGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ChipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetChipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for chip.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__chipClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    report_to_chip<T extends chip$report_to_chipArgs<ExtArgs> = {}>(args?: Subset<T, chip$report_to_chipArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<report_to_chipPayload<ExtArgs>, T, 'findMany', never>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * chip base type for findUnique actions
   */
  export type chipFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chip
     */
    select?: chipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: chipInclude<ExtArgs> | null
    /**
     * Filter, which chip to fetch.
     */
    where: chipWhereUniqueInput
  }

  /**
   * chip findUnique
   */
  export interface chipFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends chipFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * chip findUniqueOrThrow
   */
  export type chipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chip
     */
    select?: chipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: chipInclude<ExtArgs> | null
    /**
     * Filter, which chip to fetch.
     */
    where: chipWhereUniqueInput
  }


  /**
   * chip base type for findFirst actions
   */
  export type chipFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chip
     */
    select?: chipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: chipInclude<ExtArgs> | null
    /**
     * Filter, which chip to fetch.
     */
    where?: chipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chips to fetch.
     */
    orderBy?: Enumerable<chipOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for chips.
     */
    cursor?: chipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chips.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of chips.
     */
    distinct?: Enumerable<ChipScalarFieldEnum>
  }

  /**
   * chip findFirst
   */
  export interface chipFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends chipFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * chip findFirstOrThrow
   */
  export type chipFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chip
     */
    select?: chipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: chipInclude<ExtArgs> | null
    /**
     * Filter, which chip to fetch.
     */
    where?: chipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chips to fetch.
     */
    orderBy?: Enumerable<chipOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for chips.
     */
    cursor?: chipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chips.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of chips.
     */
    distinct?: Enumerable<ChipScalarFieldEnum>
  }


  /**
   * chip findMany
   */
  export type chipFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chip
     */
    select?: chipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: chipInclude<ExtArgs> | null
    /**
     * Filter, which chips to fetch.
     */
    where?: chipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of chips to fetch.
     */
    orderBy?: Enumerable<chipOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing chips.
     */
    cursor?: chipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` chips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` chips.
     */
    skip?: number
    distinct?: Enumerable<ChipScalarFieldEnum>
  }


  /**
   * chip create
   */
  export type chipCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chip
     */
    select?: chipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: chipInclude<ExtArgs> | null
    /**
     * The data needed to create a chip.
     */
    data: XOR<chipCreateInput, chipUncheckedCreateInput>
  }


  /**
   * chip createMany
   */
  export type chipCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many chips.
     */
    data: Enumerable<chipCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * chip update
   */
  export type chipUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chip
     */
    select?: chipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: chipInclude<ExtArgs> | null
    /**
     * The data needed to update a chip.
     */
    data: XOR<chipUpdateInput, chipUncheckedUpdateInput>
    /**
     * Choose, which chip to update.
     */
    where: chipWhereUniqueInput
  }


  /**
   * chip updateMany
   */
  export type chipUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update chips.
     */
    data: XOR<chipUpdateManyMutationInput, chipUncheckedUpdateManyInput>
    /**
     * Filter which chips to update
     */
    where?: chipWhereInput
  }


  /**
   * chip upsert
   */
  export type chipUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chip
     */
    select?: chipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: chipInclude<ExtArgs> | null
    /**
     * The filter to search for the chip to update in case it exists.
     */
    where: chipWhereUniqueInput
    /**
     * In case the chip found by the `where` argument doesn't exist, create a new chip with this data.
     */
    create: XOR<chipCreateInput, chipUncheckedCreateInput>
    /**
     * In case the chip was found with the provided `where` argument, update it with this data.
     */
    update: XOR<chipUpdateInput, chipUncheckedUpdateInput>
  }


  /**
   * chip delete
   */
  export type chipDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chip
     */
    select?: chipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: chipInclude<ExtArgs> | null
    /**
     * Filter which chip to delete.
     */
    where: chipWhereUniqueInput
  }


  /**
   * chip deleteMany
   */
  export type chipDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which chips to delete
     */
    where?: chipWhereInput
  }


  /**
   * chip.report_to_chip
   */
  export type chip$report_to_chipArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_chip
     */
    select?: report_to_chipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_chipInclude<ExtArgs> | null
    where?: report_to_chipWhereInput
    orderBy?: Enumerable<report_to_chipOrderByWithRelationInput>
    cursor?: report_to_chipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<Report_to_chipScalarFieldEnum>
  }


  /**
   * chip without action
   */
  export type chipArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chip
     */
    select?: chipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: chipInclude<ExtArgs> | null
  }



  /**
   * Model clause
   */


  export type AggregateClause = {
    _count: ClauseCountAggregateOutputType | null
    _min: ClauseMinAggregateOutputType | null
    _max: ClauseMaxAggregateOutputType | null
  }

  export type ClauseMinAggregateOutputType = {
    id: string | null
    label: string | null
    value: string | null
  }

  export type ClauseMaxAggregateOutputType = {
    id: string | null
    label: string | null
    value: string | null
  }

  export type ClauseCountAggregateOutputType = {
    id: number
    label: number
    value: number
    _all: number
  }


  export type ClauseMinAggregateInputType = {
    id?: true
    label?: true
    value?: true
  }

  export type ClauseMaxAggregateInputType = {
    id?: true
    label?: true
    value?: true
  }

  export type ClauseCountAggregateInputType = {
    id?: true
    label?: true
    value?: true
    _all?: true
  }

  export type ClauseAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which clause to aggregate.
     */
    where?: clauseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of clauses to fetch.
     */
    orderBy?: Enumerable<clauseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: clauseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` clauses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` clauses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned clauses
    **/
    _count?: true | ClauseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClauseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClauseMaxAggregateInputType
  }

  export type GetClauseAggregateType<T extends ClauseAggregateArgs> = {
        [P in keyof T & keyof AggregateClause]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClause[P]>
      : GetScalarType<T[P], AggregateClause[P]>
  }




  export type ClauseGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: clauseWhereInput
    orderBy?: Enumerable<clauseOrderByWithAggregationInput>
    by: ClauseScalarFieldEnum[]
    having?: clauseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClauseCountAggregateInputType | true
    _min?: ClauseMinAggregateInputType
    _max?: ClauseMaxAggregateInputType
  }


  export type ClauseGroupByOutputType = {
    id: string
    label: string
    value: string
    _count: ClauseCountAggregateOutputType | null
    _min: ClauseMinAggregateOutputType | null
    _max: ClauseMaxAggregateOutputType | null
  }

  type GetClauseGroupByPayload<T extends ClauseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<ClauseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClauseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClauseGroupByOutputType[P]>
            : GetScalarType<T[P], ClauseGroupByOutputType[P]>
        }
      >
    >


  export type clauseSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    label?: boolean
    value?: boolean
    report_to_clause?: boolean | clause$report_to_clauseArgs<ExtArgs>
    _count?: boolean | ClauseCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["clause"]>

  export type clauseSelectScalar = {
    id?: boolean
    label?: boolean
    value?: boolean
  }

  export type clauseInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    report_to_clause?: boolean | clause$report_to_clauseArgs<ExtArgs>
    _count?: boolean | ClauseCountOutputTypeArgs<ExtArgs>
  }


  type clauseGetPayload<S extends boolean | null | undefined | clauseArgs> = $Types.GetResult<clausePayload, S>

  type clauseCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<clauseFindManyArgs, 'select' | 'include'> & {
      select?: ClauseCountAggregateInputType | true
    }

  export interface clauseDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['clause'], meta: { name: 'clause' } }
    /**
     * Find zero or one Clause that matches the filter.
     * @param {clauseFindUniqueArgs} args - Arguments to find a Clause
     * @example
     * // Get one Clause
     * const clause = await prisma.clause.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends clauseFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, clauseFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'clause'> extends True ? Prisma__clauseClient<$Types.GetResult<clausePayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__clauseClient<$Types.GetResult<clausePayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Clause that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {clauseFindUniqueOrThrowArgs} args - Arguments to find a Clause
     * @example
     * // Get one Clause
     * const clause = await prisma.clause.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends clauseFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, clauseFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__clauseClient<$Types.GetResult<clausePayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Clause that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {clauseFindFirstArgs} args - Arguments to find a Clause
     * @example
     * // Get one Clause
     * const clause = await prisma.clause.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends clauseFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, clauseFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'clause'> extends True ? Prisma__clauseClient<$Types.GetResult<clausePayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__clauseClient<$Types.GetResult<clausePayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Clause that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {clauseFindFirstOrThrowArgs} args - Arguments to find a Clause
     * @example
     * // Get one Clause
     * const clause = await prisma.clause.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends clauseFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, clauseFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__clauseClient<$Types.GetResult<clausePayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Clauses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {clauseFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clauses
     * const clauses = await prisma.clause.findMany()
     * 
     * // Get first 10 Clauses
     * const clauses = await prisma.clause.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clauseWithIdOnly = await prisma.clause.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends clauseFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, clauseFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<clausePayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Clause.
     * @param {clauseCreateArgs} args - Arguments to create a Clause.
     * @example
     * // Create one Clause
     * const Clause = await prisma.clause.create({
     *   data: {
     *     // ... data to create a Clause
     *   }
     * })
     * 
    **/
    create<T extends clauseCreateArgs<ExtArgs>>(
      args: SelectSubset<T, clauseCreateArgs<ExtArgs>>
    ): Prisma__clauseClient<$Types.GetResult<clausePayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Clauses.
     *     @param {clauseCreateManyArgs} args - Arguments to create many Clauses.
     *     @example
     *     // Create many Clauses
     *     const clause = await prisma.clause.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends clauseCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, clauseCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Clause.
     * @param {clauseDeleteArgs} args - Arguments to delete one Clause.
     * @example
     * // Delete one Clause
     * const Clause = await prisma.clause.delete({
     *   where: {
     *     // ... filter to delete one Clause
     *   }
     * })
     * 
    **/
    delete<T extends clauseDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, clauseDeleteArgs<ExtArgs>>
    ): Prisma__clauseClient<$Types.GetResult<clausePayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Clause.
     * @param {clauseUpdateArgs} args - Arguments to update one Clause.
     * @example
     * // Update one Clause
     * const clause = await prisma.clause.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends clauseUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, clauseUpdateArgs<ExtArgs>>
    ): Prisma__clauseClient<$Types.GetResult<clausePayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Clauses.
     * @param {clauseDeleteManyArgs} args - Arguments to filter Clauses to delete.
     * @example
     * // Delete a few Clauses
     * const { count } = await prisma.clause.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends clauseDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, clauseDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clauses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {clauseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clauses
     * const clause = await prisma.clause.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends clauseUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, clauseUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Clause.
     * @param {clauseUpsertArgs} args - Arguments to update or create a Clause.
     * @example
     * // Update or create a Clause
     * const clause = await prisma.clause.upsert({
     *   create: {
     *     // ... data to create a Clause
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Clause we want to update
     *   }
     * })
    **/
    upsert<T extends clauseUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, clauseUpsertArgs<ExtArgs>>
    ): Prisma__clauseClient<$Types.GetResult<clausePayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Clauses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {clauseCountArgs} args - Arguments to filter Clauses to count.
     * @example
     * // Count the number of Clauses
     * const count = await prisma.clause.count({
     *   where: {
     *     // ... the filter for the Clauses we want to count
     *   }
     * })
    **/
    count<T extends clauseCountArgs>(
      args?: Subset<T, clauseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClauseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Clause.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClauseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClauseAggregateArgs>(args: Subset<T, ClauseAggregateArgs>): Prisma.PrismaPromise<GetClauseAggregateType<T>>

    /**
     * Group by Clause.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClauseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClauseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClauseGroupByArgs['orderBy'] }
        : { orderBy?: ClauseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClauseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClauseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for clause.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__clauseClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    report_to_clause<T extends clause$report_to_clauseArgs<ExtArgs> = {}>(args?: Subset<T, clause$report_to_clauseArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<report_to_clausePayload<ExtArgs>, T, 'findMany', never>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * clause base type for findUnique actions
   */
  export type clauseFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clause
     */
    select?: clauseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: clauseInclude<ExtArgs> | null
    /**
     * Filter, which clause to fetch.
     */
    where: clauseWhereUniqueInput
  }

  /**
   * clause findUnique
   */
  export interface clauseFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends clauseFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * clause findUniqueOrThrow
   */
  export type clauseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clause
     */
    select?: clauseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: clauseInclude<ExtArgs> | null
    /**
     * Filter, which clause to fetch.
     */
    where: clauseWhereUniqueInput
  }


  /**
   * clause base type for findFirst actions
   */
  export type clauseFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clause
     */
    select?: clauseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: clauseInclude<ExtArgs> | null
    /**
     * Filter, which clause to fetch.
     */
    where?: clauseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of clauses to fetch.
     */
    orderBy?: Enumerable<clauseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for clauses.
     */
    cursor?: clauseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` clauses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` clauses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of clauses.
     */
    distinct?: Enumerable<ClauseScalarFieldEnum>
  }

  /**
   * clause findFirst
   */
  export interface clauseFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends clauseFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * clause findFirstOrThrow
   */
  export type clauseFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clause
     */
    select?: clauseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: clauseInclude<ExtArgs> | null
    /**
     * Filter, which clause to fetch.
     */
    where?: clauseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of clauses to fetch.
     */
    orderBy?: Enumerable<clauseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for clauses.
     */
    cursor?: clauseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` clauses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` clauses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of clauses.
     */
    distinct?: Enumerable<ClauseScalarFieldEnum>
  }


  /**
   * clause findMany
   */
  export type clauseFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clause
     */
    select?: clauseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: clauseInclude<ExtArgs> | null
    /**
     * Filter, which clauses to fetch.
     */
    where?: clauseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of clauses to fetch.
     */
    orderBy?: Enumerable<clauseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing clauses.
     */
    cursor?: clauseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` clauses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` clauses.
     */
    skip?: number
    distinct?: Enumerable<ClauseScalarFieldEnum>
  }


  /**
   * clause create
   */
  export type clauseCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clause
     */
    select?: clauseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: clauseInclude<ExtArgs> | null
    /**
     * The data needed to create a clause.
     */
    data: XOR<clauseCreateInput, clauseUncheckedCreateInput>
  }


  /**
   * clause createMany
   */
  export type clauseCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many clauses.
     */
    data: Enumerable<clauseCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * clause update
   */
  export type clauseUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clause
     */
    select?: clauseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: clauseInclude<ExtArgs> | null
    /**
     * The data needed to update a clause.
     */
    data: XOR<clauseUpdateInput, clauseUncheckedUpdateInput>
    /**
     * Choose, which clause to update.
     */
    where: clauseWhereUniqueInput
  }


  /**
   * clause updateMany
   */
  export type clauseUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update clauses.
     */
    data: XOR<clauseUpdateManyMutationInput, clauseUncheckedUpdateManyInput>
    /**
     * Filter which clauses to update
     */
    where?: clauseWhereInput
  }


  /**
   * clause upsert
   */
  export type clauseUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clause
     */
    select?: clauseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: clauseInclude<ExtArgs> | null
    /**
     * The filter to search for the clause to update in case it exists.
     */
    where: clauseWhereUniqueInput
    /**
     * In case the clause found by the `where` argument doesn't exist, create a new clause with this data.
     */
    create: XOR<clauseCreateInput, clauseUncheckedCreateInput>
    /**
     * In case the clause was found with the provided `where` argument, update it with this data.
     */
    update: XOR<clauseUpdateInput, clauseUncheckedUpdateInput>
  }


  /**
   * clause delete
   */
  export type clauseDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clause
     */
    select?: clauseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: clauseInclude<ExtArgs> | null
    /**
     * Filter which clause to delete.
     */
    where: clauseWhereUniqueInput
  }


  /**
   * clause deleteMany
   */
  export type clauseDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which clauses to delete
     */
    where?: clauseWhereInput
  }


  /**
   * clause.report_to_clause
   */
  export type clause$report_to_clauseArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_clause
     */
    select?: report_to_clauseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_clauseInclude<ExtArgs> | null
    where?: report_to_clauseWhereInput
    orderBy?: Enumerable<report_to_clauseOrderByWithRelationInput>
    cursor?: report_to_clauseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<Report_to_clauseScalarFieldEnum>
  }


  /**
   * clause without action
   */
  export type clauseArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clause
     */
    select?: clauseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: clauseInclude<ExtArgs> | null
  }



  /**
   * Model delegations
   */


  export type AggregateDelegations = {
    _count: DelegationsCountAggregateOutputType | null
    _min: DelegationsMinAggregateOutputType | null
    _max: DelegationsMaxAggregateOutputType | null
  }

  export type DelegationsMinAggregateOutputType = {
    createdBy: string | null
    delegatedTo: string | null
  }

  export type DelegationsMaxAggregateOutputType = {
    createdBy: string | null
    delegatedTo: string | null
  }

  export type DelegationsCountAggregateOutputType = {
    createdBy: number
    delegatedTo: number
    _all: number
  }


  export type DelegationsMinAggregateInputType = {
    createdBy?: true
    delegatedTo?: true
  }

  export type DelegationsMaxAggregateInputType = {
    createdBy?: true
    delegatedTo?: true
  }

  export type DelegationsCountAggregateInputType = {
    createdBy?: true
    delegatedTo?: true
    _all?: true
  }

  export type DelegationsAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which delegations to aggregate.
     */
    where?: delegationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of delegations to fetch.
     */
    orderBy?: Enumerable<delegationsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: delegationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` delegations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` delegations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned delegations
    **/
    _count?: true | DelegationsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DelegationsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DelegationsMaxAggregateInputType
  }

  export type GetDelegationsAggregateType<T extends DelegationsAggregateArgs> = {
        [P in keyof T & keyof AggregateDelegations]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDelegations[P]>
      : GetScalarType<T[P], AggregateDelegations[P]>
  }




  export type DelegationsGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: delegationsWhereInput
    orderBy?: Enumerable<delegationsOrderByWithAggregationInput>
    by: DelegationsScalarFieldEnum[]
    having?: delegationsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DelegationsCountAggregateInputType | true
    _min?: DelegationsMinAggregateInputType
    _max?: DelegationsMaxAggregateInputType
  }


  export type DelegationsGroupByOutputType = {
    createdBy: string
    delegatedTo: string
    _count: DelegationsCountAggregateOutputType | null
    _min: DelegationsMinAggregateOutputType | null
    _max: DelegationsMaxAggregateOutputType | null
  }

  type GetDelegationsGroupByPayload<T extends DelegationsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<DelegationsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DelegationsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DelegationsGroupByOutputType[P]>
            : GetScalarType<T[P], DelegationsGroupByOutputType[P]>
        }
      >
    >


  export type delegationsSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    createdBy?: boolean
    delegatedTo?: boolean
  }, ExtArgs["result"]["delegations"]>

  export type delegationsSelectScalar = {
    createdBy?: boolean
    delegatedTo?: boolean
  }


  type delegationsGetPayload<S extends boolean | null | undefined | delegationsArgs> = $Types.GetResult<delegationsPayload, S>

  type delegationsCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<delegationsFindManyArgs, 'select' | 'include'> & {
      select?: DelegationsCountAggregateInputType | true
    }

  export interface delegationsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['delegations'], meta: { name: 'delegations' } }
    /**
     * Find zero or one Delegations that matches the filter.
     * @param {delegationsFindUniqueArgs} args - Arguments to find a Delegations
     * @example
     * // Get one Delegations
     * const delegations = await prisma.delegations.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends delegationsFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, delegationsFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'delegations'> extends True ? Prisma__delegationsClient<$Types.GetResult<delegationsPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__delegationsClient<$Types.GetResult<delegationsPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Delegations that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {delegationsFindUniqueOrThrowArgs} args - Arguments to find a Delegations
     * @example
     * // Get one Delegations
     * const delegations = await prisma.delegations.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends delegationsFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, delegationsFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__delegationsClient<$Types.GetResult<delegationsPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Delegations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {delegationsFindFirstArgs} args - Arguments to find a Delegations
     * @example
     * // Get one Delegations
     * const delegations = await prisma.delegations.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends delegationsFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, delegationsFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'delegations'> extends True ? Prisma__delegationsClient<$Types.GetResult<delegationsPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__delegationsClient<$Types.GetResult<delegationsPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Delegations that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {delegationsFindFirstOrThrowArgs} args - Arguments to find a Delegations
     * @example
     * // Get one Delegations
     * const delegations = await prisma.delegations.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends delegationsFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, delegationsFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__delegationsClient<$Types.GetResult<delegationsPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Delegations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {delegationsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Delegations
     * const delegations = await prisma.delegations.findMany()
     * 
     * // Get first 10 Delegations
     * const delegations = await prisma.delegations.findMany({ take: 10 })
     * 
     * // Only select the `createdBy`
     * const delegationsWithCreatedByOnly = await prisma.delegations.findMany({ select: { createdBy: true } })
     * 
    **/
    findMany<T extends delegationsFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, delegationsFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<delegationsPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Delegations.
     * @param {delegationsCreateArgs} args - Arguments to create a Delegations.
     * @example
     * // Create one Delegations
     * const Delegations = await prisma.delegations.create({
     *   data: {
     *     // ... data to create a Delegations
     *   }
     * })
     * 
    **/
    create<T extends delegationsCreateArgs<ExtArgs>>(
      args: SelectSubset<T, delegationsCreateArgs<ExtArgs>>
    ): Prisma__delegationsClient<$Types.GetResult<delegationsPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Delegations.
     *     @param {delegationsCreateManyArgs} args - Arguments to create many Delegations.
     *     @example
     *     // Create many Delegations
     *     const delegations = await prisma.delegations.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends delegationsCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, delegationsCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Delegations.
     * @param {delegationsDeleteArgs} args - Arguments to delete one Delegations.
     * @example
     * // Delete one Delegations
     * const Delegations = await prisma.delegations.delete({
     *   where: {
     *     // ... filter to delete one Delegations
     *   }
     * })
     * 
    **/
    delete<T extends delegationsDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, delegationsDeleteArgs<ExtArgs>>
    ): Prisma__delegationsClient<$Types.GetResult<delegationsPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Delegations.
     * @param {delegationsUpdateArgs} args - Arguments to update one Delegations.
     * @example
     * // Update one Delegations
     * const delegations = await prisma.delegations.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends delegationsUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, delegationsUpdateArgs<ExtArgs>>
    ): Prisma__delegationsClient<$Types.GetResult<delegationsPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Delegations.
     * @param {delegationsDeleteManyArgs} args - Arguments to filter Delegations to delete.
     * @example
     * // Delete a few Delegations
     * const { count } = await prisma.delegations.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends delegationsDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, delegationsDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Delegations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {delegationsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Delegations
     * const delegations = await prisma.delegations.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends delegationsUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, delegationsUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Delegations.
     * @param {delegationsUpsertArgs} args - Arguments to update or create a Delegations.
     * @example
     * // Update or create a Delegations
     * const delegations = await prisma.delegations.upsert({
     *   create: {
     *     // ... data to create a Delegations
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Delegations we want to update
     *   }
     * })
    **/
    upsert<T extends delegationsUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, delegationsUpsertArgs<ExtArgs>>
    ): Prisma__delegationsClient<$Types.GetResult<delegationsPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Delegations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {delegationsCountArgs} args - Arguments to filter Delegations to count.
     * @example
     * // Count the number of Delegations
     * const count = await prisma.delegations.count({
     *   where: {
     *     // ... the filter for the Delegations we want to count
     *   }
     * })
    **/
    count<T extends delegationsCountArgs>(
      args?: Subset<T, delegationsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DelegationsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Delegations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegationsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DelegationsAggregateArgs>(args: Subset<T, DelegationsAggregateArgs>): Prisma.PrismaPromise<GetDelegationsAggregateType<T>>

    /**
     * Group by Delegations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegationsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DelegationsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DelegationsGroupByArgs['orderBy'] }
        : { orderBy?: DelegationsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DelegationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDelegationsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for delegations.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__delegationsClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * delegations base type for findUnique actions
   */
  export type delegationsFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the delegations
     */
    select?: delegationsSelect<ExtArgs> | null
    /**
     * Filter, which delegations to fetch.
     */
    where: delegationsWhereUniqueInput
  }

  /**
   * delegations findUnique
   */
  export interface delegationsFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends delegationsFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * delegations findUniqueOrThrow
   */
  export type delegationsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the delegations
     */
    select?: delegationsSelect<ExtArgs> | null
    /**
     * Filter, which delegations to fetch.
     */
    where: delegationsWhereUniqueInput
  }


  /**
   * delegations base type for findFirst actions
   */
  export type delegationsFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the delegations
     */
    select?: delegationsSelect<ExtArgs> | null
    /**
     * Filter, which delegations to fetch.
     */
    where?: delegationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of delegations to fetch.
     */
    orderBy?: Enumerable<delegationsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for delegations.
     */
    cursor?: delegationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` delegations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` delegations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of delegations.
     */
    distinct?: Enumerable<DelegationsScalarFieldEnum>
  }

  /**
   * delegations findFirst
   */
  export interface delegationsFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends delegationsFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * delegations findFirstOrThrow
   */
  export type delegationsFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the delegations
     */
    select?: delegationsSelect<ExtArgs> | null
    /**
     * Filter, which delegations to fetch.
     */
    where?: delegationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of delegations to fetch.
     */
    orderBy?: Enumerable<delegationsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for delegations.
     */
    cursor?: delegationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` delegations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` delegations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of delegations.
     */
    distinct?: Enumerable<DelegationsScalarFieldEnum>
  }


  /**
   * delegations findMany
   */
  export type delegationsFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the delegations
     */
    select?: delegationsSelect<ExtArgs> | null
    /**
     * Filter, which delegations to fetch.
     */
    where?: delegationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of delegations to fetch.
     */
    orderBy?: Enumerable<delegationsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing delegations.
     */
    cursor?: delegationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` delegations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` delegations.
     */
    skip?: number
    distinct?: Enumerable<DelegationsScalarFieldEnum>
  }


  /**
   * delegations create
   */
  export type delegationsCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the delegations
     */
    select?: delegationsSelect<ExtArgs> | null
    /**
     * The data needed to create a delegations.
     */
    data: XOR<delegationsCreateInput, delegationsUncheckedCreateInput>
  }


  /**
   * delegations createMany
   */
  export type delegationsCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many delegations.
     */
    data: Enumerable<delegationsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * delegations update
   */
  export type delegationsUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the delegations
     */
    select?: delegationsSelect<ExtArgs> | null
    /**
     * The data needed to update a delegations.
     */
    data: XOR<delegationsUpdateInput, delegationsUncheckedUpdateInput>
    /**
     * Choose, which delegations to update.
     */
    where: delegationsWhereUniqueInput
  }


  /**
   * delegations updateMany
   */
  export type delegationsUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update delegations.
     */
    data: XOR<delegationsUpdateManyMutationInput, delegationsUncheckedUpdateManyInput>
    /**
     * Filter which delegations to update
     */
    where?: delegationsWhereInput
  }


  /**
   * delegations upsert
   */
  export type delegationsUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the delegations
     */
    select?: delegationsSelect<ExtArgs> | null
    /**
     * The filter to search for the delegations to update in case it exists.
     */
    where: delegationsWhereUniqueInput
    /**
     * In case the delegations found by the `where` argument doesn't exist, create a new delegations with this data.
     */
    create: XOR<delegationsCreateInput, delegationsUncheckedCreateInput>
    /**
     * In case the delegations was found with the provided `where` argument, update it with this data.
     */
    update: XOR<delegationsUpdateInput, delegationsUncheckedUpdateInput>
  }


  /**
   * delegations delete
   */
  export type delegationsDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the delegations
     */
    select?: delegationsSelect<ExtArgs> | null
    /**
     * Filter which delegations to delete.
     */
    where: delegationsWhereUniqueInput
  }


  /**
   * delegations deleteMany
   */
  export type delegationsDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which delegations to delete
     */
    where?: delegationsWhereInput
  }


  /**
   * delegations without action
   */
  export type delegationsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the delegations
     */
    select?: delegationsSelect<ExtArgs> | null
  }



  /**
   * Model report
   */


  export type AggregateReport = {
    _count: ReportCountAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  export type ReportMinAggregateOutputType = {
    id: string | null
    title: string | null
    project_description: string | null
    redacted_by: string | null
    meet_date: Date | null
    applicant_name: string | null
    applicant_address: string | null
    project_cadastral_ref: string | null
    project_space_type: string | null
    decision: string | null
    precisions: string | null
    contacts: string | null
    further_information: string | null
    created_by_id: string | null
    created_by_username: string | null
    created_at: Date | null
    service_instructeur: string | null
  }

  export type ReportMaxAggregateOutputType = {
    id: string | null
    title: string | null
    project_description: string | null
    redacted_by: string | null
    meet_date: Date | null
    applicant_name: string | null
    applicant_address: string | null
    project_cadastral_ref: string | null
    project_space_type: string | null
    decision: string | null
    precisions: string | null
    contacts: string | null
    further_information: string | null
    created_by_id: string | null
    created_by_username: string | null
    created_at: Date | null
    service_instructeur: string | null
  }

  export type ReportCountAggregateOutputType = {
    id: number
    title: number
    project_description: number
    redacted_by: number
    meet_date: number
    applicant_name: number
    applicant_address: number
    project_cadastral_ref: number
    project_space_type: number
    decision: number
    precisions: number
    contacts: number
    further_information: number
    created_by_id: number
    created_by_username: number
    created_at: number
    service_instructeur: number
    _all: number
  }


  export type ReportMinAggregateInputType = {
    id?: true
    title?: true
    project_description?: true
    redacted_by?: true
    meet_date?: true
    applicant_name?: true
    applicant_address?: true
    project_cadastral_ref?: true
    project_space_type?: true
    decision?: true
    precisions?: true
    contacts?: true
    further_information?: true
    created_by_id?: true
    created_by_username?: true
    created_at?: true
    service_instructeur?: true
  }

  export type ReportMaxAggregateInputType = {
    id?: true
    title?: true
    project_description?: true
    redacted_by?: true
    meet_date?: true
    applicant_name?: true
    applicant_address?: true
    project_cadastral_ref?: true
    project_space_type?: true
    decision?: true
    precisions?: true
    contacts?: true
    further_information?: true
    created_by_id?: true
    created_by_username?: true
    created_at?: true
    service_instructeur?: true
  }

  export type ReportCountAggregateInputType = {
    id?: true
    title?: true
    project_description?: true
    redacted_by?: true
    meet_date?: true
    applicant_name?: true
    applicant_address?: true
    project_cadastral_ref?: true
    project_space_type?: true
    decision?: true
    precisions?: true
    contacts?: true
    further_information?: true
    created_by_id?: true
    created_by_username?: true
    created_at?: true
    service_instructeur?: true
    _all?: true
  }

  export type ReportAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which report to aggregate.
     */
    where?: reportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reports to fetch.
     */
    orderBy?: Enumerable<reportOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: reportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned reports
    **/
    _count?: true | ReportCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReportMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReportMaxAggregateInputType
  }

  export type GetReportAggregateType<T extends ReportAggregateArgs> = {
        [P in keyof T & keyof AggregateReport]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReport[P]>
      : GetScalarType<T[P], AggregateReport[P]>
  }




  export type ReportGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: reportWhereInput
    orderBy?: Enumerable<reportOrderByWithAggregationInput>
    by: ReportScalarFieldEnum[]
    having?: reportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReportCountAggregateInputType | true
    _min?: ReportMinAggregateInputType
    _max?: ReportMaxAggregateInputType
  }


  export type ReportGroupByOutputType = {
    id: string
    title: string | null
    project_description: string | null
    redacted_by: string | null
    meet_date: Date | null
    applicant_name: string | null
    applicant_address: string | null
    project_cadastral_ref: string | null
    project_space_type: string | null
    decision: string | null
    precisions: string | null
    contacts: string | null
    further_information: string | null
    created_by_id: string
    created_by_username: string
    created_at: Date
    service_instructeur: string | null
    _count: ReportCountAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  type GetReportGroupByPayload<T extends ReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<ReportGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReportGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReportGroupByOutputType[P]>
            : GetScalarType<T[P], ReportGroupByOutputType[P]>
        }
      >
    >


  export type reportSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    project_description?: boolean
    redacted_by?: boolean
    meet_date?: boolean
    applicant_name?: boolean
    applicant_address?: boolean
    project_cadastral_ref?: boolean
    project_space_type?: boolean
    decision?: boolean
    precisions?: boolean
    contacts?: boolean
    further_information?: boolean
    created_by_id?: boolean
    created_by_username?: boolean
    created_at?: boolean
    service_instructeur?: boolean
    report_to_chip?: boolean | report$report_to_chipArgs<ExtArgs>
    report_to_clause?: boolean | report$report_to_clauseArgs<ExtArgs>
    _count?: boolean | ReportCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type reportSelectScalar = {
    id?: boolean
    title?: boolean
    project_description?: boolean
    redacted_by?: boolean
    meet_date?: boolean
    applicant_name?: boolean
    applicant_address?: boolean
    project_cadastral_ref?: boolean
    project_space_type?: boolean
    decision?: boolean
    precisions?: boolean
    contacts?: boolean
    further_information?: boolean
    created_by_id?: boolean
    created_by_username?: boolean
    created_at?: boolean
    service_instructeur?: boolean
  }

  export type reportInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    report_to_chip?: boolean | report$report_to_chipArgs<ExtArgs>
    report_to_clause?: boolean | report$report_to_clauseArgs<ExtArgs>
    _count?: boolean | ReportCountOutputTypeArgs<ExtArgs>
  }


  type reportGetPayload<S extends boolean | null | undefined | reportArgs> = $Types.GetResult<reportPayload, S>

  type reportCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<reportFindManyArgs, 'select' | 'include'> & {
      select?: ReportCountAggregateInputType | true
    }

  export interface reportDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['report'], meta: { name: 'report' } }
    /**
     * Find zero or one Report that matches the filter.
     * @param {reportFindUniqueArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends reportFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, reportFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'report'> extends True ? Prisma__reportClient<$Types.GetResult<reportPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__reportClient<$Types.GetResult<reportPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Report that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {reportFindUniqueOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends reportFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, reportFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__reportClient<$Types.GetResult<reportPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Report that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reportFindFirstArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends reportFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, reportFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'report'> extends True ? Prisma__reportClient<$Types.GetResult<reportPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__reportClient<$Types.GetResult<reportPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Report that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reportFindFirstOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends reportFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, reportFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__reportClient<$Types.GetResult<reportPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Reports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reportFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reports
     * const reports = await prisma.report.findMany()
     * 
     * // Get first 10 Reports
     * const reports = await prisma.report.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reportWithIdOnly = await prisma.report.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends reportFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, reportFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<reportPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Report.
     * @param {reportCreateArgs} args - Arguments to create a Report.
     * @example
     * // Create one Report
     * const Report = await prisma.report.create({
     *   data: {
     *     // ... data to create a Report
     *   }
     * })
     * 
    **/
    create<T extends reportCreateArgs<ExtArgs>>(
      args: SelectSubset<T, reportCreateArgs<ExtArgs>>
    ): Prisma__reportClient<$Types.GetResult<reportPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Reports.
     *     @param {reportCreateManyArgs} args - Arguments to create many Reports.
     *     @example
     *     // Create many Reports
     *     const report = await prisma.report.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends reportCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, reportCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Report.
     * @param {reportDeleteArgs} args - Arguments to delete one Report.
     * @example
     * // Delete one Report
     * const Report = await prisma.report.delete({
     *   where: {
     *     // ... filter to delete one Report
     *   }
     * })
     * 
    **/
    delete<T extends reportDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, reportDeleteArgs<ExtArgs>>
    ): Prisma__reportClient<$Types.GetResult<reportPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Report.
     * @param {reportUpdateArgs} args - Arguments to update one Report.
     * @example
     * // Update one Report
     * const report = await prisma.report.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends reportUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, reportUpdateArgs<ExtArgs>>
    ): Prisma__reportClient<$Types.GetResult<reportPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Reports.
     * @param {reportDeleteManyArgs} args - Arguments to filter Reports to delete.
     * @example
     * // Delete a few Reports
     * const { count } = await prisma.report.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends reportDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, reportDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reportUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reports
     * const report = await prisma.report.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends reportUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, reportUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Report.
     * @param {reportUpsertArgs} args - Arguments to update or create a Report.
     * @example
     * // Update or create a Report
     * const report = await prisma.report.upsert({
     *   create: {
     *     // ... data to create a Report
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Report we want to update
     *   }
     * })
    **/
    upsert<T extends reportUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, reportUpsertArgs<ExtArgs>>
    ): Prisma__reportClient<$Types.GetResult<reportPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reportCountArgs} args - Arguments to filter Reports to count.
     * @example
     * // Count the number of Reports
     * const count = await prisma.report.count({
     *   where: {
     *     // ... the filter for the Reports we want to count
     *   }
     * })
    **/
    count<T extends reportCountArgs>(
      args?: Subset<T, reportCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReportCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReportAggregateArgs>(args: Subset<T, ReportAggregateArgs>): Prisma.PrismaPromise<GetReportAggregateType<T>>

    /**
     * Group by Report.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReportGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReportGroupByArgs['orderBy'] }
        : { orderBy?: ReportGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for report.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__reportClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    report_to_chip<T extends report$report_to_chipArgs<ExtArgs> = {}>(args?: Subset<T, report$report_to_chipArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<report_to_chipPayload<ExtArgs>, T, 'findMany', never>| Null>;

    report_to_clause<T extends report$report_to_clauseArgs<ExtArgs> = {}>(args?: Subset<T, report$report_to_clauseArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<report_to_clausePayload<ExtArgs>, T, 'findMany', never>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * report base type for findUnique actions
   */
  export type reportFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report
     */
    select?: reportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: reportInclude<ExtArgs> | null
    /**
     * Filter, which report to fetch.
     */
    where: reportWhereUniqueInput
  }

  /**
   * report findUnique
   */
  export interface reportFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends reportFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * report findUniqueOrThrow
   */
  export type reportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report
     */
    select?: reportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: reportInclude<ExtArgs> | null
    /**
     * Filter, which report to fetch.
     */
    where: reportWhereUniqueInput
  }


  /**
   * report base type for findFirst actions
   */
  export type reportFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report
     */
    select?: reportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: reportInclude<ExtArgs> | null
    /**
     * Filter, which report to fetch.
     */
    where?: reportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reports to fetch.
     */
    orderBy?: Enumerable<reportOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for reports.
     */
    cursor?: reportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of reports.
     */
    distinct?: Enumerable<ReportScalarFieldEnum>
  }

  /**
   * report findFirst
   */
  export interface reportFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends reportFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * report findFirstOrThrow
   */
  export type reportFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report
     */
    select?: reportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: reportInclude<ExtArgs> | null
    /**
     * Filter, which report to fetch.
     */
    where?: reportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reports to fetch.
     */
    orderBy?: Enumerable<reportOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for reports.
     */
    cursor?: reportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of reports.
     */
    distinct?: Enumerable<ReportScalarFieldEnum>
  }


  /**
   * report findMany
   */
  export type reportFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report
     */
    select?: reportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: reportInclude<ExtArgs> | null
    /**
     * Filter, which reports to fetch.
     */
    where?: reportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reports to fetch.
     */
    orderBy?: Enumerable<reportOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing reports.
     */
    cursor?: reportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reports.
     */
    skip?: number
    distinct?: Enumerable<ReportScalarFieldEnum>
  }


  /**
   * report create
   */
  export type reportCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report
     */
    select?: reportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: reportInclude<ExtArgs> | null
    /**
     * The data needed to create a report.
     */
    data: XOR<reportCreateInput, reportUncheckedCreateInput>
  }


  /**
   * report createMany
   */
  export type reportCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many reports.
     */
    data: Enumerable<reportCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * report update
   */
  export type reportUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report
     */
    select?: reportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: reportInclude<ExtArgs> | null
    /**
     * The data needed to update a report.
     */
    data: XOR<reportUpdateInput, reportUncheckedUpdateInput>
    /**
     * Choose, which report to update.
     */
    where: reportWhereUniqueInput
  }


  /**
   * report updateMany
   */
  export type reportUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update reports.
     */
    data: XOR<reportUpdateManyMutationInput, reportUncheckedUpdateManyInput>
    /**
     * Filter which reports to update
     */
    where?: reportWhereInput
  }


  /**
   * report upsert
   */
  export type reportUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report
     */
    select?: reportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: reportInclude<ExtArgs> | null
    /**
     * The filter to search for the report to update in case it exists.
     */
    where: reportWhereUniqueInput
    /**
     * In case the report found by the `where` argument doesn't exist, create a new report with this data.
     */
    create: XOR<reportCreateInput, reportUncheckedCreateInput>
    /**
     * In case the report was found with the provided `where` argument, update it with this data.
     */
    update: XOR<reportUpdateInput, reportUncheckedUpdateInput>
  }


  /**
   * report delete
   */
  export type reportDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report
     */
    select?: reportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: reportInclude<ExtArgs> | null
    /**
     * Filter which report to delete.
     */
    where: reportWhereUniqueInput
  }


  /**
   * report deleteMany
   */
  export type reportDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which reports to delete
     */
    where?: reportWhereInput
  }


  /**
   * report.report_to_chip
   */
  export type report$report_to_chipArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_chip
     */
    select?: report_to_chipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_chipInclude<ExtArgs> | null
    where?: report_to_chipWhereInput
    orderBy?: Enumerable<report_to_chipOrderByWithRelationInput>
    cursor?: report_to_chipWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<Report_to_chipScalarFieldEnum>
  }


  /**
   * report.report_to_clause
   */
  export type report$report_to_clauseArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_clause
     */
    select?: report_to_clauseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_clauseInclude<ExtArgs> | null
    where?: report_to_clauseWhereInput
    orderBy?: Enumerable<report_to_clauseOrderByWithRelationInput>
    cursor?: report_to_clauseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<Report_to_clauseScalarFieldEnum>
  }


  /**
   * report without action
   */
  export type reportArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report
     */
    select?: reportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: reportInclude<ExtArgs> | null
  }



  /**
   * Model report_to_chip
   */


  export type AggregateReport_to_chip = {
    _count: Report_to_chipCountAggregateOutputType | null
    _min: Report_to_chipMinAggregateOutputType | null
    _max: Report_to_chipMaxAggregateOutputType | null
  }

  export type Report_to_chipMinAggregateOutputType = {
    id: string | null
    report_id: string | null
    chip_id: string | null
  }

  export type Report_to_chipMaxAggregateOutputType = {
    id: string | null
    report_id: string | null
    chip_id: string | null
  }

  export type Report_to_chipCountAggregateOutputType = {
    id: number
    report_id: number
    chip_id: number
    _all: number
  }


  export type Report_to_chipMinAggregateInputType = {
    id?: true
    report_id?: true
    chip_id?: true
  }

  export type Report_to_chipMaxAggregateInputType = {
    id?: true
    report_id?: true
    chip_id?: true
  }

  export type Report_to_chipCountAggregateInputType = {
    id?: true
    report_id?: true
    chip_id?: true
    _all?: true
  }

  export type Report_to_chipAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which report_to_chip to aggregate.
     */
    where?: report_to_chipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of report_to_chips to fetch.
     */
    orderBy?: Enumerable<report_to_chipOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: report_to_chipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` report_to_chips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` report_to_chips.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned report_to_chips
    **/
    _count?: true | Report_to_chipCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Report_to_chipMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Report_to_chipMaxAggregateInputType
  }

  export type GetReport_to_chipAggregateType<T extends Report_to_chipAggregateArgs> = {
        [P in keyof T & keyof AggregateReport_to_chip]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReport_to_chip[P]>
      : GetScalarType<T[P], AggregateReport_to_chip[P]>
  }




  export type Report_to_chipGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: report_to_chipWhereInput
    orderBy?: Enumerable<report_to_chipOrderByWithAggregationInput>
    by: Report_to_chipScalarFieldEnum[]
    having?: report_to_chipScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Report_to_chipCountAggregateInputType | true
    _min?: Report_to_chipMinAggregateInputType
    _max?: Report_to_chipMaxAggregateInputType
  }


  export type Report_to_chipGroupByOutputType = {
    id: string
    report_id: string
    chip_id: string
    _count: Report_to_chipCountAggregateOutputType | null
    _min: Report_to_chipMinAggregateOutputType | null
    _max: Report_to_chipMaxAggregateOutputType | null
  }

  type GetReport_to_chipGroupByPayload<T extends Report_to_chipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<Report_to_chipGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Report_to_chipGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Report_to_chipGroupByOutputType[P]>
            : GetScalarType<T[P], Report_to_chipGroupByOutputType[P]>
        }
      >
    >


  export type report_to_chipSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    report_id?: boolean
    chip_id?: boolean
    chip?: boolean | chipArgs<ExtArgs>
    report?: boolean | reportArgs<ExtArgs>
  }, ExtArgs["result"]["report_to_chip"]>

  export type report_to_chipSelectScalar = {
    id?: boolean
    report_id?: boolean
    chip_id?: boolean
  }

  export type report_to_chipInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    chip?: boolean | chipArgs<ExtArgs>
    report?: boolean | reportArgs<ExtArgs>
  }


  type report_to_chipGetPayload<S extends boolean | null | undefined | report_to_chipArgs> = $Types.GetResult<report_to_chipPayload, S>

  type report_to_chipCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<report_to_chipFindManyArgs, 'select' | 'include'> & {
      select?: Report_to_chipCountAggregateInputType | true
    }

  export interface report_to_chipDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['report_to_chip'], meta: { name: 'report_to_chip' } }
    /**
     * Find zero or one Report_to_chip that matches the filter.
     * @param {report_to_chipFindUniqueArgs} args - Arguments to find a Report_to_chip
     * @example
     * // Get one Report_to_chip
     * const report_to_chip = await prisma.report_to_chip.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends report_to_chipFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, report_to_chipFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'report_to_chip'> extends True ? Prisma__report_to_chipClient<$Types.GetResult<report_to_chipPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__report_to_chipClient<$Types.GetResult<report_to_chipPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Report_to_chip that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {report_to_chipFindUniqueOrThrowArgs} args - Arguments to find a Report_to_chip
     * @example
     * // Get one Report_to_chip
     * const report_to_chip = await prisma.report_to_chip.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends report_to_chipFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, report_to_chipFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__report_to_chipClient<$Types.GetResult<report_to_chipPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Report_to_chip that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {report_to_chipFindFirstArgs} args - Arguments to find a Report_to_chip
     * @example
     * // Get one Report_to_chip
     * const report_to_chip = await prisma.report_to_chip.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends report_to_chipFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, report_to_chipFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'report_to_chip'> extends True ? Prisma__report_to_chipClient<$Types.GetResult<report_to_chipPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__report_to_chipClient<$Types.GetResult<report_to_chipPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Report_to_chip that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {report_to_chipFindFirstOrThrowArgs} args - Arguments to find a Report_to_chip
     * @example
     * // Get one Report_to_chip
     * const report_to_chip = await prisma.report_to_chip.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends report_to_chipFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, report_to_chipFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__report_to_chipClient<$Types.GetResult<report_to_chipPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Report_to_chips that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {report_to_chipFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Report_to_chips
     * const report_to_chips = await prisma.report_to_chip.findMany()
     * 
     * // Get first 10 Report_to_chips
     * const report_to_chips = await prisma.report_to_chip.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const report_to_chipWithIdOnly = await prisma.report_to_chip.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends report_to_chipFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, report_to_chipFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<report_to_chipPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Report_to_chip.
     * @param {report_to_chipCreateArgs} args - Arguments to create a Report_to_chip.
     * @example
     * // Create one Report_to_chip
     * const Report_to_chip = await prisma.report_to_chip.create({
     *   data: {
     *     // ... data to create a Report_to_chip
     *   }
     * })
     * 
    **/
    create<T extends report_to_chipCreateArgs<ExtArgs>>(
      args: SelectSubset<T, report_to_chipCreateArgs<ExtArgs>>
    ): Prisma__report_to_chipClient<$Types.GetResult<report_to_chipPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Report_to_chips.
     *     @param {report_to_chipCreateManyArgs} args - Arguments to create many Report_to_chips.
     *     @example
     *     // Create many Report_to_chips
     *     const report_to_chip = await prisma.report_to_chip.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends report_to_chipCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, report_to_chipCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Report_to_chip.
     * @param {report_to_chipDeleteArgs} args - Arguments to delete one Report_to_chip.
     * @example
     * // Delete one Report_to_chip
     * const Report_to_chip = await prisma.report_to_chip.delete({
     *   where: {
     *     // ... filter to delete one Report_to_chip
     *   }
     * })
     * 
    **/
    delete<T extends report_to_chipDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, report_to_chipDeleteArgs<ExtArgs>>
    ): Prisma__report_to_chipClient<$Types.GetResult<report_to_chipPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Report_to_chip.
     * @param {report_to_chipUpdateArgs} args - Arguments to update one Report_to_chip.
     * @example
     * // Update one Report_to_chip
     * const report_to_chip = await prisma.report_to_chip.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends report_to_chipUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, report_to_chipUpdateArgs<ExtArgs>>
    ): Prisma__report_to_chipClient<$Types.GetResult<report_to_chipPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Report_to_chips.
     * @param {report_to_chipDeleteManyArgs} args - Arguments to filter Report_to_chips to delete.
     * @example
     * // Delete a few Report_to_chips
     * const { count } = await prisma.report_to_chip.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends report_to_chipDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, report_to_chipDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Report_to_chips.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {report_to_chipUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Report_to_chips
     * const report_to_chip = await prisma.report_to_chip.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends report_to_chipUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, report_to_chipUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Report_to_chip.
     * @param {report_to_chipUpsertArgs} args - Arguments to update or create a Report_to_chip.
     * @example
     * // Update or create a Report_to_chip
     * const report_to_chip = await prisma.report_to_chip.upsert({
     *   create: {
     *     // ... data to create a Report_to_chip
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Report_to_chip we want to update
     *   }
     * })
    **/
    upsert<T extends report_to_chipUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, report_to_chipUpsertArgs<ExtArgs>>
    ): Prisma__report_to_chipClient<$Types.GetResult<report_to_chipPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Report_to_chips.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {report_to_chipCountArgs} args - Arguments to filter Report_to_chips to count.
     * @example
     * // Count the number of Report_to_chips
     * const count = await prisma.report_to_chip.count({
     *   where: {
     *     // ... the filter for the Report_to_chips we want to count
     *   }
     * })
    **/
    count<T extends report_to_chipCountArgs>(
      args?: Subset<T, report_to_chipCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Report_to_chipCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Report_to_chip.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Report_to_chipAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Report_to_chipAggregateArgs>(args: Subset<T, Report_to_chipAggregateArgs>): Prisma.PrismaPromise<GetReport_to_chipAggregateType<T>>

    /**
     * Group by Report_to_chip.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Report_to_chipGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Report_to_chipGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Report_to_chipGroupByArgs['orderBy'] }
        : { orderBy?: Report_to_chipGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Report_to_chipGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReport_to_chipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for report_to_chip.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__report_to_chipClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    chip<T extends chipArgs<ExtArgs> = {}>(args?: Subset<T, chipArgs<ExtArgs>>): Prisma__chipClient<$Types.GetResult<chipPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    report<T extends reportArgs<ExtArgs> = {}>(args?: Subset<T, reportArgs<ExtArgs>>): Prisma__reportClient<$Types.GetResult<reportPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * report_to_chip base type for findUnique actions
   */
  export type report_to_chipFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_chip
     */
    select?: report_to_chipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_chipInclude<ExtArgs> | null
    /**
     * Filter, which report_to_chip to fetch.
     */
    where: report_to_chipWhereUniqueInput
  }

  /**
   * report_to_chip findUnique
   */
  export interface report_to_chipFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends report_to_chipFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * report_to_chip findUniqueOrThrow
   */
  export type report_to_chipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_chip
     */
    select?: report_to_chipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_chipInclude<ExtArgs> | null
    /**
     * Filter, which report_to_chip to fetch.
     */
    where: report_to_chipWhereUniqueInput
  }


  /**
   * report_to_chip base type for findFirst actions
   */
  export type report_to_chipFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_chip
     */
    select?: report_to_chipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_chipInclude<ExtArgs> | null
    /**
     * Filter, which report_to_chip to fetch.
     */
    where?: report_to_chipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of report_to_chips to fetch.
     */
    orderBy?: Enumerable<report_to_chipOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for report_to_chips.
     */
    cursor?: report_to_chipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` report_to_chips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` report_to_chips.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of report_to_chips.
     */
    distinct?: Enumerable<Report_to_chipScalarFieldEnum>
  }

  /**
   * report_to_chip findFirst
   */
  export interface report_to_chipFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends report_to_chipFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * report_to_chip findFirstOrThrow
   */
  export type report_to_chipFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_chip
     */
    select?: report_to_chipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_chipInclude<ExtArgs> | null
    /**
     * Filter, which report_to_chip to fetch.
     */
    where?: report_to_chipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of report_to_chips to fetch.
     */
    orderBy?: Enumerable<report_to_chipOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for report_to_chips.
     */
    cursor?: report_to_chipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` report_to_chips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` report_to_chips.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of report_to_chips.
     */
    distinct?: Enumerable<Report_to_chipScalarFieldEnum>
  }


  /**
   * report_to_chip findMany
   */
  export type report_to_chipFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_chip
     */
    select?: report_to_chipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_chipInclude<ExtArgs> | null
    /**
     * Filter, which report_to_chips to fetch.
     */
    where?: report_to_chipWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of report_to_chips to fetch.
     */
    orderBy?: Enumerable<report_to_chipOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing report_to_chips.
     */
    cursor?: report_to_chipWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` report_to_chips from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` report_to_chips.
     */
    skip?: number
    distinct?: Enumerable<Report_to_chipScalarFieldEnum>
  }


  /**
   * report_to_chip create
   */
  export type report_to_chipCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_chip
     */
    select?: report_to_chipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_chipInclude<ExtArgs> | null
    /**
     * The data needed to create a report_to_chip.
     */
    data: XOR<report_to_chipCreateInput, report_to_chipUncheckedCreateInput>
  }


  /**
   * report_to_chip createMany
   */
  export type report_to_chipCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many report_to_chips.
     */
    data: Enumerable<report_to_chipCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * report_to_chip update
   */
  export type report_to_chipUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_chip
     */
    select?: report_to_chipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_chipInclude<ExtArgs> | null
    /**
     * The data needed to update a report_to_chip.
     */
    data: XOR<report_to_chipUpdateInput, report_to_chipUncheckedUpdateInput>
    /**
     * Choose, which report_to_chip to update.
     */
    where: report_to_chipWhereUniqueInput
  }


  /**
   * report_to_chip updateMany
   */
  export type report_to_chipUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update report_to_chips.
     */
    data: XOR<report_to_chipUpdateManyMutationInput, report_to_chipUncheckedUpdateManyInput>
    /**
     * Filter which report_to_chips to update
     */
    where?: report_to_chipWhereInput
  }


  /**
   * report_to_chip upsert
   */
  export type report_to_chipUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_chip
     */
    select?: report_to_chipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_chipInclude<ExtArgs> | null
    /**
     * The filter to search for the report_to_chip to update in case it exists.
     */
    where: report_to_chipWhereUniqueInput
    /**
     * In case the report_to_chip found by the `where` argument doesn't exist, create a new report_to_chip with this data.
     */
    create: XOR<report_to_chipCreateInput, report_to_chipUncheckedCreateInput>
    /**
     * In case the report_to_chip was found with the provided `where` argument, update it with this data.
     */
    update: XOR<report_to_chipUpdateInput, report_to_chipUncheckedUpdateInput>
  }


  /**
   * report_to_chip delete
   */
  export type report_to_chipDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_chip
     */
    select?: report_to_chipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_chipInclude<ExtArgs> | null
    /**
     * Filter which report_to_chip to delete.
     */
    where: report_to_chipWhereUniqueInput
  }


  /**
   * report_to_chip deleteMany
   */
  export type report_to_chipDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which report_to_chips to delete
     */
    where?: report_to_chipWhereInput
  }


  /**
   * report_to_chip without action
   */
  export type report_to_chipArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_chip
     */
    select?: report_to_chipSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_chipInclude<ExtArgs> | null
  }



  /**
   * Model report_to_clause
   */


  export type AggregateReport_to_clause = {
    _count: Report_to_clauseCountAggregateOutputType | null
    _min: Report_to_clauseMinAggregateOutputType | null
    _max: Report_to_clauseMaxAggregateOutputType | null
  }

  export type Report_to_clauseMinAggregateOutputType = {
    id: string | null
    report_id: string | null
    clause_id: string | null
  }

  export type Report_to_clauseMaxAggregateOutputType = {
    id: string | null
    report_id: string | null
    clause_id: string | null
  }

  export type Report_to_clauseCountAggregateOutputType = {
    id: number
    report_id: number
    clause_id: number
    _all: number
  }


  export type Report_to_clauseMinAggregateInputType = {
    id?: true
    report_id?: true
    clause_id?: true
  }

  export type Report_to_clauseMaxAggregateInputType = {
    id?: true
    report_id?: true
    clause_id?: true
  }

  export type Report_to_clauseCountAggregateInputType = {
    id?: true
    report_id?: true
    clause_id?: true
    _all?: true
  }

  export type Report_to_clauseAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which report_to_clause to aggregate.
     */
    where?: report_to_clauseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of report_to_clauses to fetch.
     */
    orderBy?: Enumerable<report_to_clauseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: report_to_clauseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` report_to_clauses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` report_to_clauses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned report_to_clauses
    **/
    _count?: true | Report_to_clauseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Report_to_clauseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Report_to_clauseMaxAggregateInputType
  }

  export type GetReport_to_clauseAggregateType<T extends Report_to_clauseAggregateArgs> = {
        [P in keyof T & keyof AggregateReport_to_clause]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReport_to_clause[P]>
      : GetScalarType<T[P], AggregateReport_to_clause[P]>
  }




  export type Report_to_clauseGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: report_to_clauseWhereInput
    orderBy?: Enumerable<report_to_clauseOrderByWithAggregationInput>
    by: Report_to_clauseScalarFieldEnum[]
    having?: report_to_clauseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Report_to_clauseCountAggregateInputType | true
    _min?: Report_to_clauseMinAggregateInputType
    _max?: Report_to_clauseMaxAggregateInputType
  }


  export type Report_to_clauseGroupByOutputType = {
    id: string
    report_id: string
    clause_id: string
    _count: Report_to_clauseCountAggregateOutputType | null
    _min: Report_to_clauseMinAggregateOutputType | null
    _max: Report_to_clauseMaxAggregateOutputType | null
  }

  type GetReport_to_clauseGroupByPayload<T extends Report_to_clauseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<Report_to_clauseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Report_to_clauseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Report_to_clauseGroupByOutputType[P]>
            : GetScalarType<T[P], Report_to_clauseGroupByOutputType[P]>
        }
      >
    >


  export type report_to_clauseSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    report_id?: boolean
    clause_id?: boolean
    clause?: boolean | clauseArgs<ExtArgs>
    report?: boolean | reportArgs<ExtArgs>
  }, ExtArgs["result"]["report_to_clause"]>

  export type report_to_clauseSelectScalar = {
    id?: boolean
    report_id?: boolean
    clause_id?: boolean
  }

  export type report_to_clauseInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    clause?: boolean | clauseArgs<ExtArgs>
    report?: boolean | reportArgs<ExtArgs>
  }


  type report_to_clauseGetPayload<S extends boolean | null | undefined | report_to_clauseArgs> = $Types.GetResult<report_to_clausePayload, S>

  type report_to_clauseCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<report_to_clauseFindManyArgs, 'select' | 'include'> & {
      select?: Report_to_clauseCountAggregateInputType | true
    }

  export interface report_to_clauseDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['report_to_clause'], meta: { name: 'report_to_clause' } }
    /**
     * Find zero or one Report_to_clause that matches the filter.
     * @param {report_to_clauseFindUniqueArgs} args - Arguments to find a Report_to_clause
     * @example
     * // Get one Report_to_clause
     * const report_to_clause = await prisma.report_to_clause.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends report_to_clauseFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, report_to_clauseFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'report_to_clause'> extends True ? Prisma__report_to_clauseClient<$Types.GetResult<report_to_clausePayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__report_to_clauseClient<$Types.GetResult<report_to_clausePayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Report_to_clause that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {report_to_clauseFindUniqueOrThrowArgs} args - Arguments to find a Report_to_clause
     * @example
     * // Get one Report_to_clause
     * const report_to_clause = await prisma.report_to_clause.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends report_to_clauseFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, report_to_clauseFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__report_to_clauseClient<$Types.GetResult<report_to_clausePayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Report_to_clause that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {report_to_clauseFindFirstArgs} args - Arguments to find a Report_to_clause
     * @example
     * // Get one Report_to_clause
     * const report_to_clause = await prisma.report_to_clause.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends report_to_clauseFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, report_to_clauseFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'report_to_clause'> extends True ? Prisma__report_to_clauseClient<$Types.GetResult<report_to_clausePayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__report_to_clauseClient<$Types.GetResult<report_to_clausePayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Report_to_clause that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {report_to_clauseFindFirstOrThrowArgs} args - Arguments to find a Report_to_clause
     * @example
     * // Get one Report_to_clause
     * const report_to_clause = await prisma.report_to_clause.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends report_to_clauseFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, report_to_clauseFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__report_to_clauseClient<$Types.GetResult<report_to_clausePayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Report_to_clauses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {report_to_clauseFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Report_to_clauses
     * const report_to_clauses = await prisma.report_to_clause.findMany()
     * 
     * // Get first 10 Report_to_clauses
     * const report_to_clauses = await prisma.report_to_clause.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const report_to_clauseWithIdOnly = await prisma.report_to_clause.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends report_to_clauseFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, report_to_clauseFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<report_to_clausePayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Report_to_clause.
     * @param {report_to_clauseCreateArgs} args - Arguments to create a Report_to_clause.
     * @example
     * // Create one Report_to_clause
     * const Report_to_clause = await prisma.report_to_clause.create({
     *   data: {
     *     // ... data to create a Report_to_clause
     *   }
     * })
     * 
    **/
    create<T extends report_to_clauseCreateArgs<ExtArgs>>(
      args: SelectSubset<T, report_to_clauseCreateArgs<ExtArgs>>
    ): Prisma__report_to_clauseClient<$Types.GetResult<report_to_clausePayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Report_to_clauses.
     *     @param {report_to_clauseCreateManyArgs} args - Arguments to create many Report_to_clauses.
     *     @example
     *     // Create many Report_to_clauses
     *     const report_to_clause = await prisma.report_to_clause.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends report_to_clauseCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, report_to_clauseCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Report_to_clause.
     * @param {report_to_clauseDeleteArgs} args - Arguments to delete one Report_to_clause.
     * @example
     * // Delete one Report_to_clause
     * const Report_to_clause = await prisma.report_to_clause.delete({
     *   where: {
     *     // ... filter to delete one Report_to_clause
     *   }
     * })
     * 
    **/
    delete<T extends report_to_clauseDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, report_to_clauseDeleteArgs<ExtArgs>>
    ): Prisma__report_to_clauseClient<$Types.GetResult<report_to_clausePayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Report_to_clause.
     * @param {report_to_clauseUpdateArgs} args - Arguments to update one Report_to_clause.
     * @example
     * // Update one Report_to_clause
     * const report_to_clause = await prisma.report_to_clause.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends report_to_clauseUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, report_to_clauseUpdateArgs<ExtArgs>>
    ): Prisma__report_to_clauseClient<$Types.GetResult<report_to_clausePayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Report_to_clauses.
     * @param {report_to_clauseDeleteManyArgs} args - Arguments to filter Report_to_clauses to delete.
     * @example
     * // Delete a few Report_to_clauses
     * const { count } = await prisma.report_to_clause.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends report_to_clauseDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, report_to_clauseDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Report_to_clauses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {report_to_clauseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Report_to_clauses
     * const report_to_clause = await prisma.report_to_clause.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends report_to_clauseUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, report_to_clauseUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Report_to_clause.
     * @param {report_to_clauseUpsertArgs} args - Arguments to update or create a Report_to_clause.
     * @example
     * // Update or create a Report_to_clause
     * const report_to_clause = await prisma.report_to_clause.upsert({
     *   create: {
     *     // ... data to create a Report_to_clause
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Report_to_clause we want to update
     *   }
     * })
    **/
    upsert<T extends report_to_clauseUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, report_to_clauseUpsertArgs<ExtArgs>>
    ): Prisma__report_to_clauseClient<$Types.GetResult<report_to_clausePayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Report_to_clauses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {report_to_clauseCountArgs} args - Arguments to filter Report_to_clauses to count.
     * @example
     * // Count the number of Report_to_clauses
     * const count = await prisma.report_to_clause.count({
     *   where: {
     *     // ... the filter for the Report_to_clauses we want to count
     *   }
     * })
    **/
    count<T extends report_to_clauseCountArgs>(
      args?: Subset<T, report_to_clauseCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Report_to_clauseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Report_to_clause.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Report_to_clauseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Report_to_clauseAggregateArgs>(args: Subset<T, Report_to_clauseAggregateArgs>): Prisma.PrismaPromise<GetReport_to_clauseAggregateType<T>>

    /**
     * Group by Report_to_clause.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Report_to_clauseGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Report_to_clauseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Report_to_clauseGroupByArgs['orderBy'] }
        : { orderBy?: Report_to_clauseGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Report_to_clauseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReport_to_clauseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for report_to_clause.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__report_to_clauseClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    clause<T extends clauseArgs<ExtArgs> = {}>(args?: Subset<T, clauseArgs<ExtArgs>>): Prisma__clauseClient<$Types.GetResult<clausePayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    report<T extends reportArgs<ExtArgs> = {}>(args?: Subset<T, reportArgs<ExtArgs>>): Prisma__reportClient<$Types.GetResult<reportPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * report_to_clause base type for findUnique actions
   */
  export type report_to_clauseFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_clause
     */
    select?: report_to_clauseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_clauseInclude<ExtArgs> | null
    /**
     * Filter, which report_to_clause to fetch.
     */
    where: report_to_clauseWhereUniqueInput
  }

  /**
   * report_to_clause findUnique
   */
  export interface report_to_clauseFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends report_to_clauseFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * report_to_clause findUniqueOrThrow
   */
  export type report_to_clauseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_clause
     */
    select?: report_to_clauseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_clauseInclude<ExtArgs> | null
    /**
     * Filter, which report_to_clause to fetch.
     */
    where: report_to_clauseWhereUniqueInput
  }


  /**
   * report_to_clause base type for findFirst actions
   */
  export type report_to_clauseFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_clause
     */
    select?: report_to_clauseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_clauseInclude<ExtArgs> | null
    /**
     * Filter, which report_to_clause to fetch.
     */
    where?: report_to_clauseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of report_to_clauses to fetch.
     */
    orderBy?: Enumerable<report_to_clauseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for report_to_clauses.
     */
    cursor?: report_to_clauseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` report_to_clauses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` report_to_clauses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of report_to_clauses.
     */
    distinct?: Enumerable<Report_to_clauseScalarFieldEnum>
  }

  /**
   * report_to_clause findFirst
   */
  export interface report_to_clauseFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends report_to_clauseFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * report_to_clause findFirstOrThrow
   */
  export type report_to_clauseFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_clause
     */
    select?: report_to_clauseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_clauseInclude<ExtArgs> | null
    /**
     * Filter, which report_to_clause to fetch.
     */
    where?: report_to_clauseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of report_to_clauses to fetch.
     */
    orderBy?: Enumerable<report_to_clauseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for report_to_clauses.
     */
    cursor?: report_to_clauseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` report_to_clauses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` report_to_clauses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of report_to_clauses.
     */
    distinct?: Enumerable<Report_to_clauseScalarFieldEnum>
  }


  /**
   * report_to_clause findMany
   */
  export type report_to_clauseFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_clause
     */
    select?: report_to_clauseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_clauseInclude<ExtArgs> | null
    /**
     * Filter, which report_to_clauses to fetch.
     */
    where?: report_to_clauseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of report_to_clauses to fetch.
     */
    orderBy?: Enumerable<report_to_clauseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing report_to_clauses.
     */
    cursor?: report_to_clauseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` report_to_clauses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` report_to_clauses.
     */
    skip?: number
    distinct?: Enumerable<Report_to_clauseScalarFieldEnum>
  }


  /**
   * report_to_clause create
   */
  export type report_to_clauseCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_clause
     */
    select?: report_to_clauseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_clauseInclude<ExtArgs> | null
    /**
     * The data needed to create a report_to_clause.
     */
    data: XOR<report_to_clauseCreateInput, report_to_clauseUncheckedCreateInput>
  }


  /**
   * report_to_clause createMany
   */
  export type report_to_clauseCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many report_to_clauses.
     */
    data: Enumerable<report_to_clauseCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * report_to_clause update
   */
  export type report_to_clauseUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_clause
     */
    select?: report_to_clauseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_clauseInclude<ExtArgs> | null
    /**
     * The data needed to update a report_to_clause.
     */
    data: XOR<report_to_clauseUpdateInput, report_to_clauseUncheckedUpdateInput>
    /**
     * Choose, which report_to_clause to update.
     */
    where: report_to_clauseWhereUniqueInput
  }


  /**
   * report_to_clause updateMany
   */
  export type report_to_clauseUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update report_to_clauses.
     */
    data: XOR<report_to_clauseUpdateManyMutationInput, report_to_clauseUncheckedUpdateManyInput>
    /**
     * Filter which report_to_clauses to update
     */
    where?: report_to_clauseWhereInput
  }


  /**
   * report_to_clause upsert
   */
  export type report_to_clauseUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_clause
     */
    select?: report_to_clauseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_clauseInclude<ExtArgs> | null
    /**
     * The filter to search for the report_to_clause to update in case it exists.
     */
    where: report_to_clauseWhereUniqueInput
    /**
     * In case the report_to_clause found by the `where` argument doesn't exist, create a new report_to_clause with this data.
     */
    create: XOR<report_to_clauseCreateInput, report_to_clauseUncheckedCreateInput>
    /**
     * In case the report_to_clause was found with the provided `where` argument, update it with this data.
     */
    update: XOR<report_to_clauseUpdateInput, report_to_clauseUncheckedUpdateInput>
  }


  /**
   * report_to_clause delete
   */
  export type report_to_clauseDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_clause
     */
    select?: report_to_clauseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_clauseInclude<ExtArgs> | null
    /**
     * Filter which report_to_clause to delete.
     */
    where: report_to_clauseWhereUniqueInput
  }


  /**
   * report_to_clause deleteMany
   */
  export type report_to_clauseDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which report_to_clauses to delete
     */
    where?: report_to_clauseWhereInput
  }


  /**
   * report_to_clause without action
   */
  export type report_to_clauseArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_clause
     */
    select?: report_to_clauseSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_clauseInclude<ExtArgs> | null
  }



  /**
   * Model users
   */


  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    temporaryLink: string | null
    temporaryLinkExpiresAt: string | null
    password: string | null
    udap_id: string | null
  }

  export type UsersMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    temporaryLink: string | null
    temporaryLinkExpiresAt: string | null
    password: string | null
    udap_id: string | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    email: number
    name: number
    temporaryLink: number
    temporaryLinkExpiresAt: number
    password: number
    udap_id: number
    _all: number
  }


  export type UsersMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    temporaryLink?: true
    temporaryLinkExpiresAt?: true
    password?: true
    udap_id?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    temporaryLink?: true
    temporaryLinkExpiresAt?: true
    password?: true
    udap_id?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    temporaryLink?: true
    temporaryLinkExpiresAt?: true
    password?: true
    udap_id?: true
    _all?: true
  }

  export type UsersAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to aggregate.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: Enumerable<usersOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type UsersGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: usersWhereInput
    orderBy?: Enumerable<usersOrderByWithAggregationInput>
    by: UsersScalarFieldEnum[]
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }


  export type UsersGroupByOutputType = {
    id: string
    email: string
    name: string
    temporaryLink: string | null
    temporaryLinkExpiresAt: string | null
    password: string
    udap_id: string | null
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends UsersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    temporaryLink?: boolean
    temporaryLinkExpiresAt?: boolean
    password?: boolean
    udap_id?: boolean
    udaps?: boolean | udapsArgs<ExtArgs>
  }, ExtArgs["result"]["users"]>

  export type usersSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    temporaryLink?: boolean
    temporaryLinkExpiresAt?: boolean
    password?: boolean
    udap_id?: boolean
  }

  export type usersInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    udaps?: boolean | udapsArgs<ExtArgs>
  }


  type usersGetPayload<S extends boolean | null | undefined | usersArgs> = $Types.GetResult<usersPayload, S>

  type usersCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<usersFindManyArgs, 'select' | 'include'> & {
      select?: UsersCountAggregateInputType | true
    }

  export interface usersDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['users'], meta: { name: 'users' } }
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends usersFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, usersFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'users'> extends True ? Prisma__usersClient<$Types.GetResult<usersPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__usersClient<$Types.GetResult<usersPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Users that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {usersFindUniqueOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends usersFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, usersFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__usersClient<$Types.GetResult<usersPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends usersFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, usersFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'users'> extends True ? Prisma__usersClient<$Types.GetResult<usersPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__usersClient<$Types.GetResult<usersPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Users that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstOrThrowArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends usersFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, usersFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__usersClient<$Types.GetResult<usersPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends usersFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, usersFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<usersPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
    **/
    create<T extends usersCreateArgs<ExtArgs>>(
      args: SelectSubset<T, usersCreateArgs<ExtArgs>>
    ): Prisma__usersClient<$Types.GetResult<usersPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Users.
     *     @param {usersCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const users = await prisma.users.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends usersCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, usersCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
    **/
    delete<T extends usersDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, usersDeleteArgs<ExtArgs>>
    ): Prisma__usersClient<$Types.GetResult<usersPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends usersUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, usersUpdateArgs<ExtArgs>>
    ): Prisma__usersClient<$Types.GetResult<usersPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends usersDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, usersDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends usersUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, usersUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
    **/
    upsert<T extends usersUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, usersUpsertArgs<ExtArgs>>
    ): Prisma__usersClient<$Types.GetResult<usersPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): Prisma.PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsersGroupByArgs['orderBy'] }
        : { orderBy?: UsersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__usersClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    udaps<T extends udapsArgs<ExtArgs> = {}>(args?: Subset<T, udapsArgs<ExtArgs>>): Prisma__udapsClient<$Types.GetResult<udapsPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * users base type for findUnique actions
   */
  export type usersFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }

  /**
   * users findUnique
   */
  export interface usersFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends usersFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * users findUniqueOrThrow
   */
  export type usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where: usersWhereUniqueInput
  }


  /**
   * users base type for findFirst actions
   */
  export type usersFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: Enumerable<usersOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: Enumerable<UsersScalarFieldEnum>
  }

  /**
   * users findFirst
   */
  export interface usersFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends usersFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * users findFirstOrThrow
   */
  export type usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: Enumerable<usersOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: Enumerable<UsersScalarFieldEnum>
  }


  /**
   * users findMany
   */
  export type usersFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: Enumerable<usersOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: Enumerable<UsersScalarFieldEnum>
  }


  /**
   * users create
   */
  export type usersCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to create a users.
     */
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }


  /**
   * users createMany
   */
  export type usersCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: Enumerable<usersCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * users update
   */
  export type usersUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The data needed to update a users.
     */
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     */
    where: usersWhereUniqueInput
  }


  /**
   * users updateMany
   */
  export type usersUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: usersWhereInput
  }


  /**
   * users upsert
   */
  export type usersUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * The filter to search for the users to update in case it exists.
     */
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     */
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }


  /**
   * users delete
   */
  export type usersDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude<ExtArgs> | null
    /**
     * Filter which users to delete.
     */
    where: usersWhereUniqueInput
  }


  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: usersWhereInput
  }


  /**
   * users without action
   */
  export type usersArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude<ExtArgs> | null
  }



  /**
   * Model udaps
   */


  export type AggregateUdaps = {
    _count: UdapsCountAggregateOutputType | null
    _avg: UdapsAvgAggregateOutputType | null
    _sum: UdapsSumAggregateOutputType | null
    _min: UdapsMinAggregateOutputType | null
    _max: UdapsMaxAggregateOutputType | null
  }

  export type UdapsAvgAggregateOutputType = {
    zip_code: number | null
  }

  export type UdapsSumAggregateOutputType = {
    zip_code: number | null
  }

  export type UdapsMinAggregateOutputType = {
    id: string | null
    department: string | null
    complete_coords: string | null
    address: string | null
    visible: boolean | null
    name: string | null
    zip_code: number | null
    city: string | null
    phone: string | null
    email: string | null
  }

  export type UdapsMaxAggregateOutputType = {
    id: string | null
    department: string | null
    complete_coords: string | null
    address: string | null
    visible: boolean | null
    name: string | null
    zip_code: number | null
    city: string | null
    phone: string | null
    email: string | null
  }

  export type UdapsCountAggregateOutputType = {
    id: number
    department: number
    complete_coords: number
    address: number
    visible: number
    name: number
    zip_code: number
    city: number
    phone: number
    email: number
    _all: number
  }


  export type UdapsAvgAggregateInputType = {
    zip_code?: true
  }

  export type UdapsSumAggregateInputType = {
    zip_code?: true
  }

  export type UdapsMinAggregateInputType = {
    id?: true
    department?: true
    complete_coords?: true
    address?: true
    visible?: true
    name?: true
    zip_code?: true
    city?: true
    phone?: true
    email?: true
  }

  export type UdapsMaxAggregateInputType = {
    id?: true
    department?: true
    complete_coords?: true
    address?: true
    visible?: true
    name?: true
    zip_code?: true
    city?: true
    phone?: true
    email?: true
  }

  export type UdapsCountAggregateInputType = {
    id?: true
    department?: true
    complete_coords?: true
    address?: true
    visible?: true
    name?: true
    zip_code?: true
    city?: true
    phone?: true
    email?: true
    _all?: true
  }

  export type UdapsAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which udaps to aggregate.
     */
    where?: udapsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of udaps to fetch.
     */
    orderBy?: Enumerable<udapsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: udapsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` udaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` udaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned udaps
    **/
    _count?: true | UdapsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UdapsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UdapsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UdapsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UdapsMaxAggregateInputType
  }

  export type GetUdapsAggregateType<T extends UdapsAggregateArgs> = {
        [P in keyof T & keyof AggregateUdaps]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUdaps[P]>
      : GetScalarType<T[P], AggregateUdaps[P]>
  }




  export type UdapsGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: udapsWhereInput
    orderBy?: Enumerable<udapsOrderByWithAggregationInput>
    by: UdapsScalarFieldEnum[]
    having?: udapsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UdapsCountAggregateInputType | true
    _avg?: UdapsAvgAggregateInputType
    _sum?: UdapsSumAggregateInputType
    _min?: UdapsMinAggregateInputType
    _max?: UdapsMaxAggregateInputType
  }


  export type UdapsGroupByOutputType = {
    id: string
    department: string
    complete_coords: string | null
    address: string | null
    visible: boolean | null
    name: string | null
    zip_code: number | null
    city: string | null
    phone: string | null
    email: string | null
    _count: UdapsCountAggregateOutputType | null
    _avg: UdapsAvgAggregateOutputType | null
    _sum: UdapsSumAggregateOutputType | null
    _min: UdapsMinAggregateOutputType | null
    _max: UdapsMaxAggregateOutputType | null
  }

  type GetUdapsGroupByPayload<T extends UdapsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<UdapsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UdapsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UdapsGroupByOutputType[P]>
            : GetScalarType<T[P], UdapsGroupByOutputType[P]>
        }
      >
    >


  export type udapsSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    department?: boolean
    complete_coords?: boolean
    address?: boolean
    visible?: boolean
    name?: boolean
    zip_code?: boolean
    city?: boolean
    phone?: boolean
    email?: boolean
    users?: boolean | udaps$usersArgs<ExtArgs>
    _count?: boolean | UdapsCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["udaps"]>

  export type udapsSelectScalar = {
    id?: boolean
    department?: boolean
    complete_coords?: boolean
    address?: boolean
    visible?: boolean
    name?: boolean
    zip_code?: boolean
    city?: boolean
    phone?: boolean
    email?: boolean
  }

  export type udapsInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    users?: boolean | udaps$usersArgs<ExtArgs>
    _count?: boolean | UdapsCountOutputTypeArgs<ExtArgs>
  }


  type udapsGetPayload<S extends boolean | null | undefined | udapsArgs> = $Types.GetResult<udapsPayload, S>

  type udapsCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<udapsFindManyArgs, 'select' | 'include'> & {
      select?: UdapsCountAggregateInputType | true
    }

  export interface udapsDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['udaps'], meta: { name: 'udaps' } }
    /**
     * Find zero or one Udaps that matches the filter.
     * @param {udapsFindUniqueArgs} args - Arguments to find a Udaps
     * @example
     * // Get one Udaps
     * const udaps = await prisma.udaps.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends udapsFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, udapsFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'udaps'> extends True ? Prisma__udapsClient<$Types.GetResult<udapsPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__udapsClient<$Types.GetResult<udapsPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Udaps that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {udapsFindUniqueOrThrowArgs} args - Arguments to find a Udaps
     * @example
     * // Get one Udaps
     * const udaps = await prisma.udaps.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends udapsFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, udapsFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__udapsClient<$Types.GetResult<udapsPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Udaps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {udapsFindFirstArgs} args - Arguments to find a Udaps
     * @example
     * // Get one Udaps
     * const udaps = await prisma.udaps.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends udapsFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, udapsFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'udaps'> extends True ? Prisma__udapsClient<$Types.GetResult<udapsPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__udapsClient<$Types.GetResult<udapsPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Udaps that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {udapsFindFirstOrThrowArgs} args - Arguments to find a Udaps
     * @example
     * // Get one Udaps
     * const udaps = await prisma.udaps.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends udapsFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, udapsFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__udapsClient<$Types.GetResult<udapsPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Udaps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {udapsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Udaps
     * const udaps = await prisma.udaps.findMany()
     * 
     * // Get first 10 Udaps
     * const udaps = await prisma.udaps.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const udapsWithIdOnly = await prisma.udaps.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends udapsFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, udapsFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<udapsPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Udaps.
     * @param {udapsCreateArgs} args - Arguments to create a Udaps.
     * @example
     * // Create one Udaps
     * const Udaps = await prisma.udaps.create({
     *   data: {
     *     // ... data to create a Udaps
     *   }
     * })
     * 
    **/
    create<T extends udapsCreateArgs<ExtArgs>>(
      args: SelectSubset<T, udapsCreateArgs<ExtArgs>>
    ): Prisma__udapsClient<$Types.GetResult<udapsPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Udaps.
     *     @param {udapsCreateManyArgs} args - Arguments to create many Udaps.
     *     @example
     *     // Create many Udaps
     *     const udaps = await prisma.udaps.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends udapsCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, udapsCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Udaps.
     * @param {udapsDeleteArgs} args - Arguments to delete one Udaps.
     * @example
     * // Delete one Udaps
     * const Udaps = await prisma.udaps.delete({
     *   where: {
     *     // ... filter to delete one Udaps
     *   }
     * })
     * 
    **/
    delete<T extends udapsDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, udapsDeleteArgs<ExtArgs>>
    ): Prisma__udapsClient<$Types.GetResult<udapsPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Udaps.
     * @param {udapsUpdateArgs} args - Arguments to update one Udaps.
     * @example
     * // Update one Udaps
     * const udaps = await prisma.udaps.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends udapsUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, udapsUpdateArgs<ExtArgs>>
    ): Prisma__udapsClient<$Types.GetResult<udapsPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Udaps.
     * @param {udapsDeleteManyArgs} args - Arguments to filter Udaps to delete.
     * @example
     * // Delete a few Udaps
     * const { count } = await prisma.udaps.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends udapsDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, udapsDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Udaps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {udapsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Udaps
     * const udaps = await prisma.udaps.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends udapsUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, udapsUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Udaps.
     * @param {udapsUpsertArgs} args - Arguments to update or create a Udaps.
     * @example
     * // Update or create a Udaps
     * const udaps = await prisma.udaps.upsert({
     *   create: {
     *     // ... data to create a Udaps
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Udaps we want to update
     *   }
     * })
    **/
    upsert<T extends udapsUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, udapsUpsertArgs<ExtArgs>>
    ): Prisma__udapsClient<$Types.GetResult<udapsPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Udaps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {udapsCountArgs} args - Arguments to filter Udaps to count.
     * @example
     * // Count the number of Udaps
     * const count = await prisma.udaps.count({
     *   where: {
     *     // ... the filter for the Udaps we want to count
     *   }
     * })
    **/
    count<T extends udapsCountArgs>(
      args?: Subset<T, udapsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UdapsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Udaps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UdapsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UdapsAggregateArgs>(args: Subset<T, UdapsAggregateArgs>): Prisma.PrismaPromise<GetUdapsAggregateType<T>>

    /**
     * Group by Udaps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UdapsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UdapsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UdapsGroupByArgs['orderBy'] }
        : { orderBy?: UdapsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UdapsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUdapsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for udaps.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__udapsClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    users<T extends udaps$usersArgs<ExtArgs> = {}>(args?: Subset<T, udaps$usersArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<usersPayload<ExtArgs>, T, 'findMany', never>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * udaps base type for findUnique actions
   */
  export type udapsFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the udaps
     */
    select?: udapsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: udapsInclude<ExtArgs> | null
    /**
     * Filter, which udaps to fetch.
     */
    where: udapsWhereUniqueInput
  }

  /**
   * udaps findUnique
   */
  export interface udapsFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends udapsFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * udaps findUniqueOrThrow
   */
  export type udapsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the udaps
     */
    select?: udapsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: udapsInclude<ExtArgs> | null
    /**
     * Filter, which udaps to fetch.
     */
    where: udapsWhereUniqueInput
  }


  /**
   * udaps base type for findFirst actions
   */
  export type udapsFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the udaps
     */
    select?: udapsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: udapsInclude<ExtArgs> | null
    /**
     * Filter, which udaps to fetch.
     */
    where?: udapsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of udaps to fetch.
     */
    orderBy?: Enumerable<udapsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for udaps.
     */
    cursor?: udapsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` udaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` udaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of udaps.
     */
    distinct?: Enumerable<UdapsScalarFieldEnum>
  }

  /**
   * udaps findFirst
   */
  export interface udapsFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends udapsFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * udaps findFirstOrThrow
   */
  export type udapsFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the udaps
     */
    select?: udapsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: udapsInclude<ExtArgs> | null
    /**
     * Filter, which udaps to fetch.
     */
    where?: udapsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of udaps to fetch.
     */
    orderBy?: Enumerable<udapsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for udaps.
     */
    cursor?: udapsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` udaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` udaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of udaps.
     */
    distinct?: Enumerable<UdapsScalarFieldEnum>
  }


  /**
   * udaps findMany
   */
  export type udapsFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the udaps
     */
    select?: udapsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: udapsInclude<ExtArgs> | null
    /**
     * Filter, which udaps to fetch.
     */
    where?: udapsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of udaps to fetch.
     */
    orderBy?: Enumerable<udapsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing udaps.
     */
    cursor?: udapsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` udaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` udaps.
     */
    skip?: number
    distinct?: Enumerable<UdapsScalarFieldEnum>
  }


  /**
   * udaps create
   */
  export type udapsCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the udaps
     */
    select?: udapsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: udapsInclude<ExtArgs> | null
    /**
     * The data needed to create a udaps.
     */
    data: XOR<udapsCreateInput, udapsUncheckedCreateInput>
  }


  /**
   * udaps createMany
   */
  export type udapsCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many udaps.
     */
    data: Enumerable<udapsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * udaps update
   */
  export type udapsUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the udaps
     */
    select?: udapsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: udapsInclude<ExtArgs> | null
    /**
     * The data needed to update a udaps.
     */
    data: XOR<udapsUpdateInput, udapsUncheckedUpdateInput>
    /**
     * Choose, which udaps to update.
     */
    where: udapsWhereUniqueInput
  }


  /**
   * udaps updateMany
   */
  export type udapsUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update udaps.
     */
    data: XOR<udapsUpdateManyMutationInput, udapsUncheckedUpdateManyInput>
    /**
     * Filter which udaps to update
     */
    where?: udapsWhereInput
  }


  /**
   * udaps upsert
   */
  export type udapsUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the udaps
     */
    select?: udapsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: udapsInclude<ExtArgs> | null
    /**
     * The filter to search for the udaps to update in case it exists.
     */
    where: udapsWhereUniqueInput
    /**
     * In case the udaps found by the `where` argument doesn't exist, create a new udaps with this data.
     */
    create: XOR<udapsCreateInput, udapsUncheckedCreateInput>
    /**
     * In case the udaps was found with the provided `where` argument, update it with this data.
     */
    update: XOR<udapsUpdateInput, udapsUncheckedUpdateInput>
  }


  /**
   * udaps delete
   */
  export type udapsDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the udaps
     */
    select?: udapsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: udapsInclude<ExtArgs> | null
    /**
     * Filter which udaps to delete.
     */
    where: udapsWhereUniqueInput
  }


  /**
   * udaps deleteMany
   */
  export type udapsDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which udaps to delete
     */
    where?: udapsWhereInput
  }


  /**
   * udaps.users
   */
  export type udaps$usersArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the users
     */
    select?: usersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: usersInclude<ExtArgs> | null
    where?: usersWhereInput
    orderBy?: Enumerable<usersOrderByWithRelationInput>
    cursor?: usersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<UsersScalarFieldEnum>
  }


  /**
   * udaps without action
   */
  export type udapsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the udaps
     */
    select?: udapsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: udapsInclude<ExtArgs> | null
  }



  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Atdatabases_migrations_appliedScalarFieldEnum: {
    id: 'id',
    index: 'index',
    name: 'name',
    script: 'script',
    applied_at: 'applied_at',
    ignored_error: 'ignored_error',
    obsolete: 'obsolete'
  };

  export type Atdatabases_migrations_appliedScalarFieldEnum = (typeof Atdatabases_migrations_appliedScalarFieldEnum)[keyof typeof Atdatabases_migrations_appliedScalarFieldEnum]


  export const Atdatabases_migrations_versionScalarFieldEnum: {
    id: 'id',
    version: 'version'
  };

  export type Atdatabases_migrations_versionScalarFieldEnum = (typeof Atdatabases_migrations_versionScalarFieldEnum)[keyof typeof Atdatabases_migrations_versionScalarFieldEnum]


  export const ChipScalarFieldEnum: {
    id: 'id',
    label: 'label',
    value: 'value'
  };

  export type ChipScalarFieldEnum = (typeof ChipScalarFieldEnum)[keyof typeof ChipScalarFieldEnum]


  export const ClauseScalarFieldEnum: {
    id: 'id',
    label: 'label',
    value: 'value'
  };

  export type ClauseScalarFieldEnum = (typeof ClauseScalarFieldEnum)[keyof typeof ClauseScalarFieldEnum]


  export const DelegationsScalarFieldEnum: {
    createdBy: 'createdBy',
    delegatedTo: 'delegatedTo'
  };

  export type DelegationsScalarFieldEnum = (typeof DelegationsScalarFieldEnum)[keyof typeof DelegationsScalarFieldEnum]


  export const ReportScalarFieldEnum: {
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

  export type ReportScalarFieldEnum = (typeof ReportScalarFieldEnum)[keyof typeof ReportScalarFieldEnum]


  export const Report_to_chipScalarFieldEnum: {
    id: 'id',
    report_id: 'report_id',
    chip_id: 'chip_id'
  };

  export type Report_to_chipScalarFieldEnum = (typeof Report_to_chipScalarFieldEnum)[keyof typeof Report_to_chipScalarFieldEnum]


  export const Report_to_clauseScalarFieldEnum: {
    id: 'id',
    report_id: 'report_id',
    clause_id: 'clause_id'
  };

  export type Report_to_clauseScalarFieldEnum = (typeof Report_to_clauseScalarFieldEnum)[keyof typeof Report_to_clauseScalarFieldEnum]


  export const UsersScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    temporaryLink: 'temporaryLink',
    temporaryLinkExpiresAt: 'temporaryLinkExpiresAt',
    password: 'password',
    udap_id: 'udap_id'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const UdapsScalarFieldEnum: {
    id: 'id',
    department: 'department',
    complete_coords: 'complete_coords',
    address: 'address',
    visible: 'visible',
    name: 'name',
    zip_code: 'zip_code',
    city: 'city',
    phone: 'phone',
    email: 'email'
  };

  export type UdapsScalarFieldEnum = (typeof UdapsScalarFieldEnum)[keyof typeof UdapsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Deep Input Types
   */


  export type atdatabases_migrations_appliedWhereInput = {
    AND?: Enumerable<atdatabases_migrations_appliedWhereInput>
    OR?: Enumerable<atdatabases_migrations_appliedWhereInput>
    NOT?: Enumerable<atdatabases_migrations_appliedWhereInput>
    id?: BigIntFilter | bigint | number
    index?: IntFilter | number
    name?: StringFilter | string
    script?: StringFilter | string
    applied_at?: DateTimeFilter | Date | string
    ignored_error?: StringNullableFilter | string | null
    obsolete?: BoolFilter | boolean
  }

  export type atdatabases_migrations_appliedOrderByWithRelationInput = {
    id?: SortOrder
    index?: SortOrder
    name?: SortOrder
    script?: SortOrder
    applied_at?: SortOrder
    ignored_error?: SortOrderInput | SortOrder
    obsolete?: SortOrder
  }

  export type atdatabases_migrations_appliedWhereUniqueInput = {
    id?: bigint | number
  }

  export type atdatabases_migrations_appliedOrderByWithAggregationInput = {
    id?: SortOrder
    index?: SortOrder
    name?: SortOrder
    script?: SortOrder
    applied_at?: SortOrder
    ignored_error?: SortOrderInput | SortOrder
    obsolete?: SortOrder
    _count?: atdatabases_migrations_appliedCountOrderByAggregateInput
    _avg?: atdatabases_migrations_appliedAvgOrderByAggregateInput
    _max?: atdatabases_migrations_appliedMaxOrderByAggregateInput
    _min?: atdatabases_migrations_appliedMinOrderByAggregateInput
    _sum?: atdatabases_migrations_appliedSumOrderByAggregateInput
  }

  export type atdatabases_migrations_appliedScalarWhereWithAggregatesInput = {
    AND?: Enumerable<atdatabases_migrations_appliedScalarWhereWithAggregatesInput>
    OR?: Enumerable<atdatabases_migrations_appliedScalarWhereWithAggregatesInput>
    NOT?: Enumerable<atdatabases_migrations_appliedScalarWhereWithAggregatesInput>
    id?: BigIntWithAggregatesFilter | bigint | number
    index?: IntWithAggregatesFilter | number
    name?: StringWithAggregatesFilter | string
    script?: StringWithAggregatesFilter | string
    applied_at?: DateTimeWithAggregatesFilter | Date | string
    ignored_error?: StringNullableWithAggregatesFilter | string | null
    obsolete?: BoolWithAggregatesFilter | boolean
  }

  export type atdatabases_migrations_versionWhereInput = {
    AND?: Enumerable<atdatabases_migrations_versionWhereInput>
    OR?: Enumerable<atdatabases_migrations_versionWhereInput>
    NOT?: Enumerable<atdatabases_migrations_versionWhereInput>
    id?: IntFilter | number
    version?: StringNullableFilter | string | null
  }

  export type atdatabases_migrations_versionOrderByWithRelationInput = {
    id?: SortOrder
    version?: SortOrderInput | SortOrder
  }

  export type atdatabases_migrations_versionWhereUniqueInput = {
    id?: number
  }

  export type atdatabases_migrations_versionOrderByWithAggregationInput = {
    id?: SortOrder
    version?: SortOrderInput | SortOrder
    _count?: atdatabases_migrations_versionCountOrderByAggregateInput
    _avg?: atdatabases_migrations_versionAvgOrderByAggregateInput
    _max?: atdatabases_migrations_versionMaxOrderByAggregateInput
    _min?: atdatabases_migrations_versionMinOrderByAggregateInput
    _sum?: atdatabases_migrations_versionSumOrderByAggregateInput
  }

  export type atdatabases_migrations_versionScalarWhereWithAggregatesInput = {
    AND?: Enumerable<atdatabases_migrations_versionScalarWhereWithAggregatesInput>
    OR?: Enumerable<atdatabases_migrations_versionScalarWhereWithAggregatesInput>
    NOT?: Enumerable<atdatabases_migrations_versionScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    version?: StringNullableWithAggregatesFilter | string | null
  }

  export type chipWhereInput = {
    AND?: Enumerable<chipWhereInput>
    OR?: Enumerable<chipWhereInput>
    NOT?: Enumerable<chipWhereInput>
    id?: StringFilter | string
    label?: StringFilter | string
    value?: StringFilter | string
    report_to_chip?: Report_to_chipListRelationFilter
  }

  export type chipOrderByWithRelationInput = {
    id?: SortOrder
    label?: SortOrder
    value?: SortOrder
    report_to_chip?: report_to_chipOrderByRelationAggregateInput
  }

  export type chipWhereUniqueInput = {
    id?: string
  }

  export type chipOrderByWithAggregationInput = {
    id?: SortOrder
    label?: SortOrder
    value?: SortOrder
    _count?: chipCountOrderByAggregateInput
    _max?: chipMaxOrderByAggregateInput
    _min?: chipMinOrderByAggregateInput
  }

  export type chipScalarWhereWithAggregatesInput = {
    AND?: Enumerable<chipScalarWhereWithAggregatesInput>
    OR?: Enumerable<chipScalarWhereWithAggregatesInput>
    NOT?: Enumerable<chipScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    label?: StringWithAggregatesFilter | string
    value?: StringWithAggregatesFilter | string
  }

  export type clauseWhereInput = {
    AND?: Enumerable<clauseWhereInput>
    OR?: Enumerable<clauseWhereInput>
    NOT?: Enumerable<clauseWhereInput>
    id?: StringFilter | string
    label?: StringFilter | string
    value?: StringFilter | string
    report_to_clause?: Report_to_clauseListRelationFilter
  }

  export type clauseOrderByWithRelationInput = {
    id?: SortOrder
    label?: SortOrder
    value?: SortOrder
    report_to_clause?: report_to_clauseOrderByRelationAggregateInput
  }

  export type clauseWhereUniqueInput = {
    id?: string
  }

  export type clauseOrderByWithAggregationInput = {
    id?: SortOrder
    label?: SortOrder
    value?: SortOrder
    _count?: clauseCountOrderByAggregateInput
    _max?: clauseMaxOrderByAggregateInput
    _min?: clauseMinOrderByAggregateInput
  }

  export type clauseScalarWhereWithAggregatesInput = {
    AND?: Enumerable<clauseScalarWhereWithAggregatesInput>
    OR?: Enumerable<clauseScalarWhereWithAggregatesInput>
    NOT?: Enumerable<clauseScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    label?: StringWithAggregatesFilter | string
    value?: StringWithAggregatesFilter | string
  }

  export type delegationsWhereInput = {
    AND?: Enumerable<delegationsWhereInput>
    OR?: Enumerable<delegationsWhereInput>
    NOT?: Enumerable<delegationsWhereInput>
    createdBy?: StringFilter | string
    delegatedTo?: StringFilter | string
  }

  export type delegationsOrderByWithRelationInput = {
    createdBy?: SortOrder
    delegatedTo?: SortOrder
  }

  export type delegationsWhereUniqueInput = {
    createdBy_delegatedTo?: delegationsCreatedByDelegatedToCompoundUniqueInput
  }

  export type delegationsOrderByWithAggregationInput = {
    createdBy?: SortOrder
    delegatedTo?: SortOrder
    _count?: delegationsCountOrderByAggregateInput
    _max?: delegationsMaxOrderByAggregateInput
    _min?: delegationsMinOrderByAggregateInput
  }

  export type delegationsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<delegationsScalarWhereWithAggregatesInput>
    OR?: Enumerable<delegationsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<delegationsScalarWhereWithAggregatesInput>
    createdBy?: StringWithAggregatesFilter | string
    delegatedTo?: StringWithAggregatesFilter | string
  }

  export type reportWhereInput = {
    AND?: Enumerable<reportWhereInput>
    OR?: Enumerable<reportWhereInput>
    NOT?: Enumerable<reportWhereInput>
    id?: StringFilter | string
    title?: StringNullableFilter | string | null
    project_description?: StringNullableFilter | string | null
    redacted_by?: StringNullableFilter | string | null
    meet_date?: DateTimeNullableFilter | Date | string | null
    applicant_name?: StringNullableFilter | string | null
    applicant_address?: StringNullableFilter | string | null
    project_cadastral_ref?: StringNullableFilter | string | null
    project_space_type?: StringNullableFilter | string | null
    decision?: StringNullableFilter | string | null
    precisions?: StringNullableFilter | string | null
    contacts?: StringNullableFilter | string | null
    further_information?: StringNullableFilter | string | null
    created_by_id?: StringFilter | string
    created_by_username?: StringFilter | string
    created_at?: DateTimeFilter | Date | string
    service_instructeur?: StringNullableFilter | string | null
    report_to_chip?: Report_to_chipListRelationFilter
    report_to_clause?: Report_to_clauseListRelationFilter
  }

  export type reportOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrderInput | SortOrder
    project_description?: SortOrderInput | SortOrder
    redacted_by?: SortOrderInput | SortOrder
    meet_date?: SortOrderInput | SortOrder
    applicant_name?: SortOrderInput | SortOrder
    applicant_address?: SortOrderInput | SortOrder
    project_cadastral_ref?: SortOrderInput | SortOrder
    project_space_type?: SortOrderInput | SortOrder
    decision?: SortOrderInput | SortOrder
    precisions?: SortOrderInput | SortOrder
    contacts?: SortOrderInput | SortOrder
    further_information?: SortOrderInput | SortOrder
    created_by_id?: SortOrder
    created_by_username?: SortOrder
    created_at?: SortOrder
    service_instructeur?: SortOrderInput | SortOrder
    report_to_chip?: report_to_chipOrderByRelationAggregateInput
    report_to_clause?: report_to_clauseOrderByRelationAggregateInput
  }

  export type reportWhereUniqueInput = {
    id?: string
  }

  export type reportOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrderInput | SortOrder
    project_description?: SortOrderInput | SortOrder
    redacted_by?: SortOrderInput | SortOrder
    meet_date?: SortOrderInput | SortOrder
    applicant_name?: SortOrderInput | SortOrder
    applicant_address?: SortOrderInput | SortOrder
    project_cadastral_ref?: SortOrderInput | SortOrder
    project_space_type?: SortOrderInput | SortOrder
    decision?: SortOrderInput | SortOrder
    precisions?: SortOrderInput | SortOrder
    contacts?: SortOrderInput | SortOrder
    further_information?: SortOrderInput | SortOrder
    created_by_id?: SortOrder
    created_by_username?: SortOrder
    created_at?: SortOrder
    service_instructeur?: SortOrderInput | SortOrder
    _count?: reportCountOrderByAggregateInput
    _max?: reportMaxOrderByAggregateInput
    _min?: reportMinOrderByAggregateInput
  }

  export type reportScalarWhereWithAggregatesInput = {
    AND?: Enumerable<reportScalarWhereWithAggregatesInput>
    OR?: Enumerable<reportScalarWhereWithAggregatesInput>
    NOT?: Enumerable<reportScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    title?: StringNullableWithAggregatesFilter | string | null
    project_description?: StringNullableWithAggregatesFilter | string | null
    redacted_by?: StringNullableWithAggregatesFilter | string | null
    meet_date?: DateTimeNullableWithAggregatesFilter | Date | string | null
    applicant_name?: StringNullableWithAggregatesFilter | string | null
    applicant_address?: StringNullableWithAggregatesFilter | string | null
    project_cadastral_ref?: StringNullableWithAggregatesFilter | string | null
    project_space_type?: StringNullableWithAggregatesFilter | string | null
    decision?: StringNullableWithAggregatesFilter | string | null
    precisions?: StringNullableWithAggregatesFilter | string | null
    contacts?: StringNullableWithAggregatesFilter | string | null
    further_information?: StringNullableWithAggregatesFilter | string | null
    created_by_id?: StringWithAggregatesFilter | string
    created_by_username?: StringWithAggregatesFilter | string
    created_at?: DateTimeWithAggregatesFilter | Date | string
    service_instructeur?: StringNullableWithAggregatesFilter | string | null
  }

  export type report_to_chipWhereInput = {
    AND?: Enumerable<report_to_chipWhereInput>
    OR?: Enumerable<report_to_chipWhereInput>
    NOT?: Enumerable<report_to_chipWhereInput>
    id?: StringFilter | string
    report_id?: StringFilter | string
    chip_id?: StringFilter | string
    chip?: XOR<ChipRelationFilter, chipWhereInput>
    report?: XOR<ReportRelationFilter, reportWhereInput>
  }

  export type report_to_chipOrderByWithRelationInput = {
    id?: SortOrder
    report_id?: SortOrder
    chip_id?: SortOrder
    chip?: chipOrderByWithRelationInput
    report?: reportOrderByWithRelationInput
  }

  export type report_to_chipWhereUniqueInput = {
    id?: string
  }

  export type report_to_chipOrderByWithAggregationInput = {
    id?: SortOrder
    report_id?: SortOrder
    chip_id?: SortOrder
    _count?: report_to_chipCountOrderByAggregateInput
    _max?: report_to_chipMaxOrderByAggregateInput
    _min?: report_to_chipMinOrderByAggregateInput
  }

  export type report_to_chipScalarWhereWithAggregatesInput = {
    AND?: Enumerable<report_to_chipScalarWhereWithAggregatesInput>
    OR?: Enumerable<report_to_chipScalarWhereWithAggregatesInput>
    NOT?: Enumerable<report_to_chipScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    report_id?: StringWithAggregatesFilter | string
    chip_id?: StringWithAggregatesFilter | string
  }

  export type report_to_clauseWhereInput = {
    AND?: Enumerable<report_to_clauseWhereInput>
    OR?: Enumerable<report_to_clauseWhereInput>
    NOT?: Enumerable<report_to_clauseWhereInput>
    id?: StringFilter | string
    report_id?: StringFilter | string
    clause_id?: StringFilter | string
    clause?: XOR<ClauseRelationFilter, clauseWhereInput>
    report?: XOR<ReportRelationFilter, reportWhereInput>
  }

  export type report_to_clauseOrderByWithRelationInput = {
    id?: SortOrder
    report_id?: SortOrder
    clause_id?: SortOrder
    clause?: clauseOrderByWithRelationInput
    report?: reportOrderByWithRelationInput
  }

  export type report_to_clauseWhereUniqueInput = {
    id?: string
  }

  export type report_to_clauseOrderByWithAggregationInput = {
    id?: SortOrder
    report_id?: SortOrder
    clause_id?: SortOrder
    _count?: report_to_clauseCountOrderByAggregateInput
    _max?: report_to_clauseMaxOrderByAggregateInput
    _min?: report_to_clauseMinOrderByAggregateInput
  }

  export type report_to_clauseScalarWhereWithAggregatesInput = {
    AND?: Enumerable<report_to_clauseScalarWhereWithAggregatesInput>
    OR?: Enumerable<report_to_clauseScalarWhereWithAggregatesInput>
    NOT?: Enumerable<report_to_clauseScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    report_id?: StringWithAggregatesFilter | string
    clause_id?: StringWithAggregatesFilter | string
  }

  export type usersWhereInput = {
    AND?: Enumerable<usersWhereInput>
    OR?: Enumerable<usersWhereInput>
    NOT?: Enumerable<usersWhereInput>
    id?: StringFilter | string
    email?: StringFilter | string
    name?: StringFilter | string
    temporaryLink?: StringNullableFilter | string | null
    temporaryLinkExpiresAt?: StringNullableFilter | string | null
    password?: StringFilter | string
    udap_id?: StringNullableFilter | string | null
    udaps?: XOR<UdapsRelationFilter, udapsWhereInput> | null
  }

  export type usersOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    temporaryLink?: SortOrderInput | SortOrder
    temporaryLinkExpiresAt?: SortOrderInput | SortOrder
    password?: SortOrder
    udap_id?: SortOrderInput | SortOrder
    udaps?: udapsOrderByWithRelationInput
  }

  export type usersWhereUniqueInput = {
    id?: string
    email?: string
  }

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    temporaryLink?: SortOrderInput | SortOrder
    temporaryLinkExpiresAt?: SortOrderInput | SortOrder
    password?: SortOrder
    udap_id?: SortOrderInput | SortOrder
    _count?: usersCountOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: Enumerable<usersScalarWhereWithAggregatesInput>
    OR?: Enumerable<usersScalarWhereWithAggregatesInput>
    NOT?: Enumerable<usersScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    email?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    temporaryLink?: StringNullableWithAggregatesFilter | string | null
    temporaryLinkExpiresAt?: StringNullableWithAggregatesFilter | string | null
    password?: StringWithAggregatesFilter | string
    udap_id?: StringNullableWithAggregatesFilter | string | null
  }

  export type udapsWhereInput = {
    AND?: Enumerable<udapsWhereInput>
    OR?: Enumerable<udapsWhereInput>
    NOT?: Enumerable<udapsWhereInput>
    id?: StringFilter | string
    department?: StringFilter | string
    complete_coords?: StringNullableFilter | string | null
    address?: StringNullableFilter | string | null
    visible?: BoolNullableFilter | boolean | null
    name?: StringNullableFilter | string | null
    zip_code?: IntNullableFilter | number | null
    city?: StringNullableFilter | string | null
    phone?: StringNullableFilter | string | null
    email?: StringNullableFilter | string | null
    users?: UsersListRelationFilter
  }

  export type udapsOrderByWithRelationInput = {
    id?: SortOrder
    department?: SortOrder
    complete_coords?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    visible?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    zip_code?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    users?: usersOrderByRelationAggregateInput
  }

  export type udapsWhereUniqueInput = {
    id?: string
  }

  export type udapsOrderByWithAggregationInput = {
    id?: SortOrder
    department?: SortOrder
    complete_coords?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    visible?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    zip_code?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    _count?: udapsCountOrderByAggregateInput
    _avg?: udapsAvgOrderByAggregateInput
    _max?: udapsMaxOrderByAggregateInput
    _min?: udapsMinOrderByAggregateInput
    _sum?: udapsSumOrderByAggregateInput
  }

  export type udapsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<udapsScalarWhereWithAggregatesInput>
    OR?: Enumerable<udapsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<udapsScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    department?: StringWithAggregatesFilter | string
    complete_coords?: StringNullableWithAggregatesFilter | string | null
    address?: StringNullableWithAggregatesFilter | string | null
    visible?: BoolNullableWithAggregatesFilter | boolean | null
    name?: StringNullableWithAggregatesFilter | string | null
    zip_code?: IntNullableWithAggregatesFilter | number | null
    city?: StringNullableWithAggregatesFilter | string | null
    phone?: StringNullableWithAggregatesFilter | string | null
    email?: StringNullableWithAggregatesFilter | string | null
  }

  export type atdatabases_migrations_appliedCreateInput = {
    id?: bigint | number
    index: number
    name: string
    script: string
    applied_at: Date | string
    ignored_error?: string | null
    obsolete: boolean
  }

  export type atdatabases_migrations_appliedUncheckedCreateInput = {
    id?: bigint | number
    index: number
    name: string
    script: string
    applied_at: Date | string
    ignored_error?: string | null
    obsolete: boolean
  }

  export type atdatabases_migrations_appliedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    index?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    script?: StringFieldUpdateOperationsInput | string
    applied_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ignored_error?: NullableStringFieldUpdateOperationsInput | string | null
    obsolete?: BoolFieldUpdateOperationsInput | boolean
  }

  export type atdatabases_migrations_appliedUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    index?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    script?: StringFieldUpdateOperationsInput | string
    applied_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ignored_error?: NullableStringFieldUpdateOperationsInput | string | null
    obsolete?: BoolFieldUpdateOperationsInput | boolean
  }

  export type atdatabases_migrations_appliedCreateManyInput = {
    id?: bigint | number
    index: number
    name: string
    script: string
    applied_at: Date | string
    ignored_error?: string | null
    obsolete: boolean
  }

  export type atdatabases_migrations_appliedUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    index?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    script?: StringFieldUpdateOperationsInput | string
    applied_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ignored_error?: NullableStringFieldUpdateOperationsInput | string | null
    obsolete?: BoolFieldUpdateOperationsInput | boolean
  }

  export type atdatabases_migrations_appliedUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number
    index?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    script?: StringFieldUpdateOperationsInput | string
    applied_at?: DateTimeFieldUpdateOperationsInput | Date | string
    ignored_error?: NullableStringFieldUpdateOperationsInput | string | null
    obsolete?: BoolFieldUpdateOperationsInput | boolean
  }

  export type atdatabases_migrations_versionCreateInput = {
    id: number
    version?: string | null
  }

  export type atdatabases_migrations_versionUncheckedCreateInput = {
    id: number
    version?: string | null
  }

  export type atdatabases_migrations_versionUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    version?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type atdatabases_migrations_versionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    version?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type atdatabases_migrations_versionCreateManyInput = {
    id: number
    version?: string | null
  }

  export type atdatabases_migrations_versionUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    version?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type atdatabases_migrations_versionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    version?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type chipCreateInput = {
    id: string
    label: string
    value: string
    report_to_chip?: report_to_chipCreateNestedManyWithoutChipInput
  }

  export type chipUncheckedCreateInput = {
    id: string
    label: string
    value: string
    report_to_chip?: report_to_chipUncheckedCreateNestedManyWithoutChipInput
  }

  export type chipUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    report_to_chip?: report_to_chipUpdateManyWithoutChipNestedInput
  }

  export type chipUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    report_to_chip?: report_to_chipUncheckedUpdateManyWithoutChipNestedInput
  }

  export type chipCreateManyInput = {
    id: string
    label: string
    value: string
  }

  export type chipUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type chipUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type clauseCreateInput = {
    id: string
    label: string
    value: string
    report_to_clause?: report_to_clauseCreateNestedManyWithoutClauseInput
  }

  export type clauseUncheckedCreateInput = {
    id: string
    label: string
    value: string
    report_to_clause?: report_to_clauseUncheckedCreateNestedManyWithoutClauseInput
  }

  export type clauseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    report_to_clause?: report_to_clauseUpdateManyWithoutClauseNestedInput
  }

  export type clauseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    report_to_clause?: report_to_clauseUncheckedUpdateManyWithoutClauseNestedInput
  }

  export type clauseCreateManyInput = {
    id: string
    label: string
    value: string
  }

  export type clauseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type clauseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type delegationsCreateInput = {
    createdBy: string
    delegatedTo: string
  }

  export type delegationsUncheckedCreateInput = {
    createdBy: string
    delegatedTo: string
  }

  export type delegationsUpdateInput = {
    createdBy?: StringFieldUpdateOperationsInput | string
    delegatedTo?: StringFieldUpdateOperationsInput | string
  }

  export type delegationsUncheckedUpdateInput = {
    createdBy?: StringFieldUpdateOperationsInput | string
    delegatedTo?: StringFieldUpdateOperationsInput | string
  }

  export type delegationsCreateManyInput = {
    createdBy: string
    delegatedTo: string
  }

  export type delegationsUpdateManyMutationInput = {
    createdBy?: StringFieldUpdateOperationsInput | string
    delegatedTo?: StringFieldUpdateOperationsInput | string
  }

  export type delegationsUncheckedUpdateManyInput = {
    createdBy?: StringFieldUpdateOperationsInput | string
    delegatedTo?: StringFieldUpdateOperationsInput | string
  }

  export type reportCreateInput = {
    id: string
    title?: string | null
    project_description?: string | null
    redacted_by?: string | null
    meet_date?: Date | string | null
    applicant_name?: string | null
    applicant_address?: string | null
    project_cadastral_ref?: string | null
    project_space_type?: string | null
    decision?: string | null
    precisions?: string | null
    contacts?: string | null
    further_information?: string | null
    created_by_id: string
    created_by_username: string
    created_at: Date | string
    service_instructeur?: string | null
    report_to_chip?: report_to_chipCreateNestedManyWithoutReportInput
    report_to_clause?: report_to_clauseCreateNestedManyWithoutReportInput
  }

  export type reportUncheckedCreateInput = {
    id: string
    title?: string | null
    project_description?: string | null
    redacted_by?: string | null
    meet_date?: Date | string | null
    applicant_name?: string | null
    applicant_address?: string | null
    project_cadastral_ref?: string | null
    project_space_type?: string | null
    decision?: string | null
    precisions?: string | null
    contacts?: string | null
    further_information?: string | null
    created_by_id: string
    created_by_username: string
    created_at: Date | string
    service_instructeur?: string | null
    report_to_chip?: report_to_chipUncheckedCreateNestedManyWithoutReportInput
    report_to_clause?: report_to_clauseUncheckedCreateNestedManyWithoutReportInput
  }

  export type reportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    project_description?: NullableStringFieldUpdateOperationsInput | string | null
    redacted_by?: NullableStringFieldUpdateOperationsInput | string | null
    meet_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    applicant_name?: NullableStringFieldUpdateOperationsInput | string | null
    applicant_address?: NullableStringFieldUpdateOperationsInput | string | null
    project_cadastral_ref?: NullableStringFieldUpdateOperationsInput | string | null
    project_space_type?: NullableStringFieldUpdateOperationsInput | string | null
    decision?: NullableStringFieldUpdateOperationsInput | string | null
    precisions?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    further_information?: NullableStringFieldUpdateOperationsInput | string | null
    created_by_id?: StringFieldUpdateOperationsInput | string
    created_by_username?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    service_instructeur?: NullableStringFieldUpdateOperationsInput | string | null
    report_to_chip?: report_to_chipUpdateManyWithoutReportNestedInput
    report_to_clause?: report_to_clauseUpdateManyWithoutReportNestedInput
  }

  export type reportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    project_description?: NullableStringFieldUpdateOperationsInput | string | null
    redacted_by?: NullableStringFieldUpdateOperationsInput | string | null
    meet_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    applicant_name?: NullableStringFieldUpdateOperationsInput | string | null
    applicant_address?: NullableStringFieldUpdateOperationsInput | string | null
    project_cadastral_ref?: NullableStringFieldUpdateOperationsInput | string | null
    project_space_type?: NullableStringFieldUpdateOperationsInput | string | null
    decision?: NullableStringFieldUpdateOperationsInput | string | null
    precisions?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    further_information?: NullableStringFieldUpdateOperationsInput | string | null
    created_by_id?: StringFieldUpdateOperationsInput | string
    created_by_username?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    service_instructeur?: NullableStringFieldUpdateOperationsInput | string | null
    report_to_chip?: report_to_chipUncheckedUpdateManyWithoutReportNestedInput
    report_to_clause?: report_to_clauseUncheckedUpdateManyWithoutReportNestedInput
  }

  export type reportCreateManyInput = {
    id: string
    title?: string | null
    project_description?: string | null
    redacted_by?: string | null
    meet_date?: Date | string | null
    applicant_name?: string | null
    applicant_address?: string | null
    project_cadastral_ref?: string | null
    project_space_type?: string | null
    decision?: string | null
    precisions?: string | null
    contacts?: string | null
    further_information?: string | null
    created_by_id: string
    created_by_username: string
    created_at: Date | string
    service_instructeur?: string | null
  }

  export type reportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    project_description?: NullableStringFieldUpdateOperationsInput | string | null
    redacted_by?: NullableStringFieldUpdateOperationsInput | string | null
    meet_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    applicant_name?: NullableStringFieldUpdateOperationsInput | string | null
    applicant_address?: NullableStringFieldUpdateOperationsInput | string | null
    project_cadastral_ref?: NullableStringFieldUpdateOperationsInput | string | null
    project_space_type?: NullableStringFieldUpdateOperationsInput | string | null
    decision?: NullableStringFieldUpdateOperationsInput | string | null
    precisions?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    further_information?: NullableStringFieldUpdateOperationsInput | string | null
    created_by_id?: StringFieldUpdateOperationsInput | string
    created_by_username?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    service_instructeur?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type reportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    project_description?: NullableStringFieldUpdateOperationsInput | string | null
    redacted_by?: NullableStringFieldUpdateOperationsInput | string | null
    meet_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    applicant_name?: NullableStringFieldUpdateOperationsInput | string | null
    applicant_address?: NullableStringFieldUpdateOperationsInput | string | null
    project_cadastral_ref?: NullableStringFieldUpdateOperationsInput | string | null
    project_space_type?: NullableStringFieldUpdateOperationsInput | string | null
    decision?: NullableStringFieldUpdateOperationsInput | string | null
    precisions?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    further_information?: NullableStringFieldUpdateOperationsInput | string | null
    created_by_id?: StringFieldUpdateOperationsInput | string
    created_by_username?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    service_instructeur?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type report_to_chipCreateInput = {
    id: string
    chip: chipCreateNestedOneWithoutReport_to_chipInput
    report: reportCreateNestedOneWithoutReport_to_chipInput
  }

  export type report_to_chipUncheckedCreateInput = {
    id: string
    report_id: string
    chip_id: string
  }

  export type report_to_chipUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    chip?: chipUpdateOneRequiredWithoutReport_to_chipNestedInput
    report?: reportUpdateOneRequiredWithoutReport_to_chipNestedInput
  }

  export type report_to_chipUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    report_id?: StringFieldUpdateOperationsInput | string
    chip_id?: StringFieldUpdateOperationsInput | string
  }

  export type report_to_chipCreateManyInput = {
    id: string
    report_id: string
    chip_id: string
  }

  export type report_to_chipUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type report_to_chipUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    report_id?: StringFieldUpdateOperationsInput | string
    chip_id?: StringFieldUpdateOperationsInput | string
  }

  export type report_to_clauseCreateInput = {
    id: string
    clause: clauseCreateNestedOneWithoutReport_to_clauseInput
    report: reportCreateNestedOneWithoutReport_to_clauseInput
  }

  export type report_to_clauseUncheckedCreateInput = {
    id: string
    report_id: string
    clause_id: string
  }

  export type report_to_clauseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clause?: clauseUpdateOneRequiredWithoutReport_to_clauseNestedInput
    report?: reportUpdateOneRequiredWithoutReport_to_clauseNestedInput
  }

  export type report_to_clauseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    report_id?: StringFieldUpdateOperationsInput | string
    clause_id?: StringFieldUpdateOperationsInput | string
  }

  export type report_to_clauseCreateManyInput = {
    id: string
    report_id: string
    clause_id: string
  }

  export type report_to_clauseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type report_to_clauseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    report_id?: StringFieldUpdateOperationsInput | string
    clause_id?: StringFieldUpdateOperationsInput | string
  }

  export type usersCreateInput = {
    id: string
    email: string
    name: string
    temporaryLink?: string | null
    temporaryLinkExpiresAt?: string | null
    password: string
    udaps?: udapsCreateNestedOneWithoutUsersInput
  }

  export type usersUncheckedCreateInput = {
    id: string
    email: string
    name: string
    temporaryLink?: string | null
    temporaryLinkExpiresAt?: string | null
    password: string
    udap_id?: string | null
  }

  export type usersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    temporaryLink?: NullableStringFieldUpdateOperationsInput | string | null
    temporaryLinkExpiresAt?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    udaps?: udapsUpdateOneWithoutUsersNestedInput
  }

  export type usersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    temporaryLink?: NullableStringFieldUpdateOperationsInput | string | null
    temporaryLinkExpiresAt?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    udap_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usersCreateManyInput = {
    id: string
    email: string
    name: string
    temporaryLink?: string | null
    temporaryLinkExpiresAt?: string | null
    password: string
    udap_id?: string | null
  }

  export type usersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    temporaryLink?: NullableStringFieldUpdateOperationsInput | string | null
    temporaryLinkExpiresAt?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
  }

  export type usersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    temporaryLink?: NullableStringFieldUpdateOperationsInput | string | null
    temporaryLinkExpiresAt?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    udap_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type udapsCreateInput = {
    id: string
    department: string
    complete_coords?: string | null
    address?: string | null
    visible?: boolean | null
    name?: string | null
    zip_code?: number | null
    city?: string | null
    phone?: string | null
    email?: string | null
    users?: usersCreateNestedManyWithoutUdapsInput
  }

  export type udapsUncheckedCreateInput = {
    id: string
    department: string
    complete_coords?: string | null
    address?: string | null
    visible?: boolean | null
    name?: string | null
    zip_code?: number | null
    city?: string | null
    phone?: string | null
    email?: string | null
    users?: usersUncheckedCreateNestedManyWithoutUdapsInput
  }

  export type udapsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    complete_coords?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    visible?: NullableBoolFieldUpdateOperationsInput | boolean | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    users?: usersUpdateManyWithoutUdapsNestedInput
  }

  export type udapsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    complete_coords?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    visible?: NullableBoolFieldUpdateOperationsInput | boolean | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    users?: usersUncheckedUpdateManyWithoutUdapsNestedInput
  }

  export type udapsCreateManyInput = {
    id: string
    department: string
    complete_coords?: string | null
    address?: string | null
    visible?: boolean | null
    name?: string | null
    zip_code?: number | null
    city?: string | null
    phone?: string | null
    email?: string | null
  }

  export type udapsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    complete_coords?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    visible?: NullableBoolFieldUpdateOperationsInput | boolean | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type udapsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    complete_coords?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    visible?: NullableBoolFieldUpdateOperationsInput | boolean | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BigIntFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number> | bigint | number
    notIn?: Enumerable<bigint> | Enumerable<number> | bigint | number
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntFilter | bigint | number
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type atdatabases_migrations_appliedCountOrderByAggregateInput = {
    id?: SortOrder
    index?: SortOrder
    name?: SortOrder
    script?: SortOrder
    applied_at?: SortOrder
    ignored_error?: SortOrder
    obsolete?: SortOrder
  }

  export type atdatabases_migrations_appliedAvgOrderByAggregateInput = {
    id?: SortOrder
    index?: SortOrder
  }

  export type atdatabases_migrations_appliedMaxOrderByAggregateInput = {
    id?: SortOrder
    index?: SortOrder
    name?: SortOrder
    script?: SortOrder
    applied_at?: SortOrder
    ignored_error?: SortOrder
    obsolete?: SortOrder
  }

  export type atdatabases_migrations_appliedMinOrderByAggregateInput = {
    id?: SortOrder
    index?: SortOrder
    name?: SortOrder
    script?: SortOrder
    applied_at?: SortOrder
    ignored_error?: SortOrder
    obsolete?: SortOrder
  }

  export type atdatabases_migrations_appliedSumOrderByAggregateInput = {
    id?: SortOrder
    index?: SortOrder
  }

  export type BigIntWithAggregatesFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number> | bigint | number
    notIn?: Enumerable<bigint> | Enumerable<number> | bigint | number
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntWithAggregatesFilter | bigint | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedBigIntFilter
    _min?: NestedBigIntFilter
    _max?: NestedBigIntFilter
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type atdatabases_migrations_versionCountOrderByAggregateInput = {
    id?: SortOrder
    version?: SortOrder
  }

  export type atdatabases_migrations_versionAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type atdatabases_migrations_versionMaxOrderByAggregateInput = {
    id?: SortOrder
    version?: SortOrder
  }

  export type atdatabases_migrations_versionMinOrderByAggregateInput = {
    id?: SortOrder
    version?: SortOrder
  }

  export type atdatabases_migrations_versionSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type Report_to_chipListRelationFilter = {
    every?: report_to_chipWhereInput
    some?: report_to_chipWhereInput
    none?: report_to_chipWhereInput
  }

  export type report_to_chipOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type chipCountOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    value?: SortOrder
  }

  export type chipMaxOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    value?: SortOrder
  }

  export type chipMinOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    value?: SortOrder
  }

  export type Report_to_clauseListRelationFilter = {
    every?: report_to_clauseWhereInput
    some?: report_to_clauseWhereInput
    none?: report_to_clauseWhereInput
  }

  export type report_to_clauseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type clauseCountOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    value?: SortOrder
  }

  export type clauseMaxOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    value?: SortOrder
  }

  export type clauseMinOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    value?: SortOrder
  }

  export type delegationsCreatedByDelegatedToCompoundUniqueInput = {
    createdBy: string
    delegatedTo: string
  }

  export type delegationsCountOrderByAggregateInput = {
    createdBy?: SortOrder
    delegatedTo?: SortOrder
  }

  export type delegationsMaxOrderByAggregateInput = {
    createdBy?: SortOrder
    delegatedTo?: SortOrder
  }

  export type delegationsMinOrderByAggregateInput = {
    createdBy?: SortOrder
    delegatedTo?: SortOrder
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type reportCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    project_description?: SortOrder
    redacted_by?: SortOrder
    meet_date?: SortOrder
    applicant_name?: SortOrder
    applicant_address?: SortOrder
    project_cadastral_ref?: SortOrder
    project_space_type?: SortOrder
    decision?: SortOrder
    precisions?: SortOrder
    contacts?: SortOrder
    further_information?: SortOrder
    created_by_id?: SortOrder
    created_by_username?: SortOrder
    created_at?: SortOrder
    service_instructeur?: SortOrder
  }

  export type reportMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    project_description?: SortOrder
    redacted_by?: SortOrder
    meet_date?: SortOrder
    applicant_name?: SortOrder
    applicant_address?: SortOrder
    project_cadastral_ref?: SortOrder
    project_space_type?: SortOrder
    decision?: SortOrder
    precisions?: SortOrder
    contacts?: SortOrder
    further_information?: SortOrder
    created_by_id?: SortOrder
    created_by_username?: SortOrder
    created_at?: SortOrder
    service_instructeur?: SortOrder
  }

  export type reportMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    project_description?: SortOrder
    redacted_by?: SortOrder
    meet_date?: SortOrder
    applicant_name?: SortOrder
    applicant_address?: SortOrder
    project_cadastral_ref?: SortOrder
    project_space_type?: SortOrder
    decision?: SortOrder
    precisions?: SortOrder
    contacts?: SortOrder
    further_information?: SortOrder
    created_by_id?: SortOrder
    created_by_username?: SortOrder
    created_at?: SortOrder
    service_instructeur?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type ChipRelationFilter = {
    is?: chipWhereInput | null
    isNot?: chipWhereInput | null
  }

  export type ReportRelationFilter = {
    is?: reportWhereInput | null
    isNot?: reportWhereInput | null
  }

  export type report_to_chipCountOrderByAggregateInput = {
    id?: SortOrder
    report_id?: SortOrder
    chip_id?: SortOrder
  }

  export type report_to_chipMaxOrderByAggregateInput = {
    id?: SortOrder
    report_id?: SortOrder
    chip_id?: SortOrder
  }

  export type report_to_chipMinOrderByAggregateInput = {
    id?: SortOrder
    report_id?: SortOrder
    chip_id?: SortOrder
  }

  export type ClauseRelationFilter = {
    is?: clauseWhereInput | null
    isNot?: clauseWhereInput | null
  }

  export type report_to_clauseCountOrderByAggregateInput = {
    id?: SortOrder
    report_id?: SortOrder
    clause_id?: SortOrder
  }

  export type report_to_clauseMaxOrderByAggregateInput = {
    id?: SortOrder
    report_id?: SortOrder
    clause_id?: SortOrder
  }

  export type report_to_clauseMinOrderByAggregateInput = {
    id?: SortOrder
    report_id?: SortOrder
    clause_id?: SortOrder
  }

  export type UdapsRelationFilter = {
    is?: udapsWhereInput | null
    isNot?: udapsWhereInput | null
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    temporaryLink?: SortOrder
    temporaryLinkExpiresAt?: SortOrder
    password?: SortOrder
    udap_id?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    temporaryLink?: SortOrder
    temporaryLinkExpiresAt?: SortOrder
    password?: SortOrder
    udap_id?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    temporaryLink?: SortOrder
    temporaryLinkExpiresAt?: SortOrder
    password?: SortOrder
    udap_id?: SortOrder
  }

  export type BoolNullableFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableFilter | boolean | null
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type UsersListRelationFilter = {
    every?: usersWhereInput
    some?: usersWhereInput
    none?: usersWhereInput
  }

  export type usersOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type udapsCountOrderByAggregateInput = {
    id?: SortOrder
    department?: SortOrder
    complete_coords?: SortOrder
    address?: SortOrder
    visible?: SortOrder
    name?: SortOrder
    zip_code?: SortOrder
    city?: SortOrder
    phone?: SortOrder
    email?: SortOrder
  }

  export type udapsAvgOrderByAggregateInput = {
    zip_code?: SortOrder
  }

  export type udapsMaxOrderByAggregateInput = {
    id?: SortOrder
    department?: SortOrder
    complete_coords?: SortOrder
    address?: SortOrder
    visible?: SortOrder
    name?: SortOrder
    zip_code?: SortOrder
    city?: SortOrder
    phone?: SortOrder
    email?: SortOrder
  }

  export type udapsMinOrderByAggregateInput = {
    id?: SortOrder
    department?: SortOrder
    complete_coords?: SortOrder
    address?: SortOrder
    visible?: SortOrder
    name?: SortOrder
    zip_code?: SortOrder
    city?: SortOrder
    phone?: SortOrder
    email?: SortOrder
  }

  export type udapsSumOrderByAggregateInput = {
    zip_code?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableWithAggregatesFilter | boolean | null
    _count?: NestedIntNullableFilter
    _min?: NestedBoolNullableFilter
    _max?: NestedBoolNullableFilter
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type report_to_chipCreateNestedManyWithoutChipInput = {
    create?: XOR<Enumerable<report_to_chipCreateWithoutChipInput>, Enumerable<report_to_chipUncheckedCreateWithoutChipInput>>
    connectOrCreate?: Enumerable<report_to_chipCreateOrConnectWithoutChipInput>
    createMany?: report_to_chipCreateManyChipInputEnvelope
    connect?: Enumerable<report_to_chipWhereUniqueInput>
  }

  export type report_to_chipUncheckedCreateNestedManyWithoutChipInput = {
    create?: XOR<Enumerable<report_to_chipCreateWithoutChipInput>, Enumerable<report_to_chipUncheckedCreateWithoutChipInput>>
    connectOrCreate?: Enumerable<report_to_chipCreateOrConnectWithoutChipInput>
    createMany?: report_to_chipCreateManyChipInputEnvelope
    connect?: Enumerable<report_to_chipWhereUniqueInput>
  }

  export type report_to_chipUpdateManyWithoutChipNestedInput = {
    create?: XOR<Enumerable<report_to_chipCreateWithoutChipInput>, Enumerable<report_to_chipUncheckedCreateWithoutChipInput>>
    connectOrCreate?: Enumerable<report_to_chipCreateOrConnectWithoutChipInput>
    upsert?: Enumerable<report_to_chipUpsertWithWhereUniqueWithoutChipInput>
    createMany?: report_to_chipCreateManyChipInputEnvelope
    set?: Enumerable<report_to_chipWhereUniqueInput>
    disconnect?: Enumerable<report_to_chipWhereUniqueInput>
    delete?: Enumerable<report_to_chipWhereUniqueInput>
    connect?: Enumerable<report_to_chipWhereUniqueInput>
    update?: Enumerable<report_to_chipUpdateWithWhereUniqueWithoutChipInput>
    updateMany?: Enumerable<report_to_chipUpdateManyWithWhereWithoutChipInput>
    deleteMany?: Enumerable<report_to_chipScalarWhereInput>
  }

  export type report_to_chipUncheckedUpdateManyWithoutChipNestedInput = {
    create?: XOR<Enumerable<report_to_chipCreateWithoutChipInput>, Enumerable<report_to_chipUncheckedCreateWithoutChipInput>>
    connectOrCreate?: Enumerable<report_to_chipCreateOrConnectWithoutChipInput>
    upsert?: Enumerable<report_to_chipUpsertWithWhereUniqueWithoutChipInput>
    createMany?: report_to_chipCreateManyChipInputEnvelope
    set?: Enumerable<report_to_chipWhereUniqueInput>
    disconnect?: Enumerable<report_to_chipWhereUniqueInput>
    delete?: Enumerable<report_to_chipWhereUniqueInput>
    connect?: Enumerable<report_to_chipWhereUniqueInput>
    update?: Enumerable<report_to_chipUpdateWithWhereUniqueWithoutChipInput>
    updateMany?: Enumerable<report_to_chipUpdateManyWithWhereWithoutChipInput>
    deleteMany?: Enumerable<report_to_chipScalarWhereInput>
  }

  export type report_to_clauseCreateNestedManyWithoutClauseInput = {
    create?: XOR<Enumerable<report_to_clauseCreateWithoutClauseInput>, Enumerable<report_to_clauseUncheckedCreateWithoutClauseInput>>
    connectOrCreate?: Enumerable<report_to_clauseCreateOrConnectWithoutClauseInput>
    createMany?: report_to_clauseCreateManyClauseInputEnvelope
    connect?: Enumerable<report_to_clauseWhereUniqueInput>
  }

  export type report_to_clauseUncheckedCreateNestedManyWithoutClauseInput = {
    create?: XOR<Enumerable<report_to_clauseCreateWithoutClauseInput>, Enumerable<report_to_clauseUncheckedCreateWithoutClauseInput>>
    connectOrCreate?: Enumerable<report_to_clauseCreateOrConnectWithoutClauseInput>
    createMany?: report_to_clauseCreateManyClauseInputEnvelope
    connect?: Enumerable<report_to_clauseWhereUniqueInput>
  }

  export type report_to_clauseUpdateManyWithoutClauseNestedInput = {
    create?: XOR<Enumerable<report_to_clauseCreateWithoutClauseInput>, Enumerable<report_to_clauseUncheckedCreateWithoutClauseInput>>
    connectOrCreate?: Enumerable<report_to_clauseCreateOrConnectWithoutClauseInput>
    upsert?: Enumerable<report_to_clauseUpsertWithWhereUniqueWithoutClauseInput>
    createMany?: report_to_clauseCreateManyClauseInputEnvelope
    set?: Enumerable<report_to_clauseWhereUniqueInput>
    disconnect?: Enumerable<report_to_clauseWhereUniqueInput>
    delete?: Enumerable<report_to_clauseWhereUniqueInput>
    connect?: Enumerable<report_to_clauseWhereUniqueInput>
    update?: Enumerable<report_to_clauseUpdateWithWhereUniqueWithoutClauseInput>
    updateMany?: Enumerable<report_to_clauseUpdateManyWithWhereWithoutClauseInput>
    deleteMany?: Enumerable<report_to_clauseScalarWhereInput>
  }

  export type report_to_clauseUncheckedUpdateManyWithoutClauseNestedInput = {
    create?: XOR<Enumerable<report_to_clauseCreateWithoutClauseInput>, Enumerable<report_to_clauseUncheckedCreateWithoutClauseInput>>
    connectOrCreate?: Enumerable<report_to_clauseCreateOrConnectWithoutClauseInput>
    upsert?: Enumerable<report_to_clauseUpsertWithWhereUniqueWithoutClauseInput>
    createMany?: report_to_clauseCreateManyClauseInputEnvelope
    set?: Enumerable<report_to_clauseWhereUniqueInput>
    disconnect?: Enumerable<report_to_clauseWhereUniqueInput>
    delete?: Enumerable<report_to_clauseWhereUniqueInput>
    connect?: Enumerable<report_to_clauseWhereUniqueInput>
    update?: Enumerable<report_to_clauseUpdateWithWhereUniqueWithoutClauseInput>
    updateMany?: Enumerable<report_to_clauseUpdateManyWithWhereWithoutClauseInput>
    deleteMany?: Enumerable<report_to_clauseScalarWhereInput>
  }

  export type report_to_chipCreateNestedManyWithoutReportInput = {
    create?: XOR<Enumerable<report_to_chipCreateWithoutReportInput>, Enumerable<report_to_chipUncheckedCreateWithoutReportInput>>
    connectOrCreate?: Enumerable<report_to_chipCreateOrConnectWithoutReportInput>
    createMany?: report_to_chipCreateManyReportInputEnvelope
    connect?: Enumerable<report_to_chipWhereUniqueInput>
  }

  export type report_to_clauseCreateNestedManyWithoutReportInput = {
    create?: XOR<Enumerable<report_to_clauseCreateWithoutReportInput>, Enumerable<report_to_clauseUncheckedCreateWithoutReportInput>>
    connectOrCreate?: Enumerable<report_to_clauseCreateOrConnectWithoutReportInput>
    createMany?: report_to_clauseCreateManyReportInputEnvelope
    connect?: Enumerable<report_to_clauseWhereUniqueInput>
  }

  export type report_to_chipUncheckedCreateNestedManyWithoutReportInput = {
    create?: XOR<Enumerable<report_to_chipCreateWithoutReportInput>, Enumerable<report_to_chipUncheckedCreateWithoutReportInput>>
    connectOrCreate?: Enumerable<report_to_chipCreateOrConnectWithoutReportInput>
    createMany?: report_to_chipCreateManyReportInputEnvelope
    connect?: Enumerable<report_to_chipWhereUniqueInput>
  }

  export type report_to_clauseUncheckedCreateNestedManyWithoutReportInput = {
    create?: XOR<Enumerable<report_to_clauseCreateWithoutReportInput>, Enumerable<report_to_clauseUncheckedCreateWithoutReportInput>>
    connectOrCreate?: Enumerable<report_to_clauseCreateOrConnectWithoutReportInput>
    createMany?: report_to_clauseCreateManyReportInputEnvelope
    connect?: Enumerable<report_to_clauseWhereUniqueInput>
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type report_to_chipUpdateManyWithoutReportNestedInput = {
    create?: XOR<Enumerable<report_to_chipCreateWithoutReportInput>, Enumerable<report_to_chipUncheckedCreateWithoutReportInput>>
    connectOrCreate?: Enumerable<report_to_chipCreateOrConnectWithoutReportInput>
    upsert?: Enumerable<report_to_chipUpsertWithWhereUniqueWithoutReportInput>
    createMany?: report_to_chipCreateManyReportInputEnvelope
    set?: Enumerable<report_to_chipWhereUniqueInput>
    disconnect?: Enumerable<report_to_chipWhereUniqueInput>
    delete?: Enumerable<report_to_chipWhereUniqueInput>
    connect?: Enumerable<report_to_chipWhereUniqueInput>
    update?: Enumerable<report_to_chipUpdateWithWhereUniqueWithoutReportInput>
    updateMany?: Enumerable<report_to_chipUpdateManyWithWhereWithoutReportInput>
    deleteMany?: Enumerable<report_to_chipScalarWhereInput>
  }

  export type report_to_clauseUpdateManyWithoutReportNestedInput = {
    create?: XOR<Enumerable<report_to_clauseCreateWithoutReportInput>, Enumerable<report_to_clauseUncheckedCreateWithoutReportInput>>
    connectOrCreate?: Enumerable<report_to_clauseCreateOrConnectWithoutReportInput>
    upsert?: Enumerable<report_to_clauseUpsertWithWhereUniqueWithoutReportInput>
    createMany?: report_to_clauseCreateManyReportInputEnvelope
    set?: Enumerable<report_to_clauseWhereUniqueInput>
    disconnect?: Enumerable<report_to_clauseWhereUniqueInput>
    delete?: Enumerable<report_to_clauseWhereUniqueInput>
    connect?: Enumerable<report_to_clauseWhereUniqueInput>
    update?: Enumerable<report_to_clauseUpdateWithWhereUniqueWithoutReportInput>
    updateMany?: Enumerable<report_to_clauseUpdateManyWithWhereWithoutReportInput>
    deleteMany?: Enumerable<report_to_clauseScalarWhereInput>
  }

  export type report_to_chipUncheckedUpdateManyWithoutReportNestedInput = {
    create?: XOR<Enumerable<report_to_chipCreateWithoutReportInput>, Enumerable<report_to_chipUncheckedCreateWithoutReportInput>>
    connectOrCreate?: Enumerable<report_to_chipCreateOrConnectWithoutReportInput>
    upsert?: Enumerable<report_to_chipUpsertWithWhereUniqueWithoutReportInput>
    createMany?: report_to_chipCreateManyReportInputEnvelope
    set?: Enumerable<report_to_chipWhereUniqueInput>
    disconnect?: Enumerable<report_to_chipWhereUniqueInput>
    delete?: Enumerable<report_to_chipWhereUniqueInput>
    connect?: Enumerable<report_to_chipWhereUniqueInput>
    update?: Enumerable<report_to_chipUpdateWithWhereUniqueWithoutReportInput>
    updateMany?: Enumerable<report_to_chipUpdateManyWithWhereWithoutReportInput>
    deleteMany?: Enumerable<report_to_chipScalarWhereInput>
  }

  export type report_to_clauseUncheckedUpdateManyWithoutReportNestedInput = {
    create?: XOR<Enumerable<report_to_clauseCreateWithoutReportInput>, Enumerable<report_to_clauseUncheckedCreateWithoutReportInput>>
    connectOrCreate?: Enumerable<report_to_clauseCreateOrConnectWithoutReportInput>
    upsert?: Enumerable<report_to_clauseUpsertWithWhereUniqueWithoutReportInput>
    createMany?: report_to_clauseCreateManyReportInputEnvelope
    set?: Enumerable<report_to_clauseWhereUniqueInput>
    disconnect?: Enumerable<report_to_clauseWhereUniqueInput>
    delete?: Enumerable<report_to_clauseWhereUniqueInput>
    connect?: Enumerable<report_to_clauseWhereUniqueInput>
    update?: Enumerable<report_to_clauseUpdateWithWhereUniqueWithoutReportInput>
    updateMany?: Enumerable<report_to_clauseUpdateManyWithWhereWithoutReportInput>
    deleteMany?: Enumerable<report_to_clauseScalarWhereInput>
  }

  export type chipCreateNestedOneWithoutReport_to_chipInput = {
    create?: XOR<chipCreateWithoutReport_to_chipInput, chipUncheckedCreateWithoutReport_to_chipInput>
    connectOrCreate?: chipCreateOrConnectWithoutReport_to_chipInput
    connect?: chipWhereUniqueInput
  }

  export type reportCreateNestedOneWithoutReport_to_chipInput = {
    create?: XOR<reportCreateWithoutReport_to_chipInput, reportUncheckedCreateWithoutReport_to_chipInput>
    connectOrCreate?: reportCreateOrConnectWithoutReport_to_chipInput
    connect?: reportWhereUniqueInput
  }

  export type chipUpdateOneRequiredWithoutReport_to_chipNestedInput = {
    create?: XOR<chipCreateWithoutReport_to_chipInput, chipUncheckedCreateWithoutReport_to_chipInput>
    connectOrCreate?: chipCreateOrConnectWithoutReport_to_chipInput
    upsert?: chipUpsertWithoutReport_to_chipInput
    connect?: chipWhereUniqueInput
    update?: XOR<chipUpdateWithoutReport_to_chipInput, chipUncheckedUpdateWithoutReport_to_chipInput>
  }

  export type reportUpdateOneRequiredWithoutReport_to_chipNestedInput = {
    create?: XOR<reportCreateWithoutReport_to_chipInput, reportUncheckedCreateWithoutReport_to_chipInput>
    connectOrCreate?: reportCreateOrConnectWithoutReport_to_chipInput
    upsert?: reportUpsertWithoutReport_to_chipInput
    connect?: reportWhereUniqueInput
    update?: XOR<reportUpdateWithoutReport_to_chipInput, reportUncheckedUpdateWithoutReport_to_chipInput>
  }

  export type clauseCreateNestedOneWithoutReport_to_clauseInput = {
    create?: XOR<clauseCreateWithoutReport_to_clauseInput, clauseUncheckedCreateWithoutReport_to_clauseInput>
    connectOrCreate?: clauseCreateOrConnectWithoutReport_to_clauseInput
    connect?: clauseWhereUniqueInput
  }

  export type reportCreateNestedOneWithoutReport_to_clauseInput = {
    create?: XOR<reportCreateWithoutReport_to_clauseInput, reportUncheckedCreateWithoutReport_to_clauseInput>
    connectOrCreate?: reportCreateOrConnectWithoutReport_to_clauseInput
    connect?: reportWhereUniqueInput
  }

  export type clauseUpdateOneRequiredWithoutReport_to_clauseNestedInput = {
    create?: XOR<clauseCreateWithoutReport_to_clauseInput, clauseUncheckedCreateWithoutReport_to_clauseInput>
    connectOrCreate?: clauseCreateOrConnectWithoutReport_to_clauseInput
    upsert?: clauseUpsertWithoutReport_to_clauseInput
    connect?: clauseWhereUniqueInput
    update?: XOR<clauseUpdateWithoutReport_to_clauseInput, clauseUncheckedUpdateWithoutReport_to_clauseInput>
  }

  export type reportUpdateOneRequiredWithoutReport_to_clauseNestedInput = {
    create?: XOR<reportCreateWithoutReport_to_clauseInput, reportUncheckedCreateWithoutReport_to_clauseInput>
    connectOrCreate?: reportCreateOrConnectWithoutReport_to_clauseInput
    upsert?: reportUpsertWithoutReport_to_clauseInput
    connect?: reportWhereUniqueInput
    update?: XOR<reportUpdateWithoutReport_to_clauseInput, reportUncheckedUpdateWithoutReport_to_clauseInput>
  }

  export type udapsCreateNestedOneWithoutUsersInput = {
    create?: XOR<udapsCreateWithoutUsersInput, udapsUncheckedCreateWithoutUsersInput>
    connectOrCreate?: udapsCreateOrConnectWithoutUsersInput
    connect?: udapsWhereUniqueInput
  }

  export type udapsUpdateOneWithoutUsersNestedInput = {
    create?: XOR<udapsCreateWithoutUsersInput, udapsUncheckedCreateWithoutUsersInput>
    connectOrCreate?: udapsCreateOrConnectWithoutUsersInput
    upsert?: udapsUpsertWithoutUsersInput
    disconnect?: boolean
    delete?: boolean
    connect?: udapsWhereUniqueInput
    update?: XOR<udapsUpdateWithoutUsersInput, udapsUncheckedUpdateWithoutUsersInput>
  }

  export type usersCreateNestedManyWithoutUdapsInput = {
    create?: XOR<Enumerable<usersCreateWithoutUdapsInput>, Enumerable<usersUncheckedCreateWithoutUdapsInput>>
    connectOrCreate?: Enumerable<usersCreateOrConnectWithoutUdapsInput>
    createMany?: usersCreateManyUdapsInputEnvelope
    connect?: Enumerable<usersWhereUniqueInput>
  }

  export type usersUncheckedCreateNestedManyWithoutUdapsInput = {
    create?: XOR<Enumerable<usersCreateWithoutUdapsInput>, Enumerable<usersUncheckedCreateWithoutUdapsInput>>
    connectOrCreate?: Enumerable<usersCreateOrConnectWithoutUdapsInput>
    createMany?: usersCreateManyUdapsInputEnvelope
    connect?: Enumerable<usersWhereUniqueInput>
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type usersUpdateManyWithoutUdapsNestedInput = {
    create?: XOR<Enumerable<usersCreateWithoutUdapsInput>, Enumerable<usersUncheckedCreateWithoutUdapsInput>>
    connectOrCreate?: Enumerable<usersCreateOrConnectWithoutUdapsInput>
    upsert?: Enumerable<usersUpsertWithWhereUniqueWithoutUdapsInput>
    createMany?: usersCreateManyUdapsInputEnvelope
    set?: Enumerable<usersWhereUniqueInput>
    disconnect?: Enumerable<usersWhereUniqueInput>
    delete?: Enumerable<usersWhereUniqueInput>
    connect?: Enumerable<usersWhereUniqueInput>
    update?: Enumerable<usersUpdateWithWhereUniqueWithoutUdapsInput>
    updateMany?: Enumerable<usersUpdateManyWithWhereWithoutUdapsInput>
    deleteMany?: Enumerable<usersScalarWhereInput>
  }

  export type usersUncheckedUpdateManyWithoutUdapsNestedInput = {
    create?: XOR<Enumerable<usersCreateWithoutUdapsInput>, Enumerable<usersUncheckedCreateWithoutUdapsInput>>
    connectOrCreate?: Enumerable<usersCreateOrConnectWithoutUdapsInput>
    upsert?: Enumerable<usersUpsertWithWhereUniqueWithoutUdapsInput>
    createMany?: usersCreateManyUdapsInputEnvelope
    set?: Enumerable<usersWhereUniqueInput>
    disconnect?: Enumerable<usersWhereUniqueInput>
    delete?: Enumerable<usersWhereUniqueInput>
    connect?: Enumerable<usersWhereUniqueInput>
    update?: Enumerable<usersUpdateWithWhereUniqueWithoutUdapsInput>
    updateMany?: Enumerable<usersUpdateManyWithWhereWithoutUdapsInput>
    deleteMany?: Enumerable<usersScalarWhereInput>
  }

  export type NestedBigIntFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number> | bigint | number
    notIn?: Enumerable<bigint> | Enumerable<number> | bigint | number
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntFilter | bigint | number
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedBigIntWithAggregatesFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number> | bigint | number
    notIn?: Enumerable<bigint> | Enumerable<number> | bigint | number
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntWithAggregatesFilter | bigint | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedBigIntFilter
    _min?: NestedBigIntFilter
    _max?: NestedBigIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type NestedBoolNullableFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableFilter | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableWithAggregatesFilter | boolean | null
    _count?: NestedIntNullableFilter
    _min?: NestedBoolNullableFilter
    _max?: NestedBoolNullableFilter
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type report_to_chipCreateWithoutChipInput = {
    id: string
    report: reportCreateNestedOneWithoutReport_to_chipInput
  }

  export type report_to_chipUncheckedCreateWithoutChipInput = {
    id: string
    report_id: string
  }

  export type report_to_chipCreateOrConnectWithoutChipInput = {
    where: report_to_chipWhereUniqueInput
    create: XOR<report_to_chipCreateWithoutChipInput, report_to_chipUncheckedCreateWithoutChipInput>
  }

  export type report_to_chipCreateManyChipInputEnvelope = {
    data: Enumerable<report_to_chipCreateManyChipInput>
    skipDuplicates?: boolean
  }

  export type report_to_chipUpsertWithWhereUniqueWithoutChipInput = {
    where: report_to_chipWhereUniqueInput
    update: XOR<report_to_chipUpdateWithoutChipInput, report_to_chipUncheckedUpdateWithoutChipInput>
    create: XOR<report_to_chipCreateWithoutChipInput, report_to_chipUncheckedCreateWithoutChipInput>
  }

  export type report_to_chipUpdateWithWhereUniqueWithoutChipInput = {
    where: report_to_chipWhereUniqueInput
    data: XOR<report_to_chipUpdateWithoutChipInput, report_to_chipUncheckedUpdateWithoutChipInput>
  }

  export type report_to_chipUpdateManyWithWhereWithoutChipInput = {
    where: report_to_chipScalarWhereInput
    data: XOR<report_to_chipUpdateManyMutationInput, report_to_chipUncheckedUpdateManyWithoutReport_to_chipInput>
  }

  export type report_to_chipScalarWhereInput = {
    AND?: Enumerable<report_to_chipScalarWhereInput>
    OR?: Enumerable<report_to_chipScalarWhereInput>
    NOT?: Enumerable<report_to_chipScalarWhereInput>
    id?: StringFilter | string
    report_id?: StringFilter | string
    chip_id?: StringFilter | string
  }

  export type report_to_clauseCreateWithoutClauseInput = {
    id: string
    report: reportCreateNestedOneWithoutReport_to_clauseInput
  }

  export type report_to_clauseUncheckedCreateWithoutClauseInput = {
    id: string
    report_id: string
  }

  export type report_to_clauseCreateOrConnectWithoutClauseInput = {
    where: report_to_clauseWhereUniqueInput
    create: XOR<report_to_clauseCreateWithoutClauseInput, report_to_clauseUncheckedCreateWithoutClauseInput>
  }

  export type report_to_clauseCreateManyClauseInputEnvelope = {
    data: Enumerable<report_to_clauseCreateManyClauseInput>
    skipDuplicates?: boolean
  }

  export type report_to_clauseUpsertWithWhereUniqueWithoutClauseInput = {
    where: report_to_clauseWhereUniqueInput
    update: XOR<report_to_clauseUpdateWithoutClauseInput, report_to_clauseUncheckedUpdateWithoutClauseInput>
    create: XOR<report_to_clauseCreateWithoutClauseInput, report_to_clauseUncheckedCreateWithoutClauseInput>
  }

  export type report_to_clauseUpdateWithWhereUniqueWithoutClauseInput = {
    where: report_to_clauseWhereUniqueInput
    data: XOR<report_to_clauseUpdateWithoutClauseInput, report_to_clauseUncheckedUpdateWithoutClauseInput>
  }

  export type report_to_clauseUpdateManyWithWhereWithoutClauseInput = {
    where: report_to_clauseScalarWhereInput
    data: XOR<report_to_clauseUpdateManyMutationInput, report_to_clauseUncheckedUpdateManyWithoutReport_to_clauseInput>
  }

  export type report_to_clauseScalarWhereInput = {
    AND?: Enumerable<report_to_clauseScalarWhereInput>
    OR?: Enumerable<report_to_clauseScalarWhereInput>
    NOT?: Enumerable<report_to_clauseScalarWhereInput>
    id?: StringFilter | string
    report_id?: StringFilter | string
    clause_id?: StringFilter | string
  }

  export type report_to_chipCreateWithoutReportInput = {
    id: string
    chip: chipCreateNestedOneWithoutReport_to_chipInput
  }

  export type report_to_chipUncheckedCreateWithoutReportInput = {
    id: string
    chip_id: string
  }

  export type report_to_chipCreateOrConnectWithoutReportInput = {
    where: report_to_chipWhereUniqueInput
    create: XOR<report_to_chipCreateWithoutReportInput, report_to_chipUncheckedCreateWithoutReportInput>
  }

  export type report_to_chipCreateManyReportInputEnvelope = {
    data: Enumerable<report_to_chipCreateManyReportInput>
    skipDuplicates?: boolean
  }

  export type report_to_clauseCreateWithoutReportInput = {
    id: string
    clause: clauseCreateNestedOneWithoutReport_to_clauseInput
  }

  export type report_to_clauseUncheckedCreateWithoutReportInput = {
    id: string
    clause_id: string
  }

  export type report_to_clauseCreateOrConnectWithoutReportInput = {
    where: report_to_clauseWhereUniqueInput
    create: XOR<report_to_clauseCreateWithoutReportInput, report_to_clauseUncheckedCreateWithoutReportInput>
  }

  export type report_to_clauseCreateManyReportInputEnvelope = {
    data: Enumerable<report_to_clauseCreateManyReportInput>
    skipDuplicates?: boolean
  }

  export type report_to_chipUpsertWithWhereUniqueWithoutReportInput = {
    where: report_to_chipWhereUniqueInput
    update: XOR<report_to_chipUpdateWithoutReportInput, report_to_chipUncheckedUpdateWithoutReportInput>
    create: XOR<report_to_chipCreateWithoutReportInput, report_to_chipUncheckedCreateWithoutReportInput>
  }

  export type report_to_chipUpdateWithWhereUniqueWithoutReportInput = {
    where: report_to_chipWhereUniqueInput
    data: XOR<report_to_chipUpdateWithoutReportInput, report_to_chipUncheckedUpdateWithoutReportInput>
  }

  export type report_to_chipUpdateManyWithWhereWithoutReportInput = {
    where: report_to_chipScalarWhereInput
    data: XOR<report_to_chipUpdateManyMutationInput, report_to_chipUncheckedUpdateManyWithoutReport_to_chipInput>
  }

  export type report_to_clauseUpsertWithWhereUniqueWithoutReportInput = {
    where: report_to_clauseWhereUniqueInput
    update: XOR<report_to_clauseUpdateWithoutReportInput, report_to_clauseUncheckedUpdateWithoutReportInput>
    create: XOR<report_to_clauseCreateWithoutReportInput, report_to_clauseUncheckedCreateWithoutReportInput>
  }

  export type report_to_clauseUpdateWithWhereUniqueWithoutReportInput = {
    where: report_to_clauseWhereUniqueInput
    data: XOR<report_to_clauseUpdateWithoutReportInput, report_to_clauseUncheckedUpdateWithoutReportInput>
  }

  export type report_to_clauseUpdateManyWithWhereWithoutReportInput = {
    where: report_to_clauseScalarWhereInput
    data: XOR<report_to_clauseUpdateManyMutationInput, report_to_clauseUncheckedUpdateManyWithoutReport_to_clauseInput>
  }

  export type chipCreateWithoutReport_to_chipInput = {
    id: string
    label: string
    value: string
  }

  export type chipUncheckedCreateWithoutReport_to_chipInput = {
    id: string
    label: string
    value: string
  }

  export type chipCreateOrConnectWithoutReport_to_chipInput = {
    where: chipWhereUniqueInput
    create: XOR<chipCreateWithoutReport_to_chipInput, chipUncheckedCreateWithoutReport_to_chipInput>
  }

  export type reportCreateWithoutReport_to_chipInput = {
    id: string
    title?: string | null
    project_description?: string | null
    redacted_by?: string | null
    meet_date?: Date | string | null
    applicant_name?: string | null
    applicant_address?: string | null
    project_cadastral_ref?: string | null
    project_space_type?: string | null
    decision?: string | null
    precisions?: string | null
    contacts?: string | null
    further_information?: string | null
    created_by_id: string
    created_by_username: string
    created_at: Date | string
    service_instructeur?: string | null
    report_to_clause?: report_to_clauseCreateNestedManyWithoutReportInput
  }

  export type reportUncheckedCreateWithoutReport_to_chipInput = {
    id: string
    title?: string | null
    project_description?: string | null
    redacted_by?: string | null
    meet_date?: Date | string | null
    applicant_name?: string | null
    applicant_address?: string | null
    project_cadastral_ref?: string | null
    project_space_type?: string | null
    decision?: string | null
    precisions?: string | null
    contacts?: string | null
    further_information?: string | null
    created_by_id: string
    created_by_username: string
    created_at: Date | string
    service_instructeur?: string | null
    report_to_clause?: report_to_clauseUncheckedCreateNestedManyWithoutReportInput
  }

  export type reportCreateOrConnectWithoutReport_to_chipInput = {
    where: reportWhereUniqueInput
    create: XOR<reportCreateWithoutReport_to_chipInput, reportUncheckedCreateWithoutReport_to_chipInput>
  }

  export type chipUpsertWithoutReport_to_chipInput = {
    update: XOR<chipUpdateWithoutReport_to_chipInput, chipUncheckedUpdateWithoutReport_to_chipInput>
    create: XOR<chipCreateWithoutReport_to_chipInput, chipUncheckedCreateWithoutReport_to_chipInput>
  }

  export type chipUpdateWithoutReport_to_chipInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type chipUncheckedUpdateWithoutReport_to_chipInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type reportUpsertWithoutReport_to_chipInput = {
    update: XOR<reportUpdateWithoutReport_to_chipInput, reportUncheckedUpdateWithoutReport_to_chipInput>
    create: XOR<reportCreateWithoutReport_to_chipInput, reportUncheckedCreateWithoutReport_to_chipInput>
  }

  export type reportUpdateWithoutReport_to_chipInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    project_description?: NullableStringFieldUpdateOperationsInput | string | null
    redacted_by?: NullableStringFieldUpdateOperationsInput | string | null
    meet_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    applicant_name?: NullableStringFieldUpdateOperationsInput | string | null
    applicant_address?: NullableStringFieldUpdateOperationsInput | string | null
    project_cadastral_ref?: NullableStringFieldUpdateOperationsInput | string | null
    project_space_type?: NullableStringFieldUpdateOperationsInput | string | null
    decision?: NullableStringFieldUpdateOperationsInput | string | null
    precisions?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    further_information?: NullableStringFieldUpdateOperationsInput | string | null
    created_by_id?: StringFieldUpdateOperationsInput | string
    created_by_username?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    service_instructeur?: NullableStringFieldUpdateOperationsInput | string | null
    report_to_clause?: report_to_clauseUpdateManyWithoutReportNestedInput
  }

  export type reportUncheckedUpdateWithoutReport_to_chipInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    project_description?: NullableStringFieldUpdateOperationsInput | string | null
    redacted_by?: NullableStringFieldUpdateOperationsInput | string | null
    meet_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    applicant_name?: NullableStringFieldUpdateOperationsInput | string | null
    applicant_address?: NullableStringFieldUpdateOperationsInput | string | null
    project_cadastral_ref?: NullableStringFieldUpdateOperationsInput | string | null
    project_space_type?: NullableStringFieldUpdateOperationsInput | string | null
    decision?: NullableStringFieldUpdateOperationsInput | string | null
    precisions?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    further_information?: NullableStringFieldUpdateOperationsInput | string | null
    created_by_id?: StringFieldUpdateOperationsInput | string
    created_by_username?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    service_instructeur?: NullableStringFieldUpdateOperationsInput | string | null
    report_to_clause?: report_to_clauseUncheckedUpdateManyWithoutReportNestedInput
  }

  export type clauseCreateWithoutReport_to_clauseInput = {
    id: string
    label: string
    value: string
  }

  export type clauseUncheckedCreateWithoutReport_to_clauseInput = {
    id: string
    label: string
    value: string
  }

  export type clauseCreateOrConnectWithoutReport_to_clauseInput = {
    where: clauseWhereUniqueInput
    create: XOR<clauseCreateWithoutReport_to_clauseInput, clauseUncheckedCreateWithoutReport_to_clauseInput>
  }

  export type reportCreateWithoutReport_to_clauseInput = {
    id: string
    title?: string | null
    project_description?: string | null
    redacted_by?: string | null
    meet_date?: Date | string | null
    applicant_name?: string | null
    applicant_address?: string | null
    project_cadastral_ref?: string | null
    project_space_type?: string | null
    decision?: string | null
    precisions?: string | null
    contacts?: string | null
    further_information?: string | null
    created_by_id: string
    created_by_username: string
    created_at: Date | string
    service_instructeur?: string | null
    report_to_chip?: report_to_chipCreateNestedManyWithoutReportInput
  }

  export type reportUncheckedCreateWithoutReport_to_clauseInput = {
    id: string
    title?: string | null
    project_description?: string | null
    redacted_by?: string | null
    meet_date?: Date | string | null
    applicant_name?: string | null
    applicant_address?: string | null
    project_cadastral_ref?: string | null
    project_space_type?: string | null
    decision?: string | null
    precisions?: string | null
    contacts?: string | null
    further_information?: string | null
    created_by_id: string
    created_by_username: string
    created_at: Date | string
    service_instructeur?: string | null
    report_to_chip?: report_to_chipUncheckedCreateNestedManyWithoutReportInput
  }

  export type reportCreateOrConnectWithoutReport_to_clauseInput = {
    where: reportWhereUniqueInput
    create: XOR<reportCreateWithoutReport_to_clauseInput, reportUncheckedCreateWithoutReport_to_clauseInput>
  }

  export type clauseUpsertWithoutReport_to_clauseInput = {
    update: XOR<clauseUpdateWithoutReport_to_clauseInput, clauseUncheckedUpdateWithoutReport_to_clauseInput>
    create: XOR<clauseCreateWithoutReport_to_clauseInput, clauseUncheckedCreateWithoutReport_to_clauseInput>
  }

  export type clauseUpdateWithoutReport_to_clauseInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type clauseUncheckedUpdateWithoutReport_to_clauseInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type reportUpsertWithoutReport_to_clauseInput = {
    update: XOR<reportUpdateWithoutReport_to_clauseInput, reportUncheckedUpdateWithoutReport_to_clauseInput>
    create: XOR<reportCreateWithoutReport_to_clauseInput, reportUncheckedCreateWithoutReport_to_clauseInput>
  }

  export type reportUpdateWithoutReport_to_clauseInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    project_description?: NullableStringFieldUpdateOperationsInput | string | null
    redacted_by?: NullableStringFieldUpdateOperationsInput | string | null
    meet_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    applicant_name?: NullableStringFieldUpdateOperationsInput | string | null
    applicant_address?: NullableStringFieldUpdateOperationsInput | string | null
    project_cadastral_ref?: NullableStringFieldUpdateOperationsInput | string | null
    project_space_type?: NullableStringFieldUpdateOperationsInput | string | null
    decision?: NullableStringFieldUpdateOperationsInput | string | null
    precisions?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    further_information?: NullableStringFieldUpdateOperationsInput | string | null
    created_by_id?: StringFieldUpdateOperationsInput | string
    created_by_username?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    service_instructeur?: NullableStringFieldUpdateOperationsInput | string | null
    report_to_chip?: report_to_chipUpdateManyWithoutReportNestedInput
  }

  export type reportUncheckedUpdateWithoutReport_to_clauseInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    project_description?: NullableStringFieldUpdateOperationsInput | string | null
    redacted_by?: NullableStringFieldUpdateOperationsInput | string | null
    meet_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    applicant_name?: NullableStringFieldUpdateOperationsInput | string | null
    applicant_address?: NullableStringFieldUpdateOperationsInput | string | null
    project_cadastral_ref?: NullableStringFieldUpdateOperationsInput | string | null
    project_space_type?: NullableStringFieldUpdateOperationsInput | string | null
    decision?: NullableStringFieldUpdateOperationsInput | string | null
    precisions?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    further_information?: NullableStringFieldUpdateOperationsInput | string | null
    created_by_id?: StringFieldUpdateOperationsInput | string
    created_by_username?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    service_instructeur?: NullableStringFieldUpdateOperationsInput | string | null
    report_to_chip?: report_to_chipUncheckedUpdateManyWithoutReportNestedInput
  }

  export type udapsCreateWithoutUsersInput = {
    id: string
    department: string
    complete_coords?: string | null
    address?: string | null
    visible?: boolean | null
    name?: string | null
    zip_code?: number | null
    city?: string | null
    phone?: string | null
    email?: string | null
  }

  export type udapsUncheckedCreateWithoutUsersInput = {
    id: string
    department: string
    complete_coords?: string | null
    address?: string | null
    visible?: boolean | null
    name?: string | null
    zip_code?: number | null
    city?: string | null
    phone?: string | null
    email?: string | null
  }

  export type udapsCreateOrConnectWithoutUsersInput = {
    where: udapsWhereUniqueInput
    create: XOR<udapsCreateWithoutUsersInput, udapsUncheckedCreateWithoutUsersInput>
  }

  export type udapsUpsertWithoutUsersInput = {
    update: XOR<udapsUpdateWithoutUsersInput, udapsUncheckedUpdateWithoutUsersInput>
    create: XOR<udapsCreateWithoutUsersInput, udapsUncheckedCreateWithoutUsersInput>
  }

  export type udapsUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    complete_coords?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    visible?: NullableBoolFieldUpdateOperationsInput | boolean | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type udapsUncheckedUpdateWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    complete_coords?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    visible?: NullableBoolFieldUpdateOperationsInput | boolean | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    zip_code?: NullableIntFieldUpdateOperationsInput | number | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type usersCreateWithoutUdapsInput = {
    id: string
    email: string
    name: string
    temporaryLink?: string | null
    temporaryLinkExpiresAt?: string | null
    password: string
  }

  export type usersUncheckedCreateWithoutUdapsInput = {
    id: string
    email: string
    name: string
    temporaryLink?: string | null
    temporaryLinkExpiresAt?: string | null
    password: string
  }

  export type usersCreateOrConnectWithoutUdapsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutUdapsInput, usersUncheckedCreateWithoutUdapsInput>
  }

  export type usersCreateManyUdapsInputEnvelope = {
    data: Enumerable<usersCreateManyUdapsInput>
    skipDuplicates?: boolean
  }

  export type usersUpsertWithWhereUniqueWithoutUdapsInput = {
    where: usersWhereUniqueInput
    update: XOR<usersUpdateWithoutUdapsInput, usersUncheckedUpdateWithoutUdapsInput>
    create: XOR<usersCreateWithoutUdapsInput, usersUncheckedCreateWithoutUdapsInput>
  }

  export type usersUpdateWithWhereUniqueWithoutUdapsInput = {
    where: usersWhereUniqueInput
    data: XOR<usersUpdateWithoutUdapsInput, usersUncheckedUpdateWithoutUdapsInput>
  }

  export type usersUpdateManyWithWhereWithoutUdapsInput = {
    where: usersScalarWhereInput
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyWithoutUsersInput>
  }

  export type usersScalarWhereInput = {
    AND?: Enumerable<usersScalarWhereInput>
    OR?: Enumerable<usersScalarWhereInput>
    NOT?: Enumerable<usersScalarWhereInput>
    id?: StringFilter | string
    email?: StringFilter | string
    name?: StringFilter | string
    temporaryLink?: StringNullableFilter | string | null
    temporaryLinkExpiresAt?: StringNullableFilter | string | null
    password?: StringFilter | string
    udap_id?: StringNullableFilter | string | null
  }

  export type report_to_chipCreateManyChipInput = {
    id: string
    report_id: string
  }

  export type report_to_chipUpdateWithoutChipInput = {
    id?: StringFieldUpdateOperationsInput | string
    report?: reportUpdateOneRequiredWithoutReport_to_chipNestedInput
  }

  export type report_to_chipUncheckedUpdateWithoutChipInput = {
    id?: StringFieldUpdateOperationsInput | string
    report_id?: StringFieldUpdateOperationsInput | string
  }

  export type report_to_chipUncheckedUpdateManyWithoutReport_to_chipInput = {
    id?: StringFieldUpdateOperationsInput | string
    report_id?: StringFieldUpdateOperationsInput | string
  }

  export type report_to_clauseCreateManyClauseInput = {
    id: string
    report_id: string
  }

  export type report_to_clauseUpdateWithoutClauseInput = {
    id?: StringFieldUpdateOperationsInput | string
    report?: reportUpdateOneRequiredWithoutReport_to_clauseNestedInput
  }

  export type report_to_clauseUncheckedUpdateWithoutClauseInput = {
    id?: StringFieldUpdateOperationsInput | string
    report_id?: StringFieldUpdateOperationsInput | string
  }

  export type report_to_clauseUncheckedUpdateManyWithoutReport_to_clauseInput = {
    id?: StringFieldUpdateOperationsInput | string
    report_id?: StringFieldUpdateOperationsInput | string
  }

  export type report_to_chipCreateManyReportInput = {
    id: string
    chip_id: string
  }

  export type report_to_clauseCreateManyReportInput = {
    id: string
    clause_id: string
  }

  export type report_to_chipUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    chip?: chipUpdateOneRequiredWithoutReport_to_chipNestedInput
  }

  export type report_to_chipUncheckedUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    chip_id?: StringFieldUpdateOperationsInput | string
  }

  export type report_to_clauseUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    clause?: clauseUpdateOneRequiredWithoutReport_to_clauseNestedInput
  }

  export type report_to_clauseUncheckedUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    clause_id?: StringFieldUpdateOperationsInput | string
  }

  export type usersCreateManyUdapsInput = {
    id: string
    email: string
    name: string
    temporaryLink?: string | null
    temporaryLinkExpiresAt?: string | null
    password: string
  }

  export type usersUpdateWithoutUdapsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    temporaryLink?: NullableStringFieldUpdateOperationsInput | string | null
    temporaryLinkExpiresAt?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
  }

  export type usersUncheckedUpdateWithoutUdapsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    temporaryLink?: NullableStringFieldUpdateOperationsInput | string | null
    temporaryLinkExpiresAt?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
  }

  export type usersUncheckedUpdateManyWithoutUsersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    temporaryLink?: NullableStringFieldUpdateOperationsInput | string | null
    temporaryLinkExpiresAt?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}