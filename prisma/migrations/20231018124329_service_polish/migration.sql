/*
  Warnings:

  - The values [TangibleSkill] on the enum `ServiceCategory` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `topic` on the `services` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ServiceCategory_new" AS ENUM ('Academic', 'SoftSkill', 'Religious');
ALTER TABLE "services" ALTER COLUMN "category" TYPE "ServiceCategory_new" USING ("category"::text::"ServiceCategory_new");
ALTER TYPE "ServiceCategory" RENAME TO "ServiceCategory_old";
ALTER TYPE "ServiceCategory_new" RENAME TO "ServiceCategory";
DROP TYPE "ServiceCategory_old";
COMMIT;

-- AlterTable
ALTER TABLE "services" DROP COLUMN "topic";
