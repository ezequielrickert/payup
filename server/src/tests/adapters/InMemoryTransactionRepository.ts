import { ITransaction } from '../../domain/port/ITransaction';
import { ITransactionRepository } from '../../repository/port/ITransactionRepository';

export class InMemoryTransactionRepository implements ITransactionRepository {
    private transactions: ITransaction[] = [];

    async createTransaction(amount: number, senderCvu: number, receiverCVu: number, description: string): Promise<ITransaction> {
        const transaction: ITransaction = {
            amount,
            senderCvu,
            receiverCvu: receiverCVu,
            description,
        };
        this.transactions.push(transaction);
        return transaction;
    }

    async getUserTransactions(cvu: number): Promise<ITransaction[]> {
        return this.transactions.filter(t => t.senderCvu === cvu || t.receiverCvu === cvu);
    }
}

