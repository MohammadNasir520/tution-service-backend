/*
  Warnings:

  - The values [All] on the enum `Gender` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Gender_new" AS ENUM ('Male', 'Female', 'MaleOrFemale');
ALTER TABLE "tuitionPosts" ALTER COLUMN "studentGender" TYPE "Gender_new" USING ("studentGender"::text::"Gender_new");
ALTER TABLE "tuitionPosts" ALTER COLUMN "tutorGender" TYPE "Gender_new" USING ("tutorGender"::text::"Gender_new");
ALTER TYPE "Gender" RENAME TO "Gender_old";
ALTER TYPE "Gender_new" RENAME TO "Gender";
DROP TYPE "Gender_old";
COMMIT;

-- AlterTable
ALTER TABLE "tuitionPosts" ADD COLUMN     "postedById" TEXT NOT NULL DEFAULT '435124b1-fbd1-4280-9a9a-e8f00c4e7a5a';

-- AddForeignKey
ALTER TABLE "tuitionPosts" ADD CONSTRAINT "tuitionPosts_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
