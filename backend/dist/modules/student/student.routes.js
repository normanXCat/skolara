"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../../middlewares/authenticate");
const student_timetable_controller_1 = __importDefault(require("./timetable/student-timetable.controller"));
const router = (0, express_1.Router)();
// Toutes les routes élève nécessitent le rôle ELEVE
router.use(authenticate_1.authenticate, (0, authenticate_1.authorize)("ELEVE"));
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
router.get("/timetable", student_timetable_controller_1.default.getMyTimetable);
// Dashboard
const student_dashboard_controller_1 = __importDefault(require("./dashboard/student-dashboard.controller"));
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
router.get("/dashboard", student_dashboard_controller_1.default.getDashboardData);
// Grades
const student_grades_controller_1 = __importDefault(require("./grades/student-grades.controller"));
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
router.get("/grades", student_grades_controller_1.default.getMyGrades);
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
router.get("/grades/:subjectId", student_grades_controller_1.default.getGradesBySubject);
// Notifications
const notifications_controller_1 = __importDefault(require("../notifications/notifications.controller"));
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
router.get("/notifications", notifications_controller_1.default.getAll);
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
router.patch("/notifications/read-all", notifications_controller_1.default.markAllAsRead);
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
router.patch("/notifications/:id/read", notifications_controller_1.default.markAsRead);
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
router.get("/notifications/unread-count", notifications_controller_1.default.getUnreadCount);
exports.default = router;
//# sourceMappingURL=student.routes.js.map