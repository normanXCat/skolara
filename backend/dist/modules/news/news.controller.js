"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsController = void 0;
const news_schema_1 = require("./news.schema");
class NewsController {
    constructor(newsService) {
        this.newsService = newsService;
    }
    async create(req, res, next) {
        try {
            const validatedData = news_schema_1.createArticleSchema.parse(req.body);
            const authorId = req.user.id;
            const article = await this.newsService.create(authorId, validatedData);
            res.status(201).json({ success: true, data: article });
        }
        catch (error) {
            next(error);
        }
    }
    async findAll(req, res, next) {
        try {
            const filters = news_schema_1.newsFiltersSchema.parse(req.query);
            const result = await this.newsService.findAll(filters);
            res.json({ success: true, ...result });
        }
        catch (error) {
            next(error);
        }
    }
    async findPublic(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 9;
            const category = req.query.category;
            const result = await this.newsService.findPublic({ page, limit, category });
            res.json({ success: true, ...result });
        }
        catch (error) {
            next(error);
        }
    }
    async findById(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const article = await this.newsService.findById(id);
            if (!article) {
                return res.status(404).json({ success: false, error: "Article non trouvé" });
            }
            res.json({ success: true, data: article });
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const validatedData = news_schema_1.updateArticleSchema.parse(req.body);
            const article = await this.newsService.update(id, validatedData);
            res.json({ success: true, data: article });
        }
        catch (error) {
            next(error);
        }
    }
    async updateStatus(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const { status } = req.body;
            const article = await this.newsService.updateStatus(id, status);
            res.json({ success: true, data: article });
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            await this.newsService.delete(id);
            res.json({ success: true, message: "Article supprimé" });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.NewsController = NewsController;
//# sourceMappingURL=news.controller.js.map