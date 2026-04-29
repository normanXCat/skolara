"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransporter = getTransporter;
exports.resetTransporter = resetTransporter;
exports.verifyEmailTransport = verifyEmailTransport;
exports.sendEmail = sendEmail;
/* eslint-disable @typescript-eslint/no-require-imports */
// On utilise require pour éviter tout problème de résolution de types avec nodemailer
const nodemailer = require('nodemailer');
function buildTransporter() {
    const fromEmail = (process.env.EMAIL_FROM ?? '').replace(/^["'](.+)["']$/, '$1').trim();
    const emailPassword = (process.env.EMAIL_PASSWORD ?? '').replace(/^["'](.+)["']$/, '$1').trim();
    if (!fromEmail || !emailPassword) {
        throw new Error('[EMAIL] Les variables EMAIL_FROM et EMAIL_PASSWORD sont requises');
    }
    return nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        family: 4, // Force IPv4 — évite ENETUNREACH sur Render
        auth: {
            user: fromEmail,
            pass: emailPassword, // App Password Gmail si 2FA activée
        },
        connectionTimeout: 30000,
        greetingTimeout: 30000,
        socketTimeout: 30000,
        logger: process.env.NODE_ENV === 'development',
        debug: process.env.NODE_ENV === 'development',
    });
}
// Singleton
let instance;
function getTransporter() {
    if (!instance) {
        instance = buildTransporter();
    }
    return instance;
}
function resetTransporter() {
    instance = undefined;
}
async function verifyEmailTransport() {
    try {
        await getTransporter().verify();
        console.log('[EMAIL] ✅ Connexion SMTP Gmail vérifiée avec succès');
        return true;
    }
    catch (error) {
        const err = error;
        console.error('[EMAIL] ❌ Échec SMTP:', err.message);
        console.error('[EMAIL] Code:', err.code ?? 'inconnu', '| Adresse:', err.address ?? 'inconnue');
        if (err.code === 'ECONNREFUSED' || err.code === 'ENETUNREACH') {
            console.error('[EMAIL] 💡 Port bloqué → vérifiez que le port 465 est autorisé sur votre hébergeur');
        }
        if (err.message?.toLowerCase().includes('535') || err.message?.toLowerCase().includes('invalid login')) {
            console.error('[EMAIL] 💡 Identifiants invalides → vérifiez EMAIL_FROM / EMAIL_PASSWORD');
            console.error('[EMAIL]    Gmail + 2FA : https://myaccount.google.com/apppasswords');
        }
        return false;
    }
}
async function sendEmail(options) {
    const fromEmail = (process.env.EMAIL_FROM ?? '').replace(/^["'](.+)["']$/, '$1').trim();
    const info = await getTransporter().sendMail({
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