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
exports.default = router;
//# sourceMappingURL=admin.routes.js.map