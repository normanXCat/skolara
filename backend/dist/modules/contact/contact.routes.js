"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contact_controller_1 = require("./contact.controller");
const contact_service_1 = require("./contact.service");
const contact_repository_1 = require("./contact.repository");
const authenticate_1 = require("../../middlewares/authenticate");
const router = (0, express_1.Router)();
const contactRepo = new contact_repository_1.ContactRepository();
const contactService = new contact_service_1.ContactService(contactRepo);
const contactController = new contact_controller_1.ContactController(contactService);
// Public routes
router.post("/public", (req, res, next) => contactController.submitForm(req, res, next));
// Admin routes
router.get("/admin", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => contactController.findAll(req, res, next));
router.get("/admin/unread-count", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => contactController.getUnreadCount(req, res, next));
router.get("/admin/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => contactController.findById(req, res, next));
router.patch("/admin/:id/read", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => contactController.markAsRead(req, res, next));
router.post("/admin/:id/reply", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => contactController.reply(req, res, next));
router.delete("/admin/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => contactController.delete(req, res, next));
exports.default = router;
//# sourceMappingURL=contact.routes.js.map