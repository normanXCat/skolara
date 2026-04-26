"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportCardsService = void 0;
const client_1 = require("../../../prisma/client");
const generate_1 = require("../../../lib/report-cards/generate");
class ReportCardsService {
    async getStatusByClass(classId, schoolYear, semester) {
        const students = await client_1.prisma.student.findMany({
            where: { classId },
            include: {
                user: { select: { firstName: true, name: true } },
                reportCards: {
                    where: { schoolYear, semester },
                },
            },
        });
        const schoolClass = await client_1.prisma.class.findUnique({
            where: { id: classId },
        });
        return {
            class: schoolClass,
            students: students.map((s) => ({
                id: s.id,
                firstName: s.user.firstName,
                lastName: s.user.name,
                reportCards: s.reportCards,
            })),
        };
    }
    async getPreviewData(studentId, schoolYear, semester) {
        const student = await client_1.prisma.student.findUnique({
            where: { id: studentId },
            include: {
                user: { select: { firstName: true, name: true } },
                class: true,
            },
        });
        if (!student)
            throw { status: 404, message: "Étudiant non trouvé" };
        // Fetch existing report card if any
        const existingReportCard = await client_1.prisma.reportCard.findFirst({
            where: { studentId, schoolYear, semester },
        });
        // Calculate preview data using the lib generator (without saving)
        const preview = await (0, generate_1.generateReportCard)(studentId, schoolYear, semester, false);
        return {
            student: {
                id: student.id,
                firstName: student.user.firstName,
                lastName: student.user.name,
                user: student.user,
            },
            class: student.class,
            reportCard: existingReportCard,
            ...preview,
        };
    }
    async finalize(studentId, schoolYear, semester, generalAppreciation) {
        // Generate and save
        const reportCard = await (0, generate_1.generateReportCard)(studentId, schoolYear, semester, true);
        if (reportCard.id) {
            // Update appreciation — use the correct schema field name
            await client_1.prisma.reportCard.update({
                where: { id: reportCard.id },
                data: { generalAppreciation },
            });
        }
        return reportCard;
    }
}
exports.ReportCardsService = ReportCardsService;
exports.default = new ReportCardsService();
//# sourceMappingURL=report-cards.service.js.map