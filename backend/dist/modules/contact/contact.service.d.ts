import { ContactRepository } from "./contact.repository";
import { ContactFormInput, ContactFilters } from "./contact.schema";
export declare class ContactService {
    private contactRepository;
    constructor(contactRepository: ContactRepository);
    submitForm(data: ContactFormInput): Promise<{
        message: string;
        id: number;
        status: string;
        email: string;
        isRead: boolean;
        subject: string;
        fullName: string;
        receivedAt: Date;
        repliedAt: Date | null;
    }>;
    findAll(filters: ContactFilters): Promise<{
        data: {
            message: string;
            id: number;
            status: string;
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
        id: number;
        status: string;
        email: string;
        isRead: boolean;
        subject: string;
        fullName: string;
        receivedAt: Date;
        repliedAt: Date | null;
    } | null>;
    markAsRead(id: number): Promise<{
        message: string;
        id: number;
        status: string;
        email: string;
        isRead: boolean;
        subject: string;
        fullName: string;
        receivedAt: Date;
        repliedAt: Date | null;
    }>;
    delete(id: number): Promise<{
        message: string;
        id: number;
        status: string;
        email: string;
        isRead: boolean;
        subject: string;
        fullName: string;
        receivedAt: Date;
        repliedAt: Date | null;
    }>;
    reply(id: number, replyMessage: string): Promise<{
        message: string;
        id: number;
        status: string;
        email: string;
        isRead: boolean;
        subject: string;
        fullName: string;
        receivedAt: Date;
        repliedAt: Date | null;
    }>;
    getUnreadCount(): Promise<number>;
}
//# sourceMappingURL=contact.service.d.ts.map