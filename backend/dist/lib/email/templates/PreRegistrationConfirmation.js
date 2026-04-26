"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PreRegistrationConfirmationEmail = PreRegistrationConfirmationEmail;
const base_1 = require("./base");
/**
 * Template d'email de confirmation après soumission d'une pré-inscription.
 */
function PreRegistrationConfirmationEmail({ parentName, childName, desiredGrade, submissionDate }) {
    const content = `
        <h2 style="margin-top: 0; color: #1e293b; font-size: 20px;">Dossier de pré-inscription reçu</h2>
        <p>Bonjour <strong>${parentName}</strong>,</p>
        <p>Nous vous remercions d'avoir choisi <strong>Skolara</strong> pour la scolarité de votre enfant. Nous avons bien reçu votre demande de pré-inscription en ligne.</p>
        
        <div style="background-color: #f1f5f9; border-radius: 12px; padding: 20px; margin: 25px 0;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #64748b; text-transform: uppercase; font-weight: bold; letter-spacing: 0.05em;">Récapitulatif de la demande</p>
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td style="padding: 5px 0; font-size: 14px;"><strong>Élève :</strong></td>
                    <td style="padding: 5px 0; font-size: 14px;">${childName}</td>
                </tr>
                <tr>
                    <td style="padding: 5px 0; font-size: 14px;"><strong>Classe souhaitée :</strong></td>
                    <td style="padding: 5px 0; font-size: 14px;">${desiredGrade}</td>
                </tr>
                <tr>
                    <td style="padding: 5px 0; font-size: 14px;"><strong>Date de soumission :</strong></td>
                    <td style="padding: 5px 0; font-size: 14px;">${submissionDate}</td>
                </tr>
            </table>
        </div>
        
        <p style="font-size: 15px; line-height: 1.6;">Votre dossier est actuellement en cours d'étude par notre équipe administrative. Nous reviendrons vers vous par email ou par téléphone dès qu'il aura été traité.</p>
        
        <div style="margin-top: 30px; padding: 20px; border: 1.5px dashed #cbd5e1; border-radius: 12px;">
            <p style="margin: 0; font-size: 13px; color: #64748b; text-align: center;">
                Ce message est une confirmation automatique de réception. Il n'est pas nécessaire d'y répondre.
            </p>
        </div>
    `;
    return (0, base_1.getBaseTemplate)({
        title: "Confirmation de pré-inscription — Skolara",
        preheader: `Merci ${parentName}, le dossier de ${childName} est bien enregistré.`,
        content
    });
}
//# sourceMappingURL=PreRegistrationConfirmation.js.map