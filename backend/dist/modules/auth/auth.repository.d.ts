import { User, RefreshToken } from "../../generated/prisma";
/**
 * Repository pour les opérations d'authentification sur la base de données.
 * Gère les utilisateurs et les tokens de rafraîchissement.
 */
export declare class AuthRepository {
    /**
     * Recherche un utilisateur par son adresse email.
     */
    findUserByEmail(email: string): Promise<User | null>;
    /**
     * Recherche un utilisateur par son identifiant.
     */
    findUserById(id: number): Promise<User | null>;
    /**
     * Crée un nouveau token de rafraîchissement.
     */
    createRefreshToken(data: {
        token: string;
        userId: number;
        expiresAt: Date;
    }): Promise<RefreshToken>;
    /**
     * Recherche un token de rafraîchissement valide (non révoqué, non expiré).
     */
    findValidRefreshToken(token: string): Promise<(RefreshToken & {
        user: Pick<User, "id" | "email" | "role" | "active">;
    }) | null>;
    /**
     * Révoque un token de rafraîchissement spécifique.
     */
    revokeRefreshToken(token: string): Promise<void>;
    /**
     * Révoque tous les tokens de rafraîchissement d'un utilisateur.
     */
    revokeAllUserRefreshTokens(userId: number): Promise<void>;
    /**
     * Supprime les tokens expirés (nettoyage périodique).
     */
    deleteExpiredTokens(): Promise<number>;
}
declare const _default: AuthRepository;
export default _default;
//# sourceMappingURL=auth.repository.d.ts.map