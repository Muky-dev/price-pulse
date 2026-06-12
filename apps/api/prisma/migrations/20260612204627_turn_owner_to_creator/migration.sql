/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Offer` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[url]` on the table `Offer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdById` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Offer" DROP CONSTRAINT "Offer_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_userId_fkey";

-- DropIndex
DROP INDEX "Offer_ownerId_url_key";

-- AlterTable
ALTER TABLE "Offer" DROP COLUMN "ownerId",
ADD COLUMN     "createdById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "userId",
ADD COLUMN     "createdById" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Offer_url_key" ON "Offer"("url");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
