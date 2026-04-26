import { z } from "zod";
export declare const createEventSchema: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    startDate: z.ZodString;
    endDate: z.ZodString;
    eventType: z.ZodEnum<{
        other: "other";
        holiday: "holiday";
        exam: "exam";
        meeting: "meeting";
    }>;
    isPublic: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export declare const updateEventSchema: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    startDate: z.ZodOptional<z.ZodString>;
    endDate: z.ZodOptional<z.ZodString>;
    eventType: z.ZodOptional<z.ZodEnum<{
        other: "other";
        holiday: "holiday";
        exam: "exam";
        meeting: "meeting";
    }>>;
    isPublic: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
}, z.core.$strip>;
export declare const calendarFiltersSchema: z.ZodObject<{
    month: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number | undefined, string | undefined>>;
    year: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<number | undefined, string | undefined>>;
    upcoming: z.ZodPipe<z.ZodOptional<z.ZodString>, z.ZodTransform<boolean, string | undefined>>;
}, z.core.$strip>;
export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
export type CalendarFilters = z.infer<typeof calendarFiltersSchema>;
//# sourceMappingURL=calendar.schema.d.ts.map