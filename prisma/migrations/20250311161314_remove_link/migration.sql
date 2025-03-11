/*
  Warnings:

  - You are about to drop the column `publishDate` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `publishDate` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `publishDate` on the `Research` table. All the data in the column will be lost.
  - You are about to drop the column `youtubeUrl` on the `Video` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `BlogPost` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `BlogPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "excerpt" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[],
ALTER COLUMN "content" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "publishDate",
ALTER COLUMN "author" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "publishDate",
ALTER COLUMN "platform" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Research" DROP COLUMN "publishDate",
ADD COLUMN     "abstract" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "authors" DROP NOT NULL,
ALTER COLUMN "publication" DROP NOT NULL,
ALTER COLUMN "year" DROP NOT NULL,
ALTER COLUMN "url" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Video" DROP COLUMN "youtubeUrl",
ALTER COLUMN "url" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");
