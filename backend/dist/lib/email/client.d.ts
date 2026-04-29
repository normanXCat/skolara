export interface SendEmailOptions {
    to: string | string[];
    subject: string;
    html: string;
    text?: string;
    replyTo?: string;
}
export interface SentInfo {
    messageId: string;
    accepted: string[];
    rejected: string[];
    response: string;
}
declare function buildTransporter(): any;
export declare function getTransporter(): ReturnType<typeof buildTransporter>;
export declare function resetTransporter(): void;
export declare function verifyEmailTransport(): Promise<boolean>;
export declare function sendEmail(options: SendEmailOptions): Promise<SentInfo>;
export {};
//# sourceMappingURL=client.d.ts.map