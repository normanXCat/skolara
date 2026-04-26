import { Router } from "express";
import { NewsController } from "./news.controller";
import { NewsService } from "./news.service";
import { NewsRepository } from "./news.repository";
import { authenticate, authorize } from "../../middlewares/authenticate";

const router = Router();
const newsRepo = new NewsRepository();
const newsService = new NewsService(newsRepo);
const newsController = new NewsController(newsService);

// Public routes
router.get("/public", (req, res, next) => newsController.findPublic(req, res, next));
router.get("/public/:id", (req, res, next) => newsController.findById(req, res, next));

// Admin routes
router.get("/admin", authenticate, authorize("ADMIN"), (req, res, next) => newsController.findAll(req, res, next));
router.post("/admin", authenticate, authorize("ADMIN"), (req, res, next) => newsController.create(req, res, next));
router.get("/admin/:id", authenticate, authorize("ADMIN"), (req, res, next) => newsController.findById(req, res, next));
router.put("/admin/:id", authenticate, authorize("ADMIN"), (req, res, next) => newsController.update(req, res, next));
router.patch("/admin/:id/status", authenticate, authorize("ADMIN"), (req, res, next) => newsController.updateStatus(req, res, next));
router.delete("/admin/:id", authenticate, authorize("ADMIN"), (req, res, next) => newsController.delete(req, res, next));

export default router;
