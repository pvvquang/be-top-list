-- CreateTable
CREATE TABLE "Media" (
    "id" SERIAL NOT NULL,
    "key" VARCHAR(255) NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "link" TEXT NOT NULL,
    "originalName" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Media_key_key" ON "Media"("key");
