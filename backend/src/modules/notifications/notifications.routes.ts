import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate";
import notificationsController from "./notifications.controller";

const router = Router();

/**
 * Routes partagées pour les notifications.
 * L'utilisateur doit être authentifié.
 */
router.use(authenticate);

router.get("/", notificationsController.getAll);
router.get("/unread-count", notificationsController.getUnreadCount);
router.patch("/read-all", notificationsController.markAllAsRead);
router.patch("/:id/read", notificationsController.markAsRead);

export default router;
