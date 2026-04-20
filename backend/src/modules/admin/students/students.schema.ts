import { z } from "zod";

/**
 * Schéma pour la création d'un élève.
 */
export const CreateStudentSchema = z.object({
    firstName: z.string().min(2, "Le prénom est trop court"),
    lastName: z.string().min(2, "Le nom est trop court"),
    birthDate: z.coerce.date({
        message: "La date de naissance est requise",
    }),
    address: z.string().min(5, "L'adresse est trop courte"),
    status: z.enum(["ACTIVE", "ARCHIVED"]).default("ACTIVE"),
    schoolYear: z
        .string()
        .regex(/^\d{4}-\d{4}$/, "Format d'année scolaire invalide"),
    classId: z.number().optional().nullable(),
    // Info parent requises à la création manuelle
    parentName: z.string().min(2, "Nom du parent requis"),
    parentPhone: z.string().min(10, "Téléphone du parent invalide"),
    parentEmail: z.string().email("Email du parent invalide"),
});

/**
 * Schéma pour la mise à jour d'un élève.
 */
export const UpdateStudentSchema = CreateStudentSchema.partial();

/**
 * Schéma pour les filtres de recherche d'élèves.
 */
export const StudentFiltersSchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
    search: z.string().optional(),
    classId: z.coerce.number().optional(),
    level: z.string().optional(),
    status: z.enum(["ACTIVE", "ARCHIVED"]).optional(),
    schoolYear: z.string().optional(),
    orderBy: z
        .enum(["name", "class", "createdAt"])
        .optional()
        .default("createdAt"),
    orderDir: z.enum(["asc", "desc"]).optional().default("desc"),
});

export type CreateStudentInput = z.infer<typeof CreateStudentSchema>;
export type UpdateStudentInput = z.infer<typeof UpdateStudentSchema>;
export type StudentFiltersInput = z.infer<typeof StudentFiltersSchema>;
