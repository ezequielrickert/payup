import { ITransactionRepository } from "../../port/ITransactionRepository";
import { ITransaction } from "../../../domain/port/ITransaction";
import { prismaClient } from '../../../lib/prisma'
import { Transaction as PrismaTransaction } from '@prisma/client';
import {Transaction} from "../../../domain/adapter/Transaction";


export class PrismaTransactionRepository implements ITransactionRepository {
    async createTransaction(amount: number, senderCvu: number, receiverCvu: number, description: string): Promise<ITransaction> {
        const prismaTransaction = await prismaClient.transaction.create({
            data: {
                amount,
                senderCvu,
                receiverCvu,
                description,
            },
        });
        return this.prismaToDomain(prismaTransaction);
    }

    async getUserTransactions(cvu: number): Promise<ITransaction[]> {
        const transactions = await prismaClient.transaction.findMany({
            where: {
                OR: [
                    { senderCvu: cvu },
                    { receiverCvu: cvu },
                ],
            },
        });
        return transactions.map(t => this.prismaToDomain(t));
    }

    private prismaToDomain(prismaTransaction: PrismaTransaction): ITransaction {
        return new Transaction(prismaTransaction.amount, prismaTransaction.senderCvu, prismaTransaction.receiverCvu, prismaTransaction.description);
    }
}

