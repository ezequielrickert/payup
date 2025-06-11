-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "senderCvu" INTEGER NOT NULL,
    "receiverCvu" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_senderCvu_fkey" FOREIGN KEY ("senderCvu") REFERENCES "User"("cvu") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_receiverCvu_fkey" FOREIGN KEY ("receiverCvu") REFERENCES "User"("cvu") ON DELETE RESTRICT ON UPDATE CASCADE;
