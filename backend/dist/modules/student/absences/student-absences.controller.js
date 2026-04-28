"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentAbsencesController = void 0;
const client_1 = require("../../../prisma/client");
class StudentAbsencesController {
    constructor() {
        this.getMyAbsences = async (req, res, next) => {
            try {
                const userId = req.user.userId;
                const student = await client_1.prisma.student.findUnique({
                    where: { userId }
                });
                if (!student) {
                    throw { status: 403, message: "Student profile not found" };
                }
                const absences = await client_1.prisma.absence.findMany({
                    where: { studentId: student.id },
                    orderBy: { date: "desc" },
                });
                const totalAbsences = absences.length;
                const justifiedAbsences = absences.filter(a => a.isJustified).length;
                res.status(200).json({
                    success: true,
                    data: {
                        absences,
                        stats: {
                            totalAbsences,
                            justifiedAbsences
                        }
                    },
                });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.StudentAbsencesController = StudentAbsencesController;
exports.default = new StudentAbsencesController();
//# sourceMappingURL=student-absences.controller.js.map