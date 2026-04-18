/**
 * Variables d'environnement validées et typées.
 * Lance une erreur au démarrage si une variable est manquante ou invalide.
 */
export declare const env: {
    DATABASE_URL: string;
    PORT: number;
    NODE_ENV: "development" | "production" | "test";
    FRONTEND_URL: string;
    API_URL: string;
    JWT_SECRET: string;
    JWT_REFRESH_SECRET: string;
    JWT_EXPIRES_IN: string;
    REFRESH_TOKEN_EXPIRES_DAYS: number;
};
//# sourceMappingURL=env.d.ts.map