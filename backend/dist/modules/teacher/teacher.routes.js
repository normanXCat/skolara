"use strict";
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
router.post("/grades/bulk", authenticate_1.authenticate, (0, authenticate_1.authorize)("ENSEIGNANT"), (req, res, next) => gradesController.bulkCreate(req, res, next));
router.get("/grades/grid", authenticate_1.authenticate, (0, authenticate_1.authorize)("ENSEIGNANT"), (req, res, next) => gradesController.getGrid(req, res, next));
// 2. Gestion des Absences (Appel)
router.post("/absences/roll-call", authenticate_1.authenticate, (0, authenticate_1.authorize)("ENSEIGNANT"), (req, res, next) => absencesController.saveRollCall(req, res, next));
router.get("/absences", authenticate_1.authenticate, (0, authenticate_1.authorize)("ENSEIGNANT"), (req, res, next) => absencesController.getHistory(req, res, next));
exports.default = router;
//# sourceMappingURL=teacher.routes.js.map