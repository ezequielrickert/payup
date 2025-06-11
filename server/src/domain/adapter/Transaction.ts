import {ITransaction} from "../port/ITransaction";

export class Transaction implements ITransaction {
    amount: number;
    senderCvu: number;
    receiverCvu: number;
    description: string;

    constructor(amount: number, senderCvu: number, receiverCvu: number, description: string) {
        if (senderCvu <= 0 || receiverCvu <= 0) {
            throw new Error('CVU must be a positive number');
        }
        this.amount = amount;
        this.senderCvu = senderCvu;
        this.receiverCvu = receiverCvu;
        this.description = description;
    }
}