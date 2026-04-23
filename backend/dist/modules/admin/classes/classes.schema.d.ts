import { z } from "zod";
/**
 * Schéma pour la création d'une classe.
 */
export declare const CreateClassSchema: z.ZodObject<{
    name: z.ZodString;
    level: z.ZodString;
    schoolYear: z.ZodString;
    maxCapacity: z.ZodDefault<z.ZodNumber>;
    headTeacherId: z.ZodNullable<z.ZodOptional<z.ZodNumber>>;
}, z.core.$strip>;
/**
 * Schéma pour la mise à jour d'une classe.
 */
export declare const UpdateClassSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    level: z.ZodOptional<z.ZodString>;
    schoolYear: z.ZodOptional<z.ZodString>;
    maxCapacity: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    headTeacherId: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodNumber>>>;
}, z.core.$strip>;
/**
 * Schéma pour les filtres de recherche de classes.
 */
export declare const ClassFiltersSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    search: z.ZodOptional<z.ZodString>;
    level: z.ZodOptional<z.ZodString>;
    schoolYear: z.ZodOptional<z.ZodString>;
    headTeacherId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type CreateClassInput = z.infer<typeof CreateClassSchema>;
export type UpdateClassInput = z.infer<typeof UpdateClassSchema>;
export type ClassFiltersInput = z.infer<typeof ClassFiltersSchema>;
//# sourceMappingURL=classes.schema.d.ts.map