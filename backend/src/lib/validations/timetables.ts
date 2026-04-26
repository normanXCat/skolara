import { z } from "zod";

// 1. Base schema (no refinements)
const TimetableBaseSchema = z.object({
    classId: z.number().int().positive(),
    subjectId: z.number().int().positive(),
    teacherId: z.number().int().positive(),
    dayOfWeek: z.number().int().min(1).max(7),
    startTime: z
        .string()
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Format invalide (HH:MM)"),
    endTime: z
        .string()
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Format invalide (HH:MM)"),
    room: z.string().optional(),
    schoolYear: z.string(),
});

// 2. Create schema (with refinement)
export const CreateTimetableSchema = TimetableBaseSchema.refine(
    (data) => {
        const [startH, startM] = data.startTime.split(":").map(Number);
        const [endH, endM] = data.endTime.split(":").map(Number);
        const startTotal = startH * 60 + startM;
        const endTotal = endH * 60 + endM;
        return endTotal > startTotal;
    },
    {
        message: "L'heure de fin doit être après l'heure de début",
        path: ["endTime"],
    },
);

// 3. Update schema (partial, with refinement)
export const UpdateTimetableSchema = TimetableBaseSchema.partial().refine(
    (data) => {
        if (!data.startTime || !data.endTime) return true; // skip if missing
        const [startH, startM] = data.startTime.split(":").map(Number);
        const [endH, endM] = data.endTime.split(":").map(Number);
        const startTotal = startH * 60 + startM;
        const endTotal = endH * 60 + endM;
        return endTotal > startTotal;
    },
    {
        message: "L'heure de fin doit être après l'heure de début",
        path: ["endTime"],
    },
);
