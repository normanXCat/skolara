"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
const client_1 = require("./client");
async function sendEmail({ to, subject, html, replyTo }) {
    const fromName = (process.env.EMAIL_FROM_NAME || 'Skolara').replace(/^["'](.+)["']$/, '$1').trim();
    const fromEmail = (process.env.EMAIL_FROM || '').replace(/^["'](.+)["']$/, '$1').trim();
    const emailPassword = (process.env.EMAIL_PASSWORD || '').replace(/^["'](.+)["']$/, '$1').trim();
    const recipients = Array.isArray(to) ? to.join(', ') : to;
    const mailOptions = {
        from: `"${fromName}" <${fromEmail}>`,
        to: recipients,
        subject,
        html,
        replyTo,
        envelope: {
            from: fromEmail,
            to: Array.isArray(to) ? to : [to],
        },
        text: html.replace(/<style[^>]*>.*<\/style>/gi, '')
            .replace(/<br\s*[\/]?>/gi, '\n')
            .replace(/<\/p>/gi, '\n\n')
            .replace(/<[^>]+>/g, '')
            .replace(/&nbsp;/g, ' ')
            .trim(),
    };
    const isDev = process.env.NODE_ENV === 'development';
    const forceSimulate = process.env.EMAIL_SIMULATE === 'true';
    if (forceSimulate || (isDev && !emailPassword)) {
        console.log('-------------------------------------------');
        console.log(`[EMAIL SIMULATED] to: ${recipients}`);
        console.log(`[EMAIL SIMULATED] subject: ${subject}`);
        console.log('-------------------------------------------');
        return { success: true };
    }
    try {
        console.log(`[EMAIL] Envoi en cours vers ${recipients}...`);
        console.log(`[EMAIL] From: ${mailOptions.from}`);
        console.log(`[EMAIL] Subject: ${subject}`);
        const transporter = (0, client_1.getTransporter)();
        const response = await transporter.sendMail(mailOptions);
        console.log(`[EMAIL] ✅ Message envoyé avec succès`);
        console.log(`[EMAIL] MessageId: ${response.messageId}`);
        console.log(`[EMAIL] Response: ${response.response}`);
        console.log(`[EMAIL] Accepted: ${JSON.stringify(response.accepted)}`);
        console.log(`[EMAIL] Rejected: ${JSON.stringify(response.rejected)}`);
        // Vérifier si certains destinataires ont été rejetés
        if (response.rejected && response.rejected.length > 0) {
            console.warn(`[EMAIL] ⚠️ Certains destinataires ont été rejetés: ${JSON.stringify(response.rejected)}`);
        }
        return { success: true };
    }
    catch (error) {
        console.error(`[EMAIL] ❌ Échec de l'envoi vers ${recipients}`);
        console.error(`[EMAIL] Error code: ${error.code}`);
        console.error(`[EMAIL] Error message: ${error.message}`);
        if (error.response) {
            console.error(`[EMAIL] SMTP Response: ${error.response}`);
        }
        return {
            success: false,
            error: error.message || 'Unknown email sending error'
        };
    }
}
//# sourceMappingURL=send.js.map