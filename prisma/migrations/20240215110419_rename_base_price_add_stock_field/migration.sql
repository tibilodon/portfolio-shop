/*
  Warnings:

  - You are about to drop the column `basePrice` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "basePrice",
ADD COLUMN     "price" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "stock" INTEGER NOT NULL DEFAULT 1;
