"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../../middlewares/authenticate");
const stats_controller_1 = require("./stats/stats.controller");
const stats_service_1 = require("./stats/stats.service");
const students_controller_1 = require("./students/students.controller");
const students_service_1 = require("./students/students.service");
const students_repository_1 = require("./students/students.repository");
const admin_pre_registration_controller_1 = require("./pre-registration/admin-pre-registration.controller");
const admin_pre_registration_service_1 = require("./pre-registration/admin-pre-registration.service");
const classes_controller_1 = require("./classes/classes.controller");
const classes_service_1 = require("./classes/classes.service");
const classes_repository_1 = require("./classes/classes.repository");
const teachers_controller_1 = require("./teachers/teachers.controller");
const teachers_service_1 = require("./teachers/teachers.service");
const teachers_repository_1 = require("./teachers/teachers.repository");
const subjects_controller_1 = require("./subjects/subjects.controller");
const subjects_service_1 = require("./subjects/subjects.service");
const subjects_repository_1 = require("./subjects/subjects.repository");
const router = (0, express_1.Router)();
/**
 * Routes administratives protégées.
 * Accessibles uniquement aux utilisateurs avec le rôle 'ADMIN'.
 */
// Injection des dépendances
const statsService = new stats_service_1.StatsService();
const statsController = new stats_controller_1.StatsController(statsService);
const studentsRepo = new students_repository_1.StudentsRepository();
const studentsService = new students_service_1.StudentsService(studentsRepo);
const studentsController = new students_controller_1.StudentsController(studentsService);
const preRegService = new admin_pre_registration_service_1.AdminPreRegistrationService();
const preRegController = new admin_pre_registration_controller_1.AdminPreRegistrationController(preRegService);
const classesRepo = new classes_repository_1.ClassesRepository();
const classesService = new classes_service_1.ClassesService(classesRepo);
const classesController = new classes_controller_1.ClassesController(classesService);
const teachersRepo = new teachers_repository_1.TeachersRepository();
const teachersService = new teachers_service_1.TeachersService(teachersRepo);
const teachersController = new teachers_controller_1.TeachersController(teachersService);
const subjectsRepo = new subjects_repository_1.SubjectsRepository();
const subjectsService = new subjects_service_1.SubjectsService(subjectsRepo);
const subjectsController = new subjects_controller_1.SubjectsController(subjectsService);
// 1. Statistiques du Tableau de bord
router.get("/stats", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => statsController.getStats(req, res, next));
// 2. Gestion des élèves
router.get("/students", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => studentsController.findAll(req, res, next));
router.get("/students/export", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => studentsController.exportCSV(req, res, next));
router.post("/students", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => studentsController.create(req, res, next));
router.get("/students/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => studentsController.findById(req, res, next));
router.put("/students/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => studentsController.update(req, res, next));
router.patch("/students/:id/status", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => studentsController.updateStatus(req, res, next));
// 3. Traitement des pré-inscriptions
router.get("/pre-registrations", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => preRegController.findAll(req, res, next));
router.get("/pre-registrations/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => preRegController.findById(req, res, next));
router.patch("/pre-registrations/:id/status", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => preRegController.updateStatus(req, res, next));
router.post("/pre-registrations/:id/convert", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => preRegController.convert(req, res, next));
router.post("/pre-registrations/:id/resend-emails", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => preRegController.resendEmails(req, res, next));
// 4. Gestion des classes
router.get("/classes", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => classesController.findAll(req, res, next));
router.post("/classes", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => classesController.create(req, res, next));
router.get("/classes/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => classesController.findById(req, res, next));
router.put("/classes/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => classesController.update(req, res, next));
router.delete("/classes/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => classesController.delete(req, res, next));
// 5. Gestion des enseignants
router.get("/teachers", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => teachersController.findAll(req, res, next));
router.post("/teachers", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => teachersController.create(req, res, next));
router.get("/teachers/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => teachersController.findById(req, res, next));
router.put("/teachers/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => teachersController.update(req, res, next));
router.patch("/teachers/:id/status", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => teachersController.updateStatus(req, res, next));
router.post("/teachers/:id/assignments", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => teachersController.addAssignment(req, res, next));
router.delete("/teachers/:id/assignments", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => teachersController.removeAssignment(req, res, next));
// 6. Gestion des matières (Subjects)
router.get("/subjects", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => subjectsController.findAll(req, res, next));
router.get("/subjects/paginated", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => subjectsController.findPaginated(req, res, next));
router.post("/subjects", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => subjectsController.create(req, res, next));
router.put("/subjects/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => subjectsController.update(req, res, next));
router.delete("/subjects/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => subjectsController.delete(req, res, next));
exports.default = router;
//# sourceMappingURL=admin.routes.js.map