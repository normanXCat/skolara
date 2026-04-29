import nodemailer from 'nodemailer';

let transporterInstance: ReturnType<typeof nodemailer.createTransport> | null = null;

export const getTransporter = () => {
    if (!transporterInstance) {
        const fromEmail = (process.env.EMAIL_FROM || '').replace(/^["'](.+)["']$/, '$1').trim();
        const emailPassword = (process.env.EMAIL_PASSWORD || '').replace(/^["'](.+)["']$/, '$1').trim();

        transporterInstance = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // TLS via STARTTLS
            requireTLS: true,
            auth: {
                user: fromEmail,
                pass: emailPassword,
            },
            connectionTimeout: 10000,
            greetingTimeout: 10000,
            socketTimeout: 15000,
            logger: process.env.NODE_ENV === 'development',
            debug: process.env.NODE_ENV === 'development',
        });
    }
    return transporterInstance;
};

/**
 * Vérifie la connexion SMTP au démarrage.
 */
export async function verifyEmailTransport(): Promise<boolean> {
    try {
        const transporter = getTransporter();
        await transporter.verify();
        console.log('[EMAIL] ✅ Connexion SMTP Gmail vérifiée avec succès');
        return true;
    } catch (error: any) {
        console.error('[EMAIL] ❌ Échec de la vérification SMTP:', error.message);
        console.error('[EMAIL] Vérifiez EMAIL_FROM et EMAIL_PASSWORD dans votre .env');
        return false;
    }
}
