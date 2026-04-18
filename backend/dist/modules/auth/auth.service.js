"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const uuid_1 = require("uuid");
const auth_repository_1 = __importDefault(require("./auth.repository"));
const env_1 = require("../../config/env");
/**
 * Service d'authentification.
 * Gère la logique métier : login, refresh, logout, profil.
 */
class AuthService {
    constructor() {
        this.BCRYPT_ROUNDS = 12;
    }
    /**
     * Authentifie un utilisateur avec email + mot de passe.
     * Retourne un access token et un refresh token.
     *
     * @throws {AppError} 401 si credentials invalides ou compte désactivé
     */
    async login(input) {
        // 1. Rechercher l'utilisateur (normalisation de l'email)
        const user = await auth_repository_1.default.findUserByEmail(input.email.toLowerCase());
        if (!user) {
            throw {
                status: 401,
                message: "Email ou mot de passe incorrect",
            };
        }
        // 2. Vérifier le mot de passe
        const isPasswordValid = await bcrypt_1.default.compare(input.password, user.passwordHash);
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
                message: "Ce compte a été désactivé. Contactez l'administration.",
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
    async refresh(currentRefreshToken) {
        // 1. Vérifier le token existant
        const existing = await auth_repository_1.default.findValidRefreshToken(currentRefreshToken);
        if (!existing) {
            throw {
                status: 401,
                message: "Token de rafraîchissement invalide ou expiré",
            };
        }
        // 2. Vérifier que le compte est toujours actif
        if (!existing.user.active) {
            await auth_repository_1.default.revokeAllUserRefreshTokens(existing.userId);
            throw {
                status: 403,
                message: "Ce compte a été désactivé",
            };
        }
        // 3. Rotation : révoquer l'ancien, créer un nouveau
        await auth_repository_1.default.revokeRefreshToken(currentRefreshToken);
        const newRefreshToken = await this.generateRefreshToken(existing.userId);
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
    async logout(refreshToken) {
        await auth_repository_1.default.revokeRefreshToken(refreshToken);
    }
    /**
     * Récupère le profil de l'utilisateur authentifié.
     *
     * @throws {AppError} 401 si l'utilisateur n'existe pas
     */
    async getProfile(userId) {
        const user = await auth_repository_1.default.findUserById(userId);
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
    generateAccessToken(user) {
        const payload = {
            userId: user.id,
            email: user.email,
            role: user.role,
        };
        return jsonwebtoken_1.default.sign(payload, env_1.env.JWT_SECRET, {
            expiresIn: env_1.env.JWT_EXPIRES_IN,
        });
    }
    /**
     * Génère un Refresh Token UUID et le persiste en base.
     */
    async generateRefreshToken(userId) {
        const token = (0, uuid_1.v4)();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + env_1.env.REFRESH_TOKEN_EXPIRES_DAYS);
        await auth_repository_1.default.createRefreshToken({
            token,
            userId,
            expiresAt,
        });
        return token;
    }
    /**
     * Transforme un User Prisma en objet sûr (sans mot de passe).
     */
    toSafeUser(user) {
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
    async hashPassword(password) {
        return bcrypt_1.default.hash(password, this.BCRYPT_ROUNDS);
    }
}
exports.AuthService = AuthService;
exports.default = new AuthService();
//# sourceMappingURL=auth.service.js.map