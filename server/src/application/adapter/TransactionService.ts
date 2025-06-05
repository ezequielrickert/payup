import { ITransactionRepository } from '../../repository/port/ITransactionRepository';
import { ITransaction } from '../../domain/port/ITransaction';
import {TransactionDto} from "../../dto/TransactionDto";

export class TransactionService {
    private transactionRepository: ITransactionRepository;

    constructor(transactionRepository: ITransactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    async createTransaction(transaction: TransactionDto): Promise<TransactionDto> {
        const domainTransaction = await this.transactionRepository.createTransaction(transaction.amount, transaction.senderCvu, transaction.receiverCvu, transaction.description)
        return this.mapToDto(domainTransaction);
    }

    async getUserTransactions(cvu: number): Promise<TransactionDto[]> {
        const transactions = await this.transactionRepository.getUserTransactions(cvu);
        return transactions.map(this.mapToDto);
    }

    private mapToDto(transaction: ITransaction): TransactionDto {
        return new TransactionDto(
            transaction.amount,
            transaction.senderCvu,
            transaction.receiverCvu,
            transaction.description
        );
    }
}

