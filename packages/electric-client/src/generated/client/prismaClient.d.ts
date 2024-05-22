
/**
 * Client
**/

import * as runtime from './runtime/library';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions

export type PrismaPromise<T> = $Public.PrismaPromise<T>


export type ClausePayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Clause"
  objects: {}
  scalars: $Extensions.GetResult<{
    key: string
    value: string
    udap_id: string
    text: string
  }, ExtArgs["result"]["clause"]>
  composites: {}
}

/**
 * Model Clause
 * 
 */
export type Clause = runtime.Types.DefaultSelection<ClausePayload>
export type DelegationPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Delegation"
  objects: {
    user_delegation_createdByTouser: UserPayload<ExtArgs>
    user_delegation_delegatedToTouser: UserPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    createdBy: string
    delegatedTo: string
  }, ExtArgs["result"]["delegation"]>
  composites: {}
}

/**
 * Model Delegation
 * 
 */
export type Delegation = runtime.Types.DefaultSelection<DelegationPayload>
export type ReportPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Report"
  objects: {
    user: UserPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: string
    title: string | null
    projectDescription: string | null
    redactedBy: string | null
    meetDate: Date | null
    applicantName: string | null
    applicantAddress: string | null
    projectCadastralRef: string | null
    projectSpaceType: string | null
    decision: string | null
    precisions: string | null
    contacts: string | null
    furtherInformation: string | null
    createdBy: string
    createdAt: Date
    /**
     * @zod.number.int().gte(-2147483648).lte(2147483647)
     */
    serviceInstructeur: number | null
    pdf: string | null
    disabled: boolean | null
    udap_id: string | null
  }, ExtArgs["result"]["report"]>
  composites: {}
}

/**
 * Model Report
 * 
 */
export type Report = runtime.Types.DefaultSelection<ReportPayload>
export type UdapPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Udap"
  objects: {
    user: UserPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    department: string
    completeCoords: string | null
    visible: boolean | null
    name: string | null
    address: string | null
    zipCode: string | null
    city: string | null
    phone: string | null
    email: string | null
  }, ExtArgs["result"]["udap"]>
  composites: {}
}

/**
 * Model Udap
 * 
 */
export type Udap = runtime.Types.DefaultSelection<UdapPayload>
export type UserPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "User"
  objects: {
    delegation_delegation_createdByTouser: DelegationPayload<ExtArgs>[]
    delegation_delegation_delegatedToTouser: DelegationPayload<ExtArgs>[]
    report: ReportPayload<ExtArgs>[]
    udap: UdapPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: string
    name: string
    udap_id: string
  }, ExtArgs["result"]["user"]>
  composites: {}
}

/**
 * Model User
 * 
 */
