"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalendarController = void 0;
const calendar_schema_1 = require("./calendar.schema");
class CalendarController {
    constructor(calendarService) {
        this.calendarService = calendarService;
    }
    async create(req, res, next) {
        try {
            const validatedData = calendar_schema_1.createEventSchema.parse(req.body);
            const event = await this.calendarService.create(validatedData);
            res.status(201).json({ success: true, data: event });
        }
        catch (error) {
            next(error);
        }
    }
    async findAll(req, res, next) {
        try {
            const filters = calendar_schema_1.calendarFiltersSchema.parse(req.query);
            const isPublicOnly = req.publicOnly || false;
            const events = await this.calendarService.findAll(filters, isPublicOnly);
            res.json({ success: true, data: events });
        }
        catch (error) {
            next(error);
        }
    }
    async findById(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const event = await this.calendarService.findById(id);
            if (!event) {
                return res.status(404).json({ success: false, error: "Événement non trouvé" });
            }
            res.json({ success: true, data: event });
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            const validatedData = calendar_schema_1.updateEventSchema.parse(req.body);
            const event = await this.calendarService.update(id, validatedData);
            res.json({ success: true, data: event });
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const id = parseInt(req.params.id);
            await this.calendarService.delete(id);
            res.json({ success: true, message: "Événement supprimé" });
        }
        catch (error) {
            next(error);
        }
    }
    async findAllTypes(req, res, next) {
        try {
            const types = await this.calendarService.findAllTypes();
            res.json({ success: true, data: types });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CalendarController = CalendarController;
//# sourceMappingURL=calendar.controller.js.map