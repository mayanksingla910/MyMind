/*
  Warnings:

  - You are about to drop the column `Name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "Name",
ADD COLUMN     "name" TEXT;
