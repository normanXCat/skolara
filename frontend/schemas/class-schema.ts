import { z } from "zod";

/**
 * Schéma pour la création d'une classe dans le frontend.
 */
export const CreateClassSchema = z.object({
    name: z.string().min(2, "Le nom de la classe doit contenir au moins 2 caractères"),
    level: z.string().min(1, "Le niveau est requis"),
    schoolYear: z.string().regex(/^\d{4}-\d{4}$/, "Format d'année scolaire invalide (ex: 2024-2025)"),
    maxCapacity: z.number().min(1, "La capacité maximale doit être d'au moins 1"),
    headTeacherId: z.number().optional().nullable(),
});

export type CreateClassInput = z.infer<typeof CreateClassSchema>;
