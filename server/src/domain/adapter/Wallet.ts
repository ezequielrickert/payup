import { IWallet } from '../port/IWallet';

export class Wallet implements IWallet {
    userCvu: number;
    balance: number;

    constructor(userCvu: number, balance: number = 0) {
        if (balance < 0) {
            throw new Error('Balance cannot be negative');
        }
        this.userCvu = userCvu;
        this.balance = balance;
    }

    deposit(amount: number): Wallet {
        if (amount <= 0) {
            throw new Error('Deposit amount must be positive');
        }
        return new Wallet(this.userCvu, this.balance += amount);
    }

    withdraw(amount: number): Wallet {
        if (amount <= 0) {
            throw new Error('Withdraw amount must be positive');
        }
        if (amount > this.balance) {
            throw new Error('Insufficient balance');
        }
        return new Wallet(this.userCvu, this.balance -= amount);
    }
}

