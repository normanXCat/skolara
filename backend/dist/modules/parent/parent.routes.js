"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../../middlewares/authenticate");
const parent_timetable_controller_1 = __importDefault(require("./timetable/parent-timetable.controller"));
const router = (0, express_1.Router)();
// Toutes les routes parent nécessitent le rôle PARENT
router.use(authenticate_1.authenticate, (0, authenticate_1.authorize)("PARENT"));
router.get("/timetable", parent_timetable_controller_1.default.getChildTimetable);
// Dashboard
const parent_dashboard_controller_1 = __importDefault(require("./dashboard/parent-dashboard.controller"));
router.get("/dashboard", parent_dashboard_controller_1.default.getDashboardData);
// Notifications
const notifications_controller_1 = __importDefault(require("../notifications/notifications.controller"));
router.get("/notifications", notifications_controller_1.default.getAll);
router.patch("/notifications/read-all", notifications_controller_1.default.markAllAsRead);
router.patch("/notifications/:id/read", notifications_controller_1.default.markAsRead);
router.get("/notifications/unread-count", notifications_controller_1.default.getUnreadCount);
// Report Cards
const parent_report_cards_controller_1 = __importDefault(require("./report-cards/parent-report-cards.controller"));
/**
 * @swagger
 * /parent/report-cards:
 *   get:
 *     tags: [Parents]
 *     summary: Bulletins des enfants
 *     security: [{ bearerAuth: [] }]
 */
router.get("/report-cards", parent_report_cards_controller_1.default.getChildReportCards);
/**
 * @swagger
 * /parent/report-cards/{id}/download:
 *   get:
 *     tags: [Parents]
 *     summary: Télécharger le bulletin d'un enfant en PDF
 *     security: [{ bearerAuth: [] }]
 */
router.get("/report-cards/:id/download", parent_report_cards_controller_1.default.downloadChildPdf);
// Payments
const parent_payments_controller_1 = __importDefault(require("./payments/parent-payments.controller"));
/**
 * @swagger
 * /parent/payments:
 *   get:
 *     tags: [Parents]
 *     summary: Historique et stats des paiements des enfants
 *     security: [{ bearerAuth: [] }]
 */
router.get("/payments", parent_payments_controller_1.default.getChildPayments);
// Lesson Book
const lesson_book_routes_1 = __importDefault(require("./lesson-book/lesson-book.routes"));
router.use("/lesson-book", lesson_book_routes_1.default);
exports.default = router;
//# sourceMappingURL=parent.routes.js.map