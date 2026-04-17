"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pre_registration_service_1 = require("./pre-registration.service");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
/* ═══════════════════════════════════════════════════════════════
   TESTS UNITAIRES – Service
   ═══════════════════════════════════════════════════════════════ */
/**
 * Objet factice simulant une pré-inscription complète.
 */
const mockRecord = {
    id: 1,
    childFirstName: "Amine",
    childLastName: "Benali",
    childDateOfBirth: new Date("2018-05-15"),
    gender: "M",
    desiredGrade: "CP",
    parentFirstName: "Karim",
    parentFullName: "Karim Benali",
    parentEmail: "karim@example.com",
    parentPhone: "+213555123456",
    fileNumber: "PRE-2024-001",
    documentUrls: [],
    status: "PENDING",
    submittedAt: new Date(),
    updatedAt: new Date(),
};
/**
 * Mock du repository pour les tests unitaires.
 */
const mockRepository = {
    create: jest.fn(),
    findMany: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};
const service = new pre_registration_service_1.PreRegistrationService(mockRepository);
describe("PreRegistrationService – Tests unitaires", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe("create()", () => {
        it("devrait créer une pré-inscription", async () => {
            mockRepository.create.mockResolvedValue(mockRecord);
            const result = await service.create({
                childFirstName: "Amine",
                childLastName: "Benali",
                childDateOfBirth: new Date("2018-05-15"),
                gender: "M",
                desiredGrade: "CP",
                parentFirstName: "Karim",
                parentFullName: "Karim Benali",
                parentEmail: "karim@example.com",
                parentPhone: "+213555123456",
                documentUrls: [],
            });
            expect(result).toEqual(mockRecord);
            expect(mockRepository.create).toHaveBeenCalledTimes(1);
        });
    });
    describe("findAll()", () => {
        it("devrait retourner une liste paginée", async () => {
            mockRepository.findMany.mockResolvedValue({
                data: [mockRecord],
                total: 1,
            });
            const result = await service.findAll({ page: 1, limit: 10 });
            expect(result.data).toHaveLength(1);
            expect(result.meta.total).toBe(1);
            expect(result.meta.totalPages).toBe(1);
        });
        it("devrait filtrer par statut", async () => {
            mockRepository.findMany.mockResolvedValue({ data: [], total: 0 });
            await service.findAll({ page: 1, limit: 10, status: "ACCEPTED" });
            expect(mockRepository.findMany).toHaveBeenCalledWith(1, 10, "ACCEPTED");
        });
    });
    describe("findById()", () => {
        it("devrait retourner une pré-inscription existante", async () => {
            mockRepository.findById.mockResolvedValue(mockRecord);
            const result = await service.findById(1);
            expect(result).toEqual(mockRecord);
        });
        it("devrait lancer une erreur 404 si non trouvée", async () => {
            mockRepository.findById.mockResolvedValue(null);
            await expect(service.findById(999)).rejects.toThrow("Pré-inscription non trouvée");
        });
    });
    describe("update()", () => {
        it("devrait mettre à jour le statut", async () => {
            const updated = { ...mockRecord, status: "ACCEPTED" };
            mockRepository.findById.mockResolvedValue(mockRecord);
            mockRepository.update.mockResolvedValue(updated);
            const result = await service.update(1, { status: "ACCEPTED" });
            expect(result.status).toBe("ACCEPTED");
        });
        it("devrait lancer une erreur 404 si la ressource n'existe pas", async () => {
            mockRepository.findById.mockResolvedValue(null);
            await expect(service.update(999, { status: "ACCEPTED" })).rejects.toThrow("Pré-inscription non trouvée");
        });
    });
    describe("delete()", () => {
        it("devrait supprimer une pré-inscription existante", async () => {
            mockRepository.findById.mockResolvedValue(mockRecord);
            mockRepository.delete.mockResolvedValue(mockRecord);
            const result = await service.delete(1);
            expect(result).toEqual(mockRecord);
        });
        it("devrait lancer une erreur 404 si non trouvée", async () => {
            mockRepository.findById.mockResolvedValue(null);
            await expect(service.delete(999)).rejects.toThrow("Pré-inscription non trouvée");
        });
    });
});
/* ═══════════════════════════════════════════════════════════════
   TESTS D'INTÉGRATION – Routes (avec mock Prisma)
   ═══════════════════════════════════════════════════════════════ */
