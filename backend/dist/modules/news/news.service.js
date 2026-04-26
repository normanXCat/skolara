"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsService = void 0;
const prisma_1 = require("../../generated/prisma");
class NewsService {
    constructor(newsRepository) {
        this.newsRepository = newsRepository;
    }
    async create(authorId, data) {
        return this.newsRepository.create({
            ...data,
            authorId,
            publishedAt: data.status === prisma_1.ArticleStatus.PUBLISHED ? new Date().toISOString() : data.publishedAt,
        });
    }
    async findAll(filters) {
        const { page = 1, limit = 10, search, status, category } = filters;
        const where = {};
        if (search) {
            where.OR = [
                { title: { contains: search, mode: "insensitive" } },
                { content: { contains: search, mode: "insensitive" } },
            ];
        }
        if (status)
            where.status = status;
        if (category)
            where.category = category;
        return this.newsRepository.findMany({
            skip: (page - 1) * limit,
            take: limit,
            where,
        });
    }
    async findPublic(filters) {
        const { page, limit, category } = filters;
        const now = new Date();
        const where = {
            status: "PUBLISHED",
            OR: [
                { publishedAt: { lte: now } },
                { publishedAt: null }
            ]
        };
        if (category)
            where.category = category;
        return this.newsRepository.findMany({
            skip: (page - 1) * limit,
            take: limit,
            where,
            orderBy: { createdAt: "desc" },
        });
    }
    async findById(id) {
        return this.newsRepository.findById(id);
    }
    async update(id, data) {
        return this.newsRepository.update(id, data);
    }
    async delete(id) {
        return this.newsRepository.delete(id);
    }
    async updateStatus(id, status) {
        return this.newsRepository.updateStatus(id, status);
    }
}
exports.NewsService = NewsService;
//# sourceMappingURL=news.service.js.map