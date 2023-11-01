/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `docTitle` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `docValue` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `isPost` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Document` table. All the data in the column will be lost.
  - You are about to drop the column `imageExtension` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `imageValue` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `isBanner` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `isPost` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `isPost` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Link` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Post` table. All the data in the column will be lost.
  - The `postType` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `middleName` on the `Profile` table. All the data in the column will be lost.
  - The `userType` column on the `Profile` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `reactionType` on the `Reaction` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Reaction` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Save` table. All the data in the column will be lost.
  - Added the required column `docFilePath` to the `Document` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `docExtention` on the `Document` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `docType` on the `Document` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `imageFilePath` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `imageType` on the `Image` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `linkType` to the `Link` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Location` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "userType" AS ENUM ('USER', 'STUDENT', 'ALUMNI');

-- CreateEnum
CREATE TYPE "postType" AS ENUM ('GENERAL', 'JOB', 'INTERNSHIP', 'RESEARCH', 'PROJECT', 'BLOG');

-- CreateEnum
CREATE TYPE "imageType" AS ENUM ('PROFILE', 'BANNER', 'COVERPOST', 'POST');

-- CreateEnum
CREATE TYPE "extType" AS ENUM ('APPLICATION', 'ZIP');

-- CreateEnum
CREATE TYPE "docType" AS ENUM ('POST', 'PROFILE');

-- CreateEnum
CREATE TYPE "linkType" AS ENUM ('POST', 'PROFILE');

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "docTitle",
DROP COLUMN "docValue",
DROP COLUMN "isPost",
DROP COLUMN "updatedAt",
ADD COLUMN     "docFilePath" TEXT NOT NULL,
DROP COLUMN "docExtention",
ADD COLUMN     "docExtention" "extType" NOT NULL,
DROP COLUMN "docType",
ADD COLUMN     "docType" "docType" NOT NULL;

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "imageExtension",
DROP COLUMN "imageValue",
DROP COLUMN "isBanner",
DROP COLUMN "isPost",
DROP COLUMN "updatedAt",
ADD COLUMN     "imageFilePath" TEXT NOT NULL,
DROP COLUMN "imageType",
ADD COLUMN     "imageType" "imageType" NOT NULL;

-- AlterTable
ALTER TABLE "Link" DROP COLUMN "isPost",
DROP COLUMN "updatedAt",
ADD COLUMN     "linkType" "linkType" NOT NULL;

-- AlterTable
ALTER TABLE "Location" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "updatedAt",
DROP COLUMN "postType",
ADD COLUMN     "postType" "postType" NOT NULL DEFAULT 'GENERAL';

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "middleName",
DROP COLUMN "userType",
ADD COLUMN     "userType" "userType" NOT NULL DEFAULT 'USER';

-- AlterTable
ALTER TABLE "Reaction" DROP COLUMN "reactionType",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "Save" DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isSigned" BOOLEAN NOT NULL DEFAULT false;
