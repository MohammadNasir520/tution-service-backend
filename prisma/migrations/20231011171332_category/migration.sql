/*
  Warnings:

  - The values [customer] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `title` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the `Book` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('super_admin', 'admin', 'user');
ALTER TABLE "users" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_categoryId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "title",
ADD COLUMN     "category" TEXT NOT NULL;

-- DropTable
DROP TABLE "Book";

-- DropTable
DROP TABLE "Order";

-- DropEnum
DROP TYPE "OrderStatus";
