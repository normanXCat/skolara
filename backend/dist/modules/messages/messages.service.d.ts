export declare class MessagesService {
    getConversations(userId: number): Promise<{
        conversations: any[];
    }>;
    getConversationMessages(userId: number, peerId: number): Promise<{
        peer: {
            id: number;
            name: string;
            firstName: string;
            email: string;
            role: import("../../generated/prisma").$Enums.Role;
        };
        messages: ({
            sender: {
                id: number;
                name: string;
                firstName: string;
                role: import("../../generated/prisma").$Enums.Role;
            };
            receiver: {
                id: number;
                name: string;
                firstName: string;
                role: import("../../generated/prisma").$Enums.Role;
            };
        } & {
            id: number;
            content: string;
            isRead: boolean;
            senderId: number;
            receiverId: number;
            subject: string;
            sentAt: Date;
            readAt: Date | null;
        })[];
    }>;
    getInbox(userId: number, page: number, limit: number): Promise<{
        messages: ({
            sender: {
                id: number;
                name: string;
                firstName: string;
                role: import("../../generated/prisma").$Enums.Role;
            };
        } & {
            id: number;
            content: string;
            isRead: boolean;
            senderId: number;
            receiverId: number;
            subject: string;
            sentAt: Date;
            readAt: Date | null;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getSent(userId: number, page: number, limit: number): Promise<{
        messages: ({
            receiver: {
                id: number;
                name: string;
                firstName: string;
                role: import("../../generated/prisma").$Enums.Role;
            };
        } & {
            id: number;
            content: string;
            isRead: boolean;
            senderId: number;
            receiverId: number;
            subject: string;
            sentAt: Date;
            readAt: Date | null;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    sendMessage(senderId: number, receiverId: number, subject: string, content: string): Promise<{
        id: number;
        content: string;
        isRead: boolean;
        senderId: number;
        receiverId: number;
        subject: string;
        sentAt: Date;
        readAt: Date | null;
    }>;
    markAsRead(messageId: number, userId: number): Promise<{
        id: number;
        content: string;
        isRead: boolean;
        senderId: number;
        receiverId: number;
        subject: string;
        sentAt: Date;
        readAt: Date | null;
    }>;
    searchUsers(query: string, currentUserId: number): Promise<{
        id: number;
        name: string;
        firstName: string;
        email: string;
        role: import("../../generated/prisma").$Enums.Role;
    }[]>;
    getUnreadCount(userId: number): Promise<number>;
}
//# sourceMappingURL=messages.service.d.ts.map