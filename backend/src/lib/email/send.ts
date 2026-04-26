import { transporter } from './client';

interface SendEmailOptions {
    to: string | string[];
    subject: string;
    html: string;
    replyTo?: string;
}

/**
 * Wrapper générique pour l'envoi d'emails.
 * Gère le logging et ne throw pas d'erreurs pour ne pas bloquer les transactions si non souhaité.
 */
export async function sendEmail({
    to,
    subject,
    html,
    replyTo
}: SendEmailOptions): Promise<{ success: boolean; error?: string }> {
    const fromName = (process.env.EMAIL_FROM_NAME || 'Skolara').replace(/^["'](.+)["']$/, '$1').trim();
    // Nettoyer les variables d'env des potentiels guillemets résiduels
    const fromEmail = (process.env.EMAIL_FROM || '').replace(/^["'](.+)["']$/, '$1').trim();
    const emailPassword = (process.env.EMAIL_PASSWORD || '').replace(/^["'](.+)["']$/, '$1').trim();

    const mailOptions = {
        from: `"${fromName}" <${fromEmail}>`,
        to: Array.isArray(to) ? to.join(', ') : to,
        subject,
        html,
        replyTo
    };

    // On simule l'envoi seulement si NODE_ENV est 'development' ET qu'aucun mot de passe n'est fourni,
    // ou si on force explicitement la simulation.
    const isDev = process.env.NODE_ENV === 'development';
    const forceSimulate = process.env.EMAIL_SIMULATE === 'true';

    if (forceSimulate || (isDev && !emailPassword)) {
        console.log('-------------------------------------------');
        console.log(`[EMAIL SIMULATED] to: ${mailOptions.to}`);
        console.log(`[EMAIL SIMULATED] subject: ${mailOptions.subject}`);
        console.log('-------------------------------------------');
        return { success: true };
    }

    try {
        console.log(`[EMAIL] Attempting to send email to ${mailOptions.to}...`);
        const response = await transporter.sendMail(mailOptions);
        console.log(`[EMAIL SUCCESS] Message sent: ${response.messageId}`);
        return { success: true };
    } catch (error: any) {
        console.error(`[EMAIL ERROR] Failed to send email to ${mailOptions.to}:`, error);
        return { 
            success: false, 
            error: error.message || 'Unknown email sending error' 
        };
    }
}
