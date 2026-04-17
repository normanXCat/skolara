import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./config/swagger";
import path from "path";
import { errorHandler } from "./middlewares/errorHandler";
import preRegistrationRoutes from "./modules/pre-registration/pre-registration.routes";
import uploadRoutes from "./modules/upload/upload.routes";
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
        origin: env.FRONTEND_URL,
        credentials: true,
    }),
);
app.use(express.json());

/* ─── Fichiers statiques (Uploads) ─── */
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

/* ─── Documentation Swagger ─── */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* ─── Routes API ─── */
app.use("/api/pre-registrations", preRegistrationRoutes);
app.use("/api/upload", uploadRoutes);

/* ─── Route de santé ─── */
app.get("/api/health", (_req: express.Request, res: express.Response) => {
    res.json({ success: true, message: "API Skolara opérationnelle" });
});

/* ─── Gestion globale des erreurs ─── */
app.use(errorHandler);

export default app;
