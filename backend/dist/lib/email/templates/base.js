"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBaseTemplate = getBaseTemplate;
/**
 * Template de base pour tous les emails de Skolara.
 * Assure une cohérence visuelle et une compatibilité maximale avec les clients mail.
 */
function getBaseTemplate({ title, content, preheader }) {
    const primaryColor = '#2563eb'; // Bleu Skolara (approximation de var(--primary))
    const footerColor = '#64748b';
    const bgColor = '#f8fafc';
    // Nettoyer les variables d'env
    const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:3000').replace(/^["'](.+)["']$/, '$1').trim();
    const fromEmail = (process.env.EMAIL_FROM || '').replace(/^["'](.+)["']$/, '$1').trim();
    return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style>
        body { margin: 0; padding: 0; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; background-color: ${bgColor}; color: #1e293b; }
        img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
        table { border-collapse: collapse !important; }
        .content-card { background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
        .btn { display: inline-block; padding: 12px 24px; background-color: ${primaryColor}; color: #ffffff !important; text-decoration: none; border-radius: 12px; font-weight: bold; font-size: 14px; transition: background-color 0.3s ease; }
        .footer-text { font-size: 12px; color: ${footerColor}; line-height: 1.5; }
        @media only screen and (max-width: 600px) {
            .container { width: 100% !important; }
            .content-padding { padding: 20px !important; }
        }
    </style>
</head>
<body style="background-color: ${bgColor}; padding: 40px 0;">
    ${preheader ? `<span style="display: none !important; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">${preheader}</span>` : ''}
    <center>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" class="container" style="max-width: 600px;">
            <!-- Header / Logo -->
            <tr>
                <td align="center" style="padding-bottom: 30px;">
                    <a href="${frontendUrl}" target="_blank" style="text-decoration: none;">
                        <img src="https://42ty66gibc.ucarecd.net/5a406d79-6b24-45a6-a0c6-e5b19c5b7118/skolaralogo.png" alt="Skolara" width="150" style="display: block; border: 0; outline: none; text-decoration: none;">
                    </a>
                </td>
            </tr>
            <!-- Main Content -->
            <tr>
                <td>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" class="content-card">
                        <tr>
                            <td class="content-padding" style="padding: 40px;">
                                ${content}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <!-- Footer -->
            <tr>
                <td align="center" style="padding-top: 40px;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                            <td align="center" class="footer-text">
                                <p style="margin: 0 0 10px 0;">&copy; ${new Date().getFullYear()} Skolara - Solution de gestion scolaire moderne.</p>
                                <p style="margin: 0;">Si vous avez des questions, contactez-nous à <a href="mailto:${fromEmail}" style="color: ${primaryColor}; text-decoration: none;">${fromEmail}</a></p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </center>
</body>
</html>
    `;
}
//# sourceMappingURL=base.js.map