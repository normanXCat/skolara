"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminJustifyAbsenceSchema = exports.AdminAbsenceFiltersSchema = void 0;
const zod_1 = require("zod");
/**
 * Filtres admin pour consulter les absences.
 */
exports.AdminAbsenceFiltersSchema = zod_1.z.object({
    classId: zod_1.z.coerce.number().optional(),
    studentId: zod_1.z.coerce.number().optional(),
    status: zod_1.z.enum(["PRESENT", "ABSENT", "LATE"]).optional(),
    isJustified: zod_1.z.coerce.boolean().optional(),
    dateFrom: zod_1.z.string().optional(),
    dateTo: zod_1.z.string().optional(),
    page: zod_1.z.coerce.number().min(1).default(1),
    limit: zod_1.z.coerce.number().min(1).max(1000).default(50),
    search: zod_1.z.string().optional(),
});
/**
 * Schéma pour justifier une absence côté admin.
 */
exports.AdminJustifyAbsenceSchema = zod_1.z.object({
    isJustified: zod_1.z.boolean(),
    reason: zod_1.z.string().min(1, "Le motif est requis"),
});
//# sourceMappingURL=absences.schema.js.map