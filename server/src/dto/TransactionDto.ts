export class TransactionDto {
    amount: number;
    senderCvu: number;
    receiverCvu: number;
    description: string;

    constructor(amount: number, senderCvu: number, receiverCvu: number, description: string) {
        this.amount = amount;
        this.senderCvu = senderCvu;
        this.receiverCvu = receiverCvu;
        this.description = description;
    }
}