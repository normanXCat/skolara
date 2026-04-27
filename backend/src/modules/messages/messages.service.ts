import { prisma } from "../../prisma/client";
import { createNotification } from "../../lib/notifications/create";
import { NotificationType } from "../../generated/prisma";

export class MessagesService {
  async getConversations(userId: number) {
    // Fetch a batch of recent messages involving the user
    const recent = await prisma.message.findMany({
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

    const byPeer = new Map<number, any>();

    for (const msg of recent) {
      const peer = msg.senderId === userId ? msg.receiver : msg.sender;
      if (!peer) continue;

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

  async getConversationMessages(userId: number, peerId: number) {
    const peer = await prisma.user.findUnique({
      where: { id: peerId },
      select: { id: true, firstName: true, name: true, role: true, email: true },
    });
    if (!peer) throw new Error("Utilisateur introuvable.");

    const messages = await prisma.message.findMany({
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
    await prisma.message.updateMany({
      where: { senderId: peerId, receiverId: userId, isRead: false },
      data: { isRead: true, readAt: new Date() },
    });

    return { peer, messages };
  }
  async getInbox(userId: number, page: number, limit: number) {
    const skip = (page - 1) * limit;
    
    const [messages, total] = await Promise.all([
      prisma.message.findMany({
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
      prisma.message.count({ where: { receiverId: userId } })
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

  async getSent(userId: number, page: number, limit: number) {
    const skip = (page - 1) * limit;
    
    const [messages, total] = await Promise.all([
      prisma.message.findMany({
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
      prisma.message.count({ where: { senderId: userId } })
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

  async sendMessage(senderId: number, receiverId: number, subject: string, content: string) {
     const receiver = await prisma.user.findUnique({ where: { id: receiverId } });
     if (!receiver) throw new Error("Destinataire introuvable.");

     const message = await prisma.message.create({
        data: {
           senderId,
           receiverId,
           subject,
           content
        }
     });

     try {
       await createNotification({
          userId: receiver.id,
          type: NotificationType.MESSAGE,
          content: `Nouveau message reçu : ${subject}`
       });
     } catch(e) {
       console.error("Warning: Failed to create MESSAGE notification");
     }

     return message;
  }

  async markAsRead(messageId: number, userId: number) {
     const message = await prisma.message.findUnique({ where: { id: messageId } });
     if (!message) throw new Error("Message introuvable.");
     if (message.receiverId !== userId) throw new Error("Non autorisé.");

     return prisma.message.update({
         where: { id: messageId },
         data: { isRead: true }
     });
  }

  async searchUsers(query: string, currentUserId: number) {
     if (!query || query.length < 2) return [];

     return prisma.user.findMany({
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

  async getUnreadCount(userId: number) {
     return prisma.message.count({
        where: { receiverId: userId, isRead: false }
     });
  }
}
