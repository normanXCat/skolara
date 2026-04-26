import { z } from "zod";

const eventBaseSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().optional().or(z.literal("")),
  startDate: z.string().min(1, "La date de début est requise"),
  endDate: z.string().min(1, "La date de fin est requise"),
  eventType: z.enum(["holiday", "exam", "meeting", "other"]),
  isPublic: z.boolean().default(true),
});

export const createEventSchema = eventBaseSchema.refine((data) => new Date(data.endDate) >= new Date(data.startDate), {
  message: "La date de fin doit être supérieure ou égale à la date de début",
  path: ["endDate"],
}).refine((data) => {
  const start = new Date(data.startDate);
  const now = new Date();
  return start >= now;
}, {
  message: "La date de début ne peut pas être dans le passé",
  path: ["startDate"],
});

export const updateEventSchema = eventBaseSchema.partial().refine((data) => {
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
    const now = new Date();
    return start >= now;
  }
  return true;
}, {
  message: "La date de début ne peut pas être dans le passé",
  path: ["startDate"],
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
