"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticate_1 = require("../../middlewares/authenticate");
const stats_controller_1 = require("./stats/stats.controller");
const stats_service_1 = require("./stats/stats.service");
const students_controller_1 = require("./students/students.controller");
const students_service_1 = require("./students/students.service");
const students_repository_1 = require("./students/students.repository");
const admin_pre_registration_controller_1 = require("./pre-registration/admin-pre-registration.controller");
const admin_pre_registration_service_1 = require("./pre-registration/admin-pre-registration.service");
const classes_controller_1 = require("./classes/classes.controller");
const classes_service_1 = require("./classes/classes.service");
const classes_repository_1 = require("./classes/classes.repository");
const teachers_controller_1 = require("./teachers/teachers.controller");
const teachers_service_1 = require("./teachers/teachers.service");
const teachers_repository_1 = require("./teachers/teachers.repository");
const subjects_controller_1 = require("./subjects/subjects.controller");
const subjects_service_1 = require("./subjects/subjects.service");
const subjects_repository_1 = require("./subjects/subjects.repository");
const timetables_controller_1 = __importDefault(require("./timetables/timetables.controller"));
const report_cards_controller_1 = __importDefault(require("./report-cards/report-cards.controller"));
const grades_controller_1 = require("./grades/grades.controller");
const grades_service_1 = require("./grades/grades.service");
const grades_repository_1 = require("./grades/grades.repository");
const absences_controller_1 = require("./absences/absences.controller");
const absences_service_1 = require("./absences/absences.service");
const absences_repository_1 = require("./absences/absences.repository");
const settings_controller_1 = require("./settings/settings.controller");
const settings_service_1 = require("./settings/settings.service");
const settings_repository_1 = require("./settings/settings.repository");
const router = (0, express_1.Router)();
// Depedency Injection
const statsService = new stats_service_1.StatsService();
const statsController = new stats_controller_1.StatsController(statsService);
const studentsRepo = new students_repository_1.StudentsRepository();
const studentsService = new students_service_1.StudentsService(studentsRepo);
const studentsController = new students_controller_1.StudentsController(studentsService);
const preRegService = new admin_pre_registration_service_1.AdminPreRegistrationService();
const preRegController = new admin_pre_registration_controller_1.AdminPreRegistrationController(preRegService);
const classesRepo = new classes_repository_1.ClassesRepository();
const classesService = new classes_service_1.ClassesService(classesRepo);
const classesController = new classes_controller_1.ClassesController(classesService);
const teachersRepo = new teachers_repository_1.TeachersRepository();
const teachersService = new teachers_service_1.TeachersService(teachersRepo);
const teachersController = new teachers_controller_1.TeachersController(teachersService);
const subjectsRepo = new subjects_repository_1.SubjectsRepository();
const subjectsService = new subjects_service_1.SubjectsService(subjectsRepo);
const subjectsController = new subjects_controller_1.SubjectsController(subjectsService);
const adminGradesRepo = new grades_repository_1.AdminGradesRepository();
const adminGradesService = new grades_service_1.AdminGradesService(adminGradesRepo);
const adminGradesController = new grades_controller_1.AdminGradesController(adminGradesService);
const adminAbsencesRepo = new absences_repository_1.AdminAbsencesRepository();
const adminAbsencesService = new absences_service_1.AdminAbsencesService(adminAbsencesRepo);
const adminAbsencesController = new absences_controller_1.AdminAbsencesController(adminAbsencesService);
const settingsRepo = new settings_repository_1.SettingsRepository();
const settingsService = new settings_service_1.SettingsService(settingsRepo);
const settingsController = new settings_controller_1.SettingsController(settingsService);
// 1. Statistiques
router.get("/stats", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => statsController.getStats(req, res, next));
// 2. Gestion des élèves
router.get("/students", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => studentsController.findAll(req, res, next));
router.get("/students/export", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => studentsController.exportCSV(req, res, next));
router.post("/students", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => studentsController.create(req, res, next));
router.get("/students/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => studentsController.findById(req, res, next));
router.put("/students/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => studentsController.update(req, res, next));
router.patch("/students/:id/status", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => studentsController.updateStatus(req, res, next));
// 3. Pré-inscriptions
router.get("/pre-registrations", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => preRegController.findAll(req, res, next));
router.get("/pre-registrations/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => preRegController.findById(req, res, next));
router.patch("/pre-registrations/:id/status", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => preRegController.updateStatus(req, res, next));
router.post("/pre-registrations/:id/convert", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => preRegController.convert(req, res, next));
router.post("/pre-registrations/:id/resend-emails", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => preRegController.resendEmails(req, res, next));
// 4. Gestion des classes
router.get("/classes", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => classesController.findAll(req, res, next));
router.post("/classes", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => classesController.create(req, res, next));
router.get("/classes/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => classesController.findById(req, res, next));
router.put("/classes/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => classesController.update(req, res, next));
router.delete("/classes/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => classesController.delete(req, res, next));
// 5. Gestion des enseignants
router.get("/teachers", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => teachersController.findAll(req, res, next));
router.post("/teachers", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => teachersController.create(req, res, next));
router.get("/teachers/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => teachersController.findById(req, res, next));
router.put("/teachers/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => teachersController.update(req, res, next));
router.patch("/teachers/:id/status", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => teachersController.updateStatus(req, res, next));
router.post("/teachers/:id/assignments", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => teachersController.addAssignment(req, res, next));
router.delete("/teachers/:id/assignments", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => teachersController.removeAssignment(req, res, next));
// 6. Gestion des matières
router.get("/subjects", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => subjectsController.findAll(req, res, next));
router.get("/subjects/paginated", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => subjectsController.findPaginated(req, res, next));
router.post("/subjects", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => subjectsController.create(req, res, next));
router.put("/subjects/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => subjectsController.update(req, res, next));
router.delete("/subjects/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => subjectsController.delete(req, res, next));
// 7. Emploi du temps
router.get("/timetables", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => timetables_controller_1.default.getAll(req, res, next));
router.get("/timetables/conflicts", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => timetables_controller_1.default.getConflicts(req, res, next));
router.post("/timetables", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => timetables_controller_1.default.create(req, res, next));
router.put("/timetables/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => timetables_controller_1.default.update(req, res, next));
router.delete("/timetables/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => timetables_controller_1.default.delete(req, res, next));
// 8. Bulletins de notes
router.get("/report-cards/status/:classId", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => report_cards_controller_1.default.getByClass(req, res, next));
router.get("/report-cards/preview/:studentId", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => report_cards_controller_1.default.getPreview(req, res, next));
router.post("/report-cards/finalize", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => report_cards_controller_1.default.finalize(req, res, next));
router.post("/report-cards/generate-class", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => report_cards_controller_1.default.generateForClass(req, res, next));
router.get("/report-cards/download/:studentId", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => report_cards_controller_1.default.downloadPdf(req, res, next));
// 9. Notes (Vue admin, lecture seule)
router.get("/grades", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => adminGradesController.findAll(req, res, next));
router.get("/grades/stats", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => adminGradesController.getStats(req, res, next));
// 10. Absences (Vue admin)
router.get("/absences", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => adminAbsencesController.findAll(req, res, next));
router.get("/absences/stats", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => adminAbsencesController.getStats(req, res, next));
router.put("/absences/:id/justify", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => adminAbsencesController.justify(req, res, next));
// 11. Notifications
const notifications_controller_1 = __importDefault(require("../notifications/notifications.controller"));
router.get("/notifications", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), notifications_controller_1.default.getAll);
router.get("/notifications/unread-count", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), notifications_controller_1.default.getUnreadCount);
router.patch("/notifications/read-all", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), notifications_controller_1.default.markAllAsRead);
router.patch("/notifications/:id/read", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), notifications_controller_1.default.markAsRead);
// 12. Site Settings
router.get("/settings", (req, res, next) => settingsController.getAll(req, res, next));
router.put("/settings", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => settingsController.updateAll(req, res, next));
exports.default = router;
//# sourceMappingURL=admin.routes.js.map