import { Request, Response, NextFunction } from "express";
import { MessagesService } from "./messages.service";

const messagesService = new MessagesService();

export class MessagesController {
  private getAuthenticatedUserId(req: Request): number {
    const userId = (req as any).user?.userId;
    if (!userId) {
      throw { status: 401, message: "Utilisateur non authentifié" };
    }
    return Number(userId);
  }

  async getInbox(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = this.getAuthenticatedUserId(req);
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      const result = await messagesService.getInbox(userId, page, limit);

      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async getSent(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = this.getAuthenticatedUserId(req);
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      const result = await messagesService.getSent(userId, page, limit);

      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async sendMessage(req: Request, res: Response, next: NextFunction) {
    try {
      const senderId = this.getAuthenticatedUserId(req);
      const { receiverId, subject, content } = req.body;

      if (!receiverId || !content) {
         return res.status(400).json({ success: false, error: "Champs manquants. (receiverId, content)" });
      }

      const safeSubject =
        typeof subject === "string" && subject.trim() !== "" ? subject.trim() : "Message";

      const message = await messagesService.sendMessage(
        senderId,
        Number(receiverId),
        safeSubject,
        content,
      );

      res.status(201).json({ success: true, data: message, message: "Message envoyé." });
    } catch (error) {
      next(error);
    }
  }

  async markAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = this.getAuthenticatedUserId(req);
      const messageId = parseInt(req.params.id as string);

      const message = await messagesService.markAsRead(messageId, userId);

      res.status(200).json({ success: true, data: message });
    } catch (error) {
      next(error);
    }
  }

  async searchUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = this.getAuthenticatedUserId(req);
      const rawQuery = req.query.q;
      const query = typeof rawQuery === "string" ? rawQuery : "";

      const users = await messagesService.searchUsers(query, userId);

      res.status(200).json({ success: true, data: users });
    } catch (error) {
      next(error);
    }
  }

  async getUnreadCount(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = this.getAuthenticatedUserId(req);
      const count = await messagesService.getUnreadCount(userId);
      res.status(200).json({ success: true, data: { count } });
    } catch (error) {
      next(error);
    }
  }

  async getConversations(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = this.getAuthenticatedUserId(req);
      const result = await messagesService.getConversations(userId);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async getConversationMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = this.getAuthenticatedUserId(req);
      const peerId = parseInt(req.params.peerId as string, 10);
      if (!peerId) {
        return res.status(400).json({ success: false, error: "peerId invalide" });
      }

      const result = await messagesService.getConversationMessages(userId, peerId);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}
