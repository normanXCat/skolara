"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubjectFiltersSchema = exports.UpdateSubjectSchema = exports.CreateSubjectSchema = void 0;
const zod_1 = require("zod");
/**
 * Schéma pour la création d'une matière.
 */
exports.CreateSubjectSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Le nom de la matière est requis"),
    code: zod_1.z.string().min(1, "Le code est requis").transform(val => val.toUpperCase()),
    coefficient: zod_1.z.coerce.number().int().min(1, "Le coefficient doit être d'au moins 1").default(1),
    description: zod_1.z.string().optional(),
});
/**
 * Schéma pour la mise à jour d'une matière.
 */
exports.UpdateSubjectSchema = exports.CreateSubjectSchema.partial();
/**
 * Schéma pour les filtres de recherche de matières.
 */
exports.SubjectFiltersSchema = zod_1.z.object({
    page: zod_1.z.coerce.number().min(1).default(1),
    limit: zod_1.z.coerce.number().min(1).max(100).default(20),
    search: zod_1.z.string().optional(),
});
//# sourceMappingURL=subjects.schema.js.map