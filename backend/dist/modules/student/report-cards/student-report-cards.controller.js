"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentReportCardsController = void 0;
const client_1 = require("../../../prisma/client");
const pdf_service_1 = __importDefault(require("../../../lib/pdf/pdf.service"));
const report_cards_service_1 = __importDefault(require("../../admin/report-cards/report-cards.service"));
const report_card_template_1 = require("../../admin/report-cards/templates/report-card.template");
class StudentReportCardsController {
    async getMyReportCards(req, res, next) {
        try {
            const student = await client_1.prisma.student.findUnique({
                where: { userId: req.user.id },
            });
            if (!student) {
                res.status(404).json({ success: false, message: "Élève introuvable" });
                return;
            }
            const reportCards = await client_1.prisma.reportCard.findMany({
                where: { studentId: student.id },
                orderBy: [{ schoolYear: 'desc' }, { semester: 'desc' }]
            });
            res.status(200).json({ success: true, data: reportCards });
        }
        catch (error) {
            next(error);
        }
    }
    async downloadMyPdf(req, res, next) {
        try {
            const reportCardId = Number(req.params.id);
            const student = await client_1.prisma.student.findUnique({
                where: { userId: req.user.id },
                include: { user: true }
            });
            if (!student) {
                res.status(404).json({ success: false, message: "Élève introuvable" });
                return;
            }
            const reportCard = await client_1.prisma.reportCard.findUnique({
                where: { id: reportCardId }
            });
            if (!reportCard || reportCard.studentId !== student.id) {
                res.status(403).json({ success: false, message: "Accès refusé" });
                return;
            }
            const data = await report_cards_service_1.default.getPreviewData(student.id, reportCard.schoolYear, reportCard.semester);
            const html = (0, report_card_template_1.getReportCardHtml)({
                ...data,
                semester: reportCard.semester,
                schoolYear: reportCard.schoolYear,
            });
            const buffer = await pdf_service_1.default.generateFromHtml(html);
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `attachment; filename=Bulletin_${student.user.name}_S${reportCard.semester}.pdf`.replace(/\s+/g, '_'));
            res.status(200).send(buffer);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.StudentReportCardsController = StudentReportCardsController;
exports.default = new StudentReportCardsController();
//# sourceMappingURL=student-report-cards.controller.js.map