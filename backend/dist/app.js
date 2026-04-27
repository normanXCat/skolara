"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./config/env");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger");
const path_1 = __importDefault(require("path"));
const errorHandler_1 = require("./middlewares/errorHandler");
const pre_registration_routes_1 = __importDefault(require("./modules/pre-registration/pre-registration.routes"));
const grade_routes_1 = __importDefault(require("./modules/grade/grade.routes"));
const upload_routes_1 = __importDefault(require("./modules/upload/upload.routes"));
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const admin_routes_1 = __importDefault(require("./modules/admin/admin.routes"));
const teacher_routes_1 = __importDefault(require("./modules/teacher/teacher.routes"));
const student_routes_1 = __importDefault(require("./modules/student/student.routes"));
const parent_routes_1 = __importDefault(require("./modules/parent/parent.routes"));
const news_routes_1 = __importDefault(require("./modules/news/news.routes"));
const contact_routes_1 = __importDefault(require("./modules/contact/contact.routes"));
const calendar_routes_1 = __importDefault(require("./modules/calendar/calendar.routes"));
const messages_routes_1 = __importDefault(require("./modules/messages/messages.routes"));
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
    origin: (origin, callback) => {
        // Autoriser les requêtes sans origine (comme Bruno/Postman)
        // ou celles venant du FRONTEND_URL
        if (!origin ||
            origin === env_1.env.FRONTEND_URL ||
            origin.includes("localhost") ||
            origin.includes("127.0.0.1")) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
/* ─── Fichiers statiques (Uploads) ─── */
app.use("/uploads", express_1.default.static(path_1.default.join(process.cwd(), "uploads")));
/* ─── Documentation Swagger ─── */
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerDocument));
const notifications_routes_1 = __importDefault(require("./modules/notifications/notifications.routes"));
/* --- Routes API --- */
app.use("/api/auth", auth_routes_1.default);
app.use("/api/admin", admin_routes_1.default);
app.use("/api/teacher", teacher_routes_1.default);
app.use("/api/student", student_routes_1.default);
app.use("/api/parent", parent_routes_1.default);
app.use("/api/messages", messages_routes_1.default);
app.use("/api/notifications", notifications_routes_1.default);
app.use("/api/pre-registrations", pre_registration_routes_1.default);
app.use("/api/grades", grade_routes_1.default);
app.use("/api/upload", upload_routes_1.default);
app.use("/api/news", news_routes_1.default);
app.use("/api/contact", contact_routes_1.default);
app.use("/api/calendar", calendar_routes_1.default);
/* ─── Route de santé ─── */
app.get("/api/health", (_req, res) => {
    res.json({ success: true, message: "API Skolara opérationnelle" });
});
/* ─── Gestion globale des erreurs ─── */
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map