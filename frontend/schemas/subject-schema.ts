import { z } from "zod";

/**
 * Schéma Zod pour la création d'une matière (Subject).
 */
export const createSubjectSchema = z.object({
    name: z.string().min(1, "Le nom de la matière est requis"),
    code: z.string().min(1, "Le code est requis").transform(val => val.toUpperCase()),
    coefficient: z.number().int().min(1, "Le coefficient doit être d'au moins 1"),
    description: z.string().optional()
});

/**
 * Schéma Zod pour la mise à jour d'une matière.
 */
export const updateSubjectSchema = createSubjectSchema.partial();

export type CreateSubjectInput = z.infer<typeof createSubjectSchema>;
export type UpdateSubjectInput = z.infer<typeof updateSubjectSchema>;
