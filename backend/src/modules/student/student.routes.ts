import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/authenticate";
import studentTimetableController from "./timetable/student-timetable.controller";

const router = Router();

// Toutes les routes élève nécessitent le rôle ELEVE
router.use(authenticate, authorize("ELEVE"));

router.get("/timetable", studentTimetableController.getMyTimetable);

// Dashboard
import studentDashboardController from "./dashboard/student-dashboard.controller";
router.get("/dashboard", studentDashboardController.getDashboardData);

// Grades
import studentGradesController from "./grades/student-grades.controller";
router.get("/grades", studentGradesController.getMyGrades);
router.get("/grades/:subjectId", studentGradesController.getGradesBySubject);

// Notifications
import notificationsController from "../notifications/notifications.controller";
router.get("/notifications", notificationsController.getAll);
router.patch("/notifications/read-all", notificationsController.markAllAsRead);
router.patch("/notifications/:id/read", notificationsController.markAsRead);
router.get("/notifications/unread-count", notificationsController.getUnreadCount);

export default router;
