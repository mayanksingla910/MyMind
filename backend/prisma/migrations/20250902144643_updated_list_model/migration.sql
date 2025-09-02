/*
  Warnings:

  - Added the required column `color` to the `List` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "List" ADD COLUMN     "color" TEXT NOT NULL;
