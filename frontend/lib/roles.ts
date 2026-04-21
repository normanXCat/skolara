/**
 * Traductions des rôles utilisateur.
 */
export const ROLE_TRANSLATIONS: Record<string, string> = {
    ADMIN: "Administrateur",
    TEACHER: "Enseignant",
    STUDENT: "Élève",
};

/**
 * Retourne la traduction d'un rôle, ou le rôle brut si aucune traduction n'existe.
 */
export function translateRole(role: string): string {
    return ROLE_TRANSLATIONS[role] || role;
}
