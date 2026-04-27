import { Request, Response, NextFunction } from "express";
export declare class MessagesController {
    private getAuthenticatedUserId;
    getInbox(req: Request, res: Response, next: NextFunction): Promise<void>;
    getSent(req: Request, res: Response, next: NextFunction): Promise<void>;
    sendMessage(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
    markAsRead(req: Request, res: Response, next: NextFunction): Promise<void>;
    searchUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
    getUnreadCount(req: Request, res: Response, next: NextFunction): Promise<void>;
    getConversations(req: Request, res: Response, next: NextFunction): Promise<void>;
    getConversationMessages(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=messages.controller.d.ts.map