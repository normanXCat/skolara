import { z } from "zod";

/**
 * Schéma pour une ligne d'absence (dans l'appel).
 */
export const AbsenceItemSchema = z.object({
    studentId: z.number().int().positive(),
    status: z.enum(["PRESENT", "ABSENT", "LATE"]),
    reason: z.string().optional().nullable(),
});

/**
 * Schéma pour l'appel complet d'une classe.
 */
export const RollCallSchema = z.object({
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format de date invalide (YYYY-MM-DD)"),
    records: z.array(AbsenceItemSchema).min(1),
});

/**
 * Schéma pour justifier une absence.
 */
export const JustifyAbsenceSchema = z.object({
    isJustified: z.boolean(),
    reason: z.string().min(1, "Le motif est requis"),
});

/**
 * Filtres pour consulter les absences.
 */
export const AbsenceFiltersSchema = z.object({
    classId: z.coerce.number().optional(),
    studentId: z.coerce.number().optional(),
    date: z.string().optional(),
    status: z.enum(["PRESENT", "ABSENT", "LATE"]).optional(),
    isJustified: z.coerce.boolean().optional(),
});

export type RollCallInput = z.infer<typeof RollCallSchema>;
export type JustifyAbsenceInput = z.infer<typeof JustifyAbsenceSchema>;
export type AbsenceFiltersInput = z.infer<typeof AbsenceFiltersSchema>;
