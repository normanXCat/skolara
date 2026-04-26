"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calendarFiltersSchema = exports.updateEventSchema = exports.createEventSchema = void 0;
const zod_1 = require("zod");
const eventBaseSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Le titre est requis"),
    description: zod_1.z.string().optional().nullable(),
    startDate: zod_1.z.string().datetime("Date de début invalide"),
    endDate: zod_1.z.string().datetime("Date de fin invalide"),
    eventType: zod_1.z.enum(["holiday", "exam", "meeting", "other"]),
    isPublic: zod_1.z.boolean().default(true),
});
exports.createEventSchema = eventBaseSchema.refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
    message: "La date de fin doit être supérieure ou égale à la date de début",
    path: ["endDate"],
}).refine((data) => {
    const start = new Date(data.startDate);
    // On autorise une marge d'une minute pour éviter les erreurs liées au temps de soumission
    const now = new Date(Date.now() - 60000);
    return start >= now;
}, {
    message: "La date de début ne peut pas être dans le passé",
    path: ["startDate"],
});
exports.updateEventSchema = eventBaseSchema.partial().refine((data) => {
    if (data.startDate && data.endDate) {
        return new Date(data.endDate) >= new Date(data.startDate);
    }
    return true;
}, {
    message: "La date de fin doit être supérieure ou égale à la date de début",
    path: ["endDate"],
}).refine((data) => {
    if (data.startDate) {
        const start = new Date(data.startDate);
        const now = new Date(Date.now() - 60000);
        return start >= now;
    }
    return true;
}, {
    message: "La date de début ne peut pas être dans le passé",
    path: ["startDate"],
});
exports.calendarFiltersSchema = zod_1.z.object({
    month: zod_1.z.string().optional().transform((val) => (val ? parseInt(val) : undefined)),
    year: zod_1.z.string().optional().transform((val) => (val ? parseInt(val) : undefined)),
    upcoming: zod_1.z.string().optional().transform((val) => val === "true"),
});
//# sourceMappingURL=calendar.schema.js.map