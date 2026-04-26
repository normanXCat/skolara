import { NotificationType } from "../../generated/prisma";
export declare function createNotification({ userId, type, content, }: {
    userId: number;
    type: NotificationType;
    content: string;
}): Promise<void>;
//# sourceMappingURL=create.d.ts.map