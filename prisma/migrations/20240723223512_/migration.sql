-- AlterTable
ALTER TABLE "Education" ADD COLUMN     "currentlyStudyingHere" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "WorkExperience" ALTER COLUMN "currentlyWorkingHere" SET DEFAULT false;
