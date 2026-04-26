import { z } from "zod";

export enum ArticleStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export const createArticleSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  content: z.string().min(10, "Le contenu doit faire au moins 10 caractères"),
  imageUrl: z.string().url("Format d'image invalide").optional().nullable(),
  status: z.nativeEnum(ArticleStatus).default(ArticleStatus.DRAFT),
  category: z.string().optional().nullable(),
  publishedAt: z.string().datetime().optional().nullable(),
});

export const updateArticleSchema = createArticleSchema.partial();

export const newsFiltersSchema = z.object({
  page: z.string().optional().transform((val) => (val ? parseInt(val) : 1)),
  limit: z.string().optional().transform((val) => (val ? parseInt(val) : 10)),
  search: z.string().optional(),
  status: z.nativeEnum(ArticleStatus).optional(),
  category: z.string().optional(),
});

export type CreateArticleInput = z.infer<typeof createArticleSchema>;
export type UpdateArticleInput = z.infer<typeof updateArticleSchema>;
export type NewsFilters = z.infer<typeof newsFiltersSchema>;
