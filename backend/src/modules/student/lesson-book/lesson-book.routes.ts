import { Router } from "express";
import { StudentLessonBookController } from "./lesson-book.controller";

const router = Router();
const controller = new StudentLessonBookController();

/**
 * @swagger
 * /student/lesson-book:
 *   get:
 *     tags: [Students]
 *     summary: Obtenir le cahier de texte de la classe de l'élève
 *     security: [{ bearerAuth: [] }]
 */
router.get("/", controller.getMyLessonBooks.bind(controller));

export default router;
