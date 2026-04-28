import { Router } from "express";
import { AdminLessonBookController } from "./lesson-book.controller";

const router = Router();
const controller = new AdminLessonBookController();

/**
 * @swagger
 * /admin/lesson-book:
 *   get:
 *     tags: [Admin-LessonBook]
 *     summary: Obtenir tous les cahiers de texte
 *     security: [{ bearerAuth: [] }]
 */
router.get("/", controller.getAll.bind(controller));

export default router;
