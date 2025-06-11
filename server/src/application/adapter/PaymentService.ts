// This class follows the 'Service Orchestration Pattern'.
// It orchestrates the interaction between WalletService and TransactionService leaving the individual services to handle their own logic.

import { TransactionDto } from "../../dto/TransactionDto";
import {IWalletService} from "../port/IWalletService";
import {ITransactionService} from "../port/ITransactionService";
import {IPaymentService} from "../port/IPaymentService";

export class PaymentService implements IPaymentService {
    constructor(
        private readonly walletService: IWalletService,
        private readonly transactionService: ITransactionService
    ) {}

    // For now no rollback mechanism is implemented. Consider it for future improvements.

    async transfer(senderCvu: number, receiverCvu: number, amount: number, description: string): Promise<TransactionDto> {
        try {
            // 1. Withdraw from sender's wallet
            await this.walletService.withdraw(senderCvu, amount);
            // 2. Deposit to receiver's wallet
            await this.walletService.deposit(receiverCvu, amount);
            // 3. Record the transaction
            const transactionDto = new TransactionDto(amount, senderCvu, receiverCvu, description);
            return await this.transactionService.createTransaction(transactionDto);
        } catch (error) {
            console.error("Error al transferir dinero: ", error);
            throw error;
        }
    }

    async withdrawTransfer(cvu: number, amount: number, description: string): Promise<TransactionDto> {
        try {
            await this.walletService.withdraw(cvu, amount);
            const transactionDto = new TransactionDto(amount, cvu, cvu, description);
            return await this.transactionService.createTransaction(transactionDto);
        } catch (error) {
            console.log("Error al extraer dinero: ", error);
            throw error;
        }
    }
}

