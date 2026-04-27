import { Router } from "express";
import { ParentLessonBookController } from "./lesson-book.controller";

const router = Router();
const controller = new ParentLessonBookController();

/**
 * @swagger
 * /parent/lesson-book:
 *   get:
 *     tags: [Parents]
 *     summary: Obtenir le cahier de texte des enfants rattachés au parent
 *     security: [{ bearerAuth: [] }]
 */
router.get("/", controller.getChildLessonBooks.bind(controller));

export default router;
