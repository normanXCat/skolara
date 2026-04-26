"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsController = void 0;
const client_1 = require("../../prisma/client");
class NotificationsController {
    async getAll(req, res, next) {
        try {
            const userId = req.user.userId;
            const notifications = await client_1.prisma.notification.findMany({
                where: { userId },
                orderBy: { createdAt: "desc" },
            });
            res.status(200).json({
                success: true,
                data: notifications,
            });
        }
        catch (error) {
            next(error);
        }
    }
    async markAsRead(req, res, next) {
        try {
            const id = Number(req.params.id);
            const userId = req.user.userId;
            await client_1.prisma.notification.update({
                where: { id, userId },
                data: { isRead: true },
            });
            res.status(200).json({
                success: true,
                message: "Notification marquée comme lue",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async markAllAsRead(req, res, next) {
        try {
            const userId = req.user.userId;
            await client_1.prisma.notification.updateMany({
                where: { userId, isRead: false },
                data: { isRead: true },
            });
            res.status(200).json({
                success: true,
                message: "Toutes les notifications ont été marquées comme lues",
            });
        }
        catch (error) {
            next(error);
        }
    }
    async getUnreadCount(req, res, next) {
        try {
            const userId = req.user.userId;
            const count = await client_1.prisma.notification.count({
                where: { userId, isRead: false },
            });
            res.status(200).json({
                success: true,
                data: { count },
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.NotificationsController = NotificationsController;
exports.default = new NotificationsController();
//# sourceMappingURL=notifications.controller.js.map