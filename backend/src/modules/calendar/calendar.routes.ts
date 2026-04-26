import { Router } from "express";
import { CalendarController } from "./calendar.controller";
import { CalendarService } from "./calendar.service";
import { CalendarRepository } from "./calendar.repository";
import { authenticate, authorize } from "../../middlewares/authenticate";

const router = Router();
const calendarRepo = new CalendarRepository();
const calendarService = new CalendarService(calendarRepo);
const calendarController = new CalendarController(calendarService);

// Public routes
router.get("/public", (req, res, next) => {
  (req as any).publicOnly = true;
  return calendarController.findAll(req, res, next);
});

router.get("/event-types", (req, res, next) => calendarController.findAllTypes(req, res, next));

// Admin routes
router.get("/admin", authenticate, authorize("ADMIN"), (req, res, next) => calendarController.findAll(req, res, next));
router.post("/admin", authenticate, authorize("ADMIN"), (req, res, next) => calendarController.create(req, res, next));
router.get("/admin/:id", authenticate, authorize("ADMIN"), (req, res, next) => calendarController.findById(req, res, next));
router.put("/admin/:id", authenticate, authorize("ADMIN"), (req, res, next) => calendarController.update(req, res, next));
router.delete("/admin/:id", authenticate, authorize("ADMIN"), (req, res, next) => calendarController.delete(req, res, next));

export default router;
