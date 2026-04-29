import SMTPTransport from 'nodemailer/lib/smtp-transport';
declare function createTransporterInstance(): any;
export declare const getTransporter: () => ReturnType<typeof createTransporterInstance>;
/**
 * Réinitialise le transporteur (utile pour les tests ou un changement de config à chaud).
 */
export declare const resetTransporter: () => void;
/**
 * Vérifie la connexion SMTP au démarrage.
 * @returns true si la connexion est établie, false sinon.
 */
export declare function verifyEmailTransport(): Promise<boolean>;
/**
 * Envoie un email.
 * @returns L'info du message envoyé.
 */
export declare function sendEmail(options: {
    to: string | string[];
    subject: string;
    html: string;
    text?: string;
    replyTo?: string;
}): Promise<SMTPTransport.SentMessageInfo>;
export {};
//# sourceMappingURL=client.d.ts.map