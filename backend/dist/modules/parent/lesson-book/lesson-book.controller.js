"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentLessonBookController = void 0;
const client_1 = require("../../../prisma/client");
class ParentLessonBookController {
    async getChildLessonBooks(req, res, next) {
        try {
            const parentUserId = req.user.id;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const parent = await client_1.prisma.parent.findUnique({
                where: { userId: parentUserId },
                include: { students: { select: { classId: true } } }
            });
            if (!parent)
                throw new Error("Parent non trouvé.");
            const classIds = parent.students.map((s) => s.classId);
            const skip = (page - 1) * limit;
            const where = { classId: { in: classIds } };
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
exports.ParentLessonBookController = ParentLessonBookController;
//# sourceMappingURL=lesson-book.controller.js.map