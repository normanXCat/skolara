
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model PreRegistration
 * Modèle représentant une demande de pré-inscription
 */
export type PreRegistration = $Result.DefaultSelection<Prisma.$PreRegistrationPayload>
/**
 * Model Grade
 * 
 */
export type Grade = $Result.DefaultSelection<Prisma.$GradePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Status: {
  PENDING: 'PENDING',
  IN_REVIEW: 'IN_REVIEW',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
};

export type Status = (typeof Status)[keyof typeof Status]

}

export type Status = $Enums.Status

export const Status: typeof $Enums.Status

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more PreRegistrations
 * const preRegistrations = await prisma.preRegistration.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more PreRegistrations
   * const preRegistrations = await prisma.preRegistration.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.preRegistration`: Exposes CRUD operations for the **PreRegistration** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PreRegistrations
    * const preRegistrations = await prisma.preRegistration.findMany()
    * ```
    */
  get preRegistration(): Prisma.PreRegistrationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.grade`: Exposes CRUD operations for the **Grade** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Grades
    * const grades = await prisma.grade.findMany()
    * ```
    */
  get grade(): Prisma.GradeDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.7.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

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

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

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
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
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
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
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
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    PreRegistration: 'PreRegistration',
    Grade: 'Grade'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "preRegistration" | "grade"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      PreRegistration: {
        payload: Prisma.$PreRegistrationPayload<ExtArgs>
        fields: Prisma.PreRegistrationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PreRegistrationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreRegistrationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PreRegistrationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreRegistrationPayload>
          }
          findFirst: {
            args: Prisma.PreRegistrationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreRegistrationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PreRegistrationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreRegistrationPayload>
          }
          findMany: {
            args: Prisma.PreRegistrationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreRegistrationPayload>[]
          }
          create: {
            args: Prisma.PreRegistrationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreRegistrationPayload>
          }
          createMany: {
            args: Prisma.PreRegistrationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PreRegistrationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreRegistrationPayload>[]
          }
          delete: {
            args: Prisma.PreRegistrationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreRegistrationPayload>
          }
          update: {
            args: Prisma.PreRegistrationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreRegistrationPayload>
          }
          deleteMany: {
            args: Prisma.PreRegistrationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PreRegistrationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PreRegistrationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreRegistrationPayload>[]
          }
          upsert: {
            args: Prisma.PreRegistrationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PreRegistrationPayload>
          }
          aggregate: {
            args: Prisma.PreRegistrationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePreRegistration>
          }
          groupBy: {
            args: Prisma.PreRegistrationGroupByArgs<ExtArgs>
            result: $Utils.Optional<PreRegistrationGroupByOutputType>[]
          }
          count: {
            args: Prisma.PreRegistrationCountArgs<ExtArgs>
            result: $Utils.Optional<PreRegistrationCountAggregateOutputType> | number
          }
        }
      }
      Grade: {
        payload: Prisma.$GradePayload<ExtArgs>
        fields: Prisma.GradeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GradeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GradeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload>
          }
          findFirst: {
            args: Prisma.GradeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GradeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload>
          }
          findMany: {
            args: Prisma.GradeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload>[]
          }
          create: {
            args: Prisma.GradeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload>
          }
          createMany: {
            args: Prisma.GradeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GradeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload>[]
          }
          delete: {
            args: Prisma.GradeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload>
          }
          update: {
            args: Prisma.GradeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload>
          }
          deleteMany: {
            args: Prisma.GradeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GradeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GradeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload>[]
          }
          upsert: {
            args: Prisma.GradeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GradePayload>
          }
          aggregate: {
            args: Prisma.GradeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGrade>
          }
          groupBy: {
            args: Prisma.GradeGroupByArgs<ExtArgs>
            result: $Utils.Optional<GradeGroupByOutputType>[]
          }
          count: {
            args: Prisma.GradeCountArgs<ExtArgs>
            result: $Utils.Optional<GradeCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    preRegistration?: PreRegistrationOmit
    grade?: GradeOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

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
   * Models
   */

  /**
   * Model PreRegistration
   */

  export type AggregatePreRegistration = {
    _count: PreRegistrationCountAggregateOutputType | null
    _avg: PreRegistrationAvgAggregateOutputType | null
    _sum: PreRegistrationSumAggregateOutputType | null
    _min: PreRegistrationMinAggregateOutputType | null
    _max: PreRegistrationMaxAggregateOutputType | null
  }

  export type PreRegistrationAvgAggregateOutputType = {
    id: number | null
    processedBy: number | null
    studentId: number | null
  }

  export type PreRegistrationSumAggregateOutputType = {
    id: number | null
    processedBy: number | null
    studentId: number | null
  }

  export type PreRegistrationMinAggregateOutputType = {
    id: number | null
    childFirstName: string | null
    childLastName: string | null
    childDateOfBirth: Date | null
    gender: string | null
    childEmail: string | null
    previousSchool: string | null
    desiredGrade: string | null
    parentFirstName: string | null
    parentFullName: string | null
    parentEmail: string | null
    parentPhone: string | null
    parentAddress: string | null
    fileNumber: string | null
    receiptNumber: string | null
    receiptImageUrl: string | null
    status: $Enums.Status | null
    adminComment: string | null
    processedBy: number | null
    processedAt: Date | null
    studentId: number | null
    submittedAt: Date | null
    updatedAt: Date | null
  }

  export type PreRegistrationMaxAggregateOutputType = {
    id: number | null
    childFirstName: string | null
    childLastName: string | null
    childDateOfBirth: Date | null
    gender: string | null
    childEmail: string | null
    previousSchool: string | null
    desiredGrade: string | null
    parentFirstName: string | null
    parentFullName: string | null
    parentEmail: string | null
    parentPhone: string | null
    parentAddress: string | null
    fileNumber: string | null
    receiptNumber: string | null
    receiptImageUrl: string | null
    status: $Enums.Status | null
    adminComment: string | null
    processedBy: number | null
    processedAt: Date | null
    studentId: number | null
    submittedAt: Date | null
    updatedAt: Date | null
  }

  export type PreRegistrationCountAggregateOutputType = {
    id: number
    childFirstName: number
    childLastName: number
    childDateOfBirth: number
    gender: number
    childEmail: number
    previousSchool: number
    desiredGrade: number
    parentFirstName: number
    parentFullName: number
    parentEmail: number
    parentPhone: number
    parentAddress: number
    fileNumber: number
    receiptNumber: number
    receiptImageUrl: number
    documentUrls: number
    status: number
    adminComment: number
    processedBy: number
    processedAt: number
    studentId: number
    submittedAt: number
    updatedAt: number
    _all: number
  }


  export type PreRegistrationAvgAggregateInputType = {
    id?: true
    processedBy?: true
    studentId?: true
  }

  export type PreRegistrationSumAggregateInputType = {
    id?: true
    processedBy?: true
    studentId?: true
  }

  export type PreRegistrationMinAggregateInputType = {
    id?: true
    childFirstName?: true
    childLastName?: true
    childDateOfBirth?: true
    gender?: true
    childEmail?: true
    previousSchool?: true
    desiredGrade?: true
    parentFirstName?: true
    parentFullName?: true
    parentEmail?: true
    parentPhone?: true
    parentAddress?: true
    fileNumber?: true
    receiptNumber?: true
    receiptImageUrl?: true
    status?: true
    adminComment?: true
    processedBy?: true
    processedAt?: true
    studentId?: true
    submittedAt?: true
    updatedAt?: true
  }

  export type PreRegistrationMaxAggregateInputType = {
    id?: true
    childFirstName?: true
    childLastName?: true
    childDateOfBirth?: true
    gender?: true
    childEmail?: true
    previousSchool?: true
    desiredGrade?: true
    parentFirstName?: true
    parentFullName?: true
    parentEmail?: true
    parentPhone?: true
    parentAddress?: true
    fileNumber?: true
    receiptNumber?: true
    receiptImageUrl?: true
    status?: true
    adminComment?: true
    processedBy?: true
    processedAt?: true
    studentId?: true
    submittedAt?: true
    updatedAt?: true
  }

  export type PreRegistrationCountAggregateInputType = {
    id?: true
    childFirstName?: true
    childLastName?: true
    childDateOfBirth?: true
    gender?: true
    childEmail?: true
    previousSchool?: true
    desiredGrade?: true
    parentFirstName?: true
    parentFullName?: true
    parentEmail?: true
    parentPhone?: true
    parentAddress?: true
    fileNumber?: true
    receiptNumber?: true
    receiptImageUrl?: true
    documentUrls?: true
    status?: true
    adminComment?: true
    processedBy?: true
    processedAt?: true
    studentId?: true
    submittedAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PreRegistrationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PreRegistration to aggregate.
     */
    where?: PreRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreRegistrations to fetch.
     */
    orderBy?: PreRegistrationOrderByWithRelationInput | PreRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PreRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PreRegistrations
    **/
    _count?: true | PreRegistrationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PreRegistrationAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PreRegistrationSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PreRegistrationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PreRegistrationMaxAggregateInputType
  }

  export type GetPreRegistrationAggregateType<T extends PreRegistrationAggregateArgs> = {
        [P in keyof T & keyof AggregatePreRegistration]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePreRegistration[P]>
      : GetScalarType<T[P], AggregatePreRegistration[P]>
  }




  export type PreRegistrationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PreRegistrationWhereInput
    orderBy?: PreRegistrationOrderByWithAggregationInput | PreRegistrationOrderByWithAggregationInput[]
    by: PreRegistrationScalarFieldEnum[] | PreRegistrationScalarFieldEnum
    having?: PreRegistrationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PreRegistrationCountAggregateInputType | true
    _avg?: PreRegistrationAvgAggregateInputType
    _sum?: PreRegistrationSumAggregateInputType
    _min?: PreRegistrationMinAggregateInputType
    _max?: PreRegistrationMaxAggregateInputType
  }

  export type PreRegistrationGroupByOutputType = {
    id: number
    childFirstName: string
    childLastName: string
    childDateOfBirth: Date
    gender: string
    childEmail: string | null
    previousSchool: string | null
    desiredGrade: string
    parentFirstName: string
    parentFullName: string
    parentEmail: string
    parentPhone: string
    parentAddress: string | null
    fileNumber: string
    receiptNumber: string | null
    receiptImageUrl: string | null
    documentUrls: string[]
    status: $Enums.Status
    adminComment: string | null
    processedBy: number | null
    processedAt: Date | null
    studentId: number | null
    submittedAt: Date
    updatedAt: Date
    _count: PreRegistrationCountAggregateOutputType | null
    _avg: PreRegistrationAvgAggregateOutputType | null
    _sum: PreRegistrationSumAggregateOutputType | null
    _min: PreRegistrationMinAggregateOutputType | null
    _max: PreRegistrationMaxAggregateOutputType | null
  }

  type GetPreRegistrationGroupByPayload<T extends PreRegistrationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PreRegistrationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PreRegistrationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PreRegistrationGroupByOutputType[P]>
            : GetScalarType<T[P], PreRegistrationGroupByOutputType[P]>
        }
      >
    >


  export type PreRegistrationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    childFirstName?: boolean
    childLastName?: boolean
    childDateOfBirth?: boolean
    gender?: boolean
    childEmail?: boolean
    previousSchool?: boolean
    desiredGrade?: boolean
    parentFirstName?: boolean
    parentFullName?: boolean
    parentEmail?: boolean
    parentPhone?: boolean
    parentAddress?: boolean
    fileNumber?: boolean
    receiptNumber?: boolean
    receiptImageUrl?: boolean
    documentUrls?: boolean
    status?: boolean
    adminComment?: boolean
    processedBy?: boolean
    processedAt?: boolean
    studentId?: boolean
    submittedAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["preRegistration"]>

  export type PreRegistrationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    childFirstName?: boolean
    childLastName?: boolean
    childDateOfBirth?: boolean
    gender?: boolean
    childEmail?: boolean
    previousSchool?: boolean
    desiredGrade?: boolean
    parentFirstName?: boolean
    parentFullName?: boolean
    parentEmail?: boolean
    parentPhone?: boolean
    parentAddress?: boolean
    fileNumber?: boolean
    receiptNumber?: boolean
    receiptImageUrl?: boolean
    documentUrls?: boolean
    status?: boolean
    adminComment?: boolean
    processedBy?: boolean
    processedAt?: boolean
    studentId?: boolean
    submittedAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["preRegistration"]>

  export type PreRegistrationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    childFirstName?: boolean
    childLastName?: boolean
    childDateOfBirth?: boolean
    gender?: boolean
    childEmail?: boolean
    previousSchool?: boolean
    desiredGrade?: boolean
    parentFirstName?: boolean
    parentFullName?: boolean
    parentEmail?: boolean
    parentPhone?: boolean
    parentAddress?: boolean
    fileNumber?: boolean
    receiptNumber?: boolean
    receiptImageUrl?: boolean
    documentUrls?: boolean
    status?: boolean
    adminComment?: boolean
    processedBy?: boolean
    processedAt?: boolean
    studentId?: boolean
    submittedAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["preRegistration"]>

  export type PreRegistrationSelectScalar = {
    id?: boolean
    childFirstName?: boolean
    childLastName?: boolean
    childDateOfBirth?: boolean
    gender?: boolean
    childEmail?: boolean
    previousSchool?: boolean
    desiredGrade?: boolean
    parentFirstName?: boolean
    parentFullName?: boolean
    parentEmail?: boolean
    parentPhone?: boolean
    parentAddress?: boolean
    fileNumber?: boolean
    receiptNumber?: boolean
    receiptImageUrl?: boolean
    documentUrls?: boolean
    status?: boolean
    adminComment?: boolean
    processedBy?: boolean
    processedAt?: boolean
    studentId?: boolean
    submittedAt?: boolean
    updatedAt?: boolean
  }

  export type PreRegistrationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "childFirstName" | "childLastName" | "childDateOfBirth" | "gender" | "childEmail" | "previousSchool" | "desiredGrade" | "parentFirstName" | "parentFullName" | "parentEmail" | "parentPhone" | "parentAddress" | "fileNumber" | "receiptNumber" | "receiptImageUrl" | "documentUrls" | "status" | "adminComment" | "processedBy" | "processedAt" | "studentId" | "submittedAt" | "updatedAt", ExtArgs["result"]["preRegistration"]>

  export type $PreRegistrationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PreRegistration"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      childFirstName: string
      childLastName: string
      childDateOfBirth: Date
      gender: string
      childEmail: string | null
      previousSchool: string | null
      desiredGrade: string
      parentFirstName: string
      parentFullName: string
      parentEmail: string
      parentPhone: string
      parentAddress: string | null
      fileNumber: string
      receiptNumber: string | null
      receiptImageUrl: string | null
      documentUrls: string[]
      status: $Enums.Status
      adminComment: string | null
      processedBy: number | null
      processedAt: Date | null
      studentId: number | null
      submittedAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["preRegistration"]>
    composites: {}
  }

  type PreRegistrationGetPayload<S extends boolean | null | undefined | PreRegistrationDefaultArgs> = $Result.GetResult<Prisma.$PreRegistrationPayload, S>

  type PreRegistrationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PreRegistrationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PreRegistrationCountAggregateInputType | true
    }

  export interface PreRegistrationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PreRegistration'], meta: { name: 'PreRegistration' } }
    /**
     * Find zero or one PreRegistration that matches the filter.
     * @param {PreRegistrationFindUniqueArgs} args - Arguments to find a PreRegistration
     * @example
     * // Get one PreRegistration
     * const preRegistration = await prisma.preRegistration.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PreRegistrationFindUniqueArgs>(args: SelectSubset<T, PreRegistrationFindUniqueArgs<ExtArgs>>): Prisma__PreRegistrationClient<$Result.GetResult<Prisma.$PreRegistrationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PreRegistration that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PreRegistrationFindUniqueOrThrowArgs} args - Arguments to find a PreRegistration
     * @example
     * // Get one PreRegistration
     * const preRegistration = await prisma.preRegistration.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PreRegistrationFindUniqueOrThrowArgs>(args: SelectSubset<T, PreRegistrationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PreRegistrationClient<$Result.GetResult<Prisma.$PreRegistrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PreRegistration that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreRegistrationFindFirstArgs} args - Arguments to find a PreRegistration
     * @example
     * // Get one PreRegistration
     * const preRegistration = await prisma.preRegistration.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PreRegistrationFindFirstArgs>(args?: SelectSubset<T, PreRegistrationFindFirstArgs<ExtArgs>>): Prisma__PreRegistrationClient<$Result.GetResult<Prisma.$PreRegistrationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PreRegistration that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreRegistrationFindFirstOrThrowArgs} args - Arguments to find a PreRegistration
     * @example
     * // Get one PreRegistration
     * const preRegistration = await prisma.preRegistration.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PreRegistrationFindFirstOrThrowArgs>(args?: SelectSubset<T, PreRegistrationFindFirstOrThrowArgs<ExtArgs>>): Prisma__PreRegistrationClient<$Result.GetResult<Prisma.$PreRegistrationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PreRegistrations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreRegistrationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PreRegistrations
     * const preRegistrations = await prisma.preRegistration.findMany()
     * 
     * // Get first 10 PreRegistrations
     * const preRegistrations = await prisma.preRegistration.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const preRegistrationWithIdOnly = await prisma.preRegistration.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PreRegistrationFindManyArgs>(args?: SelectSubset<T, PreRegistrationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreRegistrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PreRegistration.
     * @param {PreRegistrationCreateArgs} args - Arguments to create a PreRegistration.
     * @example
     * // Create one PreRegistration
     * const PreRegistration = await prisma.preRegistration.create({
     *   data: {
     *     // ... data to create a PreRegistration
     *   }
     * })
     * 
     */
    create<T extends PreRegistrationCreateArgs>(args: SelectSubset<T, PreRegistrationCreateArgs<ExtArgs>>): Prisma__PreRegistrationClient<$Result.GetResult<Prisma.$PreRegistrationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PreRegistrations.
     * @param {PreRegistrationCreateManyArgs} args - Arguments to create many PreRegistrations.
     * @example
     * // Create many PreRegistrations
     * const preRegistration = await prisma.preRegistration.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PreRegistrationCreateManyArgs>(args?: SelectSubset<T, PreRegistrationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PreRegistrations and returns the data saved in the database.
     * @param {PreRegistrationCreateManyAndReturnArgs} args - Arguments to create many PreRegistrations.
     * @example
     * // Create many PreRegistrations
     * const preRegistration = await prisma.preRegistration.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PreRegistrations and only return the `id`
     * const preRegistrationWithIdOnly = await prisma.preRegistration.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PreRegistrationCreateManyAndReturnArgs>(args?: SelectSubset<T, PreRegistrationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreRegistrationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PreRegistration.
     * @param {PreRegistrationDeleteArgs} args - Arguments to delete one PreRegistration.
     * @example
     * // Delete one PreRegistration
     * const PreRegistration = await prisma.preRegistration.delete({
     *   where: {
     *     // ... filter to delete one PreRegistration
     *   }
     * })
     * 
     */
    delete<T extends PreRegistrationDeleteArgs>(args: SelectSubset<T, PreRegistrationDeleteArgs<ExtArgs>>): Prisma__PreRegistrationClient<$Result.GetResult<Prisma.$PreRegistrationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PreRegistration.
     * @param {PreRegistrationUpdateArgs} args - Arguments to update one PreRegistration.
     * @example
     * // Update one PreRegistration
     * const preRegistration = await prisma.preRegistration.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PreRegistrationUpdateArgs>(args: SelectSubset<T, PreRegistrationUpdateArgs<ExtArgs>>): Prisma__PreRegistrationClient<$Result.GetResult<Prisma.$PreRegistrationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PreRegistrations.
     * @param {PreRegistrationDeleteManyArgs} args - Arguments to filter PreRegistrations to delete.
     * @example
     * // Delete a few PreRegistrations
     * const { count } = await prisma.preRegistration.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PreRegistrationDeleteManyArgs>(args?: SelectSubset<T, PreRegistrationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PreRegistrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreRegistrationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PreRegistrations
     * const preRegistration = await prisma.preRegistration.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PreRegistrationUpdateManyArgs>(args: SelectSubset<T, PreRegistrationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PreRegistrations and returns the data updated in the database.
     * @param {PreRegistrationUpdateManyAndReturnArgs} args - Arguments to update many PreRegistrations.
     * @example
     * // Update many PreRegistrations
     * const preRegistration = await prisma.preRegistration.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PreRegistrations and only return the `id`
     * const preRegistrationWithIdOnly = await prisma.preRegistration.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PreRegistrationUpdateManyAndReturnArgs>(args: SelectSubset<T, PreRegistrationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreRegistrationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PreRegistration.
     * @param {PreRegistrationUpsertArgs} args - Arguments to update or create a PreRegistration.
     * @example
     * // Update or create a PreRegistration
     * const preRegistration = await prisma.preRegistration.upsert({
     *   create: {
     *     // ... data to create a PreRegistration
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PreRegistration we want to update
     *   }
     * })
     */
    upsert<T extends PreRegistrationUpsertArgs>(args: SelectSubset<T, PreRegistrationUpsertArgs<ExtArgs>>): Prisma__PreRegistrationClient<$Result.GetResult<Prisma.$PreRegistrationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PreRegistrations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreRegistrationCountArgs} args - Arguments to filter PreRegistrations to count.
     * @example
     * // Count the number of PreRegistrations
     * const count = await prisma.preRegistration.count({
     *   where: {
     *     // ... the filter for the PreRegistrations we want to count
     *   }
     * })
    **/
    count<T extends PreRegistrationCountArgs>(
      args?: Subset<T, PreRegistrationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PreRegistrationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PreRegistration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreRegistrationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PreRegistrationAggregateArgs>(args: Subset<T, PreRegistrationAggregateArgs>): Prisma.PrismaPromise<GetPreRegistrationAggregateType<T>>

    /**
     * Group by PreRegistration.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PreRegistrationGroupByArgs} args - Group by arguments.
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
      T extends PreRegistrationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PreRegistrationGroupByArgs['orderBy'] }
        : { orderBy?: PreRegistrationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, PreRegistrationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPreRegistrationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PreRegistration model
   */
  readonly fields: PreRegistrationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PreRegistration.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PreRegistrationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PreRegistration model
   */
  interface PreRegistrationFieldRefs {
    readonly id: FieldRef<"PreRegistration", 'Int'>
    readonly childFirstName: FieldRef<"PreRegistration", 'String'>
    readonly childLastName: FieldRef<"PreRegistration", 'String'>
    readonly childDateOfBirth: FieldRef<"PreRegistration", 'DateTime'>
    readonly gender: FieldRef<"PreRegistration", 'String'>
    readonly childEmail: FieldRef<"PreRegistration", 'String'>
    readonly previousSchool: FieldRef<"PreRegistration", 'String'>
    readonly desiredGrade: FieldRef<"PreRegistration", 'String'>
    readonly parentFirstName: FieldRef<"PreRegistration", 'String'>
    readonly parentFullName: FieldRef<"PreRegistration", 'String'>
    readonly parentEmail: FieldRef<"PreRegistration", 'String'>
    readonly parentPhone: FieldRef<"PreRegistration", 'String'>
    readonly parentAddress: FieldRef<"PreRegistration", 'String'>
    readonly fileNumber: FieldRef<"PreRegistration", 'String'>
    readonly receiptNumber: FieldRef<"PreRegistration", 'String'>
    readonly receiptImageUrl: FieldRef<"PreRegistration", 'String'>
    readonly documentUrls: FieldRef<"PreRegistration", 'String[]'>
    readonly status: FieldRef<"PreRegistration", 'Status'>
    readonly adminComment: FieldRef<"PreRegistration", 'String'>
    readonly processedBy: FieldRef<"PreRegistration", 'Int'>
    readonly processedAt: FieldRef<"PreRegistration", 'DateTime'>
    readonly studentId: FieldRef<"PreRegistration", 'Int'>
    readonly submittedAt: FieldRef<"PreRegistration", 'DateTime'>
    readonly updatedAt: FieldRef<"PreRegistration", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PreRegistration findUnique
   */
  export type PreRegistrationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreRegistration
     */
    select?: PreRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreRegistration
     */
    omit?: PreRegistrationOmit<ExtArgs> | null
    /**
     * Filter, which PreRegistration to fetch.
     */
    where: PreRegistrationWhereUniqueInput
  }

  /**
   * PreRegistration findUniqueOrThrow
   */
  export type PreRegistrationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreRegistration
     */
    select?: PreRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreRegistration
     */
    omit?: PreRegistrationOmit<ExtArgs> | null
    /**
     * Filter, which PreRegistration to fetch.
     */
    where: PreRegistrationWhereUniqueInput
  }

  /**
   * PreRegistration findFirst
   */
  export type PreRegistrationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreRegistration
     */
    select?: PreRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreRegistration
     */
    omit?: PreRegistrationOmit<ExtArgs> | null
    /**
     * Filter, which PreRegistration to fetch.
     */
    where?: PreRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreRegistrations to fetch.
     */
    orderBy?: PreRegistrationOrderByWithRelationInput | PreRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PreRegistrations.
     */
    cursor?: PreRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PreRegistrations.
     */
    distinct?: PreRegistrationScalarFieldEnum | PreRegistrationScalarFieldEnum[]
  }

  /**
   * PreRegistration findFirstOrThrow
   */
  export type PreRegistrationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreRegistration
     */
    select?: PreRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreRegistration
     */
    omit?: PreRegistrationOmit<ExtArgs> | null
    /**
     * Filter, which PreRegistration to fetch.
     */
    where?: PreRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreRegistrations to fetch.
     */
    orderBy?: PreRegistrationOrderByWithRelationInput | PreRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PreRegistrations.
     */
    cursor?: PreRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PreRegistrations.
     */
    distinct?: PreRegistrationScalarFieldEnum | PreRegistrationScalarFieldEnum[]
  }

  /**
   * PreRegistration findMany
   */
  export type PreRegistrationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreRegistration
     */
    select?: PreRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreRegistration
     */
    omit?: PreRegistrationOmit<ExtArgs> | null
    /**
     * Filter, which PreRegistrations to fetch.
     */
    where?: PreRegistrationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PreRegistrations to fetch.
     */
    orderBy?: PreRegistrationOrderByWithRelationInput | PreRegistrationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PreRegistrations.
     */
    cursor?: PreRegistrationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PreRegistrations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PreRegistrations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PreRegistrations.
     */
    distinct?: PreRegistrationScalarFieldEnum | PreRegistrationScalarFieldEnum[]
  }

  /**
   * PreRegistration create
   */
  export type PreRegistrationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreRegistration
     */
    select?: PreRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreRegistration
     */
    omit?: PreRegistrationOmit<ExtArgs> | null
    /**
     * The data needed to create a PreRegistration.
     */
    data: XOR<PreRegistrationCreateInput, PreRegistrationUncheckedCreateInput>
  }

  /**
   * PreRegistration createMany
   */
  export type PreRegistrationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PreRegistrations.
     */
    data: PreRegistrationCreateManyInput | PreRegistrationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PreRegistration createManyAndReturn
   */
  export type PreRegistrationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreRegistration
     */
    select?: PreRegistrationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PreRegistration
     */
    omit?: PreRegistrationOmit<ExtArgs> | null
    /**
     * The data used to create many PreRegistrations.
     */
    data: PreRegistrationCreateManyInput | PreRegistrationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PreRegistration update
   */
  export type PreRegistrationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreRegistration
     */
    select?: PreRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreRegistration
     */
    omit?: PreRegistrationOmit<ExtArgs> | null
    /**
     * The data needed to update a PreRegistration.
     */
    data: XOR<PreRegistrationUpdateInput, PreRegistrationUncheckedUpdateInput>
    /**
     * Choose, which PreRegistration to update.
     */
    where: PreRegistrationWhereUniqueInput
  }

  /**
   * PreRegistration updateMany
   */
  export type PreRegistrationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PreRegistrations.
     */
    data: XOR<PreRegistrationUpdateManyMutationInput, PreRegistrationUncheckedUpdateManyInput>
    /**
     * Filter which PreRegistrations to update
     */
    where?: PreRegistrationWhereInput
    /**
     * Limit how many PreRegistrations to update.
     */
    limit?: number
  }

  /**
   * PreRegistration updateManyAndReturn
   */
  export type PreRegistrationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreRegistration
     */
    select?: PreRegistrationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PreRegistration
     */
    omit?: PreRegistrationOmit<ExtArgs> | null
    /**
     * The data used to update PreRegistrations.
     */
    data: XOR<PreRegistrationUpdateManyMutationInput, PreRegistrationUncheckedUpdateManyInput>
    /**
     * Filter which PreRegistrations to update
     */
    where?: PreRegistrationWhereInput
    /**
     * Limit how many PreRegistrations to update.
     */
    limit?: number
  }

  /**
   * PreRegistration upsert
   */
  export type PreRegistrationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreRegistration
     */
    select?: PreRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreRegistration
     */
    omit?: PreRegistrationOmit<ExtArgs> | null
    /**
     * The filter to search for the PreRegistration to update in case it exists.
     */
    where: PreRegistrationWhereUniqueInput
    /**
     * In case the PreRegistration found by the `where` argument doesn't exist, create a new PreRegistration with this data.
     */
    create: XOR<PreRegistrationCreateInput, PreRegistrationUncheckedCreateInput>
    /**
     * In case the PreRegistration was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PreRegistrationUpdateInput, PreRegistrationUncheckedUpdateInput>
  }

  /**
   * PreRegistration delete
   */
  export type PreRegistrationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreRegistration
     */
    select?: PreRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreRegistration
     */
    omit?: PreRegistrationOmit<ExtArgs> | null
    /**
     * Filter which PreRegistration to delete.
     */
    where: PreRegistrationWhereUniqueInput
  }

  /**
   * PreRegistration deleteMany
   */
  export type PreRegistrationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PreRegistrations to delete
     */
    where?: PreRegistrationWhereInput
    /**
     * Limit how many PreRegistrations to delete.
     */
    limit?: number
  }

  /**
   * PreRegistration without action
   */
  export type PreRegistrationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreRegistration
     */
    select?: PreRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreRegistration
     */
    omit?: PreRegistrationOmit<ExtArgs> | null
  }


  /**
   * Model Grade
   */

  export type AggregateGrade = {
    _count: GradeCountAggregateOutputType | null
    _avg: GradeAvgAggregateOutputType | null
    _sum: GradeSumAggregateOutputType | null
    _min: GradeMinAggregateOutputType | null
    _max: GradeMaxAggregateOutputType | null
  }

  export type GradeAvgAggregateOutputType = {
    id: number | null
  }

  export type GradeSumAggregateOutputType = {
    id: number | null
  }

  export type GradeMinAggregateOutputType = {
    id: number | null
    value: string | null
    label: string | null
  }

  export type GradeMaxAggregateOutputType = {
    id: number | null
    value: string | null
    label: string | null
  }

  export type GradeCountAggregateOutputType = {
    id: number
    value: number
    label: number
    _all: number
  }


  export type GradeAvgAggregateInputType = {
    id?: true
  }

  export type GradeSumAggregateInputType = {
    id?: true
  }

  export type GradeMinAggregateInputType = {
    id?: true
    value?: true
    label?: true
  }

  export type GradeMaxAggregateInputType = {
    id?: true
    value?: true
    label?: true
  }

  export type GradeCountAggregateInputType = {
    id?: true
    value?: true
    label?: true
    _all?: true
  }

  export type GradeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Grade to aggregate.
     */
    where?: GradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Grades to fetch.
     */
    orderBy?: GradeOrderByWithRelationInput | GradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Grades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Grades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Grades
    **/
    _count?: true | GradeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GradeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GradeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GradeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GradeMaxAggregateInputType
  }

  export type GetGradeAggregateType<T extends GradeAggregateArgs> = {
        [P in keyof T & keyof AggregateGrade]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGrade[P]>
      : GetScalarType<T[P], AggregateGrade[P]>
  }




  export type GradeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GradeWhereInput
    orderBy?: GradeOrderByWithAggregationInput | GradeOrderByWithAggregationInput[]
    by: GradeScalarFieldEnum[] | GradeScalarFieldEnum
    having?: GradeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GradeCountAggregateInputType | true
    _avg?: GradeAvgAggregateInputType
    _sum?: GradeSumAggregateInputType
    _min?: GradeMinAggregateInputType
    _max?: GradeMaxAggregateInputType
  }

  export type GradeGroupByOutputType = {
    id: number
    value: string
    label: string
    _count: GradeCountAggregateOutputType | null
    _avg: GradeAvgAggregateOutputType | null
    _sum: GradeSumAggregateOutputType | null
    _min: GradeMinAggregateOutputType | null
    _max: GradeMaxAggregateOutputType | null
  }

  type GetGradeGroupByPayload<T extends GradeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GradeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GradeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GradeGroupByOutputType[P]>
            : GetScalarType<T[P], GradeGroupByOutputType[P]>
        }
      >
    >


  export type GradeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    value?: boolean
    label?: boolean
  }, ExtArgs["result"]["grade"]>

  export type GradeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    value?: boolean
    label?: boolean
  }, ExtArgs["result"]["grade"]>

  export type GradeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    value?: boolean
    label?: boolean
  }, ExtArgs["result"]["grade"]>

  export type GradeSelectScalar = {
    id?: boolean
    value?: boolean
    label?: boolean
  }

  export type GradeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "value" | "label", ExtArgs["result"]["grade"]>

  export type $GradePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Grade"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      value: string
      label: string
    }, ExtArgs["result"]["grade"]>
    composites: {}
  }

  type GradeGetPayload<S extends boolean | null | undefined | GradeDefaultArgs> = $Result.GetResult<Prisma.$GradePayload, S>

  type GradeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GradeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GradeCountAggregateInputType | true
    }

  export interface GradeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Grade'], meta: { name: 'Grade' } }
    /**
     * Find zero or one Grade that matches the filter.
     * @param {GradeFindUniqueArgs} args - Arguments to find a Grade
     * @example
     * // Get one Grade
     * const grade = await prisma.grade.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GradeFindUniqueArgs>(args: SelectSubset<T, GradeFindUniqueArgs<ExtArgs>>): Prisma__GradeClient<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Grade that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GradeFindUniqueOrThrowArgs} args - Arguments to find a Grade
     * @example
     * // Get one Grade
     * const grade = await prisma.grade.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GradeFindUniqueOrThrowArgs>(args: SelectSubset<T, GradeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GradeClient<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Grade that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GradeFindFirstArgs} args - Arguments to find a Grade
     * @example
     * // Get one Grade
     * const grade = await prisma.grade.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GradeFindFirstArgs>(args?: SelectSubset<T, GradeFindFirstArgs<ExtArgs>>): Prisma__GradeClient<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Grade that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GradeFindFirstOrThrowArgs} args - Arguments to find a Grade
     * @example
     * // Get one Grade
     * const grade = await prisma.grade.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GradeFindFirstOrThrowArgs>(args?: SelectSubset<T, GradeFindFirstOrThrowArgs<ExtArgs>>): Prisma__GradeClient<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Grades that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GradeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Grades
     * const grades = await prisma.grade.findMany()
     * 
     * // Get first 10 Grades
     * const grades = await prisma.grade.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gradeWithIdOnly = await prisma.grade.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GradeFindManyArgs>(args?: SelectSubset<T, GradeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Grade.
     * @param {GradeCreateArgs} args - Arguments to create a Grade.
     * @example
     * // Create one Grade
     * const Grade = await prisma.grade.create({
     *   data: {
     *     // ... data to create a Grade
     *   }
     * })
     * 
     */
    create<T extends GradeCreateArgs>(args: SelectSubset<T, GradeCreateArgs<ExtArgs>>): Prisma__GradeClient<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Grades.
     * @param {GradeCreateManyArgs} args - Arguments to create many Grades.
     * @example
     * // Create many Grades
     * const grade = await prisma.grade.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GradeCreateManyArgs>(args?: SelectSubset<T, GradeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Grades and returns the data saved in the database.
     * @param {GradeCreateManyAndReturnArgs} args - Arguments to create many Grades.
     * @example
     * // Create many Grades
     * const grade = await prisma.grade.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Grades and only return the `id`
     * const gradeWithIdOnly = await prisma.grade.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GradeCreateManyAndReturnArgs>(args?: SelectSubset<T, GradeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Grade.
     * @param {GradeDeleteArgs} args - Arguments to delete one Grade.
     * @example
     * // Delete one Grade
     * const Grade = await prisma.grade.delete({
     *   where: {
     *     // ... filter to delete one Grade
     *   }
     * })
     * 
     */
    delete<T extends GradeDeleteArgs>(args: SelectSubset<T, GradeDeleteArgs<ExtArgs>>): Prisma__GradeClient<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Grade.
     * @param {GradeUpdateArgs} args - Arguments to update one Grade.
     * @example
     * // Update one Grade
     * const grade = await prisma.grade.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GradeUpdateArgs>(args: SelectSubset<T, GradeUpdateArgs<ExtArgs>>): Prisma__GradeClient<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Grades.
     * @param {GradeDeleteManyArgs} args - Arguments to filter Grades to delete.
     * @example
     * // Delete a few Grades
     * const { count } = await prisma.grade.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GradeDeleteManyArgs>(args?: SelectSubset<T, GradeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Grades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GradeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Grades
     * const grade = await prisma.grade.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GradeUpdateManyArgs>(args: SelectSubset<T, GradeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Grades and returns the data updated in the database.
     * @param {GradeUpdateManyAndReturnArgs} args - Arguments to update many Grades.
     * @example
     * // Update many Grades
     * const grade = await prisma.grade.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Grades and only return the `id`
     * const gradeWithIdOnly = await prisma.grade.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GradeUpdateManyAndReturnArgs>(args: SelectSubset<T, GradeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Grade.
     * @param {GradeUpsertArgs} args - Arguments to update or create a Grade.
     * @example
     * // Update or create a Grade
     * const grade = await prisma.grade.upsert({
     *   create: {
     *     // ... data to create a Grade
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Grade we want to update
     *   }
     * })
     */
    upsert<T extends GradeUpsertArgs>(args: SelectSubset<T, GradeUpsertArgs<ExtArgs>>): Prisma__GradeClient<$Result.GetResult<Prisma.$GradePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Grades.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GradeCountArgs} args - Arguments to filter Grades to count.
     * @example
     * // Count the number of Grades
     * const count = await prisma.grade.count({
     *   where: {
     *     // ... the filter for the Grades we want to count
     *   }
     * })
    **/
    count<T extends GradeCountArgs>(
      args?: Subset<T, GradeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GradeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Grade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GradeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends GradeAggregateArgs>(args: Subset<T, GradeAggregateArgs>): Prisma.PrismaPromise<GetGradeAggregateType<T>>

    /**
     * Group by Grade.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GradeGroupByArgs} args - Group by arguments.
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
      T extends GradeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GradeGroupByArgs['orderBy'] }
        : { orderBy?: GradeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
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
    >(args: SubsetIntersection<T, GradeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGradeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Grade model
   */
  readonly fields: GradeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Grade.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GradeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Grade model
   */
  interface GradeFieldRefs {
    readonly id: FieldRef<"Grade", 'Int'>
    readonly value: FieldRef<"Grade", 'String'>
    readonly label: FieldRef<"Grade", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Grade findUnique
   */
  export type GradeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * Filter, which Grade to fetch.
     */
    where: GradeWhereUniqueInput
  }

  /**
   * Grade findUniqueOrThrow
   */
  export type GradeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * Filter, which Grade to fetch.
     */
    where: GradeWhereUniqueInput
  }

  /**
   * Grade findFirst
   */
  export type GradeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * Filter, which Grade to fetch.
     */
    where?: GradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Grades to fetch.
     */
    orderBy?: GradeOrderByWithRelationInput | GradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Grades.
     */
    cursor?: GradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Grades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Grades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Grades.
     */
    distinct?: GradeScalarFieldEnum | GradeScalarFieldEnum[]
  }

  /**
   * Grade findFirstOrThrow
   */
  export type GradeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * Filter, which Grade to fetch.
     */
    where?: GradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Grades to fetch.
     */
    orderBy?: GradeOrderByWithRelationInput | GradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Grades.
     */
    cursor?: GradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Grades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Grades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Grades.
     */
    distinct?: GradeScalarFieldEnum | GradeScalarFieldEnum[]
  }

  /**
   * Grade findMany
   */
  export type GradeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * Filter, which Grades to fetch.
     */
    where?: GradeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Grades to fetch.
     */
    orderBy?: GradeOrderByWithRelationInput | GradeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Grades.
     */
    cursor?: GradeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Grades from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Grades.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Grades.
     */
    distinct?: GradeScalarFieldEnum | GradeScalarFieldEnum[]
  }

  /**
   * Grade create
   */
  export type GradeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * The data needed to create a Grade.
     */
    data: XOR<GradeCreateInput, GradeUncheckedCreateInput>
  }

  /**
   * Grade createMany
   */
  export type GradeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Grades.
     */
    data: GradeCreateManyInput | GradeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Grade createManyAndReturn
   */
  export type GradeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * The data used to create many Grades.
     */
    data: GradeCreateManyInput | GradeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Grade update
   */
  export type GradeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * The data needed to update a Grade.
     */
    data: XOR<GradeUpdateInput, GradeUncheckedUpdateInput>
    /**
     * Choose, which Grade to update.
     */
    where: GradeWhereUniqueInput
  }

  /**
   * Grade updateMany
   */
  export type GradeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Grades.
     */
    data: XOR<GradeUpdateManyMutationInput, GradeUncheckedUpdateManyInput>
    /**
     * Filter which Grades to update
     */
    where?: GradeWhereInput
    /**
     * Limit how many Grades to update.
     */
    limit?: number
  }

  /**
   * Grade updateManyAndReturn
   */
  export type GradeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * The data used to update Grades.
     */
    data: XOR<GradeUpdateManyMutationInput, GradeUncheckedUpdateManyInput>
    /**
     * Filter which Grades to update
     */
    where?: GradeWhereInput
    /**
     * Limit how many Grades to update.
     */
    limit?: number
  }

  /**
   * Grade upsert
   */
  export type GradeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * The filter to search for the Grade to update in case it exists.
     */
    where: GradeWhereUniqueInput
    /**
     * In case the Grade found by the `where` argument doesn't exist, create a new Grade with this data.
     */
    create: XOR<GradeCreateInput, GradeUncheckedCreateInput>
    /**
     * In case the Grade was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GradeUpdateInput, GradeUncheckedUpdateInput>
  }

  /**
   * Grade delete
   */
  export type GradeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
    /**
     * Filter which Grade to delete.
     */
    where: GradeWhereUniqueInput
  }

  /**
   * Grade deleteMany
   */
  export type GradeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Grades to delete
     */
    where?: GradeWhereInput
    /**
     * Limit how many Grades to delete.
     */
    limit?: number
  }

  /**
   * Grade without action
   */
  export type GradeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Grade
     */
    select?: GradeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Grade
     */
    omit?: GradeOmit<ExtArgs> | null
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


  export const PreRegistrationScalarFieldEnum: {
    id: 'id',
    childFirstName: 'childFirstName',
    childLastName: 'childLastName',
    childDateOfBirth: 'childDateOfBirth',
    gender: 'gender',
    childEmail: 'childEmail',
    previousSchool: 'previousSchool',
    desiredGrade: 'desiredGrade',
    parentFirstName: 'parentFirstName',
    parentFullName: 'parentFullName',
    parentEmail: 'parentEmail',
    parentPhone: 'parentPhone',
    parentAddress: 'parentAddress',
    fileNumber: 'fileNumber',
    receiptNumber: 'receiptNumber',
    receiptImageUrl: 'receiptImageUrl',
    documentUrls: 'documentUrls',
    status: 'status',
    adminComment: 'adminComment',
    processedBy: 'processedBy',
    processedAt: 'processedAt',
    studentId: 'studentId',
    submittedAt: 'submittedAt',
    updatedAt: 'updatedAt'
  };

  export type PreRegistrationScalarFieldEnum = (typeof PreRegistrationScalarFieldEnum)[keyof typeof PreRegistrationScalarFieldEnum]


  export const GradeScalarFieldEnum: {
    id: 'id',
    value: 'value',
    label: 'label'
  };

  export type GradeScalarFieldEnum = (typeof GradeScalarFieldEnum)[keyof typeof GradeScalarFieldEnum]


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
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Status'
   */
  export type EnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status'>
    


  /**
   * Reference to a field of type 'Status[]'
   */
  export type ListEnumStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Status[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type PreRegistrationWhereInput = {
    AND?: PreRegistrationWhereInput | PreRegistrationWhereInput[]
    OR?: PreRegistrationWhereInput[]
    NOT?: PreRegistrationWhereInput | PreRegistrationWhereInput[]
    id?: IntFilter<"PreRegistration"> | number
    childFirstName?: StringFilter<"PreRegistration"> | string
    childLastName?: StringFilter<"PreRegistration"> | string
    childDateOfBirth?: DateTimeFilter<"PreRegistration"> | Date | string
    gender?: StringFilter<"PreRegistration"> | string
    childEmail?: StringNullableFilter<"PreRegistration"> | string | null
    previousSchool?: StringNullableFilter<"PreRegistration"> | string | null
    desiredGrade?: StringFilter<"PreRegistration"> | string
    parentFirstName?: StringFilter<"PreRegistration"> | string
    parentFullName?: StringFilter<"PreRegistration"> | string
    parentEmail?: StringFilter<"PreRegistration"> | string
    parentPhone?: StringFilter<"PreRegistration"> | string
    parentAddress?: StringNullableFilter<"PreRegistration"> | string | null
    fileNumber?: StringFilter<"PreRegistration"> | string
    receiptNumber?: StringNullableFilter<"PreRegistration"> | string | null
    receiptImageUrl?: StringNullableFilter<"PreRegistration"> | string | null
    documentUrls?: StringNullableListFilter<"PreRegistration">
    status?: EnumStatusFilter<"PreRegistration"> | $Enums.Status
    adminComment?: StringNullableFilter<"PreRegistration"> | string | null
    processedBy?: IntNullableFilter<"PreRegistration"> | number | null
    processedAt?: DateTimeNullableFilter<"PreRegistration"> | Date | string | null
    studentId?: IntNullableFilter<"PreRegistration"> | number | null
    submittedAt?: DateTimeFilter<"PreRegistration"> | Date | string
    updatedAt?: DateTimeFilter<"PreRegistration"> | Date | string
  }

  export type PreRegistrationOrderByWithRelationInput = {
    id?: SortOrder
    childFirstName?: SortOrder
    childLastName?: SortOrder
    childDateOfBirth?: SortOrder
    gender?: SortOrder
    childEmail?: SortOrderInput | SortOrder
    previousSchool?: SortOrderInput | SortOrder
    desiredGrade?: SortOrder
    parentFirstName?: SortOrder
    parentFullName?: SortOrder
    parentEmail?: SortOrder
    parentPhone?: SortOrder
    parentAddress?: SortOrderInput | SortOrder
    fileNumber?: SortOrder
    receiptNumber?: SortOrderInput | SortOrder
    receiptImageUrl?: SortOrderInput | SortOrder
    documentUrls?: SortOrder
    status?: SortOrder
    adminComment?: SortOrderInput | SortOrder
    processedBy?: SortOrderInput | SortOrder
    processedAt?: SortOrderInput | SortOrder
    studentId?: SortOrderInput | SortOrder
    submittedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PreRegistrationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    fileNumber?: string
    receiptNumber?: string
    AND?: PreRegistrationWhereInput | PreRegistrationWhereInput[]
    OR?: PreRegistrationWhereInput[]
    NOT?: PreRegistrationWhereInput | PreRegistrationWhereInput[]
    childFirstName?: StringFilter<"PreRegistration"> | string
    childLastName?: StringFilter<"PreRegistration"> | string
    childDateOfBirth?: DateTimeFilter<"PreRegistration"> | Date | string
    gender?: StringFilter<"PreRegistration"> | string
    childEmail?: StringNullableFilter<"PreRegistration"> | string | null
    previousSchool?: StringNullableFilter<"PreRegistration"> | string | null
    desiredGrade?: StringFilter<"PreRegistration"> | string
    parentFirstName?: StringFilter<"PreRegistration"> | string
    parentFullName?: StringFilter<"PreRegistration"> | string
    parentEmail?: StringFilter<"PreRegistration"> | string
    parentPhone?: StringFilter<"PreRegistration"> | string
    parentAddress?: StringNullableFilter<"PreRegistration"> | string | null
    receiptImageUrl?: StringNullableFilter<"PreRegistration"> | string | null
    documentUrls?: StringNullableListFilter<"PreRegistration">
    status?: EnumStatusFilter<"PreRegistration"> | $Enums.Status
    adminComment?: StringNullableFilter<"PreRegistration"> | string | null
    processedBy?: IntNullableFilter<"PreRegistration"> | number | null
    processedAt?: DateTimeNullableFilter<"PreRegistration"> | Date | string | null
    studentId?: IntNullableFilter<"PreRegistration"> | number | null
    submittedAt?: DateTimeFilter<"PreRegistration"> | Date | string
    updatedAt?: DateTimeFilter<"PreRegistration"> | Date | string
  }, "id" | "fileNumber" | "receiptNumber">

  export type PreRegistrationOrderByWithAggregationInput = {
    id?: SortOrder
    childFirstName?: SortOrder
    childLastName?: SortOrder
    childDateOfBirth?: SortOrder
    gender?: SortOrder
    childEmail?: SortOrderInput | SortOrder
    previousSchool?: SortOrderInput | SortOrder
    desiredGrade?: SortOrder
    parentFirstName?: SortOrder
    parentFullName?: SortOrder
    parentEmail?: SortOrder
    parentPhone?: SortOrder
    parentAddress?: SortOrderInput | SortOrder
    fileNumber?: SortOrder
    receiptNumber?: SortOrderInput | SortOrder
    receiptImageUrl?: SortOrderInput | SortOrder
    documentUrls?: SortOrder
    status?: SortOrder
    adminComment?: SortOrderInput | SortOrder
    processedBy?: SortOrderInput | SortOrder
    processedAt?: SortOrderInput | SortOrder
    studentId?: SortOrderInput | SortOrder
    submittedAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PreRegistrationCountOrderByAggregateInput
    _avg?: PreRegistrationAvgOrderByAggregateInput
    _max?: PreRegistrationMaxOrderByAggregateInput
    _min?: PreRegistrationMinOrderByAggregateInput
    _sum?: PreRegistrationSumOrderByAggregateInput
  }

  export type PreRegistrationScalarWhereWithAggregatesInput = {
    AND?: PreRegistrationScalarWhereWithAggregatesInput | PreRegistrationScalarWhereWithAggregatesInput[]
    OR?: PreRegistrationScalarWhereWithAggregatesInput[]
    NOT?: PreRegistrationScalarWhereWithAggregatesInput | PreRegistrationScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PreRegistration"> | number
    childFirstName?: StringWithAggregatesFilter<"PreRegistration"> | string
    childLastName?: StringWithAggregatesFilter<"PreRegistration"> | string
    childDateOfBirth?: DateTimeWithAggregatesFilter<"PreRegistration"> | Date | string
    gender?: StringWithAggregatesFilter<"PreRegistration"> | string
    childEmail?: StringNullableWithAggregatesFilter<"PreRegistration"> | string | null
    previousSchool?: StringNullableWithAggregatesFilter<"PreRegistration"> | string | null
    desiredGrade?: StringWithAggregatesFilter<"PreRegistration"> | string
    parentFirstName?: StringWithAggregatesFilter<"PreRegistration"> | string
    parentFullName?: StringWithAggregatesFilter<"PreRegistration"> | string
    parentEmail?: StringWithAggregatesFilter<"PreRegistration"> | string
    parentPhone?: StringWithAggregatesFilter<"PreRegistration"> | string
    parentAddress?: StringNullableWithAggregatesFilter<"PreRegistration"> | string | null
    fileNumber?: StringWithAggregatesFilter<"PreRegistration"> | string
    receiptNumber?: StringNullableWithAggregatesFilter<"PreRegistration"> | string | null
    receiptImageUrl?: StringNullableWithAggregatesFilter<"PreRegistration"> | string | null
    documentUrls?: StringNullableListFilter<"PreRegistration">
    status?: EnumStatusWithAggregatesFilter<"PreRegistration"> | $Enums.Status
    adminComment?: StringNullableWithAggregatesFilter<"PreRegistration"> | string | null
    processedBy?: IntNullableWithAggregatesFilter<"PreRegistration"> | number | null
    processedAt?: DateTimeNullableWithAggregatesFilter<"PreRegistration"> | Date | string | null
    studentId?: IntNullableWithAggregatesFilter<"PreRegistration"> | number | null
    submittedAt?: DateTimeWithAggregatesFilter<"PreRegistration"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PreRegistration"> | Date | string
  }

  export type GradeWhereInput = {
    AND?: GradeWhereInput | GradeWhereInput[]
    OR?: GradeWhereInput[]
    NOT?: GradeWhereInput | GradeWhereInput[]
    id?: IntFilter<"Grade"> | number
    value?: StringFilter<"Grade"> | string
    label?: StringFilter<"Grade"> | string
  }

  export type GradeOrderByWithRelationInput = {
    id?: SortOrder
    value?: SortOrder
    label?: SortOrder
  }

  export type GradeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    value?: string
    AND?: GradeWhereInput | GradeWhereInput[]
    OR?: GradeWhereInput[]
    NOT?: GradeWhereInput | GradeWhereInput[]
    label?: StringFilter<"Grade"> | string
  }, "id" | "value">

  export type GradeOrderByWithAggregationInput = {
    id?: SortOrder
    value?: SortOrder
    label?: SortOrder
    _count?: GradeCountOrderByAggregateInput
    _avg?: GradeAvgOrderByAggregateInput
    _max?: GradeMaxOrderByAggregateInput
    _min?: GradeMinOrderByAggregateInput
    _sum?: GradeSumOrderByAggregateInput
  }

  export type GradeScalarWhereWithAggregatesInput = {
    AND?: GradeScalarWhereWithAggregatesInput | GradeScalarWhereWithAggregatesInput[]
    OR?: GradeScalarWhereWithAggregatesInput[]
    NOT?: GradeScalarWhereWithAggregatesInput | GradeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Grade"> | number
    value?: StringWithAggregatesFilter<"Grade"> | string
    label?: StringWithAggregatesFilter<"Grade"> | string
  }

  export type PreRegistrationCreateInput = {
    childFirstName: string
    childLastName: string
    childDateOfBirth: Date | string
    gender: string
    childEmail?: string | null
    previousSchool?: string | null
    desiredGrade: string
    parentFirstName: string
    parentFullName: string
    parentEmail: string
    parentPhone: string
    parentAddress?: string | null
    fileNumber: string
    receiptNumber?: string | null
    receiptImageUrl?: string | null
    documentUrls?: PreRegistrationCreatedocumentUrlsInput | string[]
    status?: $Enums.Status
    adminComment?: string | null
    processedBy?: number | null
    processedAt?: Date | string | null
    studentId?: number | null
    submittedAt?: Date | string
    updatedAt?: Date | string
  }

  export type PreRegistrationUncheckedCreateInput = {
    id?: number
    childFirstName: string
    childLastName: string
    childDateOfBirth: Date | string
    gender: string
    childEmail?: string | null
    previousSchool?: string | null
    desiredGrade: string
    parentFirstName: string
    parentFullName: string
    parentEmail: string
    parentPhone: string
    parentAddress?: string | null
    fileNumber: string
    receiptNumber?: string | null
    receiptImageUrl?: string | null
    documentUrls?: PreRegistrationCreatedocumentUrlsInput | string[]
    status?: $Enums.Status
    adminComment?: string | null
    processedBy?: number | null
    processedAt?: Date | string | null
    studentId?: number | null
    submittedAt?: Date | string
    updatedAt?: Date | string
  }

  export type PreRegistrationUpdateInput = {
    childFirstName?: StringFieldUpdateOperationsInput | string
    childLastName?: StringFieldUpdateOperationsInput | string
    childDateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: StringFieldUpdateOperationsInput | string
    childEmail?: NullableStringFieldUpdateOperationsInput | string | null
    previousSchool?: NullableStringFieldUpdateOperationsInput | string | null
    desiredGrade?: StringFieldUpdateOperationsInput | string
    parentFirstName?: StringFieldUpdateOperationsInput | string
    parentFullName?: StringFieldUpdateOperationsInput | string
    parentEmail?: StringFieldUpdateOperationsInput | string
    parentPhone?: StringFieldUpdateOperationsInput | string
    parentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    fileNumber?: StringFieldUpdateOperationsInput | string
    receiptNumber?: NullableStringFieldUpdateOperationsInput | string | null
    receiptImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    documentUrls?: PreRegistrationUpdatedocumentUrlsInput | string[]
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    adminComment?: NullableStringFieldUpdateOperationsInput | string | null
    processedBy?: NullableIntFieldUpdateOperationsInput | number | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    studentId?: NullableIntFieldUpdateOperationsInput | number | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PreRegistrationUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    childFirstName?: StringFieldUpdateOperationsInput | string
    childLastName?: StringFieldUpdateOperationsInput | string
    childDateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: StringFieldUpdateOperationsInput | string
    childEmail?: NullableStringFieldUpdateOperationsInput | string | null
    previousSchool?: NullableStringFieldUpdateOperationsInput | string | null
    desiredGrade?: StringFieldUpdateOperationsInput | string
    parentFirstName?: StringFieldUpdateOperationsInput | string
    parentFullName?: StringFieldUpdateOperationsInput | string
    parentEmail?: StringFieldUpdateOperationsInput | string
    parentPhone?: StringFieldUpdateOperationsInput | string
    parentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    fileNumber?: StringFieldUpdateOperationsInput | string
    receiptNumber?: NullableStringFieldUpdateOperationsInput | string | null
    receiptImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    documentUrls?: PreRegistrationUpdatedocumentUrlsInput | string[]
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    adminComment?: NullableStringFieldUpdateOperationsInput | string | null
    processedBy?: NullableIntFieldUpdateOperationsInput | number | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    studentId?: NullableIntFieldUpdateOperationsInput | number | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PreRegistrationCreateManyInput = {
    id?: number
    childFirstName: string
    childLastName: string
    childDateOfBirth: Date | string
    gender: string
    childEmail?: string | null
    previousSchool?: string | null
    desiredGrade: string
    parentFirstName: string
    parentFullName: string
    parentEmail: string
    parentPhone: string
    parentAddress?: string | null
    fileNumber: string
    receiptNumber?: string | null
    receiptImageUrl?: string | null
    documentUrls?: PreRegistrationCreatedocumentUrlsInput | string[]
    status?: $Enums.Status
    adminComment?: string | null
    processedBy?: number | null
    processedAt?: Date | string | null
    studentId?: number | null
    submittedAt?: Date | string
    updatedAt?: Date | string
  }

  export type PreRegistrationUpdateManyMutationInput = {
    childFirstName?: StringFieldUpdateOperationsInput | string
    childLastName?: StringFieldUpdateOperationsInput | string
    childDateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: StringFieldUpdateOperationsInput | string
    childEmail?: NullableStringFieldUpdateOperationsInput | string | null
    previousSchool?: NullableStringFieldUpdateOperationsInput | string | null
    desiredGrade?: StringFieldUpdateOperationsInput | string
    parentFirstName?: StringFieldUpdateOperationsInput | string
    parentFullName?: StringFieldUpdateOperationsInput | string
    parentEmail?: StringFieldUpdateOperationsInput | string
    parentPhone?: StringFieldUpdateOperationsInput | string
    parentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    fileNumber?: StringFieldUpdateOperationsInput | string
    receiptNumber?: NullableStringFieldUpdateOperationsInput | string | null
    receiptImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    documentUrls?: PreRegistrationUpdatedocumentUrlsInput | string[]
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    adminComment?: NullableStringFieldUpdateOperationsInput | string | null
    processedBy?: NullableIntFieldUpdateOperationsInput | number | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    studentId?: NullableIntFieldUpdateOperationsInput | number | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PreRegistrationUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    childFirstName?: StringFieldUpdateOperationsInput | string
    childLastName?: StringFieldUpdateOperationsInput | string
    childDateOfBirth?: DateTimeFieldUpdateOperationsInput | Date | string
    gender?: StringFieldUpdateOperationsInput | string
    childEmail?: NullableStringFieldUpdateOperationsInput | string | null
    previousSchool?: NullableStringFieldUpdateOperationsInput | string | null
    desiredGrade?: StringFieldUpdateOperationsInput | string
    parentFirstName?: StringFieldUpdateOperationsInput | string
    parentFullName?: StringFieldUpdateOperationsInput | string
    parentEmail?: StringFieldUpdateOperationsInput | string
    parentPhone?: StringFieldUpdateOperationsInput | string
    parentAddress?: NullableStringFieldUpdateOperationsInput | string | null
    fileNumber?: StringFieldUpdateOperationsInput | string
    receiptNumber?: NullableStringFieldUpdateOperationsInput | string | null
    receiptImageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    documentUrls?: PreRegistrationUpdatedocumentUrlsInput | string[]
    status?: EnumStatusFieldUpdateOperationsInput | $Enums.Status
    adminComment?: NullableStringFieldUpdateOperationsInput | string | null
    processedBy?: NullableIntFieldUpdateOperationsInput | number | null
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    studentId?: NullableIntFieldUpdateOperationsInput | number | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type GradeCreateInput = {
    value: string
    label: string
  }

  export type GradeUncheckedCreateInput = {
    id?: number
    value: string
    label: string
  }

  export type GradeUpdateInput = {
    value?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
  }

  export type GradeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
  }

  export type GradeCreateManyInput = {
    id?: number
    value: string
    label: string
  }

  export type GradeUpdateManyMutationInput = {
    value?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
  }

  export type GradeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type EnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PreRegistrationCountOrderByAggregateInput = {
    id?: SortOrder
    childFirstName?: SortOrder
    childLastName?: SortOrder
    childDateOfBirth?: SortOrder
    gender?: SortOrder
    childEmail?: SortOrder
    previousSchool?: SortOrder
    desiredGrade?: SortOrder
    parentFirstName?: SortOrder
    parentFullName?: SortOrder
    parentEmail?: SortOrder
    parentPhone?: SortOrder
    parentAddress?: SortOrder
    fileNumber?: SortOrder
    receiptNumber?: SortOrder
    receiptImageUrl?: SortOrder
    documentUrls?: SortOrder
    status?: SortOrder
    adminComment?: SortOrder
    processedBy?: SortOrder
    processedAt?: SortOrder
    studentId?: SortOrder
    submittedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PreRegistrationAvgOrderByAggregateInput = {
    id?: SortOrder
    processedBy?: SortOrder
    studentId?: SortOrder
  }

  export type PreRegistrationMaxOrderByAggregateInput = {
    id?: SortOrder
    childFirstName?: SortOrder
    childLastName?: SortOrder
    childDateOfBirth?: SortOrder
    gender?: SortOrder
    childEmail?: SortOrder
    previousSchool?: SortOrder
    desiredGrade?: SortOrder
    parentFirstName?: SortOrder
    parentFullName?: SortOrder
    parentEmail?: SortOrder
    parentPhone?: SortOrder
    parentAddress?: SortOrder
    fileNumber?: SortOrder
    receiptNumber?: SortOrder
    receiptImageUrl?: SortOrder
    status?: SortOrder
    adminComment?: SortOrder
    processedBy?: SortOrder
    processedAt?: SortOrder
    studentId?: SortOrder
    submittedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PreRegistrationMinOrderByAggregateInput = {
    id?: SortOrder
    childFirstName?: SortOrder
    childLastName?: SortOrder
    childDateOfBirth?: SortOrder
    gender?: SortOrder
    childEmail?: SortOrder
    previousSchool?: SortOrder
    desiredGrade?: SortOrder
    parentFirstName?: SortOrder
    parentFullName?: SortOrder
    parentEmail?: SortOrder
    parentPhone?: SortOrder
    parentAddress?: SortOrder
    fileNumber?: SortOrder
    receiptNumber?: SortOrder
    receiptImageUrl?: SortOrder
    status?: SortOrder
    adminComment?: SortOrder
    processedBy?: SortOrder
    processedAt?: SortOrder
    studentId?: SortOrder
    submittedAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PreRegistrationSumOrderByAggregateInput = {
    id?: SortOrder
    processedBy?: SortOrder
    studentId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type GradeCountOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    label?: SortOrder
  }

  export type GradeAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type GradeMaxOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    label?: SortOrder
  }

  export type GradeMinOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    label?: SortOrder
  }

  export type GradeSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type PreRegistrationCreatedocumentUrlsInput = {
    set: string[]
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

  export type PreRegistrationUpdatedocumentUrlsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type EnumStatusFieldUpdateOperationsInput = {
    set?: $Enums.Status
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusFilter<$PrismaModel> | $Enums.Status
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Status | EnumStatusFieldRefInput<$PrismaModel>
    in?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.Status[] | ListEnumStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStatusWithAggregatesFilter<$PrismaModel> | $Enums.Status
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStatusFilter<$PrismaModel>
    _max?: NestedEnumStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
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