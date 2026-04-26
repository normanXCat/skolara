import { CalendarRepository } from "./calendar.repository";
import { CreateEventInput, UpdateEventInput, CalendarFilters } from "./calendar.schema";

export class CalendarService {
  constructor(private calendarRepository: CalendarRepository) {}

  async create(data: CreateEventInput) {
    return this.calendarRepository.create(data);
  }

  async findAll(filters: CalendarFilters, isPublicOnly = false) {
    const { month, year, upcoming } = filters;
    const where: any = {};

    if (isPublicOnly) {
      where.isPublic = true;
    }

    if (upcoming) {
      const now = new Date();
      where.endDate = { gte: now };
      return this.calendarRepository.findMany({
        where,
        take: 10,
        orderBy: { startDate: "asc" },
      });
    }

    if (month !== undefined && year !== undefined) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59);
      
      where.OR = [
        { startDate: { gte: startDate, lte: endDate } },
        { endDate: { gte: startDate, lte: endDate } },
        { AND: [{ startDate: { lte: startDate } }, { endDate: { gte: endDate } }] },
      ];
    }

    return this.calendarRepository.findMany({ where });
  }

  async findById(id: number) {
    return this.calendarRepository.findById(id);
  }

  async update(id: number, data: UpdateEventInput) {
    return this.calendarRepository.update(id, data as any);
  }

  async delete(id: number) {
    return this.calendarRepository.delete(id);
  }

  async findAllTypes() {
    return this.calendarRepository.findAllTypes();
  }
}
