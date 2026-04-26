import { z } from "zod";

/**
 * Filtres admin pour consulter les notes (lecture seule).
 */
export const AdminGradeFiltersSchema = z.object({
    classId: z.coerce.number().optional(),
    subjectId: z.coerce.number().optional(),
    semester: z.coerce.number().optional(),
    studentId: z.coerce.number().optional(),
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(1000).default(50),
    search: z.string().optional(),
});

export type AdminGradeFiltersInput = z.infer<typeof AdminGradeFiltersSchema>;
