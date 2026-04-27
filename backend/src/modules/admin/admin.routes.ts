import { Router } from "express";
import { authenticate, authorize } from "../../middlewares/authenticate";
import { StatsController } from "./stats/stats.controller";
import { StatsService } from "./stats/stats.service";
import { StudentsController } from "./students/students.controller";
import { StudentsService } from "./students/students.service";
import { StudentsRepository } from "./students/students.repository";
import { AdminPreRegistrationController } from "./pre-registration/admin-pre-registration.controller";
import { AdminPreRegistrationService } from "./pre-registration/admin-pre-registration.service";
import { ClassesController } from "./classes/classes.controller";
import { ClassesService } from "./classes/classes.service";
import { ClassesRepository } from "./classes/classes.repository";
import { TeachersController } from "./teachers/teachers.controller";
import { TeachersService } from "./teachers/teachers.service";
import { TeachersRepository } from "./teachers/teachers.repository";
import { SubjectsController } from "./subjects/subjects.controller";
import { SubjectsService } from "./subjects/subjects.service";
import { SubjectsRepository } from "./subjects/subjects.repository";
import timetablesController from "./timetables/timetables.controller";
import reportCardsController from "./report-cards/report-cards.controller";
import { AdminGradesController } from "./grades/grades.controller";
import { AdminGradesService } from "./grades/grades.service";
import { AdminGradesRepository } from "./grades/grades.repository";
import { AdminAbsencesController } from "./absences/absences.controller";
import { AdminAbsencesService } from "./absences/absences.service";
import { AdminAbsencesRepository } from "./absences/absences.repository";
import { SettingsController } from "./settings/settings.controller";
import { SettingsService } from "./settings/settings.service";
import { SettingsRepository } from "./settings/settings.repository";
import { PaymentsController } from "./payments/payments.controller";

const router = Router();
const paymentsController = new PaymentsController();

// Depedency Injection
const statsService = new StatsService();
const statsController = new StatsController(statsService);

const studentsRepo = new StudentsRepository();
const studentsService = new StudentsService(studentsRepo);
const studentsController = new StudentsController(studentsService);

const preRegService = new AdminPreRegistrationService();
const preRegController = new AdminPreRegistrationController(preRegService);

const classesRepo = new ClassesRepository();
const classesService = new ClassesService(classesRepo);
const classesController = new ClassesController(classesService);

const teachersRepo = new TeachersRepository();
const teachersService = new TeachersService(teachersRepo);
const teachersController = new TeachersController(teachersService);

const subjectsRepo = new SubjectsRepository();
const subjectsService = new SubjectsService(subjectsRepo);
const subjectsController = new SubjectsController(subjectsService);

const adminGradesRepo = new AdminGradesRepository();
const adminGradesService = new AdminGradesService(adminGradesRepo);
const adminGradesController = new AdminGradesController(adminGradesService);

const adminAbsencesRepo = new AdminAbsencesRepository();
const adminAbsencesService = new AdminAbsencesService(adminAbsencesRepo);
const adminAbsencesController = new AdminAbsencesController(adminAbsencesService);

const settingsRepo = new SettingsRepository();
const settingsService = new SettingsService(settingsRepo);
const settingsController = new SettingsController(settingsService);

// 1. Statistiques
router.get("/stats", authenticate, authorize("ADMIN"), (req, res, next) => statsController.getStats(req, res, next));

// 2. Gestion des élèves
router.get("/students", authenticate, authorize("ADMIN"), (req, res, next) => studentsController.findAll(req, res, next));
router.get("/students/export", authenticate, authorize("ADMIN"), (req, res, next) => studentsController.exportCSV(req, res, next));
router.post("/students", authenticate, authorize("ADMIN"), (req, res, next) => studentsController.create(req, res, next));
router.get("/students/:id", authenticate, authorize("ADMIN"), (req, res, next) => studentsController.findById(req, res, next));
router.put("/students/:id", authenticate, authorize("ADMIN"), (req, res, next) => studentsController.update(req, res, next));
router.patch("/students/:id/status", authenticate, authorize("ADMIN"), (req, res, next) => studentsController.updateStatus(req, res, next));

// 3. Pré-inscriptions
router.get("/pre-registrations", authenticate, authorize("ADMIN"), (req, res, next) => preRegController.findAll(req, res, next));
router.get("/pre-registrations/:id", authenticate, authorize("ADMIN"), (req, res, next) => preRegController.findById(req, res, next));
router.patch("/pre-registrations/:id/status", authenticate, authorize("ADMIN"), (req, res, next) => preRegController.updateStatus(req, res, next));
router.post("/pre-registrations/:id/convert", authenticate, authorize("ADMIN"), (req, res, next) => preRegController.convert(req, res, next));
router.post("/pre-registrations/:id/resend-emails", authenticate, authorize("ADMIN"), (req, res, next) => preRegController.resendEmails(req, res, next));

// 4. Gestion des classes
router.get("/classes", authenticate, authorize("ADMIN"), (req, res, next) => classesController.findAll(req, res, next));
router.post("/classes", authenticate, authorize("ADMIN"), (req, res, next) => classesController.create(req, res, next));
router.get("/classes/:id", authenticate, authorize("ADMIN"), (req, res, next) => classesController.findById(req, res, next));
router.put("/classes/:id", authenticate, authorize("ADMIN"), (req, res, next) => classesController.update(req, res, next));
router.delete("/classes/:id", authenticate, authorize("ADMIN"), (req, res, next) => classesController.delete(req, res, next));

