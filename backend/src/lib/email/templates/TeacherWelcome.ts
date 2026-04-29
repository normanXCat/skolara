import { getBaseTemplate } from './base';

interface TeacherWelcomeEmailOptions {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
}

/**
 * Template d'email de bienvenue pour les nouveaux enseignants.
 */
export function TeacherWelcomeEmail({ firstName, lastName, email, password }: TeacherWelcomeEmailOptions): string {
    const frontendUrl = (process.env.FRONTEND_URL || 'http://localhost:3000').replace(/^["'](.+)["']$/, '$1').trim();
    const loginUrl = `${frontendUrl}/login`;
    
    const content = `
        <h2 style="margin-top: 0; color: #1e293b; font-size: 20px;">Bienvenue dans l'équipe Skolara !</h2>
        <p>Bonjour 👋 <strong>${firstName} ${lastName}</strong>,</p>
        <p>Votre compte enseignant a été créé avec succès sur la plateforme Skolara. Vous pouvez désormais vous connecter pour gérer vos classes, vos notes et vos absences.</p>
        
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
            <a href="${loginUrl}" class="btn">Me connecter à Skolara</a>
        </p>
        
        <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 10px;">
            <p style="font-size: 13px; color: #64748b; font-style: italic;">
                Par mesure de sécurité, nous vous recommandons vivement de changer votre mot de passe dès votre première connexion dans vos paramètres de profil.
            </p>
        </div>
    `;

    return getBaseTemplate({
        title: "Bienvenue sur Skolara",
        preheader: `Votre compte enseignant Skolara est prêt. Connectez-vous avec : ${email}`,
        content
    });
}
