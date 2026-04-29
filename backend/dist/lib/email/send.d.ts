export interface SendEmailOptions {
    to: string | string[];
    subject: string;
    html: string;
    replyTo?: string;
}
export declare function sendEmail({ to, subject, html, replyTo }: SendEmailOptions): Promise<{
    success: boolean;
    error?: string;
}>;
//# sourceMappingURL=send.d.ts.map