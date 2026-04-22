/**
 * Vérifie si une adresse email possède un domaine avec des enregistrements MX valides.
 *
 * @param email - L'adresse email à vérifier
 * @returns true si le domaine possède des serveurs de messagerie (ou en cas d'erreur DNS/timeout - fail open)
 */
export declare function checkMxRecord(email: string): Promise<boolean>;
//# sourceMappingURL=email-validation.d.ts.map