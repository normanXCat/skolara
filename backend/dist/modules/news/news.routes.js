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
// Public routes
router.get("/public", (req, res, next) => newsController.findPublic(req, res, next));
router.get("/public/:id", (req, res, next) => newsController.findById(req, res, next));
// Admin routes
router.get("/admin", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => newsController.findAll(req, res, next));
router.post("/admin", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => newsController.create(req, res, next));
router.get("/admin/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => newsController.findById(req, res, next));
router.put("/admin/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => newsController.update(req, res, next));
router.patch("/admin/:id/status", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => newsController.updateStatus(req, res, next));
router.delete("/admin/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => newsController.delete(req, res, next));
exports.default = router;
//# sourceMappingURL=news.routes.js.map