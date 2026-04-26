import { z } from "zod";
export declare const CreateTeacherSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    speciality: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    subjectIds: z.ZodOptional<z.ZodArray<z.ZodNumber>>;
}, z.core.$strip>;
/**
 * Schéma pour la mise à jour d'un enseignant.
 */
export declare const UpdateTeacherSchema: z.ZodObject<{
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>>;
    speciality: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    phone: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    subjectIds: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodNumber>>>;
}, z.core.$strip>;
/**
 * Schéma pour l'assignation enseignant-matière-classe.
 */
export declare const AssignmentSchema: z.ZodObject<{
    subjectId: z.ZodCoercedNumber<unknown>;
    classId: z.ZodCoercedNumber<unknown>;
    schoolYear: z.ZodString;
}, z.core.$strip>;
/**
 * Schéma pour les filtres de recherche d'enseignants.
 */
export declare const TeacherFiltersSchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    search: z.ZodOptional<z.ZodString>;
    speciality: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateTeacherInput = z.infer<typeof CreateTeacherSchema>;
export type UpdateTeacherInput = z.infer<typeof UpdateTeacherSchema>;
export type AssignmentInput = z.infer<typeof AssignmentSchema>;
export type TeacherFiltersInput = z.infer<typeof TeacherFiltersSchema>;
//# sourceMappingURL=teachers.schema.d.ts.map