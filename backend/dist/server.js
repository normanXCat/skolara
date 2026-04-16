"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const env_1 = require("./config/env");
/**
 * Point d'entrée du serveur.
 * Crée un serveur HTTP et démarre l'application Express sur le port configuré.
 */
const server = http_1.default.createServer(app_1.default);
server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
        console.error(`❌ Le port ${env_1.env.PORT} est déjà utilisé. Veuillez libérer le port ou changer PORT dans le fichier .env`);
        process.exit(1);
    }
    throw error;
});
server.listen(env_1.env.PORT, () => {
    console.log(`🚀 Serveur Skolara démarré sur http://localhost:${env_1.env.PORT}`);
    console.log(`📚 Swagger UI : http://localhost:${env_1.env.PORT}/api-docs`);
});
//# sourceMappingURL=server.js.map