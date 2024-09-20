/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `Content` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `Content` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Content" ADD COLUMN     "key" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Content_key_key" ON "Content"("key");
