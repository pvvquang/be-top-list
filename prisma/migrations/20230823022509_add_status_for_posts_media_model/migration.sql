-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Posts" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;
