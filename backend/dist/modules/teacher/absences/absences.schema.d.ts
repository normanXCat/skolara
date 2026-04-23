import { z } from "zod";
/**
 * Schéma pour une ligne d'absence (dans l'appel).
 */
export declare const AbsenceItemSchema: z.ZodObject<{
    studentId: z.ZodNumber;
    status: z.ZodEnum<{
        PRESENT: "PRESENT";
        ABSENT: "ABSENT";
        LATE: "LATE";
    }>;
    reason: z.ZodNullable<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
/**
 * Schéma pour l'appel complet d'une classe.
 */
export declare const RollCallSchema: z.ZodObject<{
    classId: z.ZodNumber;
    date: z.ZodDefault<z.ZodCoercedDate<unknown>>;
    items: z.ZodArray<z.ZodObject<{
        studentId: z.ZodNumber;
        status: z.ZodEnum<{
            PRESENT: "PRESENT";
            ABSENT: "ABSENT";
            LATE: "LATE";
        }>;
        reason: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
/**
 * Filtres pour consulter les absences.
 */
export declare const AbsenceFiltersSchema: z.ZodObject<{
    classId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    studentId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    date: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type RollCallInput = z.infer<typeof RollCallSchema>;
export type AbsenceFiltersInput = z.infer<typeof AbsenceFiltersSchema>;
//# sourceMappingURL=absences.schema.d.ts.map