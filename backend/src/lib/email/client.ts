import nodemailer from 'nodemailer';

const fromEmail = (process.env.EMAIL_FROM || '').replace(/^["'](.+)["']$/, '$1').trim();
const emailPassword = (process.env.EMAIL_PASSWORD || '').replace(/^["'](.+)["']$/, '$1').trim();

/**
 * Configuration du transporteur Nodemailer.
 * Utilise la configuration SMTP explicite de Gmail au lieu du raccourci `service`.
 * Cela donne un meilleur contrôle sur la connexion TLS et le debug.
 */
export const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: fromEmail,
        pass: emailPassword,
    },
    // Timeout de 10 secondes pour éviter les blocages
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    // Log SMTP pour le debug (désactivé en prod)
    logger: process.env.NODE_ENV === 'development',
    debug: process.env.NODE_ENV === 'development',
});

/**
 * Vérifie la connexion SMTP au démarrage.
 * Log un message clair si la connexion échoue.
 */
export async function verifyEmailTransport(): Promise<boolean> {
    try {
        await transporter.verify();
        console.log('[EMAIL] ✅ Connexion SMTP Gmail vérifiée avec succès');
        return true;
    } catch (error: any) {
        console.error('[EMAIL] ❌ Échec de la vérification SMTP:', error.message);
        console.error('[EMAIL] Vérifiez EMAIL_FROM et EMAIL_PASSWORD dans votre .env');
        return false;
    }
}
