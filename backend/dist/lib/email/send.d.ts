interface SendEmailOptions {
    to: string | string[];
    subject: string;
    html: string;
    replyTo?: string;
}
/**
 * Wrapper générique pour l'envoi d'emails.
 * Gère le logging et ne throw pas d'erreurs pour ne pas bloquer les transactions si non souhaité.
 */
export declare function sendEmail({ to, subject, html, replyTo }: SendEmailOptions): Promise<{
    success: boolean;
    error?: string;
}>;
export {};
//# sourceMappingURL=send.d.ts.map