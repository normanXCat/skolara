"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentFiltersSchema = exports.UpdateStudentSchema = exports.CreateStudentSchema = void 0;
const zod_1 = require("zod");
/**
 * Schéma pour la création d'un élève.
 */
exports.CreateStudentSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(2, "Le prénom est trop court"),
    lastName: zod_1.z.string().min(2, "Le nom est trop court"),
    birthDate: zod_1.z.coerce.date({
        message: "La date de naissance est requise",
    }),
    address: zod_1.z.string().min(5, "L'adresse est trop courte"),
    status: zod_1.z.enum(["ACTIVE", "ARCHIVED"]).default("ACTIVE"),
    schoolYear: zod_1.z
        .string()
        .regex(/^\d{4}-\d{4}$/, "Format d'année scolaire invalide"),
    classId: zod_1.z.number().optional().nullable(),
    // Info parent requises à la création manuelle
    parentName: zod_1.z.string().min(2, "Nom du parent requis"),
    parentPhone: zod_1.z.string().min(10, "Téléphone du parent invalide"),
    parentEmail: zod_1.z.string().email("Email du parent invalide"),
});
/**
 * Schéma pour la mise à jour d'un élève.
 */
exports.UpdateStudentSchema = exports.CreateStudentSchema.partial();
/**
 * Schéma pour les filtres de recherche d'élèves.
 */
exports.StudentFiltersSchema = zod_1.z.object({
    page: zod_1.z.coerce.number().min(1).default(1),
    limit: zod_1.z.coerce.number().min(1).max(100).default(20),
    search: zod_1.z.string().optional(),
    classId: zod_1.z.coerce.number().optional(),
    level: zod_1.z.string().optional(),
    status: zod_1.z.enum(["ACTIVE", "ARCHIVED"]).optional(),
    schoolYear: zod_1.z.string().optional(),
    orderBy: zod_1.z
        .enum(["name", "class", "createdAt"])
        .optional()
        .default("createdAt"),
    orderDir: zod_1.z.enum(["asc", "desc"]).optional().default("desc"),
});
//# sourceMappingURL=students.schema.js.map