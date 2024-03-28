
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model Clause
 * 
 */
export type Clause = {
  id: string
  label: string
  value: string
}

/**
 * Model Report
 * 
 */
export type Report = {
  id: string
  title: string
  authorId: string
  meetDate: Date
  meetLink: string
  applicantName: string
  applicantType: string
  projectStatus: string
  projectCadastralRef: string
  projectLandContact: string
  projectSpaceType: string
  projectNature: string
  projectDescription: string
  decision: string
  decisionComment: string
  contacts: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Model ReportToClause
 * 
 */
export type ReportToClause = {
  reportId: string
  clauseId: string
}

/**
 * Model User
 * 
 */
export type User = {
  id: string
  email: string
  name: string | null
  password: string
  createdAt: Date
  updatedAt: Date
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Clauses
 * const clauses = await prisma.clause.findMany()
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
    : false
      > {
    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Clauses
   * const clauses = await prisma.clause.findMany()
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
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

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
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

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
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

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
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>;

  $transaction<R>(fn: (prisma: Prisma.TransactionClient) => Promise<R>, options?: {maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel}): Promise<R>;

      /**
   * `prisma.clause`: Exposes CRUD operations for the **Clause** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clauses
    * const clauses = await prisma.clause.findMany()
    * ```
    */
  get clause(): Prisma.ClauseDelegate<GlobalReject>;

  /**
   * `prisma.report`: Exposes CRUD operations for the **Report** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reports
    * const reports = await prisma.report.findMany()
    * ```
    */
  get report(): Prisma.ReportDelegate<GlobalReject>;

  /**
   * `prisma.reportToClause`: Exposes CRUD operations for the **ReportToClause** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ReportToClauses
    * const reportToClauses = await prisma.reportToClause.findMany()
    * ```
    */
  get reportToClause(): Prisma.ReportToClauseDelegate<GlobalReject>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

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
   * Prisma Client JS version: 4.8.1
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
export type InputJsonValue = null | string | number | boolean | InputJsonObject | InputJsonArray

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

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

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

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    Clause: 'Clause',
    Report: 'Report',
    ReportToClause: 'ReportToClause',
    User: 'User'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

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

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
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
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ClauseCountOutputType
   */


  export type ClauseCountOutputType = {
    ReportToClause: number
  }

  export type ClauseCountOutputTypeSelect = {
    ReportToClause?: boolean
  }

  export type ClauseCountOutputTypeGetPayload<S extends boolean | null | undefined | ClauseCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? ClauseCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (ClauseCountOutputTypeArgs)
    ? ClauseCountOutputType 
    : S extends { select: any } & (ClauseCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof ClauseCountOutputType ? ClauseCountOutputType[P] : never
  } 
      : ClauseCountOutputType




  // Custom InputTypes

  /**
   * ClauseCountOutputType without action
   */
  export type ClauseCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ClauseCountOutputType
     * 
    **/
    select?: ClauseCountOutputTypeSelect | null
  }



  /**
   * Count Type ReportCountOutputType
   */


  export type ReportCountOutputType = {
    ReportToClause: number
  }

  export type ReportCountOutputTypeSelect = {
    ReportToClause?: boolean
  }

  export type ReportCountOutputTypeGetPayload<S extends boolean | null | undefined | ReportCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? ReportCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (ReportCountOutputTypeArgs)
    ? ReportCountOutputType 
    : S extends { select: any } & (ReportCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof ReportCountOutputType ? ReportCountOutputType[P] : never
  } 
      : ReportCountOutputType




  // Custom InputTypes

  /**
   * ReportCountOutputType without action
   */
  export type ReportCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the ReportCountOutputType
     * 
    **/
    select?: ReportCountOutputTypeSelect | null
  }



  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    Report: number
  }

  export type UserCountOutputTypeSelect = {
    Report?: boolean
  }

  export type UserCountOutputTypeGetPayload<S extends boolean | null | undefined | UserCountOutputTypeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? UserCountOutputType :
    S extends undefined ? never :
    S extends { include: any } & (UserCountOutputTypeArgs)
    ? UserCountOutputType 
    : S extends { select: any } & (UserCountOutputTypeArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof UserCountOutputType ? UserCountOutputType[P] : never
  } 
      : UserCountOutputType




  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     * 
    **/
    select?: UserCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model Clause
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

  export type ClauseAggregateArgs = {
    /**
     * Filter which Clause to aggregate.
     * 
    **/
    where?: ClauseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clauses to fetch.
     * 
    **/
    orderBy?: Enumerable<ClauseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ClauseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clauses from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clauses.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clauses
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




  export type ClauseGroupByArgs = {
    where?: ClauseWhereInput
    orderBy?: Enumerable<ClauseOrderByWithAggregationInput>
    by: Array<ClauseScalarFieldEnum>
    having?: ClauseScalarWhereWithAggregatesInput
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

  type GetClauseGroupByPayload<T extends ClauseGroupByArgs> = PrismaPromise<
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


  export type ClauseSelect = {
    id?: boolean
    label?: boolean
    value?: boolean
    ReportToClause?: boolean | Clause$ReportToClauseArgs
    _count?: boolean | ClauseCountOutputTypeArgs
  }


  export type ClauseInclude = {
    ReportToClause?: boolean | Clause$ReportToClauseArgs
    _count?: boolean | ClauseCountOutputTypeArgs
  } 

  export type ClauseGetPayload<S extends boolean | null | undefined | ClauseArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Clause :
    S extends undefined ? never :
    S extends { include: any } & (ClauseArgs | ClauseFindManyArgs)
    ? Clause  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'ReportToClause' ? Array < ReportToClauseGetPayload<S['include'][P]>>  :
        P extends '_count' ? ClauseCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (ClauseArgs | ClauseFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'ReportToClause' ? Array < ReportToClauseGetPayload<S['select'][P]>>  :
        P extends '_count' ? ClauseCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Clause ? Clause[P] : never
  } 
      : Clause


  type ClauseCountArgs = Merge<
    Omit<ClauseFindManyArgs, 'select' | 'include'> & {
      select?: ClauseCountAggregateInputType | true
    }
  >

  export interface ClauseDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Clause that matches the filter.
     * @param {ClauseFindUniqueArgs} args - Arguments to find a Clause
     * @example
     * // Get one Clause
     * const clause = await prisma.clause.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ClauseFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ClauseFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Clause'> extends True ? Prisma__ClauseClient<ClauseGetPayload<T>> : Prisma__ClauseClient<ClauseGetPayload<T> | null, null>

    /**
     * Find one Clause that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ClauseFindUniqueOrThrowArgs} args - Arguments to find a Clause
     * @example
     * // Get one Clause
     * const clause = await prisma.clause.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ClauseFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ClauseFindUniqueOrThrowArgs>
    ): Prisma__ClauseClient<ClauseGetPayload<T>>

    /**
     * Find the first Clause that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClauseFindFirstArgs} args - Arguments to find a Clause
     * @example
     * // Get one Clause
     * const clause = await prisma.clause.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ClauseFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ClauseFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Clause'> extends True ? Prisma__ClauseClient<ClauseGetPayload<T>> : Prisma__ClauseClient<ClauseGetPayload<T> | null, null>

    /**
     * Find the first Clause that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClauseFindFirstOrThrowArgs} args - Arguments to find a Clause
     * @example
     * // Get one Clause
     * const clause = await prisma.clause.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ClauseFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ClauseFindFirstOrThrowArgs>
    ): Prisma__ClauseClient<ClauseGetPayload<T>>

    /**
     * Find zero or more Clauses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClauseFindManyArgs=} args - Arguments to filter and select certain fields only.
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
    findMany<T extends ClauseFindManyArgs>(
      args?: SelectSubset<T, ClauseFindManyArgs>
    ): PrismaPromise<Array<ClauseGetPayload<T>>>

    /**
     * Create a Clause.
     * @param {ClauseCreateArgs} args - Arguments to create a Clause.
     * @example
     * // Create one Clause
     * const Clause = await prisma.clause.create({
     *   data: {
     *     // ... data to create a Clause
     *   }
     * })
     * 
    **/
    create<T extends ClauseCreateArgs>(
      args: SelectSubset<T, ClauseCreateArgs>
    ): Prisma__ClauseClient<ClauseGetPayload<T>>

    /**
     * Create many Clauses.
     *     @param {ClauseCreateManyArgs} args - Arguments to create many Clauses.
     *     @example
     *     // Create many Clauses
     *     const clause = await prisma.clause.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ClauseCreateManyArgs>(
      args?: SelectSubset<T, ClauseCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Clause.
     * @param {ClauseDeleteArgs} args - Arguments to delete one Clause.
     * @example
     * // Delete one Clause
     * const Clause = await prisma.clause.delete({
     *   where: {
     *     // ... filter to delete one Clause
     *   }
     * })
     * 
    **/
    delete<T extends ClauseDeleteArgs>(
      args: SelectSubset<T, ClauseDeleteArgs>
    ): Prisma__ClauseClient<ClauseGetPayload<T>>

    /**
     * Update one Clause.
     * @param {ClauseUpdateArgs} args - Arguments to update one Clause.
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
    update<T extends ClauseUpdateArgs>(
      args: SelectSubset<T, ClauseUpdateArgs>
    ): Prisma__ClauseClient<ClauseGetPayload<T>>

    /**
     * Delete zero or more Clauses.
     * @param {ClauseDeleteManyArgs} args - Arguments to filter Clauses to delete.
     * @example
     * // Delete a few Clauses
     * const { count } = await prisma.clause.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ClauseDeleteManyArgs>(
      args?: SelectSubset<T, ClauseDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clauses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClauseUpdateManyArgs} args - Arguments to update one or more rows.
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
    updateMany<T extends ClauseUpdateManyArgs>(
      args: SelectSubset<T, ClauseUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Clause.
     * @param {ClauseUpsertArgs} args - Arguments to update or create a Clause.
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
    upsert<T extends ClauseUpsertArgs>(
      args: SelectSubset<T, ClauseUpsertArgs>
    ): Prisma__ClauseClient<ClauseGetPayload<T>>

    /**
     * Count the number of Clauses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClauseCountArgs} args - Arguments to filter Clauses to count.
     * @example
     * // Count the number of Clauses
     * const count = await prisma.clause.count({
     *   where: {
     *     // ... the filter for the Clauses we want to count
     *   }
     * })
    **/
    count<T extends ClauseCountArgs>(
      args?: Subset<T, ClauseCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
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
    aggregate<T extends ClauseAggregateArgs>(args: Subset<T, ClauseAggregateArgs>): PrismaPromise<GetClauseAggregateType<T>>

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
    >(args: SubsetIntersection<T, ClauseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClauseGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Clause.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ClauseClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
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
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    ReportToClause<T extends Clause$ReportToClauseArgs= {}>(args?: Subset<T, Clause$ReportToClauseArgs>): PrismaPromise<Array<ReportToClauseGetPayload<T>>| Null>;

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
   * Clause base type for findUnique actions
   */
  export type ClauseFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Clause
     * 
    **/
    select?: ClauseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ClauseInclude | null
    /**
     * Filter, which Clause to fetch.
     * 
    **/
    where: ClauseWhereUniqueInput
  }

  /**
   * Clause findUnique
   */
  export interface ClauseFindUniqueArgs extends ClauseFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Clause findUniqueOrThrow
   */
  export type ClauseFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Clause
     * 
    **/
    select?: ClauseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ClauseInclude | null
    /**
     * Filter, which Clause to fetch.
     * 
    **/
    where: ClauseWhereUniqueInput
  }


  /**
   * Clause base type for findFirst actions
   */
  export type ClauseFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Clause
     * 
    **/
    select?: ClauseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ClauseInclude | null
    /**
     * Filter, which Clause to fetch.
     * 
    **/
    where?: ClauseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clauses to fetch.
     * 
    **/
    orderBy?: Enumerable<ClauseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clauses.
     * 
    **/
    cursor?: ClauseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clauses from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clauses.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clauses.
     * 
    **/
    distinct?: Enumerable<ClauseScalarFieldEnum>
  }

  /**
   * Clause findFirst
   */
  export interface ClauseFindFirstArgs extends ClauseFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Clause findFirstOrThrow
   */
  export type ClauseFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Clause
     * 
    **/
    select?: ClauseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ClauseInclude | null
    /**
     * Filter, which Clause to fetch.
     * 
    **/
    where?: ClauseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clauses to fetch.
     * 
    **/
    orderBy?: Enumerable<ClauseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clauses.
     * 
    **/
    cursor?: ClauseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clauses from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clauses.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clauses.
     * 
    **/
    distinct?: Enumerable<ClauseScalarFieldEnum>
  }


  /**
   * Clause findMany
   */
  export type ClauseFindManyArgs = {
    /**
     * Select specific fields to fetch from the Clause
     * 
    **/
    select?: ClauseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ClauseInclude | null
    /**
     * Filter, which Clauses to fetch.
     * 
    **/
    where?: ClauseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clauses to fetch.
     * 
    **/
    orderBy?: Enumerable<ClauseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clauses.
     * 
    **/
    cursor?: ClauseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clauses from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clauses.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ClauseScalarFieldEnum>
  }


  /**
   * Clause create
   */
  export type ClauseCreateArgs = {
    /**
     * Select specific fields to fetch from the Clause
     * 
    **/
    select?: ClauseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ClauseInclude | null
    /**
     * The data needed to create a Clause.
     * 
    **/
    data: XOR<ClauseCreateInput, ClauseUncheckedCreateInput>
  }


  /**
   * Clause createMany
   */
  export type ClauseCreateManyArgs = {
    /**
     * The data used to create many Clauses.
     * 
    **/
    data: Enumerable<ClauseCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Clause update
   */
  export type ClauseUpdateArgs = {
    /**
     * Select specific fields to fetch from the Clause
     * 
    **/
    select?: ClauseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ClauseInclude | null
    /**
     * The data needed to update a Clause.
     * 
    **/
    data: XOR<ClauseUpdateInput, ClauseUncheckedUpdateInput>
    /**
     * Choose, which Clause to update.
     * 
    **/
    where: ClauseWhereUniqueInput
  }


  /**
   * Clause updateMany
   */
  export type ClauseUpdateManyArgs = {
    /**
     * The data used to update Clauses.
     * 
    **/
    data: XOR<ClauseUpdateManyMutationInput, ClauseUncheckedUpdateManyInput>
    /**
     * Filter which Clauses to update
     * 
    **/
    where?: ClauseWhereInput
  }


  /**
   * Clause upsert
   */
  export type ClauseUpsertArgs = {
    /**
     * Select specific fields to fetch from the Clause
     * 
    **/
    select?: ClauseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ClauseInclude | null
    /**
     * The filter to search for the Clause to update in case it exists.
     * 
    **/
    where: ClauseWhereUniqueInput
    /**
     * In case the Clause found by the `where` argument doesn't exist, create a new Clause with this data.
     * 
    **/
    create: XOR<ClauseCreateInput, ClauseUncheckedCreateInput>
    /**
     * In case the Clause was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ClauseUpdateInput, ClauseUncheckedUpdateInput>
  }


  /**
   * Clause delete
   */
  export type ClauseDeleteArgs = {
    /**
     * Select specific fields to fetch from the Clause
     * 
    **/
    select?: ClauseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ClauseInclude | null
    /**
     * Filter which Clause to delete.
     * 
    **/
    where: ClauseWhereUniqueInput
  }


  /**
   * Clause deleteMany
   */
  export type ClauseDeleteManyArgs = {
    /**
     * Filter which Clauses to delete
     * 
    **/
    where?: ClauseWhereInput
  }


  /**
   * Clause.ReportToClause
   */
  export type Clause$ReportToClauseArgs = {
    /**
     * Select specific fields to fetch from the ReportToClause
     * 
    **/
    select?: ReportToClauseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReportToClauseInclude | null
    where?: ReportToClauseWhereInput
    orderBy?: Enumerable<ReportToClauseOrderByWithRelationInput>
    cursor?: ReportToClauseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<ReportToClauseScalarFieldEnum>
  }


  /**
   * Clause without action
   */
  export type ClauseArgs = {
    /**
     * Select specific fields to fetch from the Clause
     * 
    **/
    select?: ClauseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ClauseInclude | null
  }



  /**
   * Model Report
   */


  export type AggregateReport = {
    _count: ReportCountAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  export type ReportMinAggregateOutputType = {
    id: string | null
    title: string | null
    authorId: string | null
    meetDate: Date | null
    meetLink: string | null
    applicantName: string | null
    applicantType: string | null
    projectStatus: string | null
    projectCadastralRef: string | null
    projectLandContact: string | null
    projectSpaceType: string | null
    projectNature: string | null
    projectDescription: string | null
    decision: string | null
    decisionComment: string | null
    contacts: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReportMaxAggregateOutputType = {
    id: string | null
    title: string | null
    authorId: string | null
    meetDate: Date | null
    meetLink: string | null
    applicantName: string | null
    applicantType: string | null
    projectStatus: string | null
    projectCadastralRef: string | null
    projectLandContact: string | null
    projectSpaceType: string | null
    projectNature: string | null
    projectDescription: string | null
    decision: string | null
    decisionComment: string | null
    contacts: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ReportCountAggregateOutputType = {
    id: number
    title: number
    authorId: number
    meetDate: number
    meetLink: number
    applicantName: number
    applicantType: number
    projectStatus: number
    projectCadastralRef: number
    projectLandContact: number
    projectSpaceType: number
    projectNature: number
    projectDescription: number
    decision: number
    decisionComment: number
    contacts: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ReportMinAggregateInputType = {
    id?: true
    title?: true
    authorId?: true
    meetDate?: true
    meetLink?: true
    applicantName?: true
    applicantType?: true
    projectStatus?: true
    projectCadastralRef?: true
    projectLandContact?: true
    projectSpaceType?: true
    projectNature?: true
    projectDescription?: true
    decision?: true
    decisionComment?: true
    contacts?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReportMaxAggregateInputType = {
    id?: true
    title?: true
    authorId?: true
    meetDate?: true
    meetLink?: true
    applicantName?: true
    applicantType?: true
    projectStatus?: true
    projectCadastralRef?: true
    projectLandContact?: true
    projectSpaceType?: true
    projectNature?: true
    projectDescription?: true
    decision?: true
    decisionComment?: true
    contacts?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ReportCountAggregateInputType = {
    id?: true
    title?: true
    authorId?: true
    meetDate?: true
    meetLink?: true
    applicantName?: true
    applicantType?: true
    projectStatus?: true
    projectCadastralRef?: true
    projectLandContact?: true
    projectSpaceType?: true
    projectNature?: true
    projectDescription?: true
    decision?: true
    decisionComment?: true
    contacts?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ReportAggregateArgs = {
    /**
     * Filter which Report to aggregate.
     * 
    **/
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     * 
    **/
    orderBy?: Enumerable<ReportOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reports
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




  export type ReportGroupByArgs = {
    where?: ReportWhereInput
    orderBy?: Enumerable<ReportOrderByWithAggregationInput>
    by: Array<ReportScalarFieldEnum>
    having?: ReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReportCountAggregateInputType | true
    _min?: ReportMinAggregateInputType
    _max?: ReportMaxAggregateInputType
  }


  export type ReportGroupByOutputType = {
    id: string
    title: string
    authorId: string
    meetDate: Date
    meetLink: string
    applicantName: string
    applicantType: string
    projectStatus: string
    projectCadastralRef: string
    projectLandContact: string
    projectSpaceType: string
    projectNature: string
    projectDescription: string
    decision: string
    decisionComment: string
    contacts: string
    createdAt: Date
    updatedAt: Date
    _count: ReportCountAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  type GetReportGroupByPayload<T extends ReportGroupByArgs> = PrismaPromise<
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


  export type ReportSelect = {
    id?: boolean
    title?: boolean
    authorId?: boolean
    meetDate?: boolean
    meetLink?: boolean
    applicantName?: boolean
    applicantType?: boolean
    projectStatus?: boolean
    projectCadastralRef?: boolean
    projectLandContact?: boolean
    projectSpaceType?: boolean
    projectNature?: boolean
    projectDescription?: boolean
    decision?: boolean
    decisionComment?: boolean
    contacts?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    User?: boolean | UserArgs
    ReportToClause?: boolean | Report$ReportToClauseArgs
    _count?: boolean | ReportCountOutputTypeArgs
  }


  export type ReportInclude = {
    User?: boolean | UserArgs
    ReportToClause?: boolean | Report$ReportToClauseArgs
    _count?: boolean | ReportCountOutputTypeArgs
  } 

  export type ReportGetPayload<S extends boolean | null | undefined | ReportArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? Report :
    S extends undefined ? never :
    S extends { include: any } & (ReportArgs | ReportFindManyArgs)
    ? Report  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'User' ? UserGetPayload<S['include'][P]> :
        P extends 'ReportToClause' ? Array < ReportToClauseGetPayload<S['include'][P]>>  :
        P extends '_count' ? ReportCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (ReportArgs | ReportFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'User' ? UserGetPayload<S['select'][P]> :
        P extends 'ReportToClause' ? Array < ReportToClauseGetPayload<S['select'][P]>>  :
        P extends '_count' ? ReportCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof Report ? Report[P] : never
  } 
      : Report


  type ReportCountArgs = Merge<
    Omit<ReportFindManyArgs, 'select' | 'include'> & {
      select?: ReportCountAggregateInputType | true
    }
  >

  export interface ReportDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one Report that matches the filter.
     * @param {ReportFindUniqueArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ReportFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ReportFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Report'> extends True ? Prisma__ReportClient<ReportGetPayload<T>> : Prisma__ReportClient<ReportGetPayload<T> | null, null>

    /**
     * Find one Report that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ReportFindUniqueOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ReportFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ReportFindUniqueOrThrowArgs>
    ): Prisma__ReportClient<ReportGetPayload<T>>

    /**
     * Find the first Report that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ReportFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ReportFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Report'> extends True ? Prisma__ReportClient<ReportGetPayload<T>> : Prisma__ReportClient<ReportGetPayload<T> | null, null>

    /**
     * Find the first Report that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindFirstOrThrowArgs} args - Arguments to find a Report
     * @example
     * // Get one Report
     * const report = await prisma.report.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ReportFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ReportFindFirstOrThrowArgs>
    ): Prisma__ReportClient<ReportGetPayload<T>>

    /**
     * Find zero or more Reports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportFindManyArgs=} args - Arguments to filter and select certain fields only.
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
    findMany<T extends ReportFindManyArgs>(
      args?: SelectSubset<T, ReportFindManyArgs>
    ): PrismaPromise<Array<ReportGetPayload<T>>>

    /**
     * Create a Report.
     * @param {ReportCreateArgs} args - Arguments to create a Report.
     * @example
     * // Create one Report
     * const Report = await prisma.report.create({
     *   data: {
     *     // ... data to create a Report
     *   }
     * })
     * 
    **/
    create<T extends ReportCreateArgs>(
      args: SelectSubset<T, ReportCreateArgs>
    ): Prisma__ReportClient<ReportGetPayload<T>>

    /**
     * Create many Reports.
     *     @param {ReportCreateManyArgs} args - Arguments to create many Reports.
     *     @example
     *     // Create many Reports
     *     const report = await prisma.report.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ReportCreateManyArgs>(
      args?: SelectSubset<T, ReportCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Report.
     * @param {ReportDeleteArgs} args - Arguments to delete one Report.
     * @example
     * // Delete one Report
     * const Report = await prisma.report.delete({
     *   where: {
     *     // ... filter to delete one Report
     *   }
     * })
     * 
    **/
    delete<T extends ReportDeleteArgs>(
      args: SelectSubset<T, ReportDeleteArgs>
    ): Prisma__ReportClient<ReportGetPayload<T>>

    /**
     * Update one Report.
     * @param {ReportUpdateArgs} args - Arguments to update one Report.
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
    update<T extends ReportUpdateArgs>(
      args: SelectSubset<T, ReportUpdateArgs>
    ): Prisma__ReportClient<ReportGetPayload<T>>

    /**
     * Delete zero or more Reports.
     * @param {ReportDeleteManyArgs} args - Arguments to filter Reports to delete.
     * @example
     * // Delete a few Reports
     * const { count } = await prisma.report.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ReportDeleteManyArgs>(
      args?: SelectSubset<T, ReportDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportUpdateManyArgs} args - Arguments to update one or more rows.
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
    updateMany<T extends ReportUpdateManyArgs>(
      args: SelectSubset<T, ReportUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Report.
     * @param {ReportUpsertArgs} args - Arguments to update or create a Report.
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
    upsert<T extends ReportUpsertArgs>(
      args: SelectSubset<T, ReportUpsertArgs>
    ): Prisma__ReportClient<ReportGetPayload<T>>

    /**
     * Count the number of Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportCountArgs} args - Arguments to filter Reports to count.
     * @example
     * // Count the number of Reports
     * const count = await prisma.report.count({
     *   where: {
     *     // ... the filter for the Reports we want to count
     *   }
     * })
    **/
    count<T extends ReportCountArgs>(
      args?: Subset<T, ReportCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
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
    aggregate<T extends ReportAggregateArgs>(args: Subset<T, ReportAggregateArgs>): PrismaPromise<GetReportAggregateType<T>>

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
    >(args: SubsetIntersection<T, ReportGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Report.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ReportClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
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
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    User<T extends UserArgs= {}>(args?: Subset<T, UserArgs>): Prisma__UserClient<UserGetPayload<T> | Null>;

    ReportToClause<T extends Report$ReportToClauseArgs= {}>(args?: Subset<T, Report$ReportToClauseArgs>): PrismaPromise<Array<ReportToClauseGetPayload<T>>| Null>;

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
   * Report base type for findUnique actions
   */
  export type ReportFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the Report
     * 
    **/
    select?: ReportSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReportInclude | null
    /**
     * Filter, which Report to fetch.
     * 
    **/
    where: ReportWhereUniqueInput
  }

  /**
   * Report findUnique
   */
  export interface ReportFindUniqueArgs extends ReportFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Report findUniqueOrThrow
   */
  export type ReportFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Report
     * 
    **/
    select?: ReportSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReportInclude | null
    /**
     * Filter, which Report to fetch.
     * 
    **/
    where: ReportWhereUniqueInput
  }


  /**
   * Report base type for findFirst actions
   */
  export type ReportFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the Report
     * 
    **/
    select?: ReportSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReportInclude | null
    /**
     * Filter, which Report to fetch.
     * 
    **/
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     * 
    **/
    orderBy?: Enumerable<ReportOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     * 
    **/
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     * 
    **/
    distinct?: Enumerable<ReportScalarFieldEnum>
  }

  /**
   * Report findFirst
   */
  export interface ReportFindFirstArgs extends ReportFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Report findFirstOrThrow
   */
  export type ReportFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the Report
     * 
    **/
    select?: ReportSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReportInclude | null
    /**
     * Filter, which Report to fetch.
     * 
    **/
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     * 
    **/
    orderBy?: Enumerable<ReportOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     * 
    **/
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     * 
    **/
    distinct?: Enumerable<ReportScalarFieldEnum>
  }


  /**
   * Report findMany
   */
  export type ReportFindManyArgs = {
    /**
     * Select specific fields to fetch from the Report
     * 
    **/
    select?: ReportSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReportInclude | null
    /**
     * Filter, which Reports to fetch.
     * 
    **/
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     * 
    **/
    orderBy?: Enumerable<ReportOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reports.
     * 
    **/
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ReportScalarFieldEnum>
  }


  /**
   * Report create
   */
  export type ReportCreateArgs = {
    /**
     * Select specific fields to fetch from the Report
     * 
    **/
    select?: ReportSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReportInclude | null
    /**
     * The data needed to create a Report.
     * 
    **/
    data: XOR<ReportCreateInput, ReportUncheckedCreateInput>
  }


  /**
   * Report createMany
   */
  export type ReportCreateManyArgs = {
    /**
     * The data used to create many Reports.
     * 
    **/
    data: Enumerable<ReportCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Report update
   */
  export type ReportUpdateArgs = {
    /**
     * Select specific fields to fetch from the Report
     * 
    **/
    select?: ReportSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReportInclude | null
    /**
     * The data needed to update a Report.
     * 
    **/
    data: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
    /**
     * Choose, which Report to update.
     * 
    **/
    where: ReportWhereUniqueInput
  }


  /**
   * Report updateMany
   */
  export type ReportUpdateManyArgs = {
    /**
     * The data used to update Reports.
     * 
    **/
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     * 
    **/
    where?: ReportWhereInput
  }


  /**
   * Report upsert
   */
  export type ReportUpsertArgs = {
    /**
     * Select specific fields to fetch from the Report
     * 
    **/
    select?: ReportSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReportInclude | null
    /**
     * The filter to search for the Report to update in case it exists.
     * 
    **/
    where: ReportWhereUniqueInput
    /**
     * In case the Report found by the `where` argument doesn't exist, create a new Report with this data.
     * 
    **/
    create: XOR<ReportCreateInput, ReportUncheckedCreateInput>
    /**
     * In case the Report was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
  }


  /**
   * Report delete
   */
  export type ReportDeleteArgs = {
    /**
     * Select specific fields to fetch from the Report
     * 
    **/
    select?: ReportSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReportInclude | null
    /**
     * Filter which Report to delete.
     * 
    **/
    where: ReportWhereUniqueInput
  }


  /**
   * Report deleteMany
   */
  export type ReportDeleteManyArgs = {
    /**
     * Filter which Reports to delete
     * 
    **/
    where?: ReportWhereInput
  }


  /**
   * Report.ReportToClause
   */
  export type Report$ReportToClauseArgs = {
    /**
     * Select specific fields to fetch from the ReportToClause
     * 
    **/
    select?: ReportToClauseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReportToClauseInclude | null
    where?: ReportToClauseWhereInput
    orderBy?: Enumerable<ReportToClauseOrderByWithRelationInput>
    cursor?: ReportToClauseWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<ReportToClauseScalarFieldEnum>
  }


  /**
   * Report without action
   */
  export type ReportArgs = {
    /**
     * Select specific fields to fetch from the Report
     * 
    **/
    select?: ReportSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReportInclude | null
  }



  /**
   * Model ReportToClause
   */


  export type AggregateReportToClause = {
    _count: ReportToClauseCountAggregateOutputType | null
    _min: ReportToClauseMinAggregateOutputType | null
    _max: ReportToClauseMaxAggregateOutputType | null
  }

  export type ReportToClauseMinAggregateOutputType = {
    reportId: string | null
    clauseId: string | null
  }

  export type ReportToClauseMaxAggregateOutputType = {
    reportId: string | null
    clauseId: string | null
  }

  export type ReportToClauseCountAggregateOutputType = {
    reportId: number
    clauseId: number
    _all: number
  }


  export type ReportToClauseMinAggregateInputType = {
    reportId?: true
    clauseId?: true
  }

  export type ReportToClauseMaxAggregateInputType = {
    reportId?: true
    clauseId?: true
  }

  export type ReportToClauseCountAggregateInputType = {
    reportId?: true
    clauseId?: true
    _all?: true
  }

  export type ReportToClauseAggregateArgs = {
    /**
     * Filter which ReportToClause to aggregate.
     * 
    **/
    where?: ReportToClauseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReportToClauses to fetch.
     * 
    **/
    orderBy?: Enumerable<ReportToClauseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ReportToClauseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReportToClauses from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReportToClauses.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ReportToClauses
    **/
    _count?: true | ReportToClauseCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReportToClauseMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReportToClauseMaxAggregateInputType
  }

  export type GetReportToClauseAggregateType<T extends ReportToClauseAggregateArgs> = {
        [P in keyof T & keyof AggregateReportToClause]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReportToClause[P]>
      : GetScalarType<T[P], AggregateReportToClause[P]>
  }




  export type ReportToClauseGroupByArgs = {
    where?: ReportToClauseWhereInput
    orderBy?: Enumerable<ReportToClauseOrderByWithAggregationInput>
    by: Array<ReportToClauseScalarFieldEnum>
    having?: ReportToClauseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReportToClauseCountAggregateInputType | true
    _min?: ReportToClauseMinAggregateInputType
    _max?: ReportToClauseMaxAggregateInputType
  }


  export type ReportToClauseGroupByOutputType = {
    reportId: string
    clauseId: string
    _count: ReportToClauseCountAggregateOutputType | null
    _min: ReportToClauseMinAggregateOutputType | null
    _max: ReportToClauseMaxAggregateOutputType | null
  }

  type GetReportToClauseGroupByPayload<T extends ReportToClauseGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ReportToClauseGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReportToClauseGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReportToClauseGroupByOutputType[P]>
            : GetScalarType<T[P], ReportToClauseGroupByOutputType[P]>
        }
      >
    >


  export type ReportToClauseSelect = {
    reportId?: boolean
    clauseId?: boolean
    Clause?: boolean | ClauseArgs
    Report?: boolean | ReportArgs
  }


  export type ReportToClauseInclude = {
    Clause?: boolean | ClauseArgs
    Report?: boolean | ReportArgs
  } 

  export type ReportToClauseGetPayload<S extends boolean | null | undefined | ReportToClauseArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? ReportToClause :
    S extends undefined ? never :
    S extends { include: any } & (ReportToClauseArgs | ReportToClauseFindManyArgs)
    ? ReportToClause  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'Clause' ? ClauseGetPayload<S['include'][P]> :
        P extends 'Report' ? ReportGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (ReportToClauseArgs | ReportToClauseFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'Clause' ? ClauseGetPayload<S['select'][P]> :
        P extends 'Report' ? ReportGetPayload<S['select'][P]> :  P extends keyof ReportToClause ? ReportToClause[P] : never
  } 
      : ReportToClause


  type ReportToClauseCountArgs = Merge<
    Omit<ReportToClauseFindManyArgs, 'select' | 'include'> & {
      select?: ReportToClauseCountAggregateInputType | true
    }
  >

  export interface ReportToClauseDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one ReportToClause that matches the filter.
     * @param {ReportToClauseFindUniqueArgs} args - Arguments to find a ReportToClause
     * @example
     * // Get one ReportToClause
     * const reportToClause = await prisma.reportToClause.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ReportToClauseFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ReportToClauseFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ReportToClause'> extends True ? Prisma__ReportToClauseClient<ReportToClauseGetPayload<T>> : Prisma__ReportToClauseClient<ReportToClauseGetPayload<T> | null, null>

    /**
     * Find one ReportToClause that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ReportToClauseFindUniqueOrThrowArgs} args - Arguments to find a ReportToClause
     * @example
     * // Get one ReportToClause
     * const reportToClause = await prisma.reportToClause.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ReportToClauseFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, ReportToClauseFindUniqueOrThrowArgs>
    ): Prisma__ReportToClauseClient<ReportToClauseGetPayload<T>>

    /**
     * Find the first ReportToClause that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportToClauseFindFirstArgs} args - Arguments to find a ReportToClause
     * @example
     * // Get one ReportToClause
     * const reportToClause = await prisma.reportToClause.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ReportToClauseFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ReportToClauseFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ReportToClause'> extends True ? Prisma__ReportToClauseClient<ReportToClauseGetPayload<T>> : Prisma__ReportToClauseClient<ReportToClauseGetPayload<T> | null, null>

    /**
     * Find the first ReportToClause that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportToClauseFindFirstOrThrowArgs} args - Arguments to find a ReportToClause
     * @example
     * // Get one ReportToClause
     * const reportToClause = await prisma.reportToClause.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ReportToClauseFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ReportToClauseFindFirstOrThrowArgs>
    ): Prisma__ReportToClauseClient<ReportToClauseGetPayload<T>>

    /**
     * Find zero or more ReportToClauses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportToClauseFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ReportToClauses
     * const reportToClauses = await prisma.reportToClause.findMany()
     * 
     * // Get first 10 ReportToClauses
     * const reportToClauses = await prisma.reportToClause.findMany({ take: 10 })
     * 
     * // Only select the `reportId`
     * const reportToClauseWithReportIdOnly = await prisma.reportToClause.findMany({ select: { reportId: true } })
     * 
    **/
    findMany<T extends ReportToClauseFindManyArgs>(
      args?: SelectSubset<T, ReportToClauseFindManyArgs>
    ): PrismaPromise<Array<ReportToClauseGetPayload<T>>>

    /**
     * Create a ReportToClause.
     * @param {ReportToClauseCreateArgs} args - Arguments to create a ReportToClause.
     * @example
     * // Create one ReportToClause
     * const ReportToClause = await prisma.reportToClause.create({
     *   data: {
     *     // ... data to create a ReportToClause
     *   }
     * })
     * 
    **/
    create<T extends ReportToClauseCreateArgs>(
      args: SelectSubset<T, ReportToClauseCreateArgs>
    ): Prisma__ReportToClauseClient<ReportToClauseGetPayload<T>>

    /**
     * Create many ReportToClauses.
     *     @param {ReportToClauseCreateManyArgs} args - Arguments to create many ReportToClauses.
     *     @example
     *     // Create many ReportToClauses
     *     const reportToClause = await prisma.reportToClause.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ReportToClauseCreateManyArgs>(
      args?: SelectSubset<T, ReportToClauseCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a ReportToClause.
     * @param {ReportToClauseDeleteArgs} args - Arguments to delete one ReportToClause.
     * @example
     * // Delete one ReportToClause
     * const ReportToClause = await prisma.reportToClause.delete({
     *   where: {
     *     // ... filter to delete one ReportToClause
     *   }
     * })
     * 
    **/
    delete<T extends ReportToClauseDeleteArgs>(
      args: SelectSubset<T, ReportToClauseDeleteArgs>
    ): Prisma__ReportToClauseClient<ReportToClauseGetPayload<T>>

    /**
     * Update one ReportToClause.
     * @param {ReportToClauseUpdateArgs} args - Arguments to update one ReportToClause.
     * @example
     * // Update one ReportToClause
     * const reportToClause = await prisma.reportToClause.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ReportToClauseUpdateArgs>(
      args: SelectSubset<T, ReportToClauseUpdateArgs>
    ): Prisma__ReportToClauseClient<ReportToClauseGetPayload<T>>

    /**
     * Delete zero or more ReportToClauses.
     * @param {ReportToClauseDeleteManyArgs} args - Arguments to filter ReportToClauses to delete.
     * @example
     * // Delete a few ReportToClauses
     * const { count } = await prisma.reportToClause.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ReportToClauseDeleteManyArgs>(
      args?: SelectSubset<T, ReportToClauseDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more ReportToClauses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportToClauseUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ReportToClauses
     * const reportToClause = await prisma.reportToClause.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ReportToClauseUpdateManyArgs>(
      args: SelectSubset<T, ReportToClauseUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one ReportToClause.
     * @param {ReportToClauseUpsertArgs} args - Arguments to update or create a ReportToClause.
     * @example
     * // Update or create a ReportToClause
     * const reportToClause = await prisma.reportToClause.upsert({
     *   create: {
     *     // ... data to create a ReportToClause
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ReportToClause we want to update
     *   }
     * })
    **/
    upsert<T extends ReportToClauseUpsertArgs>(
      args: SelectSubset<T, ReportToClauseUpsertArgs>
    ): Prisma__ReportToClauseClient<ReportToClauseGetPayload<T>>

    /**
     * Count the number of ReportToClauses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportToClauseCountArgs} args - Arguments to filter ReportToClauses to count.
     * @example
     * // Count the number of ReportToClauses
     * const count = await prisma.reportToClause.count({
     *   where: {
     *     // ... the filter for the ReportToClauses we want to count
     *   }
     * })
    **/
    count<T extends ReportToClauseCountArgs>(
      args?: Subset<T, ReportToClauseCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReportToClauseCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ReportToClause.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportToClauseAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ReportToClauseAggregateArgs>(args: Subset<T, ReportToClauseAggregateArgs>): PrismaPromise<GetReportToClauseAggregateType<T>>

    /**
     * Group by ReportToClause.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportToClauseGroupByArgs} args - Group by arguments.
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
      T extends ReportToClauseGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReportToClauseGroupByArgs['orderBy'] }
        : { orderBy?: ReportToClauseGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ReportToClauseGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportToClauseGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for ReportToClause.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ReportToClauseClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
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
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    Clause<T extends ClauseArgs= {}>(args?: Subset<T, ClauseArgs>): Prisma__ClauseClient<ClauseGetPayload<T> | Null>;

    Report<T extends ReportArgs= {}>(args?: Subset<T, ReportArgs>): Prisma__ReportClient<ReportGetPayload<T> | Null>;

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
   * ReportToClause base type for findUnique actions
   */
  export type ReportToClauseFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the ReportToClause
     * 
    **/
    select?: ReportToClauseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReportToClauseInclude | null
    /**
     * Filter, which ReportToClause to fetch.
     * 
    **/
    where: ReportToClauseWhereUniqueInput
  }

  /**
   * ReportToClause findUnique
   */
  export interface ReportToClauseFindUniqueArgs extends ReportToClauseFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ReportToClause findUniqueOrThrow
   */
  export type ReportToClauseFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the ReportToClause
     * 
    **/
    select?: ReportToClauseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReportToClauseInclude | null
    /**
     * Filter, which ReportToClause to fetch.
     * 
    **/
    where: ReportToClauseWhereUniqueInput
  }


  /**
   * ReportToClause base type for findFirst actions
   */
  export type ReportToClauseFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the ReportToClause
     * 
    **/
    select?: ReportToClauseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReportToClauseInclude | null
    /**
     * Filter, which ReportToClause to fetch.
     * 
    **/
    where?: ReportToClauseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReportToClauses to fetch.
     * 
    **/
    orderBy?: Enumerable<ReportToClauseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReportToClauses.
     * 
    **/
    cursor?: ReportToClauseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReportToClauses from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReportToClauses.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReportToClauses.
     * 
    **/
    distinct?: Enumerable<ReportToClauseScalarFieldEnum>
  }

  /**
   * ReportToClause findFirst
   */
  export interface ReportToClauseFindFirstArgs extends ReportToClauseFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * ReportToClause findFirstOrThrow
   */
  export type ReportToClauseFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the ReportToClause
     * 
    **/
    select?: ReportToClauseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReportToClauseInclude | null
    /**
     * Filter, which ReportToClause to fetch.
     * 
    **/
    where?: ReportToClauseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReportToClauses to fetch.
     * 
    **/
    orderBy?: Enumerable<ReportToClauseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ReportToClauses.
     * 
    **/
    cursor?: ReportToClauseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReportToClauses from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReportToClauses.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ReportToClauses.
     * 
    **/
    distinct?: Enumerable<ReportToClauseScalarFieldEnum>
  }


  /**
   * ReportToClause findMany
   */
  export type ReportToClauseFindManyArgs = {
    /**
     * Select specific fields to fetch from the ReportToClause
     * 
    **/
    select?: ReportToClauseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReportToClauseInclude | null
    /**
     * Filter, which ReportToClauses to fetch.
     * 
    **/
    where?: ReportToClauseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ReportToClauses to fetch.
     * 
    **/
    orderBy?: Enumerable<ReportToClauseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ReportToClauses.
     * 
    **/
    cursor?: ReportToClauseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ReportToClauses from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ReportToClauses.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ReportToClauseScalarFieldEnum>
  }


  /**
   * ReportToClause create
   */
  export type ReportToClauseCreateArgs = {
    /**
     * Select specific fields to fetch from the ReportToClause
     * 
    **/
    select?: ReportToClauseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReportToClauseInclude | null
    /**
     * The data needed to create a ReportToClause.
     * 
    **/
    data: XOR<ReportToClauseCreateInput, ReportToClauseUncheckedCreateInput>
  }


  /**
   * ReportToClause createMany
   */
  export type ReportToClauseCreateManyArgs = {
    /**
     * The data used to create many ReportToClauses.
     * 
    **/
    data: Enumerable<ReportToClauseCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * ReportToClause update
   */
  export type ReportToClauseUpdateArgs = {
    /**
     * Select specific fields to fetch from the ReportToClause
     * 
    **/
    select?: ReportToClauseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReportToClauseInclude | null
    /**
     * The data needed to update a ReportToClause.
     * 
    **/
    data: XOR<ReportToClauseUpdateInput, ReportToClauseUncheckedUpdateInput>
    /**
     * Choose, which ReportToClause to update.
     * 
    **/
    where: ReportToClauseWhereUniqueInput
  }


  /**
   * ReportToClause updateMany
   */
  export type ReportToClauseUpdateManyArgs = {
    /**
     * The data used to update ReportToClauses.
     * 
    **/
    data: XOR<ReportToClauseUpdateManyMutationInput, ReportToClauseUncheckedUpdateManyInput>
    /**
     * Filter which ReportToClauses to update
     * 
    **/
    where?: ReportToClauseWhereInput
  }


  /**
   * ReportToClause upsert
   */
  export type ReportToClauseUpsertArgs = {
    /**
     * Select specific fields to fetch from the ReportToClause
     * 
    **/
    select?: ReportToClauseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReportToClauseInclude | null
    /**
     * The filter to search for the ReportToClause to update in case it exists.
     * 
    **/
    where: ReportToClauseWhereUniqueInput
    /**
     * In case the ReportToClause found by the `where` argument doesn't exist, create a new ReportToClause with this data.
     * 
    **/
    create: XOR<ReportToClauseCreateInput, ReportToClauseUncheckedCreateInput>
    /**
     * In case the ReportToClause was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ReportToClauseUpdateInput, ReportToClauseUncheckedUpdateInput>
  }


  /**
   * ReportToClause delete
   */
  export type ReportToClauseDeleteArgs = {
    /**
     * Select specific fields to fetch from the ReportToClause
     * 
    **/
    select?: ReportToClauseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReportToClauseInclude | null
    /**
     * Filter which ReportToClause to delete.
     * 
    **/
    where: ReportToClauseWhereUniqueInput
  }


  /**
   * ReportToClause deleteMany
   */
  export type ReportToClauseDeleteManyArgs = {
    /**
     * Filter which ReportToClauses to delete
     * 
    **/
    where?: ReportToClauseWhereInput
  }


  /**
   * ReportToClause without action
   */
  export type ReportToClauseArgs = {
    /**
     * Select specific fields to fetch from the ReportToClause
     * 
    **/
    select?: ReportToClauseSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReportToClauseInclude | null
  }



  /**
   * Model User
   */


  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs = {
    /**
     * Filter which User to aggregate.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: Array<UserScalarFieldEnum>
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string | null
    password: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect = {
    id?: boolean
    email?: boolean
    name?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Report?: boolean | User$ReportArgs
    _count?: boolean | UserCountOutputTypeArgs
  }


  export type UserInclude = {
    Report?: boolean | User$ReportArgs
    _count?: boolean | UserCountOutputTypeArgs
  } 

  export type UserGetPayload<S extends boolean | null | undefined | UserArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? User :
    S extends undefined ? never :
    S extends { include: any } & (UserArgs | UserFindManyArgs)
    ? User  & {
    [P in TruthyKeys<S['include']>]:
        P extends 'Report' ? Array < ReportGetPayload<S['include'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : S extends { select: any } & (UserArgs | UserFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
        P extends 'Report' ? Array < ReportGetPayload<S['select'][P]>>  :
        P extends '_count' ? UserCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof User ? User[P] : never
  } 
      : User


  type UserCountArgs = Merge<
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }
  >

  export interface UserDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? Prisma__UserClient<UserGetPayload<T>> : Prisma__UserClient<UserGetPayload<T> | null, null>

    /**
     * Find one User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? Prisma__UserClient<UserGetPayload<T>> : Prisma__UserClient<UserGetPayload<T> | null, null>

    /**
     * Find the first User that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs>
    ): PrismaPromise<Array<UserGetPayload<T>>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs>
    ): Prisma__UserClient<UserGetPayload<T>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
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
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    Report<T extends User$ReportArgs= {}>(args?: Subset<T, User$ReportArgs>): PrismaPromise<Array<ReportGetPayload<T>>| Null>;

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
   * User base type for findUnique actions
   */
  export type UserFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where: UserWhereUniqueInput
  }

  /**
   * User findUnique
   */
  export interface UserFindUniqueArgs extends UserFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User base type for findFirst actions
   */
  export type UserFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User findFirst
   */
  export interface UserFindFirstArgs extends UserFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which User to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     * 
    **/
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter, which Users to fetch.
     * 
    **/
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     * 
    **/
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     * 
    **/
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to create a User.
     * 
    **/
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs = {
    /**
     * The data used to create many Users.
     * 
    **/
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The data needed to update a User.
     * 
    **/
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs = {
    /**
     * The data used to update Users.
     * 
    **/
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * The filter to search for the User to update in case it exists.
     * 
    **/
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     * 
    **/
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
    /**
     * Filter which User to delete.
     * 
    **/
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs = {
    /**
     * Filter which Users to delete
     * 
    **/
    where?: UserWhereInput
  }


  /**
   * User.Report
   */
  export type User$ReportArgs = {
    /**
     * Select specific fields to fetch from the Report
     * 
    **/
    select?: ReportSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: ReportInclude | null
    where?: ReportWhereInput
    orderBy?: Enumerable<ReportOrderByWithRelationInput>
    cursor?: ReportWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<ReportScalarFieldEnum>
  }


  /**
   * User without action
   */
  export type UserArgs = {
    /**
     * Select specific fields to fetch from the User
     * 
    **/
    select?: UserSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInclude | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const ClauseScalarFieldEnum: {
    id: 'id',
    label: 'label',
    value: 'value'
  };

  export type ClauseScalarFieldEnum = (typeof ClauseScalarFieldEnum)[keyof typeof ClauseScalarFieldEnum]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const ReportScalarFieldEnum: {
    id: 'id',
    title: 'title',
    authorId: 'authorId',
    meetDate: 'meetDate',
    meetLink: 'meetLink',
    applicantName: 'applicantName',
    applicantType: 'applicantType',
    projectStatus: 'projectStatus',
    projectCadastralRef: 'projectCadastralRef',
    projectLandContact: 'projectLandContact',
    projectSpaceType: 'projectSpaceType',
    projectNature: 'projectNature',
    projectDescription: 'projectDescription',
    decision: 'decision',
    decisionComment: 'decisionComment',
    contacts: 'contacts',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ReportScalarFieldEnum = (typeof ReportScalarFieldEnum)[keyof typeof ReportScalarFieldEnum]


  export const ReportToClauseScalarFieldEnum: {
    reportId: 'reportId',
    clauseId: 'clauseId'
  };

  export type ReportToClauseScalarFieldEnum = (typeof ReportToClauseScalarFieldEnum)[keyof typeof ReportToClauseScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  /**
   * Deep Input Types
   */


  export type ClauseWhereInput = {
    AND?: Enumerable<ClauseWhereInput>
    OR?: Enumerable<ClauseWhereInput>
    NOT?: Enumerable<ClauseWhereInput>
    id?: StringFilter | string
    label?: StringFilter | string
    value?: StringFilter | string
    ReportToClause?: ReportToClauseListRelationFilter
  }

  export type ClauseOrderByWithRelationInput = {
    id?: SortOrder
    label?: SortOrder
    value?: SortOrder
    ReportToClause?: ReportToClauseOrderByRelationAggregateInput
  }

  export type ClauseWhereUniqueInput = {
    id?: string
  }

  export type ClauseOrderByWithAggregationInput = {
    id?: SortOrder
    label?: SortOrder
    value?: SortOrder
    _count?: ClauseCountOrderByAggregateInput
    _max?: ClauseMaxOrderByAggregateInput
    _min?: ClauseMinOrderByAggregateInput
  }

  export type ClauseScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ClauseScalarWhereWithAggregatesInput>
    OR?: Enumerable<ClauseScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ClauseScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    label?: StringWithAggregatesFilter | string
    value?: StringWithAggregatesFilter | string
  }

  export type ReportWhereInput = {
    AND?: Enumerable<ReportWhereInput>
    OR?: Enumerable<ReportWhereInput>
    NOT?: Enumerable<ReportWhereInput>
    id?: StringFilter | string
    title?: StringFilter | string
    authorId?: StringFilter | string
    meetDate?: DateTimeFilter | Date | string
    meetLink?: StringFilter | string
    applicantName?: StringFilter | string
    applicantType?: StringFilter | string
    projectStatus?: StringFilter | string
    projectCadastralRef?: StringFilter | string
    projectLandContact?: StringFilter | string
    projectSpaceType?: StringFilter | string
    projectNature?: StringFilter | string
    projectDescription?: StringFilter | string
    decision?: StringFilter | string
    decisionComment?: StringFilter | string
    contacts?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    User?: XOR<UserRelationFilter, UserWhereInput>
    ReportToClause?: ReportToClauseListRelationFilter
  }

  export type ReportOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    authorId?: SortOrder
    meetDate?: SortOrder
    meetLink?: SortOrder
    applicantName?: SortOrder
    applicantType?: SortOrder
    projectStatus?: SortOrder
    projectCadastralRef?: SortOrder
    projectLandContact?: SortOrder
    projectSpaceType?: SortOrder
    projectNature?: SortOrder
    projectDescription?: SortOrder
    decision?: SortOrder
    decisionComment?: SortOrder
    contacts?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    User?: UserOrderByWithRelationInput
    ReportToClause?: ReportToClauseOrderByRelationAggregateInput
  }

  export type ReportWhereUniqueInput = {
    id?: string
  }

  export type ReportOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    authorId?: SortOrder
    meetDate?: SortOrder
    meetLink?: SortOrder
    applicantName?: SortOrder
    applicantType?: SortOrder
    projectStatus?: SortOrder
    projectCadastralRef?: SortOrder
    projectLandContact?: SortOrder
    projectSpaceType?: SortOrder
    projectNature?: SortOrder
    projectDescription?: SortOrder
    decision?: SortOrder
    decisionComment?: SortOrder
    contacts?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ReportCountOrderByAggregateInput
    _max?: ReportMaxOrderByAggregateInput
    _min?: ReportMinOrderByAggregateInput
  }

  export type ReportScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ReportScalarWhereWithAggregatesInput>
    OR?: Enumerable<ReportScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ReportScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    title?: StringWithAggregatesFilter | string
    authorId?: StringWithAggregatesFilter | string
    meetDate?: DateTimeWithAggregatesFilter | Date | string
    meetLink?: StringWithAggregatesFilter | string
    applicantName?: StringWithAggregatesFilter | string
    applicantType?: StringWithAggregatesFilter | string
    projectStatus?: StringWithAggregatesFilter | string
    projectCadastralRef?: StringWithAggregatesFilter | string
    projectLandContact?: StringWithAggregatesFilter | string
    projectSpaceType?: StringWithAggregatesFilter | string
    projectNature?: StringWithAggregatesFilter | string
    projectDescription?: StringWithAggregatesFilter | string
    decision?: StringWithAggregatesFilter | string
    decisionComment?: StringWithAggregatesFilter | string
    contacts?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type ReportToClauseWhereInput = {
    AND?: Enumerable<ReportToClauseWhereInput>
    OR?: Enumerable<ReportToClauseWhereInput>
    NOT?: Enumerable<ReportToClauseWhereInput>
    reportId?: StringFilter | string
    clauseId?: StringFilter | string
    Clause?: XOR<ClauseRelationFilter, ClauseWhereInput>
    Report?: XOR<ReportRelationFilter, ReportWhereInput>
  }

  export type ReportToClauseOrderByWithRelationInput = {
    reportId?: SortOrder
    clauseId?: SortOrder
    Clause?: ClauseOrderByWithRelationInput
    Report?: ReportOrderByWithRelationInput
  }

  export type ReportToClauseWhereUniqueInput = {
    reportId_clauseId?: ReportToClauseReportIdClauseIdCompoundUniqueInput
  }

  export type ReportToClauseOrderByWithAggregationInput = {
    reportId?: SortOrder
    clauseId?: SortOrder
    _count?: ReportToClauseCountOrderByAggregateInput
    _max?: ReportToClauseMaxOrderByAggregateInput
    _min?: ReportToClauseMinOrderByAggregateInput
  }

  export type ReportToClauseScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ReportToClauseScalarWhereWithAggregatesInput>
    OR?: Enumerable<ReportToClauseScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ReportToClauseScalarWhereWithAggregatesInput>
    reportId?: StringWithAggregatesFilter | string
    clauseId?: StringWithAggregatesFilter | string
  }

  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: StringFilter | string
    email?: StringFilter | string
    name?: StringNullableFilter | string | null
    password?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
    Report?: ReportListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Report?: ReportOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = {
    id?: string
    email?: string
  }

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    email?: StringWithAggregatesFilter | string
    name?: StringNullableWithAggregatesFilter | string | null
    password?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type ClauseCreateInput = {
    id: string
    label: string
    value: string
    ReportToClause?: ReportToClauseCreateNestedManyWithoutClauseInput
  }

  export type ClauseUncheckedCreateInput = {
    id: string
    label: string
    value: string
    ReportToClause?: ReportToClauseUncheckedCreateNestedManyWithoutClauseInput
  }

  export type ClauseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    ReportToClause?: ReportToClauseUpdateManyWithoutClauseNestedInput
  }

  export type ClauseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    ReportToClause?: ReportToClauseUncheckedUpdateManyWithoutClauseNestedInput
  }

  export type ClauseCreateManyInput = {
    id: string
    label: string
    value: string
  }

  export type ClauseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type ClauseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type ReportCreateInput = {
    id: string
    title: string
    meetDate: Date | string
    meetLink: string
    applicantName: string
    applicantType: string
    projectStatus: string
    projectCadastralRef: string
    projectLandContact: string
    projectSpaceType: string
    projectNature: string
    projectDescription: string
    decision: string
    decisionComment: string
    contacts: string
    createdAt: Date | string
    updatedAt: Date | string
    User: UserCreateNestedOneWithoutReportInput
    ReportToClause?: ReportToClauseCreateNestedManyWithoutReportInput
  }

  export type ReportUncheckedCreateInput = {
    id: string
    title: string
    authorId: string
    meetDate: Date | string
    meetLink: string
    applicantName: string
    applicantType: string
    projectStatus: string
    projectCadastralRef: string
    projectLandContact: string
    projectSpaceType: string
    projectNature: string
    projectDescription: string
    decision: string
    decisionComment: string
    contacts: string
    createdAt: Date | string
    updatedAt: Date | string
    ReportToClause?: ReportToClauseUncheckedCreateNestedManyWithoutReportInput
  }

  export type ReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    meetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    meetLink?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantType?: StringFieldUpdateOperationsInput | string
    projectStatus?: StringFieldUpdateOperationsInput | string
    projectCadastralRef?: StringFieldUpdateOperationsInput | string
    projectLandContact?: StringFieldUpdateOperationsInput | string
    projectSpaceType?: StringFieldUpdateOperationsInput | string
    projectNature?: StringFieldUpdateOperationsInput | string
    projectDescription?: StringFieldUpdateOperationsInput | string
    decision?: StringFieldUpdateOperationsInput | string
    decisionComment?: StringFieldUpdateOperationsInput | string
    contacts?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneRequiredWithoutReportNestedInput
    ReportToClause?: ReportToClauseUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    meetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    meetLink?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantType?: StringFieldUpdateOperationsInput | string
    projectStatus?: StringFieldUpdateOperationsInput | string
    projectCadastralRef?: StringFieldUpdateOperationsInput | string
    projectLandContact?: StringFieldUpdateOperationsInput | string
    projectSpaceType?: StringFieldUpdateOperationsInput | string
    projectNature?: StringFieldUpdateOperationsInput | string
    projectDescription?: StringFieldUpdateOperationsInput | string
    decision?: StringFieldUpdateOperationsInput | string
    decisionComment?: StringFieldUpdateOperationsInput | string
    contacts?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ReportToClause?: ReportToClauseUncheckedUpdateManyWithoutReportNestedInput
  }

  export type ReportCreateManyInput = {
    id: string
    title: string
    authorId: string
    meetDate: Date | string
    meetLink: string
    applicantName: string
    applicantType: string
    projectStatus: string
    projectCadastralRef: string
    projectLandContact: string
    projectSpaceType: string
    projectNature: string
    projectDescription: string
    decision: string
    decisionComment: string
    contacts: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type ReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    meetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    meetLink?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantType?: StringFieldUpdateOperationsInput | string
    projectStatus?: StringFieldUpdateOperationsInput | string
    projectCadastralRef?: StringFieldUpdateOperationsInput | string
    projectLandContact?: StringFieldUpdateOperationsInput | string
    projectSpaceType?: StringFieldUpdateOperationsInput | string
    projectNature?: StringFieldUpdateOperationsInput | string
    projectDescription?: StringFieldUpdateOperationsInput | string
    decision?: StringFieldUpdateOperationsInput | string
    decisionComment?: StringFieldUpdateOperationsInput | string
    contacts?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    meetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    meetLink?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantType?: StringFieldUpdateOperationsInput | string
    projectStatus?: StringFieldUpdateOperationsInput | string
    projectCadastralRef?: StringFieldUpdateOperationsInput | string
    projectLandContact?: StringFieldUpdateOperationsInput | string
    projectSpaceType?: StringFieldUpdateOperationsInput | string
    projectNature?: StringFieldUpdateOperationsInput | string
    projectDescription?: StringFieldUpdateOperationsInput | string
    decision?: StringFieldUpdateOperationsInput | string
    decisionComment?: StringFieldUpdateOperationsInput | string
    contacts?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportToClauseCreateInput = {
    Clause: ClauseCreateNestedOneWithoutReportToClauseInput
    Report: ReportCreateNestedOneWithoutReportToClauseInput
  }

  export type ReportToClauseUncheckedCreateInput = {
    reportId: string
    clauseId: string
  }

  export type ReportToClauseUpdateInput = {
    Clause?: ClauseUpdateOneRequiredWithoutReportToClauseNestedInput
    Report?: ReportUpdateOneRequiredWithoutReportToClauseNestedInput
  }

  export type ReportToClauseUncheckedUpdateInput = {
    reportId?: StringFieldUpdateOperationsInput | string
    clauseId?: StringFieldUpdateOperationsInput | string
  }

  export type ReportToClauseCreateManyInput = {
    reportId: string
    clauseId: string
  }

  export type ReportToClauseUpdateManyMutationInput = {

  }

  export type ReportToClauseUncheckedUpdateManyInput = {
    reportId?: StringFieldUpdateOperationsInput | string
    clauseId?: StringFieldUpdateOperationsInput | string
  }

  export type UserCreateInput = {
    id: string
    email: string
    name?: string | null
    password: string
    createdAt: Date | string
    updatedAt: Date | string
    Report?: ReportCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    email: string
    name?: string | null
    password: string
    createdAt: Date | string
    updatedAt: Date | string
    Report?: ReportUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Report?: ReportUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Report?: ReportUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    email: string
    name?: string | null
    password: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
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

  export type ReportToClauseListRelationFilter = {
    every?: ReportToClauseWhereInput
    some?: ReportToClauseWhereInput
    none?: ReportToClauseWhereInput
  }

  export type ReportToClauseOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClauseCountOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    value?: SortOrder
  }

  export type ClauseMaxOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    value?: SortOrder
  }

  export type ClauseMinOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    value?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
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

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ReportCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    authorId?: SortOrder
    meetDate?: SortOrder
    meetLink?: SortOrder
    applicantName?: SortOrder
    applicantType?: SortOrder
    projectStatus?: SortOrder
    projectCadastralRef?: SortOrder
    projectLandContact?: SortOrder
    projectSpaceType?: SortOrder
    projectNature?: SortOrder
    projectDescription?: SortOrder
    decision?: SortOrder
    decisionComment?: SortOrder
    contacts?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReportMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    authorId?: SortOrder
    meetDate?: SortOrder
    meetLink?: SortOrder
    applicantName?: SortOrder
    applicantType?: SortOrder
    projectStatus?: SortOrder
    projectCadastralRef?: SortOrder
    projectLandContact?: SortOrder
    projectSpaceType?: SortOrder
    projectNature?: SortOrder
    projectDescription?: SortOrder
    decision?: SortOrder
    decisionComment?: SortOrder
    contacts?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ReportMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    authorId?: SortOrder
    meetDate?: SortOrder
    meetLink?: SortOrder
    applicantName?: SortOrder
    applicantType?: SortOrder
    projectStatus?: SortOrder
    projectCadastralRef?: SortOrder
    projectLandContact?: SortOrder
    projectSpaceType?: SortOrder
    projectNature?: SortOrder
    projectDescription?: SortOrder
    decision?: SortOrder
    decisionComment?: SortOrder
    contacts?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type ClauseRelationFilter = {
    is?: ClauseWhereInput
    isNot?: ClauseWhereInput
  }

  export type ReportRelationFilter = {
    is?: ReportWhereInput
    isNot?: ReportWhereInput
  }

  export type ReportToClauseReportIdClauseIdCompoundUniqueInput = {
    reportId: string
    clauseId: string
  }

  export type ReportToClauseCountOrderByAggregateInput = {
    reportId?: SortOrder
    clauseId?: SortOrder
  }

  export type ReportToClauseMaxOrderByAggregateInput = {
    reportId?: SortOrder
    clauseId?: SortOrder
  }

  export type ReportToClauseMinOrderByAggregateInput = {
    reportId?: SortOrder
    clauseId?: SortOrder
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
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

  export type ReportListRelationFilter = {
    every?: ReportWhereInput
    some?: ReportWhereInput
    none?: ReportWhereInput
  }

  export type ReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
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

  export type ReportToClauseCreateNestedManyWithoutClauseInput = {
    create?: XOR<Enumerable<ReportToClauseCreateWithoutClauseInput>, Enumerable<ReportToClauseUncheckedCreateWithoutClauseInput>>
    connectOrCreate?: Enumerable<ReportToClauseCreateOrConnectWithoutClauseInput>
    createMany?: ReportToClauseCreateManyClauseInputEnvelope
    connect?: Enumerable<ReportToClauseWhereUniqueInput>
  }

  export type ReportToClauseUncheckedCreateNestedManyWithoutClauseInput = {
    create?: XOR<Enumerable<ReportToClauseCreateWithoutClauseInput>, Enumerable<ReportToClauseUncheckedCreateWithoutClauseInput>>
    connectOrCreate?: Enumerable<ReportToClauseCreateOrConnectWithoutClauseInput>
    createMany?: ReportToClauseCreateManyClauseInputEnvelope
    connect?: Enumerable<ReportToClauseWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type ReportToClauseUpdateManyWithoutClauseNestedInput = {
    create?: XOR<Enumerable<ReportToClauseCreateWithoutClauseInput>, Enumerable<ReportToClauseUncheckedCreateWithoutClauseInput>>
    connectOrCreate?: Enumerable<ReportToClauseCreateOrConnectWithoutClauseInput>
    upsert?: Enumerable<ReportToClauseUpsertWithWhereUniqueWithoutClauseInput>
    createMany?: ReportToClauseCreateManyClauseInputEnvelope
    set?: Enumerable<ReportToClauseWhereUniqueInput>
    disconnect?: Enumerable<ReportToClauseWhereUniqueInput>
    delete?: Enumerable<ReportToClauseWhereUniqueInput>
    connect?: Enumerable<ReportToClauseWhereUniqueInput>
    update?: Enumerable<ReportToClauseUpdateWithWhereUniqueWithoutClauseInput>
    updateMany?: Enumerable<ReportToClauseUpdateManyWithWhereWithoutClauseInput>
    deleteMany?: Enumerable<ReportToClauseScalarWhereInput>
  }

  export type ReportToClauseUncheckedUpdateManyWithoutClauseNestedInput = {
    create?: XOR<Enumerable<ReportToClauseCreateWithoutClauseInput>, Enumerable<ReportToClauseUncheckedCreateWithoutClauseInput>>
    connectOrCreate?: Enumerable<ReportToClauseCreateOrConnectWithoutClauseInput>
    upsert?: Enumerable<ReportToClauseUpsertWithWhereUniqueWithoutClauseInput>
    createMany?: ReportToClauseCreateManyClauseInputEnvelope
    set?: Enumerable<ReportToClauseWhereUniqueInput>
    disconnect?: Enumerable<ReportToClauseWhereUniqueInput>
    delete?: Enumerable<ReportToClauseWhereUniqueInput>
    connect?: Enumerable<ReportToClauseWhereUniqueInput>
    update?: Enumerable<ReportToClauseUpdateWithWhereUniqueWithoutClauseInput>
    updateMany?: Enumerable<ReportToClauseUpdateManyWithWhereWithoutClauseInput>
    deleteMany?: Enumerable<ReportToClauseScalarWhereInput>
  }

  export type UserCreateNestedOneWithoutReportInput = {
    create?: XOR<UserCreateWithoutReportInput, UserUncheckedCreateWithoutReportInput>
    connectOrCreate?: UserCreateOrConnectWithoutReportInput
    connect?: UserWhereUniqueInput
  }

  export type ReportToClauseCreateNestedManyWithoutReportInput = {
    create?: XOR<Enumerable<ReportToClauseCreateWithoutReportInput>, Enumerable<ReportToClauseUncheckedCreateWithoutReportInput>>
    connectOrCreate?: Enumerable<ReportToClauseCreateOrConnectWithoutReportInput>
    createMany?: ReportToClauseCreateManyReportInputEnvelope
    connect?: Enumerable<ReportToClauseWhereUniqueInput>
  }

  export type ReportToClauseUncheckedCreateNestedManyWithoutReportInput = {
    create?: XOR<Enumerable<ReportToClauseCreateWithoutReportInput>, Enumerable<ReportToClauseUncheckedCreateWithoutReportInput>>
    connectOrCreate?: Enumerable<ReportToClauseCreateOrConnectWithoutReportInput>
    createMany?: ReportToClauseCreateManyReportInputEnvelope
    connect?: Enumerable<ReportToClauseWhereUniqueInput>
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UserUpdateOneRequiredWithoutReportNestedInput = {
    create?: XOR<UserCreateWithoutReportInput, UserUncheckedCreateWithoutReportInput>
    connectOrCreate?: UserCreateOrConnectWithoutReportInput
    upsert?: UserUpsertWithoutReportInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutReportInput, UserUncheckedUpdateWithoutReportInput>
  }

  export type ReportToClauseUpdateManyWithoutReportNestedInput = {
    create?: XOR<Enumerable<ReportToClauseCreateWithoutReportInput>, Enumerable<ReportToClauseUncheckedCreateWithoutReportInput>>
    connectOrCreate?: Enumerable<ReportToClauseCreateOrConnectWithoutReportInput>
    upsert?: Enumerable<ReportToClauseUpsertWithWhereUniqueWithoutReportInput>
    createMany?: ReportToClauseCreateManyReportInputEnvelope
    set?: Enumerable<ReportToClauseWhereUniqueInput>
    disconnect?: Enumerable<ReportToClauseWhereUniqueInput>
    delete?: Enumerable<ReportToClauseWhereUniqueInput>
    connect?: Enumerable<ReportToClauseWhereUniqueInput>
    update?: Enumerable<ReportToClauseUpdateWithWhereUniqueWithoutReportInput>
    updateMany?: Enumerable<ReportToClauseUpdateManyWithWhereWithoutReportInput>
    deleteMany?: Enumerable<ReportToClauseScalarWhereInput>
  }

  export type ReportToClauseUncheckedUpdateManyWithoutReportNestedInput = {
    create?: XOR<Enumerable<ReportToClauseCreateWithoutReportInput>, Enumerable<ReportToClauseUncheckedCreateWithoutReportInput>>
    connectOrCreate?: Enumerable<ReportToClauseCreateOrConnectWithoutReportInput>
    upsert?: Enumerable<ReportToClauseUpsertWithWhereUniqueWithoutReportInput>
    createMany?: ReportToClauseCreateManyReportInputEnvelope
    set?: Enumerable<ReportToClauseWhereUniqueInput>
    disconnect?: Enumerable<ReportToClauseWhereUniqueInput>
    delete?: Enumerable<ReportToClauseWhereUniqueInput>
    connect?: Enumerable<ReportToClauseWhereUniqueInput>
    update?: Enumerable<ReportToClauseUpdateWithWhereUniqueWithoutReportInput>
    updateMany?: Enumerable<ReportToClauseUpdateManyWithWhereWithoutReportInput>
    deleteMany?: Enumerable<ReportToClauseScalarWhereInput>
  }

  export type ClauseCreateNestedOneWithoutReportToClauseInput = {
    create?: XOR<ClauseCreateWithoutReportToClauseInput, ClauseUncheckedCreateWithoutReportToClauseInput>
    connectOrCreate?: ClauseCreateOrConnectWithoutReportToClauseInput
    connect?: ClauseWhereUniqueInput
  }

  export type ReportCreateNestedOneWithoutReportToClauseInput = {
    create?: XOR<ReportCreateWithoutReportToClauseInput, ReportUncheckedCreateWithoutReportToClauseInput>
    connectOrCreate?: ReportCreateOrConnectWithoutReportToClauseInput
    connect?: ReportWhereUniqueInput
  }

  export type ClauseUpdateOneRequiredWithoutReportToClauseNestedInput = {
    create?: XOR<ClauseCreateWithoutReportToClauseInput, ClauseUncheckedCreateWithoutReportToClauseInput>
    connectOrCreate?: ClauseCreateOrConnectWithoutReportToClauseInput
    upsert?: ClauseUpsertWithoutReportToClauseInput
    connect?: ClauseWhereUniqueInput
    update?: XOR<ClauseUpdateWithoutReportToClauseInput, ClauseUncheckedUpdateWithoutReportToClauseInput>
  }

  export type ReportUpdateOneRequiredWithoutReportToClauseNestedInput = {
    create?: XOR<ReportCreateWithoutReportToClauseInput, ReportUncheckedCreateWithoutReportToClauseInput>
    connectOrCreate?: ReportCreateOrConnectWithoutReportToClauseInput
    upsert?: ReportUpsertWithoutReportToClauseInput
    connect?: ReportWhereUniqueInput
    update?: XOR<ReportUpdateWithoutReportToClauseInput, ReportUncheckedUpdateWithoutReportToClauseInput>
  }

  export type ReportCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<ReportCreateWithoutUserInput>, Enumerable<ReportUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ReportCreateOrConnectWithoutUserInput>
    createMany?: ReportCreateManyUserInputEnvelope
    connect?: Enumerable<ReportWhereUniqueInput>
  }

  export type ReportUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<ReportCreateWithoutUserInput>, Enumerable<ReportUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ReportCreateOrConnectWithoutUserInput>
    createMany?: ReportCreateManyUserInputEnvelope
    connect?: Enumerable<ReportWhereUniqueInput>
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ReportUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<ReportCreateWithoutUserInput>, Enumerable<ReportUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ReportCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<ReportUpsertWithWhereUniqueWithoutUserInput>
    createMany?: ReportCreateManyUserInputEnvelope
    set?: Enumerable<ReportWhereUniqueInput>
    disconnect?: Enumerable<ReportWhereUniqueInput>
    delete?: Enumerable<ReportWhereUniqueInput>
    connect?: Enumerable<ReportWhereUniqueInput>
    update?: Enumerable<ReportUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<ReportUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<ReportScalarWhereInput>
  }

  export type ReportUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<ReportCreateWithoutUserInput>, Enumerable<ReportUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ReportCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<ReportUpsertWithWhereUniqueWithoutUserInput>
    createMany?: ReportCreateManyUserInputEnvelope
    set?: Enumerable<ReportWhereUniqueInput>
    disconnect?: Enumerable<ReportWhereUniqueInput>
    delete?: Enumerable<ReportWhereUniqueInput>
    connect?: Enumerable<ReportWhereUniqueInput>
    update?: Enumerable<ReportUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<ReportUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<ReportScalarWhereInput>
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
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

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
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
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type ReportToClauseCreateWithoutClauseInput = {
    Report: ReportCreateNestedOneWithoutReportToClauseInput
  }

  export type ReportToClauseUncheckedCreateWithoutClauseInput = {
    reportId: string
  }

  export type ReportToClauseCreateOrConnectWithoutClauseInput = {
    where: ReportToClauseWhereUniqueInput
    create: XOR<ReportToClauseCreateWithoutClauseInput, ReportToClauseUncheckedCreateWithoutClauseInput>
  }

  export type ReportToClauseCreateManyClauseInputEnvelope = {
    data: Enumerable<ReportToClauseCreateManyClauseInput>
    skipDuplicates?: boolean
  }

  export type ReportToClauseUpsertWithWhereUniqueWithoutClauseInput = {
    where: ReportToClauseWhereUniqueInput
    update: XOR<ReportToClauseUpdateWithoutClauseInput, ReportToClauseUncheckedUpdateWithoutClauseInput>
    create: XOR<ReportToClauseCreateWithoutClauseInput, ReportToClauseUncheckedCreateWithoutClauseInput>
  }

  export type ReportToClauseUpdateWithWhereUniqueWithoutClauseInput = {
    where: ReportToClauseWhereUniqueInput
    data: XOR<ReportToClauseUpdateWithoutClauseInput, ReportToClauseUncheckedUpdateWithoutClauseInput>
  }

  export type ReportToClauseUpdateManyWithWhereWithoutClauseInput = {
    where: ReportToClauseScalarWhereInput
    data: XOR<ReportToClauseUpdateManyMutationInput, ReportToClauseUncheckedUpdateManyWithoutReportToClauseInput>
  }

  export type ReportToClauseScalarWhereInput = {
    AND?: Enumerable<ReportToClauseScalarWhereInput>
    OR?: Enumerable<ReportToClauseScalarWhereInput>
    NOT?: Enumerable<ReportToClauseScalarWhereInput>
    reportId?: StringFilter | string
    clauseId?: StringFilter | string
  }

  export type UserCreateWithoutReportInput = {
    id: string
    email: string
    name?: string | null
    password: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type UserUncheckedCreateWithoutReportInput = {
    id: string
    email: string
    name?: string | null
    password: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type UserCreateOrConnectWithoutReportInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReportInput, UserUncheckedCreateWithoutReportInput>
  }

  export type ReportToClauseCreateWithoutReportInput = {
    Clause: ClauseCreateNestedOneWithoutReportToClauseInput
  }

  export type ReportToClauseUncheckedCreateWithoutReportInput = {
    clauseId: string
  }

  export type ReportToClauseCreateOrConnectWithoutReportInput = {
    where: ReportToClauseWhereUniqueInput
    create: XOR<ReportToClauseCreateWithoutReportInput, ReportToClauseUncheckedCreateWithoutReportInput>
  }

  export type ReportToClauseCreateManyReportInputEnvelope = {
    data: Enumerable<ReportToClauseCreateManyReportInput>
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutReportInput = {
    update: XOR<UserUpdateWithoutReportInput, UserUncheckedUpdateWithoutReportInput>
    create: XOR<UserCreateWithoutReportInput, UserUncheckedCreateWithoutReportInput>
  }

  export type UserUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportToClauseUpsertWithWhereUniqueWithoutReportInput = {
    where: ReportToClauseWhereUniqueInput
    update: XOR<ReportToClauseUpdateWithoutReportInput, ReportToClauseUncheckedUpdateWithoutReportInput>
    create: XOR<ReportToClauseCreateWithoutReportInput, ReportToClauseUncheckedCreateWithoutReportInput>
  }

  export type ReportToClauseUpdateWithWhereUniqueWithoutReportInput = {
    where: ReportToClauseWhereUniqueInput
    data: XOR<ReportToClauseUpdateWithoutReportInput, ReportToClauseUncheckedUpdateWithoutReportInput>
  }

  export type ReportToClauseUpdateManyWithWhereWithoutReportInput = {
    where: ReportToClauseScalarWhereInput
    data: XOR<ReportToClauseUpdateManyMutationInput, ReportToClauseUncheckedUpdateManyWithoutReportToClauseInput>
  }

  export type ClauseCreateWithoutReportToClauseInput = {
    id: string
    label: string
    value: string
  }

  export type ClauseUncheckedCreateWithoutReportToClauseInput = {
    id: string
    label: string
    value: string
  }

  export type ClauseCreateOrConnectWithoutReportToClauseInput = {
    where: ClauseWhereUniqueInput
    create: XOR<ClauseCreateWithoutReportToClauseInput, ClauseUncheckedCreateWithoutReportToClauseInput>
  }

  export type ReportCreateWithoutReportToClauseInput = {
    id: string
    title: string
    meetDate: Date | string
    meetLink: string
    applicantName: string
    applicantType: string
    projectStatus: string
    projectCadastralRef: string
    projectLandContact: string
    projectSpaceType: string
    projectNature: string
    projectDescription: string
    decision: string
    decisionComment: string
    contacts: string
    createdAt: Date | string
    updatedAt: Date | string
    User: UserCreateNestedOneWithoutReportInput
  }

  export type ReportUncheckedCreateWithoutReportToClauseInput = {
    id: string
    title: string
    authorId: string
    meetDate: Date | string
    meetLink: string
    applicantName: string
    applicantType: string
    projectStatus: string
    projectCadastralRef: string
    projectLandContact: string
    projectSpaceType: string
    projectNature: string
    projectDescription: string
    decision: string
    decisionComment: string
    contacts: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type ReportCreateOrConnectWithoutReportToClauseInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutReportToClauseInput, ReportUncheckedCreateWithoutReportToClauseInput>
  }

  export type ClauseUpsertWithoutReportToClauseInput = {
    update: XOR<ClauseUpdateWithoutReportToClauseInput, ClauseUncheckedUpdateWithoutReportToClauseInput>
    create: XOR<ClauseCreateWithoutReportToClauseInput, ClauseUncheckedCreateWithoutReportToClauseInput>
  }

  export type ClauseUpdateWithoutReportToClauseInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type ClauseUncheckedUpdateWithoutReportToClauseInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
  }

  export type ReportUpsertWithoutReportToClauseInput = {
    update: XOR<ReportUpdateWithoutReportToClauseInput, ReportUncheckedUpdateWithoutReportToClauseInput>
    create: XOR<ReportCreateWithoutReportToClauseInput, ReportUncheckedCreateWithoutReportToClauseInput>
  }

  export type ReportUpdateWithoutReportToClauseInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    meetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    meetLink?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantType?: StringFieldUpdateOperationsInput | string
    projectStatus?: StringFieldUpdateOperationsInput | string
    projectCadastralRef?: StringFieldUpdateOperationsInput | string
    projectLandContact?: StringFieldUpdateOperationsInput | string
    projectSpaceType?: StringFieldUpdateOperationsInput | string
    projectNature?: StringFieldUpdateOperationsInput | string
    projectDescription?: StringFieldUpdateOperationsInput | string
    decision?: StringFieldUpdateOperationsInput | string
    decisionComment?: StringFieldUpdateOperationsInput | string
    contacts?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    User?: UserUpdateOneRequiredWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateWithoutReportToClauseInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    meetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    meetLink?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantType?: StringFieldUpdateOperationsInput | string
    projectStatus?: StringFieldUpdateOperationsInput | string
    projectCadastralRef?: StringFieldUpdateOperationsInput | string
    projectLandContact?: StringFieldUpdateOperationsInput | string
    projectSpaceType?: StringFieldUpdateOperationsInput | string
    projectNature?: StringFieldUpdateOperationsInput | string
    projectDescription?: StringFieldUpdateOperationsInput | string
    decision?: StringFieldUpdateOperationsInput | string
    decisionComment?: StringFieldUpdateOperationsInput | string
    contacts?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReportCreateWithoutUserInput = {
    id: string
    title: string
    meetDate: Date | string
    meetLink: string
    applicantName: string
    applicantType: string
    projectStatus: string
    projectCadastralRef: string
    projectLandContact: string
    projectSpaceType: string
    projectNature: string
    projectDescription: string
    decision: string
    decisionComment: string
    contacts: string
    createdAt: Date | string
    updatedAt: Date | string
    ReportToClause?: ReportToClauseCreateNestedManyWithoutReportInput
  }

  export type ReportUncheckedCreateWithoutUserInput = {
    id: string
    title: string
    meetDate: Date | string
    meetLink: string
    applicantName: string
    applicantType: string
    projectStatus: string
    projectCadastralRef: string
    projectLandContact: string
    projectSpaceType: string
    projectNature: string
    projectDescription: string
    decision: string
    decisionComment: string
    contacts: string
    createdAt: Date | string
    updatedAt: Date | string
    ReportToClause?: ReportToClauseUncheckedCreateNestedManyWithoutReportInput
  }

  export type ReportCreateOrConnectWithoutUserInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutUserInput, ReportUncheckedCreateWithoutUserInput>
  }

  export type ReportCreateManyUserInputEnvelope = {
    data: Enumerable<ReportCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type ReportUpsertWithWhereUniqueWithoutUserInput = {
    where: ReportWhereUniqueInput
    update: XOR<ReportUpdateWithoutUserInput, ReportUncheckedUpdateWithoutUserInput>
    create: XOR<ReportCreateWithoutUserInput, ReportUncheckedCreateWithoutUserInput>
  }

  export type ReportUpdateWithWhereUniqueWithoutUserInput = {
    where: ReportWhereUniqueInput
    data: XOR<ReportUpdateWithoutUserInput, ReportUncheckedUpdateWithoutUserInput>
  }

  export type ReportUpdateManyWithWhereWithoutUserInput = {
    where: ReportScalarWhereInput
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyWithoutReportInput>
  }

  export type ReportScalarWhereInput = {
    AND?: Enumerable<ReportScalarWhereInput>
    OR?: Enumerable<ReportScalarWhereInput>
    NOT?: Enumerable<ReportScalarWhereInput>
    id?: StringFilter | string
    title?: StringFilter | string
    authorId?: StringFilter | string
    meetDate?: DateTimeFilter | Date | string
    meetLink?: StringFilter | string
    applicantName?: StringFilter | string
    applicantType?: StringFilter | string
    projectStatus?: StringFilter | string
    projectCadastralRef?: StringFilter | string
    projectLandContact?: StringFilter | string
    projectSpaceType?: StringFilter | string
    projectNature?: StringFilter | string
    projectDescription?: StringFilter | string
    decision?: StringFilter | string
    decisionComment?: StringFilter | string
    contacts?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type ReportToClauseCreateManyClauseInput = {
    reportId: string
  }

  export type ReportToClauseUpdateWithoutClauseInput = {
    Report?: ReportUpdateOneRequiredWithoutReportToClauseNestedInput
  }

  export type ReportToClauseUncheckedUpdateWithoutClauseInput = {
    reportId?: StringFieldUpdateOperationsInput | string
  }

  export type ReportToClauseUncheckedUpdateManyWithoutReportToClauseInput = {
    reportId?: StringFieldUpdateOperationsInput | string
  }

  export type ReportToClauseCreateManyReportInput = {
    clauseId: string
  }

  export type ReportToClauseUpdateWithoutReportInput = {
    Clause?: ClauseUpdateOneRequiredWithoutReportToClauseNestedInput
  }

  export type ReportToClauseUncheckedUpdateWithoutReportInput = {
    clauseId?: StringFieldUpdateOperationsInput | string
  }

  export type ReportCreateManyUserInput = {
    id: string
    title: string
    meetDate: Date | string
    meetLink: string
    applicantName: string
    applicantType: string
    projectStatus: string
    projectCadastralRef: string
    projectLandContact: string
    projectSpaceType: string
    projectNature: string
    projectDescription: string
    decision: string
    decisionComment: string
    contacts: string
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type ReportUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    meetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    meetLink?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantType?: StringFieldUpdateOperationsInput | string
    projectStatus?: StringFieldUpdateOperationsInput | string
    projectCadastralRef?: StringFieldUpdateOperationsInput | string
    projectLandContact?: StringFieldUpdateOperationsInput | string
    projectSpaceType?: StringFieldUpdateOperationsInput | string
    projectNature?: StringFieldUpdateOperationsInput | string
    projectDescription?: StringFieldUpdateOperationsInput | string
    decision?: StringFieldUpdateOperationsInput | string
    decisionComment?: StringFieldUpdateOperationsInput | string
    contacts?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ReportToClause?: ReportToClauseUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    meetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    meetLink?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantType?: StringFieldUpdateOperationsInput | string
    projectStatus?: StringFieldUpdateOperationsInput | string
    projectCadastralRef?: StringFieldUpdateOperationsInput | string
    projectLandContact?: StringFieldUpdateOperationsInput | string
    projectSpaceType?: StringFieldUpdateOperationsInput | string
    projectNature?: StringFieldUpdateOperationsInput | string
    projectDescription?: StringFieldUpdateOperationsInput | string
    decision?: StringFieldUpdateOperationsInput | string
    decisionComment?: StringFieldUpdateOperationsInput | string
    contacts?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ReportToClause?: ReportToClauseUncheckedUpdateManyWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateManyWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    meetDate?: DateTimeFieldUpdateOperationsInput | Date | string
    meetLink?: StringFieldUpdateOperationsInput | string
    applicantName?: StringFieldUpdateOperationsInput | string
    applicantType?: StringFieldUpdateOperationsInput | string
    projectStatus?: StringFieldUpdateOperationsInput | string
    projectCadastralRef?: StringFieldUpdateOperationsInput | string
    projectLandContact?: StringFieldUpdateOperationsInput | string
    projectSpaceType?: StringFieldUpdateOperationsInput | string
    projectNature?: StringFieldUpdateOperationsInput | string
    projectDescription?: StringFieldUpdateOperationsInput | string
    decision?: StringFieldUpdateOperationsInput | string
    decisionComment?: StringFieldUpdateOperationsInput | string
    contacts?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
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