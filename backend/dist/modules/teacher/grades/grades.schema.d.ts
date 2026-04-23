import { z } from "zod";
/**
 * Schéma pour la saisie d'une note individuelle.
 */
export declare const BulkGradeItemSchema: z.ZodObject<{
    studentId: z.ZodNumber;
    value: z.ZodNumber;
    comment: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
/**
 * Schéma pour la saisie groupée de notes (une classe/matière/éval).
 */
export declare const BulkGradeSchema: z.ZodObject<{
    classId: z.ZodNumber;
    subjectId: z.ZodNumber;
    term: z.ZodString;
    coefficient: z.ZodDefault<z.ZodNumber>;
    date: z.ZodDefault<z.ZodCoercedDate<unknown>>;
    marks: z.ZodArray<z.ZodObject<{
        studentId: z.ZodNumber;
        value: z.ZodNumber;
        comment: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Filtres pour consulter les notes.
 */
export declare const MarkFiltersSchema: z.ZodObject<{
    classId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    subjectId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    term: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type BulkGradeInput = z.infer<typeof BulkGradeSchema>;
export type MarkFiltersInput = z.infer<typeof MarkFiltersSchema>;
//# sourceMappingURL=grades.schema.d.ts.map