"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const lesson_book_controller_1 = require("./lesson-book.controller");
const router = (0, express_1.Router)();
const controller = new lesson_book_controller_1.ParentLessonBookController();
/**
 * @swagger
 * /parent/lesson-book:
 *   get:
 *     tags: [Parents]
 *     summary: Obtenir le cahier de texte des enfants rattachés au parent
 *     security: [{ bearerAuth: [] }]
 */
router.get("/", controller.getChildLessonBooks.bind(controller));
exports.default = router;
//# sourceMappingURL=lesson-book.routes.js.map