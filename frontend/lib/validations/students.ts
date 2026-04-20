import * as z from "zod";

/**
 * Schéma de validation pour la création d'un élève.
 */
export const createStudentSchema = z.object({
    firstName: z
        .string()
        .min(2, "Le prénom doit contenir au moins 2 caractères"),
    lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    birthDate: z.preprocess(
        (arg) => {
            if (typeof arg === "string" || arg instanceof Date)
                return new Date(arg);
        },
        z.date({ message: "La date de naissance est requise" }),
    ),
    address: z.string().min(5, "L'adresse doit contenir au moins 5 caractères"),
    status: z.enum(["ACTIVE", "ARCHIVED"]).default("ACTIVE"),
    schoolYear: z
        .string()
        .regex(/^\d{4}-\d{4}$/, "Format invalide (ex: 2023-2024)"),
    classId: z.number().optional().nullable(),
    // Informations parent (obligatoires à la création)
    parentName: z.string().min(2, "Le nom complet du parent est requis"),
    parentPhone: z
        .string()
        .min(10, "Le numéro de téléphone doit contenir au moins 10 chiffres"),
    parentEmail: z.string().email("L'adresse email du parent est invalide"),
});

/**
 * Schéma de validation pour la mise à jour d'un élève (champs optionnels).
 */
export const updateStudentSchema = createStudentSchema.partial();

/**
 * Schéma de validation pour les filtres de la liste des élèves.
 */
export const studentFiltersSchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
    search: z.string().optional(),
    classId: z.coerce.number().optional(),
    level: z.string().optional(),
    status: z.enum(["active", "archived"]).optional(),
    schoolYear: z.string().optional(),
});

export type CreateStudentInput = z.infer<typeof createStudentSchema>;
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;
export type StudentFiltersInput = z.infer<typeof studentFiltersSchema>;
