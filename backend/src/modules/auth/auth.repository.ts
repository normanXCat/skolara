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
