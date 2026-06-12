-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductLink" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "storeName" TEXT NOT NULL,
    "scrapeStrategy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "productId" TEXT NOT NULL,

    CONSTRAINT "ProductLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductPrice" (
    "id" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "currency" CHAR(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "productLinkId" TEXT NOT NULL,

    CONSTRAINT "ProductPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScrapeHistory" (
    "id" TEXT NOT NULL,
    "success" BOOLEAN NOT NULL,
    "message" TEXT,
    "strategy" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "finishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "productLinkId" TEXT NOT NULL,

    CONSTRAINT "ScrapeHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductLink_url_key" ON "ProductLink"("url");

-- CreateIndex
CREATE INDEX "ProductPrice_productLinkId_createdAt_idx" ON "ProductPrice"("productLinkId", "createdAt");

-- CreateIndex
CREATE INDEX "ScrapeHistory_productLinkId_createdAt_idx" ON "ScrapeHistory"("productLinkId", "createdAt");

-- AddForeignKey
ALTER TABLE "ProductLink" ADD CONSTRAINT "ProductLink_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPrice" ADD CONSTRAINT "ProductPrice_productLinkId_fkey" FOREIGN KEY ("productLinkId") REFERENCES "ProductLink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScrapeHistory" ADD CONSTRAINT "ScrapeHistory_productLinkId_fkey" FOREIGN KEY ("productLinkId") REFERENCES "ProductLink"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
