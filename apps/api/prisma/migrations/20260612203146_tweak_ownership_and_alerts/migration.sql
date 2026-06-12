/*
  Warnings:

  - You are about to drop the column `baseUrl` on the `Store` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ownerId,url]` on the table `Offer` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[domain]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ownerId` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `domain` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AlertType" AS ENUM ('BELOW_PRICE');

-- CreateEnum
CREATE TYPE "ProductVisibility" AS ENUM ('PRIVATE', 'SHARED');

-- DropIndex
DROP INDEX "Offer_url_key";

-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "externalId" TEXT,
ADD COLUMN     "ownerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PricePoint" ADD COLUMN     "available" BOOLEAN;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "visibility" "ProductVisibility" NOT NULL DEFAULT 'PRIVATE';

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "baseUrl",
ADD COLUMN     "domain" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Alert" (
    "id" TEXT NOT NULL,
    "threshold" DECIMAL(65,30),
    "lastTrigger" TIMESTAMP(3),
    "type" "AlertType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "Alert_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Offer_ownerId_url_key" ON "Offer"("ownerId", "url");

-- CreateIndex
CREATE UNIQUE INDEX "Store_domain_key" ON "Store"("domain");

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Offer" ADD CONSTRAINT "Offer_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
