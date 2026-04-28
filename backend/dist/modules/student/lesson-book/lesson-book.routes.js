"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lesson_book_controller_1 = require("./lesson-book.controller");
const router = (0, express_1.Router)();
const controller = new lesson_book_controller_1.StudentLessonBookController();
/**
 * @swagger
 * /student/lesson-book:
 *   get:
 *     tags: [Students]
 *     summary: Obtenir le cahier de texte de la classe de l'élève
 *     security: [{ bearerAuth: [] }]
 */
router.get("/", controller.getMyLessonBooks.bind(controller));
exports.default = router;
//# sourceMappingURL=lesson-book.routes.js.map