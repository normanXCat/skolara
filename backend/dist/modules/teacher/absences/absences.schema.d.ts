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
    date: z.ZodString;
    records: z.ZodArray<z.ZodObject<{
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
 * Schéma pour justifier une absence.
 */
export declare const JustifyAbsenceSchema: z.ZodObject<{
    isJustified: z.ZodBoolean;
    reason: z.ZodString;
}, z.core.$strip>;
/**
 * Filtres pour consulter les absences.
 */
export declare const AbsenceFiltersSchema: z.ZodObject<{
    classId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    studentId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    date: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        PRESENT: "PRESENT";
        ABSENT: "ABSENT";
        LATE: "LATE";
    }>>;
    isJustified: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
}, z.core.$strip>;
export type RollCallInput = z.infer<typeof RollCallSchema>;
export type JustifyAbsenceInput = z.infer<typeof JustifyAbsenceSchema>;
export type AbsenceFiltersInput = z.infer<typeof AbsenceFiltersSchema>;
//# sourceMappingURL=absences.schema.d.ts.map