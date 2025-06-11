import { ITransactionService } from '../../application/port/ITransactionService';
import { TransactionDto } from '../../dto/TransactionDto';

export class FakeTransactionService implements ITransactionService {
    private transactions: TransactionDto[] = [];

    async createTransaction(transaction: TransactionDto): Promise<TransactionDto> {
        this.transactions.push(transaction);
        return transaction;
    }

    async getUserTransactions(cvu: number): Promise<TransactionDto[]> {
        return this.transactions.filter(
            t => t.senderCvu === cvu || t.receiverCvu === cvu
        );
    }
}

