"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsRepository = void 0;
const client_1 = require("../../prisma/client");
class NewsRepository {
    async create(data) {
        return client_1.prisma.article.create({ data });
    }
    async findMany(params) {
        const { skip, take, where, orderBy } = params;
        const [data, total] = await Promise.all([
            client_1.prisma.article.findMany({
                skip,
                take,
                where,
                orderBy: orderBy || { createdAt: "desc" },
                include: {
                    author: {
                        select: {
                            id: true,
                            firstName: true,
                            name: true,
                        },
                    },
                },
            }),
            client_1.prisma.article.count({ where }),
        ]);
        return { data, total };
    }
    async findById(id) {
        return client_1.prisma.article.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        firstName: true,
                        name: true,
                    },
                },
            },
        });
    }
    async update(id, data) {
        return client_1.prisma.article.update({ where: { id }, data });
    }
    async delete(id) {
        return client_1.prisma.article.delete({ where: { id } });
    }
    async updateStatus(id, status) {
        return client_1.prisma.article.update({ where: { id }, data: { status } });
    }
}
exports.NewsRepository = NewsRepository;
//# sourceMappingURL=news.repository.js.map