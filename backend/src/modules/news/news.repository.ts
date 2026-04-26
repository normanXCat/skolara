import { prisma } from "../../prisma/client";
import { Prisma, ArticleStatus } from "../../generated/prisma";

export class NewsRepository {
  async create(data: Prisma.ArticleUncheckedCreateInput) {
    return prisma.article.create({ data });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.ArticleWhereInput;
    orderBy?: Prisma.ArticleOrderByWithRelationInput;
  }) {
    const { skip, take, where, orderBy } = params;
    const [data, total] = await Promise.all([
      prisma.article.findMany({
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
      prisma.article.count({ where }),
    ]);
    return { data, total };
  }

  async findById(id: number) {
    return prisma.article.findUnique({
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

  async update(id: number, data: Prisma.ArticleUpdateInput) {
    return prisma.article.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.article.delete({ where: { id } });
  }

  async updateStatus(id: number, status: ArticleStatus) {
    return prisma.article.update({ where: { id }, data: { status } });
  }
}
