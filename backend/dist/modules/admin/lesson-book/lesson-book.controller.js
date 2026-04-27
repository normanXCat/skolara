"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminLessonBookController = void 0;
const client_1 = require("../../../prisma/client");
class AdminLessonBookController {
    async getAll(req, res, next) {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const classId = req.query.classId ? parseInt(req.query.classId) : undefined;
            const subjectId = req.query.subjectId ? parseInt(req.query.subjectId) : undefined;
            const skip = (page - 1) * limit;
            const where = {};
            if (classId)
                where.classId = classId;
            if (subjectId)
                where.subjectId = subjectId;
            const [lessons, total] = await Promise.all([
                client_1.prisma.lessonBook.findMany({
                    where,
                    skip,
                    take: limit,
                    orderBy: { lessonDate: "desc" },
                    include: {
                        class: true,
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
exports.AdminLessonBookController = AdminLessonBookController;
//# sourceMappingURL=lesson-book.controller.js.map