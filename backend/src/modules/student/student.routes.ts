import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/authenticate";
import studentTimetableController from "./timetable/student-timetable.controller";

const router = Router();

// Toutes les routes élève nécessitent le rôle ELEVE
router.use(authenticate, authorize("ELEVE"));

/**
 * @swagger
 * /student/timetable:
 *   get:
 *     tags: [Students]
 *     summary: Emploi du temps de l'élève connecté
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Liste des créneaux }
 */
router.get("/timetable", studentTimetableController.getMyTimetable);

// Dashboard
import studentDashboardController from "./dashboard/student-dashboard.controller";
/**
 * @swagger
 * /student/dashboard:
 *   get:
 *     tags: [Students]
 *     summary: Données du dashboard élève
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Statistiques et annonces }
 */
router.get("/dashboard", studentDashboardController.getDashboardData);

// Grades
import studentGradesController from "./grades/student-grades.controller";
/**
 * @swagger
 * /student/grades:
 *   get:
 *     tags: [Students]
 *     summary: Liste des notes de l'élève
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Toutes les notes }
 */
router.get("/grades", studentGradesController.getMyGrades);

/**
 * @swagger
 * /student/grades/{subjectId}:
 *   get:
 *     tags: [Students]
 *     summary: Notes par matière
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Notes détaillées }
 */
router.get("/grades/:subjectId", studentGradesController.getGradesBySubject);

// Notifications
import notificationsController from "../notifications/notifications.controller";
/**
 * @swagger
 * /student/notifications:
 *   get:
 *     tags: [Notifications]
 *     summary: Liste des notifications
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Liste des notifications }
 */
router.get("/notifications", notificationsController.getAll);

/**
 * @swagger
 * /student/notifications/read-all:
 *   patch:
 *     tags: [Notifications]
 *     summary: Marquer tout comme lu
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Succès }
 */
router.patch("/notifications/read-all", notificationsController.markAllAsRead);

/**
 * @swagger
 * /student/notifications/{id}/read:
 *   patch:
 *     tags: [Notifications]
 *     summary: Marquer une notification comme lue
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Succès }
 */
router.patch("/notifications/:id/read", notificationsController.markAsRead);

/**
 * @swagger
 * /student/notifications/unread-count:
 *   get:
 *     tags: [Notifications]
 *     summary: Nombre de notifications non lues
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200: { description: Compteur }
 */
router.get("/notifications/unread-count", notificationsController.getUnreadCount);

export default router;
