"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagesService = void 0;
const client_1 = require("../../prisma/client");
const create_1 = require("../../lib/notifications/create");
const prisma_1 = require("../../generated/prisma");
class MessagesService {
    async getConversations(userId) {
        // Fetch a batch of recent messages involving the user
        const recent = await client_1.prisma.message.findMany({
            where: {
                OR: [{ senderId: userId }, { receiverId: userId }],
            },
            orderBy: { sentAt: "desc" },
            take: 200,
            include: {
                sender: { select: { id: true, firstName: true, name: true, role: true, email: true } },
                receiver: { select: { id: true, firstName: true, name: true, role: true, email: true } },
            },
        });
        const byPeer = new Map();
        for (const msg of recent) {
            const peer = msg.senderId === userId ? msg.receiver : msg.sender;
            if (!peer)
                continue;
            if (!byPeer.has(peer.id)) {
                byPeer.set(peer.id, {
                    peer,
                    lastMessage: msg,
                    unreadCount: 0,
                });
            }
            // unread = received by user and not read
            if (msg.receiverId === userId && !msg.isRead) {
                const entry = byPeer.get(peer.id);
                entry.unreadCount += 1;
            }
        }
        return {
            conversations: Array.from(byPeer.values()),
        };
    }
    async getConversationMessages(userId, peerId) {
        const peer = await client_1.prisma.user.findUnique({
            where: { id: peerId },
            select: { id: true, firstName: true, name: true, role: true, email: true },
        });
        if (!peer)
            throw new Error("Utilisateur introuvable.");
        const messages = await client_1.prisma.message.findMany({
            where: {
                OR: [
                    { senderId: userId, receiverId: peerId },
                    { senderId: peerId, receiverId: userId },
                ],
            },
            orderBy: { sentAt: "asc" },
            take: 500,
            include: {
                sender: { select: { id: true, firstName: true, name: true, role: true } },
                receiver: { select: { id: true, firstName: true, name: true, role: true } },
            },
        });
        // Mark peer->user messages as read in bulk
        await client_1.prisma.message.updateMany({
            where: { senderId: peerId, receiverId: userId, isRead: false },
            data: { isRead: true, readAt: new Date() },
        });
        return { peer, messages };
    }
    async getInbox(userId, page, limit) {
        const skip = (page - 1) * limit;
        const [messages, total] = await Promise.all([
            client_1.prisma.message.findMany({
                where: { receiverId: userId },
                skip,
                take: limit,
                orderBy: { sentAt: 'desc' },
                include: {
                    sender: {
                        select: { id: true, firstName: true, name: true, role: true }
                    }
                }
            }),
            client_1.prisma.message.count({ where: { receiverId: userId } })
        ]);
        return {
            messages,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };
    }
    async getSent(userId, page, limit) {
        const skip = (page - 1) * limit;
        const [messages, total] = await Promise.all([
            client_1.prisma.message.findMany({
                where: { senderId: userId },
                skip,
                take: limit,
                orderBy: { sentAt: 'desc' },
                include: {
                    receiver: {
                        select: { id: true, firstName: true, name: true, role: true }
                    }
                }
            }),
            client_1.prisma.message.count({ where: { senderId: userId } })
        ]);
        return {
            messages,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            }
        };
    }
    async sendMessage(senderId, receiverId, subject, content) {
        const receiver = await client_1.prisma.user.findUnique({ where: { id: receiverId } });
        if (!receiver)
            throw new Error("Destinataire introuvable.");
        const message = await client_1.prisma.message.create({
            data: {
                senderId,
                receiverId,
                subject,
                content
            }
        });
        try {
            await (0, create_1.createNotification)({
                userId: receiver.id,
                type: prisma_1.NotificationType.MESSAGE,
                content: `Nouveau message reçu : ${subject}`
            });
        }
        catch (e) {
            console.error("Warning: Failed to create MESSAGE notification");
        }
        return message;
    }
    async markAsRead(messageId, userId) {
        const message = await client_1.prisma.message.findUnique({ where: { id: messageId } });
        if (!message)
            throw new Error("Message introuvable.");
        if (message.receiverId !== userId)
            throw new Error("Non autorisé.");
        return client_1.prisma.message.update({
            where: { id: messageId },
            data: { isRead: true }
        });
    }
    async searchUsers(query, currentUserId) {
        if (!query || query.length < 2)
            return [];
        return client_1.prisma.user.findMany({
            where: {
                id: { not: currentUserId },
                OR: [
                    { firstName: { contains: query, mode: "insensitive" } },
                    { name: { contains: query, mode: "insensitive" } },
                    { email: { contains: query, mode: "insensitive" } }
                ]
            },
            select: {
                id: true,
                firstName: true,
                name: true,
                role: true,
                email: true
            },
            take: 15
        });
    }
    async getUnreadCount(userId) {
        return client_1.prisma.message.count({
            where: { receiverId: userId, isRead: false }
        });
    }
}
exports.MessagesService = MessagesService;
//# sourceMappingURL=messages.service.js.map