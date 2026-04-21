import type { NextConfig } from "next";

// On récupère l'adresse réelle du backend (local ou prod)
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

// Extraction sécurisée pour images.remotePatterns
let backendHost = "localhost";
let backendProtocol: "http" | "https" = "http";
let backendPort = "8000";

try {
    const url = new URL(BACKEND_URL);
    backendHost = url.hostname;
    backendProtocol = url.protocol.replace(":", "") as "http" | "https";
    // Si le port n'est pas précisé (ex: https://api.com), on laisse vide pour remotePatterns
    backendPort = url.port || (url.protocol === "https:" ? "" : "80");
} catch (e) {
    // Si BACKEND_URL est invalide, on ne plante pas mais on utilise les réglages par défaut
}

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: backendProtocol,
                hostname: backendHost,
                port: backendPort,
                pathname: "/uploads/**",
            },
            // On conserve explicitement localhost pour le développement local classique
            {
                protocol: "http",
                hostname: "localhost",
                port: "8000",
                pathname: "/uploads/**",
            },
            {
                protocol: "http",
                hostname: "127.0.0.1",
                port: "8000",
                pathname: "/uploads/**",
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: `${BACKEND_URL.replace(/\/$/, "")}/api/:path*`,
            },
        ];
    },
};

export default nextConfig;
