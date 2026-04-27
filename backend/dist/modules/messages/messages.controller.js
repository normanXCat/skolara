"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesController = void 0;
const messages_service_1 = require("./messages.service");
const messagesService = new messages_service_1.MessagesService();
class MessagesController {
    getAuthenticatedUserId(req) {
        const userId = req.user?.userId;
        if (!userId) {
            throw { status: 401, message: "Utilisateur non authentifié" };
        }
        return Number(userId);
    }
    async getInbox(req, res, next) {
        try {
            const userId = this.getAuthenticatedUserId(req);
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const result = await messagesService.getInbox(userId, page, limit);
            res.status(200).json({ success: true, data: result });
        }
        catch (error) {
            next(error);
        }
    }
    async getSent(req, res, next) {
        try {
            const userId = this.getAuthenticatedUserId(req);
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 20;
            const result = await messagesService.getSent(userId, page, limit);
            res.status(200).json({ success: true, data: result });
        }
        catch (error) {
            next(error);
        }
    }
    async sendMessage(req, res, next) {
        try {
            const senderId = this.getAuthenticatedUserId(req);
            const { receiverId, subject, content } = req.body;
            if (!receiverId || !content) {
                return res.status(400).json({ success: false, error: "Champs manquants. (receiverId, content)" });
            }
            const safeSubject = typeof subject === "string" && subject.trim() !== "" ? subject.trim() : "Message";
            const message = await messagesService.sendMessage(senderId, Number(receiverId), safeSubject, content);
            res.status(201).json({ success: true, data: message, message: "Message envoyé." });
        }
        catch (error) {
            next(error);
        }
    }
    async markAsRead(req, res, next) {
        try {
            const userId = this.getAuthenticatedUserId(req);
            const messageId = parseInt(req.params.id);
            const message = await messagesService.markAsRead(messageId, userId);
            res.status(200).json({ success: true, data: message });
        }
        catch (error) {
            next(error);
        }
    }
    async searchUsers(req, res, next) {
        try {
            const userId = this.getAuthenticatedUserId(req);
            const rawQuery = req.query.q;
            const query = typeof rawQuery === "string" ? rawQuery : "";
            const users = await messagesService.searchUsers(query, userId);
            res.status(200).json({ success: true, data: users });
        }
        catch (error) {
            next(error);
        }
    }
    async getUnreadCount(req, res, next) {
        try {
            const userId = this.getAuthenticatedUserId(req);
            const count = await messagesService.getUnreadCount(userId);
            res.status(200).json({ success: true, data: { count } });
        }
        catch (error) {
            next(error);
        }
    }
    async getConversations(req, res, next) {
        try {
            const userId = this.getAuthenticatedUserId(req);
            const result = await messagesService.getConversations(userId);
            res.status(200).json({ success: true, data: result });
        }
        catch (error) {
            next(error);
        }
    }
    async getConversationMessages(req, res, next) {
        try {
            const userId = this.getAuthenticatedUserId(req);
            const peerId = parseInt(req.params.peerId, 10);
            if (!peerId) {
                return res.status(400).json({ success: false, error: "peerId invalide" });
            }
            const result = await messagesService.getConversationMessages(userId, peerId);
            res.status(200).json({ success: true, data: result });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.MessagesController = MessagesController;
//# sourceMappingURL=messages.controller.js.map