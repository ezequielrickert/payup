import {ITransaction} from "../../domain/port/ITransaction";
import {TransactionDto} from "../../dto/TransactionDto";

export interface ITransactionService {
    createTransaction(transaction: TransactionDto): Promise<ITransaction>
    getUserTransactions(cvu: number): Promise<TransactionDto[]>
}