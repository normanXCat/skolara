import { LoginInput } from "./auth.schema";
/**
 * Payload contenu dans l'Access Token JWT.
 */
export interface JwtPayload {
    userId: number;
    email: string;
    role: string;
}
/**
 * Données utilisateur retournées par l'API (sans mot de passe).
 */
export interface SafeUser {
    id: number;
    firstName: string;
    name: string;
    email: string;
    role: string;
    active: boolean;
    createdAt: Date;
}
/**
 * Service d'authentification.
 * Gère la logique métier : login, refresh, logout, profil.
 */
export declare class AuthService {
    private readonly BCRYPT_ROUNDS;
    /**
     * Authentifie un utilisateur avec email + mot de passe.
     * Retourne un access token et un refresh token.
     *
     * @throws {AppError} 401 si credentials invalides ou compte désactivé
     */
    login(input: LoginInput): Promise<{
        accessToken: string;
        refreshToken: string;
        user: SafeUser;
    }>;
    /**
     * Rafraîchit l'access token à partir d'un refresh token valide.
     * Applique la rotation : l'ancien token est révoqué, un nouveau est émis.
     *
     * @throws {AppError} 401 si le refresh token est invalide, expiré ou révoqué
     */
    refresh(currentRefreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    /**
     * Révoque le refresh token (déconnexion).
     */
    logout(refreshToken: string): Promise<void>;
    /**
     * Récupère le profil de l'utilisateur authentifié.
     *
     * @throws {AppError} 401 si l'utilisateur n'existe pas
     */
    getProfile(userId: number): Promise<SafeUser>;
    /**
     * Génère un Access Token JWT signé.
     */
    private generateAccessToken;
    /**
     * Génère un Refresh Token UUID et le persiste en base.
     */
    private generateRefreshToken;
    /**
     * Transforme un User Prisma en objet sûr (sans mot de passe).
     */
    private toSafeUser;
    /**
     * Hash un mot de passe avec bcrypt (utilisé pour le seed/création).
     */
    hashPassword(password: string): Promise<string>;
}
declare const _default: AuthService;
export default _default;
//# sourceMappingURL=auth.service.d.ts.map