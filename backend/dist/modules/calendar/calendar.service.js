"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarService = void 0;
class CalendarService {
    constructor(calendarRepository) {
        this.calendarRepository = calendarRepository;
    }
    async create(data) {
        return this.calendarRepository.create(data);
    }
    async findAll(filters, isPublicOnly = false) {
        const { month, year, upcoming } = filters;
        const where = {};
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
    async findById(id) {
        return this.calendarRepository.findById(id);
    }
    async update(id, data) {
        return this.calendarRepository.update(id, data);
    }
    async delete(id) {
        return this.calendarRepository.delete(id);
    }
    async findAllTypes() {
        return this.calendarRepository.findAllTypes();
    }
}
exports.CalendarService = CalendarService;
//# sourceMappingURL=calendar.service.js.map