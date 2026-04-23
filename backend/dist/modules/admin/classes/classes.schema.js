"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassFiltersSchema = exports.UpdateClassSchema = exports.CreateClassSchema = void 0;
const zod_1 = require("zod");
const date_1 = require("../../../utils/date");
/**
 * Schéma de base pour une classe.
 */
const ClassBaseSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Le nom de la classe est trop court"),
    level: zod_1.z.string().min(1, "Le niveau est requis"),
    schoolYear: zod_1.z.string().regex(/^\d{4}-\d{4}$/, "Format d'année scolaire invalide (ex: 2024-2025)"),
    maxCapacity: zod_1.z.number().int().positive().default(30),
    headTeacherId: zod_1.z.number().optional().nullable(),
});
/**
 * Schéma pour la création d'une classe.
 */
exports.CreateClassSchema = ClassBaseSchema.refine((data) => data.schoolYear === (0, date_1.getCurrentSchoolYear)(), {
    message: `L'année scolaire doit être ${(0, date_1.getCurrentSchoolYear)()}`,
    path: ["schoolYear"],
});
/**
 * Schéma pour la mise à jour d'une classe.
 */
exports.UpdateClassSchema = ClassBaseSchema.partial();
/**
 * Schéma pour les filtres de recherche de classes.
 */
exports.ClassFiltersSchema = zod_1.z.object({
    page: zod_1.z.coerce.number().min(1).default(1),
    limit: zod_1.z.coerce.number().min(1).max(100).default(20),
    search: zod_1.z.string().optional(),
    level: zod_1.z.string().optional(),
    schoolYear: zod_1.z.string().optional(),
    headTeacherId: zod_1.z.coerce.number().optional(),
});
//# sourceMappingURL=classes.schema.js.map