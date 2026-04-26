import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/authenticate";
import parentTimetableController from "./timetable/parent-timetable.controller";

const router = Router();

// Toutes les routes parent nécessitent le rôle PARENT
router.use(authenticate, authorize("PARENT"));

router.get("/timetable", parentTimetableController.getChildTimetable);

// Dashboard
import parentDashboardController from "./dashboard/parent-dashboard.controller";
router.get("/dashboard", parentDashboardController.getDashboardData);

// Notifications
import notificationsController from "../notifications/notifications.controller";
router.get("/notifications", notificationsController.getAll);
router.patch("/notifications/read-all", notificationsController.markAllAsRead);
router.patch("/notifications/:id/read", notificationsController.markAsRead);
router.get("/notifications/unread-count", notificationsController.getUnreadCount);

export default router;
