"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbsenceFiltersSchema = exports.RollCallSchema = exports.AbsenceItemSchema = void 0;
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
    classId: zod_1.z.number().int().positive(),
    date: zod_1.z.coerce.date().default(() => new Date()),
    items: zod_1.z.array(exports.AbsenceItemSchema).min(1),
});
/**
 * Filtres pour consulter les absences.
 */
exports.AbsenceFiltersSchema = zod_1.z.object({
    classId: zod_1.z.coerce.number().optional(),
    studentId: zod_1.z.coerce.number().optional(),
    date: zod_1.z.string().optional(),
});
//# sourceMappingURL=absences.schema.js.map