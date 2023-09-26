-- DropForeignKey
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_thumbnailKey_fkey";

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_thumbnailKey_fkey" FOREIGN KEY ("thumbnailKey") REFERENCES "Media"("key") ON DELETE SET DEFAULT ON UPDATE CASCADE;
