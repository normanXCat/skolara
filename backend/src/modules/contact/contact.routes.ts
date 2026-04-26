import { Router } from "express";
import { ContactController } from "./contact.controller";
import { ContactService } from "./contact.service";
import { ContactRepository } from "./contact.repository";
import { authenticate, authorize } from "../../middlewares/authenticate";

const router = Router();
const contactRepo = new ContactRepository();
const contactService = new ContactService(contactRepo);
const contactController = new ContactController(contactService);

// Public routes
router.post("/public", (req, res, next) => contactController.submitForm(req, res, next));

// Admin routes
router.get("/admin", authenticate, authorize("ADMIN"), (req, res, next) => contactController.findAll(req, res, next));
router.get("/admin/unread-count", authenticate, authorize("ADMIN"), (req, res, next) => contactController.getUnreadCount(req, res, next));
router.get("/admin/:id", authenticate, authorize("ADMIN"), (req, res, next) => contactController.findById(req, res, next));
router.patch("/admin/:id/read", authenticate, authorize("ADMIN"), (req, res, next) => contactController.markAsRead(req, res, next));
router.post("/admin/:id/reply", authenticate, authorize("ADMIN"), (req, res, next) => contactController.reply(req, res, next));
router.delete("/admin/:id", authenticate, authorize("ADMIN"), (req, res, next) => contactController.delete(req, res, next));

export default router;
