import { z } from "zod";
/**
 * Schéma pour la saisie d'une note individuelle.
 */
export declare const BulkGradeItemSchema: z.ZodObject<{
    studentId: z.ZodNumber;
    value: z.ZodNullable<z.ZodNumber>;
    comment: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
/**
 * Schéma pour la saisie groupée de notes (une classe/matière/éval).
 */
export declare const BulkGradeSchema: z.ZodObject<{
    semester: z.ZodNumber;
    grades: z.ZodArray<z.ZodObject<{
        studentId: z.ZodNumber;
        value: z.ZodNullable<z.ZodNumber>;
        comment: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Schéma pour la mise à jour d'une note unique.
 */
export declare const SingleGradeSchema: z.ZodObject<{
    value: z.ZodNumber;
    comment: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
/**
 * Filtres pour consulter les notes.
 */
export declare const GradeFiltersSchema: z.ZodObject<{
    classId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    subjectId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    semester: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type BulkGradeInput = z.infer<typeof BulkGradeSchema>;
export type SingleGradeInput = z.infer<typeof SingleGradeSchema>;
export type GradeFiltersInput = z.infer<typeof GradeFiltersSchema>;
//# sourceMappingURL=grades.schema.d.ts.map