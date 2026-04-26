import { NewsRepository } from "./news.repository";
import { CreateArticleInput, UpdateArticleInput, NewsFilters } from "./news.schema";
import { ArticleStatus } from "../../generated/prisma";

export class NewsService {
  constructor(private newsRepository: NewsRepository) {}

  async create(authorId: number, data: CreateArticleInput) {
    return this.newsRepository.create({
      ...data,
      authorId,
      publishedAt: data.status === ArticleStatus.PUBLISHED ? new Date().toISOString() : data.publishedAt,
    });
  }

  async findAll(filters: NewsFilters) {
    const { page = 1, limit = 10, search, status, category } = filters;
    
    const where: any = {};
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
      ];
    }
    if (status) where.status = status;
    if (category) where.category = category;

    return this.newsRepository.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where,
    });
  }

  async findPublic(filters: { page: number; limit: number; category?: string }) {
    const { page, limit, category } = filters;
    const now = new Date();

    const where: any = {
      status: "PUBLISHED",
      OR: [
        { publishedAt: { lte: now } },
        { publishedAt: null }
      ]
    };
    if (category) where.category = category;

    return this.newsRepository.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where,
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: number) {
    return this.newsRepository.findById(id);
  }

  async update(id: number, data: UpdateArticleInput) {
    return this.newsRepository.update(id, data);
  }

  async delete(id: number) {
    return this.newsRepository.delete(id);
  }

  async updateStatus(id: number, status: ArticleStatus) {
    return this.newsRepository.updateStatus(id, status);
  }
}
