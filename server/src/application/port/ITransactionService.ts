export interface ITransaction {
    createTransaction(amount: number, senderCvu: number, receiverCvu: number, description: string): Promise<ITransaction>
    getUserTransactions(cvu: number): Promise<ITransaction[]>
}