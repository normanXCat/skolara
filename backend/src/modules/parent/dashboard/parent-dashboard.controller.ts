import { Request, Response, NextFunction } from "express";
import { prisma } from "../../../prisma/client";

export class ParentDashboardController {
  async getDashboardData(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;
      const childId = req.query.childId ? Number(req.query.childId) : undefined;

      const parent = await prisma.parent.findUnique({
        where: { userId },
        include: {
          students: {
            include: {
              class: true,
              user: {
                select: {
                  firstName: true,
                  name: true,
                },
              },
            },
          },
        },
      });

      if (!parent) {
        throw { status: 403, message: "Parent profile not found" };
      }

      if (parent.students.length === 0) {
        return res.status(200).json({
          success: true,
          data: {
            parent: { firstName: (req as any).user.firstName, lastName: (req as any).user.name },
            children: [],
            selectedChildData: null,
          },
        });
      }

      const selectedChild = childId 
        ? parent.students.find(s => s.id === childId) 
        : parent.students[0];

      if (!selectedChild) {
        throw { status: 404, message: "Child not found or not linked to this parent" };
      }

      // Fetch data for the selected child
      const recentGrades = await prisma.grade.findMany({
        where: { studentId: selectedChild.id },
        take: 5,
        orderBy: { gradedAt: "desc" },
        include: { subject: true },
      });

      const today = new Date().getDay();
      const dayOfWeek = today === 0 ? 7 : today;
      
      const todayTimetable = await prisma.timetable.findMany({
        where: {
          classId: selectedChild.classId || 0,
          dayOfWeek: dayOfWeek,
          schoolYear: selectedChild.schoolYear,
        },
        orderBy: { startTime: "asc" },
        include: { subject: true, teacher: { include: { user: true } } },
      });

      const recentAbsences = await prisma.absence.findMany({
        where: { studentId: selectedChild.id },
        take: 5,
        orderBy: { date: "desc" },
      });

      const payments = await prisma.payment.findMany({
        where: { studentId: selectedChild.id },
        orderBy: { dueDate: "desc" },
      });

      res.status(200).json({
        success: true,
        data: {
          parent: { firstName: (req as any).user.firstName, lastName: (req as any).user.name },
          children: parent.students.map(s => ({
            id: s.id,
            firstName: s.user.firstName,
            lastName: s.user.name,
            class: s.class?.name,
          })),
          selectedChildData: {
            student: {
              id: selectedChild.id,
              firstName: selectedChild.user.firstName,
              lastName: selectedChild.user.name,
              class: selectedChild.class?.name,
              schoolYear: selectedChild.schoolYear,
            },
            recentGrades,
            todayTimetable,
            recentAbsences,
            payments,
          },
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ParentDashboardController();
