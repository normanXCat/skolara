"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTimetableSchema = exports.CreateTimetableSchema = void 0;
const zod_1 = require("zod");
// 1. Base schema (no refinements)
const TimetableBaseSchema = zod_1.z.object({
    classId: zod_1.z.number().int().positive(),
    subjectId: zod_1.z.number().int().positive(),
    teacherId: zod_1.z.number().int().positive(),
    dayOfWeek: zod_1.z.number().int().min(1).max(7),
    startTime: zod_1.z
        .string()
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Format invalide (HH:MM)"),
    endTime: zod_1.z
        .string()
        .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Format invalide (HH:MM)"),
    room: zod_1.z.string().optional(),
    schoolYear: zod_1.z.string(),
});
// 2. Create schema (with refinement)
exports.CreateTimetableSchema = TimetableBaseSchema.refine((data) => {
    const [startH, startM] = data.startTime.split(":").map(Number);
    const [endH, endM] = data.endTime.split(":").map(Number);
    const startTotal = startH * 60 + startM;
    const endTotal = endH * 60 + endM;
    return endTotal > startTotal;
}, {
    message: "L'heure de fin doit être après l'heure de début",
    path: ["endTime"],
});
// 3. Update schema (partial, with refinement)
exports.UpdateTimetableSchema = TimetableBaseSchema.partial().refine((data) => {
    if (!data.startTime || !data.endTime)
        return true; // skip if missing
    const [startH, startM] = data.startTime.split(":").map(Number);
    const [endH, endM] = data.endTime.split(":").map(Number);
    const startTotal = startH * 60 + startM;
    const endTotal = endH * 60 + endM;
    return endTotal > startTotal;
}, {
    message: "L'heure de fin doit être après l'heure de début",
    path: ["endTime"],
});
//# sourceMappingURL=timetables.js.map