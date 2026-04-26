"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimetablesController = void 0;
const timetables_service_1 = __importDefault(require("./timetables.service"));
const timetables_1 = require("../../../lib/validations/timetables");
class TimetablesController {
    async getAll(req, res, next) {
        try {
            const filters = {
                classId: req.query.classId ? Number(req.query.classId) : undefined,
                teacherId: req.query.teacherId ? Number(req.query.teacherId) : undefined,
                schoolYear: req.query.schoolYear,
                dayOfWeek: req.query.dayOfWeek ? Number(req.query.dayOfWeek) : undefined,
            };
            const timetables = await timetables_service_1.default.getTimetables(filters);
            res.status(200).json({
                success: true,
                data: timetables,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getConflicts(req, res, next) {
        try {
            const data = {
                classId: req.query.classId ? Number(req.query.classId) : undefined,
                teacherId: req.query.teacherId ? Number(req.query.teacherId) : undefined,
                dayOfWeek: Number(req.query.dayOfWeek),
                startTime: req.query.startTime,
                endTime: req.query.endTime,
                schoolYear: req.query.schoolYear,
                excludeId: req.query.excludeId ? Number(req.query.excludeId) : undefined,
            };
            const result = await timetables_service_1.default.checkConflicts(data);
            res.status(200).json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async create(req, res, next) {
        try {
            const validatedData = timetables_1.CreateTimetableSchema.parse(req.body);
            const timetable = await timetables_service_1.default.createTimetableSlot(validatedData);
            res.status(201).json({
                success: true,
                data: timetable,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async update(req, res, next) {
        try {
            const id = Number(req.params.id);
            const validatedData = timetables_1.UpdateTimetableSchema.parse(req.body);
            const timetable = await timetables_service_1.default.updateTimetableSlot(id, validatedData);
            res.status(200).json({
                success: true,
                data: timetable,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            const id = Number(req.params.id);
            await timetables_service_1.default.deleteTimetableSlot(id);
            res.status(200).json({
                success: true,
                message: "Slot supprimé avec succès",
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.TimetablesController = TimetablesController;
exports.default = new TimetablesController();
//# sourceMappingURL=timetables.controller.js.map