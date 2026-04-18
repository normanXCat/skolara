import request from "supertest";
import app from "../../app";

/**
 * Tests d'intégration pour le module d'authentification.
 *
 * Credentials de test :
 * - Admin : admin@skolara.com / Admin123!
 */
describe("Auth Module", () => {
    let accessToken: string;
    let refreshCookie: string;

    // ── LOGIN ──────────────────────────────────────────

    describe("POST /api/auth/login", () => {
        it("✅ devrait connecter un utilisateur avec des identifiants valides", async () => {
            const res = await request(app).post("/api/auth/login").send({
                email: "admin@skolara.com",
                password: "Admin123!",
            });

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.accessToken).toBeDefined();
            expect(res.body.data.user).toBeDefined();
            expect(res.body.data.user.email).toBe("admin@skolara.com");
            expect(res.body.data.user.role).toBe("ADMIN");
            // Le mot de passe ne doit JAMAIS apparaître
            expect(res.body.data.user.passwordHash).toBeUndefined();
            expect(res.body.data.user.password).toBeUndefined();

            // Le refresh token est dans un cookie HttpOnly
            const cookies = res.headers["set-cookie"];
            expect(cookies).toBeDefined();

            const cookieStr = Array.isArray(cookies)
                ? cookies.join("; ")
                : cookies;
            expect(cookieStr).toContain("refreshToken");
            expect(cookieStr).toContain("HttpOnly");

            // Stocker pour les prochains tests
            accessToken = res.body.data.accessToken;
            refreshCookie = cookieStr;
        });

        it("❌ devrait retourner 401 pour un mauvais mot de passe", async () => {
            const res = await request(app).post("/api/auth/login").send({
                email: "admin@skolara.com",
                password: "WrongPassword1",
            });

            expect(res.status).toBe(401);
            expect(res.body.success).toBe(false);
            // Message identique pour éviter l'énumération
            expect(res.body.error).toBe("Email ou mot de passe incorrect");
        });

        it("❌ devrait retourner 401 pour un email inexistant (même message)", async () => {
            const res = await request(app).post("/api/auth/login").send({
                email: "inexistant@skolara.com",
                password: "Admin123!",
            });

            expect(res.status).toBe(401);
            expect(res.body.success).toBe(false);
            expect(res.body.error).toBe("Email ou mot de passe incorrect");
        });

        it("❌ devrait retourner 400 pour des données invalides", async () => {
            const res = await request(app).post("/api/auth/login").send({
                email: "pas-un-email",
                password: "123",
            });

            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
        });
    });

    // ── ME ──────────────────────────────────────────────

    describe("GET /api/auth/me", () => {
        it("✅ devrait retourner le profil avec un access token valide", async () => {
            const res = await request(app)
                .get("/api/auth/me")
                .set("Authorization", `Bearer ${accessToken}`);

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.email).toBe("admin@skolara.com");
            expect(res.body.data.firstName).toBe("Admin");
            // Pas de mot de passe
            expect(res.body.data.passwordHash).toBeUndefined();
        });

        it("❌ devrait retourner 401 sans token", async () => {
            const res = await request(app).get("/api/auth/me");

            expect(res.status).toBe(401);
            expect(res.body.success).toBe(false);
        });

        it("❌ devrait retourner 401 avec un token invalide", async () => {
            const res = await request(app)
                .get("/api/auth/me")
                .set("Authorization", "Bearer invalid-token-here");

            expect(res.status).toBe(401);
            expect(res.body.success).toBe(false);
        });
    });

    // ── REFRESH ────────────────────────────────────────

    describe("POST /api/auth/refresh", () => {
        it("✅ devrait rafraîchir le token avec un cookie valide", async () => {
            const res = await request(app)
                .post("/api/auth/refresh")
                .set("Cookie", refreshCookie);

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data.accessToken).toBeDefined();

            // Nouveau cookie de rotation
            const cookies = res.headers["set-cookie"];
            expect(cookies).toBeDefined();

            // Mettre à jour pour le test de logout
            const cookieStr = Array.isArray(cookies)
                ? cookies.join("; ")
                : cookies;
            refreshCookie = cookieStr;
        });

        it("❌ devrait retourner 401 sans cookie refresh", async () => {
            const res = await request(app).post("/api/auth/refresh");

            expect(res.status).toBe(401);
            expect(res.body.success).toBe(false);
        });
    });

    // ── LOGOUT ─────────────────────────────────────────

    describe("POST /api/auth/logout", () => {
        it("✅ devrait déconnecter et supprimer le cookie", async () => {
            const res = await request(app)
                .post("/api/auth/logout")
                .set("Cookie", refreshCookie);

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe("Déconnexion réussie");

            // Le cookie doit être effacé
            const cookies = res.headers["set-cookie"];
            if (cookies) {
                const cookieStr = Array.isArray(cookies)
                    ? cookies.join("; ")
                    : cookies;
                expect(cookieStr).toContain("refreshToken=;");
            }
        });

        it("❌ devrait refuser le refresh après logout (token révoqué)", async () => {
            const res = await request(app)
                .post("/api/auth/refresh")
                .set("Cookie", refreshCookie);

            expect(res.status).toBe(401);
            expect(res.body.success).toBe(false);
        });
    });
});
