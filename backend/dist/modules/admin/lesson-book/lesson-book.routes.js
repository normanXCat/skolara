"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lesson_book_controller_1 = require("./lesson-book.controller");
const router = (0, express_1.Router)();
const controller = new lesson_book_controller_1.AdminLessonBookController();
/**
 * @swagger
 * /admin/lesson-book:
 *   get:
 *     tags: [Admin-LessonBook]
 *     summary: Obtenir tous les cahiers de texte
 *     security: [{ bearerAuth: [] }]
 */
router.get("/", controller.getAll.bind(controller));
exports.default = router;
//# sourceMappingURL=lesson-book.routes.js.map