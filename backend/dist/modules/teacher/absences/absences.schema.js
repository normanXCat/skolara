"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbsenceFiltersSchema = exports.JustifyAbsenceSchema = exports.RollCallSchema = exports.AbsenceItemSchema = void 0;
const zod_1 = require("zod");
/**
 * Schéma pour une ligne d'absence (dans l'appel).
 */
exports.AbsenceItemSchema = zod_1.z.object({
    studentId: zod_1.z.number().int().positive(),
    status: zod_1.z.enum(["PRESENT", "ABSENT", "LATE"]),
    reason: zod_1.z.string().optional().nullable(),
});
/**
 * Schéma pour l'appel complet d'une classe.
 */
exports.RollCallSchema = zod_1.z.object({
    date: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format de date invalide (YYYY-MM-DD)"),
    records: zod_1.z.array(exports.AbsenceItemSchema).min(1),
});
/**
 * Schéma pour justifier une absence.
 */
exports.JustifyAbsenceSchema = zod_1.z.object({
    isJustified: zod_1.z.boolean(),
    reason: zod_1.z.string().min(1, "Le motif est requis"),
});
/**
 * Filtres pour consulter les absences.
 */
exports.AbsenceFiltersSchema = zod_1.z.object({
    classId: zod_1.z.coerce.number().optional(),
    studentId: zod_1.z.coerce.number().optional(),
    date: zod_1.z.string().optional(),
    status: zod_1.z.enum(["PRESENT", "ABSENT", "LATE"]).optional(),
    isJustified: zod_1.z.coerce.boolean().optional(),
});
//# sourceMappingURL=absences.schema.js.map