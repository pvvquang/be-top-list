-- DropForeignKey
ALTER TABLE "AccessToken" DROP CONSTRAINT "AccessToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_thumbnailKey_fkey";

-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_userId_fkey";

-- AlterTable
ALTER TABLE "Posts" ALTER COLUMN "categoryId" DROP NOT NULL,
ALTER COLUMN "thumbnailKey" SET DEFAULT '';

-- AddForeignKey
ALTER TABLE "AccessToken" ADD CONSTRAINT "AccessToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_thumbnailKey_fkey" FOREIGN KEY ("thumbnailKey") REFERENCES "Media"("link") ON DELETE SET DEFAULT ON UPDATE CASCADE;
