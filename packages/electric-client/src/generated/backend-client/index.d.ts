/**
 * Client
 **/

import * as runtime from "@prisma/client/runtime/library";
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

export type atdatabases_migrations_appliedPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "atdatabases_migrations_applied";
  objects: {};
  scalars: $Extensions.GetResult<
    {
      id: bigint;
      index: number;
      name: string;
      script: string;
      applied_at: Date;
      ignored_error: string | null;
      obsolete: boolean;
    },
    ExtArgs["result"]["atdatabases_migrations_applied"]
  >;
  composites: {};
};

/**
 * Model atdatabases_migrations_applied
 *
 */
export type atdatabases_migrations_applied = runtime.Types.DefaultSelection<atdatabases_migrations_appliedPayload>;
export type atdatabases_migrations_versionPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "atdatabases_migrations_version";
  objects: {};
  scalars: $Extensions.GetResult<
    {
      id: number;
      version: string | null;
    },
    ExtArgs["result"]["atdatabases_migrations_version"]
  >;
  composites: {};
};

/**
 * Model atdatabases_migrations_version
 *
 */
export type atdatabases_migrations_version = runtime.Types.DefaultSelection<atdatabases_migrations_versionPayload>;
export type clausePayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "clause";
  objects: {
    report_to_clause: report_to_clausePayload<ExtArgs>[];
  };
  scalars: $Extensions.GetResult<
    {
      id: string;
      label: string;
      value: string;
    },
    ExtArgs["result"]["clause"]
  >;
  composites: {};
};

/**
 * Model clause
 *
 */
export type clause = runtime.Types.DefaultSelection<clausePayload>;
export type reportPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "report";
  objects: {
    user: userPayload<ExtArgs>;
    report_to_clause: report_to_clausePayload<ExtArgs>[];
  };
  scalars: $Extensions.GetResult<
    {
      id: string;
      title: string | null;
      projectDescription: string | null;
      redactedBy: string | null;
      meetDate: Date | null;
      applicantName: string | null;
      applicantAddress: string | null;
      projectCadastralRef: string | null;
      projectSpaceType: string | null;
      decision: string | null;
      precisions: string | null;
      contacts: string | null;
      furtherInformation: string | null;
      createdBy: string;
      createdAt: Date;
      serviceInstructeur: number | null;
      pdf: string | null;
      disabled: boolean | null;
      udap_id: string | null;
    },
    ExtArgs["result"]["report"]
  >;
  composites: {};
};

/**
 * Model report
 *
 */
export type report = runtime.Types.DefaultSelection<reportPayload>;
export type report_to_clausePayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "report_to_clause";
  objects: {
    clause: clausePayload<ExtArgs>;
    report: reportPayload<ExtArgs>;
  };
  scalars: $Extensions.GetResult<
    {
      id: string;
      reportId: string;
      clauseId: string;
    },
    ExtArgs["result"]["report_to_clause"]
  >;
  composites: {};
};

/**
 * Model report_to_clause
 *
 */
export type report_to_clause = runtime.Types.DefaultSelection<report_to_clausePayload>;
export type chipPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "chip";
  objects: {};
  scalars: $Extensions.GetResult<
    {
      key: string;
      value: string;
      udap_id: string;
      text: string;
    },
    ExtArgs["result"]["chip"]
  >;
  composites: {};
};

/**
 * Model chip
 *
 */
export type chip = runtime.Types.DefaultSelection<chipPayload>;
export type delegationPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "delegation";
  objects: {
    user_delegation_createdByTouser: userPayload<ExtArgs>;
    user_delegation_delegatedToTouser: userPayload<ExtArgs>;
  };
  scalars: $Extensions.GetResult<
    {
      createdBy: string;
      delegatedTo: string;
    },
    ExtArgs["result"]["delegation"]
  >;
  composites: {};
};

/**
 * Model delegation
 *
 */
export type delegation = runtime.Types.DefaultSelection<delegationPayload>;
export type udapPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "udap";
  objects: {
    user: userPayload<ExtArgs>[];
  };
  scalars: $Extensions.GetResult<
    {
      id: string;
      department: string;
      completeCoords: string | null;
      visible: boolean | null;
      name: string | null;
      address: string | null;
      zipCode: string | null;
      city: string | null;
      phone: string | null;
      email: string | null;
    },
    ExtArgs["result"]["udap"]
  >;
  composites: {};
};

/**
 * Model udap
 *
 */
export type udap = runtime.Types.DefaultSelection<udapPayload>;
export type userPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "user";
  objects: {
    delegation_delegation_createdByTouser: delegationPayload<ExtArgs>[];
    delegation_delegation_delegatedToTouser: delegationPayload<ExtArgs>[];
    internal_user: internal_userPayload<ExtArgs>[];
    report: reportPayload<ExtArgs>[];
    udap: udapPayload<ExtArgs>;
  };
  scalars: $Extensions.GetResult<
    {
      id: string;
      name: string;
      udap_id: string;
    },
    ExtArgs["result"]["user"]
  >;
  composites: {};
};

/**
 * Model user
 *
 */
export type user = runtime.Types.DefaultSelection<userPayload>;
export type whitelistPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "whitelist";
  objects: {};
  scalars: $Extensions.GetResult<
    {
      email: string;
    },
    ExtArgs["result"]["whitelist"]
  >;
  composites: {};
};

/**
 * Model whitelist
 *
 */
export type whitelist = runtime.Types.DefaultSelection<whitelistPayload>;
export type internal_userPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "internal_user";
  objects: {
    user: userPayload<ExtArgs>;
  };
  scalars: $Extensions.GetResult<
    {
      id: string;
      email: string;
      role: string;
      password: string;
      temporaryLink: string | null;
      temporaryLinkExpiresAt: string | null;
      userId: string;
    },
    ExtArgs["result"]["internal_user"]
  >;
  composites: {};
};

/**
 * Model internal_user
 *
 */
export type internal_user = runtime.Types.DefaultSelection<internal_userPayload>;

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
  U = "log" extends keyof T
    ? T["log"] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<T["log"]>
      : never
    : never,
  GlobalReject extends
    | Prisma.RejectOnNotFound
    | Prisma.RejectPerOperation
    | false
    | undefined = "rejectOnNotFound" extends keyof T ? T["rejectOnNotFound"] : false,
  ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["other"] };

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

  constructor(optionsArg?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U | "beforeExit">(
    eventType: V,
    callback: (
      event: V extends "query" ? Prisma.QueryEvent : V extends "beforeExit" ? () => Promise<void> : Prisma.LogEvent,
    ) => void,
  ): void;

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
  $use(cb: Prisma.Middleware): void;

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
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: { isolationLevel?: Prisma.TransactionIsolationLevel },
  ): Promise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => Promise<R>,
    options?: { maxWait?: number; timeout?: number; isolationLevel?: Prisma.TransactionIsolationLevel },
  ): Promise<R>;

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>;

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
   * `prisma.clause`: Exposes CRUD operations for the **clause** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Clauses
   * const clauses = await prisma.clause.findMany()
   * ```
   */
  get clause(): Prisma.clauseDelegate<GlobalReject, ExtArgs>;

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
   * `prisma.report_to_clause`: Exposes CRUD operations for the **report_to_clause** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Report_to_clauses
   * const report_to_clauses = await prisma.report_to_clause.findMany()
   * ```
   */
  get report_to_clause(): Prisma.report_to_clauseDelegate<GlobalReject, ExtArgs>;

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
   * `prisma.delegation`: Exposes CRUD operations for the **delegation** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Delegations
   * const delegations = await prisma.delegation.findMany()
   * ```
   */
  get delegation(): Prisma.delegationDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.udap`: Exposes CRUD operations for the **udap** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Udaps
   * const udaps = await prisma.udap.findMany()
   * ```
   */
  get udap(): Prisma.udapDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **user** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   */
  get user(): Prisma.userDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.whitelist`: Exposes CRUD operations for the **whitelist** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Whitelists
   * const whitelists = await prisma.whitelist.findMany()
   * ```
   */
  get whitelist(): Prisma.whitelistDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.internal_user`: Exposes CRUD operations for the **internal_user** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Internal_users
   * const internal_users = await prisma.internal_user.findMany()
   * ```
   */
  get internal_user(): Prisma.internal_userDelegate<GlobalReject, ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;
  export import NotFoundError = runtime.NotFoundError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics;
  export type Metric<T> = runtime.Metric<T>;
  export type MetricHistogram = runtime.MetricHistogram;
  export type MetricHistogramBucket = runtime.MetricHistogramBucket;

  /**
   * Extensions
   */
  export type Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export type Args<T, F extends $Public.Operation> = $Public.Args<T, F>;
  export type Payload<T, F extends $Public.Operation> = $Public.Payload<T, F>;
  export type Result<T, A, F extends $Public.Operation> = $Public.Result<T, A, F>;
  export type Exact<T, W> = $Public.Exact<T, W>;

  /**
   * Prisma Client JS version: 4.16.2
   * Query Engine version: d6e67a83f971b175a593ccc12e15c4a757f93ffe
   */
  export type PrismaVersion = {
    client: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from.
   */
  export type JsonObject = { [Key in string]?: JsonValue };

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null;

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = { readonly [Key in string]?: InputJsonValue | null };

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
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray;

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
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };
  type HasSelect = {
    select: any;
  };
  type HasInclude = {
    include: any;
  };
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? "Please either choose `select` or `include`"
    : T extends HasSelect
      ? U
      : T extends HasInclude
        ? U
        : S;

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

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
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude ? "Please either choose `select` or `include`." : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object ? (U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U) : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> =
    T extends Array<any>
      ? False
      : T extends Date
        ? False
        : T extends Uint8Array
          ? False
          : T extends BigInt
            ? False
            : T extends object
              ? True
              : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown
    ? _Either<O, K, strict>
    : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
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
      ? (K extends keyof O ? { [P in K]: O[P] } & O : O) | ({ [P in keyof O as P extends K ? K : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
      ? 1
      : 0;

  export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<T, U = Omit<T, "_avg" | "_sum" | "_count" | "_min" | "_max">> = IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<"OR", K>, Extends<"AND", K>>, Extends<"NOT", K>> extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
        ? never
        : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;

  export const ModelName: {
    atdatabases_migrations_applied: "atdatabases_migrations_applied";
    atdatabases_migrations_version: "atdatabases_migrations_version";
    clause: "clause";
    report: "report";
    report_to_clause: "report_to_clause";
    chip: "chip";
    delegation: "delegation";
    udap: "udap";
    user: "user";
    whitelist: "whitelist";
    internal_user: "internal_user";
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  export type Datasources = {
    db?: Datasource;
  };

  interface TypeMapCb extends $Utils.Fn<{ extArgs: $Extensions.Args }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this["params"]["extArgs"]>;
  }

  export type TypeMap<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    meta: {
      modelProps:
        | "atdatabases_migrations_applied"
        | "atdatabases_migrations_version"
        | "clause"
        | "report"
        | "report_to_clause"
        | "chip"
        | "delegation"
        | "udap"
        | "user"
        | "whitelist"
        | "internal_user";
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      atdatabases_migrations_applied: {
        payload: atdatabases_migrations_appliedPayload<ExtArgs>;
        operations: {
          findUnique: {
            args: Prisma.atdatabases_migrations_appliedFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<atdatabases_migrations_appliedPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.atdatabases_migrations_appliedFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<atdatabases_migrations_appliedPayload>;
          };
          findFirst: {
            args: Prisma.atdatabases_migrations_appliedFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<atdatabases_migrations_appliedPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.atdatabases_migrations_appliedFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<atdatabases_migrations_appliedPayload>;
          };
          findMany: {
            args: Prisma.atdatabases_migrations_appliedFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<atdatabases_migrations_appliedPayload>[];
          };
          create: {
            args: Prisma.atdatabases_migrations_appliedCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<atdatabases_migrations_appliedPayload>;
          };
          createMany: {
            args: Prisma.atdatabases_migrations_appliedCreateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          delete: {
            args: Prisma.atdatabases_migrations_appliedDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<atdatabases_migrations_appliedPayload>;
          };
          update: {
            args: Prisma.atdatabases_migrations_appliedUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<atdatabases_migrations_appliedPayload>;
          };
          deleteMany: {
            args: Prisma.atdatabases_migrations_appliedDeleteManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          updateMany: {
            args: Prisma.atdatabases_migrations_appliedUpdateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          upsert: {
            args: Prisma.atdatabases_migrations_appliedUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<atdatabases_migrations_appliedPayload>;
          };
          aggregate: {
            args: Prisma.Atdatabases_migrations_appliedAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateAtdatabases_migrations_applied>;
          };
          groupBy: {
            args: Prisma.Atdatabases_migrations_appliedGroupByArgs<ExtArgs>;
            result: $Utils.Optional<Atdatabases_migrations_appliedGroupByOutputType>[];
          };
          count: {
            args: Prisma.atdatabases_migrations_appliedCountArgs<ExtArgs>;
            result: $Utils.Optional<Atdatabases_migrations_appliedCountAggregateOutputType> | number;
          };
        };
      };
      atdatabases_migrations_version: {
        payload: atdatabases_migrations_versionPayload<ExtArgs>;
        operations: {
          findUnique: {
            args: Prisma.atdatabases_migrations_versionFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<atdatabases_migrations_versionPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.atdatabases_migrations_versionFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<atdatabases_migrations_versionPayload>;
          };
          findFirst: {
            args: Prisma.atdatabases_migrations_versionFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<atdatabases_migrations_versionPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.atdatabases_migrations_versionFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<atdatabases_migrations_versionPayload>;
          };
          findMany: {
            args: Prisma.atdatabases_migrations_versionFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<atdatabases_migrations_versionPayload>[];
          };
          create: {
            args: Prisma.atdatabases_migrations_versionCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<atdatabases_migrations_versionPayload>;
          };
          createMany: {
            args: Prisma.atdatabases_migrations_versionCreateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          delete: {
            args: Prisma.atdatabases_migrations_versionDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<atdatabases_migrations_versionPayload>;
          };
          update: {
            args: Prisma.atdatabases_migrations_versionUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<atdatabases_migrations_versionPayload>;
          };
          deleteMany: {
            args: Prisma.atdatabases_migrations_versionDeleteManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          updateMany: {
            args: Prisma.atdatabases_migrations_versionUpdateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          upsert: {
            args: Prisma.atdatabases_migrations_versionUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<atdatabases_migrations_versionPayload>;
          };
          aggregate: {
            args: Prisma.Atdatabases_migrations_versionAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateAtdatabases_migrations_version>;
          };
          groupBy: {
            args: Prisma.Atdatabases_migrations_versionGroupByArgs<ExtArgs>;
            result: $Utils.Optional<Atdatabases_migrations_versionGroupByOutputType>[];
          };
          count: {
            args: Prisma.atdatabases_migrations_versionCountArgs<ExtArgs>;
            result: $Utils.Optional<Atdatabases_migrations_versionCountAggregateOutputType> | number;
          };
        };
      };
      clause: {
        payload: clausePayload<ExtArgs>;
        operations: {
          findUnique: {
            args: Prisma.clauseFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<clausePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.clauseFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<clausePayload>;
          };
          findFirst: {
            args: Prisma.clauseFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<clausePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.clauseFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<clausePayload>;
          };
          findMany: {
            args: Prisma.clauseFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<clausePayload>[];
          };
          create: {
            args: Prisma.clauseCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<clausePayload>;
          };
          createMany: {
            args: Prisma.clauseCreateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          delete: {
            args: Prisma.clauseDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<clausePayload>;
          };
          update: {
            args: Prisma.clauseUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<clausePayload>;
          };
          deleteMany: {
            args: Prisma.clauseDeleteManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          updateMany: {
            args: Prisma.clauseUpdateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          upsert: {
            args: Prisma.clauseUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<clausePayload>;
          };
          aggregate: {
            args: Prisma.ClauseAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateClause>;
          };
          groupBy: {
            args: Prisma.ClauseGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ClauseGroupByOutputType>[];
          };
          count: {
            args: Prisma.clauseCountArgs<ExtArgs>;
            result: $Utils.Optional<ClauseCountAggregateOutputType> | number;
          };
        };
      };
      report: {
        payload: reportPayload<ExtArgs>;
        operations: {
          findUnique: {
            args: Prisma.reportFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<reportPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.reportFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<reportPayload>;
          };
          findFirst: {
            args: Prisma.reportFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<reportPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.reportFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<reportPayload>;
          };
          findMany: {
            args: Prisma.reportFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<reportPayload>[];
          };
          create: {
            args: Prisma.reportCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<reportPayload>;
          };
          createMany: {
            args: Prisma.reportCreateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          delete: {
            args: Prisma.reportDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<reportPayload>;
          };
          update: {
            args: Prisma.reportUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<reportPayload>;
          };
          deleteMany: {
            args: Prisma.reportDeleteManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          updateMany: {
            args: Prisma.reportUpdateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          upsert: {
            args: Prisma.reportUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<reportPayload>;
          };
          aggregate: {
            args: Prisma.ReportAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateReport>;
          };
          groupBy: {
            args: Prisma.ReportGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ReportGroupByOutputType>[];
          };
          count: {
            args: Prisma.reportCountArgs<ExtArgs>;
            result: $Utils.Optional<ReportCountAggregateOutputType> | number;
          };
        };
      };
      report_to_clause: {
        payload: report_to_clausePayload<ExtArgs>;
        operations: {
          findUnique: {
            args: Prisma.report_to_clauseFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<report_to_clausePayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.report_to_clauseFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<report_to_clausePayload>;
          };
          findFirst: {
            args: Prisma.report_to_clauseFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<report_to_clausePayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.report_to_clauseFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<report_to_clausePayload>;
          };
          findMany: {
            args: Prisma.report_to_clauseFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<report_to_clausePayload>[];
          };
          create: {
            args: Prisma.report_to_clauseCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<report_to_clausePayload>;
          };
          createMany: {
            args: Prisma.report_to_clauseCreateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          delete: {
            args: Prisma.report_to_clauseDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<report_to_clausePayload>;
          };
          update: {
            args: Prisma.report_to_clauseUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<report_to_clausePayload>;
          };
          deleteMany: {
            args: Prisma.report_to_clauseDeleteManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          updateMany: {
            args: Prisma.report_to_clauseUpdateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          upsert: {
            args: Prisma.report_to_clauseUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<report_to_clausePayload>;
          };
          aggregate: {
            args: Prisma.Report_to_clauseAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateReport_to_clause>;
          };
          groupBy: {
            args: Prisma.Report_to_clauseGroupByArgs<ExtArgs>;
            result: $Utils.Optional<Report_to_clauseGroupByOutputType>[];
          };
          count: {
            args: Prisma.report_to_clauseCountArgs<ExtArgs>;
            result: $Utils.Optional<Report_to_clauseCountAggregateOutputType> | number;
          };
        };
      };
      chip: {
        payload: chipPayload<ExtArgs>;
        operations: {
          findUnique: {
            args: Prisma.chipFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<chipPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.chipFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<chipPayload>;
          };
          findFirst: {
            args: Prisma.chipFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<chipPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.chipFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<chipPayload>;
          };
          findMany: {
            args: Prisma.chipFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<chipPayload>[];
          };
          create: {
            args: Prisma.chipCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<chipPayload>;
          };
          createMany: {
            args: Prisma.chipCreateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          delete: {
            args: Prisma.chipDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<chipPayload>;
          };
          update: {
            args: Prisma.chipUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<chipPayload>;
          };
          deleteMany: {
            args: Prisma.chipDeleteManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          updateMany: {
            args: Prisma.chipUpdateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          upsert: {
            args: Prisma.chipUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<chipPayload>;
          };
          aggregate: {
            args: Prisma.ChipAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateChip>;
          };
          groupBy: {
            args: Prisma.ChipGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ChipGroupByOutputType>[];
          };
          count: {
            args: Prisma.chipCountArgs<ExtArgs>;
            result: $Utils.Optional<ChipCountAggregateOutputType> | number;
          };
        };
      };
      delegation: {
        payload: delegationPayload<ExtArgs>;
        operations: {
          findUnique: {
            args: Prisma.delegationFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<delegationPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.delegationFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<delegationPayload>;
          };
          findFirst: {
            args: Prisma.delegationFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<delegationPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.delegationFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<delegationPayload>;
          };
          findMany: {
            args: Prisma.delegationFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<delegationPayload>[];
          };
          create: {
            args: Prisma.delegationCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<delegationPayload>;
          };
          createMany: {
            args: Prisma.delegationCreateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          delete: {
            args: Prisma.delegationDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<delegationPayload>;
          };
          update: {
            args: Prisma.delegationUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<delegationPayload>;
          };
          deleteMany: {
            args: Prisma.delegationDeleteManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          updateMany: {
            args: Prisma.delegationUpdateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          upsert: {
            args: Prisma.delegationUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<delegationPayload>;
          };
          aggregate: {
            args: Prisma.DelegationAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateDelegation>;
          };
          groupBy: {
            args: Prisma.DelegationGroupByArgs<ExtArgs>;
            result: $Utils.Optional<DelegationGroupByOutputType>[];
          };
          count: {
            args: Prisma.delegationCountArgs<ExtArgs>;
            result: $Utils.Optional<DelegationCountAggregateOutputType> | number;
          };
        };
      };
      udap: {
        payload: udapPayload<ExtArgs>;
        operations: {
          findUnique: {
            args: Prisma.udapFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<udapPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.udapFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<udapPayload>;
          };
          findFirst: {
            args: Prisma.udapFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<udapPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.udapFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<udapPayload>;
          };
          findMany: {
            args: Prisma.udapFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<udapPayload>[];
          };
          create: {
            args: Prisma.udapCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<udapPayload>;
          };
          createMany: {
            args: Prisma.udapCreateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          delete: {
            args: Prisma.udapDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<udapPayload>;
          };
          update: {
            args: Prisma.udapUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<udapPayload>;
          };
          deleteMany: {
            args: Prisma.udapDeleteManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          updateMany: {
            args: Prisma.udapUpdateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          upsert: {
            args: Prisma.udapUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<udapPayload>;
          };
          aggregate: {
            args: Prisma.UdapAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateUdap>;
          };
          groupBy: {
            args: Prisma.UdapGroupByArgs<ExtArgs>;
            result: $Utils.Optional<UdapGroupByOutputType>[];
          };
          count: {
            args: Prisma.udapCountArgs<ExtArgs>;
            result: $Utils.Optional<UdapCountAggregateOutputType> | number;
          };
        };
      };
      user: {
        payload: userPayload<ExtArgs>;
        operations: {
          findUnique: {
            args: Prisma.userFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<userPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.userFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<userPayload>;
          };
          findFirst: {
            args: Prisma.userFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<userPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.userFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<userPayload>;
          };
          findMany: {
            args: Prisma.userFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<userPayload>[];
          };
          create: {
            args: Prisma.userCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<userPayload>;
          };
          createMany: {
            args: Prisma.userCreateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          delete: {
            args: Prisma.userDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<userPayload>;
          };
          update: {
            args: Prisma.userUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<userPayload>;
          };
          deleteMany: {
            args: Prisma.userDeleteManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          updateMany: {
            args: Prisma.userUpdateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          upsert: {
            args: Prisma.userUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<userPayload>;
          };
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateUser>;
          };
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>;
            result: $Utils.Optional<UserGroupByOutputType>[];
          };
          count: {
            args: Prisma.userCountArgs<ExtArgs>;
            result: $Utils.Optional<UserCountAggregateOutputType> | number;
          };
        };
      };
      whitelist: {
        payload: whitelistPayload<ExtArgs>;
        operations: {
          findUnique: {
            args: Prisma.whitelistFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<whitelistPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.whitelistFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<whitelistPayload>;
          };
          findFirst: {
            args: Prisma.whitelistFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<whitelistPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.whitelistFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<whitelistPayload>;
          };
          findMany: {
            args: Prisma.whitelistFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<whitelistPayload>[];
          };
          create: {
            args: Prisma.whitelistCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<whitelistPayload>;
          };
          createMany: {
            args: Prisma.whitelistCreateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          delete: {
            args: Prisma.whitelistDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<whitelistPayload>;
          };
          update: {
            args: Prisma.whitelistUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<whitelistPayload>;
          };
          deleteMany: {
            args: Prisma.whitelistDeleteManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          updateMany: {
            args: Prisma.whitelistUpdateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          upsert: {
            args: Prisma.whitelistUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<whitelistPayload>;
          };
          aggregate: {
            args: Prisma.WhitelistAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateWhitelist>;
          };
          groupBy: {
            args: Prisma.WhitelistGroupByArgs<ExtArgs>;
            result: $Utils.Optional<WhitelistGroupByOutputType>[];
          };
          count: {
            args: Prisma.whitelistCountArgs<ExtArgs>;
            result: $Utils.Optional<WhitelistCountAggregateOutputType> | number;
          };
        };
      };
      internal_user: {
        payload: internal_userPayload<ExtArgs>;
        operations: {
          findUnique: {
            args: Prisma.internal_userFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<internal_userPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.internal_userFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<internal_userPayload>;
          };
          findFirst: {
            args: Prisma.internal_userFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<internal_userPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.internal_userFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<internal_userPayload>;
          };
          findMany: {
            args: Prisma.internal_userFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<internal_userPayload>[];
          };
          create: {
            args: Prisma.internal_userCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<internal_userPayload>;
          };
          createMany: {
            args: Prisma.internal_userCreateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          delete: {
            args: Prisma.internal_userDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<internal_userPayload>;
          };
          update: {
            args: Prisma.internal_userUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<internal_userPayload>;
          };
          deleteMany: {
            args: Prisma.internal_userDeleteManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          updateMany: {
            args: Prisma.internal_userUpdateManyArgs<ExtArgs>;
            result: Prisma.BatchPayload;
          };
          upsert: {
            args: Prisma.internal_userUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<internal_userPayload>;
          };
          aggregate: {
            args: Prisma.Internal_userAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateInternal_user>;
          };
          groupBy: {
            args: Prisma.Internal_userGroupByArgs<ExtArgs>;
            result: $Utils.Optional<Internal_userGroupByOutputType>[];
          };
          count: {
            args: Prisma.internal_userCountArgs<ExtArgs>;
            result: $Utils.Optional<Internal_userCountAggregateOutputType> | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>;
  export type DefaultPrismaClient = PrismaClient;
  export type RejectOnNotFound = boolean | ((error: Error) => Error);
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound };
  export type RejectPerOperation = { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound };
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False;
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions["rejectOnNotFound"],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName,
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
      : IsReject<GlobalRejectSettings>;
  export type ErrorFormat = "pretty" | "colorless" | "minimal";

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
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation;
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources;

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;

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
    log?: Array<LogLevel | LogDefinition>;
  }

  /* Types for Logging */
  export type LogLevel = "info" | "query" | "warn" | "error";
  export type LogDefinition = {
    level: LogLevel;
    emit: "stdout" | "event";
  };

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition
    ? T["emit"] extends "event"
      ? T["level"]
      : never
    : never;
  export type GetEvents<T extends any> =
    T extends Array<LogLevel | LogDefinition>
      ? GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
      : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | "findUnique"
    | "findMany"
    | "findFirst"
    | "create"
    | "createMany"
    | "update"
    | "updateMany"
    | "upsert"
    | "delete"
    | "deleteMany"
    | "executeRaw"
    | "queryRaw"
    | "aggregate"
    | "count"
    | "runCommandRaw"
    | "findRaw";

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName;
    action: PrismaAction;
    args: any;
    dataPath: string[];
    runInTransaction: boolean;
  };

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>;

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type ClauseCountOutputType
   */

  export type ClauseCountOutputType = {
    report_to_clause: number;
  };

  export type ClauseCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    report_to_clause?: boolean | ClauseCountOutputTypeCountReport_to_clauseArgs;
  };

  // Custom InputTypes

  /**
   * ClauseCountOutputType without action
   */
  export type ClauseCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClauseCountOutputType
     */
    select?: ClauseCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * ClauseCountOutputType without action
   */
  export type ClauseCountOutputTypeCountReport_to_clauseArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    where?: report_to_clauseWhereInput;
  };

  /**
   * Count Type ReportCountOutputType
   */

  export type ReportCountOutputType = {
    report_to_clause: number;
  };

  export type ReportCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    report_to_clause?: boolean | ReportCountOutputTypeCountReport_to_clauseArgs;
  };

  // Custom InputTypes

  /**
   * ReportCountOutputType without action
   */
  export type ReportCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ReportCountOutputType
     */
    select?: ReportCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * ReportCountOutputType without action
   */
  export type ReportCountOutputTypeCountReport_to_clauseArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    where?: report_to_clauseWhereInput;
  };

  /**
   * Count Type UdapCountOutputType
   */

  export type UdapCountOutputType = {
    user: number;
  };

  export type UdapCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    user?: boolean | UdapCountOutputTypeCountUserArgs;
  };

  // Custom InputTypes

  /**
   * UdapCountOutputType without action
   */
  export type UdapCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UdapCountOutputType
     */
    select?: UdapCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * UdapCountOutputType without action
   */
  export type UdapCountOutputTypeCountUserArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: userWhereInput;
  };

  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    delegation_delegation_createdByTouser: number;
    delegation_delegation_delegatedToTouser: number;
    internal_user: number;
    report: number;
  };

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    delegation_delegation_createdByTouser?: boolean | UserCountOutputTypeCountDelegation_delegation_createdByTouserArgs;
    delegation_delegation_delegatedToTouser?:
      | boolean
      | UserCountOutputTypeCountDelegation_delegation_delegatedToTouserArgs;
    internal_user?: boolean | UserCountOutputTypeCountInternal_userArgs;
    report?: boolean | UserCountOutputTypeCountReportArgs;
  };

  // Custom InputTypes

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDelegation_delegation_createdByTouserArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    where?: delegationWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountDelegation_delegation_delegatedToTouserArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    where?: delegationWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInternal_userArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: internal_userWhereInput;
  };

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountReportArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: reportWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model atdatabases_migrations_applied
   */

  export type AggregateAtdatabases_migrations_applied = {
    _count: Atdatabases_migrations_appliedCountAggregateOutputType | null;
    _avg: Atdatabases_migrations_appliedAvgAggregateOutputType | null;
    _sum: Atdatabases_migrations_appliedSumAggregateOutputType | null;
    _min: Atdatabases_migrations_appliedMinAggregateOutputType | null;
    _max: Atdatabases_migrations_appliedMaxAggregateOutputType | null;
  };

  export type Atdatabases_migrations_appliedAvgAggregateOutputType = {
    id: number | null;
    index: number | null;
  };

  export type Atdatabases_migrations_appliedSumAggregateOutputType = {
    id: bigint | null;
    index: number | null;
  };

  export type Atdatabases_migrations_appliedMinAggregateOutputType = {
    id: bigint | null;
    index: number | null;
    name: string | null;
    script: string | null;
    applied_at: Date | null;
    ignored_error: string | null;
    obsolete: boolean | null;
  };

  export type Atdatabases_migrations_appliedMaxAggregateOutputType = {
    id: bigint | null;
    index: number | null;
    name: string | null;
    script: string | null;
    applied_at: Date | null;
    ignored_error: string | null;
    obsolete: boolean | null;
  };

  export type Atdatabases_migrations_appliedCountAggregateOutputType = {
    id: number;
    index: number;
    name: number;
    script: number;
    applied_at: number;
    ignored_error: number;
    obsolete: number;
    _all: number;
  };

  export type Atdatabases_migrations_appliedAvgAggregateInputType = {
    id?: true;
    index?: true;
  };

  export type Atdatabases_migrations_appliedSumAggregateInputType = {
    id?: true;
    index?: true;
  };

  export type Atdatabases_migrations_appliedMinAggregateInputType = {
    id?: true;
    index?: true;
    name?: true;
    script?: true;
    applied_at?: true;
    ignored_error?: true;
    obsolete?: true;
  };

  export type Atdatabases_migrations_appliedMaxAggregateInputType = {
    id?: true;
    index?: true;
    name?: true;
    script?: true;
    applied_at?: true;
    ignored_error?: true;
    obsolete?: true;
  };

  export type Atdatabases_migrations_appliedCountAggregateInputType = {
    id?: true;
    index?: true;
    name?: true;
    script?: true;
    applied_at?: true;
    ignored_error?: true;
    obsolete?: true;
    _all?: true;
  };

  export type Atdatabases_migrations_appliedAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> =
    {
      /**
       * Filter which atdatabases_migrations_applied to aggregate.
       */
      where?: atdatabases_migrations_appliedWhereInput;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
       *
       * Determine the order of atdatabases_migrations_applieds to fetch.
       */
      orderBy?: Enumerable<atdatabases_migrations_appliedOrderByWithRelationInput>;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
       *
       * Sets the start position
       */
      cursor?: atdatabases_migrations_appliedWhereUniqueInput;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Take `±n` atdatabases_migrations_applieds from the position of the cursor.
       */
      take?: number;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Skip the first `n` atdatabases_migrations_applieds.
       */
      skip?: number;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
       *
       * Count returned atdatabases_migrations_applieds
       **/
      _count?: true | Atdatabases_migrations_appliedCountAggregateInputType;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
       *
       * Select which fields to average
       **/
      _avg?: Atdatabases_migrations_appliedAvgAggregateInputType;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
       *
       * Select which fields to sum
       **/
      _sum?: Atdatabases_migrations_appliedSumAggregateInputType;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
       *
       * Select which fields to find the minimum value
       **/
      _min?: Atdatabases_migrations_appliedMinAggregateInputType;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
       *
       * Select which fields to find the maximum value
       **/
      _max?: Atdatabases_migrations_appliedMaxAggregateInputType;
    };

  export type GetAtdatabases_migrations_appliedAggregateType<T extends Atdatabases_migrations_appliedAggregateArgs> = {
    [P in keyof T & keyof AggregateAtdatabases_migrations_applied]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAtdatabases_migrations_applied[P]>
      : GetScalarType<T[P], AggregateAtdatabases_migrations_applied[P]>;
  };

  export type Atdatabases_migrations_appliedGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: atdatabases_migrations_appliedWhereInput;
    orderBy?: Enumerable<atdatabases_migrations_appliedOrderByWithAggregationInput>;
    by: Atdatabases_migrations_appliedScalarFieldEnum[];
    having?: atdatabases_migrations_appliedScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Atdatabases_migrations_appliedCountAggregateInputType | true;
    _avg?: Atdatabases_migrations_appliedAvgAggregateInputType;
    _sum?: Atdatabases_migrations_appliedSumAggregateInputType;
    _min?: Atdatabases_migrations_appliedMinAggregateInputType;
    _max?: Atdatabases_migrations_appliedMaxAggregateInputType;
  };

  export type Atdatabases_migrations_appliedGroupByOutputType = {
    id: bigint;
    index: number;
    name: string;
    script: string;
    applied_at: Date;
    ignored_error: string | null;
    obsolete: boolean;
    _count: Atdatabases_migrations_appliedCountAggregateOutputType | null;
    _avg: Atdatabases_migrations_appliedAvgAggregateOutputType | null;
    _sum: Atdatabases_migrations_appliedSumAggregateOutputType | null;
    _min: Atdatabases_migrations_appliedMinAggregateOutputType | null;
    _max: Atdatabases_migrations_appliedMaxAggregateOutputType | null;
  };

  type GetAtdatabases_migrations_appliedGroupByPayload<T extends Atdatabases_migrations_appliedGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickArray<Atdatabases_migrations_appliedGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof Atdatabases_migrations_appliedGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Atdatabases_migrations_appliedGroupByOutputType[P]>
            : GetScalarType<T[P], Atdatabases_migrations_appliedGroupByOutputType[P]>;
        }
      >
    >;

  export type atdatabases_migrations_appliedSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        index?: boolean;
        name?: boolean;
        script?: boolean;
        applied_at?: boolean;
        ignored_error?: boolean;
        obsolete?: boolean;
      },
      ExtArgs["result"]["atdatabases_migrations_applied"]
    >;

  export type atdatabases_migrations_appliedSelectScalar = {
    id?: boolean;
    index?: boolean;
    name?: boolean;
    script?: boolean;
    applied_at?: boolean;
    ignored_error?: boolean;
    obsolete?: boolean;
  };

  type atdatabases_migrations_appliedGetPayload<
    S extends boolean | null | undefined | atdatabases_migrations_appliedArgs,
  > = $Types.GetResult<atdatabases_migrations_appliedPayload, S>;

  type atdatabases_migrations_appliedCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = Omit<
    atdatabases_migrations_appliedFindManyArgs,
    "select" | "include"
  > & {
    select?: Atdatabases_migrations_appliedCountAggregateInputType | true;
  };

  export interface atdatabases_migrations_appliedDelegate<
    GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined,
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["atdatabases_migrations_applied"];
      meta: { name: "atdatabases_migrations_applied" };
    };
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
    findUnique<
      T extends atdatabases_migrations_appliedFindUniqueArgs<ExtArgs>,
      LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined,
    >(
      args: SelectSubset<T, atdatabases_migrations_appliedFindUniqueArgs<ExtArgs>>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, "findUnique", "atdatabases_migrations_applied"> extends True
      ? Prisma__atdatabases_migrations_appliedClient<
          $Types.GetResult<atdatabases_migrations_appliedPayload<ExtArgs>, T, "findUnique", never>,
          never,
          ExtArgs
        >
      : Prisma__atdatabases_migrations_appliedClient<
          $Types.GetResult<atdatabases_migrations_appliedPayload<ExtArgs>, T, "findUnique", never> | null,
          null,
          ExtArgs
        >;

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
      args?: SelectSubset<T, atdatabases_migrations_appliedFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__atdatabases_migrations_appliedClient<
      $Types.GetResult<atdatabases_migrations_appliedPayload<ExtArgs>, T, "findUniqueOrThrow", never>,
      never,
      ExtArgs
    >;

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
    findFirst<
      T extends atdatabases_migrations_appliedFindFirstArgs<ExtArgs>,
      LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined,
    >(
      args?: SelectSubset<T, atdatabases_migrations_appliedFindFirstArgs<ExtArgs>>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, "findFirst", "atdatabases_migrations_applied"> extends True
      ? Prisma__atdatabases_migrations_appliedClient<
          $Types.GetResult<atdatabases_migrations_appliedPayload<ExtArgs>, T, "findFirst", never>,
          never,
          ExtArgs
        >
      : Prisma__atdatabases_migrations_appliedClient<
          $Types.GetResult<atdatabases_migrations_appliedPayload<ExtArgs>, T, "findFirst", never> | null,
          null,
          ExtArgs
        >;

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
      args?: SelectSubset<T, atdatabases_migrations_appliedFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__atdatabases_migrations_appliedClient<
      $Types.GetResult<atdatabases_migrations_appliedPayload<ExtArgs>, T, "findFirstOrThrow", never>,
      never,
      ExtArgs
    >;

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
      args?: SelectSubset<T, atdatabases_migrations_appliedFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Types.GetResult<atdatabases_migrations_appliedPayload<ExtArgs>, T, "findMany", never>>;

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
      args: SelectSubset<T, atdatabases_migrations_appliedCreateArgs<ExtArgs>>,
    ): Prisma__atdatabases_migrations_appliedClient<
      $Types.GetResult<atdatabases_migrations_appliedPayload<ExtArgs>, T, "create", never>,
      never,
      ExtArgs
    >;

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
      args?: SelectSubset<T, atdatabases_migrations_appliedCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

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
      args: SelectSubset<T, atdatabases_migrations_appliedDeleteArgs<ExtArgs>>,
    ): Prisma__atdatabases_migrations_appliedClient<
      $Types.GetResult<atdatabases_migrations_appliedPayload<ExtArgs>, T, "delete", never>,
      never,
      ExtArgs
    >;

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
      args: SelectSubset<T, atdatabases_migrations_appliedUpdateArgs<ExtArgs>>,
    ): Prisma__atdatabases_migrations_appliedClient<
      $Types.GetResult<atdatabases_migrations_appliedPayload<ExtArgs>, T, "update", never>,
      never,
      ExtArgs
    >;

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
      args?: SelectSubset<T, atdatabases_migrations_appliedDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

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
      args: SelectSubset<T, atdatabases_migrations_appliedUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

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
      args: SelectSubset<T, atdatabases_migrations_appliedUpsertArgs<ExtArgs>>,
    ): Prisma__atdatabases_migrations_appliedClient<
      $Types.GetResult<atdatabases_migrations_appliedPayload<ExtArgs>, T, "upsert", never>,
      never,
      ExtArgs
    >;

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
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], Atdatabases_migrations_appliedCountAggregateOutputType>
        : number
    >;

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
    aggregate<T extends Atdatabases_migrations_appliedAggregateArgs>(
      args: Subset<T, Atdatabases_migrations_appliedAggregateArgs>,
    ): Prisma.PrismaPromise<GetAtdatabases_migrations_appliedAggregateType<T>>;

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
      HasSelectOrTake extends Or<Extends<"skip", Keys<T>>, Extends<"take", Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Atdatabases_migrations_appliedGroupByArgs["orderBy"] }
        : { orderBy?: Atdatabases_migrations_appliedGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
      ByFields extends TupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, "Field ", P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, Atdatabases_migrations_appliedGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetAtdatabases_migrations_appliedGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
  }

  /**
   * The delegate class that acts as a "Promise-like" for atdatabases_migrations_applied.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__atdatabases_migrations_appliedClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > implements Prisma.PrismaPromise<T>
  {
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
    readonly [Symbol.toStringTag]: "PrismaPromise";
    constructor(
      _dmmf: runtime.DMMFClass,
      _queryType: "query" | "mutation",
      _rootField: string,
      _clientMethod: string,
      _args: any,
      _dataPath: string[],
      _errorFormat: ErrorFormat,
      _measurePerformance?: boolean | undefined,
      _isList?: boolean,
    );

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): Promise<T | TResult>;
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
  export type atdatabases_migrations_appliedFindUniqueArgsBase<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_applied
     */
    select?: atdatabases_migrations_appliedSelect<ExtArgs> | null;
    /**
     * Filter, which atdatabases_migrations_applied to fetch.
     */
    where: atdatabases_migrations_appliedWhereUniqueInput;
  };

  /**
   * atdatabases_migrations_applied findUnique
   */
  export interface atdatabases_migrations_appliedFindUniqueArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > extends atdatabases_migrations_appliedFindUniqueArgsBase<ExtArgs> {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound;
  }

  /**
   * atdatabases_migrations_applied findUniqueOrThrow
   */
  export type atdatabases_migrations_appliedFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_applied
     */
    select?: atdatabases_migrations_appliedSelect<ExtArgs> | null;
    /**
     * Filter, which atdatabases_migrations_applied to fetch.
     */
    where: atdatabases_migrations_appliedWhereUniqueInput;
  };

  /**
   * atdatabases_migrations_applied base type for findFirst actions
   */
  export type atdatabases_migrations_appliedFindFirstArgsBase<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_applied
     */
    select?: atdatabases_migrations_appliedSelect<ExtArgs> | null;
    /**
     * Filter, which atdatabases_migrations_applied to fetch.
     */
    where?: atdatabases_migrations_appliedWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of atdatabases_migrations_applieds to fetch.
     */
    orderBy?: Enumerable<atdatabases_migrations_appliedOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for atdatabases_migrations_applieds.
     */
    cursor?: atdatabases_migrations_appliedWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` atdatabases_migrations_applieds from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` atdatabases_migrations_applieds.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of atdatabases_migrations_applieds.
     */
    distinct?: Enumerable<Atdatabases_migrations_appliedScalarFieldEnum>;
  };

  /**
   * atdatabases_migrations_applied findFirst
   */
  export interface atdatabases_migrations_appliedFindFirstArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > extends atdatabases_migrations_appliedFindFirstArgsBase<ExtArgs> {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound;
  }

  /**
   * atdatabases_migrations_applied findFirstOrThrow
   */
  export type atdatabases_migrations_appliedFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_applied
     */
    select?: atdatabases_migrations_appliedSelect<ExtArgs> | null;
    /**
     * Filter, which atdatabases_migrations_applied to fetch.
     */
    where?: atdatabases_migrations_appliedWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of atdatabases_migrations_applieds to fetch.
     */
    orderBy?: Enumerable<atdatabases_migrations_appliedOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for atdatabases_migrations_applieds.
     */
    cursor?: atdatabases_migrations_appliedWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` atdatabases_migrations_applieds from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` atdatabases_migrations_applieds.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of atdatabases_migrations_applieds.
     */
    distinct?: Enumerable<Atdatabases_migrations_appliedScalarFieldEnum>;
  };

  /**
   * atdatabases_migrations_applied findMany
   */
  export type atdatabases_migrations_appliedFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_applied
     */
    select?: atdatabases_migrations_appliedSelect<ExtArgs> | null;
    /**
     * Filter, which atdatabases_migrations_applieds to fetch.
     */
    where?: atdatabases_migrations_appliedWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of atdatabases_migrations_applieds to fetch.
     */
    orderBy?: Enumerable<atdatabases_migrations_appliedOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing atdatabases_migrations_applieds.
     */
    cursor?: atdatabases_migrations_appliedWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` atdatabases_migrations_applieds from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` atdatabases_migrations_applieds.
     */
    skip?: number;
    distinct?: Enumerable<Atdatabases_migrations_appliedScalarFieldEnum>;
  };

  /**
   * atdatabases_migrations_applied create
   */
  export type atdatabases_migrations_appliedCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_applied
     */
    select?: atdatabases_migrations_appliedSelect<ExtArgs> | null;
    /**
     * The data needed to create a atdatabases_migrations_applied.
     */
    data: XOR<atdatabases_migrations_appliedCreateInput, atdatabases_migrations_appliedUncheckedCreateInput>;
  };

  /**
   * atdatabases_migrations_applied createMany
   */
  export type atdatabases_migrations_appliedCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> =
    {
      /**
       * The data used to create many atdatabases_migrations_applieds.
       */
      data: Enumerable<atdatabases_migrations_appliedCreateManyInput>;
      skipDuplicates?: boolean;
    };

  /**
   * atdatabases_migrations_applied update
   */
  export type atdatabases_migrations_appliedUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_applied
     */
    select?: atdatabases_migrations_appliedSelect<ExtArgs> | null;
    /**
     * The data needed to update a atdatabases_migrations_applied.
     */
    data: XOR<atdatabases_migrations_appliedUpdateInput, atdatabases_migrations_appliedUncheckedUpdateInput>;
    /**
     * Choose, which atdatabases_migrations_applied to update.
     */
    where: atdatabases_migrations_appliedWhereUniqueInput;
  };

  /**
   * atdatabases_migrations_applied updateMany
   */
  export type atdatabases_migrations_appliedUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> =
    {
      /**
       * The data used to update atdatabases_migrations_applieds.
       */
      data: XOR<
        atdatabases_migrations_appliedUpdateManyMutationInput,
        atdatabases_migrations_appliedUncheckedUpdateManyInput
      >;
      /**
       * Filter which atdatabases_migrations_applieds to update
       */
      where?: atdatabases_migrations_appliedWhereInput;
    };

  /**
   * atdatabases_migrations_applied upsert
   */
  export type atdatabases_migrations_appliedUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_applied
     */
    select?: atdatabases_migrations_appliedSelect<ExtArgs> | null;
    /**
     * The filter to search for the atdatabases_migrations_applied to update in case it exists.
     */
    where: atdatabases_migrations_appliedWhereUniqueInput;
    /**
     * In case the atdatabases_migrations_applied found by the `where` argument doesn't exist, create a new atdatabases_migrations_applied with this data.
     */
    create: XOR<atdatabases_migrations_appliedCreateInput, atdatabases_migrations_appliedUncheckedCreateInput>;
    /**
     * In case the atdatabases_migrations_applied was found with the provided `where` argument, update it with this data.
     */
    update: XOR<atdatabases_migrations_appliedUpdateInput, atdatabases_migrations_appliedUncheckedUpdateInput>;
  };

  /**
   * atdatabases_migrations_applied delete
   */
  export type atdatabases_migrations_appliedDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_applied
     */
    select?: atdatabases_migrations_appliedSelect<ExtArgs> | null;
    /**
     * Filter which atdatabases_migrations_applied to delete.
     */
    where: atdatabases_migrations_appliedWhereUniqueInput;
  };

  /**
   * atdatabases_migrations_applied deleteMany
   */
  export type atdatabases_migrations_appliedDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> =
    {
      /**
       * Filter which atdatabases_migrations_applieds to delete
       */
      where?: atdatabases_migrations_appliedWhereInput;
    };

  /**
   * atdatabases_migrations_applied without action
   */
  export type atdatabases_migrations_appliedArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_applied
     */
    select?: atdatabases_migrations_appliedSelect<ExtArgs> | null;
  };

  /**
   * Model atdatabases_migrations_version
   */

  export type AggregateAtdatabases_migrations_version = {
    _count: Atdatabases_migrations_versionCountAggregateOutputType | null;
    _avg: Atdatabases_migrations_versionAvgAggregateOutputType | null;
    _sum: Atdatabases_migrations_versionSumAggregateOutputType | null;
    _min: Atdatabases_migrations_versionMinAggregateOutputType | null;
    _max: Atdatabases_migrations_versionMaxAggregateOutputType | null;
  };

  export type Atdatabases_migrations_versionAvgAggregateOutputType = {
    id: number | null;
  };

  export type Atdatabases_migrations_versionSumAggregateOutputType = {
    id: number | null;
  };

  export type Atdatabases_migrations_versionMinAggregateOutputType = {
    id: number | null;
    version: string | null;
  };

  export type Atdatabases_migrations_versionMaxAggregateOutputType = {
    id: number | null;
    version: string | null;
  };

  export type Atdatabases_migrations_versionCountAggregateOutputType = {
    id: number;
    version: number;
    _all: number;
  };

  export type Atdatabases_migrations_versionAvgAggregateInputType = {
    id?: true;
  };

  export type Atdatabases_migrations_versionSumAggregateInputType = {
    id?: true;
  };

  export type Atdatabases_migrations_versionMinAggregateInputType = {
    id?: true;
    version?: true;
  };

  export type Atdatabases_migrations_versionMaxAggregateInputType = {
    id?: true;
    version?: true;
  };

  export type Atdatabases_migrations_versionCountAggregateInputType = {
    id?: true;
    version?: true;
    _all?: true;
  };

  export type Atdatabases_migrations_versionAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> =
    {
      /**
       * Filter which atdatabases_migrations_version to aggregate.
       */
      where?: atdatabases_migrations_versionWhereInput;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
       *
       * Determine the order of atdatabases_migrations_versions to fetch.
       */
      orderBy?: Enumerable<atdatabases_migrations_versionOrderByWithRelationInput>;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
       *
       * Sets the start position
       */
      cursor?: atdatabases_migrations_versionWhereUniqueInput;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Take `±n` atdatabases_migrations_versions from the position of the cursor.
       */
      take?: number;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
       *
       * Skip the first `n` atdatabases_migrations_versions.
       */
      skip?: number;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
       *
       * Count returned atdatabases_migrations_versions
       **/
      _count?: true | Atdatabases_migrations_versionCountAggregateInputType;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
       *
       * Select which fields to average
       **/
      _avg?: Atdatabases_migrations_versionAvgAggregateInputType;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
       *
       * Select which fields to sum
       **/
      _sum?: Atdatabases_migrations_versionSumAggregateInputType;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
       *
       * Select which fields to find the minimum value
       **/
      _min?: Atdatabases_migrations_versionMinAggregateInputType;
      /**
       * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
       *
       * Select which fields to find the maximum value
       **/
      _max?: Atdatabases_migrations_versionMaxAggregateInputType;
    };

  export type GetAtdatabases_migrations_versionAggregateType<T extends Atdatabases_migrations_versionAggregateArgs> = {
    [P in keyof T & keyof AggregateAtdatabases_migrations_version]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAtdatabases_migrations_version[P]>
      : GetScalarType<T[P], AggregateAtdatabases_migrations_version[P]>;
  };

  export type Atdatabases_migrations_versionGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: atdatabases_migrations_versionWhereInput;
    orderBy?: Enumerable<atdatabases_migrations_versionOrderByWithAggregationInput>;
    by: Atdatabases_migrations_versionScalarFieldEnum[];
    having?: atdatabases_migrations_versionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Atdatabases_migrations_versionCountAggregateInputType | true;
    _avg?: Atdatabases_migrations_versionAvgAggregateInputType;
    _sum?: Atdatabases_migrations_versionSumAggregateInputType;
    _min?: Atdatabases_migrations_versionMinAggregateInputType;
    _max?: Atdatabases_migrations_versionMaxAggregateInputType;
  };

  export type Atdatabases_migrations_versionGroupByOutputType = {
    id: number;
    version: string | null;
    _count: Atdatabases_migrations_versionCountAggregateOutputType | null;
    _avg: Atdatabases_migrations_versionAvgAggregateOutputType | null;
    _sum: Atdatabases_migrations_versionSumAggregateOutputType | null;
    _min: Atdatabases_migrations_versionMinAggregateOutputType | null;
    _max: Atdatabases_migrations_versionMaxAggregateOutputType | null;
  };

  type GetAtdatabases_migrations_versionGroupByPayload<T extends Atdatabases_migrations_versionGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickArray<Atdatabases_migrations_versionGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof Atdatabases_migrations_versionGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Atdatabases_migrations_versionGroupByOutputType[P]>
            : GetScalarType<T[P], Atdatabases_migrations_versionGroupByOutputType[P]>;
        }
      >
    >;

  export type atdatabases_migrations_versionSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        version?: boolean;
      },
      ExtArgs["result"]["atdatabases_migrations_version"]
    >;

  export type atdatabases_migrations_versionSelectScalar = {
    id?: boolean;
    version?: boolean;
  };

  type atdatabases_migrations_versionGetPayload<
    S extends boolean | null | undefined | atdatabases_migrations_versionArgs,
  > = $Types.GetResult<atdatabases_migrations_versionPayload, S>;

  type atdatabases_migrations_versionCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = Omit<
    atdatabases_migrations_versionFindManyArgs,
    "select" | "include"
  > & {
    select?: Atdatabases_migrations_versionCountAggregateInputType | true;
  };

  export interface atdatabases_migrations_versionDelegate<
    GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined,
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["atdatabases_migrations_version"];
      meta: { name: "atdatabases_migrations_version" };
    };
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
    findUnique<
      T extends atdatabases_migrations_versionFindUniqueArgs<ExtArgs>,
      LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined,
    >(
      args: SelectSubset<T, atdatabases_migrations_versionFindUniqueArgs<ExtArgs>>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, "findUnique", "atdatabases_migrations_version"> extends True
      ? Prisma__atdatabases_migrations_versionClient<
          $Types.GetResult<atdatabases_migrations_versionPayload<ExtArgs>, T, "findUnique", never>,
          never,
          ExtArgs
        >
      : Prisma__atdatabases_migrations_versionClient<
          $Types.GetResult<atdatabases_migrations_versionPayload<ExtArgs>, T, "findUnique", never> | null,
          null,
          ExtArgs
        >;

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
      args?: SelectSubset<T, atdatabases_migrations_versionFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__atdatabases_migrations_versionClient<
      $Types.GetResult<atdatabases_migrations_versionPayload<ExtArgs>, T, "findUniqueOrThrow", never>,
      never,
      ExtArgs
    >;

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
    findFirst<
      T extends atdatabases_migrations_versionFindFirstArgs<ExtArgs>,
      LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined,
    >(
      args?: SelectSubset<T, atdatabases_migrations_versionFindFirstArgs<ExtArgs>>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, "findFirst", "atdatabases_migrations_version"> extends True
      ? Prisma__atdatabases_migrations_versionClient<
          $Types.GetResult<atdatabases_migrations_versionPayload<ExtArgs>, T, "findFirst", never>,
          never,
          ExtArgs
        >
      : Prisma__atdatabases_migrations_versionClient<
          $Types.GetResult<atdatabases_migrations_versionPayload<ExtArgs>, T, "findFirst", never> | null,
          null,
          ExtArgs
        >;

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
      args?: SelectSubset<T, atdatabases_migrations_versionFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__atdatabases_migrations_versionClient<
      $Types.GetResult<atdatabases_migrations_versionPayload<ExtArgs>, T, "findFirstOrThrow", never>,
      never,
      ExtArgs
    >;

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
      args?: SelectSubset<T, atdatabases_migrations_versionFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Types.GetResult<atdatabases_migrations_versionPayload<ExtArgs>, T, "findMany", never>>;

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
      args: SelectSubset<T, atdatabases_migrations_versionCreateArgs<ExtArgs>>,
    ): Prisma__atdatabases_migrations_versionClient<
      $Types.GetResult<atdatabases_migrations_versionPayload<ExtArgs>, T, "create", never>,
      never,
      ExtArgs
    >;

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
      args?: SelectSubset<T, atdatabases_migrations_versionCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

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
      args: SelectSubset<T, atdatabases_migrations_versionDeleteArgs<ExtArgs>>,
    ): Prisma__atdatabases_migrations_versionClient<
      $Types.GetResult<atdatabases_migrations_versionPayload<ExtArgs>, T, "delete", never>,
      never,
      ExtArgs
    >;

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
      args: SelectSubset<T, atdatabases_migrations_versionUpdateArgs<ExtArgs>>,
    ): Prisma__atdatabases_migrations_versionClient<
      $Types.GetResult<atdatabases_migrations_versionPayload<ExtArgs>, T, "update", never>,
      never,
      ExtArgs
    >;

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
      args?: SelectSubset<T, atdatabases_migrations_versionDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

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
      args: SelectSubset<T, atdatabases_migrations_versionUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

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
      args: SelectSubset<T, atdatabases_migrations_versionUpsertArgs<ExtArgs>>,
    ): Prisma__atdatabases_migrations_versionClient<
      $Types.GetResult<atdatabases_migrations_versionPayload<ExtArgs>, T, "upsert", never>,
      never,
      ExtArgs
    >;

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
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], Atdatabases_migrations_versionCountAggregateOutputType>
        : number
    >;

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
    aggregate<T extends Atdatabases_migrations_versionAggregateArgs>(
      args: Subset<T, Atdatabases_migrations_versionAggregateArgs>,
    ): Prisma.PrismaPromise<GetAtdatabases_migrations_versionAggregateType<T>>;

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
      HasSelectOrTake extends Or<Extends<"skip", Keys<T>>, Extends<"take", Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Atdatabases_migrations_versionGroupByArgs["orderBy"] }
        : { orderBy?: Atdatabases_migrations_versionGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
      ByFields extends TupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, "Field ", P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, Atdatabases_migrations_versionGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetAtdatabases_migrations_versionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
  }

  /**
   * The delegate class that acts as a "Promise-like" for atdatabases_migrations_version.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__atdatabases_migrations_versionClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > implements Prisma.PrismaPromise<T>
  {
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
    readonly [Symbol.toStringTag]: "PrismaPromise";
    constructor(
      _dmmf: runtime.DMMFClass,
      _queryType: "query" | "mutation",
      _rootField: string,
      _clientMethod: string,
      _args: any,
      _dataPath: string[],
      _errorFormat: ErrorFormat,
      _measurePerformance?: boolean | undefined,
      _isList?: boolean,
    );

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): Promise<T | TResult>;
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
  export type atdatabases_migrations_versionFindUniqueArgsBase<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_version
     */
    select?: atdatabases_migrations_versionSelect<ExtArgs> | null;
    /**
     * Filter, which atdatabases_migrations_version to fetch.
     */
    where: atdatabases_migrations_versionWhereUniqueInput;
  };

  /**
   * atdatabases_migrations_version findUnique
   */
  export interface atdatabases_migrations_versionFindUniqueArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > extends atdatabases_migrations_versionFindUniqueArgsBase<ExtArgs> {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound;
  }

  /**
   * atdatabases_migrations_version findUniqueOrThrow
   */
  export type atdatabases_migrations_versionFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_version
     */
    select?: atdatabases_migrations_versionSelect<ExtArgs> | null;
    /**
     * Filter, which atdatabases_migrations_version to fetch.
     */
    where: atdatabases_migrations_versionWhereUniqueInput;
  };

  /**
   * atdatabases_migrations_version base type for findFirst actions
   */
  export type atdatabases_migrations_versionFindFirstArgsBase<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_version
     */
    select?: atdatabases_migrations_versionSelect<ExtArgs> | null;
    /**
     * Filter, which atdatabases_migrations_version to fetch.
     */
    where?: atdatabases_migrations_versionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of atdatabases_migrations_versions to fetch.
     */
    orderBy?: Enumerable<atdatabases_migrations_versionOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for atdatabases_migrations_versions.
     */
    cursor?: atdatabases_migrations_versionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` atdatabases_migrations_versions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` atdatabases_migrations_versions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of atdatabases_migrations_versions.
     */
    distinct?: Enumerable<Atdatabases_migrations_versionScalarFieldEnum>;
  };

  /**
   * atdatabases_migrations_version findFirst
   */
  export interface atdatabases_migrations_versionFindFirstArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > extends atdatabases_migrations_versionFindFirstArgsBase<ExtArgs> {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound;
  }

  /**
   * atdatabases_migrations_version findFirstOrThrow
   */
  export type atdatabases_migrations_versionFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_version
     */
    select?: atdatabases_migrations_versionSelect<ExtArgs> | null;
    /**
     * Filter, which atdatabases_migrations_version to fetch.
     */
    where?: atdatabases_migrations_versionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of atdatabases_migrations_versions to fetch.
     */
    orderBy?: Enumerable<atdatabases_migrations_versionOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for atdatabases_migrations_versions.
     */
    cursor?: atdatabases_migrations_versionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` atdatabases_migrations_versions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` atdatabases_migrations_versions.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of atdatabases_migrations_versions.
     */
    distinct?: Enumerable<Atdatabases_migrations_versionScalarFieldEnum>;
  };

  /**
   * atdatabases_migrations_version findMany
   */
  export type atdatabases_migrations_versionFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_version
     */
    select?: atdatabases_migrations_versionSelect<ExtArgs> | null;
    /**
     * Filter, which atdatabases_migrations_versions to fetch.
     */
    where?: atdatabases_migrations_versionWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of atdatabases_migrations_versions to fetch.
     */
    orderBy?: Enumerable<atdatabases_migrations_versionOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing atdatabases_migrations_versions.
     */
    cursor?: atdatabases_migrations_versionWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` atdatabases_migrations_versions from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` atdatabases_migrations_versions.
     */
    skip?: number;
    distinct?: Enumerable<Atdatabases_migrations_versionScalarFieldEnum>;
  };

  /**
   * atdatabases_migrations_version create
   */
  export type atdatabases_migrations_versionCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_version
     */
    select?: atdatabases_migrations_versionSelect<ExtArgs> | null;
    /**
     * The data needed to create a atdatabases_migrations_version.
     */
    data: XOR<atdatabases_migrations_versionCreateInput, atdatabases_migrations_versionUncheckedCreateInput>;
  };

  /**
   * atdatabases_migrations_version createMany
   */
  export type atdatabases_migrations_versionCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> =
    {
      /**
       * The data used to create many atdatabases_migrations_versions.
       */
      data: Enumerable<atdatabases_migrations_versionCreateManyInput>;
      skipDuplicates?: boolean;
    };

  /**
   * atdatabases_migrations_version update
   */
  export type atdatabases_migrations_versionUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_version
     */
    select?: atdatabases_migrations_versionSelect<ExtArgs> | null;
    /**
     * The data needed to update a atdatabases_migrations_version.
     */
    data: XOR<atdatabases_migrations_versionUpdateInput, atdatabases_migrations_versionUncheckedUpdateInput>;
    /**
     * Choose, which atdatabases_migrations_version to update.
     */
    where: atdatabases_migrations_versionWhereUniqueInput;
  };

  /**
   * atdatabases_migrations_version updateMany
   */
  export type atdatabases_migrations_versionUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> =
    {
      /**
       * The data used to update atdatabases_migrations_versions.
       */
      data: XOR<
        atdatabases_migrations_versionUpdateManyMutationInput,
        atdatabases_migrations_versionUncheckedUpdateManyInput
      >;
      /**
       * Filter which atdatabases_migrations_versions to update
       */
      where?: atdatabases_migrations_versionWhereInput;
    };

  /**
   * atdatabases_migrations_version upsert
   */
  export type atdatabases_migrations_versionUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_version
     */
    select?: atdatabases_migrations_versionSelect<ExtArgs> | null;
    /**
     * The filter to search for the atdatabases_migrations_version to update in case it exists.
     */
    where: atdatabases_migrations_versionWhereUniqueInput;
    /**
     * In case the atdatabases_migrations_version found by the `where` argument doesn't exist, create a new atdatabases_migrations_version with this data.
     */
    create: XOR<atdatabases_migrations_versionCreateInput, atdatabases_migrations_versionUncheckedCreateInput>;
    /**
     * In case the atdatabases_migrations_version was found with the provided `where` argument, update it with this data.
     */
    update: XOR<atdatabases_migrations_versionUpdateInput, atdatabases_migrations_versionUncheckedUpdateInput>;
  };

  /**
   * atdatabases_migrations_version delete
   */
  export type atdatabases_migrations_versionDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_version
     */
    select?: atdatabases_migrations_versionSelect<ExtArgs> | null;
    /**
     * Filter which atdatabases_migrations_version to delete.
     */
    where: atdatabases_migrations_versionWhereUniqueInput;
  };

  /**
   * atdatabases_migrations_version deleteMany
   */
  export type atdatabases_migrations_versionDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> =
    {
      /**
       * Filter which atdatabases_migrations_versions to delete
       */
      where?: atdatabases_migrations_versionWhereInput;
    };

  /**
   * atdatabases_migrations_version without action
   */
  export type atdatabases_migrations_versionArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the atdatabases_migrations_version
     */
    select?: atdatabases_migrations_versionSelect<ExtArgs> | null;
  };

  /**
   * Model clause
   */

  export type AggregateClause = {
    _count: ClauseCountAggregateOutputType | null;
    _min: ClauseMinAggregateOutputType | null;
    _max: ClauseMaxAggregateOutputType | null;
  };

  export type ClauseMinAggregateOutputType = {
    id: string | null;
    label: string | null;
    value: string | null;
  };

  export type ClauseMaxAggregateOutputType = {
    id: string | null;
    label: string | null;
    value: string | null;
  };

  export type ClauseCountAggregateOutputType = {
    id: number;
    label: number;
    value: number;
    _all: number;
  };

  export type ClauseMinAggregateInputType = {
    id?: true;
    label?: true;
    value?: true;
  };

  export type ClauseMaxAggregateInputType = {
    id?: true;
    label?: true;
    value?: true;
  };

  export type ClauseCountAggregateInputType = {
    id?: true;
    label?: true;
    value?: true;
    _all?: true;
  };

  export type ClauseAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which clause to aggregate.
     */
    where?: clauseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of clauses to fetch.
     */
    orderBy?: Enumerable<clauseOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: clauseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` clauses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` clauses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned clauses
     **/
    _count?: true | ClauseCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ClauseMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ClauseMaxAggregateInputType;
  };

  export type GetClauseAggregateType<T extends ClauseAggregateArgs> = {
    [P in keyof T & keyof AggregateClause]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClause[P]>
      : GetScalarType<T[P], AggregateClause[P]>;
  };

  export type ClauseGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: clauseWhereInput;
    orderBy?: Enumerable<clauseOrderByWithAggregationInput>;
    by: ClauseScalarFieldEnum[];
    having?: clauseScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ClauseCountAggregateInputType | true;
    _min?: ClauseMinAggregateInputType;
    _max?: ClauseMaxAggregateInputType;
  };

  export type ClauseGroupByOutputType = {
    id: string;
    label: string;
    value: string;
    _count: ClauseCountAggregateOutputType | null;
    _min: ClauseMinAggregateOutputType | null;
    _max: ClauseMaxAggregateOutputType | null;
  };

  type GetClauseGroupByPayload<T extends ClauseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<ClauseGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof ClauseGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], ClauseGroupByOutputType[P]>
          : GetScalarType<T[P], ClauseGroupByOutputType[P]>;
      }
    >
  >;

  export type clauseSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<
    {
      id?: boolean;
      label?: boolean;
      value?: boolean;
      report_to_clause?: boolean | clause$report_to_clauseArgs<ExtArgs>;
      _count?: boolean | ClauseCountOutputTypeArgs<ExtArgs>;
    },
    ExtArgs["result"]["clause"]
  >;

  export type clauseSelectScalar = {
    id?: boolean;
    label?: boolean;
    value?: boolean;
  };

  export type clauseInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    report_to_clause?: boolean | clause$report_to_clauseArgs<ExtArgs>;
    _count?: boolean | ClauseCountOutputTypeArgs<ExtArgs>;
  };

  type clauseGetPayload<S extends boolean | null | undefined | clauseArgs> = $Types.GetResult<clausePayload, S>;

  type clauseCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = Omit<
    clauseFindManyArgs,
    "select" | "include"
  > & {
    select?: ClauseCountAggregateInputType | true;
  };

  export interface clauseDelegate<
    GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined,
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["model"]["clause"]; meta: { name: "clause" } };
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
    findUnique<
      T extends clauseFindUniqueArgs<ExtArgs>,
      LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined,
    >(
      args: SelectSubset<T, clauseFindUniqueArgs<ExtArgs>>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, "findUnique", "clause"> extends True
      ? Prisma__clauseClient<$Types.GetResult<clausePayload<ExtArgs>, T, "findUnique", never>, never, ExtArgs>
      : Prisma__clauseClient<$Types.GetResult<clausePayload<ExtArgs>, T, "findUnique", never> | null, null, ExtArgs>;

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
      args?: SelectSubset<T, clauseFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__clauseClient<$Types.GetResult<clausePayload<ExtArgs>, T, "findUniqueOrThrow", never>, never, ExtArgs>;

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
    findFirst<
      T extends clauseFindFirstArgs<ExtArgs>,
      LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined,
    >(
      args?: SelectSubset<T, clauseFindFirstArgs<ExtArgs>>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, "findFirst", "clause"> extends True
      ? Prisma__clauseClient<$Types.GetResult<clausePayload<ExtArgs>, T, "findFirst", never>, never, ExtArgs>
      : Prisma__clauseClient<$Types.GetResult<clausePayload<ExtArgs>, T, "findFirst", never> | null, null, ExtArgs>;

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
      args?: SelectSubset<T, clauseFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__clauseClient<$Types.GetResult<clausePayload<ExtArgs>, T, "findFirstOrThrow", never>, never, ExtArgs>;

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
      args?: SelectSubset<T, clauseFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Types.GetResult<clausePayload<ExtArgs>, T, "findMany", never>>;

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
      args: SelectSubset<T, clauseCreateArgs<ExtArgs>>,
    ): Prisma__clauseClient<$Types.GetResult<clausePayload<ExtArgs>, T, "create", never>, never, ExtArgs>;

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
      args?: SelectSubset<T, clauseCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

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
      args: SelectSubset<T, clauseDeleteArgs<ExtArgs>>,
    ): Prisma__clauseClient<$Types.GetResult<clausePayload<ExtArgs>, T, "delete", never>, never, ExtArgs>;

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
      args: SelectSubset<T, clauseUpdateArgs<ExtArgs>>,
    ): Prisma__clauseClient<$Types.GetResult<clausePayload<ExtArgs>, T, "update", never>, never, ExtArgs>;

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
      args?: SelectSubset<T, clauseDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

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
      args: SelectSubset<T, clauseUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

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
      args: SelectSubset<T, clauseUpsertArgs<ExtArgs>>,
    ): Prisma__clauseClient<$Types.GetResult<clausePayload<ExtArgs>, T, "upsert", never>, never, ExtArgs>;

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
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], ClauseCountAggregateOutputType>
        : number
    >;

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
    aggregate<T extends ClauseAggregateArgs>(
      args: Subset<T, ClauseAggregateArgs>,
    ): Prisma.PrismaPromise<GetClauseAggregateType<T>>;

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
      HasSelectOrTake extends Or<Extends<"skip", Keys<T>>, Extends<"take", Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClauseGroupByArgs["orderBy"] }
        : { orderBy?: ClauseGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
      ByFields extends TupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, "Field ", P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ClauseGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetClauseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
  }

  /**
   * The delegate class that acts as a "Promise-like" for clause.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__clauseClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs>
    implements Prisma.PrismaPromise<T>
  {
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
    readonly [Symbol.toStringTag]: "PrismaPromise";
    constructor(
      _dmmf: runtime.DMMFClass,
      _queryType: "query" | "mutation",
      _rootField: string,
      _clientMethod: string,
      _args: any,
      _dataPath: string[],
      _errorFormat: ErrorFormat,
      _measurePerformance?: boolean | undefined,
      _isList?: boolean,
    );

    report_to_clause<T extends clause$report_to_clauseArgs<ExtArgs> = {}>(
      args?: Subset<T, clause$report_to_clauseArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Types.GetResult<report_to_clausePayload<ExtArgs>, T, "findMany", never> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): Promise<T | TResult>;
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
    select?: clauseSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: clauseInclude<ExtArgs> | null;
    /**
     * Filter, which clause to fetch.
     */
    where: clauseWhereUniqueInput;
  };

  /**
   * clause findUnique
   */
  export interface clauseFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs>
    extends clauseFindUniqueArgsBase<ExtArgs> {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound;
  }

  /**
   * clause findUniqueOrThrow
   */
  export type clauseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clause
     */
    select?: clauseSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: clauseInclude<ExtArgs> | null;
    /**
     * Filter, which clause to fetch.
     */
    where: clauseWhereUniqueInput;
  };

  /**
   * clause base type for findFirst actions
   */
  export type clauseFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clause
     */
    select?: clauseSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: clauseInclude<ExtArgs> | null;
    /**
     * Filter, which clause to fetch.
     */
    where?: clauseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of clauses to fetch.
     */
    orderBy?: Enumerable<clauseOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for clauses.
     */
    cursor?: clauseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` clauses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` clauses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of clauses.
     */
    distinct?: Enumerable<ClauseScalarFieldEnum>;
  };

  /**
   * clause findFirst
   */
  export interface clauseFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs>
    extends clauseFindFirstArgsBase<ExtArgs> {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound;
  }

  /**
   * clause findFirstOrThrow
   */
  export type clauseFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clause
     */
    select?: clauseSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: clauseInclude<ExtArgs> | null;
    /**
     * Filter, which clause to fetch.
     */
    where?: clauseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of clauses to fetch.
     */
    orderBy?: Enumerable<clauseOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for clauses.
     */
    cursor?: clauseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` clauses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` clauses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of clauses.
     */
    distinct?: Enumerable<ClauseScalarFieldEnum>;
  };

  /**
   * clause findMany
   */
  export type clauseFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clause
     */
    select?: clauseSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: clauseInclude<ExtArgs> | null;
    /**
     * Filter, which clauses to fetch.
     */
    where?: clauseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of clauses to fetch.
     */
    orderBy?: Enumerable<clauseOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing clauses.
     */
    cursor?: clauseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` clauses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` clauses.
     */
    skip?: number;
    distinct?: Enumerable<ClauseScalarFieldEnum>;
  };

  /**
   * clause create
   */
  export type clauseCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clause
     */
    select?: clauseSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: clauseInclude<ExtArgs> | null;
    /**
     * The data needed to create a clause.
     */
    data: XOR<clauseCreateInput, clauseUncheckedCreateInput>;
  };

  /**
   * clause createMany
   */
  export type clauseCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many clauses.
     */
    data: Enumerable<clauseCreateManyInput>;
    skipDuplicates?: boolean;
  };

  /**
   * clause update
   */
  export type clauseUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clause
     */
    select?: clauseSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: clauseInclude<ExtArgs> | null;
    /**
     * The data needed to update a clause.
     */
    data: XOR<clauseUpdateInput, clauseUncheckedUpdateInput>;
    /**
     * Choose, which clause to update.
     */
    where: clauseWhereUniqueInput;
  };

  /**
   * clause updateMany
   */
  export type clauseUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update clauses.
     */
    data: XOR<clauseUpdateManyMutationInput, clauseUncheckedUpdateManyInput>;
    /**
     * Filter which clauses to update
     */
    where?: clauseWhereInput;
  };

  /**
   * clause upsert
   */
  export type clauseUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clause
     */
    select?: clauseSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: clauseInclude<ExtArgs> | null;
    /**
     * The filter to search for the clause to update in case it exists.
     */
    where: clauseWhereUniqueInput;
    /**
     * In case the clause found by the `where` argument doesn't exist, create a new clause with this data.
     */
    create: XOR<clauseCreateInput, clauseUncheckedCreateInput>;
    /**
     * In case the clause was found with the provided `where` argument, update it with this data.
     */
    update: XOR<clauseUpdateInput, clauseUncheckedUpdateInput>;
  };

  /**
   * clause delete
   */
  export type clauseDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clause
     */
    select?: clauseSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: clauseInclude<ExtArgs> | null;
    /**
     * Filter which clause to delete.
     */
    where: clauseWhereUniqueInput;
  };

  /**
   * clause deleteMany
   */
  export type clauseDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which clauses to delete
     */
    where?: clauseWhereInput;
  };

  /**
   * clause.report_to_clause
   */
  export type clause$report_to_clauseArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_clause
     */
    select?: report_to_clauseSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_clauseInclude<ExtArgs> | null;
    where?: report_to_clauseWhereInput;
    orderBy?: Enumerable<report_to_clauseOrderByWithRelationInput>;
    cursor?: report_to_clauseWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Enumerable<Report_to_clauseScalarFieldEnum>;
  };

  /**
   * clause without action
   */
  export type clauseArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the clause
     */
    select?: clauseSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: clauseInclude<ExtArgs> | null;
  };

  /**
   * Model report
   */

  export type AggregateReport = {
    _count: ReportCountAggregateOutputType | null;
    _avg: ReportAvgAggregateOutputType | null;
    _sum: ReportSumAggregateOutputType | null;
    _min: ReportMinAggregateOutputType | null;
    _max: ReportMaxAggregateOutputType | null;
  };

  export type ReportAvgAggregateOutputType = {
    serviceInstructeur: number | null;
  };

  export type ReportSumAggregateOutputType = {
    serviceInstructeur: number | null;
  };

  export type ReportMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    projectDescription: string | null;
    redactedBy: string | null;
    meetDate: Date | null;
    applicantName: string | null;
    applicantAddress: string | null;
    projectCadastralRef: string | null;
    projectSpaceType: string | null;
    decision: string | null;
    precisions: string | null;
    contacts: string | null;
    furtherInformation: string | null;
    createdBy: string | null;
    createdAt: Date | null;
    serviceInstructeur: number | null;
    pdf: string | null;
    disabled: boolean | null;
    udap_id: string | null;
  };

  export type ReportMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    projectDescription: string | null;
    redactedBy: string | null;
    meetDate: Date | null;
    applicantName: string | null;
    applicantAddress: string | null;
    projectCadastralRef: string | null;
    projectSpaceType: string | null;
    decision: string | null;
    precisions: string | null;
    contacts: string | null;
    furtherInformation: string | null;
    createdBy: string | null;
    createdAt: Date | null;
    serviceInstructeur: number | null;
    pdf: string | null;
    disabled: boolean | null;
    udap_id: string | null;
  };

  export type ReportCountAggregateOutputType = {
    id: number;
    title: number;
    projectDescription: number;
    redactedBy: number;
    meetDate: number;
    applicantName: number;
    applicantAddress: number;
    projectCadastralRef: number;
    projectSpaceType: number;
    decision: number;
    precisions: number;
    contacts: number;
    furtherInformation: number;
    createdBy: number;
    createdAt: number;
    serviceInstructeur: number;
    pdf: number;
    disabled: number;
    udap_id: number;
    _all: number;
  };

  export type ReportAvgAggregateInputType = {
    serviceInstructeur?: true;
  };

  export type ReportSumAggregateInputType = {
    serviceInstructeur?: true;
  };

  export type ReportMinAggregateInputType = {
    id?: true;
    title?: true;
    projectDescription?: true;
    redactedBy?: true;
    meetDate?: true;
    applicantName?: true;
    applicantAddress?: true;
    projectCadastralRef?: true;
    projectSpaceType?: true;
    decision?: true;
    precisions?: true;
    contacts?: true;
    furtherInformation?: true;
    createdBy?: true;
    createdAt?: true;
    serviceInstructeur?: true;
    pdf?: true;
    disabled?: true;
    udap_id?: true;
  };

  export type ReportMaxAggregateInputType = {
    id?: true;
    title?: true;
    projectDescription?: true;
    redactedBy?: true;
    meetDate?: true;
    applicantName?: true;
    applicantAddress?: true;
    projectCadastralRef?: true;
    projectSpaceType?: true;
    decision?: true;
    precisions?: true;
    contacts?: true;
    furtherInformation?: true;
    createdBy?: true;
    createdAt?: true;
    serviceInstructeur?: true;
    pdf?: true;
    disabled?: true;
    udap_id?: true;
  };

  export type ReportCountAggregateInputType = {
    id?: true;
    title?: true;
    projectDescription?: true;
    redactedBy?: true;
    meetDate?: true;
    applicantName?: true;
    applicantAddress?: true;
    projectCadastralRef?: true;
    projectSpaceType?: true;
    decision?: true;
    precisions?: true;
    contacts?: true;
    furtherInformation?: true;
    createdBy?: true;
    createdAt?: true;
    serviceInstructeur?: true;
    pdf?: true;
    disabled?: true;
    udap_id?: true;
    _all?: true;
  };

  export type ReportAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which report to aggregate.
     */
    where?: reportWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of reports to fetch.
     */
    orderBy?: Enumerable<reportOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: reportWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` reports from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` reports.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned reports
     **/
    _count?: true | ReportCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: ReportAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: ReportSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ReportMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ReportMaxAggregateInputType;
  };

  export type GetReportAggregateType<T extends ReportAggregateArgs> = {
    [P in keyof T & keyof AggregateReport]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReport[P]>
      : GetScalarType<T[P], AggregateReport[P]>;
  };

  export type ReportGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: reportWhereInput;
    orderBy?: Enumerable<reportOrderByWithAggregationInput>;
    by: ReportScalarFieldEnum[];
    having?: reportScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ReportCountAggregateInputType | true;
    _avg?: ReportAvgAggregateInputType;
    _sum?: ReportSumAggregateInputType;
    _min?: ReportMinAggregateInputType;
    _max?: ReportMaxAggregateInputType;
  };

  export type ReportGroupByOutputType = {
    id: string;
    title: string | null;
    projectDescription: string | null;
    redactedBy: string | null;
    meetDate: Date | null;
    applicantName: string | null;
    applicantAddress: string | null;
    projectCadastralRef: string | null;
    projectSpaceType: string | null;
    decision: string | null;
    precisions: string | null;
    contacts: string | null;
    furtherInformation: string | null;
    createdBy: string;
    createdAt: Date;
    serviceInstructeur: number | null;
    pdf: string | null;
    disabled: boolean | null;
    udap_id: string | null;
    _count: ReportCountAggregateOutputType | null;
    _avg: ReportAvgAggregateOutputType | null;
    _sum: ReportSumAggregateOutputType | null;
    _min: ReportMinAggregateOutputType | null;
    _max: ReportMaxAggregateOutputType | null;
  };

  type GetReportGroupByPayload<T extends ReportGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<ReportGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof ReportGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], ReportGroupByOutputType[P]>
          : GetScalarType<T[P], ReportGroupByOutputType[P]>;
      }
    >
  >;

  export type reportSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<
    {
      id?: boolean;
      title?: boolean;
      projectDescription?: boolean;
      redactedBy?: boolean;
      meetDate?: boolean;
      applicantName?: boolean;
      applicantAddress?: boolean;
      projectCadastralRef?: boolean;
      projectSpaceType?: boolean;
      decision?: boolean;
      precisions?: boolean;
      contacts?: boolean;
      furtherInformation?: boolean;
      createdBy?: boolean;
      createdAt?: boolean;
      serviceInstructeur?: boolean;
      pdf?: boolean;
      disabled?: boolean;
      udap_id?: boolean;
      user?: boolean | userArgs<ExtArgs>;
      report_to_clause?: boolean | report$report_to_clauseArgs<ExtArgs>;
      _count?: boolean | ReportCountOutputTypeArgs<ExtArgs>;
    },
    ExtArgs["result"]["report"]
  >;

  export type reportSelectScalar = {
    id?: boolean;
    title?: boolean;
    projectDescription?: boolean;
    redactedBy?: boolean;
    meetDate?: boolean;
    applicantName?: boolean;
    applicantAddress?: boolean;
    projectCadastralRef?: boolean;
    projectSpaceType?: boolean;
    decision?: boolean;
    precisions?: boolean;
    contacts?: boolean;
    furtherInformation?: boolean;
    createdBy?: boolean;
    createdAt?: boolean;
    serviceInstructeur?: boolean;
    pdf?: boolean;
    disabled?: boolean;
    udap_id?: boolean;
  };

  export type reportInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    user?: boolean | userArgs<ExtArgs>;
    report_to_clause?: boolean | report$report_to_clauseArgs<ExtArgs>;
    _count?: boolean | ReportCountOutputTypeArgs<ExtArgs>;
  };

  type reportGetPayload<S extends boolean | null | undefined | reportArgs> = $Types.GetResult<reportPayload, S>;

  type reportCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = Omit<
    reportFindManyArgs,
    "select" | "include"
  > & {
    select?: ReportCountAggregateInputType | true;
  };

  export interface reportDelegate<
    GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined,
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["model"]["report"]; meta: { name: "report" } };
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
    findUnique<
      T extends reportFindUniqueArgs<ExtArgs>,
      LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined,
    >(
      args: SelectSubset<T, reportFindUniqueArgs<ExtArgs>>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, "findUnique", "report"> extends True
      ? Prisma__reportClient<$Types.GetResult<reportPayload<ExtArgs>, T, "findUnique", never>, never, ExtArgs>
      : Prisma__reportClient<$Types.GetResult<reportPayload<ExtArgs>, T, "findUnique", never> | null, null, ExtArgs>;

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
      args?: SelectSubset<T, reportFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__reportClient<$Types.GetResult<reportPayload<ExtArgs>, T, "findUniqueOrThrow", never>, never, ExtArgs>;

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
    findFirst<
      T extends reportFindFirstArgs<ExtArgs>,
      LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined,
    >(
      args?: SelectSubset<T, reportFindFirstArgs<ExtArgs>>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, "findFirst", "report"> extends True
      ? Prisma__reportClient<$Types.GetResult<reportPayload<ExtArgs>, T, "findFirst", never>, never, ExtArgs>
      : Prisma__reportClient<$Types.GetResult<reportPayload<ExtArgs>, T, "findFirst", never> | null, null, ExtArgs>;

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
      args?: SelectSubset<T, reportFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__reportClient<$Types.GetResult<reportPayload<ExtArgs>, T, "findFirstOrThrow", never>, never, ExtArgs>;

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
      args?: SelectSubset<T, reportFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Types.GetResult<reportPayload<ExtArgs>, T, "findMany", never>>;

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
      args: SelectSubset<T, reportCreateArgs<ExtArgs>>,
    ): Prisma__reportClient<$Types.GetResult<reportPayload<ExtArgs>, T, "create", never>, never, ExtArgs>;

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
      args?: SelectSubset<T, reportCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

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
      args: SelectSubset<T, reportDeleteArgs<ExtArgs>>,
    ): Prisma__reportClient<$Types.GetResult<reportPayload<ExtArgs>, T, "delete", never>, never, ExtArgs>;

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
      args: SelectSubset<T, reportUpdateArgs<ExtArgs>>,
    ): Prisma__reportClient<$Types.GetResult<reportPayload<ExtArgs>, T, "update", never>, never, ExtArgs>;

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
      args?: SelectSubset<T, reportDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

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
      args: SelectSubset<T, reportUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

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
      args: SelectSubset<T, reportUpsertArgs<ExtArgs>>,
    ): Prisma__reportClient<$Types.GetResult<reportPayload<ExtArgs>, T, "upsert", never>, never, ExtArgs>;

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
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], ReportCountAggregateOutputType>
        : number
    >;

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
    aggregate<T extends ReportAggregateArgs>(
      args: Subset<T, ReportAggregateArgs>,
    ): Prisma.PrismaPromise<GetReportAggregateType<T>>;

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
      HasSelectOrTake extends Or<Extends<"skip", Keys<T>>, Extends<"take", Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReportGroupByArgs["orderBy"] }
        : { orderBy?: ReportGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
      ByFields extends TupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, "Field ", P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ReportGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetReportGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
  }

  /**
   * The delegate class that acts as a "Promise-like" for report.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__reportClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs>
    implements Prisma.PrismaPromise<T>
  {
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
    readonly [Symbol.toStringTag]: "PrismaPromise";
    constructor(
      _dmmf: runtime.DMMFClass,
      _queryType: "query" | "mutation",
      _rootField: string,
      _clientMethod: string,
      _args: any,
      _dataPath: string[],
      _errorFormat: ErrorFormat,
      _measurePerformance?: boolean | undefined,
      _isList?: boolean,
    );

    user<T extends userArgs<ExtArgs> = {}>(
      args?: Subset<T, userArgs<ExtArgs>>,
    ): Prisma__userClient<$Types.GetResult<userPayload<ExtArgs>, T, "findUnique", never> | Null, never, ExtArgs>;

    report_to_clause<T extends report$report_to_clauseArgs<ExtArgs> = {}>(
      args?: Subset<T, report$report_to_clauseArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Types.GetResult<report_to_clausePayload<ExtArgs>, T, "findMany", never> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): Promise<T | TResult>;
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
    select?: reportSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: reportInclude<ExtArgs> | null;
    /**
     * Filter, which report to fetch.
     */
    where: reportWhereUniqueInput;
  };

  /**
   * report findUnique
   */
  export interface reportFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs>
    extends reportFindUniqueArgsBase<ExtArgs> {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound;
  }

  /**
   * report findUniqueOrThrow
   */
  export type reportFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report
     */
    select?: reportSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: reportInclude<ExtArgs> | null;
    /**
     * Filter, which report to fetch.
     */
    where: reportWhereUniqueInput;
  };

  /**
   * report base type for findFirst actions
   */
  export type reportFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report
     */
    select?: reportSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: reportInclude<ExtArgs> | null;
    /**
     * Filter, which report to fetch.
     */
    where?: reportWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of reports to fetch.
     */
    orderBy?: Enumerable<reportOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for reports.
     */
    cursor?: reportWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` reports from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` reports.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of reports.
     */
    distinct?: Enumerable<ReportScalarFieldEnum>;
  };

  /**
   * report findFirst
   */
  export interface reportFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs>
    extends reportFindFirstArgsBase<ExtArgs> {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound;
  }

  /**
   * report findFirstOrThrow
   */
  export type reportFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report
     */
    select?: reportSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: reportInclude<ExtArgs> | null;
    /**
     * Filter, which report to fetch.
     */
    where?: reportWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of reports to fetch.
     */
    orderBy?: Enumerable<reportOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for reports.
     */
    cursor?: reportWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` reports from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` reports.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of reports.
     */
    distinct?: Enumerable<ReportScalarFieldEnum>;
  };

  /**
   * report findMany
   */
  export type reportFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report
     */
    select?: reportSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: reportInclude<ExtArgs> | null;
    /**
     * Filter, which reports to fetch.
     */
    where?: reportWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of reports to fetch.
     */
    orderBy?: Enumerable<reportOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing reports.
     */
    cursor?: reportWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` reports from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` reports.
     */
    skip?: number;
    distinct?: Enumerable<ReportScalarFieldEnum>;
  };

  /**
   * report create
   */
  export type reportCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report
     */
    select?: reportSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: reportInclude<ExtArgs> | null;
    /**
     * The data needed to create a report.
     */
    data: XOR<reportCreateInput, reportUncheckedCreateInput>;
  };

  /**
   * report createMany
   */
  export type reportCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many reports.
     */
    data: Enumerable<reportCreateManyInput>;
    skipDuplicates?: boolean;
  };

  /**
   * report update
   */
  export type reportUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report
     */
    select?: reportSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: reportInclude<ExtArgs> | null;
    /**
     * The data needed to update a report.
     */
    data: XOR<reportUpdateInput, reportUncheckedUpdateInput>;
    /**
     * Choose, which report to update.
     */
    where: reportWhereUniqueInput;
  };

  /**
   * report updateMany
   */
  export type reportUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update reports.
     */
    data: XOR<reportUpdateManyMutationInput, reportUncheckedUpdateManyInput>;
    /**
     * Filter which reports to update
     */
    where?: reportWhereInput;
  };

  /**
   * report upsert
   */
  export type reportUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report
     */
    select?: reportSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: reportInclude<ExtArgs> | null;
    /**
     * The filter to search for the report to update in case it exists.
     */
    where: reportWhereUniqueInput;
    /**
     * In case the report found by the `where` argument doesn't exist, create a new report with this data.
     */
    create: XOR<reportCreateInput, reportUncheckedCreateInput>;
    /**
     * In case the report was found with the provided `where` argument, update it with this data.
     */
    update: XOR<reportUpdateInput, reportUncheckedUpdateInput>;
  };

  /**
   * report delete
   */
  export type reportDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report
     */
    select?: reportSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: reportInclude<ExtArgs> | null;
    /**
     * Filter which report to delete.
     */
    where: reportWhereUniqueInput;
  };

  /**
   * report deleteMany
   */
  export type reportDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which reports to delete
     */
    where?: reportWhereInput;
  };

  /**
   * report.report_to_clause
   */
  export type report$report_to_clauseArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_clause
     */
    select?: report_to_clauseSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_clauseInclude<ExtArgs> | null;
    where?: report_to_clauseWhereInput;
    orderBy?: Enumerable<report_to_clauseOrderByWithRelationInput>;
    cursor?: report_to_clauseWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Enumerable<Report_to_clauseScalarFieldEnum>;
  };

  /**
   * report without action
   */
  export type reportArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report
     */
    select?: reportSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: reportInclude<ExtArgs> | null;
  };

  /**
   * Model report_to_clause
   */

  export type AggregateReport_to_clause = {
    _count: Report_to_clauseCountAggregateOutputType | null;
    _min: Report_to_clauseMinAggregateOutputType | null;
    _max: Report_to_clauseMaxAggregateOutputType | null;
  };

  export type Report_to_clauseMinAggregateOutputType = {
    id: string | null;
    reportId: string | null;
    clauseId: string | null;
  };

  export type Report_to_clauseMaxAggregateOutputType = {
    id: string | null;
    reportId: string | null;
    clauseId: string | null;
  };

  export type Report_to_clauseCountAggregateOutputType = {
    id: number;
    reportId: number;
    clauseId: number;
    _all: number;
  };

  export type Report_to_clauseMinAggregateInputType = {
    id?: true;
    reportId?: true;
    clauseId?: true;
  };

  export type Report_to_clauseMaxAggregateInputType = {
    id?: true;
    reportId?: true;
    clauseId?: true;
  };

  export type Report_to_clauseCountAggregateInputType = {
    id?: true;
    reportId?: true;
    clauseId?: true;
    _all?: true;
  };

  export type Report_to_clauseAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which report_to_clause to aggregate.
     */
    where?: report_to_clauseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of report_to_clauses to fetch.
     */
    orderBy?: Enumerable<report_to_clauseOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: report_to_clauseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` report_to_clauses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` report_to_clauses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned report_to_clauses
     **/
    _count?: true | Report_to_clauseCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: Report_to_clauseMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: Report_to_clauseMaxAggregateInputType;
  };

  export type GetReport_to_clauseAggregateType<T extends Report_to_clauseAggregateArgs> = {
    [P in keyof T & keyof AggregateReport_to_clause]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReport_to_clause[P]>
      : GetScalarType<T[P], AggregateReport_to_clause[P]>;
  };

  export type Report_to_clauseGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: report_to_clauseWhereInput;
    orderBy?: Enumerable<report_to_clauseOrderByWithAggregationInput>;
    by: Report_to_clauseScalarFieldEnum[];
    having?: report_to_clauseScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Report_to_clauseCountAggregateInputType | true;
    _min?: Report_to_clauseMinAggregateInputType;
    _max?: Report_to_clauseMaxAggregateInputType;
  };

  export type Report_to_clauseGroupByOutputType = {
    id: string;
    reportId: string;
    clauseId: string;
    _count: Report_to_clauseCountAggregateOutputType | null;
    _min: Report_to_clauseMinAggregateOutputType | null;
    _max: Report_to_clauseMaxAggregateOutputType | null;
  };

  type GetReport_to_clauseGroupByPayload<T extends Report_to_clauseGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<Report_to_clauseGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof Report_to_clauseGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], Report_to_clauseGroupByOutputType[P]>
          : GetScalarType<T[P], Report_to_clauseGroupByOutputType[P]>;
      }
    >
  >;

  export type report_to_clauseSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> =
    $Extensions.GetSelect<
      {
        id?: boolean;
        reportId?: boolean;
        clauseId?: boolean;
        clause?: boolean | clauseArgs<ExtArgs>;
        report?: boolean | reportArgs<ExtArgs>;
      },
      ExtArgs["result"]["report_to_clause"]
    >;

  export type report_to_clauseSelectScalar = {
    id?: boolean;
    reportId?: boolean;
    clauseId?: boolean;
  };

  export type report_to_clauseInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    clause?: boolean | clauseArgs<ExtArgs>;
    report?: boolean | reportArgs<ExtArgs>;
  };

  type report_to_clauseGetPayload<S extends boolean | null | undefined | report_to_clauseArgs> = $Types.GetResult<
    report_to_clausePayload,
    S
  >;

  type report_to_clauseCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = Omit<
    report_to_clauseFindManyArgs,
    "select" | "include"
  > & {
    select?: Report_to_clauseCountAggregateInputType | true;
  };

  export interface report_to_clauseDelegate<
    GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined,
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["model"]["report_to_clause"]; meta: { name: "report_to_clause" } };
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
    findUnique<
      T extends report_to_clauseFindUniqueArgs<ExtArgs>,
      LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined,
    >(
      args: SelectSubset<T, report_to_clauseFindUniqueArgs<ExtArgs>>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, "findUnique", "report_to_clause"> extends True
      ? Prisma__report_to_clauseClient<
          $Types.GetResult<report_to_clausePayload<ExtArgs>, T, "findUnique", never>,
          never,
          ExtArgs
        >
      : Prisma__report_to_clauseClient<
          $Types.GetResult<report_to_clausePayload<ExtArgs>, T, "findUnique", never> | null,
          null,
          ExtArgs
        >;

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
      args?: SelectSubset<T, report_to_clauseFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__report_to_clauseClient<
      $Types.GetResult<report_to_clausePayload<ExtArgs>, T, "findUniqueOrThrow", never>,
      never,
      ExtArgs
    >;

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
    findFirst<
      T extends report_to_clauseFindFirstArgs<ExtArgs>,
      LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined,
    >(
      args?: SelectSubset<T, report_to_clauseFindFirstArgs<ExtArgs>>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, "findFirst", "report_to_clause"> extends True
      ? Prisma__report_to_clauseClient<
          $Types.GetResult<report_to_clausePayload<ExtArgs>, T, "findFirst", never>,
          never,
          ExtArgs
        >
      : Prisma__report_to_clauseClient<
          $Types.GetResult<report_to_clausePayload<ExtArgs>, T, "findFirst", never> | null,
          null,
          ExtArgs
        >;

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
      args?: SelectSubset<T, report_to_clauseFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__report_to_clauseClient<
      $Types.GetResult<report_to_clausePayload<ExtArgs>, T, "findFirstOrThrow", never>,
      never,
      ExtArgs
    >;

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
      args?: SelectSubset<T, report_to_clauseFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Types.GetResult<report_to_clausePayload<ExtArgs>, T, "findMany", never>>;

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
      args: SelectSubset<T, report_to_clauseCreateArgs<ExtArgs>>,
    ): Prisma__report_to_clauseClient<
      $Types.GetResult<report_to_clausePayload<ExtArgs>, T, "create", never>,
      never,
      ExtArgs
    >;

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
      args?: SelectSubset<T, report_to_clauseCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

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
      args: SelectSubset<T, report_to_clauseDeleteArgs<ExtArgs>>,
    ): Prisma__report_to_clauseClient<
      $Types.GetResult<report_to_clausePayload<ExtArgs>, T, "delete", never>,
      never,
      ExtArgs
    >;

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
      args: SelectSubset<T, report_to_clauseUpdateArgs<ExtArgs>>,
    ): Prisma__report_to_clauseClient<
      $Types.GetResult<report_to_clausePayload<ExtArgs>, T, "update", never>,
      never,
      ExtArgs
    >;

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
      args?: SelectSubset<T, report_to_clauseDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

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
      args: SelectSubset<T, report_to_clauseUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

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
      args: SelectSubset<T, report_to_clauseUpsertArgs<ExtArgs>>,
    ): Prisma__report_to_clauseClient<
      $Types.GetResult<report_to_clausePayload<ExtArgs>, T, "upsert", never>,
      never,
      ExtArgs
    >;

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
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], Report_to_clauseCountAggregateOutputType>
        : number
    >;

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
    aggregate<T extends Report_to_clauseAggregateArgs>(
      args: Subset<T, Report_to_clauseAggregateArgs>,
    ): Prisma.PrismaPromise<GetReport_to_clauseAggregateType<T>>;

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
      HasSelectOrTake extends Or<Extends<"skip", Keys<T>>, Extends<"take", Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Report_to_clauseGroupByArgs["orderBy"] }
        : { orderBy?: Report_to_clauseGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
      ByFields extends TupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, "Field ", P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, Report_to_clauseGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetReport_to_clauseGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
  }

  /**
   * The delegate class that acts as a "Promise-like" for report_to_clause.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__report_to_clauseClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > implements Prisma.PrismaPromise<T>
  {
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
    readonly [Symbol.toStringTag]: "PrismaPromise";
    constructor(
      _dmmf: runtime.DMMFClass,
      _queryType: "query" | "mutation",
      _rootField: string,
      _clientMethod: string,
      _args: any,
      _dataPath: string[],
      _errorFormat: ErrorFormat,
      _measurePerformance?: boolean | undefined,
      _isList?: boolean,
    );

    clause<T extends clauseArgs<ExtArgs> = {}>(
      args?: Subset<T, clauseArgs<ExtArgs>>,
    ): Prisma__clauseClient<$Types.GetResult<clausePayload<ExtArgs>, T, "findUnique", never> | Null, never, ExtArgs>;

    report<T extends reportArgs<ExtArgs> = {}>(
      args?: Subset<T, reportArgs<ExtArgs>>,
    ): Prisma__reportClient<$Types.GetResult<reportPayload<ExtArgs>, T, "findUnique", never> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): Promise<T | TResult>;
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
    select?: report_to_clauseSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_clauseInclude<ExtArgs> | null;
    /**
     * Filter, which report_to_clause to fetch.
     */
    where: report_to_clauseWhereUniqueInput;
  };

  /**
   * report_to_clause findUnique
   */
  export interface report_to_clauseFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs>
    extends report_to_clauseFindUniqueArgsBase<ExtArgs> {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound;
  }

  /**
   * report_to_clause findUniqueOrThrow
   */
  export type report_to_clauseFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_clause
     */
    select?: report_to_clauseSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_clauseInclude<ExtArgs> | null;
    /**
     * Filter, which report_to_clause to fetch.
     */
    where: report_to_clauseWhereUniqueInput;
  };

  /**
   * report_to_clause base type for findFirst actions
   */
  export type report_to_clauseFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_clause
     */
    select?: report_to_clauseSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_clauseInclude<ExtArgs> | null;
    /**
     * Filter, which report_to_clause to fetch.
     */
    where?: report_to_clauseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of report_to_clauses to fetch.
     */
    orderBy?: Enumerable<report_to_clauseOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for report_to_clauses.
     */
    cursor?: report_to_clauseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` report_to_clauses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` report_to_clauses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of report_to_clauses.
     */
    distinct?: Enumerable<Report_to_clauseScalarFieldEnum>;
  };

  /**
   * report_to_clause findFirst
   */
  export interface report_to_clauseFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs>
    extends report_to_clauseFindFirstArgsBase<ExtArgs> {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound;
  }

  /**
   * report_to_clause findFirstOrThrow
   */
  export type report_to_clauseFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_clause
     */
    select?: report_to_clauseSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_clauseInclude<ExtArgs> | null;
    /**
     * Filter, which report_to_clause to fetch.
     */
    where?: report_to_clauseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of report_to_clauses to fetch.
     */
    orderBy?: Enumerable<report_to_clauseOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for report_to_clauses.
     */
    cursor?: report_to_clauseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` report_to_clauses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` report_to_clauses.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of report_to_clauses.
     */
    distinct?: Enumerable<Report_to_clauseScalarFieldEnum>;
  };

  /**
   * report_to_clause findMany
   */
  export type report_to_clauseFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_clause
     */
    select?: report_to_clauseSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_clauseInclude<ExtArgs> | null;
    /**
     * Filter, which report_to_clauses to fetch.
     */
    where?: report_to_clauseWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of report_to_clauses to fetch.
     */
    orderBy?: Enumerable<report_to_clauseOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing report_to_clauses.
     */
    cursor?: report_to_clauseWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` report_to_clauses from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` report_to_clauses.
     */
    skip?: number;
    distinct?: Enumerable<Report_to_clauseScalarFieldEnum>;
  };

  /**
   * report_to_clause create
   */
  export type report_to_clauseCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_clause
     */
    select?: report_to_clauseSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_clauseInclude<ExtArgs> | null;
    /**
     * The data needed to create a report_to_clause.
     */
    data: XOR<report_to_clauseCreateInput, report_to_clauseUncheckedCreateInput>;
  };

  /**
   * report_to_clause createMany
   */
  export type report_to_clauseCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many report_to_clauses.
     */
    data: Enumerable<report_to_clauseCreateManyInput>;
    skipDuplicates?: boolean;
  };

  /**
   * report_to_clause update
   */
  export type report_to_clauseUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_clause
     */
    select?: report_to_clauseSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_clauseInclude<ExtArgs> | null;
    /**
     * The data needed to update a report_to_clause.
     */
    data: XOR<report_to_clauseUpdateInput, report_to_clauseUncheckedUpdateInput>;
    /**
     * Choose, which report_to_clause to update.
     */
    where: report_to_clauseWhereUniqueInput;
  };

  /**
   * report_to_clause updateMany
   */
  export type report_to_clauseUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update report_to_clauses.
     */
    data: XOR<report_to_clauseUpdateManyMutationInput, report_to_clauseUncheckedUpdateManyInput>;
    /**
     * Filter which report_to_clauses to update
     */
    where?: report_to_clauseWhereInput;
  };

  /**
   * report_to_clause upsert
   */
  export type report_to_clauseUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_clause
     */
    select?: report_to_clauseSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_clauseInclude<ExtArgs> | null;
    /**
     * The filter to search for the report_to_clause to update in case it exists.
     */
    where: report_to_clauseWhereUniqueInput;
    /**
     * In case the report_to_clause found by the `where` argument doesn't exist, create a new report_to_clause with this data.
     */
    create: XOR<report_to_clauseCreateInput, report_to_clauseUncheckedCreateInput>;
    /**
     * In case the report_to_clause was found with the provided `where` argument, update it with this data.
     */
    update: XOR<report_to_clauseUpdateInput, report_to_clauseUncheckedUpdateInput>;
  };

  /**
   * report_to_clause delete
   */
  export type report_to_clauseDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_clause
     */
    select?: report_to_clauseSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_clauseInclude<ExtArgs> | null;
    /**
     * Filter which report_to_clause to delete.
     */
    where: report_to_clauseWhereUniqueInput;
  };

  /**
   * report_to_clause deleteMany
   */
  export type report_to_clauseDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which report_to_clauses to delete
     */
    where?: report_to_clauseWhereInput;
  };

  /**
   * report_to_clause without action
   */
  export type report_to_clauseArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report_to_clause
     */
    select?: report_to_clauseSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: report_to_clauseInclude<ExtArgs> | null;
  };

  /**
   * Model chip
   */

  export type AggregateChip = {
    _count: ChipCountAggregateOutputType | null;
    _min: ChipMinAggregateOutputType | null;
    _max: ChipMaxAggregateOutputType | null;
  };

  export type ChipMinAggregateOutputType = {
    key: string | null;
    value: string | null;
    udap_id: string | null;
    text: string | null;
  };

  export type ChipMaxAggregateOutputType = {
    key: string | null;
    value: string | null;
    udap_id: string | null;
    text: string | null;
  };

  export type ChipCountAggregateOutputType = {
    key: number;
    value: number;
    udap_id: number;
    text: number;
    _all: number;
  };

  export type ChipMinAggregateInputType = {
    key?: true;
    value?: true;
    udap_id?: true;
    text?: true;
  };

  export type ChipMaxAggregateInputType = {
    key?: true;
    value?: true;
    udap_id?: true;
    text?: true;
  };

  export type ChipCountAggregateInputType = {
    key?: true;
    value?: true;
    udap_id?: true;
    text?: true;
    _all?: true;
  };

  export type ChipAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which chip to aggregate.
     */
    where?: chipWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of chips to fetch.
     */
    orderBy?: Enumerable<chipOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: chipWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` chips from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` chips.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned chips
     **/
    _count?: true | ChipCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ChipMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ChipMaxAggregateInputType;
  };

  export type GetChipAggregateType<T extends ChipAggregateArgs> = {
    [P in keyof T & keyof AggregateChip]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateChip[P]>
      : GetScalarType<T[P], AggregateChip[P]>;
  };

  export type ChipGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: chipWhereInput;
    orderBy?: Enumerable<chipOrderByWithAggregationInput>;
    by: ChipScalarFieldEnum[];
    having?: chipScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ChipCountAggregateInputType | true;
    _min?: ChipMinAggregateInputType;
    _max?: ChipMaxAggregateInputType;
  };

  export type ChipGroupByOutputType = {
    key: string;
    value: string;
    udap_id: string;
    text: string;
    _count: ChipCountAggregateOutputType | null;
    _min: ChipMinAggregateOutputType | null;
    _max: ChipMaxAggregateOutputType | null;
  };

  type GetChipGroupByPayload<T extends ChipGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<ChipGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof ChipGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], ChipGroupByOutputType[P]>
          : GetScalarType<T[P], ChipGroupByOutputType[P]>;
      }
    >
  >;

  export type chipSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<
    {
      key?: boolean;
      value?: boolean;
      udap_id?: boolean;
      text?: boolean;
    },
    ExtArgs["result"]["chip"]
  >;

  export type chipSelectScalar = {
    key?: boolean;
    value?: boolean;
    udap_id?: boolean;
    text?: boolean;
  };

  type chipGetPayload<S extends boolean | null | undefined | chipArgs> = $Types.GetResult<chipPayload, S>;

  type chipCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = Omit<
    chipFindManyArgs,
    "select" | "include"
  > & {
    select?: ChipCountAggregateInputType | true;
  };

  export interface chipDelegate<
    GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined,
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["model"]["chip"]; meta: { name: "chip" } };
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
    findUnique<
      T extends chipFindUniqueArgs<ExtArgs>,
      LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined,
    >(
      args: SelectSubset<T, chipFindUniqueArgs<ExtArgs>>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, "findUnique", "chip"> extends True
      ? Prisma__chipClient<$Types.GetResult<chipPayload<ExtArgs>, T, "findUnique", never>, never, ExtArgs>
      : Prisma__chipClient<$Types.GetResult<chipPayload<ExtArgs>, T, "findUnique", never> | null, null, ExtArgs>;

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
      args?: SelectSubset<T, chipFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__chipClient<$Types.GetResult<chipPayload<ExtArgs>, T, "findUniqueOrThrow", never>, never, ExtArgs>;

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
    findFirst<
      T extends chipFindFirstArgs<ExtArgs>,
      LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined,
    >(
      args?: SelectSubset<T, chipFindFirstArgs<ExtArgs>>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, "findFirst", "chip"> extends True
      ? Prisma__chipClient<$Types.GetResult<chipPayload<ExtArgs>, T, "findFirst", never>, never, ExtArgs>
      : Prisma__chipClient<$Types.GetResult<chipPayload<ExtArgs>, T, "findFirst", never> | null, null, ExtArgs>;

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
      args?: SelectSubset<T, chipFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__chipClient<$Types.GetResult<chipPayload<ExtArgs>, T, "findFirstOrThrow", never>, never, ExtArgs>;

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
     * // Only select the `key`
     * const chipWithKeyOnly = await prisma.chip.findMany({ select: { key: true } })
     *
     **/
    findMany<T extends chipFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, chipFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Types.GetResult<chipPayload<ExtArgs>, T, "findMany", never>>;

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
      args: SelectSubset<T, chipCreateArgs<ExtArgs>>,
    ): Prisma__chipClient<$Types.GetResult<chipPayload<ExtArgs>, T, "create", never>, never, ExtArgs>;

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
      args?: SelectSubset<T, chipCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

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
      args: SelectSubset<T, chipDeleteArgs<ExtArgs>>,
    ): Prisma__chipClient<$Types.GetResult<chipPayload<ExtArgs>, T, "delete", never>, never, ExtArgs>;

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
      args: SelectSubset<T, chipUpdateArgs<ExtArgs>>,
    ): Prisma__chipClient<$Types.GetResult<chipPayload<ExtArgs>, T, "update", never>, never, ExtArgs>;

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
      args?: SelectSubset<T, chipDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

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
      args: SelectSubset<T, chipUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

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
      args: SelectSubset<T, chipUpsertArgs<ExtArgs>>,
    ): Prisma__chipClient<$Types.GetResult<chipPayload<ExtArgs>, T, "upsert", never>, never, ExtArgs>;

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
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], ChipCountAggregateOutputType>
        : number
    >;

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
    aggregate<T extends ChipAggregateArgs>(
      args: Subset<T, ChipAggregateArgs>,
    ): Prisma.PrismaPromise<GetChipAggregateType<T>>;

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
      HasSelectOrTake extends Or<Extends<"skip", Keys<T>>, Extends<"take", Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ChipGroupByArgs["orderBy"] }
        : { orderBy?: ChipGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
      ByFields extends TupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, "Field ", P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, ChipGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetChipGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
  }

  /**
   * The delegate class that acts as a "Promise-like" for chip.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__chipClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs>
    implements Prisma.PrismaPromise<T>
  {
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
    readonly [Symbol.toStringTag]: "PrismaPromise";
    constructor(
      _dmmf: runtime.DMMFClass,
      _queryType: "query" | "mutation",
      _rootField: string,
      _clientMethod: string,
      _args: any,
      _dataPath: string[],
      _errorFormat: ErrorFormat,
      _measurePerformance?: boolean | undefined,
      _isList?: boolean,
    );

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): Promise<T | TResult>;
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
    select?: chipSelect<ExtArgs> | null;
    /**
     * Filter, which chip to fetch.
     */
    where: chipWhereUniqueInput;
  };

  /**
   * chip findUnique
   */
  export interface chipFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs>
    extends chipFindUniqueArgsBase<ExtArgs> {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound;
  }

  /**
   * chip findUniqueOrThrow
   */
  export type chipFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chip
     */
    select?: chipSelect<ExtArgs> | null;
    /**
     * Filter, which chip to fetch.
     */
    where: chipWhereUniqueInput;
  };

  /**
   * chip base type for findFirst actions
   */
  export type chipFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chip
     */
    select?: chipSelect<ExtArgs> | null;
    /**
     * Filter, which chip to fetch.
     */
    where?: chipWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of chips to fetch.
     */
    orderBy?: Enumerable<chipOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for chips.
     */
    cursor?: chipWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` chips from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` chips.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of chips.
     */
    distinct?: Enumerable<ChipScalarFieldEnum>;
  };

  /**
   * chip findFirst
   */
  export interface chipFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs>
    extends chipFindFirstArgsBase<ExtArgs> {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound;
  }

  /**
   * chip findFirstOrThrow
   */
  export type chipFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chip
     */
    select?: chipSelect<ExtArgs> | null;
    /**
     * Filter, which chip to fetch.
     */
    where?: chipWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of chips to fetch.
     */
    orderBy?: Enumerable<chipOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for chips.
     */
    cursor?: chipWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` chips from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` chips.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of chips.
     */
    distinct?: Enumerable<ChipScalarFieldEnum>;
  };

  /**
   * chip findMany
   */
  export type chipFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chip
     */
    select?: chipSelect<ExtArgs> | null;
    /**
     * Filter, which chips to fetch.
     */
    where?: chipWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of chips to fetch.
     */
    orderBy?: Enumerable<chipOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing chips.
     */
    cursor?: chipWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` chips from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` chips.
     */
    skip?: number;
    distinct?: Enumerable<ChipScalarFieldEnum>;
  };

  /**
   * chip create
   */
  export type chipCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chip
     */
    select?: chipSelect<ExtArgs> | null;
    /**
     * The data needed to create a chip.
     */
    data: XOR<chipCreateInput, chipUncheckedCreateInput>;
  };

  /**
   * chip createMany
   */
  export type chipCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many chips.
     */
    data: Enumerable<chipCreateManyInput>;
    skipDuplicates?: boolean;
  };

  /**
   * chip update
   */
  export type chipUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chip
     */
    select?: chipSelect<ExtArgs> | null;
    /**
     * The data needed to update a chip.
     */
    data: XOR<chipUpdateInput, chipUncheckedUpdateInput>;
    /**
     * Choose, which chip to update.
     */
    where: chipWhereUniqueInput;
  };

  /**
   * chip updateMany
   */
  export type chipUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update chips.
     */
    data: XOR<chipUpdateManyMutationInput, chipUncheckedUpdateManyInput>;
    /**
     * Filter which chips to update
     */
    where?: chipWhereInput;
  };

  /**
   * chip upsert
   */
  export type chipUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chip
     */
    select?: chipSelect<ExtArgs> | null;
    /**
     * The filter to search for the chip to update in case it exists.
     */
    where: chipWhereUniqueInput;
    /**
     * In case the chip found by the `where` argument doesn't exist, create a new chip with this data.
     */
    create: XOR<chipCreateInput, chipUncheckedCreateInput>;
    /**
     * In case the chip was found with the provided `where` argument, update it with this data.
     */
    update: XOR<chipUpdateInput, chipUncheckedUpdateInput>;
  };

  /**
   * chip delete
   */
  export type chipDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chip
     */
    select?: chipSelect<ExtArgs> | null;
    /**
     * Filter which chip to delete.
     */
    where: chipWhereUniqueInput;
  };

  /**
   * chip deleteMany
   */
  export type chipDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which chips to delete
     */
    where?: chipWhereInput;
  };

  /**
   * chip without action
   */
  export type chipArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the chip
     */
    select?: chipSelect<ExtArgs> | null;
  };

  /**
   * Model delegation
   */

  export type AggregateDelegation = {
    _count: DelegationCountAggregateOutputType | null;
    _min: DelegationMinAggregateOutputType | null;
    _max: DelegationMaxAggregateOutputType | null;
  };

  export type DelegationMinAggregateOutputType = {
    createdBy: string | null;
    delegatedTo: string | null;
  };

  export type DelegationMaxAggregateOutputType = {
    createdBy: string | null;
    delegatedTo: string | null;
  };

  export type DelegationCountAggregateOutputType = {
    createdBy: number;
    delegatedTo: number;
    _all: number;
  };

  export type DelegationMinAggregateInputType = {
    createdBy?: true;
    delegatedTo?: true;
  };

  export type DelegationMaxAggregateInputType = {
    createdBy?: true;
    delegatedTo?: true;
  };

  export type DelegationCountAggregateInputType = {
    createdBy?: true;
    delegatedTo?: true;
    _all?: true;
  };

  export type DelegationAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which delegation to aggregate.
     */
    where?: delegationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of delegations to fetch.
     */
    orderBy?: Enumerable<delegationOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: delegationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` delegations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` delegations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned delegations
     **/
    _count?: true | DelegationCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: DelegationMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: DelegationMaxAggregateInputType;
  };

  export type GetDelegationAggregateType<T extends DelegationAggregateArgs> = {
    [P in keyof T & keyof AggregateDelegation]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDelegation[P]>
      : GetScalarType<T[P], AggregateDelegation[P]>;
  };

  export type DelegationGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: delegationWhereInput;
    orderBy?: Enumerable<delegationOrderByWithAggregationInput>;
    by: DelegationScalarFieldEnum[];
    having?: delegationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DelegationCountAggregateInputType | true;
    _min?: DelegationMinAggregateInputType;
    _max?: DelegationMaxAggregateInputType;
  };

  export type DelegationGroupByOutputType = {
    createdBy: string;
    delegatedTo: string;
    _count: DelegationCountAggregateOutputType | null;
    _min: DelegationMinAggregateOutputType | null;
    _max: DelegationMaxAggregateOutputType | null;
  };

  type GetDelegationGroupByPayload<T extends DelegationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<DelegationGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof DelegationGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], DelegationGroupByOutputType[P]>
          : GetScalarType<T[P], DelegationGroupByOutputType[P]>;
      }
    >
  >;

  export type delegationSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<
    {
      createdBy?: boolean;
      delegatedTo?: boolean;
      user_delegation_createdByTouser?: boolean | userArgs<ExtArgs>;
      user_delegation_delegatedToTouser?: boolean | userArgs<ExtArgs>;
    },
    ExtArgs["result"]["delegation"]
  >;

  export type delegationSelectScalar = {
    createdBy?: boolean;
    delegatedTo?: boolean;
  };

  export type delegationInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    user_delegation_createdByTouser?: boolean | userArgs<ExtArgs>;
    user_delegation_delegatedToTouser?: boolean | userArgs<ExtArgs>;
  };

  type delegationGetPayload<S extends boolean | null | undefined | delegationArgs> = $Types.GetResult<
    delegationPayload,
    S
  >;

  type delegationCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = Omit<
    delegationFindManyArgs,
    "select" | "include"
  > & {
    select?: DelegationCountAggregateInputType | true;
  };

  export interface delegationDelegate<
    GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined,
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["model"]["delegation"]; meta: { name: "delegation" } };
    /**
     * Find zero or one Delegation that matches the filter.
     * @param {delegationFindUniqueArgs} args - Arguments to find a Delegation
     * @example
     * // Get one Delegation
     * const delegation = await prisma.delegation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<
      T extends delegationFindUniqueArgs<ExtArgs>,
      LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined,
    >(
      args: SelectSubset<T, delegationFindUniqueArgs<ExtArgs>>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, "findUnique", "delegation"> extends True
      ? Prisma__delegationClient<$Types.GetResult<delegationPayload<ExtArgs>, T, "findUnique", never>, never, ExtArgs>
      : Prisma__delegationClient<
          $Types.GetResult<delegationPayload<ExtArgs>, T, "findUnique", never> | null,
          null,
          ExtArgs
        >;

    /**
     * Find one Delegation that matches the filter or throw an error  with `error.code='P2025'`
     *     if no matches were found.
     * @param {delegationFindUniqueOrThrowArgs} args - Arguments to find a Delegation
     * @example
     * // Get one Delegation
     * const delegation = await prisma.delegation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUniqueOrThrow<T extends delegationFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, delegationFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__delegationClient<
      $Types.GetResult<delegationPayload<ExtArgs>, T, "findUniqueOrThrow", never>,
      never,
      ExtArgs
    >;

    /**
     * Find the first Delegation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {delegationFindFirstArgs} args - Arguments to find a Delegation
     * @example
     * // Get one Delegation
     * const delegation = await prisma.delegation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<
      T extends delegationFindFirstArgs<ExtArgs>,
      LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined,
    >(
      args?: SelectSubset<T, delegationFindFirstArgs<ExtArgs>>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, "findFirst", "delegation"> extends True
      ? Prisma__delegationClient<$Types.GetResult<delegationPayload<ExtArgs>, T, "findFirst", never>, never, ExtArgs>
      : Prisma__delegationClient<
          $Types.GetResult<delegationPayload<ExtArgs>, T, "findFirst", never> | null,
          null,
          ExtArgs
        >;

    /**
     * Find the first Delegation that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {delegationFindFirstOrThrowArgs} args - Arguments to find a Delegation
     * @example
     * // Get one Delegation
     * const delegation = await prisma.delegation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirstOrThrow<T extends delegationFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, delegationFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__delegationClient<
      $Types.GetResult<delegationPayload<ExtArgs>, T, "findFirstOrThrow", never>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Delegations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {delegationFindManyArgs=} args - Arguments to filter and select certain fields only.
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
    findMany<T extends delegationFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, delegationFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Types.GetResult<delegationPayload<ExtArgs>, T, "findMany", never>>;

    /**
     * Create a Delegation.
     * @param {delegationCreateArgs} args - Arguments to create a Delegation.
     * @example
     * // Create one Delegation
     * const Delegation = await prisma.delegation.create({
     *   data: {
     *     // ... data to create a Delegation
     *   }
     * })
     *
     **/
    create<T extends delegationCreateArgs<ExtArgs>>(
      args: SelectSubset<T, delegationCreateArgs<ExtArgs>>,
    ): Prisma__delegationClient<$Types.GetResult<delegationPayload<ExtArgs>, T, "create", never>, never, ExtArgs>;

    /**
     * Create many Delegations.
     *     @param {delegationCreateManyArgs} args - Arguments to create many Delegations.
     *     @example
     *     // Create many Delegations
     *     const delegation = await prisma.delegation.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *
     **/
    createMany<T extends delegationCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, delegationCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Delete a Delegation.
     * @param {delegationDeleteArgs} args - Arguments to delete one Delegation.
     * @example
     * // Delete one Delegation
     * const Delegation = await prisma.delegation.delete({
     *   where: {
     *     // ... filter to delete one Delegation
     *   }
     * })
     *
     **/
    delete<T extends delegationDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, delegationDeleteArgs<ExtArgs>>,
    ): Prisma__delegationClient<$Types.GetResult<delegationPayload<ExtArgs>, T, "delete", never>, never, ExtArgs>;

    /**
     * Update one Delegation.
     * @param {delegationUpdateArgs} args - Arguments to update one Delegation.
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
    update<T extends delegationUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, delegationUpdateArgs<ExtArgs>>,
    ): Prisma__delegationClient<$Types.GetResult<delegationPayload<ExtArgs>, T, "update", never>, never, ExtArgs>;

    /**
     * Delete zero or more Delegations.
     * @param {delegationDeleteManyArgs} args - Arguments to filter Delegations to delete.
     * @example
     * // Delete a few Delegations
     * const { count } = await prisma.delegation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends delegationDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, delegationDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Delegations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {delegationUpdateManyArgs} args - Arguments to update one or more rows.
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
    updateMany<T extends delegationUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, delegationUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Delegation.
     * @param {delegationUpsertArgs} args - Arguments to update or create a Delegation.
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
    upsert<T extends delegationUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, delegationUpsertArgs<ExtArgs>>,
    ): Prisma__delegationClient<$Types.GetResult<delegationPayload<ExtArgs>, T, "upsert", never>, never, ExtArgs>;

    /**
     * Count the number of Delegations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {delegationCountArgs} args - Arguments to filter Delegations to count.
     * @example
     * // Count the number of Delegations
     * const count = await prisma.delegation.count({
     *   where: {
     *     // ... the filter for the Delegations we want to count
     *   }
     * })
     **/
    count<T extends delegationCountArgs>(
      args?: Subset<T, delegationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], DelegationCountAggregateOutputType>
        : number
    >;

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
    aggregate<T extends DelegationAggregateArgs>(
      args: Subset<T, DelegationAggregateArgs>,
    ): Prisma.PrismaPromise<GetDelegationAggregateType<T>>;

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
      HasSelectOrTake extends Or<Extends<"skip", Keys<T>>, Extends<"take", Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DelegationGroupByArgs["orderBy"] }
        : { orderBy?: DelegationGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
      ByFields extends TupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, "Field ", P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, DelegationGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetDelegationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
  }

  /**
   * The delegate class that acts as a "Promise-like" for delegation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__delegationClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs>
    implements Prisma.PrismaPromise<T>
  {
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
    readonly [Symbol.toStringTag]: "PrismaPromise";
    constructor(
      _dmmf: runtime.DMMFClass,
      _queryType: "query" | "mutation",
      _rootField: string,
      _clientMethod: string,
      _args: any,
      _dataPath: string[],
      _errorFormat: ErrorFormat,
      _measurePerformance?: boolean | undefined,
      _isList?: boolean,
    );

    user_delegation_createdByTouser<T extends userArgs<ExtArgs> = {}>(
      args?: Subset<T, userArgs<ExtArgs>>,
    ): Prisma__userClient<$Types.GetResult<userPayload<ExtArgs>, T, "findUnique", never> | Null, never, ExtArgs>;

    user_delegation_delegatedToTouser<T extends userArgs<ExtArgs> = {}>(
      args?: Subset<T, userArgs<ExtArgs>>,
    ): Prisma__userClient<$Types.GetResult<userPayload<ExtArgs>, T, "findUnique", never> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): Promise<T | TResult>;
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
   * delegation base type for findUnique actions
   */
  export type delegationFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the delegation
     */
    select?: delegationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: delegationInclude<ExtArgs> | null;
    /**
     * Filter, which delegation to fetch.
     */
    where: delegationWhereUniqueInput;
  };

  /**
   * delegation findUnique
   */
  export interface delegationFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs>
    extends delegationFindUniqueArgsBase<ExtArgs> {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound;
  }

  /**
   * delegation findUniqueOrThrow
   */
  export type delegationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the delegation
     */
    select?: delegationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: delegationInclude<ExtArgs> | null;
    /**
     * Filter, which delegation to fetch.
     */
    where: delegationWhereUniqueInput;
  };

  /**
   * delegation base type for findFirst actions
   */
  export type delegationFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the delegation
     */
    select?: delegationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: delegationInclude<ExtArgs> | null;
    /**
     * Filter, which delegation to fetch.
     */
    where?: delegationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of delegations to fetch.
     */
    orderBy?: Enumerable<delegationOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for delegations.
     */
    cursor?: delegationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` delegations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` delegations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of delegations.
     */
    distinct?: Enumerable<DelegationScalarFieldEnum>;
  };

  /**
   * delegation findFirst
   */
  export interface delegationFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs>
    extends delegationFindFirstArgsBase<ExtArgs> {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound;
  }

  /**
   * delegation findFirstOrThrow
   */
  export type delegationFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the delegation
     */
    select?: delegationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: delegationInclude<ExtArgs> | null;
    /**
     * Filter, which delegation to fetch.
     */
    where?: delegationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of delegations to fetch.
     */
    orderBy?: Enumerable<delegationOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for delegations.
     */
    cursor?: delegationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` delegations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` delegations.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of delegations.
     */
    distinct?: Enumerable<DelegationScalarFieldEnum>;
  };

  /**
   * delegation findMany
   */
  export type delegationFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the delegation
     */
    select?: delegationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: delegationInclude<ExtArgs> | null;
    /**
     * Filter, which delegations to fetch.
     */
    where?: delegationWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of delegations to fetch.
     */
    orderBy?: Enumerable<delegationOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing delegations.
     */
    cursor?: delegationWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` delegations from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` delegations.
     */
    skip?: number;
    distinct?: Enumerable<DelegationScalarFieldEnum>;
  };

  /**
   * delegation create
   */
  export type delegationCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the delegation
     */
    select?: delegationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: delegationInclude<ExtArgs> | null;
    /**
     * The data needed to create a delegation.
     */
    data: XOR<delegationCreateInput, delegationUncheckedCreateInput>;
  };

  /**
   * delegation createMany
   */
  export type delegationCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many delegations.
     */
    data: Enumerable<delegationCreateManyInput>;
    skipDuplicates?: boolean;
  };

  /**
   * delegation update
   */
  export type delegationUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the delegation
     */
    select?: delegationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: delegationInclude<ExtArgs> | null;
    /**
     * The data needed to update a delegation.
     */
    data: XOR<delegationUpdateInput, delegationUncheckedUpdateInput>;
    /**
     * Choose, which delegation to update.
     */
    where: delegationWhereUniqueInput;
  };

  /**
   * delegation updateMany
   */
  export type delegationUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update delegations.
     */
    data: XOR<delegationUpdateManyMutationInput, delegationUncheckedUpdateManyInput>;
    /**
     * Filter which delegations to update
     */
    where?: delegationWhereInput;
  };

  /**
   * delegation upsert
   */
  export type delegationUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the delegation
     */
    select?: delegationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: delegationInclude<ExtArgs> | null;
    /**
     * The filter to search for the delegation to update in case it exists.
     */
    where: delegationWhereUniqueInput;
    /**
     * In case the delegation found by the `where` argument doesn't exist, create a new delegation with this data.
     */
    create: XOR<delegationCreateInput, delegationUncheckedCreateInput>;
    /**
     * In case the delegation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<delegationUpdateInput, delegationUncheckedUpdateInput>;
  };

  /**
   * delegation delete
   */
  export type delegationDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the delegation
     */
    select?: delegationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: delegationInclude<ExtArgs> | null;
    /**
     * Filter which delegation to delete.
     */
    where: delegationWhereUniqueInput;
  };

  /**
   * delegation deleteMany
   */
  export type delegationDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which delegations to delete
     */
    where?: delegationWhereInput;
  };

  /**
   * delegation without action
   */
  export type delegationArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the delegation
     */
    select?: delegationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: delegationInclude<ExtArgs> | null;
  };

  /**
   * Model udap
   */

  export type AggregateUdap = {
    _count: UdapCountAggregateOutputType | null;
    _min: UdapMinAggregateOutputType | null;
    _max: UdapMaxAggregateOutputType | null;
  };

  export type UdapMinAggregateOutputType = {
    id: string | null;
    department: string | null;
    completeCoords: string | null;
    visible: boolean | null;
    name: string | null;
    address: string | null;
    zipCode: string | null;
    city: string | null;
    phone: string | null;
    email: string | null;
  };

  export type UdapMaxAggregateOutputType = {
    id: string | null;
    department: string | null;
    completeCoords: string | null;
    visible: boolean | null;
    name: string | null;
    address: string | null;
    zipCode: string | null;
    city: string | null;
    phone: string | null;
    email: string | null;
  };

  export type UdapCountAggregateOutputType = {
    id: number;
    department: number;
    completeCoords: number;
    visible: number;
    name: number;
    address: number;
    zipCode: number;
    city: number;
    phone: number;
    email: number;
    _all: number;
  };

  export type UdapMinAggregateInputType = {
    id?: true;
    department?: true;
    completeCoords?: true;
    visible?: true;
    name?: true;
    address?: true;
    zipCode?: true;
    city?: true;
    phone?: true;
    email?: true;
  };

  export type UdapMaxAggregateInputType = {
    id?: true;
    department?: true;
    completeCoords?: true;
    visible?: true;
    name?: true;
    address?: true;
    zipCode?: true;
    city?: true;
    phone?: true;
    email?: true;
  };

  export type UdapCountAggregateInputType = {
    id?: true;
    department?: true;
    completeCoords?: true;
    visible?: true;
    name?: true;
    address?: true;
    zipCode?: true;
    city?: true;
    phone?: true;
    email?: true;
    _all?: true;
  };

  export type UdapAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which udap to aggregate.
     */
    where?: udapWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of udaps to fetch.
     */
    orderBy?: Enumerable<udapOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: udapWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` udaps from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` udaps.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned udaps
     **/
    _count?: true | UdapCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UdapMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UdapMaxAggregateInputType;
  };

  export type GetUdapAggregateType<T extends UdapAggregateArgs> = {
    [P in keyof T & keyof AggregateUdap]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUdap[P]>
      : GetScalarType<T[P], AggregateUdap[P]>;
  };

  export type UdapGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: udapWhereInput;
    orderBy?: Enumerable<udapOrderByWithAggregationInput>;
    by: UdapScalarFieldEnum[];
    having?: udapScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UdapCountAggregateInputType | true;
    _min?: UdapMinAggregateInputType;
    _max?: UdapMaxAggregateInputType;
  };

  export type UdapGroupByOutputType = {
    id: string;
    department: string;
    completeCoords: string | null;
    visible: boolean | null;
    name: string | null;
    address: string | null;
    zipCode: string | null;
    city: string | null;
    phone: string | null;
    email: string | null;
    _count: UdapCountAggregateOutputType | null;
    _min: UdapMinAggregateOutputType | null;
    _max: UdapMaxAggregateOutputType | null;
  };

  type GetUdapGroupByPayload<T extends UdapGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<UdapGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof UdapGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], UdapGroupByOutputType[P]>
          : GetScalarType<T[P], UdapGroupByOutputType[P]>;
      }
    >
  >;

  export type udapSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<
    {
      id?: boolean;
      department?: boolean;
      completeCoords?: boolean;
      visible?: boolean;
      name?: boolean;
      address?: boolean;
      zipCode?: boolean;
      city?: boolean;
      phone?: boolean;
      email?: boolean;
      user?: boolean | udap$userArgs<ExtArgs>;
      _count?: boolean | UdapCountOutputTypeArgs<ExtArgs>;
    },
    ExtArgs["result"]["udap"]
  >;

  export type udapSelectScalar = {
    id?: boolean;
    department?: boolean;
    completeCoords?: boolean;
    visible?: boolean;
    name?: boolean;
    address?: boolean;
    zipCode?: boolean;
    city?: boolean;
    phone?: boolean;
    email?: boolean;
  };

  export type udapInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    user?: boolean | udap$userArgs<ExtArgs>;
    _count?: boolean | UdapCountOutputTypeArgs<ExtArgs>;
  };

  type udapGetPayload<S extends boolean | null | undefined | udapArgs> = $Types.GetResult<udapPayload, S>;

  type udapCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = Omit<
    udapFindManyArgs,
    "select" | "include"
  > & {
    select?: UdapCountAggregateInputType | true;
  };

  export interface udapDelegate<
    GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined,
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["model"]["udap"]; meta: { name: "udap" } };
    /**
     * Find zero or one Udap that matches the filter.
     * @param {udapFindUniqueArgs} args - Arguments to find a Udap
     * @example
     * // Get one Udap
     * const udap = await prisma.udap.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<
      T extends udapFindUniqueArgs<ExtArgs>,
      LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined,
    >(
      args: SelectSubset<T, udapFindUniqueArgs<ExtArgs>>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, "findUnique", "udap"> extends True
      ? Prisma__udapClient<$Types.GetResult<udapPayload<ExtArgs>, T, "findUnique", never>, never, ExtArgs>
      : Prisma__udapClient<$Types.GetResult<udapPayload<ExtArgs>, T, "findUnique", never> | null, null, ExtArgs>;

    /**
     * Find one Udap that matches the filter or throw an error  with `error.code='P2025'`
     *     if no matches were found.
     * @param {udapFindUniqueOrThrowArgs} args - Arguments to find a Udap
     * @example
     * // Get one Udap
     * const udap = await prisma.udap.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUniqueOrThrow<T extends udapFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, udapFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__udapClient<$Types.GetResult<udapPayload<ExtArgs>, T, "findUniqueOrThrow", never>, never, ExtArgs>;

    /**
     * Find the first Udap that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {udapFindFirstArgs} args - Arguments to find a Udap
     * @example
     * // Get one Udap
     * const udap = await prisma.udap.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<
      T extends udapFindFirstArgs<ExtArgs>,
      LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined,
    >(
      args?: SelectSubset<T, udapFindFirstArgs<ExtArgs>>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, "findFirst", "udap"> extends True
      ? Prisma__udapClient<$Types.GetResult<udapPayload<ExtArgs>, T, "findFirst", never>, never, ExtArgs>
      : Prisma__udapClient<$Types.GetResult<udapPayload<ExtArgs>, T, "findFirst", never> | null, null, ExtArgs>;

    /**
     * Find the first Udap that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {udapFindFirstOrThrowArgs} args - Arguments to find a Udap
     * @example
     * // Get one Udap
     * const udap = await prisma.udap.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirstOrThrow<T extends udapFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, udapFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__udapClient<$Types.GetResult<udapPayload<ExtArgs>, T, "findFirstOrThrow", never>, never, ExtArgs>;

    /**
     * Find zero or more Udaps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {udapFindManyArgs=} args - Arguments to filter and select certain fields only.
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
    findMany<T extends udapFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, udapFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Types.GetResult<udapPayload<ExtArgs>, T, "findMany", never>>;

    /**
     * Create a Udap.
     * @param {udapCreateArgs} args - Arguments to create a Udap.
     * @example
     * // Create one Udap
     * const Udap = await prisma.udap.create({
     *   data: {
     *     // ... data to create a Udap
     *   }
     * })
     *
     **/
    create<T extends udapCreateArgs<ExtArgs>>(
      args: SelectSubset<T, udapCreateArgs<ExtArgs>>,
    ): Prisma__udapClient<$Types.GetResult<udapPayload<ExtArgs>, T, "create", never>, never, ExtArgs>;

    /**
     * Create many Udaps.
     *     @param {udapCreateManyArgs} args - Arguments to create many Udaps.
     *     @example
     *     // Create many Udaps
     *     const udap = await prisma.udap.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *
     **/
    createMany<T extends udapCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, udapCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Delete a Udap.
     * @param {udapDeleteArgs} args - Arguments to delete one Udap.
     * @example
     * // Delete one Udap
     * const Udap = await prisma.udap.delete({
     *   where: {
     *     // ... filter to delete one Udap
     *   }
     * })
     *
     **/
    delete<T extends udapDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, udapDeleteArgs<ExtArgs>>,
    ): Prisma__udapClient<$Types.GetResult<udapPayload<ExtArgs>, T, "delete", never>, never, ExtArgs>;

    /**
     * Update one Udap.
     * @param {udapUpdateArgs} args - Arguments to update one Udap.
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
    update<T extends udapUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, udapUpdateArgs<ExtArgs>>,
    ): Prisma__udapClient<$Types.GetResult<udapPayload<ExtArgs>, T, "update", never>, never, ExtArgs>;

    /**
     * Delete zero or more Udaps.
     * @param {udapDeleteManyArgs} args - Arguments to filter Udaps to delete.
     * @example
     * // Delete a few Udaps
     * const { count } = await prisma.udap.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends udapDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, udapDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Udaps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {udapUpdateManyArgs} args - Arguments to update one or more rows.
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
    updateMany<T extends udapUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, udapUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Udap.
     * @param {udapUpsertArgs} args - Arguments to update or create a Udap.
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
    upsert<T extends udapUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, udapUpsertArgs<ExtArgs>>,
    ): Prisma__udapClient<$Types.GetResult<udapPayload<ExtArgs>, T, "upsert", never>, never, ExtArgs>;

    /**
     * Count the number of Udaps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {udapCountArgs} args - Arguments to filter Udaps to count.
     * @example
     * // Count the number of Udaps
     * const count = await prisma.udap.count({
     *   where: {
     *     // ... the filter for the Udaps we want to count
     *   }
     * })
     **/
    count<T extends udapCountArgs>(
      args?: Subset<T, udapCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], UdapCountAggregateOutputType>
        : number
    >;

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
    aggregate<T extends UdapAggregateArgs>(
      args: Subset<T, UdapAggregateArgs>,
    ): Prisma.PrismaPromise<GetUdapAggregateType<T>>;

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
      HasSelectOrTake extends Or<Extends<"skip", Keys<T>>, Extends<"take", Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UdapGroupByArgs["orderBy"] }
        : { orderBy?: UdapGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
      ByFields extends TupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, "Field ", P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, UdapGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetUdapGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
  }

  /**
   * The delegate class that acts as a "Promise-like" for udap.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__udapClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs>
    implements Prisma.PrismaPromise<T>
  {
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
    readonly [Symbol.toStringTag]: "PrismaPromise";
    constructor(
      _dmmf: runtime.DMMFClass,
      _queryType: "query" | "mutation",
      _rootField: string,
      _clientMethod: string,
      _args: any,
      _dataPath: string[],
      _errorFormat: ErrorFormat,
      _measurePerformance?: boolean | undefined,
      _isList?: boolean,
    );

    user<T extends udap$userArgs<ExtArgs> = {}>(
      args?: Subset<T, udap$userArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Types.GetResult<userPayload<ExtArgs>, T, "findMany", never> | Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): Promise<T | TResult>;
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
   * udap base type for findUnique actions
   */
  export type udapFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the udap
     */
    select?: udapSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: udapInclude<ExtArgs> | null;
    /**
     * Filter, which udap to fetch.
     */
    where: udapWhereUniqueInput;
  };

  /**
   * udap findUnique
   */
  export interface udapFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs>
    extends udapFindUniqueArgsBase<ExtArgs> {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound;
  }

  /**
   * udap findUniqueOrThrow
   */
  export type udapFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the udap
     */
    select?: udapSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: udapInclude<ExtArgs> | null;
    /**
     * Filter, which udap to fetch.
     */
    where: udapWhereUniqueInput;
  };

  /**
   * udap base type for findFirst actions
   */
  export type udapFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the udap
     */
    select?: udapSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: udapInclude<ExtArgs> | null;
    /**
     * Filter, which udap to fetch.
     */
    where?: udapWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of udaps to fetch.
     */
    orderBy?: Enumerable<udapOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for udaps.
     */
    cursor?: udapWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` udaps from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` udaps.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of udaps.
     */
    distinct?: Enumerable<UdapScalarFieldEnum>;
  };

  /**
   * udap findFirst
   */
  export interface udapFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs>
    extends udapFindFirstArgsBase<ExtArgs> {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound;
  }

  /**
   * udap findFirstOrThrow
   */
  export type udapFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the udap
     */
    select?: udapSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: udapInclude<ExtArgs> | null;
    /**
     * Filter, which udap to fetch.
     */
    where?: udapWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of udaps to fetch.
     */
    orderBy?: Enumerable<udapOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for udaps.
     */
    cursor?: udapWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` udaps from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` udaps.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of udaps.
     */
    distinct?: Enumerable<UdapScalarFieldEnum>;
  };

  /**
   * udap findMany
   */
  export type udapFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the udap
     */
    select?: udapSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: udapInclude<ExtArgs> | null;
    /**
     * Filter, which udaps to fetch.
     */
    where?: udapWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of udaps to fetch.
     */
    orderBy?: Enumerable<udapOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing udaps.
     */
    cursor?: udapWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` udaps from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` udaps.
     */
    skip?: number;
    distinct?: Enumerable<UdapScalarFieldEnum>;
  };

  /**
   * udap create
   */
  export type udapCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the udap
     */
    select?: udapSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: udapInclude<ExtArgs> | null;
    /**
     * The data needed to create a udap.
     */
    data: XOR<udapCreateInput, udapUncheckedCreateInput>;
  };

  /**
   * udap createMany
   */
  export type udapCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many udaps.
     */
    data: Enumerable<udapCreateManyInput>;
    skipDuplicates?: boolean;
  };

  /**
   * udap update
   */
  export type udapUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the udap
     */
    select?: udapSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: udapInclude<ExtArgs> | null;
    /**
     * The data needed to update a udap.
     */
    data: XOR<udapUpdateInput, udapUncheckedUpdateInput>;
    /**
     * Choose, which udap to update.
     */
    where: udapWhereUniqueInput;
  };

  /**
   * udap updateMany
   */
  export type udapUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update udaps.
     */
    data: XOR<udapUpdateManyMutationInput, udapUncheckedUpdateManyInput>;
    /**
     * Filter which udaps to update
     */
    where?: udapWhereInput;
  };

  /**
   * udap upsert
   */
  export type udapUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the udap
     */
    select?: udapSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: udapInclude<ExtArgs> | null;
    /**
     * The filter to search for the udap to update in case it exists.
     */
    where: udapWhereUniqueInput;
    /**
     * In case the udap found by the `where` argument doesn't exist, create a new udap with this data.
     */
    create: XOR<udapCreateInput, udapUncheckedCreateInput>;
    /**
     * In case the udap was found with the provided `where` argument, update it with this data.
     */
    update: XOR<udapUpdateInput, udapUncheckedUpdateInput>;
  };

  /**
   * udap delete
   */
  export type udapDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the udap
     */
    select?: udapSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: udapInclude<ExtArgs> | null;
    /**
     * Filter which udap to delete.
     */
    where: udapWhereUniqueInput;
  };

  /**
   * udap deleteMany
   */
  export type udapDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which udaps to delete
     */
    where?: udapWhereInput;
  };

  /**
   * udap.user
   */
  export type udap$userArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: userInclude<ExtArgs> | null;
    where?: userWhereInput;
    orderBy?: Enumerable<userOrderByWithRelationInput>;
    cursor?: userWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Enumerable<UserScalarFieldEnum>;
  };

  /**
   * udap without action
   */
  export type udapArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the udap
     */
    select?: udapSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: udapInclude<ExtArgs> | null;
  };

  /**
   * Model user
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  export type UserMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    udap_id: string | null;
  };

  export type UserMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    udap_id: string | null;
  };

  export type UserCountAggregateOutputType = {
    id: number;
    name: number;
    udap_id: number;
    _all: number;
  };

  export type UserMinAggregateInputType = {
    id?: true;
    name?: true;
    udap_id?: true;
  };

  export type UserMaxAggregateInputType = {
    id?: true;
    name?: true;
    udap_id?: true;
  };

  export type UserCountAggregateInputType = {
    id?: true;
    name?: true;
    udap_id?: true;
    _all?: true;
  };

  export type UserAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which user to aggregate.
     */
    where?: userWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of users to fetch.
     */
    orderBy?: Enumerable<userOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: userWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned users
     **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UserMaxAggregateInputType;
  };

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>;
  };

  export type UserGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: userWhereInput;
    orderBy?: Enumerable<userOrderByWithAggregationInput>;
    by: UserScalarFieldEnum[];
    having?: userScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
  };

  export type UserGroupByOutputType = {
    id: string;
    name: string;
    udap_id: string;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<UserGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof UserGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], UserGroupByOutputType[P]>
          : GetScalarType<T[P], UserGroupByOutputType[P]>;
      }
    >
  >;

  export type userSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      udap_id?: boolean;
      delegation_delegation_createdByTouser?: boolean | user$delegation_delegation_createdByTouserArgs<ExtArgs>;
      delegation_delegation_delegatedToTouser?: boolean | user$delegation_delegation_delegatedToTouserArgs<ExtArgs>;
      internal_user?: boolean | user$internal_userArgs<ExtArgs>;
      report?: boolean | user$reportArgs<ExtArgs>;
      udap?: boolean | udapArgs<ExtArgs>;
      _count?: boolean | UserCountOutputTypeArgs<ExtArgs>;
    },
    ExtArgs["result"]["user"]
  >;

  export type userSelectScalar = {
    id?: boolean;
    name?: boolean;
    udap_id?: boolean;
  };

  export type userInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    delegation_delegation_createdByTouser?: boolean | user$delegation_delegation_createdByTouserArgs<ExtArgs>;
    delegation_delegation_delegatedToTouser?: boolean | user$delegation_delegation_delegatedToTouserArgs<ExtArgs>;
    internal_user?: boolean | user$internal_userArgs<ExtArgs>;
    report?: boolean | user$reportArgs<ExtArgs>;
    udap?: boolean | udapArgs<ExtArgs>;
    _count?: boolean | UserCountOutputTypeArgs<ExtArgs>;
  };

  type userGetPayload<S extends boolean | null | undefined | userArgs> = $Types.GetResult<userPayload, S>;

  type userCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = Omit<
    userFindManyArgs,
    "select" | "include"
  > & {
    select?: UserCountAggregateInputType | true;
  };

  export interface userDelegate<
    GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined,
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["model"]["user"]; meta: { name: "user" } };
    /**
     * Find zero or one User that matches the filter.
     * @param {userFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<
      T extends userFindUniqueArgs<ExtArgs>,
      LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined,
    >(
      args: SelectSubset<T, userFindUniqueArgs<ExtArgs>>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, "findUnique", "user"> extends True
      ? Prisma__userClient<$Types.GetResult<userPayload<ExtArgs>, T, "findUnique", never>, never, ExtArgs>
      : Prisma__userClient<$Types.GetResult<userPayload<ExtArgs>, T, "findUnique", never> | null, null, ExtArgs>;

    /**
     * Find one User that matches the filter or throw an error  with `error.code='P2025'`
     *     if no matches were found.
     * @param {userFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUniqueOrThrow<T extends userFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, userFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__userClient<$Types.GetResult<userPayload<ExtArgs>, T, "findUniqueOrThrow", never>, never, ExtArgs>;

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<
      T extends userFindFirstArgs<ExtArgs>,
      LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined,
    >(
      args?: SelectSubset<T, userFindFirstArgs<ExtArgs>>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, "findFirst", "user"> extends True
      ? Prisma__userClient<$Types.GetResult<userPayload<ExtArgs>, T, "findFirst", never>, never, ExtArgs>
      : Prisma__userClient<$Types.GetResult<userPayload<ExtArgs>, T, "findFirst", never> | null, null, ExtArgs>;

    /**
     * Find the first User that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirstOrThrow<T extends userFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, userFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__userClient<$Types.GetResult<userPayload<ExtArgs>, T, "findFirstOrThrow", never>, never, ExtArgs>;

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindManyArgs=} args - Arguments to filter and select certain fields only.
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
    findMany<T extends userFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, userFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Types.GetResult<userPayload<ExtArgs>, T, "findMany", never>>;

    /**
     * Create a User.
     * @param {userCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     **/
    create<T extends userCreateArgs<ExtArgs>>(
      args: SelectSubset<T, userCreateArgs<ExtArgs>>,
    ): Prisma__userClient<$Types.GetResult<userPayload<ExtArgs>, T, "create", never>, never, ExtArgs>;

    /**
     * Create many Users.
     *     @param {userCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *
     **/
    createMany<T extends userCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, userCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Delete a User.
     * @param {userDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     **/
    delete<T extends userDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, userDeleteArgs<ExtArgs>>,
    ): Prisma__userClient<$Types.GetResult<userPayload<ExtArgs>, T, "delete", never>, never, ExtArgs>;

    /**
     * Update one User.
     * @param {userUpdateArgs} args - Arguments to update one User.
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
    update<T extends userUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, userUpdateArgs<ExtArgs>>,
    ): Prisma__userClient<$Types.GetResult<userPayload<ExtArgs>, T, "update", never>, never, ExtArgs>;

    /**
     * Delete zero or more Users.
     * @param {userDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends userDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, userDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userUpdateManyArgs} args - Arguments to update one or more rows.
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
    updateMany<T extends userUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, userUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one User.
     * @param {userUpsertArgs} args - Arguments to update or create a User.
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
    upsert<T extends userUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, userUpsertArgs<ExtArgs>>,
    ): Prisma__userClient<$Types.GetResult<userPayload<ExtArgs>, T, "upsert", never>, never, ExtArgs>;

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
     **/
    count<T extends userCountArgs>(
      args?: Subset<T, userCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], UserCountAggregateOutputType>
        : number
    >;

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
    aggregate<T extends UserAggregateArgs>(
      args: Subset<T, UserAggregateArgs>,
    ): Prisma.PrismaPromise<GetUserAggregateType<T>>;

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
      HasSelectOrTake extends Or<Extends<"skip", Keys<T>>, Extends<"take", Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs["orderBy"] }
        : { orderBy?: UserGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
      ByFields extends TupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, "Field ", P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__userClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs>
    implements Prisma.PrismaPromise<T>
  {
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
    readonly [Symbol.toStringTag]: "PrismaPromise";
    constructor(
      _dmmf: runtime.DMMFClass,
      _queryType: "query" | "mutation",
      _rootField: string,
      _clientMethod: string,
      _args: any,
      _dataPath: string[],
      _errorFormat: ErrorFormat,
      _measurePerformance?: boolean | undefined,
      _isList?: boolean,
    );

    delegation_delegation_createdByTouser<T extends user$delegation_delegation_createdByTouserArgs<ExtArgs> = {}>(
      args?: Subset<T, user$delegation_delegation_createdByTouserArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Types.GetResult<delegationPayload<ExtArgs>, T, "findMany", never> | Null>;

    delegation_delegation_delegatedToTouser<T extends user$delegation_delegation_delegatedToTouserArgs<ExtArgs> = {}>(
      args?: Subset<T, user$delegation_delegation_delegatedToTouserArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Types.GetResult<delegationPayload<ExtArgs>, T, "findMany", never> | Null>;

    internal_user<T extends user$internal_userArgs<ExtArgs> = {}>(
      args?: Subset<T, user$internal_userArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Types.GetResult<internal_userPayload<ExtArgs>, T, "findMany", never> | Null>;

    report<T extends user$reportArgs<ExtArgs> = {}>(
      args?: Subset<T, user$reportArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Types.GetResult<reportPayload<ExtArgs>, T, "findMany", never> | Null>;

    udap<T extends udapArgs<ExtArgs> = {}>(
      args?: Subset<T, udapArgs<ExtArgs>>,
    ): Prisma__udapClient<$Types.GetResult<udapPayload<ExtArgs>, T, "findUnique", never> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): Promise<T | TResult>;
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
   * user base type for findUnique actions
   */
  export type userFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: userInclude<ExtArgs> | null;
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput;
  };

  /**
   * user findUnique
   */
  export interface userFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs>
    extends userFindUniqueArgsBase<ExtArgs> {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound;
  }

  /**
   * user findUniqueOrThrow
   */
  export type userFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: userInclude<ExtArgs> | null;
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput;
  };

  /**
   * user base type for findFirst actions
   */
  export type userFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: userInclude<ExtArgs> | null;
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of users to fetch.
     */
    orderBy?: Enumerable<userOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of users.
     */
    distinct?: Enumerable<UserScalarFieldEnum>;
  };

  /**
   * user findFirst
   */
  export interface userFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs>
    extends userFindFirstArgsBase<ExtArgs> {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound;
  }

  /**
   * user findFirstOrThrow
   */
  export type userFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: userInclude<ExtArgs> | null;
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of users to fetch.
     */
    orderBy?: Enumerable<userOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of users.
     */
    distinct?: Enumerable<UserScalarFieldEnum>;
  };

  /**
   * user findMany
   */
  export type userFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: userInclude<ExtArgs> | null;
    /**
     * Filter, which users to fetch.
     */
    where?: userWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of users to fetch.
     */
    orderBy?: Enumerable<userOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing users.
     */
    cursor?: userWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` users.
     */
    skip?: number;
    distinct?: Enumerable<UserScalarFieldEnum>;
  };

  /**
   * user create
   */
  export type userCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: userInclude<ExtArgs> | null;
    /**
     * The data needed to create a user.
     */
    data: XOR<userCreateInput, userUncheckedCreateInput>;
  };

  /**
   * user createMany
   */
  export type userCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: Enumerable<userCreateManyInput>;
    skipDuplicates?: boolean;
  };

  /**
   * user update
   */
  export type userUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: userInclude<ExtArgs> | null;
    /**
     * The data needed to update a user.
     */
    data: XOR<userUpdateInput, userUncheckedUpdateInput>;
    /**
     * Choose, which user to update.
     */
    where: userWhereUniqueInput;
  };

  /**
   * user updateMany
   */
  export type userUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyInput>;
    /**
     * Filter which users to update
     */
    where?: userWhereInput;
  };

  /**
   * user upsert
   */
  export type userUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: userInclude<ExtArgs> | null;
    /**
     * The filter to search for the user to update in case it exists.
     */
    where: userWhereUniqueInput;
    /**
     * In case the user found by the `where` argument doesn't exist, create a new user with this data.
     */
    create: XOR<userCreateInput, userUncheckedCreateInput>;
    /**
     * In case the user was found with the provided `where` argument, update it with this data.
     */
    update: XOR<userUpdateInput, userUncheckedUpdateInput>;
  };

  /**
   * user delete
   */
  export type userDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: userInclude<ExtArgs> | null;
    /**
     * Filter which user to delete.
     */
    where: userWhereUniqueInput;
  };

  /**
   * user deleteMany
   */
  export type userDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: userWhereInput;
  };

  /**
   * user.delegation_delegation_createdByTouser
   */
  export type user$delegation_delegation_createdByTouserArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the delegation
     */
    select?: delegationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: delegationInclude<ExtArgs> | null;
    where?: delegationWhereInput;
    orderBy?: Enumerable<delegationOrderByWithRelationInput>;
    cursor?: delegationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Enumerable<DelegationScalarFieldEnum>;
  };

  /**
   * user.delegation_delegation_delegatedToTouser
   */
  export type user$delegation_delegation_delegatedToTouserArgs<
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > = {
    /**
     * Select specific fields to fetch from the delegation
     */
    select?: delegationSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: delegationInclude<ExtArgs> | null;
    where?: delegationWhereInput;
    orderBy?: Enumerable<delegationOrderByWithRelationInput>;
    cursor?: delegationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Enumerable<DelegationScalarFieldEnum>;
  };

  /**
   * user.internal_user
   */
  export type user$internal_userArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the internal_user
     */
    select?: internal_userSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: internal_userInclude<ExtArgs> | null;
    where?: internal_userWhereInput;
    orderBy?: Enumerable<internal_userOrderByWithRelationInput>;
    cursor?: internal_userWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Enumerable<Internal_userScalarFieldEnum>;
  };

  /**
   * user.report
   */
  export type user$reportArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the report
     */
    select?: reportSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: reportInclude<ExtArgs> | null;
    where?: reportWhereInput;
    orderBy?: Enumerable<reportOrderByWithRelationInput>;
    cursor?: reportWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Enumerable<ReportScalarFieldEnum>;
  };

  /**
   * user without action
   */
  export type userArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: userInclude<ExtArgs> | null;
  };

  /**
   * Model whitelist
   */

  export type AggregateWhitelist = {
    _count: WhitelistCountAggregateOutputType | null;
    _min: WhitelistMinAggregateOutputType | null;
    _max: WhitelistMaxAggregateOutputType | null;
  };

  export type WhitelistMinAggregateOutputType = {
    email: string | null;
  };

  export type WhitelistMaxAggregateOutputType = {
    email: string | null;
  };

  export type WhitelistCountAggregateOutputType = {
    email: number;
    _all: number;
  };

  export type WhitelistMinAggregateInputType = {
    email?: true;
  };

  export type WhitelistMaxAggregateInputType = {
    email?: true;
  };

  export type WhitelistCountAggregateInputType = {
    email?: true;
    _all?: true;
  };

  export type WhitelistAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which whitelist to aggregate.
     */
    where?: whitelistWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of whitelists to fetch.
     */
    orderBy?: Enumerable<whitelistOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: whitelistWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` whitelists from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` whitelists.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned whitelists
     **/
    _count?: true | WhitelistCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: WhitelistMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: WhitelistMaxAggregateInputType;
  };

  export type GetWhitelistAggregateType<T extends WhitelistAggregateArgs> = {
    [P in keyof T & keyof AggregateWhitelist]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWhitelist[P]>
      : GetScalarType<T[P], AggregateWhitelist[P]>;
  };

  export type WhitelistGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: whitelistWhereInput;
    orderBy?: Enumerable<whitelistOrderByWithAggregationInput>;
    by: WhitelistScalarFieldEnum[];
    having?: whitelistScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WhitelistCountAggregateInputType | true;
    _min?: WhitelistMinAggregateInputType;
    _max?: WhitelistMaxAggregateInputType;
  };

  export type WhitelistGroupByOutputType = {
    email: string;
    _count: WhitelistCountAggregateOutputType | null;
    _min: WhitelistMinAggregateOutputType | null;
    _max: WhitelistMaxAggregateOutputType | null;
  };

  type GetWhitelistGroupByPayload<T extends WhitelistGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<WhitelistGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof WhitelistGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], WhitelistGroupByOutputType[P]>
          : GetScalarType<T[P], WhitelistGroupByOutputType[P]>;
      }
    >
  >;

  export type whitelistSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<
    {
      email?: boolean;
    },
    ExtArgs["result"]["whitelist"]
  >;

  export type whitelistSelectScalar = {
    email?: boolean;
  };

  type whitelistGetPayload<S extends boolean | null | undefined | whitelistArgs> = $Types.GetResult<
    whitelistPayload,
    S
  >;

  type whitelistCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = Omit<
    whitelistFindManyArgs,
    "select" | "include"
  > & {
    select?: WhitelistCountAggregateInputType | true;
  };

  export interface whitelistDelegate<
    GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined,
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["model"]["whitelist"]; meta: { name: "whitelist" } };
    /**
     * Find zero or one Whitelist that matches the filter.
     * @param {whitelistFindUniqueArgs} args - Arguments to find a Whitelist
     * @example
     * // Get one Whitelist
     * const whitelist = await prisma.whitelist.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<
      T extends whitelistFindUniqueArgs<ExtArgs>,
      LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined,
    >(
      args: SelectSubset<T, whitelistFindUniqueArgs<ExtArgs>>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, "findUnique", "whitelist"> extends True
      ? Prisma__whitelistClient<$Types.GetResult<whitelistPayload<ExtArgs>, T, "findUnique", never>, never, ExtArgs>
      : Prisma__whitelistClient<
          $Types.GetResult<whitelistPayload<ExtArgs>, T, "findUnique", never> | null,
          null,
          ExtArgs
        >;

    /**
     * Find one Whitelist that matches the filter or throw an error  with `error.code='P2025'`
     *     if no matches were found.
     * @param {whitelistFindUniqueOrThrowArgs} args - Arguments to find a Whitelist
     * @example
     * // Get one Whitelist
     * const whitelist = await prisma.whitelist.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUniqueOrThrow<T extends whitelistFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, whitelistFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__whitelistClient<
      $Types.GetResult<whitelistPayload<ExtArgs>, T, "findUniqueOrThrow", never>,
      never,
      ExtArgs
    >;

    /**
     * Find the first Whitelist that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {whitelistFindFirstArgs} args - Arguments to find a Whitelist
     * @example
     * // Get one Whitelist
     * const whitelist = await prisma.whitelist.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<
      T extends whitelistFindFirstArgs<ExtArgs>,
      LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined,
    >(
      args?: SelectSubset<T, whitelistFindFirstArgs<ExtArgs>>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, "findFirst", "whitelist"> extends True
      ? Prisma__whitelistClient<$Types.GetResult<whitelistPayload<ExtArgs>, T, "findFirst", never>, never, ExtArgs>
      : Prisma__whitelistClient<
          $Types.GetResult<whitelistPayload<ExtArgs>, T, "findFirst", never> | null,
          null,
          ExtArgs
        >;

    /**
     * Find the first Whitelist that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {whitelistFindFirstOrThrowArgs} args - Arguments to find a Whitelist
     * @example
     * // Get one Whitelist
     * const whitelist = await prisma.whitelist.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirstOrThrow<T extends whitelistFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, whitelistFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__whitelistClient<
      $Types.GetResult<whitelistPayload<ExtArgs>, T, "findFirstOrThrow", never>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Whitelists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {whitelistFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Whitelists
     * const whitelists = await prisma.whitelist.findMany()
     *
     * // Get first 10 Whitelists
     * const whitelists = await prisma.whitelist.findMany({ take: 10 })
     *
     * // Only select the `email`
     * const whitelistWithEmailOnly = await prisma.whitelist.findMany({ select: { email: true } })
     *
     **/
    findMany<T extends whitelistFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, whitelistFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Types.GetResult<whitelistPayload<ExtArgs>, T, "findMany", never>>;

    /**
     * Create a Whitelist.
     * @param {whitelistCreateArgs} args - Arguments to create a Whitelist.
     * @example
     * // Create one Whitelist
     * const Whitelist = await prisma.whitelist.create({
     *   data: {
     *     // ... data to create a Whitelist
     *   }
     * })
     *
     **/
    create<T extends whitelistCreateArgs<ExtArgs>>(
      args: SelectSubset<T, whitelistCreateArgs<ExtArgs>>,
    ): Prisma__whitelistClient<$Types.GetResult<whitelistPayload<ExtArgs>, T, "create", never>, never, ExtArgs>;

    /**
     * Create many Whitelists.
     *     @param {whitelistCreateManyArgs} args - Arguments to create many Whitelists.
     *     @example
     *     // Create many Whitelists
     *     const whitelist = await prisma.whitelist.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *
     **/
    createMany<T extends whitelistCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, whitelistCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Delete a Whitelist.
     * @param {whitelistDeleteArgs} args - Arguments to delete one Whitelist.
     * @example
     * // Delete one Whitelist
     * const Whitelist = await prisma.whitelist.delete({
     *   where: {
     *     // ... filter to delete one Whitelist
     *   }
     * })
     *
     **/
    delete<T extends whitelistDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, whitelistDeleteArgs<ExtArgs>>,
    ): Prisma__whitelistClient<$Types.GetResult<whitelistPayload<ExtArgs>, T, "delete", never>, never, ExtArgs>;

    /**
     * Update one Whitelist.
     * @param {whitelistUpdateArgs} args - Arguments to update one Whitelist.
     * @example
     * // Update one Whitelist
     * const whitelist = await prisma.whitelist.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    update<T extends whitelistUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, whitelistUpdateArgs<ExtArgs>>,
    ): Prisma__whitelistClient<$Types.GetResult<whitelistPayload<ExtArgs>, T, "update", never>, never, ExtArgs>;

    /**
     * Delete zero or more Whitelists.
     * @param {whitelistDeleteManyArgs} args - Arguments to filter Whitelists to delete.
     * @example
     * // Delete a few Whitelists
     * const { count } = await prisma.whitelist.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends whitelistDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, whitelistDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Whitelists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {whitelistUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Whitelists
     * const whitelist = await prisma.whitelist.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    updateMany<T extends whitelistUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, whitelistUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Whitelist.
     * @param {whitelistUpsertArgs} args - Arguments to update or create a Whitelist.
     * @example
     * // Update or create a Whitelist
     * const whitelist = await prisma.whitelist.upsert({
     *   create: {
     *     // ... data to create a Whitelist
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Whitelist we want to update
     *   }
     * })
     **/
    upsert<T extends whitelistUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, whitelistUpsertArgs<ExtArgs>>,
    ): Prisma__whitelistClient<$Types.GetResult<whitelistPayload<ExtArgs>, T, "upsert", never>, never, ExtArgs>;

    /**
     * Count the number of Whitelists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {whitelistCountArgs} args - Arguments to filter Whitelists to count.
     * @example
     * // Count the number of Whitelists
     * const count = await prisma.whitelist.count({
     *   where: {
     *     // ... the filter for the Whitelists we want to count
     *   }
     * })
     **/
    count<T extends whitelistCountArgs>(
      args?: Subset<T, whitelistCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], WhitelistCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Whitelist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhitelistAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WhitelistAggregateArgs>(
      args: Subset<T, WhitelistAggregateArgs>,
    ): Prisma.PrismaPromise<GetWhitelistAggregateType<T>>;

    /**
     * Group by Whitelist.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhitelistGroupByArgs} args - Group by arguments.
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
      T extends WhitelistGroupByArgs,
      HasSelectOrTake extends Or<Extends<"skip", Keys<T>>, Extends<"take", Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WhitelistGroupByArgs["orderBy"] }
        : { orderBy?: WhitelistGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
      ByFields extends TupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, "Field ", P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, WhitelistGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetWhitelistGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
  }

  /**
   * The delegate class that acts as a "Promise-like" for whitelist.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__whitelistClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs>
    implements Prisma.PrismaPromise<T>
  {
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
    readonly [Symbol.toStringTag]: "PrismaPromise";
    constructor(
      _dmmf: runtime.DMMFClass,
      _queryType: "query" | "mutation",
      _rootField: string,
      _clientMethod: string,
      _args: any,
      _dataPath: string[],
      _errorFormat: ErrorFormat,
      _measurePerformance?: boolean | undefined,
      _isList?: boolean,
    );

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): Promise<T | TResult>;
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
   * whitelist base type for findUnique actions
   */
  export type whitelistFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the whitelist
     */
    select?: whitelistSelect<ExtArgs> | null;
    /**
     * Filter, which whitelist to fetch.
     */
    where: whitelistWhereUniqueInput;
  };

  /**
   * whitelist findUnique
   */
  export interface whitelistFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs>
    extends whitelistFindUniqueArgsBase<ExtArgs> {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound;
  }

  /**
   * whitelist findUniqueOrThrow
   */
  export type whitelistFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the whitelist
     */
    select?: whitelistSelect<ExtArgs> | null;
    /**
     * Filter, which whitelist to fetch.
     */
    where: whitelistWhereUniqueInput;
  };

  /**
   * whitelist base type for findFirst actions
   */
  export type whitelistFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the whitelist
     */
    select?: whitelistSelect<ExtArgs> | null;
    /**
     * Filter, which whitelist to fetch.
     */
    where?: whitelistWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of whitelists to fetch.
     */
    orderBy?: Enumerable<whitelistOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for whitelists.
     */
    cursor?: whitelistWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` whitelists from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` whitelists.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of whitelists.
     */
    distinct?: Enumerable<WhitelistScalarFieldEnum>;
  };

  /**
   * whitelist findFirst
   */
  export interface whitelistFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs>
    extends whitelistFindFirstArgsBase<ExtArgs> {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound;
  }

  /**
   * whitelist findFirstOrThrow
   */
  export type whitelistFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the whitelist
     */
    select?: whitelistSelect<ExtArgs> | null;
    /**
     * Filter, which whitelist to fetch.
     */
    where?: whitelistWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of whitelists to fetch.
     */
    orderBy?: Enumerable<whitelistOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for whitelists.
     */
    cursor?: whitelistWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` whitelists from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` whitelists.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of whitelists.
     */
    distinct?: Enumerable<WhitelistScalarFieldEnum>;
  };

  /**
   * whitelist findMany
   */
  export type whitelistFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the whitelist
     */
    select?: whitelistSelect<ExtArgs> | null;
    /**
     * Filter, which whitelists to fetch.
     */
    where?: whitelistWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of whitelists to fetch.
     */
    orderBy?: Enumerable<whitelistOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing whitelists.
     */
    cursor?: whitelistWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` whitelists from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` whitelists.
     */
    skip?: number;
    distinct?: Enumerable<WhitelistScalarFieldEnum>;
  };

  /**
   * whitelist create
   */
  export type whitelistCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the whitelist
     */
    select?: whitelistSelect<ExtArgs> | null;
    /**
     * The data needed to create a whitelist.
     */
    data: XOR<whitelistCreateInput, whitelistUncheckedCreateInput>;
  };

  /**
   * whitelist createMany
   */
  export type whitelistCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many whitelists.
     */
    data: Enumerable<whitelistCreateManyInput>;
    skipDuplicates?: boolean;
  };

  /**
   * whitelist update
   */
  export type whitelistUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the whitelist
     */
    select?: whitelistSelect<ExtArgs> | null;
    /**
     * The data needed to update a whitelist.
     */
    data: XOR<whitelistUpdateInput, whitelistUncheckedUpdateInput>;
    /**
     * Choose, which whitelist to update.
     */
    where: whitelistWhereUniqueInput;
  };

  /**
   * whitelist updateMany
   */
  export type whitelistUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update whitelists.
     */
    data: XOR<whitelistUpdateManyMutationInput, whitelistUncheckedUpdateManyInput>;
    /**
     * Filter which whitelists to update
     */
    where?: whitelistWhereInput;
  };

  /**
   * whitelist upsert
   */
  export type whitelistUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the whitelist
     */
    select?: whitelistSelect<ExtArgs> | null;
    /**
     * The filter to search for the whitelist to update in case it exists.
     */
    where: whitelistWhereUniqueInput;
    /**
     * In case the whitelist found by the `where` argument doesn't exist, create a new whitelist with this data.
     */
    create: XOR<whitelistCreateInput, whitelistUncheckedCreateInput>;
    /**
     * In case the whitelist was found with the provided `where` argument, update it with this data.
     */
    update: XOR<whitelistUpdateInput, whitelistUncheckedUpdateInput>;
  };

  /**
   * whitelist delete
   */
  export type whitelistDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the whitelist
     */
    select?: whitelistSelect<ExtArgs> | null;
    /**
     * Filter which whitelist to delete.
     */
    where: whitelistWhereUniqueInput;
  };

  /**
   * whitelist deleteMany
   */
  export type whitelistDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which whitelists to delete
     */
    where?: whitelistWhereInput;
  };

  /**
   * whitelist without action
   */
  export type whitelistArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the whitelist
     */
    select?: whitelistSelect<ExtArgs> | null;
  };

  /**
   * Model internal_user
   */

  export type AggregateInternal_user = {
    _count: Internal_userCountAggregateOutputType | null;
    _min: Internal_userMinAggregateOutputType | null;
    _max: Internal_userMaxAggregateOutputType | null;
  };

  export type Internal_userMinAggregateOutputType = {
    id: string | null;
    email: string | null;
    role: string | null;
    password: string | null;
    temporaryLink: string | null;
    temporaryLinkExpiresAt: string | null;
    userId: string | null;
  };

  export type Internal_userMaxAggregateOutputType = {
    id: string | null;
    email: string | null;
    role: string | null;
    password: string | null;
    temporaryLink: string | null;
    temporaryLinkExpiresAt: string | null;
    userId: string | null;
  };

  export type Internal_userCountAggregateOutputType = {
    id: number;
    email: number;
    role: number;
    password: number;
    temporaryLink: number;
    temporaryLinkExpiresAt: number;
    userId: number;
    _all: number;
  };

  export type Internal_userMinAggregateInputType = {
    id?: true;
    email?: true;
    role?: true;
    password?: true;
    temporaryLink?: true;
    temporaryLinkExpiresAt?: true;
    userId?: true;
  };

  export type Internal_userMaxAggregateInputType = {
    id?: true;
    email?: true;
    role?: true;
    password?: true;
    temporaryLink?: true;
    temporaryLinkExpiresAt?: true;
    userId?: true;
  };

  export type Internal_userCountAggregateInputType = {
    id?: true;
    email?: true;
    role?: true;
    password?: true;
    temporaryLink?: true;
    temporaryLinkExpiresAt?: true;
    userId?: true;
    _all?: true;
  };

  export type Internal_userAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which internal_user to aggregate.
     */
    where?: internal_userWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of internal_users to fetch.
     */
    orderBy?: Enumerable<internal_userOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: internal_userWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` internal_users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` internal_users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned internal_users
     **/
    _count?: true | Internal_userCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: Internal_userMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: Internal_userMaxAggregateInputType;
  };

  export type GetInternal_userAggregateType<T extends Internal_userAggregateArgs> = {
    [P in keyof T & keyof AggregateInternal_user]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInternal_user[P]>
      : GetScalarType<T[P], AggregateInternal_user[P]>;
  };

  export type Internal_userGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: internal_userWhereInput;
    orderBy?: Enumerable<internal_userOrderByWithAggregationInput>;
    by: Internal_userScalarFieldEnum[];
    having?: internal_userScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: Internal_userCountAggregateInputType | true;
    _min?: Internal_userMinAggregateInputType;
    _max?: Internal_userMaxAggregateInputType;
  };

  export type Internal_userGroupByOutputType = {
    id: string;
    email: string;
    role: string;
    password: string;
    temporaryLink: string | null;
    temporaryLinkExpiresAt: string | null;
    userId: string;
    _count: Internal_userCountAggregateOutputType | null;
    _min: Internal_userMinAggregateOutputType | null;
    _max: Internal_userMaxAggregateOutputType | null;
  };

  type GetInternal_userGroupByPayload<T extends Internal_userGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<Internal_userGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof Internal_userGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], Internal_userGroupByOutputType[P]>
          : GetScalarType<T[P], Internal_userGroupByOutputType[P]>;
      }
    >
  >;

  export type internal_userSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<
    {
      id?: boolean;
      email?: boolean;
      role?: boolean;
      password?: boolean;
      temporaryLink?: boolean;
      temporaryLinkExpiresAt?: boolean;
      userId?: boolean;
      user?: boolean | userArgs<ExtArgs>;
    },
    ExtArgs["result"]["internal_user"]
  >;

  export type internal_userSelectScalar = {
    id?: boolean;
    email?: boolean;
    role?: boolean;
    password?: boolean;
    temporaryLink?: boolean;
    temporaryLinkExpiresAt?: boolean;
    userId?: boolean;
  };

  export type internal_userInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    user?: boolean | userArgs<ExtArgs>;
  };

  type internal_userGetPayload<S extends boolean | null | undefined | internal_userArgs> = $Types.GetResult<
    internal_userPayload,
    S
  >;

  type internal_userCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = Omit<
    internal_userFindManyArgs,
    "select" | "include"
  > & {
    select?: Internal_userCountAggregateInputType | true;
  };

  export interface internal_userDelegate<
    GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined,
    ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs,
  > {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["model"]["internal_user"]; meta: { name: "internal_user" } };
    /**
     * Find zero or one Internal_user that matches the filter.
     * @param {internal_userFindUniqueArgs} args - Arguments to find a Internal_user
     * @example
     * // Get one Internal_user
     * const internal_user = await prisma.internal_user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUnique<
      T extends internal_userFindUniqueArgs<ExtArgs>,
      LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined,
    >(
      args: SelectSubset<T, internal_userFindUniqueArgs<ExtArgs>>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, "findUnique", "internal_user"> extends True
      ? Prisma__internal_userClient<
          $Types.GetResult<internal_userPayload<ExtArgs>, T, "findUnique", never>,
          never,
          ExtArgs
        >
      : Prisma__internal_userClient<
          $Types.GetResult<internal_userPayload<ExtArgs>, T, "findUnique", never> | null,
          null,
          ExtArgs
        >;

    /**
     * Find one Internal_user that matches the filter or throw an error  with `error.code='P2025'`
     *     if no matches were found.
     * @param {internal_userFindUniqueOrThrowArgs} args - Arguments to find a Internal_user
     * @example
     * // Get one Internal_user
     * const internal_user = await prisma.internal_user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findUniqueOrThrow<T extends internal_userFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, internal_userFindUniqueOrThrowArgs<ExtArgs>>,
    ): Prisma__internal_userClient<
      $Types.GetResult<internal_userPayload<ExtArgs>, T, "findUniqueOrThrow", never>,
      never,
      ExtArgs
    >;

    /**
     * Find the first Internal_user that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {internal_userFindFirstArgs} args - Arguments to find a Internal_user
     * @example
     * // Get one Internal_user
     * const internal_user = await prisma.internal_user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirst<
      T extends internal_userFindFirstArgs<ExtArgs>,
      LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T["rejectOnNotFound"] : undefined,
    >(
      args?: SelectSubset<T, internal_userFindFirstArgs<ExtArgs>>,
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, "findFirst", "internal_user"> extends True
      ? Prisma__internal_userClient<
          $Types.GetResult<internal_userPayload<ExtArgs>, T, "findFirst", never>,
          never,
          ExtArgs
        >
      : Prisma__internal_userClient<
          $Types.GetResult<internal_userPayload<ExtArgs>, T, "findFirst", never> | null,
          null,
          ExtArgs
        >;

    /**
     * Find the first Internal_user that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {internal_userFindFirstOrThrowArgs} args - Arguments to find a Internal_user
     * @example
     * // Get one Internal_user
     * const internal_user = await prisma.internal_user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     **/
    findFirstOrThrow<T extends internal_userFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, internal_userFindFirstOrThrowArgs<ExtArgs>>,
    ): Prisma__internal_userClient<
      $Types.GetResult<internal_userPayload<ExtArgs>, T, "findFirstOrThrow", never>,
      never,
      ExtArgs
    >;

    /**
     * Find zero or more Internal_users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {internal_userFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Internal_users
     * const internal_users = await prisma.internal_user.findMany()
     *
     * // Get first 10 Internal_users
     * const internal_users = await prisma.internal_user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const internal_userWithIdOnly = await prisma.internal_user.findMany({ select: { id: true } })
     *
     **/
    findMany<T extends internal_userFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, internal_userFindManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<$Types.GetResult<internal_userPayload<ExtArgs>, T, "findMany", never>>;

    /**
     * Create a Internal_user.
     * @param {internal_userCreateArgs} args - Arguments to create a Internal_user.
     * @example
     * // Create one Internal_user
     * const Internal_user = await prisma.internal_user.create({
     *   data: {
     *     // ... data to create a Internal_user
     *   }
     * })
     *
     **/
    create<T extends internal_userCreateArgs<ExtArgs>>(
      args: SelectSubset<T, internal_userCreateArgs<ExtArgs>>,
    ): Prisma__internal_userClient<$Types.GetResult<internal_userPayload<ExtArgs>, T, "create", never>, never, ExtArgs>;

    /**
     * Create many Internal_users.
     *     @param {internal_userCreateManyArgs} args - Arguments to create many Internal_users.
     *     @example
     *     // Create many Internal_users
     *     const internal_user = await prisma.internal_user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *
     **/
    createMany<T extends internal_userCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, internal_userCreateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Delete a Internal_user.
     * @param {internal_userDeleteArgs} args - Arguments to delete one Internal_user.
     * @example
     * // Delete one Internal_user
     * const Internal_user = await prisma.internal_user.delete({
     *   where: {
     *     // ... filter to delete one Internal_user
     *   }
     * })
     *
     **/
    delete<T extends internal_userDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, internal_userDeleteArgs<ExtArgs>>,
    ): Prisma__internal_userClient<$Types.GetResult<internal_userPayload<ExtArgs>, T, "delete", never>, never, ExtArgs>;

    /**
     * Update one Internal_user.
     * @param {internal_userUpdateArgs} args - Arguments to update one Internal_user.
     * @example
     * // Update one Internal_user
     * const internal_user = await prisma.internal_user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    update<T extends internal_userUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, internal_userUpdateArgs<ExtArgs>>,
    ): Prisma__internal_userClient<$Types.GetResult<internal_userPayload<ExtArgs>, T, "update", never>, never, ExtArgs>;

    /**
     * Delete zero or more Internal_users.
     * @param {internal_userDeleteManyArgs} args - Arguments to filter Internal_users to delete.
     * @example
     * // Delete a few Internal_users
     * const { count } = await prisma.internal_user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     **/
    deleteMany<T extends internal_userDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, internal_userDeleteManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Internal_users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {internal_userUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Internal_users
     * const internal_user = await prisma.internal_user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     **/
    updateMany<T extends internal_userUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, internal_userUpdateManyArgs<ExtArgs>>,
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create or update one Internal_user.
     * @param {internal_userUpsertArgs} args - Arguments to update or create a Internal_user.
     * @example
     * // Update or create a Internal_user
     * const internal_user = await prisma.internal_user.upsert({
     *   create: {
     *     // ... data to create a Internal_user
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Internal_user we want to update
     *   }
     * })
     **/
    upsert<T extends internal_userUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, internal_userUpsertArgs<ExtArgs>>,
    ): Prisma__internal_userClient<$Types.GetResult<internal_userPayload<ExtArgs>, T, "upsert", never>, never, ExtArgs>;

    /**
     * Count the number of Internal_users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {internal_userCountArgs} args - Arguments to filter Internal_users to count.
     * @example
     * // Count the number of Internal_users
     * const count = await prisma.internal_user.count({
     *   where: {
     *     // ... the filter for the Internal_users we want to count
     *   }
     * })
     **/
    count<T extends internal_userCountArgs>(
      args?: Subset<T, internal_userCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], Internal_userCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Internal_user.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Internal_userAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends Internal_userAggregateArgs>(
      args: Subset<T, Internal_userAggregateArgs>,
    ): Prisma.PrismaPromise<GetInternal_userAggregateType<T>>;

    /**
     * Group by Internal_user.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Internal_userGroupByArgs} args - Group by arguments.
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
      T extends Internal_userGroupByArgs,
      HasSelectOrTake extends Or<Extends<"skip", Keys<T>>, Extends<"take", Keys<T>>>,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Internal_userGroupByArgs["orderBy"] }
        : { orderBy?: Internal_userGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T["orderBy"]>>>,
      ByFields extends TupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
          ? {
              [P in HavingFields]: P extends ByFields
                ? never
                : P extends string
                  ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
                  : [Error, "Field ", P, ` in "having" needs to be provided in "by"`];
            }[HavingFields]
          : "take" extends Keys<T>
            ? "orderBy" extends Keys<T>
              ? ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields]
              : 'Error: If you provide "take", you also need to provide "orderBy"'
            : "skip" extends Keys<T>
              ? "orderBy" extends Keys<T>
                ? ByValid extends True
                  ? {}
                  : {
                      [P in OrderFields]: P extends ByFields
                        ? never
                        : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                    }[OrderFields]
                : 'Error: If you provide "skip", you also need to provide "orderBy"'
              : ByValid extends True
                ? {}
                : {
                    [P in OrderFields]: P extends ByFields
                      ? never
                      : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
                  }[OrderFields],
    >(
      args: SubsetIntersection<T, Internal_userGroupByArgs, OrderByArg> & InputErrors,
    ): {} extends InputErrors ? GetInternal_userGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
  }

  /**
   * The delegate class that acts as a "Promise-like" for internal_user.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__internal_userClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs>
    implements Prisma.PrismaPromise<T>
  {
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
    readonly [Symbol.toStringTag]: "PrismaPromise";
    constructor(
      _dmmf: runtime.DMMFClass,
      _queryType: "query" | "mutation",
      _rootField: string,
      _clientMethod: string,
      _args: any,
      _dataPath: string[],
      _errorFormat: ErrorFormat,
      _measurePerformance?: boolean | undefined,
      _isList?: boolean,
    );

    user<T extends userArgs<ExtArgs> = {}>(
      args?: Subset<T, userArgs<ExtArgs>>,
    ): Prisma__userClient<$Types.GetResult<userPayload<ExtArgs>, T, "findUnique", never> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
      onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
    ): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null,
    ): Promise<T | TResult>;
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
   * internal_user base type for findUnique actions
   */
  export type internal_userFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the internal_user
     */
    select?: internal_userSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: internal_userInclude<ExtArgs> | null;
    /**
     * Filter, which internal_user to fetch.
     */
    where: internal_userWhereUniqueInput;
  };

  /**
   * internal_user findUnique
   */
  export interface internal_userFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs>
    extends internal_userFindUniqueArgsBase<ExtArgs> {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound;
  }

  /**
   * internal_user findUniqueOrThrow
   */
  export type internal_userFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the internal_user
     */
    select?: internal_userSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: internal_userInclude<ExtArgs> | null;
    /**
     * Filter, which internal_user to fetch.
     */
    where: internal_userWhereUniqueInput;
  };

  /**
   * internal_user base type for findFirst actions
   */
  export type internal_userFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the internal_user
     */
    select?: internal_userSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: internal_userInclude<ExtArgs> | null;
    /**
     * Filter, which internal_user to fetch.
     */
    where?: internal_userWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of internal_users to fetch.
     */
    orderBy?: Enumerable<internal_userOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for internal_users.
     */
    cursor?: internal_userWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` internal_users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` internal_users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of internal_users.
     */
    distinct?: Enumerable<Internal_userScalarFieldEnum>;
  };

  /**
   * internal_user findFirst
   */
  export interface internal_userFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs>
    extends internal_userFindFirstArgsBase<ExtArgs> {
    /**
     * Throw an Error if query returns no results
     * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
     */
    rejectOnNotFound?: RejectOnNotFound;
  }

  /**
   * internal_user findFirstOrThrow
   */
  export type internal_userFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the internal_user
     */
    select?: internal_userSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: internal_userInclude<ExtArgs> | null;
    /**
     * Filter, which internal_user to fetch.
     */
    where?: internal_userWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of internal_users to fetch.
     */
    orderBy?: Enumerable<internal_userOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for internal_users.
     */
    cursor?: internal_userWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` internal_users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` internal_users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of internal_users.
     */
    distinct?: Enumerable<Internal_userScalarFieldEnum>;
  };

  /**
   * internal_user findMany
   */
  export type internal_userFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the internal_user
     */
    select?: internal_userSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: internal_userInclude<ExtArgs> | null;
    /**
     * Filter, which internal_users to fetch.
     */
    where?: internal_userWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of internal_users to fetch.
     */
    orderBy?: Enumerable<internal_userOrderByWithRelationInput>;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing internal_users.
     */
    cursor?: internal_userWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` internal_users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` internal_users.
     */
    skip?: number;
    distinct?: Enumerable<Internal_userScalarFieldEnum>;
  };

  /**
   * internal_user create
   */
  export type internal_userCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the internal_user
     */
    select?: internal_userSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: internal_userInclude<ExtArgs> | null;
    /**
     * The data needed to create a internal_user.
     */
    data: XOR<internal_userCreateInput, internal_userUncheckedCreateInput>;
  };

  /**
   * internal_user createMany
   */
  export type internal_userCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many internal_users.
     */
    data: Enumerable<internal_userCreateManyInput>;
    skipDuplicates?: boolean;
  };

  /**
   * internal_user update
   */
  export type internal_userUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the internal_user
     */
    select?: internal_userSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: internal_userInclude<ExtArgs> | null;
    /**
     * The data needed to update a internal_user.
     */
    data: XOR<internal_userUpdateInput, internal_userUncheckedUpdateInput>;
    /**
     * Choose, which internal_user to update.
     */
    where: internal_userWhereUniqueInput;
  };

  /**
   * internal_user updateMany
   */
  export type internal_userUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update internal_users.
     */
    data: XOR<internal_userUpdateManyMutationInput, internal_userUncheckedUpdateManyInput>;
    /**
     * Filter which internal_users to update
     */
    where?: internal_userWhereInput;
  };

  /**
   * internal_user upsert
   */
  export type internal_userUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the internal_user
     */
    select?: internal_userSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: internal_userInclude<ExtArgs> | null;
    /**
     * The filter to search for the internal_user to update in case it exists.
     */
    where: internal_userWhereUniqueInput;
    /**
     * In case the internal_user found by the `where` argument doesn't exist, create a new internal_user with this data.
     */
    create: XOR<internal_userCreateInput, internal_userUncheckedCreateInput>;
    /**
     * In case the internal_user was found with the provided `where` argument, update it with this data.
     */
    update: XOR<internal_userUpdateInput, internal_userUncheckedUpdateInput>;
  };

  /**
   * internal_user delete
   */
  export type internal_userDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the internal_user
     */
    select?: internal_userSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: internal_userInclude<ExtArgs> | null;
    /**
     * Filter which internal_user to delete.
     */
    where: internal_userWhereUniqueInput;
  };

  /**
   * internal_user deleteMany
   */
  export type internal_userDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which internal_users to delete
     */
    where?: internal_userWhereInput;
  };

  /**
   * internal_user without action
   */
  export type internal_userArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the internal_user
     */
    select?: internal_userSelect<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: internal_userInclude<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: "ReadUncommitted";
    ReadCommitted: "ReadCommitted";
    RepeatableRead: "RepeatableRead";
    Serializable: "Serializable";
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const Atdatabases_migrations_appliedScalarFieldEnum: {
    id: "id";
    index: "index";
    name: "name";
    script: "script";
    applied_at: "applied_at";
    ignored_error: "ignored_error";
    obsolete: "obsolete";
  };

  export type Atdatabases_migrations_appliedScalarFieldEnum =
    (typeof Atdatabases_migrations_appliedScalarFieldEnum)[keyof typeof Atdatabases_migrations_appliedScalarFieldEnum];

  export const Atdatabases_migrations_versionScalarFieldEnum: {
    id: "id";
    version: "version";
  };

  export type Atdatabases_migrations_versionScalarFieldEnum =
    (typeof Atdatabases_migrations_versionScalarFieldEnum)[keyof typeof Atdatabases_migrations_versionScalarFieldEnum];

  export const ClauseScalarFieldEnum: {
    id: "id";
    label: "label";
    value: "value";
  };

  export type ClauseScalarFieldEnum = (typeof ClauseScalarFieldEnum)[keyof typeof ClauseScalarFieldEnum];

  export const ReportScalarFieldEnum: {
    id: "id";
    title: "title";
    projectDescription: "projectDescription";
    redactedBy: "redactedBy";
    meetDate: "meetDate";
    applicantName: "applicantName";
    applicantAddress: "applicantAddress";
    projectCadastralRef: "projectCadastralRef";
    projectSpaceType: "projectSpaceType";
    decision: "decision";
    precisions: "precisions";
    contacts: "contacts";
    furtherInformation: "furtherInformation";
    createdBy: "createdBy";
    createdAt: "createdAt";
    serviceInstructeur: "serviceInstructeur";
    pdf: "pdf";
    disabled: "disabled";
    udap_id: "udap_id";
  };

  export type ReportScalarFieldEnum = (typeof ReportScalarFieldEnum)[keyof typeof ReportScalarFieldEnum];

  export const Report_to_clauseScalarFieldEnum: {
    id: "id";
    reportId: "reportId";
    clauseId: "clauseId";
  };

  export type Report_to_clauseScalarFieldEnum =
    (typeof Report_to_clauseScalarFieldEnum)[keyof typeof Report_to_clauseScalarFieldEnum];

  export const ChipScalarFieldEnum: {
    key: "key";
    value: "value";
    udap_id: "udap_id";
    text: "text";
  };

  export type ChipScalarFieldEnum = (typeof ChipScalarFieldEnum)[keyof typeof ChipScalarFieldEnum];

  export const DelegationScalarFieldEnum: {
    createdBy: "createdBy";
    delegatedTo: "delegatedTo";
  };

  export type DelegationScalarFieldEnum = (typeof DelegationScalarFieldEnum)[keyof typeof DelegationScalarFieldEnum];

  export const UdapScalarFieldEnum: {
    id: "id";
    department: "department";
    completeCoords: "completeCoords";
    visible: "visible";
    name: "name";
    address: "address";
    zipCode: "zipCode";
    city: "city";
    phone: "phone";
    email: "email";
  };

  export type UdapScalarFieldEnum = (typeof UdapScalarFieldEnum)[keyof typeof UdapScalarFieldEnum];

  export const UserScalarFieldEnum: {
    id: "id";
    name: "name";
    udap_id: "udap_id";
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];

  export const WhitelistScalarFieldEnum: {
    email: "email";
  };

  export type WhitelistScalarFieldEnum = (typeof WhitelistScalarFieldEnum)[keyof typeof WhitelistScalarFieldEnum];

  export const Internal_userScalarFieldEnum: {
    id: "id";
    email: "email";
    role: "role";
    password: "password";
    temporaryLink: "temporaryLink";
    temporaryLinkExpiresAt: "temporaryLinkExpiresAt";
    userId: "userId";
  };

  export type Internal_userScalarFieldEnum =
    (typeof Internal_userScalarFieldEnum)[keyof typeof Internal_userScalarFieldEnum];

  export const SortOrder: {
    asc: "asc";
    desc: "desc";
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const QueryMode: {
    default: "default";
    insensitive: "insensitive";
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const NullsOrder: {
    first: "first";
    last: "last";
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  /**
   * Deep Input Types
   */

  export type atdatabases_migrations_appliedWhereInput = {
    AND?: Enumerable<atdatabases_migrations_appliedWhereInput>;
    OR?: Enumerable<atdatabases_migrations_appliedWhereInput>;
    NOT?: Enumerable<atdatabases_migrations_appliedWhereInput>;
    id?: BigIntFilter | bigint | number;
    index?: IntFilter | number;
    name?: StringFilter | string;
    script?: StringFilter | string;
    applied_at?: DateTimeFilter | Date | string;
    ignored_error?: StringNullableFilter | string | null;
    obsolete?: BoolFilter | boolean;
  };

  export type atdatabases_migrations_appliedOrderByWithRelationInput = {
    id?: SortOrder;
    index?: SortOrder;
    name?: SortOrder;
    script?: SortOrder;
    applied_at?: SortOrder;
    ignored_error?: SortOrderInput | SortOrder;
    obsolete?: SortOrder;
  };

  export type atdatabases_migrations_appliedWhereUniqueInput = {
    id?: bigint | number;
  };

  export type atdatabases_migrations_appliedOrderByWithAggregationInput = {
    id?: SortOrder;
    index?: SortOrder;
    name?: SortOrder;
    script?: SortOrder;
    applied_at?: SortOrder;
    ignored_error?: SortOrderInput | SortOrder;
    obsolete?: SortOrder;
    _count?: atdatabases_migrations_appliedCountOrderByAggregateInput;
    _avg?: atdatabases_migrations_appliedAvgOrderByAggregateInput;
    _max?: atdatabases_migrations_appliedMaxOrderByAggregateInput;
    _min?: atdatabases_migrations_appliedMinOrderByAggregateInput;
    _sum?: atdatabases_migrations_appliedSumOrderByAggregateInput;
  };

  export type atdatabases_migrations_appliedScalarWhereWithAggregatesInput = {
    AND?: Enumerable<atdatabases_migrations_appliedScalarWhereWithAggregatesInput>;
    OR?: Enumerable<atdatabases_migrations_appliedScalarWhereWithAggregatesInput>;
    NOT?: Enumerable<atdatabases_migrations_appliedScalarWhereWithAggregatesInput>;
    id?: BigIntWithAggregatesFilter | bigint | number;
    index?: IntWithAggregatesFilter | number;
    name?: StringWithAggregatesFilter | string;
    script?: StringWithAggregatesFilter | string;
    applied_at?: DateTimeWithAggregatesFilter | Date | string;
    ignored_error?: StringNullableWithAggregatesFilter | string | null;
    obsolete?: BoolWithAggregatesFilter | boolean;
  };

  export type atdatabases_migrations_versionWhereInput = {
    AND?: Enumerable<atdatabases_migrations_versionWhereInput>;
    OR?: Enumerable<atdatabases_migrations_versionWhereInput>;
    NOT?: Enumerable<atdatabases_migrations_versionWhereInput>;
    id?: IntFilter | number;
    version?: StringNullableFilter | string | null;
  };

  export type atdatabases_migrations_versionOrderByWithRelationInput = {
    id?: SortOrder;
    version?: SortOrderInput | SortOrder;
  };

  export type atdatabases_migrations_versionWhereUniqueInput = {
    id?: number;
  };

  export type atdatabases_migrations_versionOrderByWithAggregationInput = {
    id?: SortOrder;
    version?: SortOrderInput | SortOrder;
    _count?: atdatabases_migrations_versionCountOrderByAggregateInput;
    _avg?: atdatabases_migrations_versionAvgOrderByAggregateInput;
    _max?: atdatabases_migrations_versionMaxOrderByAggregateInput;
    _min?: atdatabases_migrations_versionMinOrderByAggregateInput;
    _sum?: atdatabases_migrations_versionSumOrderByAggregateInput;
  };

  export type atdatabases_migrations_versionScalarWhereWithAggregatesInput = {
    AND?: Enumerable<atdatabases_migrations_versionScalarWhereWithAggregatesInput>;
    OR?: Enumerable<atdatabases_migrations_versionScalarWhereWithAggregatesInput>;
    NOT?: Enumerable<atdatabases_migrations_versionScalarWhereWithAggregatesInput>;
    id?: IntWithAggregatesFilter | number;
    version?: StringNullableWithAggregatesFilter | string | null;
  };

  export type clauseWhereInput = {
    AND?: Enumerable<clauseWhereInput>;
    OR?: Enumerable<clauseWhereInput>;
    NOT?: Enumerable<clauseWhereInput>;
    id?: StringFilter | string;
    label?: StringFilter | string;
    value?: StringFilter | string;
    report_to_clause?: Report_to_clauseListRelationFilter;
  };

  export type clauseOrderByWithRelationInput = {
    id?: SortOrder;
    label?: SortOrder;
    value?: SortOrder;
    report_to_clause?: report_to_clauseOrderByRelationAggregateInput;
  };

  export type clauseWhereUniqueInput = {
    id?: string;
  };

  export type clauseOrderByWithAggregationInput = {
    id?: SortOrder;
    label?: SortOrder;
    value?: SortOrder;
    _count?: clauseCountOrderByAggregateInput;
    _max?: clauseMaxOrderByAggregateInput;
    _min?: clauseMinOrderByAggregateInput;
  };

  export type clauseScalarWhereWithAggregatesInput = {
    AND?: Enumerable<clauseScalarWhereWithAggregatesInput>;
    OR?: Enumerable<clauseScalarWhereWithAggregatesInput>;
    NOT?: Enumerable<clauseScalarWhereWithAggregatesInput>;
    id?: StringWithAggregatesFilter | string;
    label?: StringWithAggregatesFilter | string;
    value?: StringWithAggregatesFilter | string;
  };

  export type reportWhereInput = {
    AND?: Enumerable<reportWhereInput>;
    OR?: Enumerable<reportWhereInput>;
    NOT?: Enumerable<reportWhereInput>;
    id?: StringFilter | string;
    title?: StringNullableFilter | string | null;
    projectDescription?: StringNullableFilter | string | null;
    redactedBy?: StringNullableFilter | string | null;
    meetDate?: DateTimeNullableFilter | Date | string | null;
    applicantName?: StringNullableFilter | string | null;
    applicantAddress?: StringNullableFilter | string | null;
    projectCadastralRef?: StringNullableFilter | string | null;
    projectSpaceType?: StringNullableFilter | string | null;
    decision?: StringNullableFilter | string | null;
    precisions?: StringNullableFilter | string | null;
    contacts?: StringNullableFilter | string | null;
    furtherInformation?: StringNullableFilter | string | null;
    createdBy?: StringFilter | string;
    createdAt?: DateTimeFilter | Date | string;
    serviceInstructeur?: IntNullableFilter | number | null;
    pdf?: StringNullableFilter | string | null;
    disabled?: BoolNullableFilter | boolean | null;
    udap_id?: StringNullableFilter | string | null;
    user?: XOR<UserRelationFilter, userWhereInput>;
    report_to_clause?: Report_to_clauseListRelationFilter;
  };

  export type reportOrderByWithRelationInput = {
    id?: SortOrder;
    title?: SortOrderInput | SortOrder;
    projectDescription?: SortOrderInput | SortOrder;
    redactedBy?: SortOrderInput | SortOrder;
    meetDate?: SortOrderInput | SortOrder;
    applicantName?: SortOrderInput | SortOrder;
    applicantAddress?: SortOrderInput | SortOrder;
    projectCadastralRef?: SortOrderInput | SortOrder;
    projectSpaceType?: SortOrderInput | SortOrder;
    decision?: SortOrderInput | SortOrder;
    precisions?: SortOrderInput | SortOrder;
    contacts?: SortOrderInput | SortOrder;
    furtherInformation?: SortOrderInput | SortOrder;
    createdBy?: SortOrder;
    createdAt?: SortOrder;
    serviceInstructeur?: SortOrderInput | SortOrder;
    pdf?: SortOrderInput | SortOrder;
    disabled?: SortOrderInput | SortOrder;
    udap_id?: SortOrderInput | SortOrder;
    user?: userOrderByWithRelationInput;
    report_to_clause?: report_to_clauseOrderByRelationAggregateInput;
  };

  export type reportWhereUniqueInput = {
    id?: string;
  };

  export type reportOrderByWithAggregationInput = {
    id?: SortOrder;
    title?: SortOrderInput | SortOrder;
    projectDescription?: SortOrderInput | SortOrder;
    redactedBy?: SortOrderInput | SortOrder;
    meetDate?: SortOrderInput | SortOrder;
    applicantName?: SortOrderInput | SortOrder;
    applicantAddress?: SortOrderInput | SortOrder;
    projectCadastralRef?: SortOrderInput | SortOrder;
    projectSpaceType?: SortOrderInput | SortOrder;
    decision?: SortOrderInput | SortOrder;
    precisions?: SortOrderInput | SortOrder;
    contacts?: SortOrderInput | SortOrder;
    furtherInformation?: SortOrderInput | SortOrder;
    createdBy?: SortOrder;
    createdAt?: SortOrder;
    serviceInstructeur?: SortOrderInput | SortOrder;
    pdf?: SortOrderInput | SortOrder;
    disabled?: SortOrderInput | SortOrder;
    udap_id?: SortOrderInput | SortOrder;
    _count?: reportCountOrderByAggregateInput;
    _avg?: reportAvgOrderByAggregateInput;
    _max?: reportMaxOrderByAggregateInput;
    _min?: reportMinOrderByAggregateInput;
    _sum?: reportSumOrderByAggregateInput;
  };

  export type reportScalarWhereWithAggregatesInput = {
    AND?: Enumerable<reportScalarWhereWithAggregatesInput>;
    OR?: Enumerable<reportScalarWhereWithAggregatesInput>;
    NOT?: Enumerable<reportScalarWhereWithAggregatesInput>;
    id?: StringWithAggregatesFilter | string;
    title?: StringNullableWithAggregatesFilter | string | null;
    projectDescription?: StringNullableWithAggregatesFilter | string | null;
    redactedBy?: StringNullableWithAggregatesFilter | string | null;
    meetDate?: DateTimeNullableWithAggregatesFilter | Date | string | null;
    applicantName?: StringNullableWithAggregatesFilter | string | null;
    applicantAddress?: StringNullableWithAggregatesFilter | string | null;
    projectCadastralRef?: StringNullableWithAggregatesFilter | string | null;
    projectSpaceType?: StringNullableWithAggregatesFilter | string | null;
    decision?: StringNullableWithAggregatesFilter | string | null;
    precisions?: StringNullableWithAggregatesFilter | string | null;
    contacts?: StringNullableWithAggregatesFilter | string | null;
    furtherInformation?: StringNullableWithAggregatesFilter | string | null;
    createdBy?: StringWithAggregatesFilter | string;
    createdAt?: DateTimeWithAggregatesFilter | Date | string;
    serviceInstructeur?: IntNullableWithAggregatesFilter | number | null;
    pdf?: StringNullableWithAggregatesFilter | string | null;
    disabled?: BoolNullableWithAggregatesFilter | boolean | null;
    udap_id?: StringNullableWithAggregatesFilter | string | null;
  };

  export type report_to_clauseWhereInput = {
    AND?: Enumerable<report_to_clauseWhereInput>;
    OR?: Enumerable<report_to_clauseWhereInput>;
    NOT?: Enumerable<report_to_clauseWhereInput>;
    id?: StringFilter | string;
    reportId?: StringFilter | string;
    clauseId?: StringFilter | string;
    clause?: XOR<ClauseRelationFilter, clauseWhereInput>;
    report?: XOR<ReportRelationFilter, reportWhereInput>;
  };

  export type report_to_clauseOrderByWithRelationInput = {
    id?: SortOrder;
    reportId?: SortOrder;
    clauseId?: SortOrder;
    clause?: clauseOrderByWithRelationInput;
    report?: reportOrderByWithRelationInput;
  };

  export type report_to_clauseWhereUniqueInput = {
    id?: string;
  };

  export type report_to_clauseOrderByWithAggregationInput = {
    id?: SortOrder;
    reportId?: SortOrder;
    clauseId?: SortOrder;
    _count?: report_to_clauseCountOrderByAggregateInput;
    _max?: report_to_clauseMaxOrderByAggregateInput;
    _min?: report_to_clauseMinOrderByAggregateInput;
  };

  export type report_to_clauseScalarWhereWithAggregatesInput = {
    AND?: Enumerable<report_to_clauseScalarWhereWithAggregatesInput>;
    OR?: Enumerable<report_to_clauseScalarWhereWithAggregatesInput>;
    NOT?: Enumerable<report_to_clauseScalarWhereWithAggregatesInput>;
    id?: StringWithAggregatesFilter | string;
    reportId?: StringWithAggregatesFilter | string;
    clauseId?: StringWithAggregatesFilter | string;
  };

  export type chipWhereInput = {
    AND?: Enumerable<chipWhereInput>;
    OR?: Enumerable<chipWhereInput>;
    NOT?: Enumerable<chipWhereInput>;
    key?: StringFilter | string;
    value?: StringFilter | string;
    udap_id?: StringFilter | string;
    text?: StringFilter | string;
  };

  export type chipOrderByWithRelationInput = {
    key?: SortOrder;
    value?: SortOrder;
    udap_id?: SortOrder;
    text?: SortOrder;
  };

  export type chipWhereUniqueInput = {
    key_value_udap_id?: chipKeyValueUdap_idCompoundUniqueInput;
  };

  export type chipOrderByWithAggregationInput = {
    key?: SortOrder;
    value?: SortOrder;
    udap_id?: SortOrder;
    text?: SortOrder;
    _count?: chipCountOrderByAggregateInput;
    _max?: chipMaxOrderByAggregateInput;
    _min?: chipMinOrderByAggregateInput;
  };

  export type chipScalarWhereWithAggregatesInput = {
    AND?: Enumerable<chipScalarWhereWithAggregatesInput>;
    OR?: Enumerable<chipScalarWhereWithAggregatesInput>;
    NOT?: Enumerable<chipScalarWhereWithAggregatesInput>;
    key?: StringWithAggregatesFilter | string;
    value?: StringWithAggregatesFilter | string;
    udap_id?: StringWithAggregatesFilter | string;
    text?: StringWithAggregatesFilter | string;
  };

  export type delegationWhereInput = {
    AND?: Enumerable<delegationWhereInput>;
    OR?: Enumerable<delegationWhereInput>;
    NOT?: Enumerable<delegationWhereInput>;
    createdBy?: StringFilter | string;
    delegatedTo?: StringFilter | string;
    user_delegation_createdByTouser?: XOR<UserRelationFilter, userWhereInput>;
    user_delegation_delegatedToTouser?: XOR<UserRelationFilter, userWhereInput>;
  };

  export type delegationOrderByWithRelationInput = {
    createdBy?: SortOrder;
    delegatedTo?: SortOrder;
    user_delegation_createdByTouser?: userOrderByWithRelationInput;
    user_delegation_delegatedToTouser?: userOrderByWithRelationInput;
  };

  export type delegationWhereUniqueInput = {
    createdBy_delegatedTo?: delegationCreatedByDelegatedToCompoundUniqueInput;
  };

  export type delegationOrderByWithAggregationInput = {
    createdBy?: SortOrder;
    delegatedTo?: SortOrder;
    _count?: delegationCountOrderByAggregateInput;
    _max?: delegationMaxOrderByAggregateInput;
    _min?: delegationMinOrderByAggregateInput;
  };

  export type delegationScalarWhereWithAggregatesInput = {
    AND?: Enumerable<delegationScalarWhereWithAggregatesInput>;
    OR?: Enumerable<delegationScalarWhereWithAggregatesInput>;
    NOT?: Enumerable<delegationScalarWhereWithAggregatesInput>;
    createdBy?: StringWithAggregatesFilter | string;
    delegatedTo?: StringWithAggregatesFilter | string;
  };

  export type udapWhereInput = {
    AND?: Enumerable<udapWhereInput>;
    OR?: Enumerable<udapWhereInput>;
    NOT?: Enumerable<udapWhereInput>;
    id?: StringFilter | string;
    department?: StringFilter | string;
    completeCoords?: StringNullableFilter | string | null;
    visible?: BoolNullableFilter | boolean | null;
    name?: StringNullableFilter | string | null;
    address?: StringNullableFilter | string | null;
    zipCode?: StringNullableFilter | string | null;
    city?: StringNullableFilter | string | null;
    phone?: StringNullableFilter | string | null;
    email?: StringNullableFilter | string | null;
    user?: UserListRelationFilter;
  };

  export type udapOrderByWithRelationInput = {
    id?: SortOrder;
    department?: SortOrder;
    completeCoords?: SortOrderInput | SortOrder;
    visible?: SortOrderInput | SortOrder;
    name?: SortOrderInput | SortOrder;
    address?: SortOrderInput | SortOrder;
    zipCode?: SortOrderInput | SortOrder;
    city?: SortOrderInput | SortOrder;
    phone?: SortOrderInput | SortOrder;
    email?: SortOrderInput | SortOrder;
    user?: userOrderByRelationAggregateInput;
  };

  export type udapWhereUniqueInput = {
    id?: string;
  };

  export type udapOrderByWithAggregationInput = {
    id?: SortOrder;
    department?: SortOrder;
    completeCoords?: SortOrderInput | SortOrder;
    visible?: SortOrderInput | SortOrder;
    name?: SortOrderInput | SortOrder;
    address?: SortOrderInput | SortOrder;
    zipCode?: SortOrderInput | SortOrder;
    city?: SortOrderInput | SortOrder;
    phone?: SortOrderInput | SortOrder;
    email?: SortOrderInput | SortOrder;
    _count?: udapCountOrderByAggregateInput;
    _max?: udapMaxOrderByAggregateInput;
    _min?: udapMinOrderByAggregateInput;
  };

  export type udapScalarWhereWithAggregatesInput = {
    AND?: Enumerable<udapScalarWhereWithAggregatesInput>;
    OR?: Enumerable<udapScalarWhereWithAggregatesInput>;
    NOT?: Enumerable<udapScalarWhereWithAggregatesInput>;
    id?: StringWithAggregatesFilter | string;
    department?: StringWithAggregatesFilter | string;
    completeCoords?: StringNullableWithAggregatesFilter | string | null;
    visible?: BoolNullableWithAggregatesFilter | boolean | null;
    name?: StringNullableWithAggregatesFilter | string | null;
    address?: StringNullableWithAggregatesFilter | string | null;
    zipCode?: StringNullableWithAggregatesFilter | string | null;
    city?: StringNullableWithAggregatesFilter | string | null;
    phone?: StringNullableWithAggregatesFilter | string | null;
    email?: StringNullableWithAggregatesFilter | string | null;
  };

  export type userWhereInput = {
    AND?: Enumerable<userWhereInput>;
    OR?: Enumerable<userWhereInput>;
    NOT?: Enumerable<userWhereInput>;
    id?: StringFilter | string;
    name?: StringFilter | string;
    udap_id?: StringFilter | string;
    delegation_delegation_createdByTouser?: DelegationListRelationFilter;
    delegation_delegation_delegatedToTouser?: DelegationListRelationFilter;
    internal_user?: Internal_userListRelationFilter;
    report?: ReportListRelationFilter;
    udap?: XOR<UdapRelationFilter, udapWhereInput>;
  };

  export type userOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    udap_id?: SortOrder;
    delegation_delegation_createdByTouser?: delegationOrderByRelationAggregateInput;
    delegation_delegation_delegatedToTouser?: delegationOrderByRelationAggregateInput;
    internal_user?: internal_userOrderByRelationAggregateInput;
    report?: reportOrderByRelationAggregateInput;
    udap?: udapOrderByWithRelationInput;
  };

  export type userWhereUniqueInput = {
    id?: string;
  };

  export type userOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    udap_id?: SortOrder;
    _count?: userCountOrderByAggregateInput;
    _max?: userMaxOrderByAggregateInput;
    _min?: userMinOrderByAggregateInput;
  };

  export type userScalarWhereWithAggregatesInput = {
    AND?: Enumerable<userScalarWhereWithAggregatesInput>;
    OR?: Enumerable<userScalarWhereWithAggregatesInput>;
    NOT?: Enumerable<userScalarWhereWithAggregatesInput>;
    id?: StringWithAggregatesFilter | string;
    name?: StringWithAggregatesFilter | string;
    udap_id?: StringWithAggregatesFilter | string;
  };

  export type whitelistWhereInput = {
    AND?: Enumerable<whitelistWhereInput>;
    OR?: Enumerable<whitelistWhereInput>;
    NOT?: Enumerable<whitelistWhereInput>;
    email?: StringFilter | string;
  };

  export type whitelistOrderByWithRelationInput = {
    email?: SortOrder;
  };

  export type whitelistWhereUniqueInput = {
    email?: string;
  };

  export type whitelistOrderByWithAggregationInput = {
    email?: SortOrder;
    _count?: whitelistCountOrderByAggregateInput;
    _max?: whitelistMaxOrderByAggregateInput;
    _min?: whitelistMinOrderByAggregateInput;
  };

  export type whitelistScalarWhereWithAggregatesInput = {
    AND?: Enumerable<whitelistScalarWhereWithAggregatesInput>;
    OR?: Enumerable<whitelistScalarWhereWithAggregatesInput>;
    NOT?: Enumerable<whitelistScalarWhereWithAggregatesInput>;
    email?: StringWithAggregatesFilter | string;
  };

  export type internal_userWhereInput = {
    AND?: Enumerable<internal_userWhereInput>;
    OR?: Enumerable<internal_userWhereInput>;
    NOT?: Enumerable<internal_userWhereInput>;
    id?: StringFilter | string;
    email?: StringFilter | string;
    role?: StringFilter | string;
    password?: StringFilter | string;
    temporaryLink?: StringNullableFilter | string | null;
    temporaryLinkExpiresAt?: StringNullableFilter | string | null;
    userId?: StringFilter | string;
    user?: XOR<UserRelationFilter, userWhereInput>;
  };

  export type internal_userOrderByWithRelationInput = {
    id?: SortOrder;
    email?: SortOrder;
    role?: SortOrder;
    password?: SortOrder;
    temporaryLink?: SortOrderInput | SortOrder;
    temporaryLinkExpiresAt?: SortOrderInput | SortOrder;
    userId?: SortOrder;
    user?: userOrderByWithRelationInput;
  };

  export type internal_userWhereUniqueInput = {
    id?: string;
  };

  export type internal_userOrderByWithAggregationInput = {
    id?: SortOrder;
    email?: SortOrder;
    role?: SortOrder;
    password?: SortOrder;
    temporaryLink?: SortOrderInput | SortOrder;
    temporaryLinkExpiresAt?: SortOrderInput | SortOrder;
    userId?: SortOrder;
    _count?: internal_userCountOrderByAggregateInput;
    _max?: internal_userMaxOrderByAggregateInput;
    _min?: internal_userMinOrderByAggregateInput;
  };

  export type internal_userScalarWhereWithAggregatesInput = {
    AND?: Enumerable<internal_userScalarWhereWithAggregatesInput>;
    OR?: Enumerable<internal_userScalarWhereWithAggregatesInput>;
    NOT?: Enumerable<internal_userScalarWhereWithAggregatesInput>;
    id?: StringWithAggregatesFilter | string;
    email?: StringWithAggregatesFilter | string;
    role?: StringWithAggregatesFilter | string;
    password?: StringWithAggregatesFilter | string;
    temporaryLink?: StringNullableWithAggregatesFilter | string | null;
    temporaryLinkExpiresAt?: StringNullableWithAggregatesFilter | string | null;
    userId?: StringWithAggregatesFilter | string;
  };

  export type atdatabases_migrations_appliedCreateInput = {
    id?: bigint | number;
    index: number;
    name: string;
    script: string;
    applied_at: Date | string;
    ignored_error?: string | null;
    obsolete: boolean;
  };

  export type atdatabases_migrations_appliedUncheckedCreateInput = {
    id?: bigint | number;
    index: number;
    name: string;
    script: string;
    applied_at: Date | string;
    ignored_error?: string | null;
    obsolete: boolean;
  };

  export type atdatabases_migrations_appliedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number;
    index?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    script?: StringFieldUpdateOperationsInput | string;
    applied_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    ignored_error?: NullableStringFieldUpdateOperationsInput | string | null;
    obsolete?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type atdatabases_migrations_appliedUncheckedUpdateInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number;
    index?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    script?: StringFieldUpdateOperationsInput | string;
    applied_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    ignored_error?: NullableStringFieldUpdateOperationsInput | string | null;
    obsolete?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type atdatabases_migrations_appliedCreateManyInput = {
    id?: bigint | number;
    index: number;
    name: string;
    script: string;
    applied_at: Date | string;
    ignored_error?: string | null;
    obsolete: boolean;
  };

  export type atdatabases_migrations_appliedUpdateManyMutationInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number;
    index?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    script?: StringFieldUpdateOperationsInput | string;
    applied_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    ignored_error?: NullableStringFieldUpdateOperationsInput | string | null;
    obsolete?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type atdatabases_migrations_appliedUncheckedUpdateManyInput = {
    id?: BigIntFieldUpdateOperationsInput | bigint | number;
    index?: IntFieldUpdateOperationsInput | number;
    name?: StringFieldUpdateOperationsInput | string;
    script?: StringFieldUpdateOperationsInput | string;
    applied_at?: DateTimeFieldUpdateOperationsInput | Date | string;
    ignored_error?: NullableStringFieldUpdateOperationsInput | string | null;
    obsolete?: BoolFieldUpdateOperationsInput | boolean;
  };

  export type atdatabases_migrations_versionCreateInput = {
    id: number;
    version?: string | null;
  };

  export type atdatabases_migrations_versionUncheckedCreateInput = {
    id: number;
    version?: string | null;
  };

  export type atdatabases_migrations_versionUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    version?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type atdatabases_migrations_versionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number;
    version?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type atdatabases_migrations_versionCreateManyInput = {
    id: number;
    version?: string | null;
  };

  export type atdatabases_migrations_versionUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number;
    version?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type atdatabases_migrations_versionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number;
    version?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type clauseCreateInput = {
    id: string;
    label: string;
    value: string;
    report_to_clause?: report_to_clauseCreateNestedManyWithoutClauseInput;
  };

  export type clauseUncheckedCreateInput = {
    id: string;
    label: string;
    value: string;
    report_to_clause?: report_to_clauseUncheckedCreateNestedManyWithoutClauseInput;
  };

  export type clauseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    label?: StringFieldUpdateOperationsInput | string;
    value?: StringFieldUpdateOperationsInput | string;
    report_to_clause?: report_to_clauseUpdateManyWithoutClauseNestedInput;
  };

  export type clauseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    label?: StringFieldUpdateOperationsInput | string;
    value?: StringFieldUpdateOperationsInput | string;
    report_to_clause?: report_to_clauseUncheckedUpdateManyWithoutClauseNestedInput;
  };

  export type clauseCreateManyInput = {
    id: string;
    label: string;
    value: string;
  };

  export type clauseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    label?: StringFieldUpdateOperationsInput | string;
    value?: StringFieldUpdateOperationsInput | string;
  };

  export type clauseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    label?: StringFieldUpdateOperationsInput | string;
    value?: StringFieldUpdateOperationsInput | string;
  };

  export type reportCreateInput = {
    id: string;
    title?: string | null;
    projectDescription?: string | null;
    redactedBy?: string | null;
    meetDate?: Date | string | null;
    applicantName?: string | null;
    applicantAddress?: string | null;
    projectCadastralRef?: string | null;
    projectSpaceType?: string | null;
    decision?: string | null;
    precisions?: string | null;
    contacts?: string | null;
    furtherInformation?: string | null;
    createdAt: Date | string;
    serviceInstructeur?: number | null;
    pdf?: string | null;
    disabled?: boolean | null;
    udap_id?: string | null;
    user: userCreateNestedOneWithoutReportInput;
    report_to_clause?: report_to_clauseCreateNestedManyWithoutReportInput;
  };

  export type reportUncheckedCreateInput = {
    id: string;
    title?: string | null;
    projectDescription?: string | null;
    redactedBy?: string | null;
    meetDate?: Date | string | null;
    applicantName?: string | null;
    applicantAddress?: string | null;
    projectCadastralRef?: string | null;
    projectSpaceType?: string | null;
    decision?: string | null;
    precisions?: string | null;
    contacts?: string | null;
    furtherInformation?: string | null;
    createdBy: string;
    createdAt: Date | string;
    serviceInstructeur?: number | null;
    pdf?: string | null;
    disabled?: boolean | null;
    udap_id?: string | null;
    report_to_clause?: report_to_clauseUncheckedCreateNestedManyWithoutReportInput;
  };

  export type reportUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: NullableStringFieldUpdateOperationsInput | string | null;
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    redactedBy?: NullableStringFieldUpdateOperationsInput | string | null;
    meetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null;
    applicantAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    projectCadastralRef?: NullableStringFieldUpdateOperationsInput | string | null;
    projectSpaceType?: NullableStringFieldUpdateOperationsInput | string | null;
    decision?: NullableStringFieldUpdateOperationsInput | string | null;
    precisions?: NullableStringFieldUpdateOperationsInput | string | null;
    contacts?: NullableStringFieldUpdateOperationsInput | string | null;
    furtherInformation?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    serviceInstructeur?: NullableIntFieldUpdateOperationsInput | number | null;
    pdf?: NullableStringFieldUpdateOperationsInput | string | null;
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    udap_id?: NullableStringFieldUpdateOperationsInput | string | null;
    user?: userUpdateOneRequiredWithoutReportNestedInput;
    report_to_clause?: report_to_clauseUpdateManyWithoutReportNestedInput;
  };

  export type reportUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: NullableStringFieldUpdateOperationsInput | string | null;
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    redactedBy?: NullableStringFieldUpdateOperationsInput | string | null;
    meetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null;
    applicantAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    projectCadastralRef?: NullableStringFieldUpdateOperationsInput | string | null;
    projectSpaceType?: NullableStringFieldUpdateOperationsInput | string | null;
    decision?: NullableStringFieldUpdateOperationsInput | string | null;
    precisions?: NullableStringFieldUpdateOperationsInput | string | null;
    contacts?: NullableStringFieldUpdateOperationsInput | string | null;
    furtherInformation?: NullableStringFieldUpdateOperationsInput | string | null;
    createdBy?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    serviceInstructeur?: NullableIntFieldUpdateOperationsInput | number | null;
    pdf?: NullableStringFieldUpdateOperationsInput | string | null;
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    udap_id?: NullableStringFieldUpdateOperationsInput | string | null;
    report_to_clause?: report_to_clauseUncheckedUpdateManyWithoutReportNestedInput;
  };

  export type reportCreateManyInput = {
    id: string;
    title?: string | null;
    projectDescription?: string | null;
    redactedBy?: string | null;
    meetDate?: Date | string | null;
    applicantName?: string | null;
    applicantAddress?: string | null;
    projectCadastralRef?: string | null;
    projectSpaceType?: string | null;
    decision?: string | null;
    precisions?: string | null;
    contacts?: string | null;
    furtherInformation?: string | null;
    createdBy: string;
    createdAt: Date | string;
    serviceInstructeur?: number | null;
    pdf?: string | null;
    disabled?: boolean | null;
    udap_id?: string | null;
  };

  export type reportUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: NullableStringFieldUpdateOperationsInput | string | null;
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    redactedBy?: NullableStringFieldUpdateOperationsInput | string | null;
    meetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null;
    applicantAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    projectCadastralRef?: NullableStringFieldUpdateOperationsInput | string | null;
    projectSpaceType?: NullableStringFieldUpdateOperationsInput | string | null;
    decision?: NullableStringFieldUpdateOperationsInput | string | null;
    precisions?: NullableStringFieldUpdateOperationsInput | string | null;
    contacts?: NullableStringFieldUpdateOperationsInput | string | null;
    furtherInformation?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    serviceInstructeur?: NullableIntFieldUpdateOperationsInput | number | null;
    pdf?: NullableStringFieldUpdateOperationsInput | string | null;
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    udap_id?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type reportUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: NullableStringFieldUpdateOperationsInput | string | null;
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    redactedBy?: NullableStringFieldUpdateOperationsInput | string | null;
    meetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null;
    applicantAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    projectCadastralRef?: NullableStringFieldUpdateOperationsInput | string | null;
    projectSpaceType?: NullableStringFieldUpdateOperationsInput | string | null;
    decision?: NullableStringFieldUpdateOperationsInput | string | null;
    precisions?: NullableStringFieldUpdateOperationsInput | string | null;
    contacts?: NullableStringFieldUpdateOperationsInput | string | null;
    furtherInformation?: NullableStringFieldUpdateOperationsInput | string | null;
    createdBy?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    serviceInstructeur?: NullableIntFieldUpdateOperationsInput | number | null;
    pdf?: NullableStringFieldUpdateOperationsInput | string | null;
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    udap_id?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type report_to_clauseCreateInput = {
    id: string;
    clause: clauseCreateNestedOneWithoutReport_to_clauseInput;
    report: reportCreateNestedOneWithoutReport_to_clauseInput;
  };

  export type report_to_clauseUncheckedCreateInput = {
    id: string;
    reportId: string;
    clauseId: string;
  };

  export type report_to_clauseUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    clause?: clauseUpdateOneRequiredWithoutReport_to_clauseNestedInput;
    report?: reportUpdateOneRequiredWithoutReport_to_clauseNestedInput;
  };

  export type report_to_clauseUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    reportId?: StringFieldUpdateOperationsInput | string;
    clauseId?: StringFieldUpdateOperationsInput | string;
  };

  export type report_to_clauseCreateManyInput = {
    id: string;
    reportId: string;
    clauseId: string;
  };

  export type report_to_clauseUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
  };

  export type report_to_clauseUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    reportId?: StringFieldUpdateOperationsInput | string;
    clauseId?: StringFieldUpdateOperationsInput | string;
  };

  export type chipCreateInput = {
    key: string;
    value: string;
    udap_id: string;
    text: string;
  };

  export type chipUncheckedCreateInput = {
    key: string;
    value: string;
    udap_id: string;
    text: string;
  };

  export type chipUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string;
    value?: StringFieldUpdateOperationsInput | string;
    udap_id?: StringFieldUpdateOperationsInput | string;
    text?: StringFieldUpdateOperationsInput | string;
  };

  export type chipUncheckedUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string;
    value?: StringFieldUpdateOperationsInput | string;
    udap_id?: StringFieldUpdateOperationsInput | string;
    text?: StringFieldUpdateOperationsInput | string;
  };

  export type chipCreateManyInput = {
    key: string;
    value: string;
    udap_id: string;
    text: string;
  };

  export type chipUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string;
    value?: StringFieldUpdateOperationsInput | string;
    udap_id?: StringFieldUpdateOperationsInput | string;
    text?: StringFieldUpdateOperationsInput | string;
  };

  export type chipUncheckedUpdateManyInput = {
    key?: StringFieldUpdateOperationsInput | string;
    value?: StringFieldUpdateOperationsInput | string;
    udap_id?: StringFieldUpdateOperationsInput | string;
    text?: StringFieldUpdateOperationsInput | string;
  };

  export type delegationCreateInput = {
    user_delegation_createdByTouser: userCreateNestedOneWithoutDelegation_delegation_createdByTouserInput;
    user_delegation_delegatedToTouser: userCreateNestedOneWithoutDelegation_delegation_delegatedToTouserInput;
  };

  export type delegationUncheckedCreateInput = {
    createdBy: string;
    delegatedTo: string;
  };

  export type delegationUpdateInput = {
    user_delegation_createdByTouser?: userUpdateOneRequiredWithoutDelegation_delegation_createdByTouserNestedInput;
    user_delegation_delegatedToTouser?: userUpdateOneRequiredWithoutDelegation_delegation_delegatedToTouserNestedInput;
  };

  export type delegationUncheckedUpdateInput = {
    createdBy?: StringFieldUpdateOperationsInput | string;
    delegatedTo?: StringFieldUpdateOperationsInput | string;
  };

  export type delegationCreateManyInput = {
    createdBy: string;
    delegatedTo: string;
  };

  export type delegationUpdateManyMutationInput = {};

  export type delegationUncheckedUpdateManyInput = {
    createdBy?: StringFieldUpdateOperationsInput | string;
    delegatedTo?: StringFieldUpdateOperationsInput | string;
  };

  export type udapCreateInput = {
    id: string;
    department: string;
    completeCoords?: string | null;
    visible?: boolean | null;
    name?: string | null;
    address?: string | null;
    zipCode?: string | null;
    city?: string | null;
    phone?: string | null;
    email?: string | null;
    user?: userCreateNestedManyWithoutUdapInput;
  };

  export type udapUncheckedCreateInput = {
    id: string;
    department: string;
    completeCoords?: string | null;
    visible?: boolean | null;
    name?: string | null;
    address?: string | null;
    zipCode?: string | null;
    city?: string | null;
    phone?: string | null;
    email?: string | null;
    user?: userUncheckedCreateNestedManyWithoutUdapInput;
  };

  export type udapUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    department?: StringFieldUpdateOperationsInput | string;
    completeCoords?: NullableStringFieldUpdateOperationsInput | string | null;
    visible?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null;
    city?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    user?: userUpdateManyWithoutUdapNestedInput;
  };

  export type udapUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    department?: StringFieldUpdateOperationsInput | string;
    completeCoords?: NullableStringFieldUpdateOperationsInput | string | null;
    visible?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null;
    city?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
    user?: userUncheckedUpdateManyWithoutUdapNestedInput;
  };

  export type udapCreateManyInput = {
    id: string;
    department: string;
    completeCoords?: string | null;
    visible?: boolean | null;
    name?: string | null;
    address?: string | null;
    zipCode?: string | null;
    city?: string | null;
    phone?: string | null;
    email?: string | null;
  };

  export type udapUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    department?: StringFieldUpdateOperationsInput | string;
    completeCoords?: NullableStringFieldUpdateOperationsInput | string | null;
    visible?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null;
    city?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type udapUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    department?: StringFieldUpdateOperationsInput | string;
    completeCoords?: NullableStringFieldUpdateOperationsInput | string | null;
    visible?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null;
    city?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type userCreateInput = {
    id: string;
    name: string;
    delegation_delegation_createdByTouser?: delegationCreateNestedManyWithoutUser_delegation_createdByTouserInput;
    delegation_delegation_delegatedToTouser?: delegationCreateNestedManyWithoutUser_delegation_delegatedToTouserInput;
    internal_user?: internal_userCreateNestedManyWithoutUserInput;
    report?: reportCreateNestedManyWithoutUserInput;
    udap: udapCreateNestedOneWithoutUserInput;
  };

  export type userUncheckedCreateInput = {
    id: string;
    name: string;
    udap_id: string;
    delegation_delegation_createdByTouser?: delegationUncheckedCreateNestedManyWithoutUser_delegation_createdByTouserInput;
    delegation_delegation_delegatedToTouser?: delegationUncheckedCreateNestedManyWithoutUser_delegation_delegatedToTouserInput;
    internal_user?: internal_userUncheckedCreateNestedManyWithoutUserInput;
    report?: reportUncheckedCreateNestedManyWithoutUserInput;
  };

  export type userUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    delegation_delegation_createdByTouser?: delegationUpdateManyWithoutUser_delegation_createdByTouserNestedInput;
    delegation_delegation_delegatedToTouser?: delegationUpdateManyWithoutUser_delegation_delegatedToTouserNestedInput;
    internal_user?: internal_userUpdateManyWithoutUserNestedInput;
    report?: reportUpdateManyWithoutUserNestedInput;
    udap?: udapUpdateOneRequiredWithoutUserNestedInput;
  };

  export type userUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    udap_id?: StringFieldUpdateOperationsInput | string;
    delegation_delegation_createdByTouser?: delegationUncheckedUpdateManyWithoutUser_delegation_createdByTouserNestedInput;
    delegation_delegation_delegatedToTouser?: delegationUncheckedUpdateManyWithoutUser_delegation_delegatedToTouserNestedInput;
    internal_user?: internal_userUncheckedUpdateManyWithoutUserNestedInput;
    report?: reportUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type userCreateManyInput = {
    id: string;
    name: string;
    udap_id: string;
  };

  export type userUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
  };

  export type userUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    udap_id?: StringFieldUpdateOperationsInput | string;
  };

  export type whitelistCreateInput = {
    email: string;
  };

  export type whitelistUncheckedCreateInput = {
    email: string;
  };

  export type whitelistUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string;
  };

  export type whitelistUncheckedUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string;
  };

  export type whitelistCreateManyInput = {
    email: string;
  };

  export type whitelistUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string;
  };

  export type whitelistUncheckedUpdateManyInput = {
    email?: StringFieldUpdateOperationsInput | string;
  };

  export type internal_userCreateInput = {
    id: string;
    email: string;
    role: string;
    password: string;
    temporaryLink?: string | null;
    temporaryLinkExpiresAt?: string | null;
    user: userCreateNestedOneWithoutInternal_userInput;
  };

  export type internal_userUncheckedCreateInput = {
    id: string;
    email: string;
    role: string;
    password: string;
    temporaryLink?: string | null;
    temporaryLinkExpiresAt?: string | null;
    userId: string;
  };

  export type internal_userUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    temporaryLink?: NullableStringFieldUpdateOperationsInput | string | null;
    temporaryLinkExpiresAt?: NullableStringFieldUpdateOperationsInput | string | null;
    user?: userUpdateOneRequiredWithoutInternal_userNestedInput;
  };

  export type internal_userUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    temporaryLink?: NullableStringFieldUpdateOperationsInput | string | null;
    temporaryLinkExpiresAt?: NullableStringFieldUpdateOperationsInput | string | null;
    userId?: StringFieldUpdateOperationsInput | string;
  };

  export type internal_userCreateManyInput = {
    id: string;
    email: string;
    role: string;
    password: string;
    temporaryLink?: string | null;
    temporaryLinkExpiresAt?: string | null;
    userId: string;
  };

  export type internal_userUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    temporaryLink?: NullableStringFieldUpdateOperationsInput | string | null;
    temporaryLinkExpiresAt?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type internal_userUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    temporaryLink?: NullableStringFieldUpdateOperationsInput | string | null;
    temporaryLinkExpiresAt?: NullableStringFieldUpdateOperationsInput | string | null;
    userId?: StringFieldUpdateOperationsInput | string;
  };

  export type BigIntFilter = {
    equals?: bigint | number;
    in?: Enumerable<bigint> | Enumerable<number> | bigint | number;
    notIn?: Enumerable<bigint> | Enumerable<number> | bigint | number;
    lt?: bigint | number;
    lte?: bigint | number;
    gt?: bigint | number;
    gte?: bigint | number;
    not?: NestedBigIntFilter | bigint | number;
  };

  export type IntFilter = {
    equals?: number;
    in?: Enumerable<number> | number;
    notIn?: Enumerable<number> | number;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntFilter | number;
  };

  export type StringFilter = {
    equals?: string;
    in?: Enumerable<string> | string;
    notIn?: Enumerable<string> | string;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    mode?: QueryMode;
    not?: NestedStringFilter | string;
  };

  export type DateTimeFilter = {
    equals?: Date | string;
    in?: Enumerable<Date> | Enumerable<string> | Date | string;
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string;
    lt?: Date | string;
    lte?: Date | string;
    gt?: Date | string;
    gte?: Date | string;
    not?: NestedDateTimeFilter | Date | string;
  };

  export type StringNullableFilter = {
    equals?: string | null;
    in?: Enumerable<string> | string | null;
    notIn?: Enumerable<string> | string | null;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    mode?: QueryMode;
    not?: NestedStringNullableFilter | string | null;
  };

  export type BoolFilter = {
    equals?: boolean;
    not?: NestedBoolFilter | boolean;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type atdatabases_migrations_appliedCountOrderByAggregateInput = {
    id?: SortOrder;
    index?: SortOrder;
    name?: SortOrder;
    script?: SortOrder;
    applied_at?: SortOrder;
    ignored_error?: SortOrder;
    obsolete?: SortOrder;
  };

  export type atdatabases_migrations_appliedAvgOrderByAggregateInput = {
    id?: SortOrder;
    index?: SortOrder;
  };

  export type atdatabases_migrations_appliedMaxOrderByAggregateInput = {
    id?: SortOrder;
    index?: SortOrder;
    name?: SortOrder;
    script?: SortOrder;
    applied_at?: SortOrder;
    ignored_error?: SortOrder;
    obsolete?: SortOrder;
  };

  export type atdatabases_migrations_appliedMinOrderByAggregateInput = {
    id?: SortOrder;
    index?: SortOrder;
    name?: SortOrder;
    script?: SortOrder;
    applied_at?: SortOrder;
    ignored_error?: SortOrder;
    obsolete?: SortOrder;
  };

  export type atdatabases_migrations_appliedSumOrderByAggregateInput = {
    id?: SortOrder;
    index?: SortOrder;
  };

  export type BigIntWithAggregatesFilter = {
    equals?: bigint | number;
    in?: Enumerable<bigint> | Enumerable<number> | bigint | number;
    notIn?: Enumerable<bigint> | Enumerable<number> | bigint | number;
    lt?: bigint | number;
    lte?: bigint | number;
    gt?: bigint | number;
    gte?: bigint | number;
    not?: NestedBigIntWithAggregatesFilter | bigint | number;
    _count?: NestedIntFilter;
    _avg?: NestedFloatFilter;
    _sum?: NestedBigIntFilter;
    _min?: NestedBigIntFilter;
    _max?: NestedBigIntFilter;
  };

  export type IntWithAggregatesFilter = {
    equals?: number;
    in?: Enumerable<number> | number;
    notIn?: Enumerable<number> | number;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntWithAggregatesFilter | number;
    _count?: NestedIntFilter;
    _avg?: NestedFloatFilter;
    _sum?: NestedIntFilter;
    _min?: NestedIntFilter;
    _max?: NestedIntFilter;
  };

  export type StringWithAggregatesFilter = {
    equals?: string;
    in?: Enumerable<string> | string;
    notIn?: Enumerable<string> | string;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter | string;
    _count?: NestedIntFilter;
    _min?: NestedStringFilter;
    _max?: NestedStringFilter;
  };

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string;
    in?: Enumerable<Date> | Enumerable<string> | Date | string;
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string;
    lt?: Date | string;
    lte?: Date | string;
    gt?: Date | string;
    gte?: Date | string;
    not?: NestedDateTimeWithAggregatesFilter | Date | string;
    _count?: NestedIntFilter;
    _min?: NestedDateTimeFilter;
    _max?: NestedDateTimeFilter;
  };

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null;
    in?: Enumerable<string> | string | null;
    notIn?: Enumerable<string> | string | null;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    mode?: QueryMode;
    not?: NestedStringNullableWithAggregatesFilter | string | null;
    _count?: NestedIntNullableFilter;
    _min?: NestedStringNullableFilter;
    _max?: NestedStringNullableFilter;
  };

  export type BoolWithAggregatesFilter = {
    equals?: boolean;
    not?: NestedBoolWithAggregatesFilter | boolean;
    _count?: NestedIntFilter;
    _min?: NestedBoolFilter;
    _max?: NestedBoolFilter;
  };

  export type atdatabases_migrations_versionCountOrderByAggregateInput = {
    id?: SortOrder;
    version?: SortOrder;
  };

  export type atdatabases_migrations_versionAvgOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type atdatabases_migrations_versionMaxOrderByAggregateInput = {
    id?: SortOrder;
    version?: SortOrder;
  };

  export type atdatabases_migrations_versionMinOrderByAggregateInput = {
    id?: SortOrder;
    version?: SortOrder;
  };

  export type atdatabases_migrations_versionSumOrderByAggregateInput = {
    id?: SortOrder;
  };

  export type Report_to_clauseListRelationFilter = {
    every?: report_to_clauseWhereInput;
    some?: report_to_clauseWhereInput;
    none?: report_to_clauseWhereInput;
  };

  export type report_to_clauseOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type clauseCountOrderByAggregateInput = {
    id?: SortOrder;
    label?: SortOrder;
    value?: SortOrder;
  };

  export type clauseMaxOrderByAggregateInput = {
    id?: SortOrder;
    label?: SortOrder;
    value?: SortOrder;
  };

  export type clauseMinOrderByAggregateInput = {
    id?: SortOrder;
    label?: SortOrder;
    value?: SortOrder;
  };

  export type DateTimeNullableFilter = {
    equals?: Date | string | null;
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null;
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null;
    lt?: Date | string;
    lte?: Date | string;
    gt?: Date | string;
    gte?: Date | string;
    not?: NestedDateTimeNullableFilter | Date | string | null;
  };

  export type IntNullableFilter = {
    equals?: number | null;
    in?: Enumerable<number> | number | null;
    notIn?: Enumerable<number> | number | null;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntNullableFilter | number | null;
  };

  export type BoolNullableFilter = {
    equals?: boolean | null;
    not?: NestedBoolNullableFilter | boolean | null;
  };

  export type UserRelationFilter = {
    is?: userWhereInput | null;
    isNot?: userWhereInput | null;
  };

  export type reportCountOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    projectDescription?: SortOrder;
    redactedBy?: SortOrder;
    meetDate?: SortOrder;
    applicantName?: SortOrder;
    applicantAddress?: SortOrder;
    projectCadastralRef?: SortOrder;
    projectSpaceType?: SortOrder;
    decision?: SortOrder;
    precisions?: SortOrder;
    contacts?: SortOrder;
    furtherInformation?: SortOrder;
    createdBy?: SortOrder;
    createdAt?: SortOrder;
    serviceInstructeur?: SortOrder;
    pdf?: SortOrder;
    disabled?: SortOrder;
    udap_id?: SortOrder;
  };

  export type reportAvgOrderByAggregateInput = {
    serviceInstructeur?: SortOrder;
  };

  export type reportMaxOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    projectDescription?: SortOrder;
    redactedBy?: SortOrder;
    meetDate?: SortOrder;
    applicantName?: SortOrder;
    applicantAddress?: SortOrder;
    projectCadastralRef?: SortOrder;
    projectSpaceType?: SortOrder;
    decision?: SortOrder;
    precisions?: SortOrder;
    contacts?: SortOrder;
    furtherInformation?: SortOrder;
    createdBy?: SortOrder;
    createdAt?: SortOrder;
    serviceInstructeur?: SortOrder;
    pdf?: SortOrder;
    disabled?: SortOrder;
    udap_id?: SortOrder;
  };

  export type reportMinOrderByAggregateInput = {
    id?: SortOrder;
    title?: SortOrder;
    projectDescription?: SortOrder;
    redactedBy?: SortOrder;
    meetDate?: SortOrder;
    applicantName?: SortOrder;
    applicantAddress?: SortOrder;
    projectCadastralRef?: SortOrder;
    projectSpaceType?: SortOrder;
    decision?: SortOrder;
    precisions?: SortOrder;
    contacts?: SortOrder;
    furtherInformation?: SortOrder;
    createdBy?: SortOrder;
    createdAt?: SortOrder;
    serviceInstructeur?: SortOrder;
    pdf?: SortOrder;
    disabled?: SortOrder;
    udap_id?: SortOrder;
  };

  export type reportSumOrderByAggregateInput = {
    serviceInstructeur?: SortOrder;
  };

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null;
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null;
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null;
    lt?: Date | string;
    lte?: Date | string;
    gt?: Date | string;
    gte?: Date | string;
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null;
    _count?: NestedIntNullableFilter;
    _min?: NestedDateTimeNullableFilter;
    _max?: NestedDateTimeNullableFilter;
  };

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null;
    in?: Enumerable<number> | number | null;
    notIn?: Enumerable<number> | number | null;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntNullableWithAggregatesFilter | number | null;
    _count?: NestedIntNullableFilter;
    _avg?: NestedFloatNullableFilter;
    _sum?: NestedIntNullableFilter;
    _min?: NestedIntNullableFilter;
    _max?: NestedIntNullableFilter;
  };

  export type BoolNullableWithAggregatesFilter = {
    equals?: boolean | null;
    not?: NestedBoolNullableWithAggregatesFilter | boolean | null;
    _count?: NestedIntNullableFilter;
    _min?: NestedBoolNullableFilter;
    _max?: NestedBoolNullableFilter;
  };

  export type ClauseRelationFilter = {
    is?: clauseWhereInput | null;
    isNot?: clauseWhereInput | null;
  };

  export type ReportRelationFilter = {
    is?: reportWhereInput | null;
    isNot?: reportWhereInput | null;
  };

  export type report_to_clauseCountOrderByAggregateInput = {
    id?: SortOrder;
    reportId?: SortOrder;
    clauseId?: SortOrder;
  };

  export type report_to_clauseMaxOrderByAggregateInput = {
    id?: SortOrder;
    reportId?: SortOrder;
    clauseId?: SortOrder;
  };

  export type report_to_clauseMinOrderByAggregateInput = {
    id?: SortOrder;
    reportId?: SortOrder;
    clauseId?: SortOrder;
  };

  export type chipKeyValueUdap_idCompoundUniqueInput = {
    key: string;
    value: string;
    udap_id: string;
  };

  export type chipCountOrderByAggregateInput = {
    key?: SortOrder;
    value?: SortOrder;
    udap_id?: SortOrder;
    text?: SortOrder;
  };

  export type chipMaxOrderByAggregateInput = {
    key?: SortOrder;
    value?: SortOrder;
    udap_id?: SortOrder;
    text?: SortOrder;
  };

  export type chipMinOrderByAggregateInput = {
    key?: SortOrder;
    value?: SortOrder;
    udap_id?: SortOrder;
    text?: SortOrder;
  };

  export type delegationCreatedByDelegatedToCompoundUniqueInput = {
    createdBy: string;
    delegatedTo: string;
  };

  export type delegationCountOrderByAggregateInput = {
    createdBy?: SortOrder;
    delegatedTo?: SortOrder;
  };

  export type delegationMaxOrderByAggregateInput = {
    createdBy?: SortOrder;
    delegatedTo?: SortOrder;
  };

  export type delegationMinOrderByAggregateInput = {
    createdBy?: SortOrder;
    delegatedTo?: SortOrder;
  };

  export type UserListRelationFilter = {
    every?: userWhereInput;
    some?: userWhereInput;
    none?: userWhereInput;
  };

  export type userOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type udapCountOrderByAggregateInput = {
    id?: SortOrder;
    department?: SortOrder;
    completeCoords?: SortOrder;
    visible?: SortOrder;
    name?: SortOrder;
    address?: SortOrder;
    zipCode?: SortOrder;
    city?: SortOrder;
    phone?: SortOrder;
    email?: SortOrder;
  };

  export type udapMaxOrderByAggregateInput = {
    id?: SortOrder;
    department?: SortOrder;
    completeCoords?: SortOrder;
    visible?: SortOrder;
    name?: SortOrder;
    address?: SortOrder;
    zipCode?: SortOrder;
    city?: SortOrder;
    phone?: SortOrder;
    email?: SortOrder;
  };

  export type udapMinOrderByAggregateInput = {
    id?: SortOrder;
    department?: SortOrder;
    completeCoords?: SortOrder;
    visible?: SortOrder;
    name?: SortOrder;
    address?: SortOrder;
    zipCode?: SortOrder;
    city?: SortOrder;
    phone?: SortOrder;
    email?: SortOrder;
  };

  export type DelegationListRelationFilter = {
    every?: delegationWhereInput;
    some?: delegationWhereInput;
    none?: delegationWhereInput;
  };

  export type Internal_userListRelationFilter = {
    every?: internal_userWhereInput;
    some?: internal_userWhereInput;
    none?: internal_userWhereInput;
  };

  export type ReportListRelationFilter = {
    every?: reportWhereInput;
    some?: reportWhereInput;
    none?: reportWhereInput;
  };

  export type UdapRelationFilter = {
    is?: udapWhereInput | null;
    isNot?: udapWhereInput | null;
  };

  export type delegationOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type internal_userOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type reportOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type userCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    udap_id?: SortOrder;
  };

  export type userMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    udap_id?: SortOrder;
  };

  export type userMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    udap_id?: SortOrder;
  };

  export type whitelistCountOrderByAggregateInput = {
    email?: SortOrder;
  };

  export type whitelistMaxOrderByAggregateInput = {
    email?: SortOrder;
  };

  export type whitelistMinOrderByAggregateInput = {
    email?: SortOrder;
  };

  export type internal_userCountOrderByAggregateInput = {
    id?: SortOrder;
    email?: SortOrder;
    role?: SortOrder;
    password?: SortOrder;
    temporaryLink?: SortOrder;
    temporaryLinkExpiresAt?: SortOrder;
    userId?: SortOrder;
  };

  export type internal_userMaxOrderByAggregateInput = {
    id?: SortOrder;
    email?: SortOrder;
    role?: SortOrder;
    password?: SortOrder;
    temporaryLink?: SortOrder;
    temporaryLinkExpiresAt?: SortOrder;
    userId?: SortOrder;
  };

  export type internal_userMinOrderByAggregateInput = {
    id?: SortOrder;
    email?: SortOrder;
    role?: SortOrder;
    password?: SortOrder;
    temporaryLink?: SortOrder;
    temporaryLinkExpiresAt?: SortOrder;
    userId?: SortOrder;
  };

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number;
    increment?: bigint | number;
    decrement?: bigint | number;
    multiply?: bigint | number;
    divide?: bigint | number;
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
  };

  export type report_to_clauseCreateNestedManyWithoutClauseInput = {
    create?: XOR<
      Enumerable<report_to_clauseCreateWithoutClauseInput>,
      Enumerable<report_to_clauseUncheckedCreateWithoutClauseInput>
    >;
    connectOrCreate?: Enumerable<report_to_clauseCreateOrConnectWithoutClauseInput>;
    createMany?: report_to_clauseCreateManyClauseInputEnvelope;
    connect?: Enumerable<report_to_clauseWhereUniqueInput>;
  };

  export type report_to_clauseUncheckedCreateNestedManyWithoutClauseInput = {
    create?: XOR<
      Enumerable<report_to_clauseCreateWithoutClauseInput>,
      Enumerable<report_to_clauseUncheckedCreateWithoutClauseInput>
    >;
    connectOrCreate?: Enumerable<report_to_clauseCreateOrConnectWithoutClauseInput>;
    createMany?: report_to_clauseCreateManyClauseInputEnvelope;
    connect?: Enumerable<report_to_clauseWhereUniqueInput>;
  };

  export type report_to_clauseUpdateManyWithoutClauseNestedInput = {
    create?: XOR<
      Enumerable<report_to_clauseCreateWithoutClauseInput>,
      Enumerable<report_to_clauseUncheckedCreateWithoutClauseInput>
    >;
    connectOrCreate?: Enumerable<report_to_clauseCreateOrConnectWithoutClauseInput>;
    upsert?: Enumerable<report_to_clauseUpsertWithWhereUniqueWithoutClauseInput>;
    createMany?: report_to_clauseCreateManyClauseInputEnvelope;
    set?: Enumerable<report_to_clauseWhereUniqueInput>;
    disconnect?: Enumerable<report_to_clauseWhereUniqueInput>;
    delete?: Enumerable<report_to_clauseWhereUniqueInput>;
    connect?: Enumerable<report_to_clauseWhereUniqueInput>;
    update?: Enumerable<report_to_clauseUpdateWithWhereUniqueWithoutClauseInput>;
    updateMany?: Enumerable<report_to_clauseUpdateManyWithWhereWithoutClauseInput>;
    deleteMany?: Enumerable<report_to_clauseScalarWhereInput>;
  };

  export type report_to_clauseUncheckedUpdateManyWithoutClauseNestedInput = {
    create?: XOR<
      Enumerable<report_to_clauseCreateWithoutClauseInput>,
      Enumerable<report_to_clauseUncheckedCreateWithoutClauseInput>
    >;
    connectOrCreate?: Enumerable<report_to_clauseCreateOrConnectWithoutClauseInput>;
    upsert?: Enumerable<report_to_clauseUpsertWithWhereUniqueWithoutClauseInput>;
    createMany?: report_to_clauseCreateManyClauseInputEnvelope;
    set?: Enumerable<report_to_clauseWhereUniqueInput>;
    disconnect?: Enumerable<report_to_clauseWhereUniqueInput>;
    delete?: Enumerable<report_to_clauseWhereUniqueInput>;
    connect?: Enumerable<report_to_clauseWhereUniqueInput>;
    update?: Enumerable<report_to_clauseUpdateWithWhereUniqueWithoutClauseInput>;
    updateMany?: Enumerable<report_to_clauseUpdateManyWithWhereWithoutClauseInput>;
    deleteMany?: Enumerable<report_to_clauseScalarWhereInput>;
  };

  export type userCreateNestedOneWithoutReportInput = {
    create?: XOR<userCreateWithoutReportInput, userUncheckedCreateWithoutReportInput>;
    connectOrCreate?: userCreateOrConnectWithoutReportInput;
    connect?: userWhereUniqueInput;
  };

  export type report_to_clauseCreateNestedManyWithoutReportInput = {
    create?: XOR<
      Enumerable<report_to_clauseCreateWithoutReportInput>,
      Enumerable<report_to_clauseUncheckedCreateWithoutReportInput>
    >;
    connectOrCreate?: Enumerable<report_to_clauseCreateOrConnectWithoutReportInput>;
    createMany?: report_to_clauseCreateManyReportInputEnvelope;
    connect?: Enumerable<report_to_clauseWhereUniqueInput>;
  };

  export type report_to_clauseUncheckedCreateNestedManyWithoutReportInput = {
    create?: XOR<
      Enumerable<report_to_clauseCreateWithoutReportInput>,
      Enumerable<report_to_clauseUncheckedCreateWithoutReportInput>
    >;
    connectOrCreate?: Enumerable<report_to_clauseCreateOrConnectWithoutReportInput>;
    createMany?: report_to_clauseCreateManyReportInputEnvelope;
    connect?: Enumerable<report_to_clauseWhereUniqueInput>;
  };

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
  };

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null;
  };

  export type userUpdateOneRequiredWithoutReportNestedInput = {
    create?: XOR<userCreateWithoutReportInput, userUncheckedCreateWithoutReportInput>;
    connectOrCreate?: userCreateOrConnectWithoutReportInput;
    upsert?: userUpsertWithoutReportInput;
    connect?: userWhereUniqueInput;
    update?: XOR<userUpdateWithoutReportInput, userUncheckedUpdateWithoutReportInput>;
  };

  export type report_to_clauseUpdateManyWithoutReportNestedInput = {
    create?: XOR<
      Enumerable<report_to_clauseCreateWithoutReportInput>,
      Enumerable<report_to_clauseUncheckedCreateWithoutReportInput>
    >;
    connectOrCreate?: Enumerable<report_to_clauseCreateOrConnectWithoutReportInput>;
    upsert?: Enumerable<report_to_clauseUpsertWithWhereUniqueWithoutReportInput>;
    createMany?: report_to_clauseCreateManyReportInputEnvelope;
    set?: Enumerable<report_to_clauseWhereUniqueInput>;
    disconnect?: Enumerable<report_to_clauseWhereUniqueInput>;
    delete?: Enumerable<report_to_clauseWhereUniqueInput>;
    connect?: Enumerable<report_to_clauseWhereUniqueInput>;
    update?: Enumerable<report_to_clauseUpdateWithWhereUniqueWithoutReportInput>;
    updateMany?: Enumerable<report_to_clauseUpdateManyWithWhereWithoutReportInput>;
    deleteMany?: Enumerable<report_to_clauseScalarWhereInput>;
  };

  export type report_to_clauseUncheckedUpdateManyWithoutReportNestedInput = {
    create?: XOR<
      Enumerable<report_to_clauseCreateWithoutReportInput>,
      Enumerable<report_to_clauseUncheckedCreateWithoutReportInput>
    >;
    connectOrCreate?: Enumerable<report_to_clauseCreateOrConnectWithoutReportInput>;
    upsert?: Enumerable<report_to_clauseUpsertWithWhereUniqueWithoutReportInput>;
    createMany?: report_to_clauseCreateManyReportInputEnvelope;
    set?: Enumerable<report_to_clauseWhereUniqueInput>;
    disconnect?: Enumerable<report_to_clauseWhereUniqueInput>;
    delete?: Enumerable<report_to_clauseWhereUniqueInput>;
    connect?: Enumerable<report_to_clauseWhereUniqueInput>;
    update?: Enumerable<report_to_clauseUpdateWithWhereUniqueWithoutReportInput>;
    updateMany?: Enumerable<report_to_clauseUpdateManyWithWhereWithoutReportInput>;
    deleteMany?: Enumerable<report_to_clauseScalarWhereInput>;
  };

  export type clauseCreateNestedOneWithoutReport_to_clauseInput = {
    create?: XOR<clauseCreateWithoutReport_to_clauseInput, clauseUncheckedCreateWithoutReport_to_clauseInput>;
    connectOrCreate?: clauseCreateOrConnectWithoutReport_to_clauseInput;
    connect?: clauseWhereUniqueInput;
  };

  export type reportCreateNestedOneWithoutReport_to_clauseInput = {
    create?: XOR<reportCreateWithoutReport_to_clauseInput, reportUncheckedCreateWithoutReport_to_clauseInput>;
    connectOrCreate?: reportCreateOrConnectWithoutReport_to_clauseInput;
    connect?: reportWhereUniqueInput;
  };

  export type clauseUpdateOneRequiredWithoutReport_to_clauseNestedInput = {
    create?: XOR<clauseCreateWithoutReport_to_clauseInput, clauseUncheckedCreateWithoutReport_to_clauseInput>;
    connectOrCreate?: clauseCreateOrConnectWithoutReport_to_clauseInput;
    upsert?: clauseUpsertWithoutReport_to_clauseInput;
    connect?: clauseWhereUniqueInput;
    update?: XOR<clauseUpdateWithoutReport_to_clauseInput, clauseUncheckedUpdateWithoutReport_to_clauseInput>;
  };

  export type reportUpdateOneRequiredWithoutReport_to_clauseNestedInput = {
    create?: XOR<reportCreateWithoutReport_to_clauseInput, reportUncheckedCreateWithoutReport_to_clauseInput>;
    connectOrCreate?: reportCreateOrConnectWithoutReport_to_clauseInput;
    upsert?: reportUpsertWithoutReport_to_clauseInput;
    connect?: reportWhereUniqueInput;
    update?: XOR<reportUpdateWithoutReport_to_clauseInput, reportUncheckedUpdateWithoutReport_to_clauseInput>;
  };

  export type userCreateNestedOneWithoutDelegation_delegation_createdByTouserInput = {
    create?: XOR<
      userCreateWithoutDelegation_delegation_createdByTouserInput,
      userUncheckedCreateWithoutDelegation_delegation_createdByTouserInput
    >;
    connectOrCreate?: userCreateOrConnectWithoutDelegation_delegation_createdByTouserInput;
    connect?: userWhereUniqueInput;
  };

  export type userCreateNestedOneWithoutDelegation_delegation_delegatedToTouserInput = {
    create?: XOR<
      userCreateWithoutDelegation_delegation_delegatedToTouserInput,
      userUncheckedCreateWithoutDelegation_delegation_delegatedToTouserInput
    >;
    connectOrCreate?: userCreateOrConnectWithoutDelegation_delegation_delegatedToTouserInput;
    connect?: userWhereUniqueInput;
  };

  export type userUpdateOneRequiredWithoutDelegation_delegation_createdByTouserNestedInput = {
    create?: XOR<
      userCreateWithoutDelegation_delegation_createdByTouserInput,
      userUncheckedCreateWithoutDelegation_delegation_createdByTouserInput
    >;
    connectOrCreate?: userCreateOrConnectWithoutDelegation_delegation_createdByTouserInput;
    upsert?: userUpsertWithoutDelegation_delegation_createdByTouserInput;
    connect?: userWhereUniqueInput;
    update?: XOR<
      userUpdateWithoutDelegation_delegation_createdByTouserInput,
      userUncheckedUpdateWithoutDelegation_delegation_createdByTouserInput
    >;
  };

  export type userUpdateOneRequiredWithoutDelegation_delegation_delegatedToTouserNestedInput = {
    create?: XOR<
      userCreateWithoutDelegation_delegation_delegatedToTouserInput,
      userUncheckedCreateWithoutDelegation_delegation_delegatedToTouserInput
    >;
    connectOrCreate?: userCreateOrConnectWithoutDelegation_delegation_delegatedToTouserInput;
    upsert?: userUpsertWithoutDelegation_delegation_delegatedToTouserInput;
    connect?: userWhereUniqueInput;
    update?: XOR<
      userUpdateWithoutDelegation_delegation_delegatedToTouserInput,
      userUncheckedUpdateWithoutDelegation_delegation_delegatedToTouserInput
    >;
  };

  export type userCreateNestedManyWithoutUdapInput = {
    create?: XOR<Enumerable<userCreateWithoutUdapInput>, Enumerable<userUncheckedCreateWithoutUdapInput>>;
    connectOrCreate?: Enumerable<userCreateOrConnectWithoutUdapInput>;
    createMany?: userCreateManyUdapInputEnvelope;
    connect?: Enumerable<userWhereUniqueInput>;
  };

  export type userUncheckedCreateNestedManyWithoutUdapInput = {
    create?: XOR<Enumerable<userCreateWithoutUdapInput>, Enumerable<userUncheckedCreateWithoutUdapInput>>;
    connectOrCreate?: Enumerable<userCreateOrConnectWithoutUdapInput>;
    createMany?: userCreateManyUdapInputEnvelope;
    connect?: Enumerable<userWhereUniqueInput>;
  };

  export type userUpdateManyWithoutUdapNestedInput = {
    create?: XOR<Enumerable<userCreateWithoutUdapInput>, Enumerable<userUncheckedCreateWithoutUdapInput>>;
    connectOrCreate?: Enumerable<userCreateOrConnectWithoutUdapInput>;
    upsert?: Enumerable<userUpsertWithWhereUniqueWithoutUdapInput>;
    createMany?: userCreateManyUdapInputEnvelope;
    set?: Enumerable<userWhereUniqueInput>;
    disconnect?: Enumerable<userWhereUniqueInput>;
    delete?: Enumerable<userWhereUniqueInput>;
    connect?: Enumerable<userWhereUniqueInput>;
    update?: Enumerable<userUpdateWithWhereUniqueWithoutUdapInput>;
    updateMany?: Enumerable<userUpdateManyWithWhereWithoutUdapInput>;
    deleteMany?: Enumerable<userScalarWhereInput>;
  };

  export type userUncheckedUpdateManyWithoutUdapNestedInput = {
    create?: XOR<Enumerable<userCreateWithoutUdapInput>, Enumerable<userUncheckedCreateWithoutUdapInput>>;
    connectOrCreate?: Enumerable<userCreateOrConnectWithoutUdapInput>;
    upsert?: Enumerable<userUpsertWithWhereUniqueWithoutUdapInput>;
    createMany?: userCreateManyUdapInputEnvelope;
    set?: Enumerable<userWhereUniqueInput>;
    disconnect?: Enumerable<userWhereUniqueInput>;
    delete?: Enumerable<userWhereUniqueInput>;
    connect?: Enumerable<userWhereUniqueInput>;
    update?: Enumerable<userUpdateWithWhereUniqueWithoutUdapInput>;
    updateMany?: Enumerable<userUpdateManyWithWhereWithoutUdapInput>;
    deleteMany?: Enumerable<userScalarWhereInput>;
  };

  export type delegationCreateNestedManyWithoutUser_delegation_createdByTouserInput = {
    create?: XOR<
      Enumerable<delegationCreateWithoutUser_delegation_createdByTouserInput>,
      Enumerable<delegationUncheckedCreateWithoutUser_delegation_createdByTouserInput>
    >;
    connectOrCreate?: Enumerable<delegationCreateOrConnectWithoutUser_delegation_createdByTouserInput>;
    createMany?: delegationCreateManyUser_delegation_createdByTouserInputEnvelope;
    connect?: Enumerable<delegationWhereUniqueInput>;
  };

  export type delegationCreateNestedManyWithoutUser_delegation_delegatedToTouserInput = {
    create?: XOR<
      Enumerable<delegationCreateWithoutUser_delegation_delegatedToTouserInput>,
      Enumerable<delegationUncheckedCreateWithoutUser_delegation_delegatedToTouserInput>
    >;
    connectOrCreate?: Enumerable<delegationCreateOrConnectWithoutUser_delegation_delegatedToTouserInput>;
    createMany?: delegationCreateManyUser_delegation_delegatedToTouserInputEnvelope;
    connect?: Enumerable<delegationWhereUniqueInput>;
  };

  export type internal_userCreateNestedManyWithoutUserInput = {
    create?: XOR<
      Enumerable<internal_userCreateWithoutUserInput>,
      Enumerable<internal_userUncheckedCreateWithoutUserInput>
    >;
    connectOrCreate?: Enumerable<internal_userCreateOrConnectWithoutUserInput>;
    createMany?: internal_userCreateManyUserInputEnvelope;
    connect?: Enumerable<internal_userWhereUniqueInput>;
  };

  export type reportCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<reportCreateWithoutUserInput>, Enumerable<reportUncheckedCreateWithoutUserInput>>;
    connectOrCreate?: Enumerable<reportCreateOrConnectWithoutUserInput>;
    createMany?: reportCreateManyUserInputEnvelope;
    connect?: Enumerable<reportWhereUniqueInput>;
  };

  export type udapCreateNestedOneWithoutUserInput = {
    create?: XOR<udapCreateWithoutUserInput, udapUncheckedCreateWithoutUserInput>;
    connectOrCreate?: udapCreateOrConnectWithoutUserInput;
    connect?: udapWhereUniqueInput;
  };

  export type delegationUncheckedCreateNestedManyWithoutUser_delegation_createdByTouserInput = {
    create?: XOR<
      Enumerable<delegationCreateWithoutUser_delegation_createdByTouserInput>,
      Enumerable<delegationUncheckedCreateWithoutUser_delegation_createdByTouserInput>
    >;
    connectOrCreate?: Enumerable<delegationCreateOrConnectWithoutUser_delegation_createdByTouserInput>;
    createMany?: delegationCreateManyUser_delegation_createdByTouserInputEnvelope;
    connect?: Enumerable<delegationWhereUniqueInput>;
  };

  export type delegationUncheckedCreateNestedManyWithoutUser_delegation_delegatedToTouserInput = {
    create?: XOR<
      Enumerable<delegationCreateWithoutUser_delegation_delegatedToTouserInput>,
      Enumerable<delegationUncheckedCreateWithoutUser_delegation_delegatedToTouserInput>
    >;
    connectOrCreate?: Enumerable<delegationCreateOrConnectWithoutUser_delegation_delegatedToTouserInput>;
    createMany?: delegationCreateManyUser_delegation_delegatedToTouserInputEnvelope;
    connect?: Enumerable<delegationWhereUniqueInput>;
  };

  export type internal_userUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<
      Enumerable<internal_userCreateWithoutUserInput>,
      Enumerable<internal_userUncheckedCreateWithoutUserInput>
    >;
    connectOrCreate?: Enumerable<internal_userCreateOrConnectWithoutUserInput>;
    createMany?: internal_userCreateManyUserInputEnvelope;
    connect?: Enumerable<internal_userWhereUniqueInput>;
  };

  export type reportUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<reportCreateWithoutUserInput>, Enumerable<reportUncheckedCreateWithoutUserInput>>;
    connectOrCreate?: Enumerable<reportCreateOrConnectWithoutUserInput>;
    createMany?: reportCreateManyUserInputEnvelope;
    connect?: Enumerable<reportWhereUniqueInput>;
  };

  export type delegationUpdateManyWithoutUser_delegation_createdByTouserNestedInput = {
    create?: XOR<
      Enumerable<delegationCreateWithoutUser_delegation_createdByTouserInput>,
      Enumerable<delegationUncheckedCreateWithoutUser_delegation_createdByTouserInput>
    >;
    connectOrCreate?: Enumerable<delegationCreateOrConnectWithoutUser_delegation_createdByTouserInput>;
    upsert?: Enumerable<delegationUpsertWithWhereUniqueWithoutUser_delegation_createdByTouserInput>;
    createMany?: delegationCreateManyUser_delegation_createdByTouserInputEnvelope;
    set?: Enumerable<delegationWhereUniqueInput>;
    disconnect?: Enumerable<delegationWhereUniqueInput>;
    delete?: Enumerable<delegationWhereUniqueInput>;
    connect?: Enumerable<delegationWhereUniqueInput>;
    update?: Enumerable<delegationUpdateWithWhereUniqueWithoutUser_delegation_createdByTouserInput>;
    updateMany?: Enumerable<delegationUpdateManyWithWhereWithoutUser_delegation_createdByTouserInput>;
    deleteMany?: Enumerable<delegationScalarWhereInput>;
  };

  export type delegationUpdateManyWithoutUser_delegation_delegatedToTouserNestedInput = {
    create?: XOR<
      Enumerable<delegationCreateWithoutUser_delegation_delegatedToTouserInput>,
      Enumerable<delegationUncheckedCreateWithoutUser_delegation_delegatedToTouserInput>
    >;
    connectOrCreate?: Enumerable<delegationCreateOrConnectWithoutUser_delegation_delegatedToTouserInput>;
    upsert?: Enumerable<delegationUpsertWithWhereUniqueWithoutUser_delegation_delegatedToTouserInput>;
    createMany?: delegationCreateManyUser_delegation_delegatedToTouserInputEnvelope;
    set?: Enumerable<delegationWhereUniqueInput>;
    disconnect?: Enumerable<delegationWhereUniqueInput>;
    delete?: Enumerable<delegationWhereUniqueInput>;
    connect?: Enumerable<delegationWhereUniqueInput>;
    update?: Enumerable<delegationUpdateWithWhereUniqueWithoutUser_delegation_delegatedToTouserInput>;
    updateMany?: Enumerable<delegationUpdateManyWithWhereWithoutUser_delegation_delegatedToTouserInput>;
    deleteMany?: Enumerable<delegationScalarWhereInput>;
  };

  export type internal_userUpdateManyWithoutUserNestedInput = {
    create?: XOR<
      Enumerable<internal_userCreateWithoutUserInput>,
      Enumerable<internal_userUncheckedCreateWithoutUserInput>
    >;
    connectOrCreate?: Enumerable<internal_userCreateOrConnectWithoutUserInput>;
    upsert?: Enumerable<internal_userUpsertWithWhereUniqueWithoutUserInput>;
    createMany?: internal_userCreateManyUserInputEnvelope;
    set?: Enumerable<internal_userWhereUniqueInput>;
    disconnect?: Enumerable<internal_userWhereUniqueInput>;
    delete?: Enumerable<internal_userWhereUniqueInput>;
    connect?: Enumerable<internal_userWhereUniqueInput>;
    update?: Enumerable<internal_userUpdateWithWhereUniqueWithoutUserInput>;
    updateMany?: Enumerable<internal_userUpdateManyWithWhereWithoutUserInput>;
    deleteMany?: Enumerable<internal_userScalarWhereInput>;
  };

  export type reportUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<reportCreateWithoutUserInput>, Enumerable<reportUncheckedCreateWithoutUserInput>>;
    connectOrCreate?: Enumerable<reportCreateOrConnectWithoutUserInput>;
    upsert?: Enumerable<reportUpsertWithWhereUniqueWithoutUserInput>;
    createMany?: reportCreateManyUserInputEnvelope;
    set?: Enumerable<reportWhereUniqueInput>;
    disconnect?: Enumerable<reportWhereUniqueInput>;
    delete?: Enumerable<reportWhereUniqueInput>;
    connect?: Enumerable<reportWhereUniqueInput>;
    update?: Enumerable<reportUpdateWithWhereUniqueWithoutUserInput>;
    updateMany?: Enumerable<reportUpdateManyWithWhereWithoutUserInput>;
    deleteMany?: Enumerable<reportScalarWhereInput>;
  };

  export type udapUpdateOneRequiredWithoutUserNestedInput = {
    create?: XOR<udapCreateWithoutUserInput, udapUncheckedCreateWithoutUserInput>;
    connectOrCreate?: udapCreateOrConnectWithoutUserInput;
    upsert?: udapUpsertWithoutUserInput;
    connect?: udapWhereUniqueInput;
    update?: XOR<udapUpdateWithoutUserInput, udapUncheckedUpdateWithoutUserInput>;
  };

  export type delegationUncheckedUpdateManyWithoutUser_delegation_createdByTouserNestedInput = {
    create?: XOR<
      Enumerable<delegationCreateWithoutUser_delegation_createdByTouserInput>,
      Enumerable<delegationUncheckedCreateWithoutUser_delegation_createdByTouserInput>
    >;
    connectOrCreate?: Enumerable<delegationCreateOrConnectWithoutUser_delegation_createdByTouserInput>;
    upsert?: Enumerable<delegationUpsertWithWhereUniqueWithoutUser_delegation_createdByTouserInput>;
    createMany?: delegationCreateManyUser_delegation_createdByTouserInputEnvelope;
    set?: Enumerable<delegationWhereUniqueInput>;
    disconnect?: Enumerable<delegationWhereUniqueInput>;
    delete?: Enumerable<delegationWhereUniqueInput>;
    connect?: Enumerable<delegationWhereUniqueInput>;
    update?: Enumerable<delegationUpdateWithWhereUniqueWithoutUser_delegation_createdByTouserInput>;
    updateMany?: Enumerable<delegationUpdateManyWithWhereWithoutUser_delegation_createdByTouserInput>;
    deleteMany?: Enumerable<delegationScalarWhereInput>;
  };

  export type delegationUncheckedUpdateManyWithoutUser_delegation_delegatedToTouserNestedInput = {
    create?: XOR<
      Enumerable<delegationCreateWithoutUser_delegation_delegatedToTouserInput>,
      Enumerable<delegationUncheckedCreateWithoutUser_delegation_delegatedToTouserInput>
    >;
    connectOrCreate?: Enumerable<delegationCreateOrConnectWithoutUser_delegation_delegatedToTouserInput>;
    upsert?: Enumerable<delegationUpsertWithWhereUniqueWithoutUser_delegation_delegatedToTouserInput>;
    createMany?: delegationCreateManyUser_delegation_delegatedToTouserInputEnvelope;
    set?: Enumerable<delegationWhereUniqueInput>;
    disconnect?: Enumerable<delegationWhereUniqueInput>;
    delete?: Enumerable<delegationWhereUniqueInput>;
    connect?: Enumerable<delegationWhereUniqueInput>;
    update?: Enumerable<delegationUpdateWithWhereUniqueWithoutUser_delegation_delegatedToTouserInput>;
    updateMany?: Enumerable<delegationUpdateManyWithWhereWithoutUser_delegation_delegatedToTouserInput>;
    deleteMany?: Enumerable<delegationScalarWhereInput>;
  };

  export type internal_userUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<
      Enumerable<internal_userCreateWithoutUserInput>,
      Enumerable<internal_userUncheckedCreateWithoutUserInput>
    >;
    connectOrCreate?: Enumerable<internal_userCreateOrConnectWithoutUserInput>;
    upsert?: Enumerable<internal_userUpsertWithWhereUniqueWithoutUserInput>;
    createMany?: internal_userCreateManyUserInputEnvelope;
    set?: Enumerable<internal_userWhereUniqueInput>;
    disconnect?: Enumerable<internal_userWhereUniqueInput>;
    delete?: Enumerable<internal_userWhereUniqueInput>;
    connect?: Enumerable<internal_userWhereUniqueInput>;
    update?: Enumerable<internal_userUpdateWithWhereUniqueWithoutUserInput>;
    updateMany?: Enumerable<internal_userUpdateManyWithWhereWithoutUserInput>;
    deleteMany?: Enumerable<internal_userScalarWhereInput>;
  };

  export type reportUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<Enumerable<reportCreateWithoutUserInput>, Enumerable<reportUncheckedCreateWithoutUserInput>>;
    connectOrCreate?: Enumerable<reportCreateOrConnectWithoutUserInput>;
    upsert?: Enumerable<reportUpsertWithWhereUniqueWithoutUserInput>;
    createMany?: reportCreateManyUserInputEnvelope;
    set?: Enumerable<reportWhereUniqueInput>;
    disconnect?: Enumerable<reportWhereUniqueInput>;
    delete?: Enumerable<reportWhereUniqueInput>;
    connect?: Enumerable<reportWhereUniqueInput>;
    update?: Enumerable<reportUpdateWithWhereUniqueWithoutUserInput>;
    updateMany?: Enumerable<reportUpdateManyWithWhereWithoutUserInput>;
    deleteMany?: Enumerable<reportScalarWhereInput>;
  };

  export type userCreateNestedOneWithoutInternal_userInput = {
    create?: XOR<userCreateWithoutInternal_userInput, userUncheckedCreateWithoutInternal_userInput>;
    connectOrCreate?: userCreateOrConnectWithoutInternal_userInput;
    connect?: userWhereUniqueInput;
  };

  export type userUpdateOneRequiredWithoutInternal_userNestedInput = {
    create?: XOR<userCreateWithoutInternal_userInput, userUncheckedCreateWithoutInternal_userInput>;
    connectOrCreate?: userCreateOrConnectWithoutInternal_userInput;
    upsert?: userUpsertWithoutInternal_userInput;
    connect?: userWhereUniqueInput;
    update?: XOR<userUpdateWithoutInternal_userInput, userUncheckedUpdateWithoutInternal_userInput>;
  };

  export type NestedBigIntFilter = {
    equals?: bigint | number;
    in?: Enumerable<bigint> | Enumerable<number> | bigint | number;
    notIn?: Enumerable<bigint> | Enumerable<number> | bigint | number;
    lt?: bigint | number;
    lte?: bigint | number;
    gt?: bigint | number;
    gte?: bigint | number;
    not?: NestedBigIntFilter | bigint | number;
  };

  export type NestedIntFilter = {
    equals?: number;
    in?: Enumerable<number> | number;
    notIn?: Enumerable<number> | number;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntFilter | number;
  };

  export type NestedStringFilter = {
    equals?: string;
    in?: Enumerable<string> | string;
    notIn?: Enumerable<string> | string;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    not?: NestedStringFilter | string;
  };

  export type NestedDateTimeFilter = {
    equals?: Date | string;
    in?: Enumerable<Date> | Enumerable<string> | Date | string;
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string;
    lt?: Date | string;
    lte?: Date | string;
    gt?: Date | string;
    gte?: Date | string;
    not?: NestedDateTimeFilter | Date | string;
  };

  export type NestedStringNullableFilter = {
    equals?: string | null;
    in?: Enumerable<string> | string | null;
    notIn?: Enumerable<string> | string | null;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    not?: NestedStringNullableFilter | string | null;
  };

  export type NestedBoolFilter = {
    equals?: boolean;
    not?: NestedBoolFilter | boolean;
  };

  export type NestedBigIntWithAggregatesFilter = {
    equals?: bigint | number;
    in?: Enumerable<bigint> | Enumerable<number> | bigint | number;
    notIn?: Enumerable<bigint> | Enumerable<number> | bigint | number;
    lt?: bigint | number;
    lte?: bigint | number;
    gt?: bigint | number;
    gte?: bigint | number;
    not?: NestedBigIntWithAggregatesFilter | bigint | number;
    _count?: NestedIntFilter;
    _avg?: NestedFloatFilter;
    _sum?: NestedBigIntFilter;
    _min?: NestedBigIntFilter;
    _max?: NestedBigIntFilter;
  };

  export type NestedFloatFilter = {
    equals?: number;
    in?: Enumerable<number> | number;
    notIn?: Enumerable<number> | number;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedFloatFilter | number;
  };

  export type NestedIntWithAggregatesFilter = {
    equals?: number;
    in?: Enumerable<number> | number;
    notIn?: Enumerable<number> | number;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntWithAggregatesFilter | number;
    _count?: NestedIntFilter;
    _avg?: NestedFloatFilter;
    _sum?: NestedIntFilter;
    _min?: NestedIntFilter;
    _max?: NestedIntFilter;
  };

  export type NestedStringWithAggregatesFilter = {
    equals?: string;
    in?: Enumerable<string> | string;
    notIn?: Enumerable<string> | string;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    not?: NestedStringWithAggregatesFilter | string;
    _count?: NestedIntFilter;
    _min?: NestedStringFilter;
    _max?: NestedStringFilter;
  };

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string;
    in?: Enumerable<Date> | Enumerable<string> | Date | string;
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string;
    lt?: Date | string;
    lte?: Date | string;
    gt?: Date | string;
    gte?: Date | string;
    not?: NestedDateTimeWithAggregatesFilter | Date | string;
    _count?: NestedIntFilter;
    _min?: NestedDateTimeFilter;
    _max?: NestedDateTimeFilter;
  };

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null;
    in?: Enumerable<string> | string | null;
    notIn?: Enumerable<string> | string | null;
    lt?: string;
    lte?: string;
    gt?: string;
    gte?: string;
    contains?: string;
    startsWith?: string;
    endsWith?: string;
    not?: NestedStringNullableWithAggregatesFilter | string | null;
    _count?: NestedIntNullableFilter;
    _min?: NestedStringNullableFilter;
    _max?: NestedStringNullableFilter;
  };

  export type NestedIntNullableFilter = {
    equals?: number | null;
    in?: Enumerable<number> | number | null;
    notIn?: Enumerable<number> | number | null;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntNullableFilter | number | null;
  };

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean;
    not?: NestedBoolWithAggregatesFilter | boolean;
    _count?: NestedIntFilter;
    _min?: NestedBoolFilter;
    _max?: NestedBoolFilter;
  };

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null;
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null;
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null;
    lt?: Date | string;
    lte?: Date | string;
    gt?: Date | string;
    gte?: Date | string;
    not?: NestedDateTimeNullableFilter | Date | string | null;
  };

  export type NestedBoolNullableFilter = {
    equals?: boolean | null;
    not?: NestedBoolNullableFilter | boolean | null;
  };

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null;
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null;
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null;
    lt?: Date | string;
    lte?: Date | string;
    gt?: Date | string;
    gte?: Date | string;
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null;
    _count?: NestedIntNullableFilter;
    _min?: NestedDateTimeNullableFilter;
    _max?: NestedDateTimeNullableFilter;
  };

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null;
    in?: Enumerable<number> | number | null;
    notIn?: Enumerable<number> | number | null;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedIntNullableWithAggregatesFilter | number | null;
    _count?: NestedIntNullableFilter;
    _avg?: NestedFloatNullableFilter;
    _sum?: NestedIntNullableFilter;
    _min?: NestedIntNullableFilter;
    _max?: NestedIntNullableFilter;
  };

  export type NestedFloatNullableFilter = {
    equals?: number | null;
    in?: Enumerable<number> | number | null;
    notIn?: Enumerable<number> | number | null;
    lt?: number;
    lte?: number;
    gt?: number;
    gte?: number;
    not?: NestedFloatNullableFilter | number | null;
  };

  export type NestedBoolNullableWithAggregatesFilter = {
    equals?: boolean | null;
    not?: NestedBoolNullableWithAggregatesFilter | boolean | null;
    _count?: NestedIntNullableFilter;
    _min?: NestedBoolNullableFilter;
    _max?: NestedBoolNullableFilter;
  };

  export type report_to_clauseCreateWithoutClauseInput = {
    id: string;
    report: reportCreateNestedOneWithoutReport_to_clauseInput;
  };

  export type report_to_clauseUncheckedCreateWithoutClauseInput = {
    id: string;
    reportId: string;
  };

  export type report_to_clauseCreateOrConnectWithoutClauseInput = {
    where: report_to_clauseWhereUniqueInput;
    create: XOR<report_to_clauseCreateWithoutClauseInput, report_to_clauseUncheckedCreateWithoutClauseInput>;
  };

  export type report_to_clauseCreateManyClauseInputEnvelope = {
    data: Enumerable<report_to_clauseCreateManyClauseInput>;
    skipDuplicates?: boolean;
  };

  export type report_to_clauseUpsertWithWhereUniqueWithoutClauseInput = {
    where: report_to_clauseWhereUniqueInput;
    update: XOR<report_to_clauseUpdateWithoutClauseInput, report_to_clauseUncheckedUpdateWithoutClauseInput>;
    create: XOR<report_to_clauseCreateWithoutClauseInput, report_to_clauseUncheckedCreateWithoutClauseInput>;
  };

  export type report_to_clauseUpdateWithWhereUniqueWithoutClauseInput = {
    where: report_to_clauseWhereUniqueInput;
    data: XOR<report_to_clauseUpdateWithoutClauseInput, report_to_clauseUncheckedUpdateWithoutClauseInput>;
  };

  export type report_to_clauseUpdateManyWithWhereWithoutClauseInput = {
    where: report_to_clauseScalarWhereInput;
    data: XOR<report_to_clauseUpdateManyMutationInput, report_to_clauseUncheckedUpdateManyWithoutReport_to_clauseInput>;
  };

  export type report_to_clauseScalarWhereInput = {
    AND?: Enumerable<report_to_clauseScalarWhereInput>;
    OR?: Enumerable<report_to_clauseScalarWhereInput>;
    NOT?: Enumerable<report_to_clauseScalarWhereInput>;
    id?: StringFilter | string;
    reportId?: StringFilter | string;
    clauseId?: StringFilter | string;
  };

  export type userCreateWithoutReportInput = {
    id: string;
    name: string;
    delegation_delegation_createdByTouser?: delegationCreateNestedManyWithoutUser_delegation_createdByTouserInput;
    delegation_delegation_delegatedToTouser?: delegationCreateNestedManyWithoutUser_delegation_delegatedToTouserInput;
    internal_user?: internal_userCreateNestedManyWithoutUserInput;
    udap: udapCreateNestedOneWithoutUserInput;
  };

  export type userUncheckedCreateWithoutReportInput = {
    id: string;
    name: string;
    udap_id: string;
    delegation_delegation_createdByTouser?: delegationUncheckedCreateNestedManyWithoutUser_delegation_createdByTouserInput;
    delegation_delegation_delegatedToTouser?: delegationUncheckedCreateNestedManyWithoutUser_delegation_delegatedToTouserInput;
    internal_user?: internal_userUncheckedCreateNestedManyWithoutUserInput;
  };

  export type userCreateOrConnectWithoutReportInput = {
    where: userWhereUniqueInput;
    create: XOR<userCreateWithoutReportInput, userUncheckedCreateWithoutReportInput>;
  };

  export type report_to_clauseCreateWithoutReportInput = {
    id: string;
    clause: clauseCreateNestedOneWithoutReport_to_clauseInput;
  };

  export type report_to_clauseUncheckedCreateWithoutReportInput = {
    id: string;
    clauseId: string;
  };

  export type report_to_clauseCreateOrConnectWithoutReportInput = {
    where: report_to_clauseWhereUniqueInput;
    create: XOR<report_to_clauseCreateWithoutReportInput, report_to_clauseUncheckedCreateWithoutReportInput>;
  };

  export type report_to_clauseCreateManyReportInputEnvelope = {
    data: Enumerable<report_to_clauseCreateManyReportInput>;
    skipDuplicates?: boolean;
  };

  export type userUpsertWithoutReportInput = {
    update: XOR<userUpdateWithoutReportInput, userUncheckedUpdateWithoutReportInput>;
    create: XOR<userCreateWithoutReportInput, userUncheckedCreateWithoutReportInput>;
  };

  export type userUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    delegation_delegation_createdByTouser?: delegationUpdateManyWithoutUser_delegation_createdByTouserNestedInput;
    delegation_delegation_delegatedToTouser?: delegationUpdateManyWithoutUser_delegation_delegatedToTouserNestedInput;
    internal_user?: internal_userUpdateManyWithoutUserNestedInput;
    udap?: udapUpdateOneRequiredWithoutUserNestedInput;
  };

  export type userUncheckedUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    udap_id?: StringFieldUpdateOperationsInput | string;
    delegation_delegation_createdByTouser?: delegationUncheckedUpdateManyWithoutUser_delegation_createdByTouserNestedInput;
    delegation_delegation_delegatedToTouser?: delegationUncheckedUpdateManyWithoutUser_delegation_delegatedToTouserNestedInput;
    internal_user?: internal_userUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type report_to_clauseUpsertWithWhereUniqueWithoutReportInput = {
    where: report_to_clauseWhereUniqueInput;
    update: XOR<report_to_clauseUpdateWithoutReportInput, report_to_clauseUncheckedUpdateWithoutReportInput>;
    create: XOR<report_to_clauseCreateWithoutReportInput, report_to_clauseUncheckedCreateWithoutReportInput>;
  };

  export type report_to_clauseUpdateWithWhereUniqueWithoutReportInput = {
    where: report_to_clauseWhereUniqueInput;
    data: XOR<report_to_clauseUpdateWithoutReportInput, report_to_clauseUncheckedUpdateWithoutReportInput>;
  };

  export type report_to_clauseUpdateManyWithWhereWithoutReportInput = {
    where: report_to_clauseScalarWhereInput;
    data: XOR<report_to_clauseUpdateManyMutationInput, report_to_clauseUncheckedUpdateManyWithoutReport_to_clauseInput>;
  };

  export type clauseCreateWithoutReport_to_clauseInput = {
    id: string;
    label: string;
    value: string;
  };

  export type clauseUncheckedCreateWithoutReport_to_clauseInput = {
    id: string;
    label: string;
    value: string;
  };

  export type clauseCreateOrConnectWithoutReport_to_clauseInput = {
    where: clauseWhereUniqueInput;
    create: XOR<clauseCreateWithoutReport_to_clauseInput, clauseUncheckedCreateWithoutReport_to_clauseInput>;
  };

  export type reportCreateWithoutReport_to_clauseInput = {
    id: string;
    title?: string | null;
    projectDescription?: string | null;
    redactedBy?: string | null;
    meetDate?: Date | string | null;
    applicantName?: string | null;
    applicantAddress?: string | null;
    projectCadastralRef?: string | null;
    projectSpaceType?: string | null;
    decision?: string | null;
    precisions?: string | null;
    contacts?: string | null;
    furtherInformation?: string | null;
    createdAt: Date | string;
    serviceInstructeur?: number | null;
    pdf?: string | null;
    disabled?: boolean | null;
    udap_id?: string | null;
    user: userCreateNestedOneWithoutReportInput;
  };

  export type reportUncheckedCreateWithoutReport_to_clauseInput = {
    id: string;
    title?: string | null;
    projectDescription?: string | null;
    redactedBy?: string | null;
    meetDate?: Date | string | null;
    applicantName?: string | null;
    applicantAddress?: string | null;
    projectCadastralRef?: string | null;
    projectSpaceType?: string | null;
    decision?: string | null;
    precisions?: string | null;
    contacts?: string | null;
    furtherInformation?: string | null;
    createdBy: string;
    createdAt: Date | string;
    serviceInstructeur?: number | null;
    pdf?: string | null;
    disabled?: boolean | null;
    udap_id?: string | null;
  };

  export type reportCreateOrConnectWithoutReport_to_clauseInput = {
    where: reportWhereUniqueInput;
    create: XOR<reportCreateWithoutReport_to_clauseInput, reportUncheckedCreateWithoutReport_to_clauseInput>;
  };

  export type clauseUpsertWithoutReport_to_clauseInput = {
    update: XOR<clauseUpdateWithoutReport_to_clauseInput, clauseUncheckedUpdateWithoutReport_to_clauseInput>;
    create: XOR<clauseCreateWithoutReport_to_clauseInput, clauseUncheckedCreateWithoutReport_to_clauseInput>;
  };

  export type clauseUpdateWithoutReport_to_clauseInput = {
    id?: StringFieldUpdateOperationsInput | string;
    label?: StringFieldUpdateOperationsInput | string;
    value?: StringFieldUpdateOperationsInput | string;
  };

  export type clauseUncheckedUpdateWithoutReport_to_clauseInput = {
    id?: StringFieldUpdateOperationsInput | string;
    label?: StringFieldUpdateOperationsInput | string;
    value?: StringFieldUpdateOperationsInput | string;
  };

  export type reportUpsertWithoutReport_to_clauseInput = {
    update: XOR<reportUpdateWithoutReport_to_clauseInput, reportUncheckedUpdateWithoutReport_to_clauseInput>;
    create: XOR<reportCreateWithoutReport_to_clauseInput, reportUncheckedCreateWithoutReport_to_clauseInput>;
  };

  export type reportUpdateWithoutReport_to_clauseInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: NullableStringFieldUpdateOperationsInput | string | null;
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    redactedBy?: NullableStringFieldUpdateOperationsInput | string | null;
    meetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null;
    applicantAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    projectCadastralRef?: NullableStringFieldUpdateOperationsInput | string | null;
    projectSpaceType?: NullableStringFieldUpdateOperationsInput | string | null;
    decision?: NullableStringFieldUpdateOperationsInput | string | null;
    precisions?: NullableStringFieldUpdateOperationsInput | string | null;
    contacts?: NullableStringFieldUpdateOperationsInput | string | null;
    furtherInformation?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    serviceInstructeur?: NullableIntFieldUpdateOperationsInput | number | null;
    pdf?: NullableStringFieldUpdateOperationsInput | string | null;
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    udap_id?: NullableStringFieldUpdateOperationsInput | string | null;
    user?: userUpdateOneRequiredWithoutReportNestedInput;
  };

  export type reportUncheckedUpdateWithoutReport_to_clauseInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: NullableStringFieldUpdateOperationsInput | string | null;
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    redactedBy?: NullableStringFieldUpdateOperationsInput | string | null;
    meetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null;
    applicantAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    projectCadastralRef?: NullableStringFieldUpdateOperationsInput | string | null;
    projectSpaceType?: NullableStringFieldUpdateOperationsInput | string | null;
    decision?: NullableStringFieldUpdateOperationsInput | string | null;
    precisions?: NullableStringFieldUpdateOperationsInput | string | null;
    contacts?: NullableStringFieldUpdateOperationsInput | string | null;
    furtherInformation?: NullableStringFieldUpdateOperationsInput | string | null;
    createdBy?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    serviceInstructeur?: NullableIntFieldUpdateOperationsInput | number | null;
    pdf?: NullableStringFieldUpdateOperationsInput | string | null;
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    udap_id?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type userCreateWithoutDelegation_delegation_createdByTouserInput = {
    id: string;
    name: string;
    delegation_delegation_delegatedToTouser?: delegationCreateNestedManyWithoutUser_delegation_delegatedToTouserInput;
    internal_user?: internal_userCreateNestedManyWithoutUserInput;
    report?: reportCreateNestedManyWithoutUserInput;
    udap: udapCreateNestedOneWithoutUserInput;
  };

  export type userUncheckedCreateWithoutDelegation_delegation_createdByTouserInput = {
    id: string;
    name: string;
    udap_id: string;
    delegation_delegation_delegatedToTouser?: delegationUncheckedCreateNestedManyWithoutUser_delegation_delegatedToTouserInput;
    internal_user?: internal_userUncheckedCreateNestedManyWithoutUserInput;
    report?: reportUncheckedCreateNestedManyWithoutUserInput;
  };

  export type userCreateOrConnectWithoutDelegation_delegation_createdByTouserInput = {
    where: userWhereUniqueInput;
    create: XOR<
      userCreateWithoutDelegation_delegation_createdByTouserInput,
      userUncheckedCreateWithoutDelegation_delegation_createdByTouserInput
    >;
  };

  export type userCreateWithoutDelegation_delegation_delegatedToTouserInput = {
    id: string;
    name: string;
    delegation_delegation_createdByTouser?: delegationCreateNestedManyWithoutUser_delegation_createdByTouserInput;
    internal_user?: internal_userCreateNestedManyWithoutUserInput;
    report?: reportCreateNestedManyWithoutUserInput;
    udap: udapCreateNestedOneWithoutUserInput;
  };

  export type userUncheckedCreateWithoutDelegation_delegation_delegatedToTouserInput = {
    id: string;
    name: string;
    udap_id: string;
    delegation_delegation_createdByTouser?: delegationUncheckedCreateNestedManyWithoutUser_delegation_createdByTouserInput;
    internal_user?: internal_userUncheckedCreateNestedManyWithoutUserInput;
    report?: reportUncheckedCreateNestedManyWithoutUserInput;
  };

  export type userCreateOrConnectWithoutDelegation_delegation_delegatedToTouserInput = {
    where: userWhereUniqueInput;
    create: XOR<
      userCreateWithoutDelegation_delegation_delegatedToTouserInput,
      userUncheckedCreateWithoutDelegation_delegation_delegatedToTouserInput
    >;
  };

  export type userUpsertWithoutDelegation_delegation_createdByTouserInput = {
    update: XOR<
      userUpdateWithoutDelegation_delegation_createdByTouserInput,
      userUncheckedUpdateWithoutDelegation_delegation_createdByTouserInput
    >;
    create: XOR<
      userCreateWithoutDelegation_delegation_createdByTouserInput,
      userUncheckedCreateWithoutDelegation_delegation_createdByTouserInput
    >;
  };

  export type userUpdateWithoutDelegation_delegation_createdByTouserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    delegation_delegation_delegatedToTouser?: delegationUpdateManyWithoutUser_delegation_delegatedToTouserNestedInput;
    internal_user?: internal_userUpdateManyWithoutUserNestedInput;
    report?: reportUpdateManyWithoutUserNestedInput;
    udap?: udapUpdateOneRequiredWithoutUserNestedInput;
  };

  export type userUncheckedUpdateWithoutDelegation_delegation_createdByTouserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    udap_id?: StringFieldUpdateOperationsInput | string;
    delegation_delegation_delegatedToTouser?: delegationUncheckedUpdateManyWithoutUser_delegation_delegatedToTouserNestedInput;
    internal_user?: internal_userUncheckedUpdateManyWithoutUserNestedInput;
    report?: reportUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type userUpsertWithoutDelegation_delegation_delegatedToTouserInput = {
    update: XOR<
      userUpdateWithoutDelegation_delegation_delegatedToTouserInput,
      userUncheckedUpdateWithoutDelegation_delegation_delegatedToTouserInput
    >;
    create: XOR<
      userCreateWithoutDelegation_delegation_delegatedToTouserInput,
      userUncheckedCreateWithoutDelegation_delegation_delegatedToTouserInput
    >;
  };

  export type userUpdateWithoutDelegation_delegation_delegatedToTouserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    delegation_delegation_createdByTouser?: delegationUpdateManyWithoutUser_delegation_createdByTouserNestedInput;
    internal_user?: internal_userUpdateManyWithoutUserNestedInput;
    report?: reportUpdateManyWithoutUserNestedInput;
    udap?: udapUpdateOneRequiredWithoutUserNestedInput;
  };

  export type userUncheckedUpdateWithoutDelegation_delegation_delegatedToTouserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    udap_id?: StringFieldUpdateOperationsInput | string;
    delegation_delegation_createdByTouser?: delegationUncheckedUpdateManyWithoutUser_delegation_createdByTouserNestedInput;
    internal_user?: internal_userUncheckedUpdateManyWithoutUserNestedInput;
    report?: reportUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type userCreateWithoutUdapInput = {
    id: string;
    name: string;
    delegation_delegation_createdByTouser?: delegationCreateNestedManyWithoutUser_delegation_createdByTouserInput;
    delegation_delegation_delegatedToTouser?: delegationCreateNestedManyWithoutUser_delegation_delegatedToTouserInput;
    internal_user?: internal_userCreateNestedManyWithoutUserInput;
    report?: reportCreateNestedManyWithoutUserInput;
  };

  export type userUncheckedCreateWithoutUdapInput = {
    id: string;
    name: string;
    delegation_delegation_createdByTouser?: delegationUncheckedCreateNestedManyWithoutUser_delegation_createdByTouserInput;
    delegation_delegation_delegatedToTouser?: delegationUncheckedCreateNestedManyWithoutUser_delegation_delegatedToTouserInput;
    internal_user?: internal_userUncheckedCreateNestedManyWithoutUserInput;
    report?: reportUncheckedCreateNestedManyWithoutUserInput;
  };

  export type userCreateOrConnectWithoutUdapInput = {
    where: userWhereUniqueInput;
    create: XOR<userCreateWithoutUdapInput, userUncheckedCreateWithoutUdapInput>;
  };

  export type userCreateManyUdapInputEnvelope = {
    data: Enumerable<userCreateManyUdapInput>;
    skipDuplicates?: boolean;
  };

  export type userUpsertWithWhereUniqueWithoutUdapInput = {
    where: userWhereUniqueInput;
    update: XOR<userUpdateWithoutUdapInput, userUncheckedUpdateWithoutUdapInput>;
    create: XOR<userCreateWithoutUdapInput, userUncheckedCreateWithoutUdapInput>;
  };

  export type userUpdateWithWhereUniqueWithoutUdapInput = {
    where: userWhereUniqueInput;
    data: XOR<userUpdateWithoutUdapInput, userUncheckedUpdateWithoutUdapInput>;
  };

  export type userUpdateManyWithWhereWithoutUdapInput = {
    where: userScalarWhereInput;
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyWithoutUserInput>;
  };

  export type userScalarWhereInput = {
    AND?: Enumerable<userScalarWhereInput>;
    OR?: Enumerable<userScalarWhereInput>;
    NOT?: Enumerable<userScalarWhereInput>;
    id?: StringFilter | string;
    name?: StringFilter | string;
    udap_id?: StringFilter | string;
  };

  export type delegationCreateWithoutUser_delegation_createdByTouserInput = {
    user_delegation_delegatedToTouser: userCreateNestedOneWithoutDelegation_delegation_delegatedToTouserInput;
  };

  export type delegationUncheckedCreateWithoutUser_delegation_createdByTouserInput = {
    delegatedTo: string;
  };

  export type delegationCreateOrConnectWithoutUser_delegation_createdByTouserInput = {
    where: delegationWhereUniqueInput;
    create: XOR<
      delegationCreateWithoutUser_delegation_createdByTouserInput,
      delegationUncheckedCreateWithoutUser_delegation_createdByTouserInput
    >;
  };

  export type delegationCreateManyUser_delegation_createdByTouserInputEnvelope = {
    data: Enumerable<delegationCreateManyUser_delegation_createdByTouserInput>;
    skipDuplicates?: boolean;
  };

  export type delegationCreateWithoutUser_delegation_delegatedToTouserInput = {
    user_delegation_createdByTouser: userCreateNestedOneWithoutDelegation_delegation_createdByTouserInput;
  };

  export type delegationUncheckedCreateWithoutUser_delegation_delegatedToTouserInput = {
    createdBy: string;
  };

  export type delegationCreateOrConnectWithoutUser_delegation_delegatedToTouserInput = {
    where: delegationWhereUniqueInput;
    create: XOR<
      delegationCreateWithoutUser_delegation_delegatedToTouserInput,
      delegationUncheckedCreateWithoutUser_delegation_delegatedToTouserInput
    >;
  };

  export type delegationCreateManyUser_delegation_delegatedToTouserInputEnvelope = {
    data: Enumerable<delegationCreateManyUser_delegation_delegatedToTouserInput>;
    skipDuplicates?: boolean;
  };

  export type internal_userCreateWithoutUserInput = {
    id: string;
    email: string;
    role: string;
    password: string;
    temporaryLink?: string | null;
    temporaryLinkExpiresAt?: string | null;
  };

  export type internal_userUncheckedCreateWithoutUserInput = {
    id: string;
    email: string;
    role: string;
    password: string;
    temporaryLink?: string | null;
    temporaryLinkExpiresAt?: string | null;
  };

  export type internal_userCreateOrConnectWithoutUserInput = {
    where: internal_userWhereUniqueInput;
    create: XOR<internal_userCreateWithoutUserInput, internal_userUncheckedCreateWithoutUserInput>;
  };

  export type internal_userCreateManyUserInputEnvelope = {
    data: Enumerable<internal_userCreateManyUserInput>;
    skipDuplicates?: boolean;
  };

  export type reportCreateWithoutUserInput = {
    id: string;
    title?: string | null;
    projectDescription?: string | null;
    redactedBy?: string | null;
    meetDate?: Date | string | null;
    applicantName?: string | null;
    applicantAddress?: string | null;
    projectCadastralRef?: string | null;
    projectSpaceType?: string | null;
    decision?: string | null;
    precisions?: string | null;
    contacts?: string | null;
    furtherInformation?: string | null;
    createdAt: Date | string;
    serviceInstructeur?: number | null;
    pdf?: string | null;
    disabled?: boolean | null;
    udap_id?: string | null;
    report_to_clause?: report_to_clauseCreateNestedManyWithoutReportInput;
  };

  export type reportUncheckedCreateWithoutUserInput = {
    id: string;
    title?: string | null;
    projectDescription?: string | null;
    redactedBy?: string | null;
    meetDate?: Date | string | null;
    applicantName?: string | null;
    applicantAddress?: string | null;
    projectCadastralRef?: string | null;
    projectSpaceType?: string | null;
    decision?: string | null;
    precisions?: string | null;
    contacts?: string | null;
    furtherInformation?: string | null;
    createdAt: Date | string;
    serviceInstructeur?: number | null;
    pdf?: string | null;
    disabled?: boolean | null;
    udap_id?: string | null;
    report_to_clause?: report_to_clauseUncheckedCreateNestedManyWithoutReportInput;
  };

  export type reportCreateOrConnectWithoutUserInput = {
    where: reportWhereUniqueInput;
    create: XOR<reportCreateWithoutUserInput, reportUncheckedCreateWithoutUserInput>;
  };

  export type reportCreateManyUserInputEnvelope = {
    data: Enumerable<reportCreateManyUserInput>;
    skipDuplicates?: boolean;
  };

  export type udapCreateWithoutUserInput = {
    id: string;
    department: string;
    completeCoords?: string | null;
    visible?: boolean | null;
    name?: string | null;
    address?: string | null;
    zipCode?: string | null;
    city?: string | null;
    phone?: string | null;
    email?: string | null;
  };

  export type udapUncheckedCreateWithoutUserInput = {
    id: string;
    department: string;
    completeCoords?: string | null;
    visible?: boolean | null;
    name?: string | null;
    address?: string | null;
    zipCode?: string | null;
    city?: string | null;
    phone?: string | null;
    email?: string | null;
  };

  export type udapCreateOrConnectWithoutUserInput = {
    where: udapWhereUniqueInput;
    create: XOR<udapCreateWithoutUserInput, udapUncheckedCreateWithoutUserInput>;
  };

  export type delegationUpsertWithWhereUniqueWithoutUser_delegation_createdByTouserInput = {
    where: delegationWhereUniqueInput;
    update: XOR<
      delegationUpdateWithoutUser_delegation_createdByTouserInput,
      delegationUncheckedUpdateWithoutUser_delegation_createdByTouserInput
    >;
    create: XOR<
      delegationCreateWithoutUser_delegation_createdByTouserInput,
      delegationUncheckedCreateWithoutUser_delegation_createdByTouserInput
    >;
  };

  export type delegationUpdateWithWhereUniqueWithoutUser_delegation_createdByTouserInput = {
    where: delegationWhereUniqueInput;
    data: XOR<
      delegationUpdateWithoutUser_delegation_createdByTouserInput,
      delegationUncheckedUpdateWithoutUser_delegation_createdByTouserInput
    >;
  };

  export type delegationUpdateManyWithWhereWithoutUser_delegation_createdByTouserInput = {
    where: delegationScalarWhereInput;
    data: XOR<
      delegationUpdateManyMutationInput,
      delegationUncheckedUpdateManyWithoutDelegation_delegation_createdByTouserInput
    >;
  };

  export type delegationScalarWhereInput = {
    AND?: Enumerable<delegationScalarWhereInput>;
    OR?: Enumerable<delegationScalarWhereInput>;
    NOT?: Enumerable<delegationScalarWhereInput>;
    createdBy?: StringFilter | string;
    delegatedTo?: StringFilter | string;
  };

  export type delegationUpsertWithWhereUniqueWithoutUser_delegation_delegatedToTouserInput = {
    where: delegationWhereUniqueInput;
    update: XOR<
      delegationUpdateWithoutUser_delegation_delegatedToTouserInput,
      delegationUncheckedUpdateWithoutUser_delegation_delegatedToTouserInput
    >;
    create: XOR<
      delegationCreateWithoutUser_delegation_delegatedToTouserInput,
      delegationUncheckedCreateWithoutUser_delegation_delegatedToTouserInput
    >;
  };

  export type delegationUpdateWithWhereUniqueWithoutUser_delegation_delegatedToTouserInput = {
    where: delegationWhereUniqueInput;
    data: XOR<
      delegationUpdateWithoutUser_delegation_delegatedToTouserInput,
      delegationUncheckedUpdateWithoutUser_delegation_delegatedToTouserInput
    >;
  };

  export type delegationUpdateManyWithWhereWithoutUser_delegation_delegatedToTouserInput = {
    where: delegationScalarWhereInput;
    data: XOR<
      delegationUpdateManyMutationInput,
      delegationUncheckedUpdateManyWithoutDelegation_delegation_delegatedToTouserInput
    >;
  };

  export type internal_userUpsertWithWhereUniqueWithoutUserInput = {
    where: internal_userWhereUniqueInput;
    update: XOR<internal_userUpdateWithoutUserInput, internal_userUncheckedUpdateWithoutUserInput>;
    create: XOR<internal_userCreateWithoutUserInput, internal_userUncheckedCreateWithoutUserInput>;
  };

  export type internal_userUpdateWithWhereUniqueWithoutUserInput = {
    where: internal_userWhereUniqueInput;
    data: XOR<internal_userUpdateWithoutUserInput, internal_userUncheckedUpdateWithoutUserInput>;
  };

  export type internal_userUpdateManyWithWhereWithoutUserInput = {
    where: internal_userScalarWhereInput;
    data: XOR<internal_userUpdateManyMutationInput, internal_userUncheckedUpdateManyWithoutInternal_userInput>;
  };

  export type internal_userScalarWhereInput = {
    AND?: Enumerable<internal_userScalarWhereInput>;
    OR?: Enumerable<internal_userScalarWhereInput>;
    NOT?: Enumerable<internal_userScalarWhereInput>;
    id?: StringFilter | string;
    email?: StringFilter | string;
    role?: StringFilter | string;
    password?: StringFilter | string;
    temporaryLink?: StringNullableFilter | string | null;
    temporaryLinkExpiresAt?: StringNullableFilter | string | null;
    userId?: StringFilter | string;
  };

  export type reportUpsertWithWhereUniqueWithoutUserInput = {
    where: reportWhereUniqueInput;
    update: XOR<reportUpdateWithoutUserInput, reportUncheckedUpdateWithoutUserInput>;
    create: XOR<reportCreateWithoutUserInput, reportUncheckedCreateWithoutUserInput>;
  };

  export type reportUpdateWithWhereUniqueWithoutUserInput = {
    where: reportWhereUniqueInput;
    data: XOR<reportUpdateWithoutUserInput, reportUncheckedUpdateWithoutUserInput>;
  };

  export type reportUpdateManyWithWhereWithoutUserInput = {
    where: reportScalarWhereInput;
    data: XOR<reportUpdateManyMutationInput, reportUncheckedUpdateManyWithoutReportInput>;
  };

  export type reportScalarWhereInput = {
    AND?: Enumerable<reportScalarWhereInput>;
    OR?: Enumerable<reportScalarWhereInput>;
    NOT?: Enumerable<reportScalarWhereInput>;
    id?: StringFilter | string;
    title?: StringNullableFilter | string | null;
    projectDescription?: StringNullableFilter | string | null;
    redactedBy?: StringNullableFilter | string | null;
    meetDate?: DateTimeNullableFilter | Date | string | null;
    applicantName?: StringNullableFilter | string | null;
    applicantAddress?: StringNullableFilter | string | null;
    projectCadastralRef?: StringNullableFilter | string | null;
    projectSpaceType?: StringNullableFilter | string | null;
    decision?: StringNullableFilter | string | null;
    precisions?: StringNullableFilter | string | null;
    contacts?: StringNullableFilter | string | null;
    furtherInformation?: StringNullableFilter | string | null;
    createdBy?: StringFilter | string;
    createdAt?: DateTimeFilter | Date | string;
    serviceInstructeur?: IntNullableFilter | number | null;
    pdf?: StringNullableFilter | string | null;
    disabled?: BoolNullableFilter | boolean | null;
    udap_id?: StringNullableFilter | string | null;
  };

  export type udapUpsertWithoutUserInput = {
    update: XOR<udapUpdateWithoutUserInput, udapUncheckedUpdateWithoutUserInput>;
    create: XOR<udapCreateWithoutUserInput, udapUncheckedCreateWithoutUserInput>;
  };

  export type udapUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    department?: StringFieldUpdateOperationsInput | string;
    completeCoords?: NullableStringFieldUpdateOperationsInput | string | null;
    visible?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null;
    city?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type udapUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    department?: StringFieldUpdateOperationsInput | string;
    completeCoords?: NullableStringFieldUpdateOperationsInput | string | null;
    visible?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    address?: NullableStringFieldUpdateOperationsInput | string | null;
    zipCode?: NullableStringFieldUpdateOperationsInput | string | null;
    city?: NullableStringFieldUpdateOperationsInput | string | null;
    phone?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type userCreateWithoutInternal_userInput = {
    id: string;
    name: string;
    delegation_delegation_createdByTouser?: delegationCreateNestedManyWithoutUser_delegation_createdByTouserInput;
    delegation_delegation_delegatedToTouser?: delegationCreateNestedManyWithoutUser_delegation_delegatedToTouserInput;
    report?: reportCreateNestedManyWithoutUserInput;
    udap: udapCreateNestedOneWithoutUserInput;
  };

  export type userUncheckedCreateWithoutInternal_userInput = {
    id: string;
    name: string;
    udap_id: string;
    delegation_delegation_createdByTouser?: delegationUncheckedCreateNestedManyWithoutUser_delegation_createdByTouserInput;
    delegation_delegation_delegatedToTouser?: delegationUncheckedCreateNestedManyWithoutUser_delegation_delegatedToTouserInput;
    report?: reportUncheckedCreateNestedManyWithoutUserInput;
  };

  export type userCreateOrConnectWithoutInternal_userInput = {
    where: userWhereUniqueInput;
    create: XOR<userCreateWithoutInternal_userInput, userUncheckedCreateWithoutInternal_userInput>;
  };

  export type userUpsertWithoutInternal_userInput = {
    update: XOR<userUpdateWithoutInternal_userInput, userUncheckedUpdateWithoutInternal_userInput>;
    create: XOR<userCreateWithoutInternal_userInput, userUncheckedCreateWithoutInternal_userInput>;
  };

  export type userUpdateWithoutInternal_userInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    delegation_delegation_createdByTouser?: delegationUpdateManyWithoutUser_delegation_createdByTouserNestedInput;
    delegation_delegation_delegatedToTouser?: delegationUpdateManyWithoutUser_delegation_delegatedToTouserNestedInput;
    report?: reportUpdateManyWithoutUserNestedInput;
    udap?: udapUpdateOneRequiredWithoutUserNestedInput;
  };

  export type userUncheckedUpdateWithoutInternal_userInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    udap_id?: StringFieldUpdateOperationsInput | string;
    delegation_delegation_createdByTouser?: delegationUncheckedUpdateManyWithoutUser_delegation_createdByTouserNestedInput;
    delegation_delegation_delegatedToTouser?: delegationUncheckedUpdateManyWithoutUser_delegation_delegatedToTouserNestedInput;
    report?: reportUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type report_to_clauseCreateManyClauseInput = {
    id: string;
    reportId: string;
  };

  export type report_to_clauseUpdateWithoutClauseInput = {
    id?: StringFieldUpdateOperationsInput | string;
    report?: reportUpdateOneRequiredWithoutReport_to_clauseNestedInput;
  };

  export type report_to_clauseUncheckedUpdateWithoutClauseInput = {
    id?: StringFieldUpdateOperationsInput | string;
    reportId?: StringFieldUpdateOperationsInput | string;
  };

  export type report_to_clauseUncheckedUpdateManyWithoutReport_to_clauseInput = {
    id?: StringFieldUpdateOperationsInput | string;
    reportId?: StringFieldUpdateOperationsInput | string;
  };

  export type report_to_clauseCreateManyReportInput = {
    id: string;
    clauseId: string;
  };

  export type report_to_clauseUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string;
    clause?: clauseUpdateOneRequiredWithoutReport_to_clauseNestedInput;
  };

  export type report_to_clauseUncheckedUpdateWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string;
    clauseId?: StringFieldUpdateOperationsInput | string;
  };

  export type userCreateManyUdapInput = {
    id: string;
    name: string;
  };

  export type userUpdateWithoutUdapInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    delegation_delegation_createdByTouser?: delegationUpdateManyWithoutUser_delegation_createdByTouserNestedInput;
    delegation_delegation_delegatedToTouser?: delegationUpdateManyWithoutUser_delegation_delegatedToTouserNestedInput;
    internal_user?: internal_userUpdateManyWithoutUserNestedInput;
    report?: reportUpdateManyWithoutUserNestedInput;
  };

  export type userUncheckedUpdateWithoutUdapInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    delegation_delegation_createdByTouser?: delegationUncheckedUpdateManyWithoutUser_delegation_createdByTouserNestedInput;
    delegation_delegation_delegatedToTouser?: delegationUncheckedUpdateManyWithoutUser_delegation_delegatedToTouserNestedInput;
    internal_user?: internal_userUncheckedUpdateManyWithoutUserNestedInput;
    report?: reportUncheckedUpdateManyWithoutUserNestedInput;
  };

  export type userUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
  };

  export type delegationCreateManyUser_delegation_createdByTouserInput = {
    delegatedTo: string;
  };

  export type delegationCreateManyUser_delegation_delegatedToTouserInput = {
    createdBy: string;
  };

  export type internal_userCreateManyUserInput = {
    id: string;
    email: string;
    role: string;
    password: string;
    temporaryLink?: string | null;
    temporaryLinkExpiresAt?: string | null;
  };

  export type reportCreateManyUserInput = {
    id: string;
    title?: string | null;
    projectDescription?: string | null;
    redactedBy?: string | null;
    meetDate?: Date | string | null;
    applicantName?: string | null;
    applicantAddress?: string | null;
    projectCadastralRef?: string | null;
    projectSpaceType?: string | null;
    decision?: string | null;
    precisions?: string | null;
    contacts?: string | null;
    furtherInformation?: string | null;
    createdAt: Date | string;
    serviceInstructeur?: number | null;
    pdf?: string | null;
    disabled?: boolean | null;
    udap_id?: string | null;
  };

  export type delegationUpdateWithoutUser_delegation_createdByTouserInput = {
    user_delegation_delegatedToTouser?: userUpdateOneRequiredWithoutDelegation_delegation_delegatedToTouserNestedInput;
  };

  export type delegationUncheckedUpdateWithoutUser_delegation_createdByTouserInput = {
    delegatedTo?: StringFieldUpdateOperationsInput | string;
  };

  export type delegationUncheckedUpdateManyWithoutDelegation_delegation_createdByTouserInput = {
    delegatedTo?: StringFieldUpdateOperationsInput | string;
  };

  export type delegationUpdateWithoutUser_delegation_delegatedToTouserInput = {
    user_delegation_createdByTouser?: userUpdateOneRequiredWithoutDelegation_delegation_createdByTouserNestedInput;
  };

  export type delegationUncheckedUpdateWithoutUser_delegation_delegatedToTouserInput = {
    createdBy?: StringFieldUpdateOperationsInput | string;
  };

  export type delegationUncheckedUpdateManyWithoutDelegation_delegation_delegatedToTouserInput = {
    createdBy?: StringFieldUpdateOperationsInput | string;
  };

  export type internal_userUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    temporaryLink?: NullableStringFieldUpdateOperationsInput | string | null;
    temporaryLinkExpiresAt?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type internal_userUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    temporaryLink?: NullableStringFieldUpdateOperationsInput | string | null;
    temporaryLinkExpiresAt?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type internal_userUncheckedUpdateManyWithoutInternal_userInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    role?: StringFieldUpdateOperationsInput | string;
    password?: StringFieldUpdateOperationsInput | string;
    temporaryLink?: NullableStringFieldUpdateOperationsInput | string | null;
    temporaryLinkExpiresAt?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  export type reportUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: NullableStringFieldUpdateOperationsInput | string | null;
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    redactedBy?: NullableStringFieldUpdateOperationsInput | string | null;
    meetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null;
    applicantAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    projectCadastralRef?: NullableStringFieldUpdateOperationsInput | string | null;
    projectSpaceType?: NullableStringFieldUpdateOperationsInput | string | null;
    decision?: NullableStringFieldUpdateOperationsInput | string | null;
    precisions?: NullableStringFieldUpdateOperationsInput | string | null;
    contacts?: NullableStringFieldUpdateOperationsInput | string | null;
    furtherInformation?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    serviceInstructeur?: NullableIntFieldUpdateOperationsInput | number | null;
    pdf?: NullableStringFieldUpdateOperationsInput | string | null;
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    udap_id?: NullableStringFieldUpdateOperationsInput | string | null;
    report_to_clause?: report_to_clauseUpdateManyWithoutReportNestedInput;
  };

  export type reportUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: NullableStringFieldUpdateOperationsInput | string | null;
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    redactedBy?: NullableStringFieldUpdateOperationsInput | string | null;
    meetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null;
    applicantAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    projectCadastralRef?: NullableStringFieldUpdateOperationsInput | string | null;
    projectSpaceType?: NullableStringFieldUpdateOperationsInput | string | null;
    decision?: NullableStringFieldUpdateOperationsInput | string | null;
    precisions?: NullableStringFieldUpdateOperationsInput | string | null;
    contacts?: NullableStringFieldUpdateOperationsInput | string | null;
    furtherInformation?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    serviceInstructeur?: NullableIntFieldUpdateOperationsInput | number | null;
    pdf?: NullableStringFieldUpdateOperationsInput | string | null;
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    udap_id?: NullableStringFieldUpdateOperationsInput | string | null;
    report_to_clause?: report_to_clauseUncheckedUpdateManyWithoutReportNestedInput;
  };

  export type reportUncheckedUpdateManyWithoutReportInput = {
    id?: StringFieldUpdateOperationsInput | string;
    title?: NullableStringFieldUpdateOperationsInput | string | null;
    projectDescription?: NullableStringFieldUpdateOperationsInput | string | null;
    redactedBy?: NullableStringFieldUpdateOperationsInput | string | null;
    meetDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    applicantName?: NullableStringFieldUpdateOperationsInput | string | null;
    applicantAddress?: NullableStringFieldUpdateOperationsInput | string | null;
    projectCadastralRef?: NullableStringFieldUpdateOperationsInput | string | null;
    projectSpaceType?: NullableStringFieldUpdateOperationsInput | string | null;
    decision?: NullableStringFieldUpdateOperationsInput | string | null;
    precisions?: NullableStringFieldUpdateOperationsInput | string | null;
    contacts?: NullableStringFieldUpdateOperationsInput | string | null;
    furtherInformation?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    serviceInstructeur?: NullableIntFieldUpdateOperationsInput | number | null;
    pdf?: NullableStringFieldUpdateOperationsInput | string | null;
    disabled?: NullableBoolFieldUpdateOperationsInput | boolean | null;
    udap_id?: NullableStringFieldUpdateOperationsInput | string | null;
  };

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
