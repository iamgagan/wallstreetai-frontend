/*
  Warnings:

  - A unique constraint covering the columns `[resumeId]` on the table `ResumeFile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `ResumeFile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Resume" DROP CONSTRAINT "Resume_resumeFileId_fkey";

-- AlterTable
ALTER TABLE "ResumeFile" ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "resumeId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ResumeFile_resumeId_key" ON "ResumeFile"("resumeId");

-- AddForeignKey
ALTER TABLE "ResumeFile" ADD CONSTRAINT "ResumeFile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
