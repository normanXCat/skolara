import { z } from "zod";

/**
 * Schéma pour la saisie d'une note individuelle.
 */
export const BulkGradeItemSchema = z.object({
    studentId: z.number().int().positive(),
    value: z.number().min(0).max(20),
    comment: z.string().optional().nullable(),
});

/**
 * Schéma pour la saisie groupée de notes (une classe/matière/éval).
 */
export const BulkGradeSchema = z.object({
    classId: z.number().int().positive(),
    subjectId: z.number().int().positive(),
    term: z.string().min(1, "La période est requise (ex: Trimestre 1)"),
    coefficient: z.number().positive().default(1),
    date: z.coerce.date().default(() => new Date()),
    marks: z.array(BulkGradeItemSchema).min(1),
});

/**
 * Filtres pour consulter les notes.
 */
export const MarkFiltersSchema = z.object({
    classId: z.coerce.number().optional(),
    subjectId: z.coerce.number().optional(),
    term: z.string().optional(),
});

export type BulkGradeInput = z.infer<typeof BulkGradeSchema>;
export type MarkFiltersInput = z.infer<typeof MarkFiltersSchema>;
