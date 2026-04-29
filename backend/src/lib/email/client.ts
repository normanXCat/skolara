import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

// Extension propre du type pour inclure `family` (non exposé par nodemailer)
type SMTPOptions = SMTPTransport.Options & {
    family?: 4 | 6;
};

// On utilise ReturnType + undefined pour éviter tout problème de type null avec Mail<T>
function createTransporterInstance() {
    const fromEmail = (process.env.EMAIL_FROM ?? '').replace(/^["'](.+)["']$/, '$1').trim();
    const emailPassword = (process.env.EMAIL_PASSWORD ?? '').replace(/^["'](.+)["']$/, '$1').trim();

    if (!fromEmail || !emailPassword) {
        throw new Error('[EMAIL] Les variables EMAIL_FROM et EMAIL_PASSWORD sont requises');
    }

    const options: SMTPOptions = {
        host: 'smtp.gmail.com',
        // Port 465 + secure:true (SSL direct) est plus fiable sur les hébergeurs cloud
        // qui bloquent souvent le port 587 (STARTTLS) sur les plans gratuits (ex: Render)
        port: 465,
        secure: true,
        family: 4, // Force IPv4 pour éviter ENETUNREACH sur les environnements sans IPv6
        auth: {
            user: fromEmail,
            pass: emailPassword, // Doit être un App Password Gmail (16 car.) si 2FA activée
        },
        connectionTimeout: 30_000,
        greetingTimeout: 30_000,
        socketTimeout: 30_000,
        logger: process.env.NODE_ENV === 'development',
        debug: process.env.NODE_ENV === 'development',
    };

    return nodemailer.createTransport(options);
}

// Le type est inféré automatiquement depuis createTransporterInstance — pas de Mail<T> explicite
let transporterInstance: ReturnType<typeof createTransporterInstance> | undefined;

export const getTransporter = (): ReturnType<typeof createTransporterInstance> => {
    if (!transporterInstance) {
        transporterInstance = createTransporterInstance();
    }
    return transporterInstance;
};

/**
 * Réinitialise le transporteur (utile pour les tests ou un changement de config à chaud).
 */
export const resetTransporter = (): void => {
    transporterInstance = undefined;
};

/**
 * Vérifie la connexion SMTP au démarrage.
 * @returns true si la connexion est établie, false sinon.
 */
export async function verifyEmailTransport(): Promise<boolean> {
    try {
        const transporter = getTransporter();
        await transporter.verify();
        console.log('[EMAIL] ✅ Connexion SMTP Gmail vérifiée avec succès');
        return true;
    } catch (error: unknown) {
        const err = error as NodeJS.ErrnoException & { address?: string };
        console.error('[EMAIL] ❌ Échec de la vérification SMTP:', err.message);
        console.error('[EMAIL] Code:', err.code ?? 'inconnu', '| Adresse:', err.address ?? 'inconnue');

        if (err.code === 'ECONNREFUSED' || err.code === 'ENETUNREACH') {
            console.error('[EMAIL] 💡 Le port SMTP est peut-être bloqué par votre hébergeur (ex: Render gratuit).');
            console.error('[EMAIL]    → Essayez le port 465 avec secure:true, ou utilisez Resend/SendGrid.');
        }

        if (err.message?.toLowerCase().includes('invalid login') || err.message?.toLowerCase().includes('535')) {
            console.error('[EMAIL] 💡 Identifiants invalides.');
            console.error('[EMAIL]    → Vérifiez EMAIL_FROM et EMAIL_PASSWORD dans vos variables d\'environnement.');
            console.error('[EMAIL]    → Avec Gmail + 2FA, utilisez un App Password : https://myaccount.google.com/apppasswords');
        }

        return false;
    }
}

/**
 * Envoie un email.
 * @returns L'info du message envoyé.
 */
export async function sendEmail(options: {
    to: string | string[];
    subject: string;
    html: string;
    text?: string;
    replyTo?: string;
}): Promise<SMTPTransport.SentMessageInfo> {
    const fromEmail = (process.env.EMAIL_FROM ?? '').replace(/^["'](.+)["']$/, '$1').trim();
    const transporter = getTransporter();

    const info = await transporter.sendMail({
        from: fromEmail,
        to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
        subject: options.subject,
        html: options.html,
        text: options.text,
        replyTo: options.replyTo,
    });

    console.log(`[EMAIL] ✅ Email envoyé à ${options.to} — MessageId: ${info.messageId}`);
    return info;
}