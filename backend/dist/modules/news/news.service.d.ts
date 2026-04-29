import { NewsRepository } from "./news.repository";
import { CreateArticleInput, UpdateArticleInput, NewsFilters } from "./news.schema";
import { ArticleStatus } from "../../generated/prisma";
export declare class NewsService {
    private newsRepository;
    constructor(newsRepository: NewsRepository);
    create(authorId: number, data: CreateArticleInput): Promise<{
        id: number;
        status: import("../../generated/prisma").$Enums.ArticleStatus;
        createdAt: Date;
        updatedAt: Date;
        authorId: number;
        title: string;
        content: string;
        imageUrl: string | null;
        category: string | null;
        publishedAt: Date | null;
    }>;
    findAll(filters: NewsFilters): Promise<{
        data: ({
            author: {
                id: number;
                name: string;
                firstName: string;
            };
        } & {
            id: number;
            status: import("../../generated/prisma").$Enums.ArticleStatus;
            createdAt: Date;
            updatedAt: Date;
            authorId: number;
            title: string;
            content: string;
            imageUrl: string | null;
            category: string | null;
            publishedAt: Date | null;
        })[];
        total: number;
    }>;
    findPublic(filters: {
        page: number;
        limit: number;
        category?: string;
    }): Promise<{
        data: ({
            author: {
                id: number;
                name: string;
                firstName: string;
            };
        } & {
            id: number;
            status: import("../../generated/prisma").$Enums.ArticleStatus;
            createdAt: Date;
            updatedAt: Date;
            authorId: number;
            title: string;
            content: string;
            imageUrl: string | null;
            category: string | null;
            publishedAt: Date | null;
        })[];
        total: number;
    }>;
    findById(id: number): Promise<({
        author: {
            id: number;
            name: string;
            firstName: string;
        };
    } & {
        id: number;
        status: import("../../generated/prisma").$Enums.ArticleStatus;
        createdAt: Date;
        updatedAt: Date;
        authorId: number;
        title: string;
        content: string;
        imageUrl: string | null;
        category: string | null;
        publishedAt: Date | null;
    }) | null>;
    update(id: number, data: UpdateArticleInput): Promise<{
        id: number;
        status: import("../../generated/prisma").$Enums.ArticleStatus;
        createdAt: Date;
        updatedAt: Date;
        authorId: number;
        title: string;
        content: string;
        imageUrl: string | null;
        category: string | null;
        publishedAt: Date | null;
    }>;
    delete(id: number): Promise<{
        id: number;
        status: import("../../generated/prisma").$Enums.ArticleStatus;
        createdAt: Date;
        updatedAt: Date;
        authorId: number;
        title: string;
        content: string;
        imageUrl: string | null;
        category: string | null;
        publishedAt: Date | null;
    }>;
    updateStatus(id: number, status: ArticleStatus): Promise<{
        id: number;
        status: import("../../generated/prisma").$Enums.ArticleStatus;
        createdAt: Date;
        updatedAt: Date;
        authorId: number;
        title: string;
        content: string;
        imageUrl: string | null;
        category: string | null;
        publishedAt: Date | null;
    }>;
}
//# sourceMappingURL=news.service.d.ts.map