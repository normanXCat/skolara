import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import authRepository from "./auth.repository";
import { LoginInput } from "./auth.schema";
import { env } from "../../config/env";

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
export class AuthService {
    private readonly BCRYPT_ROUNDS = 12;

    /**
     * Authentifie un utilisateur avec email + mot de passe.
     * Retourne un access token et un refresh token.
     *
     * @throws {AppError} 401 si credentials invalides ou compte désactivé
     */
    async login(
        input: LoginInput,
    ): Promise<{ accessToken: string; refreshToken: string; user: SafeUser }> {
        // 1. Rechercher l'utilisateur (normalisation de l'email)
        const user = await authRepository.findUserByEmail(
            input.email.toLowerCase(),
        );

        if (!user) {
            throw {
                status: 401,
                message: "Email ou mot de passe incorrect",
            };
        }

        // 2. Vérifier le mot de passe
        const isPasswordValid = await bcrypt.compare(
            input.password,
            user.passwordHash,
        );

        if (!isPasswordValid) {
            throw {
                status: 401,
                message: "Email ou mot de passe incorrect",
            };
        }

        // 3. Vérifier que le compte est actif
        if (!user.active) {
            throw {
                status: 403,
                message:
                    "Ce compte a été désactivé. Contactez l'administration.",
            };
        }

        // 4. Générer les tokens
        const accessToken = this.generateAccessToken(user);
        const refreshToken = await this.generateRefreshToken(user.id);

        // 5. Retourner les données
        return {
            accessToken,
            refreshToken,
            user: this.toSafeUser(user),
        };
    }

    /**
     * Rafraîchit l'access token à partir d'un refresh token valide.
     * Applique la rotation : l'ancien token est révoqué, un nouveau est émis.
     *
     * @throws {AppError} 401 si le refresh token est invalide, expiré ou révoqué
     */
    async refresh(
        currentRefreshToken: string,
    ): Promise<{ accessToken: string; refreshToken: string }> {
        // 1. Vérifier le token existant
        const existing =
            await authRepository.findValidRefreshToken(currentRefreshToken);

        if (!existing) {
            throw {
                status: 401,
                message: "Token de rafraîchissement invalide ou expiré",
            };
        }

        // 2. Vérifier que le compte est toujours actif
        if (!existing.user.active) {
            await authRepository.revokeAllUserRefreshTokens(existing.userId);
            throw {
                status: 403,
                message: "Ce compte a été désactivé",
            };
        }

        // 3. Rotation : révoquer l'ancien, créer un nouveau
        await authRepository.revokeRefreshToken(currentRefreshToken);
        const newRefreshToken = await this.generateRefreshToken(
            existing.userId,
        );

        // 4. Nouvel access token
        const accessToken = this.generateAccessToken({
            id: existing.userId,
            email: existing.user.email,
            role: existing.user.role,
        });

        return { accessToken, refreshToken: newRefreshToken };
    }

    /**
     * Révoque le refresh token (déconnexion).
     */
    async logout(refreshToken: string): Promise<void> {
        await authRepository.revokeRefreshToken(refreshToken);
    }

    /**
     * Récupère le profil de l'utilisateur authentifié.
     *
     * @throws {AppError} 401 si l'utilisateur n'existe pas
     */
    async getProfile(userId: number): Promise<SafeUser> {
        const user = await authRepository.findUserById(userId);

        if (!user) {
            throw {
                status: 401,
                message: "Utilisateur non trouvé",
            };
        }

        return this.toSafeUser(user);
    }

    /**
     * Génère un Access Token JWT signé.
     */
    private generateAccessToken(user: {
        id: number;
        email: string;
        role: string;
    }): string {
        const payload: JwtPayload = {
            userId: user.id,
            email: user.email,
            role: user.role,
        };

        return jwt.sign(payload, env.JWT_SECRET, {
            expiresIn: env.JWT_EXPIRES_IN as any,
        });
    }

    /**
     * Génère un Refresh Token UUID et le persiste en base.
     */
    private async generateRefreshToken(userId: number): Promise<string> {
        const token = uuidv4();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + env.REFRESH_TOKEN_EXPIRES_DAYS);

        await authRepository.createRefreshToken({
            token,
            userId,
            expiresAt,
        });

        return token;
    }

    /**
     * Transforme un User Prisma en objet sûr (sans mot de passe).
     */
    private toSafeUser(user: any): SafeUser {
        return {
            id: user.id,
            firstName: user.firstName,
            name: user.name,
            email: user.email,
            role: user.role,
            active: user.active,
            createdAt: user.createdAt,
        };
    }

    /**
     * Hash un mot de passe avec bcrypt (utilisé pour le seed/création).
     */
    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, this.BCRYPT_ROUNDS);
    }
}

export default new AuthService();
