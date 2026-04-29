import { Prisma, ArticleStatus } from "../../generated/prisma";
export declare class NewsRepository {
    create(data: Prisma.ArticleUncheckedCreateInput): Promise<{
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
    update(id: number, data: Prisma.ArticleUpdateInput): Promise<{
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
//# sourceMappingURL=news.repository.d.ts.map