export type User = runtime.Types.DefaultSelection<UserPayload>

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
   * `prisma.clause`: Exposes CRUD operations for the **Clause** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clauses
    * const clauses = await prisma.clause.findMany()
    * ```
    */
  get clause(): Prisma.ClauseDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.delegation`: Exposes CRUD operations for the **Delegation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Delegations
    * const delegations = await prisma.delegation.findMany()
    * ```
    */
  get delegation(): Prisma.DelegationDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.report`: Exposes CRUD operations for the **Report** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reports
    * const reports = await prisma.report.findMany()
    * ```
    */
  get report(): Prisma.ReportDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.udap`: Exposes CRUD operations for the **Udap** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Udaps
    * const udaps = await prisma.udap.findMany()
    * ```
    */
  get udap(): Prisma.UdapDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<GlobalReject, ExtArgs>;
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
    Clause: 'Clause',
    Delegation: 'Delegation',
    Report: 'Report',
    Udap: 'Udap',
    User: 'User'
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
      modelProps: 'clause' | 'delegation' | 'report' | 'udap' | 'user'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      Clause: {
        payload: ClausePayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.ClauseFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ClausePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClauseFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ClausePayload>
          }
          findFirst: {
            args: Prisma.ClauseFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ClausePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClauseFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ClausePayload>
          }
          findMany: {
            args: Prisma.ClauseFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ClausePayload>[]
          }
          create: {
            args: Prisma.ClauseCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ClausePayload>
          }
          createMany: {
            args: Prisma.ClauseCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ClauseDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ClausePayload>
          }
          update: {
            args: Prisma.ClauseUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ClausePayload>
          }
          deleteMany: {
            args: Prisma.ClauseDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ClauseUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ClauseUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ClausePayload>
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
            args: Prisma.ClauseCountArgs<ExtArgs>,
            result: $Utils.Optional<ClauseCountAggregateOutputType> | number
          }
        }
      }
      Delegation: {
        payload: DelegationPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.DelegationFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<DelegationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DelegationFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<DelegationPayload>
          }
          findFirst: {
            args: Prisma.DelegationFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<DelegationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DelegationFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<DelegationPayload>
          }
          findMany: {
            args: Prisma.DelegationFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<DelegationPayload>[]
          }
          create: {
            args: Prisma.DelegationCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<DelegationPayload>
          }
          createMany: {
            args: Prisma.DelegationCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.DelegationDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<DelegationPayload>
          }
          update: {
            args: Prisma.DelegationUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<DelegationPayload>
          }
          deleteMany: {
            args: Prisma.DelegationDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.DelegationUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.DelegationUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<DelegationPayload>
          }
          aggregate: {
            args: Prisma.DelegationAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateDelegation>
          }
          groupBy: {
            args: Prisma.DelegationGroupByArgs<ExtArgs>,
            result: $Utils.Optional<DelegationGroupByOutputType>[]
          }
          count: {
            args: Prisma.DelegationCountArgs<ExtArgs>,
            result: $Utils.Optional<DelegationCountAggregateOutputType> | number
          }
        }
      }
      Report: {
        payload: ReportPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.ReportFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ReportPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReportFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ReportPayload>
          }
          findFirst: {
            args: Prisma.ReportFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ReportPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReportFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ReportPayload>
          }
          findMany: {
            args: Prisma.ReportFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ReportPayload>[]
          }
          create: {
            args: Prisma.ReportCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ReportPayload>
          }
          createMany: {
            args: Prisma.ReportCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ReportDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ReportPayload>
          }
          update: {
            args: Prisma.ReportUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ReportPayload>
          }
          deleteMany: {
            args: Prisma.ReportDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ReportUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ReportUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<ReportPayload>
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
            args: Prisma.ReportCountArgs<ExtArgs>,
            result: $Utils.Optional<ReportCountAggregateOutputType> | number
          }
        }
      }
      Udap: {
        payload: UdapPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.UdapFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UdapPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UdapFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UdapPayload>
          }
          findFirst: {
            args: Prisma.UdapFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UdapPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UdapFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UdapPayload>
          }
          findMany: {
            args: Prisma.UdapFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UdapPayload>[]
          }
          create: {
            args: Prisma.UdapCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UdapPayload>
          }
          createMany: {
            args: Prisma.UdapCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UdapDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UdapPayload>
          }
          update: {
            args: Prisma.UdapUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UdapPayload>
          }
          deleteMany: {
            args: Prisma.UdapDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UdapUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UdapUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UdapPayload>
          }
          aggregate: {
            args: Prisma.UdapAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUdap>
          }
          groupBy: {
            args: Prisma.UdapGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UdapGroupByOutputType>[]
          }
          count: {
            args: Prisma.UdapCountArgs<ExtArgs>,
            result: $Utils.Optional<UdapCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: UserPayload<ExtArgs>
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>,
            result: $Utils.Optional<UserCountAggregateOutputType> | number
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
   * Count Type UdapCountOutputType
   */


  export type UdapCountOutputType = {
    user: number
  }

  export type UdapCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    user?: boolean | UdapCountOutputTypeCountUserArgs
  }

  // Custom InputTypes

  /**
   * UdapCountOutputType without action
   */
  export type UdapCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UdapCountOutputType
     */
    select?: UdapCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * UdapCountOutputType without action
   */
  export type UdapCountOutputTypeCountUserArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }



  /**
   * Count Type UserCountOutputType
   */


  export type UserCountOutputType = {
    delegation_delegation_createdByTouser: number
    delegation_delegation_delegatedToTouser: number
    report: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    delegation_delegation_createdByTouser?: boolean | UserCountOutputTypeCountDelegation_delegation_createdByTouserArgs
    delegation_delegation_delegatedToTouser?: boolean | UserCountOutputTypeCountDelegation_delegation_delegatedToTouserArgs
    report?: boolean | UserCountOutputTypeCountReportArgs
  }

  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDelegation_delegation_createdByTouserArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: DelegationWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDelegation_delegation_delegatedToTouserArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: DelegationWhereInput
  }


  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReportArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ReportWhereInput
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
    key: string | null
    value: string | null
    udap_id: string | null
    text: string | null
  }

  export type ClauseMaxAggregateOutputType = {
    key: string | null
    value: string | null
    udap_id: string | null
    text: string | null
  }

  export type ClauseCountAggregateOutputType = {
    key: number
    value: number
    udap_id: number
    text: number
    _all: number
  }


  export type ClauseMinAggregateInputType = {
    key?: true
    value?: true
    udap_id?: true
    text?: true
  }

  export type ClauseMaxAggregateInputType = {
    key?: true
    value?: true
    udap_id?: true
    text?: true
  }

  export type ClauseCountAggregateInputType = {
    key?: true
    value?: true
    udap_id?: true
    text?: true
    _all?: true
  }

  export type ClauseAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clause to aggregate.
     */
    where?: ClauseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clauses to fetch.
     */
    orderBy?: Enumerable<ClauseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClauseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clauses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clauses.
     */
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




  export type ClauseGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: ClauseWhereInput
    orderBy?: Enumerable<ClauseOrderByWithAggregationInput>
    by: ClauseScalarFieldEnum[]
    having?: ClauseScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClauseCountAggregateInputType | true
    _min?: ClauseMinAggregateInputType
    _max?: ClauseMaxAggregateInputType
  }


  export type ClauseGroupByOutputType = {
    key: string
    value: string
    udap_id: string
    text: string
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


  export type ClauseSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    value?: boolean
    udap_id?: boolean
    text?: boolean
  }, ExtArgs["result"]["clause"]>

  export type ClauseSelectScalar = {
    key?: boolean
    value?: boolean
    udap_id?: boolean
    text?: boolean
  }


  type ClauseGetPayload<S extends boolean | null | undefined | ClauseArgs> = $Types.GetResult<ClausePayload, S>

  type ClauseCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<ClauseFindManyArgs, 'select' | 'include'> & {
      select?: ClauseCountAggregateInputType | true
    }

  export interface ClauseDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Clause'], meta: { name: 'Clause' } }
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
    findUnique<T extends ClauseFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ClauseFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Clause'> extends True ? Prisma__ClauseClient<$Types.GetResult<ClausePayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__ClauseClient<$Types.GetResult<ClausePayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

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
    findUniqueOrThrow<T extends ClauseFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ClauseFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ClauseClient<$Types.GetResult<ClausePayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

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
    findFirst<T extends ClauseFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ClauseFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Clause'> extends True ? Prisma__ClauseClient<$Types.GetResult<ClausePayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__ClauseClient<$Types.GetResult<ClausePayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

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
    findFirstOrThrow<T extends ClauseFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ClauseFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ClauseClient<$Types.GetResult<ClausePayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

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
     * // Only select the `key`
     * const clauseWithKeyOnly = await prisma.clause.findMany({ select: { key: true } })
     * 
    **/
    findMany<T extends ClauseFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ClauseFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<ClausePayload<ExtArgs>, T, 'findMany', never>>

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
    create<T extends ClauseCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ClauseCreateArgs<ExtArgs>>
    ): Prisma__ClauseClient<$Types.GetResult<ClausePayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

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
    createMany<T extends ClauseCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ClauseCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    delete<T extends ClauseDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ClauseDeleteArgs<ExtArgs>>
    ): Prisma__ClauseClient<$Types.GetResult<ClausePayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

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
    update<T extends ClauseUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ClauseUpdateArgs<ExtArgs>>
    ): Prisma__ClauseClient<$Types.GetResult<ClausePayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

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
    deleteMany<T extends ClauseDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ClauseDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    updateMany<T extends ClauseUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ClauseUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    upsert<T extends ClauseUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ClauseUpsertArgs<ExtArgs>>
    ): Prisma__ClauseClient<$Types.GetResult<ClausePayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

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
   * The delegate class that acts as a "Promise-like" for Clause.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ClauseClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
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
   * Clause base type for findUnique actions
   */
  export type ClauseFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clause
     */
    select?: ClauseSelect<ExtArgs> | null
    /**
     * Filter, which Clause to fetch.
     */
    where: ClauseWhereUniqueInput
  }

  /**
   * Clause findUnique
   */
  export interface ClauseFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends ClauseFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Clause findUniqueOrThrow
   */
  export type ClauseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clause
     */
    select?: ClauseSelect<ExtArgs> | null
    /**
     * Filter, which Clause to fetch.
     */
    where: ClauseWhereUniqueInput
  }


  /**
   * Clause base type for findFirst actions
   */
  export type ClauseFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clause
     */
    select?: ClauseSelect<ExtArgs> | null
    /**
     * Filter, which Clause to fetch.
     */
    where?: ClauseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clauses to fetch.
     */
    orderBy?: Enumerable<ClauseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clauses.
     */
    cursor?: ClauseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clauses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clauses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clauses.
     */
    distinct?: Enumerable<ClauseScalarFieldEnum>
  }

  /**
   * Clause findFirst
   */
  export interface ClauseFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends ClauseFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Clause findFirstOrThrow
   */
  export type ClauseFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clause
     */
    select?: ClauseSelect<ExtArgs> | null
    /**
     * Filter, which Clause to fetch.
     */
    where?: ClauseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clauses to fetch.
     */
    orderBy?: Enumerable<ClauseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clauses.
     */
    cursor?: ClauseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clauses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clauses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clauses.
     */
    distinct?: Enumerable<ClauseScalarFieldEnum>
  }


  /**
   * Clause findMany
   */
  export type ClauseFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clause
     */
    select?: ClauseSelect<ExtArgs> | null
    /**
     * Filter, which Clauses to fetch.
     */
    where?: ClauseWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clauses to fetch.
     */
    orderBy?: Enumerable<ClauseOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clauses.
     */
    cursor?: ClauseWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clauses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clauses.
     */
    skip?: number
    distinct?: Enumerable<ClauseScalarFieldEnum>
  }


  /**
   * Clause create
   */
  export type ClauseCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clause
     */
    select?: ClauseSelect<ExtArgs> | null
    /**
     * The data needed to create a Clause.
     */
    data: XOR<ClauseCreateInput, ClauseUncheckedCreateInput>
  }


  /**
   * Clause createMany
   */
  export type ClauseCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clauses.
     */
    data: Enumerable<ClauseCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Clause update
   */
  export type ClauseUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clause
     */
    select?: ClauseSelect<ExtArgs> | null
    /**
     * The data needed to update a Clause.
     */
    data: XOR<ClauseUpdateInput, ClauseUncheckedUpdateInput>
    /**
     * Choose, which Clause to update.
     */
    where: ClauseWhereUniqueInput
  }


  /**
   * Clause updateMany
   */
  export type ClauseUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clauses.
     */
    data: XOR<ClauseUpdateManyMutationInput, ClauseUncheckedUpdateManyInput>
    /**
     * Filter which Clauses to update
     */
    where?: ClauseWhereInput
  }


  /**
   * Clause upsert
   */
  export type ClauseUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clause
     */
    select?: ClauseSelect<ExtArgs> | null
    /**
     * The filter to search for the Clause to update in case it exists.
     */
    where: ClauseWhereUniqueInput
    /**
     * In case the Clause found by the `where` argument doesn't exist, create a new Clause with this data.
     */
    create: XOR<ClauseCreateInput, ClauseUncheckedCreateInput>
    /**
     * In case the Clause was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClauseUpdateInput, ClauseUncheckedUpdateInput>
  }


  /**
   * Clause delete
   */
  export type ClauseDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clause
     */
    select?: ClauseSelect<ExtArgs> | null
    /**
     * Filter which Clause to delete.
     */
    where: ClauseWhereUniqueInput
  }


  /**
   * Clause deleteMany
   */
  export type ClauseDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clauses to delete
     */
    where?: ClauseWhereInput
  }


  /**
   * Clause without action
   */
  export type ClauseArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Clause
     */
    select?: ClauseSelect<ExtArgs> | null
  }



  /**
   * Model Delegation
   */


  export type AggregateDelegation = {
    _count: DelegationCountAggregateOutputType | null
    _min: DelegationMinAggregateOutputType | null
    _max: DelegationMaxAggregateOutputType | null
  }

  export type DelegationMinAggregateOutputType = {
    createdBy: string | null
    delegatedTo: string | null
  }

  export type DelegationMaxAggregateOutputType = {
    createdBy: string | null
    delegatedTo: string | null
  }

  export type DelegationCountAggregateOutputType = {
    createdBy: number
    delegatedTo: number
    _all: number
  }


  export type DelegationMinAggregateInputType = {
    createdBy?: true
    delegatedTo?: true
  }

  export type DelegationMaxAggregateInputType = {
    createdBy?: true
    delegatedTo?: true
  }

  export type DelegationCountAggregateInputType = {
    createdBy?: true
    delegatedTo?: true
    _all?: true
  }

  export type DelegationAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Delegation to aggregate.
     */
    where?: DelegationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Delegations to fetch.
     */
    orderBy?: Enumerable<DelegationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DelegationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Delegations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Delegations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Delegations
    **/
    _count?: true | DelegationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DelegationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DelegationMaxAggregateInputType
  }

  export type GetDelegationAggregateType<T extends DelegationAggregateArgs> = {
        [P in keyof T & keyof AggregateDelegation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDelegation[P]>
      : GetScalarType<T[P], AggregateDelegation[P]>
  }




  export type DelegationGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: DelegationWhereInput
    orderBy?: Enumerable<DelegationOrderByWithAggregationInput>
    by: DelegationScalarFieldEnum[]
    having?: DelegationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DelegationCountAggregateInputType | true
    _min?: DelegationMinAggregateInputType
    _max?: DelegationMaxAggregateInputType
  }


  export type DelegationGroupByOutputType = {
    createdBy: string
    delegatedTo: string
    _count: DelegationCountAggregateOutputType | null
    _min: DelegationMinAggregateOutputType | null
    _max: DelegationMaxAggregateOutputType | null
  }

  type GetDelegationGroupByPayload<T extends DelegationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<DelegationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DelegationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DelegationGroupByOutputType[P]>
            : GetScalarType<T[P], DelegationGroupByOutputType[P]>
        }
      >
    >


  export type DelegationSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    createdBy?: boolean
    delegatedTo?: boolean
    user_delegation_createdByTouser?: boolean | UserArgs<ExtArgs>
    user_delegation_delegatedToTouser?: boolean | UserArgs<ExtArgs>
  }, ExtArgs["result"]["delegation"]>

  export type DelegationSelectScalar = {
    createdBy?: boolean
    delegatedTo?: boolean
  }

  export type DelegationInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    user_delegation_createdByTouser?: boolean | UserArgs<ExtArgs>
    user_delegation_delegatedToTouser?: boolean | UserArgs<ExtArgs>
  }


  type DelegationGetPayload<S extends boolean | null | undefined | DelegationArgs> = $Types.GetResult<DelegationPayload, S>

  type DelegationCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<DelegationFindManyArgs, 'select' | 'include'> & {
      select?: DelegationCountAggregateInputType | true
    }

  export interface DelegationDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Delegation'], meta: { name: 'Delegation' } }
    /**
     * Find zero or one Delegation that matches the filter.
     * @param {DelegationFindUniqueArgs} args - Arguments to find a Delegation
     * @example
     * // Get one Delegation
     * const delegation = await prisma.delegation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DelegationFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, DelegationFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Delegation'> extends True ? Prisma__DelegationClient<$Types.GetResult<DelegationPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__DelegationClient<$Types.GetResult<DelegationPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Delegation that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {DelegationFindUniqueOrThrowArgs} args - Arguments to find a Delegation
     * @example
     * // Get one Delegation
     * const delegation = await prisma.delegation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends DelegationFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, DelegationFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__DelegationClient<$Types.GetResult<DelegationPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Delegation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegationFindFirstArgs} args - Arguments to find a Delegation
     * @example
     * // Get one Delegation
     * const delegation = await prisma.delegation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DelegationFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, DelegationFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Delegation'> extends True ? Prisma__DelegationClient<$Types.GetResult<DelegationPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__DelegationClient<$Types.GetResult<DelegationPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Delegation that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegationFindFirstOrThrowArgs} args - Arguments to find a Delegation
     * @example
     * // Get one Delegation
     * const delegation = await prisma.delegation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends DelegationFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, DelegationFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__DelegationClient<$Types.GetResult<DelegationPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Delegations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegationFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Delegations
     * const delegations = await prisma.delegation.findMany()
     * 
     * // Get first 10 Delegations
     * const delegations = await prisma.delegation.findMany({ take: 10 })
     * 
     * // Only select the `createdBy`
     * const delegationWithCreatedByOnly = await prisma.delegation.findMany({ select: { createdBy: true } })
     * 
    **/
    findMany<T extends DelegationFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, DelegationFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<DelegationPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Delegation.
     * @param {DelegationCreateArgs} args - Arguments to create a Delegation.
     * @example
     * // Create one Delegation
     * const Delegation = await prisma.delegation.create({
     *   data: {
     *     // ... data to create a Delegation
     *   }
     * })
     * 
    **/
    create<T extends DelegationCreateArgs<ExtArgs>>(
      args: SelectSubset<T, DelegationCreateArgs<ExtArgs>>
    ): Prisma__DelegationClient<$Types.GetResult<DelegationPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Delegations.
     *     @param {DelegationCreateManyArgs} args - Arguments to create many Delegations.
     *     @example
     *     // Create many Delegations
     *     const delegation = await prisma.delegation.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends DelegationCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, DelegationCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Delegation.
     * @param {DelegationDeleteArgs} args - Arguments to delete one Delegation.
     * @example
     * // Delete one Delegation
     * const Delegation = await prisma.delegation.delete({
     *   where: {
     *     // ... filter to delete one Delegation
     *   }
     * })
     * 
    **/
    delete<T extends DelegationDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, DelegationDeleteArgs<ExtArgs>>
    ): Prisma__DelegationClient<$Types.GetResult<DelegationPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Delegation.
     * @param {DelegationUpdateArgs} args - Arguments to update one Delegation.
     * @example
     * // Update one Delegation
     * const delegation = await prisma.delegation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DelegationUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, DelegationUpdateArgs<ExtArgs>>
    ): Prisma__DelegationClient<$Types.GetResult<DelegationPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Delegations.
     * @param {DelegationDeleteManyArgs} args - Arguments to filter Delegations to delete.
     * @example
     * // Delete a few Delegations
     * const { count } = await prisma.delegation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DelegationDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, DelegationDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Delegations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Delegations
     * const delegation = await prisma.delegation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DelegationUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, DelegationUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Delegation.
     * @param {DelegationUpsertArgs} args - Arguments to update or create a Delegation.
     * @example
     * // Update or create a Delegation
     * const delegation = await prisma.delegation.upsert({
     *   create: {
     *     // ... data to create a Delegation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Delegation we want to update
     *   }
     * })
    **/
    upsert<T extends DelegationUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, DelegationUpsertArgs<ExtArgs>>
    ): Prisma__DelegationClient<$Types.GetResult<DelegationPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Delegations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegationCountArgs} args - Arguments to filter Delegations to count.
     * @example
     * // Count the number of Delegations
     * const count = await prisma.delegation.count({
     *   where: {
     *     // ... the filter for the Delegations we want to count
     *   }
     * })
    **/
    count<T extends DelegationCountArgs>(
      args?: Subset<T, DelegationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DelegationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Delegation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DelegationAggregateArgs>(args: Subset<T, DelegationAggregateArgs>): Prisma.PrismaPromise<GetDelegationAggregateType<T>>

    /**
     * Group by Delegation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DelegationGroupByArgs} args - Group by arguments.
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
      T extends DelegationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DelegationGroupByArgs['orderBy'] }
        : { orderBy?: DelegationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DelegationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDelegationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Delegation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__DelegationClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
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

    user_delegation_createdByTouser<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    user_delegation_delegatedToTouser<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

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
   * Delegation base type for findUnique actions
   */
  export type DelegationFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegation
     */
    select?: DelegationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DelegationInclude<ExtArgs> | null
    /**
     * Filter, which Delegation to fetch.
     */
    where: DelegationWhereUniqueInput
  }

  /**
   * Delegation findUnique
   */
  export interface DelegationFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends DelegationFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Delegation findUniqueOrThrow
   */
  export type DelegationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegation
     */
    select?: DelegationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DelegationInclude<ExtArgs> | null
    /**
     * Filter, which Delegation to fetch.
     */
    where: DelegationWhereUniqueInput
  }


  /**
   * Delegation base type for findFirst actions
   */
  export type DelegationFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegation
     */
    select?: DelegationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DelegationInclude<ExtArgs> | null
    /**
     * Filter, which Delegation to fetch.
     */
    where?: DelegationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Delegations to fetch.
     */
    orderBy?: Enumerable<DelegationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Delegations.
     */
    cursor?: DelegationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Delegations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Delegations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Delegations.
     */
    distinct?: Enumerable<DelegationScalarFieldEnum>
  }

  /**
   * Delegation findFirst
   */
  export interface DelegationFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends DelegationFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Delegation findFirstOrThrow
   */
  export type DelegationFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegation
     */
    select?: DelegationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DelegationInclude<ExtArgs> | null
    /**
     * Filter, which Delegation to fetch.
     */
    where?: DelegationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Delegations to fetch.
     */
    orderBy?: Enumerable<DelegationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Delegations.
     */
    cursor?: DelegationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Delegations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Delegations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Delegations.
     */
    distinct?: Enumerable<DelegationScalarFieldEnum>
  }


  /**
   * Delegation findMany
   */
  export type DelegationFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegation
     */
    select?: DelegationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DelegationInclude<ExtArgs> | null
    /**
     * Filter, which Delegations to fetch.
     */
    where?: DelegationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Delegations to fetch.
     */
    orderBy?: Enumerable<DelegationOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Delegations.
     */
    cursor?: DelegationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Delegations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Delegations.
     */
    skip?: number
    distinct?: Enumerable<DelegationScalarFieldEnum>
  }


  /**
   * Delegation create
   */
  export type DelegationCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegation
     */
    select?: DelegationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DelegationInclude<ExtArgs> | null
    /**
     * The data needed to create a Delegation.
     */
    data: XOR<DelegationCreateInput, DelegationUncheckedCreateInput>
  }


  /**
   * Delegation createMany
   */
  export type DelegationCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Delegations.
     */
    data: Enumerable<DelegationCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Delegation update
   */
  export type DelegationUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegation
     */
    select?: DelegationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DelegationInclude<ExtArgs> | null
    /**
     * The data needed to update a Delegation.
     */
    data: XOR<DelegationUpdateInput, DelegationUncheckedUpdateInput>
    /**
     * Choose, which Delegation to update.
     */
    where: DelegationWhereUniqueInput
  }


  /**
   * Delegation updateMany
   */
  export type DelegationUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Delegations.
     */
    data: XOR<DelegationUpdateManyMutationInput, DelegationUncheckedUpdateManyInput>
    /**
     * Filter which Delegations to update
     */
    where?: DelegationWhereInput
  }


  /**
   * Delegation upsert
   */
  export type DelegationUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegation
     */
    select?: DelegationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DelegationInclude<ExtArgs> | null
    /**
     * The filter to search for the Delegation to update in case it exists.
     */
    where: DelegationWhereUniqueInput
    /**
     * In case the Delegation found by the `where` argument doesn't exist, create a new Delegation with this data.
     */
    create: XOR<DelegationCreateInput, DelegationUncheckedCreateInput>
    /**
     * In case the Delegation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DelegationUpdateInput, DelegationUncheckedUpdateInput>
  }


  /**
   * Delegation delete
   */
  export type DelegationDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegation
     */
    select?: DelegationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DelegationInclude<ExtArgs> | null
    /**
     * Filter which Delegation to delete.
     */
    where: DelegationWhereUniqueInput
  }


  /**
   * Delegation deleteMany
   */
  export type DelegationDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Delegations to delete
     */
    where?: DelegationWhereInput
  }


  /**
   * Delegation without action
   */
  export type DelegationArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegation
     */
    select?: DelegationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DelegationInclude<ExtArgs> | null
  }



  /**
   * Model Report
   */


  export type AggregateReport = {
    _count: ReportCountAggregateOutputType | null
    _avg: ReportAvgAggregateOutputType | null
    _sum: ReportSumAggregateOutputType | null
    _min: ReportMinAggregateOutputType | null
    _max: ReportMaxAggregateOutputType | null
  }

  export type ReportAvgAggregateOutputType = {
    serviceInstructeur: number | null
  }

  export type ReportSumAggregateOutputType = {
    serviceInstructeur: number | null
  }

  export type ReportMinAggregateOutputType = {
    id: string | null
    title: string | null
    projectDescription: string | null
    redactedBy: string | null
    meetDate: Date | null
    applicantName: string | null
    applicantAddress: string | null
    projectCadastralRef: string | null
    projectSpaceType: string | null
    decision: string | null
    precisions: string | null
    contacts: string | null
    furtherInformation: string | null
    createdBy: string | null
    createdAt: Date | null
    serviceInstructeur: number | null
    pdf: string | null
    disabled: boolean | null
    udap_id: string | null
  }

  export type ReportMaxAggregateOutputType = {
    id: string | null
    title: string | null
    projectDescription: string | null
    redactedBy: string | null
    meetDate: Date | null
    applicantName: string | null
    applicantAddress: string | null
    projectCadastralRef: string | null
    projectSpaceType: string | null
    decision: string | null
    precisions: string | null
    contacts: string | null
    furtherInformation: string | null
    createdBy: string | null
    createdAt: Date | null
    serviceInstructeur: number | null
    pdf: string | null
    disabled: boolean | null
    udap_id: string | null
  }

  export type ReportCountAggregateOutputType = {
    id: number
    title: number
    projectDescription: number
    redactedBy: number
    meetDate: number
    applicantName: number
    applicantAddress: number
    projectCadastralRef: number
    projectSpaceType: number
    decision: number
    precisions: number
    contacts: number
    furtherInformation: number
    createdBy: number
    createdAt: number
    serviceInstructeur: number
    pdf: number
    disabled: number
    udap_id: number
    _all: number
  }


  export type ReportAvgAggregateInputType = {
    serviceInstructeur?: true
  }

  export type ReportSumAggregateInputType = {
    serviceInstructeur?: true
  }

  export type ReportMinAggregateInputType = {
    id?: true
    title?: true
    projectDescription?: true
    redactedBy?: true
    meetDate?: true
    applicantName?: true
    applicantAddress?: true
    projectCadastralRef?: true
    projectSpaceType?: true
    decision?: true
    precisions?: true
    contacts?: true
    furtherInformation?: true
    createdBy?: true
    createdAt?: true
    serviceInstructeur?: true
    pdf?: true
    disabled?: true
    udap_id?: true
  }

  export type ReportMaxAggregateInputType = {
    id?: true
    title?: true
    projectDescription?: true
    redactedBy?: true
    meetDate?: true
    applicantName?: true
    applicantAddress?: true
    projectCadastralRef?: true
    projectSpaceType?: true
    decision?: true
    precisions?: true
    contacts?: true
    furtherInformation?: true
    createdBy?: true
    createdAt?: true
    serviceInstructeur?: true
    pdf?: true
    disabled?: true
    udap_id?: true
  }

  export type ReportCountAggregateInputType = {
    id?: true
    title?: true
    projectDescription?: true
    redactedBy?: true
    meetDate?: true
    applicantName?: true
    applicantAddress?: true
    projectCadastralRef?: true
    projectSpaceType?: true
    decision?: true
    precisions?: true
    contacts?: true
    furtherInformation?: true
    createdBy?: true
    createdAt?: true
    serviceInstructeur?: true
    pdf?: true
    disabled?: true
    udap_id?: true
    _all?: true
  }

  export type ReportAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Report to aggregate.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: Enumerable<ReportOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
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
     * Select which fields to average
    **/
    _avg?: ReportAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReportSumAggregateInputType
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
    where?: ReportWhereInput
    orderBy?: Enumerable<ReportOrderByWithAggregationInput>
    by: ReportScalarFieldEnum[]
    having?: ReportScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReportCountAggregateInputType | true
    _avg?: ReportAvgAggregateInputType
    _sum?: ReportSumAggregateInputType
    _min?: ReportMinAggregateInputType
    _max?: ReportMaxAggregateInputType
  }


  export type ReportGroupByOutputType = {
    id: string
    title: string | null
    projectDescription: string | null
    redactedBy: string | null
    meetDate: Date | null
    applicantName: string | null
    applicantAddress: string | null
    projectCadastralRef: string | null
    projectSpaceType: string | null
    decision: string | null
    precisions: string | null
    contacts: string | null
    furtherInformation: string | null
    createdBy: string
    createdAt: Date
    serviceInstructeur: number | null
    pdf: string | null
    disabled: boolean | null
    udap_id: string | null
    _count: ReportCountAggregateOutputType | null
    _avg: ReportAvgAggregateOutputType | null
    _sum: ReportSumAggregateOutputType | null
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


  export type ReportSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    projectDescription?: boolean
    redactedBy?: boolean
    meetDate?: boolean
    applicantName?: boolean
    applicantAddress?: boolean
    projectCadastralRef?: boolean
    projectSpaceType?: boolean
    decision?: boolean
    precisions?: boolean
    contacts?: boolean
    furtherInformation?: boolean
    createdBy?: boolean
    createdAt?: boolean
    serviceInstructeur?: boolean
    pdf?: boolean
    disabled?: boolean
    udap_id?: boolean
    user?: boolean | UserArgs<ExtArgs>
  }, ExtArgs["result"]["report"]>

  export type ReportSelectScalar = {
    id?: boolean
    title?: boolean
    projectDescription?: boolean
    redactedBy?: boolean
    meetDate?: boolean
    applicantName?: boolean
    applicantAddress?: boolean
    projectCadastralRef?: boolean
    projectSpaceType?: boolean
    decision?: boolean
    precisions?: boolean
    contacts?: boolean
    furtherInformation?: boolean
    createdBy?: boolean
    createdAt?: boolean
    serviceInstructeur?: boolean
    pdf?: boolean
    disabled?: boolean
    udap_id?: boolean
  }

  export type ReportInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    user?: boolean | UserArgs<ExtArgs>
  }


  type ReportGetPayload<S extends boolean | null | undefined | ReportArgs> = $Types.GetResult<ReportPayload, S>

  type ReportCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<ReportFindManyArgs, 'select' | 'include'> & {
      select?: ReportCountAggregateInputType | true
    }

  export interface ReportDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Report'], meta: { name: 'Report' } }
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
    findUnique<T extends ReportFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ReportFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Report'> extends True ? Prisma__ReportClient<$Types.GetResult<ReportPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__ReportClient<$Types.GetResult<ReportPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

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
    findUniqueOrThrow<T extends ReportFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ReportFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ReportClient<$Types.GetResult<ReportPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

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
    findFirst<T extends ReportFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ReportFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Report'> extends True ? Prisma__ReportClient<$Types.GetResult<ReportPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__ReportClient<$Types.GetResult<ReportPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

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
    findFirstOrThrow<T extends ReportFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ReportFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ReportClient<$Types.GetResult<ReportPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

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
    findMany<T extends ReportFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ReportFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<ReportPayload<ExtArgs>, T, 'findMany', never>>

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
    create<T extends ReportCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ReportCreateArgs<ExtArgs>>
    ): Prisma__ReportClient<$Types.GetResult<ReportPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

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
    createMany<T extends ReportCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ReportCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    delete<T extends ReportDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ReportDeleteArgs<ExtArgs>>
    ): Prisma__ReportClient<$Types.GetResult<ReportPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

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
    update<T extends ReportUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ReportUpdateArgs<ExtArgs>>
    ): Prisma__ReportClient<$Types.GetResult<ReportPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

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
    deleteMany<T extends ReportDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ReportDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    updateMany<T extends ReportUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ReportUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    upsert<T extends ReportUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ReportUpsertArgs<ExtArgs>>
    ): Prisma__ReportClient<$Types.GetResult<ReportPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

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
   * The delegate class that acts as a "Promise-like" for Report.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ReportClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
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

    user<T extends UserArgs<ExtArgs> = {}>(args?: Subset<T, UserArgs<ExtArgs>>): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

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
  export type ReportFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }

  /**
   * Report findUnique
   */
  export interface ReportFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends ReportFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Report findUniqueOrThrow
   */
  export type ReportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where: ReportWhereUniqueInput
  }


  /**
   * Report base type for findFirst actions
   */
  export type ReportFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: Enumerable<ReportOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: Enumerable<ReportScalarFieldEnum>
  }

  /**
   * Report findFirst
   */
  export interface ReportFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends ReportFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Report findFirstOrThrow
   */
  export type ReportFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Report to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: Enumerable<ReportOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reports.
     */
    distinct?: Enumerable<ReportScalarFieldEnum>
  }


  /**
   * Report findMany
   */
  export type ReportFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter, which Reports to fetch.
     */
    where?: ReportWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reports to fetch.
     */
    orderBy?: Enumerable<ReportOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reports.
     */
    cursor?: ReportWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reports from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reports.
     */
    skip?: number
    distinct?: Enumerable<ReportScalarFieldEnum>
  }


  /**
   * Report create
   */
  export type ReportCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to create a Report.
     */
    data: XOR<ReportCreateInput, ReportUncheckedCreateInput>
  }


  /**
   * Report createMany
   */
  export type ReportCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reports.
     */
    data: Enumerable<ReportCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Report update
   */
  export type ReportUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The data needed to update a Report.
     */
    data: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
    /**
     * Choose, which Report to update.
     */
    where: ReportWhereUniqueInput
  }


  /**
   * Report updateMany
   */
  export type ReportUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reports.
     */
    data: XOR<ReportUpdateManyMutationInput, ReportUncheckedUpdateManyInput>
    /**
     * Filter which Reports to update
     */
    where?: ReportWhereInput
  }


  /**
   * Report upsert
   */
  export type ReportUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * The filter to search for the Report to update in case it exists.
     */
    where: ReportWhereUniqueInput
    /**
     * In case the Report found by the `where` argument doesn't exist, create a new Report with this data.
     */
    create: XOR<ReportCreateInput, ReportUncheckedCreateInput>
    /**
     * In case the Report was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReportUpdateInput, ReportUncheckedUpdateInput>
  }


  /**
   * Report delete
   */
  export type ReportDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
    /**
     * Filter which Report to delete.
     */
    where: ReportWhereUniqueInput
  }


  /**
   * Report deleteMany
   */
  export type ReportDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reports to delete
     */
    where?: ReportWhereInput
  }


  /**
   * Report without action
   */
  export type ReportArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
  }



  /**
   * Model Udap
   */


  export type AggregateUdap = {
    _count: UdapCountAggregateOutputType | null
    _min: UdapMinAggregateOutputType | null
    _max: UdapMaxAggregateOutputType | null
  }

  export type UdapMinAggregateOutputType = {
    id: string | null
    department: string | null
    completeCoords: string | null
    visible: boolean | null
    name: string | null
    address: string | null
    zipCode: string | null
    city: string | null
    phone: string | null
    email: string | null
  }

  export type UdapMaxAggregateOutputType = {
    id: string | null
    department: string | null
    completeCoords: string | null
    visible: boolean | null
    name: string | null
    address: string | null
    zipCode: string | null
    city: string | null
    phone: string | null
    email: string | null
  }

  export type UdapCountAggregateOutputType = {
    id: number
    department: number
    completeCoords: number
    visible: number
    name: number
    address: number
    zipCode: number
    city: number
    phone: number
    email: number
    _all: number
  }


  export type UdapMinAggregateInputType = {
    id?: true
    department?: true
    completeCoords?: true
    visible?: true
    name?: true
    address?: true
    zipCode?: true
    city?: true
    phone?: true
    email?: true
  }

  export type UdapMaxAggregateInputType = {
    id?: true
    department?: true
    completeCoords?: true
    visible?: true
    name?: true
    address?: true
    zipCode?: true
    city?: true
    phone?: true
    email?: true
  }

  export type UdapCountAggregateInputType = {
    id?: true
    department?: true
    completeCoords?: true
    visible?: true
    name?: true
    address?: true
    zipCode?: true
    city?: true
    phone?: true
    email?: true
    _all?: true
  }

  export type UdapAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Udap to aggregate.
     */
    where?: UdapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Udaps to fetch.
     */
    orderBy?: Enumerable<UdapOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UdapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Udaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Udaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Udaps
    **/
    _count?: true | UdapCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UdapMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UdapMaxAggregateInputType
  }

  export type GetUdapAggregateType<T extends UdapAggregateArgs> = {
        [P in keyof T & keyof AggregateUdap]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUdap[P]>
      : GetScalarType<T[P], AggregateUdap[P]>
  }




  export type UdapGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: UdapWhereInput
    orderBy?: Enumerable<UdapOrderByWithAggregationInput>
    by: UdapScalarFieldEnum[]
    having?: UdapScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UdapCountAggregateInputType | true
    _min?: UdapMinAggregateInputType
    _max?: UdapMaxAggregateInputType
  }


  export type UdapGroupByOutputType = {
    id: string
    department: string
    completeCoords: string | null
    visible: boolean | null
    name: string | null
    address: string | null
    zipCode: string | null
    city: string | null
    phone: string | null
    email: string | null
    _count: UdapCountAggregateOutputType | null
    _min: UdapMinAggregateOutputType | null
    _max: UdapMaxAggregateOutputType | null
  }

  type GetUdapGroupByPayload<T extends UdapGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<UdapGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UdapGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UdapGroupByOutputType[P]>
            : GetScalarType<T[P], UdapGroupByOutputType[P]>
        }
      >
    >


  export type UdapSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    department?: boolean
    completeCoords?: boolean
    visible?: boolean
    name?: boolean
    address?: boolean
    zipCode?: boolean
    city?: boolean
    phone?: boolean
    email?: boolean
    user?: boolean | Udap$userArgs<ExtArgs>
    _count?: boolean | UdapCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["udap"]>

  export type UdapSelectScalar = {
    id?: boolean
    department?: boolean
    completeCoords?: boolean
    visible?: boolean
    name?: boolean
    address?: boolean
    zipCode?: boolean
    city?: boolean
    phone?: boolean
    email?: boolean
  }

  export type UdapInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    user?: boolean | Udap$userArgs<ExtArgs>
    _count?: boolean | UdapCountOutputTypeArgs<ExtArgs>
  }


  type UdapGetPayload<S extends boolean | null | undefined | UdapArgs> = $Types.GetResult<UdapPayload, S>

  type UdapCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<UdapFindManyArgs, 'select' | 'include'> & {
      select?: UdapCountAggregateInputType | true
    }

  export interface UdapDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Udap'], meta: { name: 'Udap' } }
    /**
     * Find zero or one Udap that matches the filter.
     * @param {UdapFindUniqueArgs} args - Arguments to find a Udap
     * @example
     * // Get one Udap
     * const udap = await prisma.udap.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UdapFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UdapFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Udap'> extends True ? Prisma__UdapClient<$Types.GetResult<UdapPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__UdapClient<$Types.GetResult<UdapPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

    /**
     * Find one Udap that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UdapFindUniqueOrThrowArgs} args - Arguments to find a Udap
     * @example
     * // Get one Udap
     * const udap = await prisma.udap.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UdapFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UdapFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UdapClient<$Types.GetResult<UdapPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

    /**
     * Find the first Udap that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UdapFindFirstArgs} args - Arguments to find a Udap
     * @example
     * // Get one Udap
     * const udap = await prisma.udap.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UdapFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UdapFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Udap'> extends True ? Prisma__UdapClient<$Types.GetResult<UdapPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__UdapClient<$Types.GetResult<UdapPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Udap that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UdapFindFirstOrThrowArgs} args - Arguments to find a Udap
     * @example
     * // Get one Udap
     * const udap = await prisma.udap.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UdapFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UdapFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UdapClient<$Types.GetResult<UdapPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

    /**
     * Find zero or more Udaps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UdapFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Udaps
     * const udaps = await prisma.udap.findMany()
     * 
     * // Get first 10 Udaps
     * const udaps = await prisma.udap.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const udapWithIdOnly = await prisma.udap.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UdapFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UdapFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<UdapPayload<ExtArgs>, T, 'findMany', never>>

    /**
     * Create a Udap.
     * @param {UdapCreateArgs} args - Arguments to create a Udap.
     * @example
     * // Create one Udap
     * const Udap = await prisma.udap.create({
     *   data: {
     *     // ... data to create a Udap
     *   }
     * })
     * 
    **/
    create<T extends UdapCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UdapCreateArgs<ExtArgs>>
    ): Prisma__UdapClient<$Types.GetResult<UdapPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

    /**
     * Create many Udaps.
     *     @param {UdapCreateManyArgs} args - Arguments to create many Udaps.
     *     @example
     *     // Create many Udaps
     *     const udap = await prisma.udap.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UdapCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UdapCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Udap.
     * @param {UdapDeleteArgs} args - Arguments to delete one Udap.
     * @example
     * // Delete one Udap
     * const Udap = await prisma.udap.delete({
     *   where: {
     *     // ... filter to delete one Udap
     *   }
     * })
     * 
    **/
    delete<T extends UdapDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UdapDeleteArgs<ExtArgs>>
    ): Prisma__UdapClient<$Types.GetResult<UdapPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

    /**
     * Update one Udap.
     * @param {UdapUpdateArgs} args - Arguments to update one Udap.
     * @example
     * // Update one Udap
     * const udap = await prisma.udap.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UdapUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UdapUpdateArgs<ExtArgs>>
    ): Prisma__UdapClient<$Types.GetResult<UdapPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

    /**
     * Delete zero or more Udaps.
     * @param {UdapDeleteManyArgs} args - Arguments to filter Udaps to delete.
     * @example
     * // Delete a few Udaps
     * const { count } = await prisma.udap.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UdapDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UdapDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Udaps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UdapUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Udaps
     * const udap = await prisma.udap.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UdapUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UdapUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Udap.
     * @param {UdapUpsertArgs} args - Arguments to update or create a Udap.
     * @example
     * // Update or create a Udap
     * const udap = await prisma.udap.upsert({
     *   create: {
     *     // ... data to create a Udap
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Udap we want to update
     *   }
     * })
    **/
    upsert<T extends UdapUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UdapUpsertArgs<ExtArgs>>
    ): Prisma__UdapClient<$Types.GetResult<UdapPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

    /**
     * Count the number of Udaps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UdapCountArgs} args - Arguments to filter Udaps to count.
     * @example
     * // Count the number of Udaps
     * const count = await prisma.udap.count({
     *   where: {
     *     // ... the filter for the Udaps we want to count
     *   }
     * })
    **/
    count<T extends UdapCountArgs>(
      args?: Subset<T, UdapCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UdapCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Udap.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UdapAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UdapAggregateArgs>(args: Subset<T, UdapAggregateArgs>): Prisma.PrismaPromise<GetUdapAggregateType<T>>

    /**
     * Group by Udap.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UdapGroupByArgs} args - Group by arguments.
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
      T extends UdapGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UdapGroupByArgs['orderBy'] }
        : { orderBy?: UdapGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UdapGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUdapGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for Udap.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UdapClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
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

    user<T extends Udap$userArgs<ExtArgs> = {}>(args?: Subset<T, Udap$userArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<UserPayload<ExtArgs>, T, 'findMany', never>| Null>;

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
   * Udap base type for findUnique actions
   */
  export type UdapFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Udap
     */
    select?: UdapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UdapInclude<ExtArgs> | null
    /**
     * Filter, which Udap to fetch.
     */
    where: UdapWhereUniqueInput
  }

  /**
   * Udap findUnique
   */
  export interface UdapFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends UdapFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Udap findUniqueOrThrow
   */
  export type UdapFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Udap
     */
    select?: UdapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UdapInclude<ExtArgs> | null
    /**
     * Filter, which Udap to fetch.
     */
    where: UdapWhereUniqueInput
  }


  /**
   * Udap base type for findFirst actions
   */
  export type UdapFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Udap
     */
    select?: UdapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UdapInclude<ExtArgs> | null
    /**
     * Filter, which Udap to fetch.
     */
    where?: UdapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Udaps to fetch.
     */
    orderBy?: Enumerable<UdapOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Udaps.
     */
    cursor?: UdapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Udaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Udaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Udaps.
     */
    distinct?: Enumerable<UdapScalarFieldEnum>
  }

  /**
   * Udap findFirst
   */
  export interface UdapFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends UdapFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * Udap findFirstOrThrow
   */
  export type UdapFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Udap
     */
    select?: UdapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UdapInclude<ExtArgs> | null
    /**
     * Filter, which Udap to fetch.
     */
    where?: UdapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Udaps to fetch.
     */
    orderBy?: Enumerable<UdapOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Udaps.
     */
    cursor?: UdapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Udaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Udaps.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Udaps.
     */
    distinct?: Enumerable<UdapScalarFieldEnum>
  }


  /**
   * Udap findMany
   */
  export type UdapFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Udap
     */
    select?: UdapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UdapInclude<ExtArgs> | null
    /**
     * Filter, which Udaps to fetch.
     */
    where?: UdapWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Udaps to fetch.
     */
    orderBy?: Enumerable<UdapOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Udaps.
     */
    cursor?: UdapWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Udaps from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Udaps.
     */
    skip?: number
    distinct?: Enumerable<UdapScalarFieldEnum>
  }


  /**
   * Udap create
   */
  export type UdapCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Udap
     */
    select?: UdapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UdapInclude<ExtArgs> | null
    /**
     * The data needed to create a Udap.
     */
    data: XOR<UdapCreateInput, UdapUncheckedCreateInput>
  }


  /**
   * Udap createMany
   */
  export type UdapCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Udaps.
     */
    data: Enumerable<UdapCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * Udap update
   */
  export type UdapUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Udap
     */
    select?: UdapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UdapInclude<ExtArgs> | null
    /**
     * The data needed to update a Udap.
     */
    data: XOR<UdapUpdateInput, UdapUncheckedUpdateInput>
    /**
     * Choose, which Udap to update.
     */
    where: UdapWhereUniqueInput
  }


  /**
   * Udap updateMany
   */
  export type UdapUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Udaps.
     */
    data: XOR<UdapUpdateManyMutationInput, UdapUncheckedUpdateManyInput>
    /**
     * Filter which Udaps to update
     */
    where?: UdapWhereInput
  }


  /**
   * Udap upsert
   */
  export type UdapUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Udap
     */
    select?: UdapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UdapInclude<ExtArgs> | null
    /**
     * The filter to search for the Udap to update in case it exists.
     */
    where: UdapWhereUniqueInput
    /**
     * In case the Udap found by the `where` argument doesn't exist, create a new Udap with this data.
     */
    create: XOR<UdapCreateInput, UdapUncheckedCreateInput>
    /**
     * In case the Udap was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UdapUpdateInput, UdapUncheckedUpdateInput>
  }


  /**
   * Udap delete
   */
  export type UdapDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Udap
     */
    select?: UdapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UdapInclude<ExtArgs> | null
    /**
     * Filter which Udap to delete.
     */
    where: UdapWhereUniqueInput
  }


  /**
   * Udap deleteMany
   */
  export type UdapDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Udaps to delete
     */
    where?: UdapWhereInput
  }


  /**
   * Udap.user
   */
  export type Udap$userArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * Udap without action
   */
  export type UdapArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Udap
     */
    select?: UdapSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UdapInclude<ExtArgs> | null
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
    name: string | null
    udap_id: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    udap_id: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    udap_id: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    udap_id?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    udap_id?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    udap_id?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
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




  export type UserGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: Enumerable<UserOrderByWithAggregationInput>
    by: UserScalarFieldEnum[]
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }


  export type UserGroupByOutputType = {
    id: string
    name: string
    udap_id: string
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
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


  export type UserSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    udap_id?: boolean
    delegation_delegation_createdByTouser?: boolean | User$delegation_delegation_createdByTouserArgs<ExtArgs>
    delegation_delegation_delegatedToTouser?: boolean | User$delegation_delegation_delegatedToTouserArgs<ExtArgs>
    report?: boolean | User$reportArgs<ExtArgs>
    udap?: boolean | UdapArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    udap_id?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    delegation_delegation_createdByTouser?: boolean | User$delegation_delegation_createdByTouserArgs<ExtArgs>
    delegation_delegation_delegatedToTouser?: boolean | User$delegation_delegation_delegatedToTouserArgs<ExtArgs>
    report?: boolean | User$reportArgs<ExtArgs>
    udap?: boolean | UdapArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeArgs<ExtArgs>
  }


  type UserGetPayload<S extends boolean | null | undefined | UserArgs> = $Types.GetResult<UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
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
    findUnique<T extends UserFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'User'> extends True ? Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

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
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

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
    findFirst<T extends UserFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'User'> extends True ? Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

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
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

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
    findMany<T extends UserFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<UserPayload<ExtArgs>, T, 'findMany', never>>

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
    create<T extends UserCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

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
    createMany<T extends UserCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    delete<T extends UserDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

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
    update<T extends UserUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

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
    deleteMany<T extends UserDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    updateMany<T extends UserUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    upsert<T extends UserUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>
    ): Prisma__UserClient<$Types.GetResult<UserPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

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
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
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

    delegation_delegation_createdByTouser<T extends User$delegation_delegation_createdByTouserArgs<ExtArgs> = {}>(args?: Subset<T, User$delegation_delegation_createdByTouserArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<DelegationPayload<ExtArgs>, T, 'findMany', never>| Null>;

    delegation_delegation_delegatedToTouser<T extends User$delegation_delegation_delegatedToTouserArgs<ExtArgs> = {}>(args?: Subset<T, User$delegation_delegation_delegatedToTouserArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<DelegationPayload<ExtArgs>, T, 'findMany', never>| Null>;

    report<T extends User$reportArgs<ExtArgs> = {}>(args?: Subset<T, User$reportArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<ReportPayload<ExtArgs>, T, 'findMany', never>| Null>;

    udap<T extends UdapArgs<ExtArgs> = {}>(args?: Subset<T, UdapArgs<ExtArgs>>): Prisma__UdapClient<$Types.GetResult<UdapPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

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
  export type UserFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUnique
   */
  export interface UserFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends UserFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User base type for findFirst actions
   */
  export type UserFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: Enumerable<UserScalarFieldEnum>
  }

  /**
   * User findFirst
   */
  export interface UserFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends UserFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: Enumerable<UserOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: Enumerable<UserScalarFieldEnum>
  }


  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }


  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: Enumerable<UserCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }


  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }


  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }


  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }


  /**
   * User.delegation_delegation_createdByTouser
   */
  export type User$delegation_delegation_createdByTouserArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegation
     */
    select?: DelegationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DelegationInclude<ExtArgs> | null
    where?: DelegationWhereInput
    orderBy?: Enumerable<DelegationOrderByWithRelationInput>
    cursor?: DelegationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<DelegationScalarFieldEnum>
  }


  /**
   * User.delegation_delegation_delegatedToTouser
   */
  export type User$delegation_delegation_delegatedToTouserArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Delegation
     */
    select?: DelegationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DelegationInclude<ExtArgs> | null
    where?: DelegationWhereInput
    orderBy?: Enumerable<DelegationOrderByWithRelationInput>
    cursor?: DelegationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<DelegationScalarFieldEnum>
  }


  /**
   * User.report
   */
  export type User$reportArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Report
     */
    select?: ReportSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ReportInclude<ExtArgs> | null
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
  export type UserArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
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


  export const ClauseScalarFieldEnum: {
    key: 'key',
    value: 'value',
    udap_id: 'udap_id',
    text: 'text'
  };

  export type ClauseScalarFieldEnum = (typeof ClauseScalarFieldEnum)[keyof typeof ClauseScalarFieldEnum]


  export const DelegationScalarFieldEnum: {
    createdBy: 'createdBy',
    delegatedTo: 'delegatedTo'
  };

  export type DelegationScalarFieldEnum = (typeof DelegationScalarFieldEnum)[keyof typeof DelegationScalarFieldEnum]


  export const ReportScalarFieldEnum: {
    id: 'id',
    title: 'title',
    projectDescription: 'projectDescription',
    redactedBy: 'redactedBy',
    meetDate: 'meetDate',
    applicantName: 'applicantName',
    applicantAddress: 'applicantAddress',
    projectCadastralRef: 'projectCadastralRef',
    projectSpaceType: 'projectSpaceType',
    decision: 'decision',
    precisions: 'precisions',
    contacts: 'contacts',
    furtherInformation: 'furtherInformation',
    createdBy: 'createdBy',
    createdAt: 'createdAt',
    serviceInstructeur: 'serviceInstructeur',
    pdf: 'pdf',
    disabled: 'disabled',
    udap_id: 'udap_id'
  };

  export type ReportScalarFieldEnum = (typeof ReportScalarFieldEnum)[keyof typeof ReportScalarFieldEnum]


  export const UdapScalarFieldEnum: {
    id: 'id',
    department: 'department',
    completeCoords: 'completeCoords',
    visible: 'visible',
    name: 'name',
    address: 'address',
    zipCode: 'zipCode',
    city: 'city',
    phone: 'phone',
    email: 'email'
  };

  export type UdapScalarFieldEnum = (typeof UdapScalarFieldEnum)[keyof typeof UdapScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    udap_id: 'udap_id'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


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


  export type ClauseWhereInput = {
    AND?: Enumerable<ClauseWhereInput>
    OR?: Enumerable<ClauseWhereInput>
    NOT?: Enumerable<ClauseWhereInput>
    key?: StringFilter | string
    value?: StringFilter | string
    udap_id?: StringFilter | string
    text?: StringFilter | string
  }

  export type ClauseOrderByWithRelationInput = {
    key?: SortOrder
    value?: SortOrder
    udap_id?: SortOrder
    text?: SortOrder
  }

  export type ClauseWhereUniqueInput = {
    key_value_udap_id?: ClauseKeyValueUdap_idCompoundUniqueInput
  }

  export type ClauseOrderByWithAggregationInput = {
    key?: SortOrder
    value?: SortOrder
    udap_id?: SortOrder
    text?: SortOrder
    _count?: ClauseCountOrderByAggregateInput
    _max?: ClauseMaxOrderByAggregateInput
    _min?: ClauseMinOrderByAggregateInput
  }

  export type ClauseScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ClauseScalarWhereWithAggregatesInput>
    OR?: Enumerable<ClauseScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ClauseScalarWhereWithAggregatesInput>
    key?: StringWithAggregatesFilter | string
    value?: StringWithAggregatesFilter | string
    udap_id?: StringWithAggregatesFilter | string
    text?: StringWithAggregatesFilter | string
  }

  export type DelegationWhereInput = {
    AND?: Enumerable<DelegationWhereInput>
    OR?: Enumerable<DelegationWhereInput>
    NOT?: Enumerable<DelegationWhereInput>
    createdBy?: StringFilter | string
    delegatedTo?: StringFilter | string
    user_delegation_createdByTouser?: XOR<UserRelationFilter, UserWhereInput>
    user_delegation_delegatedToTouser?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type DelegationOrderByWithRelationInput = {
    createdBy?: SortOrder
    delegatedTo?: SortOrder
    user_delegation_createdByTouser?: UserOrderByWithRelationInput
    user_delegation_delegatedToTouser?: UserOrderByWithRelationInput
  }

  export type DelegationWhereUniqueInput = {
    createdBy_delegatedTo?: DelegationCreatedByDelegatedToCompoundUniqueInput
  }

  export type DelegationOrderByWithAggregationInput = {
    createdBy?: SortOrder
    delegatedTo?: SortOrder
    _count?: DelegationCountOrderByAggregateInput
    _max?: DelegationMaxOrderByAggregateInput
    _min?: DelegationMinOrderByAggregateInput
  }

  export type DelegationScalarWhereWithAggregatesInput = {
    AND?: Enumerable<DelegationScalarWhereWithAggregatesInput>
    OR?: Enumerable<DelegationScalarWhereWithAggregatesInput>
    NOT?: Enumerable<DelegationScalarWhereWithAggregatesInput>
    createdBy?: StringWithAggregatesFilter | string
    delegatedTo?: StringWithAggregatesFilter | string
  }

  export type ReportWhereInput = {
    AND?: Enumerable<ReportWhereInput>
    OR?: Enumerable<ReportWhereInput>
    NOT?: Enumerable<ReportWhereInput>
    id?: StringFilter | string
    title?: StringNullableFilter | string | null
    projectDescription?: StringNullableFilter | string | null
    redactedBy?: StringNullableFilter | string | null
    meetDate?: DateTimeNullableFilter | Date | string | null
    applicantName?: StringNullableFilter | string | null
    applicantAddress?: StringNullableFilter | string | null
    projectCadastralRef?: StringNullableFilter | string | null
    projectSpaceType?: StringNullableFilter | string | null
    decision?: StringNullableFilter | string | null
    precisions?: StringNullableFilter | string | null
    contacts?: StringNullableFilter | string | null
    furtherInformation?: StringNullableFilter | string | null
    createdBy?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    serviceInstructeur?: IntNullableFilter | number | null
    pdf?: StringNullableFilter | string | null
    disabled?: BoolNullableFilter | boolean | null
    udap_id?: StringNullableFilter | string | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ReportOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrderInput | SortOrder
    projectDescription?: SortOrderInput | SortOrder
    redactedBy?: SortOrderInput | SortOrder
    meetDate?: SortOrderInput | SortOrder
    applicantName?: SortOrderInput | SortOrder
    applicantAddress?: SortOrderInput | SortOrder
    projectCadastralRef?: SortOrderInput | SortOrder
    projectSpaceType?: SortOrderInput | SortOrder
    decision?: SortOrderInput | SortOrder
    precisions?: SortOrderInput | SortOrder
    contacts?: SortOrderInput | SortOrder
    furtherInformation?: SortOrderInput | SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    serviceInstructeur?: SortOrderInput | SortOrder
    pdf?: SortOrderInput | SortOrder
    disabled?: SortOrderInput | SortOrder
    udap_id?: SortOrderInput | SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ReportWhereUniqueInput = {
    id?: string
  }

  export type ReportOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrderInput | SortOrder
    projectDescription?: SortOrderInput | SortOrder
    redactedBy?: SortOrderInput | SortOrder
    meetDate?: SortOrderInput | SortOrder
    applicantName?: SortOrderInput | SortOrder
    applicantAddress?: SortOrderInput | SortOrder
    projectCadastralRef?: SortOrderInput | SortOrder
    projectSpaceType?: SortOrderInput | SortOrder
    decision?: SortOrderInput | SortOrder
    precisions?: SortOrderInput | SortOrder
    contacts?: SortOrderInput | SortOrder
    furtherInformation?: SortOrderInput | SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    serviceInstructeur?: SortOrderInput | SortOrder
    pdf?: SortOrderInput | SortOrder
    disabled?: SortOrderInput | SortOrder
    udap_id?: SortOrderInput | SortOrder
    _count?: ReportCountOrderByAggregateInput
    _avg?: ReportAvgOrderByAggregateInput
    _max?: ReportMaxOrderByAggregateInput
    _min?: ReportMinOrderByAggregateInput
    _sum?: ReportSumOrderByAggregateInput
  }

  export type ReportScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ReportScalarWhereWithAggregatesInput>
    OR?: Enumerable<ReportScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ReportScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    title?: StringNullableWithAggregatesFilter | string | null
    projectDescription?: StringNullableWithAggregatesFilter | string | null
    redactedBy?: StringNullableWithAggregatesFilter | string | null
    meetDate?: DateTimeNullableWithAggregatesFilter | Date | string | null
    applicantName?: StringNullableWithAggregatesFilter | string | null
    applicantAddress?: StringNullableWithAggregatesFilter | string | null
    projectCadastralRef?: StringNullableWithAggregatesFilter | string | null
    projectSpaceType?: StringNullableWithAggregatesFilter | string | null
    decision?: StringNullableWithAggregatesFilter | string | null
    precisions?: StringNullableWithAggregatesFilter | string | null
    contacts?: StringNullableWithAggregatesFilter | string | null
    furtherInformation?: StringNullableWithAggregatesFilter | string | null
    createdBy?: StringWithAggregatesFilter | string
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    serviceInstructeur?: IntNullableWithAggregatesFilter | number | null
    pdf?: StringNullableWithAggregatesFilter | string | null
    disabled?: BoolNullableWithAggregatesFilter | boolean | null
    udap_id?: StringNullableWithAggregatesFilter | string | null
  }

  export type UdapWhereInput = {
    AND?: Enumerable<UdapWhereInput>
    OR?: Enumerable<UdapWhereInput>
    NOT?: Enumerable<UdapWhereInput>
    id?: StringFilter | string
    department?: StringFilter | string
    completeCoords?: StringNullableFilter | string | null
    visible?: BoolNullableFilter | boolean | null
    name?: StringNullableFilter | string | null
    address?: StringNullableFilter | string | null
    zipCode?: StringNullableFilter | string | null
    city?: StringNullableFilter | string | null
    phone?: StringNullableFilter | string | null
    email?: StringNullableFilter | string | null
    user?: UserListRelationFilter
  }

  export type UdapOrderByWithRelationInput = {
    id?: SortOrder
    department?: SortOrder
    completeCoords?: SortOrderInput | SortOrder
    visible?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    zipCode?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    user?: UserOrderByRelationAggregateInput
  }

  export type UdapWhereUniqueInput = {
    id?: string
  }

  export type UdapOrderByWithAggregationInput = {
    id?: SortOrder
    department?: SortOrder
    completeCoords?: SortOrderInput | SortOrder
    visible?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    zipCode?: SortOrderInput | SortOrder
    city?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    _count?: UdapCountOrderByAggregateInput
    _max?: UdapMaxOrderByAggregateInput
    _min?: UdapMinOrderByAggregateInput
  }

  export type UdapScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UdapScalarWhereWithAggregatesInput>
    OR?: Enumerable<UdapScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UdapScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    department?: StringWithAggregatesFilter | string
    completeCoords?: StringNullableWithAggregatesFilter | string | null
    visible?: BoolNullableWithAggregatesFilter | boolean | null
    name?: StringNullableWithAggregatesFilter | string | null
    address?: StringNullableWithAggregatesFilter | string | null
    zipCode?: StringNullableWithAggregatesFilter | string | null
    city?: StringNullableWithAggregatesFilter | string | null
    phone?: StringNullableWithAggregatesFilter | string | null
    email?: StringNullableWithAggregatesFilter | string | null
  }

  export type UserWhereInput = {
    AND?: Enumerable<UserWhereInput>
    OR?: Enumerable<UserWhereInput>
    NOT?: Enumerable<UserWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    udap_id?: StringFilter | string
    delegation_delegation_createdByTouser?: DelegationListRelationFilter
    delegation_delegation_delegatedToTouser?: DelegationListRelationFilter
    report?: ReportListRelationFilter
    udap?: XOR<UdapRelationFilter, UdapWhereInput>
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    udap_id?: SortOrder
    delegation_delegation_createdByTouser?: DelegationOrderByRelationAggregateInput
    delegation_delegation_delegatedToTouser?: DelegationOrderByRelationAggregateInput
    report?: ReportOrderByRelationAggregateInput
    udap?: UdapOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = {
    id?: string
  }

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    udap_id?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    udap_id?: StringWithAggregatesFilter | string
  }

  export type ClauseCreateInput = {
    key: string
    value: string
    udap_id: string
    text: string
  }

  export type ClauseUncheckedCreateInput = {
    key: string
    value: string
    udap_id: string
    text: string
  }

  export type ClauseUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    udap_id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
  }

  export type ClauseUncheckedUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    udap_id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
  }

  export type ClauseCreateManyInput = {
    key: string
    value: string
    udap_id: string
    text: string
  }

  export type ClauseUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    udap_id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
  }

  export type ClauseUncheckedUpdateManyInput = {
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    udap_id?: StringFieldUpdateOperationsInput | string
    text?: StringFieldUpdateOperationsInput | string
  }

  export type DelegationCreateInput = {
    user_delegation_createdByTouser: UserCreateNestedOneWithoutDelegation_delegation_createdByTouserInput
    user_delegation_delegatedToTouser: UserCreateNestedOneWithoutDelegation_delegation_delegatedToTouserInput
  }

  export type DelegationUncheckedCreateInput = {
    createdBy: string
    delegatedTo: string
  }

  export type DelegationUpdateInput = {
    user_delegation_createdByTouser?: UserUpdateOneRequiredWithoutDelegation_delegation_createdByTouserNestedInput
    user_delegation_delegatedToTouser?: UserUpdateOneRequiredWithoutDelegation_delegation_delegatedToTouserNestedInput
  }

  export type DelegationUncheckedUpdateInput = {
    createdBy?: StringFieldUpdateOperationsInput | string
    delegatedTo?: StringFieldUpdateOperationsInput | string
  }

  export type DelegationCreateManyInput = {
    createdBy: string
    delegatedTo: string
  }

  export type DelegationUpdateManyMutationInput = {

  }

  export type DelegationUncheckedUpdateManyInput = {
    createdBy?: StringFieldUpdateOperationsInput | string
    delegatedTo?: StringFieldUpdateOperationsInput | string
  }

  export type ReportCreateInput = {
    id: string
    title?: string | null
    projectDescription?: string | null
    redactedBy?: string | null
    meetDate?: Date | string | null
    applicantName?: string | null
    applicantAddress?: string | null
    projectCadastralRef?: string | null
    projectSpaceType?: string | null
    decision?: string | null
    precisions?: string | null
    contacts?: string | null
    furtherInformation?: string | null
    createdAt: Date | string
    serviceInstructeur?: number | null
    pdf?: string | null
    disabled?: boolean | null
    udap_id?: string | null
    user: UserCreateNestedOneWithoutReportInput
  }

  export type ReportUncheckedCreateInput = {
    id: string
    title?: string | null
    projectDescription?: string | null
    redactedBy?: string | null
    meetDate?: Date | string | null
    applicantName?: string | null
    applicantAddress?: string | null
    projectCadastralRef?: string | null
    projectSpaceType?: string | null
    decision?: string | null
    precisions?: string | null
    contacts?: string | null
    furtherInformation?: string | null
    createdBy: string
    createdAt: Date | string
    serviceInstructeur?: number | null
    pdf?: string | null
    disabled?: boolean | null
    udap_id?: string | null
  }

  export type ReportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    redactedBy?: NullableStringFieldUpdateOperationsInput | string | null
    meetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantAddress?: NullableStringFieldUpdateOperationsInput | string | null
    projectCadastralRef?: NullableStringFieldUpdateOperationsInput | string | null
    projectSpaceType?: NullableStringFieldUpdateOperationsInput | string | null
    decision?: NullableStringFieldUpdateOperationsInput | string | null
    precisions?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    furtherInformation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    serviceInstructeur?: NullableIntFieldUpdateOperationsInput | number | null
    pdf?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    udap_id?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutReportNestedInput
  }

  export type ReportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    redactedBy?: NullableStringFieldUpdateOperationsInput | string | null
    meetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantAddress?: NullableStringFieldUpdateOperationsInput | string | null
    projectCadastralRef?: NullableStringFieldUpdateOperationsInput | string | null
    projectSpaceType?: NullableStringFieldUpdateOperationsInput | string | null
    decision?: NullableStringFieldUpdateOperationsInput | string | null
    precisions?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    furtherInformation?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    serviceInstructeur?: NullableIntFieldUpdateOperationsInput | number | null
    pdf?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    udap_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReportCreateManyInput = {
    id: string
    title?: string | null
    projectDescription?: string | null
    redactedBy?: string | null
    meetDate?: Date | string | null
    applicantName?: string | null
    applicantAddress?: string | null
    projectCadastralRef?: string | null
    projectSpaceType?: string | null
    decision?: string | null
    precisions?: string | null
    contacts?: string | null
    furtherInformation?: string | null
    createdBy: string
    createdAt: Date | string
    serviceInstructeur?: number | null
    pdf?: string | null
    disabled?: boolean | null
    udap_id?: string | null
  }

  export type ReportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    redactedBy?: NullableStringFieldUpdateOperationsInput | string | null
    meetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantAddress?: NullableStringFieldUpdateOperationsInput | string | null
    projectCadastralRef?: NullableStringFieldUpdateOperationsInput | string | null
    projectSpaceType?: NullableStringFieldUpdateOperationsInput | string | null
    decision?: NullableStringFieldUpdateOperationsInput | string | null
    precisions?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    furtherInformation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    serviceInstructeur?: NullableIntFieldUpdateOperationsInput | number | null
    pdf?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    udap_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    redactedBy?: NullableStringFieldUpdateOperationsInput | string | null
    meetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantAddress?: NullableStringFieldUpdateOperationsInput | string | null
    projectCadastralRef?: NullableStringFieldUpdateOperationsInput | string | null
    projectSpaceType?: NullableStringFieldUpdateOperationsInput | string | null
    decision?: NullableStringFieldUpdateOperationsInput | string | null
    precisions?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    furtherInformation?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    serviceInstructeur?: NullableIntFieldUpdateOperationsInput | number | null
    pdf?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    udap_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UdapCreateInput = {
    id: string
    department: string
    completeCoords?: string | null
    visible?: boolean | null
    name?: string | null
    address?: string | null
    zipCode?: string | null
    city?: string | null
    phone?: string | null
    email?: string | null
    user?: UserCreateNestedManyWithoutUdapInput
  }

  export type UdapUncheckedCreateInput = {
    id: string
    department: string
    completeCoords?: string | null
    visible?: boolean | null
    name?: string | null
    address?: string | null
    zipCode?: string | null
    city?: string | null
    phone?: string | null
    email?: string | null
    user?: UserUncheckedCreateNestedManyWithoutUdapInput
  }

  export type UdapUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    completeCoords?: NullableStringFieldUpdateOperationsInput | string | null
    visible?: NullableBoolFieldUpdateOperationsInput | boolean | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateManyWithoutUdapNestedInput
  }

  export type UdapUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    completeCoords?: NullableStringFieldUpdateOperationsInput | string | null
    visible?: NullableBoolFieldUpdateOperationsInput | boolean | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUncheckedUpdateManyWithoutUdapNestedInput
  }

  export type UdapCreateManyInput = {
    id: string
    department: string
    completeCoords?: string | null
    visible?: boolean | null
    name?: string | null
    address?: string | null
    zipCode?: string | null
    city?: string | null
    phone?: string | null
    email?: string | null
  }

  export type UdapUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    completeCoords?: NullableStringFieldUpdateOperationsInput | string | null
    visible?: NullableBoolFieldUpdateOperationsInput | boolean | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UdapUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    completeCoords?: NullableStringFieldUpdateOperationsInput | string | null
    visible?: NullableBoolFieldUpdateOperationsInput | boolean | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserCreateInput = {
    id: string
    name: string
    delegation_delegation_createdByTouser?: DelegationCreateNestedManyWithoutUser_delegation_createdByTouserInput
    delegation_delegation_delegatedToTouser?: DelegationCreateNestedManyWithoutUser_delegation_delegatedToTouserInput
    report?: ReportCreateNestedManyWithoutUserInput
    udap: UdapCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    name: string
    udap_id: string
    delegation_delegation_createdByTouser?: DelegationUncheckedCreateNestedManyWithoutUser_delegation_createdByTouserInput
    delegation_delegation_delegatedToTouser?: DelegationUncheckedCreateNestedManyWithoutUser_delegation_delegatedToTouserInput
    report?: ReportUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    delegation_delegation_createdByTouser?: DelegationUpdateManyWithoutUser_delegation_createdByTouserNestedInput
    delegation_delegation_delegatedToTouser?: DelegationUpdateManyWithoutUser_delegation_delegatedToTouserNestedInput
    report?: ReportUpdateManyWithoutUserNestedInput
    udap?: UdapUpdateOneRequiredWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    udap_id?: StringFieldUpdateOperationsInput | string
    delegation_delegation_createdByTouser?: DelegationUncheckedUpdateManyWithoutUser_delegation_createdByTouserNestedInput
    delegation_delegation_delegatedToTouser?: DelegationUncheckedUpdateManyWithoutUser_delegation_delegatedToTouserNestedInput
    report?: ReportUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    name: string
    udap_id: string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    udap_id?: StringFieldUpdateOperationsInput | string
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

  export type ClauseKeyValueUdap_idCompoundUniqueInput = {
    key: string
    value: string
    udap_id: string
  }

  export type ClauseCountOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    udap_id?: SortOrder
    text?: SortOrder
  }

  export type ClauseMaxOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    udap_id?: SortOrder
    text?: SortOrder
  }

  export type ClauseMinOrderByAggregateInput = {
    key?: SortOrder
    value?: SortOrder
    udap_id?: SortOrder
    text?: SortOrder
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

  export type UserRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type DelegationCreatedByDelegatedToCompoundUniqueInput = {
    createdBy: string
    delegatedTo: string
  }

  export type DelegationCountOrderByAggregateInput = {
    createdBy?: SortOrder
    delegatedTo?: SortOrder
  }

  export type DelegationMaxOrderByAggregateInput = {
    createdBy?: SortOrder
    delegatedTo?: SortOrder
  }

  export type DelegationMinOrderByAggregateInput = {
    createdBy?: SortOrder
    delegatedTo?: SortOrder
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

  export type BoolNullableFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableFilter | boolean | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ReportCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    projectDescription?: SortOrder
    redactedBy?: SortOrder
    meetDate?: SortOrder
    applicantName?: SortOrder
    applicantAddress?: SortOrder
    projectCadastralRef?: SortOrder
    projectSpaceType?: SortOrder
    decision?: SortOrder
    precisions?: SortOrder
    contacts?: SortOrder
    furtherInformation?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    serviceInstructeur?: SortOrder
    pdf?: SortOrder
    disabled?: SortOrder
    udap_id?: SortOrder
  }

  export type ReportAvgOrderByAggregateInput = {
    serviceInstructeur?: SortOrder
  }

  export type ReportMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    projectDescription?: SortOrder
    redactedBy?: SortOrder
    meetDate?: SortOrder
    applicantName?: SortOrder
    applicantAddress?: SortOrder
    projectCadastralRef?: SortOrder
    projectSpaceType?: SortOrder
    decision?: SortOrder
    precisions?: SortOrder
    contacts?: SortOrder
    furtherInformation?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    serviceInstructeur?: SortOrder
    pdf?: SortOrder
    disabled?: SortOrder
    udap_id?: SortOrder
  }

  export type ReportMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    projectDescription?: SortOrder
    redactedBy?: SortOrder
    meetDate?: SortOrder
    applicantName?: SortOrder
    applicantAddress?: SortOrder
    projectCadastralRef?: SortOrder
    projectSpaceType?: SortOrder
    decision?: SortOrder
    precisions?: SortOrder
    contacts?: SortOrder
    furtherInformation?: SortOrder
    createdBy?: SortOrder
    createdAt?: SortOrder
    serviceInstructeur?: SortOrder
    pdf?: SortOrder
    disabled?: SortOrder
    udap_id?: SortOrder
  }

  export type ReportSumOrderByAggregateInput = {
    serviceInstructeur?: SortOrder
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

  export type BoolNullableWithAggregatesFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableWithAggregatesFilter | boolean | null
    _count?: NestedIntNullableFilter
    _min?: NestedBoolNullableFilter
    _max?: NestedBoolNullableFilter
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UdapCountOrderByAggregateInput = {
    id?: SortOrder
    department?: SortOrder
    completeCoords?: SortOrder
    visible?: SortOrder
    name?: SortOrder
    address?: SortOrder
    zipCode?: SortOrder
    city?: SortOrder
    phone?: SortOrder
    email?: SortOrder
  }

  export type UdapMaxOrderByAggregateInput = {
    id?: SortOrder
    department?: SortOrder
    completeCoords?: SortOrder
    visible?: SortOrder
    name?: SortOrder
    address?: SortOrder
    zipCode?: SortOrder
    city?: SortOrder
    phone?: SortOrder
    email?: SortOrder
  }

  export type UdapMinOrderByAggregateInput = {
    id?: SortOrder
    department?: SortOrder
    completeCoords?: SortOrder
    visible?: SortOrder
    name?: SortOrder
    address?: SortOrder
    zipCode?: SortOrder
    city?: SortOrder
    phone?: SortOrder
    email?: SortOrder
  }

  export type DelegationListRelationFilter = {
    every?: DelegationWhereInput
    some?: DelegationWhereInput
    none?: DelegationWhereInput
  }

  export type ReportListRelationFilter = {
    every?: ReportWhereInput
    some?: ReportWhereInput
    none?: ReportWhereInput
  }

  export type UdapRelationFilter = {
    is?: UdapWhereInput | null
    isNot?: UdapWhereInput | null
  }

  export type DelegationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ReportOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    udap_id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    udap_id?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    udap_id?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type UserCreateNestedOneWithoutDelegation_delegation_createdByTouserInput = {
    create?: XOR<UserCreateWithoutDelegation_delegation_createdByTouserInput, UserUncheckedCreateWithoutDelegation_delegation_createdByTouserInput>
    connectOrCreate?: UserCreateOrConnectWithoutDelegation_delegation_createdByTouserInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutDelegation_delegation_delegatedToTouserInput = {
    create?: XOR<UserCreateWithoutDelegation_delegation_delegatedToTouserInput, UserUncheckedCreateWithoutDelegation_delegation_delegatedToTouserInput>
    connectOrCreate?: UserCreateOrConnectWithoutDelegation_delegation_delegatedToTouserInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutDelegation_delegation_createdByTouserNestedInput = {
    create?: XOR<UserCreateWithoutDelegation_delegation_createdByTouserInput, UserUncheckedCreateWithoutDelegation_delegation_createdByTouserInput>
    connectOrCreate?: UserCreateOrConnectWithoutDelegation_delegation_createdByTouserInput
    upsert?: UserUpsertWithoutDelegation_delegation_createdByTouserInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutDelegation_delegation_createdByTouserInput, UserUncheckedUpdateWithoutDelegation_delegation_createdByTouserInput>
  }

  export type UserUpdateOneRequiredWithoutDelegation_delegation_delegatedToTouserNestedInput = {
    create?: XOR<UserCreateWithoutDelegation_delegation_delegatedToTouserInput, UserUncheckedCreateWithoutDelegation_delegation_delegatedToTouserInput>
    connectOrCreate?: UserCreateOrConnectWithoutDelegation_delegation_delegatedToTouserInput
    upsert?: UserUpsertWithoutDelegation_delegation_delegatedToTouserInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutDelegation_delegation_delegatedToTouserInput, UserUncheckedUpdateWithoutDelegation_delegation_delegatedToTouserInput>
  }

  export type UserCreateNestedOneWithoutReportInput = {
    create?: XOR<UserCreateWithoutReportInput, UserUncheckedCreateWithoutReportInput>
    connectOrCreate?: UserCreateOrConnectWithoutReportInput
    connect?: UserWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type UserUpdateOneRequiredWithoutReportNestedInput = {
    create?: XOR<UserCreateWithoutReportInput, UserUncheckedCreateWithoutReportInput>
    connectOrCreate?: UserCreateOrConnectWithoutReportInput
    upsert?: UserUpsertWithoutReportInput
    connect?: UserWhereUniqueInput
    update?: XOR<UserUpdateWithoutReportInput, UserUncheckedUpdateWithoutReportInput>
  }

  export type UserCreateNestedManyWithoutUdapInput = {
    create?: XOR<Enumerable<UserCreateWithoutUdapInput>, Enumerable<UserUncheckedCreateWithoutUdapInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutUdapInput>
    createMany?: UserCreateManyUdapInputEnvelope
    connect?: Enumerable<UserWhereUniqueInput>
  }

  export type UserUncheckedCreateNestedManyWithoutUdapInput = {
    create?: XOR<Enumerable<UserCreateWithoutUdapInput>, Enumerable<UserUncheckedCreateWithoutUdapInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutUdapInput>
    createMany?: UserCreateManyUdapInputEnvelope
    connect?: Enumerable<UserWhereUniqueInput>
  }

  export type UserUpdateManyWithoutUdapNestedInput = {
    create?: XOR<Enumerable<UserCreateWithoutUdapInput>, Enumerable<UserUncheckedCreateWithoutUdapInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutUdapInput>
    upsert?: Enumerable<UserUpsertWithWhereUniqueWithoutUdapInput>
    createMany?: UserCreateManyUdapInputEnvelope
    set?: Enumerable<UserWhereUniqueInput>
    disconnect?: Enumerable<UserWhereUniqueInput>
    delete?: Enumerable<UserWhereUniqueInput>
    connect?: Enumerable<UserWhereUniqueInput>
    update?: Enumerable<UserUpdateWithWhereUniqueWithoutUdapInput>
    updateMany?: Enumerable<UserUpdateManyWithWhereWithoutUdapInput>
    deleteMany?: Enumerable<UserScalarWhereInput>
  }

  export type UserUncheckedUpdateManyWithoutUdapNestedInput = {
    create?: XOR<Enumerable<UserCreateWithoutUdapInput>, Enumerable<UserUncheckedCreateWithoutUdapInput>>
    connectOrCreate?: Enumerable<UserCreateOrConnectWithoutUdapInput>
    upsert?: Enumerable<UserUpsertWithWhereUniqueWithoutUdapInput>
    createMany?: UserCreateManyUdapInputEnvelope
    set?: Enumerable<UserWhereUniqueInput>
    disconnect?: Enumerable<UserWhereUniqueInput>
    delete?: Enumerable<UserWhereUniqueInput>
    connect?: Enumerable<UserWhereUniqueInput>
    update?: Enumerable<UserUpdateWithWhereUniqueWithoutUdapInput>
    updateMany?: Enumerable<UserUpdateManyWithWhereWithoutUdapInput>
    deleteMany?: Enumerable<UserScalarWhereInput>
  }

  export type DelegationCreateNestedManyWithoutUser_delegation_createdByTouserInput = {
    create?: XOR<Enumerable<DelegationCreateWithoutUser_delegation_createdByTouserInput>, Enumerable<DelegationUncheckedCreateWithoutUser_delegation_createdByTouserInput>>
    connectOrCreate?: Enumerable<DelegationCreateOrConnectWithoutUser_delegation_createdByTouserInput>
    createMany?: DelegationCreateManyUser_delegation_createdByTouserInputEnvelope
    connect?: Enumerable<DelegationWhereUniqueInput>
  }

  export type DelegationCreateNestedManyWithoutUser_delegation_delegatedToTouserInput = {
    create?: XOR<Enumerable<DelegationCreateWithoutUser_delegation_delegatedToTouserInput>, Enumerable<DelegationUncheckedCreateWithoutUser_delegation_delegatedToTouserInput>>
    connectOrCreate?: Enumerable<DelegationCreateOrConnectWithoutUser_delegation_delegatedToTouserInput>
    createMany?: DelegationCreateManyUser_delegation_delegatedToTouserInputEnvelope
    connect?: Enumerable<DelegationWhereUniqueInput>
  }

  export type ReportCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<ReportCreateWithoutUserInput>, Enumerable<ReportUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ReportCreateOrConnectWithoutUserInput>
    createMany?: ReportCreateManyUserInputEnvelope
    connect?: Enumerable<ReportWhereUniqueInput>
  }

  export type UdapCreateNestedOneWithoutUserInput = {
    create?: XOR<UdapCreateWithoutUserInput, UdapUncheckedCreateWithoutUserInput>
    connectOrCreate?: UdapCreateOrConnectWithoutUserInput
    connect?: UdapWhereUniqueInput
  }

  export type DelegationUncheckedCreateNestedManyWithoutUser_delegation_createdByTouserInput = {
    create?: XOR<Enumerable<DelegationCreateWithoutUser_delegation_createdByTouserInput>, Enumerable<DelegationUncheckedCreateWithoutUser_delegation_createdByTouserInput>>
    connectOrCreate?: Enumerable<DelegationCreateOrConnectWithoutUser_delegation_createdByTouserInput>
    createMany?: DelegationCreateManyUser_delegation_createdByTouserInputEnvelope
    connect?: Enumerable<DelegationWhereUniqueInput>
  }

  export type DelegationUncheckedCreateNestedManyWithoutUser_delegation_delegatedToTouserInput = {
    create?: XOR<Enumerable<DelegationCreateWithoutUser_delegation_delegatedToTouserInput>, Enumerable<DelegationUncheckedCreateWithoutUser_delegation_delegatedToTouserInput>>
    connectOrCreate?: Enumerable<DelegationCreateOrConnectWithoutUser_delegation_delegatedToTouserInput>
    createMany?: DelegationCreateManyUser_delegation_delegatedToTouserInputEnvelope
    connect?: Enumerable<DelegationWhereUniqueInput>
  }

  export type ReportUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<ReportCreateWithoutUserInput>, Enumerable<ReportUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<ReportCreateOrConnectWithoutUserInput>
    createMany?: ReportCreateManyUserInputEnvelope
    connect?: Enumerable<ReportWhereUniqueInput>
  }

  export type DelegationUpdateManyWithoutUser_delegation_createdByTouserNestedInput = {
    create?: XOR<Enumerable<DelegationCreateWithoutUser_delegation_createdByTouserInput>, Enumerable<DelegationUncheckedCreateWithoutUser_delegation_createdByTouserInput>>
    connectOrCreate?: Enumerable<DelegationCreateOrConnectWithoutUser_delegation_createdByTouserInput>
    upsert?: Enumerable<DelegationUpsertWithWhereUniqueWithoutUser_delegation_createdByTouserInput>
    createMany?: DelegationCreateManyUser_delegation_createdByTouserInputEnvelope
    set?: Enumerable<DelegationWhereUniqueInput>
    disconnect?: Enumerable<DelegationWhereUniqueInput>
    delete?: Enumerable<DelegationWhereUniqueInput>
    connect?: Enumerable<DelegationWhereUniqueInput>
    update?: Enumerable<DelegationUpdateWithWhereUniqueWithoutUser_delegation_createdByTouserInput>
    updateMany?: Enumerable<DelegationUpdateManyWithWhereWithoutUser_delegation_createdByTouserInput>
    deleteMany?: Enumerable<DelegationScalarWhereInput>
  }

  export type DelegationUpdateManyWithoutUser_delegation_delegatedToTouserNestedInput = {
    create?: XOR<Enumerable<DelegationCreateWithoutUser_delegation_delegatedToTouserInput>, Enumerable<DelegationUncheckedCreateWithoutUser_delegation_delegatedToTouserInput>>
    connectOrCreate?: Enumerable<DelegationCreateOrConnectWithoutUser_delegation_delegatedToTouserInput>
    upsert?: Enumerable<DelegationUpsertWithWhereUniqueWithoutUser_delegation_delegatedToTouserInput>
    createMany?: DelegationCreateManyUser_delegation_delegatedToTouserInputEnvelope
    set?: Enumerable<DelegationWhereUniqueInput>
    disconnect?: Enumerable<DelegationWhereUniqueInput>
    delete?: Enumerable<DelegationWhereUniqueInput>
    connect?: Enumerable<DelegationWhereUniqueInput>
    update?: Enumerable<DelegationUpdateWithWhereUniqueWithoutUser_delegation_delegatedToTouserInput>
    updateMany?: Enumerable<DelegationUpdateManyWithWhereWithoutUser_delegation_delegatedToTouserInput>
    deleteMany?: Enumerable<DelegationScalarWhereInput>
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

  export type UdapUpdateOneRequiredWithoutUserNestedInput = {
    create?: XOR<UdapCreateWithoutUserInput, UdapUncheckedCreateWithoutUserInput>
    connectOrCreate?: UdapCreateOrConnectWithoutUserInput
    upsert?: UdapUpsertWithoutUserInput
    connect?: UdapWhereUniqueInput
    update?: XOR<UdapUpdateWithoutUserInput, UdapUncheckedUpdateWithoutUserInput>
  }

  export type DelegationUncheckedUpdateManyWithoutUser_delegation_createdByTouserNestedInput = {
    create?: XOR<Enumerable<DelegationCreateWithoutUser_delegation_createdByTouserInput>, Enumerable<DelegationUncheckedCreateWithoutUser_delegation_createdByTouserInput>>
    connectOrCreate?: Enumerable<DelegationCreateOrConnectWithoutUser_delegation_createdByTouserInput>
    upsert?: Enumerable<DelegationUpsertWithWhereUniqueWithoutUser_delegation_createdByTouserInput>
    createMany?: DelegationCreateManyUser_delegation_createdByTouserInputEnvelope
    set?: Enumerable<DelegationWhereUniqueInput>
    disconnect?: Enumerable<DelegationWhereUniqueInput>
    delete?: Enumerable<DelegationWhereUniqueInput>
    connect?: Enumerable<DelegationWhereUniqueInput>
    update?: Enumerable<DelegationUpdateWithWhereUniqueWithoutUser_delegation_createdByTouserInput>
    updateMany?: Enumerable<DelegationUpdateManyWithWhereWithoutUser_delegation_createdByTouserInput>
    deleteMany?: Enumerable<DelegationScalarWhereInput>
  }

  export type DelegationUncheckedUpdateManyWithoutUser_delegation_delegatedToTouserNestedInput = {
    create?: XOR<Enumerable<DelegationCreateWithoutUser_delegation_delegatedToTouserInput>, Enumerable<DelegationUncheckedCreateWithoutUser_delegation_delegatedToTouserInput>>
    connectOrCreate?: Enumerable<DelegationCreateOrConnectWithoutUser_delegation_delegatedToTouserInput>
    upsert?: Enumerable<DelegationUpsertWithWhereUniqueWithoutUser_delegation_delegatedToTouserInput>
    createMany?: DelegationCreateManyUser_delegation_delegatedToTouserInputEnvelope
    set?: Enumerable<DelegationWhereUniqueInput>
    disconnect?: Enumerable<DelegationWhereUniqueInput>
    delete?: Enumerable<DelegationWhereUniqueInput>
    connect?: Enumerable<DelegationWhereUniqueInput>
    update?: Enumerable<DelegationUpdateWithWhereUniqueWithoutUser_delegation_delegatedToTouserInput>
    updateMany?: Enumerable<DelegationUpdateManyWithWhereWithoutUser_delegation_delegatedToTouserInput>
    deleteMany?: Enumerable<DelegationScalarWhereInput>
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

  export type NestedBoolNullableFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableFilter | boolean | null
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

  export type NestedBoolNullableWithAggregatesFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableWithAggregatesFilter | boolean | null
    _count?: NestedIntNullableFilter
    _min?: NestedBoolNullableFilter
    _max?: NestedBoolNullableFilter
  }

  export type UserCreateWithoutDelegation_delegation_createdByTouserInput = {
    id: string
    name: string
    delegation_delegation_delegatedToTouser?: DelegationCreateNestedManyWithoutUser_delegation_delegatedToTouserInput
    report?: ReportCreateNestedManyWithoutUserInput
    udap: UdapCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDelegation_delegation_createdByTouserInput = {
    id: string
    name: string
    udap_id: string
    delegation_delegation_delegatedToTouser?: DelegationUncheckedCreateNestedManyWithoutUser_delegation_delegatedToTouserInput
    report?: ReportUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDelegation_delegation_createdByTouserInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDelegation_delegation_createdByTouserInput, UserUncheckedCreateWithoutDelegation_delegation_createdByTouserInput>
  }

  export type UserCreateWithoutDelegation_delegation_delegatedToTouserInput = {
    id: string
    name: string
    delegation_delegation_createdByTouser?: DelegationCreateNestedManyWithoutUser_delegation_createdByTouserInput
    report?: ReportCreateNestedManyWithoutUserInput
    udap: UdapCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutDelegation_delegation_delegatedToTouserInput = {
    id: string
    name: string
    udap_id: string
    delegation_delegation_createdByTouser?: DelegationUncheckedCreateNestedManyWithoutUser_delegation_createdByTouserInput
    report?: ReportUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutDelegation_delegation_delegatedToTouserInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutDelegation_delegation_delegatedToTouserInput, UserUncheckedCreateWithoutDelegation_delegation_delegatedToTouserInput>
  }

  export type UserUpsertWithoutDelegation_delegation_createdByTouserInput = {
    update: XOR<UserUpdateWithoutDelegation_delegation_createdByTouserInput, UserUncheckedUpdateWithoutDelegation_delegation_createdByTouserInput>
    create: XOR<UserCreateWithoutDelegation_delegation_createdByTouserInput, UserUncheckedCreateWithoutDelegation_delegation_createdByTouserInput>
  }

  export type UserUpdateWithoutDelegation_delegation_createdByTouserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    delegation_delegation_delegatedToTouser?: DelegationUpdateManyWithoutUser_delegation_delegatedToTouserNestedInput
    report?: ReportUpdateManyWithoutUserNestedInput
    udap?: UdapUpdateOneRequiredWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDelegation_delegation_createdByTouserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    udap_id?: StringFieldUpdateOperationsInput | string
    delegation_delegation_delegatedToTouser?: DelegationUncheckedUpdateManyWithoutUser_delegation_delegatedToTouserNestedInput
    report?: ReportUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUpsertWithoutDelegation_delegation_delegatedToTouserInput = {
    update: XOR<UserUpdateWithoutDelegation_delegation_delegatedToTouserInput, UserUncheckedUpdateWithoutDelegation_delegation_delegatedToTouserInput>
    create: XOR<UserCreateWithoutDelegation_delegation_delegatedToTouserInput, UserUncheckedCreateWithoutDelegation_delegation_delegatedToTouserInput>
  }

  export type UserUpdateWithoutDelegation_delegation_delegatedToTouserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    delegation_delegation_createdByTouser?: DelegationUpdateManyWithoutUser_delegation_createdByTouserNestedInput
    report?: ReportUpdateManyWithoutUserNestedInput
    udap?: UdapUpdateOneRequiredWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutDelegation_delegation_delegatedToTouserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    udap_id?: StringFieldUpdateOperationsInput | string
    delegation_delegation_createdByTouser?: DelegationUncheckedUpdateManyWithoutUser_delegation_createdByTouserNestedInput
    report?: ReportUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutReportInput = {
    id: string
    name: string
    delegation_delegation_createdByTouser?: DelegationCreateNestedManyWithoutUser_delegation_createdByTouserInput
    delegation_delegation_delegatedToTouser?: DelegationCreateNestedManyWithoutUser_delegation_delegatedToTouserInput
    udap: UdapCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutReportInput = {
    id: string
    name: string
    udap_id: string
    delegation_delegation_createdByTouser?: DelegationUncheckedCreateNestedManyWithoutUser_delegation_createdByTouserInput
    delegation_delegation_delegatedToTouser?: DelegationUncheckedCreateNestedManyWithoutUser_delegation_delegatedToTouserInput
  }

  export type UserCreateOrConnectWithoutReportInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutReportInput, UserUncheckedCreateWithoutReportInput>
  }

  export type UserUpsertWithoutReportInput = {
    update: XOR<UserUpdateWithoutReportInput, UserUncheckedUpdateWithoutReportInput>
    create: XOR<UserCreateWithoutReportInput, UserUncheckedCreateWithoutReportInput>
  }

  export type UserUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    delegation_delegation_createdByTouser?: DelegationUpdateManyWithoutUser_delegation_createdByTouserNestedInput
    delegation_delegation_delegatedToTouser?: DelegationUpdateManyWithoutUser_delegation_delegatedToTouserNestedInput
    udap?: UdapUpdateOneRequiredWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    udap_id?: StringFieldUpdateOperationsInput | string
    delegation_delegation_createdByTouser?: DelegationUncheckedUpdateManyWithoutUser_delegation_createdByTouserNestedInput
    delegation_delegation_delegatedToTouser?: DelegationUncheckedUpdateManyWithoutUser_delegation_delegatedToTouserNestedInput
  }

  export type UserCreateWithoutUdapInput = {
    id: string
    name: string
    delegation_delegation_createdByTouser?: DelegationCreateNestedManyWithoutUser_delegation_createdByTouserInput
    delegation_delegation_delegatedToTouser?: DelegationCreateNestedManyWithoutUser_delegation_delegatedToTouserInput
    report?: ReportCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUdapInput = {
    id: string
    name: string
    delegation_delegation_createdByTouser?: DelegationUncheckedCreateNestedManyWithoutUser_delegation_createdByTouserInput
    delegation_delegation_delegatedToTouser?: DelegationUncheckedCreateNestedManyWithoutUser_delegation_delegatedToTouserInput
    report?: ReportUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUdapInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUdapInput, UserUncheckedCreateWithoutUdapInput>
  }

  export type UserCreateManyUdapInputEnvelope = {
    data: Enumerable<UserCreateManyUdapInput>
    skipDuplicates?: boolean
  }

  export type UserUpsertWithWhereUniqueWithoutUdapInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutUdapInput, UserUncheckedUpdateWithoutUdapInput>
    create: XOR<UserCreateWithoutUdapInput, UserUncheckedCreateWithoutUdapInput>
  }

  export type UserUpdateWithWhereUniqueWithoutUdapInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutUdapInput, UserUncheckedUpdateWithoutUdapInput>
  }

  export type UserUpdateManyWithWhereWithoutUdapInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutUserInput>
  }

  export type UserScalarWhereInput = {
    AND?: Enumerable<UserScalarWhereInput>
    OR?: Enumerable<UserScalarWhereInput>
    NOT?: Enumerable<UserScalarWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    udap_id?: StringFilter | string
  }

  export type DelegationCreateWithoutUser_delegation_createdByTouserInput = {
    user_delegation_delegatedToTouser: UserCreateNestedOneWithoutDelegation_delegation_delegatedToTouserInput
  }

  export type DelegationUncheckedCreateWithoutUser_delegation_createdByTouserInput = {
    delegatedTo: string
  }

  export type DelegationCreateOrConnectWithoutUser_delegation_createdByTouserInput = {
    where: DelegationWhereUniqueInput
    create: XOR<DelegationCreateWithoutUser_delegation_createdByTouserInput, DelegationUncheckedCreateWithoutUser_delegation_createdByTouserInput>
  }

  export type DelegationCreateManyUser_delegation_createdByTouserInputEnvelope = {
    data: Enumerable<DelegationCreateManyUser_delegation_createdByTouserInput>
    skipDuplicates?: boolean
  }

  export type DelegationCreateWithoutUser_delegation_delegatedToTouserInput = {
    user_delegation_createdByTouser: UserCreateNestedOneWithoutDelegation_delegation_createdByTouserInput
  }

  export type DelegationUncheckedCreateWithoutUser_delegation_delegatedToTouserInput = {
    createdBy: string
  }

  export type DelegationCreateOrConnectWithoutUser_delegation_delegatedToTouserInput = {
    where: DelegationWhereUniqueInput
    create: XOR<DelegationCreateWithoutUser_delegation_delegatedToTouserInput, DelegationUncheckedCreateWithoutUser_delegation_delegatedToTouserInput>
  }

  export type DelegationCreateManyUser_delegation_delegatedToTouserInputEnvelope = {
    data: Enumerable<DelegationCreateManyUser_delegation_delegatedToTouserInput>
    skipDuplicates?: boolean
  }

  export type ReportCreateWithoutUserInput = {
    id: string
    title?: string | null
    projectDescription?: string | null
    redactedBy?: string | null
    meetDate?: Date | string | null
    applicantName?: string | null
    applicantAddress?: string | null
    projectCadastralRef?: string | null
    projectSpaceType?: string | null
    decision?: string | null
    precisions?: string | null
    contacts?: string | null
    furtherInformation?: string | null
    createdAt: Date | string
    serviceInstructeur?: number | null
    pdf?: string | null
    disabled?: boolean | null
    udap_id?: string | null
  }

  export type ReportUncheckedCreateWithoutUserInput = {
    id: string
    title?: string | null
    projectDescription?: string | null
    redactedBy?: string | null
    meetDate?: Date | string | null
    applicantName?: string | null
    applicantAddress?: string | null
    projectCadastralRef?: string | null
    projectSpaceType?: string | null
    decision?: string | null
    precisions?: string | null
    contacts?: string | null
    furtherInformation?: string | null
    createdAt: Date | string
    serviceInstructeur?: number | null
    pdf?: string | null
    disabled?: boolean | null
    udap_id?: string | null
  }

  export type ReportCreateOrConnectWithoutUserInput = {
    where: ReportWhereUniqueInput
    create: XOR<ReportCreateWithoutUserInput, ReportUncheckedCreateWithoutUserInput>
  }

  export type ReportCreateManyUserInputEnvelope = {
    data: Enumerable<ReportCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type UdapCreateWithoutUserInput = {
    id: string
    department: string
    completeCoords?: string | null
    visible?: boolean | null
    name?: string | null
    address?: string | null
    zipCode?: string | null
    city?: string | null
    phone?: string | null
    email?: string | null
  }

  export type UdapUncheckedCreateWithoutUserInput = {
    id: string
    department: string
    completeCoords?: string | null
    visible?: boolean | null
    name?: string | null
    address?: string | null
    zipCode?: string | null
    city?: string | null
    phone?: string | null
    email?: string | null
  }

  export type UdapCreateOrConnectWithoutUserInput = {
    where: UdapWhereUniqueInput
    create: XOR<UdapCreateWithoutUserInput, UdapUncheckedCreateWithoutUserInput>
  }

  export type DelegationUpsertWithWhereUniqueWithoutUser_delegation_createdByTouserInput = {
    where: DelegationWhereUniqueInput
    update: XOR<DelegationUpdateWithoutUser_delegation_createdByTouserInput, DelegationUncheckedUpdateWithoutUser_delegation_createdByTouserInput>
    create: XOR<DelegationCreateWithoutUser_delegation_createdByTouserInput, DelegationUncheckedCreateWithoutUser_delegation_createdByTouserInput>
  }

  export type DelegationUpdateWithWhereUniqueWithoutUser_delegation_createdByTouserInput = {
    where: DelegationWhereUniqueInput
    data: XOR<DelegationUpdateWithoutUser_delegation_createdByTouserInput, DelegationUncheckedUpdateWithoutUser_delegation_createdByTouserInput>
  }

  export type DelegationUpdateManyWithWhereWithoutUser_delegation_createdByTouserInput = {
    where: DelegationScalarWhereInput
    data: XOR<DelegationUpdateManyMutationInput, DelegationUncheckedUpdateManyWithoutDelegation_delegation_createdByTouserInput>
  }

  export type DelegationScalarWhereInput = {
    AND?: Enumerable<DelegationScalarWhereInput>
    OR?: Enumerable<DelegationScalarWhereInput>
    NOT?: Enumerable<DelegationScalarWhereInput>
    createdBy?: StringFilter | string
    delegatedTo?: StringFilter | string
  }

  export type DelegationUpsertWithWhereUniqueWithoutUser_delegation_delegatedToTouserInput = {
    where: DelegationWhereUniqueInput
    update: XOR<DelegationUpdateWithoutUser_delegation_delegatedToTouserInput, DelegationUncheckedUpdateWithoutUser_delegation_delegatedToTouserInput>
    create: XOR<DelegationCreateWithoutUser_delegation_delegatedToTouserInput, DelegationUncheckedCreateWithoutUser_delegation_delegatedToTouserInput>
  }

  export type DelegationUpdateWithWhereUniqueWithoutUser_delegation_delegatedToTouserInput = {
    where: DelegationWhereUniqueInput
    data: XOR<DelegationUpdateWithoutUser_delegation_delegatedToTouserInput, DelegationUncheckedUpdateWithoutUser_delegation_delegatedToTouserInput>
  }

  export type DelegationUpdateManyWithWhereWithoutUser_delegation_delegatedToTouserInput = {
    where: DelegationScalarWhereInput
    data: XOR<DelegationUpdateManyMutationInput, DelegationUncheckedUpdateManyWithoutDelegation_delegation_delegatedToTouserInput>
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
    title?: StringNullableFilter | string | null
    projectDescription?: StringNullableFilter | string | null
    redactedBy?: StringNullableFilter | string | null
    meetDate?: DateTimeNullableFilter | Date | string | null
    applicantName?: StringNullableFilter | string | null
    applicantAddress?: StringNullableFilter | string | null
    projectCadastralRef?: StringNullableFilter | string | null
    projectSpaceType?: StringNullableFilter | string | null
    decision?: StringNullableFilter | string | null
    precisions?: StringNullableFilter | string | null
    contacts?: StringNullableFilter | string | null
    furtherInformation?: StringNullableFilter | string | null
    createdBy?: StringFilter | string
    createdAt?: DateTimeFilter | Date | string
    serviceInstructeur?: IntNullableFilter | number | null
    pdf?: StringNullableFilter | string | null
    disabled?: BoolNullableFilter | boolean | null
    udap_id?: StringNullableFilter | string | null
  }

  export type UdapUpsertWithoutUserInput = {
    update: XOR<UdapUpdateWithoutUserInput, UdapUncheckedUpdateWithoutUserInput>
    create: XOR<UdapCreateWithoutUserInput, UdapUncheckedCreateWithoutUserInput>
  }

  export type UdapUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    completeCoords?: NullableStringFieldUpdateOperationsInput | string | null
    visible?: NullableBoolFieldUpdateOperationsInput | boolean | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UdapUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    department?: StringFieldUpdateOperationsInput | string
    completeCoords?: NullableStringFieldUpdateOperationsInput | string | null
    visible?: NullableBoolFieldUpdateOperationsInput | boolean | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null
    city?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserCreateManyUdapInput = {
    id: string
    name: string
  }

  export type UserUpdateWithoutUdapInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    delegation_delegation_createdByTouser?: DelegationUpdateManyWithoutUser_delegation_createdByTouserNestedInput
    delegation_delegation_delegatedToTouser?: DelegationUpdateManyWithoutUser_delegation_delegatedToTouserNestedInput
    report?: ReportUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUdapInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    delegation_delegation_createdByTouser?: DelegationUncheckedUpdateManyWithoutUser_delegation_createdByTouserNestedInput
    delegation_delegation_delegatedToTouser?: DelegationUncheckedUpdateManyWithoutUser_delegation_delegatedToTouserNestedInput
    report?: ReportUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
  }

  export type DelegationCreateManyUser_delegation_createdByTouserInput = {
    delegatedTo: string
  }

  export type DelegationCreateManyUser_delegation_delegatedToTouserInput = {
    createdBy: string
  }

  export type ReportCreateManyUserInput = {
    id: string
    title?: string | null
    projectDescription?: string | null
    redactedBy?: string | null
    meetDate?: Date | string | null
    applicantName?: string | null
    applicantAddress?: string | null
    projectCadastralRef?: string | null
    projectSpaceType?: string | null
    decision?: string | null
    precisions?: string | null
    contacts?: string | null
    furtherInformation?: string | null
    createdAt: Date | string
    serviceInstructeur?: number | null
    pdf?: string | null
    disabled?: boolean | null
    udap_id?: string | null
  }

  export type DelegationUpdateWithoutUser_delegation_createdByTouserInput = {
    user_delegation_delegatedToTouser?: UserUpdateOneRequiredWithoutDelegation_delegation_delegatedToTouserNestedInput
  }

  export type DelegationUncheckedUpdateWithoutUser_delegation_createdByTouserInput = {
    delegatedTo?: StringFieldUpdateOperationsInput | string
  }

  export type DelegationUncheckedUpdateManyWithoutDelegation_delegation_createdByTouserInput = {
    delegatedTo?: StringFieldUpdateOperationsInput | string
  }

  export type DelegationUpdateWithoutUser_delegation_delegatedToTouserInput = {
    user_delegation_createdByTouser?: UserUpdateOneRequiredWithoutDelegation_delegation_createdByTouserNestedInput
  }

  export type DelegationUncheckedUpdateWithoutUser_delegation_delegatedToTouserInput = {
    createdBy?: StringFieldUpdateOperationsInput | string
  }

  export type DelegationUncheckedUpdateManyWithoutDelegation_delegation_delegatedToTouserInput = {
    createdBy?: StringFieldUpdateOperationsInput | string
  }

  export type ReportUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    redactedBy?: NullableStringFieldUpdateOperationsInput | string | null
    meetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantAddress?: NullableStringFieldUpdateOperationsInput | string | null
    projectCadastralRef?: NullableStringFieldUpdateOperationsInput | string | null
    projectSpaceType?: NullableStringFieldUpdateOperationsInput | string | null
    decision?: NullableStringFieldUpdateOperationsInput | string | null
    precisions?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    furtherInformation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    serviceInstructeur?: NullableIntFieldUpdateOperationsInput | number | null
    pdf?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    udap_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReportUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    redactedBy?: NullableStringFieldUpdateOperationsInput | string | null
    meetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantAddress?: NullableStringFieldUpdateOperationsInput | string | null
    projectCadastralRef?: NullableStringFieldUpdateOperationsInput | string | null
    projectSpaceType?: NullableStringFieldUpdateOperationsInput | string | null
    decision?: NullableStringFieldUpdateOperationsInput | string | null
    precisions?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    furtherInformation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    serviceInstructeur?: NullableIntFieldUpdateOperationsInput | number | null
    pdf?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    udap_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ReportUncheckedUpdateManyWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: NullableStringFieldUpdateOperationsInput | string | null
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null
    redactedBy?: NullableStringFieldUpdateOperationsInput | string | null
    meetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null
    applicantAddress?: NullableStringFieldUpdateOperationsInput | string | null
    projectCadastralRef?: NullableStringFieldUpdateOperationsInput | string | null
    projectSpaceType?: NullableStringFieldUpdateOperationsInput | string | null
    decision?: NullableStringFieldUpdateOperationsInput | string | null
    precisions?: NullableStringFieldUpdateOperationsInput | string | null
    contacts?: NullableStringFieldUpdateOperationsInput | string | null
    furtherInformation?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    serviceInstructeur?: NullableIntFieldUpdateOperationsInput | number | null
    pdf?: NullableStringFieldUpdateOperationsInput | string | null
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null
    udap_id?: NullableStringFieldUpdateOperationsInput | string | null
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

type Buffer = Omit<Uint8Array, 'set'>
