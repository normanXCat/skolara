"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetTransporter = exports.getTransporter = void 0;
exports.verifyEmailTransport = verifyEmailTransport;
exports.sendEmail = sendEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
// On utilise ReturnType + undefined pour éviter tout problème de type null avec Mail<T>
function createTransporterInstance() {
    const fromEmail = (process.env.EMAIL_FROM ?? '').replace(/^["'](.+)["']$/, '$1').trim();
    const emailPassword = (process.env.EMAIL_PASSWORD ?? '').replace(/^["'](.+)["']$/, '$1').trim();
    if (!fromEmail || !emailPassword) {
        throw new Error('[EMAIL] Les variables EMAIL_FROM et EMAIL_PASSWORD sont requises');
    }
    const options = {
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
        connectionTimeout: 30000,
        greetingTimeout: 30000,
        socketTimeout: 30000,
        logger: process.env.NODE_ENV === 'development',
        debug: process.env.NODE_ENV === 'development',
    };
    return nodemailer_1.default.createTransport(options);
}
// Le type est inféré automatiquement depuis createTransporterInstance — pas de Mail<T> explicite
let transporterInstance;
const getTransporter = () => {
    if (!transporterInstance) {
        transporterInstance = createTransporterInstance();
    }
    return transporterInstance;
};
exports.getTransporter = getTransporter;
/**
 * Réinitialise le transporteur (utile pour les tests ou un changement de config à chaud).
 */
const resetTransporter = () => {
    transporterInstance = undefined;
};
exports.resetTransporter = resetTransporter;
/**
 * Vérifie la connexion SMTP au démarrage.
 * @returns true si la connexion est établie, false sinon.
 */
async function verifyEmailTransport() {
    try {
        const transporter = (0, exports.getTransporter)();
        await transporter.verify();
        console.log('[EMAIL] ✅ Connexion SMTP Gmail vérifiée avec succès');
        return true;
    }
    catch (error) {
        const err = error;
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
async function sendEmail(options) {
    const fromEmail = (process.env.EMAIL_FROM ?? '').replace(/^["'](.+)["']$/, '$1').trim();
    const transporter = (0, exports.getTransporter)();
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
//# sourceMappingURL=client.js.map