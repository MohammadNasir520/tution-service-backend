/*
  Warnings:

  - Added the required column `tuitionType` to the `tuitionPosts` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `medium` on the `tuitionPosts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `studentGender` on the `tuitionPosts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `tutorGender` on the `tuitionPosts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TuitionMedium" AS ENUM ('English', 'Bangla', 'Madrasha');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'All');

-- CreateEnum
CREATE TYPE "TuitionType" AS ENUM ('Home', 'Online');

-- AlterTable
ALTER TABLE "tuitionPosts" ADD COLUMN     "tuitionType" "TuitionType" NOT NULL,
DROP COLUMN "medium",
ADD COLUMN     "medium" "TuitionMedium" NOT NULL,
DROP COLUMN "studentGender",
ADD COLUMN     "studentGender" "Gender" NOT NULL,
DROP COLUMN "tutorGender",
ADD COLUMN     "tutorGender" "Gender" NOT NULL;
