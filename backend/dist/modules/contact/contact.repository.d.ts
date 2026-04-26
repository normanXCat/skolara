import { Prisma } from "../../generated/prisma";
export declare class ContactRepository {
    create(data: Prisma.ContactMessageCreateInput): Promise<{
        message: string;
        status: string;
        id: number;
        email: string;
        isRead: boolean;
        subject: string;
        fullName: string;
        receivedAt: Date;
        repliedAt: Date | null;
    }>;
    findMany(params: {
        skip?: number;
        take?: number;
        where?: Prisma.ContactMessageWhereInput;
    }): Promise<{
        data: {
            message: string;
            status: string;
            id: number;
            email: string;
            isRead: boolean;
            subject: string;
            fullName: string;
            receivedAt: Date;
            repliedAt: Date | null;
        }[];
        total: number;
    }>;
    findById(id: number): Promise<{
        message: string;
        status: string;
        id: number;
        email: string;
        isRead: boolean;
        subject: string;
        fullName: string;
        receivedAt: Date;
        repliedAt: Date | null;
    } | null>;
    markAsRead(id: number): Promise<{
        message: string;
        status: string;
        id: number;
        email: string;
        isRead: boolean;
        subject: string;
        fullName: string;
        receivedAt: Date;
        repliedAt: Date | null;
    }>;
    delete(id: number): Promise<{
        message: string;
        status: string;
        id: number;
        email: string;
        isRead: boolean;
        subject: string;
        fullName: string;
        receivedAt: Date;
        repliedAt: Date | null;
    }>;
    updateReplied(id: number): Promise<{
        message: string;
        status: string;
        id: number;
        email: string;
        isRead: boolean;
        subject: string;
        fullName: string;
        receivedAt: Date;
        repliedAt: Date | null;
    }>;
    countUnread(): Promise<number>;
}
//# sourceMappingURL=contact.repository.d.ts.map