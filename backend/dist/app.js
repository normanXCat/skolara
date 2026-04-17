"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger");
const path_1 = __importDefault(require("path"));
const errorHandler_1 = require("./middlewares/errorHandler");
const pre_registration_routes_1 = __importDefault(require("./modules/pre-registration/pre-registration.routes"));
const grade_routes_1 = __importDefault(require("./modules/grade/grade.routes"));
const upload_routes_1 = __importDefault(require("./modules/upload/upload.routes"));
const env_1 = require("./config/env");
/**
 * Application Express principale.
 * Configure les middlewares globaux, les routes et la documentation Swagger.
 */
const app = (0, express_1.default)();
/* ─── Middlewares globaux ─── */
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: { policy: "cross-origin" },
}));
app.use((0, cors_1.default)({
    origin: env_1.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express_1.default.json());
/* ─── Fichiers statiques (Uploads) ─── */
app.use("/uploads", express_1.default.static(path_1.default.join(process.cwd(), "uploads")));
/* ─── Documentation Swagger ─── */
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerDocument));
/* ─── Routes API ─── */
app.use("/api/pre-registrations", pre_registration_routes_1.default);
app.use("/api/grades", grade_routes_1.default);
app.use("/api/upload", upload_routes_1.default);
/* ─── Route de santé ─── */
app.get("/api/health", (_req, res) => {
    res.json({ success: true, message: "API Skolara opérationnelle" });
});
/* ─── Gestion globale des erreurs ─── */
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map