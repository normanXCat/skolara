/*
  Warnings:

  - A unique constraint covering the columns `[fileNumber]` on the table `PreRegistration` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[receiptNumber]` on the table `PreRegistration` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fileNumber` to the `PreRegistration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `PreRegistration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `parentFirstName` to the `PreRegistration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetSchoolYear` to the `PreRegistration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PreRegistration" ADD COLUMN     "adminComment" TEXT,
ADD COLUMN     "childEmail" TEXT,
ADD COLUMN     "fileNumber" TEXT NOT NULL,
ADD COLUMN     "gender" TEXT NOT NULL,
ADD COLUMN     "parentAddress" TEXT,
ADD COLUMN     "parentFirstName" TEXT NOT NULL,
ADD COLUMN     "previousSchool" TEXT,
ADD COLUMN     "processedAt" TIMESTAMP(3),
ADD COLUMN     "processedBy" INTEGER,
ADD COLUMN     "receiptImageUrl" TEXT,
ADD COLUMN     "receiptNumber" TEXT,
ADD COLUMN     "studentId" INTEGER,
ADD COLUMN     "targetSchoolYear" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PreRegistration_fileNumber_key" ON "PreRegistration"("fileNumber");

-- CreateIndex
CREATE UNIQUE INDEX "PreRegistration_receiptNumber_key" ON "PreRegistration"("receiptNumber");
