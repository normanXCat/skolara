"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentWelcomeEmail = ParentWelcomeEmail;
const base_1 = require("./base");
/**
 * Template d'email de bienvenue pour les parents.
 */
function ParentWelcomeEmail({ parentName, childName, email, password }) {
    const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:3000').replace(/^["'](.+)["']$/, '$1').trim();
    const loginUrl = `${frontendUrl}/login`;
    const content = `
        <h2 style="margin-top: 0; color: #1e293b; font-size: 20px;">Inscription finalisée pour ${childName}</h2>
        <p>Bonjour <strong>${parentName}</strong>,</p>
        <p>Nous avons le plaisir de vous confirmer que l'inscription de votre enfant, <strong>${childName}</strong>, a été finalisée avec succès.</p>
        <p>Un compte parent a été créé pour vous. Celui-ci vous permettra de suivre en temps réel les notes, les absences et les actualités scolaires de votre enfant.</p>
        
        <div style="background-color: #f1f5f9; border-radius: 12px; padding: 20px; margin: 25px 0;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #64748b; text-transform: uppercase; font-weight: bold; letter-spacing: 0.05em;">Vos identifiants de connexion</p>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td style="padding: 5px 0; font-size: 15px;"><strong>Email :</strong></td>
                    <td style="padding: 5px 0; font-size: 15px; color: #2563eb;">${email}</td>
                </tr>
                ${password ? `
                <tr>
                    <td style="padding: 5px 0; font-size: 15px;"><strong>Mot de passe :</strong></td>
                    <td style="padding: 5px 0; font-size: 15px; font-family: monospace;">${password}</td>
                </tr>
                ` : ''}
            </table>
        </div>
        
        <p style="text-align: center; margin: 30px 0;">
            <a href="${loginUrl}" class="btn">Accéder au portail parent</a>
        </p>
        
        <p style="font-size: 14px;">Nous sommes ravis d'accueillir votre famille au sein de Skolara.</p>
    `;
    return (0, base_1.getBaseTemplate)({
        title: "Bienvenue sur le portail parent Skolara",
        preheader: `Votre compte parent Skolara est prêt pour suivre la scolarité de ${childName}`,
        content
    });
}
//# sourceMappingURL=ParentWelcome.js.map