import { z } from "zod";

const optionalUrl = z
  .string()
  .url("URL invalide")
  .or(z.literal(""));

export const updateSettingsSchema = z.object({
  school_name: z.string().min(1, "Le nom de l'établissement est requis"),
  phone: z.string(),
  email: z
    .string()
    .email("Format d'email invalide")
    .or(z.literal("")),
  address: z.string(),
  city: z.string(),
  google_maps_url: optionalUrl,
  facebook_url: optionalUrl,
  instagram_url: optionalUrl,
  twitter_url: optionalUrl,
  linkedin_url: optionalUrl,
  mentions_legales: z.string(),
  cgu: z.string(),
});

export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
