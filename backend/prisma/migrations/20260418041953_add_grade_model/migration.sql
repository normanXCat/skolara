/*
  Warnings:

  - You are about to drop the column `targetSchoolYear` on the `PreRegistration` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PreRegistration" DROP COLUMN "targetSchoolYear";

-- CreateTable
CREATE TABLE "Grade" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,

    CONSTRAINT "Grade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Grade_value_key" ON "Grade"("value");
