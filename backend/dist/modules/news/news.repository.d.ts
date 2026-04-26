import { Prisma, ArticleStatus } from "../../generated/prisma";
export declare class NewsRepository {
    create(data: Prisma.ArticleUncheckedCreateInput): Promise<{
        status: import("../../generated/prisma").$Enums.ArticleStatus;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        authorId: number;
        title: string;
        content: string;
        imageUrl: string | null;
        category: string | null;
        publishedAt: Date | null;
    }>;
    findMany(params: {
        skip?: number;
        take?: number;
        where?: Prisma.ArticleWhereInput;
        orderBy?: Prisma.ArticleOrderByWithRelationInput;
    }): Promise<{
        data: ({
            author: {
                id: number;
                name: string;
                firstName: string;
            };
        } & {
            status: import("../../generated/prisma").$Enums.ArticleStatus;
            id: number;
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
        status: import("../../generated/prisma").$Enums.ArticleStatus;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        authorId: number;
        title: string;
        content: string;
        imageUrl: string | null;
        category: string | null;
        publishedAt: Date | null;
    }) | null>;
    update(id: number, data: Prisma.ArticleUpdateInput): Promise<{
        status: import("../../generated/prisma").$Enums.ArticleStatus;
        id: number;
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
        status: import("../../generated/prisma").$Enums.ArticleStatus;
        id: number;
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
        status: import("../../generated/prisma").$Enums.ArticleStatus;
        id: number;
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
//# sourceMappingURL=news.repository.d.ts.map