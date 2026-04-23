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
router.post(
    "/grades/bulk",
    authenticate,
    authorize("ENSEIGNANT"),
    (req, res, next) => gradesController.bulkCreate(req, res, next)
);

router.get(
    "/grades/grid",
    authenticate,
    authorize("ENSEIGNANT"),
    (req, res, next) => gradesController.getGrid(req, res, next)
);

// 2. Gestion des Absences (Appel)
router.post(
    "/absences/roll-call",
    authenticate,
    authorize("ENSEIGNANT"),
    (req, res, next) => absencesController.saveRollCall(req, res, next)
);

router.get(
    "/absences",
    authenticate,
    authorize("ENSEIGNANT"),
    (req, res, next) => absencesController.getHistory(req, res, next)
);

export default router;
