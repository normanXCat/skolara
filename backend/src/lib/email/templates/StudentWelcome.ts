import { getBaseTemplate } from './base';

interface StudentWelcomeEmailOptions {
    firstName: string;
    email: string;
    password?: string;
}

/**
 * Template d'email de bienvenue pour les élèves.
 */
export function StudentWelcomeEmail({ firstName, email, password }: StudentWelcomeEmailOptions): string {
    const loginUrl = `${process.env.FRONTEND_URL}/login`;
    
    const content = `
        <h2 style="margin-top: 0; color: #1e293b; font-size: 20px;">Bienvenue sur Skolara, ${firstName} !</h2>
        <p>Salut <strong>${firstName}</strong> 👋,</p>
        <p>Ton compte élève Skolara est maintenant activé. Tu vas pouvoir consulter ton emploi du temps, tes notes et tes cours directement en ligne.</p>
        
        <div style="background-color: #f1f5f9; border-radius: 12px; padding: 20px; margin: 25px 0;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #64748b; text-transform: uppercase; font-weight: bold; letter-spacing: 0.05em;">Tes identifiants</p>
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
            <a href="${loginUrl}" class="btn">Me connecter</a>
        </p>
        
        <p style="font-size: 14px;">Bonne rentrée et beaucoup de succès dans tes études !</p>
    `;

    return getBaseTemplate({
        title: "Ton compte Skolara est prêt !",
        preheader: `Salut ${firstName}, connecte-toi dès maintenant avec : ${email}`,
        content
    });
}
