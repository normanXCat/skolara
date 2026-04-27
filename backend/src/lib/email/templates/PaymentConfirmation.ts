import { getBaseTemplate } from "./base";

export function getPaymentConfirmationEmail(
  parentName: string,
  amount: number,
  feeType: string,
  status: string,
  reference: string
) {
  const content = `
    <h2 style="color: #1e293b; font-size: 24px; margin-bottom: 20px;">Confirmation de paiement</h2>
    
    <p style="color: #475569; font-size: 16px; line-height: 1.5; margin-bottom: 24px;">
      Bonjour <strong>${parentName}</strong>,
    </p>
    
    <p style="color: #475569; font-size: 16px; line-height: 1.5; margin-bottom: 24px;">
      Nous confirmons la réception de votre paiement. Voici les détails de la transaction :
    </p>

    <div style="background-color: #f8fafc; border-radius: 12px; padding: 24px; margin-bottom: 30px; border: 1px solid #e2e8f0;">
      <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-size: 14px;"><strong>Motif :</strong></td>
          <td style="padding: 8px 0; color: #1e293b; font-size: 15px; text-align: right;">${feeType}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-size: 14px; border-top: 1px solid #e2e8f0;"><strong>Montant reçu :</strong></td>
          <td style="padding: 8px 0; color: #1e293b; font-size: 15px; text-align: right; border-top: 1px solid #e2e8f0;"><strong>${amount.toLocaleString()} MGA</strong></td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-size: 14px; border-top: 1px solid #e2e8f0;"><strong>Référence :</strong></td>
          <td style="padding: 8px 0; color: #1e293b; font-size: 15px; text-align: right; border-top: 1px solid #e2e8f0;">${reference || 'N/A'}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-size: 14px; border-top: 1px solid #e2e8f0;"><strong>Statut actuel :</strong></td>
          <td style="padding: 8px 0; color: #1e293b; font-size: 15px; text-align: right; border-top: 1px solid #e2e8f0;">
             <span style="background-color: #dcfce7; color: #166534; padding: 4px 10px; border-radius: 20px; font-size: 12px; font-weight: bold;">
                ${status}
             </span>
          </td>
        </tr>
      </table>
    </div>

    <p style="color: #475569; font-size: 16px; line-height: 1.5;">
       Vous pouvez consulter l'historique complet de vos paiements directement depuis votre espace parent sur Skolara.
    </p>
  `;

  return getBaseTemplate({ title: "Confirmation de votre paiement", content });
}
