import {Wallet} from "../../domain/adapter/Wallet";

describe ('Wallet entity', () => {


    it ('should create a valid wallet with valid data', () => {
        const userId = 1;
        const initialBalance = 100;

        const wallet = new Wallet(userId, initialBalance);

        expect(wallet.userId).toBe(userId);
        expect(wallet.balance).toBe(initialBalance);
    });

    it ('should create an empty wallet with zero balance if none is specified', () => {
        const userId = 2;

        const wallet = new Wallet(userId);

        expect(wallet.userId).toBe(userId);
        expect(wallet.balance).toBe(0);
    });

    it ('should throw an error if the initial balance is negative', () => {
        const userId = 3;
        const negativeBalance = -50;

        expect(() => {
            new Wallet(userId, negativeBalance);
        }).toThrow(/Balance cannot be negative/);
    });

    it ('should deposit a valid amount and return a new wallet with updated balance', () => {
        const userId = 4;
        const initialBalance = 100;
        const depositAmount = 50;

        const wallet = new Wallet(userId, initialBalance);
        const updatedWallet = wallet.deposit(depositAmount);

        expect(updatedWallet.balance).toBe(initialBalance + depositAmount);
        expect(updatedWallet.userId).toBe(userId);
    });
    
    it ('should throw an error when depositing a non-positive amount', () => {
        const userId = 5;
        const initialBalance = 100;
        const depositAmount = -20;

        const wallet = new Wallet(userId, initialBalance);

        expect(() => {
            wallet.deposit(depositAmount);
        }).toThrow(/Deposit amount must be positive/);
    });

    it ('should withdraw a valid amount and return a new wallet with updated balance', () => {
        const userId = 6;
        const initialBalance = 100;
        const withdrawAmount = 30;

        const wallet = new Wallet(userId, initialBalance);
        const updatedWallet = wallet.withdraw(withdrawAmount);

        expect(updatedWallet.balance).toBe(initialBalance - withdrawAmount);
        expect(updatedWallet.userId).toBe(userId);
    });

    it ('should throw an error when withdrawing a non-positive amount', () => {
        const userId = 7;
        const initialBalance = 100;
        const withdrawAmount = -10;

        const wallet = new Wallet(userId, initialBalance);

        expect(() => {
            wallet.withdraw(withdrawAmount);
        }).toThrow(/Withdraw amount must be positive/);
    });
});