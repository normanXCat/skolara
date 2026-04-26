"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentTimetableController = void 0;
const timetables_service_1 = __importDefault(require("../../admin/timetables/timetables.service"));
const client_1 = require("../../../prisma/client");
class ParentTimetableController {
    async getChildTimetable(req, res, next) {
        try {
            const userId = req.user.userId;
            const childId = Number(req.query.childId);
            if (!childId) {
                throw { status: 400, message: "Child ID is required" };
            }
            // Vérifier que c'est bien l'enfant du parent
            const parent = await client_1.prisma.parent.findUnique({
                where: { userId },
                include: { students: true }
            });
            if (!parent) {
                throw { status: 403, message: "Parent profile not found" };
            }
            const isChildOfParent = parent.students.some(s => s.id === childId);
            if (!isChildOfParent) {
                throw { status: 403, message: "Access denied: this student is not your child" };
            }
            const student = await client_1.prisma.student.findUnique({ where: { id: childId } });
            if (!student || !student.classId) {
                throw { status: 404, message: "Student class not found" };
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
    }
}
exports.ParentTimetableController = ParentTimetableController;
exports.default = new ParentTimetableController();
//# sourceMappingURL=parent-timetable.controller.js.map