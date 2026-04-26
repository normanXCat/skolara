"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAbsenceNotificationEmail = getAbsenceNotificationEmail;
const base_1 = require("./base");
function getAbsenceNotificationEmail({ studentName, date, status, className, teacherName, reason, }) {
    const statusLabel = status === "ABSENT" ? "Absent(e)" : "En retard";
    const statusColor = status === "ABSENT" ? "#ef4444" : "#f59e0b";
    const content = `
        <h1 style="margin: 0 0 20px 0; font-size: 24px; font-weight: 800; color: #1e293b; letter-spacing: -0.025em;">
            Notification d'absence
        </h1>
        <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #475569;">
            Bonjour, nous vous informons que votre enfant <strong>${studentName}</strong> a été marqué(e) 
            <span style="color: ${statusColor}; font-weight: bold;">${statusLabel}</span> pour la journée du <strong>${date}</strong>.
        </p>
        
        <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td style="padding-bottom: 8px; font-size: 14px; color: #64748b;">Classe</td>
                    <td style="padding-bottom: 8px; font-size: 14px; color: #1e293b; font-weight: bold; text-align: right;">${className}</td>
                </tr>
                <tr>
                    <td style="padding-bottom: 8px; font-size: 14px; color: #64748b;">Enseignant</td>
                    <td style="padding-bottom: 8px; font-size: 14px; color: #1e293b; font-weight: bold; text-align: right;">${teacherName}</td>
                </tr>
                ${reason ? `
                <tr>
                    <td style="font-size: 14px; color: #64748b;">Motif noté</td>
                    <td style="font-size: 14px; color: #1e293b; font-weight: bold; text-align: right;">${reason}</td>
                </tr>
                ` : ''}
            </table>
        </div>

        <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #475569;">
            Veuillez régulariser cette situation auprès de la vie scolaire ou via votre espace parent si nécessaire.
        </p>

        <div style="text-align: center; margin-top: 32px;">
            <a href="${process.env.FRONTEND_URL}/parent/absences" class="btn">
                Consulter l'historique
            </a>
        </div>
    `;
    return (0, base_1.getBaseTemplate)({
        title: `Avis d'absence — ${studentName} — ${date}`,
        content,
        preheader: `Votre enfant ${studentName} a été marqué ${statusLabel.toLowerCase()} le ${date}.`,
    });
}
//# sourceMappingURL=AbsenceNotification.js.map