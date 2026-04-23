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
    classId: z.number().int().positive(),
    date: z.coerce.date().default(() => new Date()),
    items: z.array(AbsenceItemSchema).min(1),
});

/**
 * Filtres pour consulter les absences.
 */
export const AbsenceFiltersSchema = z.object({
    classId: z.coerce.number().optional(),
    studentId: z.coerce.number().optional(),
    date: z.string().optional(),
});

export type RollCallInput = z.infer<typeof RollCallSchema>;
export type AbsenceFiltersInput = z.infer<typeof AbsenceFiltersSchema>;
