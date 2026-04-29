"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransporter = void 0;
exports.verifyEmailTransport = verifyEmailTransport;
const nodemailer_1 = __importDefault(require("nodemailer"));
let transporterInstance = null;
const getTransporter = () => {
    if (!transporterInstance) {
        const fromEmail = (process.env.EMAIL_FROM || '').replace(/^["'](.+)["']$/, '$1').trim();
        const emailPassword = (process.env.EMAIL_PASSWORD || '').replace(/^["'](.+)["']$/, '$1').trim();
        transporterInstance = nodemailer_1.default.createTransport({
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
exports.getTransporter = getTransporter;
/**
 * Vérifie la connexion SMTP au démarrage.
 */
async function verifyEmailTransport() {
    try {
        const transporter = (0, exports.getTransporter)();
        await transporter.verify();
        console.log('[EMAIL] ✅ Connexion SMTP Gmail vérifiée avec succès');
        return true;
    }
    catch (error) {
        console.error('[EMAIL] ❌ Échec de la vérification SMTP:', error.message);
        console.error('[EMAIL] Vérifiez EMAIL_FROM et EMAIL_PASSWORD dans votre .env');
        return false;
    }
}
//# sourceMappingURL=client.js.map