/**
 * Mock du module Prisma client pour isoler les tests d'intégration
 * de la base de données réelle.
 */
jest.mock("../../prisma/client", () => ({
    prisma: {
        preRegistration: {
            create: jest.fn(),
            findMany: jest.fn(),
            count: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
        },
    },
}));
const client_1 = require("../../prisma/client");
const prismaMock = client_1.prisma.preRegistration;
describe("PreRegistration Routes – Tests d'intégration", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe("POST /api/pre-registrations", () => {
        const validBody = {
            childFirstName: "Amine",
            childLastName: "Benali",
            childDateOfBirth: "2018-05-15T00:00:00.000Z",
            gender: "M",
            desiredGrade: "CP",
            parentFirstName: "Karim",
            parentFullName: "Karim Benali",
            parentEmail: "karim@example.com",
            parentPhone: "+213555123456",
            documentUrls: [],
        };
        it("devrait créer une pré-inscription (201)", async () => {
            prismaMock.create.mockResolvedValue({ id: 1, ...validBody });
            const res = await (0, supertest_1.default)(app_1.default)
                .post("/api/pre-registrations")
                .send(validBody);
            expect(res.status).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.data.childFirstName).toBe("Amine");
        });
        it("devrait rejeter un body invalide (400)", async () => {
            const res = await (0, supertest_1.default)(app_1.default)
                .post("/api/pre-registrations")
                .send({ childFirstName: "" });
            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
        });
    });
    describe("GET /api/pre-registrations", () => {
        it("devrait retourner la liste paginée (200)", async () => {
            prismaMock.findMany.mockResolvedValue([mockRecord]);
            prismaMock.count.mockResolvedValue(1);
            const res = await (0, supertest_1.default)(app_1.default).get("/api/pre-registrations");
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);
            expect(res.body.meta).toBeDefined();
        });
        it("devrait accepter un filtre par statut valide", async () => {
            prismaMock.findMany.mockResolvedValue([]);
            prismaMock.count.mockResolvedValue(0);
            const res = await (0, supertest_1.default)(app_1.default).get("/api/pre-registrations?status=ACCEPTED");
            expect(res.status).toBe(200);
        });
    });
    describe("GET /api/pre-registrations/:id", () => {
        it("devrait retourner le détail (200)", async () => {
            prismaMock.findUnique.mockResolvedValue(mockRecord);
            const res = await (0, supertest_1.default)(app_1.default).get("/api/pre-registrations/1");
            expect(res.status).toBe(200);
            expect(res.body.data.id).toBe(1);
        });
        it("devrait retourner 404 si non trouvée", async () => {
            prismaMock.findUnique.mockResolvedValue(null);
            const res = await (0, supertest_1.default)(app_1.default).get("/api/pre-registrations/999");
            expect(res.status).toBe(404);
            expect(res.body.success).toBe(false);
        });
    });
    describe("PATCH /api/pre-registrations/:id", () => {
        it("devrait mettre à jour le statut (200)", async () => {
            const updated = { ...mockRecord, status: "ACCEPTED" };
            prismaMock.findUnique.mockResolvedValue(mockRecord);
            prismaMock.update.mockResolvedValue(updated);
            const res = await (0, supertest_1.default)(app_1.default)
                .patch("/api/pre-registrations/1")
                .send({ status: "ACCEPTED" });
            expect(res.status).toBe(200);
            expect(res.body.data.status).toBe("ACCEPTED");
        });
        it("devrait rejeter un statut invalide (400)", async () => {
            const res = await (0, supertest_1.default)(app_1.default)
                .patch("/api/pre-registrations/1")
                .send({ status: "INVALID" });
            expect(res.status).toBe(400);
        });
    });
    describe("DELETE /api/pre-registrations/:id", () => {
        it("devrait supprimer une pré-inscription (200)", async () => {
            prismaMock.findUnique.mockResolvedValue(mockRecord);
            prismaMock.delete.mockResolvedValue(mockRecord);
            const res = await (0, supertest_1.default)(app_1.default).delete("/api/pre-registrations/1");
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
        });
        it("devrait retourner 404 si non trouvée", async () => {
            prismaMock.findUnique.mockResolvedValue(null);
            const res = await (0, supertest_1.default)(app_1.default).delete("/api/pre-registrations/999");
            expect(res.status).toBe(404);
        });
    });
});
//# sourceMappingURL=pre-registration.test.js.map