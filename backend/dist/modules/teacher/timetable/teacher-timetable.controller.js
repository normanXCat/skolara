"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherTimetableController = void 0;
const timetables_service_1 = __importDefault(require("../../admin/timetables/timetables.service"));
const client_1 = require("../../../prisma/client");
class TeacherTimetableController {
    async getMyTimetable(req, res, next) {
        try {
            const userId = req.user.userId;
            const teacher = await client_1.prisma.teacher.findUnique({ where: { userId } });
            if (!teacher) {
                throw { status: 403, message: "Teacher profile not found" };
            }
            const schoolYear = req.query.schoolYear;
            const timetables = await timetables_service_1.default.getTimetables({
                teacherId: teacher.id,
                schoolYear,
            });
            res.status(200).json({
                success: true,
                data: timetables,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.TeacherTimetableController = TeacherTimetableController;
exports.default = new TeacherTimetableController();
//# sourceMappingURL=teacher-timetable.controller.js.map