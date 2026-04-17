import express from "express";
import cors from "cors";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./config/swagger";
import { errorHandler } from "./middlewares/errorHandler";
import preRegistrationRoutes from "./modules/pre-registration/pre-registration.routes";
import { env } from "./config/env";

/**
 * Application Express principale.
 * Configure les middlewares globaux, les routes et la documentation Swagger.
 */
const app = express();

/* ─── Middlewares globaux ─── */
app.use(helmet());
app.use(
    cors({
        origin: env.FRONTEND_URL,
        credentials: true,
    }),
);
app.use(express.json());

/* ─── Documentation Swagger ─── */
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* ─── Routes API ─── */
app.use("/api/pre-registrations", preRegistrationRoutes);

/* ─── Route de santé ─── */
app.get("/api/health", (_req, res) => {
    res.json({ success: true, message: "API Skolara opérationnelle" });
});

/* ─── Gestion globale des erreurs ─── */
app.use(errorHandler);

export default app;
