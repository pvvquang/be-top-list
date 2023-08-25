/*
  Warnings:

  - You are about to drop the column `thumbnail` on the `Posts` table. All the data in the column will be lost.
  - Added the required column `thumbnail_key` to the `Posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_thumbnail_fkey";

-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "thumbnail",
ADD COLUMN     "thumbnail_key" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_thumbnail_key_fkey" FOREIGN KEY ("thumbnail_key") REFERENCES "Media"("link") ON DELETE RESTRICT ON UPDATE CASCADE;
