/*
  Warnings:

  - Added the required column `category` to the `services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topic` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ServiceStatus" AS ENUM ('available', 'notAvailable', 'upcommin');

-- CreateEnum
CREATE TYPE "ServiceCategory" AS ENUM ('Academic', 'SoftSkill', 'TangibleSkill', 'Religious');

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "category" "ServiceCategory" NOT NULL,
ADD COLUMN     "status" "ServiceStatus" NOT NULL DEFAULT 'available',
ADD COLUMN     "topic" TEXT NOT NULL;
