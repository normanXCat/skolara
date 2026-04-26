import { prisma } from "../../prisma/client";
import { Prisma } from "../../generated/prisma";

export class CalendarRepository {
  async create(data: Prisma.CalendarEventCreateInput) {
    return prisma.calendarEvent.create({ data });
  }

  async findMany(params: {
    where?: Prisma.CalendarEventWhereInput;
    orderBy?: Prisma.CalendarEventOrderByWithRelationInput;
    take?: number;
  }) {
    return prisma.calendarEvent.findMany({
      ...params,
      orderBy: params.orderBy || { startDate: "asc" },
    });
  }

  async findById(id: number) {
    return prisma.calendarEvent.findUnique({ where: { id } });
  }

  async update(id: number, data: Prisma.CalendarEventUpdateInput) {
    return prisma.calendarEvent.update({ where: { id }, data });
  }

  async delete(id: number) {
    return prisma.calendarEvent.delete({ where: { id } });
  }

  async findAllTypes() {
    return prisma.calendarEventType.findMany({
      orderBy: { label: "asc" }
    });
  }
}
