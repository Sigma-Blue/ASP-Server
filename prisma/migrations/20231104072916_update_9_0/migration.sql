/*
  Warnings:

  - The values [APPLICATION] on the enum `extType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `About` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "extType_new" AS ENUM ('PDF', 'ZIP');
ALTER TABLE "Document" ALTER COLUMN "docExtention" TYPE "extType_new" USING ("docExtention"::text::"extType_new");
ALTER TYPE "extType" RENAME TO "extType_old";
ALTER TYPE "extType_new" RENAME TO "extType";
DROP TYPE "extType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "About" DROP CONSTRAINT "About_postId_fkey";

-- DropForeignKey
ALTER TABLE "About" DROP CONSTRAINT "About_profileId_fkey";

-- AlterTable
ALTER TABLE "Course" ALTER COLUMN "startDate" SET DATA TYPE TEXT,
ALTER COLUMN "endDate" SET DATA TYPE TEXT,
ALTER COLUMN "isRemote" SET DEFAULT false;

-- DropTable
DROP TABLE "About";

-- CreateTable
CREATE TABLE "Work" (
    "id" TEXT NOT NULL,
    "workDesignation" TEXT NOT NULL,
    "courseDescription" TEXT NOT NULL,
    "startDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,
    "timePeriod" INTEGER NOT NULL,
    "organizationName" TEXT NOT NULL,
    "organizationLocation" TEXT NOT NULL,
    "isRemote" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "Work_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" TEXT NOT NULL,
    "skillName" TEXT NOT NULL,
    "skillLink" TEXT NOT NULL,
    "skillRate" TEXT NOT NULL,
    "timePeriod" INTEGER NOT NULL,
    "organizationName" TEXT NOT NULL,
    "organizationLocation" TEXT NOT NULL,
    "isRemote" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostAbout" (
    "id" TEXT NOT NULL,
    "aboutDescription" TEXT NOT NULL DEFAULT E'NULL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "PostAbout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileAbout" (
    "id" TEXT NOT NULL,
    "aboutDescription" TEXT NOT NULL DEFAULT E'NULL',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "profileId" TEXT NOT NULL,

    CONSTRAINT "ProfileAbout_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PostAbout_postId_key" ON "PostAbout"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfileAbout_profileId_key" ON "ProfileAbout"("profileId");

-- AddForeignKey
ALTER TABLE "Work" ADD CONSTRAINT "Work_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skill" ADD CONSTRAINT "Skill_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostAbout" ADD CONSTRAINT "PostAbout_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfileAbout" ADD CONSTRAINT "ProfileAbout_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
