/*
  Warnings:

  - Added the required column `product` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "product" TEXT NOT NULL;
