"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const client_1 = require("../../prisma/client");
/**
 * Repository pour les opérations d'authentification sur la base de données.
 * Gère les utilisateurs et les tokens de rafraîchissement.
 */
class AuthRepository {
    /**
     * Recherche un utilisateur par son adresse email.
     */
    async findUserByEmail(email) {
        return client_1.prisma.user.findUnique({
            where: { email },
        });
    }
    /**
     * Recherche un utilisateur par son identifiant.
     */
    async findUserById(id) {
        return client_1.prisma.user.findUnique({
            where: { id },
        });
    }
    /**
     * Crée un nouveau token de rafraîchissement.
     */
    async createRefreshToken(data) {
        return client_1.prisma.refreshToken.create({
            data,
        });
    }
    /**
     * Recherche un token de rafraîchissement valide (non révoqué, non expiré).
     */
    async findValidRefreshToken(token) {
        return client_1.prisma.refreshToken.findFirst({
            where: {
                token,
                revoked: false,
                expiresAt: { gt: new Date() },
            },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                        active: true,
                    },
                },
            },
        });
    }
    /**
     * Révoque un token de rafraîchissement spécifique.
     */
    async revokeRefreshToken(token) {
        await client_1.prisma.refreshToken.updateMany({
            where: { token },
            data: { revoked: true },
        });
    }
    /**
     * Révoque tous les tokens de rafraîchissement d'un utilisateur.
     */
    async revokeAllUserRefreshTokens(userId) {
        await client_1.prisma.refreshToken.updateMany({
            where: { userId, revoked: false },
            data: { revoked: true },
        });
    }
    /**
     * Recherche un token récemment révoqué (grace period pour race conditions).
     * Si le token existe en base avec revoked=true, et qu'un nouveau token
     * a été créé récemment pour cet utilisateur, c'est une race condition.
     */
    async findRecentlyRevokedToken(token) {
        // 1. On cherche d'abord le token révoqué
        const found = await client_1.prisma.refreshToken.findFirst({
            where: {
                token,
                revoked: true,
            },
            select: {
                userId: true,
            },
        });
        if (!found)
            return null;
        // 2. On vérifie si un token de remplacement a été créé récemment (< 60s)
        const sixtySecondsAgo = new Date(Date.now() - 60000);
        const hasRecentReplacement = await client_1.prisma.refreshToken.findFirst({
            where: {
                userId: found.userId,
                revoked: false,
                createdAt: { gte: sixtySecondsAgo },
            },
        });
        if (!hasRecentReplacement)
            return null;
        return { userId: found.userId };
    }
    /**
     * Recherche le token valide le plus récent pour un utilisateur donné.
     * Utilisé pour récupérer le token de remplacement après une rotation.
     */
    async findLatestValidTokenForUser(userId) {
        return client_1.prisma.refreshToken.findFirst({
            where: {
                userId,
                revoked: false,
                expiresAt: { gt: new Date() },
            },
            orderBy: { createdAt: "desc" },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                        active: true,
                    },
                },
            },
        });
    }
    /**
     * Supprime les tokens expirés (nettoyage périodique).
     */
    async deleteExpiredTokens() {
        const result = await client_1.prisma.refreshToken.deleteMany({
            where: {
                OR: [{ expiresAt: { lt: new Date() } }, { revoked: true }],
            },
        });
        return result.count;
    }
}
exports.AuthRepository = AuthRepository;
exports.default = new AuthRepository();
//# sourceMappingURL=auth.repository.js.map