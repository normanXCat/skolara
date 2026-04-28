import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/authenticate";
import parentTimetableController from "./timetable/parent-timetable.controller";

const router = Router();

// Toutes les routes parent nécessitent le rôle PARENT
router.use(authenticate, authorize("PARENT"));

router.get("/timetable", parentTimetableController.getChildTimetable);

// Dashboard
import parentDashboardController from "./dashboard/parent-dashboard.controller";
router.get("/dashboard", parentDashboardController.getDashboardData);

// Notifications
import notificationsController from "../notifications/notifications.controller";
router.get("/notifications", notificationsController.getAll);
router.patch("/notifications/read-all", notificationsController.markAllAsRead);
router.patch("/notifications/:id/read", notificationsController.markAsRead);
router.get("/notifications/unread-count", notificationsController.getUnreadCount);

// Report Cards
import parentReportCardsController from "./report-cards/parent-report-cards.controller";
/**
 * @swagger
 * /parent/report-cards:
 *   get:
 *     tags: [Parents]
 *     summary: Bulletins des enfants
 *     security: [{ bearerAuth: [] }]
 */
router.get("/report-cards", parentReportCardsController.getChildReportCards);

/**
 * @swagger
 * /parent/report-cards/{id}/download:
 *   get:
 *     tags: [Parents]
 *     summary: Télécharger le bulletin d'un enfant en PDF
 *     security: [{ bearerAuth: [] }]
 */
router.get("/report-cards/:id/download", parentReportCardsController.downloadChildPdf);

// Payments
import parentPaymentsController from "./payments/parent-payments.controller";
/**
 * @swagger
 * /parent/payments:
 *   get:
 *     tags: [Parents]
 *     summary: Historique et stats des paiements des enfants
 *     security: [{ bearerAuth: [] }]
 */
router.get("/payments", parentPaymentsController.getChildPayments);

// Lesson Book
import parentLessonBookRoutes from "./lesson-book/lesson-book.routes";
router.use("/lesson-book", parentLessonBookRoutes);

export default router;
