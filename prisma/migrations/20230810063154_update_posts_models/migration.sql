/*
  Warnings:

  - You are about to alter the column `author` on the `Posts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `meta` on the `Posts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `type` on the `Posts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - Made the column `author` on table `Posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isPublish` on table `Posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `meta` on table `Posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `publishedAt` on table `Posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `trending` on table `Posts` required. This step will fail if there are existing NULL values in that column.
  - Made the column `type` on table `Posts` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Posts" ALTER COLUMN "author" SET NOT NULL,
ALTER COLUMN "author" DROP DEFAULT,
ALTER COLUMN "author" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "isPublish" SET NOT NULL,
ALTER COLUMN "isPublish" DROP DEFAULT,
ALTER COLUMN "meta" SET NOT NULL,
ALTER COLUMN "meta" DROP DEFAULT,
ALTER COLUMN "meta" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "publishedAt" SET NOT NULL,
ALTER COLUMN "trending" SET NOT NULL,
ALTER COLUMN "trending" DROP DEFAULT,
ALTER COLUMN "type" SET NOT NULL,
ALTER COLUMN "type" DROP DEFAULT,
ALTER COLUMN "type" SET DATA TYPE VARCHAR(255);
