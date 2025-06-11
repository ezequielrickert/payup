import {TransactionDto} from "../../dto/TransactionDto";

export interface IPaymentService {
    transfer(senderCvu: number, receiverCvu: number, amount: number, description: string): Promise<TransactionDto>;
    // Additional methods can be added here as needed
}