/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `ProducVariant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProducVariant" DROP COLUMN "imageUrl";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "imageUrl" TEXT NOT NULL DEFAULT '';
