-- Add publishDate to all content types
ALTER TABLE "Book" ADD COLUMN "publishDate" TIMESTAMP(3);
ALTER TABLE "Video" ADD COLUMN "publishDate" TIMESTAMP(3);
ALTER TABLE "Course" ADD COLUMN "publishDate" TIMESTAMP(3);
ALTER TABLE "Research" ADD COLUMN "publishDate" TIMESTAMP(3);

-- Add url to all content types (except where link already exists)
ALTER TABLE "Video" ADD COLUMN "url" TEXT;
ALTER TABLE "Course" RENAME COLUMN "link" TO "url";
ALTER TABLE "Research" RENAME COLUMN "link" TO "url";
ALTER TABLE "Book" RENAME COLUMN "link" TO "url";

-- Make the new fields required
ALTER TABLE "Book" ALTER COLUMN "publishDate" SET NOT NULL,
                   ALTER COLUMN "url" SET NOT NULL,
                   ALTER COLUMN "description" SET NOT NULL;

ALTER TABLE "Video" ALTER COLUMN "publishDate" SET NOT NULL,
                    ALTER COLUMN "url" SET NOT NULL;

ALTER TABLE "Course" ALTER COLUMN "publishDate" SET NOT NULL,
                     ALTER COLUMN "url" SET NOT NULL,
                     ALTER COLUMN "description" SET NOT NULL;

ALTER TABLE "Research" ALTER COLUMN "publishDate" SET NOT NULL,
                      ALTER COLUMN "url" SET NOT NULL;