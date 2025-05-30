/*
  Warnings:

  - A unique constraint covering the columns `[userCvu]` on the table `Wallet` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userCvu` to the `Wallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Wallet" ADD COLUMN     "userCvu" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Wallet_userCvu_key" ON "Wallet"("userCvu");
