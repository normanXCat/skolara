import request from "supertest";
import app from "../../app";
import { prisma } from "../../prisma/client";

describe("Grades API", () => {
    beforeAll(async () => {
        // Nettoyer et peupler la base de test
        await prisma.grade.deleteMany();
        await prisma.grade.createMany({
            data: [
                { value: "test-grade-1", label: "Test Grade 1" },
                { value: "test-grade-2", label: "Test Grade 2" },
            ],
        });
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    describe("GET /api/grades", () => {
        it("should return all grades", async () => {
            const response = await request(app).get("/api/grades");

            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.data.length).toBeGreaterThanOrEqual(2);
            expect(response.body.data).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ value: "test-grade-1" }),
                    expect.objectContaining({ value: "test-grade-2" }),
                ]),
            );
        });
    });
});
