import { Request, Response, NextFunction } from "express";
import timetablesService from "./timetables.service";
import { CreateTimetableSchema, UpdateTimetableSchema } from "../../../lib/validations/timetables";

export class TimetablesController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = {
        classId: req.query.classId ? Number(req.query.classId) : undefined,
        teacherId: req.query.teacherId ? Number(req.query.teacherId) : undefined,
        schoolYear: req.query.schoolYear as string,
        dayOfWeek: req.query.dayOfWeek ? Number(req.query.dayOfWeek) : undefined,
      };

      const timetables = await timetablesService.getTimetables(filters);
      res.status(200).json({
        success: true,
        data: timetables,
      });
    } catch (error) {
      next(error);
    }
  }

  async getConflicts(req: Request, res: Response, next: NextFunction) {
    try {
      const data = {
        classId: req.query.classId ? Number(req.query.classId) : undefined,
        teacherId: req.query.teacherId ? Number(req.query.teacherId) : undefined,
        dayOfWeek: Number(req.query.dayOfWeek),
        startTime: req.query.startTime as string,
        endTime: req.query.endTime as string,
        schoolYear: req.query.schoolYear as string,
        excludeId: req.query.excludeId ? Number(req.query.excludeId) : undefined,
      };

      const result = await timetablesService.checkConflicts(data);
      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = CreateTimetableSchema.parse(req.body);
      const timetable = await timetablesService.createTimetableSlot(validatedData);
      res.status(201).json({
        success: true,
        data: timetable,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const validatedData = UpdateTimetableSchema.parse(req.body);
      const timetable = await timetablesService.updateTimetableSlot(id, validatedData);
      res.status(200).json({
        success: true,
        data: timetable,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await timetablesService.deleteTimetableSlot(id);
      res.status(200).json({
        success: true,
        message: "Slot supprimé avec succès",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new TimetablesController();
