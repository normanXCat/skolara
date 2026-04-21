import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/authenticate";
import { StatsController } from "./stats/stats.controller";
import { StatsService } from "./stats/stats.service";
import { StudentsController } from "./students/students.controller";
import { StudentsService } from "./students/students.service";
import { StudentsRepository } from "./students/students.repository";
import { AdminPreRegistrationController } from "./pre-registration/admin-pre-registration.controller";
import { AdminPreRegistrationService } from "./pre-registration/admin-pre-registration.service";

const router = Router();

/**
 * Routes administratives protégées.
 * Accessibles uniquement aux utilisateurs avec le rôle 'ADMIN'.
 */

// Injection des dépendances
const statsService = new StatsService();
const statsController = new StatsController(statsService);

const studentsRepo = new StudentsRepository();
const studentsService = new StudentsService(studentsRepo);
const studentsController = new StudentsController(studentsService);

const preRegService = new AdminPreRegistrationService();
const preRegController = new AdminPreRegistrationController(preRegService);

// 1. Statistiques du Tableau de bord
router.get("/stats", authenticate, authorize("ADMIN"), (req, res, next) =>
    statsController.getStats(req, res, next),
);

// 2. Gestion des élèves
router.get("/students", authenticate, authorize("ADMIN"), (req, res, next) =>
    studentsController.findAll(req, res, next),
);
router.get(
    "/students/export",
    authenticate,
    authorize("ADMIN"),
    (req, res, next) => studentsController.exportCSV(req, res, next),
);
router.post("/students", authenticate, authorize("ADMIN"), (req, res, next) =>
    studentsController.create(req, res, next),
);
router.get(
    "/students/:id",
    authenticate,
    authorize("ADMIN"),
    (req, res, next) => studentsController.findById(req, res, next),
);
router.put(
    "/students/:id",
    authenticate,
    authorize("ADMIN"),
    (req, res, next) => studentsController.update(req, res, next),
);
router.patch(
    "/students/:id/status",
    authenticate,
    authorize("ADMIN"),
    (req, res, next) => studentsController.updateStatus(req, res, next),
);

// 3. Traitement des pré-inscriptions
router.get(
    "/pre-registrations",
    authenticate,
    authorize("ADMIN"),
    (req, res, next) => preRegController.findAll(req, res, next),
);
router.get(
    "/pre-registrations/:id",
    authenticate,
    authorize("ADMIN"),
    (req, res, next) => preRegController.findById(req, res, next),
);
router.patch(
    "/pre-registrations/:id/status",
    authenticate,
    authorize("ADMIN"),
    (req, res, next) => preRegController.updateStatus(req, res, next),
);
router.post(
    "/pre-registrations/:id/convert",
    authenticate,
    authorize("ADMIN"),
    (req, res, next) => preRegController.convert(req, res, next),
);

export default router;
