"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarRepository = void 0;
const client_1 = require("../../prisma/client");
class CalendarRepository {
    async create(data) {
        return client_1.prisma.calendarEvent.create({ data });
    }
    async findMany(params) {
        return client_1.prisma.calendarEvent.findMany({
            ...params,
            orderBy: params.orderBy || { startDate: "asc" },
        });
    }
    async findById(id) {
        return client_1.prisma.calendarEvent.findUnique({ where: { id } });
    }
    async update(id, data) {
        return client_1.prisma.calendarEvent.update({ where: { id }, data });
    }
    async delete(id) {
        return client_1.prisma.calendarEvent.delete({ where: { id } });
    }
    async findAllTypes() {
        return client_1.prisma.calendarEventType.findMany({
            orderBy: { label: "asc" }
        });
    }
}
exports.CalendarRepository = CalendarRepository;
//# sourceMappingURL=calendar.repository.js.map