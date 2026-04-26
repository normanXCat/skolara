import { z } from "zod";
/**
 * Schéma pour la création d'une matière.
 */
export declare const CreateSubjectSchema: z.ZodObject<{
    name: z.ZodString;
    code: z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>;
    coefficient: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Schéma pour la mise à jour d'une matière.
 */
export declare const UpdateSubjectSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    code: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodTransform<string, string>>>;
    coefficient: z.ZodOptional<z.ZodDefault<z.ZodCoercedNumber<unknown>>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
/**
 * Schéma pour les filtres de recherche de matières.
 */
export declare const SubjectFiltersSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    search: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateSubjectInput = z.infer<typeof CreateSubjectSchema>;
export type UpdateSubjectInput = z.infer<typeof UpdateSubjectSchema>;
export type SubjectFiltersInput = z.infer<typeof SubjectFiltersSchema>;
//# sourceMappingURL=subjects.schema.d.ts.map