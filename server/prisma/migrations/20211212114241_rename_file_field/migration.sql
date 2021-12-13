/*
  Warnings:

  - You are about to drop the column `file` on the `Photo` table. All the data in the column will be lost.
  - Added the required column `photo` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Photo" DROP COLUMN "file",
ADD COLUMN     "photo" TEXT NOT NULL;
