"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherFiltersSchema = exports.AssignmentSchema = exports.UpdateTeacherSchema = exports.CreateTeacherSchema = void 0;
const zod_1 = require("zod");
const email_validation_1 = require("../../../utils/email-validation");
/**
 * Schéma pour la création d'un enseignant.
 */
const TeacherBaseSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(2, "Le prénom est trop court"),
    lastName: zod_1.z.string().min(2, "Le nom est trop court"),
    email: zod_1.z.string().email("Email invalide").optional().or(zod_1.z.literal("")),
    speciality: zod_1.z.string().optional(),
    phone: zod_1.z.string().optional(),
    subjectIds: zod_1.z.array(zod_1.z.number()).optional(),
});
exports.CreateTeacherSchema = TeacherBaseSchema.superRefine(async (data, ctx) => {
    if (data.email && data.email.trim() !== "") {
        const isValid = await (0, email_validation_1.checkMxRecord)(data.email);
        if (!isValid) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                path: ["email"],
                message: "Cette adresse email ne semble pas valide (domaine invalide).",
            });
        }
    }
});
/**
 * Schéma pour la mise à jour d'un enseignant.
 */
exports.UpdateTeacherSchema = TeacherBaseSchema.partial().superRefine(async (data, ctx) => {
    if (data.email && data.email.trim() !== "") {
        const isValid = await (0, email_validation_1.checkMxRecord)(data.email);
        if (!isValid) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                path: ["email"],
                message: "Cette adresse email ne semble pas valide (domaine invalide).",
            });
        }
    }
});
/**
 * Schéma pour l'assignation enseignant-matière-classe.
 */
exports.AssignmentSchema = zod_1.z.object({
    subjectId: zod_1.z.coerce.number().int().positive(),
    classId: zod_1.z.coerce.number().int().positive(),
    schoolYear: zod_1.z.string().regex(/^\d{4}-\d{4}$/),
});
/**
 * Schéma pour les filtres de recherche d'enseignants.
 */
exports.TeacherFiltersSchema = zod_1.z.object({
    page: zod_1.z.coerce.number().min(1).default(1),
    limit: zod_1.z.coerce.number().min(1).max(100).default(20),
    search: zod_1.z.string().optional(),
    speciality: zod_1.z.string().optional(),
});
//# sourceMappingURL=teachers.schema.js.map