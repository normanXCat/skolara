import { Request, Response, NextFunction } from "express";
import { prisma } from "../../prisma/client";

export class NotificationsController {
  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;
      const notifications = await prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
      });

      res.status(200).json({
        success: true,
        data: notifications,
      });
    } catch (error) {
      next(error);
    }
  }

  async markAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const userId = (req as any).user.userId;

      await prisma.notification.update({
        where: { id, userId },
        data: { isRead: true },
      });

      res.status(200).json({
        success: true,
        message: "Notification marquée comme lue",
      });
    } catch (error) {
      next(error);
    }
  }

  async markAllAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;

      await prisma.notification.updateMany({
        where: { userId, isRead: false },
        data: { isRead: true },
      });

      res.status(200).json({
        success: true,
        message: "Toutes les notifications ont été marquées comme lues",
      });
    } catch (error) {
      next(error);
    }
  }

  async getUnreadCount(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;
      const count = await prisma.notification.count({
        where: { userId, isRead: false },
      });

      res.status(200).json({
        success: true,
        data: { count },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new NotificationsController();
