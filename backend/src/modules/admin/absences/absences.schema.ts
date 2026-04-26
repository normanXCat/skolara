import { z } from "zod";

/**
 * Filtres admin pour consulter les absences.
 */
export const AdminAbsenceFiltersSchema = z.object({
    classId: z.coerce.number().optional(),
    studentId: z.coerce.number().optional(),
    status: z.enum(["PRESENT", "ABSENT", "LATE"]).optional(),
    isJustified: z.coerce.boolean().optional(),
    dateFrom: z.string().optional(),
    dateTo: z.string().optional(),
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(1000).default(50),
    search: z.string().optional(),
});

/**
 * Schéma pour justifier une absence côté admin.
 */
export const AdminJustifyAbsenceSchema = z.object({
    isJustified: z.boolean(),
    reason: z.string().min(1, "Le motif est requis"),
});

export type AdminAbsenceFiltersInput = z.infer<typeof AdminAbsenceFiltersSchema>;
export type AdminJustifyAbsenceInput = z.infer<typeof AdminJustifyAbsenceSchema>;
