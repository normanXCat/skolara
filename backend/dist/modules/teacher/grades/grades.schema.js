"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeFiltersSchema = exports.SingleGradeSchema = exports.BulkGradeSchema = exports.BulkGradeItemSchema = void 0;
const zod_1 = require("zod");
/**
 * Schéma pour la saisie d'une note individuelle.
 */
exports.BulkGradeItemSchema = zod_1.z.object({
    studentId: zod_1.z.number().int().positive(),
    value: zod_1.z.number().min(0).max(20).nullable(), // null = supprimer la note
    comment: zod_1.z.string().optional().nullable(),
});
/**
 * Schéma pour la saisie groupée de notes (une classe/matière/éval).
 */
exports.BulkGradeSchema = zod_1.z.object({
    semester: zod_1.z.number().min(1).max(2),
    grades: zod_1.z.array(exports.BulkGradeItemSchema).min(1),
});
/**
 * Schéma pour la mise à jour d'une note unique.
 */
exports.SingleGradeSchema = zod_1.z.object({
    value: zod_1.z.number().min(0).max(20),
    comment: zod_1.z.string().optional().nullable(),
});
/**
 * Filtres pour consulter les notes.
 */
exports.GradeFiltersSchema = zod_1.z.object({
    classId: zod_1.z.coerce.number().optional(),
    subjectId: zod_1.z.coerce.number().optional(),
    semester: zod_1.z.coerce.number().optional(),
});
//# sourceMappingURL=grades.schema.js.map