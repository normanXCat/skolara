import { z } from "zod";
/**
 * Schéma pour la création d'un élève.
 */
export declare const CreateStudentSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    birthDate: z.ZodCoercedDate<unknown>;
    address: z.ZodString;
    status: z.ZodDefault<z.ZodEnum<{
        ACTIVE: "ACTIVE";
        ARCHIVED: "ARCHIVED";
    }>>;
    schoolYear: z.ZodString;
    classId: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
    parentName: z.ZodString;
    parentPhone: z.ZodString;
    parentEmail: z.ZodString;
}, z.core.$strip>;
/**
 * Schéma pour la mise à jour d'un élève.
 */
export declare const UpdateStudentSchema: z.ZodObject<{
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    birthDate: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    address: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        ACTIVE: "ACTIVE";
        ARCHIVED: "ARCHIVED";
    }>>>;
    schoolYear: z.ZodOptional<z.ZodString>;
    classId: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodNumber>>>;
    parentName: z.ZodOptional<z.ZodString>;
    parentPhone: z.ZodOptional<z.ZodString>;
    parentEmail: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Schéma pour les filtres de recherche d'élèves.
 */
export declare const StudentFiltersSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    search: z.ZodOptional<z.ZodString>;
    classId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    level: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        ACTIVE: "ACTIVE";
        ARCHIVED: "ARCHIVED";
    }>>;
    schoolYear: z.ZodOptional<z.ZodString>;
    orderBy: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        name: "name";
        createdAt: "createdAt";
        class: "class";
    }>>>;
    orderDir: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>>;
}, z.core.$strip>;
export type CreateStudentInput = z.infer<typeof CreateStudentSchema>;
export type UpdateStudentInput = z.infer<typeof UpdateStudentSchema>;
export type StudentFiltersInput = z.infer<typeof StudentFiltersSchema>;
//# sourceMappingURL=students.schema.d.ts.map