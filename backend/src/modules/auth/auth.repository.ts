import { prisma } from "../../prisma/client";
import { User, RefreshToken } from "../../generated/prisma";

/**
 * Repository pour les opérations d'authentification sur la base de données.
 * Gère les utilisateurs et les tokens de rafraîchissement.
 */
export class AuthRepository {
    /**
     * Recherche un utilisateur par son adresse email.
     */
    async findUserByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: { email },
        });
    }

    /**
     * Recherche un utilisateur par son identifiant.
     */
    async findUserById(id: number): Promise<User | null> {
        return prisma.user.findUnique({
            where: { id },
        });
    }

    /**
     * Crée un nouveau token de rafraîchissement.
     */
    async createRefreshToken(data: {
        token: string;
        userId: number;
        expiresAt: Date;
    }): Promise<RefreshToken> {
        return prisma.refreshToken.create({
            data,
        });
    }

    /**
     * Recherche un token de rafraîchissement valide (non révoqué, non expiré).
     */
    async findValidRefreshToken(token: string): Promise<
        | (RefreshToken & {
              user: Pick<User, "id" | "email" | "role" | "active">;
          })
        | null
    > {
        return prisma.refreshToken.findFirst({
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
    async revokeRefreshToken(token: string): Promise<void> {
        await prisma.refreshToken.updateMany({
            where: { token },
            data: { revoked: true },
        });
    }

    /**
     * Révoque tous les tokens de rafraîchissement d'un utilisateur.
     */
    async revokeAllUserRefreshTokens(userId: number): Promise<void> {
        await prisma.refreshToken.updateMany({
            where: { userId, revoked: false },
            data: { revoked: true },
        });
    }

    /**
     * Recherche un token récemment révoqué (grace period pour race conditions).
     * Si le token existe en base avec revoked=true, et qu'un nouveau token
     * a été créé récemment pour cet utilisateur, c'est une race condition.
     */
    async findRecentlyRevokedToken(
        token: string,
    ): Promise<{ userId: number } | null> {
        // 1. On cherche d'abord le token révoqué
        const found = await prisma.refreshToken.findFirst({
            where: {
                token,
                revoked: true,
            },
            select: {
                userId: true,
            },
        });

        if (!found) return null;

        // 2. On vérifie si un token de remplacement a été créé récemment (< 60s)
        const sixtySecondsAgo = new Date(Date.now() - 60_000);
        const hasRecentReplacement = await prisma.refreshToken.findFirst({
            where: {
                userId: found.userId,
                revoked: false,
                createdAt: { gte: sixtySecondsAgo },
            },
        });

        if (!hasRecentReplacement) return null;

        return { userId: found.userId };
    }

    /**
     * Recherche le token valide le plus récent pour un utilisateur donné.
     * Utilisé pour récupérer le token de remplacement après une rotation.
     */
    async findLatestValidTokenForUser(userId: number): Promise<
        | (RefreshToken & {
              user: Pick<User, "id" | "email" | "role" | "active">;
          })
        | null
    > {
        return prisma.refreshToken.findFirst({
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
     * Effectue une rotation atomique du token.
     * Révoque l'ancien et crée le nouveau dans une seule transaction.
     */
    async rotateToken(
        oldToken: string,
        newData: { token: string; userId: number; expiresAt: Date },
    ): Promise<RefreshToken> {
        return prisma.$transaction(async (tx) => {
            await tx.refreshToken.updateMany({
                where: { token: oldToken },
                data: { revoked: true },
            });

            return tx.refreshToken.create({
                data: newData,
            });
        });
    }

    /**
     * Supprime les tokens expirés (nettoyage périodique).
     */
    async deleteExpiredTokens(): Promise<number> {
        const result = await prisma.refreshToken.deleteMany({
            where: {
                OR: [{ expiresAt: { lt: new Date() } }, { revoked: true }],
            },
        });
        return result.count;
    }
}

export default new AuthRepository();
