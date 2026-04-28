"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentTimetableController = void 0;
const timetables_service_1 = __importDefault(require("../../admin/timetables/timetables.service"));
const client_1 = require("../../../prisma/client");
class StudentTimetableController {
    constructor() {
        this.getMyTimetable = async (req, res, next) => {
            try {
                const userId = req.user.userId;
                const student = await client_1.prisma.student.findUnique({ where: { userId } });
                if (!student || !student.classId) {
                    throw { status: 403, message: "Student profile or class not found" };
                }
                const schoolYear = req.query.schoolYear || student.schoolYear;
                const timetables = await timetables_service_1.default.getTimetables({
                    classId: student.classId,
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
        };
    }
}
exports.StudentTimetableController = StudentTimetableController;
exports.default = new StudentTimetableController();
//# sourceMappingURL=student-timetable.controller.js.map