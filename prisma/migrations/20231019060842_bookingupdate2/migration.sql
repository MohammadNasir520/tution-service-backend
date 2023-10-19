-- CreateEnum
CREATE TYPE "paymentStatus" AS ENUM ('paid', 'unPaid');

-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "paymentStatus" "paymentStatus" NOT NULL DEFAULT 'unPaid';
