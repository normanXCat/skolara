"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkFiltersSchema = exports.BulkGradeSchema = exports.BulkGradeItemSchema = void 0;
const zod_1 = require("zod");
/**
 * Schéma pour la saisie d'une note individuelle.
 */
exports.BulkGradeItemSchema = zod_1.z.object({
    studentId: zod_1.z.number().int().positive(),
    value: zod_1.z.number().min(0).max(20),
    comment: zod_1.z.string().optional().nullable(),
});
/**
 * Schéma pour la saisie groupée de notes (une classe/matière/éval).
 */
exports.BulkGradeSchema = zod_1.z.object({
    classId: zod_1.z.number().int().positive(),
    subjectId: zod_1.z.number().int().positive(),
    term: zod_1.z.string().min(1, "La période est requise (ex: Trimestre 1)"),
    coefficient: zod_1.z.number().positive().default(1),
    date: zod_1.z.coerce.date().default(() => new Date()),
    marks: zod_1.z.array(exports.BulkGradeItemSchema).min(1),
});
/**
 * Filtres pour consulter les notes.
 */
exports.MarkFiltersSchema = zod_1.z.object({
    classId: zod_1.z.coerce.number().optional(),
    subjectId: zod_1.z.coerce.number().optional(),
    term: zod_1.z.string().optional(),
});
//# sourceMappingURL=grades.schema.js.map