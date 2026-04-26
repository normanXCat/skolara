"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../../middlewares/authenticate");
const student_timetable_controller_1 = __importDefault(require("./timetable/student-timetable.controller"));
const router = (0, express_1.Router)();
// Toutes les routes élève nécessitent le rôle ELEVE
router.use(authenticate_1.authenticate, (0, authenticate_1.authorize)("ELEVE"));
router.get("/timetable", student_timetable_controller_1.default.getMyTimetable);
// Dashboard
const student_dashboard_controller_1 = __importDefault(require("./dashboard/student-dashboard.controller"));
router.get("/dashboard", student_dashboard_controller_1.default.getDashboardData);
// Grades
const student_grades_controller_1 = __importDefault(require("./grades/student-grades.controller"));
router.get("/grades", student_grades_controller_1.default.getMyGrades);
router.get("/grades/:subjectId", student_grades_controller_1.default.getGradesBySubject);
// Notifications
const notifications_controller_1 = __importDefault(require("../notifications/notifications.controller"));
router.get("/notifications", notifications_controller_1.default.getAll);
router.patch("/notifications/read-all", notifications_controller_1.default.markAllAsRead);
router.patch("/notifications/:id/read", notifications_controller_1.default.markAsRead);
router.get("/notifications/unread-count", notifications_controller_1.default.getUnreadCount);
exports.default = router;
//# sourceMappingURL=student.routes.js.map