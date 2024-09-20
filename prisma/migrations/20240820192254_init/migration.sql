-- CreateEnum
CREATE TYPE "Type" AS ENUM ('BOOK', 'PUB', 'VIDEO', 'COURSE', 'TUTORIAL', 'OTHER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('AVAILABLE', 'OLD');

-- CreateTable
CREATE TABLE "Content" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "page" TEXT,
    "image" TEXT,
    "type" "Type" NOT NULL DEFAULT 'BOOK',
    "status" "Status" NOT NULL DEFAULT 'AVAILABLE',

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Content_title_key" ON "Content"("title");
