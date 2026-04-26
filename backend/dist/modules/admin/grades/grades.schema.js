"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminGradeFiltersSchema = void 0;
const zod_1 = require("zod");
/**
 * Filtres admin pour consulter les notes (lecture seule).
 */
exports.AdminGradeFiltersSchema = zod_1.z.object({
    classId: zod_1.z.coerce.number().optional(),
    subjectId: zod_1.z.coerce.number().optional(),
    semester: zod_1.z.coerce.number().optional(),
    studentId: zod_1.z.coerce.number().optional(),
    page: zod_1.z.coerce.number().min(1).default(1),
    limit: zod_1.z.coerce.number().min(1).max(1000).default(50),
    search: zod_1.z.string().optional(),
});
//# sourceMappingURL=grades.schema.js.map