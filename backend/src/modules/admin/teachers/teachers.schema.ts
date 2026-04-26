import { z } from "zod";
import { checkMxRecord } from "../../../utils/email-validation";

/**
 * Schéma pour la création d'un enseignant.
 */
const TeacherBaseSchema = z.object({
    firstName: z.string().min(2, "Le prénom est trop court"),
    lastName: z.string().min(2, "Le nom est trop court"),
    email: z.string().email("Email invalide").optional().or(z.literal("")),
    speciality: z.string().optional(),
    phone: z.string().optional(),
    subjectIds: z.array(z.number()).optional(),
});

export const CreateTeacherSchema = TeacherBaseSchema.superRefine(async (data, ctx) => {
    if (data.email && data.email.trim() !== "") {
        const isValid = await checkMxRecord(data.email);
        if (!isValid) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["email"],
                message: "Cette adresse email ne semble pas valide (domaine invalide).",
            });
        }
    }
});

/**
 * Schéma pour la mise à jour d'un enseignant.
 */
export const UpdateTeacherSchema = TeacherBaseSchema.partial().superRefine(async (data, ctx) => {
    if (data.email && data.email.trim() !== "") {
        const isValid = await checkMxRecord(data.email);
        if (!isValid) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["email"],
                message: "Cette adresse email ne semble pas valide (domaine invalide).",
            });
        }
    }
});

/**
 * Schéma pour l'assignation enseignant-matière-classe.
 */
export const AssignmentSchema = z.object({
    subjectId: z.coerce.number().int().positive(),
    classId: z.coerce.number().int().positive(),
    schoolYear: z.string().regex(/^\d{4}-\d{4}$/),
});

/**
 * Schéma pour les filtres de recherche d'enseignants.
 */
export const TeacherFiltersSchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
    search: z.string().optional(),
    speciality: z.string().optional(),
});

export type CreateTeacherInput = z.infer<typeof CreateTeacherSchema>;
export type UpdateTeacherInput = z.infer<typeof UpdateTeacherSchema>;
export type AssignmentInput = z.infer<typeof AssignmentSchema>;
export type TeacherFiltersInput = z.infer<typeof TeacherFiltersSchema>;
