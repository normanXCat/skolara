"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherLessonBookService = void 0;
const client_1 = require("../../../prisma/client");
const create_1 = require("../../../lib/notifications/create");
const prisma_1 = require("../../../generated/prisma");
class TeacherLessonBookService {
    async getLessonBooks(teacherUserId, classId, subjectId, page = 1, limit = 20) {
        const teacher = await client_1.prisma.teacher.findUnique({ where: { userId: teacherUserId } });
        if (!teacher)
            throw new Error("Enseignant non trouvé.");
        const where = { teacherId: teacher.id };
        if (classId)
            where.classId = classId;
        if (subjectId)
            where.subjectId = subjectId;
        const skip = (page - 1) * limit;
        const [lessons, total] = await Promise.all([
            client_1.prisma.lessonBook.findMany({
                where,
                skip,
                take: limit,
                orderBy: { lessonDate: "desc" },
                include: {
                    class: true,
                    subject: true
                }
            }),
            client_1.prisma.lessonBook.count({ where })
        ]);
        return {
            lessons,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };
    }
    async createLesson(teacherUserId, data) {
        const teacher = await client_1.prisma.teacher.findUnique({ where: { userId: teacherUserId } });
        if (!teacher)
            throw new Error("Enseignant non trouvé.");
        // Validate assignment
        const assignment = await client_1.prisma.teacherSubjectClass.findFirst({
            where: { teacherId: teacher.id, classId: data.classId, subjectId: data.subjectId }
        });
        if (!assignment)
            throw new Error("Vous n'êtes pas assigné à cette classe pour cette matière.");
        const lesson = await client_1.prisma.lessonBook.create({
            data: {
                teacherId: teacher.id,
                classId: data.classId,
                subjectId: data.subjectId,
                lessonDate: new Date(data.lessonDate),
                content: data.content,
                homework: data.homework,
                homeworkDueDate: data.homeworkDueDate ? new Date(data.homeworkDueDate) : null
            },
            include: {
                class: true,
                subject: true
            }
        });
        if (data.homework) {
            // Dispatch notification to all students of this class
            try {
                const students = await client_1.prisma.student.findMany({ where: { classId: data.classId } });
                const notifs = students.map((s) => ({
                    userId: s.userId,
                    type: prisma_1.NotificationType.GENERAL,
                    content: `Nouveaux devoirs ajoutés en ${lesson.subject.name} par ${teacher.speciality ? teacher.speciality + ' -' : ''} M/Mme pour le ${data.homeworkDueDate ? new Date(data.homeworkDueDate).toLocaleDateString() : 'prochain cours'}.`
                }));
                // We could use createMany for notifications, but our createNotification wrapper handles standard insertion logic.
                // In a real optimized system, we'd batch this. For now we use standard inserts:
                for (const n of notifs) {
                    await (0, create_1.createNotification)(n);
                }
            }
            catch (e) {
                console.error("Failed to dispatch homework notifications");
            }
        }
        return lesson;
    }
    async updateLesson(teacherUserId, id, data) {
        const teacher = await client_1.prisma.teacher.findUnique({ where: { userId: teacherUserId } });
        if (!teacher)
            throw new Error("Enseignant non trouvé.");
        const existing = await client_1.prisma.lessonBook.findUnique({ where: { id } });
        if (!existing)
            throw new Error("Leçon introuvable.");
        if (existing.teacherId !== teacher.id)
            throw new Error("Non autorisé.");
        const payload = {};
        if (data.content !== undefined)
            payload.content = data.content;
        if (data.homework !== undefined)
            payload.homework = data.homework;
        if (data.homeworkDueDate !== undefined)
            payload.homeworkDueDate = data.homeworkDueDate ? new Date(data.homeworkDueDate) : null;
        return client_1.prisma.lessonBook.update({
            where: { id },
            data: payload,
            include: {
                class: true,
                subject: true
            }
        });
    }
    async deleteLesson(teacherUserId, id) {
        const teacher = await client_1.prisma.teacher.findUnique({ where: { userId: teacherUserId } });
        if (!teacher)
            throw new Error("Enseignant non trouvé.");
        const existing = await client_1.prisma.lessonBook.findUnique({ where: { id } });
        if (!existing)
            throw new Error("Leçon introuvable.");
        if (existing.teacherId !== teacher.id)
            throw new Error("Non autorisé.");
        return client_1.prisma.lessonBook.delete({ where: { id } });
    }
}
exports.TeacherLessonBookService = TeacherLessonBookService;
//# sourceMappingURL=lesson-book.service.js.map