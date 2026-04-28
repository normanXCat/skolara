import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../prisma/client";

export class StudentDashboardController {
  getDashboardData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as any).user.userId;
      
      const student = await prisma.student.findUnique({
        where: { userId },
        include: {
          class: true,
          user: {
            select: {
              firstName: true,
              name: true,
            },
          },
        },
      });

      if (!student) {
        throw { status: 403, message: "Student profile not found" };
      }

      // Recent grades (last 5)
      const recentGrades = await prisma.grade.findMany({
        where: { studentId: student.id },
        take: 5,
        orderBy: { gradedAt: "desc" },
        include: { subject: true },
      });

      // Today's timetable
      const today = new Date().getDay(); // 0=Sunday, 1=Monday...
      // Map JS day to our 1-5 (Monday-Friday)
      const dayOfWeek = today === 0 ? 7 : today; // Simple map, adjust if needed (1=Mon, 5=Fri in prompt)
      
      const todayTimetable = await prisma.timetable.findMany({
        where: {
          classId: student.classId || 0,
          dayOfWeek: dayOfWeek,
          schoolYear: student.schoolYear,
        },
        orderBy: { startTime: "asc" },
        include: { subject: true, teacher: { include: { user: true } } },
      });

      // Recent absences (last 5)
      const recentAbsences = await prisma.absence.findMany({
        where: { studentId: student.id },
        take: 5,
        orderBy: { date: "desc" },
      });

      // Unread notifications
      const unreadNotifications = await prisma.notification.count({
        where: { userId, isRead: false },
      });

      // Simple average calculation (can be improved)
      // For now, let's just return a placeholder or implement basic logic
      // In real scenario, we'd calculate weighted average per semester
      const grades = await prisma.grade.findMany({
        where: { studentId: student.id },
        include: { subject: true },
      });

      const calculation = this.calculateAverages(grades);

      res.status(200).json({
        success: true,
        data: {
          student: {
            firstName: student.user.firstName,
            lastName: student.user.name,
            class: student.class?.name,
            schoolYear: student.schoolYear,
          },
          recentGrades,
          todayTimetable,
          recentAbsences,
          unreadNotifications,
          semesterAverages: calculation,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  private calculateAverages(grades: any[]) {
    // Basic grouping by semester
    const semesters = [1, 2];
    return semesters.map(sem => {
      const semGrades = grades.filter(g => g.semester === sem);
      if (semGrades.length === 0) return { semester: sem, average: null, subjects: [] };

      // Group by subject to get average per subject first
      const subjectMap = new Map();
      semGrades.forEach(g => {
        if (!subjectMap.has(g.subjectId)) {
          subjectMap.set(g.subjectId, {
            name: g.subject.name,
            coef: g.subject.coefficient,
            sum: 0,
            count: 0
          });
        }
        const data = subjectMap.get(g.subjectId);
        data.sum += g.value;
        data.count++;
      });

      const subjects = Array.from(subjectMap.values()).map(s => ({
        subjectName: s.name,
        average: Number((s.sum / s.count).toFixed(2)),
        coefficient: s.coef
      }));

      const totalWeighted = subjects.reduce((acc, s) => acc + (s.average * s.coefficient), 0);
      const totalCoef = subjects.reduce((acc, s) => acc + s.coefficient, 0);
      const overallAverage = totalCoef > 0 ? Number((totalWeighted / totalCoef).toFixed(2)) : null;

      return {
        semester: sem,
        average: overallAverage,
        subjects
      };
    });
  }
}

export default new StudentDashboardController();
