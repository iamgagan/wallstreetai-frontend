/*
  Warnings:

  - You are about to drop the column `file` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `fileName` on the `Resume` table. All the data in the column will be lost.
  - You are about to drop the column `fileType` on the `Resume` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[resumeFileId]` on the table `Resume` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Resume" DROP CONSTRAINT "Resume_personalInfoId_fkey";

-- DropIndex
DROP INDEX "Resume_fileName_key";

-- DropIndex
DROP INDEX "Resume_fileType_key";

-- DropIndex
DROP INDEX "Resume_file_key";

-- AlterTable
ALTER TABLE "Resume" DROP COLUMN "file",
DROP COLUMN "fileName",
DROP COLUMN "fileType",
ADD COLUMN     "resumeFileId" TEXT,
ALTER COLUMN "personalInfoId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "ResumeFile" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "file" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResumeFile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Resume_resumeFileId_key" ON "Resume"("resumeFileId");

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_resumeFileId_fkey" FOREIGN KEY ("resumeFileId") REFERENCES "ResumeFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_personalInfoId_fkey" FOREIGN KEY ("personalInfoId") REFERENCES "PersonalInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
