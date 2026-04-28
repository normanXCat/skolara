"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../../../middlewares/authenticate");
const lesson_book_controller_1 = require("./lesson-book.controller");
const router = (0, express_1.Router)();
const controller = new lesson_book_controller_1.TeacherLessonBookController();
router.use(authenticate_1.authenticate);
router.use((0, authenticate_1.authorize)("ENSEIGNANT"));
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
exports.default = router;
//# sourceMappingURL=lesson-book.routes.js.map