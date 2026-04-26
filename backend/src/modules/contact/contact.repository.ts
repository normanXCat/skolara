import { prisma } from "../../prisma/client";
import { Prisma } from "../../generated/prisma";

export class ContactRepository {
  async create(data: Prisma.ContactMessageCreateInput) {
    return prisma.contactMessage.create({ data });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.ContactMessageWhereInput;
  }) {
    const { skip, take, where } = params;
    const [data, total] = await Promise.all([
      prisma.contactMessage.findMany({
        skip,
        take,
        where,
        orderBy: { receivedAt: "desc" },
      }),
      prisma.contactMessage.count({ where }),
    ]);
    return { data, total };
  }

  async findById(id: number) {
    return prisma.contactMessage.findUnique({ where: { id } });
  }

  async markAsRead(id: number) {
    return prisma.contactMessage.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async delete(id: number) {
    return prisma.contactMessage.delete({ where: { id } });
  }

  async updateReplied(id: number) {
    return prisma.contactMessage.update({
      where: { id },
      data: { repliedAt: new Date() },
    });
  }

  async countUnread() {
    return prisma.contactMessage.count({ where: { isRead: false } });
  }
}
