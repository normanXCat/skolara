import { z } from "zod";

export const contactFormSchema = z.object({
  fullName: z.string().min(2, "Le nom doit faire au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  subject: z.string().min(3, "Le sujet doit faire au moins 3 caractères"),
  message: z.string().min(10, "Le message doit faire au moins 10 caractères").max(2000, "Le message est trop long"),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
