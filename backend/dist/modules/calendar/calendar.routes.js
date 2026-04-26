"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const calendar_controller_1 = require("./calendar.controller");
const calendar_service_1 = require("./calendar.service");
const calendar_repository_1 = require("./calendar.repository");
const authenticate_1 = require("../../middlewares/authenticate");
const router = (0, express_1.Router)();
const calendarRepo = new calendar_repository_1.CalendarRepository();
const calendarService = new calendar_service_1.CalendarService(calendarRepo);
const calendarController = new calendar_controller_1.CalendarController(calendarService);
// Public routes
router.get("/public", (req, res, next) => {
    req.publicOnly = true;
    return calendarController.findAll(req, res, next);
});
router.get("/event-types", (req, res, next) => calendarController.findAllTypes(req, res, next));
// Admin routes
router.get("/admin", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => calendarController.findAll(req, res, next));
router.post("/admin", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => calendarController.create(req, res, next));
router.get("/admin/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => calendarController.findById(req, res, next));
router.put("/admin/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => calendarController.update(req, res, next));
router.delete("/admin/:id", authenticate_1.authenticate, (0, authenticate_1.authorize)("ADMIN"), (req, res, next) => calendarController.delete(req, res, next));
exports.default = router;
//# sourceMappingURL=calendar.routes.js.map