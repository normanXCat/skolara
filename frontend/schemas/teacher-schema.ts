import { z } from "zod";

/**
 * Schéma pour la création d'un enseignant dans le frontend.
 */
export const CreateTeacherSchema = z.object({
    firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
    lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    email: z
        .string()
        .email("Format d'email invalide")
        .optional()
        .or(z.literal("")),
    speciality: z.string().optional(),
    phone: z.string().optional(),
    subjectIds: z.array(z.number()).optional(),
});

export type CreateTeacherInput = z.infer<typeof CreateTeacherSchema>;