// 5. Gestion des enseignants
router.get("/teachers", authenticate, authorize("ADMIN"), (req, res, next) => teachersController.findAll(req, res, next));
router.post("/teachers", authenticate, authorize("ADMIN"), (req, res, next) => teachersController.create(req, res, next));
router.get("/teachers/:id", authenticate, authorize("ADMIN"), (req, res, next) => teachersController.findById(req, res, next));
router.put("/teachers/:id", authenticate, authorize("ADMIN"), (req, res, next) => teachersController.update(req, res, next));
router.patch("/teachers/:id/status", authenticate, authorize("ADMIN"), (req, res, next) => teachersController.updateStatus(req, res, next));
router.post("/teachers/:id/assignments", authenticate, authorize("ADMIN"), (req, res, next) => teachersController.addAssignment(req, res, next));
router.delete("/teachers/:id/assignments", authenticate, authorize("ADMIN"), (req, res, next) => teachersController.removeAssignment(req, res, next));

// 6. Gestion des matières
router.get("/subjects", authenticate, authorize("ADMIN"), (req, res, next) => subjectsController.findAll(req, res, next));
router.get("/subjects/paginated", authenticate, authorize("ADMIN"), (req, res, next) => subjectsController.findPaginated(req, res, next));
router.post("/subjects", authenticate, authorize("ADMIN"), (req, res, next) => subjectsController.create(req, res, next));
router.put("/subjects/:id", authenticate, authorize("ADMIN"), (req, res, next) => subjectsController.update(req, res, next));
router.delete("/subjects/:id", authenticate, authorize("ADMIN"), (req, res, next) => subjectsController.delete(req, res, next));

// 7. Emploi du temps
router.get("/timetables", authenticate, authorize("ADMIN"), (req, res, next) => timetablesController.getAll(req, res, next));
router.get("/timetables/conflicts", authenticate, authorize("ADMIN"), (req, res, next) => timetablesController.getConflicts(req, res, next));
router.post("/timetables", authenticate, authorize("ADMIN"), (req, res, next) => timetablesController.create(req, res, next));
router.put("/timetables/:id", authenticate, authorize("ADMIN"), (req, res, next) => timetablesController.update(req, res, next));
router.delete("/timetables/:id", authenticate, authorize("ADMIN"), (req, res, next) => timetablesController.delete(req, res, next));

// 8. Bulletins de notes
router.get("/report-cards/status/:classId", authenticate, authorize("ADMIN"), (req, res, next) => reportCardsController.getByClass(req, res, next));
router.get("/report-cards/preview/:studentId", authenticate, authorize("ADMIN"), (req, res, next) => reportCardsController.getPreview(req, res, next));
router.post("/report-cards/finalize", authenticate, authorize("ADMIN"), (req, res, next) => reportCardsController.finalize(req, res, next));
router.post("/report-cards/generate-class", authenticate, authorize("ADMIN"), (req, res, next) => reportCardsController.generateForClass(req, res, next));
router.get("/report-cards/download/:studentId", authenticate, authorize("ADMIN"), (req, res, next) => reportCardsController.downloadPdf(req, res, next));
router.get("/report-cards/export-batch/:classId", authenticate, authorize("ADMIN"), (req, res, next) => reportCardsController.exportBatch(req, res, next));

// 9. Notes (Vue admin, lecture seule)
router.get("/grades", authenticate, authorize("ADMIN"), (req, res, next) => adminGradesController.findAll(req, res, next));
router.get("/grades/stats", authenticate, authorize("ADMIN"), (req, res, next) => adminGradesController.getStats(req, res, next));

// 10. Absences (Vue admin)
router.get("/absences", authenticate, authorize("ADMIN"), (req, res, next) => adminAbsencesController.findAll(req, res, next));
router.get("/absences/stats", authenticate, authorize("ADMIN"), (req, res, next) => adminAbsencesController.getStats(req, res, next));
router.put("/absences/:id/justify", authenticate, authorize("ADMIN"), (req, res, next) => adminAbsencesController.justify(req, res, next));

// 11. Notifications
import notificationsController from "../notifications/notifications.controller";
router.get("/notifications", authenticate, authorize("ADMIN"), notificationsController.getAll);
router.get("/notifications/unread-count", authenticate, authorize("ADMIN"), notificationsController.getUnreadCount);
router.patch("/notifications/read-all", authenticate, authorize("ADMIN"), notificationsController.markAllAsRead);
router.patch("/notifications/:id/read", authenticate, authorize("ADMIN"), notificationsController.markAsRead);

// 12. Site Settings
router.get("/settings", (req, res, next) => settingsController.getAll(req, res, next));
router.put("/settings", authenticate, authorize("ADMIN"), (req, res, next) => settingsController.updateAll(req, res, next));

// 13. Paiements
router.get("/payments", authenticate, authorize("ADMIN"), (req, res, next) => paymentsController.getAll(req, res, next));
router.get("/payments/stats", authenticate, authorize("ADMIN"), (req, res, next) => paymentsController.getStats(req, res, next));
router.patch("/payments/:id", authenticate, authorize("ADMIN"), (req, res, next) => paymentsController.updatePayment(req, res, next));

// 14. Cahier de Texte
import adminLessonBookRoutes from "./lesson-book/lesson-book.routes";
router.use("/lesson-book", authenticate, authorize("ADMIN"), adminLessonBookRoutes);

export default router;
