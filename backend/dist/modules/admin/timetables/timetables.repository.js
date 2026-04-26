"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimetablesRepository = void 0;
const client_1 = require("../../../prisma/client");
class TimetablesRepository {
    async findMany(filters) {
        const { classId, teacherId, schoolYear, dayOfWeek } = filters;
        const where = {};
        if (classId)
            where.classId = classId;
        if (teacherId)
            where.teacherId = teacherId;
        if (schoolYear)
            where.schoolYear = schoolYear;
        if (dayOfWeek)
            where.dayOfWeek = dayOfWeek;
        return client_1.prisma.timetable.findMany({
            where,
            include: {
                class: true,
                subject: true,
                teacher: {
                    include: {
                        user: {
                            select: {
                                firstName: true,
                                name: true,
                            },
                        },
                    },
                },
            },
            orderBy: [
                { dayOfWeek: "asc" },
                { startTime: "asc" },
            ],
        });
    }
    async findById(id) {
        return client_1.prisma.timetable.findUnique({
            where: { id },
            include: {
                class: true,
                subject: true,
                teacher: {
                    include: {
                        user: {
                            select: {
                                firstName: true,
                                name: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async create(data) {
        return client_1.prisma.timetable.create({ data });
    }
    async update(id, data) {
        return client_1.prisma.timetable.update({
            where: { id },
            data,
        });
    }
    async delete(id) {
        return client_1.prisma.timetable.delete({
            where: { id },
        });
    }
    /**
     * Finds overlapping slots for a class or teacher.
     */
    async findOverlappingSlots(params) {
        const { classId, teacherId, dayOfWeek, startTime, endTime, schoolYear, excludeId } = params;
        const where = {
            dayOfWeek,
            schoolYear,
            AND: [
                { startTime: { lt: endTime } },
                { endTime: { gt: startTime } },
            ],
        };
        if (excludeId) {
            where.id = { not: excludeId };
        }
        const classConflict = classId
            ? await client_1.prisma.timetable.findFirst({
                where: { ...where, classId },
                include: { class: true, subject: true },
            })
            : null;
        const teacherConflict = teacherId
            ? await client_1.prisma.timetable.findFirst({
                where: { ...where, teacherId },
                include: { teacher: { include: { user: true } }, subject: true },
            })
            : null;
        return { classConflict, teacherConflict };
    }
}
exports.TimetablesRepository = TimetablesRepository;
exports.default = new TimetablesRepository();
//# sourceMappingURL=timetables.repository.js.map