"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../app"));
const client_1 = require("../../prisma/client");
describe("Grades API", () => {
    beforeAll(async () => {
        // Nettoyer et peupler la base de test
        await client_1.prisma.grade.deleteMany();
        await client_1.prisma.grade.createMany({
            data: [
                { value: "test-grade-1", label: "Test Grade 1" },
                { value: "test-grade-2", label: "Test Grade 2" },
            ],
        });
    });
    afterAll(async () => {
        await client_1.prisma.$disconnect();
    });
    describe("GET /api/grades", () => {
        it("should return all grades", async () => {
            const response = await (0, supertest_1.default)(app_1.default).get("/api/grades");
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.data.length).toBeGreaterThanOrEqual(2);
            expect(response.body.data).toEqual(expect.arrayContaining([
                expect.objectContaining({ value: "test-grade-1" }),
                expect.objectContaining({ value: "test-grade-2" }),
            ]));
        });
    });
});
//# sourceMappingURL=grade.test.js.map