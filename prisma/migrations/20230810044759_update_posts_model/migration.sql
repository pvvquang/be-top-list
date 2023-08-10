/*
  Warnings:

  - You are about to drop the column `thumbnail_key` on the `Posts` table. All the data in the column will be lost.
  - Added the required column `thumbnailKey` to the `Posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_thumbnail_key_fkey";

-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "thumbnail_key",
ADD COLUMN     "author" TEXT DEFAULT '',
ADD COLUMN     "imageKeys" TEXT[],
ADD COLUMN     "isPublish" BOOLEAN DEFAULT true,
ADD COLUMN     "meta" TEXT DEFAULT '',
ADD COLUMN     "publishedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "thumbnailKey" TEXT NOT NULL,
ADD COLUMN     "trending" BOOLEAN DEFAULT false,
ADD COLUMN     "type" TEXT DEFAULT '';

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_thumbnailKey_fkey" FOREIGN KEY ("thumbnailKey") REFERENCES "Media"("link") ON DELETE RESTRICT ON UPDATE CASCADE;
