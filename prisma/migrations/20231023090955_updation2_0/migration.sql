/*
  Warnings:

  - You are about to drop the column `postAbout` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `profileAbout` on the `About` table. All the data in the column will be lost.
  - You are about to drop the column `courseDescrpt` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `imageExtention` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `addressline1` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `addressline2` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `postalcode` on the `Location` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastLogin` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `UserFollowship` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[emailId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courseDescription` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageExtension` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressLine1` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressLine2` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `Location` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_userId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_userId_fkey";

-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserFollowship" DROP CONSTRAINT "UserFollowship_fromUserId_fkey";

-- DropForeignKey
ALTER TABLE "UserFollowship" DROP CONSTRAINT "UserFollowship_toUserId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- DropIndex
DROP INDEX "User_email_userName_idx";

-- DropIndex
DROP INDEX "User_userName_email_passwordHashed_key";

-- AlterTable
ALTER TABLE "About" DROP COLUMN "postAbout",
DROP COLUMN "profileAbout",
ADD COLUMN     "aboutDescription" TEXT NOT NULL DEFAULT E'NULL',
ALTER COLUMN "profileId" SET DEFAULT E'NULL',
ALTER COLUMN "postId" SET DEFAULT E'NULL';

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "courseDescrpt",
DROP COLUMN "userId",
ADD COLUMN     "courseDescription" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "imageExtention",
ADD COLUMN     "imageExtension" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Location" DROP COLUMN "addressline1",
DROP COLUMN "addressline2",
DROP COLUMN "postalcode",
ADD COLUMN     "addressLine1" TEXT NOT NULL,
ADD COLUMN     "addressLine2" TEXT NOT NULL,
ADD COLUMN     "postalCode" TEXT NOT NULL,
ALTER COLUMN "profileId" SET DEFAULT E'NULL',
ALTER COLUMN "userId" SET DEFAULT E'NULL';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "lastLogin",
ADD COLUMN     "emailId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "UserFollowship";

-- CreateTable
CREATE TABLE "UserFollows" (
    "id" TEXT NOT NULL,
    "isAccepted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,

    CONSTRAINT "UserFollows_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_emailId_key" ON "User"("emailId");

-- CreateIndex
CREATE INDEX "User_emailId_userName_idx" ON "User"("emailId", "userName");

-- AddForeignKey
ALTER TABLE "UserFollows" ADD CONSTRAINT "UserFollows_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFollows" ADD CONSTRAINT "UserFollows_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
