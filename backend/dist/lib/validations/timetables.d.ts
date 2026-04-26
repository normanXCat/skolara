import { z } from "zod";
export declare const CreateTimetableSchema: z.ZodObject<{
    classId: z.ZodNumber;
    subjectId: z.ZodNumber;
    teacherId: z.ZodNumber;
    dayOfWeek: z.ZodNumber;
    startTime: z.ZodString;
    endTime: z.ZodString;
    room: z.ZodOptional<z.ZodString>;
    schoolYear: z.ZodString;
}, z.core.$strip>;
export declare const UpdateTimetableSchema: z.ZodObject<{
    classId: z.ZodOptional<z.ZodNumber>;
    subjectId: z.ZodOptional<z.ZodNumber>;
    teacherId: z.ZodOptional<z.ZodNumber>;
    dayOfWeek: z.ZodOptional<z.ZodNumber>;
    startTime: z.ZodOptional<z.ZodString>;
    endTime: z.ZodOptional<z.ZodString>;
    room: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    schoolYear: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=timetables.d.ts.map