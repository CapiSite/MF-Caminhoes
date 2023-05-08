/*
  Warnings:

  - Added the required column `price` to the `carts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "carts" ADD COLUMN     "price" INTEGER NOT NULL;
