import { z } from "zod";
/**
 * Filtres admin pour consulter les absences.
 */
export declare const AdminAbsenceFiltersSchema: z.ZodObject<{
    classId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    studentId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    status: z.ZodOptional<z.ZodEnum<{
        PRESENT: "PRESENT";
        ABSENT: "ABSENT";
        LATE: "LATE";
    }>>;
    isJustified: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
    dateFrom: z.ZodOptional<z.ZodString>;
    dateTo: z.ZodOptional<z.ZodString>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    search: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
/**
 * Schéma pour justifier une absence côté admin.
 */
export declare const AdminJustifyAbsenceSchema: z.ZodObject<{
    isJustified: z.ZodBoolean;
    reason: z.ZodString;
}, z.core.$strip>;
export type AdminAbsenceFiltersInput = z.infer<typeof AdminAbsenceFiltersSchema>;
export type AdminJustifyAbsenceInput = z.infer<typeof AdminJustifyAbsenceSchema>;
//# sourceMappingURL=absences.schema.d.ts.map