import http from "http";
import app from "./app";
import { env } from "./config/env";
import { verifyEmailTransport } from "./lib/email/client";

/**
 * Point d'entrée du serveur.
 * Crée un serveur HTTP et démarre l'application Express sur le port configuré.
 */
const server = http.createServer(app);

server.on("error", (error: any) => {
    if (error.code === "EADDRINUSE") {
        console.error(
            `❌ Le port ${env.PORT} est déjà utilisé. Veuillez libérer le port ou changer PORT dans le fichier .env.prod`,
        );
        process.exit(1);
    }
    throw error;
});

server.listen(env.PORT, () => {
    console.log(`🚀 Serveur Skolara démarré sur http://localhost:${env.PORT}`);
    console.log(`📚 Swagger UI : http://localhost:${env.PORT}/api-docs`);
    
    // Vérifier la connexion SMTP au démarrage (non-bloquant)
    verifyEmailTransport();
});
