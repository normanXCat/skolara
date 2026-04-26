"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../../middlewares/authenticate");
const grades_controller_1 = require("./grades/grades.controller");
const grades_service_1 = require("./grades/grades.service");
const grades_repository_1 = require("./grades/grades.repository");
const absences_controller_1 = require("./absences/absences.controller");
const absences_service_1 = require("./absences/absences.service");
const absences_repository_1 = require("./absences/absences.repository");
const router = (0, express_1.Router)();
/**
 * Routes pour le module Enseignant.
 * Accessibles aux utilisateurs avec le rôle 'ENSEIGNANT'.
 */
// Injection des dépendances
const gradesRepo = new grades_repository_1.GradesRepository();
const gradesService = new grades_service_1.GradesService(gradesRepo);
const gradesController = new grades_controller_1.GradesController(gradesService);
const absencesRepo = new absences_repository_1.AbsencesRepository();
const absencesService = new absences_service_1.AbsencesService(absencesRepo);
const absencesController = new absences_controller_1.AbsencesController(absencesService);
// 1. Gestion des Notes
router.get("/grades", authenticate_1.authenticate, (0, authenticate_1.authorize)("ENSEIGNANT"), (req, res, next) => gradesController.getAssignments(req, res, next));
router.get("/grades/:classId/:subjectId", authenticate_1.authenticate, (0, authenticate_1.authorize)("ENSEIGNANT"), (req, res, next) => gradesController.getGrid(req, res, next));
router.post("/grades/:classId/:subjectId", authenticate_1.authenticate, (0, authenticate_1.authorize)("ENSEIGNANT"), (req, res, next) => gradesController.bulkSave(req, res, next));
router.put("/grades/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ENSEIGNANT"), (req, res, next) => gradesController.updateGrade(req, res, next));
router.delete("/grades/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ENSEIGNANT"), (req, res, next) => gradesController.deleteGrade(req, res, next));
router.get("/grades/:classId/:subjectId/stats", authenticate_1.authenticate, (0, authenticate_1.authorize)("ENSEIGNANT"), (req, res, next) => gradesController.getStats(req, res, next));
// 2. Gestion des Absences (Appel)
router.post("/absences/:classId/roll-call", authenticate_1.authenticate, (0, authenticate_1.authorize)("ENSEIGNANT"), (req, res, next) => absencesController.saveRollCall(req, res, next));
router.get("/absences/:classId/roll-call", authenticate_1.authenticate, (0, authenticate_1.authorize)("ENSEIGNANT"), (req, res, next) => absencesController.getRollCall(req, res, next));
router.get("/absences/:classId/students", authenticate_1.authenticate, (0, authenticate_1.authorize)("ENSEIGNANT"), (req, res, next) => absencesController.getClassStudents(req, res, next));
router.put("/absences/:id/justify", authenticate_1.authenticate, (0, authenticate_1.authorize)("ENSEIGNANT"), (req, res, next) => absencesController.justifyAbsence(req, res, next));
router.get("/absences", authenticate_1.authenticate, (0, authenticate_1.authorize)("ENSEIGNANT"), (req, res, next) => absencesController.getHistory(req, res, next));
// 3. Emploi du temps
const teacher_timetable_controller_1 = __importDefault(require("./timetable/teacher-timetable.controller"));
router.get("/timetable", authenticate_1.authenticate, (0, authenticate_1.authorize)("ENSEIGNANT"), (req, res, next) => teacher_timetable_controller_1.default.getMyTimetable(req, res, next));
// 4. Notifications
const notifications_controller_1 = __importDefault(require("../notifications/notifications.controller"));
router.get("/notifications", authenticate_1.authenticate, (0, authenticate_1.authorize)("ENSEIGNANT"), notifications_controller_1.default.getAll);
router.get("/notifications/unread-count", authenticate_1.authenticate, (0, authenticate_1.authorize)("ENSEIGNANT"), notifications_controller_1.default.getUnreadCount);
router.patch("/notifications/read-all", authenticate_1.authenticate, (0, authenticate_1.authorize)("ENSEIGNANT"), notifications_controller_1.default.markAllAsRead);
router.patch("/notifications/:id/read", authenticate_1.authenticate, (0, authenticate_1.authorize)("ENSEIGNANT"), notifications_controller_1.default.markAsRead);
exports.default = router;
//# sourceMappingURL=teacher.routes.js.map