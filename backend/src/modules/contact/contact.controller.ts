import { Request, Response, NextFunction } from "express";
import { ContactService } from "./contact.service";
import { contactFormSchema, contactFiltersSchema } from "./contact.schema";

export class ContactController {
  constructor(private contactService: ContactService) {}

  async submitForm(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = contactFormSchema.parse(req.body);
      await this.contactService.submitForm(validatedData);
      res.json({ success: true, message: "Votre message a été envoyé avec succès." });
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = contactFiltersSchema.parse(req.query);
      const result = await this.contactService.findAll(filters);
      res.json({ success: true, ...result });
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as any);
      const message = await this.contactService.findById(id);
      if (!message) {
        return res.status(404).json({ success: false, error: "Message non trouvé" });
      }
      res.json({ success: true, data: message });
    } catch (error) {
      next(error);
    }
  }

  async markAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as any);
      const message = await this.contactService.markAsRead(id);
      res.json({ success: true, data: message });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as any);
      await this.contactService.delete(id);
      res.json({ success: true, message: "Message supprimé" });
    } catch (error) {
      next(error);
    }
  }

  async reply(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id as any);
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ success: false, error: "Le message de réponse est requis" });
      }
      await this.contactService.reply(id, message);
      res.json({ success: true, message: "Réponse envoyée" });
    } catch (error) {
      next(error);
    }
  }

  async getUnreadCount(req: Request, res: Response, next: NextFunction) {
    try {
      const count = await this.contactService.getUnreadCount();
      res.json({ success: true, data: { count } });
    } catch (error) {
      next(error);
    }
  }
}
