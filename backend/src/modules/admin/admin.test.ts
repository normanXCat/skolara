import request from "supertest";
import app from "../../app";

/**
 * Tests d'intégration pour le module d'administration.
 */
describe("Admin Module", () => {
    let adminToken: string;
    let studentId: number;
    let preRegId: number;

    beforeAll(async () => {
        // Connexion en tant qu'administrateur pour obtenir le token
        const res = await request(app).post("/api/auth/login").send({
            email: "admin@skolara.com",
            password: "Admin123!",
        });
        adminToken = res.body.data.accessToken;
    });

    // ── 1. STATISTIQUES ─────────────────────────────────
    describe("GET /api/admin/stats", () => {
        it("✅ devrait retourner les KPI du dashboard", async () => {
            const res = await request(app)
                .get("/api/admin/stats")
                .set("Authorization", `Bearer ${adminToken}`);

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.data).toHaveProperty("totalStudents");
            expect(res.body.data).toHaveProperty("pendingPayments");
            expect(res.body.data).toHaveProperty("enrollmentEvolution");
        });

        it("❌ devrait refuser l'accès sans token", async () => {
            const res = await request(app).get("/api/admin/stats");
            expect(res.status).toBe(401);
        });
    });

    // ── 2. GESTION DES ÉLÈVES ────────────────────────────
    describe("Students Flow", () => {
        it("✅ devrait créer un nouvel élève manuellement", async () => {
            const res = await request(app)
                .post("/api/admin/students")
                .set("Authorization", `Bearer ${adminToken}`)
                .send({
                    firstName: "Hiro",
                    lastName: "Teheiura",
                    birthDate: "2016-08-12",
                    address: "Punaauia, PK 12",
                    schoolYear: "2024-2025",
                    parentName: "Mama Teheiura",
                    parentEmail: "mama.tehei@mail.pf",
                    parentPhone: "87001122",
                });

            expect(res.status).toBe(201);
            expect(res.body.data).toHaveProperty("id");
            expect(res.body.data.user.firstName).toBe("Hiro");
            studentId = res.body.data.id;
        });

        it("✅ devrait lister les élèves avec pagination", async () => {
            const res = await request(app)
                .get("/api/admin/students")
                .set("Authorization", `Bearer ${adminToken}`);

            expect(res.status).toBe(200);
            expect(res.body.data.students).toBeInstanceOf(Array);
            expect(res.body.data.pagination.total).toBeGreaterThanOrEqual(1);
        });

        it("✅ devrait récupérer le détail d'un élève", async () => {
            const res = await request(app)
                .get(`/api/admin/students/${studentId}`)
                .set("Authorization", `Bearer ${adminToken}`);

            expect(res.status).toBe(200);
            expect(res.body.data.id).toBe(studentId);
        });

        it("✅ devrait pouvoir archiver un élève", async () => {
            const res = await request(app)
                .patch(`/api/admin/students/${studentId}/status`)
                .set("Authorization", `Bearer ${adminToken}`)
                .send({ status: "ARCHIVED" });

            expect(res.status).toBe(200);
            expect(res.body.data.status).toBe("ARCHIVED");
        });
    });

    // ── 3. PRÉ-INSCRIPTIONS ─────────────────────────────
    describe("Pre-Registration Flow", () => {
        it("✅ devrait récupérer la liste des pré-inscriptions", async () => {
            const res = await request(app)
                .get("/api/admin/pre-registrations")
                .set("Authorization", `Bearer ${adminToken}`);

            expect(res.status).toBe(200);
            expect(res.body.data.data).toBeInstanceOf(Array);

            if (res.body.data.data.length > 0) {
                preRegId = res.body.data.data[0].id;
            }
        });

        it("✅ devrait pouvoir mettre à jour le statut d'un dossier", async () => {
            if (!preRegId) return;

            const res = await request(app)
                .patch(`/api/admin/pre-registrations/${preRegId}/status`)
                .set("Authorization", `Bearer ${adminToken}`)
                .send({ status: "PROCESSING" });

            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
        });
    });
});
