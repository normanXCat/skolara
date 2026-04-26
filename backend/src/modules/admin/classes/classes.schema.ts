import { z } from "zod";
import { getCurrentSchoolYear } from "../../../utils/date";

/**
 * Schéma de base pour une classe.
 */
const ClassBaseSchema = z.object({
    name: z.string().min(2, "Le nom de la classe est trop court"),
    level: z.string().min(1, "Le niveau est requis"),
    schoolYear: z.string().regex(/^\d{4}-\d{4}$/, "Format d'année scolaire invalide (ex: 2024-2025)"),
    maxCapacity: z.number().int().positive().default(30),
    headTeacherId: z.number().optional().nullable(),
});

/**
 * Schéma pour la création d'une classe.
 */
export const CreateClassSchema = ClassBaseSchema.refine((data) => data.schoolYear === getCurrentSchoolYear(), {
    message: `L'année scolaire doit être ${getCurrentSchoolYear()}`,
    path: ["schoolYear"],
});

/**
 * Schéma pour la mise à jour d'une classe.
 */
export const UpdateClassSchema = ClassBaseSchema.partial();

/**
 * Schéma pour les filtres de recherche de classes.
 */
export const ClassFiltersSchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
    search: z.string().optional(),
    level: z.string().optional(),
    schoolYear: z.string().optional(),
    headTeacherId: z.coerce.number().optional(),
});

export type CreateClassInput = z.infer<typeof CreateClassSchema>;
export type UpdateClassInput = z.infer<typeof UpdateClassSchema>;
export type ClassFiltersInput = z.infer<typeof ClassFiltersSchema>;
