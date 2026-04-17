import { Router } from "express";
import gradeController from "./grade.controller";

const router = Router();

/**
 * @route GET /api/grades
 * @desc Récupérer tous les grades
 * @access Public
 */
router.get("/", gradeController.getAll);

export default router;
