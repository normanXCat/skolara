import { Request, Response, NextFunction } from "express";
import { CalendarService } from "./calendar.service";
import { createEventSchema, updateEventSchema, calendarFiltersSchema } from "./calendar.schema";

export class CalendarController {
  constructor(private calendarService: CalendarService) {}

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = createEventSchema.parse(req.body);
      const event = await this.calendarService.create(validatedData);
      res.status(201).json({ success: true, data: event });
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = calendarFiltersSchema.parse(req.query);
      const isPublicOnly = (req as any).publicOnly || false;
      const events = await this.calendarService.findAll(filters, isPublicOnly);
      res.json({ success: true, data: events });
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as any);
      const event = await this.calendarService.findById(id);
      if (!event) {
        return res.status(404).json({ success: false, error: "Événement non trouvé" });
      }
      res.json({ success: true, data: event });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as any);
      const validatedData = updateEventSchema.parse(req.body);
      const event = await this.calendarService.update(id, validatedData);
      res.json({ success: true, data: event });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as any);
      await this.calendarService.delete(id);
      res.json({ success: true, message: "Événement supprimé" });
    } catch (error) {
      next(error);
    }
  }

  async findAllTypes(req: Request, res: Response, next: NextFunction) {
    try {
      const types = await this.calendarService.findAllTypes();
      res.json({ success: true, data: types });
    } catch (error) {
      next(error);
    }
  }
}
