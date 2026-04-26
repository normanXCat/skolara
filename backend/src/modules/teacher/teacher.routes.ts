import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/authenticate";
import { GradesController } from "./grades/grades.controller";
import { GradesService } from "./grades/grades.service";
import { GradesRepository } from "./grades/grades.repository";
import { AbsencesController } from "./absences/absences.controller";
import { AbsencesService } from "./absences/absences.service";
import { AbsencesRepository } from "./absences/absences.repository";

const router = Router();

/**
 * Routes pour le module Enseignant.
 * Accessibles aux utilisateurs avec le rôle 'ENSEIGNANT'.
 */

// Injection des dépendances
const gradesRepo = new GradesRepository();
const gradesService = new GradesService(gradesRepo);
const gradesController = new GradesController(gradesService);

const absencesRepo = new AbsencesRepository();
const absencesService = new AbsencesService(absencesRepo);
const absencesController = new AbsencesController(absencesService);

// 1. Gestion des Notes
router.get(
    "/grades",
    authenticate,
    authorize("ENSEIGNANT"),
    (req, res, next) => gradesController.getAssignments(req, res, next)
);

router.get(
    "/grades/:classId/:subjectId",
    authenticate,
    authorize("ENSEIGNANT"),
    (req, res, next) => gradesController.getGrid(req, res, next)
);

router.post(
    "/grades/:classId/:subjectId",
    authenticate,
    authorize("ENSEIGNANT"),
    (req, res, next) => gradesController.bulkSave(req, res, next)
);

router.put(
    "/grades/:id",
    authenticate,
    authorize("ENSEIGNANT"),
    (req, res, next) => gradesController.updateGrade(req, res, next)
);

router.delete(
    "/grades/:id",
    authenticate,
    authorize("ENSEIGNANT"),
    (req, res, next) => gradesController.deleteGrade(req, res, next)
);

router.get(
    "/grades/:classId/:subjectId/stats",
    authenticate,
    authorize("ENSEIGNANT"),
    (req, res, next) => gradesController.getStats(req, res, next)
);

// 2. Gestion des Absences (Appel)
router.post(
    "/absences/:classId/roll-call",
    authenticate,
    authorize("ENSEIGNANT"),
    (req, res, next) => absencesController.saveRollCall(req, res, next)
);

router.get(
    "/absences/:classId/roll-call",
    authenticate,
    authorize("ENSEIGNANT"),
    (req, res, next) => absencesController.getRollCall(req, res, next)
);

router.get(
    "/absences/:classId/students",
    authenticate,
    authorize("ENSEIGNANT"),
    (req, res, next) => absencesController.getClassStudents(req, res, next)
);

router.put(
    "/absences/:id/justify",
    authenticate,
    authorize("ENSEIGNANT"),
    (req, res, next) => absencesController.justifyAbsence(req, res, next)
);

router.get(
    "/absences",
    authenticate,
    authorize("ENSEIGNANT"),
    (req, res, next) => absencesController.getHistory(req, res, next)
);

// 3. Emploi du temps
import teacherTimetableController from "./timetable/teacher-timetable.controller";

router.get(
    "/timetable",
    authenticate,
    authorize("ENSEIGNANT"),
    (req, res, next) => teacherTimetableController.getMyTimetable(req, res, next)
);

// 4. Notifications
import notificationsController from "../notifications/notifications.controller";
router.get("/notifications", authenticate, authorize("ENSEIGNANT"), notificationsController.getAll);
router.get("/notifications/unread-count", authenticate, authorize("ENSEIGNANT"), notificationsController.getUnreadCount);
router.patch("/notifications/read-all", authenticate, authorize("ENSEIGNANT"), notificationsController.markAllAsRead);
router.patch("/notifications/:id/read", authenticate, authorize("ENSEIGNANT"), notificationsController.markAsRead);

export default router;
