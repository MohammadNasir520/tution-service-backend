-- CreateTable
CREATE TABLE "tuitionPosts" (
    "id" TEXT NOT NULL,
    "medium" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "studentGender" TEXT NOT NULL,
    "days" INTEGER NOT NULL,
    "subject" TEXT NOT NULL,
    "tutoringStartTime" TIMESTAMP(3) NOT NULL,
    "tutoringEndTime" TIMESTAMP(3) NOT NULL,
    "tutorGender" TEXT NOT NULL,
    "numberOfStudent" TEXT NOT NULL,
    "salary" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "tuitionPosts_id_key" ON "tuitionPosts"("id");
