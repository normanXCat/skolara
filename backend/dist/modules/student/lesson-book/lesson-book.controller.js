"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentLessonBookController = void 0;
const client_1 = require("../../../prisma/client");
class StudentLessonBookController {
    async getMyLessonBooks(req, res, next) {
        try {
            const studentUserId = req.user.id;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const student = await client_1.prisma.student.findUnique({ where: { userId: studentUserId } });
            if (!student)
                throw new Error("Élève non trouvé.");
            const skip = (page - 1) * limit;
            const where = { classId: student.classId };
            const [lessons, total] = await Promise.all([
                client_1.prisma.lessonBook.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: { lessonDate: "desc" },
                    include: {
                        subject: true,
                        teacher: { select: { speciality: true, user: { select: { firstName: true, name: true } } } }
                    }
                }),
                client_1.prisma.lessonBook.count({ where })
            ]);
            res.status(200).json({
                success: true,
                data: {
                    lessons,
                    pagination: { total, page, limit, totalPages: Math.ceil(total / limit) }
                }
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.StudentLessonBookController = StudentLessonBookController;
//# sourceMappingURL=lesson-book.controller.js.map