/*
  Warnings:

  - A unique constraint covering the columns `[cvu]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_userCvu_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "User_cvu_key" ON "User"("cvu");

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_userCvu_fkey" FOREIGN KEY ("userCvu") REFERENCES "User"("cvu") ON DELETE RESTRICT ON UPDATE CASCADE;
