"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimetablesService = void 0;
const timetables_repository_1 = __importDefault(require("./timetables.repository"));
class TimetablesService {
    async getTimetables(filters) {
        return timetables_repository_1.default.findMany(filters);
    }
    async getTimetableById(id) {
        const timetable = await timetables_repository_1.default.findById(id);
        if (!timetable) {
            throw { status: 404, message: "Timetable slot not found" };
        }
        return timetable;
    }
    async checkConflicts(data) {
        if (data.startTime >= data.endTime) {
            throw { status: 400, message: "End time must be after start time" };
        }
        const { classConflict, teacherConflict } = await timetables_repository_1.default.findOverlappingSlots(data);
        if (classConflict && data.classId === classConflict.classId) {
            return {
                conflict: true,
                reason: `La classe a déjà un cours (${classConflict.subject.name}) à ce créneau.`,
                type: 'CLASS'
            };
        }
        if (teacherConflict && data.teacherId === teacherConflict.teacherId) {
            const teacherName = `${teacherConflict.teacher.user.firstName} ${teacherConflict.teacher.user.name}`;
            return {
                conflict: true,
                reason: `L'enseignant ${teacherName} a déjà un cours (${teacherConflict.subject.name}) à ce créneau.`,
                type: 'TEACHER'
            };
        }
        return { conflict: false };
    }
    async createTimetableSlot(data) {
        const conflictCheck = await this.checkConflicts({
            classId: data.classId,
            teacherId: data.teacherId,
            dayOfWeek: data.dayOfWeek,
            startTime: data.startTime,
            endTime: data.endTime,
            schoolYear: data.schoolYear,
        });
        if (conflictCheck.conflict) {
            throw { status: 409, message: conflictCheck.reason };
        }
        return timetables_repository_1.default.create(data);
    }
    async updateTimetableSlot(id, data) {
        const slot = await this.getTimetableById(id);
        const conflictCheck = await this.checkConflicts({
            classId: data.classId ?? slot.classId,
            teacherId: data.teacherId ?? slot.teacherId,
            dayOfWeek: data.dayOfWeek ?? slot.dayOfWeek,
            startTime: data.startTime ?? slot.startTime,
            endTime: data.endTime ?? slot.endTime,
            schoolYear: data.schoolYear ?? slot.schoolYear,
            excludeId: id,
        });
        if (conflictCheck.conflict) {
            throw { status: 409, message: conflictCheck.reason };
        }
        return timetables_repository_1.default.update(id, data);
    }
    async deleteTimetableSlot(id) {
        await this.getTimetableById(id);
        return timetables_repository_1.default.delete(id);
    }
}
exports.TimetablesService = TimetablesService;
exports.default = new TimetablesService();
//# sourceMappingURL=timetables.service.js.map