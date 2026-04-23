import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/authenticate";
import { StatsController } from "./stats/stats.controller";
import { StatsService } from "./stats/stats.service";
import { StudentsController } from "./students/students.controller";
import { StudentsService } from "./students/students.service";
import { StudentsRepository } from "./students/students.repository";
import { AdminPreRegistrationController } from "./pre-registration/admin-pre-registration.controller";
import { AdminPreRegistrationService } from "./pre-registration/admin-pre-registration.service";
import { ClassesController } from "./classes/classes.controller";
import { ClassesService } from "./classes/classes.service";
import { ClassesRepository } from "./classes/classes.repository";
import { TeachersController } from "./teachers/teachers.controller";
import { TeachersService } from "./teachers/teachers.service";
import { TeachersRepository } from "./teachers/teachers.repository";
import { SubjectsController } from "./subjects/subjects.controller";
import { SubjectsService } from "./subjects/subjects.service";
import { SubjectsRepository } from "./subjects/subjects.repository";

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

const classesRepo = new ClassesRepository();
const classesService = new ClassesService(classesRepo);
const classesController = new ClassesController(classesService);

const teachersRepo = new TeachersRepository();
const teachersService = new TeachersService(teachersRepo);
const teachersController = new TeachersController(teachersService);

const subjectsRepo = new SubjectsRepository();
const subjectsService = new SubjectsService(subjectsRepo);
const subjectsController = new SubjectsController(subjectsService);

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

router.post(
    "/pre-registrations/:id/resend-emails",
    authenticate,
    authorize("ADMIN"),
    (req, res, next) => preRegController.resendEmails(req, res, next),
);

// 4. Gestion des classes
router.get("/classes", authenticate, authorize("ADMIN"), (req, res, next) =>
    classesController.findAll(req, res, next),
);
router.post("/classes", authenticate, authorize("ADMIN"), (req, res, next) =>
    classesController.create(req, res, next),
);
router.get("/classes/:id", authenticate, authorize("ADMIN"), (req, res, next) =>
    classesController.findById(req, res, next),
);
router.put("/classes/:id", authenticate, authorize("ADMIN"), (req, res, next) =>
    classesController.update(req, res, next),
);
router.delete(
    "/classes/:id",
    authenticate,
    authorize("ADMIN"),
    (req, res, next) => classesController.delete(req, res, next),
);

// 5. Gestion des enseignants
router.get("/teachers", authenticate, authorize("ADMIN"), (req, res, next) =>
    teachersController.findAll(req, res, next),
);
router.post("/teachers", authenticate, authorize("ADMIN"), (req, res, next) =>
    teachersController.create(req, res, next),
);
router.get(
    "/teachers/:id",
    authenticate,
    authorize("ADMIN"),
    (req, res, next) => teachersController.findById(req, res, next),
);
router.put(
    "/teachers/:id",
    authenticate,
    authorize("ADMIN"),
    (req, res, next) => teachersController.update(req, res, next),
);
router.patch(
    "/teachers/:id/status",
    authenticate,
    authorize("ADMIN"),
    (req, res, next) => teachersController.updateStatus(req, res, next),
);
router.post(
    "/teachers/:id/assignments",
    authenticate,
    authorize("ADMIN"),
    (req, res, next) => teachersController.addAssignment(req, res, next),
);
router.delete(
    "/teachers/:id/assignments",
    authenticate,
    authorize("ADMIN"),
    (req, res, next) => teachersController.removeAssignment(req, res, next),
);

// 6. Gestion des matières (Subjects)
router.get("/subjects", authenticate, authorize("ADMIN"), (req, res, next) =>
    subjectsController.findAll(req, res, next),
);
router.get("/subjects/paginated", authenticate, authorize("ADMIN"), (req, res, next) =>
    subjectsController.findPaginated(req, res, next),
);
router.post("/subjects", authenticate, authorize("ADMIN"), (req, res, next) =>
    subjectsController.create(req, res, next),
);
router.put("/subjects/:id", authenticate, authorize("ADMIN"), (req, res, next) =>
    subjectsController.update(req, res, next),
);
router.delete("/subjects/:id", authenticate, authorize("ADMIN"), (req, res, next) =>
    subjectsController.delete(req, res, next),
);

export default router;

