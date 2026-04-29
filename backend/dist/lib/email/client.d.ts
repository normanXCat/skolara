/**
 * Configuration du transporteur Nodemailer.
 * Utilise la configuration SMTP explicite de Gmail au lieu du raccourci `service`.
 * Cela donne un meilleur contrôle sur la connexion TLS et le debug.
 */
export declare const transporter: any;
/**
 * Vérifie la connexion SMTP au démarrage.
 * Log un message clair si la connexion échoue.
 */
export declare function verifyEmailTransport(): Promise<boolean>;
//# sourceMappingURL=client.d.ts.map