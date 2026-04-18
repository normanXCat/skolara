import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./config/swagger";
import path from "path";
import { errorHandler } from "./middlewares/errorHandler";
import preRegistrationRoutes from "./modules/pre-registration/pre-registration.routes";
import gradeRoutes from "./modules/grade/grade.routes";
import uploadRoutes from "./modules/upload/upload.routes";
import authRoutes from "./modules/auth/auth.routes";
import { env } from "./config/env";

/**
 * Application Express principale.
 * Configure les middlewares globaux, les routes et la documentation Swagger.
 */
const app = express();

/* ─── Middlewares globaux ─── */
app.use(
    helmet({
        crossOriginResourcePolicy: { policy: "cross-origin" },
    }),
);
app.use(
    cors({
        origin: (origin, callback) => {
            // Autoriser les requêtes sans origine (comme Bruno/Postman)
            // ou celles venant du FRONTEND_URL
            if (
                !origin ||
                origin === env.FRONTEND_URL ||
                origin.includes("localhost") ||
                origin.includes("127.0.0.1")
            ) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        preflightContinue: false,
        optionsSuccessStatus: 204,
    }),
);
app.use(express.json());
app.use(cookieParser());

/* ─── Fichiers statiques (Uploads) ─── */
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

/* ─── Documentation Swagger ─── */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* --- Routes API --- */
app.use("/api/auth", authRoutes);
app.use("/api/pre-registrations", preRegistrationRoutes);
app.use("/api/grades", gradeRoutes);
app.use("/api/upload", uploadRoutes);

/* ─── Route de santé ─── */
app.get("/api/health", (_req: express.Request, res: express.Response) => {
    res.json({ success: true, message: "API Skolara opérationnelle" });
});

/* ─── Gestion globale des erreurs ─── */
app.use(errorHandler);

export default app;
