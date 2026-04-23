
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model RefreshToken
 * 
 */
export type RefreshToken = $Result.DefaultSelection<Prisma.$RefreshTokenPayload>
/**
 * Model PreRegistration
 * 
 */
export type PreRegistration = $Result.DefaultSelection<Prisma.$PreRegistrationPayload>
/**
 * Model Student
 * 
 */
export type Student = $Result.DefaultSelection<Prisma.$StudentPayload>
/**
 * Model Parent
 * 
 */
export type Parent = $Result.DefaultSelection<Prisma.$ParentPayload>
/**
 * Model Class
 * 
 */
export type Class = $Result.DefaultSelection<Prisma.$ClassPayload>
/**
 * Model Subject
 * 
 */
export type Subject = $Result.DefaultSelection<Prisma.$SubjectPayload>
/**
 * Model Teacher
 * 
 */
export type Teacher = $Result.DefaultSelection<Prisma.$TeacherPayload>
/**
 * Model TeacherSubjectClass
 * 
 */
export type TeacherSubjectClass = $Result.DefaultSelection<Prisma.$TeacherSubjectClassPayload>
/**
 * Model Mark
 * 
 */
export type Mark = $Result.DefaultSelection<Prisma.$MarkPayload>
/**
 * Model Absence
 * 
 */
export type Absence = $Result.DefaultSelection<Prisma.$AbsencePayload>
/**
 * Model Payment
 * 
 */
export type Payment = $Result.DefaultSelection<Prisma.$PaymentPayload>
/**
 * Model SchoolLevel
 * 
 */
export type SchoolLevel = $Result.DefaultSelection<Prisma.$SchoolLevelPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMIN: 'ADMIN',
  ENSEIGNANT: 'ENSEIGNANT',
  ELEVE: 'ELEVE',
  PARENT: 'PARENT'
};

export type Role = (typeof Role)[keyof typeof Role]


export const Status: {
  PENDING: 'PENDING',
  IN_REVIEW: 'IN_REVIEW',
  ACCEPTED: 'ACCEPTED',
  REJECTED: 'REJECTED'
};

export type Status = (typeof Status)[keyof typeof Status]


export const StudentStatus: {
  ACTIVE: 'ACTIVE',
  ARCHIVED: 'ARCHIVED'
};

export type StudentStatus = (typeof StudentStatus)[keyof typeof StudentStatus]


export const PaymentStatus: {
  PENDING: 'PENDING',
  PAID: 'PAID',
  LATE: 'LATE'
};

export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus]


export const AbsenceStatus: {
  PRESENT: 'PRESENT',
  ABSENT: 'ABSENT',
  LATE: 'LATE'
};

export type AbsenceStatus = (typeof AbsenceStatus)[keyof typeof AbsenceStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type Status = $Enums.Status

export const Status: typeof $Enums.Status

export type StudentStatus = $Enums.StudentStatus

export const StudentStatus: typeof $Enums.StudentStatus

export type PaymentStatus = $Enums.PaymentStatus

export const PaymentStatus: typeof $Enums.PaymentStatus

export type AbsenceStatus = $Enums.AbsenceStatus

export const AbsenceStatus: typeof $Enums.AbsenceStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
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
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.refreshToken`: Exposes CRUD operations for the **RefreshToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefreshTokens
    * const refreshTokens = await prisma.refreshToken.findMany()
    * ```
    */
  get refreshToken(): Prisma.RefreshTokenDelegate<ExtArgs, ClientOptions>;

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
   * `prisma.student`: Exposes CRUD operations for the **Student** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Students
    * const students = await prisma.student.findMany()
    * ```
    */
  get student(): Prisma.StudentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.parent`: Exposes CRUD operations for the **Parent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Parents
    * const parents = await prisma.parent.findMany()
    * ```
    */
  get parent(): Prisma.ParentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.class`: Exposes CRUD operations for the **Class** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Classes
    * const classes = await prisma.class.findMany()
    * ```
    */
  get class(): Prisma.ClassDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.subject`: Exposes CRUD operations for the **Subject** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subjects
    * const subjects = await prisma.subject.findMany()
    * ```
    */
  get subject(): Prisma.SubjectDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.teacher`: Exposes CRUD operations for the **Teacher** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Teachers
    * const teachers = await prisma.teacher.findMany()
    * ```
    */
  get teacher(): Prisma.TeacherDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.teacherSubjectClass`: Exposes CRUD operations for the **TeacherSubjectClass** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TeacherSubjectClasses
    * const teacherSubjectClasses = await prisma.teacherSubjectClass.findMany()
    * ```
    */
  get teacherSubjectClass(): Prisma.TeacherSubjectClassDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mark`: Exposes CRUD operations for the **Mark** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Marks
    * const marks = await prisma.mark.findMany()
    * ```
    */
  get mark(): Prisma.MarkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.absence`: Exposes CRUD operations for the **Absence** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Absences
    * const absences = await prisma.absence.findMany()
    * ```
    */
  get absence(): Prisma.AbsenceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Payments
    * const payments = await prisma.payment.findMany()
    * ```
    */
  get payment(): Prisma.PaymentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.schoolLevel`: Exposes CRUD operations for the **SchoolLevel** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SchoolLevels
    * const schoolLevels = await prisma.schoolLevel.findMany()
    * ```
    */
  get schoolLevel(): Prisma.SchoolLevelDelegate<ExtArgs, ClientOptions>;
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
    User: 'User',
    RefreshToken: 'RefreshToken',
    PreRegistration: 'PreRegistration',
    Student: 'Student',
    Parent: 'Parent',
    Class: 'Class',
    Subject: 'Subject',
    Teacher: 'Teacher',
    TeacherSubjectClass: 'TeacherSubjectClass',
    Mark: 'Mark',
    Absence: 'Absence',
    Payment: 'Payment',
    SchoolLevel: 'SchoolLevel'
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
      modelProps: "user" | "refreshToken" | "preRegistration" | "student" | "parent" | "class" | "subject" | "teacher" | "teacherSubjectClass" | "mark" | "absence" | "payment" | "schoolLevel"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      RefreshToken: {
        payload: Prisma.$RefreshTokenPayload<ExtArgs>
        fields: Prisma.RefreshTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefreshTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefreshTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findFirst: {
            args: Prisma.RefreshTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefreshTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          findMany: {
            args: Prisma.RefreshTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          create: {
            args: Prisma.RefreshTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          createMany: {
            args: Prisma.RefreshTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RefreshTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          delete: {
            args: Prisma.RefreshTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          update: {
            args: Prisma.RefreshTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          deleteMany: {
            args: Prisma.RefreshTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefreshTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RefreshTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>[]
          }
          upsert: {
            args: Prisma.RefreshTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshTokenPayload>
          }
          aggregate: {
            args: Prisma.RefreshTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefreshToken>
          }
          groupBy: {
            args: Prisma.RefreshTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefreshTokenCountArgs<ExtArgs>
            result: $Utils.Optional<RefreshTokenCountAggregateOutputType> | number
          }
        }
      }
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
      Student: {
        payload: Prisma.$StudentPayload<ExtArgs>
        fields: Prisma.StudentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.StudentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.StudentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findFirst: {
            args: Prisma.StudentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.StudentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          findMany: {
            args: Prisma.StudentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          create: {
            args: Prisma.StudentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          createMany: {
            args: Prisma.StudentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.StudentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          delete: {
            args: Prisma.StudentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          update: {
            args: Prisma.StudentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          deleteMany: {
            args: Prisma.StudentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.StudentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.StudentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>[]
          }
          upsert: {
            args: Prisma.StudentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$StudentPayload>
          }
          aggregate: {
            args: Prisma.StudentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateStudent>
          }
          groupBy: {
            args: Prisma.StudentGroupByArgs<ExtArgs>
            result: $Utils.Optional<StudentGroupByOutputType>[]
          }
          count: {
            args: Prisma.StudentCountArgs<ExtArgs>
            result: $Utils.Optional<StudentCountAggregateOutputType> | number
          }
        }
      }
      Parent: {
        payload: Prisma.$ParentPayload<ExtArgs>
        fields: Prisma.ParentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ParentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ParentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentPayload>
          }
          findFirst: {
            args: Prisma.ParentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ParentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentPayload>
          }
          findMany: {
            args: Prisma.ParentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentPayload>[]
          }
          create: {
            args: Prisma.ParentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentPayload>
          }
          createMany: {
            args: Prisma.ParentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ParentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentPayload>[]
          }
          delete: {
            args: Prisma.ParentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentPayload>
          }
          update: {
            args: Prisma.ParentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentPayload>
          }
          deleteMany: {
            args: Prisma.ParentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ParentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ParentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentPayload>[]
          }
          upsert: {
            args: Prisma.ParentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ParentPayload>
          }
          aggregate: {
            args: Prisma.ParentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateParent>
          }
          groupBy: {
            args: Prisma.ParentGroupByArgs<ExtArgs>
            result: $Utils.Optional<ParentGroupByOutputType>[]
          }
          count: {
            args: Prisma.ParentCountArgs<ExtArgs>
            result: $Utils.Optional<ParentCountAggregateOutputType> | number
          }
        }
      }
      Class: {
        payload: Prisma.$ClassPayload<ExtArgs>
        fields: Prisma.ClassFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClassFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClassFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          findFirst: {
            args: Prisma.ClassFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClassFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          findMany: {
            args: Prisma.ClassFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>[]
          }
          create: {
            args: Prisma.ClassCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          createMany: {
            args: Prisma.ClassCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ClassCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>[]
          }
          delete: {
            args: Prisma.ClassDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          update: {
            args: Prisma.ClassUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          deleteMany: {
            args: Prisma.ClassDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClassUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ClassUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>[]
          }
          upsert: {
            args: Prisma.ClassUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClassPayload>
          }
          aggregate: {
            args: Prisma.ClassAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClass>
          }
          groupBy: {
            args: Prisma.ClassGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClassGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClassCountArgs<ExtArgs>
            result: $Utils.Optional<ClassCountAggregateOutputType> | number
          }
        }
      }
      Subject: {
        payload: Prisma.$SubjectPayload<ExtArgs>
        fields: Prisma.SubjectFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubjectFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubjectFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          findFirst: {
            args: Prisma.SubjectFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubjectFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          findMany: {
            args: Prisma.SubjectFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>[]
          }
          create: {
            args: Prisma.SubjectCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          createMany: {
            args: Prisma.SubjectCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SubjectCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>[]
          }
          delete: {
            args: Prisma.SubjectDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          update: {
            args: Prisma.SubjectUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          deleteMany: {
            args: Prisma.SubjectDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SubjectUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SubjectUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>[]
          }
          upsert: {
            args: Prisma.SubjectUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SubjectPayload>
          }
          aggregate: {
            args: Prisma.SubjectAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSubject>
          }
          groupBy: {
            args: Prisma.SubjectGroupByArgs<ExtArgs>
            result: $Utils.Optional<SubjectGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubjectCountArgs<ExtArgs>
            result: $Utils.Optional<SubjectCountAggregateOutputType> | number
          }
        }
      }
      Teacher: {
        payload: Prisma.$TeacherPayload<ExtArgs>
        fields: Prisma.TeacherFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeacherFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeacherFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          findFirst: {
            args: Prisma.TeacherFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeacherFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          findMany: {
            args: Prisma.TeacherFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>[]
          }
          create: {
            args: Prisma.TeacherCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          createMany: {
            args: Prisma.TeacherCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeacherCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>[]
          }
          delete: {
            args: Prisma.TeacherDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          update: {
            args: Prisma.TeacherUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          deleteMany: {
            args: Prisma.TeacherDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeacherUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TeacherUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>[]
          }
          upsert: {
            args: Prisma.TeacherUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherPayload>
          }
          aggregate: {
            args: Prisma.TeacherAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeacher>
          }
          groupBy: {
            args: Prisma.TeacherGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeacherGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeacherCountArgs<ExtArgs>
            result: $Utils.Optional<TeacherCountAggregateOutputType> | number
          }
        }
      }
      TeacherSubjectClass: {
        payload: Prisma.$TeacherSubjectClassPayload<ExtArgs>
        fields: Prisma.TeacherSubjectClassFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeacherSubjectClassFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherSubjectClassPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeacherSubjectClassFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherSubjectClassPayload>
          }
          findFirst: {
            args: Prisma.TeacherSubjectClassFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherSubjectClassPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeacherSubjectClassFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherSubjectClassPayload>
          }
          findMany: {
            args: Prisma.TeacherSubjectClassFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherSubjectClassPayload>[]
          }
          create: {
            args: Prisma.TeacherSubjectClassCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherSubjectClassPayload>
          }
          createMany: {
            args: Prisma.TeacherSubjectClassCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeacherSubjectClassCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherSubjectClassPayload>[]
          }
          delete: {
            args: Prisma.TeacherSubjectClassDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherSubjectClassPayload>
          }
          update: {
            args: Prisma.TeacherSubjectClassUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherSubjectClassPayload>
          }
          deleteMany: {
            args: Prisma.TeacherSubjectClassDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeacherSubjectClassUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TeacherSubjectClassUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherSubjectClassPayload>[]
          }
          upsert: {
            args: Prisma.TeacherSubjectClassUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeacherSubjectClassPayload>
          }
          aggregate: {
            args: Prisma.TeacherSubjectClassAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeacherSubjectClass>
          }
          groupBy: {
            args: Prisma.TeacherSubjectClassGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeacherSubjectClassGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeacherSubjectClassCountArgs<ExtArgs>
            result: $Utils.Optional<TeacherSubjectClassCountAggregateOutputType> | number
          }
        }
      }
      Mark: {
        payload: Prisma.$MarkPayload<ExtArgs>
        fields: Prisma.MarkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MarkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MarkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarkPayload>
          }
          findFirst: {
            args: Prisma.MarkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MarkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarkPayload>
          }
          findMany: {
            args: Prisma.MarkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarkPayload>[]
          }
          create: {
            args: Prisma.MarkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarkPayload>
          }
          createMany: {
            args: Prisma.MarkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MarkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarkPayload>[]
          }
          delete: {
            args: Prisma.MarkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarkPayload>
          }
          update: {
            args: Prisma.MarkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarkPayload>
          }
          deleteMany: {
            args: Prisma.MarkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MarkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MarkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarkPayload>[]
          }
          upsert: {
            args: Prisma.MarkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarkPayload>
          }
          aggregate: {
            args: Prisma.MarkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMark>
          }
          groupBy: {
            args: Prisma.MarkGroupByArgs<ExtArgs>
            result: $Utils.Optional<MarkGroupByOutputType>[]
          }
          count: {
            args: Prisma.MarkCountArgs<ExtArgs>
            result: $Utils.Optional<MarkCountAggregateOutputType> | number
          }
        }
      }
      Absence: {
        payload: Prisma.$AbsencePayload<ExtArgs>
        fields: Prisma.AbsenceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AbsenceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsencePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AbsenceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsencePayload>
          }
          findFirst: {
            args: Prisma.AbsenceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsencePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AbsenceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsencePayload>
          }
          findMany: {
            args: Prisma.AbsenceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsencePayload>[]
          }
          create: {
            args: Prisma.AbsenceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsencePayload>
          }
          createMany: {
            args: Prisma.AbsenceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AbsenceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsencePayload>[]
          }
          delete: {
            args: Prisma.AbsenceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsencePayload>
          }
          update: {
            args: Prisma.AbsenceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsencePayload>
          }
          deleteMany: {
            args: Prisma.AbsenceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AbsenceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AbsenceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsencePayload>[]
          }
          upsert: {
            args: Prisma.AbsenceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AbsencePayload>
          }
          aggregate: {
            args: Prisma.AbsenceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAbsence>
          }
          groupBy: {
            args: Prisma.AbsenceGroupByArgs<ExtArgs>
            result: $Utils.Optional<AbsenceGroupByOutputType>[]
          }
          count: {
            args: Prisma.AbsenceCountArgs<ExtArgs>
            result: $Utils.Optional<AbsenceCountAggregateOutputType> | number
          }
        }
      }
      Payment: {
        payload: Prisma.$PaymentPayload<ExtArgs>
        fields: Prisma.PaymentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PaymentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PaymentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findFirst: {
            args: Prisma.PaymentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PaymentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          findMany: {
            args: Prisma.PaymentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          create: {
            args: Prisma.PaymentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          createMany: {
            args: Prisma.PaymentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PaymentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          delete: {
            args: Prisma.PaymentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          update: {
            args: Prisma.PaymentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          deleteMany: {
            args: Prisma.PaymentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PaymentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PaymentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>[]
          }
          upsert: {
            args: Prisma.PaymentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PaymentPayload>
          }
          aggregate: {
            args: Prisma.PaymentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePayment>
          }
          groupBy: {
            args: Prisma.PaymentGroupByArgs<ExtArgs>
            result: $Utils.Optional<PaymentGroupByOutputType>[]
          }
          count: {
            args: Prisma.PaymentCountArgs<ExtArgs>
            result: $Utils.Optional<PaymentCountAggregateOutputType> | number
          }
        }
      }
      SchoolLevel: {
        payload: Prisma.$SchoolLevelPayload<ExtArgs>
        fields: Prisma.SchoolLevelFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SchoolLevelFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolLevelPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SchoolLevelFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolLevelPayload>
          }
          findFirst: {
            args: Prisma.SchoolLevelFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolLevelPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SchoolLevelFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolLevelPayload>
          }
          findMany: {
            args: Prisma.SchoolLevelFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolLevelPayload>[]
          }
          create: {
            args: Prisma.SchoolLevelCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolLevelPayload>
          }
          createMany: {
            args: Prisma.SchoolLevelCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SchoolLevelCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolLevelPayload>[]
          }
          delete: {
            args: Prisma.SchoolLevelDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolLevelPayload>
          }
          update: {
            args: Prisma.SchoolLevelUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolLevelPayload>
          }
          deleteMany: {
            args: Prisma.SchoolLevelDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SchoolLevelUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SchoolLevelUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolLevelPayload>[]
          }
          upsert: {
            args: Prisma.SchoolLevelUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolLevelPayload>
          }
          aggregate: {
            args: Prisma.SchoolLevelAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSchoolLevel>
          }
          groupBy: {
            args: Prisma.SchoolLevelGroupByArgs<ExtArgs>
            result: $Utils.Optional<SchoolLevelGroupByOutputType>[]
          }
          count: {
            args: Prisma.SchoolLevelCountArgs<ExtArgs>
            result: $Utils.Optional<SchoolLevelCountAggregateOutputType> | number
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
    user?: UserOmit
    refreshToken?: RefreshTokenOmit
    preRegistration?: PreRegistrationOmit
    student?: StudentOmit
    parent?: ParentOmit
    class?: ClassOmit
    subject?: SubjectOmit
    teacher?: TeacherOmit
    teacherSubjectClass?: TeacherSubjectClassOmit
    mark?: MarkOmit
    absence?: AbsenceOmit
    payment?: PaymentOmit
    schoolLevel?: SchoolLevelOmit
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    processedRegistrations: number
    refreshTokens: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    processedRegistrations?: boolean | UserCountOutputTypeCountProcessedRegistrationsArgs
    refreshTokens?: boolean | UserCountOutputTypeCountRefreshTokensArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountProcessedRegistrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PreRegistrationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRefreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
  }


  /**
   * Count Type StudentCountOutputType
   */

  export type StudentCountOutputType = {
    absences: number
    marks: number
    payments: number
  }

  export type StudentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    absences?: boolean | StudentCountOutputTypeCountAbsencesArgs
    marks?: boolean | StudentCountOutputTypeCountMarksArgs
    payments?: boolean | StudentCountOutputTypeCountPaymentsArgs
  }

  // Custom InputTypes
  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the StudentCountOutputType
     */
    select?: StudentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountAbsencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AbsenceWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountMarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MarkWhereInput
  }

  /**
   * StudentCountOutputType without action
   */
  export type StudentCountOutputTypeCountPaymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
  }


  /**
   * Count Type ParentCountOutputType
   */

  export type ParentCountOutputType = {
    students: number
  }

  export type ParentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    students?: boolean | ParentCountOutputTypeCountStudentsArgs
  }

  // Custom InputTypes
  /**
   * ParentCountOutputType without action
   */
  export type ParentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParentCountOutputType
     */
    select?: ParentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ParentCountOutputType without action
   */
  export type ParentCountOutputTypeCountStudentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
  }


  /**
   * Count Type ClassCountOutputType
   */

  export type ClassCountOutputType = {
    students: number
    assignments: number
    marks: number
    absences: number
  }

  export type ClassCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    students?: boolean | ClassCountOutputTypeCountStudentsArgs
    assignments?: boolean | ClassCountOutputTypeCountAssignmentsArgs
    marks?: boolean | ClassCountOutputTypeCountMarksArgs
    absences?: boolean | ClassCountOutputTypeCountAbsencesArgs
  }

  // Custom InputTypes
  /**
   * ClassCountOutputType without action
   */
  export type ClassCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClassCountOutputType
     */
    select?: ClassCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClassCountOutputType without action
   */
  export type ClassCountOutputTypeCountStudentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
  }

  /**
   * ClassCountOutputType without action
   */
  export type ClassCountOutputTypeCountAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeacherSubjectClassWhereInput
  }

  /**
   * ClassCountOutputType without action
   */
  export type ClassCountOutputTypeCountMarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MarkWhereInput
  }

  /**
   * ClassCountOutputType without action
   */
  export type ClassCountOutputTypeCountAbsencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AbsenceWhereInput
  }


  /**
   * Count Type SubjectCountOutputType
   */

  export type SubjectCountOutputType = {
    assignments: number
    marks: number
  }

  export type SubjectCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignments?: boolean | SubjectCountOutputTypeCountAssignmentsArgs
    marks?: boolean | SubjectCountOutputTypeCountMarksArgs
  }

  // Custom InputTypes
  /**
   * SubjectCountOutputType without action
   */
  export type SubjectCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubjectCountOutputType
     */
    select?: SubjectCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SubjectCountOutputType without action
   */
  export type SubjectCountOutputTypeCountAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeacherSubjectClassWhereInput
  }

  /**
   * SubjectCountOutputType without action
   */
  export type SubjectCountOutputTypeCountMarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MarkWhereInput
  }


  /**
   * Count Type TeacherCountOutputType
   */

  export type TeacherCountOutputType = {
    headOfClasses: number
    assignments: number
    marks: number
    absences: number
  }

  export type TeacherCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    headOfClasses?: boolean | TeacherCountOutputTypeCountHeadOfClassesArgs
    assignments?: boolean | TeacherCountOutputTypeCountAssignmentsArgs
    marks?: boolean | TeacherCountOutputTypeCountMarksArgs
    absences?: boolean | TeacherCountOutputTypeCountAbsencesArgs
  }

  // Custom InputTypes
  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeacherCountOutputType
     */
    select?: TeacherCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeCountHeadOfClassesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassWhereInput
  }

  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeCountAssignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeacherSubjectClassWhereInput
  }

  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeCountMarksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MarkWhereInput
  }

  /**
   * TeacherCountOutputType without action
   */
  export type TeacherCountOutputTypeCountAbsencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AbsenceWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    firstName: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.Role | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    firstName: string | null
    name: string | null
    email: string | null
    passwordHash: string | null
    role: $Enums.Role | null
    active: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    firstName: number
    name: number
    email: number
    passwordHash: number
    role: number
    active: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    firstName?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    firstName?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    active?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    firstName?: true
    name?: true
    email?: true
    passwordHash?: true
    role?: true
    active?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
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
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
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




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    firstName: string
    name: string
    email: string
    passwordHash: string
    role: $Enums.Role
    active: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    parent?: boolean | User$parentArgs<ExtArgs>
    processedRegistrations?: boolean | User$processedRegistrationsArgs<ExtArgs>
    refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs>
    student?: boolean | User$studentArgs<ExtArgs>
    teacher?: boolean | User$teacherArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    firstName?: boolean
    name?: boolean
    email?: boolean
    passwordHash?: boolean
    role?: boolean
    active?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "name" | "email" | "passwordHash" | "role" | "active" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    parent?: boolean | User$parentArgs<ExtArgs>
    processedRegistrations?: boolean | User$processedRegistrationsArgs<ExtArgs>
    refreshTokens?: boolean | User$refreshTokensArgs<ExtArgs>
    student?: boolean | User$studentArgs<ExtArgs>
    teacher?: boolean | User$teacherArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      parent: Prisma.$ParentPayload<ExtArgs> | null
      processedRegistrations: Prisma.$PreRegistrationPayload<ExtArgs>[]
      refreshTokens: Prisma.$RefreshTokenPayload<ExtArgs>[]
      student: Prisma.$StudentPayload<ExtArgs> | null
      teacher: Prisma.$TeacherPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      firstName: string
      name: string
      email: string
      passwordHash: string
      role: $Enums.Role
      active: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
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
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
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
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
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
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

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
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

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
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

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
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

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
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

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
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


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
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    parent<T extends User$parentArgs<ExtArgs> = {}>(args?: Subset<T, User$parentArgs<ExtArgs>>): Prisma__ParentClient<$Result.GetResult<Prisma.$ParentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    processedRegistrations<T extends User$processedRegistrationsArgs<ExtArgs> = {}>(args?: Subset<T, User$processedRegistrationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PreRegistrationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    refreshTokens<T extends User$refreshTokensArgs<ExtArgs> = {}>(args?: Subset<T, User$refreshTokensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    student<T extends User$studentArgs<ExtArgs> = {}>(args?: Subset<T, User$studentArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    teacher<T extends User$teacherArgs<ExtArgs> = {}>(args?: Subset<T, User$teacherArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly active: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
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
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
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
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
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
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
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
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.parent
   */
  export type User$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parent
     */
    select?: ParentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parent
     */
    omit?: ParentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentInclude<ExtArgs> | null
    where?: ParentWhereInput
  }

  /**
   * User.processedRegistrations
   */
  export type User$processedRegistrationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreRegistration
     */
    select?: PreRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreRegistration
     */
    omit?: PreRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreRegistrationInclude<ExtArgs> | null
    where?: PreRegistrationWhereInput
    orderBy?: PreRegistrationOrderByWithRelationInput | PreRegistrationOrderByWithRelationInput[]
    cursor?: PreRegistrationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PreRegistrationScalarFieldEnum | PreRegistrationScalarFieldEnum[]
  }

  /**
   * User.refreshTokens
   */
  export type User$refreshTokensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    cursor?: RefreshTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * User.student
   */
  export type User$studentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    where?: StudentWhereInput
  }

  /**
   * User.teacher
   */
  export type User$teacherArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    where?: TeacherWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model RefreshToken
   */

  export type AggregateRefreshToken = {
    _count: RefreshTokenCountAggregateOutputType | null
    _avg: RefreshTokenAvgAggregateOutputType | null
    _sum: RefreshTokenSumAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  export type RefreshTokenAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type RefreshTokenSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type RefreshTokenMinAggregateOutputType = {
    id: number | null
    token: string | null
    userId: number | null
    expiresAt: Date | null
    createdAt: Date | null
    revoked: boolean | null
  }

  export type RefreshTokenMaxAggregateOutputType = {
    id: number | null
    token: string | null
    userId: number | null
    expiresAt: Date | null
    createdAt: Date | null
    revoked: boolean | null
  }

  export type RefreshTokenCountAggregateOutputType = {
    id: number
    token: number
    userId: number
    expiresAt: number
    createdAt: number
    revoked: number
    _all: number
  }


  export type RefreshTokenAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type RefreshTokenSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type RefreshTokenMinAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
    revoked?: true
  }

  export type RefreshTokenMaxAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
    revoked?: true
  }

  export type RefreshTokenCountAggregateInputType = {
    id?: true
    token?: true
    userId?: true
    expiresAt?: true
    createdAt?: true
    revoked?: true
    _all?: true
  }

  export type RefreshTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshToken to aggregate.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefreshTokens
    **/
    _count?: true | RefreshTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RefreshTokenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RefreshTokenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefreshTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type GetRefreshTokenAggregateType<T extends RefreshTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateRefreshToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefreshToken[P]>
      : GetScalarType<T[P], AggregateRefreshToken[P]>
  }




  export type RefreshTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshTokenWhereInput
    orderBy?: RefreshTokenOrderByWithAggregationInput | RefreshTokenOrderByWithAggregationInput[]
    by: RefreshTokenScalarFieldEnum[] | RefreshTokenScalarFieldEnum
    having?: RefreshTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefreshTokenCountAggregateInputType | true
    _avg?: RefreshTokenAvgAggregateInputType
    _sum?: RefreshTokenSumAggregateInputType
    _min?: RefreshTokenMinAggregateInputType
    _max?: RefreshTokenMaxAggregateInputType
  }

  export type RefreshTokenGroupByOutputType = {
    id: number
    token: string
    userId: number
    expiresAt: Date
    createdAt: Date
    revoked: boolean
    _count: RefreshTokenCountAggregateOutputType | null
    _avg: RefreshTokenAvgAggregateOutputType | null
    _sum: RefreshTokenSumAggregateOutputType | null
    _min: RefreshTokenMinAggregateOutputType | null
    _max: RefreshTokenMaxAggregateOutputType | null
  }

  type GetRefreshTokenGroupByPayload<T extends RefreshTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefreshTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefreshTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
            : GetScalarType<T[P], RefreshTokenGroupByOutputType[P]>
        }
      >
    >


  export type RefreshTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    revoked?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    revoked?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    revoked?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshToken"]>

  export type RefreshTokenSelectScalar = {
    id?: boolean
    token?: boolean
    userId?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    revoked?: boolean
  }

  export type RefreshTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "token" | "userId" | "expiresAt" | "createdAt" | "revoked", ExtArgs["result"]["refreshToken"]>
  export type RefreshTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RefreshTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RefreshTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RefreshToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      token: string
      userId: number
      expiresAt: Date
      createdAt: Date
      revoked: boolean
    }, ExtArgs["result"]["refreshToken"]>
    composites: {}
  }

  type RefreshTokenGetPayload<S extends boolean | null | undefined | RefreshTokenDefaultArgs> = $Result.GetResult<Prisma.$RefreshTokenPayload, S>

  type RefreshTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RefreshTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RefreshTokenCountAggregateInputType | true
    }

  export interface RefreshTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RefreshToken'], meta: { name: 'RefreshToken' } }
    /**
     * Find zero or one RefreshToken that matches the filter.
     * @param {RefreshTokenFindUniqueArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefreshTokenFindUniqueArgs>(args: SelectSubset<T, RefreshTokenFindUniqueArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RefreshToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RefreshTokenFindUniqueOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefreshTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, RefreshTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefreshTokenFindFirstArgs>(args?: SelectSubset<T, RefreshTokenFindFirstArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindFirstOrThrowArgs} args - Arguments to find a RefreshToken
     * @example
     * // Get one RefreshToken
     * const refreshToken = await prisma.refreshToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefreshTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, RefreshTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RefreshTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany()
     * 
     * // Get first 10 RefreshTokens
     * const refreshTokens = await prisma.refreshToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefreshTokenFindManyArgs>(args?: SelectSubset<T, RefreshTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RefreshToken.
     * @param {RefreshTokenCreateArgs} args - Arguments to create a RefreshToken.
     * @example
     * // Create one RefreshToken
     * const RefreshToken = await prisma.refreshToken.create({
     *   data: {
     *     // ... data to create a RefreshToken
     *   }
     * })
     * 
     */
    create<T extends RefreshTokenCreateArgs>(args: SelectSubset<T, RefreshTokenCreateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RefreshTokens.
     * @param {RefreshTokenCreateManyArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefreshTokenCreateManyArgs>(args?: SelectSubset<T, RefreshTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RefreshTokens and returns the data saved in the database.
     * @param {RefreshTokenCreateManyAndReturnArgs} args - Arguments to create many RefreshTokens.
     * @example
     * // Create many RefreshTokens
     * const refreshToken = await prisma.refreshToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RefreshTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, RefreshTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RefreshToken.
     * @param {RefreshTokenDeleteArgs} args - Arguments to delete one RefreshToken.
     * @example
     * // Delete one RefreshToken
     * const RefreshToken = await prisma.refreshToken.delete({
     *   where: {
     *     // ... filter to delete one RefreshToken
     *   }
     * })
     * 
     */
    delete<T extends RefreshTokenDeleteArgs>(args: SelectSubset<T, RefreshTokenDeleteArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RefreshToken.
     * @param {RefreshTokenUpdateArgs} args - Arguments to update one RefreshToken.
     * @example
     * // Update one RefreshToken
     * const refreshToken = await prisma.refreshToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefreshTokenUpdateArgs>(args: SelectSubset<T, RefreshTokenUpdateArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RefreshTokens.
     * @param {RefreshTokenDeleteManyArgs} args - Arguments to filter RefreshTokens to delete.
     * @example
     * // Delete a few RefreshTokens
     * const { count } = await prisma.refreshToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefreshTokenDeleteManyArgs>(args?: SelectSubset<T, RefreshTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefreshTokenUpdateManyArgs>(args: SelectSubset<T, RefreshTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshTokens and returns the data updated in the database.
     * @param {RefreshTokenUpdateManyAndReturnArgs} args - Arguments to update many RefreshTokens.
     * @example
     * // Update many RefreshTokens
     * const refreshToken = await prisma.refreshToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RefreshTokens and only return the `id`
     * const refreshTokenWithIdOnly = await prisma.refreshToken.updateManyAndReturn({
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
    updateManyAndReturn<T extends RefreshTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, RefreshTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RefreshToken.
     * @param {RefreshTokenUpsertArgs} args - Arguments to update or create a RefreshToken.
     * @example
     * // Update or create a RefreshToken
     * const refreshToken = await prisma.refreshToken.upsert({
     *   create: {
     *     // ... data to create a RefreshToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefreshToken we want to update
     *   }
     * })
     */
    upsert<T extends RefreshTokenUpsertArgs>(args: SelectSubset<T, RefreshTokenUpsertArgs<ExtArgs>>): Prisma__RefreshTokenClient<$Result.GetResult<Prisma.$RefreshTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RefreshTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenCountArgs} args - Arguments to filter RefreshTokens to count.
     * @example
     * // Count the number of RefreshTokens
     * const count = await prisma.refreshToken.count({
     *   where: {
     *     // ... the filter for the RefreshTokens we want to count
     *   }
     * })
    **/
    count<T extends RefreshTokenCountArgs>(
      args?: Subset<T, RefreshTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefreshTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RefreshTokenAggregateArgs>(args: Subset<T, RefreshTokenAggregateArgs>): Prisma.PrismaPromise<GetRefreshTokenAggregateType<T>>

    /**
     * Group by RefreshToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshTokenGroupByArgs} args - Group by arguments.
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
      T extends RefreshTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefreshTokenGroupByArgs['orderBy'] }
        : { orderBy?: RefreshTokenGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RefreshTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefreshTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RefreshToken model
   */
  readonly fields: RefreshTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefreshToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefreshTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the RefreshToken model
   */
  interface RefreshTokenFieldRefs {
    readonly id: FieldRef<"RefreshToken", 'Int'>
    readonly token: FieldRef<"RefreshToken", 'String'>
    readonly userId: FieldRef<"RefreshToken", 'Int'>
    readonly expiresAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly createdAt: FieldRef<"RefreshToken", 'DateTime'>
    readonly revoked: FieldRef<"RefreshToken", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * RefreshToken findUnique
   */
  export type RefreshTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findUniqueOrThrow
   */
  export type RefreshTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken findFirst
   */
  export type RefreshTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findFirstOrThrow
   */
  export type RefreshTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshToken to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken findMany
   */
  export type RefreshTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter, which RefreshTokens to fetch.
     */
    where?: RefreshTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshTokens to fetch.
     */
    orderBy?: RefreshTokenOrderByWithRelationInput | RefreshTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefreshTokens.
     */
    cursor?: RefreshTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshTokens.
     */
    distinct?: RefreshTokenScalarFieldEnum | RefreshTokenScalarFieldEnum[]
  }

  /**
   * RefreshToken create
   */
  export type RefreshTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a RefreshToken.
     */
    data: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
  }

  /**
   * RefreshToken createMany
   */
  export type RefreshTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefreshToken createManyAndReturn
   */
  export type RefreshTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to create many RefreshTokens.
     */
    data: RefreshTokenCreateManyInput | RefreshTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken update
   */
  export type RefreshTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a RefreshToken.
     */
    data: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
    /**
     * Choose, which RefreshToken to update.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken updateMany
   */
  export type RefreshTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
  }

  /**
   * RefreshToken updateManyAndReturn
   */
  export type RefreshTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * The data used to update RefreshTokens.
     */
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyInput>
    /**
     * Filter which RefreshTokens to update
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshToken upsert
   */
  export type RefreshTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the RefreshToken to update in case it exists.
     */
    where: RefreshTokenWhereUniqueInput
    /**
     * In case the RefreshToken found by the `where` argument doesn't exist, create a new RefreshToken with this data.
     */
    create: XOR<RefreshTokenCreateInput, RefreshTokenUncheckedCreateInput>
    /**
     * In case the RefreshToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefreshTokenUpdateInput, RefreshTokenUncheckedUpdateInput>
  }

  /**
   * RefreshToken delete
   */
  export type RefreshTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
    /**
     * Filter which RefreshToken to delete.
     */
    where: RefreshTokenWhereUniqueInput
  }

  /**
   * RefreshToken deleteMany
   */
  export type RefreshTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshTokens to delete
     */
    where?: RefreshTokenWhereInput
    /**
     * Limit how many RefreshTokens to delete.
     */
    limit?: number
  }

  /**
   * RefreshToken without action
   */
  export type RefreshTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshToken
     */
    select?: RefreshTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshToken
     */
    omit?: RefreshTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshTokenInclude<ExtArgs> | null
  }


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
    parentEmailSentAt: Date | null
    studentEmailSentAt: Date | null
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
    parentEmailSentAt: Date | null
    studentEmailSentAt: Date | null
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
    parentEmailSentAt: number
    studentEmailSentAt: number
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
    parentEmailSentAt?: true
    studentEmailSentAt?: true
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
    parentEmailSentAt?: true
    studentEmailSentAt?: true
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
    parentEmailSentAt?: true
    studentEmailSentAt?: true
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
    parentEmailSentAt: Date | null
    studentEmailSentAt: Date | null
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
    parentEmailSentAt?: boolean
    studentEmailSentAt?: boolean
    processedByUser?: boolean | PreRegistration$processedByUserArgs<ExtArgs>
    student?: boolean | PreRegistration$studentArgs<ExtArgs>
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
    parentEmailSentAt?: boolean
    studentEmailSentAt?: boolean
    processedByUser?: boolean | PreRegistration$processedByUserArgs<ExtArgs>
    student?: boolean | PreRegistration$studentArgs<ExtArgs>
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
    parentEmailSentAt?: boolean
    studentEmailSentAt?: boolean
    processedByUser?: boolean | PreRegistration$processedByUserArgs<ExtArgs>
    student?: boolean | PreRegistration$studentArgs<ExtArgs>
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
    parentEmailSentAt?: boolean
    studentEmailSentAt?: boolean
  }

  export type PreRegistrationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "childFirstName" | "childLastName" | "childDateOfBirth" | "gender" | "childEmail" | "previousSchool" | "desiredGrade" | "parentFirstName" | "parentFullName" | "parentEmail" | "parentPhone" | "parentAddress" | "fileNumber" | "receiptNumber" | "receiptImageUrl" | "documentUrls" | "status" | "adminComment" | "processedBy" | "processedAt" | "studentId" | "submittedAt" | "updatedAt" | "parentEmailSentAt" | "studentEmailSentAt", ExtArgs["result"]["preRegistration"]>
  export type PreRegistrationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    processedByUser?: boolean | PreRegistration$processedByUserArgs<ExtArgs>
    student?: boolean | PreRegistration$studentArgs<ExtArgs>
  }
  export type PreRegistrationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    processedByUser?: boolean | PreRegistration$processedByUserArgs<ExtArgs>
    student?: boolean | PreRegistration$studentArgs<ExtArgs>
  }
  export type PreRegistrationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    processedByUser?: boolean | PreRegistration$processedByUserArgs<ExtArgs>
    student?: boolean | PreRegistration$studentArgs<ExtArgs>
  }

  export type $PreRegistrationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PreRegistration"
    objects: {
      processedByUser: Prisma.$UserPayload<ExtArgs> | null
      student: Prisma.$StudentPayload<ExtArgs> | null
    }
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
      parentEmailSentAt: Date | null
      studentEmailSentAt: Date | null
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
    processedByUser<T extends PreRegistration$processedByUserArgs<ExtArgs> = {}>(args?: Subset<T, PreRegistration$processedByUserArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    student<T extends PreRegistration$studentArgs<ExtArgs> = {}>(args?: Subset<T, PreRegistration$studentArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
    readonly parentEmailSentAt: FieldRef<"PreRegistration", 'DateTime'>
    readonly studentEmailSentAt: FieldRef<"PreRegistration", 'DateTime'>
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
     * Choose, which related nodes to fetch as well
     */
    include?: PreRegistrationInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: PreRegistrationInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: PreRegistrationInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: PreRegistrationInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: PreRegistrationInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: PreRegistrationInclude<ExtArgs> | null
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreRegistrationIncludeCreateManyAndReturn<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: PreRegistrationInclude<ExtArgs> | null
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreRegistrationIncludeUpdateManyAndReturn<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: PreRegistrationInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: PreRegistrationInclude<ExtArgs> | null
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
   * PreRegistration.processedByUser
   */
  export type PreRegistration$processedByUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * PreRegistration.student
   */
  export type PreRegistration$studentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    where?: StudentWhereInput
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
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreRegistrationInclude<ExtArgs> | null
  }


  /**
   * Model Student
   */

  export type AggregateStudent = {
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  export type StudentAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    classId: number | null
    parentId: number | null
  }

  export type StudentSumAggregateOutputType = {
    id: number | null
    userId: number | null
    classId: number | null
    parentId: number | null
  }

  export type StudentMinAggregateOutputType = {
    id: number | null
    userId: number | null
    classId: number | null
    status: $Enums.StudentStatus | null
    schoolYear: string | null
    birthDate: Date | null
    address: string | null
    parentId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudentMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    classId: number | null
    status: $Enums.StudentStatus | null
    schoolYear: string | null
    birthDate: Date | null
    address: string | null
    parentId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type StudentCountAggregateOutputType = {
    id: number
    userId: number
    classId: number
    status: number
    schoolYear: number
    birthDate: number
    address: number
    parentId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type StudentAvgAggregateInputType = {
    id?: true
    userId?: true
    classId?: true
    parentId?: true
  }

  export type StudentSumAggregateInputType = {
    id?: true
    userId?: true
    classId?: true
    parentId?: true
  }

  export type StudentMinAggregateInputType = {
    id?: true
    userId?: true
    classId?: true
    status?: true
    schoolYear?: true
    birthDate?: true
    address?: true
    parentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudentMaxAggregateInputType = {
    id?: true
    userId?: true
    classId?: true
    status?: true
    schoolYear?: true
    birthDate?: true
    address?: true
    parentId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type StudentCountAggregateInputType = {
    id?: true
    userId?: true
    classId?: true
    status?: true
    schoolYear?: true
    birthDate?: true
    address?: true
    parentId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type StudentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Student to aggregate.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Students
    **/
    _count?: true | StudentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StudentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StudentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StudentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StudentMaxAggregateInputType
  }

  export type GetStudentAggregateType<T extends StudentAggregateArgs> = {
        [P in keyof T & keyof AggregateStudent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStudent[P]>
      : GetScalarType<T[P], AggregateStudent[P]>
  }




  export type StudentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithAggregationInput | StudentOrderByWithAggregationInput[]
    by: StudentScalarFieldEnum[] | StudentScalarFieldEnum
    having?: StudentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StudentCountAggregateInputType | true
    _avg?: StudentAvgAggregateInputType
    _sum?: StudentSumAggregateInputType
    _min?: StudentMinAggregateInputType
    _max?: StudentMaxAggregateInputType
  }

  export type StudentGroupByOutputType = {
    id: number
    userId: number
    classId: number | null
    status: $Enums.StudentStatus
    schoolYear: string
    birthDate: Date
    address: string | null
    parentId: number | null
    createdAt: Date
    updatedAt: Date
    _count: StudentCountAggregateOutputType | null
    _avg: StudentAvgAggregateOutputType | null
    _sum: StudentSumAggregateOutputType | null
    _min: StudentMinAggregateOutputType | null
    _max: StudentMaxAggregateOutputType | null
  }

  type GetStudentGroupByPayload<T extends StudentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<StudentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StudentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StudentGroupByOutputType[P]>
            : GetScalarType<T[P], StudentGroupByOutputType[P]>
        }
      >
    >


  export type StudentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    classId?: boolean
    status?: boolean
    schoolYear?: boolean
    birthDate?: boolean
    address?: boolean
    parentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    absences?: boolean | Student$absencesArgs<ExtArgs>
    marks?: boolean | Student$marksArgs<ExtArgs>
    payments?: boolean | Student$paymentsArgs<ExtArgs>
    preRegistration?: boolean | Student$preRegistrationArgs<ExtArgs>
    class?: boolean | Student$classArgs<ExtArgs>
    parent?: boolean | Student$parentArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>

  export type StudentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    classId?: boolean
    status?: boolean
    schoolYear?: boolean
    birthDate?: boolean
    address?: boolean
    parentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    class?: boolean | Student$classArgs<ExtArgs>
    parent?: boolean | Student$parentArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>

  export type StudentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    classId?: boolean
    status?: boolean
    schoolYear?: boolean
    birthDate?: boolean
    address?: boolean
    parentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    class?: boolean | Student$classArgs<ExtArgs>
    parent?: boolean | Student$parentArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["student"]>

  export type StudentSelectScalar = {
    id?: boolean
    userId?: boolean
    classId?: boolean
    status?: boolean
    schoolYear?: boolean
    birthDate?: boolean
    address?: boolean
    parentId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type StudentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "classId" | "status" | "schoolYear" | "birthDate" | "address" | "parentId" | "createdAt" | "updatedAt", ExtArgs["result"]["student"]>
  export type StudentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    absences?: boolean | Student$absencesArgs<ExtArgs>
    marks?: boolean | Student$marksArgs<ExtArgs>
    payments?: boolean | Student$paymentsArgs<ExtArgs>
    preRegistration?: boolean | Student$preRegistrationArgs<ExtArgs>
    class?: boolean | Student$classArgs<ExtArgs>
    parent?: boolean | Student$parentArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | StudentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type StudentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    class?: boolean | Student$classArgs<ExtArgs>
    parent?: boolean | Student$parentArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type StudentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    class?: boolean | Student$classArgs<ExtArgs>
    parent?: boolean | Student$parentArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $StudentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Student"
    objects: {
      absences: Prisma.$AbsencePayload<ExtArgs>[]
      marks: Prisma.$MarkPayload<ExtArgs>[]
      payments: Prisma.$PaymentPayload<ExtArgs>[]
      preRegistration: Prisma.$PreRegistrationPayload<ExtArgs> | null
      class: Prisma.$ClassPayload<ExtArgs> | null
      parent: Prisma.$ParentPayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      classId: number | null
      status: $Enums.StudentStatus
      schoolYear: string
      birthDate: Date
      address: string | null
      parentId: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["student"]>
    composites: {}
  }

  type StudentGetPayload<S extends boolean | null | undefined | StudentDefaultArgs> = $Result.GetResult<Prisma.$StudentPayload, S>

  type StudentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<StudentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: StudentCountAggregateInputType | true
    }

  export interface StudentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Student'], meta: { name: 'Student' } }
    /**
     * Find zero or one Student that matches the filter.
     * @param {StudentFindUniqueArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends StudentFindUniqueArgs>(args: SelectSubset<T, StudentFindUniqueArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Student that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {StudentFindUniqueOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends StudentFindUniqueOrThrowArgs>(args: SelectSubset<T, StudentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends StudentFindFirstArgs>(args?: SelectSubset<T, StudentFindFirstArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Student that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindFirstOrThrowArgs} args - Arguments to find a Student
     * @example
     * // Get one Student
     * const student = await prisma.student.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends StudentFindFirstOrThrowArgs>(args?: SelectSubset<T, StudentFindFirstOrThrowArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Students that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Students
     * const students = await prisma.student.findMany()
     * 
     * // Get first 10 Students
     * const students = await prisma.student.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const studentWithIdOnly = await prisma.student.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends StudentFindManyArgs>(args?: SelectSubset<T, StudentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Student.
     * @param {StudentCreateArgs} args - Arguments to create a Student.
     * @example
     * // Create one Student
     * const Student = await prisma.student.create({
     *   data: {
     *     // ... data to create a Student
     *   }
     * })
     * 
     */
    create<T extends StudentCreateArgs>(args: SelectSubset<T, StudentCreateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Students.
     * @param {StudentCreateManyArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends StudentCreateManyArgs>(args?: SelectSubset<T, StudentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Students and returns the data saved in the database.
     * @param {StudentCreateManyAndReturnArgs} args - Arguments to create many Students.
     * @example
     * // Create many Students
     * const student = await prisma.student.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Students and only return the `id`
     * const studentWithIdOnly = await prisma.student.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends StudentCreateManyAndReturnArgs>(args?: SelectSubset<T, StudentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Student.
     * @param {StudentDeleteArgs} args - Arguments to delete one Student.
     * @example
     * // Delete one Student
     * const Student = await prisma.student.delete({
     *   where: {
     *     // ... filter to delete one Student
     *   }
     * })
     * 
     */
    delete<T extends StudentDeleteArgs>(args: SelectSubset<T, StudentDeleteArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Student.
     * @param {StudentUpdateArgs} args - Arguments to update one Student.
     * @example
     * // Update one Student
     * const student = await prisma.student.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends StudentUpdateArgs>(args: SelectSubset<T, StudentUpdateArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Students.
     * @param {StudentDeleteManyArgs} args - Arguments to filter Students to delete.
     * @example
     * // Delete a few Students
     * const { count } = await prisma.student.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends StudentDeleteManyArgs>(args?: SelectSubset<T, StudentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends StudentUpdateManyArgs>(args: SelectSubset<T, StudentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Students and returns the data updated in the database.
     * @param {StudentUpdateManyAndReturnArgs} args - Arguments to update many Students.
     * @example
     * // Update many Students
     * const student = await prisma.student.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Students and only return the `id`
     * const studentWithIdOnly = await prisma.student.updateManyAndReturn({
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
    updateManyAndReturn<T extends StudentUpdateManyAndReturnArgs>(args: SelectSubset<T, StudentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Student.
     * @param {StudentUpsertArgs} args - Arguments to update or create a Student.
     * @example
     * // Update or create a Student
     * const student = await prisma.student.upsert({
     *   create: {
     *     // ... data to create a Student
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Student we want to update
     *   }
     * })
     */
    upsert<T extends StudentUpsertArgs>(args: SelectSubset<T, StudentUpsertArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Students.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentCountArgs} args - Arguments to filter Students to count.
     * @example
     * // Count the number of Students
     * const count = await prisma.student.count({
     *   where: {
     *     // ... the filter for the Students we want to count
     *   }
     * })
    **/
    count<T extends StudentCountArgs>(
      args?: Subset<T, StudentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StudentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends StudentAggregateArgs>(args: Subset<T, StudentAggregateArgs>): Prisma.PrismaPromise<GetStudentAggregateType<T>>

    /**
     * Group by Student.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StudentGroupByArgs} args - Group by arguments.
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
      T extends StudentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StudentGroupByArgs['orderBy'] }
        : { orderBy?: StudentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, StudentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStudentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Student model
   */
  readonly fields: StudentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Student.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__StudentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    absences<T extends Student$absencesArgs<ExtArgs> = {}>(args?: Subset<T, Student$absencesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AbsencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    marks<T extends Student$marksArgs<ExtArgs> = {}>(args?: Subset<T, Student$marksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    payments<T extends Student$paymentsArgs<ExtArgs> = {}>(args?: Subset<T, Student$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    preRegistration<T extends Student$preRegistrationArgs<ExtArgs> = {}>(args?: Subset<T, Student$preRegistrationArgs<ExtArgs>>): Prisma__PreRegistrationClient<$Result.GetResult<Prisma.$PreRegistrationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    class<T extends Student$classArgs<ExtArgs> = {}>(args?: Subset<T, Student$classArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    parent<T extends Student$parentArgs<ExtArgs> = {}>(args?: Subset<T, Student$parentArgs<ExtArgs>>): Prisma__ParentClient<$Result.GetResult<Prisma.$ParentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Student model
   */
  interface StudentFieldRefs {
    readonly id: FieldRef<"Student", 'Int'>
    readonly userId: FieldRef<"Student", 'Int'>
    readonly classId: FieldRef<"Student", 'Int'>
    readonly status: FieldRef<"Student", 'StudentStatus'>
    readonly schoolYear: FieldRef<"Student", 'String'>
    readonly birthDate: FieldRef<"Student", 'DateTime'>
    readonly address: FieldRef<"Student", 'String'>
    readonly parentId: FieldRef<"Student", 'Int'>
    readonly createdAt: FieldRef<"Student", 'DateTime'>
    readonly updatedAt: FieldRef<"Student", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Student findUnique
   */
  export type StudentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findUniqueOrThrow
   */
  export type StudentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student findFirst
   */
  export type StudentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findFirstOrThrow
   */
  export type StudentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Student to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student findMany
   */
  export type StudentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter, which Students to fetch.
     */
    where?: StudentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Students to fetch.
     */
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Students.
     */
    cursor?: StudentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Students from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Students.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Students.
     */
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Student create
   */
  export type StudentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to create a Student.
     */
    data: XOR<StudentCreateInput, StudentUncheckedCreateInput>
  }

  /**
   * Student createMany
   */
  export type StudentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Student createManyAndReturn
   */
  export type StudentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * The data used to create many Students.
     */
    data: StudentCreateManyInput | StudentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Student update
   */
  export type StudentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The data needed to update a Student.
     */
    data: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
    /**
     * Choose, which Student to update.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student updateMany
   */
  export type StudentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to update.
     */
    limit?: number
  }

  /**
   * Student updateManyAndReturn
   */
  export type StudentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * The data used to update Students.
     */
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyInput>
    /**
     * Filter which Students to update
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Student upsert
   */
  export type StudentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * The filter to search for the Student to update in case it exists.
     */
    where: StudentWhereUniqueInput
    /**
     * In case the Student found by the `where` argument doesn't exist, create a new Student with this data.
     */
    create: XOR<StudentCreateInput, StudentUncheckedCreateInput>
    /**
     * In case the Student was found with the provided `where` argument, update it with this data.
     */
    update: XOR<StudentUpdateInput, StudentUncheckedUpdateInput>
  }

  /**
   * Student delete
   */
  export type StudentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    /**
     * Filter which Student to delete.
     */
    where: StudentWhereUniqueInput
  }

  /**
   * Student deleteMany
   */
  export type StudentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Students to delete
     */
    where?: StudentWhereInput
    /**
     * Limit how many Students to delete.
     */
    limit?: number
  }

  /**
   * Student.absences
   */
  export type Student$absencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absence
     */
    select?: AbsenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Absence
     */
    omit?: AbsenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsenceInclude<ExtArgs> | null
    where?: AbsenceWhereInput
    orderBy?: AbsenceOrderByWithRelationInput | AbsenceOrderByWithRelationInput[]
    cursor?: AbsenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AbsenceScalarFieldEnum | AbsenceScalarFieldEnum[]
  }

  /**
   * Student.marks
   */
  export type Student$marksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mark
     */
    select?: MarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mark
     */
    omit?: MarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarkInclude<ExtArgs> | null
    where?: MarkWhereInput
    orderBy?: MarkOrderByWithRelationInput | MarkOrderByWithRelationInput[]
    cursor?: MarkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MarkScalarFieldEnum | MarkScalarFieldEnum[]
  }

  /**
   * Student.payments
   */
  export type Student$paymentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    cursor?: PaymentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Student.preRegistration
   */
  export type Student$preRegistrationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PreRegistration
     */
    select?: PreRegistrationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PreRegistration
     */
    omit?: PreRegistrationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PreRegistrationInclude<ExtArgs> | null
    where?: PreRegistrationWhereInput
  }

  /**
   * Student.class
   */
  export type Student$classArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    where?: ClassWhereInput
  }

  /**
   * Student.parent
   */
  export type Student$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parent
     */
    select?: ParentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parent
     */
    omit?: ParentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentInclude<ExtArgs> | null
    where?: ParentWhereInput
  }

  /**
   * Student without action
   */
  export type StudentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
  }


  /**
   * Model Parent
   */

  export type AggregateParent = {
    _count: ParentCountAggregateOutputType | null
    _avg: ParentAvgAggregateOutputType | null
    _sum: ParentSumAggregateOutputType | null
    _min: ParentMinAggregateOutputType | null
    _max: ParentMaxAggregateOutputType | null
  }

  export type ParentAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type ParentSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type ParentMinAggregateOutputType = {
    id: number | null
    userId: number | null
    phone: string | null
    address: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ParentMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    phone: string | null
    address: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ParentCountAggregateOutputType = {
    id: number
    userId: number
    phone: number
    address: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ParentAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type ParentSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type ParentMinAggregateInputType = {
    id?: true
    userId?: true
    phone?: true
    address?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ParentMaxAggregateInputType = {
    id?: true
    userId?: true
    phone?: true
    address?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ParentCountAggregateInputType = {
    id?: true
    userId?: true
    phone?: true
    address?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ParentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Parent to aggregate.
     */
    where?: ParentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parents to fetch.
     */
    orderBy?: ParentOrderByWithRelationInput | ParentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ParentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Parents
    **/
    _count?: true | ParentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ParentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ParentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ParentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ParentMaxAggregateInputType
  }

  export type GetParentAggregateType<T extends ParentAggregateArgs> = {
        [P in keyof T & keyof AggregateParent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateParent[P]>
      : GetScalarType<T[P], AggregateParent[P]>
  }




  export type ParentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParentWhereInput
    orderBy?: ParentOrderByWithAggregationInput | ParentOrderByWithAggregationInput[]
    by: ParentScalarFieldEnum[] | ParentScalarFieldEnum
    having?: ParentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ParentCountAggregateInputType | true
    _avg?: ParentAvgAggregateInputType
    _sum?: ParentSumAggregateInputType
    _min?: ParentMinAggregateInputType
    _max?: ParentMaxAggregateInputType
  }

  export type ParentGroupByOutputType = {
    id: number
    userId: number
    phone: string
    address: string | null
    createdAt: Date
    updatedAt: Date
    _count: ParentCountAggregateOutputType | null
    _avg: ParentAvgAggregateOutputType | null
    _sum: ParentSumAggregateOutputType | null
    _min: ParentMinAggregateOutputType | null
    _max: ParentMaxAggregateOutputType | null
  }

  type GetParentGroupByPayload<T extends ParentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ParentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ParentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ParentGroupByOutputType[P]>
            : GetScalarType<T[P], ParentGroupByOutputType[P]>
        }
      >
    >


  export type ParentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    phone?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    students?: boolean | Parent$studentsArgs<ExtArgs>
    _count?: boolean | ParentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["parent"]>

  export type ParentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    phone?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["parent"]>

  export type ParentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    phone?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["parent"]>

  export type ParentSelectScalar = {
    id?: boolean
    userId?: boolean
    phone?: boolean
    address?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ParentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "phone" | "address" | "createdAt" | "updatedAt", ExtArgs["result"]["parent"]>
  export type ParentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    students?: boolean | Parent$studentsArgs<ExtArgs>
    _count?: boolean | ParentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ParentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ParentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ParentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Parent"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      students: Prisma.$StudentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      phone: string
      address: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["parent"]>
    composites: {}
  }

  type ParentGetPayload<S extends boolean | null | undefined | ParentDefaultArgs> = $Result.GetResult<Prisma.$ParentPayload, S>

  type ParentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ParentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ParentCountAggregateInputType | true
    }

  export interface ParentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Parent'], meta: { name: 'Parent' } }
    /**
     * Find zero or one Parent that matches the filter.
     * @param {ParentFindUniqueArgs} args - Arguments to find a Parent
     * @example
     * // Get one Parent
     * const parent = await prisma.parent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ParentFindUniqueArgs>(args: SelectSubset<T, ParentFindUniqueArgs<ExtArgs>>): Prisma__ParentClient<$Result.GetResult<Prisma.$ParentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Parent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ParentFindUniqueOrThrowArgs} args - Arguments to find a Parent
     * @example
     * // Get one Parent
     * const parent = await prisma.parent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ParentFindUniqueOrThrowArgs>(args: SelectSubset<T, ParentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ParentClient<$Result.GetResult<Prisma.$ParentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Parent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentFindFirstArgs} args - Arguments to find a Parent
     * @example
     * // Get one Parent
     * const parent = await prisma.parent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ParentFindFirstArgs>(args?: SelectSubset<T, ParentFindFirstArgs<ExtArgs>>): Prisma__ParentClient<$Result.GetResult<Prisma.$ParentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Parent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentFindFirstOrThrowArgs} args - Arguments to find a Parent
     * @example
     * // Get one Parent
     * const parent = await prisma.parent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ParentFindFirstOrThrowArgs>(args?: SelectSubset<T, ParentFindFirstOrThrowArgs<ExtArgs>>): Prisma__ParentClient<$Result.GetResult<Prisma.$ParentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Parents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Parents
     * const parents = await prisma.parent.findMany()
     * 
     * // Get first 10 Parents
     * const parents = await prisma.parent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const parentWithIdOnly = await prisma.parent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ParentFindManyArgs>(args?: SelectSubset<T, ParentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Parent.
     * @param {ParentCreateArgs} args - Arguments to create a Parent.
     * @example
     * // Create one Parent
     * const Parent = await prisma.parent.create({
     *   data: {
     *     // ... data to create a Parent
     *   }
     * })
     * 
     */
    create<T extends ParentCreateArgs>(args: SelectSubset<T, ParentCreateArgs<ExtArgs>>): Prisma__ParentClient<$Result.GetResult<Prisma.$ParentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Parents.
     * @param {ParentCreateManyArgs} args - Arguments to create many Parents.
     * @example
     * // Create many Parents
     * const parent = await prisma.parent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ParentCreateManyArgs>(args?: SelectSubset<T, ParentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Parents and returns the data saved in the database.
     * @param {ParentCreateManyAndReturnArgs} args - Arguments to create many Parents.
     * @example
     * // Create many Parents
     * const parent = await prisma.parent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Parents and only return the `id`
     * const parentWithIdOnly = await prisma.parent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ParentCreateManyAndReturnArgs>(args?: SelectSubset<T, ParentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Parent.
     * @param {ParentDeleteArgs} args - Arguments to delete one Parent.
     * @example
     * // Delete one Parent
     * const Parent = await prisma.parent.delete({
     *   where: {
     *     // ... filter to delete one Parent
     *   }
     * })
     * 
     */
    delete<T extends ParentDeleteArgs>(args: SelectSubset<T, ParentDeleteArgs<ExtArgs>>): Prisma__ParentClient<$Result.GetResult<Prisma.$ParentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Parent.
     * @param {ParentUpdateArgs} args - Arguments to update one Parent.
     * @example
     * // Update one Parent
     * const parent = await prisma.parent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ParentUpdateArgs>(args: SelectSubset<T, ParentUpdateArgs<ExtArgs>>): Prisma__ParentClient<$Result.GetResult<Prisma.$ParentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Parents.
     * @param {ParentDeleteManyArgs} args - Arguments to filter Parents to delete.
     * @example
     * // Delete a few Parents
     * const { count } = await prisma.parent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ParentDeleteManyArgs>(args?: SelectSubset<T, ParentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Parents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Parents
     * const parent = await prisma.parent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ParentUpdateManyArgs>(args: SelectSubset<T, ParentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Parents and returns the data updated in the database.
     * @param {ParentUpdateManyAndReturnArgs} args - Arguments to update many Parents.
     * @example
     * // Update many Parents
     * const parent = await prisma.parent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Parents and only return the `id`
     * const parentWithIdOnly = await prisma.parent.updateManyAndReturn({
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
    updateManyAndReturn<T extends ParentUpdateManyAndReturnArgs>(args: SelectSubset<T, ParentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Parent.
     * @param {ParentUpsertArgs} args - Arguments to update or create a Parent.
     * @example
     * // Update or create a Parent
     * const parent = await prisma.parent.upsert({
     *   create: {
     *     // ... data to create a Parent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Parent we want to update
     *   }
     * })
     */
    upsert<T extends ParentUpsertArgs>(args: SelectSubset<T, ParentUpsertArgs<ExtArgs>>): Prisma__ParentClient<$Result.GetResult<Prisma.$ParentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Parents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentCountArgs} args - Arguments to filter Parents to count.
     * @example
     * // Count the number of Parents
     * const count = await prisma.parent.count({
     *   where: {
     *     // ... the filter for the Parents we want to count
     *   }
     * })
    **/
    count<T extends ParentCountArgs>(
      args?: Subset<T, ParentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ParentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Parent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ParentAggregateArgs>(args: Subset<T, ParentAggregateArgs>): Prisma.PrismaPromise<GetParentAggregateType<T>>

    /**
     * Group by Parent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParentGroupByArgs} args - Group by arguments.
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
      T extends ParentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ParentGroupByArgs['orderBy'] }
        : { orderBy?: ParentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ParentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Parent model
   */
  readonly fields: ParentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Parent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ParentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    students<T extends Parent$studentsArgs<ExtArgs> = {}>(args?: Subset<T, Parent$studentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Parent model
   */
  interface ParentFieldRefs {
    readonly id: FieldRef<"Parent", 'Int'>
    readonly userId: FieldRef<"Parent", 'Int'>
    readonly phone: FieldRef<"Parent", 'String'>
    readonly address: FieldRef<"Parent", 'String'>
    readonly createdAt: FieldRef<"Parent", 'DateTime'>
    readonly updatedAt: FieldRef<"Parent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Parent findUnique
   */
  export type ParentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parent
     */
    select?: ParentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parent
     */
    omit?: ParentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentInclude<ExtArgs> | null
    /**
     * Filter, which Parent to fetch.
     */
    where: ParentWhereUniqueInput
  }

  /**
   * Parent findUniqueOrThrow
   */
  export type ParentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parent
     */
    select?: ParentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parent
     */
    omit?: ParentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentInclude<ExtArgs> | null
    /**
     * Filter, which Parent to fetch.
     */
    where: ParentWhereUniqueInput
  }

  /**
   * Parent findFirst
   */
  export type ParentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parent
     */
    select?: ParentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parent
     */
    omit?: ParentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentInclude<ExtArgs> | null
    /**
     * Filter, which Parent to fetch.
     */
    where?: ParentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parents to fetch.
     */
    orderBy?: ParentOrderByWithRelationInput | ParentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Parents.
     */
    cursor?: ParentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parents.
     */
    distinct?: ParentScalarFieldEnum | ParentScalarFieldEnum[]
  }

  /**
   * Parent findFirstOrThrow
   */
  export type ParentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parent
     */
    select?: ParentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parent
     */
    omit?: ParentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentInclude<ExtArgs> | null
    /**
     * Filter, which Parent to fetch.
     */
    where?: ParentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parents to fetch.
     */
    orderBy?: ParentOrderByWithRelationInput | ParentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Parents.
     */
    cursor?: ParentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parents.
     */
    distinct?: ParentScalarFieldEnum | ParentScalarFieldEnum[]
  }

  /**
   * Parent findMany
   */
  export type ParentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parent
     */
    select?: ParentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parent
     */
    omit?: ParentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentInclude<ExtArgs> | null
    /**
     * Filter, which Parents to fetch.
     */
    where?: ParentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parents to fetch.
     */
    orderBy?: ParentOrderByWithRelationInput | ParentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Parents.
     */
    cursor?: ParentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parents.
     */
    distinct?: ParentScalarFieldEnum | ParentScalarFieldEnum[]
  }

  /**
   * Parent create
   */
  export type ParentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parent
     */
    select?: ParentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parent
     */
    omit?: ParentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentInclude<ExtArgs> | null
    /**
     * The data needed to create a Parent.
     */
    data: XOR<ParentCreateInput, ParentUncheckedCreateInput>
  }

  /**
   * Parent createMany
   */
  export type ParentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Parents.
     */
    data: ParentCreateManyInput | ParentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Parent createManyAndReturn
   */
  export type ParentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parent
     */
    select?: ParentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Parent
     */
    omit?: ParentOmit<ExtArgs> | null
    /**
     * The data used to create many Parents.
     */
    data: ParentCreateManyInput | ParentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Parent update
   */
  export type ParentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parent
     */
    select?: ParentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parent
     */
    omit?: ParentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentInclude<ExtArgs> | null
    /**
     * The data needed to update a Parent.
     */
    data: XOR<ParentUpdateInput, ParentUncheckedUpdateInput>
    /**
     * Choose, which Parent to update.
     */
    where: ParentWhereUniqueInput
  }

  /**
   * Parent updateMany
   */
  export type ParentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Parents.
     */
    data: XOR<ParentUpdateManyMutationInput, ParentUncheckedUpdateManyInput>
    /**
     * Filter which Parents to update
     */
    where?: ParentWhereInput
    /**
     * Limit how many Parents to update.
     */
    limit?: number
  }

  /**
   * Parent updateManyAndReturn
   */
  export type ParentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parent
     */
    select?: ParentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Parent
     */
    omit?: ParentOmit<ExtArgs> | null
    /**
     * The data used to update Parents.
     */
    data: XOR<ParentUpdateManyMutationInput, ParentUncheckedUpdateManyInput>
    /**
     * Filter which Parents to update
     */
    where?: ParentWhereInput
    /**
     * Limit how many Parents to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Parent upsert
   */
  export type ParentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parent
     */
    select?: ParentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parent
     */
    omit?: ParentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentInclude<ExtArgs> | null
    /**
     * The filter to search for the Parent to update in case it exists.
     */
    where: ParentWhereUniqueInput
    /**
     * In case the Parent found by the `where` argument doesn't exist, create a new Parent with this data.
     */
    create: XOR<ParentCreateInput, ParentUncheckedCreateInput>
    /**
     * In case the Parent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ParentUpdateInput, ParentUncheckedUpdateInput>
  }

  /**
   * Parent delete
   */
  export type ParentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parent
     */
    select?: ParentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parent
     */
    omit?: ParentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentInclude<ExtArgs> | null
    /**
     * Filter which Parent to delete.
     */
    where: ParentWhereUniqueInput
  }

  /**
   * Parent deleteMany
   */
  export type ParentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Parents to delete
     */
    where?: ParentWhereInput
    /**
     * Limit how many Parents to delete.
     */
    limit?: number
  }

  /**
   * Parent.students
   */
  export type Parent$studentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    cursor?: StudentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Parent without action
   */
  export type ParentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Parent
     */
    select?: ParentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Parent
     */
    omit?: ParentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParentInclude<ExtArgs> | null
  }


  /**
   * Model Class
   */

  export type AggregateClass = {
    _count: ClassCountAggregateOutputType | null
    _avg: ClassAvgAggregateOutputType | null
    _sum: ClassSumAggregateOutputType | null
    _min: ClassMinAggregateOutputType | null
    _max: ClassMaxAggregateOutputType | null
  }

  export type ClassAvgAggregateOutputType = {
    id: number | null
    maxCapacity: number | null
    headTeacherId: number | null
  }

  export type ClassSumAggregateOutputType = {
    id: number | null
    maxCapacity: number | null
    headTeacherId: number | null
  }

  export type ClassMinAggregateOutputType = {
    id: number | null
    name: string | null
    level: string | null
    schoolYear: string | null
    maxCapacity: number | null
    headTeacherId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClassMaxAggregateOutputType = {
    id: number | null
    name: string | null
    level: string | null
    schoolYear: string | null
    maxCapacity: number | null
    headTeacherId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ClassCountAggregateOutputType = {
    id: number
    name: number
    level: number
    schoolYear: number
    maxCapacity: number
    headTeacherId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ClassAvgAggregateInputType = {
    id?: true
    maxCapacity?: true
    headTeacherId?: true
  }

  export type ClassSumAggregateInputType = {
    id?: true
    maxCapacity?: true
    headTeacherId?: true
  }

  export type ClassMinAggregateInputType = {
    id?: true
    name?: true
    level?: true
    schoolYear?: true
    maxCapacity?: true
    headTeacherId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClassMaxAggregateInputType = {
    id?: true
    name?: true
    level?: true
    schoolYear?: true
    maxCapacity?: true
    headTeacherId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ClassCountAggregateInputType = {
    id?: true
    name?: true
    level?: true
    schoolYear?: true
    maxCapacity?: true
    headTeacherId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ClassAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Class to aggregate.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Classes
    **/
    _count?: true | ClassCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ClassAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ClassSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClassMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClassMaxAggregateInputType
  }

  export type GetClassAggregateType<T extends ClassAggregateArgs> = {
        [P in keyof T & keyof AggregateClass]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClass[P]>
      : GetScalarType<T[P], AggregateClass[P]>
  }




  export type ClassGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassWhereInput
    orderBy?: ClassOrderByWithAggregationInput | ClassOrderByWithAggregationInput[]
    by: ClassScalarFieldEnum[] | ClassScalarFieldEnum
    having?: ClassScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClassCountAggregateInputType | true
    _avg?: ClassAvgAggregateInputType
    _sum?: ClassSumAggregateInputType
    _min?: ClassMinAggregateInputType
    _max?: ClassMaxAggregateInputType
  }

  export type ClassGroupByOutputType = {
    id: number
    name: string
    level: string
    schoolYear: string
    maxCapacity: number
    headTeacherId: number | null
    createdAt: Date
    updatedAt: Date
    _count: ClassCountAggregateOutputType | null
    _avg: ClassAvgAggregateOutputType | null
    _sum: ClassSumAggregateOutputType | null
    _min: ClassMinAggregateOutputType | null
    _max: ClassMaxAggregateOutputType | null
  }

  type GetClassGroupByPayload<T extends ClassGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClassGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClassGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClassGroupByOutputType[P]>
            : GetScalarType<T[P], ClassGroupByOutputType[P]>
        }
      >
    >


  export type ClassSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    level?: boolean
    schoolYear?: boolean
    maxCapacity?: boolean
    headTeacherId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    students?: boolean | Class$studentsArgs<ExtArgs>
    headTeacher?: boolean | Class$headTeacherArgs<ExtArgs>
    assignments?: boolean | Class$assignmentsArgs<ExtArgs>
    marks?: boolean | Class$marksArgs<ExtArgs>
    absences?: boolean | Class$absencesArgs<ExtArgs>
    _count?: boolean | ClassCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["class"]>

  export type ClassSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    level?: boolean
    schoolYear?: boolean
    maxCapacity?: boolean
    headTeacherId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    headTeacher?: boolean | Class$headTeacherArgs<ExtArgs>
  }, ExtArgs["result"]["class"]>

  export type ClassSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    level?: boolean
    schoolYear?: boolean
    maxCapacity?: boolean
    headTeacherId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    headTeacher?: boolean | Class$headTeacherArgs<ExtArgs>
  }, ExtArgs["result"]["class"]>

  export type ClassSelectScalar = {
    id?: boolean
    name?: boolean
    level?: boolean
    schoolYear?: boolean
    maxCapacity?: boolean
    headTeacherId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ClassOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "level" | "schoolYear" | "maxCapacity" | "headTeacherId" | "createdAt" | "updatedAt", ExtArgs["result"]["class"]>
  export type ClassInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    students?: boolean | Class$studentsArgs<ExtArgs>
    headTeacher?: boolean | Class$headTeacherArgs<ExtArgs>
    assignments?: boolean | Class$assignmentsArgs<ExtArgs>
    marks?: boolean | Class$marksArgs<ExtArgs>
    absences?: boolean | Class$absencesArgs<ExtArgs>
    _count?: boolean | ClassCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ClassIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    headTeacher?: boolean | Class$headTeacherArgs<ExtArgs>
  }
  export type ClassIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    headTeacher?: boolean | Class$headTeacherArgs<ExtArgs>
  }

  export type $ClassPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Class"
    objects: {
      students: Prisma.$StudentPayload<ExtArgs>[]
      headTeacher: Prisma.$TeacherPayload<ExtArgs> | null
      assignments: Prisma.$TeacherSubjectClassPayload<ExtArgs>[]
      marks: Prisma.$MarkPayload<ExtArgs>[]
      absences: Prisma.$AbsencePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      level: string
      schoolYear: string
      maxCapacity: number
      headTeacherId: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["class"]>
    composites: {}
  }

  type ClassGetPayload<S extends boolean | null | undefined | ClassDefaultArgs> = $Result.GetResult<Prisma.$ClassPayload, S>

  type ClassCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClassFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClassCountAggregateInputType | true
    }

  export interface ClassDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Class'], meta: { name: 'Class' } }
    /**
     * Find zero or one Class that matches the filter.
     * @param {ClassFindUniqueArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClassFindUniqueArgs>(args: SelectSubset<T, ClassFindUniqueArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Class that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClassFindUniqueOrThrowArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClassFindUniqueOrThrowArgs>(args: SelectSubset<T, ClassFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Class that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassFindFirstArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClassFindFirstArgs>(args?: SelectSubset<T, ClassFindFirstArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Class that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassFindFirstOrThrowArgs} args - Arguments to find a Class
     * @example
     * // Get one Class
     * const class = await prisma.class.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClassFindFirstOrThrowArgs>(args?: SelectSubset<T, ClassFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Classes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Classes
     * const classes = await prisma.class.findMany()
     * 
     * // Get first 10 Classes
     * const classes = await prisma.class.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const classWithIdOnly = await prisma.class.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClassFindManyArgs>(args?: SelectSubset<T, ClassFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Class.
     * @param {ClassCreateArgs} args - Arguments to create a Class.
     * @example
     * // Create one Class
     * const Class = await prisma.class.create({
     *   data: {
     *     // ... data to create a Class
     *   }
     * })
     * 
     */
    create<T extends ClassCreateArgs>(args: SelectSubset<T, ClassCreateArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Classes.
     * @param {ClassCreateManyArgs} args - Arguments to create many Classes.
     * @example
     * // Create many Classes
     * const class = await prisma.class.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClassCreateManyArgs>(args?: SelectSubset<T, ClassCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Classes and returns the data saved in the database.
     * @param {ClassCreateManyAndReturnArgs} args - Arguments to create many Classes.
     * @example
     * // Create many Classes
     * const class = await prisma.class.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Classes and only return the `id`
     * const classWithIdOnly = await prisma.class.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ClassCreateManyAndReturnArgs>(args?: SelectSubset<T, ClassCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Class.
     * @param {ClassDeleteArgs} args - Arguments to delete one Class.
     * @example
     * // Delete one Class
     * const Class = await prisma.class.delete({
     *   where: {
     *     // ... filter to delete one Class
     *   }
     * })
     * 
     */
    delete<T extends ClassDeleteArgs>(args: SelectSubset<T, ClassDeleteArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Class.
     * @param {ClassUpdateArgs} args - Arguments to update one Class.
     * @example
     * // Update one Class
     * const class = await prisma.class.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClassUpdateArgs>(args: SelectSubset<T, ClassUpdateArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Classes.
     * @param {ClassDeleteManyArgs} args - Arguments to filter Classes to delete.
     * @example
     * // Delete a few Classes
     * const { count } = await prisma.class.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClassDeleteManyArgs>(args?: SelectSubset<T, ClassDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Classes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Classes
     * const class = await prisma.class.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClassUpdateManyArgs>(args: SelectSubset<T, ClassUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Classes and returns the data updated in the database.
     * @param {ClassUpdateManyAndReturnArgs} args - Arguments to update many Classes.
     * @example
     * // Update many Classes
     * const class = await prisma.class.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Classes and only return the `id`
     * const classWithIdOnly = await prisma.class.updateManyAndReturn({
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
    updateManyAndReturn<T extends ClassUpdateManyAndReturnArgs>(args: SelectSubset<T, ClassUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Class.
     * @param {ClassUpsertArgs} args - Arguments to update or create a Class.
     * @example
     * // Update or create a Class
     * const class = await prisma.class.upsert({
     *   create: {
     *     // ... data to create a Class
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Class we want to update
     *   }
     * })
     */
    upsert<T extends ClassUpsertArgs>(args: SelectSubset<T, ClassUpsertArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Classes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassCountArgs} args - Arguments to filter Classes to count.
     * @example
     * // Count the number of Classes
     * const count = await prisma.class.count({
     *   where: {
     *     // ... the filter for the Classes we want to count
     *   }
     * })
    **/
    count<T extends ClassCountArgs>(
      args?: Subset<T, ClassCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClassCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Class.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClassAggregateArgs>(args: Subset<T, ClassAggregateArgs>): Prisma.PrismaPromise<GetClassAggregateType<T>>

    /**
     * Group by Class.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassGroupByArgs} args - Group by arguments.
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
      T extends ClassGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClassGroupByArgs['orderBy'] }
        : { orderBy?: ClassGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ClassGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClassGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Class model
   */
  readonly fields: ClassFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Class.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClassClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    students<T extends Class$studentsArgs<ExtArgs> = {}>(args?: Subset<T, Class$studentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    headTeacher<T extends Class$headTeacherArgs<ExtArgs> = {}>(args?: Subset<T, Class$headTeacherArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    assignments<T extends Class$assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, Class$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherSubjectClassPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    marks<T extends Class$marksArgs<ExtArgs> = {}>(args?: Subset<T, Class$marksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    absences<T extends Class$absencesArgs<ExtArgs> = {}>(args?: Subset<T, Class$absencesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AbsencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Class model
   */
  interface ClassFieldRefs {
    readonly id: FieldRef<"Class", 'Int'>
    readonly name: FieldRef<"Class", 'String'>
    readonly level: FieldRef<"Class", 'String'>
    readonly schoolYear: FieldRef<"Class", 'String'>
    readonly maxCapacity: FieldRef<"Class", 'Int'>
    readonly headTeacherId: FieldRef<"Class", 'Int'>
    readonly createdAt: FieldRef<"Class", 'DateTime'>
    readonly updatedAt: FieldRef<"Class", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Class findUnique
   */
  export type ClassFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class findUniqueOrThrow
   */
  export type ClassFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class findFirst
   */
  export type ClassFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classes.
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classes.
     */
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Class findFirstOrThrow
   */
  export type ClassFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Class to fetch.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classes.
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classes.
     */
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Class findMany
   */
  export type ClassFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter, which Classes to fetch.
     */
    where?: ClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classes to fetch.
     */
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Classes.
     */
    cursor?: ClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classes.
     */
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Class create
   */
  export type ClassCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * The data needed to create a Class.
     */
    data: XOR<ClassCreateInput, ClassUncheckedCreateInput>
  }

  /**
   * Class createMany
   */
  export type ClassCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Classes.
     */
    data: ClassCreateManyInput | ClassCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Class createManyAndReturn
   */
  export type ClassCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * The data used to create many Classes.
     */
    data: ClassCreateManyInput | ClassCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Class update
   */
  export type ClassUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * The data needed to update a Class.
     */
    data: XOR<ClassUpdateInput, ClassUncheckedUpdateInput>
    /**
     * Choose, which Class to update.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class updateMany
   */
  export type ClassUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Classes.
     */
    data: XOR<ClassUpdateManyMutationInput, ClassUncheckedUpdateManyInput>
    /**
     * Filter which Classes to update
     */
    where?: ClassWhereInput
    /**
     * Limit how many Classes to update.
     */
    limit?: number
  }

  /**
   * Class updateManyAndReturn
   */
  export type ClassUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * The data used to update Classes.
     */
    data: XOR<ClassUpdateManyMutationInput, ClassUncheckedUpdateManyInput>
    /**
     * Filter which Classes to update
     */
    where?: ClassWhereInput
    /**
     * Limit how many Classes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Class upsert
   */
  export type ClassUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * The filter to search for the Class to update in case it exists.
     */
    where: ClassWhereUniqueInput
    /**
     * In case the Class found by the `where` argument doesn't exist, create a new Class with this data.
     */
    create: XOR<ClassCreateInput, ClassUncheckedCreateInput>
    /**
     * In case the Class was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClassUpdateInput, ClassUncheckedUpdateInput>
  }

  /**
   * Class delete
   */
  export type ClassDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    /**
     * Filter which Class to delete.
     */
    where: ClassWhereUniqueInput
  }

  /**
   * Class deleteMany
   */
  export type ClassDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Classes to delete
     */
    where?: ClassWhereInput
    /**
     * Limit how many Classes to delete.
     */
    limit?: number
  }

  /**
   * Class.students
   */
  export type Class$studentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Student
     */
    select?: StudentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Student
     */
    omit?: StudentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: StudentInclude<ExtArgs> | null
    where?: StudentWhereInput
    orderBy?: StudentOrderByWithRelationInput | StudentOrderByWithRelationInput[]
    cursor?: StudentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: StudentScalarFieldEnum | StudentScalarFieldEnum[]
  }

  /**
   * Class.headTeacher
   */
  export type Class$headTeacherArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    where?: TeacherWhereInput
  }

  /**
   * Class.assignments
   */
  export type Class$assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeacherSubjectClass
     */
    select?: TeacherSubjectClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeacherSubjectClass
     */
    omit?: TeacherSubjectClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherSubjectClassInclude<ExtArgs> | null
    where?: TeacherSubjectClassWhereInput
    orderBy?: TeacherSubjectClassOrderByWithRelationInput | TeacherSubjectClassOrderByWithRelationInput[]
    cursor?: TeacherSubjectClassWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeacherSubjectClassScalarFieldEnum | TeacherSubjectClassScalarFieldEnum[]
  }

  /**
   * Class.marks
   */
  export type Class$marksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mark
     */
    select?: MarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mark
     */
    omit?: MarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarkInclude<ExtArgs> | null
    where?: MarkWhereInput
    orderBy?: MarkOrderByWithRelationInput | MarkOrderByWithRelationInput[]
    cursor?: MarkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MarkScalarFieldEnum | MarkScalarFieldEnum[]
  }

  /**
   * Class.absences
   */
  export type Class$absencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absence
     */
    select?: AbsenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Absence
     */
    omit?: AbsenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsenceInclude<ExtArgs> | null
    where?: AbsenceWhereInput
    orderBy?: AbsenceOrderByWithRelationInput | AbsenceOrderByWithRelationInput[]
    cursor?: AbsenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AbsenceScalarFieldEnum | AbsenceScalarFieldEnum[]
  }

  /**
   * Class without action
   */
  export type ClassDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
  }


  /**
   * Model Subject
   */

  export type AggregateSubject = {
    _count: SubjectCountAggregateOutputType | null
    _avg: SubjectAvgAggregateOutputType | null
    _sum: SubjectSumAggregateOutputType | null
    _min: SubjectMinAggregateOutputType | null
    _max: SubjectMaxAggregateOutputType | null
  }

  export type SubjectAvgAggregateOutputType = {
    id: number | null
    coefficient: number | null
  }

  export type SubjectSumAggregateOutputType = {
    id: number | null
    coefficient: number | null
  }

  export type SubjectMinAggregateOutputType = {
    id: number | null
    name: string | null
    code: string | null
    coefficient: number | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubjectMaxAggregateOutputType = {
    id: number | null
    name: string | null
    code: string | null
    coefficient: number | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SubjectCountAggregateOutputType = {
    id: number
    name: number
    code: number
    coefficient: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SubjectAvgAggregateInputType = {
    id?: true
    coefficient?: true
  }

  export type SubjectSumAggregateInputType = {
    id?: true
    coefficient?: true
  }

  export type SubjectMinAggregateInputType = {
    id?: true
    name?: true
    code?: true
    coefficient?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubjectMaxAggregateInputType = {
    id?: true
    name?: true
    code?: true
    coefficient?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SubjectCountAggregateInputType = {
    id?: true
    name?: true
    code?: true
    coefficient?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SubjectAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subject to aggregate.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subjects
    **/
    _count?: true | SubjectCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubjectAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubjectSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubjectMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubjectMaxAggregateInputType
  }

  export type GetSubjectAggregateType<T extends SubjectAggregateArgs> = {
        [P in keyof T & keyof AggregateSubject]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubject[P]>
      : GetScalarType<T[P], AggregateSubject[P]>
  }




  export type SubjectGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SubjectWhereInput
    orderBy?: SubjectOrderByWithAggregationInput | SubjectOrderByWithAggregationInput[]
    by: SubjectScalarFieldEnum[] | SubjectScalarFieldEnum
    having?: SubjectScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubjectCountAggregateInputType | true
    _avg?: SubjectAvgAggregateInputType
    _sum?: SubjectSumAggregateInputType
    _min?: SubjectMinAggregateInputType
    _max?: SubjectMaxAggregateInputType
  }

  export type SubjectGroupByOutputType = {
    id: number
    name: string
    code: string
    coefficient: number
    description: string | null
    createdAt: Date
    updatedAt: Date
    _count: SubjectCountAggregateOutputType | null
    _avg: SubjectAvgAggregateOutputType | null
    _sum: SubjectSumAggregateOutputType | null
    _min: SubjectMinAggregateOutputType | null
    _max: SubjectMaxAggregateOutputType | null
  }

  type GetSubjectGroupByPayload<T extends SubjectGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubjectGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubjectGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubjectGroupByOutputType[P]>
            : GetScalarType<T[P], SubjectGroupByOutputType[P]>
        }
      >
    >


  export type SubjectSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    coefficient?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    assignments?: boolean | Subject$assignmentsArgs<ExtArgs>
    marks?: boolean | Subject$marksArgs<ExtArgs>
    _count?: boolean | SubjectCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["subject"]>

  export type SubjectSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    coefficient?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["subject"]>

  export type SubjectSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    code?: boolean
    coefficient?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["subject"]>

  export type SubjectSelectScalar = {
    id?: boolean
    name?: boolean
    code?: boolean
    coefficient?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SubjectOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "code" | "coefficient" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["subject"]>
  export type SubjectInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    assignments?: boolean | Subject$assignmentsArgs<ExtArgs>
    marks?: boolean | Subject$marksArgs<ExtArgs>
    _count?: boolean | SubjectCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SubjectIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type SubjectIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $SubjectPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Subject"
    objects: {
      assignments: Prisma.$TeacherSubjectClassPayload<ExtArgs>[]
      marks: Prisma.$MarkPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      code: string
      coefficient: number
      description: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["subject"]>
    composites: {}
  }

  type SubjectGetPayload<S extends boolean | null | undefined | SubjectDefaultArgs> = $Result.GetResult<Prisma.$SubjectPayload, S>

  type SubjectCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SubjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SubjectCountAggregateInputType | true
    }

  export interface SubjectDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subject'], meta: { name: 'Subject' } }
    /**
     * Find zero or one Subject that matches the filter.
     * @param {SubjectFindUniqueArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SubjectFindUniqueArgs>(args: SelectSubset<T, SubjectFindUniqueArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Subject that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SubjectFindUniqueOrThrowArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SubjectFindUniqueOrThrowArgs>(args: SelectSubset<T, SubjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subject that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindFirstArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SubjectFindFirstArgs>(args?: SelectSubset<T, SubjectFindFirstArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Subject that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindFirstOrThrowArgs} args - Arguments to find a Subject
     * @example
     * // Get one Subject
     * const subject = await prisma.subject.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SubjectFindFirstOrThrowArgs>(args?: SelectSubset<T, SubjectFindFirstOrThrowArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Subjects that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subjects
     * const subjects = await prisma.subject.findMany()
     * 
     * // Get first 10 Subjects
     * const subjects = await prisma.subject.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subjectWithIdOnly = await prisma.subject.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SubjectFindManyArgs>(args?: SelectSubset<T, SubjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Subject.
     * @param {SubjectCreateArgs} args - Arguments to create a Subject.
     * @example
     * // Create one Subject
     * const Subject = await prisma.subject.create({
     *   data: {
     *     // ... data to create a Subject
     *   }
     * })
     * 
     */
    create<T extends SubjectCreateArgs>(args: SelectSubset<T, SubjectCreateArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Subjects.
     * @param {SubjectCreateManyArgs} args - Arguments to create many Subjects.
     * @example
     * // Create many Subjects
     * const subject = await prisma.subject.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SubjectCreateManyArgs>(args?: SelectSubset<T, SubjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Subjects and returns the data saved in the database.
     * @param {SubjectCreateManyAndReturnArgs} args - Arguments to create many Subjects.
     * @example
     * // Create many Subjects
     * const subject = await prisma.subject.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Subjects and only return the `id`
     * const subjectWithIdOnly = await prisma.subject.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SubjectCreateManyAndReturnArgs>(args?: SelectSubset<T, SubjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Subject.
     * @param {SubjectDeleteArgs} args - Arguments to delete one Subject.
     * @example
     * // Delete one Subject
     * const Subject = await prisma.subject.delete({
     *   where: {
     *     // ... filter to delete one Subject
     *   }
     * })
     * 
     */
    delete<T extends SubjectDeleteArgs>(args: SelectSubset<T, SubjectDeleteArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Subject.
     * @param {SubjectUpdateArgs} args - Arguments to update one Subject.
     * @example
     * // Update one Subject
     * const subject = await prisma.subject.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SubjectUpdateArgs>(args: SelectSubset<T, SubjectUpdateArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Subjects.
     * @param {SubjectDeleteManyArgs} args - Arguments to filter Subjects to delete.
     * @example
     * // Delete a few Subjects
     * const { count } = await prisma.subject.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SubjectDeleteManyArgs>(args?: SelectSubset<T, SubjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subjects
     * const subject = await prisma.subject.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SubjectUpdateManyArgs>(args: SelectSubset<T, SubjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subjects and returns the data updated in the database.
     * @param {SubjectUpdateManyAndReturnArgs} args - Arguments to update many Subjects.
     * @example
     * // Update many Subjects
     * const subject = await prisma.subject.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Subjects and only return the `id`
     * const subjectWithIdOnly = await prisma.subject.updateManyAndReturn({
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
    updateManyAndReturn<T extends SubjectUpdateManyAndReturnArgs>(args: SelectSubset<T, SubjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Subject.
     * @param {SubjectUpsertArgs} args - Arguments to update or create a Subject.
     * @example
     * // Update or create a Subject
     * const subject = await prisma.subject.upsert({
     *   create: {
     *     // ... data to create a Subject
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subject we want to update
     *   }
     * })
     */
    upsert<T extends SubjectUpsertArgs>(args: SelectSubset<T, SubjectUpsertArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Subjects.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectCountArgs} args - Arguments to filter Subjects to count.
     * @example
     * // Count the number of Subjects
     * const count = await prisma.subject.count({
     *   where: {
     *     // ... the filter for the Subjects we want to count
     *   }
     * })
    **/
    count<T extends SubjectCountArgs>(
      args?: Subset<T, SubjectCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubjectCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SubjectAggregateArgs>(args: Subset<T, SubjectAggregateArgs>): Prisma.PrismaPromise<GetSubjectAggregateType<T>>

    /**
     * Group by Subject.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubjectGroupByArgs} args - Group by arguments.
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
      T extends SubjectGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubjectGroupByArgs['orderBy'] }
        : { orderBy?: SubjectGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SubjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subject model
   */
  readonly fields: SubjectFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subject.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SubjectClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    assignments<T extends Subject$assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, Subject$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherSubjectClassPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    marks<T extends Subject$marksArgs<ExtArgs> = {}>(args?: Subset<T, Subject$marksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Subject model
   */
  interface SubjectFieldRefs {
    readonly id: FieldRef<"Subject", 'Int'>
    readonly name: FieldRef<"Subject", 'String'>
    readonly code: FieldRef<"Subject", 'String'>
    readonly coefficient: FieldRef<"Subject", 'Int'>
    readonly description: FieldRef<"Subject", 'String'>
    readonly createdAt: FieldRef<"Subject", 'DateTime'>
    readonly updatedAt: FieldRef<"Subject", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Subject findUnique
   */
  export type SubjectFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject findUniqueOrThrow
   */
  export type SubjectFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject findFirst
   */
  export type SubjectFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subjects.
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subjects.
     */
    distinct?: SubjectScalarFieldEnum | SubjectScalarFieldEnum[]
  }

  /**
   * Subject findFirstOrThrow
   */
  export type SubjectFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subject to fetch.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subjects.
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subjects.
     */
    distinct?: SubjectScalarFieldEnum | SubjectScalarFieldEnum[]
  }

  /**
   * Subject findMany
   */
  export type SubjectFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter, which Subjects to fetch.
     */
    where?: SubjectWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subjects to fetch.
     */
    orderBy?: SubjectOrderByWithRelationInput | SubjectOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subjects.
     */
    cursor?: SubjectWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subjects from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subjects.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subjects.
     */
    distinct?: SubjectScalarFieldEnum | SubjectScalarFieldEnum[]
  }

  /**
   * Subject create
   */
  export type SubjectCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * The data needed to create a Subject.
     */
    data: XOR<SubjectCreateInput, SubjectUncheckedCreateInput>
  }

  /**
   * Subject createMany
   */
  export type SubjectCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subjects.
     */
    data: SubjectCreateManyInput | SubjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subject createManyAndReturn
   */
  export type SubjectCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * The data used to create many Subjects.
     */
    data: SubjectCreateManyInput | SubjectCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Subject update
   */
  export type SubjectUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * The data needed to update a Subject.
     */
    data: XOR<SubjectUpdateInput, SubjectUncheckedUpdateInput>
    /**
     * Choose, which Subject to update.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject updateMany
   */
  export type SubjectUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subjects.
     */
    data: XOR<SubjectUpdateManyMutationInput, SubjectUncheckedUpdateManyInput>
    /**
     * Filter which Subjects to update
     */
    where?: SubjectWhereInput
    /**
     * Limit how many Subjects to update.
     */
    limit?: number
  }

  /**
   * Subject updateManyAndReturn
   */
  export type SubjectUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * The data used to update Subjects.
     */
    data: XOR<SubjectUpdateManyMutationInput, SubjectUncheckedUpdateManyInput>
    /**
     * Filter which Subjects to update
     */
    where?: SubjectWhereInput
    /**
     * Limit how many Subjects to update.
     */
    limit?: number
  }

  /**
   * Subject upsert
   */
  export type SubjectUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * The filter to search for the Subject to update in case it exists.
     */
    where: SubjectWhereUniqueInput
    /**
     * In case the Subject found by the `where` argument doesn't exist, create a new Subject with this data.
     */
    create: XOR<SubjectCreateInput, SubjectUncheckedCreateInput>
    /**
     * In case the Subject was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubjectUpdateInput, SubjectUncheckedUpdateInput>
  }

  /**
   * Subject delete
   */
  export type SubjectDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    /**
     * Filter which Subject to delete.
     */
    where: SubjectWhereUniqueInput
  }

  /**
   * Subject deleteMany
   */
  export type SubjectDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subjects to delete
     */
    where?: SubjectWhereInput
    /**
     * Limit how many Subjects to delete.
     */
    limit?: number
  }

  /**
   * Subject.assignments
   */
  export type Subject$assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeacherSubjectClass
     */
    select?: TeacherSubjectClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeacherSubjectClass
     */
    omit?: TeacherSubjectClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherSubjectClassInclude<ExtArgs> | null
    where?: TeacherSubjectClassWhereInput
    orderBy?: TeacherSubjectClassOrderByWithRelationInput | TeacherSubjectClassOrderByWithRelationInput[]
    cursor?: TeacherSubjectClassWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeacherSubjectClassScalarFieldEnum | TeacherSubjectClassScalarFieldEnum[]
  }

  /**
   * Subject.marks
   */
  export type Subject$marksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mark
     */
    select?: MarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mark
     */
    omit?: MarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarkInclude<ExtArgs> | null
    where?: MarkWhereInput
    orderBy?: MarkOrderByWithRelationInput | MarkOrderByWithRelationInput[]
    cursor?: MarkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MarkScalarFieldEnum | MarkScalarFieldEnum[]
  }

  /**
   * Subject without action
   */
  export type SubjectDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
  }


  /**
   * Model Teacher
   */

  export type AggregateTeacher = {
    _count: TeacherCountAggregateOutputType | null
    _avg: TeacherAvgAggregateOutputType | null
    _sum: TeacherSumAggregateOutputType | null
    _min: TeacherMinAggregateOutputType | null
    _max: TeacherMaxAggregateOutputType | null
  }

  export type TeacherAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type TeacherSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type TeacherMinAggregateOutputType = {
    id: number | null
    userId: number | null
    speciality: string | null
    phone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeacherMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    speciality: string | null
    phone: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type TeacherCountAggregateOutputType = {
    id: number
    userId: number
    speciality: number
    phone: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type TeacherAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type TeacherSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type TeacherMinAggregateInputType = {
    id?: true
    userId?: true
    speciality?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeacherMaxAggregateInputType = {
    id?: true
    userId?: true
    speciality?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
  }

  export type TeacherCountAggregateInputType = {
    id?: true
    userId?: true
    speciality?: true
    phone?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type TeacherAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teacher to aggregate.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Teachers
    **/
    _count?: true | TeacherCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TeacherAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TeacherSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeacherMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeacherMaxAggregateInputType
  }

  export type GetTeacherAggregateType<T extends TeacherAggregateArgs> = {
        [P in keyof T & keyof AggregateTeacher]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeacher[P]>
      : GetScalarType<T[P], AggregateTeacher[P]>
  }




  export type TeacherGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeacherWhereInput
    orderBy?: TeacherOrderByWithAggregationInput | TeacherOrderByWithAggregationInput[]
    by: TeacherScalarFieldEnum[] | TeacherScalarFieldEnum
    having?: TeacherScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeacherCountAggregateInputType | true
    _avg?: TeacherAvgAggregateInputType
    _sum?: TeacherSumAggregateInputType
    _min?: TeacherMinAggregateInputType
    _max?: TeacherMaxAggregateInputType
  }

  export type TeacherGroupByOutputType = {
    id: number
    userId: number
    speciality: string | null
    phone: string | null
    createdAt: Date
    updatedAt: Date
    _count: TeacherCountAggregateOutputType | null
    _avg: TeacherAvgAggregateOutputType | null
    _sum: TeacherSumAggregateOutputType | null
    _min: TeacherMinAggregateOutputType | null
    _max: TeacherMaxAggregateOutputType | null
  }

  type GetTeacherGroupByPayload<T extends TeacherGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeacherGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeacherGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeacherGroupByOutputType[P]>
            : GetScalarType<T[P], TeacherGroupByOutputType[P]>
        }
      >
    >


  export type TeacherSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    speciality?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    headOfClasses?: boolean | Teacher$headOfClassesArgs<ExtArgs>
    assignments?: boolean | Teacher$assignmentsArgs<ExtArgs>
    marks?: boolean | Teacher$marksArgs<ExtArgs>
    absences?: boolean | Teacher$absencesArgs<ExtArgs>
    _count?: boolean | TeacherCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teacher"]>

  export type TeacherSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    speciality?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teacher"]>

  export type TeacherSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    speciality?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teacher"]>

  export type TeacherSelectScalar = {
    id?: boolean
    userId?: boolean
    speciality?: boolean
    phone?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type TeacherOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "speciality" | "phone" | "createdAt" | "updatedAt", ExtArgs["result"]["teacher"]>
  export type TeacherInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    headOfClasses?: boolean | Teacher$headOfClassesArgs<ExtArgs>
    assignments?: boolean | Teacher$assignmentsArgs<ExtArgs>
    marks?: boolean | Teacher$marksArgs<ExtArgs>
    absences?: boolean | Teacher$absencesArgs<ExtArgs>
    _count?: boolean | TeacherCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TeacherIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type TeacherIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $TeacherPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Teacher"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      headOfClasses: Prisma.$ClassPayload<ExtArgs>[]
      assignments: Prisma.$TeacherSubjectClassPayload<ExtArgs>[]
      marks: Prisma.$MarkPayload<ExtArgs>[]
      absences: Prisma.$AbsencePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      speciality: string | null
      phone: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["teacher"]>
    composites: {}
  }

  type TeacherGetPayload<S extends boolean | null | undefined | TeacherDefaultArgs> = $Result.GetResult<Prisma.$TeacherPayload, S>

  type TeacherCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeacherFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeacherCountAggregateInputType | true
    }

  export interface TeacherDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Teacher'], meta: { name: 'Teacher' } }
    /**
     * Find zero or one Teacher that matches the filter.
     * @param {TeacherFindUniqueArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeacherFindUniqueArgs>(args: SelectSubset<T, TeacherFindUniqueArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Teacher that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeacherFindUniqueOrThrowArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeacherFindUniqueOrThrowArgs>(args: SelectSubset<T, TeacherFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Teacher that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindFirstArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeacherFindFirstArgs>(args?: SelectSubset<T, TeacherFindFirstArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Teacher that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindFirstOrThrowArgs} args - Arguments to find a Teacher
     * @example
     * // Get one Teacher
     * const teacher = await prisma.teacher.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeacherFindFirstOrThrowArgs>(args?: SelectSubset<T, TeacherFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Teachers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Teachers
     * const teachers = await prisma.teacher.findMany()
     * 
     * // Get first 10 Teachers
     * const teachers = await prisma.teacher.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teacherWithIdOnly = await prisma.teacher.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeacherFindManyArgs>(args?: SelectSubset<T, TeacherFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Teacher.
     * @param {TeacherCreateArgs} args - Arguments to create a Teacher.
     * @example
     * // Create one Teacher
     * const Teacher = await prisma.teacher.create({
     *   data: {
     *     // ... data to create a Teacher
     *   }
     * })
     * 
     */
    create<T extends TeacherCreateArgs>(args: SelectSubset<T, TeacherCreateArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Teachers.
     * @param {TeacherCreateManyArgs} args - Arguments to create many Teachers.
     * @example
     * // Create many Teachers
     * const teacher = await prisma.teacher.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeacherCreateManyArgs>(args?: SelectSubset<T, TeacherCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Teachers and returns the data saved in the database.
     * @param {TeacherCreateManyAndReturnArgs} args - Arguments to create many Teachers.
     * @example
     * // Create many Teachers
     * const teacher = await prisma.teacher.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Teachers and only return the `id`
     * const teacherWithIdOnly = await prisma.teacher.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeacherCreateManyAndReturnArgs>(args?: SelectSubset<T, TeacherCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Teacher.
     * @param {TeacherDeleteArgs} args - Arguments to delete one Teacher.
     * @example
     * // Delete one Teacher
     * const Teacher = await prisma.teacher.delete({
     *   where: {
     *     // ... filter to delete one Teacher
     *   }
     * })
     * 
     */
    delete<T extends TeacherDeleteArgs>(args: SelectSubset<T, TeacherDeleteArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Teacher.
     * @param {TeacherUpdateArgs} args - Arguments to update one Teacher.
     * @example
     * // Update one Teacher
     * const teacher = await prisma.teacher.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeacherUpdateArgs>(args: SelectSubset<T, TeacherUpdateArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Teachers.
     * @param {TeacherDeleteManyArgs} args - Arguments to filter Teachers to delete.
     * @example
     * // Delete a few Teachers
     * const { count } = await prisma.teacher.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeacherDeleteManyArgs>(args?: SelectSubset<T, TeacherDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teachers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Teachers
     * const teacher = await prisma.teacher.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeacherUpdateManyArgs>(args: SelectSubset<T, TeacherUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teachers and returns the data updated in the database.
     * @param {TeacherUpdateManyAndReturnArgs} args - Arguments to update many Teachers.
     * @example
     * // Update many Teachers
     * const teacher = await prisma.teacher.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Teachers and only return the `id`
     * const teacherWithIdOnly = await prisma.teacher.updateManyAndReturn({
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
    updateManyAndReturn<T extends TeacherUpdateManyAndReturnArgs>(args: SelectSubset<T, TeacherUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Teacher.
     * @param {TeacherUpsertArgs} args - Arguments to update or create a Teacher.
     * @example
     * // Update or create a Teacher
     * const teacher = await prisma.teacher.upsert({
     *   create: {
     *     // ... data to create a Teacher
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Teacher we want to update
     *   }
     * })
     */
    upsert<T extends TeacherUpsertArgs>(args: SelectSubset<T, TeacherUpsertArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Teachers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherCountArgs} args - Arguments to filter Teachers to count.
     * @example
     * // Count the number of Teachers
     * const count = await prisma.teacher.count({
     *   where: {
     *     // ... the filter for the Teachers we want to count
     *   }
     * })
    **/
    count<T extends TeacherCountArgs>(
      args?: Subset<T, TeacherCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeacherCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Teacher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TeacherAggregateArgs>(args: Subset<T, TeacherAggregateArgs>): Prisma.PrismaPromise<GetTeacherAggregateType<T>>

    /**
     * Group by Teacher.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherGroupByArgs} args - Group by arguments.
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
      T extends TeacherGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeacherGroupByArgs['orderBy'] }
        : { orderBy?: TeacherGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TeacherGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeacherGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Teacher model
   */
  readonly fields: TeacherFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Teacher.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeacherClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    headOfClasses<T extends Teacher$headOfClassesArgs<ExtArgs> = {}>(args?: Subset<T, Teacher$headOfClassesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    assignments<T extends Teacher$assignmentsArgs<ExtArgs> = {}>(args?: Subset<T, Teacher$assignmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherSubjectClassPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    marks<T extends Teacher$marksArgs<ExtArgs> = {}>(args?: Subset<T, Teacher$marksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    absences<T extends Teacher$absencesArgs<ExtArgs> = {}>(args?: Subset<T, Teacher$absencesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AbsencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Teacher model
   */
  interface TeacherFieldRefs {
    readonly id: FieldRef<"Teacher", 'Int'>
    readonly userId: FieldRef<"Teacher", 'Int'>
    readonly speciality: FieldRef<"Teacher", 'String'>
    readonly phone: FieldRef<"Teacher", 'String'>
    readonly createdAt: FieldRef<"Teacher", 'DateTime'>
    readonly updatedAt: FieldRef<"Teacher", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Teacher findUnique
   */
  export type TeacherFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher findUniqueOrThrow
   */
  export type TeacherFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher findFirst
   */
  export type TeacherFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teachers.
     */
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher findFirstOrThrow
   */
  export type TeacherFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teacher to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teachers.
     */
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher findMany
   */
  export type TeacherFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter, which Teachers to fetch.
     */
    where?: TeacherWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teachers to fetch.
     */
    orderBy?: TeacherOrderByWithRelationInput | TeacherOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Teachers.
     */
    cursor?: TeacherWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teachers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teachers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teachers.
     */
    distinct?: TeacherScalarFieldEnum | TeacherScalarFieldEnum[]
  }

  /**
   * Teacher create
   */
  export type TeacherCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * The data needed to create a Teacher.
     */
    data: XOR<TeacherCreateInput, TeacherUncheckedCreateInput>
  }

  /**
   * Teacher createMany
   */
  export type TeacherCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Teachers.
     */
    data: TeacherCreateManyInput | TeacherCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Teacher createManyAndReturn
   */
  export type TeacherCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * The data used to create many Teachers.
     */
    data: TeacherCreateManyInput | TeacherCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Teacher update
   */
  export type TeacherUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * The data needed to update a Teacher.
     */
    data: XOR<TeacherUpdateInput, TeacherUncheckedUpdateInput>
    /**
     * Choose, which Teacher to update.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher updateMany
   */
  export type TeacherUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Teachers.
     */
    data: XOR<TeacherUpdateManyMutationInput, TeacherUncheckedUpdateManyInput>
    /**
     * Filter which Teachers to update
     */
    where?: TeacherWhereInput
    /**
     * Limit how many Teachers to update.
     */
    limit?: number
  }

  /**
   * Teacher updateManyAndReturn
   */
  export type TeacherUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * The data used to update Teachers.
     */
    data: XOR<TeacherUpdateManyMutationInput, TeacherUncheckedUpdateManyInput>
    /**
     * Filter which Teachers to update
     */
    where?: TeacherWhereInput
    /**
     * Limit how many Teachers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Teacher upsert
   */
  export type TeacherUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * The filter to search for the Teacher to update in case it exists.
     */
    where: TeacherWhereUniqueInput
    /**
     * In case the Teacher found by the `where` argument doesn't exist, create a new Teacher with this data.
     */
    create: XOR<TeacherCreateInput, TeacherUncheckedCreateInput>
    /**
     * In case the Teacher was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeacherUpdateInput, TeacherUncheckedUpdateInput>
  }

  /**
   * Teacher delete
   */
  export type TeacherDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    /**
     * Filter which Teacher to delete.
     */
    where: TeacherWhereUniqueInput
  }

  /**
   * Teacher deleteMany
   */
  export type TeacherDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teachers to delete
     */
    where?: TeacherWhereInput
    /**
     * Limit how many Teachers to delete.
     */
    limit?: number
  }

  /**
   * Teacher.headOfClasses
   */
  export type Teacher$headOfClassesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    where?: ClassWhereInput
    orderBy?: ClassOrderByWithRelationInput | ClassOrderByWithRelationInput[]
    cursor?: ClassWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ClassScalarFieldEnum | ClassScalarFieldEnum[]
  }

  /**
   * Teacher.assignments
   */
  export type Teacher$assignmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeacherSubjectClass
     */
    select?: TeacherSubjectClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeacherSubjectClass
     */
    omit?: TeacherSubjectClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherSubjectClassInclude<ExtArgs> | null
    where?: TeacherSubjectClassWhereInput
    orderBy?: TeacherSubjectClassOrderByWithRelationInput | TeacherSubjectClassOrderByWithRelationInput[]
    cursor?: TeacherSubjectClassWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeacherSubjectClassScalarFieldEnum | TeacherSubjectClassScalarFieldEnum[]
  }

  /**
   * Teacher.marks
   */
  export type Teacher$marksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mark
     */
    select?: MarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mark
     */
    omit?: MarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarkInclude<ExtArgs> | null
    where?: MarkWhereInput
    orderBy?: MarkOrderByWithRelationInput | MarkOrderByWithRelationInput[]
    cursor?: MarkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MarkScalarFieldEnum | MarkScalarFieldEnum[]
  }

  /**
   * Teacher.absences
   */
  export type Teacher$absencesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absence
     */
    select?: AbsenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Absence
     */
    omit?: AbsenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsenceInclude<ExtArgs> | null
    where?: AbsenceWhereInput
    orderBy?: AbsenceOrderByWithRelationInput | AbsenceOrderByWithRelationInput[]
    cursor?: AbsenceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AbsenceScalarFieldEnum | AbsenceScalarFieldEnum[]
  }

  /**
   * Teacher without action
   */
  export type TeacherDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
  }


  /**
   * Model TeacherSubjectClass
   */

  export type AggregateTeacherSubjectClass = {
    _count: TeacherSubjectClassCountAggregateOutputType | null
    _avg: TeacherSubjectClassAvgAggregateOutputType | null
    _sum: TeacherSubjectClassSumAggregateOutputType | null
    _min: TeacherSubjectClassMinAggregateOutputType | null
    _max: TeacherSubjectClassMaxAggregateOutputType | null
  }

  export type TeacherSubjectClassAvgAggregateOutputType = {
    teacherId: number | null
    subjectId: number | null
    classId: number | null
  }

  export type TeacherSubjectClassSumAggregateOutputType = {
    teacherId: number | null
    subjectId: number | null
    classId: number | null
  }

  export type TeacherSubjectClassMinAggregateOutputType = {
    teacherId: number | null
    subjectId: number | null
    classId: number | null
    schoolYear: string | null
  }

  export type TeacherSubjectClassMaxAggregateOutputType = {
    teacherId: number | null
    subjectId: number | null
    classId: number | null
    schoolYear: string | null
  }

  export type TeacherSubjectClassCountAggregateOutputType = {
    teacherId: number
    subjectId: number
    classId: number
    schoolYear: number
    _all: number
  }


  export type TeacherSubjectClassAvgAggregateInputType = {
    teacherId?: true
    subjectId?: true
    classId?: true
  }

  export type TeacherSubjectClassSumAggregateInputType = {
    teacherId?: true
    subjectId?: true
    classId?: true
  }

  export type TeacherSubjectClassMinAggregateInputType = {
    teacherId?: true
    subjectId?: true
    classId?: true
    schoolYear?: true
  }

  export type TeacherSubjectClassMaxAggregateInputType = {
    teacherId?: true
    subjectId?: true
    classId?: true
    schoolYear?: true
  }

  export type TeacherSubjectClassCountAggregateInputType = {
    teacherId?: true
    subjectId?: true
    classId?: true
    schoolYear?: true
    _all?: true
  }

  export type TeacherSubjectClassAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeacherSubjectClass to aggregate.
     */
    where?: TeacherSubjectClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeacherSubjectClasses to fetch.
     */
    orderBy?: TeacherSubjectClassOrderByWithRelationInput | TeacherSubjectClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeacherSubjectClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeacherSubjectClasses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeacherSubjectClasses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TeacherSubjectClasses
    **/
    _count?: true | TeacherSubjectClassCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TeacherSubjectClassAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TeacherSubjectClassSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeacherSubjectClassMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeacherSubjectClassMaxAggregateInputType
  }

  export type GetTeacherSubjectClassAggregateType<T extends TeacherSubjectClassAggregateArgs> = {
        [P in keyof T & keyof AggregateTeacherSubjectClass]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeacherSubjectClass[P]>
      : GetScalarType<T[P], AggregateTeacherSubjectClass[P]>
  }




  export type TeacherSubjectClassGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeacherSubjectClassWhereInput
    orderBy?: TeacherSubjectClassOrderByWithAggregationInput | TeacherSubjectClassOrderByWithAggregationInput[]
    by: TeacherSubjectClassScalarFieldEnum[] | TeacherSubjectClassScalarFieldEnum
    having?: TeacherSubjectClassScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeacherSubjectClassCountAggregateInputType | true
    _avg?: TeacherSubjectClassAvgAggregateInputType
    _sum?: TeacherSubjectClassSumAggregateInputType
    _min?: TeacherSubjectClassMinAggregateInputType
    _max?: TeacherSubjectClassMaxAggregateInputType
  }

  export type TeacherSubjectClassGroupByOutputType = {
    teacherId: number
    subjectId: number
    classId: number
    schoolYear: string
    _count: TeacherSubjectClassCountAggregateOutputType | null
    _avg: TeacherSubjectClassAvgAggregateOutputType | null
    _sum: TeacherSubjectClassSumAggregateOutputType | null
    _min: TeacherSubjectClassMinAggregateOutputType | null
    _max: TeacherSubjectClassMaxAggregateOutputType | null
  }

  type GetTeacherSubjectClassGroupByPayload<T extends TeacherSubjectClassGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeacherSubjectClassGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeacherSubjectClassGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeacherSubjectClassGroupByOutputType[P]>
            : GetScalarType<T[P], TeacherSubjectClassGroupByOutputType[P]>
        }
      >
    >


  export type TeacherSubjectClassSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    teacherId?: boolean
    subjectId?: boolean
    classId?: boolean
    schoolYear?: boolean
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teacherSubjectClass"]>

  export type TeacherSubjectClassSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    teacherId?: boolean
    subjectId?: boolean
    classId?: boolean
    schoolYear?: boolean
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teacherSubjectClass"]>

  export type TeacherSubjectClassSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    teacherId?: boolean
    subjectId?: boolean
    classId?: boolean
    schoolYear?: boolean
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teacherSubjectClass"]>

  export type TeacherSubjectClassSelectScalar = {
    teacherId?: boolean
    subjectId?: boolean
    classId?: boolean
    schoolYear?: boolean
  }

  export type TeacherSubjectClassOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"teacherId" | "subjectId" | "classId" | "schoolYear", ExtArgs["result"]["teacherSubjectClass"]>
  export type TeacherSubjectClassInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }
  export type TeacherSubjectClassIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }
  export type TeacherSubjectClassIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teacher?: boolean | TeacherDefaultArgs<ExtArgs>
    subject?: boolean | SubjectDefaultArgs<ExtArgs>
    class?: boolean | ClassDefaultArgs<ExtArgs>
  }

  export type $TeacherSubjectClassPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TeacherSubjectClass"
    objects: {
      teacher: Prisma.$TeacherPayload<ExtArgs>
      subject: Prisma.$SubjectPayload<ExtArgs>
      class: Prisma.$ClassPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      teacherId: number
      subjectId: number
      classId: number
      schoolYear: string
    }, ExtArgs["result"]["teacherSubjectClass"]>
    composites: {}
  }

  type TeacherSubjectClassGetPayload<S extends boolean | null | undefined | TeacherSubjectClassDefaultArgs> = $Result.GetResult<Prisma.$TeacherSubjectClassPayload, S>

  type TeacherSubjectClassCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeacherSubjectClassFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeacherSubjectClassCountAggregateInputType | true
    }

  export interface TeacherSubjectClassDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TeacherSubjectClass'], meta: { name: 'TeacherSubjectClass' } }
    /**
     * Find zero or one TeacherSubjectClass that matches the filter.
     * @param {TeacherSubjectClassFindUniqueArgs} args - Arguments to find a TeacherSubjectClass
     * @example
     * // Get one TeacherSubjectClass
     * const teacherSubjectClass = await prisma.teacherSubjectClass.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeacherSubjectClassFindUniqueArgs>(args: SelectSubset<T, TeacherSubjectClassFindUniqueArgs<ExtArgs>>): Prisma__TeacherSubjectClassClient<$Result.GetResult<Prisma.$TeacherSubjectClassPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TeacherSubjectClass that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeacherSubjectClassFindUniqueOrThrowArgs} args - Arguments to find a TeacherSubjectClass
     * @example
     * // Get one TeacherSubjectClass
     * const teacherSubjectClass = await prisma.teacherSubjectClass.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeacherSubjectClassFindUniqueOrThrowArgs>(args: SelectSubset<T, TeacherSubjectClassFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeacherSubjectClassClient<$Result.GetResult<Prisma.$TeacherSubjectClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TeacherSubjectClass that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherSubjectClassFindFirstArgs} args - Arguments to find a TeacherSubjectClass
     * @example
     * // Get one TeacherSubjectClass
     * const teacherSubjectClass = await prisma.teacherSubjectClass.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeacherSubjectClassFindFirstArgs>(args?: SelectSubset<T, TeacherSubjectClassFindFirstArgs<ExtArgs>>): Prisma__TeacherSubjectClassClient<$Result.GetResult<Prisma.$TeacherSubjectClassPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TeacherSubjectClass that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherSubjectClassFindFirstOrThrowArgs} args - Arguments to find a TeacherSubjectClass
     * @example
     * // Get one TeacherSubjectClass
     * const teacherSubjectClass = await prisma.teacherSubjectClass.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeacherSubjectClassFindFirstOrThrowArgs>(args?: SelectSubset<T, TeacherSubjectClassFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeacherSubjectClassClient<$Result.GetResult<Prisma.$TeacherSubjectClassPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TeacherSubjectClasses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherSubjectClassFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TeacherSubjectClasses
     * const teacherSubjectClasses = await prisma.teacherSubjectClass.findMany()
     * 
     * // Get first 10 TeacherSubjectClasses
     * const teacherSubjectClasses = await prisma.teacherSubjectClass.findMany({ take: 10 })
     * 
     * // Only select the `teacherId`
     * const teacherSubjectClassWithTeacherIdOnly = await prisma.teacherSubjectClass.findMany({ select: { teacherId: true } })
     * 
     */
    findMany<T extends TeacherSubjectClassFindManyArgs>(args?: SelectSubset<T, TeacherSubjectClassFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherSubjectClassPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TeacherSubjectClass.
     * @param {TeacherSubjectClassCreateArgs} args - Arguments to create a TeacherSubjectClass.
     * @example
     * // Create one TeacherSubjectClass
     * const TeacherSubjectClass = await prisma.teacherSubjectClass.create({
     *   data: {
     *     // ... data to create a TeacherSubjectClass
     *   }
     * })
     * 
     */
    create<T extends TeacherSubjectClassCreateArgs>(args: SelectSubset<T, TeacherSubjectClassCreateArgs<ExtArgs>>): Prisma__TeacherSubjectClassClient<$Result.GetResult<Prisma.$TeacherSubjectClassPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TeacherSubjectClasses.
     * @param {TeacherSubjectClassCreateManyArgs} args - Arguments to create many TeacherSubjectClasses.
     * @example
     * // Create many TeacherSubjectClasses
     * const teacherSubjectClass = await prisma.teacherSubjectClass.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeacherSubjectClassCreateManyArgs>(args?: SelectSubset<T, TeacherSubjectClassCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TeacherSubjectClasses and returns the data saved in the database.
     * @param {TeacherSubjectClassCreateManyAndReturnArgs} args - Arguments to create many TeacherSubjectClasses.
     * @example
     * // Create many TeacherSubjectClasses
     * const teacherSubjectClass = await prisma.teacherSubjectClass.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TeacherSubjectClasses and only return the `teacherId`
     * const teacherSubjectClassWithTeacherIdOnly = await prisma.teacherSubjectClass.createManyAndReturn({
     *   select: { teacherId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeacherSubjectClassCreateManyAndReturnArgs>(args?: SelectSubset<T, TeacherSubjectClassCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherSubjectClassPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TeacherSubjectClass.
     * @param {TeacherSubjectClassDeleteArgs} args - Arguments to delete one TeacherSubjectClass.
     * @example
     * // Delete one TeacherSubjectClass
     * const TeacherSubjectClass = await prisma.teacherSubjectClass.delete({
     *   where: {
     *     // ... filter to delete one TeacherSubjectClass
     *   }
     * })
     * 
     */
    delete<T extends TeacherSubjectClassDeleteArgs>(args: SelectSubset<T, TeacherSubjectClassDeleteArgs<ExtArgs>>): Prisma__TeacherSubjectClassClient<$Result.GetResult<Prisma.$TeacherSubjectClassPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TeacherSubjectClass.
     * @param {TeacherSubjectClassUpdateArgs} args - Arguments to update one TeacherSubjectClass.
     * @example
     * // Update one TeacherSubjectClass
     * const teacherSubjectClass = await prisma.teacherSubjectClass.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeacherSubjectClassUpdateArgs>(args: SelectSubset<T, TeacherSubjectClassUpdateArgs<ExtArgs>>): Prisma__TeacherSubjectClassClient<$Result.GetResult<Prisma.$TeacherSubjectClassPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TeacherSubjectClasses.
     * @param {TeacherSubjectClassDeleteManyArgs} args - Arguments to filter TeacherSubjectClasses to delete.
     * @example
     * // Delete a few TeacherSubjectClasses
     * const { count } = await prisma.teacherSubjectClass.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeacherSubjectClassDeleteManyArgs>(args?: SelectSubset<T, TeacherSubjectClassDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TeacherSubjectClasses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherSubjectClassUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TeacherSubjectClasses
     * const teacherSubjectClass = await prisma.teacherSubjectClass.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeacherSubjectClassUpdateManyArgs>(args: SelectSubset<T, TeacherSubjectClassUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TeacherSubjectClasses and returns the data updated in the database.
     * @param {TeacherSubjectClassUpdateManyAndReturnArgs} args - Arguments to update many TeacherSubjectClasses.
     * @example
     * // Update many TeacherSubjectClasses
     * const teacherSubjectClass = await prisma.teacherSubjectClass.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TeacherSubjectClasses and only return the `teacherId`
     * const teacherSubjectClassWithTeacherIdOnly = await prisma.teacherSubjectClass.updateManyAndReturn({
     *   select: { teacherId: true },
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
    updateManyAndReturn<T extends TeacherSubjectClassUpdateManyAndReturnArgs>(args: SelectSubset<T, TeacherSubjectClassUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeacherSubjectClassPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TeacherSubjectClass.
     * @param {TeacherSubjectClassUpsertArgs} args - Arguments to update or create a TeacherSubjectClass.
     * @example
     * // Update or create a TeacherSubjectClass
     * const teacherSubjectClass = await prisma.teacherSubjectClass.upsert({
     *   create: {
     *     // ... data to create a TeacherSubjectClass
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TeacherSubjectClass we want to update
     *   }
     * })
     */
    upsert<T extends TeacherSubjectClassUpsertArgs>(args: SelectSubset<T, TeacherSubjectClassUpsertArgs<ExtArgs>>): Prisma__TeacherSubjectClassClient<$Result.GetResult<Prisma.$TeacherSubjectClassPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TeacherSubjectClasses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherSubjectClassCountArgs} args - Arguments to filter TeacherSubjectClasses to count.
     * @example
     * // Count the number of TeacherSubjectClasses
     * const count = await prisma.teacherSubjectClass.count({
     *   where: {
     *     // ... the filter for the TeacherSubjectClasses we want to count
     *   }
     * })
    **/
    count<T extends TeacherSubjectClassCountArgs>(
      args?: Subset<T, TeacherSubjectClassCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeacherSubjectClassCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TeacherSubjectClass.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherSubjectClassAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends TeacherSubjectClassAggregateArgs>(args: Subset<T, TeacherSubjectClassAggregateArgs>): Prisma.PrismaPromise<GetTeacherSubjectClassAggregateType<T>>

    /**
     * Group by TeacherSubjectClass.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeacherSubjectClassGroupByArgs} args - Group by arguments.
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
      T extends TeacherSubjectClassGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeacherSubjectClassGroupByArgs['orderBy'] }
        : { orderBy?: TeacherSubjectClassGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, TeacherSubjectClassGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeacherSubjectClassGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TeacherSubjectClass model
   */
  readonly fields: TeacherSubjectClassFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TeacherSubjectClass.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeacherSubjectClassClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    teacher<T extends TeacherDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeacherDefaultArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    subject<T extends SubjectDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SubjectDefaultArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    class<T extends ClassDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClassDefaultArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the TeacherSubjectClass model
   */
  interface TeacherSubjectClassFieldRefs {
    readonly teacherId: FieldRef<"TeacherSubjectClass", 'Int'>
    readonly subjectId: FieldRef<"TeacherSubjectClass", 'Int'>
    readonly classId: FieldRef<"TeacherSubjectClass", 'Int'>
    readonly schoolYear: FieldRef<"TeacherSubjectClass", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TeacherSubjectClass findUnique
   */
  export type TeacherSubjectClassFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeacherSubjectClass
     */
    select?: TeacherSubjectClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeacherSubjectClass
     */
    omit?: TeacherSubjectClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherSubjectClassInclude<ExtArgs> | null
    /**
     * Filter, which TeacherSubjectClass to fetch.
     */
    where: TeacherSubjectClassWhereUniqueInput
  }

  /**
   * TeacherSubjectClass findUniqueOrThrow
   */
  export type TeacherSubjectClassFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeacherSubjectClass
     */
    select?: TeacherSubjectClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeacherSubjectClass
     */
    omit?: TeacherSubjectClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherSubjectClassInclude<ExtArgs> | null
    /**
     * Filter, which TeacherSubjectClass to fetch.
     */
    where: TeacherSubjectClassWhereUniqueInput
  }

  /**
   * TeacherSubjectClass findFirst
   */
  export type TeacherSubjectClassFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeacherSubjectClass
     */
    select?: TeacherSubjectClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeacherSubjectClass
     */
    omit?: TeacherSubjectClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherSubjectClassInclude<ExtArgs> | null
    /**
     * Filter, which TeacherSubjectClass to fetch.
     */
    where?: TeacherSubjectClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeacherSubjectClasses to fetch.
     */
    orderBy?: TeacherSubjectClassOrderByWithRelationInput | TeacherSubjectClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeacherSubjectClasses.
     */
    cursor?: TeacherSubjectClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeacherSubjectClasses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeacherSubjectClasses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeacherSubjectClasses.
     */
    distinct?: TeacherSubjectClassScalarFieldEnum | TeacherSubjectClassScalarFieldEnum[]
  }

  /**
   * TeacherSubjectClass findFirstOrThrow
   */
  export type TeacherSubjectClassFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeacherSubjectClass
     */
    select?: TeacherSubjectClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeacherSubjectClass
     */
    omit?: TeacherSubjectClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherSubjectClassInclude<ExtArgs> | null
    /**
     * Filter, which TeacherSubjectClass to fetch.
     */
    where?: TeacherSubjectClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeacherSubjectClasses to fetch.
     */
    orderBy?: TeacherSubjectClassOrderByWithRelationInput | TeacherSubjectClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeacherSubjectClasses.
     */
    cursor?: TeacherSubjectClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeacherSubjectClasses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeacherSubjectClasses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeacherSubjectClasses.
     */
    distinct?: TeacherSubjectClassScalarFieldEnum | TeacherSubjectClassScalarFieldEnum[]
  }

  /**
   * TeacherSubjectClass findMany
   */
  export type TeacherSubjectClassFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeacherSubjectClass
     */
    select?: TeacherSubjectClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeacherSubjectClass
     */
    omit?: TeacherSubjectClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherSubjectClassInclude<ExtArgs> | null
    /**
     * Filter, which TeacherSubjectClasses to fetch.
     */
    where?: TeacherSubjectClassWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeacherSubjectClasses to fetch.
     */
    orderBy?: TeacherSubjectClassOrderByWithRelationInput | TeacherSubjectClassOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TeacherSubjectClasses.
     */
    cursor?: TeacherSubjectClassWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeacherSubjectClasses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeacherSubjectClasses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeacherSubjectClasses.
     */
    distinct?: TeacherSubjectClassScalarFieldEnum | TeacherSubjectClassScalarFieldEnum[]
  }

  /**
   * TeacherSubjectClass create
   */
  export type TeacherSubjectClassCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeacherSubjectClass
     */
    select?: TeacherSubjectClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeacherSubjectClass
     */
    omit?: TeacherSubjectClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherSubjectClassInclude<ExtArgs> | null
    /**
     * The data needed to create a TeacherSubjectClass.
     */
    data: XOR<TeacherSubjectClassCreateInput, TeacherSubjectClassUncheckedCreateInput>
  }

  /**
   * TeacherSubjectClass createMany
   */
  export type TeacherSubjectClassCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TeacherSubjectClasses.
     */
    data: TeacherSubjectClassCreateManyInput | TeacherSubjectClassCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TeacherSubjectClass createManyAndReturn
   */
  export type TeacherSubjectClassCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeacherSubjectClass
     */
    select?: TeacherSubjectClassSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TeacherSubjectClass
     */
    omit?: TeacherSubjectClassOmit<ExtArgs> | null
    /**
     * The data used to create many TeacherSubjectClasses.
     */
    data: TeacherSubjectClassCreateManyInput | TeacherSubjectClassCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherSubjectClassIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TeacherSubjectClass update
   */
  export type TeacherSubjectClassUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeacherSubjectClass
     */
    select?: TeacherSubjectClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeacherSubjectClass
     */
    omit?: TeacherSubjectClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherSubjectClassInclude<ExtArgs> | null
    /**
     * The data needed to update a TeacherSubjectClass.
     */
    data: XOR<TeacherSubjectClassUpdateInput, TeacherSubjectClassUncheckedUpdateInput>
    /**
     * Choose, which TeacherSubjectClass to update.
     */
    where: TeacherSubjectClassWhereUniqueInput
  }

  /**
   * TeacherSubjectClass updateMany
   */
  export type TeacherSubjectClassUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TeacherSubjectClasses.
     */
    data: XOR<TeacherSubjectClassUpdateManyMutationInput, TeacherSubjectClassUncheckedUpdateManyInput>
    /**
     * Filter which TeacherSubjectClasses to update
     */
    where?: TeacherSubjectClassWhereInput
    /**
     * Limit how many TeacherSubjectClasses to update.
     */
    limit?: number
  }

  /**
   * TeacherSubjectClass updateManyAndReturn
   */
  export type TeacherSubjectClassUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeacherSubjectClass
     */
    select?: TeacherSubjectClassSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TeacherSubjectClass
     */
    omit?: TeacherSubjectClassOmit<ExtArgs> | null
    /**
     * The data used to update TeacherSubjectClasses.
     */
    data: XOR<TeacherSubjectClassUpdateManyMutationInput, TeacherSubjectClassUncheckedUpdateManyInput>
    /**
     * Filter which TeacherSubjectClasses to update
     */
    where?: TeacherSubjectClassWhereInput
    /**
     * Limit how many TeacherSubjectClasses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherSubjectClassIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TeacherSubjectClass upsert
   */
  export type TeacherSubjectClassUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeacherSubjectClass
     */
    select?: TeacherSubjectClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeacherSubjectClass
     */
    omit?: TeacherSubjectClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherSubjectClassInclude<ExtArgs> | null
    /**
     * The filter to search for the TeacherSubjectClass to update in case it exists.
     */
    where: TeacherSubjectClassWhereUniqueInput
    /**
     * In case the TeacherSubjectClass found by the `where` argument doesn't exist, create a new TeacherSubjectClass with this data.
     */
    create: XOR<TeacherSubjectClassCreateInput, TeacherSubjectClassUncheckedCreateInput>
    /**
     * In case the TeacherSubjectClass was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeacherSubjectClassUpdateInput, TeacherSubjectClassUncheckedUpdateInput>
  }

  /**
   * TeacherSubjectClass delete
   */
  export type TeacherSubjectClassDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeacherSubjectClass
     */
    select?: TeacherSubjectClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeacherSubjectClass
     */
    omit?: TeacherSubjectClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherSubjectClassInclude<ExtArgs> | null
    /**
     * Filter which TeacherSubjectClass to delete.
     */
    where: TeacherSubjectClassWhereUniqueInput
  }

  /**
   * TeacherSubjectClass deleteMany
   */
  export type TeacherSubjectClassDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeacherSubjectClasses to delete
     */
    where?: TeacherSubjectClassWhereInput
    /**
     * Limit how many TeacherSubjectClasses to delete.
     */
    limit?: number
  }

  /**
   * TeacherSubjectClass without action
   */
  export type TeacherSubjectClassDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeacherSubjectClass
     */
    select?: TeacherSubjectClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeacherSubjectClass
     */
    omit?: TeacherSubjectClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherSubjectClassInclude<ExtArgs> | null
  }


  /**
   * Model Mark
   */

  export type AggregateMark = {
    _count: MarkCountAggregateOutputType | null
    _avg: MarkAvgAggregateOutputType | null
    _sum: MarkSumAggregateOutputType | null
    _min: MarkMinAggregateOutputType | null
    _max: MarkMaxAggregateOutputType | null
  }

  export type MarkAvgAggregateOutputType = {
    id: number | null
    studentId: number | null
    subjectId: number | null
    teacherId: number | null
    classId: number | null
    value: number | null
    coefficient: number | null
    semester: number | null
  }

  export type MarkSumAggregateOutputType = {
    id: number | null
    studentId: number | null
    subjectId: number | null
    teacherId: number | null
    classId: number | null
    value: number | null
    coefficient: number | null
    semester: number | null
  }

  export type MarkMinAggregateOutputType = {
    id: number | null
    studentId: number | null
    subjectId: number | null
    teacherId: number | null
    classId: number | null
    subject: string | null
    value: number | null
    coefficient: number | null
    semester: number | null
    comment: string | null
    term: string | null
    date: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MarkMaxAggregateOutputType = {
    id: number | null
    studentId: number | null
    subjectId: number | null
    teacherId: number | null
    classId: number | null
    subject: string | null
    value: number | null
    coefficient: number | null
    semester: number | null
    comment: string | null
    term: string | null
    date: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MarkCountAggregateOutputType = {
    id: number
    studentId: number
    subjectId: number
    teacherId: number
    classId: number
    subject: number
    value: number
    coefficient: number
    semester: number
    comment: number
    term: number
    date: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MarkAvgAggregateInputType = {
    id?: true
    studentId?: true
    subjectId?: true
    teacherId?: true
    classId?: true
    value?: true
    coefficient?: true
    semester?: true
  }

  export type MarkSumAggregateInputType = {
    id?: true
    studentId?: true
    subjectId?: true
    teacherId?: true
    classId?: true
    value?: true
    coefficient?: true
    semester?: true
  }

  export type MarkMinAggregateInputType = {
    id?: true
    studentId?: true
    subjectId?: true
    teacherId?: true
    classId?: true
    subject?: true
    value?: true
    coefficient?: true
    semester?: true
    comment?: true
    term?: true
    date?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MarkMaxAggregateInputType = {
    id?: true
    studentId?: true
    subjectId?: true
    teacherId?: true
    classId?: true
    subject?: true
    value?: true
    coefficient?: true
    semester?: true
    comment?: true
    term?: true
    date?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MarkCountAggregateInputType = {
    id?: true
    studentId?: true
    subjectId?: true
    teacherId?: true
    classId?: true
    subject?: true
    value?: true
    coefficient?: true
    semester?: true
    comment?: true
    term?: true
    date?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MarkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mark to aggregate.
     */
    where?: MarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Marks to fetch.
     */
    orderBy?: MarkOrderByWithRelationInput | MarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Marks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Marks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Marks
    **/
    _count?: true | MarkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MarkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MarkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MarkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MarkMaxAggregateInputType
  }

  export type GetMarkAggregateType<T extends MarkAggregateArgs> = {
        [P in keyof T & keyof AggregateMark]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMark[P]>
      : GetScalarType<T[P], AggregateMark[P]>
  }




  export type MarkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MarkWhereInput
    orderBy?: MarkOrderByWithAggregationInput | MarkOrderByWithAggregationInput[]
    by: MarkScalarFieldEnum[] | MarkScalarFieldEnum
    having?: MarkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MarkCountAggregateInputType | true
    _avg?: MarkAvgAggregateInputType
    _sum?: MarkSumAggregateInputType
    _min?: MarkMinAggregateInputType
    _max?: MarkMaxAggregateInputType
  }

  export type MarkGroupByOutputType = {
    id: number
    studentId: number
    subjectId: number | null
    teacherId: number | null
    classId: number | null
    subject: string
    value: number
    coefficient: number
    semester: number | null
    comment: string | null
    term: string
    date: Date
    createdAt: Date
    updatedAt: Date
    _count: MarkCountAggregateOutputType | null
    _avg: MarkAvgAggregateOutputType | null
    _sum: MarkSumAggregateOutputType | null
    _min: MarkMinAggregateOutputType | null
    _max: MarkMaxAggregateOutputType | null
  }

  type GetMarkGroupByPayload<T extends MarkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MarkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MarkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MarkGroupByOutputType[P]>
            : GetScalarType<T[P], MarkGroupByOutputType[P]>
        }
      >
    >


  export type MarkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    subjectId?: boolean
    teacherId?: boolean
    classId?: boolean
    subject?: boolean
    value?: boolean
    coefficient?: boolean
    semester?: boolean
    comment?: boolean
    term?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    subjectRef?: boolean | Mark$subjectRefArgs<ExtArgs>
    teacher?: boolean | Mark$teacherArgs<ExtArgs>
    class?: boolean | Mark$classArgs<ExtArgs>
  }, ExtArgs["result"]["mark"]>

  export type MarkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    subjectId?: boolean
    teacherId?: boolean
    classId?: boolean
    subject?: boolean
    value?: boolean
    coefficient?: boolean
    semester?: boolean
    comment?: boolean
    term?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    subjectRef?: boolean | Mark$subjectRefArgs<ExtArgs>
    teacher?: boolean | Mark$teacherArgs<ExtArgs>
    class?: boolean | Mark$classArgs<ExtArgs>
  }, ExtArgs["result"]["mark"]>

  export type MarkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    subjectId?: boolean
    teacherId?: boolean
    classId?: boolean
    subject?: boolean
    value?: boolean
    coefficient?: boolean
    semester?: boolean
    comment?: boolean
    term?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    subjectRef?: boolean | Mark$subjectRefArgs<ExtArgs>
    teacher?: boolean | Mark$teacherArgs<ExtArgs>
    class?: boolean | Mark$classArgs<ExtArgs>
  }, ExtArgs["result"]["mark"]>

  export type MarkSelectScalar = {
    id?: boolean
    studentId?: boolean
    subjectId?: boolean
    teacherId?: boolean
    classId?: boolean
    subject?: boolean
    value?: boolean
    coefficient?: boolean
    semester?: boolean
    comment?: boolean
    term?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MarkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "subjectId" | "teacherId" | "classId" | "subject" | "value" | "coefficient" | "semester" | "comment" | "term" | "date" | "createdAt" | "updatedAt", ExtArgs["result"]["mark"]>
  export type MarkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    subjectRef?: boolean | Mark$subjectRefArgs<ExtArgs>
    teacher?: boolean | Mark$teacherArgs<ExtArgs>
    class?: boolean | Mark$classArgs<ExtArgs>
  }
  export type MarkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    subjectRef?: boolean | Mark$subjectRefArgs<ExtArgs>
    teacher?: boolean | Mark$teacherArgs<ExtArgs>
    class?: boolean | Mark$classArgs<ExtArgs>
  }
  export type MarkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    subjectRef?: boolean | Mark$subjectRefArgs<ExtArgs>
    teacher?: boolean | Mark$teacherArgs<ExtArgs>
    class?: boolean | Mark$classArgs<ExtArgs>
  }

  export type $MarkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Mark"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
      subjectRef: Prisma.$SubjectPayload<ExtArgs> | null
      teacher: Prisma.$TeacherPayload<ExtArgs> | null
      class: Prisma.$ClassPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      studentId: number
      subjectId: number | null
      teacherId: number | null
      classId: number | null
      subject: string
      value: number
      coefficient: number
      semester: number | null
      comment: string | null
      term: string
      date: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["mark"]>
    composites: {}
  }

  type MarkGetPayload<S extends boolean | null | undefined | MarkDefaultArgs> = $Result.GetResult<Prisma.$MarkPayload, S>

  type MarkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MarkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MarkCountAggregateInputType | true
    }

  export interface MarkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Mark'], meta: { name: 'Mark' } }
    /**
     * Find zero or one Mark that matches the filter.
     * @param {MarkFindUniqueArgs} args - Arguments to find a Mark
     * @example
     * // Get one Mark
     * const mark = await prisma.mark.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MarkFindUniqueArgs>(args: SelectSubset<T, MarkFindUniqueArgs<ExtArgs>>): Prisma__MarkClient<$Result.GetResult<Prisma.$MarkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Mark that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MarkFindUniqueOrThrowArgs} args - Arguments to find a Mark
     * @example
     * // Get one Mark
     * const mark = await prisma.mark.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MarkFindUniqueOrThrowArgs>(args: SelectSubset<T, MarkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MarkClient<$Result.GetResult<Prisma.$MarkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mark that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarkFindFirstArgs} args - Arguments to find a Mark
     * @example
     * // Get one Mark
     * const mark = await prisma.mark.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MarkFindFirstArgs>(args?: SelectSubset<T, MarkFindFirstArgs<ExtArgs>>): Prisma__MarkClient<$Result.GetResult<Prisma.$MarkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mark that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarkFindFirstOrThrowArgs} args - Arguments to find a Mark
     * @example
     * // Get one Mark
     * const mark = await prisma.mark.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MarkFindFirstOrThrowArgs>(args?: SelectSubset<T, MarkFindFirstOrThrowArgs<ExtArgs>>): Prisma__MarkClient<$Result.GetResult<Prisma.$MarkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Marks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Marks
     * const marks = await prisma.mark.findMany()
     * 
     * // Get first 10 Marks
     * const marks = await prisma.mark.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const markWithIdOnly = await prisma.mark.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MarkFindManyArgs>(args?: SelectSubset<T, MarkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Mark.
     * @param {MarkCreateArgs} args - Arguments to create a Mark.
     * @example
     * // Create one Mark
     * const Mark = await prisma.mark.create({
     *   data: {
     *     // ... data to create a Mark
     *   }
     * })
     * 
     */
    create<T extends MarkCreateArgs>(args: SelectSubset<T, MarkCreateArgs<ExtArgs>>): Prisma__MarkClient<$Result.GetResult<Prisma.$MarkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Marks.
     * @param {MarkCreateManyArgs} args - Arguments to create many Marks.
     * @example
     * // Create many Marks
     * const mark = await prisma.mark.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MarkCreateManyArgs>(args?: SelectSubset<T, MarkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Marks and returns the data saved in the database.
     * @param {MarkCreateManyAndReturnArgs} args - Arguments to create many Marks.
     * @example
     * // Create many Marks
     * const mark = await prisma.mark.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Marks and only return the `id`
     * const markWithIdOnly = await prisma.mark.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MarkCreateManyAndReturnArgs>(args?: SelectSubset<T, MarkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Mark.
     * @param {MarkDeleteArgs} args - Arguments to delete one Mark.
     * @example
     * // Delete one Mark
     * const Mark = await prisma.mark.delete({
     *   where: {
     *     // ... filter to delete one Mark
     *   }
     * })
     * 
     */
    delete<T extends MarkDeleteArgs>(args: SelectSubset<T, MarkDeleteArgs<ExtArgs>>): Prisma__MarkClient<$Result.GetResult<Prisma.$MarkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Mark.
     * @param {MarkUpdateArgs} args - Arguments to update one Mark.
     * @example
     * // Update one Mark
     * const mark = await prisma.mark.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MarkUpdateArgs>(args: SelectSubset<T, MarkUpdateArgs<ExtArgs>>): Prisma__MarkClient<$Result.GetResult<Prisma.$MarkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Marks.
     * @param {MarkDeleteManyArgs} args - Arguments to filter Marks to delete.
     * @example
     * // Delete a few Marks
     * const { count } = await prisma.mark.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MarkDeleteManyArgs>(args?: SelectSubset<T, MarkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Marks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Marks
     * const mark = await prisma.mark.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MarkUpdateManyArgs>(args: SelectSubset<T, MarkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Marks and returns the data updated in the database.
     * @param {MarkUpdateManyAndReturnArgs} args - Arguments to update many Marks.
     * @example
     * // Update many Marks
     * const mark = await prisma.mark.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Marks and only return the `id`
     * const markWithIdOnly = await prisma.mark.updateManyAndReturn({
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
    updateManyAndReturn<T extends MarkUpdateManyAndReturnArgs>(args: SelectSubset<T, MarkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Mark.
     * @param {MarkUpsertArgs} args - Arguments to update or create a Mark.
     * @example
     * // Update or create a Mark
     * const mark = await prisma.mark.upsert({
     *   create: {
     *     // ... data to create a Mark
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mark we want to update
     *   }
     * })
     */
    upsert<T extends MarkUpsertArgs>(args: SelectSubset<T, MarkUpsertArgs<ExtArgs>>): Prisma__MarkClient<$Result.GetResult<Prisma.$MarkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Marks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarkCountArgs} args - Arguments to filter Marks to count.
     * @example
     * // Count the number of Marks
     * const count = await prisma.mark.count({
     *   where: {
     *     // ... the filter for the Marks we want to count
     *   }
     * })
    **/
    count<T extends MarkCountArgs>(
      args?: Subset<T, MarkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MarkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mark.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MarkAggregateArgs>(args: Subset<T, MarkAggregateArgs>): Prisma.PrismaPromise<GetMarkAggregateType<T>>

    /**
     * Group by Mark.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarkGroupByArgs} args - Group by arguments.
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
      T extends MarkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MarkGroupByArgs['orderBy'] }
        : { orderBy?: MarkGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MarkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMarkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Mark model
   */
  readonly fields: MarkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Mark.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MarkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    subjectRef<T extends Mark$subjectRefArgs<ExtArgs> = {}>(args?: Subset<T, Mark$subjectRefArgs<ExtArgs>>): Prisma__SubjectClient<$Result.GetResult<Prisma.$SubjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    teacher<T extends Mark$teacherArgs<ExtArgs> = {}>(args?: Subset<T, Mark$teacherArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    class<T extends Mark$classArgs<ExtArgs> = {}>(args?: Subset<T, Mark$classArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Mark model
   */
  interface MarkFieldRefs {
    readonly id: FieldRef<"Mark", 'Int'>
    readonly studentId: FieldRef<"Mark", 'Int'>
    readonly subjectId: FieldRef<"Mark", 'Int'>
    readonly teacherId: FieldRef<"Mark", 'Int'>
    readonly classId: FieldRef<"Mark", 'Int'>
    readonly subject: FieldRef<"Mark", 'String'>
    readonly value: FieldRef<"Mark", 'Float'>
    readonly coefficient: FieldRef<"Mark", 'Float'>
    readonly semester: FieldRef<"Mark", 'Int'>
    readonly comment: FieldRef<"Mark", 'String'>
    readonly term: FieldRef<"Mark", 'String'>
    readonly date: FieldRef<"Mark", 'DateTime'>
    readonly createdAt: FieldRef<"Mark", 'DateTime'>
    readonly updatedAt: FieldRef<"Mark", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Mark findUnique
   */
  export type MarkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mark
     */
    select?: MarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mark
     */
    omit?: MarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarkInclude<ExtArgs> | null
    /**
     * Filter, which Mark to fetch.
     */
    where: MarkWhereUniqueInput
  }

  /**
   * Mark findUniqueOrThrow
   */
  export type MarkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mark
     */
    select?: MarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mark
     */
    omit?: MarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarkInclude<ExtArgs> | null
    /**
     * Filter, which Mark to fetch.
     */
    where: MarkWhereUniqueInput
  }

  /**
   * Mark findFirst
   */
  export type MarkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mark
     */
    select?: MarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mark
     */
    omit?: MarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarkInclude<ExtArgs> | null
    /**
     * Filter, which Mark to fetch.
     */
    where?: MarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Marks to fetch.
     */
    orderBy?: MarkOrderByWithRelationInput | MarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Marks.
     */
    cursor?: MarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Marks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Marks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Marks.
     */
    distinct?: MarkScalarFieldEnum | MarkScalarFieldEnum[]
  }

  /**
   * Mark findFirstOrThrow
   */
  export type MarkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mark
     */
    select?: MarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mark
     */
    omit?: MarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarkInclude<ExtArgs> | null
    /**
     * Filter, which Mark to fetch.
     */
    where?: MarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Marks to fetch.
     */
    orderBy?: MarkOrderByWithRelationInput | MarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Marks.
     */
    cursor?: MarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Marks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Marks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Marks.
     */
    distinct?: MarkScalarFieldEnum | MarkScalarFieldEnum[]
  }

  /**
   * Mark findMany
   */
  export type MarkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mark
     */
    select?: MarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mark
     */
    omit?: MarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarkInclude<ExtArgs> | null
    /**
     * Filter, which Marks to fetch.
     */
    where?: MarkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Marks to fetch.
     */
    orderBy?: MarkOrderByWithRelationInput | MarkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Marks.
     */
    cursor?: MarkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Marks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Marks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Marks.
     */
    distinct?: MarkScalarFieldEnum | MarkScalarFieldEnum[]
  }

  /**
   * Mark create
   */
  export type MarkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mark
     */
    select?: MarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mark
     */
    omit?: MarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarkInclude<ExtArgs> | null
    /**
     * The data needed to create a Mark.
     */
    data: XOR<MarkCreateInput, MarkUncheckedCreateInput>
  }

  /**
   * Mark createMany
   */
  export type MarkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Marks.
     */
    data: MarkCreateManyInput | MarkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mark createManyAndReturn
   */
  export type MarkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mark
     */
    select?: MarkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Mark
     */
    omit?: MarkOmit<ExtArgs> | null
    /**
     * The data used to create many Marks.
     */
    data: MarkCreateManyInput | MarkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Mark update
   */
  export type MarkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mark
     */
    select?: MarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mark
     */
    omit?: MarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarkInclude<ExtArgs> | null
    /**
     * The data needed to update a Mark.
     */
    data: XOR<MarkUpdateInput, MarkUncheckedUpdateInput>
    /**
     * Choose, which Mark to update.
     */
    where: MarkWhereUniqueInput
  }

  /**
   * Mark updateMany
   */
  export type MarkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Marks.
     */
    data: XOR<MarkUpdateManyMutationInput, MarkUncheckedUpdateManyInput>
    /**
     * Filter which Marks to update
     */
    where?: MarkWhereInput
    /**
     * Limit how many Marks to update.
     */
    limit?: number
  }

  /**
   * Mark updateManyAndReturn
   */
  export type MarkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mark
     */
    select?: MarkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Mark
     */
    omit?: MarkOmit<ExtArgs> | null
    /**
     * The data used to update Marks.
     */
    data: XOR<MarkUpdateManyMutationInput, MarkUncheckedUpdateManyInput>
    /**
     * Filter which Marks to update
     */
    where?: MarkWhereInput
    /**
     * Limit how many Marks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Mark upsert
   */
  export type MarkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mark
     */
    select?: MarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mark
     */
    omit?: MarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarkInclude<ExtArgs> | null
    /**
     * The filter to search for the Mark to update in case it exists.
     */
    where: MarkWhereUniqueInput
    /**
     * In case the Mark found by the `where` argument doesn't exist, create a new Mark with this data.
     */
    create: XOR<MarkCreateInput, MarkUncheckedCreateInput>
    /**
     * In case the Mark was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MarkUpdateInput, MarkUncheckedUpdateInput>
  }

  /**
   * Mark delete
   */
  export type MarkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mark
     */
    select?: MarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mark
     */
    omit?: MarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarkInclude<ExtArgs> | null
    /**
     * Filter which Mark to delete.
     */
    where: MarkWhereUniqueInput
  }

  /**
   * Mark deleteMany
   */
  export type MarkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Marks to delete
     */
    where?: MarkWhereInput
    /**
     * Limit how many Marks to delete.
     */
    limit?: number
  }

  /**
   * Mark.subjectRef
   */
  export type Mark$subjectRefArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subject
     */
    select?: SubjectSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Subject
     */
    omit?: SubjectOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SubjectInclude<ExtArgs> | null
    where?: SubjectWhereInput
  }

  /**
   * Mark.teacher
   */
  export type Mark$teacherArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    where?: TeacherWhereInput
  }

  /**
   * Mark.class
   */
  export type Mark$classArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    where?: ClassWhereInput
  }

  /**
   * Mark without action
   */
  export type MarkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mark
     */
    select?: MarkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mark
     */
    omit?: MarkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MarkInclude<ExtArgs> | null
  }


  /**
   * Model Absence
   */

  export type AggregateAbsence = {
    _count: AbsenceCountAggregateOutputType | null
    _avg: AbsenceAvgAggregateOutputType | null
    _sum: AbsenceSumAggregateOutputType | null
    _min: AbsenceMinAggregateOutputType | null
    _max: AbsenceMaxAggregateOutputType | null
  }

  export type AbsenceAvgAggregateOutputType = {
    id: number | null
    studentId: number | null
    teacherId: number | null
    classId: number | null
  }

  export type AbsenceSumAggregateOutputType = {
    id: number | null
    studentId: number | null
    teacherId: number | null
    classId: number | null
  }

  export type AbsenceMinAggregateOutputType = {
    id: number | null
    studentId: number | null
    teacherId: number | null
    classId: number | null
    date: Date | null
    status: $Enums.AbsenceStatus | null
    reason: string | null
    justified: boolean | null
    parentNotifiedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AbsenceMaxAggregateOutputType = {
    id: number | null
    studentId: number | null
    teacherId: number | null
    classId: number | null
    date: Date | null
    status: $Enums.AbsenceStatus | null
    reason: string | null
    justified: boolean | null
    parentNotifiedAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AbsenceCountAggregateOutputType = {
    id: number
    studentId: number
    teacherId: number
    classId: number
    date: number
    status: number
    reason: number
    justified: number
    parentNotifiedAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AbsenceAvgAggregateInputType = {
    id?: true
    studentId?: true
    teacherId?: true
    classId?: true
  }

  export type AbsenceSumAggregateInputType = {
    id?: true
    studentId?: true
    teacherId?: true
    classId?: true
  }

  export type AbsenceMinAggregateInputType = {
    id?: true
    studentId?: true
    teacherId?: true
    classId?: true
    date?: true
    status?: true
    reason?: true
    justified?: true
    parentNotifiedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AbsenceMaxAggregateInputType = {
    id?: true
    studentId?: true
    teacherId?: true
    classId?: true
    date?: true
    status?: true
    reason?: true
    justified?: true
    parentNotifiedAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AbsenceCountAggregateInputType = {
    id?: true
    studentId?: true
    teacherId?: true
    classId?: true
    date?: true
    status?: true
    reason?: true
    justified?: true
    parentNotifiedAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AbsenceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Absence to aggregate.
     */
    where?: AbsenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Absences to fetch.
     */
    orderBy?: AbsenceOrderByWithRelationInput | AbsenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AbsenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Absences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Absences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Absences
    **/
    _count?: true | AbsenceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AbsenceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AbsenceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AbsenceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AbsenceMaxAggregateInputType
  }

  export type GetAbsenceAggregateType<T extends AbsenceAggregateArgs> = {
        [P in keyof T & keyof AggregateAbsence]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAbsence[P]>
      : GetScalarType<T[P], AggregateAbsence[P]>
  }




  export type AbsenceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AbsenceWhereInput
    orderBy?: AbsenceOrderByWithAggregationInput | AbsenceOrderByWithAggregationInput[]
    by: AbsenceScalarFieldEnum[] | AbsenceScalarFieldEnum
    having?: AbsenceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AbsenceCountAggregateInputType | true
    _avg?: AbsenceAvgAggregateInputType
    _sum?: AbsenceSumAggregateInputType
    _min?: AbsenceMinAggregateInputType
    _max?: AbsenceMaxAggregateInputType
  }

  export type AbsenceGroupByOutputType = {
    id: number
    studentId: number
    teacherId: number | null
    classId: number | null
    date: Date
    status: $Enums.AbsenceStatus
    reason: string | null
    justified: boolean
    parentNotifiedAt: Date | null
    createdAt: Date
    updatedAt: Date
    _count: AbsenceCountAggregateOutputType | null
    _avg: AbsenceAvgAggregateOutputType | null
    _sum: AbsenceSumAggregateOutputType | null
    _min: AbsenceMinAggregateOutputType | null
    _max: AbsenceMaxAggregateOutputType | null
  }

  type GetAbsenceGroupByPayload<T extends AbsenceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AbsenceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AbsenceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AbsenceGroupByOutputType[P]>
            : GetScalarType<T[P], AbsenceGroupByOutputType[P]>
        }
      >
    >


  export type AbsenceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    teacherId?: boolean
    classId?: boolean
    date?: boolean
    status?: boolean
    reason?: boolean
    justified?: boolean
    parentNotifiedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    teacher?: boolean | Absence$teacherArgs<ExtArgs>
    class?: boolean | Absence$classArgs<ExtArgs>
  }, ExtArgs["result"]["absence"]>

  export type AbsenceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    teacherId?: boolean
    classId?: boolean
    date?: boolean
    status?: boolean
    reason?: boolean
    justified?: boolean
    parentNotifiedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    teacher?: boolean | Absence$teacherArgs<ExtArgs>
    class?: boolean | Absence$classArgs<ExtArgs>
  }, ExtArgs["result"]["absence"]>

  export type AbsenceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    teacherId?: boolean
    classId?: boolean
    date?: boolean
    status?: boolean
    reason?: boolean
    justified?: boolean
    parentNotifiedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
    teacher?: boolean | Absence$teacherArgs<ExtArgs>
    class?: boolean | Absence$classArgs<ExtArgs>
  }, ExtArgs["result"]["absence"]>

  export type AbsenceSelectScalar = {
    id?: boolean
    studentId?: boolean
    teacherId?: boolean
    classId?: boolean
    date?: boolean
    status?: boolean
    reason?: boolean
    justified?: boolean
    parentNotifiedAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AbsenceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "teacherId" | "classId" | "date" | "status" | "reason" | "justified" | "parentNotifiedAt" | "createdAt" | "updatedAt", ExtArgs["result"]["absence"]>
  export type AbsenceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    teacher?: boolean | Absence$teacherArgs<ExtArgs>
    class?: boolean | Absence$classArgs<ExtArgs>
  }
  export type AbsenceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    teacher?: boolean | Absence$teacherArgs<ExtArgs>
    class?: boolean | Absence$classArgs<ExtArgs>
  }
  export type AbsenceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
    teacher?: boolean | Absence$teacherArgs<ExtArgs>
    class?: boolean | Absence$classArgs<ExtArgs>
  }

  export type $AbsencePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Absence"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
      teacher: Prisma.$TeacherPayload<ExtArgs> | null
      class: Prisma.$ClassPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      studentId: number
      teacherId: number | null
      classId: number | null
      date: Date
      status: $Enums.AbsenceStatus
      reason: string | null
      justified: boolean
      parentNotifiedAt: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["absence"]>
    composites: {}
  }

  type AbsenceGetPayload<S extends boolean | null | undefined | AbsenceDefaultArgs> = $Result.GetResult<Prisma.$AbsencePayload, S>

  type AbsenceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AbsenceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AbsenceCountAggregateInputType | true
    }

  export interface AbsenceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Absence'], meta: { name: 'Absence' } }
    /**
     * Find zero or one Absence that matches the filter.
     * @param {AbsenceFindUniqueArgs} args - Arguments to find a Absence
     * @example
     * // Get one Absence
     * const absence = await prisma.absence.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AbsenceFindUniqueArgs>(args: SelectSubset<T, AbsenceFindUniqueArgs<ExtArgs>>): Prisma__AbsenceClient<$Result.GetResult<Prisma.$AbsencePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Absence that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AbsenceFindUniqueOrThrowArgs} args - Arguments to find a Absence
     * @example
     * // Get one Absence
     * const absence = await prisma.absence.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AbsenceFindUniqueOrThrowArgs>(args: SelectSubset<T, AbsenceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AbsenceClient<$Result.GetResult<Prisma.$AbsencePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Absence that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AbsenceFindFirstArgs} args - Arguments to find a Absence
     * @example
     * // Get one Absence
     * const absence = await prisma.absence.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AbsenceFindFirstArgs>(args?: SelectSubset<T, AbsenceFindFirstArgs<ExtArgs>>): Prisma__AbsenceClient<$Result.GetResult<Prisma.$AbsencePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Absence that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AbsenceFindFirstOrThrowArgs} args - Arguments to find a Absence
     * @example
     * // Get one Absence
     * const absence = await prisma.absence.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AbsenceFindFirstOrThrowArgs>(args?: SelectSubset<T, AbsenceFindFirstOrThrowArgs<ExtArgs>>): Prisma__AbsenceClient<$Result.GetResult<Prisma.$AbsencePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Absences that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AbsenceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Absences
     * const absences = await prisma.absence.findMany()
     * 
     * // Get first 10 Absences
     * const absences = await prisma.absence.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const absenceWithIdOnly = await prisma.absence.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AbsenceFindManyArgs>(args?: SelectSubset<T, AbsenceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AbsencePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Absence.
     * @param {AbsenceCreateArgs} args - Arguments to create a Absence.
     * @example
     * // Create one Absence
     * const Absence = await prisma.absence.create({
     *   data: {
     *     // ... data to create a Absence
     *   }
     * })
     * 
     */
    create<T extends AbsenceCreateArgs>(args: SelectSubset<T, AbsenceCreateArgs<ExtArgs>>): Prisma__AbsenceClient<$Result.GetResult<Prisma.$AbsencePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Absences.
     * @param {AbsenceCreateManyArgs} args - Arguments to create many Absences.
     * @example
     * // Create many Absences
     * const absence = await prisma.absence.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AbsenceCreateManyArgs>(args?: SelectSubset<T, AbsenceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Absences and returns the data saved in the database.
     * @param {AbsenceCreateManyAndReturnArgs} args - Arguments to create many Absences.
     * @example
     * // Create many Absences
     * const absence = await prisma.absence.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Absences and only return the `id`
     * const absenceWithIdOnly = await prisma.absence.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AbsenceCreateManyAndReturnArgs>(args?: SelectSubset<T, AbsenceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AbsencePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Absence.
     * @param {AbsenceDeleteArgs} args - Arguments to delete one Absence.
     * @example
     * // Delete one Absence
     * const Absence = await prisma.absence.delete({
     *   where: {
     *     // ... filter to delete one Absence
     *   }
     * })
     * 
     */
    delete<T extends AbsenceDeleteArgs>(args: SelectSubset<T, AbsenceDeleteArgs<ExtArgs>>): Prisma__AbsenceClient<$Result.GetResult<Prisma.$AbsencePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Absence.
     * @param {AbsenceUpdateArgs} args - Arguments to update one Absence.
     * @example
     * // Update one Absence
     * const absence = await prisma.absence.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AbsenceUpdateArgs>(args: SelectSubset<T, AbsenceUpdateArgs<ExtArgs>>): Prisma__AbsenceClient<$Result.GetResult<Prisma.$AbsencePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Absences.
     * @param {AbsenceDeleteManyArgs} args - Arguments to filter Absences to delete.
     * @example
     * // Delete a few Absences
     * const { count } = await prisma.absence.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AbsenceDeleteManyArgs>(args?: SelectSubset<T, AbsenceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Absences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AbsenceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Absences
     * const absence = await prisma.absence.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AbsenceUpdateManyArgs>(args: SelectSubset<T, AbsenceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Absences and returns the data updated in the database.
     * @param {AbsenceUpdateManyAndReturnArgs} args - Arguments to update many Absences.
     * @example
     * // Update many Absences
     * const absence = await prisma.absence.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Absences and only return the `id`
     * const absenceWithIdOnly = await prisma.absence.updateManyAndReturn({
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
    updateManyAndReturn<T extends AbsenceUpdateManyAndReturnArgs>(args: SelectSubset<T, AbsenceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AbsencePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Absence.
     * @param {AbsenceUpsertArgs} args - Arguments to update or create a Absence.
     * @example
     * // Update or create a Absence
     * const absence = await prisma.absence.upsert({
     *   create: {
     *     // ... data to create a Absence
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Absence we want to update
     *   }
     * })
     */
    upsert<T extends AbsenceUpsertArgs>(args: SelectSubset<T, AbsenceUpsertArgs<ExtArgs>>): Prisma__AbsenceClient<$Result.GetResult<Prisma.$AbsencePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Absences.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AbsenceCountArgs} args - Arguments to filter Absences to count.
     * @example
     * // Count the number of Absences
     * const count = await prisma.absence.count({
     *   where: {
     *     // ... the filter for the Absences we want to count
     *   }
     * })
    **/
    count<T extends AbsenceCountArgs>(
      args?: Subset<T, AbsenceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AbsenceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Absence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AbsenceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AbsenceAggregateArgs>(args: Subset<T, AbsenceAggregateArgs>): Prisma.PrismaPromise<GetAbsenceAggregateType<T>>

    /**
     * Group by Absence.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AbsenceGroupByArgs} args - Group by arguments.
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
      T extends AbsenceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AbsenceGroupByArgs['orderBy'] }
        : { orderBy?: AbsenceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AbsenceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAbsenceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Absence model
   */
  readonly fields: AbsenceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Absence.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AbsenceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    teacher<T extends Absence$teacherArgs<ExtArgs> = {}>(args?: Subset<T, Absence$teacherArgs<ExtArgs>>): Prisma__TeacherClient<$Result.GetResult<Prisma.$TeacherPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    class<T extends Absence$classArgs<ExtArgs> = {}>(args?: Subset<T, Absence$classArgs<ExtArgs>>): Prisma__ClassClient<$Result.GetResult<Prisma.$ClassPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Absence model
   */
  interface AbsenceFieldRefs {
    readonly id: FieldRef<"Absence", 'Int'>
    readonly studentId: FieldRef<"Absence", 'Int'>
    readonly teacherId: FieldRef<"Absence", 'Int'>
    readonly classId: FieldRef<"Absence", 'Int'>
    readonly date: FieldRef<"Absence", 'DateTime'>
    readonly status: FieldRef<"Absence", 'AbsenceStatus'>
    readonly reason: FieldRef<"Absence", 'String'>
    readonly justified: FieldRef<"Absence", 'Boolean'>
    readonly parentNotifiedAt: FieldRef<"Absence", 'DateTime'>
    readonly createdAt: FieldRef<"Absence", 'DateTime'>
    readonly updatedAt: FieldRef<"Absence", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Absence findUnique
   */
  export type AbsenceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absence
     */
    select?: AbsenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Absence
     */
    omit?: AbsenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsenceInclude<ExtArgs> | null
    /**
     * Filter, which Absence to fetch.
     */
    where: AbsenceWhereUniqueInput
  }

  /**
   * Absence findUniqueOrThrow
   */
  export type AbsenceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absence
     */
    select?: AbsenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Absence
     */
    omit?: AbsenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsenceInclude<ExtArgs> | null
    /**
     * Filter, which Absence to fetch.
     */
    where: AbsenceWhereUniqueInput
  }

  /**
   * Absence findFirst
   */
  export type AbsenceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absence
     */
    select?: AbsenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Absence
     */
    omit?: AbsenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsenceInclude<ExtArgs> | null
    /**
     * Filter, which Absence to fetch.
     */
    where?: AbsenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Absences to fetch.
     */
    orderBy?: AbsenceOrderByWithRelationInput | AbsenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Absences.
     */
    cursor?: AbsenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Absences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Absences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Absences.
     */
    distinct?: AbsenceScalarFieldEnum | AbsenceScalarFieldEnum[]
  }

  /**
   * Absence findFirstOrThrow
   */
  export type AbsenceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absence
     */
    select?: AbsenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Absence
     */
    omit?: AbsenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsenceInclude<ExtArgs> | null
    /**
     * Filter, which Absence to fetch.
     */
    where?: AbsenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Absences to fetch.
     */
    orderBy?: AbsenceOrderByWithRelationInput | AbsenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Absences.
     */
    cursor?: AbsenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Absences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Absences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Absences.
     */
    distinct?: AbsenceScalarFieldEnum | AbsenceScalarFieldEnum[]
  }

  /**
   * Absence findMany
   */
  export type AbsenceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absence
     */
    select?: AbsenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Absence
     */
    omit?: AbsenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsenceInclude<ExtArgs> | null
    /**
     * Filter, which Absences to fetch.
     */
    where?: AbsenceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Absences to fetch.
     */
    orderBy?: AbsenceOrderByWithRelationInput | AbsenceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Absences.
     */
    cursor?: AbsenceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Absences from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Absences.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Absences.
     */
    distinct?: AbsenceScalarFieldEnum | AbsenceScalarFieldEnum[]
  }

  /**
   * Absence create
   */
  export type AbsenceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absence
     */
    select?: AbsenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Absence
     */
    omit?: AbsenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsenceInclude<ExtArgs> | null
    /**
     * The data needed to create a Absence.
     */
    data: XOR<AbsenceCreateInput, AbsenceUncheckedCreateInput>
  }

  /**
   * Absence createMany
   */
  export type AbsenceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Absences.
     */
    data: AbsenceCreateManyInput | AbsenceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Absence createManyAndReturn
   */
  export type AbsenceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absence
     */
    select?: AbsenceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Absence
     */
    omit?: AbsenceOmit<ExtArgs> | null
    /**
     * The data used to create many Absences.
     */
    data: AbsenceCreateManyInput | AbsenceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsenceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Absence update
   */
  export type AbsenceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absence
     */
    select?: AbsenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Absence
     */
    omit?: AbsenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsenceInclude<ExtArgs> | null
    /**
     * The data needed to update a Absence.
     */
    data: XOR<AbsenceUpdateInput, AbsenceUncheckedUpdateInput>
    /**
     * Choose, which Absence to update.
     */
    where: AbsenceWhereUniqueInput
  }

  /**
   * Absence updateMany
   */
  export type AbsenceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Absences.
     */
    data: XOR<AbsenceUpdateManyMutationInput, AbsenceUncheckedUpdateManyInput>
    /**
     * Filter which Absences to update
     */
    where?: AbsenceWhereInput
    /**
     * Limit how many Absences to update.
     */
    limit?: number
  }

  /**
   * Absence updateManyAndReturn
   */
  export type AbsenceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absence
     */
    select?: AbsenceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Absence
     */
    omit?: AbsenceOmit<ExtArgs> | null
    /**
     * The data used to update Absences.
     */
    data: XOR<AbsenceUpdateManyMutationInput, AbsenceUncheckedUpdateManyInput>
    /**
     * Filter which Absences to update
     */
    where?: AbsenceWhereInput
    /**
     * Limit how many Absences to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsenceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Absence upsert
   */
  export type AbsenceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absence
     */
    select?: AbsenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Absence
     */
    omit?: AbsenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsenceInclude<ExtArgs> | null
    /**
     * The filter to search for the Absence to update in case it exists.
     */
    where: AbsenceWhereUniqueInput
    /**
     * In case the Absence found by the `where` argument doesn't exist, create a new Absence with this data.
     */
    create: XOR<AbsenceCreateInput, AbsenceUncheckedCreateInput>
    /**
     * In case the Absence was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AbsenceUpdateInput, AbsenceUncheckedUpdateInput>
  }

  /**
   * Absence delete
   */
  export type AbsenceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absence
     */
    select?: AbsenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Absence
     */
    omit?: AbsenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsenceInclude<ExtArgs> | null
    /**
     * Filter which Absence to delete.
     */
    where: AbsenceWhereUniqueInput
  }

  /**
   * Absence deleteMany
   */
  export type AbsenceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Absences to delete
     */
    where?: AbsenceWhereInput
    /**
     * Limit how many Absences to delete.
     */
    limit?: number
  }

  /**
   * Absence.teacher
   */
  export type Absence$teacherArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Teacher
     */
    select?: TeacherSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Teacher
     */
    omit?: TeacherOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeacherInclude<ExtArgs> | null
    where?: TeacherWhereInput
  }

  /**
   * Absence.class
   */
  export type Absence$classArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Class
     */
    select?: ClassSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Class
     */
    omit?: ClassOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClassInclude<ExtArgs> | null
    where?: ClassWhereInput
  }

  /**
   * Absence without action
   */
  export type AbsenceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Absence
     */
    select?: AbsenceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Absence
     */
    omit?: AbsenceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AbsenceInclude<ExtArgs> | null
  }


  /**
   * Model Payment
   */

  export type AggregatePayment = {
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  export type PaymentAvgAggregateOutputType = {
    id: number | null
    studentId: number | null
    amount: number | null
  }

  export type PaymentSumAggregateOutputType = {
    id: number | null
    studentId: number | null
    amount: number | null
  }

  export type PaymentMinAggregateOutputType = {
    id: number | null
    studentId: number | null
    amount: number | null
    dueDate: Date | null
    status: $Enums.PaymentStatus | null
    paymentDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentMaxAggregateOutputType = {
    id: number | null
    studentId: number | null
    amount: number | null
    dueDate: Date | null
    status: $Enums.PaymentStatus | null
    paymentDate: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PaymentCountAggregateOutputType = {
    id: number
    studentId: number
    amount: number
    dueDate: number
    status: number
    paymentDate: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PaymentAvgAggregateInputType = {
    id?: true
    studentId?: true
    amount?: true
  }

  export type PaymentSumAggregateInputType = {
    id?: true
    studentId?: true
    amount?: true
  }

  export type PaymentMinAggregateInputType = {
    id?: true
    studentId?: true
    amount?: true
    dueDate?: true
    status?: true
    paymentDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentMaxAggregateInputType = {
    id?: true
    studentId?: true
    amount?: true
    dueDate?: true
    status?: true
    paymentDate?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PaymentCountAggregateInputType = {
    id?: true
    studentId?: true
    amount?: true
    dueDate?: true
    status?: true
    paymentDate?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PaymentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payment to aggregate.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Payments
    **/
    _count?: true | PaymentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PaymentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PaymentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PaymentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PaymentMaxAggregateInputType
  }

  export type GetPaymentAggregateType<T extends PaymentAggregateArgs> = {
        [P in keyof T & keyof AggregatePayment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePayment[P]>
      : GetScalarType<T[P], AggregatePayment[P]>
  }




  export type PaymentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PaymentWhereInput
    orderBy?: PaymentOrderByWithAggregationInput | PaymentOrderByWithAggregationInput[]
    by: PaymentScalarFieldEnum[] | PaymentScalarFieldEnum
    having?: PaymentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PaymentCountAggregateInputType | true
    _avg?: PaymentAvgAggregateInputType
    _sum?: PaymentSumAggregateInputType
    _min?: PaymentMinAggregateInputType
    _max?: PaymentMaxAggregateInputType
  }

  export type PaymentGroupByOutputType = {
    id: number
    studentId: number
    amount: number
    dueDate: Date
    status: $Enums.PaymentStatus
    paymentDate: Date | null
    createdAt: Date
    updatedAt: Date
    _count: PaymentCountAggregateOutputType | null
    _avg: PaymentAvgAggregateOutputType | null
    _sum: PaymentSumAggregateOutputType | null
    _min: PaymentMinAggregateOutputType | null
    _max: PaymentMaxAggregateOutputType | null
  }

  type GetPaymentGroupByPayload<T extends PaymentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PaymentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PaymentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PaymentGroupByOutputType[P]>
            : GetScalarType<T[P], PaymentGroupByOutputType[P]>
        }
      >
    >


  export type PaymentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    amount?: boolean
    dueDate?: boolean
    status?: boolean
    paymentDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    amount?: boolean
    dueDate?: boolean
    status?: boolean
    paymentDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    studentId?: boolean
    amount?: boolean
    dueDate?: boolean
    status?: boolean
    paymentDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["payment"]>

  export type PaymentSelectScalar = {
    id?: boolean
    studentId?: boolean
    amount?: boolean
    dueDate?: boolean
    status?: boolean
    paymentDate?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PaymentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "studentId" | "amount" | "dueDate" | "status" | "paymentDate" | "createdAt" | "updatedAt", ExtArgs["result"]["payment"]>
  export type PaymentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }
  export type PaymentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    student?: boolean | StudentDefaultArgs<ExtArgs>
  }

  export type $PaymentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Payment"
    objects: {
      student: Prisma.$StudentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      studentId: number
      amount: number
      dueDate: Date
      status: $Enums.PaymentStatus
      paymentDate: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["payment"]>
    composites: {}
  }

  type PaymentGetPayload<S extends boolean | null | undefined | PaymentDefaultArgs> = $Result.GetResult<Prisma.$PaymentPayload, S>

  type PaymentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PaymentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PaymentCountAggregateInputType | true
    }

  export interface PaymentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Payment'], meta: { name: 'Payment' } }
    /**
     * Find zero or one Payment that matches the filter.
     * @param {PaymentFindUniqueArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PaymentFindUniqueArgs>(args: SelectSubset<T, PaymentFindUniqueArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Payment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PaymentFindUniqueOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PaymentFindUniqueOrThrowArgs>(args: SelectSubset<T, PaymentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PaymentFindFirstArgs>(args?: SelectSubset<T, PaymentFindFirstArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Payment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindFirstOrThrowArgs} args - Arguments to find a Payment
     * @example
     * // Get one Payment
     * const payment = await prisma.payment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PaymentFindFirstOrThrowArgs>(args?: SelectSubset<T, PaymentFindFirstOrThrowArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Payments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Payments
     * const payments = await prisma.payment.findMany()
     * 
     * // Get first 10 Payments
     * const payments = await prisma.payment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const paymentWithIdOnly = await prisma.payment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PaymentFindManyArgs>(args?: SelectSubset<T, PaymentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Payment.
     * @param {PaymentCreateArgs} args - Arguments to create a Payment.
     * @example
     * // Create one Payment
     * const Payment = await prisma.payment.create({
     *   data: {
     *     // ... data to create a Payment
     *   }
     * })
     * 
     */
    create<T extends PaymentCreateArgs>(args: SelectSubset<T, PaymentCreateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Payments.
     * @param {PaymentCreateManyArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PaymentCreateManyArgs>(args?: SelectSubset<T, PaymentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Payments and returns the data saved in the database.
     * @param {PaymentCreateManyAndReturnArgs} args - Arguments to create many Payments.
     * @example
     * // Create many Payments
     * const payment = await prisma.payment.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PaymentCreateManyAndReturnArgs>(args?: SelectSubset<T, PaymentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Payment.
     * @param {PaymentDeleteArgs} args - Arguments to delete one Payment.
     * @example
     * // Delete one Payment
     * const Payment = await prisma.payment.delete({
     *   where: {
     *     // ... filter to delete one Payment
     *   }
     * })
     * 
     */
    delete<T extends PaymentDeleteArgs>(args: SelectSubset<T, PaymentDeleteArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Payment.
     * @param {PaymentUpdateArgs} args - Arguments to update one Payment.
     * @example
     * // Update one Payment
     * const payment = await prisma.payment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PaymentUpdateArgs>(args: SelectSubset<T, PaymentUpdateArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Payments.
     * @param {PaymentDeleteManyArgs} args - Arguments to filter Payments to delete.
     * @example
     * // Delete a few Payments
     * const { count } = await prisma.payment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PaymentDeleteManyArgs>(args?: SelectSubset<T, PaymentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PaymentUpdateManyArgs>(args: SelectSubset<T, PaymentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Payments and returns the data updated in the database.
     * @param {PaymentUpdateManyAndReturnArgs} args - Arguments to update many Payments.
     * @example
     * // Update many Payments
     * const payment = await prisma.payment.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Payments and only return the `id`
     * const paymentWithIdOnly = await prisma.payment.updateManyAndReturn({
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
    updateManyAndReturn<T extends PaymentUpdateManyAndReturnArgs>(args: SelectSubset<T, PaymentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Payment.
     * @param {PaymentUpsertArgs} args - Arguments to update or create a Payment.
     * @example
     * // Update or create a Payment
     * const payment = await prisma.payment.upsert({
     *   create: {
     *     // ... data to create a Payment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Payment we want to update
     *   }
     * })
     */
    upsert<T extends PaymentUpsertArgs>(args: SelectSubset<T, PaymentUpsertArgs<ExtArgs>>): Prisma__PaymentClient<$Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Payments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentCountArgs} args - Arguments to filter Payments to count.
     * @example
     * // Count the number of Payments
     * const count = await prisma.payment.count({
     *   where: {
     *     // ... the filter for the Payments we want to count
     *   }
     * })
    **/
    count<T extends PaymentCountArgs>(
      args?: Subset<T, PaymentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PaymentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PaymentAggregateArgs>(args: Subset<T, PaymentAggregateArgs>): Prisma.PrismaPromise<GetPaymentAggregateType<T>>

    /**
     * Group by Payment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PaymentGroupByArgs} args - Group by arguments.
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
      T extends PaymentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PaymentGroupByArgs['orderBy'] }
        : { orderBy?: PaymentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PaymentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPaymentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Payment model
   */
  readonly fields: PaymentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Payment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PaymentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    student<T extends StudentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, StudentDefaultArgs<ExtArgs>>): Prisma__StudentClient<$Result.GetResult<Prisma.$StudentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Payment model
   */
  interface PaymentFieldRefs {
    readonly id: FieldRef<"Payment", 'Int'>
    readonly studentId: FieldRef<"Payment", 'Int'>
    readonly amount: FieldRef<"Payment", 'Float'>
    readonly dueDate: FieldRef<"Payment", 'DateTime'>
    readonly status: FieldRef<"Payment", 'PaymentStatus'>
    readonly paymentDate: FieldRef<"Payment", 'DateTime'>
    readonly createdAt: FieldRef<"Payment", 'DateTime'>
    readonly updatedAt: FieldRef<"Payment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Payment findUnique
   */
  export type PaymentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findUniqueOrThrow
   */
  export type PaymentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment findFirst
   */
  export type PaymentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findFirstOrThrow
   */
  export type PaymentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payment to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment findMany
   */
  export type PaymentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter, which Payments to fetch.
     */
    where?: PaymentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Payments to fetch.
     */
    orderBy?: PaymentOrderByWithRelationInput | PaymentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Payments.
     */
    cursor?: PaymentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Payments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Payments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Payments.
     */
    distinct?: PaymentScalarFieldEnum | PaymentScalarFieldEnum[]
  }

  /**
   * Payment create
   */
  export type PaymentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to create a Payment.
     */
    data: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
  }

  /**
   * Payment createMany
   */
  export type PaymentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Payment createManyAndReturn
   */
  export type PaymentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to create many Payments.
     */
    data: PaymentCreateManyInput | PaymentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment update
   */
  export type PaymentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The data needed to update a Payment.
     */
    data: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
    /**
     * Choose, which Payment to update.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment updateMany
   */
  export type PaymentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
  }

  /**
   * Payment updateManyAndReturn
   */
  export type PaymentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * The data used to update Payments.
     */
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyInput>
    /**
     * Filter which Payments to update
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Payment upsert
   */
  export type PaymentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * The filter to search for the Payment to update in case it exists.
     */
    where: PaymentWhereUniqueInput
    /**
     * In case the Payment found by the `where` argument doesn't exist, create a new Payment with this data.
     */
    create: XOR<PaymentCreateInput, PaymentUncheckedCreateInput>
    /**
     * In case the Payment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PaymentUpdateInput, PaymentUncheckedUpdateInput>
  }

  /**
   * Payment delete
   */
  export type PaymentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
    /**
     * Filter which Payment to delete.
     */
    where: PaymentWhereUniqueInput
  }

  /**
   * Payment deleteMany
   */
  export type PaymentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Payments to delete
     */
    where?: PaymentWhereInput
    /**
     * Limit how many Payments to delete.
     */
    limit?: number
  }

  /**
   * Payment without action
   */
  export type PaymentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: PaymentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Payment
     */
    omit?: PaymentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PaymentInclude<ExtArgs> | null
  }


  /**
   * Model SchoolLevel
   */

  export type AggregateSchoolLevel = {
    _count: SchoolLevelCountAggregateOutputType | null
    _avg: SchoolLevelAvgAggregateOutputType | null
    _sum: SchoolLevelSumAggregateOutputType | null
    _min: SchoolLevelMinAggregateOutputType | null
    _max: SchoolLevelMaxAggregateOutputType | null
  }

  export type SchoolLevelAvgAggregateOutputType = {
    id: number | null
  }

  export type SchoolLevelSumAggregateOutputType = {
    id: number | null
  }

  export type SchoolLevelMinAggregateOutputType = {
    id: number | null
    value: string | null
    label: string | null
  }

  export type SchoolLevelMaxAggregateOutputType = {
    id: number | null
    value: string | null
    label: string | null
  }

  export type SchoolLevelCountAggregateOutputType = {
    id: number
    value: number
    label: number
    _all: number
  }


  export type SchoolLevelAvgAggregateInputType = {
    id?: true
  }

  export type SchoolLevelSumAggregateInputType = {
    id?: true
  }

  export type SchoolLevelMinAggregateInputType = {
    id?: true
    value?: true
    label?: true
  }

  export type SchoolLevelMaxAggregateInputType = {
    id?: true
    value?: true
    label?: true
  }

  export type SchoolLevelCountAggregateInputType = {
    id?: true
    value?: true
    label?: true
    _all?: true
  }

  export type SchoolLevelAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SchoolLevel to aggregate.
     */
    where?: SchoolLevelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SchoolLevels to fetch.
     */
    orderBy?: SchoolLevelOrderByWithRelationInput | SchoolLevelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SchoolLevelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SchoolLevels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SchoolLevels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SchoolLevels
    **/
    _count?: true | SchoolLevelCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SchoolLevelAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SchoolLevelSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SchoolLevelMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SchoolLevelMaxAggregateInputType
  }

  export type GetSchoolLevelAggregateType<T extends SchoolLevelAggregateArgs> = {
        [P in keyof T & keyof AggregateSchoolLevel]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSchoolLevel[P]>
      : GetScalarType<T[P], AggregateSchoolLevel[P]>
  }




  export type SchoolLevelGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SchoolLevelWhereInput
    orderBy?: SchoolLevelOrderByWithAggregationInput | SchoolLevelOrderByWithAggregationInput[]
    by: SchoolLevelScalarFieldEnum[] | SchoolLevelScalarFieldEnum
    having?: SchoolLevelScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SchoolLevelCountAggregateInputType | true
    _avg?: SchoolLevelAvgAggregateInputType
    _sum?: SchoolLevelSumAggregateInputType
    _min?: SchoolLevelMinAggregateInputType
    _max?: SchoolLevelMaxAggregateInputType
  }

  export type SchoolLevelGroupByOutputType = {
    id: number
    value: string
    label: string
    _count: SchoolLevelCountAggregateOutputType | null
    _avg: SchoolLevelAvgAggregateOutputType | null
    _sum: SchoolLevelSumAggregateOutputType | null
    _min: SchoolLevelMinAggregateOutputType | null
    _max: SchoolLevelMaxAggregateOutputType | null
  }

  type GetSchoolLevelGroupByPayload<T extends SchoolLevelGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SchoolLevelGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SchoolLevelGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SchoolLevelGroupByOutputType[P]>
            : GetScalarType<T[P], SchoolLevelGroupByOutputType[P]>
        }
      >
    >


  export type SchoolLevelSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    value?: boolean
    label?: boolean
  }, ExtArgs["result"]["schoolLevel"]>

  export type SchoolLevelSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    value?: boolean
    label?: boolean
  }, ExtArgs["result"]["schoolLevel"]>

  export type SchoolLevelSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    value?: boolean
    label?: boolean
  }, ExtArgs["result"]["schoolLevel"]>

  export type SchoolLevelSelectScalar = {
    id?: boolean
    value?: boolean
    label?: boolean
  }

  export type SchoolLevelOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "value" | "label", ExtArgs["result"]["schoolLevel"]>

  export type $SchoolLevelPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SchoolLevel"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      value: string
      label: string
    }, ExtArgs["result"]["schoolLevel"]>
    composites: {}
  }

  type SchoolLevelGetPayload<S extends boolean | null | undefined | SchoolLevelDefaultArgs> = $Result.GetResult<Prisma.$SchoolLevelPayload, S>

  type SchoolLevelCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SchoolLevelFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SchoolLevelCountAggregateInputType | true
    }

  export interface SchoolLevelDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SchoolLevel'], meta: { name: 'SchoolLevel' } }
    /**
     * Find zero or one SchoolLevel that matches the filter.
     * @param {SchoolLevelFindUniqueArgs} args - Arguments to find a SchoolLevel
     * @example
     * // Get one SchoolLevel
     * const schoolLevel = await prisma.schoolLevel.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SchoolLevelFindUniqueArgs>(args: SelectSubset<T, SchoolLevelFindUniqueArgs<ExtArgs>>): Prisma__SchoolLevelClient<$Result.GetResult<Prisma.$SchoolLevelPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SchoolLevel that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SchoolLevelFindUniqueOrThrowArgs} args - Arguments to find a SchoolLevel
     * @example
     * // Get one SchoolLevel
     * const schoolLevel = await prisma.schoolLevel.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SchoolLevelFindUniqueOrThrowArgs>(args: SelectSubset<T, SchoolLevelFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SchoolLevelClient<$Result.GetResult<Prisma.$SchoolLevelPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SchoolLevel that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolLevelFindFirstArgs} args - Arguments to find a SchoolLevel
     * @example
     * // Get one SchoolLevel
     * const schoolLevel = await prisma.schoolLevel.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SchoolLevelFindFirstArgs>(args?: SelectSubset<T, SchoolLevelFindFirstArgs<ExtArgs>>): Prisma__SchoolLevelClient<$Result.GetResult<Prisma.$SchoolLevelPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SchoolLevel that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolLevelFindFirstOrThrowArgs} args - Arguments to find a SchoolLevel
     * @example
     * // Get one SchoolLevel
     * const schoolLevel = await prisma.schoolLevel.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SchoolLevelFindFirstOrThrowArgs>(args?: SelectSubset<T, SchoolLevelFindFirstOrThrowArgs<ExtArgs>>): Prisma__SchoolLevelClient<$Result.GetResult<Prisma.$SchoolLevelPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SchoolLevels that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolLevelFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SchoolLevels
     * const schoolLevels = await prisma.schoolLevel.findMany()
     * 
     * // Get first 10 SchoolLevels
     * const schoolLevels = await prisma.schoolLevel.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const schoolLevelWithIdOnly = await prisma.schoolLevel.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SchoolLevelFindManyArgs>(args?: SelectSubset<T, SchoolLevelFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolLevelPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SchoolLevel.
     * @param {SchoolLevelCreateArgs} args - Arguments to create a SchoolLevel.
     * @example
     * // Create one SchoolLevel
     * const SchoolLevel = await prisma.schoolLevel.create({
     *   data: {
     *     // ... data to create a SchoolLevel
     *   }
     * })
     * 
     */
    create<T extends SchoolLevelCreateArgs>(args: SelectSubset<T, SchoolLevelCreateArgs<ExtArgs>>): Prisma__SchoolLevelClient<$Result.GetResult<Prisma.$SchoolLevelPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SchoolLevels.
     * @param {SchoolLevelCreateManyArgs} args - Arguments to create many SchoolLevels.
     * @example
     * // Create many SchoolLevels
     * const schoolLevel = await prisma.schoolLevel.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SchoolLevelCreateManyArgs>(args?: SelectSubset<T, SchoolLevelCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SchoolLevels and returns the data saved in the database.
     * @param {SchoolLevelCreateManyAndReturnArgs} args - Arguments to create many SchoolLevels.
     * @example
     * // Create many SchoolLevels
     * const schoolLevel = await prisma.schoolLevel.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SchoolLevels and only return the `id`
     * const schoolLevelWithIdOnly = await prisma.schoolLevel.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SchoolLevelCreateManyAndReturnArgs>(args?: SelectSubset<T, SchoolLevelCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolLevelPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SchoolLevel.
     * @param {SchoolLevelDeleteArgs} args - Arguments to delete one SchoolLevel.
     * @example
     * // Delete one SchoolLevel
     * const SchoolLevel = await prisma.schoolLevel.delete({
     *   where: {
     *     // ... filter to delete one SchoolLevel
     *   }
     * })
     * 
     */
    delete<T extends SchoolLevelDeleteArgs>(args: SelectSubset<T, SchoolLevelDeleteArgs<ExtArgs>>): Prisma__SchoolLevelClient<$Result.GetResult<Prisma.$SchoolLevelPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SchoolLevel.
     * @param {SchoolLevelUpdateArgs} args - Arguments to update one SchoolLevel.
     * @example
     * // Update one SchoolLevel
     * const schoolLevel = await prisma.schoolLevel.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SchoolLevelUpdateArgs>(args: SelectSubset<T, SchoolLevelUpdateArgs<ExtArgs>>): Prisma__SchoolLevelClient<$Result.GetResult<Prisma.$SchoolLevelPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SchoolLevels.
     * @param {SchoolLevelDeleteManyArgs} args - Arguments to filter SchoolLevels to delete.
     * @example
     * // Delete a few SchoolLevels
     * const { count } = await prisma.schoolLevel.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SchoolLevelDeleteManyArgs>(args?: SelectSubset<T, SchoolLevelDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SchoolLevels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolLevelUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SchoolLevels
     * const schoolLevel = await prisma.schoolLevel.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SchoolLevelUpdateManyArgs>(args: SelectSubset<T, SchoolLevelUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SchoolLevels and returns the data updated in the database.
     * @param {SchoolLevelUpdateManyAndReturnArgs} args - Arguments to update many SchoolLevels.
     * @example
     * // Update many SchoolLevels
     * const schoolLevel = await prisma.schoolLevel.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SchoolLevels and only return the `id`
     * const schoolLevelWithIdOnly = await prisma.schoolLevel.updateManyAndReturn({
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
    updateManyAndReturn<T extends SchoolLevelUpdateManyAndReturnArgs>(args: SelectSubset<T, SchoolLevelUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolLevelPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SchoolLevel.
     * @param {SchoolLevelUpsertArgs} args - Arguments to update or create a SchoolLevel.
     * @example
     * // Update or create a SchoolLevel
     * const schoolLevel = await prisma.schoolLevel.upsert({
     *   create: {
     *     // ... data to create a SchoolLevel
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SchoolLevel we want to update
     *   }
     * })
     */
    upsert<T extends SchoolLevelUpsertArgs>(args: SelectSubset<T, SchoolLevelUpsertArgs<ExtArgs>>): Prisma__SchoolLevelClient<$Result.GetResult<Prisma.$SchoolLevelPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SchoolLevels.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolLevelCountArgs} args - Arguments to filter SchoolLevels to count.
     * @example
     * // Count the number of SchoolLevels
     * const count = await prisma.schoolLevel.count({
     *   where: {
     *     // ... the filter for the SchoolLevels we want to count
     *   }
     * })
    **/
    count<T extends SchoolLevelCountArgs>(
      args?: Subset<T, SchoolLevelCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SchoolLevelCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SchoolLevel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolLevelAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SchoolLevelAggregateArgs>(args: Subset<T, SchoolLevelAggregateArgs>): Prisma.PrismaPromise<GetSchoolLevelAggregateType<T>>

    /**
     * Group by SchoolLevel.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolLevelGroupByArgs} args - Group by arguments.
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
      T extends SchoolLevelGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SchoolLevelGroupByArgs['orderBy'] }
        : { orderBy?: SchoolLevelGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SchoolLevelGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSchoolLevelGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SchoolLevel model
   */
  readonly fields: SchoolLevelFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SchoolLevel.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SchoolLevelClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
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
   * Fields of the SchoolLevel model
   */
  interface SchoolLevelFieldRefs {
    readonly id: FieldRef<"SchoolLevel", 'Int'>
    readonly value: FieldRef<"SchoolLevel", 'String'>
    readonly label: FieldRef<"SchoolLevel", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SchoolLevel findUnique
   */
  export type SchoolLevelFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolLevel
     */
    select?: SchoolLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SchoolLevel
     */
    omit?: SchoolLevelOmit<ExtArgs> | null
    /**
     * Filter, which SchoolLevel to fetch.
     */
    where: SchoolLevelWhereUniqueInput
  }

  /**
   * SchoolLevel findUniqueOrThrow
   */
  export type SchoolLevelFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolLevel
     */
    select?: SchoolLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SchoolLevel
     */
    omit?: SchoolLevelOmit<ExtArgs> | null
    /**
     * Filter, which SchoolLevel to fetch.
     */
    where: SchoolLevelWhereUniqueInput
  }

  /**
   * SchoolLevel findFirst
   */
  export type SchoolLevelFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolLevel
     */
    select?: SchoolLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SchoolLevel
     */
    omit?: SchoolLevelOmit<ExtArgs> | null
    /**
     * Filter, which SchoolLevel to fetch.
     */
    where?: SchoolLevelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SchoolLevels to fetch.
     */
    orderBy?: SchoolLevelOrderByWithRelationInput | SchoolLevelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SchoolLevels.
     */
    cursor?: SchoolLevelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SchoolLevels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SchoolLevels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SchoolLevels.
     */
    distinct?: SchoolLevelScalarFieldEnum | SchoolLevelScalarFieldEnum[]
  }

  /**
   * SchoolLevel findFirstOrThrow
   */
  export type SchoolLevelFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolLevel
     */
    select?: SchoolLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SchoolLevel
     */
    omit?: SchoolLevelOmit<ExtArgs> | null
    /**
     * Filter, which SchoolLevel to fetch.
     */
    where?: SchoolLevelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SchoolLevels to fetch.
     */
    orderBy?: SchoolLevelOrderByWithRelationInput | SchoolLevelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SchoolLevels.
     */
    cursor?: SchoolLevelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SchoolLevels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SchoolLevels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SchoolLevels.
     */
    distinct?: SchoolLevelScalarFieldEnum | SchoolLevelScalarFieldEnum[]
  }

  /**
   * SchoolLevel findMany
   */
  export type SchoolLevelFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolLevel
     */
    select?: SchoolLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SchoolLevel
     */
    omit?: SchoolLevelOmit<ExtArgs> | null
    /**
     * Filter, which SchoolLevels to fetch.
     */
    where?: SchoolLevelWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SchoolLevels to fetch.
     */
    orderBy?: SchoolLevelOrderByWithRelationInput | SchoolLevelOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SchoolLevels.
     */
    cursor?: SchoolLevelWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SchoolLevels from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SchoolLevels.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SchoolLevels.
     */
    distinct?: SchoolLevelScalarFieldEnum | SchoolLevelScalarFieldEnum[]
  }

  /**
   * SchoolLevel create
   */
  export type SchoolLevelCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolLevel
     */
    select?: SchoolLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SchoolLevel
     */
    omit?: SchoolLevelOmit<ExtArgs> | null
    /**
     * The data needed to create a SchoolLevel.
     */
    data: XOR<SchoolLevelCreateInput, SchoolLevelUncheckedCreateInput>
  }

  /**
   * SchoolLevel createMany
   */
  export type SchoolLevelCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SchoolLevels.
     */
    data: SchoolLevelCreateManyInput | SchoolLevelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SchoolLevel createManyAndReturn
   */
  export type SchoolLevelCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolLevel
     */
    select?: SchoolLevelSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SchoolLevel
     */
    omit?: SchoolLevelOmit<ExtArgs> | null
    /**
     * The data used to create many SchoolLevels.
     */
    data: SchoolLevelCreateManyInput | SchoolLevelCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SchoolLevel update
   */
  export type SchoolLevelUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolLevel
     */
    select?: SchoolLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SchoolLevel
     */
    omit?: SchoolLevelOmit<ExtArgs> | null
    /**
     * The data needed to update a SchoolLevel.
     */
    data: XOR<SchoolLevelUpdateInput, SchoolLevelUncheckedUpdateInput>
    /**
     * Choose, which SchoolLevel to update.
     */
    where: SchoolLevelWhereUniqueInput
  }

  /**
   * SchoolLevel updateMany
   */
  export type SchoolLevelUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SchoolLevels.
     */
    data: XOR<SchoolLevelUpdateManyMutationInput, SchoolLevelUncheckedUpdateManyInput>
    /**
     * Filter which SchoolLevels to update
     */
    where?: SchoolLevelWhereInput
    /**
     * Limit how many SchoolLevels to update.
     */
    limit?: number
  }

  /**
   * SchoolLevel updateManyAndReturn
   */
  export type SchoolLevelUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolLevel
     */
    select?: SchoolLevelSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SchoolLevel
     */
    omit?: SchoolLevelOmit<ExtArgs> | null
    /**
     * The data used to update SchoolLevels.
     */
    data: XOR<SchoolLevelUpdateManyMutationInput, SchoolLevelUncheckedUpdateManyInput>
    /**
     * Filter which SchoolLevels to update
     */
    where?: SchoolLevelWhereInput
    /**
     * Limit how many SchoolLevels to update.
     */
    limit?: number
  }

  /**
   * SchoolLevel upsert
   */
  export type SchoolLevelUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolLevel
     */
    select?: SchoolLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SchoolLevel
     */
    omit?: SchoolLevelOmit<ExtArgs> | null
    /**
     * The filter to search for the SchoolLevel to update in case it exists.
     */
    where: SchoolLevelWhereUniqueInput
    /**
     * In case the SchoolLevel found by the `where` argument doesn't exist, create a new SchoolLevel with this data.
     */
    create: XOR<SchoolLevelCreateInput, SchoolLevelUncheckedCreateInput>
    /**
     * In case the SchoolLevel was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SchoolLevelUpdateInput, SchoolLevelUncheckedUpdateInput>
  }

  /**
   * SchoolLevel delete
   */
  export type SchoolLevelDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolLevel
     */
    select?: SchoolLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SchoolLevel
     */
    omit?: SchoolLevelOmit<ExtArgs> | null
    /**
     * Filter which SchoolLevel to delete.
     */
    where: SchoolLevelWhereUniqueInput
  }

  /**
   * SchoolLevel deleteMany
   */
  export type SchoolLevelDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SchoolLevels to delete
     */
    where?: SchoolLevelWhereInput
    /**
     * Limit how many SchoolLevels to delete.
     */
    limit?: number
  }

  /**
   * SchoolLevel without action
   */
  export type SchoolLevelDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolLevel
     */
    select?: SchoolLevelSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SchoolLevel
     */
    omit?: SchoolLevelOmit<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    name: 'name',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    active: 'active',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RefreshTokenScalarFieldEnum: {
    id: 'id',
    token: 'token',
    userId: 'userId',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    revoked: 'revoked'
  };

  export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum]


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
    updatedAt: 'updatedAt',
    parentEmailSentAt: 'parentEmailSentAt',
    studentEmailSentAt: 'studentEmailSentAt'
  };

  export type PreRegistrationScalarFieldEnum = (typeof PreRegistrationScalarFieldEnum)[keyof typeof PreRegistrationScalarFieldEnum]


  export const StudentScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    classId: 'classId',
    status: 'status',
    schoolYear: 'schoolYear',
    birthDate: 'birthDate',
    address: 'address',
    parentId: 'parentId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type StudentScalarFieldEnum = (typeof StudentScalarFieldEnum)[keyof typeof StudentScalarFieldEnum]


  export const ParentScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    phone: 'phone',
    address: 'address',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ParentScalarFieldEnum = (typeof ParentScalarFieldEnum)[keyof typeof ParentScalarFieldEnum]


  export const ClassScalarFieldEnum: {
    id: 'id',
    name: 'name',
    level: 'level',
    schoolYear: 'schoolYear',
    maxCapacity: 'maxCapacity',
    headTeacherId: 'headTeacherId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ClassScalarFieldEnum = (typeof ClassScalarFieldEnum)[keyof typeof ClassScalarFieldEnum]


  export const SubjectScalarFieldEnum: {
    id: 'id',
    name: 'name',
    code: 'code',
    coefficient: 'coefficient',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SubjectScalarFieldEnum = (typeof SubjectScalarFieldEnum)[keyof typeof SubjectScalarFieldEnum]


  export const TeacherScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    speciality: 'speciality',
    phone: 'phone',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type TeacherScalarFieldEnum = (typeof TeacherScalarFieldEnum)[keyof typeof TeacherScalarFieldEnum]


  export const TeacherSubjectClassScalarFieldEnum: {
    teacherId: 'teacherId',
    subjectId: 'subjectId',
    classId: 'classId',
    schoolYear: 'schoolYear'
  };

  export type TeacherSubjectClassScalarFieldEnum = (typeof TeacherSubjectClassScalarFieldEnum)[keyof typeof TeacherSubjectClassScalarFieldEnum]


  export const MarkScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    subjectId: 'subjectId',
    teacherId: 'teacherId',
    classId: 'classId',
    subject: 'subject',
    value: 'value',
    coefficient: 'coefficient',
    semester: 'semester',
    comment: 'comment',
    term: 'term',
    date: 'date',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MarkScalarFieldEnum = (typeof MarkScalarFieldEnum)[keyof typeof MarkScalarFieldEnum]


  export const AbsenceScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    teacherId: 'teacherId',
    classId: 'classId',
    date: 'date',
    status: 'status',
    reason: 'reason',
    justified: 'justified',
    parentNotifiedAt: 'parentNotifiedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AbsenceScalarFieldEnum = (typeof AbsenceScalarFieldEnum)[keyof typeof AbsenceScalarFieldEnum]


  export const PaymentScalarFieldEnum: {
    id: 'id',
    studentId: 'studentId',
    amount: 'amount',
    dueDate: 'dueDate',
    status: 'status',
    paymentDate: 'paymentDate',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum]


  export const SchoolLevelScalarFieldEnum: {
    id: 'id',
    value: 'value',
    label: 'label'
  };

  export type SchoolLevelScalarFieldEnum = (typeof SchoolLevelScalarFieldEnum)[keyof typeof SchoolLevelScalarFieldEnum]


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
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


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
   * Reference to a field of type 'StudentStatus'
   */
  export type EnumStudentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StudentStatus'>
    


  /**
   * Reference to a field of type 'StudentStatus[]'
   */
  export type ListEnumStudentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StudentStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'AbsenceStatus'
   */
  export type EnumAbsenceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AbsenceStatus'>
    


  /**
   * Reference to a field of type 'AbsenceStatus[]'
   */
  export type ListEnumAbsenceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AbsenceStatus[]'>
    


  /**
   * Reference to a field of type 'PaymentStatus'
   */
  export type EnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus'>
    


  /**
   * Reference to a field of type 'PaymentStatus[]'
   */
  export type ListEnumPaymentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PaymentStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    firstName?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    active?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    parent?: XOR<ParentNullableScalarRelationFilter, ParentWhereInput> | null
    processedRegistrations?: PreRegistrationListRelationFilter
    refreshTokens?: RefreshTokenListRelationFilter
    student?: XOR<StudentNullableScalarRelationFilter, StudentWhereInput> | null
    teacher?: XOR<TeacherNullableScalarRelationFilter, TeacherWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    parent?: ParentOrderByWithRelationInput
    processedRegistrations?: PreRegistrationOrderByRelationAggregateInput
    refreshTokens?: RefreshTokenOrderByRelationAggregateInput
    student?: StudentOrderByWithRelationInput
    teacher?: TeacherOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstName?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    active?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    parent?: XOR<ParentNullableScalarRelationFilter, ParentWhereInput> | null
    processedRegistrations?: PreRegistrationListRelationFilter
    refreshTokens?: RefreshTokenListRelationFilter
    student?: XOR<StudentNullableScalarRelationFilter, StudentWhereInput> | null
    teacher?: XOR<TeacherNullableScalarRelationFilter, TeacherWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    firstName?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    active?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type RefreshTokenWhereInput = {
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    id?: IntFilter<"RefreshToken"> | number
    token?: StringFilter<"RefreshToken"> | string
    userId?: IntFilter<"RefreshToken"> | number
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    revoked?: BoolFilter<"RefreshToken"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RefreshTokenOrderByWithRelationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    revoked?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type RefreshTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    token?: string
    AND?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    OR?: RefreshTokenWhereInput[]
    NOT?: RefreshTokenWhereInput | RefreshTokenWhereInput[]
    userId?: IntFilter<"RefreshToken"> | number
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    revoked?: BoolFilter<"RefreshToken"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "token">

  export type RefreshTokenOrderByWithAggregationInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    revoked?: SortOrder
    _count?: RefreshTokenCountOrderByAggregateInput
    _avg?: RefreshTokenAvgOrderByAggregateInput
    _max?: RefreshTokenMaxOrderByAggregateInput
    _min?: RefreshTokenMinOrderByAggregateInput
    _sum?: RefreshTokenSumOrderByAggregateInput
  }

  export type RefreshTokenScalarWhereWithAggregatesInput = {
    AND?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    OR?: RefreshTokenScalarWhereWithAggregatesInput[]
    NOT?: RefreshTokenScalarWhereWithAggregatesInput | RefreshTokenScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"RefreshToken"> | number
    token?: StringWithAggregatesFilter<"RefreshToken"> | string
    userId?: IntWithAggregatesFilter<"RefreshToken"> | number
    expiresAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"RefreshToken"> | Date | string
    revoked?: BoolWithAggregatesFilter<"RefreshToken"> | boolean
  }

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
    parentEmailSentAt?: DateTimeNullableFilter<"PreRegistration"> | Date | string | null
    studentEmailSentAt?: DateTimeNullableFilter<"PreRegistration"> | Date | string | null
    processedByUser?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    student?: XOR<StudentNullableScalarRelationFilter, StudentWhereInput> | null
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
    parentEmailSentAt?: SortOrderInput | SortOrder
    studentEmailSentAt?: SortOrderInput | SortOrder
    processedByUser?: UserOrderByWithRelationInput
    student?: StudentOrderByWithRelationInput
  }

  export type PreRegistrationWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    fileNumber?: string
    receiptNumber?: string
    studentId?: number
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
    submittedAt?: DateTimeFilter<"PreRegistration"> | Date | string
    updatedAt?: DateTimeFilter<"PreRegistration"> | Date | string
    parentEmailSentAt?: DateTimeNullableFilter<"PreRegistration"> | Date | string | null
    studentEmailSentAt?: DateTimeNullableFilter<"PreRegistration"> | Date | string | null
    processedByUser?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    student?: XOR<StudentNullableScalarRelationFilter, StudentWhereInput> | null
  }, "id" | "fileNumber" | "receiptNumber" | "studentId">

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
    parentEmailSentAt?: SortOrderInput | SortOrder
    studentEmailSentAt?: SortOrderInput | SortOrder
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
    parentEmailSentAt?: DateTimeNullableWithAggregatesFilter<"PreRegistration"> | Date | string | null
    studentEmailSentAt?: DateTimeNullableWithAggregatesFilter<"PreRegistration"> | Date | string | null
  }

  export type StudentWhereInput = {
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    id?: IntFilter<"Student"> | number
    userId?: IntFilter<"Student"> | number
    classId?: IntNullableFilter<"Student"> | number | null
    status?: EnumStudentStatusFilter<"Student"> | $Enums.StudentStatus
    schoolYear?: StringFilter<"Student"> | string
    birthDate?: DateTimeFilter<"Student"> | Date | string
    address?: StringNullableFilter<"Student"> | string | null
    parentId?: IntNullableFilter<"Student"> | number | null
    createdAt?: DateTimeFilter<"Student"> | Date | string
    updatedAt?: DateTimeFilter<"Student"> | Date | string
    absences?: AbsenceListRelationFilter
    marks?: MarkListRelationFilter
    payments?: PaymentListRelationFilter
    preRegistration?: XOR<PreRegistrationNullableScalarRelationFilter, PreRegistrationWhereInput> | null
    class?: XOR<ClassNullableScalarRelationFilter, ClassWhereInput> | null
    parent?: XOR<ParentNullableScalarRelationFilter, ParentWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type StudentOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    classId?: SortOrderInput | SortOrder
    status?: SortOrder
    schoolYear?: SortOrder
    birthDate?: SortOrder
    address?: SortOrderInput | SortOrder
    parentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    absences?: AbsenceOrderByRelationAggregateInput
    marks?: MarkOrderByRelationAggregateInput
    payments?: PaymentOrderByRelationAggregateInput
    preRegistration?: PreRegistrationOrderByWithRelationInput
    class?: ClassOrderByWithRelationInput
    parent?: ParentOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type StudentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: number
    AND?: StudentWhereInput | StudentWhereInput[]
    OR?: StudentWhereInput[]
    NOT?: StudentWhereInput | StudentWhereInput[]
    classId?: IntNullableFilter<"Student"> | number | null
    status?: EnumStudentStatusFilter<"Student"> | $Enums.StudentStatus
    schoolYear?: StringFilter<"Student"> | string
    birthDate?: DateTimeFilter<"Student"> | Date | string
    address?: StringNullableFilter<"Student"> | string | null
    parentId?: IntNullableFilter<"Student"> | number | null
    createdAt?: DateTimeFilter<"Student"> | Date | string
    updatedAt?: DateTimeFilter<"Student"> | Date | string
    absences?: AbsenceListRelationFilter
    marks?: MarkListRelationFilter
    payments?: PaymentListRelationFilter
    preRegistration?: XOR<PreRegistrationNullableScalarRelationFilter, PreRegistrationWhereInput> | null
    class?: XOR<ClassNullableScalarRelationFilter, ClassWhereInput> | null
    parent?: XOR<ParentNullableScalarRelationFilter, ParentWhereInput> | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "userId">

  export type StudentOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    classId?: SortOrderInput | SortOrder
    status?: SortOrder
    schoolYear?: SortOrder
    birthDate?: SortOrder
    address?: SortOrderInput | SortOrder
    parentId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: StudentCountOrderByAggregateInput
    _avg?: StudentAvgOrderByAggregateInput
    _max?: StudentMaxOrderByAggregateInput
    _min?: StudentMinOrderByAggregateInput
    _sum?: StudentSumOrderByAggregateInput
  }

  export type StudentScalarWhereWithAggregatesInput = {
    AND?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    OR?: StudentScalarWhereWithAggregatesInput[]
    NOT?: StudentScalarWhereWithAggregatesInput | StudentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Student"> | number
    userId?: IntWithAggregatesFilter<"Student"> | number
    classId?: IntNullableWithAggregatesFilter<"Student"> | number | null
    status?: EnumStudentStatusWithAggregatesFilter<"Student"> | $Enums.StudentStatus
    schoolYear?: StringWithAggregatesFilter<"Student"> | string
    birthDate?: DateTimeWithAggregatesFilter<"Student"> | Date | string
    address?: StringNullableWithAggregatesFilter<"Student"> | string | null
    parentId?: IntNullableWithAggregatesFilter<"Student"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Student"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Student"> | Date | string
  }

  export type ParentWhereInput = {
    AND?: ParentWhereInput | ParentWhereInput[]
    OR?: ParentWhereInput[]
    NOT?: ParentWhereInput | ParentWhereInput[]
    id?: IntFilter<"Parent"> | number
    userId?: IntFilter<"Parent"> | number
    phone?: StringFilter<"Parent"> | string
    address?: StringNullableFilter<"Parent"> | string | null
    createdAt?: DateTimeFilter<"Parent"> | Date | string
    updatedAt?: DateTimeFilter<"Parent"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    students?: StudentListRelationFilter
  }

  export type ParentOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    phone?: SortOrder
    address?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    students?: StudentOrderByRelationAggregateInput
  }

  export type ParentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: number
    AND?: ParentWhereInput | ParentWhereInput[]
    OR?: ParentWhereInput[]
    NOT?: ParentWhereInput | ParentWhereInput[]
    phone?: StringFilter<"Parent"> | string
    address?: StringNullableFilter<"Parent"> | string | null
    createdAt?: DateTimeFilter<"Parent"> | Date | string
    updatedAt?: DateTimeFilter<"Parent"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    students?: StudentListRelationFilter
  }, "id" | "userId">

  export type ParentOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    phone?: SortOrder
    address?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ParentCountOrderByAggregateInput
    _avg?: ParentAvgOrderByAggregateInput
    _max?: ParentMaxOrderByAggregateInput
    _min?: ParentMinOrderByAggregateInput
    _sum?: ParentSumOrderByAggregateInput
  }

  export type ParentScalarWhereWithAggregatesInput = {
    AND?: ParentScalarWhereWithAggregatesInput | ParentScalarWhereWithAggregatesInput[]
    OR?: ParentScalarWhereWithAggregatesInput[]
    NOT?: ParentScalarWhereWithAggregatesInput | ParentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Parent"> | number
    userId?: IntWithAggregatesFilter<"Parent"> | number
    phone?: StringWithAggregatesFilter<"Parent"> | string
    address?: StringNullableWithAggregatesFilter<"Parent"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Parent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Parent"> | Date | string
  }

  export type ClassWhereInput = {
    AND?: ClassWhereInput | ClassWhereInput[]
    OR?: ClassWhereInput[]
    NOT?: ClassWhereInput | ClassWhereInput[]
    id?: IntFilter<"Class"> | number
    name?: StringFilter<"Class"> | string
    level?: StringFilter<"Class"> | string
    schoolYear?: StringFilter<"Class"> | string
    maxCapacity?: IntFilter<"Class"> | number
    headTeacherId?: IntNullableFilter<"Class"> | number | null
    createdAt?: DateTimeFilter<"Class"> | Date | string
    updatedAt?: DateTimeFilter<"Class"> | Date | string
    students?: StudentListRelationFilter
    headTeacher?: XOR<TeacherNullableScalarRelationFilter, TeacherWhereInput> | null
    assignments?: TeacherSubjectClassListRelationFilter
    marks?: MarkListRelationFilter
    absences?: AbsenceListRelationFilter
  }

  export type ClassOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    level?: SortOrder
    schoolYear?: SortOrder
    maxCapacity?: SortOrder
    headTeacherId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    students?: StudentOrderByRelationAggregateInput
    headTeacher?: TeacherOrderByWithRelationInput
    assignments?: TeacherSubjectClassOrderByRelationAggregateInput
    marks?: MarkOrderByRelationAggregateInput
    absences?: AbsenceOrderByRelationAggregateInput
  }

  export type ClassWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ClassWhereInput | ClassWhereInput[]
    OR?: ClassWhereInput[]
    NOT?: ClassWhereInput | ClassWhereInput[]
    name?: StringFilter<"Class"> | string
    level?: StringFilter<"Class"> | string
    schoolYear?: StringFilter<"Class"> | string
    maxCapacity?: IntFilter<"Class"> | number
    headTeacherId?: IntNullableFilter<"Class"> | number | null
    createdAt?: DateTimeFilter<"Class"> | Date | string
    updatedAt?: DateTimeFilter<"Class"> | Date | string
    students?: StudentListRelationFilter
    headTeacher?: XOR<TeacherNullableScalarRelationFilter, TeacherWhereInput> | null
    assignments?: TeacherSubjectClassListRelationFilter
    marks?: MarkListRelationFilter
    absences?: AbsenceListRelationFilter
  }, "id">

  export type ClassOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    level?: SortOrder
    schoolYear?: SortOrder
    maxCapacity?: SortOrder
    headTeacherId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ClassCountOrderByAggregateInput
    _avg?: ClassAvgOrderByAggregateInput
    _max?: ClassMaxOrderByAggregateInput
    _min?: ClassMinOrderByAggregateInput
    _sum?: ClassSumOrderByAggregateInput
  }

  export type ClassScalarWhereWithAggregatesInput = {
    AND?: ClassScalarWhereWithAggregatesInput | ClassScalarWhereWithAggregatesInput[]
    OR?: ClassScalarWhereWithAggregatesInput[]
    NOT?: ClassScalarWhereWithAggregatesInput | ClassScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Class"> | number
    name?: StringWithAggregatesFilter<"Class"> | string
    level?: StringWithAggregatesFilter<"Class"> | string
    schoolYear?: StringWithAggregatesFilter<"Class"> | string
    maxCapacity?: IntWithAggregatesFilter<"Class"> | number
    headTeacherId?: IntNullableWithAggregatesFilter<"Class"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"Class"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Class"> | Date | string
  }

  export type SubjectWhereInput = {
    AND?: SubjectWhereInput | SubjectWhereInput[]
    OR?: SubjectWhereInput[]
    NOT?: SubjectWhereInput | SubjectWhereInput[]
    id?: IntFilter<"Subject"> | number
    name?: StringFilter<"Subject"> | string
    code?: StringFilter<"Subject"> | string
    coefficient?: IntFilter<"Subject"> | number
    description?: StringNullableFilter<"Subject"> | string | null
    createdAt?: DateTimeFilter<"Subject"> | Date | string
    updatedAt?: DateTimeFilter<"Subject"> | Date | string
    assignments?: TeacherSubjectClassListRelationFilter
    marks?: MarkListRelationFilter
  }

  export type SubjectOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    coefficient?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    assignments?: TeacherSubjectClassOrderByRelationAggregateInput
    marks?: MarkOrderByRelationAggregateInput
  }

  export type SubjectWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    code?: string
    AND?: SubjectWhereInput | SubjectWhereInput[]
    OR?: SubjectWhereInput[]
    NOT?: SubjectWhereInput | SubjectWhereInput[]
    name?: StringFilter<"Subject"> | string
    coefficient?: IntFilter<"Subject"> | number
    description?: StringNullableFilter<"Subject"> | string | null
    createdAt?: DateTimeFilter<"Subject"> | Date | string
    updatedAt?: DateTimeFilter<"Subject"> | Date | string
    assignments?: TeacherSubjectClassListRelationFilter
    marks?: MarkListRelationFilter
  }, "id" | "code">

  export type SubjectOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    coefficient?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SubjectCountOrderByAggregateInput
    _avg?: SubjectAvgOrderByAggregateInput
    _max?: SubjectMaxOrderByAggregateInput
    _min?: SubjectMinOrderByAggregateInput
    _sum?: SubjectSumOrderByAggregateInput
  }

  export type SubjectScalarWhereWithAggregatesInput = {
    AND?: SubjectScalarWhereWithAggregatesInput | SubjectScalarWhereWithAggregatesInput[]
    OR?: SubjectScalarWhereWithAggregatesInput[]
    NOT?: SubjectScalarWhereWithAggregatesInput | SubjectScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Subject"> | number
    name?: StringWithAggregatesFilter<"Subject"> | string
    code?: StringWithAggregatesFilter<"Subject"> | string
    coefficient?: IntWithAggregatesFilter<"Subject"> | number
    description?: StringNullableWithAggregatesFilter<"Subject"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Subject"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Subject"> | Date | string
  }

  export type TeacherWhereInput = {
    AND?: TeacherWhereInput | TeacherWhereInput[]
    OR?: TeacherWhereInput[]
    NOT?: TeacherWhereInput | TeacherWhereInput[]
    id?: IntFilter<"Teacher"> | number
    userId?: IntFilter<"Teacher"> | number
    speciality?: StringNullableFilter<"Teacher"> | string | null
    phone?: StringNullableFilter<"Teacher"> | string | null
    createdAt?: DateTimeFilter<"Teacher"> | Date | string
    updatedAt?: DateTimeFilter<"Teacher"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    headOfClasses?: ClassListRelationFilter
    assignments?: TeacherSubjectClassListRelationFilter
    marks?: MarkListRelationFilter
    absences?: AbsenceListRelationFilter
  }

  export type TeacherOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    speciality?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    headOfClasses?: ClassOrderByRelationAggregateInput
    assignments?: TeacherSubjectClassOrderByRelationAggregateInput
    marks?: MarkOrderByRelationAggregateInput
    absences?: AbsenceOrderByRelationAggregateInput
  }

  export type TeacherWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: number
    AND?: TeacherWhereInput | TeacherWhereInput[]
    OR?: TeacherWhereInput[]
    NOT?: TeacherWhereInput | TeacherWhereInput[]
    speciality?: StringNullableFilter<"Teacher"> | string | null
    phone?: StringNullableFilter<"Teacher"> | string | null
    createdAt?: DateTimeFilter<"Teacher"> | Date | string
    updatedAt?: DateTimeFilter<"Teacher"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    headOfClasses?: ClassListRelationFilter
    assignments?: TeacherSubjectClassListRelationFilter
    marks?: MarkListRelationFilter
    absences?: AbsenceListRelationFilter
  }, "id" | "userId">

  export type TeacherOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    speciality?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: TeacherCountOrderByAggregateInput
    _avg?: TeacherAvgOrderByAggregateInput
    _max?: TeacherMaxOrderByAggregateInput
    _min?: TeacherMinOrderByAggregateInput
    _sum?: TeacherSumOrderByAggregateInput
  }

  export type TeacherScalarWhereWithAggregatesInput = {
    AND?: TeacherScalarWhereWithAggregatesInput | TeacherScalarWhereWithAggregatesInput[]
    OR?: TeacherScalarWhereWithAggregatesInput[]
    NOT?: TeacherScalarWhereWithAggregatesInput | TeacherScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Teacher"> | number
    userId?: IntWithAggregatesFilter<"Teacher"> | number
    speciality?: StringNullableWithAggregatesFilter<"Teacher"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Teacher"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Teacher"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Teacher"> | Date | string
  }

  export type TeacherSubjectClassWhereInput = {
    AND?: TeacherSubjectClassWhereInput | TeacherSubjectClassWhereInput[]
    OR?: TeacherSubjectClassWhereInput[]
    NOT?: TeacherSubjectClassWhereInput | TeacherSubjectClassWhereInput[]
    teacherId?: IntFilter<"TeacherSubjectClass"> | number
    subjectId?: IntFilter<"TeacherSubjectClass"> | number
    classId?: IntFilter<"TeacherSubjectClass"> | number
    schoolYear?: StringFilter<"TeacherSubjectClass"> | string
    teacher?: XOR<TeacherScalarRelationFilter, TeacherWhereInput>
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
    class?: XOR<ClassScalarRelationFilter, ClassWhereInput>
  }

  export type TeacherSubjectClassOrderByWithRelationInput = {
    teacherId?: SortOrder
    subjectId?: SortOrder
    classId?: SortOrder
    schoolYear?: SortOrder
    teacher?: TeacherOrderByWithRelationInput
    subject?: SubjectOrderByWithRelationInput
    class?: ClassOrderByWithRelationInput
  }

  export type TeacherSubjectClassWhereUniqueInput = Prisma.AtLeast<{
    teacherId_subjectId_classId_schoolYear?: TeacherSubjectClassTeacherIdSubjectIdClassIdSchoolYearCompoundUniqueInput
    AND?: TeacherSubjectClassWhereInput | TeacherSubjectClassWhereInput[]
    OR?: TeacherSubjectClassWhereInput[]
    NOT?: TeacherSubjectClassWhereInput | TeacherSubjectClassWhereInput[]
    teacherId?: IntFilter<"TeacherSubjectClass"> | number
    subjectId?: IntFilter<"TeacherSubjectClass"> | number
    classId?: IntFilter<"TeacherSubjectClass"> | number
    schoolYear?: StringFilter<"TeacherSubjectClass"> | string
    teacher?: XOR<TeacherScalarRelationFilter, TeacherWhereInput>
    subject?: XOR<SubjectScalarRelationFilter, SubjectWhereInput>
    class?: XOR<ClassScalarRelationFilter, ClassWhereInput>
  }, "teacherId_subjectId_classId_schoolYear">

  export type TeacherSubjectClassOrderByWithAggregationInput = {
    teacherId?: SortOrder
    subjectId?: SortOrder
    classId?: SortOrder
    schoolYear?: SortOrder
    _count?: TeacherSubjectClassCountOrderByAggregateInput
    _avg?: TeacherSubjectClassAvgOrderByAggregateInput
    _max?: TeacherSubjectClassMaxOrderByAggregateInput
    _min?: TeacherSubjectClassMinOrderByAggregateInput
    _sum?: TeacherSubjectClassSumOrderByAggregateInput
  }

  export type TeacherSubjectClassScalarWhereWithAggregatesInput = {
    AND?: TeacherSubjectClassScalarWhereWithAggregatesInput | TeacherSubjectClassScalarWhereWithAggregatesInput[]
    OR?: TeacherSubjectClassScalarWhereWithAggregatesInput[]
    NOT?: TeacherSubjectClassScalarWhereWithAggregatesInput | TeacherSubjectClassScalarWhereWithAggregatesInput[]
    teacherId?: IntWithAggregatesFilter<"TeacherSubjectClass"> | number
    subjectId?: IntWithAggregatesFilter<"TeacherSubjectClass"> | number
    classId?: IntWithAggregatesFilter<"TeacherSubjectClass"> | number
    schoolYear?: StringWithAggregatesFilter<"TeacherSubjectClass"> | string
  }

  export type MarkWhereInput = {
    AND?: MarkWhereInput | MarkWhereInput[]
    OR?: MarkWhereInput[]
    NOT?: MarkWhereInput | MarkWhereInput[]
    id?: IntFilter<"Mark"> | number
    studentId?: IntFilter<"Mark"> | number
    subjectId?: IntNullableFilter<"Mark"> | number | null
    teacherId?: IntNullableFilter<"Mark"> | number | null
    classId?: IntNullableFilter<"Mark"> | number | null
    subject?: StringFilter<"Mark"> | string
    value?: FloatFilter<"Mark"> | number
    coefficient?: FloatFilter<"Mark"> | number
    semester?: IntNullableFilter<"Mark"> | number | null
    comment?: StringNullableFilter<"Mark"> | string | null
    term?: StringFilter<"Mark"> | string
    date?: DateTimeFilter<"Mark"> | Date | string
    createdAt?: DateTimeFilter<"Mark"> | Date | string
    updatedAt?: DateTimeFilter<"Mark"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    subjectRef?: XOR<SubjectNullableScalarRelationFilter, SubjectWhereInput> | null
    teacher?: XOR<TeacherNullableScalarRelationFilter, TeacherWhereInput> | null
    class?: XOR<ClassNullableScalarRelationFilter, ClassWhereInput> | null
  }

  export type MarkOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    subjectId?: SortOrderInput | SortOrder
    teacherId?: SortOrderInput | SortOrder
    classId?: SortOrderInput | SortOrder
    subject?: SortOrder
    value?: SortOrder
    coefficient?: SortOrder
    semester?: SortOrderInput | SortOrder
    comment?: SortOrderInput | SortOrder
    term?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    student?: StudentOrderByWithRelationInput
    subjectRef?: SubjectOrderByWithRelationInput
    teacher?: TeacherOrderByWithRelationInput
    class?: ClassOrderByWithRelationInput
  }

  export type MarkWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MarkWhereInput | MarkWhereInput[]
    OR?: MarkWhereInput[]
    NOT?: MarkWhereInput | MarkWhereInput[]
    studentId?: IntFilter<"Mark"> | number
    subjectId?: IntNullableFilter<"Mark"> | number | null
    teacherId?: IntNullableFilter<"Mark"> | number | null
    classId?: IntNullableFilter<"Mark"> | number | null
    subject?: StringFilter<"Mark"> | string
    value?: FloatFilter<"Mark"> | number
    coefficient?: FloatFilter<"Mark"> | number
    semester?: IntNullableFilter<"Mark"> | number | null
    comment?: StringNullableFilter<"Mark"> | string | null
    term?: StringFilter<"Mark"> | string
    date?: DateTimeFilter<"Mark"> | Date | string
    createdAt?: DateTimeFilter<"Mark"> | Date | string
    updatedAt?: DateTimeFilter<"Mark"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    subjectRef?: XOR<SubjectNullableScalarRelationFilter, SubjectWhereInput> | null
    teacher?: XOR<TeacherNullableScalarRelationFilter, TeacherWhereInput> | null
    class?: XOR<ClassNullableScalarRelationFilter, ClassWhereInput> | null
  }, "id">

  export type MarkOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    subjectId?: SortOrderInput | SortOrder
    teacherId?: SortOrderInput | SortOrder
    classId?: SortOrderInput | SortOrder
    subject?: SortOrder
    value?: SortOrder
    coefficient?: SortOrder
    semester?: SortOrderInput | SortOrder
    comment?: SortOrderInput | SortOrder
    term?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MarkCountOrderByAggregateInput
    _avg?: MarkAvgOrderByAggregateInput
    _max?: MarkMaxOrderByAggregateInput
    _min?: MarkMinOrderByAggregateInput
    _sum?: MarkSumOrderByAggregateInput
  }

  export type MarkScalarWhereWithAggregatesInput = {
    AND?: MarkScalarWhereWithAggregatesInput | MarkScalarWhereWithAggregatesInput[]
    OR?: MarkScalarWhereWithAggregatesInput[]
    NOT?: MarkScalarWhereWithAggregatesInput | MarkScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Mark"> | number
    studentId?: IntWithAggregatesFilter<"Mark"> | number
    subjectId?: IntNullableWithAggregatesFilter<"Mark"> | number | null
    teacherId?: IntNullableWithAggregatesFilter<"Mark"> | number | null
    classId?: IntNullableWithAggregatesFilter<"Mark"> | number | null
    subject?: StringWithAggregatesFilter<"Mark"> | string
    value?: FloatWithAggregatesFilter<"Mark"> | number
    coefficient?: FloatWithAggregatesFilter<"Mark"> | number
    semester?: IntNullableWithAggregatesFilter<"Mark"> | number | null
    comment?: StringNullableWithAggregatesFilter<"Mark"> | string | null
    term?: StringWithAggregatesFilter<"Mark"> | string
    date?: DateTimeWithAggregatesFilter<"Mark"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Mark"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Mark"> | Date | string
  }

  export type AbsenceWhereInput = {
    AND?: AbsenceWhereInput | AbsenceWhereInput[]
    OR?: AbsenceWhereInput[]
    NOT?: AbsenceWhereInput | AbsenceWhereInput[]
    id?: IntFilter<"Absence"> | number
    studentId?: IntFilter<"Absence"> | number
    teacherId?: IntNullableFilter<"Absence"> | number | null
    classId?: IntNullableFilter<"Absence"> | number | null
    date?: DateTimeFilter<"Absence"> | Date | string
    status?: EnumAbsenceStatusFilter<"Absence"> | $Enums.AbsenceStatus
    reason?: StringNullableFilter<"Absence"> | string | null
    justified?: BoolFilter<"Absence"> | boolean
    parentNotifiedAt?: DateTimeNullableFilter<"Absence"> | Date | string | null
    createdAt?: DateTimeFilter<"Absence"> | Date | string
    updatedAt?: DateTimeFilter<"Absence"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    teacher?: XOR<TeacherNullableScalarRelationFilter, TeacherWhereInput> | null
    class?: XOR<ClassNullableScalarRelationFilter, ClassWhereInput> | null
  }

  export type AbsenceOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    teacherId?: SortOrderInput | SortOrder
    classId?: SortOrderInput | SortOrder
    date?: SortOrder
    status?: SortOrder
    reason?: SortOrderInput | SortOrder
    justified?: SortOrder
    parentNotifiedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    student?: StudentOrderByWithRelationInput
    teacher?: TeacherOrderByWithRelationInput
    class?: ClassOrderByWithRelationInput
  }

  export type AbsenceWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AbsenceWhereInput | AbsenceWhereInput[]
    OR?: AbsenceWhereInput[]
    NOT?: AbsenceWhereInput | AbsenceWhereInput[]
    studentId?: IntFilter<"Absence"> | number
    teacherId?: IntNullableFilter<"Absence"> | number | null
    classId?: IntNullableFilter<"Absence"> | number | null
    date?: DateTimeFilter<"Absence"> | Date | string
    status?: EnumAbsenceStatusFilter<"Absence"> | $Enums.AbsenceStatus
    reason?: StringNullableFilter<"Absence"> | string | null
    justified?: BoolFilter<"Absence"> | boolean
    parentNotifiedAt?: DateTimeNullableFilter<"Absence"> | Date | string | null
    createdAt?: DateTimeFilter<"Absence"> | Date | string
    updatedAt?: DateTimeFilter<"Absence"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
    teacher?: XOR<TeacherNullableScalarRelationFilter, TeacherWhereInput> | null
    class?: XOR<ClassNullableScalarRelationFilter, ClassWhereInput> | null
  }, "id">

  export type AbsenceOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    teacherId?: SortOrderInput | SortOrder
    classId?: SortOrderInput | SortOrder
    date?: SortOrder
    status?: SortOrder
    reason?: SortOrderInput | SortOrder
    justified?: SortOrder
    parentNotifiedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AbsenceCountOrderByAggregateInput
    _avg?: AbsenceAvgOrderByAggregateInput
    _max?: AbsenceMaxOrderByAggregateInput
    _min?: AbsenceMinOrderByAggregateInput
    _sum?: AbsenceSumOrderByAggregateInput
  }

  export type AbsenceScalarWhereWithAggregatesInput = {
    AND?: AbsenceScalarWhereWithAggregatesInput | AbsenceScalarWhereWithAggregatesInput[]
    OR?: AbsenceScalarWhereWithAggregatesInput[]
    NOT?: AbsenceScalarWhereWithAggregatesInput | AbsenceScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Absence"> | number
    studentId?: IntWithAggregatesFilter<"Absence"> | number
    teacherId?: IntNullableWithAggregatesFilter<"Absence"> | number | null
    classId?: IntNullableWithAggregatesFilter<"Absence"> | number | null
    date?: DateTimeWithAggregatesFilter<"Absence"> | Date | string
    status?: EnumAbsenceStatusWithAggregatesFilter<"Absence"> | $Enums.AbsenceStatus
    reason?: StringNullableWithAggregatesFilter<"Absence"> | string | null
    justified?: BoolWithAggregatesFilter<"Absence"> | boolean
    parentNotifiedAt?: DateTimeNullableWithAggregatesFilter<"Absence"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Absence"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Absence"> | Date | string
  }

  export type PaymentWhereInput = {
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    id?: IntFilter<"Payment"> | number
    studentId?: IntFilter<"Payment"> | number
    amount?: FloatFilter<"Payment"> | number
    dueDate?: DateTimeFilter<"Payment"> | Date | string
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    paymentDate?: DateTimeNullableFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }

  export type PaymentOrderByWithRelationInput = {
    id?: SortOrder
    studentId?: SortOrder
    amount?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    paymentDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    student?: StudentOrderByWithRelationInput
  }

  export type PaymentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PaymentWhereInput | PaymentWhereInput[]
    OR?: PaymentWhereInput[]
    NOT?: PaymentWhereInput | PaymentWhereInput[]
    studentId?: IntFilter<"Payment"> | number
    amount?: FloatFilter<"Payment"> | number
    dueDate?: DateTimeFilter<"Payment"> | Date | string
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    paymentDate?: DateTimeNullableFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
    student?: XOR<StudentScalarRelationFilter, StudentWhereInput>
  }, "id">

  export type PaymentOrderByWithAggregationInput = {
    id?: SortOrder
    studentId?: SortOrder
    amount?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    paymentDate?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PaymentCountOrderByAggregateInput
    _avg?: PaymentAvgOrderByAggregateInput
    _max?: PaymentMaxOrderByAggregateInput
    _min?: PaymentMinOrderByAggregateInput
    _sum?: PaymentSumOrderByAggregateInput
  }

  export type PaymentScalarWhereWithAggregatesInput = {
    AND?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    OR?: PaymentScalarWhereWithAggregatesInput[]
    NOT?: PaymentScalarWhereWithAggregatesInput | PaymentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Payment"> | number
    studentId?: IntWithAggregatesFilter<"Payment"> | number
    amount?: FloatWithAggregatesFilter<"Payment"> | number
    dueDate?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    status?: EnumPaymentStatusWithAggregatesFilter<"Payment"> | $Enums.PaymentStatus
    paymentDate?: DateTimeNullableWithAggregatesFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Payment"> | Date | string
  }

  export type SchoolLevelWhereInput = {
    AND?: SchoolLevelWhereInput | SchoolLevelWhereInput[]
    OR?: SchoolLevelWhereInput[]
    NOT?: SchoolLevelWhereInput | SchoolLevelWhereInput[]
    id?: IntFilter<"SchoolLevel"> | number
    value?: StringFilter<"SchoolLevel"> | string
    label?: StringFilter<"SchoolLevel"> | string
  }

  export type SchoolLevelOrderByWithRelationInput = {
    id?: SortOrder
    value?: SortOrder
    label?: SortOrder
  }

  export type SchoolLevelWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    value?: string
    AND?: SchoolLevelWhereInput | SchoolLevelWhereInput[]
    OR?: SchoolLevelWhereInput[]
    NOT?: SchoolLevelWhereInput | SchoolLevelWhereInput[]
    label?: StringFilter<"SchoolLevel"> | string
  }, "id" | "value">

  export type SchoolLevelOrderByWithAggregationInput = {
    id?: SortOrder
    value?: SortOrder
    label?: SortOrder
    _count?: SchoolLevelCountOrderByAggregateInput
    _avg?: SchoolLevelAvgOrderByAggregateInput
    _max?: SchoolLevelMaxOrderByAggregateInput
    _min?: SchoolLevelMinOrderByAggregateInput
    _sum?: SchoolLevelSumOrderByAggregateInput
  }

  export type SchoolLevelScalarWhereWithAggregatesInput = {
    AND?: SchoolLevelScalarWhereWithAggregatesInput | SchoolLevelScalarWhereWithAggregatesInput[]
    OR?: SchoolLevelScalarWhereWithAggregatesInput[]
    NOT?: SchoolLevelScalarWhereWithAggregatesInput | SchoolLevelScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SchoolLevel"> | number
    value?: StringWithAggregatesFilter<"SchoolLevel"> | string
    label?: StringWithAggregatesFilter<"SchoolLevel"> | string
  }

  export type UserCreateInput = {
    firstName: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: ParentCreateNestedOneWithoutUserInput
    processedRegistrations?: PreRegistrationCreateNestedManyWithoutProcessedByUserInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    student?: StudentCreateNestedOneWithoutUserInput
    teacher?: TeacherCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    firstName: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: ParentUncheckedCreateNestedOneWithoutUserInput
    processedRegistrations?: PreRegistrationUncheckedCreateNestedManyWithoutProcessedByUserInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    student?: StudentUncheckedCreateNestedOneWithoutUserInput
    teacher?: TeacherUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: ParentUpdateOneWithoutUserNestedInput
    processedRegistrations?: PreRegistrationUpdateManyWithoutProcessedByUserNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    student?: StudentUpdateOneWithoutUserNestedInput
    teacher?: TeacherUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: ParentUncheckedUpdateOneWithoutUserNestedInput
    processedRegistrations?: PreRegistrationUncheckedUpdateManyWithoutProcessedByUserNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    student?: StudentUncheckedUpdateOneWithoutUserNestedInput
    teacher?: TeacherUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    firstName: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshTokenCreateInput = {
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
    revoked?: boolean
    user: UserCreateNestedOneWithoutRefreshTokensInput
  }

  export type RefreshTokenUncheckedCreateInput = {
    id?: number
    token: string
    userId: number
    expiresAt: Date | string
    createdAt?: Date | string
    revoked?: boolean
  }

  export type RefreshTokenUpdateInput = {
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutRefreshTokensNestedInput
  }

  export type RefreshTokenUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RefreshTokenCreateManyInput = {
    id?: number
    token: string
    userId: number
    expiresAt: Date | string
    createdAt?: Date | string
    revoked?: boolean
  }

  export type RefreshTokenUpdateManyMutationInput = {
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RefreshTokenUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked?: BoolFieldUpdateOperationsInput | boolean
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
    processedAt?: Date | string | null
    submittedAt?: Date | string
    updatedAt?: Date | string
    parentEmailSentAt?: Date | string | null
    studentEmailSentAt?: Date | string | null
    processedByUser?: UserCreateNestedOneWithoutProcessedRegistrationsInput
    student?: StudentCreateNestedOneWithoutPreRegistrationInput
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
    parentEmailSentAt?: Date | string | null
    studentEmailSentAt?: Date | string | null
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
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentEmailSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    studentEmailSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedByUser?: UserUpdateOneWithoutProcessedRegistrationsNestedInput
    student?: StudentUpdateOneWithoutPreRegistrationNestedInput
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
    parentEmailSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    studentEmailSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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
    parentEmailSentAt?: Date | string | null
    studentEmailSentAt?: Date | string | null
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
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentEmailSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    studentEmailSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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
    parentEmailSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    studentEmailSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StudentCreateInput = {
    status?: $Enums.StudentStatus
    schoolYear: string
    birthDate: Date | string
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    absences?: AbsenceCreateNestedManyWithoutStudentInput
    marks?: MarkCreateNestedManyWithoutStudentInput
    payments?: PaymentCreateNestedManyWithoutStudentInput
    preRegistration?: PreRegistrationCreateNestedOneWithoutStudentInput
    class?: ClassCreateNestedOneWithoutStudentsInput
    parent?: ParentCreateNestedOneWithoutStudentsInput
    user: UserCreateNestedOneWithoutStudentInput
  }

  export type StudentUncheckedCreateInput = {
    id?: number
    userId: number
    classId?: number | null
    status?: $Enums.StudentStatus
    schoolYear: string
    birthDate: Date | string
    address?: string | null
    parentId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    absences?: AbsenceUncheckedCreateNestedManyWithoutStudentInput
    marks?: MarkUncheckedCreateNestedManyWithoutStudentInput
    payments?: PaymentUncheckedCreateNestedManyWithoutStudentInput
    preRegistration?: PreRegistrationUncheckedCreateNestedOneWithoutStudentInput
  }

  export type StudentUpdateInput = {
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    schoolYear?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    absences?: AbsenceUpdateManyWithoutStudentNestedInput
    marks?: MarkUpdateManyWithoutStudentNestedInput
    payments?: PaymentUpdateManyWithoutStudentNestedInput
    preRegistration?: PreRegistrationUpdateOneWithoutStudentNestedInput
    class?: ClassUpdateOneWithoutStudentsNestedInput
    parent?: ParentUpdateOneWithoutStudentsNestedInput
    user?: UserUpdateOneRequiredWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    classId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    schoolYear?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    absences?: AbsenceUncheckedUpdateManyWithoutStudentNestedInput
    marks?: MarkUncheckedUpdateManyWithoutStudentNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutStudentNestedInput
    preRegistration?: PreRegistrationUncheckedUpdateOneWithoutStudentNestedInput
  }

  export type StudentCreateManyInput = {
    id?: number
    userId: number
    classId?: number | null
    status?: $Enums.StudentStatus
    schoolYear: string
    birthDate: Date | string
    address?: string | null
    parentId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentUpdateManyMutationInput = {
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    schoolYear?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    classId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    schoolYear?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParentCreateInput = {
    phone: string
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutParentInput
    students?: StudentCreateNestedManyWithoutParentInput
  }

  export type ParentUncheckedCreateInput = {
    id?: number
    userId: number
    phone: string
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    students?: StudentUncheckedCreateNestedManyWithoutParentInput
  }

  export type ParentUpdateInput = {
    phone?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutParentNestedInput
    students?: StudentUpdateManyWithoutParentNestedInput
  }

  export type ParentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    phone?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentUncheckedUpdateManyWithoutParentNestedInput
  }

  export type ParentCreateManyInput = {
    id?: number
    userId: number
    phone: string
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ParentUpdateManyMutationInput = {
    phone?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ParentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    phone?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassCreateInput = {
    name: string
    level: string
    schoolYear?: string
    maxCapacity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    students?: StudentCreateNestedManyWithoutClassInput
    headTeacher?: TeacherCreateNestedOneWithoutHeadOfClassesInput
    assignments?: TeacherSubjectClassCreateNestedManyWithoutClassInput
    marks?: MarkCreateNestedManyWithoutClassInput
    absences?: AbsenceCreateNestedManyWithoutClassInput
  }

  export type ClassUncheckedCreateInput = {
    id?: number
    name: string
    level: string
    schoolYear?: string
    maxCapacity?: number
    headTeacherId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    students?: StudentUncheckedCreateNestedManyWithoutClassInput
    assignments?: TeacherSubjectClassUncheckedCreateNestedManyWithoutClassInput
    marks?: MarkUncheckedCreateNestedManyWithoutClassInput
    absences?: AbsenceUncheckedCreateNestedManyWithoutClassInput
  }

  export type ClassUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    schoolYear?: StringFieldUpdateOperationsInput | string
    maxCapacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentUpdateManyWithoutClassNestedInput
    headTeacher?: TeacherUpdateOneWithoutHeadOfClassesNestedInput
    assignments?: TeacherSubjectClassUpdateManyWithoutClassNestedInput
    marks?: MarkUpdateManyWithoutClassNestedInput
    absences?: AbsenceUpdateManyWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    schoolYear?: StringFieldUpdateOperationsInput | string
    maxCapacity?: IntFieldUpdateOperationsInput | number
    headTeacherId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentUncheckedUpdateManyWithoutClassNestedInput
    assignments?: TeacherSubjectClassUncheckedUpdateManyWithoutClassNestedInput
    marks?: MarkUncheckedUpdateManyWithoutClassNestedInput
    absences?: AbsenceUncheckedUpdateManyWithoutClassNestedInput
  }

  export type ClassCreateManyInput = {
    id?: number
    name: string
    level: string
    schoolYear?: string
    maxCapacity?: number
    headTeacherId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClassUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    schoolYear?: StringFieldUpdateOperationsInput | string
    maxCapacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    schoolYear?: StringFieldUpdateOperationsInput | string
    maxCapacity?: IntFieldUpdateOperationsInput | number
    headTeacherId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubjectCreateInput = {
    name: string
    code: string
    coefficient?: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignments?: TeacherSubjectClassCreateNestedManyWithoutSubjectInput
    marks?: MarkCreateNestedManyWithoutSubjectRefInput
  }

  export type SubjectUncheckedCreateInput = {
    id?: number
    name: string
    code: string
    coefficient?: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignments?: TeacherSubjectClassUncheckedCreateNestedManyWithoutSubjectInput
    marks?: MarkUncheckedCreateNestedManyWithoutSubjectRefInput
  }

  export type SubjectUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    coefficient?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: TeacherSubjectClassUpdateManyWithoutSubjectNestedInput
    marks?: MarkUpdateManyWithoutSubjectRefNestedInput
  }

  export type SubjectUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    coefficient?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: TeacherSubjectClassUncheckedUpdateManyWithoutSubjectNestedInput
    marks?: MarkUncheckedUpdateManyWithoutSubjectRefNestedInput
  }

  export type SubjectCreateManyInput = {
    id?: number
    name: string
    code: string
    coefficient?: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SubjectUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    coefficient?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubjectUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    coefficient?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeacherCreateInput = {
    speciality?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTeacherInput
    headOfClasses?: ClassCreateNestedManyWithoutHeadTeacherInput
    assignments?: TeacherSubjectClassCreateNestedManyWithoutTeacherInput
    marks?: MarkCreateNestedManyWithoutTeacherInput
    absences?: AbsenceCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUncheckedCreateInput = {
    id?: number
    userId: number
    speciality?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    headOfClasses?: ClassUncheckedCreateNestedManyWithoutHeadTeacherInput
    assignments?: TeacherSubjectClassUncheckedCreateNestedManyWithoutTeacherInput
    marks?: MarkUncheckedCreateNestedManyWithoutTeacherInput
    absences?: AbsenceUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUpdateInput = {
    speciality?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTeacherNestedInput
    headOfClasses?: ClassUpdateManyWithoutHeadTeacherNestedInput
    assignments?: TeacherSubjectClassUpdateManyWithoutTeacherNestedInput
    marks?: MarkUpdateManyWithoutTeacherNestedInput
    absences?: AbsenceUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    speciality?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    headOfClasses?: ClassUncheckedUpdateManyWithoutHeadTeacherNestedInput
    assignments?: TeacherSubjectClassUncheckedUpdateManyWithoutTeacherNestedInput
    marks?: MarkUncheckedUpdateManyWithoutTeacherNestedInput
    absences?: AbsenceUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherCreateManyInput = {
    id?: number
    userId: number
    speciality?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeacherUpdateManyMutationInput = {
    speciality?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeacherUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    speciality?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeacherSubjectClassCreateInput = {
    schoolYear: string
    teacher: TeacherCreateNestedOneWithoutAssignmentsInput
    subject: SubjectCreateNestedOneWithoutAssignmentsInput
    class: ClassCreateNestedOneWithoutAssignmentsInput
  }

  export type TeacherSubjectClassUncheckedCreateInput = {
    teacherId: number
    subjectId: number
    classId: number
    schoolYear: string
  }

  export type TeacherSubjectClassUpdateInput = {
    schoolYear?: StringFieldUpdateOperationsInput | string
    teacher?: TeacherUpdateOneRequiredWithoutAssignmentsNestedInput
    subject?: SubjectUpdateOneRequiredWithoutAssignmentsNestedInput
    class?: ClassUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type TeacherSubjectClassUncheckedUpdateInput = {
    teacherId?: IntFieldUpdateOperationsInput | number
    subjectId?: IntFieldUpdateOperationsInput | number
    classId?: IntFieldUpdateOperationsInput | number
    schoolYear?: StringFieldUpdateOperationsInput | string
  }

  export type TeacherSubjectClassCreateManyInput = {
    teacherId: number
    subjectId: number
    classId: number
    schoolYear: string
  }

  export type TeacherSubjectClassUpdateManyMutationInput = {
    schoolYear?: StringFieldUpdateOperationsInput | string
  }

  export type TeacherSubjectClassUncheckedUpdateManyInput = {
    teacherId?: IntFieldUpdateOperationsInput | number
    subjectId?: IntFieldUpdateOperationsInput | number
    classId?: IntFieldUpdateOperationsInput | number
    schoolYear?: StringFieldUpdateOperationsInput | string
  }

  export type MarkCreateInput = {
    subject: string
    value: number
    coefficient?: number
    semester?: number | null
    comment?: string | null
    term: string
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    student: StudentCreateNestedOneWithoutMarksInput
    subjectRef?: SubjectCreateNestedOneWithoutMarksInput
    teacher?: TeacherCreateNestedOneWithoutMarksInput
    class?: ClassCreateNestedOneWithoutMarksInput
  }

  export type MarkUncheckedCreateInput = {
    id?: number
    studentId: number
    subjectId?: number | null
    teacherId?: number | null
    classId?: number | null
    subject: string
    value: number
    coefficient?: number
    semester?: number | null
    comment?: string | null
    term: string
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MarkUpdateInput = {
    subject?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    coefficient?: FloatFieldUpdateOperationsInput | number
    semester?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    term?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutMarksNestedInput
    subjectRef?: SubjectUpdateOneWithoutMarksNestedInput
    teacher?: TeacherUpdateOneWithoutMarksNestedInput
    class?: ClassUpdateOneWithoutMarksNestedInput
  }

  export type MarkUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    subjectId?: NullableIntFieldUpdateOperationsInput | number | null
    teacherId?: NullableIntFieldUpdateOperationsInput | number | null
    classId?: NullableIntFieldUpdateOperationsInput | number | null
    subject?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    coefficient?: FloatFieldUpdateOperationsInput | number
    semester?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    term?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarkCreateManyInput = {
    id?: number
    studentId: number
    subjectId?: number | null
    teacherId?: number | null
    classId?: number | null
    subject: string
    value: number
    coefficient?: number
    semester?: number | null
    comment?: string | null
    term: string
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MarkUpdateManyMutationInput = {
    subject?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    coefficient?: FloatFieldUpdateOperationsInput | number
    semester?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    term?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarkUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    subjectId?: NullableIntFieldUpdateOperationsInput | number | null
    teacherId?: NullableIntFieldUpdateOperationsInput | number | null
    classId?: NullableIntFieldUpdateOperationsInput | number | null
    subject?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    coefficient?: FloatFieldUpdateOperationsInput | number
    semester?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    term?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AbsenceCreateInput = {
    date: Date | string
    status?: $Enums.AbsenceStatus
    reason?: string | null
    justified?: boolean
    parentNotifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    student: StudentCreateNestedOneWithoutAbsencesInput
    teacher?: TeacherCreateNestedOneWithoutAbsencesInput
    class?: ClassCreateNestedOneWithoutAbsencesInput
  }

  export type AbsenceUncheckedCreateInput = {
    id?: number
    studentId: number
    teacherId?: number | null
    classId?: number | null
    date: Date | string
    status?: $Enums.AbsenceStatus
    reason?: string | null
    justified?: boolean
    parentNotifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AbsenceUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAbsenceStatusFieldUpdateOperationsInput | $Enums.AbsenceStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    justified?: BoolFieldUpdateOperationsInput | boolean
    parentNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutAbsencesNestedInput
    teacher?: TeacherUpdateOneWithoutAbsencesNestedInput
    class?: ClassUpdateOneWithoutAbsencesNestedInput
  }

  export type AbsenceUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    teacherId?: NullableIntFieldUpdateOperationsInput | number | null
    classId?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAbsenceStatusFieldUpdateOperationsInput | $Enums.AbsenceStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    justified?: BoolFieldUpdateOperationsInput | boolean
    parentNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AbsenceCreateManyInput = {
    id?: number
    studentId: number
    teacherId?: number | null
    classId?: number | null
    date: Date | string
    status?: $Enums.AbsenceStatus
    reason?: string | null
    justified?: boolean
    parentNotifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AbsenceUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAbsenceStatusFieldUpdateOperationsInput | $Enums.AbsenceStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    justified?: BoolFieldUpdateOperationsInput | boolean
    parentNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AbsenceUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    teacherId?: NullableIntFieldUpdateOperationsInput | number | null
    classId?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAbsenceStatusFieldUpdateOperationsInput | $Enums.AbsenceStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    justified?: BoolFieldUpdateOperationsInput | boolean
    parentNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateInput = {
    amount: number
    dueDate: Date | string
    status?: $Enums.PaymentStatus
    paymentDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    student: StudentCreateNestedOneWithoutPaymentsInput
  }

  export type PaymentUncheckedCreateInput = {
    id?: number
    studentId: number
    amount: number
    dueDate: Date | string
    status?: $Enums.PaymentStatus
    paymentDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateInput = {
    amount?: FloatFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutPaymentsNestedInput
  }

  export type PaymentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentCreateManyInput = {
    id?: number
    studentId: number
    amount: number
    dueDate: Date | string
    status?: $Enums.PaymentStatus
    paymentDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUpdateManyMutationInput = {
    amount?: FloatFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SchoolLevelCreateInput = {
    value: string
    label: string
  }

  export type SchoolLevelUncheckedCreateInput = {
    id?: number
    value: string
    label: string
  }

  export type SchoolLevelUpdateInput = {
    value?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
  }

  export type SchoolLevelUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    value?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
  }

  export type SchoolLevelCreateManyInput = {
    id?: number
    value: string
    label: string
  }

  export type SchoolLevelUpdateManyMutationInput = {
    value?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
  }

  export type SchoolLevelUncheckedUpdateManyInput = {
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

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type ParentNullableScalarRelationFilter = {
    is?: ParentWhereInput | null
    isNot?: ParentWhereInput | null
  }

  export type PreRegistrationListRelationFilter = {
    every?: PreRegistrationWhereInput
    some?: PreRegistrationWhereInput
    none?: PreRegistrationWhereInput
  }

  export type RefreshTokenListRelationFilter = {
    every?: RefreshTokenWhereInput
    some?: RefreshTokenWhereInput
    none?: RefreshTokenWhereInput
  }

  export type StudentNullableScalarRelationFilter = {
    is?: StudentWhereInput | null
    isNot?: StudentWhereInput | null
  }

  export type TeacherNullableScalarRelationFilter = {
    is?: TeacherWhereInput | null
    isNot?: TeacherWhereInput | null
  }

  export type PreRegistrationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RefreshTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    name?: SortOrder
    email?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    active?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
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

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type RefreshTokenCountOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    revoked?: SortOrder
  }

  export type RefreshTokenAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type RefreshTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    revoked?: SortOrder
  }

  export type RefreshTokenMinOrderByAggregateInput = {
    id?: SortOrder
    token?: SortOrder
    userId?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    revoked?: SortOrder
  }

  export type RefreshTokenSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
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

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
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
    parentEmailSentAt?: SortOrder
    studentEmailSentAt?: SortOrder
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
    parentEmailSentAt?: SortOrder
    studentEmailSentAt?: SortOrder
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
    parentEmailSentAt?: SortOrder
    studentEmailSentAt?: SortOrder
  }

  export type PreRegistrationSumOrderByAggregateInput = {
    id?: SortOrder
    processedBy?: SortOrder
    studentId?: SortOrder
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

  export type EnumStudentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.StudentStatus | EnumStudentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StudentStatus[] | ListEnumStudentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StudentStatus[] | ListEnumStudentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStudentStatusFilter<$PrismaModel> | $Enums.StudentStatus
  }

  export type AbsenceListRelationFilter = {
    every?: AbsenceWhereInput
    some?: AbsenceWhereInput
    none?: AbsenceWhereInput
  }

  export type MarkListRelationFilter = {
    every?: MarkWhereInput
    some?: MarkWhereInput
    none?: MarkWhereInput
  }

  export type PaymentListRelationFilter = {
    every?: PaymentWhereInput
    some?: PaymentWhereInput
    none?: PaymentWhereInput
  }

  export type PreRegistrationNullableScalarRelationFilter = {
    is?: PreRegistrationWhereInput | null
    isNot?: PreRegistrationWhereInput | null
  }

  export type ClassNullableScalarRelationFilter = {
    is?: ClassWhereInput | null
    isNot?: ClassWhereInput | null
  }

  export type AbsenceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MarkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PaymentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type StudentCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    classId?: SortOrder
    status?: SortOrder
    schoolYear?: SortOrder
    birthDate?: SortOrder
    address?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    classId?: SortOrder
    parentId?: SortOrder
  }

  export type StudentMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    classId?: SortOrder
    status?: SortOrder
    schoolYear?: SortOrder
    birthDate?: SortOrder
    address?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    classId?: SortOrder
    status?: SortOrder
    schoolYear?: SortOrder
    birthDate?: SortOrder
    address?: SortOrder
    parentId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StudentSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    classId?: SortOrder
    parentId?: SortOrder
  }

  export type EnumStudentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StudentStatus | EnumStudentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StudentStatus[] | ListEnumStudentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StudentStatus[] | ListEnumStudentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStudentStatusWithAggregatesFilter<$PrismaModel> | $Enums.StudentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStudentStatusFilter<$PrismaModel>
    _max?: NestedEnumStudentStatusFilter<$PrismaModel>
  }

  export type StudentListRelationFilter = {
    every?: StudentWhereInput
    some?: StudentWhereInput
    none?: StudentWhereInput
  }

  export type StudentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ParentCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ParentAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type ParentMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ParentMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    phone?: SortOrder
    address?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ParentSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type TeacherSubjectClassListRelationFilter = {
    every?: TeacherSubjectClassWhereInput
    some?: TeacherSubjectClassWhereInput
    none?: TeacherSubjectClassWhereInput
  }

  export type TeacherSubjectClassOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClassCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    level?: SortOrder
    schoolYear?: SortOrder
    maxCapacity?: SortOrder
    headTeacherId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClassAvgOrderByAggregateInput = {
    id?: SortOrder
    maxCapacity?: SortOrder
    headTeacherId?: SortOrder
  }

  export type ClassMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    level?: SortOrder
    schoolYear?: SortOrder
    maxCapacity?: SortOrder
    headTeacherId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClassMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    level?: SortOrder
    schoolYear?: SortOrder
    maxCapacity?: SortOrder
    headTeacherId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ClassSumOrderByAggregateInput = {
    id?: SortOrder
    maxCapacity?: SortOrder
    headTeacherId?: SortOrder
  }

  export type SubjectCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    coefficient?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubjectAvgOrderByAggregateInput = {
    id?: SortOrder
    coefficient?: SortOrder
  }

  export type SubjectMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    coefficient?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubjectMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    code?: SortOrder
    coefficient?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SubjectSumOrderByAggregateInput = {
    id?: SortOrder
    coefficient?: SortOrder
  }

  export type ClassListRelationFilter = {
    every?: ClassWhereInput
    some?: ClassWhereInput
    none?: ClassWhereInput
  }

  export type ClassOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeacherCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    speciality?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeacherAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type TeacherMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    speciality?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeacherMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    speciality?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type TeacherSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type TeacherScalarRelationFilter = {
    is?: TeacherWhereInput
    isNot?: TeacherWhereInput
  }

  export type SubjectScalarRelationFilter = {
    is?: SubjectWhereInput
    isNot?: SubjectWhereInput
  }

  export type ClassScalarRelationFilter = {
    is?: ClassWhereInput
    isNot?: ClassWhereInput
  }

  export type TeacherSubjectClassTeacherIdSubjectIdClassIdSchoolYearCompoundUniqueInput = {
    teacherId: number
    subjectId: number
    classId: number
    schoolYear: string
  }

  export type TeacherSubjectClassCountOrderByAggregateInput = {
    teacherId?: SortOrder
    subjectId?: SortOrder
    classId?: SortOrder
    schoolYear?: SortOrder
  }

  export type TeacherSubjectClassAvgOrderByAggregateInput = {
    teacherId?: SortOrder
    subjectId?: SortOrder
    classId?: SortOrder
  }

  export type TeacherSubjectClassMaxOrderByAggregateInput = {
    teacherId?: SortOrder
    subjectId?: SortOrder
    classId?: SortOrder
    schoolYear?: SortOrder
  }

  export type TeacherSubjectClassMinOrderByAggregateInput = {
    teacherId?: SortOrder
    subjectId?: SortOrder
    classId?: SortOrder
    schoolYear?: SortOrder
  }

  export type TeacherSubjectClassSumOrderByAggregateInput = {
    teacherId?: SortOrder
    subjectId?: SortOrder
    classId?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type StudentScalarRelationFilter = {
    is?: StudentWhereInput
    isNot?: StudentWhereInput
  }

  export type SubjectNullableScalarRelationFilter = {
    is?: SubjectWhereInput | null
    isNot?: SubjectWhereInput | null
  }

  export type MarkCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    subjectId?: SortOrder
    teacherId?: SortOrder
    classId?: SortOrder
    subject?: SortOrder
    value?: SortOrder
    coefficient?: SortOrder
    semester?: SortOrder
    comment?: SortOrder
    term?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MarkAvgOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    subjectId?: SortOrder
    teacherId?: SortOrder
    classId?: SortOrder
    value?: SortOrder
    coefficient?: SortOrder
    semester?: SortOrder
  }

  export type MarkMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    subjectId?: SortOrder
    teacherId?: SortOrder
    classId?: SortOrder
    subject?: SortOrder
    value?: SortOrder
    coefficient?: SortOrder
    semester?: SortOrder
    comment?: SortOrder
    term?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MarkMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    subjectId?: SortOrder
    teacherId?: SortOrder
    classId?: SortOrder
    subject?: SortOrder
    value?: SortOrder
    coefficient?: SortOrder
    semester?: SortOrder
    comment?: SortOrder
    term?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MarkSumOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    subjectId?: SortOrder
    teacherId?: SortOrder
    classId?: SortOrder
    value?: SortOrder
    coefficient?: SortOrder
    semester?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumAbsenceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AbsenceStatus | EnumAbsenceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AbsenceStatus[] | ListEnumAbsenceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AbsenceStatus[] | ListEnumAbsenceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAbsenceStatusFilter<$PrismaModel> | $Enums.AbsenceStatus
  }

  export type AbsenceCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    teacherId?: SortOrder
    classId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    reason?: SortOrder
    justified?: SortOrder
    parentNotifiedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AbsenceAvgOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    teacherId?: SortOrder
    classId?: SortOrder
  }

  export type AbsenceMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    teacherId?: SortOrder
    classId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    reason?: SortOrder
    justified?: SortOrder
    parentNotifiedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AbsenceMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    teacherId?: SortOrder
    classId?: SortOrder
    date?: SortOrder
    status?: SortOrder
    reason?: SortOrder
    justified?: SortOrder
    parentNotifiedAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AbsenceSumOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    teacherId?: SortOrder
    classId?: SortOrder
  }

  export type EnumAbsenceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AbsenceStatus | EnumAbsenceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AbsenceStatus[] | ListEnumAbsenceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AbsenceStatus[] | ListEnumAbsenceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAbsenceStatusWithAggregatesFilter<$PrismaModel> | $Enums.AbsenceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAbsenceStatusFilter<$PrismaModel>
    _max?: NestedEnumAbsenceStatusFilter<$PrismaModel>
  }

  export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type PaymentCountOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    amount?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    paymentDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentAvgOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    amount?: SortOrder
  }

  export type PaymentMaxOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    amount?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    paymentDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentMinOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    amount?: SortOrder
    dueDate?: SortOrder
    status?: SortOrder
    paymentDate?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PaymentSumOrderByAggregateInput = {
    id?: SortOrder
    studentId?: SortOrder
    amount?: SortOrder
  }

  export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type SchoolLevelCountOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    label?: SortOrder
  }

  export type SchoolLevelAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SchoolLevelMaxOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    label?: SortOrder
  }

  export type SchoolLevelMinOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
    label?: SortOrder
  }

  export type SchoolLevelSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ParentCreateNestedOneWithoutUserInput = {
    create?: XOR<ParentCreateWithoutUserInput, ParentUncheckedCreateWithoutUserInput>
    connectOrCreate?: ParentCreateOrConnectWithoutUserInput
    connect?: ParentWhereUniqueInput
  }

  export type PreRegistrationCreateNestedManyWithoutProcessedByUserInput = {
    create?: XOR<PreRegistrationCreateWithoutProcessedByUserInput, PreRegistrationUncheckedCreateWithoutProcessedByUserInput> | PreRegistrationCreateWithoutProcessedByUserInput[] | PreRegistrationUncheckedCreateWithoutProcessedByUserInput[]
    connectOrCreate?: PreRegistrationCreateOrConnectWithoutProcessedByUserInput | PreRegistrationCreateOrConnectWithoutProcessedByUserInput[]
    createMany?: PreRegistrationCreateManyProcessedByUserInputEnvelope
    connect?: PreRegistrationWhereUniqueInput | PreRegistrationWhereUniqueInput[]
  }

  export type RefreshTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type StudentCreateNestedOneWithoutUserInput = {
    create?: XOR<StudentCreateWithoutUserInput, StudentUncheckedCreateWithoutUserInput>
    connectOrCreate?: StudentCreateOrConnectWithoutUserInput
    connect?: StudentWhereUniqueInput
  }

  export type TeacherCreateNestedOneWithoutUserInput = {
    create?: XOR<TeacherCreateWithoutUserInput, TeacherUncheckedCreateWithoutUserInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutUserInput
    connect?: TeacherWhereUniqueInput
  }

  export type ParentUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ParentCreateWithoutUserInput, ParentUncheckedCreateWithoutUserInput>
    connectOrCreate?: ParentCreateOrConnectWithoutUserInput
    connect?: ParentWhereUniqueInput
  }

  export type PreRegistrationUncheckedCreateNestedManyWithoutProcessedByUserInput = {
    create?: XOR<PreRegistrationCreateWithoutProcessedByUserInput, PreRegistrationUncheckedCreateWithoutProcessedByUserInput> | PreRegistrationCreateWithoutProcessedByUserInput[] | PreRegistrationUncheckedCreateWithoutProcessedByUserInput[]
    connectOrCreate?: PreRegistrationCreateOrConnectWithoutProcessedByUserInput | PreRegistrationCreateOrConnectWithoutProcessedByUserInput[]
    createMany?: PreRegistrationCreateManyProcessedByUserInputEnvelope
    connect?: PreRegistrationWhereUniqueInput | PreRegistrationWhereUniqueInput[]
  }

  export type RefreshTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
  }

  export type StudentUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<StudentCreateWithoutUserInput, StudentUncheckedCreateWithoutUserInput>
    connectOrCreate?: StudentCreateOrConnectWithoutUserInput
    connect?: StudentWhereUniqueInput
  }

  export type TeacherUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<TeacherCreateWithoutUserInput, TeacherUncheckedCreateWithoutUserInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutUserInput
    connect?: TeacherWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ParentUpdateOneWithoutUserNestedInput = {
    create?: XOR<ParentCreateWithoutUserInput, ParentUncheckedCreateWithoutUserInput>
    connectOrCreate?: ParentCreateOrConnectWithoutUserInput
    upsert?: ParentUpsertWithoutUserInput
    disconnect?: ParentWhereInput | boolean
    delete?: ParentWhereInput | boolean
    connect?: ParentWhereUniqueInput
    update?: XOR<XOR<ParentUpdateToOneWithWhereWithoutUserInput, ParentUpdateWithoutUserInput>, ParentUncheckedUpdateWithoutUserInput>
  }

  export type PreRegistrationUpdateManyWithoutProcessedByUserNestedInput = {
    create?: XOR<PreRegistrationCreateWithoutProcessedByUserInput, PreRegistrationUncheckedCreateWithoutProcessedByUserInput> | PreRegistrationCreateWithoutProcessedByUserInput[] | PreRegistrationUncheckedCreateWithoutProcessedByUserInput[]
    connectOrCreate?: PreRegistrationCreateOrConnectWithoutProcessedByUserInput | PreRegistrationCreateOrConnectWithoutProcessedByUserInput[]
    upsert?: PreRegistrationUpsertWithWhereUniqueWithoutProcessedByUserInput | PreRegistrationUpsertWithWhereUniqueWithoutProcessedByUserInput[]
    createMany?: PreRegistrationCreateManyProcessedByUserInputEnvelope
    set?: PreRegistrationWhereUniqueInput | PreRegistrationWhereUniqueInput[]
    disconnect?: PreRegistrationWhereUniqueInput | PreRegistrationWhereUniqueInput[]
    delete?: PreRegistrationWhereUniqueInput | PreRegistrationWhereUniqueInput[]
    connect?: PreRegistrationWhereUniqueInput | PreRegistrationWhereUniqueInput[]
    update?: PreRegistrationUpdateWithWhereUniqueWithoutProcessedByUserInput | PreRegistrationUpdateWithWhereUniqueWithoutProcessedByUserInput[]
    updateMany?: PreRegistrationUpdateManyWithWhereWithoutProcessedByUserInput | PreRegistrationUpdateManyWithWhereWithoutProcessedByUserInput[]
    deleteMany?: PreRegistrationScalarWhereInput | PreRegistrationScalarWhereInput[]
  }

  export type RefreshTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type StudentUpdateOneWithoutUserNestedInput = {
    create?: XOR<StudentCreateWithoutUserInput, StudentUncheckedCreateWithoutUserInput>
    connectOrCreate?: StudentCreateOrConnectWithoutUserInput
    upsert?: StudentUpsertWithoutUserInput
    disconnect?: StudentWhereInput | boolean
    delete?: StudentWhereInput | boolean
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutUserInput, StudentUpdateWithoutUserInput>, StudentUncheckedUpdateWithoutUserInput>
  }

  export type TeacherUpdateOneWithoutUserNestedInput = {
    create?: XOR<TeacherCreateWithoutUserInput, TeacherUncheckedCreateWithoutUserInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutUserInput
    upsert?: TeacherUpsertWithoutUserInput
    disconnect?: TeacherWhereInput | boolean
    delete?: TeacherWhereInput | boolean
    connect?: TeacherWhereUniqueInput
    update?: XOR<XOR<TeacherUpdateToOneWithWhereWithoutUserInput, TeacherUpdateWithoutUserInput>, TeacherUncheckedUpdateWithoutUserInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ParentUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ParentCreateWithoutUserInput, ParentUncheckedCreateWithoutUserInput>
    connectOrCreate?: ParentCreateOrConnectWithoutUserInput
    upsert?: ParentUpsertWithoutUserInput
    disconnect?: ParentWhereInput | boolean
    delete?: ParentWhereInput | boolean
    connect?: ParentWhereUniqueInput
    update?: XOR<XOR<ParentUpdateToOneWithWhereWithoutUserInput, ParentUpdateWithoutUserInput>, ParentUncheckedUpdateWithoutUserInput>
  }

  export type PreRegistrationUncheckedUpdateManyWithoutProcessedByUserNestedInput = {
    create?: XOR<PreRegistrationCreateWithoutProcessedByUserInput, PreRegistrationUncheckedCreateWithoutProcessedByUserInput> | PreRegistrationCreateWithoutProcessedByUserInput[] | PreRegistrationUncheckedCreateWithoutProcessedByUserInput[]
    connectOrCreate?: PreRegistrationCreateOrConnectWithoutProcessedByUserInput | PreRegistrationCreateOrConnectWithoutProcessedByUserInput[]
    upsert?: PreRegistrationUpsertWithWhereUniqueWithoutProcessedByUserInput | PreRegistrationUpsertWithWhereUniqueWithoutProcessedByUserInput[]
    createMany?: PreRegistrationCreateManyProcessedByUserInputEnvelope
    set?: PreRegistrationWhereUniqueInput | PreRegistrationWhereUniqueInput[]
    disconnect?: PreRegistrationWhereUniqueInput | PreRegistrationWhereUniqueInput[]
    delete?: PreRegistrationWhereUniqueInput | PreRegistrationWhereUniqueInput[]
    connect?: PreRegistrationWhereUniqueInput | PreRegistrationWhereUniqueInput[]
    update?: PreRegistrationUpdateWithWhereUniqueWithoutProcessedByUserInput | PreRegistrationUpdateWithWhereUniqueWithoutProcessedByUserInput[]
    updateMany?: PreRegistrationUpdateManyWithWhereWithoutProcessedByUserInput | PreRegistrationUpdateManyWithWhereWithoutProcessedByUserInput[]
    deleteMany?: PreRegistrationScalarWhereInput | PreRegistrationScalarWhereInput[]
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput> | RefreshTokenCreateWithoutUserInput[] | RefreshTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshTokenCreateOrConnectWithoutUserInput | RefreshTokenCreateOrConnectWithoutUserInput[]
    upsert?: RefreshTokenUpsertWithWhereUniqueWithoutUserInput | RefreshTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshTokenCreateManyUserInputEnvelope
    set?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    disconnect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    delete?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    connect?: RefreshTokenWhereUniqueInput | RefreshTokenWhereUniqueInput[]
    update?: RefreshTokenUpdateWithWhereUniqueWithoutUserInput | RefreshTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshTokenUpdateManyWithWhereWithoutUserInput | RefreshTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
  }

  export type StudentUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<StudentCreateWithoutUserInput, StudentUncheckedCreateWithoutUserInput>
    connectOrCreate?: StudentCreateOrConnectWithoutUserInput
    upsert?: StudentUpsertWithoutUserInput
    disconnect?: StudentWhereInput | boolean
    delete?: StudentWhereInput | boolean
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutUserInput, StudentUpdateWithoutUserInput>, StudentUncheckedUpdateWithoutUserInput>
  }

  export type TeacherUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<TeacherCreateWithoutUserInput, TeacherUncheckedCreateWithoutUserInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutUserInput
    upsert?: TeacherUpsertWithoutUserInput
    disconnect?: TeacherWhereInput | boolean
    delete?: TeacherWhereInput | boolean
    connect?: TeacherWhereUniqueInput
    update?: XOR<XOR<TeacherUpdateToOneWithWhereWithoutUserInput, TeacherUpdateWithoutUserInput>, TeacherUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutRefreshTokensInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutRefreshTokensNestedInput = {
    create?: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshTokensInput
    upsert?: UserUpsertWithoutRefreshTokensInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRefreshTokensInput, UserUpdateWithoutRefreshTokensInput>, UserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type PreRegistrationCreatedocumentUrlsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutProcessedRegistrationsInput = {
    create?: XOR<UserCreateWithoutProcessedRegistrationsInput, UserUncheckedCreateWithoutProcessedRegistrationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProcessedRegistrationsInput
    connect?: UserWhereUniqueInput
  }

  export type StudentCreateNestedOneWithoutPreRegistrationInput = {
    create?: XOR<StudentCreateWithoutPreRegistrationInput, StudentUncheckedCreateWithoutPreRegistrationInput>
    connectOrCreate?: StudentCreateOrConnectWithoutPreRegistrationInput
    connect?: StudentWhereUniqueInput
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

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneWithoutProcessedRegistrationsNestedInput = {
    create?: XOR<UserCreateWithoutProcessedRegistrationsInput, UserUncheckedCreateWithoutProcessedRegistrationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutProcessedRegistrationsInput
    upsert?: UserUpsertWithoutProcessedRegistrationsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProcessedRegistrationsInput, UserUpdateWithoutProcessedRegistrationsInput>, UserUncheckedUpdateWithoutProcessedRegistrationsInput>
  }

  export type StudentUpdateOneWithoutPreRegistrationNestedInput = {
    create?: XOR<StudentCreateWithoutPreRegistrationInput, StudentUncheckedCreateWithoutPreRegistrationInput>
    connectOrCreate?: StudentCreateOrConnectWithoutPreRegistrationInput
    upsert?: StudentUpsertWithoutPreRegistrationInput
    disconnect?: StudentWhereInput | boolean
    delete?: StudentWhereInput | boolean
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutPreRegistrationInput, StudentUpdateWithoutPreRegistrationInput>, StudentUncheckedUpdateWithoutPreRegistrationInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type AbsenceCreateNestedManyWithoutStudentInput = {
    create?: XOR<AbsenceCreateWithoutStudentInput, AbsenceUncheckedCreateWithoutStudentInput> | AbsenceCreateWithoutStudentInput[] | AbsenceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AbsenceCreateOrConnectWithoutStudentInput | AbsenceCreateOrConnectWithoutStudentInput[]
    createMany?: AbsenceCreateManyStudentInputEnvelope
    connect?: AbsenceWhereUniqueInput | AbsenceWhereUniqueInput[]
  }

  export type MarkCreateNestedManyWithoutStudentInput = {
    create?: XOR<MarkCreateWithoutStudentInput, MarkUncheckedCreateWithoutStudentInput> | MarkCreateWithoutStudentInput[] | MarkUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: MarkCreateOrConnectWithoutStudentInput | MarkCreateOrConnectWithoutStudentInput[]
    createMany?: MarkCreateManyStudentInputEnvelope
    connect?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
  }

  export type PaymentCreateNestedManyWithoutStudentInput = {
    create?: XOR<PaymentCreateWithoutStudentInput, PaymentUncheckedCreateWithoutStudentInput> | PaymentCreateWithoutStudentInput[] | PaymentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutStudentInput | PaymentCreateOrConnectWithoutStudentInput[]
    createMany?: PaymentCreateManyStudentInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type PreRegistrationCreateNestedOneWithoutStudentInput = {
    create?: XOR<PreRegistrationCreateWithoutStudentInput, PreRegistrationUncheckedCreateWithoutStudentInput>
    connectOrCreate?: PreRegistrationCreateOrConnectWithoutStudentInput
    connect?: PreRegistrationWhereUniqueInput
  }

  export type ClassCreateNestedOneWithoutStudentsInput = {
    create?: XOR<ClassCreateWithoutStudentsInput, ClassUncheckedCreateWithoutStudentsInput>
    connectOrCreate?: ClassCreateOrConnectWithoutStudentsInput
    connect?: ClassWhereUniqueInput
  }

  export type ParentCreateNestedOneWithoutStudentsInput = {
    create?: XOR<ParentCreateWithoutStudentsInput, ParentUncheckedCreateWithoutStudentsInput>
    connectOrCreate?: ParentCreateOrConnectWithoutStudentsInput
    connect?: ParentWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutStudentInput = {
    create?: XOR<UserCreateWithoutStudentInput, UserUncheckedCreateWithoutStudentInput>
    connectOrCreate?: UserCreateOrConnectWithoutStudentInput
    connect?: UserWhereUniqueInput
  }

  export type AbsenceUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<AbsenceCreateWithoutStudentInput, AbsenceUncheckedCreateWithoutStudentInput> | AbsenceCreateWithoutStudentInput[] | AbsenceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AbsenceCreateOrConnectWithoutStudentInput | AbsenceCreateOrConnectWithoutStudentInput[]
    createMany?: AbsenceCreateManyStudentInputEnvelope
    connect?: AbsenceWhereUniqueInput | AbsenceWhereUniqueInput[]
  }

  export type MarkUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<MarkCreateWithoutStudentInput, MarkUncheckedCreateWithoutStudentInput> | MarkCreateWithoutStudentInput[] | MarkUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: MarkCreateOrConnectWithoutStudentInput | MarkCreateOrConnectWithoutStudentInput[]
    createMany?: MarkCreateManyStudentInputEnvelope
    connect?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
  }

  export type PaymentUncheckedCreateNestedManyWithoutStudentInput = {
    create?: XOR<PaymentCreateWithoutStudentInput, PaymentUncheckedCreateWithoutStudentInput> | PaymentCreateWithoutStudentInput[] | PaymentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutStudentInput | PaymentCreateOrConnectWithoutStudentInput[]
    createMany?: PaymentCreateManyStudentInputEnvelope
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
  }

  export type PreRegistrationUncheckedCreateNestedOneWithoutStudentInput = {
    create?: XOR<PreRegistrationCreateWithoutStudentInput, PreRegistrationUncheckedCreateWithoutStudentInput>
    connectOrCreate?: PreRegistrationCreateOrConnectWithoutStudentInput
    connect?: PreRegistrationWhereUniqueInput
  }

  export type EnumStudentStatusFieldUpdateOperationsInput = {
    set?: $Enums.StudentStatus
  }

  export type AbsenceUpdateManyWithoutStudentNestedInput = {
    create?: XOR<AbsenceCreateWithoutStudentInput, AbsenceUncheckedCreateWithoutStudentInput> | AbsenceCreateWithoutStudentInput[] | AbsenceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AbsenceCreateOrConnectWithoutStudentInput | AbsenceCreateOrConnectWithoutStudentInput[]
    upsert?: AbsenceUpsertWithWhereUniqueWithoutStudentInput | AbsenceUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: AbsenceCreateManyStudentInputEnvelope
    set?: AbsenceWhereUniqueInput | AbsenceWhereUniqueInput[]
    disconnect?: AbsenceWhereUniqueInput | AbsenceWhereUniqueInput[]
    delete?: AbsenceWhereUniqueInput | AbsenceWhereUniqueInput[]
    connect?: AbsenceWhereUniqueInput | AbsenceWhereUniqueInput[]
    update?: AbsenceUpdateWithWhereUniqueWithoutStudentInput | AbsenceUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: AbsenceUpdateManyWithWhereWithoutStudentInput | AbsenceUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: AbsenceScalarWhereInput | AbsenceScalarWhereInput[]
  }

  export type MarkUpdateManyWithoutStudentNestedInput = {
    create?: XOR<MarkCreateWithoutStudentInput, MarkUncheckedCreateWithoutStudentInput> | MarkCreateWithoutStudentInput[] | MarkUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: MarkCreateOrConnectWithoutStudentInput | MarkCreateOrConnectWithoutStudentInput[]
    upsert?: MarkUpsertWithWhereUniqueWithoutStudentInput | MarkUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: MarkCreateManyStudentInputEnvelope
    set?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    disconnect?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    delete?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    connect?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    update?: MarkUpdateWithWhereUniqueWithoutStudentInput | MarkUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: MarkUpdateManyWithWhereWithoutStudentInput | MarkUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: MarkScalarWhereInput | MarkScalarWhereInput[]
  }

  export type PaymentUpdateManyWithoutStudentNestedInput = {
    create?: XOR<PaymentCreateWithoutStudentInput, PaymentUncheckedCreateWithoutStudentInput> | PaymentCreateWithoutStudentInput[] | PaymentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutStudentInput | PaymentCreateOrConnectWithoutStudentInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutStudentInput | PaymentUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: PaymentCreateManyStudentInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutStudentInput | PaymentUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutStudentInput | PaymentUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type PreRegistrationUpdateOneWithoutStudentNestedInput = {
    create?: XOR<PreRegistrationCreateWithoutStudentInput, PreRegistrationUncheckedCreateWithoutStudentInput>
    connectOrCreate?: PreRegistrationCreateOrConnectWithoutStudentInput
    upsert?: PreRegistrationUpsertWithoutStudentInput
    disconnect?: PreRegistrationWhereInput | boolean
    delete?: PreRegistrationWhereInput | boolean
    connect?: PreRegistrationWhereUniqueInput
    update?: XOR<XOR<PreRegistrationUpdateToOneWithWhereWithoutStudentInput, PreRegistrationUpdateWithoutStudentInput>, PreRegistrationUncheckedUpdateWithoutStudentInput>
  }

  export type ClassUpdateOneWithoutStudentsNestedInput = {
    create?: XOR<ClassCreateWithoutStudentsInput, ClassUncheckedCreateWithoutStudentsInput>
    connectOrCreate?: ClassCreateOrConnectWithoutStudentsInput
    upsert?: ClassUpsertWithoutStudentsInput
    disconnect?: ClassWhereInput | boolean
    delete?: ClassWhereInput | boolean
    connect?: ClassWhereUniqueInput
    update?: XOR<XOR<ClassUpdateToOneWithWhereWithoutStudentsInput, ClassUpdateWithoutStudentsInput>, ClassUncheckedUpdateWithoutStudentsInput>
  }

  export type ParentUpdateOneWithoutStudentsNestedInput = {
    create?: XOR<ParentCreateWithoutStudentsInput, ParentUncheckedCreateWithoutStudentsInput>
    connectOrCreate?: ParentCreateOrConnectWithoutStudentsInput
    upsert?: ParentUpsertWithoutStudentsInput
    disconnect?: ParentWhereInput | boolean
    delete?: ParentWhereInput | boolean
    connect?: ParentWhereUniqueInput
    update?: XOR<XOR<ParentUpdateToOneWithWhereWithoutStudentsInput, ParentUpdateWithoutStudentsInput>, ParentUncheckedUpdateWithoutStudentsInput>
  }

  export type UserUpdateOneRequiredWithoutStudentNestedInput = {
    create?: XOR<UserCreateWithoutStudentInput, UserUncheckedCreateWithoutStudentInput>
    connectOrCreate?: UserCreateOrConnectWithoutStudentInput
    upsert?: UserUpsertWithoutStudentInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutStudentInput, UserUpdateWithoutStudentInput>, UserUncheckedUpdateWithoutStudentInput>
  }

  export type AbsenceUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<AbsenceCreateWithoutStudentInput, AbsenceUncheckedCreateWithoutStudentInput> | AbsenceCreateWithoutStudentInput[] | AbsenceUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: AbsenceCreateOrConnectWithoutStudentInput | AbsenceCreateOrConnectWithoutStudentInput[]
    upsert?: AbsenceUpsertWithWhereUniqueWithoutStudentInput | AbsenceUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: AbsenceCreateManyStudentInputEnvelope
    set?: AbsenceWhereUniqueInput | AbsenceWhereUniqueInput[]
    disconnect?: AbsenceWhereUniqueInput | AbsenceWhereUniqueInput[]
    delete?: AbsenceWhereUniqueInput | AbsenceWhereUniqueInput[]
    connect?: AbsenceWhereUniqueInput | AbsenceWhereUniqueInput[]
    update?: AbsenceUpdateWithWhereUniqueWithoutStudentInput | AbsenceUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: AbsenceUpdateManyWithWhereWithoutStudentInput | AbsenceUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: AbsenceScalarWhereInput | AbsenceScalarWhereInput[]
  }

  export type MarkUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<MarkCreateWithoutStudentInput, MarkUncheckedCreateWithoutStudentInput> | MarkCreateWithoutStudentInput[] | MarkUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: MarkCreateOrConnectWithoutStudentInput | MarkCreateOrConnectWithoutStudentInput[]
    upsert?: MarkUpsertWithWhereUniqueWithoutStudentInput | MarkUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: MarkCreateManyStudentInputEnvelope
    set?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    disconnect?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    delete?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    connect?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    update?: MarkUpdateWithWhereUniqueWithoutStudentInput | MarkUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: MarkUpdateManyWithWhereWithoutStudentInput | MarkUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: MarkScalarWhereInput | MarkScalarWhereInput[]
  }

  export type PaymentUncheckedUpdateManyWithoutStudentNestedInput = {
    create?: XOR<PaymentCreateWithoutStudentInput, PaymentUncheckedCreateWithoutStudentInput> | PaymentCreateWithoutStudentInput[] | PaymentUncheckedCreateWithoutStudentInput[]
    connectOrCreate?: PaymentCreateOrConnectWithoutStudentInput | PaymentCreateOrConnectWithoutStudentInput[]
    upsert?: PaymentUpsertWithWhereUniqueWithoutStudentInput | PaymentUpsertWithWhereUniqueWithoutStudentInput[]
    createMany?: PaymentCreateManyStudentInputEnvelope
    set?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    disconnect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    delete?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    connect?: PaymentWhereUniqueInput | PaymentWhereUniqueInput[]
    update?: PaymentUpdateWithWhereUniqueWithoutStudentInput | PaymentUpdateWithWhereUniqueWithoutStudentInput[]
    updateMany?: PaymentUpdateManyWithWhereWithoutStudentInput | PaymentUpdateManyWithWhereWithoutStudentInput[]
    deleteMany?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
  }

  export type PreRegistrationUncheckedUpdateOneWithoutStudentNestedInput = {
    create?: XOR<PreRegistrationCreateWithoutStudentInput, PreRegistrationUncheckedCreateWithoutStudentInput>
    connectOrCreate?: PreRegistrationCreateOrConnectWithoutStudentInput
    upsert?: PreRegistrationUpsertWithoutStudentInput
    disconnect?: PreRegistrationWhereInput | boolean
    delete?: PreRegistrationWhereInput | boolean
    connect?: PreRegistrationWhereUniqueInput
    update?: XOR<XOR<PreRegistrationUpdateToOneWithWhereWithoutStudentInput, PreRegistrationUpdateWithoutStudentInput>, PreRegistrationUncheckedUpdateWithoutStudentInput>
  }

  export type UserCreateNestedOneWithoutParentInput = {
    create?: XOR<UserCreateWithoutParentInput, UserUncheckedCreateWithoutParentInput>
    connectOrCreate?: UserCreateOrConnectWithoutParentInput
    connect?: UserWhereUniqueInput
  }

  export type StudentCreateNestedManyWithoutParentInput = {
    create?: XOR<StudentCreateWithoutParentInput, StudentUncheckedCreateWithoutParentInput> | StudentCreateWithoutParentInput[] | StudentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutParentInput | StudentCreateOrConnectWithoutParentInput[]
    createMany?: StudentCreateManyParentInputEnvelope
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
  }

  export type StudentUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<StudentCreateWithoutParentInput, StudentUncheckedCreateWithoutParentInput> | StudentCreateWithoutParentInput[] | StudentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutParentInput | StudentCreateOrConnectWithoutParentInput[]
    createMany?: StudentCreateManyParentInputEnvelope
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutParentNestedInput = {
    create?: XOR<UserCreateWithoutParentInput, UserUncheckedCreateWithoutParentInput>
    connectOrCreate?: UserCreateOrConnectWithoutParentInput
    upsert?: UserUpsertWithoutParentInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutParentInput, UserUpdateWithoutParentInput>, UserUncheckedUpdateWithoutParentInput>
  }

  export type StudentUpdateManyWithoutParentNestedInput = {
    create?: XOR<StudentCreateWithoutParentInput, StudentUncheckedCreateWithoutParentInput> | StudentCreateWithoutParentInput[] | StudentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutParentInput | StudentCreateOrConnectWithoutParentInput[]
    upsert?: StudentUpsertWithWhereUniqueWithoutParentInput | StudentUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: StudentCreateManyParentInputEnvelope
    set?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    disconnect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    delete?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    update?: StudentUpdateWithWhereUniqueWithoutParentInput | StudentUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: StudentUpdateManyWithWhereWithoutParentInput | StudentUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: StudentScalarWhereInput | StudentScalarWhereInput[]
  }

  export type StudentUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<StudentCreateWithoutParentInput, StudentUncheckedCreateWithoutParentInput> | StudentCreateWithoutParentInput[] | StudentUncheckedCreateWithoutParentInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutParentInput | StudentCreateOrConnectWithoutParentInput[]
    upsert?: StudentUpsertWithWhereUniqueWithoutParentInput | StudentUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: StudentCreateManyParentInputEnvelope
    set?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    disconnect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    delete?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    update?: StudentUpdateWithWhereUniqueWithoutParentInput | StudentUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: StudentUpdateManyWithWhereWithoutParentInput | StudentUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: StudentScalarWhereInput | StudentScalarWhereInput[]
  }

  export type StudentCreateNestedManyWithoutClassInput = {
    create?: XOR<StudentCreateWithoutClassInput, StudentUncheckedCreateWithoutClassInput> | StudentCreateWithoutClassInput[] | StudentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutClassInput | StudentCreateOrConnectWithoutClassInput[]
    createMany?: StudentCreateManyClassInputEnvelope
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
  }

  export type TeacherCreateNestedOneWithoutHeadOfClassesInput = {
    create?: XOR<TeacherCreateWithoutHeadOfClassesInput, TeacherUncheckedCreateWithoutHeadOfClassesInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutHeadOfClassesInput
    connect?: TeacherWhereUniqueInput
  }

  export type TeacherSubjectClassCreateNestedManyWithoutClassInput = {
    create?: XOR<TeacherSubjectClassCreateWithoutClassInput, TeacherSubjectClassUncheckedCreateWithoutClassInput> | TeacherSubjectClassCreateWithoutClassInput[] | TeacherSubjectClassUncheckedCreateWithoutClassInput[]
    connectOrCreate?: TeacherSubjectClassCreateOrConnectWithoutClassInput | TeacherSubjectClassCreateOrConnectWithoutClassInput[]
    createMany?: TeacherSubjectClassCreateManyClassInputEnvelope
    connect?: TeacherSubjectClassWhereUniqueInput | TeacherSubjectClassWhereUniqueInput[]
  }

  export type MarkCreateNestedManyWithoutClassInput = {
    create?: XOR<MarkCreateWithoutClassInput, MarkUncheckedCreateWithoutClassInput> | MarkCreateWithoutClassInput[] | MarkUncheckedCreateWithoutClassInput[]
    connectOrCreate?: MarkCreateOrConnectWithoutClassInput | MarkCreateOrConnectWithoutClassInput[]
    createMany?: MarkCreateManyClassInputEnvelope
    connect?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
  }

  export type AbsenceCreateNestedManyWithoutClassInput = {
    create?: XOR<AbsenceCreateWithoutClassInput, AbsenceUncheckedCreateWithoutClassInput> | AbsenceCreateWithoutClassInput[] | AbsenceUncheckedCreateWithoutClassInput[]
    connectOrCreate?: AbsenceCreateOrConnectWithoutClassInput | AbsenceCreateOrConnectWithoutClassInput[]
    createMany?: AbsenceCreateManyClassInputEnvelope
    connect?: AbsenceWhereUniqueInput | AbsenceWhereUniqueInput[]
  }

  export type StudentUncheckedCreateNestedManyWithoutClassInput = {
    create?: XOR<StudentCreateWithoutClassInput, StudentUncheckedCreateWithoutClassInput> | StudentCreateWithoutClassInput[] | StudentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutClassInput | StudentCreateOrConnectWithoutClassInput[]
    createMany?: StudentCreateManyClassInputEnvelope
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
  }

  export type TeacherSubjectClassUncheckedCreateNestedManyWithoutClassInput = {
    create?: XOR<TeacherSubjectClassCreateWithoutClassInput, TeacherSubjectClassUncheckedCreateWithoutClassInput> | TeacherSubjectClassCreateWithoutClassInput[] | TeacherSubjectClassUncheckedCreateWithoutClassInput[]
    connectOrCreate?: TeacherSubjectClassCreateOrConnectWithoutClassInput | TeacherSubjectClassCreateOrConnectWithoutClassInput[]
    createMany?: TeacherSubjectClassCreateManyClassInputEnvelope
    connect?: TeacherSubjectClassWhereUniqueInput | TeacherSubjectClassWhereUniqueInput[]
  }

  export type MarkUncheckedCreateNestedManyWithoutClassInput = {
    create?: XOR<MarkCreateWithoutClassInput, MarkUncheckedCreateWithoutClassInput> | MarkCreateWithoutClassInput[] | MarkUncheckedCreateWithoutClassInput[]
    connectOrCreate?: MarkCreateOrConnectWithoutClassInput | MarkCreateOrConnectWithoutClassInput[]
    createMany?: MarkCreateManyClassInputEnvelope
    connect?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
  }

  export type AbsenceUncheckedCreateNestedManyWithoutClassInput = {
    create?: XOR<AbsenceCreateWithoutClassInput, AbsenceUncheckedCreateWithoutClassInput> | AbsenceCreateWithoutClassInput[] | AbsenceUncheckedCreateWithoutClassInput[]
    connectOrCreate?: AbsenceCreateOrConnectWithoutClassInput | AbsenceCreateOrConnectWithoutClassInput[]
    createMany?: AbsenceCreateManyClassInputEnvelope
    connect?: AbsenceWhereUniqueInput | AbsenceWhereUniqueInput[]
  }

  export type StudentUpdateManyWithoutClassNestedInput = {
    create?: XOR<StudentCreateWithoutClassInput, StudentUncheckedCreateWithoutClassInput> | StudentCreateWithoutClassInput[] | StudentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutClassInput | StudentCreateOrConnectWithoutClassInput[]
    upsert?: StudentUpsertWithWhereUniqueWithoutClassInput | StudentUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: StudentCreateManyClassInputEnvelope
    set?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    disconnect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    delete?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    update?: StudentUpdateWithWhereUniqueWithoutClassInput | StudentUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: StudentUpdateManyWithWhereWithoutClassInput | StudentUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: StudentScalarWhereInput | StudentScalarWhereInput[]
  }

  export type TeacherUpdateOneWithoutHeadOfClassesNestedInput = {
    create?: XOR<TeacherCreateWithoutHeadOfClassesInput, TeacherUncheckedCreateWithoutHeadOfClassesInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutHeadOfClassesInput
    upsert?: TeacherUpsertWithoutHeadOfClassesInput
    disconnect?: TeacherWhereInput | boolean
    delete?: TeacherWhereInput | boolean
    connect?: TeacherWhereUniqueInput
    update?: XOR<XOR<TeacherUpdateToOneWithWhereWithoutHeadOfClassesInput, TeacherUpdateWithoutHeadOfClassesInput>, TeacherUncheckedUpdateWithoutHeadOfClassesInput>
  }

  export type TeacherSubjectClassUpdateManyWithoutClassNestedInput = {
    create?: XOR<TeacherSubjectClassCreateWithoutClassInput, TeacherSubjectClassUncheckedCreateWithoutClassInput> | TeacherSubjectClassCreateWithoutClassInput[] | TeacherSubjectClassUncheckedCreateWithoutClassInput[]
    connectOrCreate?: TeacherSubjectClassCreateOrConnectWithoutClassInput | TeacherSubjectClassCreateOrConnectWithoutClassInput[]
    upsert?: TeacherSubjectClassUpsertWithWhereUniqueWithoutClassInput | TeacherSubjectClassUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: TeacherSubjectClassCreateManyClassInputEnvelope
    set?: TeacherSubjectClassWhereUniqueInput | TeacherSubjectClassWhereUniqueInput[]
    disconnect?: TeacherSubjectClassWhereUniqueInput | TeacherSubjectClassWhereUniqueInput[]
    delete?: TeacherSubjectClassWhereUniqueInput | TeacherSubjectClassWhereUniqueInput[]
    connect?: TeacherSubjectClassWhereUniqueInput | TeacherSubjectClassWhereUniqueInput[]
    update?: TeacherSubjectClassUpdateWithWhereUniqueWithoutClassInput | TeacherSubjectClassUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: TeacherSubjectClassUpdateManyWithWhereWithoutClassInput | TeacherSubjectClassUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: TeacherSubjectClassScalarWhereInput | TeacherSubjectClassScalarWhereInput[]
  }

  export type MarkUpdateManyWithoutClassNestedInput = {
    create?: XOR<MarkCreateWithoutClassInput, MarkUncheckedCreateWithoutClassInput> | MarkCreateWithoutClassInput[] | MarkUncheckedCreateWithoutClassInput[]
    connectOrCreate?: MarkCreateOrConnectWithoutClassInput | MarkCreateOrConnectWithoutClassInput[]
    upsert?: MarkUpsertWithWhereUniqueWithoutClassInput | MarkUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: MarkCreateManyClassInputEnvelope
    set?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    disconnect?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    delete?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    connect?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    update?: MarkUpdateWithWhereUniqueWithoutClassInput | MarkUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: MarkUpdateManyWithWhereWithoutClassInput | MarkUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: MarkScalarWhereInput | MarkScalarWhereInput[]
  }

  export type AbsenceUpdateManyWithoutClassNestedInput = {
    create?: XOR<AbsenceCreateWithoutClassInput, AbsenceUncheckedCreateWithoutClassInput> | AbsenceCreateWithoutClassInput[] | AbsenceUncheckedCreateWithoutClassInput[]
    connectOrCreate?: AbsenceCreateOrConnectWithoutClassInput | AbsenceCreateOrConnectWithoutClassInput[]
    upsert?: AbsenceUpsertWithWhereUniqueWithoutClassInput | AbsenceUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: AbsenceCreateManyClassInputEnvelope
    set?: AbsenceWhereUniqueInput | AbsenceWhereUniqueInput[]
    disconnect?: AbsenceWhereUniqueInput | AbsenceWhereUniqueInput[]
    delete?: AbsenceWhereUniqueInput | AbsenceWhereUniqueInput[]
    connect?: AbsenceWhereUniqueInput | AbsenceWhereUniqueInput[]
    update?: AbsenceUpdateWithWhereUniqueWithoutClassInput | AbsenceUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: AbsenceUpdateManyWithWhereWithoutClassInput | AbsenceUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: AbsenceScalarWhereInput | AbsenceScalarWhereInput[]
  }

  export type StudentUncheckedUpdateManyWithoutClassNestedInput = {
    create?: XOR<StudentCreateWithoutClassInput, StudentUncheckedCreateWithoutClassInput> | StudentCreateWithoutClassInput[] | StudentUncheckedCreateWithoutClassInput[]
    connectOrCreate?: StudentCreateOrConnectWithoutClassInput | StudentCreateOrConnectWithoutClassInput[]
    upsert?: StudentUpsertWithWhereUniqueWithoutClassInput | StudentUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: StudentCreateManyClassInputEnvelope
    set?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    disconnect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    delete?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    connect?: StudentWhereUniqueInput | StudentWhereUniqueInput[]
    update?: StudentUpdateWithWhereUniqueWithoutClassInput | StudentUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: StudentUpdateManyWithWhereWithoutClassInput | StudentUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: StudentScalarWhereInput | StudentScalarWhereInput[]
  }

  export type TeacherSubjectClassUncheckedUpdateManyWithoutClassNestedInput = {
    create?: XOR<TeacherSubjectClassCreateWithoutClassInput, TeacherSubjectClassUncheckedCreateWithoutClassInput> | TeacherSubjectClassCreateWithoutClassInput[] | TeacherSubjectClassUncheckedCreateWithoutClassInput[]
    connectOrCreate?: TeacherSubjectClassCreateOrConnectWithoutClassInput | TeacherSubjectClassCreateOrConnectWithoutClassInput[]
    upsert?: TeacherSubjectClassUpsertWithWhereUniqueWithoutClassInput | TeacherSubjectClassUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: TeacherSubjectClassCreateManyClassInputEnvelope
    set?: TeacherSubjectClassWhereUniqueInput | TeacherSubjectClassWhereUniqueInput[]
    disconnect?: TeacherSubjectClassWhereUniqueInput | TeacherSubjectClassWhereUniqueInput[]
    delete?: TeacherSubjectClassWhereUniqueInput | TeacherSubjectClassWhereUniqueInput[]
    connect?: TeacherSubjectClassWhereUniqueInput | TeacherSubjectClassWhereUniqueInput[]
    update?: TeacherSubjectClassUpdateWithWhereUniqueWithoutClassInput | TeacherSubjectClassUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: TeacherSubjectClassUpdateManyWithWhereWithoutClassInput | TeacherSubjectClassUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: TeacherSubjectClassScalarWhereInput | TeacherSubjectClassScalarWhereInput[]
  }

  export type MarkUncheckedUpdateManyWithoutClassNestedInput = {
    create?: XOR<MarkCreateWithoutClassInput, MarkUncheckedCreateWithoutClassInput> | MarkCreateWithoutClassInput[] | MarkUncheckedCreateWithoutClassInput[]
    connectOrCreate?: MarkCreateOrConnectWithoutClassInput | MarkCreateOrConnectWithoutClassInput[]
    upsert?: MarkUpsertWithWhereUniqueWithoutClassInput | MarkUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: MarkCreateManyClassInputEnvelope
    set?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    disconnect?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    delete?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    connect?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    update?: MarkUpdateWithWhereUniqueWithoutClassInput | MarkUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: MarkUpdateManyWithWhereWithoutClassInput | MarkUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: MarkScalarWhereInput | MarkScalarWhereInput[]
  }

  export type AbsenceUncheckedUpdateManyWithoutClassNestedInput = {
    create?: XOR<AbsenceCreateWithoutClassInput, AbsenceUncheckedCreateWithoutClassInput> | AbsenceCreateWithoutClassInput[] | AbsenceUncheckedCreateWithoutClassInput[]
    connectOrCreate?: AbsenceCreateOrConnectWithoutClassInput | AbsenceCreateOrConnectWithoutClassInput[]
    upsert?: AbsenceUpsertWithWhereUniqueWithoutClassInput | AbsenceUpsertWithWhereUniqueWithoutClassInput[]
    createMany?: AbsenceCreateManyClassInputEnvelope
    set?: AbsenceWhereUniqueInput | AbsenceWhereUniqueInput[]
    disconnect?: AbsenceWhereUniqueInput | AbsenceWhereUniqueInput[]
    delete?: AbsenceWhereUniqueInput | AbsenceWhereUniqueInput[]
    connect?: AbsenceWhereUniqueInput | AbsenceWhereUniqueInput[]
    update?: AbsenceUpdateWithWhereUniqueWithoutClassInput | AbsenceUpdateWithWhereUniqueWithoutClassInput[]
    updateMany?: AbsenceUpdateManyWithWhereWithoutClassInput | AbsenceUpdateManyWithWhereWithoutClassInput[]
    deleteMany?: AbsenceScalarWhereInput | AbsenceScalarWhereInput[]
  }

  export type TeacherSubjectClassCreateNestedManyWithoutSubjectInput = {
    create?: XOR<TeacherSubjectClassCreateWithoutSubjectInput, TeacherSubjectClassUncheckedCreateWithoutSubjectInput> | TeacherSubjectClassCreateWithoutSubjectInput[] | TeacherSubjectClassUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: TeacherSubjectClassCreateOrConnectWithoutSubjectInput | TeacherSubjectClassCreateOrConnectWithoutSubjectInput[]
    createMany?: TeacherSubjectClassCreateManySubjectInputEnvelope
    connect?: TeacherSubjectClassWhereUniqueInput | TeacherSubjectClassWhereUniqueInput[]
  }

  export type MarkCreateNestedManyWithoutSubjectRefInput = {
    create?: XOR<MarkCreateWithoutSubjectRefInput, MarkUncheckedCreateWithoutSubjectRefInput> | MarkCreateWithoutSubjectRefInput[] | MarkUncheckedCreateWithoutSubjectRefInput[]
    connectOrCreate?: MarkCreateOrConnectWithoutSubjectRefInput | MarkCreateOrConnectWithoutSubjectRefInput[]
    createMany?: MarkCreateManySubjectRefInputEnvelope
    connect?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
  }

  export type TeacherSubjectClassUncheckedCreateNestedManyWithoutSubjectInput = {
    create?: XOR<TeacherSubjectClassCreateWithoutSubjectInput, TeacherSubjectClassUncheckedCreateWithoutSubjectInput> | TeacherSubjectClassCreateWithoutSubjectInput[] | TeacherSubjectClassUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: TeacherSubjectClassCreateOrConnectWithoutSubjectInput | TeacherSubjectClassCreateOrConnectWithoutSubjectInput[]
    createMany?: TeacherSubjectClassCreateManySubjectInputEnvelope
    connect?: TeacherSubjectClassWhereUniqueInput | TeacherSubjectClassWhereUniqueInput[]
  }

  export type MarkUncheckedCreateNestedManyWithoutSubjectRefInput = {
    create?: XOR<MarkCreateWithoutSubjectRefInput, MarkUncheckedCreateWithoutSubjectRefInput> | MarkCreateWithoutSubjectRefInput[] | MarkUncheckedCreateWithoutSubjectRefInput[]
    connectOrCreate?: MarkCreateOrConnectWithoutSubjectRefInput | MarkCreateOrConnectWithoutSubjectRefInput[]
    createMany?: MarkCreateManySubjectRefInputEnvelope
    connect?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
  }

  export type TeacherSubjectClassUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<TeacherSubjectClassCreateWithoutSubjectInput, TeacherSubjectClassUncheckedCreateWithoutSubjectInput> | TeacherSubjectClassCreateWithoutSubjectInput[] | TeacherSubjectClassUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: TeacherSubjectClassCreateOrConnectWithoutSubjectInput | TeacherSubjectClassCreateOrConnectWithoutSubjectInput[]
    upsert?: TeacherSubjectClassUpsertWithWhereUniqueWithoutSubjectInput | TeacherSubjectClassUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: TeacherSubjectClassCreateManySubjectInputEnvelope
    set?: TeacherSubjectClassWhereUniqueInput | TeacherSubjectClassWhereUniqueInput[]
    disconnect?: TeacherSubjectClassWhereUniqueInput | TeacherSubjectClassWhereUniqueInput[]
    delete?: TeacherSubjectClassWhereUniqueInput | TeacherSubjectClassWhereUniqueInput[]
    connect?: TeacherSubjectClassWhereUniqueInput | TeacherSubjectClassWhereUniqueInput[]
    update?: TeacherSubjectClassUpdateWithWhereUniqueWithoutSubjectInput | TeacherSubjectClassUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: TeacherSubjectClassUpdateManyWithWhereWithoutSubjectInput | TeacherSubjectClassUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: TeacherSubjectClassScalarWhereInput | TeacherSubjectClassScalarWhereInput[]
  }

  export type MarkUpdateManyWithoutSubjectRefNestedInput = {
    create?: XOR<MarkCreateWithoutSubjectRefInput, MarkUncheckedCreateWithoutSubjectRefInput> | MarkCreateWithoutSubjectRefInput[] | MarkUncheckedCreateWithoutSubjectRefInput[]
    connectOrCreate?: MarkCreateOrConnectWithoutSubjectRefInput | MarkCreateOrConnectWithoutSubjectRefInput[]
    upsert?: MarkUpsertWithWhereUniqueWithoutSubjectRefInput | MarkUpsertWithWhereUniqueWithoutSubjectRefInput[]
    createMany?: MarkCreateManySubjectRefInputEnvelope
    set?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    disconnect?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    delete?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    connect?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    update?: MarkUpdateWithWhereUniqueWithoutSubjectRefInput | MarkUpdateWithWhereUniqueWithoutSubjectRefInput[]
    updateMany?: MarkUpdateManyWithWhereWithoutSubjectRefInput | MarkUpdateManyWithWhereWithoutSubjectRefInput[]
    deleteMany?: MarkScalarWhereInput | MarkScalarWhereInput[]
  }

  export type TeacherSubjectClassUncheckedUpdateManyWithoutSubjectNestedInput = {
    create?: XOR<TeacherSubjectClassCreateWithoutSubjectInput, TeacherSubjectClassUncheckedCreateWithoutSubjectInput> | TeacherSubjectClassCreateWithoutSubjectInput[] | TeacherSubjectClassUncheckedCreateWithoutSubjectInput[]
    connectOrCreate?: TeacherSubjectClassCreateOrConnectWithoutSubjectInput | TeacherSubjectClassCreateOrConnectWithoutSubjectInput[]
    upsert?: TeacherSubjectClassUpsertWithWhereUniqueWithoutSubjectInput | TeacherSubjectClassUpsertWithWhereUniqueWithoutSubjectInput[]
    createMany?: TeacherSubjectClassCreateManySubjectInputEnvelope
    set?: TeacherSubjectClassWhereUniqueInput | TeacherSubjectClassWhereUniqueInput[]
    disconnect?: TeacherSubjectClassWhereUniqueInput | TeacherSubjectClassWhereUniqueInput[]
    delete?: TeacherSubjectClassWhereUniqueInput | TeacherSubjectClassWhereUniqueInput[]
    connect?: TeacherSubjectClassWhereUniqueInput | TeacherSubjectClassWhereUniqueInput[]
    update?: TeacherSubjectClassUpdateWithWhereUniqueWithoutSubjectInput | TeacherSubjectClassUpdateWithWhereUniqueWithoutSubjectInput[]
    updateMany?: TeacherSubjectClassUpdateManyWithWhereWithoutSubjectInput | TeacherSubjectClassUpdateManyWithWhereWithoutSubjectInput[]
    deleteMany?: TeacherSubjectClassScalarWhereInput | TeacherSubjectClassScalarWhereInput[]
  }

  export type MarkUncheckedUpdateManyWithoutSubjectRefNestedInput = {
    create?: XOR<MarkCreateWithoutSubjectRefInput, MarkUncheckedCreateWithoutSubjectRefInput> | MarkCreateWithoutSubjectRefInput[] | MarkUncheckedCreateWithoutSubjectRefInput[]
    connectOrCreate?: MarkCreateOrConnectWithoutSubjectRefInput | MarkCreateOrConnectWithoutSubjectRefInput[]
    upsert?: MarkUpsertWithWhereUniqueWithoutSubjectRefInput | MarkUpsertWithWhereUniqueWithoutSubjectRefInput[]
    createMany?: MarkCreateManySubjectRefInputEnvelope
    set?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    disconnect?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    delete?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    connect?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    update?: MarkUpdateWithWhereUniqueWithoutSubjectRefInput | MarkUpdateWithWhereUniqueWithoutSubjectRefInput[]
    updateMany?: MarkUpdateManyWithWhereWithoutSubjectRefInput | MarkUpdateManyWithWhereWithoutSubjectRefInput[]
    deleteMany?: MarkScalarWhereInput | MarkScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTeacherInput = {
    create?: XOR<UserCreateWithoutTeacherInput, UserUncheckedCreateWithoutTeacherInput>
    connectOrCreate?: UserCreateOrConnectWithoutTeacherInput
    connect?: UserWhereUniqueInput
  }

  export type ClassCreateNestedManyWithoutHeadTeacherInput = {
    create?: XOR<ClassCreateWithoutHeadTeacherInput, ClassUncheckedCreateWithoutHeadTeacherInput> | ClassCreateWithoutHeadTeacherInput[] | ClassUncheckedCreateWithoutHeadTeacherInput[]
    connectOrCreate?: ClassCreateOrConnectWithoutHeadTeacherInput | ClassCreateOrConnectWithoutHeadTeacherInput[]
    createMany?: ClassCreateManyHeadTeacherInputEnvelope
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
  }

  export type TeacherSubjectClassCreateNestedManyWithoutTeacherInput = {
    create?: XOR<TeacherSubjectClassCreateWithoutTeacherInput, TeacherSubjectClassUncheckedCreateWithoutTeacherInput> | TeacherSubjectClassCreateWithoutTeacherInput[] | TeacherSubjectClassUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: TeacherSubjectClassCreateOrConnectWithoutTeacherInput | TeacherSubjectClassCreateOrConnectWithoutTeacherInput[]
    createMany?: TeacherSubjectClassCreateManyTeacherInputEnvelope
    connect?: TeacherSubjectClassWhereUniqueInput | TeacherSubjectClassWhereUniqueInput[]
  }

  export type MarkCreateNestedManyWithoutTeacherInput = {
    create?: XOR<MarkCreateWithoutTeacherInput, MarkUncheckedCreateWithoutTeacherInput> | MarkCreateWithoutTeacherInput[] | MarkUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: MarkCreateOrConnectWithoutTeacherInput | MarkCreateOrConnectWithoutTeacherInput[]
    createMany?: MarkCreateManyTeacherInputEnvelope
    connect?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
  }

  export type AbsenceCreateNestedManyWithoutTeacherInput = {
    create?: XOR<AbsenceCreateWithoutTeacherInput, AbsenceUncheckedCreateWithoutTeacherInput> | AbsenceCreateWithoutTeacherInput[] | AbsenceUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: AbsenceCreateOrConnectWithoutTeacherInput | AbsenceCreateOrConnectWithoutTeacherInput[]
    createMany?: AbsenceCreateManyTeacherInputEnvelope
    connect?: AbsenceWhereUniqueInput | AbsenceWhereUniqueInput[]
  }

  export type ClassUncheckedCreateNestedManyWithoutHeadTeacherInput = {
    create?: XOR<ClassCreateWithoutHeadTeacherInput, ClassUncheckedCreateWithoutHeadTeacherInput> | ClassCreateWithoutHeadTeacherInput[] | ClassUncheckedCreateWithoutHeadTeacherInput[]
    connectOrCreate?: ClassCreateOrConnectWithoutHeadTeacherInput | ClassCreateOrConnectWithoutHeadTeacherInput[]
    createMany?: ClassCreateManyHeadTeacherInputEnvelope
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
  }

  export type TeacherSubjectClassUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<TeacherSubjectClassCreateWithoutTeacherInput, TeacherSubjectClassUncheckedCreateWithoutTeacherInput> | TeacherSubjectClassCreateWithoutTeacherInput[] | TeacherSubjectClassUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: TeacherSubjectClassCreateOrConnectWithoutTeacherInput | TeacherSubjectClassCreateOrConnectWithoutTeacherInput[]
    createMany?: TeacherSubjectClassCreateManyTeacherInputEnvelope
    connect?: TeacherSubjectClassWhereUniqueInput | TeacherSubjectClassWhereUniqueInput[]
  }

  export type MarkUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<MarkCreateWithoutTeacherInput, MarkUncheckedCreateWithoutTeacherInput> | MarkCreateWithoutTeacherInput[] | MarkUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: MarkCreateOrConnectWithoutTeacherInput | MarkCreateOrConnectWithoutTeacherInput[]
    createMany?: MarkCreateManyTeacherInputEnvelope
    connect?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
  }

  export type AbsenceUncheckedCreateNestedManyWithoutTeacherInput = {
    create?: XOR<AbsenceCreateWithoutTeacherInput, AbsenceUncheckedCreateWithoutTeacherInput> | AbsenceCreateWithoutTeacherInput[] | AbsenceUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: AbsenceCreateOrConnectWithoutTeacherInput | AbsenceCreateOrConnectWithoutTeacherInput[]
    createMany?: AbsenceCreateManyTeacherInputEnvelope
    connect?: AbsenceWhereUniqueInput | AbsenceWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutTeacherNestedInput = {
    create?: XOR<UserCreateWithoutTeacherInput, UserUncheckedCreateWithoutTeacherInput>
    connectOrCreate?: UserCreateOrConnectWithoutTeacherInput
    upsert?: UserUpsertWithoutTeacherInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTeacherInput, UserUpdateWithoutTeacherInput>, UserUncheckedUpdateWithoutTeacherInput>
  }

  export type ClassUpdateManyWithoutHeadTeacherNestedInput = {
    create?: XOR<ClassCreateWithoutHeadTeacherInput, ClassUncheckedCreateWithoutHeadTeacherInput> | ClassCreateWithoutHeadTeacherInput[] | ClassUncheckedCreateWithoutHeadTeacherInput[]
    connectOrCreate?: ClassCreateOrConnectWithoutHeadTeacherInput | ClassCreateOrConnectWithoutHeadTeacherInput[]
    upsert?: ClassUpsertWithWhereUniqueWithoutHeadTeacherInput | ClassUpsertWithWhereUniqueWithoutHeadTeacherInput[]
    createMany?: ClassCreateManyHeadTeacherInputEnvelope
    set?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    disconnect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    delete?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    update?: ClassUpdateWithWhereUniqueWithoutHeadTeacherInput | ClassUpdateWithWhereUniqueWithoutHeadTeacherInput[]
    updateMany?: ClassUpdateManyWithWhereWithoutHeadTeacherInput | ClassUpdateManyWithWhereWithoutHeadTeacherInput[]
    deleteMany?: ClassScalarWhereInput | ClassScalarWhereInput[]
  }

  export type TeacherSubjectClassUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<TeacherSubjectClassCreateWithoutTeacherInput, TeacherSubjectClassUncheckedCreateWithoutTeacherInput> | TeacherSubjectClassCreateWithoutTeacherInput[] | TeacherSubjectClassUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: TeacherSubjectClassCreateOrConnectWithoutTeacherInput | TeacherSubjectClassCreateOrConnectWithoutTeacherInput[]
    upsert?: TeacherSubjectClassUpsertWithWhereUniqueWithoutTeacherInput | TeacherSubjectClassUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: TeacherSubjectClassCreateManyTeacherInputEnvelope
    set?: TeacherSubjectClassWhereUniqueInput | TeacherSubjectClassWhereUniqueInput[]
    disconnect?: TeacherSubjectClassWhereUniqueInput | TeacherSubjectClassWhereUniqueInput[]
    delete?: TeacherSubjectClassWhereUniqueInput | TeacherSubjectClassWhereUniqueInput[]
    connect?: TeacherSubjectClassWhereUniqueInput | TeacherSubjectClassWhereUniqueInput[]
    update?: TeacherSubjectClassUpdateWithWhereUniqueWithoutTeacherInput | TeacherSubjectClassUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: TeacherSubjectClassUpdateManyWithWhereWithoutTeacherInput | TeacherSubjectClassUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: TeacherSubjectClassScalarWhereInput | TeacherSubjectClassScalarWhereInput[]
  }

  export type MarkUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<MarkCreateWithoutTeacherInput, MarkUncheckedCreateWithoutTeacherInput> | MarkCreateWithoutTeacherInput[] | MarkUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: MarkCreateOrConnectWithoutTeacherInput | MarkCreateOrConnectWithoutTeacherInput[]
    upsert?: MarkUpsertWithWhereUniqueWithoutTeacherInput | MarkUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: MarkCreateManyTeacherInputEnvelope
    set?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    disconnect?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    delete?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    connect?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    update?: MarkUpdateWithWhereUniqueWithoutTeacherInput | MarkUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: MarkUpdateManyWithWhereWithoutTeacherInput | MarkUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: MarkScalarWhereInput | MarkScalarWhereInput[]
  }

  export type AbsenceUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<AbsenceCreateWithoutTeacherInput, AbsenceUncheckedCreateWithoutTeacherInput> | AbsenceCreateWithoutTeacherInput[] | AbsenceUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: AbsenceCreateOrConnectWithoutTeacherInput | AbsenceCreateOrConnectWithoutTeacherInput[]
    upsert?: AbsenceUpsertWithWhereUniqueWithoutTeacherInput | AbsenceUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: AbsenceCreateManyTeacherInputEnvelope
    set?: AbsenceWhereUniqueInput | AbsenceWhereUniqueInput[]
    disconnect?: AbsenceWhereUniqueInput | AbsenceWhereUniqueInput[]
    delete?: AbsenceWhereUniqueInput | AbsenceWhereUniqueInput[]
    connect?: AbsenceWhereUniqueInput | AbsenceWhereUniqueInput[]
    update?: AbsenceUpdateWithWhereUniqueWithoutTeacherInput | AbsenceUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: AbsenceUpdateManyWithWhereWithoutTeacherInput | AbsenceUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: AbsenceScalarWhereInput | AbsenceScalarWhereInput[]
  }

  export type ClassUncheckedUpdateManyWithoutHeadTeacherNestedInput = {
    create?: XOR<ClassCreateWithoutHeadTeacherInput, ClassUncheckedCreateWithoutHeadTeacherInput> | ClassCreateWithoutHeadTeacherInput[] | ClassUncheckedCreateWithoutHeadTeacherInput[]
    connectOrCreate?: ClassCreateOrConnectWithoutHeadTeacherInput | ClassCreateOrConnectWithoutHeadTeacherInput[]
    upsert?: ClassUpsertWithWhereUniqueWithoutHeadTeacherInput | ClassUpsertWithWhereUniqueWithoutHeadTeacherInput[]
    createMany?: ClassCreateManyHeadTeacherInputEnvelope
    set?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    disconnect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    delete?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    connect?: ClassWhereUniqueInput | ClassWhereUniqueInput[]
    update?: ClassUpdateWithWhereUniqueWithoutHeadTeacherInput | ClassUpdateWithWhereUniqueWithoutHeadTeacherInput[]
    updateMany?: ClassUpdateManyWithWhereWithoutHeadTeacherInput | ClassUpdateManyWithWhereWithoutHeadTeacherInput[]
    deleteMany?: ClassScalarWhereInput | ClassScalarWhereInput[]
  }

  export type TeacherSubjectClassUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<TeacherSubjectClassCreateWithoutTeacherInput, TeacherSubjectClassUncheckedCreateWithoutTeacherInput> | TeacherSubjectClassCreateWithoutTeacherInput[] | TeacherSubjectClassUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: TeacherSubjectClassCreateOrConnectWithoutTeacherInput | TeacherSubjectClassCreateOrConnectWithoutTeacherInput[]
    upsert?: TeacherSubjectClassUpsertWithWhereUniqueWithoutTeacherInput | TeacherSubjectClassUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: TeacherSubjectClassCreateManyTeacherInputEnvelope
    set?: TeacherSubjectClassWhereUniqueInput | TeacherSubjectClassWhereUniqueInput[]
    disconnect?: TeacherSubjectClassWhereUniqueInput | TeacherSubjectClassWhereUniqueInput[]
    delete?: TeacherSubjectClassWhereUniqueInput | TeacherSubjectClassWhereUniqueInput[]
    connect?: TeacherSubjectClassWhereUniqueInput | TeacherSubjectClassWhereUniqueInput[]
    update?: TeacherSubjectClassUpdateWithWhereUniqueWithoutTeacherInput | TeacherSubjectClassUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: TeacherSubjectClassUpdateManyWithWhereWithoutTeacherInput | TeacherSubjectClassUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: TeacherSubjectClassScalarWhereInput | TeacherSubjectClassScalarWhereInput[]
  }

  export type MarkUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<MarkCreateWithoutTeacherInput, MarkUncheckedCreateWithoutTeacherInput> | MarkCreateWithoutTeacherInput[] | MarkUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: MarkCreateOrConnectWithoutTeacherInput | MarkCreateOrConnectWithoutTeacherInput[]
    upsert?: MarkUpsertWithWhereUniqueWithoutTeacherInput | MarkUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: MarkCreateManyTeacherInputEnvelope
    set?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    disconnect?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    delete?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    connect?: MarkWhereUniqueInput | MarkWhereUniqueInput[]
    update?: MarkUpdateWithWhereUniqueWithoutTeacherInput | MarkUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: MarkUpdateManyWithWhereWithoutTeacherInput | MarkUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: MarkScalarWhereInput | MarkScalarWhereInput[]
  }

  export type AbsenceUncheckedUpdateManyWithoutTeacherNestedInput = {
    create?: XOR<AbsenceCreateWithoutTeacherInput, AbsenceUncheckedCreateWithoutTeacherInput> | AbsenceCreateWithoutTeacherInput[] | AbsenceUncheckedCreateWithoutTeacherInput[]
    connectOrCreate?: AbsenceCreateOrConnectWithoutTeacherInput | AbsenceCreateOrConnectWithoutTeacherInput[]
    upsert?: AbsenceUpsertWithWhereUniqueWithoutTeacherInput | AbsenceUpsertWithWhereUniqueWithoutTeacherInput[]
    createMany?: AbsenceCreateManyTeacherInputEnvelope
    set?: AbsenceWhereUniqueInput | AbsenceWhereUniqueInput[]
    disconnect?: AbsenceWhereUniqueInput | AbsenceWhereUniqueInput[]
    delete?: AbsenceWhereUniqueInput | AbsenceWhereUniqueInput[]
    connect?: AbsenceWhereUniqueInput | AbsenceWhereUniqueInput[]
    update?: AbsenceUpdateWithWhereUniqueWithoutTeacherInput | AbsenceUpdateWithWhereUniqueWithoutTeacherInput[]
    updateMany?: AbsenceUpdateManyWithWhereWithoutTeacherInput | AbsenceUpdateManyWithWhereWithoutTeacherInput[]
    deleteMany?: AbsenceScalarWhereInput | AbsenceScalarWhereInput[]
  }

  export type TeacherCreateNestedOneWithoutAssignmentsInput = {
    create?: XOR<TeacherCreateWithoutAssignmentsInput, TeacherUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutAssignmentsInput
    connect?: TeacherWhereUniqueInput
  }

  export type SubjectCreateNestedOneWithoutAssignmentsInput = {
    create?: XOR<SubjectCreateWithoutAssignmentsInput, SubjectUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutAssignmentsInput
    connect?: SubjectWhereUniqueInput
  }

  export type ClassCreateNestedOneWithoutAssignmentsInput = {
    create?: XOR<ClassCreateWithoutAssignmentsInput, ClassUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: ClassCreateOrConnectWithoutAssignmentsInput
    connect?: ClassWhereUniqueInput
  }

  export type TeacherUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: XOR<TeacherCreateWithoutAssignmentsInput, TeacherUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutAssignmentsInput
    upsert?: TeacherUpsertWithoutAssignmentsInput
    connect?: TeacherWhereUniqueInput
    update?: XOR<XOR<TeacherUpdateToOneWithWhereWithoutAssignmentsInput, TeacherUpdateWithoutAssignmentsInput>, TeacherUncheckedUpdateWithoutAssignmentsInput>
  }

  export type SubjectUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: XOR<SubjectCreateWithoutAssignmentsInput, SubjectUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutAssignmentsInput
    upsert?: SubjectUpsertWithoutAssignmentsInput
    connect?: SubjectWhereUniqueInput
    update?: XOR<XOR<SubjectUpdateToOneWithWhereWithoutAssignmentsInput, SubjectUpdateWithoutAssignmentsInput>, SubjectUncheckedUpdateWithoutAssignmentsInput>
  }

  export type ClassUpdateOneRequiredWithoutAssignmentsNestedInput = {
    create?: XOR<ClassCreateWithoutAssignmentsInput, ClassUncheckedCreateWithoutAssignmentsInput>
    connectOrCreate?: ClassCreateOrConnectWithoutAssignmentsInput
    upsert?: ClassUpsertWithoutAssignmentsInput
    connect?: ClassWhereUniqueInput
    update?: XOR<XOR<ClassUpdateToOneWithWhereWithoutAssignmentsInput, ClassUpdateWithoutAssignmentsInput>, ClassUncheckedUpdateWithoutAssignmentsInput>
  }

  export type StudentCreateNestedOneWithoutMarksInput = {
    create?: XOR<StudentCreateWithoutMarksInput, StudentUncheckedCreateWithoutMarksInput>
    connectOrCreate?: StudentCreateOrConnectWithoutMarksInput
    connect?: StudentWhereUniqueInput
  }

  export type SubjectCreateNestedOneWithoutMarksInput = {
    create?: XOR<SubjectCreateWithoutMarksInput, SubjectUncheckedCreateWithoutMarksInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutMarksInput
    connect?: SubjectWhereUniqueInput
  }

  export type TeacherCreateNestedOneWithoutMarksInput = {
    create?: XOR<TeacherCreateWithoutMarksInput, TeacherUncheckedCreateWithoutMarksInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutMarksInput
    connect?: TeacherWhereUniqueInput
  }

  export type ClassCreateNestedOneWithoutMarksInput = {
    create?: XOR<ClassCreateWithoutMarksInput, ClassUncheckedCreateWithoutMarksInput>
    connectOrCreate?: ClassCreateOrConnectWithoutMarksInput
    connect?: ClassWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StudentUpdateOneRequiredWithoutMarksNestedInput = {
    create?: XOR<StudentCreateWithoutMarksInput, StudentUncheckedCreateWithoutMarksInput>
    connectOrCreate?: StudentCreateOrConnectWithoutMarksInput
    upsert?: StudentUpsertWithoutMarksInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutMarksInput, StudentUpdateWithoutMarksInput>, StudentUncheckedUpdateWithoutMarksInput>
  }

  export type SubjectUpdateOneWithoutMarksNestedInput = {
    create?: XOR<SubjectCreateWithoutMarksInput, SubjectUncheckedCreateWithoutMarksInput>
    connectOrCreate?: SubjectCreateOrConnectWithoutMarksInput
    upsert?: SubjectUpsertWithoutMarksInput
    disconnect?: SubjectWhereInput | boolean
    delete?: SubjectWhereInput | boolean
    connect?: SubjectWhereUniqueInput
    update?: XOR<XOR<SubjectUpdateToOneWithWhereWithoutMarksInput, SubjectUpdateWithoutMarksInput>, SubjectUncheckedUpdateWithoutMarksInput>
  }

  export type TeacherUpdateOneWithoutMarksNestedInput = {
    create?: XOR<TeacherCreateWithoutMarksInput, TeacherUncheckedCreateWithoutMarksInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutMarksInput
    upsert?: TeacherUpsertWithoutMarksInput
    disconnect?: TeacherWhereInput | boolean
    delete?: TeacherWhereInput | boolean
    connect?: TeacherWhereUniqueInput
    update?: XOR<XOR<TeacherUpdateToOneWithWhereWithoutMarksInput, TeacherUpdateWithoutMarksInput>, TeacherUncheckedUpdateWithoutMarksInput>
  }

  export type ClassUpdateOneWithoutMarksNestedInput = {
    create?: XOR<ClassCreateWithoutMarksInput, ClassUncheckedCreateWithoutMarksInput>
    connectOrCreate?: ClassCreateOrConnectWithoutMarksInput
    upsert?: ClassUpsertWithoutMarksInput
    disconnect?: ClassWhereInput | boolean
    delete?: ClassWhereInput | boolean
    connect?: ClassWhereUniqueInput
    update?: XOR<XOR<ClassUpdateToOneWithWhereWithoutMarksInput, ClassUpdateWithoutMarksInput>, ClassUncheckedUpdateWithoutMarksInput>
  }

  export type StudentCreateNestedOneWithoutAbsencesInput = {
    create?: XOR<StudentCreateWithoutAbsencesInput, StudentUncheckedCreateWithoutAbsencesInput>
    connectOrCreate?: StudentCreateOrConnectWithoutAbsencesInput
    connect?: StudentWhereUniqueInput
  }

  export type TeacherCreateNestedOneWithoutAbsencesInput = {
    create?: XOR<TeacherCreateWithoutAbsencesInput, TeacherUncheckedCreateWithoutAbsencesInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutAbsencesInput
    connect?: TeacherWhereUniqueInput
  }

  export type ClassCreateNestedOneWithoutAbsencesInput = {
    create?: XOR<ClassCreateWithoutAbsencesInput, ClassUncheckedCreateWithoutAbsencesInput>
    connectOrCreate?: ClassCreateOrConnectWithoutAbsencesInput
    connect?: ClassWhereUniqueInput
  }

  export type EnumAbsenceStatusFieldUpdateOperationsInput = {
    set?: $Enums.AbsenceStatus
  }

  export type StudentUpdateOneRequiredWithoutAbsencesNestedInput = {
    create?: XOR<StudentCreateWithoutAbsencesInput, StudentUncheckedCreateWithoutAbsencesInput>
    connectOrCreate?: StudentCreateOrConnectWithoutAbsencesInput
    upsert?: StudentUpsertWithoutAbsencesInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutAbsencesInput, StudentUpdateWithoutAbsencesInput>, StudentUncheckedUpdateWithoutAbsencesInput>
  }

  export type TeacherUpdateOneWithoutAbsencesNestedInput = {
    create?: XOR<TeacherCreateWithoutAbsencesInput, TeacherUncheckedCreateWithoutAbsencesInput>
    connectOrCreate?: TeacherCreateOrConnectWithoutAbsencesInput
    upsert?: TeacherUpsertWithoutAbsencesInput
    disconnect?: TeacherWhereInput | boolean
    delete?: TeacherWhereInput | boolean
    connect?: TeacherWhereUniqueInput
    update?: XOR<XOR<TeacherUpdateToOneWithWhereWithoutAbsencesInput, TeacherUpdateWithoutAbsencesInput>, TeacherUncheckedUpdateWithoutAbsencesInput>
  }

  export type ClassUpdateOneWithoutAbsencesNestedInput = {
    create?: XOR<ClassCreateWithoutAbsencesInput, ClassUncheckedCreateWithoutAbsencesInput>
    connectOrCreate?: ClassCreateOrConnectWithoutAbsencesInput
    upsert?: ClassUpsertWithoutAbsencesInput
    disconnect?: ClassWhereInput | boolean
    delete?: ClassWhereInput | boolean
    connect?: ClassWhereUniqueInput
    update?: XOR<XOR<ClassUpdateToOneWithWhereWithoutAbsencesInput, ClassUpdateWithoutAbsencesInput>, ClassUncheckedUpdateWithoutAbsencesInput>
  }

  export type StudentCreateNestedOneWithoutPaymentsInput = {
    create?: XOR<StudentCreateWithoutPaymentsInput, StudentUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutPaymentsInput
    connect?: StudentWhereUniqueInput
  }

  export type EnumPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.PaymentStatus
  }

  export type StudentUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: XOR<StudentCreateWithoutPaymentsInput, StudentUncheckedCreateWithoutPaymentsInput>
    connectOrCreate?: StudentCreateOrConnectWithoutPaymentsInput
    upsert?: StudentUpsertWithoutPaymentsInput
    connect?: StudentWhereUniqueInput
    update?: XOR<XOR<StudentUpdateToOneWithWhereWithoutPaymentsInput, StudentUpdateWithoutPaymentsInput>, StudentUncheckedUpdateWithoutPaymentsInput>
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

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedEnumStudentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.StudentStatus | EnumStudentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StudentStatus[] | ListEnumStudentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StudentStatus[] | ListEnumStudentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStudentStatusFilter<$PrismaModel> | $Enums.StudentStatus
  }

  export type NestedEnumStudentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.StudentStatus | EnumStudentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.StudentStatus[] | ListEnumStudentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.StudentStatus[] | ListEnumStudentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumStudentStatusWithAggregatesFilter<$PrismaModel> | $Enums.StudentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumStudentStatusFilter<$PrismaModel>
    _max?: NestedEnumStudentStatusFilter<$PrismaModel>
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumAbsenceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AbsenceStatus | EnumAbsenceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AbsenceStatus[] | ListEnumAbsenceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AbsenceStatus[] | ListEnumAbsenceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAbsenceStatusFilter<$PrismaModel> | $Enums.AbsenceStatus
  }

  export type NestedEnumAbsenceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AbsenceStatus | EnumAbsenceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AbsenceStatus[] | ListEnumAbsenceStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AbsenceStatus[] | ListEnumAbsenceStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAbsenceStatusWithAggregatesFilter<$PrismaModel> | $Enums.AbsenceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAbsenceStatusFilter<$PrismaModel>
    _max?: NestedEnumAbsenceStatusFilter<$PrismaModel>
  }

  export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus
  }

  export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | EnumPaymentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PaymentStatus[] | ListEnumPaymentStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPaymentStatusFilter<$PrismaModel>
    _max?: NestedEnumPaymentStatusFilter<$PrismaModel>
  }

  export type ParentCreateWithoutUserInput = {
    phone: string
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    students?: StudentCreateNestedManyWithoutParentInput
  }

  export type ParentUncheckedCreateWithoutUserInput = {
    id?: number
    phone: string
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    students?: StudentUncheckedCreateNestedManyWithoutParentInput
  }

  export type ParentCreateOrConnectWithoutUserInput = {
    where: ParentWhereUniqueInput
    create: XOR<ParentCreateWithoutUserInput, ParentUncheckedCreateWithoutUserInput>
  }

  export type PreRegistrationCreateWithoutProcessedByUserInput = {
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
    processedAt?: Date | string | null
    submittedAt?: Date | string
    updatedAt?: Date | string
    parentEmailSentAt?: Date | string | null
    studentEmailSentAt?: Date | string | null
    student?: StudentCreateNestedOneWithoutPreRegistrationInput
  }

  export type PreRegistrationUncheckedCreateWithoutProcessedByUserInput = {
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
    processedAt?: Date | string | null
    studentId?: number | null
    submittedAt?: Date | string
    updatedAt?: Date | string
    parentEmailSentAt?: Date | string | null
    studentEmailSentAt?: Date | string | null
  }

  export type PreRegistrationCreateOrConnectWithoutProcessedByUserInput = {
    where: PreRegistrationWhereUniqueInput
    create: XOR<PreRegistrationCreateWithoutProcessedByUserInput, PreRegistrationUncheckedCreateWithoutProcessedByUserInput>
  }

  export type PreRegistrationCreateManyProcessedByUserInputEnvelope = {
    data: PreRegistrationCreateManyProcessedByUserInput | PreRegistrationCreateManyProcessedByUserInput[]
    skipDuplicates?: boolean
  }

  export type RefreshTokenCreateWithoutUserInput = {
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
    revoked?: boolean
  }

  export type RefreshTokenUncheckedCreateWithoutUserInput = {
    id?: number
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
    revoked?: boolean
  }

  export type RefreshTokenCreateOrConnectWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenCreateManyUserInputEnvelope = {
    data: RefreshTokenCreateManyUserInput | RefreshTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type StudentCreateWithoutUserInput = {
    status?: $Enums.StudentStatus
    schoolYear: string
    birthDate: Date | string
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    absences?: AbsenceCreateNestedManyWithoutStudentInput
    marks?: MarkCreateNestedManyWithoutStudentInput
    payments?: PaymentCreateNestedManyWithoutStudentInput
    preRegistration?: PreRegistrationCreateNestedOneWithoutStudentInput
    class?: ClassCreateNestedOneWithoutStudentsInput
    parent?: ParentCreateNestedOneWithoutStudentsInput
  }

  export type StudentUncheckedCreateWithoutUserInput = {
    id?: number
    classId?: number | null
    status?: $Enums.StudentStatus
    schoolYear: string
    birthDate: Date | string
    address?: string | null
    parentId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    absences?: AbsenceUncheckedCreateNestedManyWithoutStudentInput
    marks?: MarkUncheckedCreateNestedManyWithoutStudentInput
    payments?: PaymentUncheckedCreateNestedManyWithoutStudentInput
    preRegistration?: PreRegistrationUncheckedCreateNestedOneWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutUserInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutUserInput, StudentUncheckedCreateWithoutUserInput>
  }

  export type TeacherCreateWithoutUserInput = {
    speciality?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    headOfClasses?: ClassCreateNestedManyWithoutHeadTeacherInput
    assignments?: TeacherSubjectClassCreateNestedManyWithoutTeacherInput
    marks?: MarkCreateNestedManyWithoutTeacherInput
    absences?: AbsenceCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUncheckedCreateWithoutUserInput = {
    id?: number
    speciality?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    headOfClasses?: ClassUncheckedCreateNestedManyWithoutHeadTeacherInput
    assignments?: TeacherSubjectClassUncheckedCreateNestedManyWithoutTeacherInput
    marks?: MarkUncheckedCreateNestedManyWithoutTeacherInput
    absences?: AbsenceUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type TeacherCreateOrConnectWithoutUserInput = {
    where: TeacherWhereUniqueInput
    create: XOR<TeacherCreateWithoutUserInput, TeacherUncheckedCreateWithoutUserInput>
  }

  export type ParentUpsertWithoutUserInput = {
    update: XOR<ParentUpdateWithoutUserInput, ParentUncheckedUpdateWithoutUserInput>
    create: XOR<ParentCreateWithoutUserInput, ParentUncheckedCreateWithoutUserInput>
    where?: ParentWhereInput
  }

  export type ParentUpdateToOneWithWhereWithoutUserInput = {
    where?: ParentWhereInput
    data: XOR<ParentUpdateWithoutUserInput, ParentUncheckedUpdateWithoutUserInput>
  }

  export type ParentUpdateWithoutUserInput = {
    phone?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentUpdateManyWithoutParentNestedInput
  }

  export type ParentUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    phone?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentUncheckedUpdateManyWithoutParentNestedInput
  }

  export type PreRegistrationUpsertWithWhereUniqueWithoutProcessedByUserInput = {
    where: PreRegistrationWhereUniqueInput
    update: XOR<PreRegistrationUpdateWithoutProcessedByUserInput, PreRegistrationUncheckedUpdateWithoutProcessedByUserInput>
    create: XOR<PreRegistrationCreateWithoutProcessedByUserInput, PreRegistrationUncheckedCreateWithoutProcessedByUserInput>
  }

  export type PreRegistrationUpdateWithWhereUniqueWithoutProcessedByUserInput = {
    where: PreRegistrationWhereUniqueInput
    data: XOR<PreRegistrationUpdateWithoutProcessedByUserInput, PreRegistrationUncheckedUpdateWithoutProcessedByUserInput>
  }

  export type PreRegistrationUpdateManyWithWhereWithoutProcessedByUserInput = {
    where: PreRegistrationScalarWhereInput
    data: XOR<PreRegistrationUpdateManyMutationInput, PreRegistrationUncheckedUpdateManyWithoutProcessedByUserInput>
  }

  export type PreRegistrationScalarWhereInput = {
    AND?: PreRegistrationScalarWhereInput | PreRegistrationScalarWhereInput[]
    OR?: PreRegistrationScalarWhereInput[]
    NOT?: PreRegistrationScalarWhereInput | PreRegistrationScalarWhereInput[]
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
    parentEmailSentAt?: DateTimeNullableFilter<"PreRegistration"> | Date | string | null
    studentEmailSentAt?: DateTimeNullableFilter<"PreRegistration"> | Date | string | null
  }

  export type RefreshTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    update: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
    create: XOR<RefreshTokenCreateWithoutUserInput, RefreshTokenUncheckedCreateWithoutUserInput>
  }

  export type RefreshTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: RefreshTokenWhereUniqueInput
    data: XOR<RefreshTokenUpdateWithoutUserInput, RefreshTokenUncheckedUpdateWithoutUserInput>
  }

  export type RefreshTokenUpdateManyWithWhereWithoutUserInput = {
    where: RefreshTokenScalarWhereInput
    data: XOR<RefreshTokenUpdateManyMutationInput, RefreshTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type RefreshTokenScalarWhereInput = {
    AND?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    OR?: RefreshTokenScalarWhereInput[]
    NOT?: RefreshTokenScalarWhereInput | RefreshTokenScalarWhereInput[]
    id?: IntFilter<"RefreshToken"> | number
    token?: StringFilter<"RefreshToken"> | string
    userId?: IntFilter<"RefreshToken"> | number
    expiresAt?: DateTimeFilter<"RefreshToken"> | Date | string
    createdAt?: DateTimeFilter<"RefreshToken"> | Date | string
    revoked?: BoolFilter<"RefreshToken"> | boolean
  }

  export type StudentUpsertWithoutUserInput = {
    update: XOR<StudentUpdateWithoutUserInput, StudentUncheckedUpdateWithoutUserInput>
    create: XOR<StudentCreateWithoutUserInput, StudentUncheckedCreateWithoutUserInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutUserInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutUserInput, StudentUncheckedUpdateWithoutUserInput>
  }

  export type StudentUpdateWithoutUserInput = {
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    schoolYear?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    absences?: AbsenceUpdateManyWithoutStudentNestedInput
    marks?: MarkUpdateManyWithoutStudentNestedInput
    payments?: PaymentUpdateManyWithoutStudentNestedInput
    preRegistration?: PreRegistrationUpdateOneWithoutStudentNestedInput
    class?: ClassUpdateOneWithoutStudentsNestedInput
    parent?: ParentUpdateOneWithoutStudentsNestedInput
  }

  export type StudentUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    classId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    schoolYear?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    absences?: AbsenceUncheckedUpdateManyWithoutStudentNestedInput
    marks?: MarkUncheckedUpdateManyWithoutStudentNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutStudentNestedInput
    preRegistration?: PreRegistrationUncheckedUpdateOneWithoutStudentNestedInput
  }

  export type TeacherUpsertWithoutUserInput = {
    update: XOR<TeacherUpdateWithoutUserInput, TeacherUncheckedUpdateWithoutUserInput>
    create: XOR<TeacherCreateWithoutUserInput, TeacherUncheckedCreateWithoutUserInput>
    where?: TeacherWhereInput
  }

  export type TeacherUpdateToOneWithWhereWithoutUserInput = {
    where?: TeacherWhereInput
    data: XOR<TeacherUpdateWithoutUserInput, TeacherUncheckedUpdateWithoutUserInput>
  }

  export type TeacherUpdateWithoutUserInput = {
    speciality?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    headOfClasses?: ClassUpdateManyWithoutHeadTeacherNestedInput
    assignments?: TeacherSubjectClassUpdateManyWithoutTeacherNestedInput
    marks?: MarkUpdateManyWithoutTeacherNestedInput
    absences?: AbsenceUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    speciality?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    headOfClasses?: ClassUncheckedUpdateManyWithoutHeadTeacherNestedInput
    assignments?: TeacherSubjectClassUncheckedUpdateManyWithoutTeacherNestedInput
    marks?: MarkUncheckedUpdateManyWithoutTeacherNestedInput
    absences?: AbsenceUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type UserCreateWithoutRefreshTokensInput = {
    firstName: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: ParentCreateNestedOneWithoutUserInput
    processedRegistrations?: PreRegistrationCreateNestedManyWithoutProcessedByUserInput
    student?: StudentCreateNestedOneWithoutUserInput
    teacher?: TeacherCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRefreshTokensInput = {
    id?: number
    firstName: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: ParentUncheckedCreateNestedOneWithoutUserInput
    processedRegistrations?: PreRegistrationUncheckedCreateNestedManyWithoutProcessedByUserInput
    student?: StudentUncheckedCreateNestedOneWithoutUserInput
    teacher?: TeacherUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRefreshTokensInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
  }

  export type UserUpsertWithoutRefreshTokensInput = {
    update: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
    create: XOR<UserCreateWithoutRefreshTokensInput, UserUncheckedCreateWithoutRefreshTokensInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRefreshTokensInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRefreshTokensInput, UserUncheckedUpdateWithoutRefreshTokensInput>
  }

  export type UserUpdateWithoutRefreshTokensInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: ParentUpdateOneWithoutUserNestedInput
    processedRegistrations?: PreRegistrationUpdateManyWithoutProcessedByUserNestedInput
    student?: StudentUpdateOneWithoutUserNestedInput
    teacher?: TeacherUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRefreshTokensInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: ParentUncheckedUpdateOneWithoutUserNestedInput
    processedRegistrations?: PreRegistrationUncheckedUpdateManyWithoutProcessedByUserNestedInput
    student?: StudentUncheckedUpdateOneWithoutUserNestedInput
    teacher?: TeacherUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutProcessedRegistrationsInput = {
    firstName: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: ParentCreateNestedOneWithoutUserInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    student?: StudentCreateNestedOneWithoutUserInput
    teacher?: TeacherCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProcessedRegistrationsInput = {
    id?: number
    firstName: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: ParentUncheckedCreateNestedOneWithoutUserInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    student?: StudentUncheckedCreateNestedOneWithoutUserInput
    teacher?: TeacherUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProcessedRegistrationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProcessedRegistrationsInput, UserUncheckedCreateWithoutProcessedRegistrationsInput>
  }

  export type StudentCreateWithoutPreRegistrationInput = {
    status?: $Enums.StudentStatus
    schoolYear: string
    birthDate: Date | string
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    absences?: AbsenceCreateNestedManyWithoutStudentInput
    marks?: MarkCreateNestedManyWithoutStudentInput
    payments?: PaymentCreateNestedManyWithoutStudentInput
    class?: ClassCreateNestedOneWithoutStudentsInput
    parent?: ParentCreateNestedOneWithoutStudentsInput
    user: UserCreateNestedOneWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutPreRegistrationInput = {
    id?: number
    userId: number
    classId?: number | null
    status?: $Enums.StudentStatus
    schoolYear: string
    birthDate: Date | string
    address?: string | null
    parentId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    absences?: AbsenceUncheckedCreateNestedManyWithoutStudentInput
    marks?: MarkUncheckedCreateNestedManyWithoutStudentInput
    payments?: PaymentUncheckedCreateNestedManyWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutPreRegistrationInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutPreRegistrationInput, StudentUncheckedCreateWithoutPreRegistrationInput>
  }

  export type UserUpsertWithoutProcessedRegistrationsInput = {
    update: XOR<UserUpdateWithoutProcessedRegistrationsInput, UserUncheckedUpdateWithoutProcessedRegistrationsInput>
    create: XOR<UserCreateWithoutProcessedRegistrationsInput, UserUncheckedCreateWithoutProcessedRegistrationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProcessedRegistrationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProcessedRegistrationsInput, UserUncheckedUpdateWithoutProcessedRegistrationsInput>
  }

  export type UserUpdateWithoutProcessedRegistrationsInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: ParentUpdateOneWithoutUserNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    student?: StudentUpdateOneWithoutUserNestedInput
    teacher?: TeacherUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProcessedRegistrationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: ParentUncheckedUpdateOneWithoutUserNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    student?: StudentUncheckedUpdateOneWithoutUserNestedInput
    teacher?: TeacherUncheckedUpdateOneWithoutUserNestedInput
  }

  export type StudentUpsertWithoutPreRegistrationInput = {
    update: XOR<StudentUpdateWithoutPreRegistrationInput, StudentUncheckedUpdateWithoutPreRegistrationInput>
    create: XOR<StudentCreateWithoutPreRegistrationInput, StudentUncheckedCreateWithoutPreRegistrationInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutPreRegistrationInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutPreRegistrationInput, StudentUncheckedUpdateWithoutPreRegistrationInput>
  }

  export type StudentUpdateWithoutPreRegistrationInput = {
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    schoolYear?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    absences?: AbsenceUpdateManyWithoutStudentNestedInput
    marks?: MarkUpdateManyWithoutStudentNestedInput
    payments?: PaymentUpdateManyWithoutStudentNestedInput
    class?: ClassUpdateOneWithoutStudentsNestedInput
    parent?: ParentUpdateOneWithoutStudentsNestedInput
    user?: UserUpdateOneRequiredWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutPreRegistrationInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    classId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    schoolYear?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    absences?: AbsenceUncheckedUpdateManyWithoutStudentNestedInput
    marks?: MarkUncheckedUpdateManyWithoutStudentNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutStudentNestedInput
  }

  export type AbsenceCreateWithoutStudentInput = {
    date: Date | string
    status?: $Enums.AbsenceStatus
    reason?: string | null
    justified?: boolean
    parentNotifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    teacher?: TeacherCreateNestedOneWithoutAbsencesInput
    class?: ClassCreateNestedOneWithoutAbsencesInput
  }

  export type AbsenceUncheckedCreateWithoutStudentInput = {
    id?: number
    teacherId?: number | null
    classId?: number | null
    date: Date | string
    status?: $Enums.AbsenceStatus
    reason?: string | null
    justified?: boolean
    parentNotifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AbsenceCreateOrConnectWithoutStudentInput = {
    where: AbsenceWhereUniqueInput
    create: XOR<AbsenceCreateWithoutStudentInput, AbsenceUncheckedCreateWithoutStudentInput>
  }

  export type AbsenceCreateManyStudentInputEnvelope = {
    data: AbsenceCreateManyStudentInput | AbsenceCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type MarkCreateWithoutStudentInput = {
    subject: string
    value: number
    coefficient?: number
    semester?: number | null
    comment?: string | null
    term: string
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    subjectRef?: SubjectCreateNestedOneWithoutMarksInput
    teacher?: TeacherCreateNestedOneWithoutMarksInput
    class?: ClassCreateNestedOneWithoutMarksInput
  }

  export type MarkUncheckedCreateWithoutStudentInput = {
    id?: number
    subjectId?: number | null
    teacherId?: number | null
    classId?: number | null
    subject: string
    value: number
    coefficient?: number
    semester?: number | null
    comment?: string | null
    term: string
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MarkCreateOrConnectWithoutStudentInput = {
    where: MarkWhereUniqueInput
    create: XOR<MarkCreateWithoutStudentInput, MarkUncheckedCreateWithoutStudentInput>
  }

  export type MarkCreateManyStudentInputEnvelope = {
    data: MarkCreateManyStudentInput | MarkCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type PaymentCreateWithoutStudentInput = {
    amount: number
    dueDate: Date | string
    status?: $Enums.PaymentStatus
    paymentDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentUncheckedCreateWithoutStudentInput = {
    id?: number
    amount: number
    dueDate: Date | string
    status?: $Enums.PaymentStatus
    paymentDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateOrConnectWithoutStudentInput = {
    where: PaymentWhereUniqueInput
    create: XOR<PaymentCreateWithoutStudentInput, PaymentUncheckedCreateWithoutStudentInput>
  }

  export type PaymentCreateManyStudentInputEnvelope = {
    data: PaymentCreateManyStudentInput | PaymentCreateManyStudentInput[]
    skipDuplicates?: boolean
  }

  export type PreRegistrationCreateWithoutStudentInput = {
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
    processedAt?: Date | string | null
    submittedAt?: Date | string
    updatedAt?: Date | string
    parentEmailSentAt?: Date | string | null
    studentEmailSentAt?: Date | string | null
    processedByUser?: UserCreateNestedOneWithoutProcessedRegistrationsInput
  }

  export type PreRegistrationUncheckedCreateWithoutStudentInput = {
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
    submittedAt?: Date | string
    updatedAt?: Date | string
    parentEmailSentAt?: Date | string | null
    studentEmailSentAt?: Date | string | null
  }

  export type PreRegistrationCreateOrConnectWithoutStudentInput = {
    where: PreRegistrationWhereUniqueInput
    create: XOR<PreRegistrationCreateWithoutStudentInput, PreRegistrationUncheckedCreateWithoutStudentInput>
  }

  export type ClassCreateWithoutStudentsInput = {
    name: string
    level: string
    schoolYear?: string
    maxCapacity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    headTeacher?: TeacherCreateNestedOneWithoutHeadOfClassesInput
    assignments?: TeacherSubjectClassCreateNestedManyWithoutClassInput
    marks?: MarkCreateNestedManyWithoutClassInput
    absences?: AbsenceCreateNestedManyWithoutClassInput
  }

  export type ClassUncheckedCreateWithoutStudentsInput = {
    id?: number
    name: string
    level: string
    schoolYear?: string
    maxCapacity?: number
    headTeacherId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignments?: TeacherSubjectClassUncheckedCreateNestedManyWithoutClassInput
    marks?: MarkUncheckedCreateNestedManyWithoutClassInput
    absences?: AbsenceUncheckedCreateNestedManyWithoutClassInput
  }

  export type ClassCreateOrConnectWithoutStudentsInput = {
    where: ClassWhereUniqueInput
    create: XOR<ClassCreateWithoutStudentsInput, ClassUncheckedCreateWithoutStudentsInput>
  }

  export type ParentCreateWithoutStudentsInput = {
    phone: string
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutParentInput
  }

  export type ParentUncheckedCreateWithoutStudentsInput = {
    id?: number
    userId: number
    phone: string
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ParentCreateOrConnectWithoutStudentsInput = {
    where: ParentWhereUniqueInput
    create: XOR<ParentCreateWithoutStudentsInput, ParentUncheckedCreateWithoutStudentsInput>
  }

  export type UserCreateWithoutStudentInput = {
    firstName: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: ParentCreateNestedOneWithoutUserInput
    processedRegistrations?: PreRegistrationCreateNestedManyWithoutProcessedByUserInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    teacher?: TeacherCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutStudentInput = {
    id?: number
    firstName: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: ParentUncheckedCreateNestedOneWithoutUserInput
    processedRegistrations?: PreRegistrationUncheckedCreateNestedManyWithoutProcessedByUserInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    teacher?: TeacherUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutStudentInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutStudentInput, UserUncheckedCreateWithoutStudentInput>
  }

  export type AbsenceUpsertWithWhereUniqueWithoutStudentInput = {
    where: AbsenceWhereUniqueInput
    update: XOR<AbsenceUpdateWithoutStudentInput, AbsenceUncheckedUpdateWithoutStudentInput>
    create: XOR<AbsenceCreateWithoutStudentInput, AbsenceUncheckedCreateWithoutStudentInput>
  }

  export type AbsenceUpdateWithWhereUniqueWithoutStudentInput = {
    where: AbsenceWhereUniqueInput
    data: XOR<AbsenceUpdateWithoutStudentInput, AbsenceUncheckedUpdateWithoutStudentInput>
  }

  export type AbsenceUpdateManyWithWhereWithoutStudentInput = {
    where: AbsenceScalarWhereInput
    data: XOR<AbsenceUpdateManyMutationInput, AbsenceUncheckedUpdateManyWithoutStudentInput>
  }

  export type AbsenceScalarWhereInput = {
    AND?: AbsenceScalarWhereInput | AbsenceScalarWhereInput[]
    OR?: AbsenceScalarWhereInput[]
    NOT?: AbsenceScalarWhereInput | AbsenceScalarWhereInput[]
    id?: IntFilter<"Absence"> | number
    studentId?: IntFilter<"Absence"> | number
    teacherId?: IntNullableFilter<"Absence"> | number | null
    classId?: IntNullableFilter<"Absence"> | number | null
    date?: DateTimeFilter<"Absence"> | Date | string
    status?: EnumAbsenceStatusFilter<"Absence"> | $Enums.AbsenceStatus
    reason?: StringNullableFilter<"Absence"> | string | null
    justified?: BoolFilter<"Absence"> | boolean
    parentNotifiedAt?: DateTimeNullableFilter<"Absence"> | Date | string | null
    createdAt?: DateTimeFilter<"Absence"> | Date | string
    updatedAt?: DateTimeFilter<"Absence"> | Date | string
  }

  export type MarkUpsertWithWhereUniqueWithoutStudentInput = {
    where: MarkWhereUniqueInput
    update: XOR<MarkUpdateWithoutStudentInput, MarkUncheckedUpdateWithoutStudentInput>
    create: XOR<MarkCreateWithoutStudentInput, MarkUncheckedCreateWithoutStudentInput>
  }

  export type MarkUpdateWithWhereUniqueWithoutStudentInput = {
    where: MarkWhereUniqueInput
    data: XOR<MarkUpdateWithoutStudentInput, MarkUncheckedUpdateWithoutStudentInput>
  }

  export type MarkUpdateManyWithWhereWithoutStudentInput = {
    where: MarkScalarWhereInput
    data: XOR<MarkUpdateManyMutationInput, MarkUncheckedUpdateManyWithoutStudentInput>
  }

  export type MarkScalarWhereInput = {
    AND?: MarkScalarWhereInput | MarkScalarWhereInput[]
    OR?: MarkScalarWhereInput[]
    NOT?: MarkScalarWhereInput | MarkScalarWhereInput[]
    id?: IntFilter<"Mark"> | number
    studentId?: IntFilter<"Mark"> | number
    subjectId?: IntNullableFilter<"Mark"> | number | null
    teacherId?: IntNullableFilter<"Mark"> | number | null
    classId?: IntNullableFilter<"Mark"> | number | null
    subject?: StringFilter<"Mark"> | string
    value?: FloatFilter<"Mark"> | number
    coefficient?: FloatFilter<"Mark"> | number
    semester?: IntNullableFilter<"Mark"> | number | null
    comment?: StringNullableFilter<"Mark"> | string | null
    term?: StringFilter<"Mark"> | string
    date?: DateTimeFilter<"Mark"> | Date | string
    createdAt?: DateTimeFilter<"Mark"> | Date | string
    updatedAt?: DateTimeFilter<"Mark"> | Date | string
  }

  export type PaymentUpsertWithWhereUniqueWithoutStudentInput = {
    where: PaymentWhereUniqueInput
    update: XOR<PaymentUpdateWithoutStudentInput, PaymentUncheckedUpdateWithoutStudentInput>
    create: XOR<PaymentCreateWithoutStudentInput, PaymentUncheckedCreateWithoutStudentInput>
  }

  export type PaymentUpdateWithWhereUniqueWithoutStudentInput = {
    where: PaymentWhereUniqueInput
    data: XOR<PaymentUpdateWithoutStudentInput, PaymentUncheckedUpdateWithoutStudentInput>
  }

  export type PaymentUpdateManyWithWhereWithoutStudentInput = {
    where: PaymentScalarWhereInput
    data: XOR<PaymentUpdateManyMutationInput, PaymentUncheckedUpdateManyWithoutStudentInput>
  }

  export type PaymentScalarWhereInput = {
    AND?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    OR?: PaymentScalarWhereInput[]
    NOT?: PaymentScalarWhereInput | PaymentScalarWhereInput[]
    id?: IntFilter<"Payment"> | number
    studentId?: IntFilter<"Payment"> | number
    amount?: FloatFilter<"Payment"> | number
    dueDate?: DateTimeFilter<"Payment"> | Date | string
    status?: EnumPaymentStatusFilter<"Payment"> | $Enums.PaymentStatus
    paymentDate?: DateTimeNullableFilter<"Payment"> | Date | string | null
    createdAt?: DateTimeFilter<"Payment"> | Date | string
    updatedAt?: DateTimeFilter<"Payment"> | Date | string
  }

  export type PreRegistrationUpsertWithoutStudentInput = {
    update: XOR<PreRegistrationUpdateWithoutStudentInput, PreRegistrationUncheckedUpdateWithoutStudentInput>
    create: XOR<PreRegistrationCreateWithoutStudentInput, PreRegistrationUncheckedCreateWithoutStudentInput>
    where?: PreRegistrationWhereInput
  }

  export type PreRegistrationUpdateToOneWithWhereWithoutStudentInput = {
    where?: PreRegistrationWhereInput
    data: XOR<PreRegistrationUpdateWithoutStudentInput, PreRegistrationUncheckedUpdateWithoutStudentInput>
  }

  export type PreRegistrationUpdateWithoutStudentInput = {
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
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentEmailSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    studentEmailSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processedByUser?: UserUpdateOneWithoutProcessedRegistrationsNestedInput
  }

  export type PreRegistrationUncheckedUpdateWithoutStudentInput = {
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
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentEmailSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    studentEmailSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ClassUpsertWithoutStudentsInput = {
    update: XOR<ClassUpdateWithoutStudentsInput, ClassUncheckedUpdateWithoutStudentsInput>
    create: XOR<ClassCreateWithoutStudentsInput, ClassUncheckedCreateWithoutStudentsInput>
    where?: ClassWhereInput
  }

  export type ClassUpdateToOneWithWhereWithoutStudentsInput = {
    where?: ClassWhereInput
    data: XOR<ClassUpdateWithoutStudentsInput, ClassUncheckedUpdateWithoutStudentsInput>
  }

  export type ClassUpdateWithoutStudentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    schoolYear?: StringFieldUpdateOperationsInput | string
    maxCapacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    headTeacher?: TeacherUpdateOneWithoutHeadOfClassesNestedInput
    assignments?: TeacherSubjectClassUpdateManyWithoutClassNestedInput
    marks?: MarkUpdateManyWithoutClassNestedInput
    absences?: AbsenceUpdateManyWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateWithoutStudentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    schoolYear?: StringFieldUpdateOperationsInput | string
    maxCapacity?: IntFieldUpdateOperationsInput | number
    headTeacherId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: TeacherSubjectClassUncheckedUpdateManyWithoutClassNestedInput
    marks?: MarkUncheckedUpdateManyWithoutClassNestedInput
    absences?: AbsenceUncheckedUpdateManyWithoutClassNestedInput
  }

  export type ParentUpsertWithoutStudentsInput = {
    update: XOR<ParentUpdateWithoutStudentsInput, ParentUncheckedUpdateWithoutStudentsInput>
    create: XOR<ParentCreateWithoutStudentsInput, ParentUncheckedCreateWithoutStudentsInput>
    where?: ParentWhereInput
  }

  export type ParentUpdateToOneWithWhereWithoutStudentsInput = {
    where?: ParentWhereInput
    data: XOR<ParentUpdateWithoutStudentsInput, ParentUncheckedUpdateWithoutStudentsInput>
  }

  export type ParentUpdateWithoutStudentsInput = {
    phone?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutParentNestedInput
  }

  export type ParentUncheckedUpdateWithoutStudentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    phone?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutStudentInput = {
    update: XOR<UserUpdateWithoutStudentInput, UserUncheckedUpdateWithoutStudentInput>
    create: XOR<UserCreateWithoutStudentInput, UserUncheckedCreateWithoutStudentInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutStudentInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutStudentInput, UserUncheckedUpdateWithoutStudentInput>
  }

  export type UserUpdateWithoutStudentInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: ParentUpdateOneWithoutUserNestedInput
    processedRegistrations?: PreRegistrationUpdateManyWithoutProcessedByUserNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    teacher?: TeacherUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: ParentUncheckedUpdateOneWithoutUserNestedInput
    processedRegistrations?: PreRegistrationUncheckedUpdateManyWithoutProcessedByUserNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    teacher?: TeacherUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateWithoutParentInput = {
    firstName: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    processedRegistrations?: PreRegistrationCreateNestedManyWithoutProcessedByUserInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    student?: StudentCreateNestedOneWithoutUserInput
    teacher?: TeacherCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutParentInput = {
    id?: number
    firstName: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    processedRegistrations?: PreRegistrationUncheckedCreateNestedManyWithoutProcessedByUserInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    student?: StudentUncheckedCreateNestedOneWithoutUserInput
    teacher?: TeacherUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutParentInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutParentInput, UserUncheckedCreateWithoutParentInput>
  }

  export type StudentCreateWithoutParentInput = {
    status?: $Enums.StudentStatus
    schoolYear: string
    birthDate: Date | string
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    absences?: AbsenceCreateNestedManyWithoutStudentInput
    marks?: MarkCreateNestedManyWithoutStudentInput
    payments?: PaymentCreateNestedManyWithoutStudentInput
    preRegistration?: PreRegistrationCreateNestedOneWithoutStudentInput
    class?: ClassCreateNestedOneWithoutStudentsInput
    user: UserCreateNestedOneWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutParentInput = {
    id?: number
    userId: number
    classId?: number | null
    status?: $Enums.StudentStatus
    schoolYear: string
    birthDate: Date | string
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    absences?: AbsenceUncheckedCreateNestedManyWithoutStudentInput
    marks?: MarkUncheckedCreateNestedManyWithoutStudentInput
    payments?: PaymentUncheckedCreateNestedManyWithoutStudentInput
    preRegistration?: PreRegistrationUncheckedCreateNestedOneWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutParentInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutParentInput, StudentUncheckedCreateWithoutParentInput>
  }

  export type StudentCreateManyParentInputEnvelope = {
    data: StudentCreateManyParentInput | StudentCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutParentInput = {
    update: XOR<UserUpdateWithoutParentInput, UserUncheckedUpdateWithoutParentInput>
    create: XOR<UserCreateWithoutParentInput, UserUncheckedCreateWithoutParentInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutParentInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutParentInput, UserUncheckedUpdateWithoutParentInput>
  }

  export type UserUpdateWithoutParentInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedRegistrations?: PreRegistrationUpdateManyWithoutProcessedByUserNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    student?: StudentUpdateOneWithoutUserNestedInput
    teacher?: TeacherUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutParentInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    processedRegistrations?: PreRegistrationUncheckedUpdateManyWithoutProcessedByUserNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    student?: StudentUncheckedUpdateOneWithoutUserNestedInput
    teacher?: TeacherUncheckedUpdateOneWithoutUserNestedInput
  }

  export type StudentUpsertWithWhereUniqueWithoutParentInput = {
    where: StudentWhereUniqueInput
    update: XOR<StudentUpdateWithoutParentInput, StudentUncheckedUpdateWithoutParentInput>
    create: XOR<StudentCreateWithoutParentInput, StudentUncheckedCreateWithoutParentInput>
  }

  export type StudentUpdateWithWhereUniqueWithoutParentInput = {
    where: StudentWhereUniqueInput
    data: XOR<StudentUpdateWithoutParentInput, StudentUncheckedUpdateWithoutParentInput>
  }

  export type StudentUpdateManyWithWhereWithoutParentInput = {
    where: StudentScalarWhereInput
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyWithoutParentInput>
  }

  export type StudentScalarWhereInput = {
    AND?: StudentScalarWhereInput | StudentScalarWhereInput[]
    OR?: StudentScalarWhereInput[]
    NOT?: StudentScalarWhereInput | StudentScalarWhereInput[]
    id?: IntFilter<"Student"> | number
    userId?: IntFilter<"Student"> | number
    classId?: IntNullableFilter<"Student"> | number | null
    status?: EnumStudentStatusFilter<"Student"> | $Enums.StudentStatus
    schoolYear?: StringFilter<"Student"> | string
    birthDate?: DateTimeFilter<"Student"> | Date | string
    address?: StringNullableFilter<"Student"> | string | null
    parentId?: IntNullableFilter<"Student"> | number | null
    createdAt?: DateTimeFilter<"Student"> | Date | string
    updatedAt?: DateTimeFilter<"Student"> | Date | string
  }

  export type StudentCreateWithoutClassInput = {
    status?: $Enums.StudentStatus
    schoolYear: string
    birthDate: Date | string
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    absences?: AbsenceCreateNestedManyWithoutStudentInput
    marks?: MarkCreateNestedManyWithoutStudentInput
    payments?: PaymentCreateNestedManyWithoutStudentInput
    preRegistration?: PreRegistrationCreateNestedOneWithoutStudentInput
    parent?: ParentCreateNestedOneWithoutStudentsInput
    user: UserCreateNestedOneWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutClassInput = {
    id?: number
    userId: number
    status?: $Enums.StudentStatus
    schoolYear: string
    birthDate: Date | string
    address?: string | null
    parentId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    absences?: AbsenceUncheckedCreateNestedManyWithoutStudentInput
    marks?: MarkUncheckedCreateNestedManyWithoutStudentInput
    payments?: PaymentUncheckedCreateNestedManyWithoutStudentInput
    preRegistration?: PreRegistrationUncheckedCreateNestedOneWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutClassInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutClassInput, StudentUncheckedCreateWithoutClassInput>
  }

  export type StudentCreateManyClassInputEnvelope = {
    data: StudentCreateManyClassInput | StudentCreateManyClassInput[]
    skipDuplicates?: boolean
  }

  export type TeacherCreateWithoutHeadOfClassesInput = {
    speciality?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTeacherInput
    assignments?: TeacherSubjectClassCreateNestedManyWithoutTeacherInput
    marks?: MarkCreateNestedManyWithoutTeacherInput
    absences?: AbsenceCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUncheckedCreateWithoutHeadOfClassesInput = {
    id?: number
    userId: number
    speciality?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignments?: TeacherSubjectClassUncheckedCreateNestedManyWithoutTeacherInput
    marks?: MarkUncheckedCreateNestedManyWithoutTeacherInput
    absences?: AbsenceUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type TeacherCreateOrConnectWithoutHeadOfClassesInput = {
    where: TeacherWhereUniqueInput
    create: XOR<TeacherCreateWithoutHeadOfClassesInput, TeacherUncheckedCreateWithoutHeadOfClassesInput>
  }

  export type TeacherSubjectClassCreateWithoutClassInput = {
    schoolYear: string
    teacher: TeacherCreateNestedOneWithoutAssignmentsInput
    subject: SubjectCreateNestedOneWithoutAssignmentsInput
  }

  export type TeacherSubjectClassUncheckedCreateWithoutClassInput = {
    teacherId: number
    subjectId: number
    schoolYear: string
  }

  export type TeacherSubjectClassCreateOrConnectWithoutClassInput = {
    where: TeacherSubjectClassWhereUniqueInput
    create: XOR<TeacherSubjectClassCreateWithoutClassInput, TeacherSubjectClassUncheckedCreateWithoutClassInput>
  }

  export type TeacherSubjectClassCreateManyClassInputEnvelope = {
    data: TeacherSubjectClassCreateManyClassInput | TeacherSubjectClassCreateManyClassInput[]
    skipDuplicates?: boolean
  }

  export type MarkCreateWithoutClassInput = {
    subject: string
    value: number
    coefficient?: number
    semester?: number | null
    comment?: string | null
    term: string
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    student: StudentCreateNestedOneWithoutMarksInput
    subjectRef?: SubjectCreateNestedOneWithoutMarksInput
    teacher?: TeacherCreateNestedOneWithoutMarksInput
  }

  export type MarkUncheckedCreateWithoutClassInput = {
    id?: number
    studentId: number
    subjectId?: number | null
    teacherId?: number | null
    subject: string
    value: number
    coefficient?: number
    semester?: number | null
    comment?: string | null
    term: string
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MarkCreateOrConnectWithoutClassInput = {
    where: MarkWhereUniqueInput
    create: XOR<MarkCreateWithoutClassInput, MarkUncheckedCreateWithoutClassInput>
  }

  export type MarkCreateManyClassInputEnvelope = {
    data: MarkCreateManyClassInput | MarkCreateManyClassInput[]
    skipDuplicates?: boolean
  }

  export type AbsenceCreateWithoutClassInput = {
    date: Date | string
    status?: $Enums.AbsenceStatus
    reason?: string | null
    justified?: boolean
    parentNotifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    student: StudentCreateNestedOneWithoutAbsencesInput
    teacher?: TeacherCreateNestedOneWithoutAbsencesInput
  }

  export type AbsenceUncheckedCreateWithoutClassInput = {
    id?: number
    studentId: number
    teacherId?: number | null
    date: Date | string
    status?: $Enums.AbsenceStatus
    reason?: string | null
    justified?: boolean
    parentNotifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AbsenceCreateOrConnectWithoutClassInput = {
    where: AbsenceWhereUniqueInput
    create: XOR<AbsenceCreateWithoutClassInput, AbsenceUncheckedCreateWithoutClassInput>
  }

  export type AbsenceCreateManyClassInputEnvelope = {
    data: AbsenceCreateManyClassInput | AbsenceCreateManyClassInput[]
    skipDuplicates?: boolean
  }

  export type StudentUpsertWithWhereUniqueWithoutClassInput = {
    where: StudentWhereUniqueInput
    update: XOR<StudentUpdateWithoutClassInput, StudentUncheckedUpdateWithoutClassInput>
    create: XOR<StudentCreateWithoutClassInput, StudentUncheckedCreateWithoutClassInput>
  }

  export type StudentUpdateWithWhereUniqueWithoutClassInput = {
    where: StudentWhereUniqueInput
    data: XOR<StudentUpdateWithoutClassInput, StudentUncheckedUpdateWithoutClassInput>
  }

  export type StudentUpdateManyWithWhereWithoutClassInput = {
    where: StudentScalarWhereInput
    data: XOR<StudentUpdateManyMutationInput, StudentUncheckedUpdateManyWithoutClassInput>
  }

  export type TeacherUpsertWithoutHeadOfClassesInput = {
    update: XOR<TeacherUpdateWithoutHeadOfClassesInput, TeacherUncheckedUpdateWithoutHeadOfClassesInput>
    create: XOR<TeacherCreateWithoutHeadOfClassesInput, TeacherUncheckedCreateWithoutHeadOfClassesInput>
    where?: TeacherWhereInput
  }

  export type TeacherUpdateToOneWithWhereWithoutHeadOfClassesInput = {
    where?: TeacherWhereInput
    data: XOR<TeacherUpdateWithoutHeadOfClassesInput, TeacherUncheckedUpdateWithoutHeadOfClassesInput>
  }

  export type TeacherUpdateWithoutHeadOfClassesInput = {
    speciality?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTeacherNestedInput
    assignments?: TeacherSubjectClassUpdateManyWithoutTeacherNestedInput
    marks?: MarkUpdateManyWithoutTeacherNestedInput
    absences?: AbsenceUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateWithoutHeadOfClassesInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    speciality?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: TeacherSubjectClassUncheckedUpdateManyWithoutTeacherNestedInput
    marks?: MarkUncheckedUpdateManyWithoutTeacherNestedInput
    absences?: AbsenceUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherSubjectClassUpsertWithWhereUniqueWithoutClassInput = {
    where: TeacherSubjectClassWhereUniqueInput
    update: XOR<TeacherSubjectClassUpdateWithoutClassInput, TeacherSubjectClassUncheckedUpdateWithoutClassInput>
    create: XOR<TeacherSubjectClassCreateWithoutClassInput, TeacherSubjectClassUncheckedCreateWithoutClassInput>
  }

  export type TeacherSubjectClassUpdateWithWhereUniqueWithoutClassInput = {
    where: TeacherSubjectClassWhereUniqueInput
    data: XOR<TeacherSubjectClassUpdateWithoutClassInput, TeacherSubjectClassUncheckedUpdateWithoutClassInput>
  }

  export type TeacherSubjectClassUpdateManyWithWhereWithoutClassInput = {
    where: TeacherSubjectClassScalarWhereInput
    data: XOR<TeacherSubjectClassUpdateManyMutationInput, TeacherSubjectClassUncheckedUpdateManyWithoutClassInput>
  }

  export type TeacherSubjectClassScalarWhereInput = {
    AND?: TeacherSubjectClassScalarWhereInput | TeacherSubjectClassScalarWhereInput[]
    OR?: TeacherSubjectClassScalarWhereInput[]
    NOT?: TeacherSubjectClassScalarWhereInput | TeacherSubjectClassScalarWhereInput[]
    teacherId?: IntFilter<"TeacherSubjectClass"> | number
    subjectId?: IntFilter<"TeacherSubjectClass"> | number
    classId?: IntFilter<"TeacherSubjectClass"> | number
    schoolYear?: StringFilter<"TeacherSubjectClass"> | string
  }

  export type MarkUpsertWithWhereUniqueWithoutClassInput = {
    where: MarkWhereUniqueInput
    update: XOR<MarkUpdateWithoutClassInput, MarkUncheckedUpdateWithoutClassInput>
    create: XOR<MarkCreateWithoutClassInput, MarkUncheckedCreateWithoutClassInput>
  }

  export type MarkUpdateWithWhereUniqueWithoutClassInput = {
    where: MarkWhereUniqueInput
    data: XOR<MarkUpdateWithoutClassInput, MarkUncheckedUpdateWithoutClassInput>
  }

  export type MarkUpdateManyWithWhereWithoutClassInput = {
    where: MarkScalarWhereInput
    data: XOR<MarkUpdateManyMutationInput, MarkUncheckedUpdateManyWithoutClassInput>
  }

  export type AbsenceUpsertWithWhereUniqueWithoutClassInput = {
    where: AbsenceWhereUniqueInput
    update: XOR<AbsenceUpdateWithoutClassInput, AbsenceUncheckedUpdateWithoutClassInput>
    create: XOR<AbsenceCreateWithoutClassInput, AbsenceUncheckedCreateWithoutClassInput>
  }

  export type AbsenceUpdateWithWhereUniqueWithoutClassInput = {
    where: AbsenceWhereUniqueInput
    data: XOR<AbsenceUpdateWithoutClassInput, AbsenceUncheckedUpdateWithoutClassInput>
  }

  export type AbsenceUpdateManyWithWhereWithoutClassInput = {
    where: AbsenceScalarWhereInput
    data: XOR<AbsenceUpdateManyMutationInput, AbsenceUncheckedUpdateManyWithoutClassInput>
  }

  export type TeacherSubjectClassCreateWithoutSubjectInput = {
    schoolYear: string
    teacher: TeacherCreateNestedOneWithoutAssignmentsInput
    class: ClassCreateNestedOneWithoutAssignmentsInput
  }

  export type TeacherSubjectClassUncheckedCreateWithoutSubjectInput = {
    teacherId: number
    classId: number
    schoolYear: string
  }

  export type TeacherSubjectClassCreateOrConnectWithoutSubjectInput = {
    where: TeacherSubjectClassWhereUniqueInput
    create: XOR<TeacherSubjectClassCreateWithoutSubjectInput, TeacherSubjectClassUncheckedCreateWithoutSubjectInput>
  }

  export type TeacherSubjectClassCreateManySubjectInputEnvelope = {
    data: TeacherSubjectClassCreateManySubjectInput | TeacherSubjectClassCreateManySubjectInput[]
    skipDuplicates?: boolean
  }

  export type MarkCreateWithoutSubjectRefInput = {
    subject: string
    value: number
    coefficient?: number
    semester?: number | null
    comment?: string | null
    term: string
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    student: StudentCreateNestedOneWithoutMarksInput
    teacher?: TeacherCreateNestedOneWithoutMarksInput
    class?: ClassCreateNestedOneWithoutMarksInput
  }

  export type MarkUncheckedCreateWithoutSubjectRefInput = {
    id?: number
    studentId: number
    teacherId?: number | null
    classId?: number | null
    subject: string
    value: number
    coefficient?: number
    semester?: number | null
    comment?: string | null
    term: string
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MarkCreateOrConnectWithoutSubjectRefInput = {
    where: MarkWhereUniqueInput
    create: XOR<MarkCreateWithoutSubjectRefInput, MarkUncheckedCreateWithoutSubjectRefInput>
  }

  export type MarkCreateManySubjectRefInputEnvelope = {
    data: MarkCreateManySubjectRefInput | MarkCreateManySubjectRefInput[]
    skipDuplicates?: boolean
  }

  export type TeacherSubjectClassUpsertWithWhereUniqueWithoutSubjectInput = {
    where: TeacherSubjectClassWhereUniqueInput
    update: XOR<TeacherSubjectClassUpdateWithoutSubjectInput, TeacherSubjectClassUncheckedUpdateWithoutSubjectInput>
    create: XOR<TeacherSubjectClassCreateWithoutSubjectInput, TeacherSubjectClassUncheckedCreateWithoutSubjectInput>
  }

  export type TeacherSubjectClassUpdateWithWhereUniqueWithoutSubjectInput = {
    where: TeacherSubjectClassWhereUniqueInput
    data: XOR<TeacherSubjectClassUpdateWithoutSubjectInput, TeacherSubjectClassUncheckedUpdateWithoutSubjectInput>
  }

  export type TeacherSubjectClassUpdateManyWithWhereWithoutSubjectInput = {
    where: TeacherSubjectClassScalarWhereInput
    data: XOR<TeacherSubjectClassUpdateManyMutationInput, TeacherSubjectClassUncheckedUpdateManyWithoutSubjectInput>
  }

  export type MarkUpsertWithWhereUniqueWithoutSubjectRefInput = {
    where: MarkWhereUniqueInput
    update: XOR<MarkUpdateWithoutSubjectRefInput, MarkUncheckedUpdateWithoutSubjectRefInput>
    create: XOR<MarkCreateWithoutSubjectRefInput, MarkUncheckedCreateWithoutSubjectRefInput>
  }

  export type MarkUpdateWithWhereUniqueWithoutSubjectRefInput = {
    where: MarkWhereUniqueInput
    data: XOR<MarkUpdateWithoutSubjectRefInput, MarkUncheckedUpdateWithoutSubjectRefInput>
  }

  export type MarkUpdateManyWithWhereWithoutSubjectRefInput = {
    where: MarkScalarWhereInput
    data: XOR<MarkUpdateManyMutationInput, MarkUncheckedUpdateManyWithoutSubjectRefInput>
  }

  export type UserCreateWithoutTeacherInput = {
    firstName: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: ParentCreateNestedOneWithoutUserInput
    processedRegistrations?: PreRegistrationCreateNestedManyWithoutProcessedByUserInput
    refreshTokens?: RefreshTokenCreateNestedManyWithoutUserInput
    student?: StudentCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTeacherInput = {
    id?: number
    firstName: string
    name: string
    email: string
    passwordHash: string
    role?: $Enums.Role
    active?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: ParentUncheckedCreateNestedOneWithoutUserInput
    processedRegistrations?: PreRegistrationUncheckedCreateNestedManyWithoutProcessedByUserInput
    refreshTokens?: RefreshTokenUncheckedCreateNestedManyWithoutUserInput
    student?: StudentUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTeacherInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTeacherInput, UserUncheckedCreateWithoutTeacherInput>
  }

  export type ClassCreateWithoutHeadTeacherInput = {
    name: string
    level: string
    schoolYear?: string
    maxCapacity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    students?: StudentCreateNestedManyWithoutClassInput
    assignments?: TeacherSubjectClassCreateNestedManyWithoutClassInput
    marks?: MarkCreateNestedManyWithoutClassInput
    absences?: AbsenceCreateNestedManyWithoutClassInput
  }

  export type ClassUncheckedCreateWithoutHeadTeacherInput = {
    id?: number
    name: string
    level: string
    schoolYear?: string
    maxCapacity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    students?: StudentUncheckedCreateNestedManyWithoutClassInput
    assignments?: TeacherSubjectClassUncheckedCreateNestedManyWithoutClassInput
    marks?: MarkUncheckedCreateNestedManyWithoutClassInput
    absences?: AbsenceUncheckedCreateNestedManyWithoutClassInput
  }

  export type ClassCreateOrConnectWithoutHeadTeacherInput = {
    where: ClassWhereUniqueInput
    create: XOR<ClassCreateWithoutHeadTeacherInput, ClassUncheckedCreateWithoutHeadTeacherInput>
  }

  export type ClassCreateManyHeadTeacherInputEnvelope = {
    data: ClassCreateManyHeadTeacherInput | ClassCreateManyHeadTeacherInput[]
    skipDuplicates?: boolean
  }

  export type TeacherSubjectClassCreateWithoutTeacherInput = {
    schoolYear: string
    subject: SubjectCreateNestedOneWithoutAssignmentsInput
    class: ClassCreateNestedOneWithoutAssignmentsInput
  }

  export type TeacherSubjectClassUncheckedCreateWithoutTeacherInput = {
    subjectId: number
    classId: number
    schoolYear: string
  }

  export type TeacherSubjectClassCreateOrConnectWithoutTeacherInput = {
    where: TeacherSubjectClassWhereUniqueInput
    create: XOR<TeacherSubjectClassCreateWithoutTeacherInput, TeacherSubjectClassUncheckedCreateWithoutTeacherInput>
  }

  export type TeacherSubjectClassCreateManyTeacherInputEnvelope = {
    data: TeacherSubjectClassCreateManyTeacherInput | TeacherSubjectClassCreateManyTeacherInput[]
    skipDuplicates?: boolean
  }

  export type MarkCreateWithoutTeacherInput = {
    subject: string
    value: number
    coefficient?: number
    semester?: number | null
    comment?: string | null
    term: string
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
    student: StudentCreateNestedOneWithoutMarksInput
    subjectRef?: SubjectCreateNestedOneWithoutMarksInput
    class?: ClassCreateNestedOneWithoutMarksInput
  }

  export type MarkUncheckedCreateWithoutTeacherInput = {
    id?: number
    studentId: number
    subjectId?: number | null
    classId?: number | null
    subject: string
    value: number
    coefficient?: number
    semester?: number | null
    comment?: string | null
    term: string
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MarkCreateOrConnectWithoutTeacherInput = {
    where: MarkWhereUniqueInput
    create: XOR<MarkCreateWithoutTeacherInput, MarkUncheckedCreateWithoutTeacherInput>
  }

  export type MarkCreateManyTeacherInputEnvelope = {
    data: MarkCreateManyTeacherInput | MarkCreateManyTeacherInput[]
    skipDuplicates?: boolean
  }

  export type AbsenceCreateWithoutTeacherInput = {
    date: Date | string
    status?: $Enums.AbsenceStatus
    reason?: string | null
    justified?: boolean
    parentNotifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    student: StudentCreateNestedOneWithoutAbsencesInput
    class?: ClassCreateNestedOneWithoutAbsencesInput
  }

  export type AbsenceUncheckedCreateWithoutTeacherInput = {
    id?: number
    studentId: number
    classId?: number | null
    date: Date | string
    status?: $Enums.AbsenceStatus
    reason?: string | null
    justified?: boolean
    parentNotifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AbsenceCreateOrConnectWithoutTeacherInput = {
    where: AbsenceWhereUniqueInput
    create: XOR<AbsenceCreateWithoutTeacherInput, AbsenceUncheckedCreateWithoutTeacherInput>
  }

  export type AbsenceCreateManyTeacherInputEnvelope = {
    data: AbsenceCreateManyTeacherInput | AbsenceCreateManyTeacherInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutTeacherInput = {
    update: XOR<UserUpdateWithoutTeacherInput, UserUncheckedUpdateWithoutTeacherInput>
    create: XOR<UserCreateWithoutTeacherInput, UserUncheckedCreateWithoutTeacherInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTeacherInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTeacherInput, UserUncheckedUpdateWithoutTeacherInput>
  }

  export type UserUpdateWithoutTeacherInput = {
    firstName?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: ParentUpdateOneWithoutUserNestedInput
    processedRegistrations?: PreRegistrationUpdateManyWithoutProcessedByUserNestedInput
    refreshTokens?: RefreshTokenUpdateManyWithoutUserNestedInput
    student?: StudentUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTeacherInput = {
    id?: IntFieldUpdateOperationsInput | number
    firstName?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    active?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: ParentUncheckedUpdateOneWithoutUserNestedInput
    processedRegistrations?: PreRegistrationUncheckedUpdateManyWithoutProcessedByUserNestedInput
    refreshTokens?: RefreshTokenUncheckedUpdateManyWithoutUserNestedInput
    student?: StudentUncheckedUpdateOneWithoutUserNestedInput
  }

  export type ClassUpsertWithWhereUniqueWithoutHeadTeacherInput = {
    where: ClassWhereUniqueInput
    update: XOR<ClassUpdateWithoutHeadTeacherInput, ClassUncheckedUpdateWithoutHeadTeacherInput>
    create: XOR<ClassCreateWithoutHeadTeacherInput, ClassUncheckedCreateWithoutHeadTeacherInput>
  }

  export type ClassUpdateWithWhereUniqueWithoutHeadTeacherInput = {
    where: ClassWhereUniqueInput
    data: XOR<ClassUpdateWithoutHeadTeacherInput, ClassUncheckedUpdateWithoutHeadTeacherInput>
  }

  export type ClassUpdateManyWithWhereWithoutHeadTeacherInput = {
    where: ClassScalarWhereInput
    data: XOR<ClassUpdateManyMutationInput, ClassUncheckedUpdateManyWithoutHeadTeacherInput>
  }

  export type ClassScalarWhereInput = {
    AND?: ClassScalarWhereInput | ClassScalarWhereInput[]
    OR?: ClassScalarWhereInput[]
    NOT?: ClassScalarWhereInput | ClassScalarWhereInput[]
    id?: IntFilter<"Class"> | number
    name?: StringFilter<"Class"> | string
    level?: StringFilter<"Class"> | string
    schoolYear?: StringFilter<"Class"> | string
    maxCapacity?: IntFilter<"Class"> | number
    headTeacherId?: IntNullableFilter<"Class"> | number | null
    createdAt?: DateTimeFilter<"Class"> | Date | string
    updatedAt?: DateTimeFilter<"Class"> | Date | string
  }

  export type TeacherSubjectClassUpsertWithWhereUniqueWithoutTeacherInput = {
    where: TeacherSubjectClassWhereUniqueInput
    update: XOR<TeacherSubjectClassUpdateWithoutTeacherInput, TeacherSubjectClassUncheckedUpdateWithoutTeacherInput>
    create: XOR<TeacherSubjectClassCreateWithoutTeacherInput, TeacherSubjectClassUncheckedCreateWithoutTeacherInput>
  }

  export type TeacherSubjectClassUpdateWithWhereUniqueWithoutTeacherInput = {
    where: TeacherSubjectClassWhereUniqueInput
    data: XOR<TeacherSubjectClassUpdateWithoutTeacherInput, TeacherSubjectClassUncheckedUpdateWithoutTeacherInput>
  }

  export type TeacherSubjectClassUpdateManyWithWhereWithoutTeacherInput = {
    where: TeacherSubjectClassScalarWhereInput
    data: XOR<TeacherSubjectClassUpdateManyMutationInput, TeacherSubjectClassUncheckedUpdateManyWithoutTeacherInput>
  }

  export type MarkUpsertWithWhereUniqueWithoutTeacherInput = {
    where: MarkWhereUniqueInput
    update: XOR<MarkUpdateWithoutTeacherInput, MarkUncheckedUpdateWithoutTeacherInput>
    create: XOR<MarkCreateWithoutTeacherInput, MarkUncheckedCreateWithoutTeacherInput>
  }

  export type MarkUpdateWithWhereUniqueWithoutTeacherInput = {
    where: MarkWhereUniqueInput
    data: XOR<MarkUpdateWithoutTeacherInput, MarkUncheckedUpdateWithoutTeacherInput>
  }

  export type MarkUpdateManyWithWhereWithoutTeacherInput = {
    where: MarkScalarWhereInput
    data: XOR<MarkUpdateManyMutationInput, MarkUncheckedUpdateManyWithoutTeacherInput>
  }

  export type AbsenceUpsertWithWhereUniqueWithoutTeacherInput = {
    where: AbsenceWhereUniqueInput
    update: XOR<AbsenceUpdateWithoutTeacherInput, AbsenceUncheckedUpdateWithoutTeacherInput>
    create: XOR<AbsenceCreateWithoutTeacherInput, AbsenceUncheckedCreateWithoutTeacherInput>
  }

  export type AbsenceUpdateWithWhereUniqueWithoutTeacherInput = {
    where: AbsenceWhereUniqueInput
    data: XOR<AbsenceUpdateWithoutTeacherInput, AbsenceUncheckedUpdateWithoutTeacherInput>
  }

  export type AbsenceUpdateManyWithWhereWithoutTeacherInput = {
    where: AbsenceScalarWhereInput
    data: XOR<AbsenceUpdateManyMutationInput, AbsenceUncheckedUpdateManyWithoutTeacherInput>
  }

  export type TeacherCreateWithoutAssignmentsInput = {
    speciality?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTeacherInput
    headOfClasses?: ClassCreateNestedManyWithoutHeadTeacherInput
    marks?: MarkCreateNestedManyWithoutTeacherInput
    absences?: AbsenceCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUncheckedCreateWithoutAssignmentsInput = {
    id?: number
    userId: number
    speciality?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    headOfClasses?: ClassUncheckedCreateNestedManyWithoutHeadTeacherInput
    marks?: MarkUncheckedCreateNestedManyWithoutTeacherInput
    absences?: AbsenceUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type TeacherCreateOrConnectWithoutAssignmentsInput = {
    where: TeacherWhereUniqueInput
    create: XOR<TeacherCreateWithoutAssignmentsInput, TeacherUncheckedCreateWithoutAssignmentsInput>
  }

  export type SubjectCreateWithoutAssignmentsInput = {
    name: string
    code: string
    coefficient?: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    marks?: MarkCreateNestedManyWithoutSubjectRefInput
  }

  export type SubjectUncheckedCreateWithoutAssignmentsInput = {
    id?: number
    name: string
    code: string
    coefficient?: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    marks?: MarkUncheckedCreateNestedManyWithoutSubjectRefInput
  }

  export type SubjectCreateOrConnectWithoutAssignmentsInput = {
    where: SubjectWhereUniqueInput
    create: XOR<SubjectCreateWithoutAssignmentsInput, SubjectUncheckedCreateWithoutAssignmentsInput>
  }

  export type ClassCreateWithoutAssignmentsInput = {
    name: string
    level: string
    schoolYear?: string
    maxCapacity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    students?: StudentCreateNestedManyWithoutClassInput
    headTeacher?: TeacherCreateNestedOneWithoutHeadOfClassesInput
    marks?: MarkCreateNestedManyWithoutClassInput
    absences?: AbsenceCreateNestedManyWithoutClassInput
  }

  export type ClassUncheckedCreateWithoutAssignmentsInput = {
    id?: number
    name: string
    level: string
    schoolYear?: string
    maxCapacity?: number
    headTeacherId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    students?: StudentUncheckedCreateNestedManyWithoutClassInput
    marks?: MarkUncheckedCreateNestedManyWithoutClassInput
    absences?: AbsenceUncheckedCreateNestedManyWithoutClassInput
  }

  export type ClassCreateOrConnectWithoutAssignmentsInput = {
    where: ClassWhereUniqueInput
    create: XOR<ClassCreateWithoutAssignmentsInput, ClassUncheckedCreateWithoutAssignmentsInput>
  }

  export type TeacherUpsertWithoutAssignmentsInput = {
    update: XOR<TeacherUpdateWithoutAssignmentsInput, TeacherUncheckedUpdateWithoutAssignmentsInput>
    create: XOR<TeacherCreateWithoutAssignmentsInput, TeacherUncheckedCreateWithoutAssignmentsInput>
    where?: TeacherWhereInput
  }

  export type TeacherUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: TeacherWhereInput
    data: XOR<TeacherUpdateWithoutAssignmentsInput, TeacherUncheckedUpdateWithoutAssignmentsInput>
  }

  export type TeacherUpdateWithoutAssignmentsInput = {
    speciality?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTeacherNestedInput
    headOfClasses?: ClassUpdateManyWithoutHeadTeacherNestedInput
    marks?: MarkUpdateManyWithoutTeacherNestedInput
    absences?: AbsenceUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateWithoutAssignmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    speciality?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    headOfClasses?: ClassUncheckedUpdateManyWithoutHeadTeacherNestedInput
    marks?: MarkUncheckedUpdateManyWithoutTeacherNestedInput
    absences?: AbsenceUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type SubjectUpsertWithoutAssignmentsInput = {
    update: XOR<SubjectUpdateWithoutAssignmentsInput, SubjectUncheckedUpdateWithoutAssignmentsInput>
    create: XOR<SubjectCreateWithoutAssignmentsInput, SubjectUncheckedCreateWithoutAssignmentsInput>
    where?: SubjectWhereInput
  }

  export type SubjectUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: SubjectWhereInput
    data: XOR<SubjectUpdateWithoutAssignmentsInput, SubjectUncheckedUpdateWithoutAssignmentsInput>
  }

  export type SubjectUpdateWithoutAssignmentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    coefficient?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    marks?: MarkUpdateManyWithoutSubjectRefNestedInput
  }

  export type SubjectUncheckedUpdateWithoutAssignmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    coefficient?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    marks?: MarkUncheckedUpdateManyWithoutSubjectRefNestedInput
  }

  export type ClassUpsertWithoutAssignmentsInput = {
    update: XOR<ClassUpdateWithoutAssignmentsInput, ClassUncheckedUpdateWithoutAssignmentsInput>
    create: XOR<ClassCreateWithoutAssignmentsInput, ClassUncheckedCreateWithoutAssignmentsInput>
    where?: ClassWhereInput
  }

  export type ClassUpdateToOneWithWhereWithoutAssignmentsInput = {
    where?: ClassWhereInput
    data: XOR<ClassUpdateWithoutAssignmentsInput, ClassUncheckedUpdateWithoutAssignmentsInput>
  }

  export type ClassUpdateWithoutAssignmentsInput = {
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    schoolYear?: StringFieldUpdateOperationsInput | string
    maxCapacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentUpdateManyWithoutClassNestedInput
    headTeacher?: TeacherUpdateOneWithoutHeadOfClassesNestedInput
    marks?: MarkUpdateManyWithoutClassNestedInput
    absences?: AbsenceUpdateManyWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateWithoutAssignmentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    schoolYear?: StringFieldUpdateOperationsInput | string
    maxCapacity?: IntFieldUpdateOperationsInput | number
    headTeacherId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentUncheckedUpdateManyWithoutClassNestedInput
    marks?: MarkUncheckedUpdateManyWithoutClassNestedInput
    absences?: AbsenceUncheckedUpdateManyWithoutClassNestedInput
  }

  export type StudentCreateWithoutMarksInput = {
    status?: $Enums.StudentStatus
    schoolYear: string
    birthDate: Date | string
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    absences?: AbsenceCreateNestedManyWithoutStudentInput
    payments?: PaymentCreateNestedManyWithoutStudentInput
    preRegistration?: PreRegistrationCreateNestedOneWithoutStudentInput
    class?: ClassCreateNestedOneWithoutStudentsInput
    parent?: ParentCreateNestedOneWithoutStudentsInput
    user: UserCreateNestedOneWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutMarksInput = {
    id?: number
    userId: number
    classId?: number | null
    status?: $Enums.StudentStatus
    schoolYear: string
    birthDate: Date | string
    address?: string | null
    parentId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    absences?: AbsenceUncheckedCreateNestedManyWithoutStudentInput
    payments?: PaymentUncheckedCreateNestedManyWithoutStudentInput
    preRegistration?: PreRegistrationUncheckedCreateNestedOneWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutMarksInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutMarksInput, StudentUncheckedCreateWithoutMarksInput>
  }

  export type SubjectCreateWithoutMarksInput = {
    name: string
    code: string
    coefficient?: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignments?: TeacherSubjectClassCreateNestedManyWithoutSubjectInput
  }

  export type SubjectUncheckedCreateWithoutMarksInput = {
    id?: number
    name: string
    code: string
    coefficient?: number
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    assignments?: TeacherSubjectClassUncheckedCreateNestedManyWithoutSubjectInput
  }

  export type SubjectCreateOrConnectWithoutMarksInput = {
    where: SubjectWhereUniqueInput
    create: XOR<SubjectCreateWithoutMarksInput, SubjectUncheckedCreateWithoutMarksInput>
  }

  export type TeacherCreateWithoutMarksInput = {
    speciality?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTeacherInput
    headOfClasses?: ClassCreateNestedManyWithoutHeadTeacherInput
    assignments?: TeacherSubjectClassCreateNestedManyWithoutTeacherInput
    absences?: AbsenceCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUncheckedCreateWithoutMarksInput = {
    id?: number
    userId: number
    speciality?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    headOfClasses?: ClassUncheckedCreateNestedManyWithoutHeadTeacherInput
    assignments?: TeacherSubjectClassUncheckedCreateNestedManyWithoutTeacherInput
    absences?: AbsenceUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type TeacherCreateOrConnectWithoutMarksInput = {
    where: TeacherWhereUniqueInput
    create: XOR<TeacherCreateWithoutMarksInput, TeacherUncheckedCreateWithoutMarksInput>
  }

  export type ClassCreateWithoutMarksInput = {
    name: string
    level: string
    schoolYear?: string
    maxCapacity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    students?: StudentCreateNestedManyWithoutClassInput
    headTeacher?: TeacherCreateNestedOneWithoutHeadOfClassesInput
    assignments?: TeacherSubjectClassCreateNestedManyWithoutClassInput
    absences?: AbsenceCreateNestedManyWithoutClassInput
  }

  export type ClassUncheckedCreateWithoutMarksInput = {
    id?: number
    name: string
    level: string
    schoolYear?: string
    maxCapacity?: number
    headTeacherId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    students?: StudentUncheckedCreateNestedManyWithoutClassInput
    assignments?: TeacherSubjectClassUncheckedCreateNestedManyWithoutClassInput
    absences?: AbsenceUncheckedCreateNestedManyWithoutClassInput
  }

  export type ClassCreateOrConnectWithoutMarksInput = {
    where: ClassWhereUniqueInput
    create: XOR<ClassCreateWithoutMarksInput, ClassUncheckedCreateWithoutMarksInput>
  }

  export type StudentUpsertWithoutMarksInput = {
    update: XOR<StudentUpdateWithoutMarksInput, StudentUncheckedUpdateWithoutMarksInput>
    create: XOR<StudentCreateWithoutMarksInput, StudentUncheckedCreateWithoutMarksInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutMarksInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutMarksInput, StudentUncheckedUpdateWithoutMarksInput>
  }

  export type StudentUpdateWithoutMarksInput = {
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    schoolYear?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    absences?: AbsenceUpdateManyWithoutStudentNestedInput
    payments?: PaymentUpdateManyWithoutStudentNestedInput
    preRegistration?: PreRegistrationUpdateOneWithoutStudentNestedInput
    class?: ClassUpdateOneWithoutStudentsNestedInput
    parent?: ParentUpdateOneWithoutStudentsNestedInput
    user?: UserUpdateOneRequiredWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutMarksInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    classId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    schoolYear?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    absences?: AbsenceUncheckedUpdateManyWithoutStudentNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutStudentNestedInput
    preRegistration?: PreRegistrationUncheckedUpdateOneWithoutStudentNestedInput
  }

  export type SubjectUpsertWithoutMarksInput = {
    update: XOR<SubjectUpdateWithoutMarksInput, SubjectUncheckedUpdateWithoutMarksInput>
    create: XOR<SubjectCreateWithoutMarksInput, SubjectUncheckedCreateWithoutMarksInput>
    where?: SubjectWhereInput
  }

  export type SubjectUpdateToOneWithWhereWithoutMarksInput = {
    where?: SubjectWhereInput
    data: XOR<SubjectUpdateWithoutMarksInput, SubjectUncheckedUpdateWithoutMarksInput>
  }

  export type SubjectUpdateWithoutMarksInput = {
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    coefficient?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: TeacherSubjectClassUpdateManyWithoutSubjectNestedInput
  }

  export type SubjectUncheckedUpdateWithoutMarksInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    coefficient?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    assignments?: TeacherSubjectClassUncheckedUpdateManyWithoutSubjectNestedInput
  }

  export type TeacherUpsertWithoutMarksInput = {
    update: XOR<TeacherUpdateWithoutMarksInput, TeacherUncheckedUpdateWithoutMarksInput>
    create: XOR<TeacherCreateWithoutMarksInput, TeacherUncheckedCreateWithoutMarksInput>
    where?: TeacherWhereInput
  }

  export type TeacherUpdateToOneWithWhereWithoutMarksInput = {
    where?: TeacherWhereInput
    data: XOR<TeacherUpdateWithoutMarksInput, TeacherUncheckedUpdateWithoutMarksInput>
  }

  export type TeacherUpdateWithoutMarksInput = {
    speciality?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTeacherNestedInput
    headOfClasses?: ClassUpdateManyWithoutHeadTeacherNestedInput
    assignments?: TeacherSubjectClassUpdateManyWithoutTeacherNestedInput
    absences?: AbsenceUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateWithoutMarksInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    speciality?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    headOfClasses?: ClassUncheckedUpdateManyWithoutHeadTeacherNestedInput
    assignments?: TeacherSubjectClassUncheckedUpdateManyWithoutTeacherNestedInput
    absences?: AbsenceUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type ClassUpsertWithoutMarksInput = {
    update: XOR<ClassUpdateWithoutMarksInput, ClassUncheckedUpdateWithoutMarksInput>
    create: XOR<ClassCreateWithoutMarksInput, ClassUncheckedCreateWithoutMarksInput>
    where?: ClassWhereInput
  }

  export type ClassUpdateToOneWithWhereWithoutMarksInput = {
    where?: ClassWhereInput
    data: XOR<ClassUpdateWithoutMarksInput, ClassUncheckedUpdateWithoutMarksInput>
  }

  export type ClassUpdateWithoutMarksInput = {
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    schoolYear?: StringFieldUpdateOperationsInput | string
    maxCapacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentUpdateManyWithoutClassNestedInput
    headTeacher?: TeacherUpdateOneWithoutHeadOfClassesNestedInput
    assignments?: TeacherSubjectClassUpdateManyWithoutClassNestedInput
    absences?: AbsenceUpdateManyWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateWithoutMarksInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    schoolYear?: StringFieldUpdateOperationsInput | string
    maxCapacity?: IntFieldUpdateOperationsInput | number
    headTeacherId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentUncheckedUpdateManyWithoutClassNestedInput
    assignments?: TeacherSubjectClassUncheckedUpdateManyWithoutClassNestedInput
    absences?: AbsenceUncheckedUpdateManyWithoutClassNestedInput
  }

  export type StudentCreateWithoutAbsencesInput = {
    status?: $Enums.StudentStatus
    schoolYear: string
    birthDate: Date | string
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    marks?: MarkCreateNestedManyWithoutStudentInput
    payments?: PaymentCreateNestedManyWithoutStudentInput
    preRegistration?: PreRegistrationCreateNestedOneWithoutStudentInput
    class?: ClassCreateNestedOneWithoutStudentsInput
    parent?: ParentCreateNestedOneWithoutStudentsInput
    user: UserCreateNestedOneWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutAbsencesInput = {
    id?: number
    userId: number
    classId?: number | null
    status?: $Enums.StudentStatus
    schoolYear: string
    birthDate: Date | string
    address?: string | null
    parentId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    marks?: MarkUncheckedCreateNestedManyWithoutStudentInput
    payments?: PaymentUncheckedCreateNestedManyWithoutStudentInput
    preRegistration?: PreRegistrationUncheckedCreateNestedOneWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutAbsencesInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutAbsencesInput, StudentUncheckedCreateWithoutAbsencesInput>
  }

  export type TeacherCreateWithoutAbsencesInput = {
    speciality?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutTeacherInput
    headOfClasses?: ClassCreateNestedManyWithoutHeadTeacherInput
    assignments?: TeacherSubjectClassCreateNestedManyWithoutTeacherInput
    marks?: MarkCreateNestedManyWithoutTeacherInput
  }

  export type TeacherUncheckedCreateWithoutAbsencesInput = {
    id?: number
    userId: number
    speciality?: string | null
    phone?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    headOfClasses?: ClassUncheckedCreateNestedManyWithoutHeadTeacherInput
    assignments?: TeacherSubjectClassUncheckedCreateNestedManyWithoutTeacherInput
    marks?: MarkUncheckedCreateNestedManyWithoutTeacherInput
  }

  export type TeacherCreateOrConnectWithoutAbsencesInput = {
    where: TeacherWhereUniqueInput
    create: XOR<TeacherCreateWithoutAbsencesInput, TeacherUncheckedCreateWithoutAbsencesInput>
  }

  export type ClassCreateWithoutAbsencesInput = {
    name: string
    level: string
    schoolYear?: string
    maxCapacity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    students?: StudentCreateNestedManyWithoutClassInput
    headTeacher?: TeacherCreateNestedOneWithoutHeadOfClassesInput
    assignments?: TeacherSubjectClassCreateNestedManyWithoutClassInput
    marks?: MarkCreateNestedManyWithoutClassInput
  }

  export type ClassUncheckedCreateWithoutAbsencesInput = {
    id?: number
    name: string
    level: string
    schoolYear?: string
    maxCapacity?: number
    headTeacherId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    students?: StudentUncheckedCreateNestedManyWithoutClassInput
    assignments?: TeacherSubjectClassUncheckedCreateNestedManyWithoutClassInput
    marks?: MarkUncheckedCreateNestedManyWithoutClassInput
  }

  export type ClassCreateOrConnectWithoutAbsencesInput = {
    where: ClassWhereUniqueInput
    create: XOR<ClassCreateWithoutAbsencesInput, ClassUncheckedCreateWithoutAbsencesInput>
  }

  export type StudentUpsertWithoutAbsencesInput = {
    update: XOR<StudentUpdateWithoutAbsencesInput, StudentUncheckedUpdateWithoutAbsencesInput>
    create: XOR<StudentCreateWithoutAbsencesInput, StudentUncheckedCreateWithoutAbsencesInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutAbsencesInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutAbsencesInput, StudentUncheckedUpdateWithoutAbsencesInput>
  }

  export type StudentUpdateWithoutAbsencesInput = {
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    schoolYear?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    marks?: MarkUpdateManyWithoutStudentNestedInput
    payments?: PaymentUpdateManyWithoutStudentNestedInput
    preRegistration?: PreRegistrationUpdateOneWithoutStudentNestedInput
    class?: ClassUpdateOneWithoutStudentsNestedInput
    parent?: ParentUpdateOneWithoutStudentsNestedInput
    user?: UserUpdateOneRequiredWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutAbsencesInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    classId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    schoolYear?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    marks?: MarkUncheckedUpdateManyWithoutStudentNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutStudentNestedInput
    preRegistration?: PreRegistrationUncheckedUpdateOneWithoutStudentNestedInput
  }

  export type TeacherUpsertWithoutAbsencesInput = {
    update: XOR<TeacherUpdateWithoutAbsencesInput, TeacherUncheckedUpdateWithoutAbsencesInput>
    create: XOR<TeacherCreateWithoutAbsencesInput, TeacherUncheckedCreateWithoutAbsencesInput>
    where?: TeacherWhereInput
  }

  export type TeacherUpdateToOneWithWhereWithoutAbsencesInput = {
    where?: TeacherWhereInput
    data: XOR<TeacherUpdateWithoutAbsencesInput, TeacherUncheckedUpdateWithoutAbsencesInput>
  }

  export type TeacherUpdateWithoutAbsencesInput = {
    speciality?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTeacherNestedInput
    headOfClasses?: ClassUpdateManyWithoutHeadTeacherNestedInput
    assignments?: TeacherSubjectClassUpdateManyWithoutTeacherNestedInput
    marks?: MarkUpdateManyWithoutTeacherNestedInput
  }

  export type TeacherUncheckedUpdateWithoutAbsencesInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    speciality?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    headOfClasses?: ClassUncheckedUpdateManyWithoutHeadTeacherNestedInput
    assignments?: TeacherSubjectClassUncheckedUpdateManyWithoutTeacherNestedInput
    marks?: MarkUncheckedUpdateManyWithoutTeacherNestedInput
  }

  export type ClassUpsertWithoutAbsencesInput = {
    update: XOR<ClassUpdateWithoutAbsencesInput, ClassUncheckedUpdateWithoutAbsencesInput>
    create: XOR<ClassCreateWithoutAbsencesInput, ClassUncheckedCreateWithoutAbsencesInput>
    where?: ClassWhereInput
  }

  export type ClassUpdateToOneWithWhereWithoutAbsencesInput = {
    where?: ClassWhereInput
    data: XOR<ClassUpdateWithoutAbsencesInput, ClassUncheckedUpdateWithoutAbsencesInput>
  }

  export type ClassUpdateWithoutAbsencesInput = {
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    schoolYear?: StringFieldUpdateOperationsInput | string
    maxCapacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentUpdateManyWithoutClassNestedInput
    headTeacher?: TeacherUpdateOneWithoutHeadOfClassesNestedInput
    assignments?: TeacherSubjectClassUpdateManyWithoutClassNestedInput
    marks?: MarkUpdateManyWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateWithoutAbsencesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    schoolYear?: StringFieldUpdateOperationsInput | string
    maxCapacity?: IntFieldUpdateOperationsInput | number
    headTeacherId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentUncheckedUpdateManyWithoutClassNestedInput
    assignments?: TeacherSubjectClassUncheckedUpdateManyWithoutClassNestedInput
    marks?: MarkUncheckedUpdateManyWithoutClassNestedInput
  }

  export type StudentCreateWithoutPaymentsInput = {
    status?: $Enums.StudentStatus
    schoolYear: string
    birthDate: Date | string
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    absences?: AbsenceCreateNestedManyWithoutStudentInput
    marks?: MarkCreateNestedManyWithoutStudentInput
    preRegistration?: PreRegistrationCreateNestedOneWithoutStudentInput
    class?: ClassCreateNestedOneWithoutStudentsInput
    parent?: ParentCreateNestedOneWithoutStudentsInput
    user: UserCreateNestedOneWithoutStudentInput
  }

  export type StudentUncheckedCreateWithoutPaymentsInput = {
    id?: number
    userId: number
    classId?: number | null
    status?: $Enums.StudentStatus
    schoolYear: string
    birthDate: Date | string
    address?: string | null
    parentId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    absences?: AbsenceUncheckedCreateNestedManyWithoutStudentInput
    marks?: MarkUncheckedCreateNestedManyWithoutStudentInput
    preRegistration?: PreRegistrationUncheckedCreateNestedOneWithoutStudentInput
  }

  export type StudentCreateOrConnectWithoutPaymentsInput = {
    where: StudentWhereUniqueInput
    create: XOR<StudentCreateWithoutPaymentsInput, StudentUncheckedCreateWithoutPaymentsInput>
  }

  export type StudentUpsertWithoutPaymentsInput = {
    update: XOR<StudentUpdateWithoutPaymentsInput, StudentUncheckedUpdateWithoutPaymentsInput>
    create: XOR<StudentCreateWithoutPaymentsInput, StudentUncheckedCreateWithoutPaymentsInput>
    where?: StudentWhereInput
  }

  export type StudentUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: StudentWhereInput
    data: XOR<StudentUpdateWithoutPaymentsInput, StudentUncheckedUpdateWithoutPaymentsInput>
  }

  export type StudentUpdateWithoutPaymentsInput = {
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    schoolYear?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    absences?: AbsenceUpdateManyWithoutStudentNestedInput
    marks?: MarkUpdateManyWithoutStudentNestedInput
    preRegistration?: PreRegistrationUpdateOneWithoutStudentNestedInput
    class?: ClassUpdateOneWithoutStudentsNestedInput
    parent?: ParentUpdateOneWithoutStudentsNestedInput
    user?: UserUpdateOneRequiredWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutPaymentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    classId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    schoolYear?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    absences?: AbsenceUncheckedUpdateManyWithoutStudentNestedInput
    marks?: MarkUncheckedUpdateManyWithoutStudentNestedInput
    preRegistration?: PreRegistrationUncheckedUpdateOneWithoutStudentNestedInput
  }

  export type PreRegistrationCreateManyProcessedByUserInput = {
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
    processedAt?: Date | string | null
    studentId?: number | null
    submittedAt?: Date | string
    updatedAt?: Date | string
    parentEmailSentAt?: Date | string | null
    studentEmailSentAt?: Date | string | null
  }

  export type RefreshTokenCreateManyUserInput = {
    id?: number
    token: string
    expiresAt: Date | string
    createdAt?: Date | string
    revoked?: boolean
  }

  export type PreRegistrationUpdateWithoutProcessedByUserInput = {
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
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentEmailSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    studentEmailSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    student?: StudentUpdateOneWithoutPreRegistrationNestedInput
  }

  export type PreRegistrationUncheckedUpdateWithoutProcessedByUserInput = {
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
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    studentId?: NullableIntFieldUpdateOperationsInput | number | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentEmailSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    studentEmailSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type PreRegistrationUncheckedUpdateManyWithoutProcessedByUserInput = {
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
    processedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    studentId?: NullableIntFieldUpdateOperationsInput | number | null
    submittedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parentEmailSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    studentEmailSentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type RefreshTokenUpdateWithoutUserInput = {
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RefreshTokenUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RefreshTokenUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    token?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    revoked?: BoolFieldUpdateOperationsInput | boolean
  }

  export type AbsenceCreateManyStudentInput = {
    id?: number
    teacherId?: number | null
    classId?: number | null
    date: Date | string
    status?: $Enums.AbsenceStatus
    reason?: string | null
    justified?: boolean
    parentNotifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MarkCreateManyStudentInput = {
    id?: number
    subjectId?: number | null
    teacherId?: number | null
    classId?: number | null
    subject: string
    value: number
    coefficient?: number
    semester?: number | null
    comment?: string | null
    term: string
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PaymentCreateManyStudentInput = {
    id?: number
    amount: number
    dueDate: Date | string
    status?: $Enums.PaymentStatus
    paymentDate?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AbsenceUpdateWithoutStudentInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAbsenceStatusFieldUpdateOperationsInput | $Enums.AbsenceStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    justified?: BoolFieldUpdateOperationsInput | boolean
    parentNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    teacher?: TeacherUpdateOneWithoutAbsencesNestedInput
    class?: ClassUpdateOneWithoutAbsencesNestedInput
  }

  export type AbsenceUncheckedUpdateWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    teacherId?: NullableIntFieldUpdateOperationsInput | number | null
    classId?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAbsenceStatusFieldUpdateOperationsInput | $Enums.AbsenceStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    justified?: BoolFieldUpdateOperationsInput | boolean
    parentNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AbsenceUncheckedUpdateManyWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    teacherId?: NullableIntFieldUpdateOperationsInput | number | null
    classId?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAbsenceStatusFieldUpdateOperationsInput | $Enums.AbsenceStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    justified?: BoolFieldUpdateOperationsInput | boolean
    parentNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarkUpdateWithoutStudentInput = {
    subject?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    coefficient?: FloatFieldUpdateOperationsInput | number
    semester?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    term?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subjectRef?: SubjectUpdateOneWithoutMarksNestedInput
    teacher?: TeacherUpdateOneWithoutMarksNestedInput
    class?: ClassUpdateOneWithoutMarksNestedInput
  }

  export type MarkUncheckedUpdateWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    subjectId?: NullableIntFieldUpdateOperationsInput | number | null
    teacherId?: NullableIntFieldUpdateOperationsInput | number | null
    classId?: NullableIntFieldUpdateOperationsInput | number | null
    subject?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    coefficient?: FloatFieldUpdateOperationsInput | number
    semester?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    term?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarkUncheckedUpdateManyWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    subjectId?: NullableIntFieldUpdateOperationsInput | number | null
    teacherId?: NullableIntFieldUpdateOperationsInput | number | null
    classId?: NullableIntFieldUpdateOperationsInput | number | null
    subject?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    coefficient?: FloatFieldUpdateOperationsInput | number
    semester?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    term?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUpdateWithoutStudentInput = {
    amount?: FloatFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PaymentUncheckedUpdateManyWithoutStudentInput = {
    id?: IntFieldUpdateOperationsInput | number
    amount?: FloatFieldUpdateOperationsInput | number
    dueDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumPaymentStatusFieldUpdateOperationsInput | $Enums.PaymentStatus
    paymentDate?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentCreateManyParentInput = {
    id?: number
    userId: number
    classId?: number | null
    status?: $Enums.StudentStatus
    schoolYear: string
    birthDate: Date | string
    address?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentUpdateWithoutParentInput = {
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    schoolYear?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    absences?: AbsenceUpdateManyWithoutStudentNestedInput
    marks?: MarkUpdateManyWithoutStudentNestedInput
    payments?: PaymentUpdateManyWithoutStudentNestedInput
    preRegistration?: PreRegistrationUpdateOneWithoutStudentNestedInput
    class?: ClassUpdateOneWithoutStudentsNestedInput
    user?: UserUpdateOneRequiredWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutParentInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    classId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    schoolYear?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    absences?: AbsenceUncheckedUpdateManyWithoutStudentNestedInput
    marks?: MarkUncheckedUpdateManyWithoutStudentNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutStudentNestedInput
    preRegistration?: PreRegistrationUncheckedUpdateOneWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateManyWithoutParentInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    classId?: NullableIntFieldUpdateOperationsInput | number | null
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    schoolYear?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StudentCreateManyClassInput = {
    id?: number
    userId: number
    status?: $Enums.StudentStatus
    schoolYear: string
    birthDate: Date | string
    address?: string | null
    parentId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeacherSubjectClassCreateManyClassInput = {
    teacherId: number
    subjectId: number
    schoolYear: string
  }

  export type MarkCreateManyClassInput = {
    id?: number
    studentId: number
    subjectId?: number | null
    teacherId?: number | null
    subject: string
    value: number
    coefficient?: number
    semester?: number | null
    comment?: string | null
    term: string
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AbsenceCreateManyClassInput = {
    id?: number
    studentId: number
    teacherId?: number | null
    date: Date | string
    status?: $Enums.AbsenceStatus
    reason?: string | null
    justified?: boolean
    parentNotifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type StudentUpdateWithoutClassInput = {
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    schoolYear?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    absences?: AbsenceUpdateManyWithoutStudentNestedInput
    marks?: MarkUpdateManyWithoutStudentNestedInput
    payments?: PaymentUpdateManyWithoutStudentNestedInput
    preRegistration?: PreRegistrationUpdateOneWithoutStudentNestedInput
    parent?: ParentUpdateOneWithoutStudentsNestedInput
    user?: UserUpdateOneRequiredWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateWithoutClassInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    schoolYear?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    absences?: AbsenceUncheckedUpdateManyWithoutStudentNestedInput
    marks?: MarkUncheckedUpdateManyWithoutStudentNestedInput
    payments?: PaymentUncheckedUpdateManyWithoutStudentNestedInput
    preRegistration?: PreRegistrationUncheckedUpdateOneWithoutStudentNestedInput
  }

  export type StudentUncheckedUpdateManyWithoutClassInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    status?: EnumStudentStatusFieldUpdateOperationsInput | $Enums.StudentStatus
    schoolYear?: StringFieldUpdateOperationsInput | string
    birthDate?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    parentId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeacherSubjectClassUpdateWithoutClassInput = {
    schoolYear?: StringFieldUpdateOperationsInput | string
    teacher?: TeacherUpdateOneRequiredWithoutAssignmentsNestedInput
    subject?: SubjectUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type TeacherSubjectClassUncheckedUpdateWithoutClassInput = {
    teacherId?: IntFieldUpdateOperationsInput | number
    subjectId?: IntFieldUpdateOperationsInput | number
    schoolYear?: StringFieldUpdateOperationsInput | string
  }

  export type TeacherSubjectClassUncheckedUpdateManyWithoutClassInput = {
    teacherId?: IntFieldUpdateOperationsInput | number
    subjectId?: IntFieldUpdateOperationsInput | number
    schoolYear?: StringFieldUpdateOperationsInput | string
  }

  export type MarkUpdateWithoutClassInput = {
    subject?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    coefficient?: FloatFieldUpdateOperationsInput | number
    semester?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    term?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutMarksNestedInput
    subjectRef?: SubjectUpdateOneWithoutMarksNestedInput
    teacher?: TeacherUpdateOneWithoutMarksNestedInput
  }

  export type MarkUncheckedUpdateWithoutClassInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    subjectId?: NullableIntFieldUpdateOperationsInput | number | null
    teacherId?: NullableIntFieldUpdateOperationsInput | number | null
    subject?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    coefficient?: FloatFieldUpdateOperationsInput | number
    semester?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    term?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarkUncheckedUpdateManyWithoutClassInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    subjectId?: NullableIntFieldUpdateOperationsInput | number | null
    teacherId?: NullableIntFieldUpdateOperationsInput | number | null
    subject?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    coefficient?: FloatFieldUpdateOperationsInput | number
    semester?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    term?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AbsenceUpdateWithoutClassInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAbsenceStatusFieldUpdateOperationsInput | $Enums.AbsenceStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    justified?: BoolFieldUpdateOperationsInput | boolean
    parentNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutAbsencesNestedInput
    teacher?: TeacherUpdateOneWithoutAbsencesNestedInput
  }

  export type AbsenceUncheckedUpdateWithoutClassInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    teacherId?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAbsenceStatusFieldUpdateOperationsInput | $Enums.AbsenceStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    justified?: BoolFieldUpdateOperationsInput | boolean
    parentNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AbsenceUncheckedUpdateManyWithoutClassInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    teacherId?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAbsenceStatusFieldUpdateOperationsInput | $Enums.AbsenceStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    justified?: BoolFieldUpdateOperationsInput | boolean
    parentNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeacherSubjectClassCreateManySubjectInput = {
    teacherId: number
    classId: number
    schoolYear: string
  }

  export type MarkCreateManySubjectRefInput = {
    id?: number
    studentId: number
    teacherId?: number | null
    classId?: number | null
    subject: string
    value: number
    coefficient?: number
    semester?: number | null
    comment?: string | null
    term: string
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeacherSubjectClassUpdateWithoutSubjectInput = {
    schoolYear?: StringFieldUpdateOperationsInput | string
    teacher?: TeacherUpdateOneRequiredWithoutAssignmentsNestedInput
    class?: ClassUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type TeacherSubjectClassUncheckedUpdateWithoutSubjectInput = {
    teacherId?: IntFieldUpdateOperationsInput | number
    classId?: IntFieldUpdateOperationsInput | number
    schoolYear?: StringFieldUpdateOperationsInput | string
  }

  export type TeacherSubjectClassUncheckedUpdateManyWithoutSubjectInput = {
    teacherId?: IntFieldUpdateOperationsInput | number
    classId?: IntFieldUpdateOperationsInput | number
    schoolYear?: StringFieldUpdateOperationsInput | string
  }

  export type MarkUpdateWithoutSubjectRefInput = {
    subject?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    coefficient?: FloatFieldUpdateOperationsInput | number
    semester?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    term?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutMarksNestedInput
    teacher?: TeacherUpdateOneWithoutMarksNestedInput
    class?: ClassUpdateOneWithoutMarksNestedInput
  }

  export type MarkUncheckedUpdateWithoutSubjectRefInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    teacherId?: NullableIntFieldUpdateOperationsInput | number | null
    classId?: NullableIntFieldUpdateOperationsInput | number | null
    subject?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    coefficient?: FloatFieldUpdateOperationsInput | number
    semester?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    term?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarkUncheckedUpdateManyWithoutSubjectRefInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    teacherId?: NullableIntFieldUpdateOperationsInput | number | null
    classId?: NullableIntFieldUpdateOperationsInput | number | null
    subject?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    coefficient?: FloatFieldUpdateOperationsInput | number
    semester?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    term?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClassCreateManyHeadTeacherInput = {
    id?: number
    name: string
    level: string
    schoolYear?: string
    maxCapacity?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type TeacherSubjectClassCreateManyTeacherInput = {
    subjectId: number
    classId: number
    schoolYear: string
  }

  export type MarkCreateManyTeacherInput = {
    id?: number
    studentId: number
    subjectId?: number | null
    classId?: number | null
    subject: string
    value: number
    coefficient?: number
    semester?: number | null
    comment?: string | null
    term: string
    date?: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AbsenceCreateManyTeacherInput = {
    id?: number
    studentId: number
    classId?: number | null
    date: Date | string
    status?: $Enums.AbsenceStatus
    reason?: string | null
    justified?: boolean
    parentNotifiedAt?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ClassUpdateWithoutHeadTeacherInput = {
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    schoolYear?: StringFieldUpdateOperationsInput | string
    maxCapacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentUpdateManyWithoutClassNestedInput
    assignments?: TeacherSubjectClassUpdateManyWithoutClassNestedInput
    marks?: MarkUpdateManyWithoutClassNestedInput
    absences?: AbsenceUpdateManyWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateWithoutHeadTeacherInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    schoolYear?: StringFieldUpdateOperationsInput | string
    maxCapacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    students?: StudentUncheckedUpdateManyWithoutClassNestedInput
    assignments?: TeacherSubjectClassUncheckedUpdateManyWithoutClassNestedInput
    marks?: MarkUncheckedUpdateManyWithoutClassNestedInput
    absences?: AbsenceUncheckedUpdateManyWithoutClassNestedInput
  }

  export type ClassUncheckedUpdateManyWithoutHeadTeacherInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    level?: StringFieldUpdateOperationsInput | string
    schoolYear?: StringFieldUpdateOperationsInput | string
    maxCapacity?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeacherSubjectClassUpdateWithoutTeacherInput = {
    schoolYear?: StringFieldUpdateOperationsInput | string
    subject?: SubjectUpdateOneRequiredWithoutAssignmentsNestedInput
    class?: ClassUpdateOneRequiredWithoutAssignmentsNestedInput
  }

  export type TeacherSubjectClassUncheckedUpdateWithoutTeacherInput = {
    subjectId?: IntFieldUpdateOperationsInput | number
    classId?: IntFieldUpdateOperationsInput | number
    schoolYear?: StringFieldUpdateOperationsInput | string
  }

  export type TeacherSubjectClassUncheckedUpdateManyWithoutTeacherInput = {
    subjectId?: IntFieldUpdateOperationsInput | number
    classId?: IntFieldUpdateOperationsInput | number
    schoolYear?: StringFieldUpdateOperationsInput | string
  }

  export type MarkUpdateWithoutTeacherInput = {
    subject?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    coefficient?: FloatFieldUpdateOperationsInput | number
    semester?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    term?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutMarksNestedInput
    subjectRef?: SubjectUpdateOneWithoutMarksNestedInput
    class?: ClassUpdateOneWithoutMarksNestedInput
  }

  export type MarkUncheckedUpdateWithoutTeacherInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    subjectId?: NullableIntFieldUpdateOperationsInput | number | null
    classId?: NullableIntFieldUpdateOperationsInput | number | null
    subject?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    coefficient?: FloatFieldUpdateOperationsInput | number
    semester?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    term?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarkUncheckedUpdateManyWithoutTeacherInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    subjectId?: NullableIntFieldUpdateOperationsInput | number | null
    classId?: NullableIntFieldUpdateOperationsInput | number | null
    subject?: StringFieldUpdateOperationsInput | string
    value?: FloatFieldUpdateOperationsInput | number
    coefficient?: FloatFieldUpdateOperationsInput | number
    semester?: NullableIntFieldUpdateOperationsInput | number | null
    comment?: NullableStringFieldUpdateOperationsInput | string | null
    term?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AbsenceUpdateWithoutTeacherInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAbsenceStatusFieldUpdateOperationsInput | $Enums.AbsenceStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    justified?: BoolFieldUpdateOperationsInput | boolean
    parentNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    student?: StudentUpdateOneRequiredWithoutAbsencesNestedInput
    class?: ClassUpdateOneWithoutAbsencesNestedInput
  }

  export type AbsenceUncheckedUpdateWithoutTeacherInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    classId?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAbsenceStatusFieldUpdateOperationsInput | $Enums.AbsenceStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    justified?: BoolFieldUpdateOperationsInput | boolean
    parentNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AbsenceUncheckedUpdateManyWithoutTeacherInput = {
    id?: IntFieldUpdateOperationsInput | number
    studentId?: IntFieldUpdateOperationsInput | number
    classId?: NullableIntFieldUpdateOperationsInput | number | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumAbsenceStatusFieldUpdateOperationsInput | $Enums.AbsenceStatus
    reason?: NullableStringFieldUpdateOperationsInput | string | null
    justified?: BoolFieldUpdateOperationsInput | boolean
    parentNotifiedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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