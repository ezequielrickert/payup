/*
  Warnings:

  - You are about to drop the column `userId` on the `Wallet` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_userId_fkey";

-- DropIndex
DROP INDEX "Wallet_userId_key";

-- AlterTable
ALTER TABLE "Wallet" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_userCvu_fkey" FOREIGN KEY ("userCvu") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
