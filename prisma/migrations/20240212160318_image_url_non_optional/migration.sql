/*
  Warnings:

  - Made the column `imageUrl` on table `ProducVariant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProducVariant" ALTER COLUMN "imageUrl" SET NOT NULL;
