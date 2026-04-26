import { z } from "zod";
/**
 * Filtres admin pour consulter les notes (lecture seule).
 */
export declare const AdminGradeFiltersSchema: z.ZodObject<{
    classId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    subjectId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    semester: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    studentId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    search: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type AdminGradeFiltersInput = z.infer<typeof AdminGradeFiltersSchema>;
//# sourceMappingURL=grades.schema.d.ts.map