import { z } from "zod";

export const createArticleSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  content: z.string().min(10, "Le contenu doit faire au moins 10 caractères"),
  imageUrl: z.string().url("Format d'image invalide").optional().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
  category: z.string().optional().or(z.literal("")),
  publishedAt: z.string().optional().nullable(),
});

export const updateArticleSchema = createArticleSchema.partial();

export const newsFiltersSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(10),
  search: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
  category: z.string().optional(),
});

export type CreateArticleInput = z.infer<typeof createArticleSchema>;
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;
export type NewsFilters = z.infer<typeof newsFiltersSchema>;
