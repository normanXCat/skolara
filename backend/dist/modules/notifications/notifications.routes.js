"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../../middlewares/authenticate");
const notifications_controller_1 = __importDefault(require("./notifications.controller"));
const router = (0, express_1.Router)();
/**
 * Routes partagées pour les notifications.
 * L'utilisateur doit être authentifié.
 */
router.use(authenticate_1.authenticate);
router.get("/", notifications_controller_1.default.getAll);
router.get("/unread-count", notifications_controller_1.default.getUnreadCount);
router.patch("/read-all", notifications_controller_1.default.markAllAsRead);
router.patch("/:id/read", notifications_controller_1.default.markAsRead);
exports.default = router;
//# sourceMappingURL=notifications.routes.js.map