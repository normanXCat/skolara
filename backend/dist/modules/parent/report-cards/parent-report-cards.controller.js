"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentReportCardsController = void 0;
const client_1 = require("../../../prisma/client");
const pdf_service_1 = __importDefault(require("../../../lib/pdf/pdf.service"));
const report_cards_service_1 = __importDefault(require("../../admin/report-cards/report-cards.service"));
const report_card_template_1 = require("../../admin/report-cards/templates/report-card.template");
class ParentReportCardsController {
    async getChildReportCards(req, res, next) {
        try {
            const parent = await client_1.prisma.parent.findUnique({
                where: { userId: req.user.id },
                include: { students: true }
            });
            if (!parent) {
                res.status(404).json({ success: false, message: "Parent introuvable" });
                return;
            }
            const studentIds = parent.students.map(s => s.id);
            const reportCards = await client_1.prisma.reportCard.findMany({
                where: { studentId: { in: studentIds } },
                include: { student: { include: { user: true, class: true } } },
                orderBy: [{ schoolYear: 'desc' }, { semester: 'desc' }]
            });
            res.status(200).json({ success: true, data: reportCards });
        }
        catch (error) {
            next(error);
        }
    }
    async downloadChildPdf(req, res, next) {
        try {
            const reportCardId = Number(req.params.id);
            const parent = await client_1.prisma.parent.findUnique({
                where: { userId: req.user.id },
                include: { students: true }
            });
            if (!parent) {
                res.status(404).json({ success: false, message: "Parent introuvable" });
                return;
            }
            const reportCard = await client_1.prisma.reportCard.findUnique({
                where: { id: reportCardId },
                include: { student: { include: { user: true } } }
            });
            if (!reportCard) {
                res.status(404).json({ success: false, message: "Bulletin introuvable" });
                return;
            }
            const isMyChild = parent.students.some(s => s.id === reportCard.studentId);
            if (!isMyChild) {
                res.status(403).json({ success: false, message: "Accès refusé" });
                return;
            }
            const data = await report_cards_service_1.default.getPreviewData(reportCard.studentId, reportCard.schoolYear, reportCard.semester);
            const html = (0, report_card_template_1.getReportCardHtml)({
                ...data,
                semester: reportCard.semester,
                schoolYear: reportCard.schoolYear,
            });
            const buffer = await pdf_service_1.default.generateFromHtml(html);
            res.setHeader("Content-Type", "application/pdf");
            res.setHeader("Content-Disposition", `attachment; filename=Bulletin_${reportCard.student.user.name}_S${reportCard.semester}.pdf`.replace(/\s+/g, '_'));
            res.status(200).send(buffer);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ParentReportCardsController = ParentReportCardsController;
exports.default = new ParentReportCardsController();
//# sourceMappingURL=parent-report-cards.controller.js.map