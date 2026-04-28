import { Router } from "express";
import { authenticate, authorize } from "../../../middlewares/authenticate";
import { TeacherLessonBookController } from "./lesson-book.controller";

const router = Router();
const controller = new TeacherLessonBookController();

router.use(authenticate);
router.use(authorize("ENSEIGNANT"));

/**
 * @swagger
 * /teacher/lesson-book:
 *   get:
 *     tags: [Teacher-LessonBook]
 *     summary: Récupérer le cahier de texte (Enseignant)
 *     security: [{ bearerAuth: [] }]
 */
router.get("/", controller.getLessonBooks.bind(controller));

/**
 * @swagger
 * /teacher/lesson-book:
 *   post:
 *     tags: [Teacher-LessonBook]
 *     summary: Ajouter une leçon au cahier de texte
 *     security: [{ bearerAuth: [] }]
 */
router.post("/", controller.createLesson.bind(controller));

/**
 * @swagger
 * /teacher/lesson-book/{id}:
 *   patch:
 *     tags: [Teacher-LessonBook]
 *     summary: Modifier une leçon
 *     security: [{ bearerAuth: [] }]
 */
router.patch("/:id", controller.updateLesson.bind(controller));

/**
 * @swagger
 * /teacher/lesson-book/{id}:
 *   delete:
 *     tags: [Teacher-LessonBook]
 *     summary: Supprimer une leçon
 *     security: [{ bearerAuth: [] }]
 */
router.delete("/:id", controller.deleteLesson.bind(controller));

export default router;
