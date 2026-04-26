import nodemailer from 'nodemailer';
const fromEmail = (process.env.EMAIL_FROM || '').replace(/^["'](.+)["']$/, '$1').trim();
const emailPassword = (process.env.EMAIL_PASSWORD || '').replace(/^["'](.+)["']$/, '$1').trim();

/**
 * Configuraton du transporteur Nodemailer.
 * Utilise Gmail ou un autre service SMTP selon la configuration.
 */
export const transporter = nodemailer.createTransport({
    // @ts-ignore - Some transporter options might not perfectly match types but work
    service: 'gmail',
    auth: {
        user: fromEmail,
        pass: emailPassword
    }
});
