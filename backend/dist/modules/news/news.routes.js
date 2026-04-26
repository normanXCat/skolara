"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const news_controller_1 = require("./news.controller");
const news_service_1 = require("./news.service");
const news_repository_1 = require("./news.repository");
const authenticate_1 = require("../../middlewares/authenticate");
const router = (0, express_1.Router)();
const newsRepo = new news_repository_1.NewsRepository();
const newsService = new news_service_1.NewsService(newsRepo);
const newsController = new news_controller_1.NewsController(newsService);
/**
 * @swagger
 * /news/public:
 *   get:
 *     tags: [News]
 *     summary: Lister les articles publiés (Public)
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 9 }
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *     responses:
 *       200: { description: Liste des articles }
 */
router.get("/public", (req, res, next) => newsController.findPublic(req, res, next));
/**
 * @swagger
 * /news/public/{id}:
 *   get:
 *     tags: [News]
 *     summary: Détail d'un article (Public)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Détail de l'article }
 *       404: { description: Article non trouvé }
 */
router.get("/public/:id", (req, res, next) => newsController.findById(req, res, next));
// Admin routes
/**
 * @swagger
 * /news/admin:
 *   get:
 *     tags: [News]
 *     summary: Lister tous les articles (Admin)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [DRAFT, PUBLISHED, ARCHIVED] }
 *     responses:
 *       200: { description: Liste des articles }
 */
router.get("/admin", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => newsController.findAll(req, res, next));
/**
 * @swagger
 * /news/admin:
 *   post:
 *     tags: [News]
 *     summary: Créer un article (Admin)
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, content]
 *             properties:
 *               title: { type: string }
 *               content: { type: string }
 *               imageUrl: { type: string }
 *               category: { type: string }
 *               status: { type: string, enum: [DRAFT, PUBLISHED] }
 *     responses:
 *       201: { description: Article créé }
 */
router.post("/admin", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => newsController.create(req, res, next));
/**
 * @swagger
 * /news/admin/{id}:
 *   get:
 *     tags: [News]
 *     summary: Détail d'un article (Admin)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Détail de l'article }
 */
router.get("/admin/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => newsController.findById(req, res, next));
/**
 * @swagger
 * /news/admin/{id}:
 *   put:
 *     tags: [News]
 *     summary: Modifier un article (Admin)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Article modifié }
 */
router.put("/admin/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => newsController.update(req, res, next));
/**
 * @swagger
 * /news/admin/{id}/status:
 *   patch:
 *     tags: [News]
 *     summary: Changer le statut d'un article (Admin)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Statut mis à jour }
 */
router.patch("/admin/:id/status", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => newsController.updateStatus(req, res, next));
/**
 * @swagger
 * /news/admin/{id}:
 *   delete:
 *     tags: [News]
 *     summary: Supprimer un article (Admin)
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Article supprimé }
 */
router.delete("/admin/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => newsController.delete(req, res, next));
exports.default = router;
//# sourceMappingURL=news.routes.js.map