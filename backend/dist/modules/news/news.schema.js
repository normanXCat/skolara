"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newsFiltersSchema = exports.updateArticleSchema = exports.createArticleSchema = exports.ArticleStatus = void 0;
const zod_1 = require("zod");
var ArticleStatus;
(function (ArticleStatus) {
    ArticleStatus["DRAFT"] = "DRAFT";
    ArticleStatus["PUBLISHED"] = "PUBLISHED";
    ArticleStatus["ARCHIVED"] = "ARCHIVED";
})(ArticleStatus || (exports.ArticleStatus = ArticleStatus = {}));
exports.createArticleSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, "Le titre est requis"),
    content: zod_1.z.string().min(10, "Le contenu doit faire au moins 10 caractères"),
    imageUrl: zod_1.z.string().url("Format d'image invalide").optional().nullable(),
    status: zod_1.z.nativeEnum(ArticleStatus).default(ArticleStatus.DRAFT),
    category: zod_1.z.string().optional().nullable(),
    publishedAt: zod_1.z.string().datetime().optional().nullable(),
});
exports.updateArticleSchema = exports.createArticleSchema.partial();
exports.newsFiltersSchema = zod_1.z.object({
    page: zod_1.z.string().optional().transform((val) => (val ? parseInt(val) : 1)),
    limit: zod_1.z.string().optional().transform((val) => (val ? parseInt(val) : 10)),
    search: zod_1.z.string().optional(),
    status: zod_1.z.nativeEnum(ArticleStatus).optional(),
    category: zod_1.z.string().optional(),
});
//# sourceMappingURL=news.schema.js.map