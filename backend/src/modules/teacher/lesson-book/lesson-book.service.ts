import { prisma } from "../../../prisma/client";
import { createNotification } from "../../../lib/notifications/create";
import { NotificationType } from "../../../generated/prisma";

export class TeacherLessonBookService {
  async getLessonBooks(teacherUserId: number, classId?: number, subjectId?: number, page: number = 1, limit: number = 20) {
    const teacher = await prisma.teacher.findUnique({ where: { userId: teacherUserId } });
    if (!teacher) throw new Error("Enseignant non trouvé.");

    const where: any = { teacherId: teacher.id };
    if (classId) where.classId = classId;
    if (subjectId) where.subjectId = subjectId;

    const skip = (page - 1) * limit;
    
    const [lessons, total] = await Promise.all([
      prisma.lessonBook.findMany({
        where,
        skip,
        take: limit,
        orderBy: { lessonDate: "desc" },
        include: {
          class: true,
          subject: true
        }
      }),
      prisma.lessonBook.count({ where })
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

  async createLesson(teacherUserId: number, data: { classId: number; subjectId: number; lessonDate: string; content: string; homework?: string; homeworkDueDate?: string }) {
    const teacher = await prisma.teacher.findUnique({ where: { userId: teacherUserId } });
    if (!teacher) throw new Error("Enseignant non trouvé.");

    // Validate assignment
    const assignment = await prisma.teacherSubjectClass.findFirst({
        where: { teacherId: teacher.id, classId: data.classId, subjectId: data.subjectId }
    });
    if (!assignment) throw new Error("Vous n'êtes pas assigné à cette classe pour cette matière.");

    const lesson = await prisma.lessonBook.create({
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
           const students = await prisma.student.findMany({ where: { classId: data.classId } });
           const notifs = students.map((s: any) => ({
              userId: s.userId,
              type: NotificationType.GENERAL,
              content: `Nouveaux devoirs ajoutés en ${lesson.subject.name} par ${teacher.speciality ? teacher.speciality + ' -' : ''} M/Mme pour le ${data.homeworkDueDate ? new Date(data.homeworkDueDate).toLocaleDateString() : 'prochain cours'}.`
           }));
           // We could use createMany for notifications, but our createNotification wrapper handles standard insertion logic.
           // In a real optimized system, we'd batch this. For now we use standard inserts:
           for (const n of notifs) {
              await createNotification(n);
           }
       } catch(e) {
           console.error("Failed to dispatch homework notifications");
       }
    }

    return lesson;
  }

  async updateLesson(teacherUserId: number, id: number, data: { content?: string; homework?: string; homeworkDueDate?: string }) {
    const teacher = await prisma.teacher.findUnique({ where: { userId: teacherUserId } });
    if (!teacher) throw new Error("Enseignant non trouvé.");

    const existing = await prisma.lessonBook.findUnique({ where: { id } });
    if (!existing) throw new Error("Leçon introuvable.");
    if (existing.teacherId !== teacher.id) throw new Error("Non autorisé.");

    const payload: any = {};
    if (data.content !== undefined) payload.content = data.content;
    if (data.homework !== undefined) payload.homework = data.homework;
    if (data.homeworkDueDate !== undefined) payload.homeworkDueDate = data.homeworkDueDate ? new Date(data.homeworkDueDate) : null;

    return prisma.lessonBook.update({
      where: { id },
      data: payload,
      include: {
        class: true,
        subject: true
      }
    });
  }

  async deleteLesson(teacherUserId: number, id: number) {
    const teacher = await prisma.teacher.findUnique({ where: { userId: teacherUserId } });
    if (!teacher) throw new Error("Enseignant non trouvé.");

    const existing = await prisma.lessonBook.findUnique({ where: { id } });
    if (!existing) throw new Error("Leçon introuvable.");
    if (existing.teacherId !== teacher.id) throw new Error("Non autorisé.");

    return prisma.lessonBook.delete({ where: { id } });
  }
}
