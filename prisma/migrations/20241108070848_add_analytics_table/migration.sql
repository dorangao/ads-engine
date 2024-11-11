-- CreateTable
CREATE TABLE "Analytics" (
    "id" SERIAL NOT NULL,
    "adId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "impressions" INTEGER NOT NULL DEFAULT 0,
    "clicks" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Analytics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Analytics_adId_date_key" ON "Analytics"("adId", "date");

-- AddForeignKey
ALTER TABLE "Analytics" ADD CONSTRAINT "Analytics_adId_fkey" FOREIGN KEY ("adId") REFERENCES "Ad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
