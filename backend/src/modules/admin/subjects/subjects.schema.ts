import { z } from "zod";

/**
 * Schéma pour la création d'une matière.
 */
export const CreateSubjectSchema = z.object({
    name: z.string().min(1, "Le nom de la matière est requis"),
    code: z.string().min(1, "Le code est requis").transform(val => val.toUpperCase()),
    coefficient: z.coerce.number().int().min(1, "Le coefficient doit être d'au moins 1").default(1),
    description: z.string().optional(),
});

/**
 * Schéma pour la mise à jour d'une matière.
 */
export const UpdateSubjectSchema = CreateSubjectSchema.partial();

/**
 * Schéma pour les filtres de recherche de matières.
 */
export const SubjectFiltersSchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
    search: z.string().optional(),
});

export type CreateSubjectInput = z.infer<typeof CreateSubjectSchema>;
export type UpdateSubjectInput = z.infer<typeof UpdateSubjectSchema>;
export type SubjectFiltersInput = z.infer<typeof SubjectFiltersSchema>;
