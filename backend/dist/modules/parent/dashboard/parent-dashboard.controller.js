"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentDashboardController = void 0;
const client_1 = require("../../../prisma/client");
class ParentDashboardController {
    async getDashboardData(req, res, next) {
        try {
            const userId = req.user.userId;
            const childId = req.query.childId ? Number(req.query.childId) : undefined;
            const parent = await client_1.prisma.parent.findUnique({
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
                        parent: { firstName: req.user.firstName, lastName: req.user.name },
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
            const recentGrades = await client_1.prisma.grade.findMany({
                where: { studentId: selectedChild.id },
                take: 5,
                orderBy: { gradedAt: "desc" },
                include: { subject: true },
            });
            const today = new Date().getDay();
            const dayOfWeek = today === 0 ? 7 : today;
            const todayTimetable = await client_1.prisma.timetable.findMany({
                where: {
                    classId: selectedChild.classId || 0,
                    dayOfWeek: dayOfWeek,
                    schoolYear: selectedChild.schoolYear,
                },
                orderBy: { startTime: "asc" },
                include: { subject: true, teacher: { include: { user: true } } },
            });
            const recentAbsences = await client_1.prisma.absence.findMany({
                where: { studentId: selectedChild.id },
                take: 5,
                orderBy: { date: "desc" },
            });
            const payments = await client_1.prisma.payment.findMany({
                where: { studentId: selectedChild.id },
                orderBy: { dueDate: "desc" },
            });
            res.status(200).json({
                success: true,
                data: {
                    parent: { firstName: req.user.firstName, lastName: req.user.name },
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
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ParentDashboardController = ParentDashboardController;
exports.default = new ParentDashboardController();
//# sourceMappingURL=parent-dashboard.controller.js.map