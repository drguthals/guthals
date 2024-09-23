/*
  Warnings:

  - You are about to drop the `Content` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Content";

-- CreateTable
CREATE TABLE "content" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "description" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "role" TEXT,
    "exturl" TEXT,
    "image" TEXT,
    "type" "Type" NOT NULL DEFAULT 'BOOK',
    "status" "Status" NOT NULL DEFAULT 'AVAILABLE',

    CONSTRAINT "content_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "content_key_key" ON "content"("key");

-- CreateIndex
CREATE UNIQUE INDEX "content_title_key" ON "content"("title");
