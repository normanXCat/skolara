import { z } from "zod";

/**
 * Schéma pour la saisie d'une note individuelle.
 */
export const BulkGradeItemSchema = z.object({
    studentId: z.number().int().positive(),
    value: z.number().min(0).max(20).nullable(), // null = supprimer la note
    comment: z.string().optional().nullable(),
});

/**
 * Schéma pour la saisie groupée de notes (une classe/matière/éval).
 */
export const BulkGradeSchema = z.object({
    semester: z.number().min(1).max(2),
    grades: z.array(BulkGradeItemSchema).min(1),
});

/**
 * Schéma pour la mise à jour d'une note unique.
 */
export const SingleGradeSchema = z.object({
    value: z.number().min(0).max(20),
    comment: z.string().optional().nullable(),
});

/**
 * Filtres pour consulter les notes.
 */
export const GradeFiltersSchema = z.object({
    classId: z.coerce.number().optional(),
    subjectId: z.coerce.number().optional(),
    semester: z.coerce.number().optional(),
});

export type BulkGradeInput = z.infer<typeof BulkGradeSchema>;
export type SingleGradeInput = z.infer<typeof SingleGradeSchema>;
export type GradeFiltersInput = z.infer<typeof GradeFiltersSchema>;
