import { Request, Response, NextFunction } from "express";
import { NewsService } from "./news.service";
import { createArticleSchema, updateArticleSchema, newsFiltersSchema } from "./news.schema";

export class NewsController {
  constructor(private newsService: NewsService) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = createArticleSchema.parse(req.body);
      const authorId = (req as any).user.id;
      const article = await this.newsService.create(authorId, validatedData);
      res.status(201).json({ success: true, data: article });
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = newsFiltersSchema.parse(req.query);
      const result = await this.newsService.findAll(filters);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  async findPublic(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 9;
      const category = req.query.category as string;
      const result = await this.newsService.findPublic({ page, limit, category });
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as any);
      const article = await this.newsService.findById(id);
      if (!article) {
        return res.status(404).json({ success: false, error: "Article non trouvé" });
      }
      res.json({ success: true, data: article });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as any);
      const validatedData = updateArticleSchema.parse(req.body);
      const article = await this.newsService.update(id, validatedData);
      res.json({ success: true, data: article });
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as any);
      const { status } = req.body;
      const article = await this.newsService.updateStatus(id, status);
      res.json({ success: true, data: article });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as any);
      await this.newsService.delete(id);
      res.json({ success: true, message: "Article supprimé" });
    } catch (error) {
      next(error);
    }
  }
}
