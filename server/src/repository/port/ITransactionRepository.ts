import {ITransaction} from "../../domain/port/ITransaction";

export interface ITransactionRepository {
    createTransaction(amount: number, senderCvu: number, receiverCVu: number, description: String): Promise<ITransaction>;
    getUserTransactions(cvu: number): Promise<ITransaction[]>;
}